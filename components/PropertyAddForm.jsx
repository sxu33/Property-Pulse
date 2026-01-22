"use client";
import addProperty from "@/app/actions/addProperty";
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
  Image as ImageIcon,
  FileText,
  Type,
} from "lucide-react";

const PropertyAddForm = () => {
  return (
    <form action={addProperty} className="max-w-4xl mx-auto py-8">
      <div className="mb-10 border-b border-zinc-200 pb-6">
        <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">
          Add Property
        </h2>
        <p className="text-zinc-500 text-sm mt-1 font-light">
          Fill in the details to list your property on the market.
        </p>
      </div>

      <div className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <Label
              htmlFor="type"
              className="text-sm font-bold text-zinc-900 flex items-center gap-2"
            >
              <Home size={16} className="text-zinc-500" /> Property Type
            </Label>
            <select
              id="type"
              name="type"
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
          <div className="space-y-1.5">
            <Label
              htmlFor="name"
              className="text-sm font-bold text-zinc-900 flex items-center gap-2"
            >
              <Type size={16} className="text-zinc-500" /> Listing Name
            </Label>
            <Input
              type="text"
              id="name"
              name="name"
              className="rounded-lg h-10 border-zinc-300 text-zinc-900 placeholder:text-zinc-400 focus-visible:ring-black"
              placeholder="eg. Beautiful Apartment In Miami"
              required
            />
          </div>
        </div>

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
          />
        </div>

        <div className="pt-6 border-t border-zinc-100">
          <Label className="text-base font-bold text-zinc-900 flex items-center gap-2 mb-4">
            <MapPin size={18} className="text-[#FF385C]" /> Location
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div className="space-y-1">
              <Label
                htmlFor="street"
                className="text-[11px] font-bold text-zinc-500 uppercase"
              >
                Street
              </Label>
              <Input
                id="street"
                name="location.street"
                className="rounded-lg h-10 border-zinc-300"
                placeholder="Street"
              />
            </div>
            <div className="space-y-1">
              <Label
                htmlFor="city"
                className="text-[11px] font-bold text-zinc-500 uppercase"
              >
                City
              </Label>
              <Input
                id="city"
                name="location.city"
                className="rounded-lg h-10 border-zinc-300"
                placeholder="City"
                required
              />
            </div>
            <div className="space-y-1">
              <Label
                htmlFor="state"
                className="text-[11px] font-bold text-zinc-500 uppercase"
              >
                State
              </Label>
              <Input
                id="state"
                name="location.state"
                className="rounded-lg h-10 border-zinc-300"
                placeholder="State"
                required
              />
            </div>
            <div className="space-y-1">
              <Label
                htmlFor="zipcode"
                className="text-[11px] font-bold text-zinc-500 uppercase"
              >
                Zipcode
              </Label>
              <Input
                id="zipcode"
                name="location.zipcode"
                className="rounded-lg h-10 border-zinc-300"
                placeholder="Zipcode"
              />
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-zinc-100">
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-1.5">
              <Label
                htmlFor="beds"
                className="text-sm font-bold text-zinc-900 flex items-center gap-2"
              >
                <Bed size={16} className="text-zinc-500" /> Beds
              </Label>
              <Input
                type="number"
                id="beds"
                name="beds"
                className="rounded-lg h-10 border-zinc-300 font-medium"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="baths"
                className="text-sm font-bold text-zinc-900 flex items-center gap-2"
              >
                <Bath size={16} className="text-zinc-500" /> Baths
              </Label>
              <Input
                type="number"
                id="baths"
                name="baths"
                className="rounded-lg h-10 border-zinc-300 font-medium"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="square_feet"
                className="text-sm font-bold text-zinc-900 flex items-center gap-2"
              >
                <Maximize size={16} className="text-zinc-500" /> Sqft
              </Label>
              <Input
                type="number"
                id="square_feet"
                name="square_feet"
                className="rounded-lg h-10 border-zinc-300 font-medium"
                required
              />
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-zinc-100">
          <Label className="text-base font-bold text-zinc-900 flex items-center gap-2 mb-4">
            <Sparkles size={18} className="text-[#FF385C]" /> Amenities
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-4">
            {[
              { id: "wifi", label: "Wifi", value: "Wifi" },
              { id: "kitchen", label: "Full kitchen", value: "Full kitchen" },
              {
                id: "washer_dryer",
                label: "Washer & Dryer",
                value: "Washer & Dryer",
              },
              {
                id: "free_parking",
                label: "Free Parking",
                value: "Free Parking",
              },
              { id: "pool", label: "Swimming Pool", value: "Swimming Pool" },
              { id: "hot_tub", label: "Hot Tub", value: "Hot Tub" },
              {
                id: "24_7_security",
                label: "24/7 Security",
                value: "24/7 Security",
              },
              {
                id: "wheelchair_accessible",
                label: "Wheelchair Accessible",
                value: "Wheelchair Accessible",
              },
              {
                id: "elevator_access",
                label: "Elevator Access",
                value: "Elevator Access",
              },
              { id: "dishwasher", label: "Dishwasher", value: "Dishwasher" },
              {
                id: "gym_fitness_center",
                label: "Gym/Fitness Center",
                value: "Gym/Fitness Center",
              },
              {
                id: "air_conditioning",
                label: "Air Conditioning",
                value: "Air Conditioning",
              },
              {
                id: "balcony_patio",
                label: "Balcony/Patio",
                value: "Balcony/Patio",
              },
              { id: "smart_tv", label: "Smart TV", value: "Smart TV" },
              {
                id: "coffee_maker",
                label: "Coffee Maker",
                value: "Coffee Maker",
              },
            ].map((amenity) => (
              <div key={amenity.id} className="flex items-center space-x-2.5">
                <Checkbox
                  id={`amenity_${amenity.id}`}
                  name="amenities"
                  value={amenity.value}
                  className="h-5 w-5 rounded border-zinc-300 data-[state=checked]:bg-black data-[state=checked]:border-black"
                />
                <Label
                  htmlFor={`amenity_${amenity.id}`}
                  className="text-sm font-medium text-zinc-700 cursor-pointer select-none"
                >
                  {amenity.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-zinc-100">
          <Label className="text-base font-bold text-zinc-900 flex items-center gap-2 mb-4">
            <DollarSign size={18} className="text-zinc-900" /> Rates (optional)
          </Label>
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-1">
              <Label
                htmlFor="nightly_rate"
                className="text-[10px] font-bold text-zinc-400 uppercase"
              >
                Nightly
              </Label>
              <Input
                type="number"
                id="nightly_rate"
                name="rates.nightly"
                className="rounded-lg h-10 border-zinc-300 font-bold"
                placeholder="0"
              />
            </div>
            <div className="space-y-1">
              <Label
                htmlFor="weekly_rate"
                className="text-[10px] font-bold text-zinc-400 uppercase"
              >
                Weekly
              </Label>
              <Input
                type="number"
                id="weekly_rate"
                name="rates.weekly"
                className="rounded-lg h-10 border-zinc-300 font-bold"
                placeholder="0"
              />
            </div>
            <div className="space-y-1">
              <Label
                htmlFor="monthly_rate"
                className="text-[10px] font-bold text-zinc-400 uppercase"
              >
                Monthly
              </Label>
              <Input
                type="number"
                id="monthly_rate"
                name="rates.monthly"
                className="rounded-lg h-10 border-zinc-300 font-bold"
                placeholder="0"
              />
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-zinc-100">
          <Label className="text-base font-bold text-zinc-900 flex items-center gap-2 mb-4">
            <User size={18} className="text-zinc-500" /> Seller Info
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              id="seller_name"
              name="seller_info.name"
              className="rounded-lg h-10 border-zinc-300"
              placeholder="Name"
            />
            <Input
              type="email"
              id="seller_email"
              name="seller_info.email"
              className="rounded-lg h-10 border-zinc-300"
              placeholder="Email"
              required
            />
            <Input
              type="tel"
              id="seller_phone"
              name="seller_info.phone"
              className="rounded-lg h-10 border-zinc-300"
              placeholder="Phone"
            />
          </div>
        </div>

        <div className="pt-6 border-t border-zinc-100 space-y-3">
          <Label
            htmlFor="images"
            className="text-base font-bold text-zinc-900 flex items-center gap-2"
          >
            <ImageIcon size={18} className="text-zinc-500" /> Images
          </Label>
          <div className="flex items-center justify-center border-2 border-dashed border-zinc-200 rounded-xl p-8 bg-zinc-50 hover:bg-white transition-colors">
            <input
              type="file"
              id="images"
              name="images"
              className="w-full text-zinc-500 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-zinc-900 file:text-white hover:file:bg-zinc-800 cursor-pointer"
              accept="image/*"
              multiple
              required
            />
          </div>
        </div>

        <div className="pt-6">
          <Button
            type="submit"
            className="w-full h-12 rounded-lg bg-black hover:bg-zinc-800 text-white font-bold text-lg shadow-sm transition-all active:scale-[0.99]"
          >
            Add Property
          </Button>
        </div>
      </div>
    </form>
  );
};

export default PropertyAddForm;
