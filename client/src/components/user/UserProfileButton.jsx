import React from "react";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const UserProfileButton = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/dashboard/userprofile")}
      className="flex items-center space-x-2 px-2 py-2  text-white rounded-full shadow hover:bg-blue-700 transition duration-200"
    >
      {user?.profilePicture ? (
        <img
          src={user.profilePicture}
          alt="Profile"
          className="w-8 h-8 rounded-full object-cover border border-white"
        />
      ) : (
        <User className="w-6 h-6" />
      )}
    </button>
  );
};

export default UserProfileButton;
