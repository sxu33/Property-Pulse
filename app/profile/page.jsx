import Image from "next/image";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import profileDefault from "@/assets/images/profile.png";
import ProfileProperties from "@/components/ProfileProperties";
import { convertToSerializableObject } from "@/utils/convertToSerializableObject";
import { Mail, User } from "lucide-react";
export const dynamic = "force-dynamic";
const ProfilePage = async () => {
  await connectDB();
  const sessionUser = await getSessionUser();
  const { userId } = sessionUser;
  if (!userId) {
    throw new Error("User id is required");
  }

  const propertiesdoc = await Property.find({ owner: userId }).lean();
  const properties = propertiesdoc.map(convertToSerializableObject);

  return (
    <section className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
          <div className="md:w-1/3 lg:w-1/4">
            <div className="sticky top-28 border border-gray-200 rounded-[2rem] p-8 shadow-[0_6px_16px_rgba(0,0,0,0.12)]">
              <div className="flex flex-col items-center md:items-start">
                <div className="relative mb-6">
                  <Image
                    className="h-32 w-32 md:h-40 md:w-40 rounded-full object-cover shadow-inner"
                    src={sessionUser.user.image || profileDefault}
                    alt="User"
                    width={160}
                    height={160}
                  />
                  <div className="absolute bottom-1 right-1 bg-[#FF385C] p-2 rounded-full border-4 border-white">
                    <User className="text-white h-4 w-4" />
                  </div>
                </div>

                <div className="space-y-4 w-full">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                      {sessionUser.user.name}
                    </h1>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center gap-3 text-gray-600">
                    <Mail size={18} className="text-gray-400" />
                    <span className="text-sm truncate">
                      {sessionUser.user.email}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-2/3 lg:w-3/4">
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                Your listings
              </h2>
              <p className="text-gray-500 font-light mt-1">
                Manage your properties and keep them up to date.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8">
              <ProfileProperties properties={properties} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
