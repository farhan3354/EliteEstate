import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // Sample property data - in real app, you'd fetch this by ID
  const property = {
    id: 1,
    title: "2BR Luxury Apartment with Sea View - Al Reem Island",
    price: 120000,
    type: "apartments-for-sale",
    beds: 2,
    baths: 2,
    area: 1200,
    yearBuilt: 2022,
    location: "Al Reem Island, Abu Dhabi",
    address: "Al Reem Island, Abu Dhabi, UAE",
    description:
      "This stunning 2-bedroom apartment offers breathtaking sea views and luxurious modern living in the heart of Al Reem Island. The property features high-quality finishes, spacious living areas, and access to world-class amenities including swimming pool, gym, and 24/7 security.",
    detailedDescription: `This exquisite 2-bedroom apartment is located in one of Abu Dhabi's most prestigious developments on Al Reem Island. The property boasts:

• Floor-to-ceiling windows with panoramic sea views
• Modern open-plan living and dining area
• High-quality European kitchen appliances
• Master bedroom with walk-in closet and en-suite bathroom
• Guest bedroom with built-in wardrobes
• Two modern bathrooms with premium fixtures
• Balcony with stunning views
• Central air conditioning
• Smart home features

Building Amenities:
• Infinity swimming pool
• State-of-the-art gymnasium
• Children's play area
• 24/7 security and concierge
• Underground parking
• Landscaped gardens`,

    features: [
      "Balcony",
      "Built-in Wardrobes",
      "Central Air Conditioning",
      "Concierge",
      "Covered Parking",
      "Swimming Pool",
      "Gym",
      "Sea View",
      "Modern Kitchen",
      "Walk-in Closet",
      "Smart Home",
      "Pet Friendly",
      "Security",
      "Maintenance",
      "Children's Play Area",
      "Landscaped Gardens",
    ],
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
      "https://images.unsplash.com/photo-1628133287836-40bd5453bed1?w=800",
    ],
    agent: {
      name: "Ahmed Al Mansouri",
      company: "Better Homes",
      phone: "+971 50 123 4567",
      email: "ahmed@betterhomes.ae",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
      experience: "8 years",
      rating: 4.8,
      reviews: 127,
      verified: true,
    },
    amenities: {
      "Building Features": [
        "Swimming Pool",
        "Gym",
        "Security",
        "Concierge",
        "Children's Play Area",
      ],
      "Apartment Features": [
        "Balcony",
        "Built-in Wardrobes",
        "Central AC",
        "Modern Kitchen",
        "Walk-in Closet",
      ],
      "Additional Features": [
        "Sea View",
        "Covered Parking",
        "Pet Friendly",
        "Smart Home",
      ],
    },
    locationDetails: {
      landmarks: [
        { name: "Reem Mall", distance: "5 min drive" },
        { name: "Abu Dhabi Global Market", distance: "8 min drive" },
        { name: "Corniche Beach", distance: "12 min drive" },
        { name: "Abu Dhabi International Airport", distance: "25 min drive" },
      ],
      schools: [
        "Repton School Abu Dhabi - 5 min drive",
        "Brighton College Abu Dhabi - 8 min drive",
      ],
    },
    datePosted: "2 hours ago",
    views: 247,
    favorite: false,
  };

  const similarProperties = [
    {
      id: 4,
      title: "1BR Apartment with Marina View",
      price: 85000,
      type: "apartments-for-sale",
      beds: 1,
      baths: 1,
      area: 900,
      location: "Al Reem Island",
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400",
      date: "1 day ago",
    },
    {
      id: 5,
      title: "3BR Luxury Apartment",
      price: 180000,
      type: "apartments-for-sale",
      beds: 3,
      baths: 2,
      area: 1600,
      location: "Al Raha Beach",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400",
      date: "3 hours ago",
    },
    {
      id: 6,
      title: "2BR Apartment for Rent",
      price: 65000,
      type: "apartments-for-rent",
      beds: 2,
      baths: 2,
      area: 1100,
      location: "Khalifa City",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400",
      date: "5 hours ago",
    },
  ];

  const handleContactAgent = () => {
    // In real app, this would open a contact form or initiate chat
    alert(`Contacting ${property.agent.name} at ${property.agent.phone}`);
  };

  const toggleFavorite = () => {
    // In real app, this would update in database
    property.favorite = !property.favorite;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <button
              onClick={() => navigate("/")}
              className="hover:text-orange-500"
            >
              Home
            </button>
            <span>›</span>
            <button
              onClick={() => navigate("/properties")}
              className="hover:text-orange-500"
            >
              Properties
            </button>
            <span>›</span>
            <button
              onClick={() => navigate(`/properties?category=${property.type}`)}
              className="hover:text-orange-500"
            >
              {property.type
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </button>
            <span>›</span>
            <span className="text-gray-800 font-medium">Property Details</span>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
              <div className="relative">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Featured
                </div>
                <button
                  onClick={toggleFavorite}
                  className="absolute top-4 right-4 bg-white bg-opacity-90 p-2 rounded-full hover:bg-orange-500 hover:text-white transition duration-200"
                >
                  <svg
                    className="w-6 h-6"
                    fill={property.favorite ? "currentColor" : "none"}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>

              {/* Thumbnail Gallery */}
              <div className="p-4">
                <div className="flex space-x-2 overflow-x-auto">
                  {property.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${property.title} ${index + 1}`}
                      className="w-20 h-20 object-cover rounded-lg cursor-pointer hover:opacity-80 transition duration-200"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Property Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    {property.title}
                  </h1>
                  <p className="text-gray-600 mb-4">{property.location}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-orange-500 mb-1">
                    AED {property.price.toLocaleString()}
                  </div>
                  {property.type.includes("rent") && (
                    <div className="text-gray-600 text-sm">per month</div>
                  )}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-800">
                    {property.beds}
                  </div>
                  <div className="text-gray-600 text-sm">Bedrooms</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-800">
                    {property.baths}
                  </div>
                  <div className="text-gray-600 text-sm">Bathrooms</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-800">
                    {property.area}
                  </div>
                  <div className="text-gray-600 text-sm">Sq. Ft.</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-800">
                    {property.yearBuilt}
                  </div>
                  <div className="text-gray-600 text-sm">Year Built</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button
                  onClick={handleContactAgent}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition duration-200 flex items-center justify-center space-x-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span>Call Agent</span>
                </button>
                <button className="flex-1 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white py-3 rounded-lg font-semibold transition duration-200">
                  Send Message
                </button>
                <button className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-100 py-3 rounded-lg font-semibold transition duration-200">
                  Schedule Viewing
                </button>
              </div>
            </div>

            {/* Tabs Navigation */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex overflow-x-auto">
                  {[
                    "overview",
                    "description",
                    "features",
                    "location",
                    "contact",
                  ].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition duration-200 ${
                        activeTab === tab
                          ? "border-orange-500 text-orange-500"
                          : "border-transparent text-gray-600 hover:text-gray-800"
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === "overview" && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Property Overview
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {property.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">
                          Key Details
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              Property Type:
                            </span>
                            <span className="text-gray-800 font-medium">
                              Apartment
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Furnishing:</span>
                            <span className="text-gray-800 font-medium">
                              Furnished
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Parking:</span>
                            <span className="text-gray-800 font-medium">
                              2 Covered
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              Maintenance Fee:
                            </span>
                            <span className="text-gray-800 font-medium">
                              AED 1,200/year
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">
                          Building Information
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              Building Name:
                            </span>
                            <span className="text-gray-800 font-medium">
                              Marina Heights
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Floor:</span>
                            <span className="text-gray-800 font-medium">
                              15th Floor
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">View:</span>
                            <span className="text-gray-800 font-medium">
                              Sea View
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Status:</span>
                            <span className="text-green-600 font-medium">
                              Ready to Move In
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "description" && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Detailed Description
                    </h3>
                    <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                      {property.detailedDescription}
                    </div>
                  </div>
                )}

                {activeTab === "features" && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Features & Amenities
                    </h3>

                    {Object.entries(property.amenities).map(
                      ([category, features]) => (
                        <div key={category} className="mb-6">
                          <h4 className="font-semibold text-gray-800 mb-3">
                            {category}
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {features.map((feature, index) => (
                              <div
                                key={index}
                                className="flex items-center space-x-2"
                              >
                                <svg
                                  className="w-4 h-4 text-green-500"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                                <span className="text-gray-700">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}

                {activeTab === "location" && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Location & Neighborhood
                    </h3>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 mb-3">
                        Nearby Landmarks
                      </h4>
                      <div className="space-y-2">
                        {property.locationDetails.landmarks.map(
                          (landmark, index) => (
                            <div
                              key={index}
                              className="flex justify-between text-sm"
                            >
                              <span className="text-gray-600">
                                {landmark.name}
                              </span>
                              <span className="text-gray-800 font-medium">
                                {landmark.distance}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">
                        Nearby Schools
                      </h4>
                      <div className="space-y-1">
                        {property.locationDetails.schools.map(
                          (school, index) => (
                            <div key={index} className="text-sm text-gray-600">
                              {school}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "contact" && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Contact Information
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Get in touch with the agent for more information or to
                      schedule a viewing.
                    </p>

                    <div className="bg-gray-50 rounded-lg p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <img
                          src={property.agent.image}
                          alt={property.agent.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="font-semibold text-gray-800">
                            {property.agent.name}
                          </h4>
                          <p className="text-gray-600 text-sm">
                            {property.agent.company}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="flex items-center space-x-1">
                              <span className="text-yellow-400">⭐</span>
                              <span className="text-sm text-gray-700">
                                {property.agent.rating}
                              </span>
                            </div>
                            <span className="text-gray-400">•</span>
                            <span className="text-sm text-gray-600">
                              {property.agent.reviews} reviews
                            </span>
                            {property.agent.verified && (
                              <>
                                <span className="text-gray-400">•</span>
                                <span className="text-green-600 text-sm font-medium">
                                  Verified
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                          <svg
                            className="w-5 h-5 text-orange-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                          <span className="text-gray-700">
                            {property.agent.phone}
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                          <svg
                            className="w-5 h-5 text-orange-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="text-gray-700">
                            {property.agent.email}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Similar Properties */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Similar Properties
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {similarProperties.map((similarProperty) => (
                  <div
                    key={similarProperty.id}
                    onClick={() => navigate(`/property/${similarProperty.id}`)}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition duration-200 cursor-pointer"
                  >
                    <div className="flex">
                      <img
                        src={similarProperty.image}
                        alt={similarProperty.title}
                        className="w-1/3 h-24 object-cover"
                      />
                      <div className="w-2/3 p-3">
                        <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 mb-1">
                          {similarProperty.title}
                        </h3>
                        <p className="text-gray-600 text-xs mb-2">
                          {similarProperty.location}
                        </p>
                        <div className="text-lg font-bold text-orange-500">
                          AED {similarProperty.price.toLocaleString()}
                          {similarProperty.type.includes("rent") && "/month"}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              {/* Agent Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="text-center mb-4">
                  <img
                    src={property.agent.image}
                    alt={property.agent.name}
                    className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-2 border-orange-500"
                  />
                  <h3 className="font-semibold text-gray-800">
                    {property.agent.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {property.agent.company}
                  </p>
                  <div className="flex items-center justify-center space-x-2 mt-1">
                    <span className="text-yellow-400">⭐</span>
                    <span className="text-sm text-gray-700">
                      {property.agent.rating}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-gray-600">
                      {property.agent.reviews} reviews
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleContactAgent}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition duration-200"
                  >
                    Call Agent
                  </button>
                  <button className="w-full border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white py-3 rounded-lg font-semibold transition duration-200">
                    Send Message
                  </button>
                </div>
              </div>

              {/* Property Stats */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-800 mb-4">
                  Property Information
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Reference No:</span>
                    <span className="text-gray-800 font-medium">
                      #PRP{property.id.toString().padStart(5, "0")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Posted:</span>
                    <span className="text-gray-800 font-medium">
                      {property.datePosted}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Views:</span>
                    <span className="text-gray-800 font-medium">
                      {property.views}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="text-green-600 font-medium">
                      Available
                    </span>
                  </div>
                </div>
              </div>

              {/* Safety Tips */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="font-semibold text-blue-800 mb-3">
                  Safety Tips
                </h3>
                <ul className="space-y-2 text-sm text-blue-700">
                  <li>• Meet in a public place</li>
                  <li>• Inspect the property before paying</li>
                  <li>• Never wire money in advance</li>
                  <li>• Check all documents carefully</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
