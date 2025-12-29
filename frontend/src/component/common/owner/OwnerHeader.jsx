import React, { useState } from "react";
import {
  FiMenu,
  FiSearch,
  FiBell,
  FiUser,
  FiChevronDown,
} from "react-icons/fi";

const OwnerHeader = ({ onMenuClick }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Menu Button & Search */}
          <div className="flex items-center gap-4">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <FiMenu className="h-5 w-5 text-gray-600" />
            </button>

            <div className="relative max-w-xl">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="search"
                placeholder="Search properties, agents..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Right: Notifications & Profile */}
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-full hover:bg-gray-100">
              <FiBell className="h-5 w-5 text-gray-600" />
              <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
            </button>

            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100"
              >
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <FiUser className="h-4 w-4 text-blue-600" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-900">John Doe</p>
                  <p className="text-xs text-gray-500">Owner Account</p>
                </div>
                <FiChevronDown className="h-5 w-5 text-gray-500" />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <p className="font-medium text-gray-900">John Doe</p>
                    <p className="text-sm text-gray-500">john@example.com</p>
                  </div>
                  <div className="py-2">
                    <button
                      onClick={() => setShowProfileMenu(false)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Your Profile
                    </button>
                    <button
                      onClick={() => setShowProfileMenu(false)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Settings
                    </button>
                    <button
                      onClick={() => setShowProfileMenu(false)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Help & Support
                    </button>
                  </div>
                  <div className="py-2 border-t border-gray-200">
                    <button
                      onClick={() => setShowProfileMenu(false)}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default OwnerHeader;
