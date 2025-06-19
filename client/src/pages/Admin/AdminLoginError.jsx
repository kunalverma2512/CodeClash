import React from "react";
import { useNavigate } from "react-router-dom";

const AdminLoginError = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate("/");
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 p-6">
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        Admin Login Not Allowed
      </h1>
      <p className="text-lg max-w-2xl text-gray-800 text-center">
        It appears that this Google account is already registered as a{" "}
        <strong>Participant</strong>.
        <br />
        <br />
        For security reasons, one account cannot be used to register as both{" "}
        <strong>Participant</strong> and <strong>Admin</strong>.
        <br />
        <br />
        If you believe this is a mistake or you need admin access, please
        contact the system administrator or use a different Google account to
        login as Admin.
      </p>
      <button
        className="px-7 py-5 rounded-2xl text-xl hover:cursor-pointer hover:bg-red-400 bg-red-500 text-white"
        onClick={handleGoBack}
      >
        Click to go back
      </button>
    </div>
  );
};

export default AdminLoginError;
