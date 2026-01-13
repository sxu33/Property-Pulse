"use client";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import getGeocoords from "@/utils/getGeocoords"; // 你的 geocode 工具函数
import Spinner from "@/components/Spinner";
import Image from "next/image";

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

  if (loading) return <Spinner loading={loading} />;

  if (propertiesWithCoords.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        No mappable properties found
      </div>
    );
  }

  // set the first property's geocoords as the center
  const center = [propertiesWithCoords[0].lat, propertiesWithCoords[0].lng];

  return (
    <div className="h-full w-full rounded-lg overflow-hidden border sticky top-4">
      <MapContainer
        center={center}
        zoom={10}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        {/* Create marker for each property's coords */}
        {propertiesWithCoords.map((prop) => (
          <Marker key={prop._id} position={[prop.lat, prop.lng]}>
            {/* popup */}
            <Popup>
              <div className="w-[160px]">
                {/* image */}
                <div className="relative w-full h-[100px] mb-2">
                  <Image
                    src={prop.images[0]}
                    alt={prop.name}
                    fill
                    className="object-cover rounded"
                    sizes="160px"
                  />
                </div>
                {/* 2. Title */}
                <strong className="text-sm block mb-1 leading-tight truncate">
                  {prop.name}
                </strong>
                {/* 3. price */}
                <span className="text-xs text-gray-600 block mb-1">
                  {prop.rates.monthly
                    ? `$${prop.rates.monthly.toLocaleString()} /mo`
                    : prop.rates.weekly
                    ? `$${prop.rates.weekly.toLocaleString()} /wk`
                    : `$${prop.rates.nightly.toLocaleString()} /night`}
                </span>
                {/* 4. Detailes link */}
                <a
                  href={`/properties/${prop._id}`}
                  className="inline-block bg-blue-500 text-white text-xs px-2 py-1 rounded hover:bg-blue-600 no-underline"
                >
                  View Details
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default SearchResultsMap;
