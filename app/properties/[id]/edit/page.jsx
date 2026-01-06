import PropertyEditForm from "@/components/PropertyEditForm";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { convertToSerializableObject } from "@/utils/convertToSerializableObject";

const PropertyEdit = async ({ params }) => {
  const { id } = await params;
  console.log(id);
  await connectDB();

  const propertydoc = await Property.findById(id).lean();
  if (!propertydoc) {
    return <p>No property found</p>;
  }
  const property = convertToSerializableObject(propertydoc);

  return (
    <section className="bg-blue-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <PropertyEditForm property={property} />
        </div>
      </div>
    </section>
  );
};

export default PropertyEdit;
