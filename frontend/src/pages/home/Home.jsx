import React from "react";
import { Link, useNavigate } from "react-router-dom";
import PropertyCard from "../../component/homePage/PropertyCard";
import Banner from "./Banner";
import PropertyCategories from "../../component/homePage/PropertyCategories";
import PopularLocations from "../../component/homePage/PopularLocations";
import FeaturedProperties from "../../component/homePage/FeatureProperty";
import {
  FiSearch,
  FiUser,
  FiHome,
  FiCheckCircle,
  FiTrendingUp,
  FiShield,
  FiAward,
} from "react-icons/fi";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50">
      <Banner />
      <PropertyCategories />
      <PopularLocations />
      <FeaturedProperties />
      <section className="py-16 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="transform hover:scale-105 transition duration-300">
              <div className="text-5xl font-bold mb-3 drop-shadow-lg">
                50,000+
              </div>
              <div className="text-blue-100 text-lg font-medium">
                Properties Listed
              </div>
              <div className="w-16 h-1 bg-white/50 mx-auto mt-4 rounded-full"></div>
            </div>
            <div className="transform hover:scale-105 transition duration-300">
              <div className="text-5xl font-bold mb-3 drop-shadow-lg">
                25,000+
              </div>
              <div className="text-blue-100 text-lg font-medium">
                Happy Customers
              </div>
              <div className="w-16 h-1 bg-white/50 mx-auto mt-4 rounded-full"></div>
            </div>
            <div className="transform hover:scale-105 transition duration-300">
              <div className="text-5xl font-bold mb-3 drop-shadow-lg">100+</div>
              <div className="text-blue-100 text-lg font-medium">
                Trusted Agencies
              </div>
              <div className="w-16 h-1 bg-white/50 mx-auto mt-4 rounded-full"></div>
            </div>
            <div className="transform hover:scale-105 transition duration-300">
              <div className="text-5xl font-bold mb-3 drop-shadow-lg">24/7</div>
              <div className="text-blue-100 text-lg font-medium">
                Customer Support
              </div>
              <div className="w-16 h-1 bg-white/50 mx-auto mt-4 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <FiTrendingUp className="w-4 h-4" />
              <span>Simple Process</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find your perfect property in Abu Dhabi with our simple 3-step
              process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center group p-8 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-6 group-hover:scale-110 transition duration-300 shadow-lg">
                <FiSearch className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-blue-500 transition duration-300">
                Search Properties
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Browse through thousands of verified properties using our
                advanced filters and intelligent search tools to find exactly
                what you need.
              </p>
            </div>

            <div className="text-center group p-8 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-6 group-hover:scale-110 transition duration-300 shadow-lg">
                <FiUser className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-blue-500 transition duration-300">
                Contact Agents
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Connect directly with verified property owners and trusted real
                estate agencies for personalized assistance.
              </p>
            </div>

            <div className="text-center group p-8 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-6 group-hover:scale-110 transition duration-300 shadow-lg">
                <FiHome className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-blue-500 transition duration-300">
                Find Your Home
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Schedule viewings, negotiate terms, and secure your perfect
                property in Abu Dhabi with our guidance.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 backdrop-blur-sm">
              <FiAward className="w-4 h-4" />
              <span>Trusted Platform</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Find Your Property?
            </h2>
            <p className="text-blue-100 text-xl lg:text-2xl mb-8 leading-relaxed">
              Join thousands of satisfied users who found their perfect property
              through our platform in Abu Dhabi
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button
                onClick={() => navigate("/properties")}
                className="group bg-white text-blue-600 hover:bg-blue-500 hover:text-white px-10 py-5 rounded-xl transition-all duration-300 font-semibold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 flex items-center space-x-3"
              >
                <FiSearch className="w-5 h-5" />
                <span>Browse All Properties</span>
              </button>

              <button
                onClick={() => navigate("/list-property")}
                className="group border-2 border-white text-white hover:bg-white hover:text-blue-600 px-10 py-5 rounded-xl transition-all duration-300 font-semibold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 flex items-center space-x-3"
              >
                <FiHome className="w-5 h-5" />
                <span>List Your Property</span>
              </button>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-white/80">
              <div className="flex items-center justify-center space-x-2">
                <FiCheckCircle className="w-5 h-5 text-black" />
                <span>Verified Properties</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <FiShield className="w-5 h-5 text-black" />
                <span>Secure Transactions</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <FiTrendingUp className="w-5 h-5 text-amber-600" />
                <span>Best Prices Guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
