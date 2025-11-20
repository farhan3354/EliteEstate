import React, { useState } from "react";
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
} from "react-icons/fi";

const AgentListings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const listings = [
    {
      id: 1,
      title: "Luxury Villa - Al Reem Island",
      price: "4,200,000 AED",
      location: "Al Reem Island, Abu Dhabi",
      type: "Villa",
      status: "active",
      views: 245,
      inquiries: 12,
      date: "2024-01-15",
      image: "/api/placeholder/400/300",
    },
    {
      id: 2,
      title: "Modern Apartment - Corniche",
      price: "1,800,000 AED",
      location: "Corniche, Abu Dhabi",
      type: "Apartment",
      status: "active",
      views: 189,
      inquiries: 8,
      date: "2024-01-10",
      image: "/api/placeholder/400/300",
    },
    {
      id: 3,
      title: "Commercial Space - DIFC",
      price: "5,200,000 AED",
      location: "DIFC, Dubai",
      type: "Commercial",
      status: "pending",
      views: 156,
      inquiries: 6,
      date: "2024-01-18",
      image: "/api/placeholder/400/300",
    },
    {
      id: 4,
      title: "Waterfront Studio - Marina",
      price: "850,000 AED",
      location: "Marina, Dubai",
      type: "Apartment",
      status: "draft",
      views: 0,
      inquiries: 0,
      date: "2024-01-20",
      image: "/api/placeholder/400/300",
    },
  ];

  const filteredListings = listings.filter((listing) => {
    const matchesSearch =
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || listing.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "active":
        return "Active";
      case "pending":
        return "Under Review";
      case "draft":
        return "Draft";
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Listings</h1>
          <p className="text-gray-600">Manage your property listings</p>
        </div>
        <Link
          to="/agent/add-property"
          className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors duration-200 mt-4 lg:mt-0"
        >
          <FiPlus className="w-5 h-5" />
          <span>Add New Property</span>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search listings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="relative">
            <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          <select className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option>Sort by: Date</option>
            <option>Sort by: Views</option>
            <option>Sort by: Price</option>
          </select>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid gap-6">
        {filteredListings.map((listing) => (
          <div
            key={listing.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row">
              {/* Property Image */}
              <div className="lg:w-64 lg:h-48">
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="w-full h-48 lg:h-full object-cover"
                />
              </div>

              {/* Property Details */}
              <div className="flex-1 p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {listing.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-gray-600 mb-3">
                      <div className="flex items-center space-x-1">
                        <FiMapPin className="w-4 h-4" />
                        <span className="text-sm">{listing.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FiHome className="w-4 h-4" />
                        <span className="text-sm">{listing.type}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mb-4 lg:mb-0">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        listing.status
                      )}`}
                    >
                      {getStatusText(listing.status)}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4 lg:mb-0">
                    <div className="flex items-center space-x-2">
                      <FiDollarSign className="w-4 h-4" />
                      <span className="font-semibold text-lg text-gray-900">
                        {listing.price}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold">{listing.views}</span>{" "}
                      views
                    </div>
                    <div>
                      <span className="font-semibold">{listing.inquiries}</span>{" "}
                      inquiries
                    </div>
                    <div className="text-gray-500">
                      Listed on {listing.date}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Link
                      to={`/property/${listing.id}`}
                      className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
                    >
                      <FiEye className="w-4 h-4" />
                      <span>View</span>
                    </Link>
                    <Link
                      to={`/agent/edit-property/${listing.id}`}
                      className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
                    >
                      <FiEdit className="w-4 h-4" />
                      <span>Edit</span>
                    </Link>
                    <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-red-600 transition-colors duration-200">
                      <FiTrash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredListings.length === 0 && (
        <div className="text-center py-12">
          <FiHome className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No listings found
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || statusFilter !== "all"
              ? "Try adjusting your search criteria"
              : "You haven't listed any properties yet"}
          </p>
          <Link
            to="/agent/add-property"
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors duration-200"
          >
            <FiPlus className="w-5 h-5" />
            <span>Add Your First Property</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default AgentListings;
