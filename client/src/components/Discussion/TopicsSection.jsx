const topics = [
  { title: "DSA Problems", desc: "Need help with binary trees or graphs?" },
  { title: "Web Dev", desc: "Ask about React, Tailwind, or APIs." },
  { title: "AI & ML", desc: "Discuss models, prompts, or AI tricks." },
  { title: "Competitive Programming", desc: "Share strategies and tips." },
];

const TopicsSection = () => {
  return (
    <section id="topics" className="min-h-screen bg-white px-6 py-20 text-gray-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">🔥 Popular Discussion Topics</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {topics.map((topic, idx) => (
            <a key={idx} href="#chat" className="bg-gray-100 p-6 rounded-lg hover:bg-blue-50 hover:shadow transition-all block">
              <h3 className="text-2xl font-semibold mb-2">{topic.title}</h3>
              <p className="text-lg">{topic.desc}</p>
            </a>
          ))}
        </div>
        <div className="text-center mt-10">
          <a href="#chat" className="text-blue-700 font-semibold underline">Start a conversation →</a>
        </div>
      </div>
    </section>
  );
};

export default TopicsSection;
