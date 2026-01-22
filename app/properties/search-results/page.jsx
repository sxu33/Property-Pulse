import PropertyCard from "@/components/PropertyCard";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import SearchResultsMapWrapper from "@/components/SearchResultsMapWrapper";
import SearchForm from "@/components/SearchForm";
import { convertToSerializableObject } from "@/utils/convertToSerializableObject";
import { SearchX } from "lucide-react";

const SearchResultsPage = async ({ searchParams }) => {
  const { location, propertyType, beds, baths, minPrice, maxPrice, amenities } =
    await searchParams;

  await connectDB();

  let query = {};

  if (location) {
    const locationPattern = new RegExp(location, "i");
    query.$or = [
      { name: locationPattern },
      { description: locationPattern },
      { "location.street": locationPattern },
      { "location.city": locationPattern },
      { "location.state": locationPattern },
      { "location.zipcode": locationPattern },
    ];
  }

  if (propertyType && propertyType !== "All") {
    query.type = new RegExp(propertyType, "i");
  }

  if (beds && beds !== "Any") query.beds = { $gte: parseInt(beds) };
  if (baths && baths !== "Any") query.baths = { $gte: parseInt(baths) };

  if (minPrice || maxPrice) {
    query["rates.monthly"] = {};
    if (minPrice) query["rates.monthly"].$gte = parseInt(minPrice);
    if (maxPrice) query["rates.monthly"].$lte = parseInt(maxPrice);
  }

  if (amenities) {
    const amenitiesArray = amenities.split(",");
    query.amenities = { $all: amenitiesArray };
  }

  const propertiesQueryResults = await Property.find(query).lean();
  const properties = propertiesQueryResults.map(convertToSerializableObject);

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-white border-b border-zinc-100 sticky top-20 z-40 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <SearchForm />
        </div>
      </section>

      <section className="max-w-[1600px] mx-auto">
        <div className="flex flex-col lg:flex-row">
          <div className="flex-grow px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h1 className="text-base font-bold text-zinc-950">
                {properties.length > 0
                  ? `${properties.length} properties found`
                  : "Search results"}
              </h1>
            </div>

            {properties.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 border border-dashed border-zinc-200 rounded-[2rem] bg-zinc-50/30">
                <SearchX
                  className="text-zinc-300 mb-4"
                  size={48}
                  strokeWidth={1.5}
                />
                <h3 className="text-xl font-bold text-zinc-950">
                  No properties found
                </h3>
                <p className="text-zinc-500 font-light mt-1 text-sm">
                  Try adjusting your filters to find more results.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10">
                {properties.map((property) => (
                  <PropertyCard key={property._id} property={property} />
                ))}
              </div>
            )}
          </div>

          {properties.length > 0 && (
            <div className="hidden lg:block w-[40%] xl:w-[45%] h-[calc(100vh-161px)] sticky top-[161px]">
              <div className="h-full w-full border-l border-zinc-100">
                <SearchResultsMapWrapper properties={properties} />
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default SearchResultsPage;
