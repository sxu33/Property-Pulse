import connectDB from "@/config/database";
import { getSessionUser } from "@/utils/getSessionUser";
import Message from "@/models/Message";
import MessageCard from "@/components/MessageCard";
import "@/models/Property";
import { convertToSerializableObject } from "@/utils/convertToSerializableObject";

const MessagePage = async () => {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw Error("No authorization");
  }
  const { userId } = sessionUser;

  const [readMessages, unreadMessages] = await Promise.all([
    Message.find({ recipient: userId, read: true })
      .sort({ createdAt: -1 })
      .populate("sender", "username")
      .populate("property", "name")
      .lean(),
    Message.find({ recipient: userId, read: false })
      .sort({ createdAt: -1 })
      .populate("sender", "username")
      .populate("property", "name")
      .lean(),
  ]);

  const messages = [...unreadMessages, ...readMessages].map((messageDoc) => {
    const message = convertToSerializableObject(messageDoc);
    message.sender = convertToSerializableObject(messageDoc.sender);
    message.property = convertToSerializableObject(messageDoc.property);
    return message;
  });

  return (
    <section className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-zinc-950 tracking-tight">
            Your Messages
          </h1>
          <p className="text-zinc-500 font-light mt-2 text-lg leading-relaxed">
            View and manage inquiries for your properties.
          </p>
        </div>

        <div className="space-y-8">
          {messages.length === 0 ? (
            <div className="text-center py-24 border border-dashed border-zinc-200 rounded-[3rem] bg-zinc-50/30">
              <p className="text-zinc-400 font-light text-xl italic">
                You have no messages at the moment.
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <MessageCard key={message._id.toString()} message={message} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default MessagePage;
