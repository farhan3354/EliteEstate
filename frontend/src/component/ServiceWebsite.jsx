import React from "react";
import {
  FiWifi,
  FiZap,
  FiThermometer,
  FiHome,
  FiMail,
  FiPhone,
  FiSend,
  FiCheckCircle,
  FiUsers,
  FiShield,
  FiClock,
  FiMapPin,
} from "react-icons/fi";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

const SecureNetWebsite = () => {
  const services = [
    {
      icon: <FiWifi />,
      title: "Computer Networks",
      description: "Infrastructure, installation and maintenance",
      details:
        "Structured cabling, Wi-Fi solutions, network security, and server setup",
    },
    {
      icon: <FiZap />,
      title: "Electrical Systems",
      description: "Fitting, fixture and maintenance",
      details:
        "Electrical wiring, lighting solutions, power distribution, and safety systems",
    },
    {
      icon: <FiThermometer />,
      title: "HVAC Systems",
      description: "Installation and maintenance",
      details:
        "Air conditioning, ventilation, heating systems, and energy efficiency solutions",
    },
    {
      icon: <FiHome />,
      title: "Complete Solutions",
      description: "Everything to build your home",
      details:
        "Turnkey solutions for residential and commercial construction projects",
    },
  ];

  const features = [
    { icon: <FiCheckCircle />, text: "24/7 Emergency Support" },
    { icon: <FiUsers />, text: "Certified Professionals" },
    { icon: <FiShield />, text: "Quality Guaranteed" },
    { icon: <FiClock />, text: "Timely Service" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    // Handle form submission here
    alert("Thank you! We will contact you soon.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Animated Background Elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-20 right-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      {/* Header with Contact */}
      <header className="container mx-auto px-4 py-6 relative z-20">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="absolute inset-0 bg-amber-400/20 blur-2xl rounded-full"></div>
              <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center relative">
                <span className="text-white font-bold text-lg">SN</span>
              </div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
              SECURENET
            </span>
          </div>

          <a
            href="tel:+971509014421"
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/50 rounded-lg text-amber-500 hover:bg-amber-500/20 transition-all duration-300 text-sm font-semibold"
          >
            <FiPhone className="w-4 h-4" />
            +971 50 901 4421
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-amber-200 to-orange-200 bg-clip-text text-transparent">
            One Roof for All Your Needs
          </h1>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Complete infrastructure solutions for your home and business
          </p>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            From computer networks to electrical systems, HVAC installations,
            and everything you need to build your home
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-amber-500/50 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer"
            >
              <div className="text-3xl text-amber-500 mb-4 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">
                {service.title}
              </h3>
              <p className="text-slate-400 text-sm mb-3">
                {service.description}
              </p>
              <p className="text-slate-500 text-xs">{service.details}</p>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="text-amber-500 text-xl">{feature.icon}</div>
              <span className="text-slate-300">{feature.text}</span>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {/* Contact Form */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
            <h3 className="text-white text-2xl font-semibold mb-6">
              Get in Touch
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
                  required
                />
              </div>
              <div>
                <textarea
                  placeholder="Your Message"
                  rows="4"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors resize-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/50 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <FiSend />
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
            <h3 className="text-white text-2xl font-semibold mb-6">
              Contact Information
            </h3>

            <div className="space-y-6">
              <a
                href="tel:+971509014421"
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/50 transform hover:scale-105"
              >
                <div className="p-2 bg-white/20 rounded-lg">
                  <FiPhone className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <p className="text-sm opacity-80">Call us anytime</p>
                  <p className="text-lg">+971 50 901 4421</p>
                </div>
              </a>

              <a
                href="mailto:info@securenet-services.com"
                className="flex items-center gap-4 p-4 bg-slate-700/50 hover:bg-slate-600/50 text-white rounded-lg transition-all duration-300"
              >
                <div className="p-2 bg-amber-500/20 rounded-lg">
                  <FiMail className="w-6 h-6 text-amber-500" />
                </div>
                <div className="text-left">
                  <p className="text-sm opacity-80">Email us at</p>
                  <p className="text-lg text-amber-500">
                    info@securenet-services.com
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 bg-slate-700/50 rounded-lg">
                <div className="p-2 bg-amber-500/20 rounded-lg">
                  <FiMapPin className="w-6 h-6 text-amber-500" />
                </div>
                <div className="text-left">
                  <p className="text-sm opacity-80">Located in</p>
                  <p className="text-lg text-slate-300">Dubai, UAE</p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-8 pt-8 border-t border-slate-700">
              <h4 className="text-white mb-4">Follow Us</h4>
              <div className="flex gap-3">
                {[
                  FaFacebookF,
                  FaTwitter,
                  FaLinkedinIn,
                  FaInstagram,
                  FaWhatsapp,
                ].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-10 h-10 rounded-lg bg-slate-700/50 hover:bg-amber-500/20 border border-slate-600 hover:border-amber-500/50 flex items-center justify-center text-slate-300 hover:text-amber-500 transition-all duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Ahmed R.",
                company: "Tech Solutions LLC",
                comment:
                  "Professional network installation with excellent after-sales support.",
              },
              {
                name: "Sarah M.",
                company: "Modern Homes",
                comment:
                  "Complete home infrastructure solution - they handled everything perfectly.",
              },
              {
                name: "John D.",
                company: "Office Complex",
                comment:
                  "Reliable electrical and HVAC services for our 5-story building.",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h4 className="text-white font-semibold">
                      {testimonial.name}
                    </h4>
                    <p className="text-amber-500 text-sm">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
                <p className="text-slate-300 italic">"{testimonial.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">SN</span>
                </div>
                <span className="text-xl font-bold text-white">SECURENET</span>
              </div>
              <p className="text-slate-500 text-sm mt-2">
                Complete Infrastructure Solutions
              </p>
            </div>

            <div className="text-center md:text-right">
              <p className="text-slate-500 mb-2">
                © {new Date().getFullYear()} SECURENET. All rights reserved.
              </p>
              <a
                href="tel:+971509014421"
                className="text-amber-500 hover:text-amber-400 transition-colors inline-flex items-center gap-1"
              >
                <FiPhone className="w-3 h-3" />
                <span>+971 50 901 4421</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SecureNetWebsite;
