import { motion } from "framer-motion";
import { User2 } from "lucide-react";

export default function MessageItem({ msg, currentUserId }) {
  const isOwn = msg?.sender?._id === currentUserId;

  return (
    <motion.div
      className={`w-full flex ${isOwn ? "justify-end" : "justify-start"} mb-6 px-6`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {!isOwn && (
        <div className="flex flex-col items-center mr-4">
          <img
            src={msg?.sender?.profilePicture || "/default-avatar.png"}
            alt={msg?.sender?.name || "User"}
            className="w-12 h-12 rounded-full border-4 border-white shadow-xl object-cover"
          />
          <span className="text-xs text-gray-500 mt-1 font-semibold">
            {msg?.sender?.name || "Anonymous"}
          </span>
        </div>
      )}

      <div
        className={`max-w-[75%] px-6 py-4 rounded-3xl shadow-xl text-lg leading-relaxed relative transition-all
        ${isOwn
            ? "bg-gradient-to-tr from-blue-600 to-blue-400 text-white rounded-br-none"
            : "bg-gradient-to-tr from-gray-200 to-gray-100 text-gray-800 rounded-bl-none"
          }`}
      >
        <p>{msg?.content || "..."}</p>
      </div>

      {isOwn && (
        <div className="flex flex-col items-center ml-4">
          <img
            src={msg?.sender?.profilePicture || "/default-avatar.png"}
            alt="You"
            className="w-12 h-12 rounded-full border-4 border-white shadow-xl object-cover"
          />
          <span className="text-xs text-gray-400 mt-1 font-semibold">You</span>
        </div>
      )}
    </motion.div>
  );
}
