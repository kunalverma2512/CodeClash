import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import GetLogin from "../UI/GetLogin";
import UserProfileButton from "../user/UserProfileButton";
import { googleAdminLogin, googleLogin, logout } from "../../services/api";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { user, setUser } = useContext(AuthContext);

  const handleLogin = () => {
    googleLogin();
  };

  const handleAdminLogin = () => {
    googleAdminLogin();
  };

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  const handleProblemSet = () => {
    if (user) {
      navigate("/problemset");
    } else {
      setShowLoginModal(true);
    }
  };

  const handleContests = () => {
    if (user) {
      navigate("/dashboard/contests");
    } else {
      setShowLoginModal(true);
    }
  };

  const handleCreateContest = () => {
    if (user && user.role === "admin") {
      navigate("admin-dashboard/create-contest");
    } else {
      setShowLoginModal(true);
    }
  };

  const handleGoToSubmissions = () => {
    if (!user) {
      setShowLoginModal(true);
    }
    navigate("/dashboard/submissions/all-submissions");
  };

  const handleDiscussion = () => {
    if (!user) {
      setShowLoginModal(true);
    }
    navigate("/dashboard/discussion");
  };

  const handleMeetDoctorCP = () => {
    if (!user) {
      setShowLoginModal(true);
    }
    navigate("/dashboard/doctor-cp");
  };

  const handleHomeClick = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }

  return (
    <header className="">
      <nav className="bg-white border-gray-200 px-4 py-2.5 dark:bg-gray-800 relative z-50">
        <div className="flex flex-col lg:flex-row justify-between items-center mx-auto max-w-screen-2xl w-full gap-2 text-center">
          <a href="/" className="flex items-center">
            <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">
              Code<span className="text-blue-400">Clash</span>
            </span>
          </a>
          <div className="flex items-center lg:order-2">
            {user ? (
              <div className="flex justify-center items-center">
                <button
                  onClick={handleLogout}
                  className="hover:cursor-pointer text-gray-800 dark:text-white bg-blue-500 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                >
                  Logout
                </button>
                <UserProfileButton />
              </div>
            ) : (
              <>
                <button
                  onClick={handleAdminLogin}
                  className="hover:cursor-pointer text-gray-800 dark:text-white bg-blue-500 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                >
                  Login as Admin
                </button>

                <button
                  onClick={handleLogin}
                  className="hover:cursor-pointer text-gray-800 dark:text-white bg-blue-500 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                >
                  Login
                </button>
              </>
            )}

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} // <<<< This toggles
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`w-6 h-6 ${isMobileMenuOpen ? "hidden" : "block"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <svg
                className={`w-6 h-6 ${isMobileMenuOpen ? "block" : "hidden"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          {/* ✅ Desktop Nav */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8 lg:order-1">
            <ul className="flex items-center space-x-6 text-sm font-medium">
              <li>
                <button
                    onClick={handleHomeClick}
                    className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  >
                    Home
                  </button>
              </li>
              {user?.role === "admin" && (
                <li>
                  <button
                    onClick={handleCreateContest}
                    className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400"
                  >
                    Create Contest
                  </button>
                </li>
              )}
              {user?.role !== "admin" && (
                <>
                  <li>
                    <button
                      onClick={handleProblemSet}
                      className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400"
                    >
                      CF ProblemSet
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleDiscussion}
                      className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400"
                    >
                      Discussion
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleMeetDoctorCP}
                      className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400"
                    >
                      Meet Doctor CP
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleContests}
                      className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400"
                    >
                      Contests
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleGoToSubmissions}
                      className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400"
                    >
                      Submissions
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* ✅ Mobile Dropdown Menu */}
          {isMobileMenuOpen && (
            <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 z-50 shadow-md rounded-b-lg px-4 py-4 lg:hidden">
              <ul className="flex flex-col justify-center items-center space-y-3 text-sm font-medium">
                <li>
                  <button
                    onClick={handleHomeClick}
                    className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  >
                    Home
                  </button>
                </li>
                {user?.role === "admin" && (
                  <li>
                    <button
                      onClick={handleCreateContest}
                      className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                    >
                      Create Contest
                    </button>
                  </li>
                )}
                {user?.role !== "admin" && (
                  <>
                    <li>
                      <button
                        onClick={handleProblemSet}
                        className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                      >
                        CF ProblemSet
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={handleDiscussion}
                        className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                      >
                        Discussion
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={handleMeetDoctorCP}
                        className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400"
                      >
                        Meet Doctor CP
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={handleContests}
                        className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                      >
                        Contests
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={handleGoToSubmissions}
                        className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                      >
                        Submissions
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          )}
        </div>
      </nav>
      {showLoginModal && !user && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Dimmed Background */}
          <div className="absolute inset-0 bg-black/60 bg-opacity-50"></div>

          {/* Actual Modal */}
          <div className="relative z-10">
            <GetLogin onClose={() => setShowLoginModal(false)} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
