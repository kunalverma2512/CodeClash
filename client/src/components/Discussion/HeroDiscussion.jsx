import { ArrowDown } from "lucide-react";

const HeroDiscussion = () => {
  return (
    <section className="h-screen w-full bg-gradient-to-br from-blue-600 to-indigo-900 text-white flex flex-col items-center justify-center px-6">
      <h1 className="text-5xl md:text-6xl font-extrabold text-center mb-6 drop-shadow-lg">CodeClash Discussion Forum</h1>
      <p className="text-xl md:text-2xl max-w-3xl text-center mb-8">
        Collaborate, debate, and grow together. Ask questions, share ideas, and join coding conversations.
      </p>
      <a href="#chat" className="bg-white text-blue-700 px-6 py-3 rounded-xl shadow hover:bg-gray-100 font-semibold text-lg transition-all duration-300">
        Join Global Chat
      </a>
      <ArrowDown className="mt-10 animate-bounce h-8 w-8" />
    </section>
  );
};

export default HeroDiscussion;
