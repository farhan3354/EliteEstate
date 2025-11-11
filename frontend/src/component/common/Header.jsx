import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="text-xl font-bold text-gray-800">
              PrimeProperties
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="text-gray-600 hover:text-blue-600 transition duration-300 font-medium"
            >
              Home
            </Link>
            <Link
              to="/properties"
              className="text-gray-600 hover:text-blue-600 transition duration-300 font-medium"
            >
              Browse
            </Link>
            <Link
              to="/about"
              className="text-gray-600 hover:text-blue-600 transition duration-300 font-medium"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-gray-600 hover:text-blue-600 transition duration-300 font-medium"
            >
              Contact
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <button className="hidden sm:flex items-center space-x-2 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-lg transition duration-300">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span>Login</span>
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition duration-300 font-medium">
              List Property
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
