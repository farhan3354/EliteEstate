import React, { useState, useEffect } from "react";
import api from "../../utils/routeapi";
import { FiCheck, FiX, FiEye, FiClock, FiUser, FiHome, FiDollarSign } from "react-icons/fi";
import { Link } from "react-router-dom";

const PendingProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPendingProperties();
  }, []);

  const fetchPendingProperties = async () => {
    try {
      setLoading(true);
      const response = await api.get("/properties/admin/pending");
      setProperties(response.data.data.properties);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching pending properties:", err);
      setError("Failed to load pending properties");
      setLoading(false);
    }
  };

  const approveProperty = async (id) => {
    try {
      await api.put(`/properties/admin/${id}/approve`);
      setProperties(properties.filter((p) => p._id !== id));
      alert("Property approved successfully!");
    } catch (err) {
      console.error("Error approving property:", err);
      alert("Failed to approve property.");
    }
  };

  const rejectProperty = async (id) => {
    const reason = window.prompt("Enter reason for rejection:");
    if (reason === null) return;

    try {
      await api.put(`/properties/admin/${id}/reject`, { reason });
      setProperties(properties.filter((p) => p._id !== id));
      alert("Property rejected.");
    } catch (err) {
      console.error("Error rejecting property:", err);
      alert("Failed to reject property.");
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
        <h1 className="text-3xl font-bold text-gray-900 border-l-4 border-blue-600 pl-4">
          Pending Properties Approval
        </h1>
        <p className="text-gray-600 mt-2">Review and manage new property submissions</p>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded shadow-sm">
          {error}
        </div>
      )}

      {properties.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="text-green-500 text-7xl mb-6 bg-green-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto">✓</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            All Caught Up!
          </h3>
          <p className="text-gray-500 text-lg">No properties currently awaiting approval</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {properties.map((property) => (
            <div key={property._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row">
                {/* Property Image */}
                <div className="w-full sm:w-48 h-48 bg-gray-200 relative">
                  {property.images && property.images.length > 0 ? (
                    <img 
                      src={property.images[0]} 
                      alt={property.title} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <FiHome size={40} />
                    </div>
                  )}
                  <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                    {property.purpose?.toUpperCase()}
                  </div>
                </div>

                {/* Property Details */}
                <div className="flex-1 p-5 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-xl text-gray-900 truncate mb-2">{property.title}</h3>
                    <div className="grid grid-cols-1 gap-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <FiUser className="text-blue-500" />
                        <span className="font-medium">Owner:</span> {property.listedBy?.name || "Unknown"}
                      </div>
                      <div className="flex items-center gap-2">
                        <FiDollarSign className="text-green-500" />
                        <span className="font-medium">Price:</span> AED {property.price?.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-2">
                        <FiClock className="text-orange-500" />
                        <span className="font-medium">Submitted:</span> {new Date(property.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => approveProperty(property._id)}
                      className="flex items-center gap-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors shadow-sm text-sm font-semibold"
                    >
                      <FiCheck /> Approve
                    </button>
                    <button
                      onClick={() => rejectProperty(property._id)}
                      className="flex items-center gap-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors shadow-sm text-sm font-semibold"
                    >
                      <FiX /> Reject
                    </button>
                    <Link
                      to={`/property/${property._id}`}
                      className="flex items-center gap-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-semibold"
                    >
                      <FiEye /> View
                    </Link>
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

export default PendingProperties;
