import React, { useState } from "react";
import {
  FiSearch,
  FiUser,
  FiPhone,
  FiMail,
  FiCalendar,
  FiPlus,
} from "react-icons/fi";

const AgentClients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const clients = [
    {
      id: 1,
      name: "Mohammed Ali",
      email: "mohammed.ali@email.com",
      phone: "+971 50 111 2222",
      type: "Buyer",
      status: "active",
      lastContact: "2024-01-20",
      properties: 3,
      budget: "2,000,000 - 3,000,000 AED",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "+971 55 333 4444",
      type: "Seller",
      status: "active",
      lastContact: "2024-01-18",
      properties: 1,
      budget: "1,500,000 AED",
    },
    {
      id: 3,
      name: "Mike Chen",
      email: "mike.chen@email.com",
      phone: "+971 52 555 6666",
      type: "Buyer",
      status: "inactive",
      lastContact: "2024-01-10",
      properties: 5,
      budget: "4,000,000+ AED",
    },
  ];

  const getStatusColor = (status) => {
    return status === "active"
      ? "bg-green-100 text-green-800"
      : "bg-gray-100 text-gray-800";
  };

  const getTypeColor = (type) => {
    return type === "Buyer"
      ? "bg-blue-100 text-blue-800"
      : "bg-purple-100 text-purple-800";
  };

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Clients
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Manage your client relationships
          </p>
        </div>
        <button className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 sm:px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors duration-200 w-full sm:w-auto">
          <FiPlus className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base">Add New Client</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg">
          <div className="text-xl sm:text-2xl font-bold text-blue-600 mb-2">
            24
          </div>
          <div className="text-xs sm:text-sm text-gray-600">Total Clients</div>
        </div>
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg">
          <div className="text-xl sm:text-2xl font-bold text-green-600 mb-2">
            18
          </div>
          <div className="text-xs sm:text-sm text-gray-600">Active Clients</div>
        </div>
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg">
          <div className="text-xl sm:text-2xl font-bold text-purple-600 mb-2">
            12
          </div>
          <div className="text-xs sm:text-sm text-gray-600">Buyers</div>
        </div>
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg">
          <div className="text-xl sm:text-2xl font-bold text-orange-600 mb-2">
            6
          </div>
          <div className="text-xs sm:text-sm text-gray-600">Sellers</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="relative sm:col-span-2 lg:col-span-1">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <select className="px-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base">
            <option>Sort by: Recent</option>
            <option>Sort by: Name</option>
            <option>Sort by: Budget</option>
          </select>
        </div>
      </div>

      {/* Clients List */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">
            Client List
          </h2>
        </div>
        <div className="divide-y divide-gray-200">
          {clients.map((client) => (
            <div
              key={client.id}
              className="p-4 sm:p-6 hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FiUser className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                      {client.name}
                    </h3>

                    {/* Contact Info - Stack on mobile */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-2 text-xs sm:text-sm text-gray-600 space-y-1 sm:space-y-0">
                      <div className="flex items-center space-x-1">
                        <FiMail className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span className="truncate">{client.email}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FiPhone className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span>{client.phone}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FiCalendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span>Contact: {client.lastContact}</span>
                      </div>
                    </div>

                    {/* Status Badges */}
                    <div className="flex items-center space-x-2 mt-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                          client.type
                        )}`}
                      >
                        {client.type}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          client.status
                        )}`}
                      >
                        {client.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Budget Info - Full width on mobile, right-aligned on desktop */}
                <div className="mt-4 lg:mt-0 lg:text-right lg:pl-4">
                  <div className="text-xs sm:text-sm text-gray-600">
                    Budget Range
                  </div>
                  <div className="font-semibold text-gray-900 text-sm sm:text-base">
                    {client.budget}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 mt-1">
                    {client.properties} properties viewed
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgentClients;
