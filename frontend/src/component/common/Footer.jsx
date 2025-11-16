import React from "react";
import { Link } from "react-router-dom";
import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiMapPin,
  FiMail,
  FiPhone,
} from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 mt-auto border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-base sm:text-lg">
                  P
                </span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-bold text-gray-900">
                  PrimeProperties
                </span>
                <p className="text-blue-500 text-xs sm:text-sm font-medium">
                  Abu Dhabi
                </p>
              </div>
            </Link>
            <p className="text-gray-600 mb-4 sm:mb-6 max-w-md text-sm sm:text-base lg:text-lg leading-relaxed">
              Your trusted partner for finding the perfect property in Abu
              Dhabi. We offer verified listings, transparent pricing, and
              exceptional service to help you find your dream home.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-blue-500 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-orange-500/25 hover:scale-110">
                <FiFacebook className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 hover:text-white" />
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-blue-400 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-blue-400/25 hover:scale-110">
                <FiTwitter className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 hover:text-white" />
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-pink-500 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-pink-500/25 hover:scale-110">
                <FiInstagram className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 hover:text-white" />
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-blue-600 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-blue-600/25 hover:scale-110">
                <FiLinkedin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 hover:text-white" />
              </div>
            </div>
          </div>
          <div className="mt-6 lg:mt-0">
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-gray-900">
              Quick Links
            </h3>
            <ul className="space-y-3 sm:space-y-4">
              <li>
                <Link
                  to="/properties"
                  className="text-gray-600 hover:text-blue-500 transition-all duration-300 flex items-center space-x-2 group text-sm sm:text-base"
                >
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition duration-300"></div>
                  <span>Browse Properties</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-600 hover:text-blue-500 transition-all duration-300 flex items-center space-x-2 group text-sm sm:text-base"
                >
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition duration-300"></div>
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-600 hover:text-blue-500 transition-all duration-300 flex items-center space-x-2 group text-sm sm:text-base"
                >
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition duration-300"></div>
                  <span>Contact</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/agents"
                  className="text-gray-600 hover:text-blue-500 transition-all duration-300 flex items-center space-x-2 group text-sm sm:text-base"
                >
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition duration-300"></div>
                  <span>Our Agents</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/list-property"
                  className="text-gray-600 hover:text-blue-500 transition-all duration-300 flex items-center space-x-2 group text-sm sm:text-base"
                >
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition duration-300"></div>
                  <span>List Property</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="mt-6 lg:mt-0">
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-gray-900">
              Contact Info
            </h3>
            <ul className="space-y-3 sm:space-y-4 text-gray-600">
              <li className="flex items-center space-x-3 sm:space-x-4 group hover:text-blue-500 transition-all duration-300">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition duration-300 flex-shrink-0">
                  <FiMapPin className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
                <div className="min-w-0">
                  <span className="font-medium block text-sm sm:text-base">
                    Abu Dhabi, UAE
                  </span>
                  <span className="text-xs sm:text-sm text-gray-500 group-hover:text-blue-400">
                    Main Office
                  </span>
                </div>
              </li>
              <li className="flex items-center space-x-3 sm:space-x-4 group hover:text-blue-500 transition-all duration-300">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition duration-300 flex-shrink-0">
                  <FiMail className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
                <div className="min-w-0">
                  <span className="font-medium block text-sm sm:text-base break-words">
                    info@primeproperties.ae
                  </span>
                  <span className="text-xs sm:text-sm text-gray-500 group-hover:text-blue-400">
                    Email Us
                  </span>
                </div>
              </li>
              <li className="flex items-center space-x-3 sm:space-x-4 group hover:text-blue-500 transition-all duration-300">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition duration-300 flex-shrink-0">
                  <FiPhone className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
                <div className="min-w-0">
                  <span className="font-medium block text-sm sm:text-base">
                    +971 2 123 4567
                  </span>
                  <span className="text-xs sm:text-sm text-gray-500 group-hover:text-blue-400">
                    Call Us
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-300 mt-8 sm:mt-12 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 sm:space-y-4 md:space-y-0">
            <div className="text-gray-500 text-xs sm:text-sm text-center md:text-left">
              <p>&copy; 2024 PrimeProperties Abu Dhabi. All rights reserved.</p>
            </div>
            <div className="flex flex-wrap justify-center space-x-4 sm:space-x-6 text-xs sm:text-sm text-gray-500">
              <Link
                to="/privacy"
                className="hover:text-blue-500 transition duration-300 mb-1 sm:mb-0"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="hover:text-blue-500 transition duration-300 mb-1 sm:mb-0"
              >
                Terms of Service
              </Link>
              <Link
                to="/cookies"
                className="hover:text-blue-500 transition duration-300 mb-1 sm:mb-0"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
