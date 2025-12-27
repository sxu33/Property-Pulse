import PropertyAddForm from "@/components/PropertyAddForm";
import Property from "@/models/Property";

const AddPropertyPage = () => {
  return (
    <section class="bg-blue-50">
      <div class="container m-auto max-w-2xl py-24">
        <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <PropertyAddForm />
        </div>
      </div>
    </section>
  );
};

export default AddPropertyPage;
