import React, { useState } from "react";
import { FiCalendar, FiClock, FiMapPin, FiUser, FiPlus } from "react-icons/fi";

const AgentSchedule = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const appointments = [
    {
      id: 1,
      client: "Mohammed Ali",
      property: "Luxury Villa - Al Reem Island",
      date: "2024-02-15",
      time: "10:00 AM",
      duration: "1 hour",
      type: "Property Viewing",
      status: "confirmed",
      address: "Al Reem Island, Abu Dhabi",
    },
    {
      id: 2,
      client: "Sarah Johnson",
      property: "Modern Apartment - Corniche",
      date: "2024-02-15",
      time: "2:00 PM",
      duration: "1.5 hours",
      type: "Contract Signing",
      status: "confirmed",
      address: "Corniche Road, Abu Dhabi",
    },
    {
      id: 3,
      client: "Mike Chen",
      property: "Commercial Space - DIFC",
      date: "2024-02-16",
      time: "11:30 AM",
      duration: "2 hours",
      type: "Meeting",
      status: "pending",
      address: "DIFC, Dubai",
    },
  ];

  const getStatusColor = (status) => {
    return status === "confirmed"
      ? "bg-green-100 text-green-800"
      : "bg-yellow-100 text-yellow-800";
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "Property Viewing":
        return "bg-blue-100 text-blue-800";
      case "Contract Signing":
        return "bg-purple-100 text-purple-800";
      case "Meeting":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Schedule</h1>
          <p className="text-gray-600">Manage your appointments and viewings</p>
        </div>
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors duration-200 mt-4 lg:mt-0">
          <FiPlus className="w-5 h-5" />
          <span>New Appointment</span>
        </button>
      </div>

      {/* Calendar & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">February 2024</h2>
            <div className="flex space-x-2">
              <button className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                Today
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                Week
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                Month
              </button>
            </div>
          </div>
          {/* Calendar component would go here */}
          <div className="bg-gray-100 rounded-xl p-8 text-center">
            <FiCalendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Calendar view coming soon</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="font-semibold text-gray-900 mb-4">
              Today's Schedule
            </h3>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">2</div>
                <div className="text-sm text-gray-600">Appointments</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">3</div>
                <div className="text-sm text-gray-600">Hours Booked</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                <div className="font-medium text-gray-900">Block Time</div>
                <div className="text-sm text-gray-600">Mark as unavailable</div>
              </button>
              <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                <div className="font-medium text-gray-900">Import</div>
                <div className="text-sm text-gray-600">
                  Import calendar events
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-white rounded-2xl shadow-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            Upcoming Appointments
          </h2>
        </div>
        <div className="divide-y divide-gray-200">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="p-6 hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(
                        appointment.type
                      )}`}
                    >
                      {appointment.type}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        appointment.status
                      )}`}
                    >
                      {appointment.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {appointment.property}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <FiUser className="w-4 h-4" />
                      <span>{appointment.client}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FiCalendar className="w-4 h-4" />
                      <span>{appointment.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FiClock className="w-4 h-4" />
                      <span>
                        {appointment.time} ({appointment.duration})
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FiMapPin className="w-4 h-4" />
                      <span>{appointment.address}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 lg:mt-0 lg:ml-6 flex space-x-2">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 text-sm">
                    Reschedule
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200 text-sm">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgentSchedule;
