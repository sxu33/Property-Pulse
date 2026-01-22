"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import deleteProperty from "@/app/actions/deleteProperty";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, MapPin } from "lucide-react";

const ProfileProperties = ({ properties: initialProperties }) => {
  const [properties, setProperties] = useState(initialProperties);

  const handleDeleteProperty = async function (propertyId) {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (!confirmed) return;
    await deleteProperty(propertyId);
    const updatedProperty = properties.filter(
      (property) => property._id !== propertyId
    );
    setProperties(updatedProperty);
    toast.success("Property Deleted Successfully");
  };

  if (properties.length === 0) {
    return (
      <div className="border border-dashed border-gray-300 rounded-3xl p-12 text-center">
        <p className="text-gray-400 font-light">You have no listings yet.</p>
      </div>
    );
  }

  return properties.map((property) => (
    <div
      key={property._id}
      className="flex flex-col sm:flex-row gap-6 p-4 rounded-3xl transition-all border border-transparent hover:border-gray-100 hover:shadow-sm"
    >
      <Link
        href={`/properties/${property._id}`}
        className="relative h-48 sm:w-64 flex-shrink-0 overflow-hidden rounded-2xl bg-gray-100"
      >
        <Image
          className="object-cover transition-transform duration-500 hover:scale-110"
          src={property.images[0]}
          alt={property.name}
          fill
          sizes="(max-width: 640px) 100vw, 256px"
        />
      </Link>

      <div className="flex flex-col justify-between flex-grow py-2">
        <div>
          <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
            {property.name}
          </h3>
          <div className="flex items-center gap-1 text-gray-500 mt-2 text-sm font-light">
            <MapPin size={14} className="text-gray-400" />
            <span className="line-clamp-1">
              {property.location.street}, {property.location.city},{" "}
              {property.location.state}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-6">
          <Button
            asChild
            variant="outline"
            className="rounded-xl border-gray-200 h-11 px-6 font-semibold flex items-center gap-2 hover:bg-gray-50 transition-colors"
          >
            <Link href={`/properties/${property._id}/edit`}>
              <Edit2 size={16} />
              Edit
            </Link>
          </Button>

          <Button
            variant="ghost"
            onClick={() => handleDeleteProperty(property._id)}
            className="rounded-xl h-11 px-6 font-semibold text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors flex items-center gap-2"
          >
            <Trash2 size={16} />
            Delete
          </Button>
        </div>
      </div>
    </div>
  ));
};

export default ProfileProperties;
