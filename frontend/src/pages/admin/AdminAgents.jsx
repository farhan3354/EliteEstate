import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import api from "../../utils/routeapi";

const AdminAgents = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 1,
  });
  const [stats, setStats] = useState({
    totalAgents: 0,
    activeAgents: 0,
    pendingApproval: 0,
    inactiveAgents: 0,
  });

  const token = useSelector((state) => state.auth.token);

  const fetchAgents = async () => {
    try {
      setLoading(true);
      const response = await api.get("/admin/agents", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          page: pagination.page,
          limit: pagination.limit,
          verificationStatus:
            filterStatus === "pending" ? "pending" : undefined,
          search: searchTerm || undefined,
        },
      });

      if (response.data.success) {
        setAgents(response.data.data.agents);
        setPagination(response.data.data.pagination);
        setStats(response.data.data.summary);
      }
    } catch (error) {
      console.error("Error fetching agents:", error);
      alert("Failed to load agents. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchAgents();
    }
  }, [token, pagination.page, filterStatus]);

  const handleSearch = () => {
    setPagination({ ...pagination, page: 1 });
    fetchAgents();
  };

  const updateAgentVerification = async (agentId, verificationStatus) => {
    try {
      const response = await api.put(
        `/admin/agents/${agentId}/verify`,
        { verificationStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        fetchAgents(); 
        alert(`Agent ${verificationStatus} successfully`);
      }
    } catch (error) {
      console.error("Error updating agent:", error);
      alert("Failed to update agent status");
    }
  };

  const deleteAgent = async (agentId) => {
    if (window.confirm("Are you sure you want to delete this agent?")) {
      try {
        const response = await api.delete(`/api/admin/agents/${agentId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          fetchAgents(); 
          alert("Agent deleted successfully");
        }
      } catch (error) {
        console.error("Error deleting agent:", error);
        alert("Failed to delete agent");
      }
    }
  };

  const viewAgentDetails = async (agentId) => {
    try {
      const response = await api.get(`/admin/agents/${agentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setSelectedAgent(response.data.data);
        setShowDetailsModal(true);
      }
    } catch (error) {
      console.error("Error fetching agent details:", error);
      alert("Failed to load agent details");
    }
  };

  if (loading && agents.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">Loading agents...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Agents Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage and monitor all real estate agents in the system
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">
                {stats.totalAgents}
              </p>
              <p className="text-gray-600">Total Agents</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">
                {stats.activeAgents}
              </p>
              <p className="text-gray-600">Active Agents</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <svg
                className="w-6 h-6 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">
                {stats.pendingApproval}
              </p>
              <p className="text-gray-600">Pending Approval</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">
                {stats.totalListings || 0}
              </p>
              <p className="text-gray-600">Total Listings</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search agents by name, email, or agency..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSearch}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Search
              </button>
            </div>
          </div>
          <select
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value);
              setPagination({ ...pagination, page: 1 });
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="verified">Verified</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
            <option value="under_review">Under Review</option>
          </select>
        </div>
      </div>

      {/* Agents Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Agent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  License & Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Verification Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Registered Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {agents.map((agent) => (
                <tr key={agent._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {agent.user?.name?.charAt(0).toUpperCase() || "A"}
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900">
                            {agent.user?.name || "N/A"}
                          </div>
                          {agent.verificationStatus === "verified" && (
                            <svg
                              className="w-4 h-4 ml-1 text-blue-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">
                          {agent.user?.email || "N/A"}
                        </div>
                        <div className="text-sm text-gray-500">
                          {agent.user?.phone || "N/A"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {agent.licenseNumber || "N/A"}
                    </div>
                    <div className="text-sm text-gray-500">
                      Exp: {new Date(agent.licenseExpiry).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      {agent.yearsOfExperience || 0} years exp
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div>Listed: {agent.totalListings || 0}</div>
                      <div>Sold: {agent.soldListings || 0}</div>
                      <div className="flex items-center">
                        <span>Rating: </span>
                        <span className="ml-1 text-yellow-500">
                          {agent.rating?.average || 0}
                        </span>
                        <svg
                          className="w-4 h-4 text-yellow-500 ml-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        agent.verificationStatus === "verified"
                          ? "bg-green-100 text-green-800"
                          : agent.verificationStatus === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : agent.verificationStatus === "rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {agent.verificationStatus}
                    </span>
                    <div className="text-xs text-gray-500 mt-1">
                      User: {agent.user?.status || "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(agent.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => viewAgentDetails(agent._id)}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200"
                    >
                      View
                    </button>
                    {agent.verificationStatus === "pending" && (
                      <>
                        <button
                          onClick={() =>
                            updateAgentVerification(agent._id, "verified")
                          }
                          className="px-3 py-1 bg-green-100 text-green-700 rounded text-xs hover:bg-green-200"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            updateAgentVerification(agent._id, "rejected")
                          }
                          className="px-3 py-1 bg-red-100 text-red-700 rounded text-xs hover:bg-red-200"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {agent.verificationStatus === "verified" && (
                      <button
                        onClick={() =>
                          updateAgentVerification(agent._id, "under_review")
                        }
                        className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded text-xs hover:bg-yellow-200"
                      >
                        Review
                      </button>
                    )}
                    <button
                      onClick={() => deleteAgent(agent._id)}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-xs hover:bg-gray-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
            <div className="text-sm text-gray-700">
              Showing page {pagination.page} of {pagination.pages}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() =>
                  setPagination({ ...pagination, page: pagination.page - 1 })
                }
                disabled={pagination.page === 1}
                className="px-3 py-1 border rounded text-sm disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() =>
                  setPagination({ ...pagination, page: pagination.page + 1 })
                }
                disabled={pagination.page === pagination.pages}
                className="px-3 py-1 border rounded text-sm disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {agents.length === 0 && !loading && (
          <div className="text-center py-8">
            <p className="text-gray-500">
              No agents found matching your criteria.
            </p>
          </div>
        )}
      </div>

      {/* Agent Details Modal */}
      {showDetailsModal && selectedAgent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Agent Details
                </h3>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                {/* Personal Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-4">
                      Personal Information
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-600">
                          Full Name
                        </label>
                        <p className="text-gray-900">
                          {selectedAgent.user?.name}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">
                          Email
                        </label>
                        <p className="text-gray-900">
                          {selectedAgent.user?.email}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">
                          Phone
                        </label>
                        <p className="text-gray-900">
                          {selectedAgent.user?.phone}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">
                          User Status
                        </label>
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            selectedAgent.user?.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {selectedAgent.user?.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Professional Info */}
                  <div>
                    <h4 className="text-lg font-semibold mb-4">
                      Professional Information
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-600">
                          License Number
                        </label>
                        <p className="text-gray-900">
                          {selectedAgent.licenseNumber}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">
                          License Expiry
                        </label>
                        <p className="text-gray-900">
                          {new Date(
                            selectedAgent.licenseExpiry
                          ).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">
                          Years of Experience
                        </label>
                        <p className="text-gray-900">
                          {selectedAgent.yearsOfExperience}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">
                          Verification Status
                        </label>
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            selectedAgent.verificationStatus === "verified"
                              ? "bg-green-100 text-green-800"
                              : selectedAgent.verificationStatus === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {selectedAgent.verificationStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Specialization & Languages */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-4">
                      Specialization
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedAgent.specialization?.map((spec, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                        >
                          {spec}
                        </span>
                      ))}
                      {(!selectedAgent.specialization ||
                        selectedAgent.specialization.length === 0) && (
                        <p className="text-gray-500">
                          No specializations listed
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-4">Languages</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedAgent.languages?.map((lang, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
                        >
                          {lang}
                        </span>
                      ))}
                      {(!selectedAgent.languages ||
                        selectedAgent.languages.length === 0) && (
                        <p className="text-gray-500">No languages listed</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Performance */}
                <div>
                  <h4 className="text-lg font-semibold mb-4">
                    Performance Metrics
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">
                        {selectedAgent.totalListings || 0}
                      </p>
                      <p className="text-sm text-gray-600">Total Listings</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">
                        {selectedAgent.soldListings || 0}
                      </p>
                      <p className="text-sm text-gray-600">Properties Sold</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-2xl font-bold text-yellow-600">
                        {selectedAgent.rating?.average || 0}
                      </p>
                      <p className="text-sm text-gray-600">Rating</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-2xl font-bold text-purple-600">
                        ${(selectedAgent.totalCommission || 0).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600">Total Commission</p>
                    </div>
                  </div>
                </div>

                {/* Bio & Contact */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-4">Bio</h4>
                    <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                      {selectedAgent.bio || "No bio provided"}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-4">
                      Contact Details
                    </h4>
                    <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                      {selectedAgent.officeAddress && (
                        <div>
                          <label className="text-sm font-medium text-gray-600">
                            Office Address
                          </label>
                          <p className="text-gray-900">
                            {selectedAgent.officeAddress}
                          </p>
                        </div>
                      )}
                      {selectedAgent.officePhone && (
                        <div>
                          <label className="text-sm font-medium text-gray-600">
                            Office Phone
                          </label>
                          <p className="text-gray-900">
                            {selectedAgent.officePhone}
                          </p>
                        </div>
                      )}
                      {selectedAgent.website && (
                        <div>
                          <label className="text-sm font-medium text-gray-600">
                            Website
                          </label>
                          <p className="text-gray-900">
                            {selectedAgent.website}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAgents;

// import React, { useState, useEffect } from "react";

// const AdminAgents = () => {
//   const [agents, setAgents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterStatus, setFilterStatus] = useState("all");
//   const [selectedAgent, setSelectedAgent] = useState(null);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);

//   // Mock data - replace with actual API call
//   useEffect(() => {
//     const mockAgents = [
//       {
//         id: 1,
//         name: "Sarah Wilson",
//         email: "sarah@example.com",
//         phone: "+971502345678",
//         role: "agent",
//         status: "active",
//         joinedDate: "2024-01-10",
//         propertiesListed: 12,
//         propertiesSold: 8,
//         commissionRate: "3%",
//         rating: 4.8,
//         licenseNumber: "BRE-123456",
//         agency: "Premium Real Estate",
//         bio: "Experienced real estate agent with over 5 years in Dubai market. Specialized in luxury apartments and villas.",
//         profileImage: null,
//         lastActive: "2024-01-20",
//         totalEarnings: 125000,
//         verified: true,
//       },
//       {
//         id: 2,
//         name: "Emily Brown",
//         email: "emily@example.com",
//         phone: "+971504567890",
//         role: "agent",
//         status: "active",
//         joinedDate: "2024-01-01",
//         propertiesListed: 8,
//         propertiesSold: 5,
//         commissionRate: "2.5%",
//         rating: 4.6,
//         licenseNumber: "BRE-123457",
//         agency: "Elite Properties",
//         bio: "Specializing in commercial properties and business centers. Fluent in English and Arabic.",
//         profileImage: null,
//         lastActive: "2024-01-19",
//         totalEarnings: 85000,
//         verified: true,
//       },
//       {
//         id: 3,
//         name: "Michael Chen",
//         email: "michael@example.com",
//         phone: "+971506789012",
//         role: "agent",
//         status: "pending",
//         joinedDate: "2024-01-18",
//         propertiesListed: 0,
//         propertiesSold: 0,
//         commissionRate: "2.5%",
//         rating: 0,
//         licenseNumber: "BRE-123458",
//         agency: "New Horizon Realty",
//         bio: "New agent with strong background in customer service. Eager to help clients find their dream homes.",
//         profileImage: null,
//         lastActive: "2024-01-18",
//         totalEarnings: 0,
//         verified: false,
//       },
//       {
//         id: 4,
//         name: "Alex Rodriguez",
//         email: "alex@example.com",
//         phone: "+971508901234",
//         role: "agent",
//         status: "inactive",
//         joinedDate: "2023-12-15",
//         propertiesListed: 15,
//         propertiesSold: 10,
//         commissionRate: "3%",
//         rating: 4.7,
//         licenseNumber: "BRE-123459",
//         agency: "Luxury Homes Dubai",
//         bio: "Top-performing agent with expertise in Palm Jumeirah and Downtown Dubai properties.",
//         profileImage: null,
//         lastActive: "2024-01-10",
//         totalEarnings: 150000,
//         verified: true,
//       },
//       {
//         id: 5,
//         name: "Lisa Wang",
//         email: "lisa@example.com",
//         phone: "+971509012345",
//         role: "agent",
//         status: "active",
//         joinedDate: "2024-01-05",
//         propertiesListed: 6,
//         propertiesSold: 4,
//         commissionRate: "2.8%",
//         rating: 4.9,
//         licenseNumber: "BRE-123460",
//         agency: "Metro Realty",
//         bio: "Focus on affordable housing and first-time home buyers. Excellent negotiation skills.",
//         profileImage: null,
//         lastActive: "2024-01-20",
//         totalEarnings: 68000,
//         verified: true,
//       },
//     ];

//     setAgents(mockAgents);
//     setLoading(false);
//   }, []);

//   const filteredAgents = agents.filter((agent) => {
//     const matchesSearch =
//       agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       agent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       agent.agency.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus =
//       filterStatus === "all" || agent.status === filterStatus;
//     return matchesSearch && matchesStatus;
//   });

//   const updateAgentStatus = (agentId, status) => {
//     setAgents(
//       agents.map((agent) =>
//         agent.id === agentId ? { ...agent, status } : agent
//       )
//     );
//   };

//   const deleteAgent = (agentId) => {
//     if (window.confirm("Are you sure you want to delete this agent?")) {
//       setAgents(agents.filter((agent) => agent.id !== agentId));
//     }
//   };

//   const viewAgentDetails = (agent) => {
//     setSelectedAgent(agent);
//     setShowDetailsModal(true);
//   };

//   const approveAgent = (agentId) => {
//     setAgents(
//       agents.map((agent) =>
//         agent.id === agentId
//           ? { ...agent, status: "active", verified: true }
//           : agent
//       )
//     );
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="text-center">Loading agents...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Page Header */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">
//             Agents Management
//           </h1>
//           <p className="text-gray-600 mt-2">
//             Manage and monitor all real estate agents in the system
//           </p>
//         </div>
//       </div>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//           <div className="flex items-center">
//             <div className="p-3 bg-blue-100 rounded-lg">
//               <svg
//                 className="w-6 h-6 text-blue-600"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                 />
//               </svg>
//             </div>
//             <div className="ml-4">
//               <p className="text-2xl font-bold text-gray-900">
//                 {agents.length}
//               </p>
//               <p className="text-gray-600">Total Agents</p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//           <div className="flex items-center">
//             <div className="p-3 bg-green-100 rounded-lg">
//               <svg
//                 className="w-6 h-6 text-green-600"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>
//             </div>
//             <div className="ml-4">
//               <p className="text-2xl font-bold text-gray-900">
//                 {agents.filter((a) => a.status === "active").length}
//               </p>
//               <p className="text-gray-600">Active Agents</p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//           <div className="flex items-center">
//             <div className="p-3 bg-yellow-100 rounded-lg">
//               <svg
//                 className="w-6 h-6 text-yellow-600"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>
//             </div>
//             <div className="ml-4">
//               <p className="text-2xl font-bold text-gray-900">
//                 {agents.filter((a) => a.status === "pending").length}
//               </p>
//               <p className="text-gray-600">Pending Approval</p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//           <div className="flex items-center">
//             <div className="p-3 bg-purple-100 rounded-lg">
//               <svg
//                 className="w-6 h-6 text-purple-600"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
//                 />
//               </svg>
//             </div>
//             <div className="ml-4">
//               <p className="text-2xl font-bold text-gray-900">
//                 {agents.reduce(
//                   (total, agent) => total + agent.propertiesListed,
//                   0
//                 )}
//               </p>
//               <p className="text-gray-600">Total Listings</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Filters and Search */}
//       <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
//         <div className="flex flex-col sm:flex-row gap-4">
//           <div className="flex-1">
//             <input
//               type="text"
//               placeholder="Search agents by name, email, or agency..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <select
//             value={filterStatus}
//             onChange={(e) => setFilterStatus(e.target.value)}
//             className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="all">All Status</option>
//             <option value="active">Active</option>
//             <option value="pending">Pending</option>
//             <option value="inactive">Inactive</option>
//           </select>
//         </div>
//       </div>

//       {/* Agents Table */}
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Agent
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Agency & License
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Performance
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Joined Date
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {filteredAgents.map((agent) => (
//                 <tr key={agent.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold">
//                         {agent.name.charAt(0).toUpperCase()}
//                       </div>
//                       <div className="ml-4">
//                         <div className="flex items-center">
//                           <div className="text-sm font-medium text-gray-900">
//                             {agent.name}
//                           </div>
//                           {agent.verified && (
//                             <svg
//                               className="w-4 h-4 ml-1 text-blue-500"
//                               fill="currentColor"
//                               viewBox="0 0 20 20"
//                             >
//                               <path
//                                 fillRule="evenodd"
//                                 d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                                 clipRule="evenodd"
//                               />
//                             </svg>
//                           )}
//                         </div>
//                         <div className="text-sm text-gray-500">
//                           {agent.email}
//                         </div>
//                         <div className="text-sm text-gray-500">
//                           {agent.phone}
//                         </div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm font-medium text-gray-900">
//                       {agent.agency}
//                     </div>
//                     <div className="text-sm text-gray-500">
//                       {agent.licenseNumber}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-900">
//                       <div>Listed: {agent.propertiesListed}</div>
//                       <div>Sold: {agent.propertiesSold}</div>
//                       <div className="flex items-center">
//                         <span>Rating: </span>
//                         <span className="ml-1 text-yellow-500">
//                           {agent.rating}
//                         </span>
//                         <svg
//                           className="w-4 h-4 text-yellow-500 ml-1"
//                           fill="currentColor"
//                           viewBox="0 0 20 20"
//                         >
//                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                         </svg>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span
//                       className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
//                         agent.status === "active"
//                           ? "bg-green-100 text-green-800"
//                           : agent.status === "pending"
//                           ? "bg-yellow-100 text-yellow-800"
//                           : "bg-red-100 text-red-800"
//                       }`}
//                     >
//                       {agent.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     {new Date(agent.joinedDate).toLocaleDateString()}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
//                     <button
//                       onClick={() => viewAgentDetails(agent)}
//                       className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200"
//                     >
//                       View
//                     </button>
//                     {agent.status === "pending" && (
//                       <button
//                         onClick={() => approveAgent(agent.id)}
//                         className="px-3 py-1 bg-green-100 text-green-700 rounded text-xs hover:bg-green-200"
//                       >
//                         Approve
//                       </button>
//                     )}
//                     <button
//                       onClick={() =>
//                         updateAgentStatus(
//                           agent.id,
//                           agent.status === "active" ? "inactive" : "active"
//                         )
//                       }
//                       className={`px-3 py-1 rounded text-xs ${
//                         agent.status === "active"
//                           ? "bg-red-100 text-red-700 hover:bg-red-200"
//                           : "bg-green-100 text-green-700 hover:bg-green-200"
//                       }`}
//                     >
//                       {agent.status === "active" ? "Deactivate" : "Activate"}
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {filteredAgents.length === 0 && (
//           <div className="text-center py-8">
//             <p className="text-gray-500">
//               No agents found matching your criteria.
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Agent Details Modal */}
//       {showDetailsModal && selectedAgent && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="p-6">
//               <div className="flex justify-between items-center mb-6">
//                 <h3 className="text-xl font-bold text-gray-900">
//                   Agent Details
//                 </h3>
//                 <button
//                   onClick={() => setShowDetailsModal(false)}
//                   className="text-gray-400 hover:text-gray-600"
//                 >
//                   <svg
//                     className="w-6 h-6"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M6 18L18 6M6 6l12 12"
//                     />
//                   </svg>
//                 </button>
//               </div>

//               <div className="space-y-6">
//                 {/* Personal Info */}
//                 <div>
//                   <h4 className="text-lg font-semibold mb-4">
//                     Personal Information
//                   </h4>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="text-sm font-medium text-gray-600">
//                         Full Name
//                       </label>
//                       <p className="text-gray-900">{selectedAgent.name}</p>
//                     </div>
//                     <div>
//                       <label className="text-sm font-medium text-gray-600">
//                         Email
//                       </label>
//                       <p className="text-gray-900">{selectedAgent.email}</p>
//                     </div>
//                     <div>
//                       <label className="text-sm font-medium text-gray-600">
//                         Phone
//                       </label>
//                       <p className="text-gray-900">{selectedAgent.phone}</p>
//                     </div>
//                     <div>
//                       <label className="text-sm font-medium text-gray-600">
//                         License Number
//                       </label>
//                       <p className="text-gray-900">
//                         {selectedAgent.licenseNumber}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Professional Info */}
//                 <div>
//                   <h4 className="text-lg font-semibold mb-4">
//                     Professional Information
//                   </h4>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="text-sm font-medium text-gray-600">
//                         Agency
//                       </label>
//                       <p className="text-gray-900">{selectedAgent.agency}</p>
//                     </div>
//                     <div>
//                       <label className="text-sm font-medium text-gray-600">
//                         Commission Rate
//                       </label>
//                       <p className="text-gray-900">
//                         {selectedAgent.commissionRate}
//                       </p>
//                     </div>
//                     <div>
//                       <label className="text-sm font-medium text-gray-600">
//                         Joined Date
//                       </label>
//                       <p className="text-gray-900">
//                         {new Date(
//                           selectedAgent.joinedDate
//                         ).toLocaleDateString()}
//                       </p>
//                     </div>
//                     <div>
//                       <label className="text-sm font-medium text-gray-600">
//                         Last Active
//                       </label>
//                       <p className="text-gray-900">
//                         {new Date(
//                           selectedAgent.lastActive
//                         ).toLocaleDateString()}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Performance */}
//                 <div>
//                   <h4 className="text-lg font-semibold mb-4">
//                     Performance Metrics
//                   </h4>
//                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
//                     <div className="bg-gray-50 p-4 rounded-lg">
//                       <p className="text-2xl font-bold text-blue-600">
//                         {selectedAgent.propertiesListed}
//                       </p>
//                       <p className="text-sm text-gray-600">Listed</p>
//                     </div>
//                     <div className="bg-gray-50 p-4 rounded-lg">
//                       <p className="text-2xl font-bold text-green-600">
//                         {selectedAgent.propertiesSold}
//                       </p>
//                       <p className="text-sm text-gray-600">Sold</p>
//                     </div>
//                     <div className="bg-gray-50 p-4 rounded-lg">
//                       <p className="text-2xl font-bold text-yellow-600">
//                         {selectedAgent.rating}
//                       </p>
//                       <p className="text-sm text-gray-600">Rating</p>
//                     </div>
//                     <div className="bg-gray-50 p-4 rounded-lg">
//                       <p className="text-2xl font-bold text-purple-600">
//                         ${selectedAgent.totalEarnings.toLocaleString()}
//                       </p>
//                       <p className="text-sm text-gray-600">Earnings</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Bio */}
//                 <div>
//                   <h4 className="text-lg font-semibold mb-4">Bio</h4>
//                   <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
//                     {selectedAgent.bio}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
//                 <button
//                   onClick={() => setShowDetailsModal(false)}
//                   className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminAgents;
