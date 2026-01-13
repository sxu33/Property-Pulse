import PropertyCard from "@/components/PropertyCard";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import SearchResultsMapWrapper from "@/components/SearchResultsMapWrapper";
import SearchForm from "@/components/SearchForm";
import { convertToSerializableObject } from "@/utils/convertToSerializableObject";

const SearchResultsPage = async ({ searchParams }) => {
  // 1. fetch all the parameters
  const { location, propertyType, beds, baths, minPrice, maxPrice, amenities } =
    await searchParams;

  await connectDB();

  let query = {};

  // --- location ---
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

  // --- beds & baths ---
  if (beds && beds !== "Any") query.beds = { $gte: parseInt(beds) };
  if (baths && baths !== "Any") query.baths = { $gte: parseInt(baths) };

  // --- Price ---

  if (minPrice || maxPrice) {
    query["rates.monthly"] = {};
    if (minPrice) query["rates.monthly"].$gte = parseInt(minPrice);
    if (maxPrice) query["rates.monthly"].$lte = parseInt(maxPrice);
  }

  // --- Amenities ---

  if (amenities) {
    const amenitiesArray = amenities.split(",");

    query.amenities = { $all: amenitiesArray };
  }

  const propertiesQueryResults = await Property.find(query).lean();
  const properties = propertiesQueryResults.map(convertToSerializableObject);

  return (
    <>
      <section className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <SearchForm />
        </div>
      </section>

      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              {properties.length === 0 ? (
                <div className="text-center mt-10">
                  <h3 className="text-2xl font-bold mb-4">
                    No Properties Found
                  </h3>
                  <p className="text-gray-500">Try adjusting your filters.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {properties.map((property) => (
                    <PropertyCard key={property._id} property={property} />
                  ))}
                </div>
              )}
            </div>
            {properties.length > 0 && (
              <div className="hidden lg:block h-[800px]">
                <SearchResultsMapWrapper properties={properties} />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default SearchResultsPage;
