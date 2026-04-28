import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { inquiryAPI } from "../../services/api";
import {
  FiCalendar,
  FiMessageSquare,
  FiCheck,
  FiX,
  FiEye,
  FiArchive,
  FiDownload,
  FiUser,
  FiClock,
  FiStar,
  FiMapPin,
  FiSearch,
  FiMail,
  FiPhone,
  FiRefreshCw,
  FiAlertCircle,
  FiChevronRight,
} from "react-icons/fi";

const OwnerInquiries = () => {
  const { token } = useSelector((state) => state.auth);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [inquiries, setInquiries] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    newToday: 0,
    pending: 0,
    scheduled: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [respondingTo, setRespondingTo] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [sending, setSending] = useState(false);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await inquiryAPI.getSellerInquiries();
      const data = response.data?.data;
      const inqList = data?.inquiries || data || [];

      setInquiries(inqList);

      // Compute stats
      const today = new Date().toDateString();
      const newToday = inqList.filter(
        (i) => new Date(i.createdAt).toDateString() === today
      ).length;
      const pending = inqList.filter(
        (i) => i.status === "new" || i.status === "pending" || !i.isRead
      ).length;
      const scheduled = inqList.filter((i) => i.status === "scheduled").length;

      setStats({
        total: inqList.length,
        newToday,
        pending,
        scheduled,
      });
    } catch (err) {
      console.error("Error fetching inquiries:", err);
      setError("Failed to load inquiries. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRespond = async (inquiryId) => {
    if (!replyMessage.trim()) return;
    try {
      setSending(true);
      await inquiryAPI.respond(inquiryId, replyMessage);
      setReplyMessage("");
      setRespondingTo(null);
      fetchInquiries();
      alert("Response sent successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send response.");
    } finally {
      setSending(false);
    }
  };

  const handleMarkRead = async (inquiryId) => {
    try {
      await inquiryAPI.markAsRead(inquiryId);
      fetchInquiries();
    } catch (err) {
      console.error("Error marking as read:", err);
    }
  };

  const handleUpdateStatus = async (inquiryId, newStatus) => {
    try {
      await inquiryAPI.updateStatus(inquiryId, newStatus);
      fetchInquiries();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update status.");
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(filteredInquiries, null, 2);
    const uri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const link = document.createElement("a");
    link.setAttribute("href", uri);
    link.setAttribute("download", "inquiries.json");
    link.click();
  };

  const filteredInquiries = inquiries.filter((inquiry) => {
    const matchesSearch =
      searchTerm === "" ||
      inquiry.property?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.buyer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.message?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || inquiry.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  useEffect(() => {
    fetchInquiries();
  }, []);

  const statCards = [
    { label: "Total Inquiries", value: stats.total, color: "bg-blue-500", icon: <FiMessageSquare /> },
    { label: "New Today", value: stats.newToday, color: "bg-green-500", icon: <FiMail /> },
    { label: "Pending Response", value: stats.pending, color: "bg-yellow-500", icon: <FiClock /> },
    { label: "Scheduled Viewings", value: stats.scheduled, color: "bg-purple-500", icon: <FiCalendar /> },
  ];

  if (loading) {
    return (
      <div className="p-6 flex flex-col justify-center items-center h-64 space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
        <p className="text-gray-600">Loading inquiries...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Property Inquiries</h1>
          <p className="text-gray-600 mt-1">Manage all inquiries and messages about your properties</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={fetchInquiries}
            className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
          >
            <FiRefreshCw className="h-4 w-4" />
            Refresh
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
          <FiAlertCircle className="h-5 w-5 text-red-600" />
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <div className="text-white text-xl">{stat.icon}</div>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div className="flex-1">
            <div className="relative max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="search"
                placeholder="Search by property, buyer, or message..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="pending">Pending</option>
              <option value="responded">Responded</option>
              <option value="scheduled">Scheduled</option>
              <option value="closed">Closed</option>
            </select>
            <button
              onClick={handleExport}
              disabled={filteredInquiries.length === 0}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              <FiDownload className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-4">
          Showing <strong>{filteredInquiries.length}</strong> of <strong>{inquiries.length}</strong> inquiries
        </p>

        {/* Inquiries List */}
        <div className="space-y-4">
          {filteredInquiries.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiMessageSquare className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Inquiries Found</h3>
              <p className="text-gray-500">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your filters."
                  : "No inquiries for your properties yet."}
              </p>
            </div>
          ) : (
            filteredInquiries.map((inquiry) => (
              <div
                key={inquiry._id}
                className={`border rounded-xl overflow-hidden transition-colors ${
                  !inquiry.isRead ? "border-blue-300 bg-blue-50" : "border-gray-200 hover:border-blue-200"
                }`}
              >
                <div className="p-5">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                    {/* Property Image */}
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                      {inquiry.property?.images?.[0] ? (
                        <img
                          src={inquiry.property.images[0]}
                          alt={inquiry.property?.title}
                          className="w-full h-full object-cover"
                          onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=200"; }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-blue-50">
                          <FiMapPin className="h-6 w-6 text-blue-400" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-gray-900">
                            {inquiry.property?.title || "Unknown Property"}
                          </h3>
                          <div className="flex items-center gap-3 mt-1">
                            <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                              inquiry.status === "new" ? "bg-blue-100 text-blue-800"
                              : inquiry.status === "responded" ? "bg-green-100 text-green-800"
                              : inquiry.status === "scheduled" ? "bg-purple-100 text-purple-800"
                              : inquiry.status === "closed" ? "bg-gray-100 text-gray-700"
                              : "bg-yellow-100 text-yellow-800"
                            }`}>
                              {(inquiry.status || "new").charAt(0).toUpperCase() + (inquiry.status || "new").slice(1)}
                            </span>
                            {!inquiry.isRead && (
                              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                                Unread
                              </span>
                            )}
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <FiCalendar className="h-3 w-3" />
                              {new Date(inquiry.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="flex gap-2 mt-3 sm:mt-0">
                          {!inquiry.isRead && (
                            <button
                              onClick={() => handleMarkRead(inquiry._id)}
                              className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 text-xs"
                            >
                              <FiCheck className="h-3 w-3" />
                              Mark Read
                            </button>
                          )}
                          <button
                            onClick={() =>
                              setRespondingTo(respondingTo === inquiry._id ? null : inquiry._id)
                            }
                            className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs"
                          >
                            <FiMail className="h-3 w-3" />
                            Reply
                          </button>
                          {inquiry.status !== "closed" && (
                            <button
                              onClick={() => handleUpdateStatus(inquiry._id, "closed")}
                              className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-xs"
                            >
                              <FiArchive className="h-3 w-3" />
                              Close
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Buyer Info */}
                      <div className="flex items-center gap-3 mb-3 bg-white rounded-lg p-3 border border-gray-100">
                        <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600 flex-shrink-0">
                          {(inquiry.buyer?.name || inquiry.sender?.name || "?").charAt(0)}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 text-sm">
                            {inquiry.buyer?.name || inquiry.sender?.name || "Anonymous"}
                          </p>
                          <div className="flex flex-wrap gap-3 text-xs text-gray-600 mt-0.5">
                            {(inquiry.buyer?.email || inquiry.sender?.email) && (
                              <span className="flex items-center gap-1">
                                <FiMail className="h-3 w-3" />
                                {inquiry.buyer?.email || inquiry.sender?.email}
                              </span>
                            )}
                            {(inquiry.buyer?.phone || inquiry.sender?.phone) && (
                              <span className="flex items-center gap-1">
                                <FiPhone className="h-3 w-3" />
                                {inquiry.buyer?.phone || inquiry.sender?.phone}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Message */}
                      <p className="text-gray-700 bg-gray-50 px-4 py-3 rounded-lg text-sm border border-gray-100">
                        {inquiry.message}
                      </p>

                      {/* Response to Responses */}
                      {inquiry.responses?.length > 0 && (
                        <div className="mt-2 p-3 bg-green-50 border border-green-100 rounded-lg">
                          <p className="text-xs font-bold text-green-700 mb-1">Your last reply:</p>
                          <p className="text-sm text-green-800">
                            {inquiry.responses[inquiry.responses.length - 1]?.message}
                          </p>
                        </div>
                      )}

                      {/* Reply Box */}
                      {respondingTo === inquiry._id && (
                        <div className="mt-3 border border-blue-200 rounded-lg p-3 bg-blue-50">
                          <textarea
                            value={replyMessage}
                            onChange={(e) => setReplyMessage(e.target.value)}
                            rows={3}
                            placeholder="Type your reply..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          />
                          <div className="flex gap-2 mt-2 justify-end">
                            <button
                              onClick={() => { setRespondingTo(null); setReplyMessage(""); }}
                              className="px-3 py-1.5 text-xs border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleRespond(inquiry._id)}
                              disabled={sending || !replyMessage.trim()}
                              className="px-4 py-1.5 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                            >
                              {sending ? "Sending..." : "Send Reply"}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FiStar className="h-5 w-5 text-yellow-500" />
          Tips for Better Responses
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { title: "Respond Quickly", desc: "Reply within 24h for best results", icon: <FiClock className="text-green-600" />, bg: "bg-green-100" },
            { title: "Be Professional", desc: "Use clear, professional language", icon: <FiCheck className="text-blue-600" />, bg: "bg-blue-100" },
            { title: "Schedule Promptly", desc: "Offer specific viewing times", icon: <FiCalendar className="text-purple-600" />, bg: "bg-purple-100" },
            { title: "Follow Up", desc: "Check back with interested buyers", icon: <FiUser className="text-yellow-600" />, bg: "bg-yellow-100" },
          ].map((tip, i) => (
            <div key={i} className="bg-white p-4 rounded-lg border border-gray-200">
              <div className={`w-10 h-10 ${tip.bg} rounded-lg flex items-center justify-center mb-3`}>
                <span className="text-lg">{tip.icon}</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-1 text-sm">{tip.title}</h4>
              <p className="text-xs text-gray-600">{tip.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OwnerInquiries;
