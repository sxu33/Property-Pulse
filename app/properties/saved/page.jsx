import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import PropertyCard from "@/components/PropertyCard";
import { Bookmark, House } from "lucide-react";
import { convertToSerializableObject } from "@/utils/convertToSerializableObject";

const SaveedPropertiesPage = async () => {
  await connectDB();
  const { userId } = await getSessionUser();
  if (!userId) {
    <section className="container m-auto py-24 px-6 text-center">
      <h1 className="text-2xl font-bold">
        Please log in to view saved properties.
      </h1>
    </section>;
  }
  const userDoc = await User.findById(userId).populate("bookmarks").lean();
  console.log(userDoc);
  const bookmarks = userDoc.bookmarks.map(convertToSerializableObject);

  return (
    <section className="px-4 py-8 bg-blue-50 min-h-screen">
      <div className="container-xl lg:container m-auto px-4">
        <div className="flex items-center gap-3 mb-8 border-b border-gray-200 pb-4">
          <Bookmark className="text-blue-600" size={32} />
          <h1 className="text-3xl font-bold text-gray-800">Saved Properties</h1>
        </div>

        {bookmarks.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center flex flex-col items-center">
            <House className="text-gray-300 mb-4" size={64} />
            <p className="text-xl text-gray-500 font-medium">
              You haven't saved any properties yet.
            </p>
            <p className="text-gray-400 mt-2">
              Start browsing and click the bookmark icon to save your favorites!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookmarks.map((property) => (
              <PropertyCard property={property} key={property._id} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SaveedPropertiesPage;
