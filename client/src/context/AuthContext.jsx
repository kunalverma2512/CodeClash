import { createContext, useEffect, useState } from "react";
import axios from "axios";
import LoadingScreen from "../components/UI/LoadingScreen";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // To handle error
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${API_URL}/auth/user`, { withCredentials: true });
        setUser(res.data);
      } catch (error) {
        toast.error("Authentication failed. Please log in again.");
        if (error.response && error.response.status === 401) {
          setUser(null);
        }
        setError("Unable to fetch user data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    if (!user) {
      checkAuth();
    } else {
      setLoading(false);
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {loading ? <LoadingScreen/> : children}
      {/* {error && <div>{error}</div>} Display error message */}
    </AuthContext.Provider>
  );
};
