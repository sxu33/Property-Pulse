import { Bed, Bath, Maximize, Check, X, MapPin } from "lucide-react";
import PropertyMapWrapper from "./PropertyMapWrapper";

const PropertyDetails = ({ property }) => {
  return (
    <main className="space-y-6">
      <div className="border-b border-zinc-200 pb-6">
        <div className="text-zinc-900 font-bold text-sm mb-1">
          {property.type}
        </div>
        <h1 className="text-4xl font-bold text-zinc-950 tracking-tight mb-2">
          {property.name}
        </h1>
        <div className="flex items-center gap-1 text-zinc-900">
          <MapPin size={16} className="shrink-0" />
          <p className="text-sm font-medium underline">
            {property.location.street} {property.location.city},{" "}
            {property.location.state} {property.location.zipcode}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-8 py-2 border-b border-zinc-200 pb-6">
        <div className="flex items-center gap-2">
          <Bed size={20} className="text-zinc-900" />
          <span className="text-lg font-bold text-zinc-950">
            {property.beds}{" "}
            <span className="font-normal text-zinc-600">beds</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Bath size={20} className="text-zinc-900" />
          <span className="text-lg font-bold text-zinc-950">
            {property.baths}{" "}
            <span className="font-normal text-zinc-600">baths</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Maximize size={18} className="text-zinc-900" />
          <span className="text-lg font-bold text-zinc-950">
            {property.square_feet}{" "}
            <span className="font-normal text-zinc-600">sqft</span>
          </span>
        </div>
      </div>

      <div className="border-b border-zinc-200 pb-6">
        <h3 className="text-xl font-bold text-zinc-950 mb-3">
          About this place
        </h3>
        <p className="text-zinc-800 leading-snug font-normal text-base">
          {property.description}
        </p>
      </div>

      <div className="border-b border-zinc-200 pb-6">
        <h3 className="text-xl font-bold text-zinc-950 mb-4">
          What this place offers
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2">
          {property.amenities.map((amenity, index) => (
            <li key={index} className="flex items-center gap-3 text-zinc-900">
              <Check className="text-zinc-900" size={18} strokeWidth={3} />
              <span className="text-[15px] font-medium">{amenity}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-b border-zinc-200 pb-6">
        <h3 className="text-xl font-bold text-zinc-950 mb-4">
          Rates & Options
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {["nightly", "weekly", "monthly"].map((type) => (
            <div
              key={type}
              className="border border-zinc-300 rounded-xl p-3 flex flex-col items-center gap-0.5"
            >
              <span className="text-[10px] font-black uppercase text-zinc-500 tracking-wider">
                {type}
              </span>
              <div className="text-lg font-bold text-zinc-950">
                {property.rates[type] ? (
                  `$${property.rates[type].toLocaleString()}`
                ) : (
                  <X className="text-zinc-300" size={18} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl overflow-hidden border border-zinc-200 h-80">
        <PropertyMapWrapper property={property} />
      </div>
    </main>
  );
};

export default PropertyDetails;
