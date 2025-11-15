import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiMapPin, FiHome, FiChevronDown } from "react-icons/fi";

const Banner = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    category: "",
    location: "",
    keyword: "",
  });

  const propertyCategories = [
    { value: "", name: "All Categories" },
    { value: "apartment", name: "Apartments" },
    { value: "villa", name: "Villas" },
    { value: "townhouse", name: "Townhouses" },
    { value: "penthouse", name: "Penthouses" },
    { value: "commercial", name: "Commercial" },
    { value: "land", name: "Land" },
  ];

  const popularLocations = [
    "Al Reem Island",
    "Yas Island",
    "Saadiyat Island",
    "Al Raha Beach",
    "Khalifa City",
    "Mohammed Bin Zayed City",
    "Al Mushrif",
    "Al Bateen",
    "Corniche Area",
    "Tourist Club Area",
  ];

  const handleSearch = () => {
    navigate("/properties", {
      state: { searchData },
    });
  };

  const handleInputChange = (field, value) => {
    setSearchData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <section className="relative bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 text-white py-20 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-10"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-white bg-opacity-10 rounded-full -translate-y-36 translate-x-36"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white bg-opacity-5 rounded-full -translate-x-48 translate-y-48"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white border-opacity-30">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              <span className="text-sm font-semibold">
                5,000+ Premium Properties in Abu Dhabi
              </span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Find Your Perfect
              <span className="block bg-gradient-to-r from-white to-orange-100 bg-clip-text text-transparent">
                Property in Abu Dhabi
              </span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-orange-100 max-w-3xl mx-auto leading-relaxed">
              Discover exclusive properties for rent and sale across Abu Dhabi's
              most prestigious locations
            </p>
            <div className="flex justify-center items-center space-x-8 mb-12">
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-white">
                  10K+
                </div>
                <div className="text-orange-200 text-sm">Properties</div>
              </div>
              <div className="w-1 h-8 bg-orange-300 bg-opacity-50 rounded-full"></div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-white">
                  5K+
                </div>
                <div className="text-orange-200 text-sm">Happy Clients</div>
              </div>
              <div className="w-1 h-8 bg-orange-300 bg-opacity-50 rounded-full"></div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-white">
                  50+
                </div>
                <div className="text-orange-200 text-sm">Locations</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-2 shadow-2xl transform hover:shadow-3xl transition-all duration-300">
            <div className="flex flex-col lg:flex-row gap-2">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiHome className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={searchData.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                  className="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none bg-white font-medium"
                >
                  {propertyCategories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <FiChevronDown className="h-4 w-4 text-gray-400" />
                </div>
              </div>
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMapPin className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={searchData.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  className="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none bg-white font-medium"
                >
                  <option value="">All Locations</option>
                  {popularLocations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <FiChevronDown className="h-4 w-4 text-gray-400" />
                </div>
              </div>
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by keyword, property name..."
                  value={searchData.keyword}
                  onChange={(e) => handleInputChange("keyword", e.target.value)}
                  className="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 font-medium placeholder-gray-500"
                />
              </div>
              <button
                onClick={handleSearch}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-2 min-w-[140px]"
              >
                <FiSearch className="w-5 h-5" />
                <span>Search</span>
              </button>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm text-black px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border border-white border-opacity-30">
              Apartments
            </button>
            <button className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm text-black px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border border-white border-opacity-30">
              Villas
            </button>
            <button className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm text-black px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border border-white border-opacity-30">
              Luxury
            </button>
            <button className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm text-black px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border border-white border-opacity-30">
              Waterfront
            </button>
            <button className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm text-black px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border border-white border-opacity-30">
              New Projects
            </button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white border-opacity-50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white bg-opacity-50 rounded-full mt-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
