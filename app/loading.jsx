"use client";
import { Loader2 } from "lucide-react";

const LoadingPage = () => {
  return (
    <div className="min-h-[60vh] w-full flex items-center justify-center bg-white">
      <Loader2
        className="animate-spin text-[#FF385C]"
        size={48}
        strokeWidth={2}
      />
    </div>
  );
};

export default LoadingPage;
