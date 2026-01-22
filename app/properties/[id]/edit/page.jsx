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
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <p className="text-zinc-500 font-light">No property found</p>
      </div>
    );
  }
  const property = convertToSerializableObject(propertydoc);

  return (
    <section className="bg-white min-h-screen">
      <div className="container mx-auto max-w-4xl py-12 px-4 sm:px-6">
        <div className="bg-white">
          <PropertyEditForm property={property} />
        </div>
      </div>
    </section>
  );
};

export default PropertyEdit;
