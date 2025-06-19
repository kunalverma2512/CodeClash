import React from 'react';

const EthicsFaqSection = () => {
  return (
    <section className="min-h-screen bg-gradient-to-r from-yellow-50 to-yellow-100 p-10">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-yellow-800 mb-6">🤝 Ethics & FAQs</h2>
        <div className="space-y-6 text-gray-800 text-lg leading-relaxed">
          <p><strong>Why is ethics important in competitive programming?</strong><br />
          Ethics preserve the spirit of fair competition. When participants play by the rules, the platform becomes trustworthy and valuable.</p>

          <p><strong>What happens if plagiarism is detected?</strong><br />
          A detailed report is generated. The user is notified and may be temporarily suspended. Repeat offenders face permanent action.</p>

          <p><strong>Can admins edit submissions?</strong><br />
          No. Admins cannot and should not tamper with user code. Only visibility settings or deletion (in case of abuse) is permitted.</p>

          <p><strong>How should we deal with unfair ratings or appeals?</strong><br />
          Provide a clear appeal form. Each case must be reviewed based on evidence from submission logs and timestamps.</p>

          <p><strong>Can users report admins?</strong><br />
          Yes. Transparency applies both ways. Misuse of admin power is treated seriously. A separate audit admin oversees such cases.</p>
        </div>
      </div>
    </section>
  );
};

export default EthicsFaqSection;
