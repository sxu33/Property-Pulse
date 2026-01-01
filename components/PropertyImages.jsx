import Image from "next/image";

const PropertyImages = ({ images }) => {
  // 1. Safety Check: If no images, don't render anything
  if (!images || images.length === 0) return null;

  return (
    <section className="bg-blue-50 p-4">
      <div className="container mx-auto">
        {images.length === 1 ? (
          <div className="col-span-1">
            <Image
              src={images[0]}
              alt="Property"
              className="object-cover h-[400px] w-full rounded-xl"
              width={1800}
              height={400}
              priority={true} // Priority loading for the main image
            />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className={`
                  ${
                    images.length === 3 && index === 2
                      ? "col-span-2"
                      : "col-span-1"
                  }
                `}
              >
                <Image
                  src={image}
                  alt={`Property Image ${index + 1}`}
                  className="object-cover h-[400px] w-full rounded-xl"
                  width={1200}
                  height={400}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyImages;
