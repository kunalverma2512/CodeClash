import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import MainLayout from "./components/layout/MainLayout";
import LandingPage from "./pages/welcome/LandingPage";
// import AboutUs from "./pages/welcome/AboutUs";
// import Features from "./pages/welcome/Features";
// import ContactPage from "./pages/welcome/ContactPage";
import Dashboard from "./pages/user/Dashboard";
import ProtectedRoute from "./utils/ProtectedRoute";
import ProblemSetPage from "./pages/ProblemSet/ProblemSetPage";
// import ProblemDetails from "./pages/ProblemSet/ProblemDetails";
import ContestsList from "./pages/contests/ContestsList";
import ContestDetails from "./pages/contests/ContestDetails";
import ProblemPage from "./pages/contests/ProblemPage";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminRoute from "./utils/AdminRoute";
import AdminLoginError from "./pages/Admin/AdminLoginError";
import CreateContest from "./pages/Admin/CreateContest";
import SubmissionDetails from "./components/Submissions/SubmissionDetails";
import Submissions from "./components/Submissions/Submissions";
import UserProfile from "./pages/Profile/UserProfile";
import Discussion from "./pages/Discussion/Discussion";
import DoctorCP from "./pages/DoctorCP/DoctorCP";
import NotFoundPage from "./pages/welcome/NotFoundPage";

const pageTransition = {
  initial: { opacity: 0, x: 0, y: 20 },
  animate: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -20 },
  transition: { duration: 0.3 },
};

const App = () => {
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageTransition}
        style={{ minHeight: "100vh" }}
      >
        <Routes location={location} key={location.pathname}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<LandingPage />} />
            {/* <Route path="/about" element={<AboutUs />} />
            <Route path="/features" element={<Features />} />
            <Route path="/contact" element={<ContactPage />} /> */}

            {/* Protected Pages */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/problemset"
              element={
                <ProtectedRoute>
                  <ProblemSetPage />
                </ProtectedRoute>
              }
            />

            {/* <Route
              path="/problems/:problemId"
              element={
                <ProtectedRoute>
                  <ProblemDetails />
                </ProtectedRoute>
              }
            /> */}
            <Route
              path="/dashboard/contests"
              element={
                <ProtectedRoute>
                  <ContestsList />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard/contests/:cid"
              element={
                <ProtectedRoute>
                  <ContestDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/contests/:cid/problems/:pid"
              element={
                <ProtectedRoute>
                  <ProblemPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard/submissions/all-submissions"
              element={
                <ProtectedRoute>
                  <Submissions />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard/submissions/:id"
              element={
                <ProtectedRoute>
                  <SubmissionDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/userprofile"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/discussion"
              element={
                <ProtectedRoute>
                  <Discussion/>
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard/doctor-cp"
              element={
                <ProtectedRoute>
                  <DoctorCP/>
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin-dashboard"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />

            <Route
              path="/admin-dashboard/create-contest"
              element={
                <AdminRoute>
                  <CreateContest />
                </AdminRoute>
              }
            />
          </Route>
          <Route path="/admin-login-error" element={<AdminLoginError />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

export default App;
