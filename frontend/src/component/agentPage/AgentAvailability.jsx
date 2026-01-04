import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../../utils/routeapi";
import {
  FiCalendar,
  FiClock,
  FiCheck,
  FiX,
  FiSave,
  FiChevronLeft,
  FiToggleLeft,
  FiToggleRight,
  FiInfo,
} from "react-icons/fi";

const AgentAvailability = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [availability, setAvailability] = useState({
    isAvailable: true,
    workingHours: {
      monday: { start: "09:00", end: "18:00", enabled: true },
      tuesday: { start: "09:00", end: "18:00", enabled: true },
      wednesday: { start: "09:00", end: "18:00", enabled: true },
      thursday: { start: "09:00", end: "18:00", enabled: true },
      friday: { start: "09:00", end: "18:00", enabled: true },
      saturday: { start: "10:00", end: "16:00", enabled: false },
      sunday: { start: "10:00", end: "16:00", enabled: false },
    },
    maxAssignments: 10,
    commissionRate: 5,
    minCommission: 1000,
  });

  // Days of the week
  const days = [
    { key: "monday", label: "Monday" },
    { key: "tuesday", label: "Tuesday" },
    { key: "wednesday", label: "Wednesday" },
    { key: "thursday", label: "Thursday" },
    { key: "friday", label: "Friday" },
    { key: "saturday", label: "Saturday" },
    { key: "sunday", label: "Sunday" },
  ];

  // Fetch current agent availability
  const fetchAgentAvailability = async () => {
    try {
      setLoading(true);
      const response = await api.get("/agents/availability", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setAvailability(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching availability:", error);
      // If no availability set yet, use defaults
      console.log("Using default availability settings");
    } finally {
      setLoading(false);
    }
  };

  // Save agent availability
  const saveAvailability = async () => {
    try {
      setSaving(true);
      const response = await api.put("/agents/availability", availability, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        alert("Availability settings saved successfully!");
      }
    } catch (error) {
      console.error("Error saving availability:", error);
      alert(
        error.response?.data?.message || "Failed to save availability settings"
      );
    } finally {
      setSaving(false);
    }
  };

  // Toggle day availability
  const toggleDay = (day) => {
    setAvailability((prev) => ({
      ...prev,
      workingHours: {
        ...prev.workingHours,
        [day]: {
          ...prev.workingHours[day],
          enabled: !prev.workingHours[day].enabled,
        },
      },
    }));
  };

  // Update working hours for a day
  const updateWorkingHours = (day, field, value) => {
    setAvailability((prev) => ({
      ...prev,
      workingHours: {
        ...prev.workingHours,
        [day]: {
          ...prev.workingHours[day],
          [field]: value,
        },
      },
    }));
  };

  // Toggle overall availability
  const toggleAvailability = () => {
    setAvailability((prev) => ({
      ...prev,
      isAvailable: !prev.isAvailable,
    }));
  };

  useEffect(() => {
    if (token) {
      fetchAgentAvailability();
    }
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">
              Loading availability settings...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => navigate("/agent-dashboard")}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <FiChevronLeft className="h-5 w-5" />
              <span>Back to Dashboard</span>
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Availability Settings
              </h1>
              <p className="text-gray-600 mt-2">
                Set your working hours and availability for property assignments
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-200">
            <div className="flex items-start gap-3">
              <FiInfo className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-blue-800 font-medium mb-1">
                  How availability affects your profile:
                </p>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>
                    • When you're marked as "Available", owners can assign
                    properties to you
                  </li>
                  <li>• Working hours help owners know when to contact you</li>
                  <li>
                    • You can temporarily disable availability during holidays
                    or breaks
                  </li>
                  <li>
                    • Setting realistic limits helps manage your workload
                    effectively
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Availability Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <FiToggleRight className="h-5 w-5 text-blue-600" />
            General Availability
          </h2>

          <div className="space-y-6">
            {/* Overall Availability Toggle */}
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
              <div>
                <h3 className="font-medium text-gray-900">
                  Overall Availability
                </h3>
                <p className="text-sm text-gray-600">
                  {availability.isAvailable
                    ? "You are currently available for new assignments"
                    : "You are currently not accepting new assignments"}
                </p>
              </div>
              <button
                onClick={toggleAvailability}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  availability.isAvailable ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    availability.isAvailable ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Max Assignments */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Active Assignments
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={availability.maxAssignments}
                  onChange={(e) =>
                    setAvailability((prev) => ({
                      ...prev,
                      maxAssignments: parseInt(e.target.value),
                    }))
                  }
                  className="flex-1"
                />
                <span className="text-lg font-bold text-blue-600 w-12">
                  {availability.maxAssignments}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Limits the number of properties you can manage simultaneously
              </p>
            </div>

            {/* Commission Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Commission Rate (%)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="1"
                    max="20"
                    step="0.5"
                    value={availability.commissionRate}
                    onChange={(e) =>
                      setAvailability((prev) => ({
                        ...prev,
                        commissionRate: parseFloat(e.target.value),
                      }))
                    }
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-600">%</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Commission (AED)
                </label>
                <input
                  type="number"
                  min="0"
                  value={availability.minCommission}
                  onChange={(e) =>
                    setAvailability((prev) => ({
                      ...prev,
                      minCommission: parseFloat(e.target.value),
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Working Hours */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <FiClock className="h-5 w-5 text-blue-600" />
            Working Hours
          </h2>

          <div className="space-y-4">
            {days.map((day) => (
              <div
                key={day.key}
                className={`p-4 border rounded-xl ${
                  availability.workingHours[day.key].enabled
                    ? "border-blue-200 bg-blue-50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleDay(day.key)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        availability.workingHours[day.key].enabled
                          ? "bg-green-500"
                          : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          availability.workingHours[day.key].enabled
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                    <h3 className="font-medium text-gray-900">{day.label}</h3>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      availability.workingHours[day.key].enabled
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {availability.workingHours[day.key].enabled
                      ? "Available"
                      : "Unavailable"}
                  </span>
                </div>

                {availability.workingHours[day.key].enabled && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Time
                      </label>
                      <input
                        type="time"
                        value={availability.workingHours[day.key].start}
                        onChange={(e) =>
                          updateWorkingHours(day.key, "start", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        End Time
                      </label>
                      <input
                        type="time"
                        value={availability.workingHours[day.key].end}
                        onChange={(e) =>
                          updateWorkingHours(day.key, "end", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Current Status */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <FiCalendar className="h-5 w-5 text-blue-600" />
            Current Status Summary
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-50 p-4 rounded-xl border border-green-200">
              <div className="text-2xl font-bold text-green-600 mb-2">
                {availability.isAvailable ? "Available" : "Unavailable"}
              </div>
              <p className="text-sm text-green-700">
                Overall status for new assignments
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
              <div className="text-2xl font-bold text-blue-600 mb-2">
                {
                  days.filter(
                    (day) => availability.workingHours[day.key].enabled
                  ).length
                }{" "}
                days
              </div>
              <p className="text-sm text-blue-700">Working days per week</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
              <div className="text-2xl font-bold text-purple-600 mb-2">
                Up to {availability.maxAssignments}
              </div>
              <p className="text-sm text-purple-700">
                Maximum active assignments
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={saveAvailability}
            disabled={saving}
            className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 disabled:opacity-50"
          >
            <FiSave className="h-5 w-5" />
            <span>{saving ? "Saving..." : "Save Settings"}</span>
          </button>
          <button
            onClick={() => navigate("/agent-dashboard")}
            className="flex-1 flex items-center justify-center gap-2 bg-gray-200 text-gray-800 py-3 rounded-xl hover:bg-gray-300"
          >
            <FiX className="h-5 w-5" />
            <span>Cancel</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgentAvailability;
