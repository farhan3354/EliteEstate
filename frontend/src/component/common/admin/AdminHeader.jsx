import React, { useState } from "react";
// import { useAuth } from "../../context/AuthContext";

const AdminHeader = () => {
  // const { user, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Welcome back,
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your properties today.
          </p>
        </div>

        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center space-x-3 text-gray-700 hover:text-gray-900"
          >
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
              F
            </div>
            <div className="text-left">
              <p className="font-medium">Farhan</p>
              <p className="text-sm text-gray-500 capitalize">Admin</p>
            </div>
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsProfileOpen(false)}
              >
                Your Profile
              </Link>
              <button
                onClick={() => {
                  setIsProfileOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
