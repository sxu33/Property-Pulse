"use client";
import Image from "next/image";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import { Grid } from "lucide-react";

const PropertyImages = ({ images }) => {
  if (!images || images.length === 0) return null;

  const totalCount = images.length;
  const displayImages = images.slice(0, 3);

  return (
    <Gallery>
      <section className="bg-white py-4">
        <div className="max-w-6xl mx-auto px-6">
          <div className="relative group">
            <div
              className={`grid gap-2 overflow-hidden rounded-[2rem] h-[300px] md:h-[450px] ${
                totalCount === 1
                  ? "grid-cols-1"
                  : totalCount === 2
                  ? "grid-cols-2"
                  : "grid-cols-1 md:grid-cols-3"
              }`}
            >
              <div
                className={`relative h-full w-full cursor-pointer ${
                  totalCount >= 3 ? "md:col-span-2" : ""
                }`}
              >
                <Item
                  original={images[0]}
                  thumbnail={images[0]}
                  width="1600"
                  height="1200"
                >
                  {({ ref, open }) => (
                    <Image
                      src={images[0]}
                      ref={ref}
                      onClick={open}
                      alt="Property 1"
                      fill
                      className="object-cover hover:brightness-95 transition-all duration-300"
                      priority
                    />
                  )}
                </Item>
              </div>

              {totalCount > 1 && (
                <div
                  className={`grid gap-2 ${
                    totalCount >= 3 ? "grid-cols-2 md:grid-cols-1" : ""
                  }`}
                >
                  {images.slice(1, 3).map((image, index) => (
                    <div
                      key={index}
                      className="relative h-full w-full cursor-pointer"
                    >
                      <Item
                        original={image}
                        thumbnail={image}
                        width="1600"
                        height="1200"
                      >
                        {({ ref, open }) => (
                          <Image
                            src={image}
                            ref={ref}
                            onClick={open}
                            alt={`Property ${index + 2}`}
                            fill
                            className="object-cover hover:brightness-95 transition-all duration-300"
                          />
                        )}
                      </Item>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {totalCount > 1 && (
              <div className="absolute bottom-4 right-4">
                <Item
                  original={images[0]}
                  thumbnail={images[0]}
                  width="1600"
                  height="1200"
                >
                  {({ ref, open }) => (
                    <button
                      ref={ref}
                      onClick={open}
                      className="bg-white border border-zinc-950 rounded-xl px-4 py-2 flex items-center gap-2 text-sm font-black shadow-xl hover:bg-zinc-50 active:scale-95 transition-all text-zinc-950"
                    >
                      <Grid size={16} strokeWidth={2.5} />
                      {totalCount > 3
                        ? `Show all ${totalCount} photos`
                        : "View Album"}
                    </button>
                  )}
                </Item>
              </div>
            )}

            <div className="hidden">
              {images.slice(3).map((image, index) => (
                <Item
                  key={index}
                  original={image}
                  thumbnail={image}
                  width="1600"
                  height="1200"
                >
                  {({ ref, open }) => <div ref={ref} onClick={open} />}
                </Item>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Gallery>
  );
};

export default PropertyImages;
