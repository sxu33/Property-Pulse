"use client";
import dynamic from "next/dynamic";
import Spinner from "@/components/Spinner";

const SearchResultsMap = dynamic(
  () => import("@/components/SearchResultsMap"),
  {
    ssr: false,
    loading: () => <Spinner loading={true} />,
  }
);

const SearchResultsMapWrapper = ({ properties }) => {
  return <SearchResultsMap properties={properties} />;
};

export default SearchResultsMapWrapper;
