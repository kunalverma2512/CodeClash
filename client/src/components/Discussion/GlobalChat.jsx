import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import MessageItem from "./MessageItem";
import { FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";
import { BookOpenCheck, AlertCircle, Info, Sparkles } from "lucide-react";
import { fetchChatMessages } from "../../services/api";

const socket = io(import.meta.env.VITE_API_URL, { withCredentials: true });

export default function GlobalChat({ currentUser }) {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const initialLoadDone = useRef(false);

  useEffect(() => {
    fetchChatMessages(setMessages,initialLoadDone)

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off("receiveMessage");
  }, []);

  // Scroll **inside** messages container only after initial load
  useEffect(() => {
    if (initialLoadDone.current && messagesContainerRef.current) {
      // Scroll the container div to bottom
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (newMsg.trim() === "") return;
    socket.emit("sendMessage", {
      content: newMsg,
      sender: currentUser._id,
    });
    setNewMsg("");
  };

  return (
    <div className="h-screen w-full flex flex-col md:flex-row bg-gradient-to-br from-slate-100 to-white overflow-hidden">
      
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="w-full md:w-80 bg-white border-r shadow-xl px-6 py-8 flex flex-col justify-between"
      >
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-900">💬 Forum Navigation</h2>
          <nav className="space-y-5 text-gray-700 text-lg">
            <a href="#guidelines" className="flex items-center gap-2 hover:text-blue-600">
              <BookOpenCheck className="w-5 h-5" /> Community Guidelines
            </a>
            <a href="#how-to" className="flex items-center gap-2 hover:text-blue-600">
              <Info className="w-5 h-5" /> How To Use
            </a>
            <a href="#faq" className="flex items-center gap-2 hover:text-blue-600">
              <Sparkles className="w-5 h-5" /> FAQ & Tips
            </a>
            <a href="#report" className="flex items-center gap-2 hover:text-red-500">
              <AlertCircle className="w-5 h-5" /> Report Issue
            </a>
          </nav>
        </div>

        <p className="text-sm text-gray-400 pt-8">Built with ❤️ for the CodeClash community</p>
      </motion.aside>

      {/* Main Chat Section */}
      <div className="flex-1 flex flex-col">
        
        {/* Header */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white shadow-md px-8 py-6 border-b"
        >
          <h1 className="text-3xl font-extrabold text-gray-900">🌐 Global Discussion</h1>
          <p className="text-md text-gray-500 mt-1">Chat with peers, ask doubts, share insights, and collaborate in real time.</p>
        </motion.div>

        {/* Messages container with internal scroll */}
        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto px-6 py-4 bg-gradient-to-br from-gray-50 to-gray-100"
          style={{ maxHeight: "calc(100vh - 180px)" }} // limit height so internal scroll works well
        >
          {messages.map((msg) => (
            <MessageItem key={msg._id} msg={msg} currentUserId={currentUser._id} />
          ))}
          <div ref={messagesEndRef}></div>
        </div>

        {/* Chat Input */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="border-t bg-white px-6 py-4 flex items-center gap-4"
        >
          <input
            type="text"
            value={newMsg}
            onChange={(e) => setNewMsg(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message here..."
            className="flex-1 border rounded-full px-5 py-3 text-lg focus:outline-none shadow-sm"
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-md transition"
          >
            <FaPaperPlane className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
