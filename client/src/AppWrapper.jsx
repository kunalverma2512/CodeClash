import React, { useState, useEffect } from "react";
import App from "./App";
import CodeClashLoader from "./components/UI/CodeClashLoader";

const AppWrapper = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay (replace with real auth/data check if needed)
    const timer = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <CodeClashLoader />;

  return <App />;
};

export default AppWrapper;
