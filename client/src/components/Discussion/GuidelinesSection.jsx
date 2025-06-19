const rules = [
  { title: "Respect Others", desc: "Speak kindly. Everyone is learning." },
  { title: "Stay on Topic", desc: "Help others with coding, no spam." },
  { title: "No Promotion", desc: "Avoid advertising or personal links." },
  { title: "Use Threads", desc: "Respond in threads for clarity." },
  { title: "Be Helpful", desc: "Offer constructive responses." },
];

const GuidelinesSection = () => {
  return (
    <section id="guidelines" className="min-h-screen w-full px-6 py-20 bg-gray-100 text-gray-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">📜 Community Guidelines</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {rules.map((rule, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
              <h3 className="text-2xl font-semibold mb-2">{rule.title}</h3>
              <p className="text-lg">{rule.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <a href="https://www.codeofconduct.com" target="_blank" className="text-blue-700 font-medium underline">
            View Full Code of Conduct →
          </a>
        </div>
      </div>
    </section>
  );
};

export default GuidelinesSection;
