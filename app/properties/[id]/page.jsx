import connectDB from "@/config/database";
import Property from "@/models/Property";
import PropertyHeader from "@/components/PropertyHeader";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
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
  const { name } = await searchParams;

  await connectDB();
  const propertyDoc = await Property.findById(id).lean();
  const property = convertToSerializableObject(propertyDoc);
  let initialBookmarkStatus = false;
  const sessionUser = await getSessionUser();
  console.log(sessionUser);
  const userId = sessionUser?.userId;
  console.log(userId);
  if (userId) {
    const user = await User.findById(userId);
    console.log(user);
    if (user) {
      initialBookmarkStatus = user.bookmarks.includes(id);
    }
  }

  console.log(initialBookmarkStatus);

  return (
    <>
      <PropertyHeader property={property} />
      {/* <!-- Go Back --> */}
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            href="/properties"
            className="text-blue-500 hover:text-blue-600 flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Properties
          </Link>
        </div>
      </section>
      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70-30 w-full gap-6">
            {/* {property info} */}
            <PropertyDetails property={property} />
            <aside>
              <BookmarkButton
                property={property}
                initialBookmarkStatus={initialBookmarkStatus}
              />
              <ShareButtons />
              <PropertyContactForm />
            </aside>
          </div>
        </div>
      </section>

      <PropertyImages images={property.images} />
    </>
  );
};

export default PropertyPage;
