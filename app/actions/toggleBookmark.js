"use server";

import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

const toggleBookmark = async (propertyId) => {
  try {
    await connectDB();
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return {
        error: "User Id is required",
      };
    }

    const { userId } = sessionUser;
    const user = await User.findById(userId);
    if (!user) {
      return {
        error: "User not found",
      };
    }
    let isBookmarked = user.bookmarks.includes(propertyId);
    let message = "";

    if (isBookmarked) {
      user.bookmarks.pull(propertyId);
      message = "Bookmark removed";
      isBookmarked = false;
    } else {
      user.bookmarks.addToSet(propertyId);
      message = "Bookmark added";
      isBookmarked = true;
    }

    await user.save();
    revalidatePath(`/properties/${propertyId}`, "page");
    revalidatePath("/properties/saved", "page");
    return {
      message,
      isBookmarked,
    };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong " };
  }
};

export default toggleBookmark;
