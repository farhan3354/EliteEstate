import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FiHome,
  FiMessageSquare,
  FiDollarSign,
  FiPlus,
  FiMail,
  FiUsers,
  FiEdit,
  FiEye,
  FiCalendar,
  FiRefreshCw,
  FiAlertCircle,
} from "react-icons/fi";
import { MdApartment } from "react-icons/md";
import { propertyAPI, inquiryAPI, bookingAPI } from "../../services/api";
import api from "../../utils/routeapi";

const OwnerDashboard = () => {
  const { user, token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalProperties: 0,
    activeListings: 0,
    pendingInquiries: 0,
    totalRevenue: 0,
    viewingRequests: 0,
    assignedAgents: 0,
  });
  const [recentProperties, setRecentProperties] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [propertyStatusBreakdown, setPropertyStatusBreakdown] = useState({
    active: 0,
    pending: 0,
    rented: 0,
    sold: 0,
  });

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError(null);

      const [propertiesRes, inquiriesRes, bookingsRes] = await Promise.allSettled([
        propertyAPI.getUserProperties(),
        inquiryAPI.getSellerInquiries(),
        bookingAPI.getLandlordBookings(),
      ]);

      // Process properties
      let properties = [];
      if (propertiesRes.status === "fulfilled") {
        properties =
          propertiesRes.value.data?.data?.properties ||
          propertiesRes.value.data?.data ||
          [];
      }

      // Process inquiries
      let inquiries = [];
      let inquiryStats = { total: 0, new: 0 };
      if (inquiriesRes.status === "fulfilled") {
        inquiries =
          inquiriesRes.value.data?.data?.inquiries ||
          inquiriesRes.value.data?.data ||
          [];
        inquiryStats = inquiriesRes.value.data?.data?.stats || {
          total: inquiries.length,
          new: inquiries.filter((i) => i.status === "new" || i.isRead === false)
            .length,
        };
      }

      // Process bookings
      let bookings = [];
      if (bookingsRes.status === "fulfilled") {
        bookings =
          bookingsRes.value.data?.data?.bookings ||
          bookingsRes.value.data?.data ||
          [];
      }

      // Process assigned agents from owner profile
      let assignedAgentsCount = 0;
      try {
        const ownerRes = await api.get("/agents/owner/assignments", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const ownerData = ownerRes.data?.data;
        if (ownerData) {
          assignedAgentsCount = ownerData.stats?.activeAgents || ownerData.assignments?.filter((a) => a.agreement?.status === "active").length || 0;
        }
      } catch {
        // Silently ignore if owner profile not set up yet
      }

      // Calculate property status breakdown
      const active = properties.filter((p) => p.status === "active").length;
      const pending = properties.filter((p) => p.status === "pending").length;
      const rented = properties.filter((p) => p.status === "rented").length;
      const sold = properties.filter((p) => p.status === "sold").length;

      setPropertyStatusBreakdown({ active, pending, rented, sold });

      // Calculate revenue (sum of rented properties monthly rent estimates)
      const estimatedRevenue = properties
        .filter((p) => p.status === "rented" && p.price)
        .reduce((sum, p) => sum + (p.purpose === "rent" ? p.price : 0), 0);

      setStats({
        totalProperties: properties.length,
        activeListings: active,
        pendingInquiries: inquiryStats.new || 0,
        totalRevenue: estimatedRevenue,
        viewingRequests: bookings.filter((b) => b.status === "pending").length,
        assignedAgents: assignedAgentsCount,
      });

      // Recent properties (last 3)
      const sorted = [...properties].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setRecentProperties(sorted.slice(0, 5));

      // Build recent activity from inquiries + bookings
      const activities = [];
      inquiries.slice(0, 3).forEach((inq) => {
        activities.push({
          id: `inq-${inq._id}`,
          action: `New inquiry for ${inq.property?.title || "your property"}`,
          time: new Date(inq.createdAt).toLocaleDateString(),
          icon: <FiMail className="text-blue-500" />,
          date: new Date(inq.createdAt),
        });
      });
      bookings.slice(0, 3).forEach((bk) => {
        activities.push({
          id: `bk-${bk._id}`,
          action: `Viewing request for ${bk.property?.title || "your property"}`,
          time: new Date(bk.createdAt || bk.date).toLocaleDateString(),
          icon: <FiCalendar className="text-orange-500" />,
          date: new Date(bk.createdAt || bk.date),
        });
      });
      activities.sort((a, b) => b.date - a.date);
      setRecentActivity(activities.slice(0, 5));
    } catch (err) {
      console.error("Owner dashboard fetch error:", err);
      setError("Failed to load dashboard data. Please refresh.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const statCards = [
    {
      label: "Total Properties",
      value: stats.totalProperties,
      icon: <MdApartment />,
      color: "bg-blue-500",
    },
    {
      label: "Active Listings",
      value: stats.activeListings,
      icon: <FiHome />,
      color: "bg-green-500",
    },
    {
      label: "Pending Inquiries",
      value: stats.pendingInquiries,
      icon: <FiMessageSquare />,
      color: "bg-yellow-500",
    },
    {
      label: "Viewing Requests",
      value: stats.viewingRequests,
      icon: <FiCalendar />,
      color: "bg-orange-500",
    },
    {
      label: "Assigned Agents",
      value: stats.assignedAgents,
      icon: <FiUsers />,
      color: "bg-purple-500",
    },
    {
      label: "Est. Monthly Revenue",
      value: stats.totalRevenue > 0 ? `AED ${stats.totalRevenue.toLocaleString()}` : "–",
      icon: <FiDollarSign />,
      color: "bg-indigo-500",
    },
  ];

  const quickActions = [
    {
      title: "Add Property",
      description: "List a new property for sale or rent",
      icon: <FiPlus className="text-blue-500 text-2xl" />,
      link: "/owner-dashboard/add-property",
      color: "hover:border-blue-500 hover:bg-blue-50",
      iconBg: "bg-blue-100",
    },
    {
      title: "View Inquiries",
      description: "Check messages from potential buyers",
      icon: <FiMail className="text-green-500 text-2xl" />,
      link: "/owner-dashboard/inquiries",
      color: "hover:border-green-500 hover:bg-green-50",
      iconBg: "bg-green-100",
    },
    {
      title: "Assign Agent",
      description: "Hire an agent to manage your property",
      icon: <FiUsers className="text-purple-500 text-2xl" />,
      link: "/owner-dashboard/assign-agent",
      color: "hover:border-purple-500 hover:bg-purple-50",
      iconBg: "bg-purple-100",
    },
    {
      title: "Viewing Requests",
      description: "Manage appointments from potential buyers",
      icon: <FiCalendar className="text-orange-500 text-2xl" />,
      link: "/owner-dashboard/viewing-requests",
      color: "hover:border-orange-500 hover:bg-orange-50",
      iconBg: "bg-orange-100",
    },
  ];

  if (loading) {
    return (
      <div className="p-6 flex flex-col justify-center items-center h-64 space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
        <p className="text-gray-600">Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Owner Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome back, {user?.name || "Owner"}! Here's your property overview.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={fetchDashboard}
            className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
          >
            <FiRefreshCw className="h-4 w-4" />
            Refresh
          </button>
          <Link
            to="/owner-dashboard/add-property"
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FiPlus className="h-5 w-5" />
            Add New Property
          </Link>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
          <FiAlertCircle className="h-5 w-5 text-red-600" />
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className={`${stat.color} p-2.5 rounded-lg`}>
                <div className="text-white text-lg">{stat.icon}</div>
              </div>
              <div>
                <p className="text-xs text-gray-600 leading-tight">{stat.label}</p>
                <p className="text-xl font-bold mt-0.5">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className={`p-4 border-2 border-dashed border-gray-300 rounded-xl text-center ${action.color} transition-all hover:shadow-sm`}
            >
              <div
                className={`${action.iconBg} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3`}
              >
                {action.icon}
              </div>
              <div className="font-medium text-gray-900 mb-1">{action.title}</div>
              <div className="text-xs text-gray-600">{action.description}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Grid — Recent Properties + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Recent Properties */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-900">Recent Properties</h2>
            <Link
              to="/owner-dashboard/my-properties"
              className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
            >
              View All →
            </Link>
          </div>
          {recentProperties.length === 0 ? (
            <div className="text-center py-8">
              <MdApartment className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 mb-3">No properties listed yet.</p>
              <Link
                to="/owner-dashboard/add-property"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
              >
                <FiPlus className="h-4 w-4" />
                Add Your First Property
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-100">
                <thead>
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Property</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recentProperties.map((property) => (
                    <tr key={property._id} className="hover:bg-gray-50">
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                            {property.images?.[0] ? (
                              <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover" />
                            ) : (
                              <MdApartment className="h-5 w-5 text-blue-500" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 text-sm truncate max-w-[140px]">
                              {property.title}
                            </div>
                            <div className="text-xs text-gray-500">
                              {property.location?.city || property.location?.area || ""}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            property.status === "active"
                              ? "bg-green-100 text-green-800"
                              : property.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : property.status === "rented"
                              ? "bg-blue-100 text-blue-800"
                              : property.status === "sold"
                              ? "bg-gray-100 text-gray-800"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {property.status}
                        </span>
                      </td>
                      <td className="px-3 py-3">
                        <span className="text-sm font-bold text-gray-900">
                          AED {property.price?.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/owner-dashboard/edit-property/${property._id}`}
                            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                          >
                            <FiEdit className="h-4 w-4" />
                          </Link>
                          <Link
                            to={`/owner-dashboard/property/${property._id}`}
                            className="flex items-center gap-1 text-gray-600 hover:text-gray-800 text-sm"
                          >
                            <FiEye className="h-4 w-4" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
          {recentActivity.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-4">No recent activity</p>
          ) : (
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    {activity.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Properties by Status */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Properties by Status</h3>
        {stats.totalProperties === 0 ? (
          <p className="text-gray-500 text-sm text-center py-2">No properties yet.</p>
        ) : (
          <div className="space-y-3">
            {[
              { label: "Active", value: propertyStatusBreakdown.active, color: "bg-green-500" },
              { label: "Pending", value: propertyStatusBreakdown.pending, color: "bg-yellow-500" },
              { label: "Rented", value: propertyStatusBreakdown.rented, color: "bg-blue-500" },
              { label: "Sold", value: propertyStatusBreakdown.sold, color: "bg-gray-500" },
            ].map((item, index) => {
              const pct = stats.totalProperties > 0 ? Math.round((item.value / stats.totalProperties) * 100) : 0;
              return (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{item.label}</span>
                    <span className="text-sm font-bold text-gray-900">{item.value} properties</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`${item.color} h-2 rounded-full transition-all`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;
