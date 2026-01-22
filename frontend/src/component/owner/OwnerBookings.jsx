import React, { useState, useEffect } from "react";
import api from "../../utils/routeapi";
import { FiCalendar, FiClock, FiUser, FiHome, FiCheck, FiX, FiMessageSquare } from "react-icons/fi";

const OwnerBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await api.get("/bookings/landlord-bookings");
      setBookings(response.data.data.bookings);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError("Failed to load viewing requests.");
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await api.put(`/bookings/${id}/status`, { status });
      setBookings(bookings.map(b => b._id === id ? { ...b, status } : b));
      alert(`Viewing request ${status} successfully!`);
    } catch (err) {
      console.error(`Error updating booking status to ${status}:`, err);
      alert(`Failed to ${status} viewing request.`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Viewing Requests</h1>
        <p className="text-gray-600 mt-2">Manage appointments from potential buyers</p>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
          {error}
        </div>
      )}

      {bookings.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="text-blue-500 text-7xl mb-6 bg-blue-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
            <FiCalendar />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No Requests Yet</h3>
          <p className="text-gray-500 text-lg">You haven't received any viewing requests yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex flex-col lg:flex-row justify-between gap-6">
                  {/* Property & User Info */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <FiHome className="text-blue-600 text-2xl" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-gray-900">{booking.property?.title}</h3>
                        <p className="text-gray-500 flex items-center gap-1">
                          <FiUser className="text-blue-400" /> Requested by: <span className="text-gray-900 font-medium">{booking.user?.name}</span>
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                        <FiCalendar className="text-blue-500" />
                        <div>
                          <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Date</p>
                          <p className="font-semibold">{new Date(booking.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                        <FiClock className="text-blue-500" />
                        <div>
                          <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Time</p>
                          <p className="font-semibold">{booking.time}</p>
                        </div>
                      </div>
                    </div>

                    {booking.message && (
                      <div className="bg-blue-50 p-4 rounded-xl flex gap-3">
                        <FiMessageSquare className="text-blue-500 mt-1 flex-shrink-0" />
                        <p className="text-gray-700 italic">"{booking.message}"</p>
                      </div>
                    )}
                  </div>

                  {/* Actions & Status */}
                  <div className="lg:w-64 flex flex-col justify-between border-l border-gray-100 lg:pl-6">
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-2">Status</p>
                      <span className={`px-4 py-1.5 rounded-full text-sm font-bold capitalize ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        booking.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {booking.status}
                      </span>
                    </div>

                    {booking.status === 'pending' && (
                      <div className="flex flex-col gap-2 mt-6">
                        <button
                          onClick={() => handleStatusUpdate(booking._id, 'confirmed')}
                          className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2.5 rounded-xl font-bold hover:bg-green-700 transition-colors shadow-sm"
                        >
                          <FiCheck /> Confirm Viewing
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(booking._id, 'cancelled')}
                          className="w-full flex items-center justify-center gap-2 bg-white text-red-600 border border-red-200 py-2.5 rounded-xl font-bold hover:bg-red-50 transition-colors"
                        >
                          <FiX /> Decline
                        </button>
                      </div>
                    )}

                    <div className="mt-4 pt-4 border-t border-gray-50 text-xs text-gray-400">
                      Requested on {new Date(booking.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OwnerBookings;
