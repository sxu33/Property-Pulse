import PropertyAddForm from "@/components/PropertyAddForm";

const AddPropertyPage = () => {
  return (
    <section className="bg-white min-h-screen">
      <div className="container mx-auto max-w-3xl py-12 px-4">
        <div className="bg-white">
          <PropertyAddForm />
        </div>
      </div>
    </section>
  );
};

export default AddPropertyPage;
