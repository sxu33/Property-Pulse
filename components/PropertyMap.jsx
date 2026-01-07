"use client";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Spinner from "./Spinner";

import getGeocoords from "@/utils/getGeocoords";
// Fix the icon
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
        console.log(address);
        const { lat, lng } = await getGeocoords(address);
        if ((lat === 0, lng === 0)) {
          setGeocodeError(true);
        } else {
          setLat(lat);
          setLng(lng);
        }
      } catch (error) {
        console.log(error);
        setGeocodeError(true);
      } finally {
        console.log(lat, lng);
        setLoading(false);
      }
    };
    fetchCoords();
  }, [property]);
  if (loading) return <Spinner loading={loading} />;
  if (geocodeError)
    return <div className="text-red-500">No location found</div>;

  return (
    <MapContainer
      center={[lat, lng]}
      zoom={14}
      scrollWheelZoom={false}
      className="h-[500px] w-full rounded-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />

      <Marker position={[lat, lng]}>
        <Popup>{property.name}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default PropertyMap;
