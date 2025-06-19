import React, { useState } from "react";
import axios from "axios";
import { Bot, X } from "lucide-react";

const AIAssistantChat = ({ code, pid }) => {
  const [open, setOpen] = useState(false);
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newChat = [...chat, { role: "user", text: input }];
    setChat(newChat);
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8080/api/ai/chat", {
        message: input,
        code,
        pid,
      });
      setChat([...newChat, { role: "ai", text: res.data.reply }]);
      setInput("");
    } catch {
      setChat([...newChat, { role: "ai", text: "Something went wrong!" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-12 right-12 bg-blue-600 text-white rounded-full p-3 shadow-lg z-50"
      >
        <Bot />
      </button>

      {open && (
        <div className="fixed bottom-6 right-6 w-80 h-[400px] bg-white rounded-lg shadow-lg flex flex-col z-50 border border-gray-300">
          <div className="flex items-center justify-between px-3 py-2 border-b">
            <span className="font-semibold text-gray-700">AI Assistant</span>
            <X
              size={18}
              className="cursor-pointer"
              onClick={() => setOpen(false)}
            />
          </div>
          <div className="flex-1 overflow-y-auto p-3 text-sm space-y-2">
            {chat.map((msg, idx) => (
              <div
                key={idx}
                className={`${
                  msg.role === "user"
                    ? "text-right text-blue-600"
                    : "text-left text-gray-700"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="p-2 border-t flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-2 py-1 border rounded text-sm"
              placeholder="Ask about your code..."
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 text-white px-3 rounded text-sm"
              disabled={loading}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistantChat;
