import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import AppWrapper from "./AppWrapper.jsx";  // Use the wrapper here
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ToastContainer } from 'react-toastify';
import AppWrapper from "./AppWrapper.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AppWrapper />
        <ToastContainer />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
