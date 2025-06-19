import React from "react";
import MarkdownContent from "../UI/MarkdownContent";

const DiagnosisReport = ({ report }) => {
  const { rawAdvice } = report;

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 px-4 py-8 sm:px-6 md:px-10 lg:px-20 xl:px-32">
      <div className="w-full max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 lg:p-16 border border-blue-300">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-blue-900 mb-8 sm:mb-10 text-center leading-tight">
          CP Mentor’s Advice
        </h2>

        <MarkdownContent content={rawAdvice} />
      </div>
    </div>
  );
};

export default DiagnosisReport;
