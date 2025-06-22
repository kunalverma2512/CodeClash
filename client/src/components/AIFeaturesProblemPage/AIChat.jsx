import React, { useState, useRef, useEffect } from "react";
import { SendHorizonal, Bot, RefreshCw } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const TypingBubble = () => (
  <div className="flex items-center gap-3 animate-pulse text-blue-500">
    <Bot size={24} />
    <div className="flex space-x-1">
      <span className="w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-200"></span>
      <span className="w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-400"></span>
      <span className="w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-600"></span>
    </div>
  </div>
);

const promptButtons = [
  {
    label: "Explain",
    color: "from-indigo-500 to-blue-500",
    prompt: "Explain this code clearly.",
    ring: "ring-indigo-300",
  },
  {
    label: "Find Bugs",
    color: "from-rose-500 to-pink-500",
    prompt: "Find bugs in this code.",
    ring: "ring-rose-300",
  },
  {
    label: "Complexity",
    color: "from-amber-400 to-yellow-500",
    prompt: "Calculate time and space complexity of this code.",
    ring: "ring-amber-200",
  },
  {
    label: "Hints",
    color: "from-emerald-500 to-teal-400",
    prompt: "Give me hints to solve this without revealing the solution.",
    ring: "ring-emerald-200",
  },
];

const AiChat = ({ code, language }) => {
  const [messages, setMessages] = useState([
    {
      role: "system",
      content:
        "You are an assistant helping users understand programming problems. Be concise and helpful.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatWindowRef = useRef(null);
  const messagesEndRef = useRef(null);
  const hasMounted = useRef(false);
  const prevMessagesLength = useRef(messages.length);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    if (messages.length > prevMessagesLength.current) {
      const timeout = setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      return () => clearTimeout(timeout);
    }
    prevMessagesLength.current = messages.length;
  }, [messages]);

  const sendMessage = async (customPrompt = null) => {
    const userPrompt = customPrompt || input.trim();
    if (!userPrompt) return;

    const updatedMessages = [
      ...messages,
      { role: "user", content: userPrompt },
    ];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/ai/problem/chat`,
        {
          messages: updatedMessages,
          code,
          language,
        },
        { withCredentials: true }
      );

      const warnMessage = `🚫 Notice: This assistant is designed exclusively for helping with programming, technical concepts, and educational topics.
❗ Please avoid unrelated, non-academic, or inappropriate questions.
✅ Staying on-topic ensures a helpful and respectful experience for everyone.
🧠 Feel free to ask about code, bugs, logic, or concepts — I’m here to help you learn!
🙏 Let's keep the conversation focused on technology and education.`;

      let reply = res.data.reply;
      if (res.data.violation) {
        reply = warnMessage;
      }

      setMessages([...updatedMessages, { role: "assistant", content: reply }]);
    } catch (err) {
      setMessages([
        ...updatedMessages,
        { role: "assistant", content: "❌ Error: Could not get AI response." },
      ]);
      toast.error(err.message || "Error sending message");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!loading) sendMessage();
    }
  };

  return (
    <>
      <style>
        {`
          .glass {
            // background: rgba(255,255,255,0.15);
            // box-shadow: 0 8px 32px 0 rgba(31,38,135,0.18);
            // backdrop-filter: blur(12px);
            // border-radius: 20px;
            border: 1px solid rgba(255,255,255,0.18);
          }
          .scrollbar-thin::-webkit-scrollbar { width: 8px; }
          .scrollbar-thin::-webkit-scrollbar-thumb { background: #a0aec0; border-radius: 10px; }
        `}
      </style>
      <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden bg-white text-gray-900">
        {/* Sidebar */}
        <aside className="w-full md:w-80 min-w-[260px] max-w-full md:max-w-[340px] p-6 md:p-8 flex-shrink-0 flex flex-col glass shadow-xl bg-white/60 border border-blue-100">
          <div className="mb-10">
            <h2 className="text-3xl font-bold tracking-tight drop-shadow bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              AI Code Assistant
            </h2>
          </div>
          <div className="flex flex-col gap-4 mb-auto">
            {promptButtons.map((btn, idx) => (
              <button
                key={idx}
                onClick={() => sendMessage(btn.prompt)}
                className={`w-full px-5 py-3 rounded-xl font-semibold transition shadow-lg bg-gradient-to-r ${btn.color} hover:scale-105 focus:outline-none focus:ring-2 ${btn.ring}`}
                style={{ color: "#fff", letterSpacing: "0.02em" }}
              >
                {btn.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => {
              setMessages([
                {
                  role: "system",
                  content:
                    "You are an assistant helping users understand programming problems. Be concise and helpful.",
                },
              ]);
              setInput("");
            }}
            className="mt-10 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center gap-2 text-sm text-white shadow"
          >
            <RefreshCw size={18} /> Reset Chat
          </button>
          <footer className="mt-10 text-xs text-gray-500">
            Made with ❤️ by CodeClash
          </footer>
        </aside>

        {/* Chat Area */}
        <main className="flex-1 flex flex-col justify-between p-0 min-h-0 overflow-hidden">
          <div className="flex-1 p-4 md:p-8 overflow-y-auto space-y-6 md:space-y-8 scrollbar-thin glass bg-white border border-blue-100">
            {messages.filter((m) => m.role !== "system").length === 0 && (
              <div className="text-gray-400 text-center mt-32 select-none text-lg">
                Start a conversation with the AI about your code 💡
              </div>
            )}
            {messages
              .filter((msg) => msg.role !== "system")
              .map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex items-end gap-3 ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.role === "assistant" && (
                    <div className="bg-gradient-to-br from-blue-400 to-cyan-400 p-2 rounded-full shadow">
                      <Bot size={22} className="text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[70%] rounded-2xl px-6 py-4 text-base shadow-lg ${
                      msg.role === "user"
                        ? "bg-gradient-to-br from-blue-300 to-cyan-200 text-gray-900 ml-auto"
                        : "bg-blue-50 text-gray-900"
                    }`}
                  >
                    <ReactMarkdown
                      children={msg.content}
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                      components={{
                        code({ node, inline, className, children, ...props }) {
                          const match = /language-(\w+)/.exec(className || "");
                          return !inline && match ? (
                            <SyntaxHighlighter
                              style={oneDark}
                              language={match[1]}
                              PreTag="div"
                              {...props}
                            >
                              {String(children).replace(/\n$/, "")}
                            </SyntaxHighlighter>
                          ) : (
                            <code
                              className="bg-gray-200 text-gray-900 rounded px-1 py-0.5"
                              {...props}
                            >
                              {children}
                            </code>
                          );
                        },
                      }}
                    />
                  </div>
                </div>
              ))}
            {loading && <TypingBubble />}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="border-t border-white/20 px-4 md:px-8 py-4 md:py-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
          >
            <textarea
              rows={1}
              maxLength={2000}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message here..."
              className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition shadow bg-blue-50 text-gray-900 placeholder-gray-500"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="w-full sm:w-auto flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 p-3 text-white font-bold shadow-lg transition hover:scale-105 hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <SendHorizonal size={22} />
            </button>
          </form>
        </main>
      </div>
    </>
  );
};

export default AiChat;
