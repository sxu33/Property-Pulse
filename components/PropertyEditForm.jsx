"use client";
import { useState } from "react";
import updateProperty from "@/app/actions/updateProperty";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import PropertyImageEdit from "@/components/PropertyImageEdit";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Home,
  MapPin,
  Bed,
  Bath,
  Maximize,
  Sparkles,
  DollarSign,
  User,
  Loader2,
  FileText,
  Type,
} from "lucide-react";

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
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto py-8">
      <div className="mb-10 border-b border-zinc-200 pb-6">
        <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">
          Edit Property
        </h2>
        <p className="text-zinc-500 text-sm mt-1 font-light">
          Update your listing details and manage your property.
        </p>
      </div>

      <div className="space-y-10">
        {/* 1. Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <Label className="text-sm font-bold text-zinc-900 flex items-center gap-2">
              <Home size={16} className="text-zinc-500" /> Property Type
            </Label>
            <select
              name="type"
              defaultValue={property.type}
              className="flex h-10 w-full rounded-lg border border-zinc-300 bg-white px-3 py-1 text-zinc-900 font-medium focus:ring-1 focus:ring-black outline-none transition-all cursor-pointer"
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
          <div className="space-y-1.5">
            <Label className="text-sm font-bold text-zinc-900 flex items-center gap-2">
              <Type size={16} className="text-zinc-500" /> Listing Name
            </Label>
            <Input
              type="text"
              name="name"
              className="rounded-lg h-10 border-zinc-300 text-zinc-900 placeholder:text-zinc-400 focus-visible:ring-black"
              placeholder="eg. Beautiful Apartment In Miami"
              defaultValue={property.name}
              required
            />
          </div>
        </div>

        {/* 3. Description */}
        <div className="space-y-1.5">
          <Label
            htmlFor="description"
            className="text-sm font-bold text-zinc-900 flex items-center gap-2"
          >
            <FileText size={16} className="text-zinc-500" /> Description
          </Label>
          <Textarea
            id="description"
            name="description"
            className="rounded-lg border-zinc-300 text-zinc-900 min-h-[100px] focus-visible:ring-black leading-relaxed p-3"
            placeholder="Tell guests what makes your place special"
            defaultValue={property.description}
          ></Textarea>
        </div>

        {/* 4. Location */}
        <div className="pt-6 border-t border-zinc-100">
          <Label className="text-base font-bold text-zinc-900 flex items-center gap-2 mb-4">
            <MapPin size={18} className="text-[#FF385C]" /> Location
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div className="space-y-1">
              <Label className="text-[11px] font-bold text-zinc-500 uppercase">
                Street
              </Label>
              <Input
                name="location.street"
                className="rounded-lg h-10 border-zinc-300"
                placeholder="Street"
                defaultValue={property.location.street}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-[11px] font-bold text-zinc-500 uppercase">
                City
              </Label>
              <Input
                name="location.city"
                className="rounded-lg h-10 border-zinc-300"
                placeholder="City"
                required
                defaultValue={property.location.city}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-[11px] font-bold text-zinc-500 uppercase">
                State
              </Label>
              <Input
                name="location.state"
                className="rounded-lg h-10 border-zinc-300"
                placeholder="State"
                required
                defaultValue={property.location.state}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-[11px] font-bold text-zinc-500 uppercase">
                Zipcode
              </Label>
              <Input
                name="location.zipcode"
                className="rounded-lg h-10 border-zinc-300"
                placeholder="Zipcode"
                defaultValue={property.location.zipcode}
              />
            </div>
          </div>
        </div>

        {/* 5. Beds / Baths / Sqft */}
        <div className="pt-6 border-t border-zinc-100">
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-1.5">
              <Label className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                <Bed size={16} className="text-zinc-500" /> Beds
              </Label>
              <Input
                type="number"
                name="beds"
                className="rounded-lg h-10 border-zinc-300 font-medium"
                required
                defaultValue={property.beds}
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                <Bath size={16} className="text-zinc-500" /> Baths
              </Label>
              <Input
                type="number"
                name="baths"
                className="rounded-lg h-10 border-zinc-300 font-medium"
                required
                defaultValue={property.baths}
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                <Maximize size={16} className="text-zinc-500" /> Sqft
              </Label>
              <Input
                type="number"
                name="square_feet"
                className="rounded-lg h-10 border-zinc-300 font-medium"
                required
                defaultValue={property.square_feet}
              />
            </div>
          </div>
        </div>

        {/* 6. Amenities */}
        <div className="pt-6 border-t border-zinc-100">
          <Label className="text-base font-bold text-zinc-900 flex items-center gap-2 mb-4">
            <Sparkles size={18} className="text-[#FF385C]" /> Amenities
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-4">
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
              <div key={amenity} className="flex items-center space-x-2.5">
                <Checkbox
                  id={`amenity_${amenity}`}
                  name="amenities"
                  value={amenity}
                  className="h-5 w-5 rounded border-zinc-300 data-[state=checked]:bg-black data-[state=checked]:border-black"
                  defaultChecked={property.amenities.includes(amenity)}
                />
                <Label
                  htmlFor={`amenity_${amenity}`}
                  className="text-sm font-medium text-zinc-700 cursor-pointer select-none"
                >
                  {amenity}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* 7. Rates */}
        <div className="pt-6 border-t border-zinc-100">
          <Label className="text-base font-bold text-zinc-900 flex items-center gap-2 mb-4">
            <DollarSign size={18} className="text-zinc-900" /> Rates (optional)
          </Label>
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-1">
              <Label className="text-[10px] font-bold text-zinc-400 uppercase">
                Nightly
              </Label>
              <Input
                type="number"
                name="rates.nightly"
                className="rounded-lg h-10 border-zinc-300 font-bold"
                placeholder="0"
                defaultValue={property.rates.nightly}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] font-bold text-zinc-400 uppercase">
                Weekly
              </Label>
              <Input
                type="number"
                name="rates.weekly"
                className="rounded-lg h-10 border-zinc-300 font-bold"
                placeholder="0"
                defaultValue={property.rates.weekly}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] font-bold text-zinc-400 uppercase">
                Monthly
              </Label>
              <Input
                type="number"
                name="rates.monthly"
                className="rounded-lg h-10 border-zinc-300 font-bold"
                placeholder="0"
                defaultValue={property.rates.monthly}
              />
            </div>
          </div>
        </div>

        {/* 8. Seller Info */}
        <div className="pt-6 border-t border-zinc-100">
          <Label className="text-base font-bold text-zinc-900 flex items-center gap-2 mb-4">
            <User size={18} className="text-zinc-500" /> Seller Info
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              name="seller_info.name"
              className="rounded-lg h-10 border-zinc-300"
              placeholder="Name"
              defaultValue={property.seller_info.name}
            />
            <Input
              type="email"
              name="seller_info.email"
              className="rounded-lg h-10 border-zinc-300"
              placeholder="Email"
              required
              defaultValue={property.seller_info.email}
            />
            <Input
              type="tel"
              name="seller_info.phone"
              className="rounded-lg h-10 border-zinc-300"
              placeholder="Phone"
              defaultValue={property.seller_info.phone}
            />
          </div>
        </div>

        {/* 9. Image Management Component */}
        <div className="pt-10 border-t border-zinc-100">
          <PropertyImageEdit
            initialImages={property.images}
            onImageStateChange={handleImageStateChange}
          />
        </div>

        {/* 10. Submit Button */}
        <div className="pt-6">
          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-lg bg-black hover:bg-zinc-800 text-white font-bold text-lg shadow-sm transition-all active:scale-[0.99]"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Updating Listing...</span>
              </div>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default PropertyEditForm;
