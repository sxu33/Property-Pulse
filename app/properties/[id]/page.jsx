import connectDB from "@/config/database";
import Property from "@/models/Property";
import PropertyHeader from "@/components/PropertyHeader";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import PropertyDetails from "@/components/PropertyDetails";
import PropertyImages from "@/components/PropertyImages";
import { convertToSerializableObject } from "@/utils/convertToSerializableObject";
import BookmarkButton from "@/components/BookmarkButton";
import ShareButtons from "@/components/ShareButtons";
import PropertyContactForm from "@/components/PropertyContactForm";
import { getSessionUser } from "@/utils/getSessionUser";
import User from "@/models/User";

const PropertyPage = async ({ params, searchParams }) => {
  const { id } = await params;

  await connectDB();
  const propertyDoc = await Property.findById(id).lean();
  const property = convertToSerializableObject(propertyDoc);
  let initialBookmarkStatus = false;
  const sessionUser = await getSessionUser();
  const userId = sessionUser?.userId;

  if (userId) {
    const user = await User.findById(userId);
    if (user) {
      initialBookmarkStatus = user.bookmarks.includes(id);
    }
  }

  return (
    <div className="bg-white min-h-screen">
      <PropertyHeader property={property} />
      {/* <!-- Go Back --> */}
      <section>
        <div className="max-w-6xl mx-auto py-4 px-6">
          <Link
            href="/properties"
            className="text-zinc-900 hover:underline flex items-center gap-1 text-sm font-bold"
          >
            <ChevronLeft size={14} /> Back to listings
          </Link>
        </div>
      </section>
      <section>
        <div className="max-w-6xl mx-auto pb-12 px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12">
            <PropertyDetails property={property} />
            <aside>
              <div className="sticky top-28 space-y-4">
                <PropertyContactForm property={property} />
                <div className="space-y-2 px-2">
                  <BookmarkButton
                    property={property}
                    initialBookmarkStatus={initialBookmarkStatus}
                  />
                  <ShareButtons property={property} />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <PropertyImages images={property.images} />
    </div>
  );
};

export default PropertyPage;
