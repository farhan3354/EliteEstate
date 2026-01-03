import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../../utils/routeapi";
import {
  FiSearch,
  FiStar,
  FiX,
  FiBriefcase,
  FiMapPin,
  FiUsers,
  FiChevronLeft,
  FiInfo,
  FiPercent,
} from "react-icons/fi";

const AssignAgent = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  const [agents, setAgents] = useState([]);
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState("");
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [showAgentDetails, setShowAgentDetails] = useState(false);
  const [loading, setLoading] = useState(true);
  const [agentLoading, setAgentLoading] = useState(false);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [specializationFilter, setSpecializationFilter] = useState("all");
  const [minExperience, setMinExperience] = useState("0");
  const [locationFilter, setLocationFilter] = useState("all");

  // Agreement form
  const [agreement, setAgreement] = useState({
    commissionRate: "5",
    commissionType: "percentage",
    isExclusive: true,
    startDate: new Date().toISOString().split("T")[0],
    endDate: "",
    terms: "",
    responsibilities: [
      "Property listing and marketing",
      "Arranging viewings",
      "Negotiation with potential buyers/tenants",
      "Documentation and paperwork",
      "Follow-up and updates",
    ],
    paymentTerms: "Upon successful transaction completion",
    minCommissionAmount: "",
  });

  // Fetch available agents
  const fetchAgents = async () => {
    try {
      setLoading(true);
      const params = {
        specialization:
          specializationFilter !== "all" ? specializationFilter : undefined,
        location: locationFilter !== "all" ? locationFilter : undefined,
        minExperience: minExperience !== "0" ? minExperience : undefined,
        search: searchTerm || undefined,
      };

      const response = await api.get("/agents/verified", {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });

      if (response.data.success) {
        setAgents(response.data.data.agents || []);
      }
    } catch (error) {
      console.error("Error fetching agents:", error);
      alert("Failed to load agents. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch owner's properties
  const fetchOwnerProperties = async () => {
    try {
      const response = await api.get("/agents/owner/properties", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setProperties(response.data.data.properties || []);
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
      alert("Failed to load properties.");
    }
  };

  // Fetch agent details
  const fetchAgentDetails = async (agentId) => {
    try {
      setAgentLoading(true);
      const response = await api.get(
        `/agent-assignments/agent/${agentId}/availability`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setSelectedAgent(response.data.data);
        setShowAgentDetails(true);
      }
    } catch (error) {
      console.error("Error fetching agent details:", error);
      alert("Failed to load agent details.");
    } finally {
      setAgentLoading(false);
    }
  };

  // Handle agent selection
  const handleAgentSelect = (agent) => {
    setSelectedAgent(agent);
    setShowAgentDetails(true);
    fetchAgentDetails(agent._id);
  };

  // Handle assignment submission
  const handleAssignAgent = async () => {
    if (!selectedProperty || !selectedAgent) {
      alert("Please select both a property and an agent.");
      return;
    }

    if (
      !agreement.commissionRate ||
      agreement.commissionRate < 1 ||
      agreement.commissionRate > 20
    ) {
      alert("Please enter a valid commission rate (1-20%).");
      return;
    }

    if (
      window.confirm(
        "Are you sure you want to assign this agent to the selected property?"
      )
    ) {
      try {
        const response = await api.post(
          "/agent-assignments/assign",
          {
            propertyId: selectedProperty,
            agentId: selectedAgent._id,
            agreement,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data.success) {
          alert("Agent assignment request sent successfully!");
          navigate("/owner-dashboard/my-properties");
        }
      } catch (error) {
        console.error("Error assigning agent:", error);
        alert(error.response?.data?.message || "Failed to assign agent.");
      }
    }
  };

  useEffect(() => {
    if (token) {
      fetchAgents();
      fetchOwnerProperties();
    }
  }, [token]);

  // Get specialization options from agents
  const specializationOptions = [
    ...new Set(agents.flatMap((agent) => agent.specialization || [])),
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading agents...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Link
              to="/owner-dashboard"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <FiChevronLeft className="h-5 w-5" />
              <span>Back to Dashboard</span>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Assign Agent to Property
              </h1>
              <p className="text-gray-600 mt-2">
                Select a property and assign a verified agent to manage it
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-200">
            <div className="flex items-start gap-3">
              <FiInfo className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-blue-800 font-medium mb-1">
                  How it works:
                </p>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Select one of your properties</li>
                  <li>• Browse and select a verified agent</li>
                  <li>• Review agent details and availability</li>
                  <li>• Set commission and agreement terms</li>
                  <li>
                    • Agent will receive your request and can accept or decline
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Property Selection & Agent List */}
          <div className="lg:col-span-2">
            {/* Property Selection */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FiBriefcase className="h-5 w-5 text-blue-600" />
                Select Your Property
              </h2>

              {properties.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-gray-600 mb-4">
                    No active properties found.
                  </p>
                  <Link
                    to="/owner-dashboard/add-property"
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Add Property
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {properties.map((property) => (
                    <div
                      key={property._id}
                      className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                        selectedProperty === property._id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedProperty(property._id)}
                    >
                      <div className="flex items-start gap-4">
                        {property.images && property.images.length > 0 ? (
                          <img
                            src={property.images[0]}
                            alt={property.title}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                            <FiBriefcase className="h-8 w-8 text-gray-400" />
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 mb-1">
                            {property.title}
                          </h3>
                          <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                            <FiMapPin className="h-4 w-4" />
                            <span>
                              {property.location?.area ||
                                property.location?.city}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-blue-600">
                              AED {property.price?.toLocaleString()}
                            </span>
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                property.status === "active"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {property.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Agent Search & Filters */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Search agents by name, specialization..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && fetchAgents()}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <select
                    value={specializationFilter}
                    onChange={(e) => setSpecializationFilter(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Specializations</option>
                    {specializationOptions.map((spec) => (
                      <option key={spec} value={spec}>
                        {spec.replace("_", " ").toUpperCase()}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={fetchAgents}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                  >
                    Search
                  </button>
                </div>
              </div>

              {/* Agents List */}
              <div className="space-y-4">
                {agents.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600">
                      No agents found matching your criteria.
                    </p>
                  </div>
                ) : (
                  agents.map((agent) => (
                    <div
                      key={agent._id}
                      className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${
                        selectedAgent?._id === agent._id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                      onClick={() => handleAgentSelect(agent)}
                    >
                      <div className="flex items-start gap-4">
                        {/* Agent Avatar */}
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          {agent.user?.profileImage ? (
                            <img
                              src={agent.user.profileImage}
                              alt={agent.user?.name}
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            <span className="text-2xl font-bold text-blue-600">
                              {agent.user?.name?.charAt(0) || "A"}
                            </span>
                          )}
                        </div>

                        {/* Agent Info */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-bold text-gray-900 text-lg">
                                {agent.user?.name}
                              </h3>
                              <p className="text-gray-600 text-sm">
                                {agent.user?.email}
                              </p>
                            </div>
                            <div className="flex items-center gap-1">
                              <FiStar className="h-5 w-5 text-yellow-500" />
                              <span className="font-bold">
                                {agent.rating?.average?.toFixed(1) || "N/A"}
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-3 mb-3">
                            {agent.specialization?.map((spec, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                              >
                                {spec.replace("_", " ").toUpperCase()}
                              </span>
                            ))}
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <FiBriefcase className="h-4 w-4 text-gray-400" />
                              <span>{agent.yearsOfExperience || 0} years</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FiUsers className="h-4 w-4 text-gray-400" />
                              <span>{agent.totalListings || 0} listings</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FiPercent className="h-4 w-4 text-gray-400" />
                              <span>
                                {agent.commissionRate || 5}% commission
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FiMapPin className="h-4 w-4 text-gray-400" />
                              <span>
                                {agent.officeAddress ? "Office" : "Remote"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Agent Details & Assignment Form */}
          <div>
            {showAgentDetails && selectedAgent && (
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
                {/* Agent Details */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900">
                      Agent Details
                    </h2>
                    <button
                      onClick={() => setShowAgentDetails(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <FiX className="h-5 w-5" />
                    </button>
                  </div>

                  {agentLoading ? (
                    <div className="text-center py-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    </div>
                  ) : (
                    <>
                      {/* Agent Profile */}
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                          {selectedAgent.user?.profileImage ? (
                            <img
                              src={selectedAgent.user.profileImage}
                              alt={selectedAgent.user?.name}
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            <span className="text-3xl font-bold text-blue-600">
                              {selectedAgent.user?.name?.charAt(0) || "A"}
                            </span>
                          )}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {selectedAgent.user?.name}
                          </h3>
                          <p className="text-gray-600">
                            {selectedAgent.user?.email}
                          </p>
                          <div className="flex items-center gap-1 mt-1">
                            <FiStar className="h-4 w-4 text-yellow-500" />
                            <span className="font-medium">
                              {selectedAgent.rating?.average?.toFixed(1) ||
                                "N/A"}
                              <span className="text-gray-500 text-sm ml-1">
                                ({selectedAgent.rating?.totalReviews || 0}{" "}
                                reviews)
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Agent Stats */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 p-4 rounded-xl">
                          <div className="text-2xl font-bold text-blue-600">
                            {selectedAgent.yearsOfExperience || 0}
                          </div>
                          <div className="text-sm text-gray-600">
                            Years Experience
                          </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-xl">
                          <div className="text-2xl font-bold text-green-600">
                            {selectedAgent.totalListings || 0}
                          </div>
                          <div className="text-sm text-gray-600">
                            Total Listings
                          </div>
                        </div>
                      </div>

                      {/* Specializations */}
                      <div className="mb-6">
                        <h4 className="font-medium text-gray-900 mb-2">
                          Specializations
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedAgent.specialization?.map((spec, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                            >
                              {spec.replace("_", " ").toUpperCase()}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Availability */}
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">
                            Availability
                          </h4>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              selectedAgent.availability
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {selectedAgent.availability
                              ? "Available"
                              : "Unavailable"}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Current workload: {selectedAgent.currentWorkload || 0}{" "}
                          active assignments
                        </p>
                      </div>

                      {/* Bio */}
                      {selectedAgent.bio && (
                        <div className="mb-6">
                          <h4 className="font-medium text-gray-900 mb-2">
                            Bio
                          </h4>
                          <p className="text-sm text-gray-600">
                            {selectedAgent.bio}
                          </p>
                        </div>
                      )}

                      {/* Assignment Form */}
                      <div className="border-t pt-6">
                        <h4 className="font-medium text-gray-900 mb-4">
                          Assignment Terms
                        </h4>

                        {/* Commission Rate */}
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Commission Rate (%)
                          </label>
                          <div className="flex items-center gap-3">
                            <input
                              type="number"
                              min="1"
                              max="20"
                              step="0.5"
                              value={agreement.commissionRate}
                              onChange={(e) =>
                                setAgreement({
                                  ...agreement,
                                  commissionRate: e.target.value,
                                })
                              }
                              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-600">%</span>
                          </div>
                        </div>

                        {/* Exclusive Agreement */}
                        <div className="mb-4">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={agreement.isExclusive}
                              onChange={(e) =>
                                setAgreement({
                                  ...agreement,
                                  isExclusive: e.target.checked,
                                })
                              }
                              className="h-4 w-4 text-blue-600 rounded"
                            />
                            <span className="ml-2 text-sm text-gray-700">
                              Exclusive agreement (agent will be sole
                              representative)
                            </span>
                          </label>
                        </div>

                        {/* Terms */}
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Additional Terms
                          </label>
                          <textarea
                            value={agreement.terms}
                            onChange={(e) =>
                              setAgreement({
                                ...agreement,
                                terms: e.target.value,
                              })
                            }
                            rows="3"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Any specific terms or conditions..."
                          />
                        </div>

                        {/* Submit Button */}
                        <button
                          onClick={handleAssignAgent}
                          disabled={
                            !selectedProperty || !selectedAgent.availability
                          }
                          className={`w-full py-3 rounded-xl font-medium ${
                            !selectedProperty || !selectedAgent.availability
                              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                              : "bg-green-600 text-white hover:bg-green-700"
                          }`}
                        >
                          {selectedAgent.availability
                            ? "Assign Agent to Property"
                            : "Agent Currently Unavailable"}
                        </button>

                        {!selectedProperty && (
                          <p className="text-sm text-red-600 mt-2 text-center">
                            Please select a property first
                          </p>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Information Panel (when no agent selected) */}
            {!showAgentDetails && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  How to Assign an Agent
                </h3>
                <ol className="space-y-4 text-sm text-gray-600">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      1
                    </div>
                    <span>
                      Select one of your properties from the left panel
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      2
                    </div>
                    <span>
                      Browse through verified agents and click on one to view
                      details
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      3
                    </div>
                    <span>
                      Review agent availability, experience, and ratings
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      4
                    </div>
                    <span>Set commission rate and agreement terms</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      5
                    </div>
                    <span>Submit assignment request for agent approval</span>
                  </li>
                </ol>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignAgent;

// import React, { useState } from "react";

// const AssignAgent = () => {
//   const [agents] = useState([
//     {
//       id: 1,
//       name: "John Doe",
//       specialization: "Residential",
//       rating: 4.8,
//       properties: 24,
//     },
//     {
//       id: 2,
//       name: "Jane Smith",
//       specialization: "Commercial",
//       rating: 4.9,
//       properties: 18,
//     },
//     {
//       id: 3,
//       name: "Mike Johnson",
//       specialization: "Luxury",
//       rating: 4.7,
//       properties: 32,
//     },
//   ]);

//   const [properties] = useState([
//     { id: 1, name: "Modern Villa", type: "Sale" },
//     { id: 2, name: "City Apartment", type: "Rent" },
//     { id: 3, name: "Beach House", type: "Sale" },
//   ]);

//   const [selectedProperty, setSelectedProperty] = useState("");
//   const [selectedAgent, setSelectedAgent] = useState("");
//   const [commission, setCommission] = useState("5");
//   const [agreement, setAgreement] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log({
//       property: selectedProperty,
//       agent: selectedAgent,
//       commission,
//       agreement,
//     });
//     alert("Agent assigned successfully!");
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6">Assign Agent to Property</h1>

//       <div className="bg-white rounded-lg shadow p-6">
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Property Selection */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Select Property *
//             </label>
//             <select
//               value={selectedProperty}
//               onChange={(e) => setSelectedProperty(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             >
//               <option value="">Choose a property</option>
//               {properties.map((property) => (
//                 <option key={property.id} value={property.id}>
//                   {property.name} ({property.type})
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Available Agents */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Select Agent *
//             </label>
//             <div className="space-y-4">
//               {agents.map((agent) => (
//                 <div
//                   key={agent.id}
//                   className={`border rounded-lg p-4 cursor-pointer transition-colors ${
//                     selectedAgent === agent.id.toString()
//                       ? "border-blue-500 bg-blue-50"
//                       : "border-gray-200 hover:border-gray-300"
//                   }`}
//                   onClick={() => setSelectedAgent(agent.id.toString())}
//                 >
//                   <div className="flex items-center">
//                     <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
//                       <span className="text-blue-600 font-bold">
//                         {agent.name.charAt(0)}
//                       </span>
//                     </div>
//                     <div className="flex-1">
//                       <h3 className="font-bold">{agent.name}</h3>
//                       <p className="text-sm text-gray-600">
//                         {agent.specialization} Specialist
//                       </p>
//                     </div>
//                     <div className="text-right">
//                       <div className="flex items-center">
//                         <span className="text-yellow-500">★</span>
//                         <span className="ml-1 font-medium">{agent.rating}</span>
//                       </div>
//                       <p className="text-sm text-gray-500">
//                         {agent.properties} properties
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Commission */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Commission Rate (%) *
//             </label>
//             <input
//               type="number"
//               value={commission}
//               onChange={(e) => setCommission(e.target.value)}
//               min="1"
//               max="20"
//               step="0.5"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//             <p className="text-sm text-gray-500 mt-1">
//               Standard commission rates are 5-7%
//             </p>
//           </div>

//           {/* Agreement Terms */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Additional Terms (Optional)
//             </label>
//             <textarea
//               value={agreement}
//               onChange={(e) => setAgreement(e.target.value)}
//               rows="3"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Add any specific terms or conditions..."
//             />
//           </div>

//           {/* Submit Button */}
//           <div className="flex gap-4 pt-4">
//             <button
//               type="submit"
//               className="flex-1 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 font-medium"
//             >
//               Assign Agent
//             </button>
//             <button
//               type="button"
//               onClick={() => {
//                 setSelectedProperty("");
//                 setSelectedAgent("");
//                 setCommission("5");
//                 setAgreement("");
//               }}
//               className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-md hover:bg-gray-300 font-medium"
//             >
//               Clear
//             </button>
//           </div>
//         </form>

//         {/* Information Section */}
//         <div className="mt-8 pt-6 border-t border-gray-200">
//           <h3 className="text-lg font-medium mb-3">
//             How Agent Assignment Works:
//           </h3>
//           <ul className="space-y-2 text-gray-600">
//             <li className="flex items-start">
//               <span className="text-green-500 mr-2 mt-1">✓</span>
//               <span>
//                 Selected agent will be notified and can accept/reject the
//                 assignment
//               </span>
//             </li>
//             <li className="flex items-start">
//               <span className="text-green-500 mr-2 mt-1">✓</span>
//               <span>
//                 Once accepted, agent will manage the property listing and
//                 showings
//               </span>
//             </li>
//             <li className="flex items-start">
//               <span className="text-green-500 mr-2 mt-1">✓</span>
//               <span>Commission is paid only upon successful sale/rental</span>
//             </li>
//             <li className="flex items-start">
//               <span className="text-green-500 mr-2 mt-1">✓</span>
//               <span>
//                 You can manage multiple agents for different properties
//               </span>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AssignAgent;
