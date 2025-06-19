import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      {/* Toggle button for mobile */}
      <button
        data-drawer-target="codeforces-sidebar"
        data-drawer-toggle="codeforces-sidebar"
        aria-controls="codeforces-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none"
      >
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 4h16M2 10h16M2 16h16" />
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        id="codeforces-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-white border-r border-gray-200"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-white">
          <h2 className="text-xl font-bold mb-6 text-center text-blue-700">Codeforces Clone</h2>
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="/dashboard"
                className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-blue-100"
              >
                <span className="ml-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="flex items-center w-full p-2 text-gray-700 transition rounded-lg hover:bg-blue-100"
                data-collapse-toggle="contests-submenu"
                aria-controls="contests-submenu"
                aria-expanded="false"
              >
                <span className="flex-1 ml-3 text-left whitespace-nowrap">Contests</span>
                <svg
                  className="w-4 h-4 ml-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <ul id="contests-submenu" className="hidden py-2 space-y-2 pl-6">
                <li>
                  <Link
                    to="/contests/upcoming"
                    className="block p-2 text-gray-600 rounded hover:bg-blue-100"
                  >
                    Upcoming Contests
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contests/past"
                    className="block p-2 text-gray-600 rounded hover:bg-blue-100"
                  >
                    Past Contests
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <button
                type="button"
                className="flex items-center w-full p-2 text-gray-700 transition rounded-lg hover:bg-blue-100"
                data-collapse-toggle="problems-submenu"
                aria-controls="problems-submenu"
                aria-expanded="false"
              >
                <span className="flex-1 ml-3 text-left whitespace-nowrap">Problems</span>
                <svg
                  className="w-4 h-4 ml-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <ul id="problems-submenu" className="hidden py-2 space-y-2 pl-6">
                <li>
                  <Link
                    to="/problems/all"
                    className="block p-2 text-gray-600 rounded hover:bg-blue-100"
                  >
                    All Problems
                  </Link>
                </li>
                <li>
                  <Link
                    to="/problems/sets"
                    className="block p-2 text-gray-600 rounded hover:bg-blue-100"
                  >
                    Problem Sets
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link
                to="/ranking"
                className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-blue-100"
              >
                <span className="ml-3">Ranking</span>
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-blue-100"
              >
                <span className="ml-3">Profile</span>
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-blue-100"
              >
                <span className="ml-3">Settings</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
