import { createContext, useEffect, useState } from "react";
import axios from "axios";
import LoadingScreen from "../components/UI/LoadingScreen";
import { toast } from "react-toastify";

// Automatically uses Vercel env OR localhost
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${API_URL}/auth/user`, {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (error) {
        // Don’t toast if no session exists — it's not an error
        if (error.response && error.response.status === 401) {
          setUser(null);
        } else {
          toast.error("Unable to verify user.");
        }
        setError("Unable to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    checkAuth(); // ✅ Always check once on initial load
  }, []); // ✅ Empty dependency — do not include `user`

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {loading ? <LoadingScreen /> : children}
    </AuthContext.Provider>
  );
};
