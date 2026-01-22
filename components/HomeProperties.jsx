import PropertyCard from "./PropertyCard";
import Link from "next/link";
import Property from "@/models/Property";
import connectDB from "@/config/database";
import { Button } from "@/components/ui/button";

const HomeProperties = async () => {
  await connectDB();
  const recentProperties = await Property.find({})
    .sort({ createdAt: -1 })
    .limit(6)
    .lean();

  return (
    <>
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              New this week
            </h2>
          </div>
          {recentProperties.length === 0 ? (
            <p className="text-gray-500">No properties found</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
              {recentProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-20 text-center">
        <Button
          asChild
          variant="outline"
          className="h-12 px-8 rounded-lg border-2 border-black font-bold text-black hover:bg-gray-50"
        >
          <Link href="/properties">Show all properties</Link>
        </Button>
      </section>
    </>
  );
};

export default HomeProperties;
