import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../../utils/routeapi";
import {
  FiSearch,
  FiFilter,
  FiUsers,
  FiStar,
  FiMessageSquare,
  FiPhone,
  FiMail,
  FiCheckCircle,
  FiXCircle,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiPlus,
  FiDownload,
  FiCalendar,
  FiDollarSign,
  FiTrendingUp,
  FiChevronRight,
  FiRefreshCw,
} from "react-icons/fi";
import { MdVerified, MdOutlineHandshake } from "react-icons/md";

const OwnerAssignedAgents = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [assignments, setAssignments] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch assigned agents
  const fetchAssignedAgents = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("🔄 Fetching assigned agents...");
      console.log("🔑 Token:", token ? "Present" : "Missing");

      const response = await api.get("/agents/owner/assignments", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("✅ API Response received");
      console.log("📊 Response data:", response.data);
      console.log("✅ Response success:", response.data.success);
      console.log("📦 Assignments:", response.data.data?.assignments);
      console.log("📊 Stats:", response.data.data?.stats);

      if (response.data.success) {
        const assignmentsData = response.data.data.assignments || [];
        console.log("📋 Number of assignments:", assignmentsData.length);

        setAssignments(assignmentsData);

        // Transform stats to match component format
        const statsData = response.data.data.stats || {};
        console.log("📈 Stats data:", statsData);

        const transformedStats = [
          {
            label: "Active Agents",
            value: statsData.activeAgents?.toString() || "0",
            color: "bg-green-500",
            icon: <FiUsers />,
          },
          {
            label: "Total Commissions",
            value: statsData.totalCommissions || "AED 0",
            color: "bg-blue-500",
            icon: <FiDollarSign />,
          },
          {
            label: "Avg Success Rate",
            value: statsData.avgSuccessRate || "0%",
            color: "bg-purple-500",
            icon: <FiTrendingUp />,
          },
          {
            label: "Properties with Agents",
            value: statsData.propertiesWithAgents?.toString() || "0",
            color: "bg-yellow-500",
            icon: <MdOutlineHandshake />,
          },
        ];

        setStats(transformedStats);
        console.log("✅ Data set successfully");
      } else {
        console.log("❌ API returned success: false");
        setError("Failed to load data from server");
      }
    } catch (error) {
      console.error("❌ Error fetching assigned agents:", error);
      console.error("❌ Error response:", error.response?.data);
      console.error("❌ Error status:", error.response?.status);
      console.error("❌ Error message:", error.message);

      setError("Failed to load assigned agents. Please try again.");

      // Fallback to empty stats
      setStats([
        {
          label: "Active Agents",
          value: "0",
          color: "bg-green-500",
          icon: <FiUsers />,
        },
        {
          label: "Total Commissions",
          value: "AED 0",
          color: "bg-blue-500",
          icon: <FiDollarSign />,
        },
        {
          label: "Avg Success Rate",
          value: "0%",
          color: "bg-purple-500",
          icon: <FiTrendingUp />,
        },
        {
          label: "Properties with Agents",
          value: "0",
          color: "bg-yellow-500",
          icon: <MdOutlineHandshake />,
        },
      ]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Handle refresh
  const handleRefresh = () => {
    setRefreshing(true);
    fetchAssignedAgents();
  };

  // Filter assignments based on search and status
  const filteredAssignments = assignments.filter((assignment) => {
    const matchesSearch =
      searchTerm === "" ||
      (assignment.agent.name &&
        assignment.agent.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) ||
      (assignment.property.name &&
        assignment.property.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) ||
      (assignment.agent.email &&
        assignment.agent.email
          .toLowerCase()
          .includes(searchTerm.toLowerCase()));

    const matchesStatus =
      statusFilter === "all" || assignment.agreement.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleContactAgent = (agent) => {
    console.log("Contacting agent:", agent.name);
    if (agent.email) {
      window.open(`mailto:${agent.email}`, "_blank");
    } else {
      alert(`No email available for ${agent.name}`);
    }
  };

  const handleCallAgent = (phone) => {
    console.log("Calling agent:", phone);
    if (phone) {
      window.open(`tel:${phone}`, "_blank");
    } else {
      alert("Phone number not available");
    }
  };

  const handleTerminateAssignment = async (id) => {
    if (window.confirm("Are you sure you want to terminate this assignment?")) {
      try {
        // API call to terminate assignment
        const response = await api.delete(`/agents/assignments/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          alert("Assignment terminated successfully!");
          // Refresh the list
          fetchAssignedAgents();
        }
      } catch (error) {
        console.error("Error terminating assignment:", error);
        alert(
          error.response?.data?.message || "Failed to terminate assignment"
        );
      }
    }
  };

  const handleExtendAgreement = async (id) => {
    try {
      // API call to extend agreement
      const response = await api.put(
        `/agents/assignments/${id}/extend`,
        { duration: "6 months" },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        alert("Agreement extended successfully!");
        fetchAssignedAgents();
      }
    } catch (error) {
      console.error("Error extending agreement:", error);
      alert(error.response?.data?.message || "Failed to extend agreement");
    }
  };

  const handleViewPerformance = (assignment) => {
    console.log("Viewing performance for:", assignment.agent.name);
    // Navigate to performance dashboard or show modal
    navigate(`/owner-dashboard/agent-performance/${assignment.id}`);
  };

  const handleAssignNewAgent = () => {
    navigate("/owner-dashboard/assign-agent");
  };

  const handleExportData = () => {
    if (filteredAssignments.length === 0) {
      alert("No data to export");
      return;
    }

    const dataStr = JSON.stringify(filteredAssignments, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = "assigned-agents.json";

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  useEffect(() => {
    if (token) {
      fetchAssignedAgents();
    }
  }, [token]);

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex flex-col justify-center items-center h-64 space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="text-gray-600 text-lg">
            Loading assigned agents...
          </span>
          <span className="text-gray-500 text-sm">
            Please wait while we fetch your data
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Assigned Agents
            </h1>
            <p className="text-gray-600 mt-1">
              Manage agents assigned to your properties
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <FiRefreshCw
                className={`h-5 w-5 ${refreshing ? "animate-spin" : ""}`}
              />
              Refresh
            </button>
            <button
              onClick={handleAssignNewAgent}
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FiPlus className="h-5 w-5" />
              Assign New Agent
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <FiXCircle className="h-5 w-5 text-red-600 mr-2" />
              <div>
                <p className="text-red-800 font-medium">{error}</p>
                <p className="text-red-700 text-sm mt-1">
                  Please check your internet connection or try refreshing the
                  page.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
            >
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
                placeholder="Search agents or properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="terminated">Terminated</option>
              <option value="expired">Expired</option>
            </select>

            <button
              onClick={handleExportData}
              disabled={filteredAssignments.length === 0}
              className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiDownload className="h-5 w-5" />
              Export
            </button>
          </div>
        </div>

        {/* Debug Info */}
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              Showing{" "}
              <span className="font-bold">{filteredAssignments.length}</span> of{" "}
              <span className="font-bold">{assignments.length}</span>{" "}
              assignments
            </span>
            <button
              onClick={() => console.log("Assignments:", assignments)}
              className="text-blue-600 hover:text-blue-800 text-xs"
            >
              View Raw Data
            </button>
          </div>
        </div>

        {/* Agents List */}
        <div className="space-y-6">
          {filteredAssignments.length > 0 ? (
            filteredAssignments.map((assignment) => (
              <div
                key={assignment.id}
                className="border border-gray-200 rounded-xl hover:border-blue-300 transition-colors"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Agent Details */}
                    <div className="lg:w-2/5">
                      <div className="flex items-start gap-4">
                        <div className="relative">
                          <img
                            src={assignment.agent.avatar}
                            alt={assignment.agent.name}
                            className="w-20 h-20 rounded-full border-4 border-white shadow"
                            onError={(e) => {
                              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                assignment.agent.name || "Agent"
                              )}&background=3B82F6&color=fff`;
                            }}
                          />
                          <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                            <MdVerified className="h-4 w-4 text-white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-bold text-gray-900 text-lg">
                                {assignment.agent.name || "Unknown Agent"}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {assignment.agent.specialization ||
                                  "Real Estate"}{" "}
                                Specialist
                              </p>
                            </div>
                            <div className="flex items-center gap-1">
                              <FiStar className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="font-bold">
                                {assignment.agent.rating || "4.5"}
                              </span>
                              <span className="text-gray-500 text-sm">
                                ({assignment.agent.reviews || 0})
                              </span>
                            </div>
                          </div>

                          <div className="space-y-2 mb-4">
                            {assignment.agent.email && (
                              <div className="flex items-center gap-2 text-sm">
                                <FiMail className="h-4 w-4 text-gray-400" />
                                <span>{assignment.agent.email}</span>
                              </div>
                            )}
                            {assignment.agent.phone && (
                              <div className="flex items-center gap-2 text-sm">
                                <FiPhone className="h-4 w-4 text-gray-400" />
                                <span>{assignment.agent.phone}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-2 text-sm">
                              <FiCalendar className="h-4 w-4 text-gray-400" />
                              <span>
                                {assignment.agent.experience || "0 years"}{" "}
                                experience
                              </span>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                                handleContactAgent(assignment.agent)
                              }
                              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              <FiMessageSquare className="h-4 w-4" />
                              Message
                            </button>
                            <button
                              onClick={() =>
                                handleCallAgent(assignment.agent.phone)
                              }
                              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              <FiPhone className="h-4 w-4" />
                              Call
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Property Details */}
                    <div className="lg:w-1/3 border-l lg:border-l-0 lg:border-r border-gray-200 lg:px-6">
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-500 mb-2">
                          ASSIGNED PROPERTY
                        </h4>
                        <div className="flex items-center gap-3">
                          <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                            <img
                              src={assignment.property.image}
                              alt={assignment.property.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src =
                                  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400";
                              }}
                            />
                          </div>
                          <div>
                            <h5 className="font-bold text-gray-900">
                              {assignment.property.name || "Unnamed Property"}
                            </h5>
                            <p className="text-sm text-gray-600">
                              {assignment.property.address ||
                                "Address not available"}
                            </p>
                            <p className="font-bold text-blue-600 mt-1">
                              {assignment.property.price || "AED 0"}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Assigned Date:</span>
                          <span className="font-medium">
                            {assignment.assignmentDate || "N/A"}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Last Contact:</span>
                          <span className="font-medium">
                            {assignment.lastContact || "Never"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Agreement & Actions */}
                    <div className="lg:w-2/5 lg:pl-6">
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-500 mb-2">
                          AGREEMENT DETAILS
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <div className="text-xs text-blue-600">
                              COMMISSION
                            </div>
                            <div className="font-bold text-gray-900">
                              {assignment.agreement.commission || "5%"}
                            </div>
                          </div>
                          <div className="bg-green-50 p-3 rounded-lg">
                            <div className="text-xs text-green-600">
                              DURATION
                            </div>
                            <div className="font-bold text-gray-900">
                              {assignment.agreement.duration || "Ongoing"}
                            </div>
                          </div>
                          <div className="bg-purple-50 p-3 rounded-lg">
                            <div className="text-xs text-purple-600">TYPE</div>
                            <div className="font-bold text-gray-900">
                              {assignment.agreement.type || "shared"}
                            </div>
                          </div>
                          <div
                            className={`p-3 rounded-lg ${
                              assignment.agreement.status === "active"
                                ? "bg-green-50"
                                : assignment.agreement.status === "pending"
                                ? "bg-yellow-50"
                                : "bg-red-50"
                            }`}
                          >
                            <div
                              className={`text-xs ${
                                assignment.agreement.status === "active"
                                  ? "text-green-600"
                                  : assignment.agreement.status === "pending"
                                  ? "text-yellow-600"
                                  : "text-red-600"
                              }`}
                            >
                              STATUS
                            </div>
                            <div
                              className={`font-bold ${
                                assignment.agreement.status === "active"
                                  ? "text-green-800"
                                  : assignment.agreement.status === "pending"
                                  ? "text-yellow-800"
                                  : "text-red-800"
                              }`}
                            >
                              {(
                                assignment.agreement.status || "pending"
                              ).toUpperCase()}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Performance Metrics */}
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-500 mb-2">
                          PERFORMANCE
                        </h4>
                        <div className="grid grid-cols-4 gap-2">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">
                              {assignment.performance.inquiries || 0}
                            </div>
                            <div className="text-xs text-gray-600">
                              Inquiries
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">
                              {assignment.performance.viewings || 0}
                            </div>
                            <div className="text-xs text-gray-600">
                              Viewings
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600">
                              {assignment.performance.offers || 0}
                            </div>
                            <div className="text-xs text-gray-600">Offers</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-yellow-600">
                              {assignment.performance.successRate || "0%"}
                            </div>
                            <div className="text-xs text-gray-600">
                              Success Rate
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => handleViewPerformance(assignment)}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm transition-colors"
                        >
                          <FiTrendingUp className="h-4 w-4" />
                          Performance
                        </button>
                        {assignment.agreement.status === "active" ? (
                          <button
                            onClick={() =>
                              handleTerminateAssignment(assignment.id)
                            }
                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 text-sm transition-colors"
                          >
                            <FiXCircle className="h-4 w-4" />
                            Terminate
                          </button>
                        ) : assignment.agreement.status === "expired" ? (
                          <button
                            onClick={() => handleExtendAgreement(assignment.id)}
                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 text-sm transition-colors"
                          >
                            <FiCheckCircle className="h-4 w-4" />
                            Extend
                          </button>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiUsers className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm || statusFilter !== "all"
                  ? "No Agents Found"
                  : "No Agents Assigned"}
              </h3>
              <p className="text-gray-500 mb-4">
                {searchTerm || statusFilter !== "all"
                  ? "No agents match your search criteria. Try adjusting your filters."
                  : "You haven't assigned any agents to your properties yet."}
              </p>
              {!(searchTerm || statusFilter !== "all") && (
                <button
                  onClick={handleAssignNewAgent}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mx-auto"
                >
                  <FiPlus className="h-5 w-5" />
                  Assign Your First Agent
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FiStar className="h-5 w-5 text-yellow-500" />
          Working with Agents
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
              <FiDollarSign className="h-5 w-5 text-blue-600" />
            </div>
            <h4 className="font-bold text-gray-900 mb-2">
              Commission Structure
            </h4>
            <p className="text-sm text-gray-600">
              Commission is typically 3-6% of the sale price, paid upon
              successful transaction.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
              <FiMessageSquare className="h-5 w-5 text-green-600" />
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Regular Updates</h4>
            <p className="text-sm text-gray-600">
              Expect regular updates on viewings, inquiries, and market feedback
              from your agent.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
              <FiCheckCircle className="h-5 w-5 text-purple-600" />
            </div>
            <h4 className="font-bold text-gray-900 mb-2">
              Performance Monitoring
            </h4>
            <p className="text-sm text-gray-600">
              Track agent performance through metrics like inquiries generated
              and viewing conversions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerAssignedAgents;

// import React, { useState } from "react";
// import {
//   FiSearch,
//   FiFilter,
//   FiUsers,
//   FiStar,
//   FiMessageSquare,
//   FiPhone,
//   FiMail,
//   FiCheckCircle,
//   FiXCircle,
//   FiEdit2,
//   FiTrash2,
//   FiEye,
//   FiPlus,
//   FiDownload,
//   FiCalendar,
//   FiDollarSign,
//   FiTrendingUp,
//   FiChevronRight,
// } from "react-icons/fi";
// import { MdVerified, MdOutlineHandshake } from "react-icons/md";

// const OwnerAssignedAgents = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");

//   const assignedAgents = [
//     {
//       id: 1,
//       agent: {
//         name: "Michael Johnson",
//         avatar: "https://ui-avatars.com/api/?name=Michael+Johnson",
//         email: "michael.j@email.com",
//         phone: "+1 (555) 123-4567",
//         rating: 4.9,
//         reviews: 128,
//         experience: "8 years",
//         specialization: "Luxury Properties",
//       },
//       property: {
//         name: "Modern Downtown Apartment",
//         address: "123 Luxury Street, NY",
//         image:
//           "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400",
//         price: "$2,500/month",
//       },
//       assignmentDate: "2024-02-15",
//       agreement: {
//         commission: "5%",
//         duration: "6 months",
//         status: "active",
//         type: "exclusive",
//       },
//       performance: {
//         inquiries: 24,
//         viewings: 8,
//         offers: 2,
//         successRate: "85%",
//       },
//       lastContact: "2 days ago",
//     },
//     {
//       id: 2,
//       agent: {
//         name: "Sarah Williams",
//         avatar: "https://ui-avatars.com/api/?name=Sarah+Williams",
//         email: "sarah.w@email.com",
//         phone: "+1 (555) 987-6543",
//         rating: 4.7,
//         reviews: 89,
//         experience: "5 years",
//         specialization: "Commercial",
//       },
//       property: {
//         name: "Luxury Beach Villa",
//         address: "456 Ocean Drive, Miami",
//         image:
//           "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400",
//         price: "$1.2M",
//       },
//       assignmentDate: "2024-03-01",
//       agreement: {
//         commission: "6%",
//         duration: "12 months",
//         status: "active",
//         type: "shared",
//       },
//       performance: {
//         inquiries: 15,
//         viewings: 5,
//         offers: 1,
//         successRate: "72%",
//       },
//       lastContact: "1 week ago",
//     },
//     {
//       id: 3,
//       agent: {
//         name: "Robert Chen",
//         avatar: "https://ui-avatars.com/api/?name=Robert+Chen",
//         email: "robert.c@email.com",
//         phone: "+1 (555) 456-7890",
//         rating: 4.8,
//         reviews: 156,
//         experience: "10 years",
//         specialization: "Residential",
//       },
//       property: {
//         name: "Family Suburban Home",
//         address: "789 Maple Street, Austin",
//         image:
//           "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400",
//         price: "$750,000",
//       },
//       assignmentDate: "2024-01-20",
//       agreement: {
//         commission: "4.5%",
//         duration: "3 months",
//         status: "expired",
//         type: "exclusive",
//       },
//       performance: {
//         inquiries: 32,
//         viewings: 12,
//         offers: 3,
//         successRate: "91%",
//       },
//       lastContact: "1 month ago",
//     },
//   ];

//   const stats = [
//     {
//       label: "Active Agents",
//       value: "8",
//       color: "bg-green-500",
//       icon: <FiUsers />,
//     },
//     {
//       label: "Total Commissions",
//       value: "$25,400",
//       color: "bg-blue-500",
//       icon: <FiDollarSign />,
//     },
//     {
//       label: "Avg Success Rate",
//       value: "82%",
//       color: "bg-purple-500",
//       icon: <FiTrendingUp />,
//     },
//     {
//       label: "Properties with Agents",
//       value: "12",
//       color: "bg-yellow-500",
//       icon: <MdOutlineHandshake />,
//     },
//   ];

//   const handleContactAgent = (agent) => {
//     console.log("Contacting agent:", agent.name);
//     alert(`Opening contact form for ${agent.name}`);
//   };

//   const handleTerminateAssignment = (id) => {
//     if (window.confirm("Are you sure you want to terminate this assignment?")) {
//       console.log("Terminating assignment:", id);
//       alert("Assignment terminated!");
//     }
//   };

//   const handleViewPerformance = (agent) => {
//     console.log("Viewing performance for:", agent.name);
//     alert(`Opening performance dashboard for ${agent.name}`);
//   };

//   const handleExtendAgreement = (id) => {
//     console.log("Extending agreement for:", id);
//     alert("Agreement extension form opened!");
//   };

//   return (
//     <div className="p-6">
//       {/* Header */}
//       <div className="mb-8">
//         <div className="flex justify-between items-start mb-4">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">
//               Assigned Agents
//             </h1>
//             <p className="text-gray-600 mt-1">
//               Manage agents assigned to your properties
//             </p>
//           </div>
//           <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
//             <FiPlus className="h-5 w-5" />
//             Assign New Agent
//           </button>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           {stats.map((stat, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
//             >
//               <div className="flex items-center">
//                 <div className={`${stat.color} p-3 rounded-lg`}>
//                   <div className="text-white text-xl">{stat.icon}</div>
//                 </div>
//                 <div className="ml-4">
//                   <p className="text-sm text-gray-600">{stat.label}</p>
//                   <p className="text-2xl font-bold mt-1">{stat.value}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Filters and Search */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
//         <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
//           <div className="flex-1">
//             <div className="relative max-w-md">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <FiSearch className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="search"
//                 placeholder="Search agents or properties..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             </div>
//           </div>

//           <div className="flex flex-wrap gap-3">
//             <select
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//               className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="all">All Status</option>
//               <option value="active">Active</option>
//               <option value="expired">Expired</option>
//               <option value="pending">Pending</option>
//             </select>

//             <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50">
//               <FiDownload className="h-5 w-5" />
//               Export
//             </button>
//           </div>
//         </div>

//         {/* Agents List */}
//         <div className="space-y-6">
//           {assignedAgents.map((assignment) => (
//             <div
//               key={assignment.id}
//               className="border border-gray-200 rounded-xl hover:border-blue-300 transition-colors"
//             >
//               <div className="p-6">
//                 <div className="flex flex-col lg:flex-row gap-6">
//                   {/* Agent Details */}
//                   <div className="lg:w-2/5">
//                     <div className="flex items-start gap-4">
//                       <div className="relative">
//                         <img
//                           src={assignment.agent.avatar}
//                           alt={assignment.agent.name}
//                           className="w-20 h-20 rounded-full border-4 border-white shadow"
//                         />
//                         <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
//                           <MdVerified className="h-4 w-4 text-white" />
//                         </div>
//                       </div>
//                       <div className="flex-1">
//                         <div className="flex items-start justify-between mb-2">
//                           <div>
//                             <h3 className="font-bold text-gray-900 text-lg">
//                               {assignment.agent.name}
//                             </h3>
//                             <p className="text-sm text-gray-600">
//                               {assignment.agent.specialization} Specialist
//                             </p>
//                           </div>
//                           <div className="flex items-center gap-1">
//                             <FiStar className="h-4 w-4 text-yellow-500 fill-current" />
//                             <span className="font-bold">
//                               {assignment.agent.rating}
//                             </span>
//                             <span className="text-gray-500 text-sm">
//                               ({assignment.agent.reviews})
//                             </span>
//                           </div>
//                         </div>

//                         <div className="space-y-2 mb-4">
//                           <div className="flex items-center gap-2 text-sm">
//                             <FiMail className="h-4 w-4 text-gray-400" />
//                             <span>{assignment.agent.email}</span>
//                           </div>
//                           <div className="flex items-center gap-2 text-sm">
//                             <FiPhone className="h-4 w-4 text-gray-400" />
//                             <span>{assignment.agent.phone}</span>
//                           </div>
//                           <div className="flex items-center gap-2 text-sm">
//                             <FiCalendar className="h-4 w-4 text-gray-400" />
//                             <span>
//                               {assignment.agent.experience} experience
//                             </span>
//                           </div>
//                         </div>

//                         <div className="flex gap-2">
//                           <button
//                             onClick={() => handleContactAgent(assignment.agent)}
//                             className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                           >
//                             <FiMessageSquare className="h-4 w-4" />
//                             Message
//                           </button>
//                           <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
//                             <FiPhone className="h-4 w-4" />
//                             Call
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Property Details */}
//                   <div className="lg:w-1/3 border-l lg:border-l-0 lg:border-r border-gray-200 lg:px-6">
//                     <div className="mb-4">
//                       <h4 className="text-sm font-medium text-gray-500 mb-2">
//                         ASSIGNED PROPERTY
//                       </h4>
//                       <div className="flex items-center gap-3">
//                         <div className="w-16 h-16 rounded-lg overflow-hidden">
//                           <img
//                             src={assignment.property.image}
//                             alt={assignment.property.name}
//                             className="w-full h-full object-cover"
//                           />
//                         </div>
//                         <div>
//                           <h5 className="font-bold text-gray-900">
//                             {assignment.property.name}
//                           </h5>
//                           <p className="text-sm text-gray-600">
//                             {assignment.property.address}
//                           </p>
//                           <p className="font-bold text-blue-600 mt-1">
//                             {assignment.property.price}
//                           </p>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="space-y-2">
//                       <div className="flex justify-between text-sm">
//                         <span className="text-gray-600">Assigned Date:</span>
//                         <span className="font-medium">
//                           {assignment.assignmentDate}
//                         </span>
//                       </div>
//                       <div className="flex justify-between text-sm">
//                         <span className="text-gray-600">Last Contact:</span>
//                         <span className="font-medium">
//                           {assignment.lastContact}
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Agreement & Actions */}
//                   <div className="lg:w-2/5 lg:pl-6">
//                     <div className="mb-4">
//                       <h4 className="text-sm font-medium text-gray-500 mb-2">
//                         AGREEMENT DETAILS
//                       </h4>
//                       <div className="grid grid-cols-2 gap-3">
//                         <div className="bg-blue-50 p-3 rounded-lg">
//                           <div className="text-xs text-blue-600">
//                             COMMISSION
//                           </div>
//                           <div className="font-bold text-gray-900">
//                             {assignment.agreement.commission}
//                           </div>
//                         </div>
//                         <div className="bg-green-50 p-3 rounded-lg">
//                           <div className="text-xs text-green-600">DURATION</div>
//                           <div className="font-bold text-gray-900">
//                             {assignment.agreement.duration}
//                           </div>
//                         </div>
//                         <div className="bg-purple-50 p-3 rounded-lg">
//                           <div className="text-xs text-purple-600">TYPE</div>
//                           <div className="font-bold text-gray-900">
//                             {assignment.agreement.type}
//                           </div>
//                         </div>
//                         <div
//                           className={`p-3 rounded-lg ${
//                             assignment.agreement.status === "active"
//                               ? "bg-green-50"
//                               : "bg-red-50"
//                           }`}
//                         >
//                           <div
//                             className={`text-xs ${
//                               assignment.agreement.status === "active"
//                                 ? "text-green-600"
//                                 : "text-red-600"
//                             }`}
//                           >
//                             STATUS
//                           </div>
//                           <div
//                             className={`font-bold ${
//                               assignment.agreement.status === "active"
//                                 ? "text-green-800"
//                                 : "text-red-800"
//                             }`}
//                           >
//                             {assignment.agreement.status.toUpperCase()}
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Performance Metrics */}
//                     <div className="mb-4">
//                       <h4 className="text-sm font-medium text-gray-500 mb-2">
//                         PERFORMANCE
//                       </h4>
//                       <div className="grid grid-cols-4 gap-2">
//                         <div className="text-center">
//                           <div className="text-2xl font-bold text-blue-600">
//                             {assignment.performance.inquiries}
//                           </div>
//                           <div className="text-xs text-gray-600">Inquiries</div>
//                         </div>
//                         <div className="text-center">
//                           <div className="text-2xl font-bold text-green-600">
//                             {assignment.performance.viewings}
//                           </div>
//                           <div className="text-xs text-gray-600">Viewings</div>
//                         </div>
//                         <div className="text-center">
//                           <div className="text-2xl font-bold text-purple-600">
//                             {assignment.performance.offers}
//                           </div>
//                           <div className="text-xs text-gray-600">Offers</div>
//                         </div>
//                         <div className="text-center">
//                           <div className="text-2xl font-bold text-yellow-600">
//                             {assignment.performance.successRate}
//                           </div>
//                           <div className="text-xs text-gray-600">
//                             Success Rate
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Actions */}
//                     <div className="flex flex-wrap gap-2">
//                       <button
//                         onClick={() => handleViewPerformance(assignment.agent)}
//                         className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm"
//                       >
//                         <FiTrendingUp className="h-4 w-4" />
//                         Performance
//                       </button>
//                       {assignment.agreement.status === "active" ? (
//                         <button
//                           onClick={() =>
//                             handleTerminateAssignment(assignment.id)
//                           }
//                           className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 text-sm"
//                         >
//                           <FiXCircle className="h-4 w-4" />
//                           Terminate
//                         </button>
//                       ) : (
//                         <button
//                           onClick={() => handleExtendAgreement(assignment.id)}
//                           className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 text-sm"
//                         >
//                           <FiCheckCircle className="h-4 w-4" />
//                           Extend
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* No Results */}
//         {assignedAgents.length === 0 && (
//           <div className="text-center py-12">
//             <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <FiUsers className="h-12 w-12 text-gray-400" />
//             </div>
//             <h3 className="text-lg font-medium text-gray-900 mb-2">
//               No Agents Assigned
//             </h3>
//             <p className="text-gray-500 mb-4">
//               You haven't assigned any agents to your properties yet.
//             </p>
//             <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mx-auto">
//               <FiPlus className="h-5 w-5" />
//               Assign Your First Agent
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Quick Tips */}
//       <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
//         <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
//           <FiStar className="h-5 w-5 text-yellow-500" />
//           Working with Agents
//         </h3>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="bg-white p-4 rounded-lg border border-gray-200">
//             <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
//               <FiDollarSign className="h-5 w-5 text-blue-600" />
//             </div>
//             <h4 className="font-bold text-gray-900 mb-2">
//               Commission Structure
//             </h4>
//             <p className="text-sm text-gray-600">
//               Commission is typically 3-6% of the sale price, paid upon
//               successful transaction.
//             </p>
//           </div>
//           <div className="bg-white p-4 rounded-lg border border-gray-200">
//             <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
//               <FiMessageSquare className="h-5 w-5 text-green-600" />
//             </div>
//             <h4 className="font-bold text-gray-900 mb-2">Regular Updates</h4>
//             <p className="text-sm text-gray-600">
//               Expect regular updates on viewings, inquiries, and market feedback
//               from your agent.
//             </p>
//           </div>
//           <div className="bg-white p-4 rounded-lg border border-gray-200">
//             <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
//               <FiCheckCircle className="h-5 w-5 text-purple-600" />
//             </div>
//             <h4 className="font-bold text-gray-900 mb-2">
//               Performance Monitoring
//             </h4>
//             <p className="text-sm text-gray-600">
//               Track agent performance through metrics like inquiries generated
//               and viewing conversions.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OwnerAssignedAgents;
