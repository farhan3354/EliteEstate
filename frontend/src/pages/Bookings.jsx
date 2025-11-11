import React, { useState, useEffect } from "react";
import { bookingAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("my-bookings");

  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      if (activeTab === "my-bookings") {
        fetchMyBookings();
      } else {
        fetchAgentBookings();
      }
    }
  }, [user, activeTab]);

  const fetchMyBookings = async () => {
    try {
      const response = await bookingAPI.getMyBookings();
      setBookings(response.data.data.bookings);
    } catch (error) {
      setMessage("Error fetching your bookings");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAgentBookings = async () => {
    try {
      const response = await bookingAPI.getAgentBookings();
      setBookings(response.data.data.bookings);
    } catch (error) {
      setMessage("Error fetching agent bookings");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) {
      return;
    }

    try {
      await bookingAPI.cancelBooking(bookingId, "User cancelled");
      setMessage("Booking cancelled successfully");
      if (activeTab === "my-bookings") {
        fetchMyBookings();
      } else {
        fetchAgentBookings();
      }
    } catch (error) {
      setMessage("Error cancelling booking");
      console.error("Error:", error);
    }
  };

  const updateBookingStatus = async (bookingId, status) => {
    try {
      await bookingAPI.updateStatus(bookingId, status);
      setMessage(`Booking ${status} successfully`);
      fetchAgentBookings();
    } catch (error) {
      setMessage("Error updating booking status");
      console.error("Error:", error);
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            Please login to view bookings
          </h2>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading bookings...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Bookings</h1>

      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "my-bookings"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("my-bookings")}
        >
          My Bookings
        </button>
        {user.role === "agent" && (
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "agent-bookings"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("agent-bookings")}
          >
            Agent Bookings
          </button>
        )}
      </div>

      {message && (
        <div
          className={`p-4 mb-6 rounded ${
            message.includes("success")
              ? "bg-green-100 border border-green-400 text-green-700"
              : "bg-red-100 border border-red-400 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      {bookings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {activeTab === "my-bookings"
              ? "You don't have any bookings yet."
              : "You don't have any booking requests yet."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">
                    {booking.property?.title}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    {booking.property?.location?.address}
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <strong>Date:</strong>{" "}
                      {new Date(booking.scheduledDate).toLocaleString()}
                    </div>
                    <div>
                      <strong>Duration:</strong> {booking.duration} minutes
                    </div>
                    <div>
                      <strong>Type:</strong> {booking.type}
                    </div>
                    <div>
                      <strong>Status:</strong>
                      <span
                        className={`ml-2 px-2 py-1 rounded text-xs ${
                          booking.status === "confirmed"
                            ? "bg-green-100 text-green-800"
                            : booking.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : booking.status === "cancelled"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                  </div>

                  {booking.message && (
                    <p className="mt-2 text-gray-600">
                      <strong>Message:</strong> {booking.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col space-y-2 ml-4">
                  {activeTab === "my-bookings" &&
                    booking.status === "pending" && (
                      <button
                        onClick={() => cancelBooking(booking._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm"
                      >
                        Cancel
                      </button>
                    )}

                  {activeTab === "agent-bookings" &&
                    booking.status === "pending" && (
                      <>
                        <button
                          onClick={() =>
                            updateBookingStatus(booking._id, "confirmed")
                          }
                          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-sm"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() =>
                            updateBookingStatus(booking._id, "cancelled")
                          }
                          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm"
                        >
                          Reject
                        </button>
                      </>
                    )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings;
