import Image from "next/image";
import Link from "next/link";
import { Bed, Bath, Square, Star } from "lucide-react";

const PropertyCard = ({ property }) => {
  const getRateDisplay = () => {
    const { rates } = property;
    if (rates.monthly) return `$${rates.monthly.toLocaleString()}`;
    if (rates.weekly) return `$${rates.weekly.toLocaleString()}`;
    if (rates.nightly) return `$${rates.nightly.toLocaleString()}`;
  };

  const getUnit = () => {
    const { rates } = property;
    if (rates.monthly) return "month";
    if (rates.weekly) return "week";
    return "night";
  };

  return (
    <div className="group flex flex-col gap-3">
      <Link
        href={`/properties/${property._id}`}
        className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100"
      >
        <Image
          src={property.images[0]}
          alt={property.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-3 right-3 text-white drop-shadow-md">
          <Star className="h-5 w-5 fill-white" />
        </div>
      </Link>

      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-start text-[15px]">
          <h3 className="font-bold text-gray-900 line-clamp-1">
            {property.location.city}, {property.location.state}
          </h3>
          <div className="flex items-center gap-1 font-light text-gray-600">
            <span>★ 4.9</span>
          </div>
        </div>

        <p className="text-gray-500 font-light text-[15px] line-clamp-1">
          {property.name}
        </p>

        <div className="flex items-center gap-3 text-gray-400 text-xs my-0.5">
          <span className="flex items-center gap-1">
            <Bed size={14} /> {property.beds} beds
          </span>
          <span className="flex items-center gap-1">
            <Bath size={14} /> {property.baths} baths
          </span>
          <span className="flex items-center gap-1">
            <Square size={14} /> {property.square_feet}ft²
          </span>
        </div>

        <div className="mt-1 text-[15px]">
          <span className="font-bold text-gray-900">{getRateDisplay()}</span>
          <span className="text-gray-600 font-light"> {getUnit()}</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
