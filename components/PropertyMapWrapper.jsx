"use client";

import dynamic from "next/dynamic";
import Spinner from "./Spinner";

const PropertyMap = dynamic(() => import("./PropertyMap"), {
  ssr: false,
  loading: () => <Spinner />,
});

const PropertyMapWrapper = ({ property }) => {
  return <PropertyMap property={property} />;
};

export default PropertyMapWrapper;
