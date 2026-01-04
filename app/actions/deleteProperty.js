"use server";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import cloudinary from "@/config/cloudinary";
import { revalidatePath } from "next/cache";

async function deleteProperty(propertyId) {
  const sessionUser = await getSessionUser();

  //Check if the session User and session userId is exsited
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User Id is required");
  }

  const { userId } = sessionUser;

  //Check if the property is exsited
  await connectDB();
  const property = await Property.findById(propertyId);
  if (!property) {
    throw new Error("Property not found");
  }

  //Verify if user is the owner
  if (userId !== property.owner.toString()) {
    throw new Error("unauthorized");
  }

  //delete cloudinary pictures
  const publicIds = property.images.map((url) => {
    return url.split("/").at(-1).split(".").at(0);
  });

  if (publicIds.length > 0) {
    for (let publicId of publicIds) {
      await cloudinary.uploader.destroy("property-pulse/" + publicId);
    }
  }

  await property.deleteOne();
  revalidatePath("/", "layout");
}

export default deleteProperty;
