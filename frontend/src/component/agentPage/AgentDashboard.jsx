import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FiHome,
  FiEye,
  FiMessageSquare,
  FiCalendar,
  FiStar,
  FiTrendingUp,
  FiDollarSign,
  FiUserPlus,
  FiPlus,
  FiBarChart,
  FiLoader,
} from "react-icons/fi";
import { agentAPI, inquiryAPI, bookingAPI } from "../../services/api";

const AgentDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    stats: [],
    recentActivities: [],
    topProperties: [],
    agentInfo: null,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [assignedRes, inquiryRes, bookingRes, profileRes] = await Promise.all([
        agentAPI.getAssignedProperties(),
        inquiryAPI.getSellerInquiries(),
        bookingAPI.getLandlordBookings(),
        agentAPI.getMyProfile(),
      ]);

      const assignedData = assignedRes.data.data;
      const inquiryData = inquiryRes.data.data;
      const bookings = bookingRes.data.data.bookings;
      const agentProfile = profileRes.data.data;

      // Map Stats
      const stats = [
        {
          label: "Total Assignments",
          value: assignedData.stats.totalAssignments || 0,
          change: assignedData.stats.acceptanceRate || "0%",
          trend: "up",
          icon: FiHome,
          color: "blue",
        },
        {
          label: "Active Inquiries",
          value: inquiryData.stats.total || 0,
          change: `+${inquiryData.stats.new || 0} new`,
          trend: "up",
          icon: FiMessageSquare,
          color: "purple",
        },
        {
          label: "Scheduled Viewings",
          value: bookings.length || 0,
          change: bookings.filter(b => b.status === 'pending').length + " pending",
          trend: "up",
          icon: FiCalendar,
          color: "orange",
        },
        {
          label: "Agent Rating",
          value: agentProfile.rating?.average || 0,
          change: `${agentProfile.rating?.totalReviews || 0} reviews`,
          trend: "up",
          icon: FiStar,
          color: "green",
        },
      ];

      // Map Recent Activities
      const activities = [];
      
      // Add inquiries to activities
      inquiryData.inquiries.slice(0, 3).forEach(inq => {
        activities.push({
          id: `inq-${inq._id}`,
          type: "inquiry",
          message: `New inquiry for ${inq.property?.title}`,
          time: new Date(inq.createdAt).toLocaleDateString(),
          property: inq.property?.title,
          client: inq.buyer?.name,
          date: new Date(inq.createdAt)
        });
      });

      // Add bookings to activities
      bookings.slice(0, 3).forEach(book => {
        activities.push({
          id: `book-${book._id}`,
          type: "viewing",
          message: `Viewing scheduled for ${book.property?.title}`,
          time: new Date(book.date).toLocaleDateString(),
          property: book.property?.title,
          client: book.user?.name,
          date: new Date(book.createdAt)
        });
      });

      activities.sort((a, b) => b.date - a.date);

      // Map Top Properties (using assigned properties for now)
      const topProps = assignedData.assignments.slice(0, 3).map(assign => ({
        id: assign.property.id,
        title: assign.property.title,
        price: assign.property.formattedPrice,
        views: Math.floor(Math.random() * 100), // Placeholder as backend doesn't track views per agent assignment yet
        inquiries: 0, // Placeholder
        status: assign.status,
      }));

      setDashboardData({
        stats,
        recentActivities: activities.slice(0, 5),
        topProperties: topProps,
        agentInfo: agentProfile,
      });

    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case "inquiry":
        return (
          <FiMessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
        );
      case "viewing":
        return <FiCalendar className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />;
      case "listing":
        return <FiHome className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />;
      case "sale":
        return (
          <FiDollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
        );
      default:
        return <FiStar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <FiLoader className="w-12 h-12 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 sm:p-8 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="mb-4 lg:mb-0">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
              Welcome back, {user?.name || "Agent"}!
            </h1>
            <p className="text-blue-100 text-sm sm:text-lg">
              Here's what's happening with your properties today.
            </p>
          </div>
          <div>
            <Link
              to="/agent-dashboard/add-property"
              className="inline-flex items-center justify-center space-x-2 bg-white text-blue-600 px-4 sm:px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors duration-200 font-medium w-full lg:w-auto text-sm sm:text-base"
            >
              <FiHome className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Add New Property</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {dashboardData.stats.map((stat, index) => {
          const Icon = stat.icon;
          const colorClass = `text-${stat.color}-600 bg-${stat.color}-100`;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className={`p-2 sm:p-3 rounded-xl ${colorClass}`}>
                  <Icon className={`w-4 h-4 sm:w-6 sm:h-6`} />
                </div>
                <div
                  className={`flex items-center space-x-1 text-xs sm:text-sm font-medium ${
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  <FiTrendingUp
                    className={`w-3 h-3 sm:w-4 sm:h-4 ${
                      stat.trend === "down" ? "transform rotate-180" : ""
                    }`}
                  />
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-2xl shadow-lg">
          <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
              Recent Activities
            </h2>
          </div>
          <div className="p-4 sm:p-6">
            <div className="space-y-3 sm:space-y-4">
              {dashboardData.recentActivities.length > 0 ? dashboardData.recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-3 sm:space-x-4 pb-3 sm:pb-4 border-b border-gray-100 last:border-b-0 last:pb-0"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 font-medium text-sm sm:text-base">
                      {activity.message}
                    </p>
                    {activity.client && (
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">
                        Client: {activity.client}
                      </p>
                    )}
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              )) : (
                <p className="text-gray-500 text-center py-4">No recent activities</p>
              )}
            </div>
          </div>
        </div>

        {/* Top Performing Properties */}
        <div className="bg-white rounded-2xl shadow-lg">
          <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
              Top Properties
            </h2>
          </div>
          <div className="p-4 sm:p-6">
            <div className="space-y-3 sm:space-y-4">
              {dashboardData.topProperties.length > 0 ? dashboardData.topProperties.map((property) => (
                <div
                  key={property.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex-1 min-w-0 mb-2 sm:mb-0">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                      {property.title}
                    </h3>
                    <div className="flex items-center space-x-2 sm:space-x-4 mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <FiEye className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{property.views} views</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FiUserPlus className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{property.inquiries} inquiries</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="font-bold text-gray-900 text-sm sm:text-base">
                      {property.price}
                    </div>
                    <span
                      className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-1 ${
                        property.status === "active" || property.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {property.status}
                    </span>
                  </div>
                </div>
              )) : (
                <p className="text-gray-500 text-center py-4">No data available</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-lg">
        <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">
            Quick Actions
          </h2>
        </div>
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <Link
              to="/agent-dashboard/add-property"
              className="flex flex-col items-center justify-center p-4 sm:p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors duration-200 text-center"
            >
              <FiPlus className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 mb-2 sm:mb-3" />
              <div className="font-medium text-gray-900 text-sm sm:text-base">
                Add Property
              </div>
              <div className="text-xs sm:text-sm text-gray-600 mt-1">
                List new property
              </div>
            </Link>

            <Link
              to="/agent-dashboard/avala"
              className="flex flex-col items-center justify-center p-4 sm:p-6 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-colors duration-200 text-center"
            >
              <FiCalendar className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 mb-2 sm:mb-3" />
              <div className="font-medium text-gray-900 text-sm sm:text-base">
                Schedule
              </div>
              <div className="text-xs sm:text-sm text-gray-600 mt-1">
                Manage viewings
              </div>
            </Link>

            <Link
              to="/agent-dashboard/inquiries"
              className="flex flex-col items-center justify-center p-4 sm:p-6 border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-colors duration-200 text-center"
            >
              <FiMessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 mb-2 sm:mb-3" />
              <div className="font-medium text-gray-900 text-sm sm:text-base">
                Inquiries
              </div>
              <div className="text-xs sm:text-sm text-gray-600 mt-1">
                View messages
              </div>
            </Link>

            <Link
              to="/agent-dashboard/performance"
              className="flex flex-col items-center justify-center p-4 sm:p-6 border-2 border-gray-200 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition-colors duration-200 text-center"
            >
              <FiBarChart className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 mb-2 sm:mb-3" />
              <div className="font-medium text-gray-900 text-sm sm:text-base">
                Performance
              </div>
              <div className="text-xs sm:text-sm text-gray-600 mt-1">
                View analytics
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;

// import React from "react";
// import { Link } from "react-router-dom";
// import {
//   FiHome,
//   FiEye,
//   FiMessageSquare,
//   FiCalendar,
//   FiStar,
//   FiTrendingUp,
//   FiDollarSign,
//   FiUserPlus,
//   FiPlus,
//   FiBarChart
// } from "react-icons/fi";

// const AgentDashboard = () => {
//   const stats = [
//     {
//       label: "Total Listings",
//       value: "24",
//       change: "+12%",
//       trend: "up",
//       icon: FiHome,
//       color: "blue",
//     },
//     {
//       label: "Property Views",
//       value: "1,248",
//       change: "+8%",
//       trend: "up",
//       icon: FiEye,
//       color: "green",
//     },
//     {
//       label: "New Inquiries",
//       value: "18",
//       change: "+5",
//       trend: "up",
//       icon: FiMessageSquare,
//       color: "purple",
//     },
//     {
//       label: "Scheduled Viewings",
//       value: "12",
//       change: "-2",
//       trend: "down",
//       icon: FiCalendar,
//       color: "orange",
//     },
//   ];

//   const recentActivities = [
//     {
//       id: 1,
//       type: "inquiry",
//       message: "New inquiry for Luxury Villa - Al Reem Island",
//       time: "2 hours ago",
//       property: "Luxury Villa - Al Reem Island",
//       client: "Mohammed Ali",
//     },
//     {
//       id: 2,
//       type: "viewing",
//       message: "Viewing scheduled for Modern Apartment - Corniche",
//       time: "4 hours ago",
//       property: "Modern Apartment - Corniche",
//       client: "Sarah Johnson",
//     },
//     {
//       id: 3,
//       type: "listing",
//       message: "New property listed: Commercial Space - DIFC",
//       time: "1 day ago",
//       property: "Commercial Space - DIFC",
//     },
//     {
//       id: 4,
//       type: "sale",
//       message: "Property sold: 2BR Apartment - Downtown",
//       time: "2 days ago",
//       property: "2BR Apartment - Downtown",
//       client: "Mike Chen",
//     },
//   ];

//   const topProperties = [
//     {
//       id: 1,
//       title: "Luxury Villa - Al Reem Island",
//       price: "4,200,000 AED",
//       views: 245,
//       inquiries: 12,
//       status: "Active",
//     },
//     {
//       id: 2,
//       title: "Modern Apartment - Corniche",
//       price: "1,800,000 AED",
//       views: 189,
//       inquiries: 8,
//       status: "Active",
//     },
//     {
//       id: 3,
//       title: "Commercial Space - DIFC",
//       price: "5,200,000 AED",
//       views: 156,
//       inquiries: 6,
//       status: "Under Offer",
//     },
//   ];

//   const getActivityIcon = (type) => {
//     switch (type) {
//       case "inquiry":
//         return <FiMessageSquare className="w-5 h-5 text-blue-600" />;
//       case "viewing":
//         return <FiCalendar className="w-5 h-5 text-green-600" />;
//       case "listing":
//         return <FiHome className="w-5 h-5 text-purple-600" />;
//       case "sale":
//         return <FiDollarSign className="w-5 h-5 text-green-600" />;
//       default:
//         return <FiStar className="w-5 h-5 text-gray-600" />;
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
//           <div>
//             <h1 className="text-3xl font-bold mb-2">Welcome back, Ahmed!</h1>
//             <p className="text-blue-100 text-lg">
//               Here's what's happening with your properties today.
//             </p>
//           </div>
//           <div className="mt-4 lg:mt-0">
//             <Link
//               to="/agent/add-property"
//               className="inline-flex items-center space-x-2 bg-white text-blue-600 px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors duration-200 font-medium"
//             >
//               <FiHome className="w-5 h-5" />
//               <span>Add New Property</span>
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {stats.map((stat, index) => {
//           const Icon = stat.icon;
//           return (
//             <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
//               <div className="flex items-center justify-between mb-4">
//                 <div className={`p-3 rounded-xl bg-${stat.color}-100`}>
//                   <Icon className={`w-6 h-6 text-${stat.color}-600`} />
//                 </div>
//                 <div
//                   className={`flex items-center space-x-1 text-sm font-medium ${
//                     stat.trend === "up" ? "text-green-600" : "text-red-600"
//                   }`}
//                 >
//                   <FiTrendingUp
//                     className={`w-4 h-4 ${
//                       stat.trend === "down" ? "transform rotate-180" : ""
//                     }`}
//                   />
//                   <span>{stat.change}</span>
//                 </div>
//               </div>
//               <div className="text-2xl font-bold text-gray-900 mb-1">
//                 {stat.value}
//               </div>
//               <div className="text-sm text-gray-600">{stat.label}</div>
//             </div>
//           );
//         })}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Recent Activities */}
//         <div className="bg-white rounded-2xl shadow-lg">
//           <div className="px-6 py-4 border-b border-gray-200">
//             <h2 className="text-xl font-bold text-gray-900">
//               Recent Activities
//             </h2>
//           </div>
//           <div className="p-6">
//             <div className="space-y-4">
//               {recentActivities.map((activity) => (
//                 <div
//                   key={activity.id}
//                   className="flex items-start space-x-4 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0"
//                 >
//                   <div className="flex-shrink-0">
//                     {getActivityIcon(activity.type)}
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <p className="text-gray-900 font-medium">
//                       {activity.message}
//                     </p>
//                     {activity.client && (
//                       <p className="text-sm text-gray-600 mt-1">
//                         Client: {activity.client}
//                       </p>
//                     )}
//                     <p className="text-sm text-gray-500 mt-1">
//                       {activity.time}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Top Performing Properties */}
//         <div className="bg-white rounded-2xl shadow-lg">
//           <div className="px-6 py-4 border-b border-gray-200">
//             <h2 className="text-xl font-bold text-gray-900">Top Properties</h2>
//           </div>
//           <div className="p-6">
//             <div className="space-y-4">
//               {topProperties.map((property) => (
//                 <div
//                   key={property.id}
//                   className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow duration-200"
//                 >
//                   <div className="flex-1 min-w-0">
//                     <h3 className="font-semibold text-gray-900 truncate">
//                       {property.title}
//                     </h3>
//                     <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
//                       <div className="flex items-center space-x-1">
//                         <FiEye className="w-4 h-4" />
//                         <span>{property.views} views</span>
//                       </div>
//                       <div className="flex items-center space-x-1">
//                         <FiUserPlus className="w-4 h-4" />
//                         <span>{property.inquiries} inquiries</span>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <div className="font-bold text-gray-900">
//                       {property.price}
//                     </div>
//                     <span
//                       className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
//                         property.status === "Active"
//                           ? "bg-green-100 text-green-800"
//                           : "bg-yellow-100 text-yellow-800"
//                       }`}
//                     >
//                       {property.status}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div className="bg-white rounded-2xl shadow-lg">
//         <div className="px-6 py-4 border-b border-gray-200">
//           <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
//         </div>
//         <div className="p-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//             <Link
//               to="/agent/add-property"
//               className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors duration-200 text-center"
//             >
//               <FiPlus className="w-8 h-8 text-gray-400 mb-3" />
//               <div className="font-medium text-gray-900">Add Property</div>
//               <div className="text-sm text-gray-600 mt-1">
//                 List new property
//               </div>
//             </Link>

//             <Link
//               to="/agent/schedule"
//               className="flex flex-col items-center justify-center p-6 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-colors duration-200 text-center"
//             >
//               <FiCalendar className="w-8 h-8 text-gray-400 mb-3" />
//               <div className="font-medium text-gray-900">Schedule</div>
//               <div className="text-sm text-gray-600 mt-1">Manage viewings</div>
//             </Link>

//             <Link
//               to="/agent/inquiries"
//               className="flex flex-col items-center justify-center p-6 border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-colors duration-200 text-center"
//             >
//               <FiMessageSquare className="w-8 h-8 text-gray-400 mb-3" />
//               <div className="font-medium text-gray-900">Inquiries</div>
//               <div className="text-sm text-gray-600 mt-1">View messages</div>
//             </Link>

//             <Link
//               to="/agent/performance"
//               className="flex flex-col items-center justify-center p-6 border-2 border-gray-200 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition-colors duration-200 text-center"
//             >
//               <FiBarChart className="w-8 h-8 text-gray-400 mb-3" />
//               <div className="font-medium text-gray-900">Performance</div>
//               <div className="text-sm text-gray-600 mt-1">View analytics</div>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AgentDashboard;
