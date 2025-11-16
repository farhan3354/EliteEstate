import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300",
      description:
        "10+ years in real estate with a passion for connecting people with their dream homes.",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Head of Technology",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300",
      description:
        "Tech innovator dedicated to creating seamless property search experiences.",
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "Senior Real Estate Agent",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300",
      description:
        "Specialized in luxury properties with 8 years of market expertise.",
    },
    {
      id: 4,
      name: "David Park",
      role: "Customer Success Manager",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
      description: "Ensuring every client finds their perfect property match.",
    },
  ];

  const stats = [
    { number: "10,000+", label: "Properties Listed" },
    { number: "50,000+", label: "Happy Customers" },
    { number: "15+", label: "Cities Covered" },
    { number: "98%", label: "Customer Satisfaction" },
  ];

  const values = [
    {
      icon: "🏠",
      title: "Trust & Transparency",
      description:
        "We believe in honest communication and clear processes for all our clients.",
    },
    {
      icon: "⚡",
      title: "Innovation",
      description:
        "Leveraging technology to make property search faster and smarter.",
    },
    {
      icon: "🤝",
      title: "Partnership",
      description:
        "Building long-term relationships with clients and partners.",
    },
    {
      icon: "🎯",
      title: "Excellence",
      description: "Striving for the highest standards in every transaction.",
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
        <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Building Dreams,
              <span className="block text-blue-200">One Home at a Time</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              We're revolutionizing the way people find their perfect properties
              with cutting-edge technology and personalized service.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/properties"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Explore Properties
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                Get In Touch
              </Link>
            </div>
          </div>
        </section>
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-20 bg-gradient-to-b from-white to-blue-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-800 mb-6">
                  Our Story
                </h2>
                <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                  <p>
                    Founded in 2018, our journey began with a simple vision: to
                    make property search
                    <span className="text-blue-600 font-semibold">
                      {" "}
                      effortless, transparent, and enjoyable
                    </span>
                    . We noticed that finding the perfect property was often
                    stressful and time-consuming.
                  </p>
                  <p>
                    Today, we've grown into a trusted platform connecting
                    thousands of buyers, sellers, and renters with their ideal
                    properties. Our innovative approach combines
                    <span className="text-blue-600 font-semibold">
                      {" "}
                      cutting-edge technology
                    </span>{" "}
                    with
                    <span className="text-blue-600 font-semibold">
                      {" "}
                      personalized human touch
                    </span>
                    .
                  </p>
                  <p>
                    We're proud to have helped over 50,000 families and
                    individuals find their dream homes and investment properties
                    across the region.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="bg-blue-600 rounded-2xl p-8 text-white transform rotate-2 hover:rotate-0 transition-transform duration-300">
                  <div className="bg-white rounded-xl p-6 transform -rotate-2">
                    <h3 className="text-2xl font-bold text-blue-600 mb-4">
                      Our Mission
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      To empower everyone to find their perfect property through
                      innovative technology, expert guidance, and unwavering
                      commitment to customer satisfaction.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Our Values
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The principles that guide everything we do and every
                relationship we build.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 border border-blue-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-20 bg-gradient-to-b from-white to-blue-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Meet Our Team
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Dedicated professionals committed to helping you find your
                perfect property.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-blue-600 font-semibold mb-3">
                      {member.role}
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {member.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Find Your Dream Property?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who found their perfect home
              through our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/properties"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
              >
                Browse Properties
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔍</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Smart Search
                </h3>
                <p className="text-gray-600">
                  Advanced filters and AI-powered recommendations to find
                  exactly what you're looking for.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🛡️</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Verified Listings
                </h3>
                <p className="text-gray-600">
                  Every property is thoroughly verified to ensure accuracy and
                  build trust.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💬</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  24/7 Support
                </h3>
                <p className="text-gray-600">
                  Our dedicated team is always here to help you throughout your
                  property journey.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
