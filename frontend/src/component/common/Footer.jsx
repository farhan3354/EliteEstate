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
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <div>
                <span className="text-2xl font-bold text-gray-900">
                  PrimeProperties
                </span>
                <p className="text-orange-500 text-sm font-medium">Abu Dhabi</p>
              </div>
            </Link>
            <p className="text-gray-600 mb-6 max-w-md text-lg leading-relaxed">
              Your trusted partner for finding the perfect property in Abu
              Dhabi. We offer verified listings, transparent pricing, and
              exceptional service to help you find your dream home.
            </p>
            <div className="flex space-x-4">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-orange-500 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-orange-500/25 hover:scale-110">
                <FiFacebook className="w-5 h-5 text-gray-600 hover:text-white" />
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-blue-400 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-blue-400/25 hover:scale-110">
                <FiTwitter className="w-5 h-5 text-gray-600 hover:text-white" />
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-pink-500 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-pink-500/25 hover:scale-110">
                <FiInstagram className="w-5 h-5 text-gray-600 hover:text-white" />
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-blue-600 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-blue-600/25 hover:scale-110">
                <FiLinkedin className="w-5 h-5 text-gray-600 hover:text-white" />
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-6 text-gray-900">
              Quick Links
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/properties"
                  className="text-gray-600 hover:text-orange-500 transition-all duration-300 flex items-center space-x-2 group"
                >
                  <div className="w-2 h-2 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition duration-300"></div>
                  <span>Browse Properties</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-600 hover:text-orange-500 transition-all duration-300 flex items-center space-x-2 group"
                >
                  <div className="w-2 h-2 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition duration-300"></div>
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-600 hover:text-orange-500 transition-all duration-300 flex items-center space-x-2 group"
                >
                  <div className="w-2 h-2 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition duration-300"></div>
                  <span>Contact</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/agents"
                  className="text-gray-600 hover:text-orange-500 transition-all duration-300 flex items-center space-x-2 group"
                >
                  <div className="w-2 h-2 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition duration-300"></div>
                  <span>Our Agents</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/list-property"
                  className="text-gray-600 hover:text-orange-500 transition-all duration-300 flex items-center space-x-2 group"
                >
                  <div className="w-2 h-2 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition duration-300"></div>
                  <span>List Property</span>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-6 text-gray-900">
              Contact Info
            </h3>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-center space-x-4 group hover:text-orange-500 transition-all duration-300">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition duration-300">
                  <FiMapPin className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span className="font-medium block">Abu Dhabi, UAE</span>
                  <span className="text-sm text-gray-500 group-hover:text-orange-400">
                    Main Office
                  </span>
                </div>
              </li>
              <li className="flex items-center space-x-4 group hover:text-orange-500 transition-all duration-300">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition duration-300">
                  <FiMail className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span className="font-medium block">
                    info@primeproperties.ae
                  </span>
                  <span className="text-sm text-gray-500 group-hover:text-orange-400">
                    Email Us
                  </span>
                </div>
              </li>
              <li className="flex items-center space-x-4 group hover:text-orange-500 transition-all duration-300">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition duration-300">
                  <FiPhone className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span className="font-medium block">+971 2 123 4567</span>
                  <span className="text-sm text-gray-500 group-hover:text-orange-400">
                    Call Us
                  </span>
                </div>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-3 text-gray-800">
                Newsletter
              </h4>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:border-orange-500 transition duration-300"
                />
                <button className="px-4 py-2 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-300 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-500 text-sm">
              <p>&copy; 2024 PrimeProperties Abu Dhabi. All rights reserved.</p>
            </div>
            <div className="flex space-x-6 text-sm text-gray-500">
              <Link
                to="/privacy"
                className="hover:text-orange-500 transition duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="hover:text-orange-500 transition duration-300"
              >
                Terms of Service
              </Link>
              <Link
                to="/cookies"
                className="hover:text-orange-500 transition duration-300"
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