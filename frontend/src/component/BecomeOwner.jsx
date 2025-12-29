import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const BecomeOwner = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    propertiesOwned: "",
    agreeTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Owner registration:", formData);
    // API call would go here
    alert("Registration submitted! Admin will verify your account.");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Become a Property Owner
            </h1>
            <p className="text-gray-600">
              List and manage your properties with our platform
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address *
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                rows="2"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Properties Owned
              </label>
              <input
                type="number"
                name="propertiesOwned"
                value={formData.propertiesOwned}
                onChange={handleChange}
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                required
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 text-sm text-gray-600">
                I agree to the{" "}
                <Link to="/terms" className="text-blue-600">
                  Terms & Conditions
                </Link>{" "}
                and confirm that I am the legal owner of the properties I list.
              </label>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 font-medium"
              >
                Register as Owner
              </button>
              <Link
                to="/"
                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-md hover:bg-gray-300 font-medium text-center"
              >
                Cancel
              </Link>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-medium mb-3">
              Benefits for Property Owners:
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                List properties for sale or rent
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Connect with verified agents
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Receive inquiries directly
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Manage multiple properties
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Get admin support for disputes
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeOwner;
