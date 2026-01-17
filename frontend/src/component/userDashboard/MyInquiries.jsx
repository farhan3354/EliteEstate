import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { inquiryAPI } from "../../services/api";
import {
  FiMessageSquare,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiEye,
  FiFilter,
  FiRefreshCw,
} from "react-icons/fi";

const MyInquiries = () => {
  const token = useSelector((state) => state.auth.token);
  const [inquiries, setInquiries] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const response = await inquiryAPI.getMyInquiries(
        statusFilter !== "all" ? statusFilter : null
      );
      if (response.data.success) {
        setInquiries(response.data.data.inquiries);
        setStats(response.data.data.stats);
      }
    } catch (error) {
      console.error("Error fetching inquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchInquiries();
    }
  }, [token, statusFilter]);

  const getStatusBadge = (status) => {
    const statusConfig = {
      new: { color: "bg-blue-100 text-blue-800", label: "New" },
      contacted: { color: "bg-green-100 text-green-800", label: "Contacted" },
      "viewing-scheduled": {
        color: "bg-purple-100 text-purple-800",
        label: "Viewing Scheduled",
      },
      negotiating: {
        color: "bg-yellow-100 text-yellow-800",
        label: "Negotiating",
      },
      closed: { color: "bg-gray-100 text-gray-800", label: "Closed" },
      "not-interested": {
        color: "bg-red-100 text-red-800",
        label: "Not Interested",
      },
    };

    const config = statusConfig[status] || statusConfig.new;
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${config.color}`}
      >
        {config.label}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Inquiries</h1>
            <p className="text-gray-600 mt-1">
              Track your property inquiries and responses
            </p>
          </div>
          <button
            onClick={fetchInquiries}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <FiRefreshCw className="w-5 h-5" />
            Refresh
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: "Total", value: stats.total || 0, color: "blue" },
            { label: "New", value: stats.new || 0, color: "green" },
            { label: "Contacted", value: stats.contacted || 0, color: "purple" },
            {
              label: "Viewing Scheduled",
              value: stats.viewingScheduled || 0,
              color: "yellow",
            },
            {
              label: "Negotiating",
              value: stats.negotiating || 0,
              color: "orange",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
            >
              <div className={`text-2xl font-bold text-${stat.color}-600`}>
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter */}
      <div className="mb-6 flex items-center gap-4">
        <FiFilter className="w-5 h-5 text-gray-400" />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="viewing-scheduled">Viewing Scheduled</option>
          <option value="negotiating">Negotiating</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {/* Inquiries List */}
      <div className="space-y-4">
        {inquiries.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <FiMessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No inquiries yet
            </h3>
            <p className="text-gray-600">
              Start browsing properties and send inquiries to sellers
            </p>
          </div>
        ) : (
          inquiries.map((inquiry) => (
            <div
              key={inquiry._id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row gap-4">
                {/* Property Image */}
                <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  <img
                    src={
                      inquiry.property?.images?.[0] ||
                      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400"
                    }
                    alt={inquiry.property?.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {inquiry.property?.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {inquiry.property?.location}
                      </p>
                    </div>
                    {getStatusBadge(inquiry.status)}
                  </div>

                  <div className="mb-3">
                    <p className="text-sm text-gray-700 line-clamp-2">
                      {inquiry.message}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <FiClock className="w-4 h-4" />
                      <span>
                        {new Date(inquiry.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FiMessageSquare className="w-4 h-4" />
                      <span>{inquiry.responseCount || 0} responses</span>
                    </div>
                    {inquiry.seller && (
                      <div className="flex items-center gap-1">
                        <span className="font-medium">
                          Seller: {inquiry.seller.name}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={() => setSelectedInquiry(inquiry)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <FiEye className="w-4 h-4" />
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyInquiries;
