import React from "react";
import { Link } from "react-router-dom";
import {
  FiHome,
  FiSearch,
  FiArrowLeft,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center mt-16">
          <div className="relative mb-12">
            <div className="text-9xl font-bold text-blue-100">404</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-40 h-40 mx-auto relative">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-32 h-24 bg-blue-500 rounded-t-lg"></div>
                    <div className="w-36 h-8 bg-blue-400 rounded-b-lg"></div>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                      <div className="w-8 h-8 bg-blue-600"></div>
                    </div>
                    <div className="absolute top-4 left-8 w-6 h-8 bg-blue-300 rounded"></div>
                    <div className="absolute top-4 right-8 w-6 h-8 bg-blue-300 rounded"></div>
                  </div>
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center animate-bounce">
                    <FiSearch className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                    <FiMapPin className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Property Not Found
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Oops! The property you're looking for seems to have been sold or
            rented out. Don't worry though, we have plenty of other amazing
            properties waiting for you!
          </p>
          <div className="max-w-xl mx-auto mb-12">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for properties, locations, or agents..."
                className="block w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
              <button className="absolute right-2 top-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                Search
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Link
              to="/"
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <FiHome className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Go Home</h3>
              <p className="text-gray-600 text-sm">
                Return to our homepage and browse featured properties
              </p>
            </Link>

            <Link
              to="/properties"
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <FiSearch className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">
                Browse Properties
              </h3>
              <p className="text-gray-600 text-sm">
                Explore our extensive collection of available properties
              </p>
            </Link>

            <Link
              to="/contact"
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <FiPhone className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Contact Support</h3>
              <p className="text-gray-600 text-sm">
                Get help from our customer support team
              </p>
            </Link>
          </div>
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Check Out These Featured Properties Instead
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  id: 1,
                  title: "Modern Downtown Apartment",
                  price: "$2,500/month",
                  location: "New York, NY",
                  beds: 2,
                  baths: 2,
                },
                {
                  id: 2,
                  title: "Luxury Beach Villa",
                  price: "$1.2M",
                  location: "Miami, FL",
                  beds: 4,
                  baths: 3,
                },
                {
                  id: 3,
                  title: "Family Suburban Home",
                  price: "$750,000",
                  location: "Austin, TX",
                  beds: 3,
                  baths: 2,
                },
              ].map((property) => (
                <Link
                  key={property.id}
                  to={`/property/${property.id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="h-40 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-4xl mb-2">🏠</div>
                      <div className="font-bold">
                        {property.title.split(" ")[0]}
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-1">
                      {property.title}
                    </h3>
                    <div className="flex items-center text-gray-600 text-sm mb-2">
                      <FiMapPin className="h-4 w-4 mr-1" />
                      {property.location}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-600 font-bold">
                        {property.price}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {property.beds} bed • {property.baths} bath
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.history.back()}
              className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <FiArrowLeft className="h-5 w-5" />
              Go Back
            </button>
            <Link
              to="/"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <FiHome className="h-5 w-5" />
              Back to Homepage
            </Link>
          </div>
         
        </div>
      </main>
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default NotFound;
