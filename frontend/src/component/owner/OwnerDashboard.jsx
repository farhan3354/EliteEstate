import React from "react";
import { Link } from "react-router-dom";
import {
  FiHome,
  FiMessageSquare,
  FiDollarSign,
  FiPlus,
  FiMail,
  FiUsers,
  FiEdit,
  FiEye,
} from "react-icons/fi";
import { MdApartment } from "react-icons/md";

const OwnerDashboard = () => {
  const stats = [
    {
      label: "Total Properties",
      value: "5",
      icon: <MdApartment />,
      color: "bg-blue-500",
      iconColor: "text-white",
    },
    {
      label: "Active Listings",
      value: "3",
      icon: <FiHome />,
      color: "bg-green-500",
      iconColor: "text-white",
    },
    {
      label: "Pending Inquiries",
      value: "12",
      icon: <FiMessageSquare />,
      color: "bg-yellow-500",
      iconColor: "text-white",
    },
    {
      label: "Total Revenue",
      value: "$25,400",
      icon: <FiDollarSign />,
      color: "bg-purple-500",
      iconColor: "text-white",
    },
  ];

  const recentProperties = [
    { id: 1, name: "Modern Villa", status: "Active", inquiries: 5 },
    { id: 2, name: "City Apartment", status: "Pending", inquiries: 2 },
    { id: 3, name: "Beach House", status: "Rented", inquiries: 0 },
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
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Owner Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome back! Here's your property overview
          </p>
        </div>
        <Link
          to="/owner-dashboard/add-property"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FiPlus className="h-5 w-5" />
          Add New Property
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <div className={`${stat.iconColor} text-xl`}>{stat.icon}</div>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className={`p-4 border-2 border-dashed border-gray-300 rounded-lg text-center ${action.color} transition-all hover:shadow-sm`}
            >
              <div
                className={`${action.iconBg} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3`}
              >
                {action.icon}
              </div>
              <div className="font-medium text-gray-900 mb-1">
                {action.title}
              </div>
              <div className="text-sm text-gray-600">{action.description}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Properties */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Recent Properties
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Your recently added properties
            </p>
          </div>
          <Link
            to="/owner-dashboard/my-properties"
            className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            View All
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Inquiries
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentProperties.map((property) => (
                <tr key={property.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <MdApartment className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {property.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          Added 2 days ago
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        property.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : property.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {property.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                        <FiMessageSquare className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">
                          {property.inquiries}
                        </div>
                        <div className="text-xs text-gray-500">inquiries</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <Link
                        to={`/owner-dashboard/property/${property.id}/edit`}
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                      >
                        <FiEdit className="h-4 w-4" />
                        <span>Edit</span>
                      </Link>
                      <button className="flex items-center gap-1 text-gray-600 hover:text-gray-800">
                        <FiEye className="h-4 w-4" />
                        <span>View</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Properties by Status */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Properties by Status
          </h3>
          <div className="space-y-4">
            {[
              {
                label: "Active",
                value: 3,
                color: "bg-green-500",
                percentage: "60%",
              },
              {
                label: "Pending",
                value: 1,
                color: "bg-yellow-500",
                percentage: "20%",
              },
              {
                label: "Rented",
                value: 1,
                color: "bg-blue-500",
                percentage: "20%",
              },
            ].map((item, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    {item.label}
                  </span>
                  <span className="text-sm font-bold text-gray-900">
                    {item.value} properties
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${item.color} h-2 rounded-full`}
                    style={{ width: item.percentage }}
                  ></div>
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
                action: "New inquiry for Modern Villa",
                time: "2 hours ago",
                icon: <FiMail className="text-blue-500" />,
              },
              {
                action: "Agent assigned to City Apartment",
                time: "1 day ago",
                icon: <FiUsers className="text-green-500" />,
              },
              {
                action: "Rent payment received",
                time: "2 days ago",
                icon: <FiDollarSign className="text-purple-500" />,
              },
            ].map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  {activity.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {activity.action}
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
