// src/pages/admin/sections/GuidelinesSection.jsx
import React from "react";

const GuidelinesSection = () => {
  return (
    <section className="min-h-screen bg-white px-8 py-16 ">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">🛡️ Admin Guidelines</h2>
        <div className="space-y-5 text-gray-800 text-lg leading-relaxed">
          <p>
            As an administrator, you are the backbone of the platform’s security,
            functionality, and user experience. The following guidelines are mandatory
            for all administrators and should be followed with precision and seriousness.
          </p>
          <p>
            <strong>1. Content Moderation:</strong> Admins are expected to review
            contests, problems, and user activities. Flag any suspicious content. Ensure
            that no problem violates copyright, and maintain academic integrity.
          </p>
          <p>
            <strong>2. Contest Management:</strong> When creating contests, double-check
            timing, descriptions, problems linked, and participant limits. Once a contest
            is published, changes should be minimal unless critical.
          </p>
          <p>
            <strong>3. Communication:</strong> Admins must maintain professionalism in
            messages, announcements, or public comments. Language should be clear,
            formal, and free from personal bias.
          </p>
          <p>
            <strong>4. Security Protocols:</strong> Never share admin credentials. Always
            log out from public devices. Any security breaches must be reported
            immediately to the technical team.
          </p>
          <p>
            <strong>5. User Privacy:</strong> Admins can view user data for moderation
            purposes only. Do not misuse user information, download data, or share it
            outside the system.
          </p>
          <p>
            <strong>6. Bug Reporting:</strong> If you discover a bug or receive complaints
            from users, document it clearly and report it to the developers through the
            contact section. Avoid patching on your own unless assigned.
          </p>
          <p>
            <strong>7. AI Feature Monitoring:</strong> For features like plagiarism
            detection, emotion monitoring, or behavior logging — admins are responsible
            for reviewing flags raised by the AI and verifying manually when needed.
          </p>
          <p>
            <strong>8. Abuse Handling:</strong> Any reports of abuse should be handled
            quickly. Use your tools to mute, block, or ban users only with evidence and
            logs preserved.
          </p>
          <p>
            <strong>9. Collaboration:</strong> Always coordinate with fellow admins on
            decision-making. Maintain a shared spreadsheet or log of changes.
          </p>
          <p>
            <strong>10. Continuous Learning:</strong> Stay updated with new features.
            Attend internal briefings if any major feature like new AI module is added.
            Your role is evolving with the system.
          </p>
        </div>
      </div>
    </section>
  );
};

export default GuidelinesSection;
