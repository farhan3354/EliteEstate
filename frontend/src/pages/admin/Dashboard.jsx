import React, { useState, useEffect } from "react";
import { adminAPI } from "../../services/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAgents: 0,
    totalProperties: 0,
    totalBookings: 0,
    pendingReviews: 0,
    revenue: 0,
  });

  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getStats();
      if (response.data.success) {
        setStats(response.data.data.stats);
        setRecentActivities(response.data.data.recentActivities);
      }
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Failed to load dashboard data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: "👥",
      color: "blue",
    },
    {
      title: "Total Agents",
      value: stats.totalAgents,
      icon: "🤵",
      color: "green",
    },
    {
      title: "Total Properties",
      value: stats.totalProperties,
      icon: "🏠",
      color: "purple",
    },
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      icon: "📅",
      color: "yellow",
    },
    {
      title: "Pending Reviews",
      value: stats.pendingReviews,
      icon: "⭐",
      color: "red",
    },
    {
      title: "Revenue (AED)",
      value: stats.revenue.toLocaleString(),
      icon: "💰",
      color: "green",
    },
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: "bg-blue-500",
      green: "bg-green-500",
      purple: "bg-purple-500",
      yellow: "bg-yellow-500",
      red: "bg-red-500",
    };
    return colors[color] || "bg-gray-500";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg text-center">
        <p className="text-red-600">{error}</p>
        <button 
          onClick={fetchDashboardData}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to your admin dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center">
              <div className={`${getColorClasses(stat.color)} p-3 rounded-lg`}>
                <span className="text-2xl text-white">{stat.icon}</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {stat.title}
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stat.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg"
              >
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  {activity.type === "user" && "👤"}
                  {activity.type === "property" && "🏠"}
                  {activity.type === "booking" && "📅"}
                  {activity.type === "review" && "⭐"}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-600">
                    {activity.user ? `by ${activity.user}` : ""}
                  </p>
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(activity.time).toLocaleString() !== "Invalid Date"
                    ? new Date(activity.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    : activity.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-left">
              <div className="text-2xl mb-2">👥</div>
              <p className="font-medium text-blue-900">Manage Users</p>
              <p className="text-sm text-blue-600">View all users</p>
            </button>
            <button className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-left">
              <div className="text-2xl mb-2">🏠</div>
              <p className="font-medium text-green-900">Properties</p>
              <p className="text-sm text-green-600">Manage listings</p>
            </button>
            <button className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors text-left">
              <div className="text-2xl mb-2">📊</div>
              <p className="font-medium text-purple-900">Reports</p>
              <p className="text-sm text-purple-600">View analytics</p>
            </button>
            <button className="p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors text-left">
              <div className="text-2xl mb-2">⚙️</div>
              <p className="font-medium text-yellow-900">Settings</p>
              <p className="text-sm text-yellow-600">System settings</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
