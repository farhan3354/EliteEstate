import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiSearch,
  FiStar,
  FiMapPin,
  FiPhone,
  FiMail,
  FiHome,
} from "react-icons/fi";

const Agents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const locations = [
    "All",
    "Abu Dhabi",
    "Dubai",
    "Sharjah",
    "Ajman",
    "Ras Al Khaimah",
  ];

  const agents = [
    {
      id: 1,
      name: "Ahmed Al Mansouri",
      title: "Senior Real Estate Consultant",
      image: "/api/placeholder/300/300",
      location: "Abu Dhabi",
      experience: "8 years",
      properties: 47,
      rating: 4.9,
      reviews: 128,
      phone: "+971 50 123 4567",
      email: "ahmed@realestate.ae",
      specialties: ["Luxury Villas", "Commercial", "Investment"],
      languages: ["Arabic", "English", "French"],
      description:
        "Specialized in luxury properties and investment opportunities in Abu Dhabi.",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      title: "Property Investment Specialist",
      image: "/api/placeholder/300/300",
      location: "Dubai",
      experience: "6 years",
      properties: 32,
      rating: 4.8,
      reviews: 94,
      phone: "+971 55 987 6543",
      email: "sarah@realestate.ae",
      specialties: ["Apartments", "Off-Plan", "Rental"],
      languages: ["English", "Russian"],
      description: "Expert in Dubai's dynamic real estate market.",
    },
    {
      id: 3,
      name: "Mohammed Hassan",
      title: "Luxury Property Expert",
      image: "/api/placeholder/300/300",
      location: "Abu Dhabi",
      experience: "12 years",
      properties: 63,
      rating: 5.0,
      reviews: 156,
      phone: "+971 52 456 7890",
      email: "mohammed@realestate.ae",
      specialties: ["Penthouses", "Waterfront", "Luxury"],
      languages: ["Arabic", "English", "Spanish"],
      description: "Exclusive access to premium properties in Abu Dhabi.",
    },
  ];

  const filteredAgents = agents.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.specialties.some((spec) =>
        spec.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesLocation =
      selectedLocation === "" ||
      selectedLocation === "All" ||
      agent.location === selectedLocation;
    return matchesSearch && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Our Expert Agents
            </h1>
            <p className="text-gray-600">
              Connect with professional real estate agents
            </p>
          </div>
          <Link
            to="/become-agent"
            className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors duration-200 mt-4 lg:mt-0"
          >
            <FiHome className="w-5 h-5" />
            <span>Join Our Team</span>
          </Link>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search agents by name or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="relative">
              <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
              >
                <option value="">All Locations</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            <select className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>Sort by: Experience</option>
              <option>Sort by: Rating</option>
              <option>Sort by: Properties</option>
            </select>
          </div>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map((agent) => (
            <div
              key={agent.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  src={agent.image}
                  alt={agent.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {agent.location}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {agent.name}
                    </h3>
                    <p className="text-gray-600">{agent.title}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-yellow-500">
                      <FiStar className="w-4 h-4 fill-current" />
                      <span className="font-semibold">{agent.rating}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      ({agent.reviews} reviews)
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4">
                  {agent.description}
                </p>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">
                    Specialties:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {agent.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-center">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-lg font-bold text-gray-900">
                      {agent.experience}
                    </div>
                    <div className="text-xs text-gray-600">Experience</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-lg font-bold text-gray-900">
                      {agent.properties}+
                    </div>
                    <div className="text-xs text-gray-600">Properties</div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Link
                    to={`/agents/${agent.id}`}
                    className="flex-1 bg-blue-600 text-white text-center py-3 rounded-xl hover:bg-blue-700 transition-colors duration-200 font-medium"
                  >
                    View Profile
                  </Link>
                  <button className="flex items-center justify-center w-12 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors duration-200">
                    <FiPhone className="w-5 h-5" />
                  </button>
                  <button className="flex items-center justify-center w-12 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors duration-200">
                    <FiMail className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAgents.length === 0 && (
          <div className="text-center py-12">
            <FiHome className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No agents found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search criteria
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedLocation("");
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors duration-200"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Agents;
