import React, { useState } from "react";

const PendingProperties = () => {
  const [properties, setProperties] = useState([
    {
      id: 1,
      title: "Luxury Beach House",
      owner: "John Smith",
      agent: "Jane Doe",
      price: "$1,200,000",
      submitted: "2024-01-15",
      type: "For Sale",
      images: 5,
    },
    {
      id: 2,
      title: "Downtown Apartment",
      owner: "Mike Johnson",
      agent: "Sarah Wilson",
      price: "$2,500/month",
      submitted: "2024-01-14",
      type: "For Rent",
      images: 3,
    },
  ]);

  const approveProperty = (id) => {
    setProperties(properties.filter((p) => p.id !== id));
    alert(`Property #${id} approved!`);
  };

  const rejectProperty = (id) => {
    if (window.confirm("Are you sure you want to reject this property?")) {
      setProperties(properties.filter((p) => p.id !== id));
      alert(`Property #${id} rejected.`);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Pending Properties for Approval
      </h1>

      {properties.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <div className="text-green-500 text-6xl mb-4">✓</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            All caught up!
          </h3>
          <p className="text-gray-500">No pending properties for approval</p>
        </div>
      ) : (
        <div className="space-y-6">
          {properties.map((property) => (
            <div key={property.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-400">📷</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{property.title}</h3>
                      <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Owner:</span>{" "}
                          {property.owner}
                        </div>
                        <div>
                          <span className="font-medium">Agent:</span>{" "}
                          {property.agent}
                        </div>
                        <div>
                          <span className="font-medium">Price:</span>{" "}
                          {property.price}
                        </div>
                        <div>
                          <span className="font-medium">Type:</span>{" "}
                          {property.type}
                        </div>
                        <div>
                          <span className="font-medium">Submitted:</span>{" "}
                          {property.submitted}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => approveProperty(property.id)}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => rejectProperty(property.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Reject
                  </button>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    View Details
                  </button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex flex-wrap gap-4">
                  <button className="text-sm text-gray-600 hover:text-gray-900">
                    Request More Info
                  </button>
                  <button className="text-sm text-gray-600 hover:text-gray-900">
                    Contact Agent
                  </button>
                  <button className="text-sm text-gray-600 hover:text-gray-900">
                    Check Documents
                  </button>
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
