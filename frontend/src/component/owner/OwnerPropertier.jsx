import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../../utils/routeapi";
import {
  FiHome,
  FiPlus,
  FiEdit,
  FiEye,
  FiTrash2,
  FiDollarSign,
  FiMapPin,
  FiCalendar,
  FiMenu,
  FiX,
  FiRefreshCw,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";

const OwnProperties = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProperties: 0,
    activeProperties: 0,
    totalViews: 0,
    totalInquiries: 0,
    pendingProperties: 0,
    draftProperties: 0,
    soldProperties: 0,
    rentedProperties: 0,
  });

  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  // Fetch user properties from API
  const fetchUserProperties = async () => {
    try {
      setLoading(true);
      const response = await api.get("/properties/user/my-properties", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        const userProperties = response.data.data.properties || [];
        setProperties(userProperties);

        // Calculate statistics
        const total = userProperties.length;
        const active = userProperties.filter(
          (p) => p.status === "active"
        ).length;
        const pending = userProperties.filter(
          (p) => p.status === "pending"
        ).length;
        const draft = userProperties.filter((p) => p.status === "draft").length;
        const sold = userProperties.filter((p) => p.status === "sold").length;
        const rented = userProperties.filter(
          (p) => p.status === "rented"
        ).length;
        const inactive = userProperties.filter(
          (p) => p.status === "inactive"
        ).length;

        // Calculate total views and inquiries (you'll need to add these fields to your Property model)
        const totalViews = userProperties.reduce(
          (sum, prop) => sum + (prop.views || 0),
          0
        );
        const totalInquiries = userProperties.reduce(
          (sum, prop) => sum + (prop.inquiries || 0),
          0
        );

        setStats({
          totalProperties: total,
          activeProperties: active,
          pendingProperties: pending,
          draftProperties: draft,
          soldProperties: sold,
          rentedProperties: rented,
          inactiveProperties: inactive,
          totalViews,
          totalInquiries,
        });
      }
    } catch (error) {
      console.error("Error fetching user properties:", error);
      alert("Failed to load properties. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserProperties();
    } else {
      navigate("/login");
    }
  }, [token, navigate]);

  // Filter properties based on active tab
  const getFilteredProperties = () => {
    switch (activeTab) {
      case "active":
        return properties.filter((property) => property.status === "active");
      case "pending":
        return properties.filter((property) => property.status === "pending");
      case "draft":
        return properties.filter((property) => property.status === "draft");
      case "sold":
        return properties.filter((property) => property.status === "sold");
      case "rented":
        return properties.filter((property) => property.status === "rented");
      case "inactive":
        return properties.filter((property) => property.status === "inactive");
      default:
        return properties;
    }
  };

  // Delete property
  const deleteProperty = async (propertyId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this property? This action cannot be undone."
      )
    ) {
      try {
        const response = await api.delete(`/properties/${propertyId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          fetchUserProperties(); // Refresh the list
          alert("Property deleted successfully!");
        }
      } catch (error) {
        console.error("Error deleting property:", error);
        alert("Failed to delete property");
      }
    }
  };

  // Update property status
  const updatePropertyStatus = async (propertyId, newStatus) => {
    try {
      const response = await api.put(
        `/properties/${propertyId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        fetchUserProperties(); // Refresh the list
        alert(`Property status updated to ${newStatus}`);
      }
    } catch (error) {
      console.error("Error updating property status:", error);
      alert("Failed to update property status");
    }
  };

  const tabs = [
    {
      id: "active",
      label: "Active Listings",
      count: stats.activeProperties,
      icon: <FiHome className="w-4 h-4" />,
    },
    {
      id: "pending",
      label: "Pending Review",
      count: stats.pendingProperties,
      icon: <FiClock className="w-4 h-4" />,
    },
    {
      id: "draft",
      label: "Drafts",
      count: stats.draftProperties,
      icon: <FiAlertCircle className="w-4 h-4" />,
    },
    {
      id: "sold",
      label: "Sold",
      count: stats.soldProperties,
      icon: <FiCheckCircle className="w-4 h-4" />,
    },
    {
      id: "rented",
      label: "Rented",
      count: stats.rentedProperties,
      icon: <FiCheckCircle className="w-4 h-4" />,
    },
    {
      id: "inactive",
      label: "Inactive",
      count: stats.inactiveProperties,
      icon: <FiX className="w-4 h-4" />,
    },
  ];

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatPrice = (price, purpose) => {
    if (!price) return "Price not set";
    const formattedPrice = new Intl.NumberFormat("en-AE", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);

    if (purpose === "rent") {
      return `${formattedPrice} AED / month`;
    }
    return `${formattedPrice} AED`;
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "sold":
        return "bg-purple-100 text-purple-800";
      case "rented":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusDisplayText = (status) => {
    switch (status) {
      case "active":
        return "Active";
      case "sold":
        return "Sold";
      case "rented":
        return "Rented";
      case "pending":
        return "Under Review";
      case "draft":
        return "Draft";
      case "inactive":
        return "Inactive";
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <FiRefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Loading your properties...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const filteredProperties = getFilteredProperties();

  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-8">
      <div className="container mx-auto px-3 sm:px-4 max-w-7xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 md:mb-8">
          <div className="mb-4 lg:mb-0">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              My Properties
            </h1>
            <p className="text-sm md:text-base text-gray-600">
              Manage your property listings and track performance
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <button
              onClick={fetchUserProperties}
              className="flex items-center justify-center space-x-2 bg-gray-200 text-gray-800 px-4 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl hover:bg-gray-300 transition-colors duration-200 text-sm md:text-base"
            >
              <FiRefreshCw className="w-4 h-4 md:w-5 md:h-5" />
              <span>Refresh</span>
            </button>
            <Link
              to="/user-dashboard/add-property"
              className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl hover:bg-blue-700 transition-colors duration-200 text-sm md:text-base"
            >
              <FiPlus className="w-4 h-4 md:w-5 md:h-5" />
              <span>Add New Property</span>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
          {[
            {
              label: "Total Properties",
              value: stats.totalProperties,
              color: "text-blue-600",
            },
            {
              label: "Active Listings",
              value: stats.activeProperties,
              color: "text-green-600",
            },
            {
              label: "Total Views",
              value: stats.totalViews,
              color: "text-purple-600",
            },
            {
              label: "Inquiries",
              value: stats.totalInquiries,
              color: "text-orange-600",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg"
            >
              <div
                className={`text-xl md:text-2xl font-bold ${stat.color} mb-1 md:mb-2`}
              >
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
        <div className="lg:hidden bg-white rounded-xl shadow-lg mb-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-full flex items-center justify-between p-4 text-left"
          >
            <div className="flex items-center">
              {tabs.find((tab) => tab.id === activeTab)?.icon}
              <span className="font-medium text-gray-900 ml-2">
                {tabs.find((tab) => tab.id === activeTab)?.label}
              </span>
              <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2 rounded-full text-xs">
                {tabs.find((tab) => tab.id === activeTab)?.count}
              </span>
            </div>
            {mobileMenuOpen ? (
              <FiX className="w-5 h-5" />
            ) : (
              <FiMenu className="w-5 h-5" />
            )}
          </button>

          {mobileMenuOpen && (
            <div className="border-t border-gray-200">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 border-b border-gray-100 last:border-b-0 ${
                    activeTab === tab.id
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      {tab.icon}
                      <span className="ml-2">{tab.label}</span>
                    </div>
                    {tab.count > 0 && (
                      <span className="bg-gray-100 text-gray-900 py-0.5 px-2 rounded-full text-xs">
                        {tab.count}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="hidden lg:block bg-white rounded-2xl shadow-lg mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-2 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-4 border-b-2 font-medium text-sm whitespace-nowrap flex items-center ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.icon}
                  <span className="ml-2">{tab.label}</span>
                  {tab.count > 0 && (
                    <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2 rounded-full text-xs">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>
        <div className="bg-white rounded-xl md:rounded-2xl shadow-lg">
          <div className="p-4 md:p-6">
            {filteredProperties.length === 0 ? (
              <div className="text-center py-8 md:py-12">
                <FiHome className="w-12 h-12 md:w-16 md:h-16 text-gray-300 mx-auto mb-3 md:mb-4" />
                <h3 className="text-base md:text-lg font-medium text-gray-900 mb-2">
                  No properties found
                </h3>
                <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
                  You don't have any {activeTab} properties yet.
                </p>
                <Link
                  to="/user-dashboard/add-property"
                  className="inline-flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl hover:bg-blue-700 transition-colors duration-200 text-sm md:text-base w-full sm:w-auto"
                >
                  <FiPlus className="w-4 h-4 md:w-5 md:h-5" />
                  <span>Add Your First Property</span>
                </Link>
              </div>
            ) : (
              <div className="grid gap-4 md:gap-6">
                {filteredProperties.map((property) => (
                  <div
                    key={property._id}
                    className="border border-gray-200 rounded-xl md:rounded-2xl p-4 md:p-6 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4 md:gap-6">
                      <div className="w-full lg:w-48 lg:h-32 flex-shrink-0">
                        {property.images && property.images.length > 0 ? (
                          <img
                            src={property.images[0]}
                            alt={property.title}
                            className="w-full h-48 lg:h-full object-cover rounded-lg md:rounded-xl"
                          />
                        ) : (
                          <div className="w-full h-48 lg:h-full bg-gray-200 rounded-lg md:rounded-xl flex items-center justify-center">
                            <FiHome className="w-12 h-12 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-3">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                              {property.title}
                            </h3>
                            <div className="space-y-2 md:space-y-0 md:flex md:items-center md:space-x-4 text-sm text-gray-600 mb-3">
                              <div className="flex items-center space-x-1">
                                <FiMapPin className="w-4 h-4 flex-shrink-0" />
                                <span className="truncate">
                                  {property.location?.area ||
                                    property.location?.city ||
                                    "Location not specified"}
                                </span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <FiDollarSign className="w-4 h-4 flex-shrink-0" />
                                <span>
                                  {formatPrice(
                                    property.price,
                                    property.purpose
                                  )}
                                </span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <FiCalendar className="w-4 h-4 flex-shrink-0" />
                                <span>
                                  Listed {formatDate(property.createdAt)}
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-3">
                              <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                                {property.bedrooms || 0} Beds
                              </span>
                              <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                                {property.bathrooms || 0} Baths
                              </span>
                              <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                                {property.area || 0}{" "}
                                {property.areaUnit || "sqft"}
                              </span>
                              <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                                {property.category || "N/A"}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 mb-3 lg:mb-0 lg:ml-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusBadgeClass(
                                property.status
                              )}`}
                            >
                              {getStatusDisplayText(property.status)}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                          <div className="flex items-center space-x-4 md:space-x-6 text-sm text-gray-600">
                            {property.views > 0 && (
                              <div className="text-sm">
                                <span className="font-semibold">
                                  {property.views || 0}
                                </span>{" "}
                                views
                              </div>
                            )}
                            {property.inquiries > 0 && (
                              <div className="text-sm">
                                <span className="font-semibold">
                                  {property.inquiries || 0}
                                </span>{" "}
                                inquiries
                              </div>
                            )}
                          </div>
                          <div className="flex items-center justify-between sm:justify-end space-x-2 md:space-x-3">
                            <div className="flex items-center space-x-4 md:space-x-6 text-sm text-gray-600">
                              {property.views > 0 && (
                                <div className="text-sm">
                                  <span className="font-semibold">
                                    {property.views || 0}
                                  </span>{" "}
                                  views
                                </div>
                              )}
                              {property.inquiries > 0 && (
                                <div className="text-sm">
                                  <span className="font-semibold">
                                    {property.inquiries || 0}
                                  </span>{" "}
                                  inquiries
                                </div>
                              )}
                            </div>
                            <div className="flex items-center space-x-2 md:space-x-3">
                              <Link
                                to={`/properties/${property._id}`}
                                className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm"
                                title="View"
                              >
                                <FiEye className="w-4 h-4" />
                                <span className="hidden sm:inline">View</span>
                              </Link>
                              {(property.status === "active" ||
                                property.status === "inactive" ||
                                property.status === "pending" ||
                                property.status === "draft") && (
                                <Link
                                  to={`/owner-dashboard/edit-property/${property._id}`}
                                  className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm"
                                  title="Edit"
                                >
                                  <FiEdit className="w-4 h-4" />
                                  <span className="hidden sm:inline">Edit</span>
                                </Link>
                              )}
                              {property.status === "active" && (
                                <>
                                  <button
                                    onClick={() =>
                                      updatePropertyStatus(property._id, "sold")
                                    }
                                    className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-purple-600 transition-colors duration-200 text-sm"
                                    title="Mark as Sold"
                                  >
                                    <FiCheckCircle className="w-4 h-4" />
                                    <span className="hidden sm:inline">
                                      Sold
                                    </span>
                                  </button>
                                  <button
                                    onClick={() =>
                                      updatePropertyStatus(
                                        property._id,
                                        "rented"
                                      )
                                    }
                                    className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm"
                                    title="Mark as Rented"
                                  >
                                    <FiCheckCircle className="w-4 h-4" />
                                    <span className="hidden sm:inline">
                                      Rented
                                    </span>
                                  </button>
                                  <button
                                    onClick={() =>
                                      updatePropertyStatus(
                                        property._id,
                                        "inactive"
                                      )
                                    }
                                    className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-orange-600 transition-colors duration-200 text-sm"
                                    title="Deactivate"
                                  >
                                    <FiX className="w-4 h-4" />
                                    <span className="hidden sm:inline">
                                      Deactivate
                                    </span>
                                  </button>
                                </>
                              )}

                              {property.status === "inactive" && (
                                <button
                                  onClick={() =>
                                    updatePropertyStatus(property._id, "active")
                                  }
                                  className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-green-600 transition-colors duration-200 text-sm"
                                  title="Activate"
                                >
                                  <FiCheckCircle className="w-4 h-4" />
                                  <span className="hidden sm:inline">
                                    Activate
                                  </span>
                                </button>
                              )}

                              {(property.status === "sold" ||
                                property.status === "rented") && (
                                <button
                                  onClick={() =>
                                    updatePropertyStatus(property._id, "active")
                                  }
                                  className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-green-600 transition-colors duration-200 text-sm"
                                  title="Reactivate"
                                >
                                  <FiRefreshCw className="w-4 h-4" />
                                  <span className="hidden sm:inline">
                                    Reactivate
                                  </span>
                                </button>
                              )}

                              {property.status === "pending" && (
                                <>
                                  <button
                                    onClick={() =>
                                      updatePropertyStatus(
                                        property._id,
                                        "active"
                                      )
                                    }
                                    className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-green-600 transition-colors duration-200 text-sm"
                                    title="Approve"
                                  >
                                    <FiCheckCircle className="w-4 h-4" />
                                    <span className="hidden sm:inline">
                                      Approve
                                    </span>
                                  </button>
                                  <button
                                    onClick={() =>
                                      updatePropertyStatus(
                                        property._id,
                                        "draft"
                                      )
                                    }
                                    className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-600 transition-colors duration-200 text-sm"
                                    title="Move to Draft"
                                  >
                                    <FiX className="w-4 h-4" />
                                    <span className="hidden sm:inline">
                                      Draft
                                    </span>
                                  </button>
                                </>
                              )}

                              {property.status === "draft" && (
                                <button
                                  onClick={() =>
                                    updatePropertyStatus(
                                      property._id,
                                      "pending"
                                    )
                                  }
                                  className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-yellow-600 transition-colors duration-200 text-sm"
                                  title="Submit for Review"
                                >
                                  <FiUpload className="w-4 h-4" />
                                  <span className="hidden sm:inline">
                                    Submit
                                  </span>
                                </button>
                              )}
                              <button
                                onClick={() => deleteProperty(property._id)}
                                className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-red-600 transition-colors duration-200 text-sm"
                                title="Delete"
                              >
                                <FiTrash2 className="w-4 h-4" />
                                <span className="hidden sm:inline">Delete</span>
                              </button>
                            </div>
                          </div>
                          {/* <div className="flex items-center justify-between sm:justify-end space-x-2 md:space-x-3">
                            <Link
                              to={`/properties/${property._id}`}
                              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm"
                              title="View"
                            >
                              <FiEye className="w-4 h-4" />
                              <span className="hidden sm:inline">View</span>
                            </Link>
                            <Link
                              to={`/owner-dashboard/edit-property/${property._id}`}
                              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm"
                              title="Edit"
                            >
                              <FiEdit className="w-4 h-4" />
                              <span className="hidden sm:inline">Edit</span>
                            </Link>
                            {property.status === "active" && (
                              <button
                                onClick={() =>
                                  updatePropertyStatus(property._id, "inactive")
                                }
                                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-orange-600 transition-colors duration-200 text-sm"
                                title="Deactivate"
                              >
                                <FiX className="w-4 h-4" />
                                <span className="hidden sm:inline">
                                  Deactivate
                                </span>
                              </button>
                            )}
                            {property.status === "inactive" && (
                              <button
                                onClick={() =>
                                  updatePropertyStatus(property._id, "active")
                                }
                                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-green-600 transition-colors duration-200 text-sm"
                                title="Activate"
                              >
                                <FiCheckCircle className="w-4 h-4" />
                                <span className="hidden sm:inline">
                                  Activate
                                </span>
                              </button>
                            )}
                            <button
                              onClick={() => deleteProperty(property._id)}
                              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-red-600 transition-colors duration-200 text-sm"
                              title="Delete"
                            >
                              <FiTrash2 className="w-4 h-4" />
                              <span className="hidden sm:inline">Delete</span>
                            </button>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnProperties;
