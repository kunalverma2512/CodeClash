import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 px-6 py-12 font-inter">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* About */}
        <div>
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">CodeClash</h3>
          <p className="text-sm leading-relaxed">
            CodeClash is a next-gen platform to enhance your Competitive Programming skills using real-time analysis, personalized feedback, and problem-solving tracking.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/problems" className="hover:underline">Practice Problems</a></li>
            <li><a href="/dashboard" className="hover:underline">Dashboard</a></li>
            <li><a href="/leaderboard" className="hover:underline">Leaderboard</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/terms" className="hover:underline">Terms & Conditions</a></li>
            <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
            <li><a href="/cookies" className="hover:underline">Cookie Policy</a></li>
          </ul>
        </div>

        {/* Contact / Credits */}
        <div>
          <h4 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Contact Us</h4>
          <ul className="space-y-2 text-sm">
            <li>Email: <a href="mailto:team@codeclash.dev" className="hover:underline">team@codeclash.dev</a></li>
            <li>Maintained by: Team CodeClash</li>
            <li><a href="/contributors" className="hover:underline">Contributors</a></li>
          </ul>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-300 dark:border-gray-700 pt-6 text-center text-sm">
        &copy; {new Date().getFullYear()} CodeClash. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
