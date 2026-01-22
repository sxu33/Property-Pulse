"use client";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

const PropertyMap = dynamic(() => import("./PropertyMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] md:h-[500px] w-full bg-zinc-50 rounded-[2rem] flex items-center justify-center border border-zinc-100">
      <Loader2 className="animate-spin text-[#FF385C]" size={40} />
    </div>
  ),
});

const PropertyMapWrapper = ({ property }) => {
  return <PropertyMap property={property} />;
};

export default PropertyMapWrapper;
