import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { inquiryAPI } from "../../services/api";
import {
  FiSearch,
  FiMessageSquare,
  FiUser,
  FiPhone,
  FiMail,
  FiChevronDown,
  FiRefreshCw,
  FiSend,
} from "react-icons/fi";

const AgentInquiries = () => {
  const token = useSelector((state) => state.auth.token);
  const [inquiries, setInquiries] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [responseMessage, setResponseMessage] = useState("");
  const [responding, setResponding] = useState(false);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const response = await inquiryAPI.getSellerInquiries(
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

  const handleRespond = async (inquiryId) => {
    if (!responseMessage.trim()) return;

    try {
      setResponding(true);
      const response = await inquiryAPI.respond(inquiryId, responseMessage);
      if (response.data.success) {
        setResponseMessage("");
        fetchInquiries();
      }
    } catch (error) {
      console.error("Error responding:", error);
    } finally {
      setResponding(false);
    }
  };

  const handleStatusUpdate = async (inquiryId, newStatus) => {
    try {
      await inquiryAPI.updateStatus(inquiryId, newStatus);
      fetchInquiries();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const getStatusColor = (status) => {
    const statusMap = {
      new: "bg-blue-100 text-blue-800",
      contacted: "bg-green-100 text-green-800",
      "viewing-scheduled": "bg-purple-100 text-purple-800",
      negotiating: "bg-yellow-100 text-yellow-800",
      closed: "bg-gray-100 text-gray-800",
    };
    return statusMap[status] || "bg-gray-100 text-gray-800";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      full:
        date.toLocaleDateString() +
        " " +
        date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      short: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
  };

  const filteredInquiries = inquiries.filter((inquiry) =>
    searchTerm
      ? inquiry.property?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inquiry.buyer?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      : true
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="mb-4 lg:mb-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Client Inquiries
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Manage property inquiries and messages
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

        {/* Stats and Filters */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Stats Card */}
          <div className="bg-white rounded-xl p-4 text-center shadow-lg lg:col-span-1">
            <div className="text-xl sm:text-2xl font-bold text-blue-600">
              {stats.new || 0}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">
              New Inquiries
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl p-4 shadow-lg lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="text"
                  placeholder="Search inquiries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                />
              </div>

              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base appearance-none bg-white"
                >
                  <option value="all">All Status</option>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="viewing-scheduled">Viewing Scheduled</option>
                  <option value="negotiating">Negotiating</option>
                  <option value="closed">Closed</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Inquiries List */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
              Recent Inquiries ({filteredInquiries.length})
            </h2>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredInquiries.length === 0 ? (
              <div className="p-12 text-center">
                <FiMessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No inquiries yet
                </h3>
                <p className="text-gray-600">
                  When clients contact you about properties, they'll appear here
                </p>
              </div>
            ) : (
              filteredInquiries.map((inquiry) => {
                const formattedDate = formatDate(inquiry.createdAt);
                return (
                  <div
                    key={inquiry._id}
                    className="p-4 sm:p-6 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                      <div className="flex-1">
                        <div className="flex items-start space-x-3 sm:space-x-4">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <FiMessageSquare className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
                          </div>

                          <div className="flex-1 min-w-0">
                            {/* Header with status and date */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-3 gap-2">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                  inquiry.status
                                )}`}
                              >
                                {inquiry.status}
                              </span>
                              <span className="text-xs text-gray-500 sm:text-sm">
                                <span className="sm:hidden">
                                  {formattedDate.short} • {formattedDate.time}
                                </span>
                                <span className="hidden sm:inline">
                                  {formattedDate.full}
                                </span>
                              </span>
                            </div>

                            {/* Property title */}
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 truncate">
                              {inquiry.property?.title}
                            </h3>

                            {/* Client info */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-3 text-xs sm:text-sm text-gray-600 space-y-1 sm:space-y-0">
                              <div className="flex items-center space-x-1">
                                <FiUser className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                <span className="truncate">
                                  {inquiry.buyerContact?.name || inquiry.buyer?.name}
                                </span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <FiMail className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                <a
                                  href={`mailto:${inquiry.buyerContact?.email}`}
                                  className="truncate hover:text-blue-600"
                                >
                                  {inquiry.buyerContact?.email}
                                </a>
                              </div>
                              <div className="flex items-center space-x-1">
                                <FiPhone className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                <a
                                  href={`tel:${inquiry.buyerContact?.phone}`}
                                  className="truncate hover:text-blue-600"
                                >
                                  {inquiry.buyerContact?.phone}
                                </a>
                              </div>
                            </div>

                            {/* Message */}
                            <p className="text-gray-700 bg-gray-50 p-3 sm:p-4 rounded-xl text-sm sm:text-base mb-3">
                              {inquiry.message}
                            </p>

                            {/* Quick Actions */}
                            <div className="flex flex-wrap gap-2 mb-3">
                              <button
                                onClick={() => handleStatusUpdate(inquiry._id, "contacted")}
                                className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                              >
                                Mark Contacted
                              </button>
                              <button
                                onClick={() =>
                                  handleStatusUpdate(inquiry._id, "viewing-scheduled")
                                }
                                className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200"
                              >
                                Viewing Scheduled
                              </button>
                              <button
                                onClick={() =>
                                  handleStatusUpdate(inquiry._id, "negotiating")
                                }
                                className="px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200"
                              >
                                Negotiating
                              </button>
                            </div>

                            {/* Response Form */}
                            <div className="border-t border-gray-200 pt-3">
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  value={responseMessage}
                                  onChange={(e) => setResponseMessage(e.target.value)}
                                  placeholder="Type your response..."
                                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                />
                                <button
                                  onClick={() => handleRespond(inquiry._id)}
                                  disabled={responding || !responseMessage.trim()}
                                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm"
                                >
                                  <FiSend className="w-4 h-4" />
                                  Send
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentInquiries;
