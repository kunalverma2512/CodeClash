import React, { useState } from "react";
import DoctorForm from "../../components/Doctor/DoctorForm";
import HeroSection from "../../components/Doctor/HeroSection";
import FeaturesSection from "../../components/Doctor/FeaturesSection";
import DiagnosisReport from "../../components/Doctor/DiagnosisReport";

const DoctorCP = () => {
  const [report, setReport] = useState(null);

  return (
    <div>
      <div className="px-4">
        <div className=" bg-yellow-200 border-l-4 border-yellow-600 text-yellow-800 p-4 rounded-lg mb-6">
        <p>
          <strong>Note:</strong> Please sync your Codeforces data before using
          the Doctor to get the most accurate analysis.
        </p>
      </div>
      </div>

      <HeroSection />
      <DoctorForm setReport={setReport} />
      {report && <DiagnosisReport report={report} />}
      <FeaturesSection />
    </div>
  );
};

export default DoctorCP;
