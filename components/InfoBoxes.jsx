import InfoBox from "./InfoBox";
import { Search, Home } from "lucide-react";

const InfoBoxes = () => {
  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
          <InfoBox
            heading="For Renters"
            icon={<Search className="h-6 w-6 text-[#FF385C]" />}
            buttonInfo={{
              text: "Browse Properties",
              link: "/properties",
              variant: "outline",
            }}
          >
            Find your dream rental property. Bookmark properties and contact
            owners.
          </InfoBox>
          <InfoBox
            heading="For Property owners"
            backgroundColor="bg-gray-50"
            icon={<Home className="h-6 w-6 text-[#FF385C]" />}
            buttonInfo={{
              text: "Add Property",
              link: "/properties/add",
              variant: "default",
            }}
          >
            List your properties and reach potential tenants. Rent as an airbnb
            or long term.
          </InfoBox>
        </div>
      </div>
    </section>
  );
};

export default InfoBoxes;
