"use client";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

const SearchResultsMap = dynamic(
  () => import("@/components/SearchResultsMap"),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full bg-zinc-50 flex items-center justify-center">
        <Loader2 className="animate-spin text-[#FF385C]" size={40} />
      </div>
    ),
  }
);

const SearchResultsMapWrapper = ({ properties }) => {
  return <SearchResultsMap properties={properties} />;
};

export default SearchResultsMapWrapper;
