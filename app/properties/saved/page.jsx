import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import PropertyCard from "@/components/PropertyCard";
import { Bookmark, Home } from "lucide-react";
import { convertToSerializableObject } from "@/utils/convertToSerializableObject";
export const dynamic = "force-dynamic";
const SavedPropertiesPage = async () => {
  await connectDB();
  const { userId } = await getSessionUser();

  if (!userId) {
    return (
      <section className="container m-auto py-24 px-6 text-center">
        <h1 className="text-2xl font-bold text-zinc-900">
          Please log in to view saved properties.
        </h1>
      </section>
    );
  }

  const userDoc = await User.findById(userId).populate("bookmarks").lean();
  const bookmarks = userDoc.bookmarks.map(convertToSerializableObject);

  return (
    <section className="px-4 py-12 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-10 border-b border-zinc-100 pb-6">
          <Bookmark className="text-[#FF385C]" size={28} />
          <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">
            Saved Properties
          </h1>
        </div>

        {bookmarks.length === 0 ? (
          <div className="py-24 text-center flex flex-col items-center border border-dashed border-zinc-200 rounded-[2rem]">
            <Home className="text-zinc-200 mb-4" size={64} />
            <p className="text-xl text-zinc-900 font-bold">
              No saved properties yet
            </p>
            <p className="text-zinc-500 mt-2 font-light">
              Click the bookmark icon on any listing to save it here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookmarks.map((property) => (
              <PropertyCard property={property} key={property._id} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedPropertiesPage;
