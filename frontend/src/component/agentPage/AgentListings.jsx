import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiEye,
  FiEdit,
  FiTrash2,
  FiPlus,
  FiSearch,
  FiFilter,
  FiDollarSign,
  FiMapPin,
  FiHome,
  FiLoader,
} from "react-icons/fi";
import { agentAPI } from "../../services/api";

const AgentListings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const response = await agentAPI.getAssignedProperties();
      setListings(response.data.data.assignments);
    } catch (error) {
      console.error("Error fetching listings:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredListings = listings.filter((item) => {
    const listing = item.property;
    const matchesSearch =
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.location?.fullAddress.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "active":
        return "Active";
      case "pending":
        return "Pending";
      case "rejected":
        return "Rejected";
      case "completed":
        return "Completed";
      default:
        return status ? status.charAt(0).toUpperCase() + status.slice(1) : "Unknown";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <FiLoader className="w-12 h-12 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            My Listings
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Manage your property listings
          </p>
        </div>
        <Link
          to="/agent-dashboard/add-property"
          className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 sm:px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors duration-200 w-full sm:w-auto"
        >
          <FiPlus className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base">Add New Property</span>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="relative sm:col-span-2 lg:col-span-1">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder="Search listings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
            />
          </div>

          <div className="relative">
            <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base appearance-none"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          <select className="px-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base">
            <option>Sort by: Date</option>
            <option>Sort by: Views</option>
            <option>Sort by: Price</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:gap-6">
        {filteredListings.map((item) => {
          const listing = item.property;
          return (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row">
              {/* Property Image */}
              <div className="lg:w-64 lg:h-48 flex-shrink-0">
                <img
                  src={listing.images?.[0] || "/placeholder.jpg"}
                  alt={listing.title}
                  className="w-full h-48 lg:h-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400x300?text=Property";
                  }}
                />
              </div>

              {/* Property Details */}
              <div className="flex-1 p-4 sm:p-6">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                  <div className="flex-1 mb-3 sm:mb-0">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                      {listing.title}
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-gray-600 mb-3 space-y-1 sm:space-y-0">
                      <div className="flex items-center space-x-1">
                        <FiMapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span className="text-xs sm:text-sm truncate">
                          {listing.location?.fullAddress}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FiHome className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span className="text-xs sm:text-sm">
                          {listing.propertyType}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium ${getStatusColor(
                        item.status
                      )}`}
                    >
                      {getStatusText(item.status)}
                    </span>
                  </div>
                </div>

                {/* Stats and Actions Section */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  {/* Stats */}
                  <div className="grid grid-cols-2 sm:flex sm:items-center sm:space-x-4 sm:space-y-0 text-xs sm:text-sm text-gray-600 mb-4 lg:mb-0 gap-2 sm:gap-0">
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <FiDollarSign className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="font-semibold text-sm sm:text-lg text-gray-900 truncate">
                        {listing.formattedPrice}
                      </span>
                    </div>
                    {/* Views and inquiries are not yet tracked per assignment in backend, using listing level if available */}
                    <div className="text-right sm:text-left">
                      <span className="font-semibold">{listing.views || 0}</span>{" "}
                      views
                    </div>
                    <div className="sm:block hidden">
                      <span className="font-semibold">0</span>{" "}
                      inquiries
                    </div>
                    <div className="sm:block hidden text-gray-500 text-xs">
                      {new Date(item.assignedDate).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Mobile Stats (for smaller screens) */}
                  <div className="sm:hidden grid grid-cols-2 gap-2 mb-4 text-xs text-gray-600">
                    <div>
                      <span className="font-semibold">0</span>{" "}
                      inquiries
                    </div>
                    <div className="text-right">Assigned: {new Date(item.assignedDate).toLocaleDateString()}</div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between sm:justify-end space-x-2 sm:space-x-3">
                    <Link
                      to={`/property/${listing.id}`}
                      className="flex items-center space-x-1 sm:space-x-2 px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm"
                    >
                      <FiEye className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">View</span>
                    </Link>
                    {/* Only allow edit/delete if agent added the property or has permissions */}
                    <Link
                      to={`/agent-dashboard/edit-property/${listing.id}`}
                      className="flex items-center space-x-1 sm:space-x-2 px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm"
                    >
                      <FiEdit className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">Edit</span>
                    </Link>
                    <button className="flex items-center space-x-1 sm:space-x-2 px-3 py-2 text-gray-600 hover:text-red-600 transition-colors duration-200 text-sm">
                      <FiTrash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )})}
      </div>

      {/* Empty State */}
      {filteredListings.length === 0 && (
        <div className="text-center py-8 sm:py-12">
          <FiHome className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
            No listings found
          </h3>
          <p className="text-gray-600 text-sm sm:text-base mb-6 max-w-md mx-auto">
            {searchTerm || statusFilter !== "all"
              ? "Try adjusting your search criteria"
              : "You haven't listed any properties yet"}
          </p>
          <Link
            to="/agent-dashboard/add-property"
            className="inline-flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 sm:px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors duration-200 text-sm sm:text-base w-full sm:w-auto"
          >
            <FiPlus className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Add Your First Property</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default AgentListings;
