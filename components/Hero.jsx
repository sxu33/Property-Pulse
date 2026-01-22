import SearchForm from "./SearchForm";

const Hero = () => {
  return (
    <section className="bg-white pt-8 pb-12 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="text-center mb-10">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
            Find your next stay
          </h1>
          <p className="mt-2 text-gray-500">
            Search deals on hotels, homes, and much more...
          </p>
        </div>
        <div className="w-full max-w-4xl bg-white shadow-[0_3px_12px_rgba(0,0,0,0.1)] rounded-full border border-gray-200 p-2 flex items-center">
          <SearchForm />
        </div>
      </div>
    </section>
  );
};

export default Hero;
