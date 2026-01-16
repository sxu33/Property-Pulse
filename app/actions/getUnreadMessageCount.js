"use server";
import connectDB from "@/config/database";
import { getSessionUser } from "@/utils/getSessionUser";
import Message from "@/models/Message";

const getUnreadMessageCount = async () => {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    return { count: 0 };
  }
  const { userId } = sessionUser;
  const count = await Message.countDocuments({
    recipient: userId,
    read: false,
  });

  return { count };
};

export default getUnreadMessageCount;
