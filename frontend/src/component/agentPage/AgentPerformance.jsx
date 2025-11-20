import React, { useState } from "react";
import {
  FiTrendingUp,
  FiEye,
  FiMessageSquare,
  FiCalendar,
  FiDollarSign,
  FiStar,
} from "react-icons/fi";

const AgentPerformance = () => {
  const [timeRange, setTimeRange] = useState("month");

  const performanceStats = [
    {
      label: "Total Listings",
      value: "24",
      change: "+12%",
      trend: "up",
      icon: FiTrendingUp,
      color: "blue",
    },
    {
      label: "Property Views",
      value: "1,248",
      change: "+8%",
      trend: "up",
      icon: FiEye,
      color: "green",
    },
    {
      label: "Client Inquiries",
      value: "86",
      change: "+15%",
      trend: "up",
      icon: FiMessageSquare,
      color: "purple",
    },
    {
      label: "Viewings Completed",
      value: "42",
      change: "+5%",
      trend: "up",
      icon: FiCalendar,
      color: "orange",
    },
    {
      label: "Properties Sold",
      value: "8",
      change: "+2",
      trend: "up",
      icon: FiDollarSign,
      color: "green",
    },
    {
      label: "Client Rating",
      value: "4.9",
      change: "+0.1",
      trend: "up",
      icon: FiStar,
      color: "yellow",
    },
  ];

  const recentTransactions = [
    {
      id: 1,
      property: "Luxury Villa - Al Reem Island",
      client: "Mohammed Ali",
      type: "Sale",
      amount: "4,200,000 AED",
      date: "2024-02-15",
      status: "Completed",
    },
    {
      id: 2,
      property: "Modern Apartment - Corniche",
      client: "Sarah Johnson",
      type: "Rental",
      amount: "180,000 AED/year",
      date: "2024-02-10",
      status: "Completed",
    },
    {
      id: 3,
      property: "Commercial Space - DIFC",
      client: "Mike Chen",
      type: "Sale",
      amount: "5,200,000 AED",
      date: "2024-02-05",
      status: "In Progress",
    },
  ];

  const getStatusColor = (status) => {
    return status === "Completed"
      ? "bg-green-100 text-green-800"
      : "bg-yellow-100 text-yellow-800";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Performance</h1>
          <p className="text-gray-600">
            Track your performance and achievements
          </p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="week">Last 7 Days</option>
          <option value="month">Last 30 Days</option>
          <option value="quarter">Last 3 Months</option>
          <option value="year">Last Year</option>
        </select>
      </div>

      {/* Performance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {performanceStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-${stat.color}-100`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
                <div
                  className={`flex items-center space-x-1 text-sm font-medium ${
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  <FiTrendingUp
                    className={`w-4 h-4 ${
                      stat.trend === "down" ? "transform rotate-180" : ""
                    }`}
                  />
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Sales Performance
          </h2>
          <div className="bg-gray-100 rounded-xl p-8 text-center">
            <FiTrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">
              Sales chart visualization coming soon
            </p>
          </div>
        </div>

        {/* Lead Conversion */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Lead Conversion
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Inquiries to Viewings</span>
              <span className="font-semibold text-gray-900">42%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: "42%" }}
              ></div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Viewings to Offers</span>
              <span className="font-semibold text-gray-900">28%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{ width: "28%" }}
              ></div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Offers to Sales</span>
              <span className="font-semibold text-gray-900">65%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full"
                style={{ width: "65%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-2xl shadow-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            Recent Transactions
          </h2>
        </div>
        <div className="divide-y divide-gray-200">
          {recentTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="p-6 hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {transaction.property}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>Client: {transaction.client}</span>
                    <span>Type: {transaction.type}</span>
                    <span>Date: {transaction.date}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4 mt-4 lg:mt-0">
                  <div className="text-right">
                    <div className="font-bold text-gray-900">
                      {transaction.amount}
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        transaction.status
                      )}`}
                    >
                      {transaction.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 border border-gray-200 rounded-xl">
            <div className="text-2xl font-bold text-blue-600 mb-2">#1</div>
            <div className="font-semibold text-gray-900">Top Seller</div>
            <div className="text-sm text-gray-600">This Month</div>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-xl">
            <div className="text-2xl font-bold text-green-600 mb-2">98%</div>
            <div className="font-semibold text-gray-900">
              Client Satisfaction
            </div>
            <div className="text-sm text-gray-600">Based on 45 reviews</div>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-xl">
            <div className="text-2xl font-bold text-purple-600 mb-2">15</div>
            <div className="font-semibold text-gray-900">Deals Closed</div>
            <div className="text-sm text-gray-600">Last 90 days</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentPerformance;
