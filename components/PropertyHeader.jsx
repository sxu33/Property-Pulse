import Image from "next/image";

const PropertyHeader = ({ property }) => {
  return (
    <section className="w-full h-[40vh] md:h-[60vh] relative overflow-hidden">
      <Image
        src={property.images[0]}
        alt={property.name}
        className="object-cover"
        fill
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/5"></div>
    </section>
  );
};

export default PropertyHeader;
