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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Clients</h1>
          <p className="text-gray-600">Manage your client relationships</p>
        </div>
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors duration-200 mt-4 lg:mt-0">
          <FiPlus className="w-5 h-5" />
          <span>Add New Client</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="text-2xl font-bold text-blue-600 mb-2">24</div>
          <div className="text-sm text-gray-600">Total Clients</div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="text-2xl font-bold text-green-600 mb-2">18</div>
          <div className="text-sm text-gray-600">Active Clients</div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="text-2xl font-bold text-purple-600 mb-2">12</div>
          <div className="text-sm text-gray-600">Buyers</div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="text-2xl font-bold text-orange-600 mb-2">6</div>
          <div className="text-sm text-gray-600">Sellers</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <select className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option>Sort by: Recent</option>
            <option>Sort by: Name</option>
            <option>Sort by: Budget</option>
          </select>
        </div>
      </div>

      {/* Clients List */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Client List</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {clients.map((client) => (
            <div
              key={client.id}
              className="p-6 hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <FiUser className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {client.name}
                    </h3>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <FiMail className="w-4 h-4" />
                        <span>{client.email}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FiPhone className="w-4 h-4" />
                        <span>{client.phone}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FiCalendar className="w-4 h-4" />
                        <span>Last contact: {client.lastContact}</span>
                      </div>
                    </div>
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

                <div className="mt-4 lg:mt-0 lg:text-right">
                  <div className="text-sm text-gray-600">Budget Range</div>
                  <div className="font-semibold text-gray-900">
                    {client.budget}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
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
