import Pagination from "@/components/Pagination";
import PropertyCard from "@/components/PropertyCard";
import connectDB from "@/config/database";
import Property from "@/models/Property";

const PropertiesPage = async ({ searchParams }) => {
  const { page = 1 } = await searchParams;
  const pageNum = parseInt(page);
  await connectDB();
  const pageSize = 2;
  const totalItems = await Property.countDocuments({});
  console.log(totalItems);
  console.log(typeof pageNum, typeof pageSize, typeof totalItems);
  const skip = (pageNum - 1) * pageSize;

  const properties = await Property.find({}).skip(skip).limit(pageSize).lean();

  const showPagination = totalItems > pageSize;

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <p>No properties found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard
                key={property._id}
                property={property}
              ></PropertyCard>
            ))}
          </div>
        )}
      </div>
      {showPagination && (
        <Pagination
          page={pageNum}
          totalItems={totalItems}
          pageSize={pageSize}
        />
      )}
    </section>
  );
};

export default PropertiesPage;
