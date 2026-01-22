"use client";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Loader2 } from "lucide-react";
import getGeocoords from "@/utils/getGeocoords";
import Image from "next/image";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const PropertyMap = ({ property }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [loading, setLoading] = useState(true);
  const [geocodeError, setGeocodeError] = useState(false);

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const address = `${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`;
        const { lat, lng } = await getGeocoords(address);
        if (lat === 0 && lng === 0) {
          setGeocodeError(true);
        } else {
          setLat(lat);
          setLng(lng);
        }
      } catch (error) {
        setGeocodeError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchCoords();
  }, [property]);

  if (loading)
    return (
      <div className="h-[300px] w-full bg-zinc-50 rounded-2xl flex items-center justify-center border border-zinc-100">
        <Loader2 className="animate-spin text-[#FF385C]" size={24} />
      </div>
    );

  if (geocodeError) return null;

  return (
    <div className="relative h-[300px] w-full overflow-hidden rounded-2xl border border-zinc-200">
      <MapContainer
        center={[lat, lng]}
        zoom={14}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        <Marker position={[lat, lng]}>
          <Popup minWidth={150} maxWidth={150}>
            <div className="flex flex-col bg-white">
              <div className="relative w-full h-20 rounded-md overflow-hidden mb-1">
                <Image
                  src={property.images[0]}
                  alt={property.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="px-0.5">
                <p className="text-zinc-950 font-black text-[13px] leading-tight truncate mb-0">
                  {property.name}
                </p>
                <p className="text-zinc-400 text-[9px] font-bold uppercase tracking-tight mb-1">
                  {property.location.city}
                </p>
                <div className="border-t border-zinc-100 pt-1">
                  <span className="text-zinc-950 font-black text-[11px]">
                    {property.rates.nightly
                      ? `$${property.rates.nightly.toLocaleString()}`
                      : "$ -"}
                  </span>
                  {property.rates.nightly && (
                    <span className="text-zinc-400 font-normal text-[8px]">
                      /night
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default PropertyMap;
