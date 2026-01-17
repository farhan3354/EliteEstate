import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiSearch,
  FiStar,
  FiMapPin,
  FiPhone,
  FiMail,
  FiHome,
} from "react-icons/fi";
import { agentAPI } from "../../services/api";

const Agents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ locations: [], specializations: [] });

  useEffect(() => {
    fetchAgents();
  }, [searchTerm, selectedLocation]);

  const fetchAgents = async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (selectedLocation && selectedLocation !== "All") params.location = selectedLocation;

      const response = await agentAPI.getAll(params);
      setAgents(response.data.data.agents);
      setFilters(response.data.data.filters);
    } catch (error) {
      console.error("Error fetching agents:", error);
    } finally {
      setLoading(false);
    }
  };

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
                placeholder="Search agents by name..."
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
                {filters.locations?.map((location) => (
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
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent) => (
              <div
                key={agent._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative">
                  <img
                    src={agent.user?.profileImage || "/default-avatar.png"}
                    alt={agent.user?.name}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/300?text=Agent";
                    }}
                  />
                  {agent.areasServed?.[0] && (
                    <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {agent.areasServed[0]}
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {agent.user?.name}
                      </h3>
                      <p className="text-gray-600">{agent.companyName || "Real Estate Agent"}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 text-yellow-500">
                        <FiStar className="w-4 h-4 fill-current" />
                        <span className="font-semibold">{agent.rating?.average || 0}</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        ({agent.rating?.totalReviews || 0} reviews)
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {agent.bio || "No bio available."}
                  </p>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">
                      Specialties:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {agent.specialization?.slice(0, 3).map((specialty, index) => (
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
                        {agent.yearsOfExperience || 0}
                      </div>
                      <div className="text-xs text-gray-600">Year Exp.</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-lg font-bold text-gray-900">
                        {agent.totalListings || 0}
                      </div>
                      <div className="text-xs text-gray-600">Properties</div>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Link
                      to={`/agents/${agent._id}`}
                      className="flex-1 bg-blue-600 text-white text-center py-3 rounded-xl hover:bg-blue-700 transition-colors duration-200 font-medium"
                    >
                      View Profile
                    </Link>
                    {agent.officePhone && (
                       <a href={`tel:${agent.officePhone}`} className="flex items-center justify-center w-12 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors duration-200">
                        <FiPhone className="w-5 h-5" />
                      </a>
                    )}
                    <a href={`mailto:${agent.user?.email}`} className="flex items-center justify-center w-12 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors duration-200">
                      <FiMail className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && agents.length === 0 && (
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
