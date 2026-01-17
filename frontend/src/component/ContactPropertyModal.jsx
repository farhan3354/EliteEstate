import React, { useState } from "react";
import {
  FiX,
  FiPhone,
  FiMail,
  FiMessageCircle,
  FiSend,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { inquiryAPI } from "../services/api";

const ContactPropertyModal = ({ property, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    message: "",
    contactMethod: "chat",
    buyerContact: {
      name: "",
      phone: "",
      email: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await inquiryAPI.create({
        propertyId: property._id,
        message: formData.message,
        contactMethod: formData.contactMethod,
        buyerContact: formData.buyerContact,
      });

      if (response.data.success) {
        onSuccess && onSuccess(response.data.data.inquiry);
        onClose();
      }
    } catch (err) {
      console.error("Error creating inquiry:", err);
      setError(
        err.response?.data?.message || "Failed to send inquiry. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleQuickContact = (method) => {
    if (method === "whatsapp" && property.listedBy?.phone) {
      const message = encodeURIComponent(
        `Hi, I'm interested in your property: ${property.title}`
      );
      window.open(
        `https://wa.me/${property.listedBy.phone}?text=${message}`,
        "_blank"
      );
    } else if (method === "call" && property.listedBy?.phone) {
      window.open(`tel:${property.listedBy.phone}`);
    } else if (method === "email" && property.listedBy?.email) {
      window.open(
        `mailto:${property.listedBy.email}?subject=Inquiry about ${property.title}`
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Contact Seller</h2>
            <p className="text-sm text-gray-600 mt-1">{property.title}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Contact Options */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <p className="text-sm font-medium text-gray-700 mb-3">
            Quick Contact Options
          </p>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => handleQuickContact("whatsapp")}
              className="flex flex-col items-center gap-2 p-4 bg-white border-2 border-green-500 rounded-lg hover:bg-green-50 transition-colors"
            >
              <FaWhatsapp className="w-6 h-6 text-green-500" />
              <span className="text-sm font-medium text-gray-900">WhatsApp</span>
            </button>
            <button
              onClick={() => handleQuickContact("call")}
              className="flex flex-col items-center gap-2 p-4 bg-white border-2 border-blue-500 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <FiPhone className="w-6 h-6 text-blue-500" />
              <span className="text-sm font-medium text-gray-900">Call</span>
            </button>
            <button
              onClick={() => handleQuickContact("email")}
              className="flex flex-col items-center gap-2 p-4 bg-white border-2 border-purple-500 rounded-lg hover:bg-purple-50 transition-colors"
            >
              <FiMail className="w-6 h-6 text-purple-500" />
              <span className="text-sm font-medium text-gray-900">Email</span>
            </button>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Or send a message through the platform
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Your Contact Information */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Your Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.buyerContact.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      buyerContact: {
                        ...formData.buyerContact,
                        name: e.target.value,
                      },
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.buyerContact.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      buyerContact: {
                        ...formData.buyerContact,
                        phone: e.target.value,
                      },
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+971 50 123 4567"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.buyerContact.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      buyerContact: {
                        ...formData.buyerContact,
                        email: e.target.value,
                      },
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="john@example.com"
                />
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Message *
            </label>
            <textarea
              required
              rows={5}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Hi, I'm interested in this property. I would like to schedule a viewing..."
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.message.length}/1000 characters
            </p>
          </div>

          {/* Preferred Contact Method */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Contact Method
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { value: "chat", label: "Chat", icon: FiMessageCircle },
                { value: "whatsapp", label: "WhatsApp", icon: FaWhatsapp },
                { value: "call", label: "Call", icon: FiPhone },
                { value: "email", label: "Email", icon: FiMail },
              ].map((method) => {
                const Icon = method.icon;
                return (
                  <button
                    key={method.value}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, contactMethod: method.value })
                    }
                    className={`flex items-center justify-center gap-2 px-4 py-3 border-2 rounded-lg transition-colors ${
                      formData.contactMethod === method.value
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{method.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Sending...
                </>
              ) : (
                <>
                  <FiSend className="w-5 h-5" />
                  Send Inquiry
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactPropertyModal;
