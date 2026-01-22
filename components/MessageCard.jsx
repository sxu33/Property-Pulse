"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import toggleRead from "@/app/actions/toggleRead";
import deleteMessage from "@/app/actions/deleteMessage";
import { useGlobalContext } from "@/context/GlobalContext";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  Calendar,
  Home,
  Trash2,
  Check,
  RotateCcw,
  User,
} from "lucide-react";

const MessageCard = ({ message }) => {
  const [isRead, setIsRead] = useState(message.read);
  const [isDeleted, setIsDeleted] = useState(false);
  const { setUnreadCount } = useGlobalContext();

  const handleReadClick = async () => {
    const result = await toggleRead(message._id);
    if (result.error) {
      toast.error(result.error);
      return;
    }
    result.read
      ? setUnreadCount((prev) => prev - 1)
      : setUnreadCount((prev) => prev + 1);
    setIsRead(result.read);
    toast.success(`${result.read ? "Read" : "New"}`);
  };

  const handleDeleteMessage = async () => {
    const confirmed = window.confirm("Delete this message?");
    if (!confirmed) return;
    const result = await deleteMessage(message._id);
    if (result.error) {
      toast.error(result.error);
      return;
    }
    if (result.success) {
      if (!isRead) setUnreadCount((prev) => prev - 1);
      toast.success("Message deleted successfully");
      setIsDeleted(true);
    }
  };

  if (isDeleted) return null;

  return (
    <div
      className={`relative p-6 rounded-[2rem] border transition-all duration-300 ${
        isRead
          ? "bg-white border-zinc-100"
          : "bg-zinc-50/50 border-zinc-200 shadow-sm"
      }`}
    >
      {!isRead && (
        <div className="absolute top-6 right-6 flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#FF385C] animate-pulse"></span>
          <span className="text-[10px] font-black uppercase tracking-wider text-[#FF385C]">
            New
          </span>
        </div>
      )}

      <div className="flex items-center gap-2 text-zinc-950 font-bold text-lg mb-4">
        <Home size={18} className="text-zinc-400" />
        <h2 className="tracking-tight line-clamp-1">
          Inquiry: {message.property.name}
        </h2>
      </div>

      <div className="bg-white rounded-2xl p-4 border border-zinc-100 mb-6 shadow-sm">
        <p className="text-zinc-700 leading-relaxed font-light text-base italic">
          "{message.body}"
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm border-b border-zinc-100 pb-8 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500">
            <User size={16} />
          </div>
          <div>
            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
              From
            </p>
            <p className="text-zinc-950 font-semibold">{message.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500">
            <Mail size={16} />
          </div>
          <div>
            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
              Email
            </p>
            <a
              href={`mailto:${message.email}`}
              className="text-zinc-950 font-semibold hover:underline"
            >
              {message.email}
            </a>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500">
            <Phone size={16} />
          </div>
          <div>
            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
              Phone
            </p>
            <a
              href={`tel:${message.phone}`}
              className="text-zinc-950 font-semibold hover:underline"
            >
              {message.phone || "N/A"}
            </a>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500">
            <Calendar size={16} />
          </div>
          <div>
            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
              Received
            </p>
            <p className="text-zinc-950 font-semibold" suppressHydrationWarning>
              {new Date(message.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button
          onClick={handleReadClick}
          variant={isRead ? "outline" : "default"}
          className={`h-10 rounded-xl px-6 font-bold flex items-center gap-2 transition-all active:scale-[0.98] shadow-none ${
            !isRead
              ? "bg-zinc-900 text-white hover:bg-black"
              : "border-zinc-200 text-zinc-900"
          }`}
        >
          {isRead ? (
            <>
              <RotateCcw size={16} /> Mark as new
            </>
          ) : (
            <>
              <Check size={16} /> Mark as read
            </>
          )}
        </Button>
        <Button
          onClick={handleDeleteMessage}
          variant="ghost"
          className="h-10 rounded-xl px-6 font-bold text-red-500 hover:bg-red-50 hover:text-red-600 transition-all active:scale-[0.98] flex items-center gap-2"
        >
          <Trash2 size={16} />
          Delete
        </Button>
      </div>
    </div>
  );
};

export default MessageCard;
