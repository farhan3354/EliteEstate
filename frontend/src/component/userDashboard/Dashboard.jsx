import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const stats = [
    { label: "Total Properties", value: "24", change: "+12%", icon: "🏠" },
    { label: "Monthly Views", value: "1.2K", change: "+8%", icon: "👁️" },
    { label: "Active Bookings", value: "18", change: "+5%", icon: "📞" },
    { label: "Revenue", value: "$45.2K", change: "+15%", icon: "💰" }
  ];

  const recentActivities = [
    { action: "New property listed", property: "Luxury Villa - Palm Jumeirah", time: "2 hours ago" },
    { action: "Property viewed", property: "2BR Apartment - Downtown", time: "5 hours ago" },
    { action: "Booking confirmed", property: "Commercial Space - DIFC", time: "1 day ago" },
    { action: "Property sold", property: "Studio - Marina", time: "2 days ago" }
  ];

  const quickActions = [
    { title: "Add Property", icon: "➕", path: "/user-dashboard/add-property", color: "blue" },
    { title: "View Properties", icon: "🏠", path: "/user-dashboard/my-properties", color: "green" },
    { title: "Check Bookings", icon: "📅", path: "/user-dashboard/bookings", color: "purple" },
    { title: "Update Profile", icon: "👤", path: "/user-dashboard/profile", color: "orange" }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your properties.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="text-2xl">{stat.icon}</div>
              <span className="text-sm bg-green-100 text-green-600 px-2 py-1 rounded-full">
                {stat.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h2>
            <div className="space-y-4">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.path}
                  className={`flex items-center space-x-4 p-4 rounded-lg border-2 border-${action.color}-100 bg-${action.color}-50 hover:bg-${action.color}-100 transition-colors`}
                >
                  <span className="text-2xl">{action.icon}</span>
                  <span className="font-semibold text-gray-800">{action.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Recent Activity</h2>
              <Link to="/activity" className="text-blue-600 hover:text-blue-700 font-medium">
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 border border-gray-100 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">{activity.action}</div>
                    <div className="text-sm text-gray-600">{activity.property}</div>
                  </div>
                  <div className="text-sm text-gray-500">{activity.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;