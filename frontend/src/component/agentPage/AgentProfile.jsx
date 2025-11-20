import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FiStar,
  FiMapPin,
  FiPhone,
  FiMail,
  FiCalendar,
  FiShare2,
  FiHeart,
  FiCheck,
  FiAward,
  FiHome,
} from "react-icons/fi";

const AgentProfile = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("properties");

  const agent = {
    id: 1,
    name: "Ahmed Al Mansouri",
    title: "Senior Real Estate Consultant",
    image: "/api/placeholder/400/400",
    coverImage: "/api/placeholder/1200/400",
    location: "Abu Dhabi",
    experience: "8 years",
    properties: 47,
    rating: 4.9,
    reviews: 128,
    phone: "+971 50 123 4567",
    email: "ahmed@realestate.ae",
    specialties: [
      "Luxury Villas",
      "Commercial Properties",
      "Investment Opportunities",
    ],
    languages: ["Arabic", "English", "French"],
    description:
      "With over 8 years of experience in Abu Dhabi's real estate market, I specialize in luxury properties and investment opportunities. I've successfully helped 200+ clients find their dream properties and maximize their investments.",
    achievements: [
      "Top Performer 2023",
      "Luxury Specialist Certified",
      "200+ Happy Clients",
    ],
    license: "RERA Certified #12345",
    joined: "2016",
  };

  const agentProperties = [
    {
      id: 1,
      title: "Luxury Villa - Al Reem Island",
      price: "4,200,000 AED",
      type: "Villa",
      beds: 4,
      baths: 5,
      area: "3,200 sq ft",
      image: "/api/placeholder/400/300",
      status: "For Sale",
    },
    {
      id: 2,
      title: "Modern Apartment - Corniche",
      price: "1,800,000 AED",
      type: "Apartment",
      beds: 2,
      baths: 2,
      area: "1,400 sq ft",
      image: "/api/placeholder/400/300",
      status: "For Sale",
    },
  ];

  const reviews = [
    {
      id: 1,
      client: "Mohammed Ali",
      rating: 5,
      comment:
        "Ahmed helped us find our dream villa. Professional and knowledgeable!",
      date: "2024-01-15",
      property: "Villa in Al Reem Island",
    },
    {
      id: 2,
      client: "Emma Wilson",
      rating: 5,
      comment:
        "Excellent service. Made the entire process smooth and stress-free.",
      date: "2024-01-10",
      property: "Apartment in Downtown",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* <div className="relative h-64 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl mb-8">
          <img
            src={agent.coverImage}
            alt="Cover"
            className="w-full h-full object-cover rounded-2xl opacity-20"
          />
        </div> */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
            <div className="flex-shrink-0">
              <img
                src={agent.image}
                alt={agent.name}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {agent.name}
                  </h1>
                  <p className="text-xl text-gray-600 mb-3">{agent.title}</p>
                  <div className="flex items-center space-x-6 text-gray-600">
                    <div className="flex items-center space-x-2">
                      <FiMapPin className="w-5 h-5" />
                      <span>{agent.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FiCalendar className="w-5 h-5" />
                      <span>{agent.experience} experience</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-6 mt-4 lg:mt-0">
                  <div className="text-center">
                    <div className="flex items-center space-x-2 text-yellow-500">
                      <FiStar className="w-6 h-6 fill-current" />
                      <span className="text-2xl font-bold">{agent.rating}</span>
                    </div>
                    <div className="text-gray-500">
                      ({agent.reviews} reviews)
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mb-6">
                {agent.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {specialty}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="flex items-center justify-center space-x-3 bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors duration-200 font-medium">
                  <FiPhone className="w-5 h-5" />
                  <span>Contact Agent</span>
                </button>
                <button className="flex items-center justify-center space-x-3 border border-gray-300 text-gray-700 px-8 py-3 rounded-xl hover:bg-gray-50 transition-colors duration-200 font-medium">
                  <FiMail className="w-5 h-5" />
                  <span>Send Message</span>
                </button>
                <div className="flex space-x-3">
                  <button className="flex items-center justify-center w-12 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                    <FiShare2 className="w-5 h-5" />
                  </button>
                  <button className="flex items-center justify-center w-12 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                    <FiHeart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-lg">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: "about", label: "About" },
                    { id: "properties", label: "Properties" },
                    { id: "reviews", label: "Reviews" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                        activeTab === tab.id
                          ? "border-blue-500 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {activeTab === "about" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        About Me
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {agent.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-4">
                          Languages
                        </h4>
                        <div className="space-y-3">
                          {agent.languages.map((language, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-3"
                            >
                              <FiCheck className="w-5 h-5 text-green-500" />
                              <span className="text-gray-600">{language}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-4">
                          Achievements
                        </h4>
                        <div className="space-y-3">
                          {agent.achievements.map((achievement, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-3"
                            >
                              <FiAward className="w-5 h-5 text-yellow-500" />
                              <span className="text-gray-600">
                                {achievement}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "properties" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {agentProperties.map((property) => (
                      <Link
                        key={property.id}
                        to={`/property/${property.id}`}
                        className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-200"
                      >
                        <img
                          src={property.image}
                          alt={property.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                          <h4 className="font-semibold text-gray-900 mb-2">
                            {property.title}
                          </h4>
                          <div className="text-lg font-bold text-blue-600 mb-2">
                            {property.price}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                            <span>{property.beds} beds</span>
                            <span>{property.baths} baths</span>
                            <span>{property.area}</span>
                          </div>
                          <div>
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                              {property.status}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div
                        key={review.id}
                        className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {review.client}
                            </h4>
                            <p className="text-gray-600">{review.property}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <FiStar className="w-5 h-5 text-yellow-500 fill-current" />
                            <span className="font-semibold">
                              {review.rating}.0
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-3">{review.comment}</p>
                        <div className="text-sm text-gray-500">
                          {review.date}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Contact Info
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <FiPhone className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">{agent.phone}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <FiMail className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">{agent.email}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <FiMapPin className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">{agent.location}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <FiAward className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">{agent.license}</span>
                </div>
              </div>
            </div>

            {/* Quick Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Send Message
              </h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="tel"
                  placeholder="Your Phone"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <textarea
                  placeholder="Your Message"
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentProfile;
