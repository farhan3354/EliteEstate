import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../../utils/routeapi";
import {
  FiHome,
  FiDollarSign,
  FiCalendar,
  FiCheckCircle,
  FiXCircle,
  FiMessageSquare,
  FiPhone,
  FiMail,
  FiMapPin,
  FiTrendingUp,
  FiEye,
  FiSend,
  FiSearch,
  FiRefreshCw,
} from "react-icons/fi";
import {
  MdOutlineAssignment,
} from "react-icons/md";

const AgentAssignedProperties = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const [assignments, setAssignments] = useState([]);
  const [stats, setStats] = useState({});
  const [agentInfo, setAgentInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateData, setUpdateData] = useState({
    type: "general",
    message: "",
    metrics: {
      inquiries: 0,
      viewings: 0,
      offers: 0,
    },
  });

  // Safely get agreement data
  const getAgreementData = (assignment) => {
    // Try to get data from commissionAgreement first, then from agreement field
    const agreement =
      assignment.commissionAgreement || assignment.agreement || {};

    return {
      commissionRate: agreement.commissionRate || agreement.commission || 5,
      commissionType: agreement.commissionType || "percentage",
      isExclusive: agreement.isExclusive || false,
      startDate: agreement.startDate || assignment.assignedDate,
      endDate: agreement.endDate,
      terms: agreement.terms || "",
      responsibilities: agreement.responsibilities || [
        "Property listing and marketing",
        "Arranging viewings",
        "Negotiation with potential buyers/tenants",
        "Documentation and paperwork",
        "Follow-up and updates",
      ],
      paymentTerms:
        agreement.paymentTerms || "Upon successful transaction completion",
      minCommissionAmount: agreement.minCommissionAmount || null,
    };
  };

  // Safely get property data
  const getPropertyData = (property) => {
    return {
      id: property?._id || property?.id || "",
      title: property?.title || "Untitled Property",
      description: property?.description || "",
      location: {
        area: property?.area || property?.location?.area || "",
        city: property?.city || property?.location?.city || "",
        fullAddress:
          `${property?.area || property?.location?.area || ""}${
            (property?.area || property?.location?.area) &&
            (property?.city || property?.location?.city)
              ? ", "
              : ""
          }${property?.city || property?.location?.city || ""}`.trim() ||
          "Address not available",
      },
      price: property?.price || 0,
      formattedPrice: `AED ${(property?.price || 0).toLocaleString()}`,
      images: property?.images || [],
      status: property?.status || "unknown",
      propertyType: property?.propertyType || property?.type || "N/A",
      bedrooms: property?.bedrooms || 0,
      bathrooms: property?.bathrooms || 0,
      size: property?.size || 0,
      amenities: property?.amenities || [],
    };
  };

  // Safely get owner data
  const getOwnerData = (owner) => {
    const user = owner?.user || owner || {};
    return {
      id: owner?._id || "",
      name: user?.name || "Unknown Owner",
      email: user?.email || "",
      phone: user?.phone || "",
      profileImage:
        user?.profileImage ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
          user?.name || "Owner"
        )}`,
    };
  };

  // Fetch assigned properties
  const fetchAssignedProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("🔄 Fetching assigned properties...");

      const response = await api.get("/agents/agent/assignments", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("✅ API Response:", response.data);
      if (response.data.success) {
        const assignmentsData = response.data.data.assignments || [];
        console.log("📊 Raw assignments data:", assignmentsData);
        const processedAssignments = assignmentsData.map(
          (assignment, index) => {
            console.log("🔍 Processing assignment:", assignment);
            const assignmentId =
              assignment.assignmentId || assignment._id || assignment.id;
            console.log("🔑 Found assignment ID:", assignmentId);

            if (!assignmentId) {
              console.error("❌ No assignment ID found in:", assignment);
            }

            const agreement = getAgreementData(assignment);
            const property = getPropertyData(assignment.property);
            const owner = getOwnerData(assignment.owner);
            const potentialCommission =
              property.price && agreement.commissionRate
                ? (property.price * agreement.commissionRate) / 100
                : 0;
            let timeRemaining = null;
            if (agreement.endDate) {
              try {
                const endDate = new Date(agreement.endDate);
                const now = new Date();
                const diffInDays = Math.floor(
                  (endDate - now) / (1000 * 60 * 60 * 24)
                );
                timeRemaining =
                  diffInDays > 0 ? `${diffInDays} days` : "Expired";
              } catch (error) {
                console.error("Error calculating time remaining:", error);
                timeRemaining = "Ongoing";
              }
            }

            return {
              id: assignmentId || `temp_${index}`,
              property,
              owner,
              agreement,
              status: assignment.status || "pending",
              assignedDate: assignment.assignedDate || new Date(),
              acceptedDate: assignment.acceptedDate,
              completedAt: assignment.completedAt,
              timeRemaining,
              potentialCommission,
              formattedPotentialCommission: `AED ${Math.round(
                potentialCommission
              ).toLocaleString()}`,
              _raw: assignment,
            };
          }
        );

        console.log("📊 Processed assignments:", processedAssignments);
        setAssignments(processedAssignments);
        setStats(response.data.data.stats || {});
        setAgentInfo(response.data.data.agentInfo || {});
        console.log("📊 Assignments loaded:", processedAssignments.length);
      } else {
        console.error("API returned success: false");
        setError("Failed to load data from server");
      }
    } catch (error) {
      console.error("❌ Error fetching assigned properties:", error);
      console.error("❌ Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      setError("Failed to load assigned properties. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle assignment status update
  const handleStatusUpdate = async (assignment, status) => {
    const statusText =
      status === "accepted"
        ? "accept"
        : status === "rejected"
        ? "reject"
        : status === "completed"
        ? "complete"
        : "update";
    if (
      !window.confirm(`Are you sure you want to ${statusText} this assignment?`)
    ) {
      return;
    }

    try {
      console.log("🔄 Updating assignment status:", {
        assignmentId: assignment.id,
        status,
        rawId: assignment._raw?._id,
      });

      const assignmentId = assignment._raw?._id || assignment.id;

      if (!assignmentId || assignmentId.startsWith("temp_")) {
        alert("Cannot update assignment: Invalid assignment ID");
        return;
      }

      const response = await api.put(
        `/agents/assignment/${assignmentId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        alert(`Assignment ${status} successfully!`);
        fetchAssignedProperties();
      }
    } catch (error) {
      console.error(`Error ${status}ing assignment:`, error);
      console.error("Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      alert(error.response?.data?.message || `Failed to ${status} assignment`);
    }
  };

  // Handle sending update to owner
  const handleSendUpdate = async () => {
    if (!selectedAssignment) return;

    try {
      // Try to get the real MongoDB ID from raw data
      const assignmentId =
        selectedAssignment._raw?._id || selectedAssignment.id;

      if (!assignmentId || assignmentId.startsWith("temp_")) {
        alert("Cannot send update: Invalid assignment ID");
        return;
      }

      const response = await api.post(
        `/agents/assignment/${assignmentId}/update`,
        updateData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        alert("Update sent to owner successfully!");
        setShowUpdateModal(false);
        setUpdateData({
          type: "general",
          message: "",
          metrics: { inquiries: 0, viewings: 0, offers: 0 },
        });
      }
    } catch (error) {
      console.error("Error sending update:", error);
      alert(error.response?.data?.message || "Failed to send update");
    }
  };

  // Filter assignments
  const filteredAssignments = assignments.filter((assignment) => {
    try {
      const matchesSearch =
        searchTerm === "" ||
        (assignment.property.title &&
          assignment.property.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) ||
        (assignment.property.location.fullAddress &&
          assignment.property.location.fullAddress
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) ||
        (assignment.owner.name &&
          assignment.owner.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()));

      const matchesStatus =
        statusFilter === "all" || assignment.status === statusFilter;

      return matchesSearch && matchesStatus;
    } catch (error) {
      console.error("Error filtering assignment:", error, assignment);
      return false;
    }
  });

  // Handle viewing property details
  const handleViewProperty = (propertyId) => {
    if (propertyId) {
      navigate(`/property/${propertyId}`);
    } else {
      alert("Property ID not available");
    }
  };

  // Handle contacting owner
  const handleContactOwner = (owner) => {
    if (owner.email) {
      window.open(`mailto:${owner.email}`, "_blank");
    } else {
      alert(`No email available for ${owner.name}`);
    }
  };

  // Handle calling owner
  const handleCallOwner = (phone) => {
    if (phone) {
      window.open(`tel:${phone}`, "_blank");
    } else {
      alert("Phone number not available");
    }
  };

  // Calculate days since assignment
  const getDaysSince = (date) => {
    if (!date) return 0;
    try {
      const diffTime = Math.abs(new Date() - new Date(date));
      return Math.floor(diffTime / (1000 * 60 * 60 * 24));
    } catch (error) {
      return 0;
    }
  };

  // Debug function to check data structure
  const debugAssignmentData = () => {
    if (assignments.length > 0) {
      console.log("🔍 Debug: First assignment structure:", {
        id: assignments[0].id,
        rawId: assignments[0]._raw?._id,
        rawData: assignments[0]._raw,
        fullAssignment: assignments[0],
      });
    }
  };

  useEffect(() => {
    if (token) {
      fetchAssignedProperties();
    }
  }, [token]);

  // Debug when assignments change
  useEffect(() => {
    debugAssignmentData();
  }, [assignments]);

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex flex-col justify-center items-center h-64 space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="text-gray-600 text-lg">
            Loading assigned properties...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              My Assigned Properties
            </h1>
            <p className="text-gray-600 mt-1">
              Manage properties assigned to you by owners
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={debugAssignmentData}
              className="px-3 py-2 text-xs bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Debug Data
            </button>
            <button
              onClick={fetchAssignedProperties}
              className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FiRefreshCw className="h-5 w-5" />
              Refresh
            </button>
          </div>
        </div>
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <FiXCircle className="h-5 w-5 text-red-600 mr-2" />
              <p className="text-red-800">{error}</p>
            </div>
          </div>
        )}
        {assignments.length > 0 && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="text-sm text-blue-800">
              Found {assignments.length} assignment(s). First assignment ID:{" "}
              <strong>{assignments[0]?.id}</strong>
              <div className="mt-2 text-xs">
                Raw ID from backend:{" "}
                <code>{assignments[0]?._raw?._id || "Not found"}</code>
              </div>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-blue-500 p-3 rounded-lg">
                <MdOutlineAssignment className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Assignments</p>
                <p className="text-2xl font-bold mt-1">
                  {stats.totalAssignments || 0}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-green-500 p-3 rounded-lg">
                <FiCheckCircle className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Active Assignments</p>
                <p className="text-2xl font-bold mt-1">
                  {stats.activeAssignments || 0}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-purple-500 p-3 rounded-lg">
                <FiDollarSign className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Potential Commission</p>
                <p className="text-2xl font-bold mt-1">
                  {stats.totalPotentialCommission || "AED 0"}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-yellow-500 p-3 rounded-lg">
                <FiTrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Acceptance Rate</p>
                <p className="text-2xl font-bold mt-1">
                  {stats.acceptanceRate || "0%"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div className="flex-1">
            <div className="relative max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="search"
                placeholder="Search properties or owners..."
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
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="active">Active</option>
              <option value="rejected">Rejected</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
        <div className="space-y-6">
          {filteredAssignments.length > 0 ? (
            filteredAssignments.map((assignment) => (
              <div
                key={assignment.id}
                className={`border rounded-xl p-6 transition-all ${
                  assignment.status === "pending"
                    ? "border-yellow-300 bg-yellow-50"
                    : assignment.status === "active"
                    ? "border-green-300 bg-green-50"
                    : assignment.status === "accepted"
                    ? "border-blue-300 bg-blue-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="lg:w-2/5">
                    <div className="flex items-start gap-4">
                      <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        {assignment.property.images &&
                        assignment.property.images.length > 0 ? (
                          <img
                            src={assignment.property.images[0]}
                            alt={assignment.property.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src =
                                "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400";
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-200">
                            <FiHome className="h-8 w-8 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-bold text-gray-900 text-lg">
                              {assignment.property.title}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                              <FiMapPin className="h-4 w-4" />
                              <span>
                                {assignment.property.location.fullAddress}
                              </span>
                            </div>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              assignment.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : assignment.status === "active"
                                ? "bg-green-100 text-green-800"
                                : assignment.status === "accepted"
                                ? "bg-blue-100 text-blue-800"
                                : assignment.status === "rejected"
                                ? "bg-red-100 text-red-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {assignment.status?.toUpperCase() || "UNKNOWN"}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className="bg-white p-3 rounded-lg border">
                            <div className="text-sm text-gray-600">Price</div>
                            <div className="font-bold text-gray-900">
                              {assignment.property.formattedPrice}
                            </div>
                          </div>
                          <div className="bg-white p-3 rounded-lg border">
                            <div className="text-sm text-gray-600">Type</div>
                            <div className="font-bold text-gray-900">
                              {assignment.property.propertyType}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            handleViewProperty(assignment.property.id)
                          }
                          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <FiEye className="h-4 w-4" />
                          View Property Details
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="lg:w-2/5 lg:px-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-2">
                          OWNER
                        </h4>
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                            <img
                              src={assignment.owner.profileImage}
                              alt={assignment.owner.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                  assignment.owner.name
                                )}`;
                              }}
                            />
                          </div>
                          <div>
                            <h5 className="font-bold text-gray-900">
                              {assignment.owner.name}
                            </h5>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <FiMail className="h-3 w-3" />
                              <span>
                                {assignment.owner.email || "No email"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <button
                            onClick={() => handleContactOwner(assignment.owner)}
                            disabled={!assignment.owner.email}
                            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm ${
                              assignment.owner.email
                                ? "bg-blue-600 text-white hover:bg-blue-700"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                          >
                            <FiMail className="h-4 w-4" />
                            Email
                          </button>
                          <button
                            onClick={() =>
                              handleCallOwner(assignment.owner.phone)
                            }
                            disabled={!assignment.owner.phone}
                            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 border rounded-lg text-sm ${
                              assignment.owner.phone
                                ? "border-gray-300 hover:bg-gray-50"
                                : "border-gray-200 text-gray-400 cursor-not-allowed"
                            }`}
                          >
                            <FiPhone className="h-4 w-4" />
                            Call
                          </button>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-2">
                          AGREEMENT
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-white p-2 rounded-lg border">
                            <div className="text-xs text-gray-600">
                              Commission
                            </div>
                            <div className="font-bold text-gray-900">
                              {assignment.agreement.commissionRate}%
                            </div>
                          </div>
                          <div className="bg-white p-2 rounded-lg border">
                            <div className="text-xs text-gray-600">Type</div>
                            <div className="font-bold text-gray-900">
                              {assignment.agreement.isExclusive
                                ? "Exclusive"
                                : "Shared"}
                            </div>
                          </div>
                          <div className="bg-white p-2 rounded-lg border">
                            <div className="text-xs text-gray-600">
                              Potential
                            </div>
                            <div className="font-bold text-green-600">
                              {assignment.formattedPotentialCommission}
                            </div>
                          </div>
                          <div className="bg-white p-2 rounded-lg border">
                            <div className="text-xs text-gray-600">
                              Time Left
                            </div>
                            <div className="font-bold text-gray-900">
                              {assignment.timeRemaining || "Ongoing"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="lg:w-1/5">
                    <div className="space-y-3">
                      <div className="text-sm text-gray-500 mb-2">
                        Assigned {getDaysSince(assignment.assignedDate)} days
                        ago
                      </div>

                      {assignment.status === "pending" && (
                        <div className="space-y-2">
                          <button
                            onClick={() =>
                              handleStatusUpdate(assignment, "accepted")
                            }
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                          >
                            <FiCheckCircle className="h-5 w-5" />
                            Accept Assignment
                          </button>
                          <button
                            onClick={() =>
                              handleStatusUpdate(assignment, "rejected")
                            }
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                          >
                            <FiXCircle className="h-5 w-5" />
                            Reject
                          </button>
                        </div>
                      )}
                      {assignment.status === "active" && (
                        <div className="space-y-2">
                          <button
                            onClick={() => {
                              setSelectedAssignment(assignment);
                              setShowUpdateModal(true);
                            }}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            <FiSend className="h-5 w-5" />
                            Send Update
                          </button>
                          <button
                            onClick={() =>
                              handleStatusUpdate(assignment, "completed")
                            }
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                          >
                            <FiCheckCircle className="h-5 w-5" />
                            Mark Complete
                          </button>
                        </div>
                      )}

                      {assignment.status === "accepted" && (
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm text-blue-800">
                            Waiting for owner confirmation
                          </p>
                        </div>
                      )}

                      {assignment.status === "completed" && (
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <p className="text-sm text-green-800">
                            Assignment completed
                          </p>
                          <p className="text-xs text-green-700 mt-1">
                            {assignment.completedAt
                              ? new Date(
                                  assignment.completedAt
                                ).toLocaleDateString()
                              : ""}
                          </p>
                        </div>
                      )}

                      {assignment.status === "rejected" && (
                        <div className="text-center p-3 bg-red-50 rounded-lg">
                          <p className="text-sm text-red-800">
                            Assignment rejected
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiHome className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No Properties Assigned
              </h3>
              <p className="text-gray-500 mb-4">
                {searchTerm || statusFilter !== "all"
                  ? "No properties match your search criteria. Try adjusting your filters."
                  : "You haven't been assigned any properties yet. Owners will assign properties to you here."}
              </p>
            </div>
          )}
        </div>
      </div>
      {showUpdateModal && selectedAssignment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Send Update to Owner
                </h3>
                <button
                  onClick={() => setShowUpdateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FiXCircle className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Update Type
                  </label>
                  <select
                    value={updateData.type}
                    onChange={(e) =>
                      setUpdateData({ ...updateData, type: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="general">General Update</option>
                    <option value="viewing">Viewing Scheduled</option>
                    <option value="inquiry">New Inquiry</option>
                    <option value="offer">Offer Received</option>
                    <option value="maintenance">Maintenance Update</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    value={updateData.message}
                    onChange={(e) =>
                      setUpdateData({ ...updateData, message: e.target.value })
                    }
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Provide details about the update..."
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Inquiries
                    </label>
                    <input
                      type="number"
                      value={updateData.metrics.inquiries}
                      onChange={(e) =>
                        setUpdateData({
                          ...updateData,
                          metrics: {
                            ...updateData.metrics,
                            inquiries: parseInt(e.target.value) || 0,
                          },
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Viewings
                    </label>
                    <input
                      type="number"
                      value={updateData.metrics.viewings}
                      onChange={(e) =>
                        setUpdateData({
                          ...updateData,
                          metrics: {
                            ...updateData.metrics,
                            viewings: parseInt(e.target.value) || 0,
                          },
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Offers
                    </label>
                    <input
                      type="number"
                      value={updateData.metrics.offers}
                      onChange={(e) =>
                        setUpdateData({
                          ...updateData,
                          metrics: {
                            ...updateData.metrics,
                            offers: parseInt(e.target.value) || 0,
                          },
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    onClick={() => setShowUpdateModal(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSendUpdate}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Send Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FiTrendingUp className="h-5 w-5 text-blue-500" />
          Tips for Managing Assignments
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
              <FiCheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Quick Response</h4>
            <p className="text-sm text-gray-600">
              Respond to new assignments within 24 hours to build trust with
              property owners.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
              <FiMessageSquare className="h-5 w-5 text-blue-600" />
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Regular Updates</h4>
            <p className="text-sm text-gray-600">
              Keep owners informed with weekly updates on viewings, inquiries,
              and market feedback.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
              <FiDollarSign className="h-5 w-5 text-purple-600" />
            </div>
            <h4 className="font-bold text-gray-900 mb-2">
              Commission Tracking
            </h4>
            <p className="text-sm text-gray-600">
              Track potential commissions and set reminders for agreement
              renewals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentAssignedProperties;
