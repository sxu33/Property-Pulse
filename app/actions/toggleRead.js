"use server";

import connectDB from "@/config/database";

import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

const toggleRead = async (messageId) => {
  try {
    await connectDB();
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return {
        error: "User Id is required",
      };
    }

    const { userId } = sessionUser;
    const message = await Message.findById(messageId);

    if (!message) return { error: "message not found" };
    if (userId !== message.recipient.toString()) {
      return {
        error: "Unauthorized",
      };
    }

    message.read = !message.read;

    await message.save();
    revalidatePath(`/messages`, "page");

    return {
      read: message.read,
    };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong " };
  }
};

export default toggleRead;
