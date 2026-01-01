import connectDB from "@/config/database";
import Property from "@/models/Property";
import PropertyHeader from "@/components/PropertyHeader";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import PropertyDetails from "@/components/PropertyDetails";
import PropertyImages from "@/components/PropertyImages";

const PropertyPage = async ({ params, searchParams }) => {
  const { id } = await params;
  const { name } = await searchParams;

  await connectDB();
  const property = await Property.findById(id).lean();
  console.log(property.images);
  return (
    <>
      <PropertyHeader property={property} />
      {/* <!-- Go Back --> */}
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            href="/properties"
            className="text-blue-500 hover:text-blue-600 flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Properties
          </Link>
        </div>
      </section>
      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            {/* {property info} */}
            <PropertyDetails property={property} />
          </div>
        </div>
      </section>
      <PropertyImages images={property.images} />
    </>
  );
};

export default PropertyPage;
