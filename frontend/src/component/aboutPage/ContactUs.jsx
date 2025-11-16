import React, { useState } from "react";
import { Link } from "react-router-dom";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    propertyType: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const contactMethods = [
    {
      icon: "📞",
      title: "Call Us",
      details: "+971 4 123 4567",
      description: "Mon to Fri 9am to 6pm",
      action: "tel:+97141234567",
    },
    {
      icon: "✉️",
      title: "Email Us",
      details: "hello@propertyfinder.ae",
      description: "Send us your query anytime",
      action: "mailto:hello@propertyfinder.ae",
    },
    {
      icon: "📍",
      title: "Visit Us",
      details: "Dubai Marina, Dubai, UAE",
      description: "Office hours: 9AM - 6PM",
      action: "https://maps.google.com",
    },
    {
      icon: "💬",
      title: "WhatsApp",
      details: "+971 50 123 4567",
      description: "Quick responses",
      action: "https://wa.me/971501234567",
    },
  ];

  const officeLocations = [
    {
      city: "Dubai",
      address: "Dubai Marina, Princess Tower",
      phone: "+971 4 123 4567",
      email: "dubai@propertyfinder.ae",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400",
    },
    {
      city: "Abu Dhabi",
      address: "Corniche Road, Al Bateen",
      phone: "+971 2 123 4567",
      email: "abudhabi@propertyfinder.ae",
      image:
        "https://images.unsplash.com/photo-1527030280862-64139fba04ce?w=400",
    },
    {
      city: "Sharjah",
      address: "Al Khan Street, Al Majaz",
      phone: "+971 6 123 4567",
      email: "sharjah@propertyfinder.ae",
      image:
        "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400",
    },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setSubmitStatus("success");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      propertyType: "",
    });

    setTimeout(() => setSubmitStatus(null), 5000);
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How quickly will I get a response?",
      answer:
        "We typically respond within 1-2 hours during business hours. For urgent matters, please call us directly.",
    },
    {
      question: "Do you charge fees for property consultations?",
      answer:
        "No, our initial consultations are completely free. We only charge commission upon successful property transactions.",
    },
    {
      question: "Can I schedule a property viewing?",
      answer:
        "Yes, you can schedule viewings through our website, by phone, or by visiting any of our offices.",
    },
    {
      question: "Do you handle property valuations?",
      answer:
        "Absolutely! We provide free, no-obligation property valuations for sellers and landlords.",
    },
    {
      question: "What areas do you cover?",
      answer:
        "We cover all major areas in the UAE including Dubai, Abu Dhabi, Sharjah, and surrounding emirates.",
    },
    {
      question: "Do you work with international clients?",
      answer:
        "Yes, we have extensive experience working with international clients and can assist with all aspects of property acquisition.",
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
        <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Get In Touch
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Ready to find your dream property? Our team is here to help you
              every step of the way.
            </p>
          </div>
        </section>
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactMethods.map((method, index) => (
                <a
                  key={index}
                  href={method.action}
                  className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 border border-blue-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center group"
                >
                  <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {method.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {method.title}
                  </h3>
                  <p className="text-blue-600 font-semibold mb-1">
                    {method.details}
                  </p>
                  <p className="text-gray-600 text-sm">{method.description}</p>
                </a>
              ))}
            </div>
          </div>
        </section>
        <section className="py-20 bg-gradient-to-b from-white to-blue-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Send us a Message
                </h2>
                <p className="text-gray-600 mb-8">
                  Fill out the form below and our team will get back to you
                  within 24 hours.
                </p>

                {submitStatus === "success" && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center">
                      <div className="text-green-500 text-xl mr-3">✅</div>
                      <div>
                        <h4 className="font-semibold text-green-800">
                          Message Sent Successfully!
                        </h4>
                        <p className="text-green-600 text-sm">
                          We'll get back to you soon.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        placeholder="+971 XX XXX XXXX"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Property Type
                      </label>
                      <select
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                      >
                        <option value="">Select property type</option>
                        <option value="apartment">Apartment</option>
                        <option value="villa">Villa</option>
                        <option value="townhouse">Townhouse</option>
                        <option value="commercial">Commercial</option>
                        <option value="land">Land</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                      placeholder="What is this regarding?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none"
                      placeholder="Tell us about your requirements..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </form>
              </div>
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
                  <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="text-xl">🏆</div>
                      <div>
                        <h4 className="font-semibold text-blue-100">
                          Award-Winning Service
                        </h4>
                        <p className="text-blue-200 text-sm">
                          Recognized as the best real estate platform 2023
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="text-xl">⚡</div>
                      <div>
                        <h4 className="font-semibold text-blue-100">
                          Fast Response
                        </h4>
                        <p className="text-blue-200 text-sm">
                          Average response time under 2 hours
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="text-xl">🔒</div>
                      <div>
                        <h4 className="font-semibold text-blue-100">
                          Secure & Trusted
                        </h4>
                        <p className="text-blue-200 text-sm">
                          Your data is protected with enterprise-grade security
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="text-xl">💼</div>
                      <div>
                        <h4 className="font-semibold text-blue-100">
                          Expert Team
                        </h4>
                        <p className="text-blue-200 text-sm">
                          50+ certified real estate professionals
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">
                    Office Hours
                  </h3>
                  <div className="space-y-4">
                    {[
                      { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
                      { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
                      { day: "Sunday", hours: "Closed" },
                    ].map((schedule, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center py-2 border-b border-gray-100"
                      >
                        <span className="text-gray-700 font-medium">
                          {schedule.day}
                        </span>
                        <span className="text-blue-600 font-semibold">
                          {schedule.hours}
                        </span>
                      </div>
                    ))}
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
                Our Offices
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Visit us at any of our conveniently located offices across the
                UAE
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {officeLocations.map((office, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-white to-blue-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-100"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={office.image}
                      alt={office.city}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      {office.city} Office
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <span className="text-blue-600">📍</span>
                        <span className="text-gray-600">{office.address}</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <span className="text-blue-600">📞</span>
                        <a
                          href={`tel:${office.phone}`}
                          className="text-gray-600 hover:text-blue-600 transition-colors"
                        >
                          {office.phone}
                        </a>
                      </div>
                      <div className="flex items-start space-x-3">
                        <span className="text-blue-600">✉️</span>
                        <a
                          href={`mailto:${office.email}`}
                          className="text-gray-600 hover:text-blue-600 transition-colors"
                        >
                          {office.email}
                        </a>
                      </div>
                    </div>
                    <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                      Get Directions
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-20 bg-gradient-to-b from-white to-blue-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">
                Quick answers to common questions
              </p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-6 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-2xl"
                  >
                    <h3 className="text-lg font-bold text-gray-800 pr-4">
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                      <svg
                        className={`w-4 h-4 text-blue-600 transition-transform duration-300 ${
                          openFaqIndex === index ? "transform rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </button>
                  <div
                    className={`px-6 pb-6 transition-all duration-300 ${
                      openFaqIndex === index ? "block" : "hidden"
                    }`}
                  >
                    <p className="text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                      {faq.answer}
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
              Ready to Start Your Property Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Let's find your perfect property together. Contact us today for a
              personalized consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/properties"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
              >
                Browse Properties
              </Link>
              <a
                href="tel:+97141234567"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                Call Now
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;
