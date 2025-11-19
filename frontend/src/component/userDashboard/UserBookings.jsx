import React from "react";
import {
  FiCalendar,
  FiClock,
  FiMapPin,
  FiUser,
  FiMoreVertical,
  FiEdit,
  FiX,
} from "react-icons/fi";

const Bookings = () => {
  const bookings = [
    {
      id: 1,
      property: "Luxury Villa - Palm Jumeirah",
      customer: "Ahmed Al Mansouri",
      date: "2024-02-15",
      time: "10:00 AM",
      status: "Confirmed",
      type: "Viewing",
    },
    {
      id: 2,
      property: "2BR Apartment - Downtown",
      customer: "Sarah Johnson",
      date: "2024-02-16",
      time: "2:00 PM",
      status: "Pending",
      type: "Viewing",
    },
    {
      id: 3,
      property: "Commercial Space - DIFC",
      customer: "Mike Chen",
      date: "2024-02-14",
      time: "11:30 AM",
      status: "Completed",
      type: "Meeting",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-600 border-green-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-600 border-yellow-200";
      case "Completed":
        return "bg-blue-100 text-blue-600 border-blue-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-4 md:py-8">
        <div className="container mx-auto px-3 sm:px-4 max-w-6xl">
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Bookings & Appointments
            </h1>
            <p className="text-sm md:text-base text-gray-600">
              Manage your property viewings and meetings
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
            {[
              { label: "Total Bookings", value: "24", color: "blue" },
              { label: "Confirmed", value: "18", color: "green" },
              { label: "Pending", value: "4", color: "yellow" },
              { label: "Completed", value: "2", color: "purple" },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl md:rounded-xl p-4 md:p-6 shadow-sm border border-gray-200"
              >
                <div
                  className={`text-xl md:text-2xl font-bold text-${stat.color}-600 mb-1 md:mb-2`}
                >
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
          <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">
                Upcoming Bookings
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Property
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {booking.property}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {booking.customer}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {booking.date}
                        </div>
                        <div className="text-sm text-gray-500">
                          {booking.time}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {booking.type}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                            booking.status
                          )}`}
                        >
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-4 transition-colors duration-200">
                          Reschedule
                        </button>
                        <button className="text-red-600 hover:text-red-900 transition-colors duration-200">
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="lg:hidden space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                Upcoming Bookings
              </h2>

              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm truncate">
                          {booking.property}
                        </h3>
                      </div>
                      <span
                        className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full border whitespace-nowrap ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center space-x-1">
                        <FiUser className="w-4 h-4" />
                        <span className="truncate">{booking.customer}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FiMapPin className="w-4 h-4" />
                        <span>{booking.type}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center space-x-1">
                        <FiCalendar className="w-4 h-4" />
                        <span>{booking.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FiClock className="w-4 h-4" />
                        <span>{booking.time}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                      <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors duration-200 text-sm font-medium">
                        <FiEdit className="w-4 h-4" />
                        <span>Reschedule</span>
                      </button>
                      <button className="flex items-center space-x-2 text-red-600 hover:text-red-800 transition-colors duration-200 text-sm font-medium">
                        <FiX className="w-4 h-4" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {bookings.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <FiCalendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No upcoming bookings
              </h3>
              <p className="text-gray-600 mb-4">
                You don't have any scheduled viewings or meetings.
              </p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                Schedule Booking
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Bookings;
