"use client";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import getGeocoords from "@/utils/getGeocoords";
import Image from "next/image";
import { Loader2 } from "lucide-react";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const SearchResultsMap = ({ properties }) => {
  const [propertiesWithCoords, setPropertiesWithCoords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoordsForProperties = async () => {
      try {
        const results = [];
        for (const property of properties) {
          const address = `${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`;
          const coords = await getGeocoords(address);
          if (coords.lat !== 0 && coords.lng !== 0) {
            results.push({ ...property, lat: coords.lat, lng: coords.lng });
          }
        }
        setPropertiesWithCoords(results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (properties.length > 0) {
      fetchCoordsForProperties();
    } else {
      setLoading(false);
    }
  }, [properties]);

  if (loading)
    return (
      <div className="h-full w-full bg-white flex items-center justify-center">
        <Loader2 className="animate-spin text-[#FF385C]" size={24} />
      </div>
    );

  if (propertiesWithCoords.length === 0) return null;

  const center = [propertiesWithCoords[0].lat, propertiesWithCoords[0].lng];

  return (
    <div className="h-full w-full overflow-hidden">
      <MapContainer
        center={center}
        zoom={10}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        {propertiesWithCoords.map((prop) => (
          <Marker key={prop._id} position={[prop.lat, prop.lng]}>
            <Popup minWidth={150} maxWidth={150}>
              <div className="flex flex-col bg-white">
                <div className="relative w-full h-20 rounded-md overflow-hidden mb-1">
                  <Image
                    src={prop.images[0]}
                    alt={prop.name}
                    fill
                    className="object-cover"
                    sizes="150px"
                  />
                </div>
                <div className="px-0.5">
                  <p className="text-zinc-950 font-black text-[13px] leading-tight truncate mb-0">
                    {prop.name}
                  </p>
                  <p className="text-zinc-400 text-[9px] font-bold uppercase tracking-tight mb-1">
                    {prop.location.city}
                  </p>
                  <div className="flex items-center justify-between border-t border-zinc-100 pt-1">
                    <p className="text-zinc-950 font-black text-[11px]">
                      $
                      {prop.rates.monthly?.toLocaleString() ||
                        prop.rates.nightly?.toLocaleString()}
                      <span className="text-zinc-400 font-normal text-[8px]">
                        /mo
                      </span>
                    </p>
                    <a
                      href={`/properties/${prop._id}`}
                      className="text-[#FF385C] text-[10px] font-black no-underline"
                    >
                      Details
                    </a>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default SearchResultsMap;
