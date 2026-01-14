"use server";
import connectDB from "@/config/database";
import Message from "@/models/Message";

import { getSessionUser } from "@/utils/getSessionUser";

async function addMessage(previousState, formData) {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    return {
      error: "User Id is required",
    };
  }
  const { userId } = sessionUser;

  const recipient = formData.get("recipient");
  const property = formData.get("property");

  if (userId === recipient) {
    return {
      error: "You can not send message to yourself",
    };
  }
  const messageData = {
    sender: userId,

    recipient,
    property,

    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    body: formData.get("body"),
    read: false,
  };

  const newMessage = new Message(messageData);
  await newMessage.save();

  return {
    submitted: true,
  };
}

export default addMessage;
