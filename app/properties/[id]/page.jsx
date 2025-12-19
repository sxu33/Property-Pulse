import connectDB from "@/config/database";
import Property from "@/models/Property";
import PropertyHeader from "@/components/PropertyHeader";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const PropertyPage = async ({ params, searchParams }) => {
  const { id } = await params;
  const { name } = await searchParams;

  await connectDB();
  const property = await Property.findById(id).lean();

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
      <section class="bg-blue-50">
        <div class="container m-auto py-10 px-6">
          <div class="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            {/* {property info} */}
          </div>
        </div>
      </section>
    </>
  );
};

export default PropertyPage;
