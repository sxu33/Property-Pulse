"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import toggleRead from "@/app/actions/toggleRead";
import deleteMessage from "@/app/actions/deleteMessage";

const MessageCard = ({ message }) => {
  const [isRead, setIsRead] = useState(message.read);
  const [isDeleted, setIsDeleted] = useState(false);
  const handleReadClick = async () => {
    const result = await toggleRead(message._id);
    if (result.error) {
      toast.error(result.error);
      return;
    }
    setIsRead(result.read);
    toast.success(`${result.read ? "Read" : "New"}`);
  };

  const handleDeleteMessage = async () => {
    const result = await deleteMessage(message._id);
    const confirmed = window.confirm("Delete this message?");
    if (!confirmed) return;

    if (result.error) {
      toast.error(result.error);
      return;
    }
    if (result.success) {
      toast.success("deleted succesfully");
      setIsDeleted(true);
    }
  };
  if (isDeleted) return null;
  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
      {!isRead && (
        <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 rounded-md">
          new
        </div>
      )}

      <h2 className="text-xl mb-4">
        <span className="font-bold">Property Inquiry:</span>{" "}
        {message.property.name}
      </h2>
      <p className="text-gray-700">{message.body}</p>

      <ul className="mt-4">
        <li>
          <strong>Name:</strong> {message.name}
        </li>

        <li>
          <strong>Reply Email:</strong>{" "}
          <a href={`mailto:${message.email}`} className="text-blue-500">
            {message.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone:</strong>{" "}
          <a href={`tel:${message.phone}`} className="text-blue-500">
            {message.phone}
          </a>
        </li>
        <li>
          <strong>Received:</strong>{" "}
          <span suppressHydrationWarning>
            {new Date(message.createdAt).toLocaleString()}
          </span>
        </li>
      </ul>
      <button
        onClick={handleReadClick}
        className={`mt-4 mr-3 ${
          isRead ? "bg-gray-300" : "bg-blue-500 text-white"
        } py-1 px-3 rounded-md`}
      >
        {isRead ? "Mark as new" : "Mark as read"}
      </button>
      <button
        className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md"
        onClick={handleDeleteMessage}
      >
        Delete
      </button>
    </div>
  );
};

export default MessageCard;
