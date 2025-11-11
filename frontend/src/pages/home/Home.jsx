// pages/Home.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import PropertyCard from "../../component/homePage/PropertyCard";

const Home = () => {
  const navigate = useNavigate();

  const propertyCategories = [
    {
      name: "Apartments for Rent",
      value: "apartments-for-rent",
      count: "2,345",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300",
      color: "bg-blue-500",
    },
    {
      name: "Apartments for Sale",
      value: "apartments-for-sale",
      count: "1,567",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300",
      color: "bg-green-500",
    },
    {
      name: "Villas for Rent",
      value: "villas-for-rent",
      count: "892",
      image:
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=300",
      color: "bg-purple-500",
    },
    {
      name: "Villas for Sale",
      value: "villas-for-sale",
      count: "456",
      image:
        "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=300",
      color: "bg-red-500",
    },
    {
      name: "Commercial for Rent",
      value: "commercial-for-rent",
      count: "234",
      image:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=300",
      color: "bg-orange-500",
    },
    {
      name: "Commercial for Sale",
      value: "commercial-for-sale",
      count: "178",
      image:
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=300",
      color: "bg-indigo-500",
    },
  ];

  const popularLocations = [
    "Abu Dhabi Island",
    "Khalifa City",
    "Al Reem Island",
    "Yas Island",
    "Saadiyat Island",
    "Al Raha Beach",
    "Mohammed Bin Zayed City",
    "Shakhbout City",
  ];

  const featuredProperties = [
    {
      id: 1,
      title: "2BR Apartment in Downtown Abu Dhabi",
      price: "120,000",
      period: "Yearly",
      type: "Apartment",
      beds: 2,
      baths: 2,
      size: 1200,
      location: "Downtown Abu Dhabi",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400",
      verified: true,
      premium: true,
      agency: {
        name: "Premium Real Estate",
        logo: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=100",
      },
    },
    {
      id: 2,
      title: "Luxury Villa with Private Pool",
      price: "280,000",
      period: "Yearly",
      type: "Villa",
      beds: 4,
      baths: 4,
      size: 3200,
      location: "Al Reem Island",
      image:
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400",
      verified: true,
      premium: true,
      agency: {
        name: "Luxury Properties",
        logo: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=100",
      },
    },
    {
      id: 3,
      title: "Modern Studio Apartment",
      price: "45,000",
      period: "Yearly",
      type: "Apartment",
      beds: 1,
      baths: 1,
      size: 800,
      location: "Khalifa City",
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400",
      verified: true,
      premium: false,
      agency: {
        name: "City Realty",
        logo: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=100",
      },
    },
    {
      id: 4,
      title: "3BR Townhouse for Rent",
      price: "180,000",
      period: "Yearly",
      type: "Townhouse",
      beds: 3,
      baths: 2,
      size: 1600,
      location: "Mohammed Bin Zayed City",
      image:
        "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400",
      verified: true,
      premium: false,
      agency: {
        name: "Townhouse Specialists",
        logo: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=100",
      },
    },
    {
      id: 5,
      title: "Penthouse with Sea View",
      price: "350,000",
      period: "Yearly",
      type: "Penthouse",
      beds: 3,
      baths: 3,
      size: 2200,
      location: "Yas Island",
      image:
        "https://images.unsplash.com/photo-1540518614846-7eded1027f2b?w=400",
      verified: true,
      premium: true,
      agency: {
        name: "Elite Properties",
        logo: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=100",
      },
    },
    {
      id: 6,
      title: "Family Villa with Garden",
      price: "420,000",
      period: "Yearly",
      type: "Villa",
      beds: 5,
      baths: 4,
      size: 3800,
      location: "Al Raha Beach",
      image:
        "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=400",
      verified: true,
      premium: true,
      agency: {
        name: "Family Homes",
        logo: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=100",
      },
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Find Your Perfect Property in Abu Dhabi
            </h1>
            <p className="text-xl mb-8 text-orange-100">
              Browse thousands of properties for rent and sale across Abu Dhabi
            </p>

            {/* Quick Search */}
            <div className="bg-white rounded-xl p-2 shadow-2xl">
              <div className="flex flex-col lg:flex-row gap-2">
                <select className="flex-shrink-0 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500">
                  <option>All Categories</option>
                  {propertyCategories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.name}
                    </option>
                  ))}
                </select>

                <select className="flex-shrink-0 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500">
                  <option>All Locations</option>
                  {popularLocations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  placeholder="Search by keyword..."
                  className="flex-grow px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />

                <button
                  onClick={() => navigate("/properties")}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition duration-200"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
            Browse Property Categories
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {propertyCategories.map((category) => (
              <div
                key={category.value}
                onClick={() =>
                  navigate(`/properties?category=${category.value}`)
                }
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition duration-300 cursor-pointer group"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-3 py-1 rounded-full text-sm font-semibold text-gray-800">
                    {category.count} ads
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-orange-500 transition duration-200">
                    {category.name}
                  </h3>
                  <div className="flex items-center text-orange-500 font-semibold">
                    <span>Browse Properties</span>
                    <svg
                      className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Popular Locations in Abu Dhabi
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {popularLocations.map((location) => (
              <button
                key={location}
                onClick={() => navigate(`/properties?location=${location}`)}
                className="bg-white border border-gray-200 rounded-lg px-6 py-4 text-gray-700 hover:border-orange-500 hover:text-orange-500 transition duration-200 text-center"
              >
                {location}
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Featured Properties
            </h2>
            <Link
              to="/properties"
              className="text-orange-500 hover:text-orange-600 font-semibold"
            >
              View All Properties →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-orange-500 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">50,000+</div>
              <div className="text-orange-100">Properties Listed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">25,000+</div>
              <div className="text-orange-100">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100+</div>
              <div className="text-orange-100">Trusted Agencies</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-orange-100">Customer Support</div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Search Properties</h3>
              <p className="text-gray-600">
                Browse through thousands of properties using our advanced
                filters and search tools.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Contact Agents</h3>
              <p className="text-gray-600">
                Connect directly with property owners and trusted real estate
                agencies.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Find Your Home</h3>
              <p className="text-gray-600">
                Schedule viewings and find your perfect property in Abu Dhabi.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-orange-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Find Your Property?
          </h2>
          <p className="text-orange-100 text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of users who found their perfect property on dubizzle
            Abu Dhabi
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/properties")}
              className="bg-white text-orange-500 hover:bg-gray-100 px-8 py-4 rounded-lg transition duration-200 font-semibold text-lg"
            >
              Browse All Properties
            </button>
            <button
              onClick={() => navigate("/list-property")}
              className="border-2 border-white text-white hover:bg-white hover:text-orange-500 px-8 py-4 rounded-lg transition duration-200 font-semibold text-lg"
            >
              List Your Property
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
