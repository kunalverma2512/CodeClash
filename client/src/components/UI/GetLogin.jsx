import React from "react";
// import { useNavigate } from 'react-router-dom'

const GetLogin = ({ onClose }) => {
    const handleGetLogin = () => {
      window.location.href = "http://localhost:8080/auth/google";
    };
  
    return (
      <div className="bg-white p-8 rounded-xl shadow-2xl w-[90%] max-w-md relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-2xl"
        >
          &times;
        </button>
  
        <h2 className="text-xl font-semibold mb-4">You need to login first</h2>
        <button
          onClick={handleGetLogin}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Login with Google
        </button>
      </div>
    );
  };
  
  

export default GetLogin;
