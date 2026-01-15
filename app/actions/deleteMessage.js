"use server";
import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

import { revalidatePath } from "next/cache";

async function deleteMessage(messageId) {
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
    console.log(message);
    if (!message) return { error: "message not found" };
    if (userId !== message.recipient.toString()) {
      return {
        error: "Unauthorized",
      };
    }

    await message.deleteOne();
    revalidatePath(`/`, "layout");
    return {
      success: true,
    };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong " };
  }
}
export default deleteMessage;
