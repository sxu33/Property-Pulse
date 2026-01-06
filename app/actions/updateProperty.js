"use server";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import cloudinary from "@/config/cloudinary";
import { convertImageToBase64 } from "@/utils/convertToBase64";

async function updateProperty(formData) {
  // 1. Connect to database
  await connectDB();
  const sessionUser = await getSessionUser();

  // 2. Validate user session
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;

  // 3. Get Property ID (manually appended in frontend)
  const propertyId = formData.get("propertyId");

  // 4. Find existing property
  const existingProperty = await Property.findById(propertyId);
  if (!existingProperty) throw new Error("Property not found");

  // 5. Verify ownership
  if (existingProperty.owner.toString() !== userId) {
    throw new Error("Unauthorized");
  }

  // ---  Image processing logic starts ---

  // A. Get current images from DB
  let finalImages = existingProperty.images;

  // B. Handle deleted images (from delete_images array)
  const imagesToDelete = formData.getAll("delete_images");

  if (imagesToDelete.length > 0) {
    // 1. Remove URLs from current list
    finalImages = finalImages.filter((img) => !imagesToDelete.includes(img));

    // 2. Delete files from Cloudinary
    for (const imageUrl of imagesToDelete) {
      // Extract Public ID:
      // Assuming URL is .../property-pulse/image_abc.jpg
      // We need property-pulse/image_abc
      const publicId = imageUrl.split("/").at(-1).split(".")[0];
      await cloudinary.uploader.destroy("property-pulse/" + publicId);
    }
  }

  // C. Handle new image uploads
  // Filter out empty files
  const newFiles = formData.getAll("new_images").filter((img) => img.size > 0);

  if (newFiles.length > 0) {
    // Upload new images in parallel
    const uploadedUrls = await Promise.all(
      newFiles.map(async (image) => {
        // Convert file to Base64
        const imageBase64 = await convertImageToBase64(image);

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(
          `data:image/png;base64,${imageBase64}`,
          { folder: "property-pulse" }
        );
        return result.secure_url;
      })
    );

    // Merge: Remaining old images + New uploaded images
    finalImages = [...finalImages, ...uploadedUrls];
  }

  // ---  Image processing logic ends ---

  // 6. Prepare data for database update
  const propertyData = {
    type: formData.get("type"),
    name: formData.get("name"),
    description: formData.get("description"),
    location: {
      street: formData.get("location.street"),
      city: formData.get("location.city"),
      state: formData.get("location.state"),
      zipcode: formData.get("location.zipcode"),
    },
    beds: formData.get("beds"),
    baths: formData.get("baths"),
    square_feet: formData.get("square_feet"),
    amenities: formData.getAll("amenities"),
    rates: {
      weekly: formData.get("rates.weekly"),
      monthly: formData.get("rates.monthly"),
      nightly: formData.get("rates.nightly"),
    },
    seller_info: {
      name: formData.get("seller_info.name"),
      email: formData.get("seller_info.email"),
      phone: formData.get("seller_info.phone"),
    },
    // Save the final image list
    images: finalImages,
  };

  // 7. Update database
  const updatedProperty = await Property.findByIdAndUpdate(
    propertyId,
    propertyData
  );

  // 8. Revalidate cache
  revalidatePath("/", "layout");

  return updatedProperty._id.toString();
}

export default updateProperty;
