"use client";
import { useState } from "react";
import updateProperty from "@/app/actions/updateProperty";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import PropertyImageEdit from "@/components/PropertyImageEdit";

const PropertyEditForm = ({ property }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // State to store image data passed back from the child component
  const [imageState, setImageState] = useState({
    deletedImages: [],
    newFiles: [],
  });

  const handleImageStateChange = (newState) => {
    setImageState(newState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    // 1. Basic Data
    formData.append("propertyId", property._id);

    // 2. Image Handling
    imageState.deletedImages.forEach((url) => {
      formData.append("delete_images", url);
    });

    imageState.newFiles.forEach((file) => {
      formData.append("new_images", file);
    });

    try {
      // 1. Call backend (If an error is thrown here, it jumps to catch and skips success logic)
      const updatedPropertyId = await updateProperty(formData);

      // 2.  Show success notification only if the update succeeded
      toast.success("Property Updated Successfully!");

      // 3. Redirect to the updated property details page
      router.replace(`/properties/${updatedPropertyId}`);
    } catch (error) {
      console.error(error);
      // 4.  Show error notification only if the update failed
      toast.error("Update Failed: " + error.message);
    } finally {
      // 5.  Turn off the loading state regardless of success or failure
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-3xl text-center font-semibold mb-6">Edit Property</h2>

      {/* 1. Type */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Property Type
        </label>
        <select
          name="type"
          defaultValue={property.type}
          className="border rounded w-full py-2 px-3"
          required
        >
          <option value="Apartment">Apartment</option>
          <option value="Condo">Condo</option>
          <option value="House">House</option>
          <option value="CabinOrCottage">Cabin or Cottage</option>
          <option value="Room">Room</option>
          <option value="Studio">Studio</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* 2. Name */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Listing Name
        </label>
        <input
          type="text"
          name="name"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="eg. Beautiful Apartment In Miami"
          defaultValue={property.name}
          required
        />
      </div>

      {/* 3. Description */}
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-gray-700 font-bold mb-2"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className="border rounded w-full py-2 px-3"
          rows="4"
          placeholder="Add an optional description of your property"
          defaultValue={property.description}
        ></textarea>
      </div>

      {/* 4. Location */}
      <div className="mb-4 bg-blue-50 p-4">
        <label className="block text-gray-700 font-bold mb-2">Location</label>
        <input
          type="text"
          name="location.street"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="Street"
          defaultValue={property.location.street}
        />
        <input
          type="text"
          name="location.city"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="City"
          required
          defaultValue={property.location.city}
        />
        <input
          type="text"
          name="location.state"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="State"
          required
          defaultValue={property.location.state}
        />
        <input
          type="text"
          name="location.zipcode"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="Zipcode"
          defaultValue={property.location.zipcode}
        />
      </div>

      {/* 5. Beds / Baths / Sqft */}
      <div className="mb-4 flex flex-wrap">
        <div className="w-full sm:w-1/3 pr-2">
          <label className="block text-gray-700 font-bold mb-2">Beds</label>
          <input
            type="number"
            name="beds"
            className="border rounded w-full py-2 px-3"
            required
            defaultValue={property.beds}
          />
        </div>
        <div className="w-full sm:w-1/3 px-2">
          <label className="block text-gray-700 font-bold mb-2">Baths</label>
          <input
            type="number"
            name="baths"
            className="border rounded w-full py-2 px-3"
            required
            defaultValue={property.baths}
          />
        </div>
        <div className="w-full sm:w-1/3 pl-2">
          <label className="block text-gray-700 font-bold mb-2">
            Square Feet
          </label>
          <input
            type="number"
            name="square_feet"
            className="border rounded w-full py-2 px-3"
            required
            defaultValue={property.square_feet}
          />
        </div>
      </div>

      {/* 6. Amenities */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Amenities</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {[
            "Wifi",
            "Full kitchen",
            "Washer & Dryer",
            "Free Parking",
            "Swimming Pool",
            "Hot Tub",
            "24/7 Security",
            "Wheelchair Accessible",
            "Elevator Access",
            "Dishwasher",
            "Gym/Fitness Center",
            "Air Conditioning",
            "Balcony/Patio",
            "Smart TV",
            "Coffee Maker",
          ].map((amenity) => (
            <div key={amenity}>
              <input
                type="checkbox"
                id={`amenity_${amenity}`}
                name="amenities"
                value={amenity}
                className="mr-2"
                defaultChecked={property.amenities.includes(amenity)}
              />
              <label htmlFor={`amenity_${amenity}`}>{amenity}</label>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Rates */}
      <div className="mb-4 bg-blue-50 p-4">
        <label className="block text-gray-700 font-bold mb-2">
          Rates (Leave blank if not applicable)
        </label>
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <div className="flex items-center">
            <label className="mr-2">Weekly</label>
            <input
              type="number"
              name="rates.weekly"
              className="border rounded w-full py-2 px-3"
              defaultValue={property.rates.weekly}
            />
          </div>
          <div className="flex items-center">
            <label className="mr-2">Monthly</label>
            <input
              type="number"
              name="rates.monthly"
              className="border rounded w-full py-2 px-3"
              defaultValue={property.rates.monthly}
            />
          </div>
          <div className="flex items-center">
            <label className="mr-2">Nightly</label>
            <input
              type="number"
              name="rates.nightly"
              className="border rounded w-full py-2 px-3"
              defaultValue={property.rates.nightly}
            />
          </div>
        </div>
      </div>

      {/* 8. Seller Info */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Seller Name
        </label>
        <input
          type="text"
          name="seller_info.name"
          className="border rounded w-full py-2 px-3"
          placeholder="Name"
          defaultValue={property.seller_info.name}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Seller Email
        </label>
        <input
          type="email"
          name="seller_info.email"
          className="border rounded w-full py-2 px-3"
          placeholder="Email address"
          required
          defaultValue={property.seller_info.email}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Seller Phone
        </label>
        <input
          type="tel"
          name="seller_info.phone"
          className="border rounded w-full py-2 px-3"
          placeholder="Phone"
          defaultValue={property.seller_info.phone}
        />
      </div>

      {/* 9. Image Management Component */}
      <div className="mb-8">
        <PropertyImageEdit
          initialImages={property.images}
          onImageStateChange={handleImageStateChange}
        />
      </div>

      {/* 10. Submit Button */}
      <div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
          type="submit"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Property"}
        </button>
      </div>
    </form>
  );
};

export default PropertyEditForm;
