import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import api from "../../utils/routeapi";
import {
  FiSearch,
  FiFilter,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiCheckCircle,
  FiXCircle,
  FiUser,
  FiMail,
  FiPhone,
  FiCalendar,
  FiHome,
  FiPlus,
  FiDownload,
  FiChevronLeft,
  FiChevronRight,
  FiAlertCircle,
  FiRefreshCw,
} from "react-icons/fi";
import { MdVerified, MdWarning } from "react-icons/md";

const AdminOwners = () => {
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOwners, setSelectedOwners] = useState([]);
  const [stats, setStats] = useState({
    totalOwners: 0,
    verifiedOwners: 0,
    pendingOwners: 0,
    rejectedOwners: 0,
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 1,
  });
  const [overallStats, setOverallStats] = useState({
    totalOwners: 24,
    verifiedOwners: 18,
    pendingVerification: 4,
    suspendedOwners: 2,
  });

  const token = useSelector((state) => state.auth.token);

  // Fetch owners from API
  const fetchOwners = async () => {
    try {
      setLoading(true);
      const response = await api.get("/owners", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          page: pagination.page,
          limit: pagination.limit,
          verificationStatus: statusFilter !== "all" ? statusFilter : undefined,
          search: searchTerm || undefined,
        },
      });

      if (response.data.success) {
        setOwners(response.data.data.owners);
        setPagination(response.data.data.pagination);
        setStats(response.data.data.stats);
      }
    } catch (error) {
      console.error("Error fetching owners:", error);
      alert("Failed to load owners. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOwners();
    }
  }, [token, pagination.page, statusFilter]);

  const handleSearch = () => {
    setPagination({ ...pagination, page: 1 });
    fetchOwners();
  };

  // Verify owner
  const verifyOwner = async (id) => {
    try {
      const response = await api.put(
        `/owners/${id}/verify`,
        { verificationStatus: "verified" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        fetchOwners(); // Refresh list
        alert("Owner verified successfully!");
      }
    } catch (error) {
      console.error("Error verifying owner:", error);
      alert("Failed to verify owner");
    }
  };

  // Reject owner
  const rejectOwner = async (id) => {
    try {
      const response = await api.put(
        `/owners/${id}/verify`,
        { verificationStatus: "rejected" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        fetchOwners(); // Refresh list
        alert("Owner rejected successfully!");
      }
    } catch (error) {
      console.error("Error rejecting owner:", error);
      alert("Failed to reject owner");
    }
  };

  // Suspend owner
  const suspendOwner = async (id) => {
    if (window.confirm("Are you sure you want to suspend this owner?")) {
      try {
        const response = await api.put(
          `/owners/${id}/status`,
          { status: "suspended" },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.success) {
          fetchOwners(); // Refresh list
          alert("Owner suspended successfully!");
        }
      } catch (error) {
        console.error("Error suspending owner:", error);
        alert("Failed to suspend owner");
      }
    }
  };

  // Activate owner
  const activateOwner = async (id) => {
    try {
      const response = await api.put(
        `/owners/${id}/status`,
        { status: "active" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        fetchOwners(); // Refresh list
        alert("Owner activated successfully!");
      }
    } catch (error) {
      console.error("Error activating owner:", error);
      alert("Failed to activate owner");
    }
  };

  // Delete owner
  const deleteOwner = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this owner? This action cannot be undone."
      )
    ) {
      try {
        const response = await api.delete(`/owners/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          fetchOwners(); // Refresh list
          alert("Owner deleted successfully!");
        }
      } catch (error) {
        console.error("Error deleting owner:", error);
        alert("Failed to delete owner");
      }
    }
  };

  const handleSelectOwner = (id) => {
    setSelectedOwners((prev) =>
      prev.includes(id)
        ? prev.filter((ownerId) => ownerId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedOwners.length === owners.length && owners.length > 0) {
      setSelectedOwners([]);
    } else {
      setSelectedOwners(owners.map((owner) => owner._id));
    }
  };

  // Bulk actions
  // const bulkVerifyOwners = async () => {
  //   if (selectedOwners.length === 0) return;

  //   if (
  //     window.confirm(
  //       `Are you sure you want to verify ${selectedOwners.length} owner(s)?`
  //     )
  //   ) {
  //     try {
  //       const promises = selectedOwners.map((id) =>
  //         api.put(
  //           `/owners/${id}/verify`,
  //           { verificationStatus: "verified" },
  //           { headers: { Authorization: `Bearer ${token}` } }
  //         )
  //       );

  //       await Promise.all(promises);
  //       fetchOwners();
  //       setSelectedOwners([]);
  //       alert(`${selectedOwners.length} owner(s) verified successfully!`);
  //     } catch (error) {
  //       console.error("Error bulk verifying owners:", error);
  //       alert("Failed to verify owners");
  //     }
  //   }
  // };

  // const bulkSuspendOwners = async () => {
  //   if (selectedOwners.length === 0) return;

  //   if (
  //     window.confirm(
  //       `Are you sure you want to suspend ${selectedOwners.length} owner(s)?`
  //     )
  //   ) {
  //     try {
  //       const promises = selectedOwners.map((id) =>
  //         api.put(
  //           `/owners/${id}/status`,
  //           { status: "suspended" },
  //           { headers: { Authorization: `Bearer ${token}` } }
  //         )
  //       );

  //       await Promise.all(promises);
  //       fetchOwners();
  //       setSelectedOwners([]);
  //       alert(`${selectedOwners.length} owner(s) suspended successfully!`);
  //     } catch (error) {
  //       console.error("Error bulk suspending owners:", error);
  //       alert("Failed to suspend owners");
  //     }
  //   }
  // };

  // const bulkDeleteOwners = async () => {
  //   if (selectedOwners.length === 0) return;

  //   if (
  //     window.confirm(
  //       `Are you sure you want to delete ${selectedOwners.length} owner(s)? This action cannot be undone.`
  //     )
  //   ) {
  //     try {
  //       const promises = selectedOwners.map((id) =>
  //         api.delete(`/owners/${id}`, {
  //           headers: { Authorization: `Bearer ${token}` },
  //         })
  //       );

  //       await Promise.all(promises);
  //       fetchOwners();
  //       setSelectedOwners([]);
  //       alert(`${selectedOwners.length} owner(s) deleted successfully!`);
  //     } catch (error) {
  //       console.error("Error bulk deleting owners:", error);
  //       alert("Failed to delete owners");
  //     }
  //   }
  // };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "under_review":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getUserStatusBadgeClass = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "suspended":
        return "bg-red-100 text-red-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading && owners.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">Loading owners...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Property Owners Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage and monitor all property owners on the platform
          </p>
        </div>
        <button
          onClick={fetchOwners}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <FiRefreshCw className="h-5 w-5" />
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            label: "Total Owners",
            value: stats.totalOwners || 0,
            color: "bg-blue-500",
            icon: <FiUser />,
          },
          {
            label: "Verified Owners",
            value: stats.verifiedOwners || 0,
            color: "bg-green-500",
            icon: <FiCheckCircle />,
          },
          {
            label: "Pending Verification",
            value: stats.pendingOwners || 0,
            color: "bg-yellow-500",
            icon: <FiAlertCircle />,
          },
          {
            label: "Rejected Owners",
            value: stats.rejectedOwners || 0,
            color: "bg-red-500",
            icon: <FiXCircle />,
          },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
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

      {/* Filters and Actions */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div className="flex-1">
            <div className="relative max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="search"
                placeholder="Search owners by name, email, company, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
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

            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Search
            </button>

            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <FiDownload className="h-5 w-5" />
              Export
            </button>
          </div>
        </div>

        {/* Selected Owners Actions */}
        {/* {selectedOwners.length > 0 && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-blue-700 font-medium">
                  {selectedOwners.length} owner(s) selected
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={bulkVerifyOwners}
                    className="px-3 py-1.5 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200"
                  >
                    Verify Selected
                  </button>
                  <button
                    onClick={bulkSuspendOwners}
                    className="px-3 py-1.5 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
                  >
                    Suspend Selected
                  </button>
                  <button
                    onClick={bulkDeleteOwners}
                    className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                  >
                    Delete Selected
                  </button>
                </div>
              </div>
              <button
                onClick={() => setSelectedOwners([])}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Clear Selection
              </button>
            </div>
          </div>
        )} */}

        {/* Owners Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    checked={
                      selectedOwners.length === owners.length && owners.length > 0
                    }
                    onChange={handleSelectAll}
                    className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Owner Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Properties
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Verification Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {owners.map((owner) => (
                <tr key={owner._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedOwners.includes(owner._id)}
                      onChange={() => handleSelectOwner(owner._id)}
                      className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <FiUser className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">
                            {owner.user?.name || "N/A"}
                          </span>
                          {owner.verificationStatus === "verified" && (
                            <MdVerified
                              className="h-4 w-4 text-green-500"
                              title="Verified"
                            />
                          )}
                        </div>
                        <div className="text-sm text-gray-500">
                          {owner.user?.email || "N/A"}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                          <FiPhone className="h-3 w-3" />
                          {owner.user?.phone || "N/A"}
                        </div>
                        {owner.companyName && (
                          <div className="text-xs text-gray-500 mt-1">
                            Company: {owner.companyName}
                          </div>
                        )}
                        {owner.businessAddress?.city && (
                          <div className="text-xs text-gray-400 mt-1">
                            {owner.businessAddress.city}
                            {owner.businessAddress.state &&
                              `, ${owner.businessAddress.state}`}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                        <FiHome className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">
                          {owner.totalProperties || 0}
                        </div>
                        <div className="text-sm text-gray-500">Total</div>
                        <div className="text-xs text-gray-400">
                          Active: {owner.activeProperties || 0} | Rented:{" "}
                          {owner.rentedProperties || 0} | Sold:{" "}
                          {owner.soldProperties || 0}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
                        owner.verificationStatus
                      )}`}
                    >
                      {owner.verificationStatus?.replace("_", " ") || "N/A"}
                    </span>
                    {owner.verifiedAt && (
                      <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <FiCalendar className="h-3 w-3" />
                        Verified: {formatDate(owner.verifiedAt)}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getUserStatusBadgeClass(
                        owner.user?.status
                      )}`}
                    >
                      {owner.user?.status || "N/A"}
                    </span>
                    <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      <FiCalendar className="h-3 w-3" />
                      Joined: {formatDate(owner.user?.createdAt)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          console.log("View owner details:", owner._id)
                        }
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                        title="View Details"
                      >
                        <FiEye className="h-4 w-4" />
                      </button>
                      {owner.verificationStatus !== "verified" && (
                        <button
                          onClick={() => verifyOwner(owner._id)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded"
                          title="Verify Owner"
                        >
                          <FiCheckCircle className="h-4 w-4" />
                        </button>
                      )}
                      {owner.user?.status !== "suspended" ? (
                        <button
                          onClick={() => suspendOwner(owner._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
                          title="Suspend Owner"
                        >
                          <MdWarning className="h-4 w-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => activateOwner(owner._id)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded"
                          title="Activate Owner"
                        >
                          <FiCheckCircle className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        onClick={() => rejectOwner(owner._id)}
                        className="p-2 text-orange-600 hover:bg-orange-50 rounded"
                        title="Reject Verification"
                      >
                        <FiXCircle className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteOwner(owner._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                        title="Delete Owner"
                      >
                        <FiTrash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* No owners found */}
        {owners.length === 0 && !loading && (
          <div className="text-center py-8">
            <p className="text-gray-500">No owners found matching your criteria.</p>
          </div>
        )}

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
            <div className="text-sm text-gray-700">
              Showing page {pagination.page} of {pagination.pages} • Total{" "}
              {pagination.total} owners
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setPagination({ ...pagination, page: pagination.page - 1 })
                }
                disabled={pagination.page === 1}
                className="p-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
              >
                <FiChevronLeft className="h-5 w-5" />
              </button>
              {[...Array(Math.min(5, pagination.pages))].map((_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPagination({ ...pagination, page: pageNum })}
                    className={`px-3 py-1 rounded ${
                      pageNum === pagination.page
                        ? "bg-blue-600 text-white"
                        : "border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                onClick={() =>
                  setPagination({ ...pagination, page: pagination.page + 1 })
                }
                disabled={pagination.page === pagination.pages}
                className="p-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
              >
                <FiChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Additional Information */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Stats */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Owner Statistics
          </h3>
          <div className="space-y-4">
            {[
              {
                label: "Avg Properties per Owner",
                value: "4.2",
                change: "+12%",
              },
              { label: "Active This Month", value: "18", change: "+5%" },
              { label: "New This Month", value: "6", change: "+20%" },
              { label: "Response Rate", value: "87%", change: "+3%" },
            ].map((stat, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{stat.label}</span>
                <div className="text-right">
                  <div className="font-bold text-gray-900">{stat.value}</div>
                  <div className="text-xs text-green-600">{stat.change}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            {[
              {
                action: "Sarah Johnson registered as owner",
                time: "2 hours ago",
                icon: <FiUser className="text-blue-500" />,
              },
              {
                action: "Michael Chen added 2 new properties",
                time: "5 hours ago",
                icon: <FiHome className="text-green-500" />,
              },
              {
                action: "John Smith verified by admin",
                time: "1 day ago",
                icon: <FiCheckCircle className="text-purple-500" />,
              },
              {
                action: "Emma Wilson account suspended",
                time: "2 days ago",
                icon: <MdWarning className="text-red-500" />,
              },
            ].map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.action}
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
              <span className="text-sm font-medium">Send Bulk Email</span>
              <FiMail className="h-4 w-4 text-gray-400" />
            </button>
            <button className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
              <span className="text-sm font-medium">Generate Reports</span>
              <FiDownload className="h-4 w-4 text-gray-400" />
            </button>
            <button className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
              <span className="text-sm font-medium">
                Review Pending Applications
              </span>
              <FiAlertCircle className="h-4 w-4 text-yellow-500" />
            </button>
            <button className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
              <span className="text-sm font-medium">
                Update Owner Guidelines
              </span>
              <FiEdit2 className="h-4 w-4 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOwners;

// import React, { useState } from "react";
// import {
//   FiSearch,
//   FiFilter,
//   FiEye,
//   FiEdit2,
//   FiTrash2,
//   FiCheckCircle,
//   FiXCircle,
//   FiUser,
//   FiMail,
//   FiPhone,
//   FiCalendar,
//   FiHome,
//   FiPlus,
//   FiDownload,
//   FiChevronLeft,
//   FiChevronRight,
//   FiAlertCircle,
// } from "react-icons/fi";
// import { MdVerified, MdWarning } from "react-icons/md";

// const AdminOwners = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [selectedOwners, setSelectedOwners] = useState([]);

//   // Mock data for owners
//   const owners = [
//     {
//       id: 1,
//       name: "John Smith",
//       email: "john.smith@email.com",
//       phone: "+1 (555) 123-4567",
//       properties: 5,
//       status: "verified",
//       registrationDate: "2024-01-15",
//       lastLogin: "2024-03-10",
//       verified: true,
//       location: "New York, NY",
//     },
//     {
//       id: 2,
//       name: "Sarah Johnson",
//       email: "sarah.j@email.com",
//       phone: "+1 (555) 987-6543",
//       properties: 3,
//       status: "pending",
//       registrationDate: "2024-02-20",
//       lastLogin: "2024-03-08",
//       verified: false,
//       location: "Los Angeles, CA",
//     },
//     {
//       id: 3,
//       name: "Michael Chen",
//       email: "michael.chen@email.com",
//       phone: "+1 (555) 456-7890",
//       properties: 8,
//       status: "verified",
//       registrationDate: "2024-01-05",
//       lastLogin: "2024-03-12",
//       verified: true,
//       location: "Chicago, IL",
//     },
//     {
//       id: 4,
//       name: "Emma Wilson",
//       email: "emma.w@email.com",
//       phone: "+1 (555) 321-6547",
//       properties: 2,
//       status: "suspended",
//       registrationDate: "2024-02-10",
//       lastLogin: "2024-02-25",
//       verified: false,
//       location: "Miami, FL",
//     },
//     {
//       id: 5,
//       name: "Robert Brown",
//       email: "robert.b@email.com",
//       phone: "+1 (555) 789-0123",
//       properties: 12,
//       status: "verified",
//       registrationDate: "2024-01-25",
//       lastLogin: "2024-03-15",
//       verified: true,
//       location: "Dallas, TX",
//     },
//     {
//       id: 6,
//       name: "Lisa Garcia",
//       email: "lisa.g@email.com",
//       phone: "+1 (555) 234-5678",
//       properties: 1,
//       status: "pending",
//       registrationDate: "2024-03-01",
//       lastLogin: "2024-03-05",
//       verified: false,
//       location: "Seattle, WA",
//     },
//   ];

//   const filteredOwners = owners.filter((owner) => {
//     const matchesSearch =
//       owner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       owner.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       owner.location.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesStatus =
//       statusFilter === "all" || owner.status === statusFilter;

//     return matchesSearch && matchesStatus;
//   });

//   const handleSelectOwner = (id) => {
//     setSelectedOwners((prev) =>
//       prev.includes(id)
//         ? prev.filter((ownerId) => ownerId !== id)
//         : [...prev, id]
//     );
//   };

//   const handleSelectAll = () => {
//     if (selectedOwners.length === filteredOwners.length) {
//       setSelectedOwners([]);
//     } else {
//       setSelectedOwners(filteredOwners.map((owner) => owner.id));
//     }
//   };

//   const verifyOwner = (id) => {
//     console.log("Verifying owner:", id);
//     alert(`Owner ${id} verified successfully!`);
//   };

//   const suspendOwner = (id) => {
//     console.log("Suspending owner:", id);
//     if (window.confirm("Are you sure you want to suspend this owner?")) {
//       alert(`Owner ${id} suspended!`);
//     }
//   };

//   const deleteOwner = (id) => {
//     console.log("Deleting owner:", id);
//     if (
//       window.confirm(
//         "Are you sure you want to delete this owner? This action cannot be undone."
//       )
//     ) {
//       alert(`Owner ${id} deleted!`);
//     }
//   };

//   const stats = [
//     {
//       label: "Total Owners",
//       value: "24",
//       color: "bg-blue-500",
//       icon: <FiUser />,
//     },
//     {
//       label: "Verified Owners",
//       value: "18",
//       color: "bg-green-500",
//       icon: <FiCheckCircle />,
//     },
//     {
//       label: "Pending Verification",
//       value: "4",
//       color: "bg-yellow-500",
//       icon: <FiAlertCircle />,
//     },
//     {
//       label: "Suspended Owners",
//       value: "2",
//       color: "bg-red-500",
//       icon: <FiXCircle />,
//     },
//   ];

//   return (
//     <div className="p-6">
//       {/* Header */}
//       <div className="mb-8">
//         <h1 className="text-2xl font-bold text-gray-900">
//           Property Owners Management
//         </h1>
//         <p className="text-gray-600 mt-1">
//           Manage and monitor all property owners on the platform
//         </p>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         {stats.map((stat, index) => (
//           <div
//             key={index}
//             className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
//           >
//             <div className="flex items-center">
//               <div className={`${stat.color} p-3 rounded-lg`}>
//                 <div className="text-white text-xl">{stat.icon}</div>
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm text-gray-600">{stat.label}</p>
//                 <p className="text-2xl font-bold mt-1">{stat.value}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Filters and Actions */}
//       <div className="bg-white rounded-lg shadow p-6 mb-6">
//         <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
//           <div className="flex-1">
//             <div className="relative max-w-md">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <FiSearch className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="search"
//                 placeholder="Search owners by name, email, or location..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             </div>
//           </div>

//           <div className="flex flex-wrap gap-3">
//             <select
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//               className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="all">All Status</option>
//               <option value="verified">Verified</option>
//               <option value="pending">Pending</option>
//               <option value="suspended">Suspended</option>
//             </select>

//             <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
//               <FiPlus className="h-5 w-5" />
//               Add Owner
//             </button>

//             <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
//               <FiDownload className="h-5 w-5" />
//               Export
//             </button>
//           </div>
//         </div>

//         {/* Selected Owners Actions */}
//         {selectedOwners.length > 0 && (
//           <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <span className="text-blue-700 font-medium">
//                   {selectedOwners.length} owner(s) selected
//                 </span>
//                 <div className="flex gap-2">
//                   <button
//                     onClick={() => selectedOwners.forEach(verifyOwner)}
//                     className="px-3 py-1.5 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200"
//                   >
//                     Verify Selected
//                   </button>
//                   <button
//                     onClick={() => selectedOwners.forEach(suspendOwner)}
//                     className="px-3 py-1.5 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
//                   >
//                     Suspend Selected
//                   </button>
//                   <button
//                     onClick={() => selectedOwners.forEach(deleteOwner)}
//                     className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
//                   >
//                     Delete Selected
//                   </button>
//                 </div>
//               </div>
//               <button
//                 onClick={() => setSelectedOwners([])}
//                 className="text-sm text-gray-600 hover:text-gray-900"
//               >
//                 Clear Selection
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Owners Table */}
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead>
//               <tr className="bg-gray-50">
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   <input
//                     type="checkbox"
//                     checked={
//                       selectedOwners.length === filteredOwners.length &&
//                       filteredOwners.length > 0
//                     }
//                     onChange={handleSelectAll}
//                     className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
//                   />
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Owner Details
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Properties
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Registration
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {filteredOwners.map((owner) => (
//                 <tr key={owner.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <input
//                       type="checkbox"
//                       checked={selectedOwners.includes(owner.id)}
//                       onChange={() => handleSelectOwner(owner.id)}
//                       className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
//                     />
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="flex items-center">
//                       <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
//                         <FiUser className="h-5 w-5 text-blue-600" />
//                       </div>
//                       <div>
//                         <div className="flex items-center gap-2">
//                           <span className="font-medium text-gray-900">
//                             {owner.name}
//                           </span>
//                           {owner.verified && (
//                             <MdVerified
//                               className="h-4 w-4 text-green-500"
//                               title="Verified"
//                             />
//                           )}
//                         </div>
//                         <div className="text-sm text-gray-500">
//                           {owner.email}
//                         </div>
//                         <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
//                           <FiPhone className="h-3 w-3" />
//                           {owner.phone}
//                         </div>
//                         <div className="text-xs text-gray-400 mt-1">
//                           {owner.location}
//                         </div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="flex items-center">
//                       <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
//                         <FiHome className="h-5 w-5 text-green-600" />
//                       </div>
//                       <div>
//                         <div className="font-bold text-gray-900">
//                           {owner.properties}
//                         </div>
//                         <div className="text-sm text-gray-500">properties</div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <span
//                       className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                         owner.status === "verified"
//                           ? "bg-green-100 text-green-800"
//                           : owner.status === "pending"
//                           ? "bg-yellow-100 text-yellow-800"
//                           : "bg-red-100 text-red-800"
//                       }`}
//                     >
//                       {owner.status.charAt(0).toUpperCase() +
//                         owner.status.slice(1)}
//                     </span>
//                     <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
//                       <FiCalendar className="h-3 w-3" />
//                       Last login: {owner.lastLogin}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-500">
//                     <div className="flex items-center gap-1">
//                       <FiCalendar className="h-4 w-4" />
//                       {owner.registrationDate}
//                     </div>
//                     <div className="text-xs text-gray-400 mt-1">
//                       Member for 2 months
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="flex items-center gap-2">
//                       <button
//                         onClick={() => console.log("View owner:", owner.id)}
//                         className="p-2 text-blue-600 hover:bg-blue-50 rounded"
//                         title="View Details"
//                       >
//                         <FiEye className="h-4 w-4" />
//                       </button>
//                       <button
//                         onClick={() => console.log("Edit owner:", owner.id)}
//                         className="p-2 text-green-600 hover:bg-green-50 rounded"
//                         title="Edit"
//                       >
//                         <FiEdit2 className="h-4 w-4" />
//                       </button>
//                       {!owner.verified ? (
//                         <button
//                           onClick={() => verifyOwner(owner.id)}
//                           className="p-2 text-green-600 hover:bg-green-50 rounded"
//                           title="Verify Owner"
//                         >
//                           <FiCheckCircle className="h-4 w-4" />
//                         </button>
//                       ) : (
//                         <button
//                           onClick={() => suspendOwner(owner.id)}
//                           className="p-2 text-red-600 hover:bg-red-50 rounded"
//                           title="Suspend Owner"
//                         >
//                           <MdWarning className="h-4 w-4" />
//                         </button>
//                       )}
//                       <button
//                         onClick={() => deleteOwner(owner.id)}
//                         className="p-2 text-red-600 hover:bg-red-50 rounded"
//                         title="Delete Owner"
//                       >
//                         <FiTrash2 className="h-4 w-4" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
//           <div className="text-sm text-gray-700">
//             Showing <span className="font-medium">1</span> to{" "}
//             <span className="font-medium">6</span> of{" "}
//             <span className="font-medium">24</span> owners
//           </div>
//           <div className="flex items-center gap-2">
//             <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
//               <FiChevronLeft className="h-5 w-5" />
//             </button>
//             {[1, 2, 3, 4, 5].map((num) => (
//               <button
//                 key={num}
//                 className={`px-3 py-1 rounded ${
//                   num === 1
//                     ? "bg-blue-600 text-white"
//                     : "border border-gray-300 hover:bg-gray-50"
//                 }`}
//               >
//                 {num}
//               </button>
//             ))}
//             <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
//               <FiChevronRight className="h-5 w-5" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Additional Information */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Quick Stats */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <h3 className="text-lg font-bold text-gray-900 mb-4">
//             Owner Statistics
//           </h3>
//           <div className="space-y-4">
//             {[
//               {
//                 label: "Avg Properties per Owner",
//                 value: "4.2",
//                 change: "+12%",
//               },
//               { label: "Active This Month", value: "18", change: "+5%" },
//               { label: "New This Month", value: "6", change: "+20%" },
//               { label: "Response Rate", value: "87%", change: "+3%" },
//             ].map((stat, index) => (
//               <div key={index} className="flex justify-between items-center">
//                 <span className="text-sm text-gray-600">{stat.label}</span>
//                 <div className="text-right">
//                   <div className="font-bold text-gray-900">{stat.value}</div>
//                   <div className="text-xs text-green-600">{stat.change}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Recent Activity */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <h3 className="text-lg font-bold text-gray-900 mb-4">
//             Recent Activity
//           </h3>
//           <div className="space-y-4">
//             {[
//               {
//                 action: "Sarah Johnson registered as owner",
//                 time: "2 hours ago",
//                 icon: <FiUser className="text-blue-500" />,
//               },
//               {
//                 action: "Michael Chen added 2 new properties",
//                 time: "5 hours ago",
//                 icon: <FiHome className="text-green-500" />,
//               },
//               {
//                 action: "John Smith verified by admin",
//                 time: "1 day ago",
//                 icon: <FiCheckCircle className="text-purple-500" />,
//               },
//               {
//                 action: "Emma Wilson account suspended",
//                 time: "2 days ago",
//                 icon: <MdWarning className="text-red-500" />,
//               },
//             ].map((activity, index) => (
//               <div key={index} className="flex items-start gap-3">
//                 <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
//                   {activity.icon}
//                 </div>
//                 <div className="flex-1">
//                   <p className="text-sm font-medium text-gray-900">
//                     {activity.action}
//                   </p>
//                   <p className="text-xs text-gray-500">{activity.time}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Quick Actions */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <h3 className="text-lg font-bold text-gray-900 mb-4">
//             Quick Actions
//           </h3>
//           <div className="space-y-3">
//             <button className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
//               <span className="text-sm font-medium">Send Bulk Email</span>
//               <FiMail className="h-4 w-4 text-gray-400" />
//             </button>
//             <button className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
//               <span className="text-sm font-medium">Generate Reports</span>
//               <FiDownload className="h-4 w-4 text-gray-400" />
//             </button>
//             <button className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
//               <span className="text-sm font-medium">
//                 Review Pending Applications
//               </span>
//               <FiAlertCircle className="h-4 w-4 text-yellow-500" />
//             </button>
//             <button className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
//               <span className="text-sm font-medium">
//                 Update Owner Guidelines
//               </span>
//               <FiEdit2 className="h-4 w-4 text-gray-400" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminOwners;
