import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const InfoBox = ({
  children,
  heading,
  backgroundColor = "bg-white",
  buttonInfo,
  icon,
}) => {
  return (
    <div
      className={`${backgroundColor} p-10 rounded-[2.5rem] border border-gray-100 flex flex-col justify-between transition-all duration-300 hover:shadow-xl group`}
    >
      <div>
        <div className="mb-6 p-4 bg-white rounded-2xl w-fit shadow-sm group-hover:shadow-md transition-shadow border border-gray-50">
          {icon}
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          {heading}
        </h2>
        <p className="mt-4 mb-8 text-gray-500 font-light leading-relaxed text-[15px]">
          {children}
        </p>
      </div>
      <Button
        asChild
        variant={buttonInfo.variant || "default"}
        className={`rounded-xl px-8 py-7 font-bold text-[15px] transition-all active:scale-95 shadow-none ${
          buttonInfo.variant === "default"
            ? "bg-[#FF385C] hover:bg-[#E31C5F] text-white border-none"
            : "border-2 border-black text-black hover:bg-gray-100"
        }`}
      >
        <Link href={buttonInfo.link} className="flex items-center gap-2">
          {buttonInfo.text}
          <ChevronRight size={18} />
        </Link>
      </Button>
    </div>
  );
};

export default InfoBox;
