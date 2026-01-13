"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const SearchForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // useState
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [type, setType] = useState(searchParams.get("propertyType") || "All");
  const [priceRange, setPriceRange] = useState({
    min: searchParams.get("minPrice") || "",
    max: searchParams.get("maxPrice") || "",
  });
  const [beds, setBeds] = useState(searchParams.get("beds") || "Any");
  const [baths, setBaths] = useState(searchParams.get("baths") || "Any");
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  // amenityOptions list
  const amenityOptions = [
    "Wifi",
    "Full kitchen",
    "Free Parking",
    "Pool",
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
  ];

  const handleAmenityChange = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (location) params.append("location", location);
    if (type && type !== "All") params.append("propertyType", type);
    if (priceRange.min) params.append("minPrice", priceRange.min);
    if (priceRange.max) params.append("maxPrice", priceRange.max);
    if (beds && beds !== "Any") params.append("beds", beds);
    if (baths && baths !== "Any") params.append("baths", baths);

    // add "," if selected more than one amenity
    if (selectedAmenities.length > 0) {
      params.append("amenities", selectedAmenities.join(","));
    }

    router.push(`/properties/search-results?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-2">
      {/* 1.amenities dropdown */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="rounded-full border-gray-300 hover:border-black"
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" /> All Filters
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4" align="start">
          <h4 className="font-bold mb-3">Amenities</h4>
          <div className="grid grid-cols-2 gap-2">
            {amenityOptions.map((item) => (
              <div key={item} className="flex items-center space-x-2">
                <Checkbox
                  id={item}
                  checked={selectedAmenities.includes(item)}
                  onCheckedChange={() => handleAmenityChange(item)}
                />
                <Label htmlFor={item} className="text-sm">
                  {item}
                </Label>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      {/* 2.Location */}
      <div className="relative">
        <Input
          placeholder="Location (City, Zip...)"
          className="rounded-full w-[200px] pl-4 border-gray-300 focus:ring-black"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      {/* 3. Price (min)} */}
      <Input
        type="number"
        placeholder="Min Price"
        className="rounded-full w-[110px] border-gray-300"
        value={priceRange.min}
        onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
      />

      {/* 4. Price (max) */}
      <Input
        type="number"
        placeholder="Max Price"
        className="rounded-full w-[110px] border-gray-300"
        value={priceRange.max}
        onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
      />

      {/* 5. Bed dropdown */}
      <Select value={beds} onValueChange={setBeds}>
        <SelectTrigger className="w-[110px] rounded-full border-gray-300">
          <SelectValue placeholder="Beds" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Any">Any Beds</SelectItem>
          <SelectItem value="1">1+ Beds</SelectItem>
          <SelectItem value="2">2+ Beds</SelectItem>
          <SelectItem value="3">3+ Beds</SelectItem>
        </SelectContent>
      </Select>

      {/* 6. washroom dropdown */}
      <Select value={baths} onValueChange={setBaths}>
        <SelectTrigger className="w-[110px] rounded-full border-gray-300">
          <SelectValue placeholder="Baths" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Any">Any Baths</SelectItem>
          <SelectItem value="1">1+ Baths</SelectItem>
          <SelectItem value="2">2+ Baths</SelectItem>
        </SelectContent>
      </Select>

      {/* 7. serch button */}
      <Button
        type="submit"
        className="rounded-full w-10 h-10 p-0 bg-blue-600 hover:bg-blue-700"
      >
        <Search className="w-4 h-4 text-white" />
      </Button>
    </form>
  );
};

export default SearchForm;
