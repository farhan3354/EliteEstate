import React, { useRef } from "react";
import {
  FiWifi,
  FiZap,
  FiThermometer,
  FiHome,
  FiKey,
  FiPhone,
  FiMail,
  FiMapPin,
  FiGlobe,
  FiClock,
  FiUsers,
  FiShield,
  FiCheckCircle,
  FiAward,
  FiBriefcase,
  FiTarget,
  FiEye,
  FiStar,
  FiPrinter,
  FiCamera,
  FiCalendar,
} from "react-icons/fi";
import projectImage1 from "../../assets/as.jpeg";
import projectImage2 from "../../assets/ax.jpeg";
import projectImage3 from "../../assets/az.jpeg";
import projectImage4 from "../../assets/al.jpeg";

const CompanyProfilePDF = () => {
  const pdfRef = useRef();

  const companyInfo = {
    name: "SECURENET",
    tagline: "One Roof for All Your Needs",
    slogan: "Complete infrastructure solutions for your home and business",
    location: "Dubai, United Arab Emirates",
    phone: "+971 50 901 4421",
    email: "info@securenet-services.com",
    website: "www.securenet-services.com",
    yearEstablished: "2015",
    employees: "50+",
    projects: "500+",
  };

  const featuredProjects = [
    {
      name: "Sheikh Saqr Al Nayahan Villa - Dubai",
      type: "Luxury Residential Villa",
      location: "Dubai, UAE",
      scope: "Complete Infrastructure Solutions",
      description:
        "A prestigious luxury villa project featuring state-of-the-art infrastructure systems including smart home automation, advanced security, and comprehensive electrical & HVAC solutions. Delivered with excellence and attention to detail.",
      services: [
        "Complete Electrical Systems",
        "HVAC Installation",
        "Smart Home Automation",
        "Security & CCTV Systems",
        "Network Infrastructure",
        "Home Theater Setup",
        "Access Control Systems",
        "Lighting Solutions",
      ],
      timeline: "Completed 2025",
      area: "5820 sq.m",
      images: [projectImage2, projectImage1, projectImage3, projectImage4],
    },
  ];

  const services = [
    {
      icon: <FiWifi />,
      title: "Computer Networks",
      description: "Complete network infrastructure solutions",
      details: [
        "Structured Cabling Systems",
        "Wi-Fi Network Installation",
        "Network Security Solutions",
        "Server Room Setup",
        "Data Center Infrastructure",
        "Network Maintenance & Support",
      ],
    },
    {
      icon: <FiZap />,
      title: "Electrical Systems",
      description: "Professional electrical installations",
      details: [
        "Electrical Wiring & Fitting",
        "Lighting System Design",
        "Power Distribution Systems",
        "Electrical Panel Installation",
        "Safety & Protection Systems",
        "Maintenance & Upgrades",
      ],
    },
    {
      icon: <FiThermometer />,
      title: "HVAC Systems",
      description: "Heating, ventilation and air conditioning",
      details: [
        "AC Installation & Maintenance",
        "Ventilation System Design",
        "Ductwork Installation",
        "Energy Efficiency Solutions",
        "HVAC Control Systems",
        "Regular Maintenance Contracts",
      ],
    },
    {
      icon: <FiKey />,
      title: "Access Control & Attendance",
      description: "Security and time management systems",
      details: [
        "Biometric Access Systems",
        "RFID Card Access Control",
        "Time & Attendance Systems",
        "Visitor Management Systems",
        "Security Integration",
        "24/7 Monitoring Support",
      ],
    },
    {
      icon: <FiHome />,
      title: "Complete Solutions",
      description: "End-to-end infrastructure projects",
      details: [
        "Turnkey Home Solutions",
        "Commercial Office Setup",
        "Building Automation",
        "Smart Home Systems",
        "Project Management",
        "Warranty & Support",
      ],
    },
  ];

  const values = [
    {
      title: "Quality Excellence",
      description:
        "Delivering superior quality in every project with attention to detail and precision.",
    },
    {
      title: "Customer Focus",
      description:
        "Putting client satisfaction at the center of everything we do.",
    },
    {
      title: "Innovation",
      description:
        "Embracing latest technologies and methods for cutting-edge solutions.",
    },
    {
      title: "Reliability",
      description:
        "Consistent and dependable service delivery you can count on.",
    },
  ];

  const clients = [
    {
      name: "Holford Facility Management LLC",
      sector: "Facility Management",
      logo: "https://img.icons8.com/color/96/000000/building.png",
    },
    {
      name: "Fixem Solutions",
      sector: "Technical Solutions",
      logo: "https://img.icons8.com/color/96/000000/maintenance.png",
    },
    {
      name: "Sunlife Prime Buildings Contracting LLC",
      sector: "Construction",
      logo: "https://img.icons8.com/color/96/000000/construction-worker.png",
    },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 print:hidden">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-amber-900">
              SECURENET Company Profile
            </h1>
            <p className="text-amber-700 text-sm mt-1">
              Professional Company Overview
            </p>
          </div>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-800 text-white rounded-lg transition-colors"
          >
            <FiPrinter />
            Print / Save as PDF
          </button>
        </div>
      </div>
      <div ref={pdfRef} className="container mx-auto px-4 py-8">
        <div className="flex flex-col justify-center items-center py-16 page-break-after">
          <div className="text-center mb-12">
            <div className="w-48 h-48 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-8">
              <span className="text-white text-5xl font-bold">SN</span>
            </div>
            <h1 className="text-5xl font-bold text-amber-900 mb-4">
              SECURENET
            </h1>
            <p className="text-2xl text-orange-600 font-semibold mb-6">
              One Roof for All Your Needs
            </p>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Complete infrastructure solutions for your home and business
            </p>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-8 max-w-2xl">
            <div className="text-center">
              <FiMapPin className="w-8 h-8 text-amber-500 mx-auto mb-2" />
              <p className="font-semibold">Dubai, UAE</p>
              <p className="text-sm text-gray-600">Headquarters</p>
            </div>
            <div className="text-center">
              <FiPhone className="w-8 h-8 text-amber-500 mx-auto mb-2" />
              <p className="font-semibold">+971 50 901 4421</p>
              <p className="text-sm text-gray-600">24/7 Support</p>
            </div>
          </div>

          <div className="mt-12 text-center text-gray-500">
            <p>Company Profile • {new Date().getFullYear()}</p>
            <p className="text-xs mt-2 text-gray-400">Confidential Document</p>
          </div>
        </div>
        {/* Company Overview */}
        <div className="py-8">
          <h2 className="text-3xl font-bold text-amber-900 mb-8 border-b-2 border-amber-200 pb-4">
            Company Overview
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                About SECURENET
              </h3>
              <p className="text-gray-600 mb-4">
                SECURENET is a leading infrastructure solutions provider based
                in Dubai, UAE. Established in 2025, we have built a reputation
                for excellence in delivering comprehensive infrastructure
                solutions for both residential and commercial sectors.
              </p>
              <p className="text-gray-600 mb-4">
                Our mission is to provide end-to-end infrastructure solutions by
                combining engineering expertise, innovation, and responsible
                execution, ensuring the highest standards of quality, safety,
                and client satisfaction.
              </p>
              <p className="text-gray-600">
                With flexible as needed by project skilled professionals and
                till now 3+ successful projects completed, we have established
                ourselves as a trusted partner for infrastructure development in
                the UAE.
              </p>
            </div>

            <div className="bg-amber-50 p-6 rounded-xl">
              <h4 className="text-xl font-semibold text-amber-900 mb-4">
                Quick Facts
              </h4>
              <div className="space-y-4">
                {[
                  {
                    icon: <FiBriefcase />,
                    label: "Established",
                    value: "2025",
                  },
                  {
                    icon: <FiUsers />,
                    label: "Team Size",
                    value: "Flexible as needed by project",
                  },
                  {
                    icon: <FiTarget />,
                    label: "Projects",
                    value: "Till now 3+",
                  },
                  {
                    icon: <FiEye />,
                    label: "Vision",
                    value: "2025",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                      <div className="text-amber-600">{item.icon}</div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{item.label}</p>
                      <p className="font-semibold">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-gradient-to-br from-amber-500 to-orange-500 text-white p-6 rounded-xl">
              <h4 className="text-xl font-semibold mb-4">Our Vision</h4>
              <p>
                To be a reliable provider of integrated infrastructure
                solutions, delivering consistent quality, thoughtful innovation,
                and dependable outcomes across all our projects.
              </p>
            </div>
            <div className="bg-gradient-to-br from-slate-700 to-slate-900 text-white p-6 rounded-xl">
              <h4 className="text-xl font-semibold mb-4">Our Mission</h4>
              <p>
                To provide end-to-end infrastructure solutions by combining
                engineering expertise, innovation, and responsible execution,
                ensuring the highest standards of quality, safety, and client
                satisfaction.
              </p>
            </div>
          </div>
        </div>

        <div className="py-8">
          <h2 className="text-3xl font-bold text-amber-900 mb-8 border-b-2 border-amber-200 pb-4">
            Featured Projects
          </h2>

          <div className="mb-12 p-6 border border-amber-200 rounded-2xl bg-amber-50/50">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 bg-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <FiHome className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-amber-900">
                  {featuredProjects[0].name}
                </h3>
                <div className="flex flex-wrap gap-4 mt-2">
                  <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                    {featuredProjects[0].type}
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {featuredProjects[0].location}
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    {featuredProjects[0].timeline}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-700 mb-6">
                  {featuredProjects[0].description}
                </p>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <FiTarget className="w-4 h-4 text-amber-500" />
                    Project Scope
                  </h4>
                  <p className="text-gray-600">{featuredProjects[0].scope}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <FiCheckCircle className="w-4 h-4 text-amber-500" />
                    Services Provided
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {featuredProjects[0].services.map((service, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                        <span className="text-gray-700 text-sm">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
                  <img
                    src={featuredProjects[0].images[0]}
                    alt="Sheikh Saqr Al Nayahan Villa - Main View"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {featuredProjects[0].images.slice(1).map((image, index) => (
                    <div
                      key={index}
                      className="aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200"
                    >
                      <img
                        src={image}
                        alt={`Sheikh Saqr Al Nayahan Villa - View ${index + 2}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-amber-200">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <FiCalendar className="w-4 h-4 text-amber-500" />
                      <span className="text-gray-600">Timeline:</span>
                      <span className="font-medium">
                        {featuredProjects[0].timeline}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiHome className="w-4 h-4 text-amber-500" />
                      <span className="text-gray-600">Area:</span>
                      <span className="font-medium">
                        {featuredProjects[0].area}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="py-8">
          <h2 className="text-3xl font-bold text-amber-900 mb-8 border-b-2 border-amber-200 pb-4">
            Our Services
          </h2>

          {services.map((service, index) => (
            <div key={index} className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <div className="text-amber-600 text-xl">{service.icon}</div>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>

              <div className="ml-16">
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {service.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <FiCheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {index < services.length - 1 && (
                <hr className="my-8 border-gray-200" />
              )}
            </div>
          ))}
        </div>
        <div className="py-8">
          <h2 className="text-3xl font-bold text-amber-900 mb-8 border-b-2 border-amber-200 pb-4">
            Why Choose SECURENET?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-6"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center">
                    <FiStar className="w-6 h-6 text-amber-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {value.title}
                  </h3>
                </div>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              Key Differentiators
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                "Single Point of Contact",
                "End-to-End Solutions",
                "UAE Market Experience",
                "Quality Assurance",
                "Timely Delivery",
                "Competitive Pricing",
                "After-Sales Support",
                "Customized Solutions",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg"
                >
                  <FiCheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="pt-6 pb-4">
          <h2 className="text-2xl font-bold text-amber-900 mb-6 pb-3 border-b-2 border-amber-200">
            Our Esteemed Clients
          </h2>

          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Our Key Clients
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {clients.map((client, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg p-3 text-center"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-2">
                    {client.logo ? (
                      <img
                        src={client.logo}
                        alt={client.name}
                        className="w-full h-full object-contain rounded-full"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.style.display = "none";
                          e.target.parentElement.textContent =
                            client.name.charAt(0);
                        }}
                      />
                    ) : (
                      client.name.charAt(0)
                    )}
                  </div>
                  <h4 className="font-semibold text-gray-800 text-sm">
                    {client.name}
                  </h4>
                  <p className="text-xs text-gray-600">{client.sector}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center pt-10 pb-8">
          <div className="text-center max-w-2xl">
            <h2 className="text-3xl font-bold text-amber-900 mb-4">
              Thank You
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              We appreciate your interest in SECURENET. We look forward to the
              opportunity to work with you and deliver exceptional
              infrastructure solutions for your next project.
            </p>

            <div className="my-8">
              <div className="w-24 h-24 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-3xl font-bold">SN</span>
              </div>
              <p className="text-xl font-bold text-amber-900">SECURENET</p>
              <p className="text-gray-600 text-lg">
                One Roof for All Your Needs
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-gray-500 text-xs">
                This document is confidential and intended solely for the use of
                the individual or entity to whom it is addressed.
              </p>
              <p className="text-gray-400 text-xs mt-3">
                © {new Date().getFullYear()} SECURENET. All rights reserved.
              </p>
              <p className="text-gray-400 text-xs mt-1">
                Dubai, United Arab Emirates • +971 50 901 4421 •
                info@securenet-services.com
              </p>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @media print {
          /* Clients section for print */
          .pt-6 {
            padding-top: 0.75rem !important;
          }

          .pb-4 {
            padding-bottom: 0.5rem !important;
          }

          .mb-6 {
            margin-bottom: 0.75rem !important;
          }

          .mb-4 {
            margin-bottom: 0.5rem !important;
          }

          /* Thank You section for print */
          .pt-10 {
            padding-top: 1.5rem !important;
          }

          .pb-8 {
            padding-bottom: 1rem !important;
          }

          .my-8 {
            margin-top: 1rem !important;
            margin-bottom: 1rem !important;
          }

          .mt-8 {
            margin-top: 1rem !important;
          }

          .pt-6 {
            padding-top: 0.75rem !important;
          }

          /* Font sizes for print */
          .text-3xl {
            font-size: 1.75rem !important;
          }

          .text-xl {
            font-size: 1.25rem !important;
          }

          .text-lg {
            font-size: 1rem !important;
          }

          /* Logo size for print */
          .w-24 {
            width: 4rem !important;
          }

          .h-24 {
            height: 4rem !important;
          }

          /* Force content to stay together */
          .pt-6 + .pt-10 {
            page-break-before: avoid !important;
          }

          /* Prevent page break between these sections */
          .pt-6,
          .pt-10 {
            page-break-inside: avoid !important;
          }
        }

        @page {
          margin: 15mm !important; /* Reduced from 20mm */
          size: A4;
        }
      `}</style>
      <style jsx>{`
        @media print {
          /* Hide print button */
          .print\\:hidden {
            display: none !important;
          }

          /* Reset body and container */
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            margin: 0;
            padding: 0;
            background: white;
            font-family: "Segoe UI", "Roboto", sans-serif;
          }

          .container {
            max-width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }

          /* Ensure gradients print properly */
          .bg-gradient-to-br,
          .bg-gradient-to-r {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          /* Images for print */
          img {
            max-width: 100% !important;
            page-break-inside: avoid;
            break-inside: avoid;
          }

          /* Page break control - only where necessary */
          .min-h-screen:first-of-type {
            page-break-after: always;
          }

          /* Last thank you page */
          .min-h-screen:last-of-type {
            min-height: 100vh !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: center !important;
          }

          /* Section spacing for print */
          .py-8 {
            padding-top: 2rem !important;
            padding-bottom: 2rem !important;
          }

          /* Better control over spacing */
          .mb-12 {
            margin-bottom: 3rem !important;
          }

          .mb-8 {
            margin-bottom: 2rem !important;
          }

          .mt-8 {
            margin-top: 2rem !important;
          }

          /* Font size adjustments for print */
          .text-5xl {
            font-size: 3rem !important;
          }

          .text-4xl {
            font-size: 2.5rem !important;
          }

          .text-3xl {
            font-size: 2rem !important;
          }

          .text-2xl {
            font-size: 1.75rem !important;
          }

          .text-xl {
            font-size: 1.25rem !important;
          }

          /* Remove hover effects */
          .hover\\:border-amber-300,
          .hover\\:shadow-lg {
            border-color: inherit !important;
            box-shadow: none !important;
          }

          /* Optimize project images for print */
          .aspect-video {
            height: 150px !important;
          }

          .aspect-square {
            height: 70px !important;
          }

          /* Force specific sections to stay together */
          .grid > * {
            page-break-inside: avoid;
          }

          /* Client cards optimization */
          .grid-cols-2 {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1rem !important;
          }

          /* Thank you page adjustments */
          .pt-16 {
            padding-top: 4rem !important;
          }
        }

        @page {
          margin: 15mm;
          size: A4;
        }

        /* Prevent orphaned headings */
        h1,
        h2,
        h3,
        h4 {
          page-break-after: avoid;
        }

        /* Prevent breaking inside paragraphs */
        p {
          page-break-inside: avoid;
          orphans: 3;
          widows: 3;
        }

        /* Screen-only styles */
        @media screen {
          .container {
            max-width: 1200px;
          }

          img {
            transition: transform 0.3s ease;
          }

          img:hover {
            transform: scale(1.02);
          }
        }
      `}</style>
      <style jsx>{`
        @media print {
          /* Hide print button */
          .print\\:hidden {
            display: none !important;
          }

          /* Reset body and container */
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            margin: 0;
            padding: 0;
            background: white;
            font-family: "Segoe UI", "Roboto", sans-serif;
          }

          .container {
            max-width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }

          /* Ensure gradients print properly */
          .bg-gradient-to-br,
          .bg-gradient-to-r {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          /* Images for print */
          img {
            max-width: 100% !important;
            page-break-inside: avoid;
            break-inside: avoid;
          }

          /* Page break control - only for cover page */
          .page-break-after {
            page-break-after: always !important;
          }

          /* Last thank you page */
          .min-h-screen:last-of-type {
            min-height: 100vh !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: center !important;
          }

          /* Section spacing for print */
          .py-8 {
            padding-top: 2rem !important;
            padding-bottom: 2rem !important;
          }

          .py-16 {
            padding-top: 4rem !important;
            padding-bottom: 4rem !important;
            height: calc(100vh - 40mm) !important; /* Adjust height for A4 */
            display: flex !important;
            flex-direction: column !important;
            justify-content: center !important;
          }

          /* Better control over spacing */
          .mb-12 {
            margin-bottom: 3rem !important;
          }

          .mb-8 {
            margin-bottom: 2rem !important;
          }

          .mt-8 {
            margin-top: 2rem !important;
          }

          /* Font size adjustments for print */
          .text-5xl {
            font-size: 3rem !important;
          }

          .text-4xl {
            font-size: 2.5rem !important;
          }

          .text-3xl {
            font-size: 2rem !important;
          }

          .text-2xl {
            font-size: 1.75rem !important;
          }

          .text-xl {
            font-size: 1.25rem !important;
          }

          /* Remove hover effects */
          .hover\\:border-amber-300,
          .hover\\:shadow-lg {
            border-color: inherit !important;
            box-shadow: none !important;
          }

          /* Optimize project images for print */
          .aspect-video {
            height: 150px !important;
          }

          .aspect-square {
            height: 70px !important;
          }

          /* Force specific sections to stay together */
          .grid > * {
            page-break-inside: avoid;
          }

          /* Client cards optimization */
          .grid-cols-2 {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1rem !important;
          }

          /* Thank you page adjustments */
          .pt-16 {
            padding-top: 4rem !important;
          }

          /* Prevent orphaned headings */
          h1,
          h2,
          h3,
          h4 {
            page-break-after: avoid;
          }

          /* Prevent breaking inside paragraphs */
          p {
            page-break-inside: avoid;
            orphans: 3;
            widows: 3;
          }
        }

        @page {
          margin: 20mm;
          size: A4;
        }

        /* Screen-only styles */
        @media screen {
          .container {
            max-width: 1200px;
          }

          img {
            transition: transform 0.3s ease;
          }

          img:hover {
            transform: scale(1.02);
          }

          /* Cover page styling for screen */
          .page-break-after {
            min-height: 100vh;
          }
        }
      `}</style>
    </div>
  );
};

export default CompanyProfilePDF;

// import React, { useRef } from "react";
// import {
//   FiWifi,
//   FiZap,
//   FiThermometer,
//   FiHome,
//   FiKey,
//   FiPhone,
//   FiMail,
//   FiMapPin,
//   FiGlobe,
//   FiClock,
//   FiUsers,
//   FiShield,
//   FiCheckCircle,
//   FiAward,
//   FiBriefcase,
//   FiTarget,
//   FiEye,
//   FiStar,
//   FiPrinter,
//   FiCamera,
//   FiCalendar,
// } from "react-icons/fi";
// import projectImage1 from "../../assets/as.jpeg";
// import projectImage2 from "../../assets/ax.jpeg";
// import projectImage3 from "../../assets/az.jpeg";
// import projectImage4 from "../../assets/al.jpeg";

// const CompanyProfilePDF = () => {
//   const pdfRef = useRef();

//   const companyInfo = {
//     name: "SECURENET",
//     tagline: "One Roof for All Your Needs",
//     slogan: "Complete infrastructure solutions for your home and business",
//     location: "Dubai, United Arab Emirates",
//     phone: "+971 50 901 4421",
//     email: "info@securenet-services.com",
//     website: "www.securenet-services.com",
//     yearEstablished: "2015",
//     employees: "50+",
//     projects: "500+",
//   };

//   const featuredProjects = [
//     {
//       name: "Sheikh Saqr Al Nayahan Villa - Dubai",
//       type: "Luxury Residential Villa",
//       location: "Dubai, UAE",
//       scope: "Complete Infrastructure Solutions",
//       description:
//         "A prestigious luxury villa project featuring state-of-the-art infrastructure systems including smart home automation, advanced security, and comprehensive electrical & HVAC solutions. Delivered with excellence and attention to detail.",
//       services: [
//         "Complete Electrical Systems",
//         "HVAC Installation",
//         "Smart Home Automation",
//         "Security & CCTV Systems",
//         "Network Infrastructure",
//         "Home Theater Setup",
//         "Access Control Systems",
//         "Lighting Solutions",
//       ],
//       timeline: "Completed 2025",
//       area: "5820 sq.m",
//       images: [projectImage2, projectImage1, projectImage3, projectImage4],
//     },
//   ];

//   const services = [
//     {
//       icon: <FiWifi />,
//       title: "Computer Networks",
//       description: "Complete network infrastructure solutions",
//       details: [
//         "Structured Cabling Systems",
//         "Wi-Fi Network Installation",
//         "Network Security Solutions",
//         "Server Room Setup",
//         "Data Center Infrastructure",
//         "Network Maintenance & Support",
//       ],
//     },
//     {
//       icon: <FiZap />,
//       title: "Electrical Systems",
//       description: "Professional electrical installations",
//       details: [
//         "Electrical Wiring & Fitting",
//         "Lighting System Design",
//         "Power Distribution Systems",
//         "Electrical Panel Installation",
//         "Safety & Protection Systems",
//         "Maintenance & Upgrades",
//       ],
//     },
//     {
//       icon: <FiThermometer />,
//       title: "HVAC Systems",
//       description: "Heating, ventilation and air conditioning",
//       details: [
//         "AC Installation & Maintenance",
//         "Ventilation System Design",
//         "Ductwork Installation",
//         "Energy Efficiency Solutions",
//         "HVAC Control Systems",
//         "Regular Maintenance Contracts",
//       ],
//     },
//     {
//       icon: <FiKey />,
//       title: "Access Control & Attendance",
//       description: "Security and time management systems",
//       details: [
//         "Biometric Access Systems",
//         "RFID Card Access Control",
//         "Time & Attendance Systems",
//         "Visitor Management Systems",
//         "Security Integration",
//         "24/7 Monitoring Support",
//       ],
//     },
//     {
//       icon: <FiHome />,
//       title: "Complete Solutions",
//       description: "End-to-end infrastructure projects",
//       details: [
//         "Turnkey Home Solutions",
//         "Commercial Office Setup",
//         "Building Automation",
//         "Smart Home Systems",
//         "Project Management",
//         "Warranty & Support",
//       ],
//     },
//   ];

//   const values = [
//     {
//       title: "Quality Excellence",
//       description:
//         "Delivering superior quality in every project with attention to detail and precision.",
//     },
//     {
//       title: "Customer Focus",
//       description:
//         "Putting client satisfaction at the center of everything we do.",
//     },
//     {
//       title: "Innovation",
//       description:
//         "Embracing latest technologies and methods for cutting-edge solutions.",
//     },
//     {
//       title: "Reliability",
//       description:
//         "Consistent and dependable service delivery you can count on.",
//     },
//   ];

//   const clients = [
//     {
//       name: "Holford Facility Management LLC",
//       sector: "Facility Management",
//       logo: "https://img.icons8.com/color/96/000000/building.png",
//     },
//     {
//       name: "Fixem Solutions",
//       sector: "Technical Solutions",
//       logo: "https://img.icons8.com/color/96/000000/maintenance.png",
//     },
//     {
//       name: "Sunlife Prime Buildings Contracting LLC",
//       sector: "Construction",
//       logo: "https://img.icons8.com/color/96/000000/construction-worker.png",
//     },
//   ];

//   const handlePrint = () => {
//     window.print();
//   };

//   return (
//     <div className="min-h-screen bg-white text-gray-800">
//       <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 print:hidden">
//         <div className="container mx-auto flex justify-between items-center">
//           <div>
//             <h1 className="text-2xl font-bold text-amber-900">
//               SECURENET Company Profile
//             </h1>
//             <p className="text-amber-700 text-sm mt-1">
//               Professional Company Overview
//             </p>
//           </div>
//           <button
//             onClick={handlePrint}
//             className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-800 text-white rounded-lg transition-colors"
//           >
//             <FiPrinter />
//             Download as PDF
//           </button>
//         </div>
//         <div className="mt-2 text-sm text-amber-700">
//           <p>
//             Click "Download as PDF" and select "Save as PDF" in the print dialog
//             for best results
//           </p>
//         </div>
//       </div>
//       <div ref={pdfRef} className="container mx-auto px-4 py-8">
//         {/* Cover Page */}
//         <div className="flex flex-col justify-center items-center border-b-4 border-amber-500 mb-8 page-break-after">
//           <div className="text-center mb-12">
//             <div className="w-48 h-48 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-8">
//               <span className="text-white text-5xl font-bold">SN</span>
//             </div>
//             <h1 className="text-5xl font-bold text-amber-900 mb-4">
//               SECURENET
//             </h1>
//             <p className="text-2xl text-orange-600 font-semibold mb-6">
//               One Roof for All Your Needs
//             </p>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Complete infrastructure solutions for your home and business
//             </p>
//           </div>

//           <div className="mt-16 grid grid-cols-2 gap-8 max-w-2xl">
//             <div className="text-center">
//               <FiMapPin className="w-8 h-8 text-amber-500 mx-auto mb-2" />
//               <p className="font-semibold">Dubai, UAE</p>
//               <p className="text-sm text-gray-600">Headquarters</p>
//             </div>
//             <div className="text-center">
//               <FiPhone className="w-8 h-8 text-amber-500 mx-auto mb-2" />
//               <p className="font-semibold">+971 50 901 4421</p>
//               <p className="text-sm text-gray-600">24/7 Support</p>
//             </div>
//           </div>

//           <div className="mt-12 text-center text-gray-500">
//             <p>Company Profile • {new Date().getFullYear()}</p>
//             <p className="text-xs mt-2 text-gray-400">Confidential Document</p>
//           </div>
//         </div>

//         {/* Company Overview */}
//         <div className="mb-8 page-break-after">
//           <h2 className="text-3xl font-bold text-amber-900 mb-8 border-b-2 border-amber-200 pb-4">
//             Company Overview
//           </h2>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
//             <div>
//               <h3 className="text-2xl font-semibold text-gray-800 mb-4">
//                 About SECURENET
//               </h3>
//               <p className="text-gray-600 mb-4">
//                 SECURENET is a leading infrastructure solutions provider based
//                 in Dubai, UAE. Established in 2025, we have built a reputation
//                 for excellence in delivering comprehensive infrastructure
//                 solutions for both residential and commercial sectors.
//               </p>
//               <p className="text-gray-600 mb-4">
//                 Our mission is to provide end-to-end infrastructure solutions by
//                 combining engineering expertise, innovation, and responsible
//                 execution, ensuring the highest standards of quality, safety,
//                 and client satisfaction.
//               </p>
//               <p className="text-gray-600">
//                 With flexible as needed by project skilled professionals and
//                 till now 3+ successful projects completed, we have established
//                 ourselves as a trusted partner for infrastructure development in
//                 the UAE.
//               </p>
//             </div>

//             <div className="bg-amber-50 p-6 rounded-xl">
//               <h4 className="text-xl font-semibold text-amber-900 mb-4">
//                 Quick Facts
//               </h4>
//               <div className="space-y-4">
//                 {[
//                   {
//                     icon: <FiBriefcase />,
//                     label: "Established",
//                     value: "2025",
//                   },
//                   {
//                     icon: <FiUsers />,
//                     label: "Team Size",
//                     value: "Flexible as needed by project",
//                   },
//                   {
//                     icon: <FiTarget />,
//                     label: "Projects",
//                     value: "Till now 3+",
//                   },
//                   {
//                     icon: <FiEye />,
//                     label: "Vision",
//                     value: "2025",
//                   },
//                 ].map((item, index) => (
//                   <div key={index} className="flex items-center gap-3">
//                     <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
//                       <div className="text-amber-600">{item.icon}</div>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-600">{item.label}</p>
//                       <p className="font-semibold">{item.value}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
//             <div className="bg-gradient-to-br from-amber-500 to-orange-500 text-white p-6 rounded-xl">
//               <h4 className="text-xl font-semibold mb-4">Our Vision</h4>
//               <p>
//                 To be a reliable provider of integrated infrastructure
//                 solutions, delivering consistent quality, thoughtful innovation,
//                 and dependable outcomes across all our projects.
//               </p>
//             </div>
//             <div className="bg-gradient-to-br from-slate-700 to-slate-900 text-white p-6 rounded-xl">
//               <h4 className="text-xl font-semibold mb-4">Our Mission</h4>
//               <p>
//                 To provide end-to-end infrastructure solutions by combining
//                 engineering expertise, innovation, and responsible execution,
//                 ensuring the highest standards of quality, safety, and client
//                 satisfaction.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Featured Projects */}
//         <div className="mb-8 page-break-after">
//           <h2 className="text-3xl font-bold text-amber-900 mb-8 border-b-2 border-amber-200 pb-4">
//             Featured Projects
//           </h2>

//           <div className="mb-12 p-6 border border-amber-200 rounded-2xl bg-amber-50/50">
//             <div className="flex items-start gap-4 mb-6">
//               <div className="w-14 h-14 bg-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
//                 <FiHome className="w-7 h-7 text-white" />
//               </div>
//               <div>
//                 <h3 className="text-2xl font-bold text-amber-900">
//                   {featuredProjects[0].name}
//                 </h3>
//                 <div className="flex flex-wrap gap-4 mt-2">
//                   <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
//                     {featuredProjects[0].type}
//                   </span>
//                   <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
//                     {featuredProjects[0].location}
//                   </span>
//                   <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
//                     {featuredProjects[0].timeline}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//               <div>
//                 <p className="text-gray-700 mb-6">
//                   {featuredProjects[0].description}
//                 </p>

//                 <div className="mb-6">
//                   <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
//                     <FiTarget className="w-4 h-4 text-amber-500" />
//                     Project Scope
//                   </h4>
//                   <p className="text-gray-600">{featuredProjects[0].scope}</p>
//                 </div>

//                 <div>
//                   <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
//                     <FiCheckCircle className="w-4 h-4 text-amber-500" />
//                     Services Provided
//                   </h4>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//                     {featuredProjects[0].services.map((service, idx) => (
//                       <div key={idx} className="flex items-center gap-2">
//                         <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
//                         <span className="text-gray-700 text-sm">{service}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
//                   <img
//                     src={featuredProjects[0].images[0]}
//                     alt="Sheikh Saqr Al Nayahan Villa - Main View"
//                     className="w-full h-full object-cover"
//                   />
//                 </div>

//                 <div className="grid grid-cols-3 gap-2">
//                   {featuredProjects[0].images.slice(1).map((image, index) => (
//                     <div
//                       key={index}
//                       className="aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200"
//                     >
//                       <img
//                         src={image}
//                         alt={`Sheikh Saqr Al Nayahan Villa - View ${index + 2}`}
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                   ))}
//                 </div>

//                 <div className="pt-4 border-t border-amber-200">
//                   <div className="flex items-center justify-between text-sm">
//                     <div className="flex items-center gap-2">
//                       <FiCalendar className="w-4 h-4 text-amber-500" />
//                       <span className="text-gray-600">Timeline:</span>
//                       <span className="font-medium">
//                         {featuredProjects[0].timeline}
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <FiHome className="w-4 h-4 text-amber-500" />
//                       <span className="text-gray-600">Area:</span>
//                       <span className="font-medium">
//                         {featuredProjects[0].area}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Our Services */}
//         <div className="mb-8 page-break-after">
//           <h2 className="text-3xl font-bold text-amber-900 mb-8 border-b-2 border-amber-200 pb-4">
//             Our Services
//           </h2>

//           {services.map((service, index) => (
//             <div key={index} className="mb-8">
//               <div className="flex items-center gap-4 mb-4">
//                 <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
//                   <div className="text-amber-600 text-xl">{service.icon}</div>
//                 </div>
//                 <div>
//                   <h3 className="text-2xl font-semibold text-gray-800">
//                     {service.title}
//                   </h3>
//                   <p className="text-gray-600">{service.description}</p>
//                 </div>
//               </div>

//               <div className="ml-16">
//                 <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
//                   {service.details.map((detail, idx) => (
//                     <li key={idx} className="flex items-start gap-2">
//                       <FiCheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
//                       <span className="text-gray-700">{detail}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               {index < services.length - 1 && (
//                 <hr className="my-8 border-gray-200" />
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Why Choose SECURENET */}
//         <div className="mb-8 page-break-after">
//           <h2 className="text-3xl font-bold text-amber-900 mb-8 border-b-2 border-amber-200 pb-4">
//             Why Choose SECURENET?
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
//             {values.map((value, index) => (
//               <div
//                 key={index}
//                 className="bg-white border border-gray-200 rounded-xl p-6"
//               >
//                 <div className="flex items-center gap-4 mb-4">
//                   <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center">
//                     <FiStar className="w-6 h-6 text-amber-500" />
//                   </div>
//                   <h3 className="text-xl font-semibold text-gray-800">
//                     {value.title}
//                   </h3>
//                 </div>
//                 <p className="text-gray-600">{value.description}</p>
//               </div>
//             ))}
//           </div>

//           <div className="mb-8">
//             <h3 className="text-2xl font-semibold text-gray-800 mb-6">
//               Key Differentiators
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//               {[
//                 "Single Point of Contact",
//                 "End-to-End Solutions",
//                 "UAE Market Experience",
//                 "Quality Assurance",
//                 "Timely Delivery",
//                 "Competitive Pricing",
//                 "After-Sales Support",
//                 "Customized Solutions",
//               ].map((item, index) => (
//                 <div
//                   key={index}
//                   className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg"
//                 >
//                   <FiCheckCircle className="w-5 h-5 text-green-500" />
//                   <span className="font-medium">{item}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Our Clients */}
//         <div className="mb-8 page-break-after">
//           <h2 className="text-3xl font-bold text-amber-900 mb-8 border-b-2 border-amber-200 pb-4">
//             Our Esteemed Clients
//           </h2>

//           <div className="mb-8">
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
//               {clients.map((client, index) => (
//                 <div
//                   key={index}
//                   className="bg-white border border-gray-200 rounded-lg p-4 text-center"
//                 >
//                   <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-3">
//                     {client.logo ? (
//                       <img
//                         src={client.logo}
//                         alt={client.name}
//                         className="w-full h-full object-contain rounded-full"
//                         onError={(e) => {
//                           e.target.onerror = null;
//                           e.target.style.display = "none";
//                           e.target.parentElement.textContent =
//                             client.name.charAt(0);
//                         }}
//                       />
//                     ) : (
//                       client.name.charAt(0)
//                     )}
//                   </div>
//                   <h4 className="font-semibold text-gray-800">{client.name}</h4>
//                   <p className="text-sm text-gray-600">{client.sector}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Thank You Page */}
//         <div className="flex flex-col justify-center items-center">
//           <div className="text-center max-w-2xl">
//             <h2 className="text-4xl font-bold text-amber-900 mb-6">
//               Thank You
//             </h2>
//             <p className="text-xl text-gray-600 mb-8">
//               We appreciate your interest in SECURENET. We look forward to the
//               opportunity to work with you and deliver exceptional
//               infrastructure solutions for your next project.
//             </p>

//             <div className="my-12">
//               <div className="w-32 h-32 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
//                 <span className="text-white text-4xl font-bold">SN</span>
//               </div>
//               <p className="text-2xl font-bold text-amber-900">SECURENET</p>
//               <p className="text-gray-600">One Roof for All Your Needs</p>
//             </div>

//             <div className="mt-12 pt-8 border-t border-gray-200">
//               <p className="text-gray-500 text-sm">
//                 This document is confidential and intended solely for the use of
//                 the individual or entity to whom it is addressed.
//               </p>
//               <p className="text-gray-400 text-xs mt-4">
//                 © {new Date().getFullYear()} SECURENET. All rights reserved.
//               </p>
//               <p className="text-gray-400 text-xs mt-1">
//                 Dubai, United Arab Emirates • +971 50 901 4421 •
//                 info@securenet-services.com
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//       <style jsx>{`
//         @media print {
//           .print-hidden {
//             display: none !important;
//           }
//           .page-break-after {
//             page-break-after: always !important;
//           }
//           .page-break-before {
//             page-break-before: always !important;
//           }
//           body {
//             -webkit-print-color-adjust: exact;
//             print-color-adjust: exact;
//             margin: 0;
//             padding: 0;
//             background: white;
//             font-family: "Segoe UI", "Roboto", sans-serif;
//           }
//           .container {
//             max-width: 100% !important;
//             padding: 0 20mm !important;
//           }
//           .bg-gradient-to-br,
//           .bg-gradient-to-r {
//             -webkit-print-color-adjust: exact;
//             print-color-adjust: exact;
//           }
//           img {
//             max-width: 100% !important;
//             page-break-inside: avoid;
//             break-inside: avoid;
//           }
//           .aspect-video {
//             height: 180px !important;
//           }
//           .aspect-square {
//             height: 80px !important;
//           }
//           h1,
//           h2,
//           h3,
//           h4 {
//             color: #92400e !important;
//           }
//           p {
//             line-height: 1.6;
//           }
//           .hover\\:border-amber-300,
//           .hover\\:shadow-lg {
//             border-color: inherit !important;
//             box-shadow: none !important;
//           }
//         }

//         @page {
//           margin: 20mm;
//           size: A4;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default CompanyProfilePDF;

// // import React, { useRef } from "react";
// // import {
// //   FiWifi,
// //   FiZap,
// //   FiThermometer,
// //   FiHome,
// //   FiKey,
// //   FiPhone,
// //   FiMail,
// //   FiMapPin,
// //   FiGlobe,
// //   FiClock,
// //   FiUsers,
// //   FiShield,
// //   FiCheckCircle,
// //   FiAward,
// //   FiBriefcase,
// //   FiTarget,
// //   FiEye,
// //   FiStar,
// //   FiPrinter,
// //   FiCamera,
// //   FiCalendar,
// // } from "react-icons/fi";
// // import projectImage1 from "../../assets/as.jpeg";
// // import projectImage2 from "../../assets/ax.jpeg";
// // import projectImage3 from "../../assets/az.jpeg";
// // import projectImage4 from "../../assets/al.jpeg";

// // const CompanyProfilePDF = () => {
// //   const pdfRef = useRef();

// //   const companyInfo = {
// //     name: "SECURENET",
// //     tagline: "One Roof for All Your Needs",
// //     slogan: "Complete infrastructure solutions for your home and business",
// //     location: "Dubai, United Arab Emirates",
// //     phone: "+971 50 901 4421",
// //     email: "info@securenet-services.com",
// //     website: "www.securenet-services.com",
// //     yearEstablished: "2015",
// //     employees: "50+",
// //     projects: "500+",
// //   };

// //   const featuredProjects = [
// //     {
// //       name: "Sheikh Saqr Al Nayahan Villa - Dubai",
// //       type: "Luxury Residential Villa",
// //       location: "Dubai, UAE",
// //       scope: "Complete Infrastructure Solutions",
// //       description:
// //         "A prestigious luxury villa project featuring state-of-the-art infrastructure systems including smart home automation, advanced security, and comprehensive electrical & HVAC solutions. Delivered with excellence and attention to detail.",
// //       services: [
// //         "Complete Electrical Systems",
// //         "HVAC Installation",
// //         "Smart Home Automation",
// //         "Security & CCTV Systems",
// //         "Network Infrastructure",
// //         "Home Theater Setup",
// //         "Access Control Systems",
// //         "Lighting Solutions",
// //       ],
// //       timeline: "Completed 2025",
// //       area: "5820 sq.m",
// //       images: [projectImage2, projectImage1, projectImage3, projectImage4],
// //     },
// //   ];

// //   const services = [
// //     {
// //       icon: <FiWifi />,
// //       title: "Computer Networks",
// //       description: "Complete network infrastructure solutions",
// //       details: [
// //         "Structured Cabling Systems",
// //         "Wi-Fi Network Installation",
// //         "Network Security Solutions",
// //         "Server Room Setup",
// //         "Data Center Infrastructure",
// //         "Network Maintenance & Support",
// //       ],
// //     },
// //     {
// //       icon: <FiZap />,
// //       title: "Electrical Systems",
// //       description: "Professional electrical installations",
// //       details: [
// //         "Electrical Wiring & Fitting",
// //         "Lighting System Design",
// //         "Power Distribution Systems",
// //         "Electrical Panel Installation",
// //         "Safety & Protection Systems",
// //         "Maintenance & Upgrades",
// //       ],
// //     },
// //     {
// //       icon: <FiThermometer />,
// //       title: "HVAC Systems",
// //       description: "Heating, ventilation and air conditioning",
// //       details: [
// //         "AC Installation & Maintenance",
// //         "Ventilation System Design",
// //         "Ductwork Installation",
// //         "Energy Efficiency Solutions",
// //         "HVAC Control Systems",
// //         "Regular Maintenance Contracts",
// //       ],
// //     },
// //     {
// //       icon: <FiKey />,
// //       title: "Access Control & Attendance",
// //       description: "Security and time management systems",
// //       details: [
// //         "Biometric Access Systems",
// //         "RFID Card Access Control",
// //         "Time & Attendance Systems",
// //         "Visitor Management Systems",
// //         "Security Integration",
// //         "24/7 Monitoring Support",
// //       ],
// //     },
// //     {
// //       icon: <FiHome />,
// //       title: "Complete Solutions",
// //       description: "End-to-end infrastructure projects",
// //       details: [
// //         "Turnkey Home Solutions",
// //         "Commercial Office Setup",
// //         "Building Automation",
// //         "Smart Home Systems",
// //         "Project Management",
// //         "Warranty & Support",
// //       ],
// //     },
// //   ];

// //   const values = [
// //     {
// //       title: "Quality Excellence",
// //       description:
// //         "Delivering superior quality in every project with attention to detail and precision.",
// //     },
// //     {
// //       title: "Customer Focus",
// //       description:
// //         "Putting client satisfaction at the center of everything we do.",
// //     },
// //     {
// //       title: "Innovation",
// //       description:
// //         "Embracing latest technologies and methods for cutting-edge solutions.",
// //     },
// //     {
// //       title: "Reliability",
// //       description:
// //         "Consistent and dependable service delivery you can count on.",
// //     },
// //   ];

// //   const clients = [
// //     {
// //       name: "Holford Facility Management LLC",
// //       sector: "Facility Management",
// //       logo: "https://img.icons8.com/color/96/000000/building.png",
// //     },
// //     {
// //       name: "Fixem Solutions",
// //       sector: "Technical Solutions",
// //       logo: "https://img.icons8.com/color/96/000000/maintenance.png",
// //     },
// //     {
// //       name: "Sunlife Prime Buildings Contracting LLC",
// //       sector: "Construction",
// //       logo: "https://img.icons8.com/color/96/000000/construction-worker.png",
// //     },
// //     // { name: "Dubai Properties", sector: "Real Estate", logo: "" },
// //     // { name: "Emirates NBD", sector: "Banking", logo: "" },
// //     // { name: "Dubai Mall", sector: "Retail", logo: "" },
// //   ];

// //   // const certifications = [
// //   //   "ISO 9001:2015 Quality Management",
// //   //   "ISO 14001:2015 Environmental Management",
// //   //   "OHSAS 18001 Health & Safety",
// //   //   "DEWA Approved Contractor",
// //   //   "Dubai Civil Defense Approved",
// //   //   "RTA Approved Contractor",
// //   // ];

// //   const handlePrint = () => {
// //     window.print();
// //   };

// //   return (
// //     <div className="min-h-screen bg-white text-gray-800">
// //       <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 print:hidden">
// //         <div className="container mx-auto flex justify-between items-center">
// //           <div>
// //             <h1 className="text-2xl font-bold text-amber-900">
// //               SECURENET Company Profile
// //             </h1>
// //             <p className="text-amber-700 text-sm mt-1">
// //               Professional Company Overview
// //             </p>
// //           </div>
// //           <button
// //             onClick={handlePrint}
// //             className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-800 text-white rounded-lg transition-colors"
// //           >
// //             <FiPrinter />
// //             Print / Save as PDF
// //           </button>
// //         </div>
// //         <div className="mt-2 text-sm text-amber-700">
// //           <p>
// //             Click "Print / Save as PDF" and select "Save as PDF" in the print
// //             dialog for best results
// //           </p>
// //         </div>
// //       </div>
// //       <div ref={pdfRef} className="container mx-auto px-4 py-8">
// //         <div className="min-h-screen flex flex-col justify-center items-center border-b-4 border-amber-500 mb-8 page-break-after">
// //           <div className="text-center mb-12">
// //             <div className="w-48 h-48 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-8">
// //               <span className="text-white text-5xl font-bold">SN</span>
// //             </div>
// //             <h1 className="text-5xl font-bold text-amber-900 mb-4">
// //               SECURENET
// //             </h1>
// //             <p className="text-2xl text-orange-600 font-semibold mb-6">
// //               One Roof for All Your Needs
// //             </p>
// //             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
// //               Complete infrastructure solutions for your home and business
// //             </p>
// //           </div>

// //           <div className="mt-16 grid grid-cols-2 gap-8 max-w-2xl">
// //             <div className="text-center">
// //               <FiMapPin className="w-8 h-8 text-amber-500 mx-auto mb-2" />
// //               <p className="font-semibold">Dubai, UAE</p>
// //               <p className="text-sm text-gray-600">Headquarters</p>
// //             </div>
// //             <div className="text-center">
// //               <FiPhone className="w-8 h-8 text-amber-500 mx-auto mb-2" />
// //               <p className="font-semibold">+971 50 901 4421</p>
// //               <p className="text-sm text-gray-600">24/7 Support</p>
// //             </div>
// //           </div>

// //           <div className="mt-12 text-center text-gray-500">
// //             <p>Company Profile • {new Date().getFullYear()}</p>
// //             <p className="text-xs mt-2 text-gray-400">Confidential Document</p>
// //           </div>
// //         </div>

// //         <div className="min-h-screen mb-8 page-break-after">
// //           <h2 className="text-3xl font-bold text-amber-900 mb-8 border-b-2 border-amber-200 pb-4">
// //             Company Overview
// //           </h2>

// //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
// //             <div>
// //               <h3 className="text-2xl font-semibold text-gray-800 mb-4">
// //                 About SECURENET
// //               </h3>
// //               <p className="text-gray-600 mb-4">
// //                 SECURENET is a leading infrastructure solutions provider based
// //                 in Dubai, UAE. Established in 2025, we have built a reputation
// //                 for excellence in delivering comprehensive infrastructure
// //                 solutions for both residential and commercial sectors.
// //               </p>
// //               <p className="text-gray-600 mb-4">
// //                 Our mission is to provide end-to-end infrastructure solutions by
// //                 combining engineering expertise, innovation, and responsible
// //                 execution, ensuring the highest standards of quality, safety,
// //                 and client satisfaction.
// //               </p>
// //               <p className="text-gray-600">
// //                 With flexible as needed by project skilled professionals and
// //                 till now 3+ successful projects completed, we have established
// //                 ourselves as a trusted partner for infrastructure development in
// //                 the UAE.
// //               </p>
// //             </div>

// //             <div className="bg-amber-50 p-6 rounded-xl">
// //               <h4 className="text-xl font-semibold text-amber-900 mb-4">
// //                 Quick Facts
// //               </h4>
// //               <div className="space-y-4">
// //                 {[
// //                   {
// //                     icon: <FiBriefcase />,
// //                     label: "Established",
// //                     value: "2025",
// //                   },
// //                   {
// //                     icon: <FiUsers />,
// //                     label: "Team Size",
// //                     value: "Flexible as needed by project",
// //                   },
// //                   {
// //                     icon: <FiTarget />,
// //                     label: "Projects",
// //                     value: "Till now 3+",
// //                   },
// //                   {
// //                     icon: <FiEye />,
// //                     label: "Vision",
// //                     value: "2025",
// //                   },
// //                 ].map((item, index) => (
// //                   <div key={index} className="flex items-center gap-3">
// //                     <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
// //                       <div className="text-amber-600">{item.icon}</div>
// //                     </div>
// //                     <div>
// //                       <p className="text-sm text-gray-600">{item.label}</p>
// //                       <p className="font-semibold">{item.value}</p>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           </div>

// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 print:mt-16 print:mb-8">
// //             <div className="bg-gradient-to-br from-amber-500 to-orange-500 text-white p-6 rounded-xl print:break-inside-avoid">
// //               <h4 className="text-xl font-semibold mb-4">Our Vision</h4>
// //               <p>
// //                 To be a reliable provider of integrated infrastructure
// //                 solutions, delivering consistent quality, thoughtful innovation,
// //                 and dependable outcomes across all our projects.
// //               </p>
// //             </div>
// //             <div className="bg-gradient-to-br from-slate-700 to-slate-900 text-white p-6 rounded-xl print:break-inside-avoid">
// //               <h4 className="text-xl font-semibold mb-4">Our Mission</h4>
// //               <p>
// //                 To provide end-to-end infrastructure solutions by combining
// //                 engineering expertise, innovation, and responsible execution,
// //                 ensuring the highest standards of quality, safety, and client
// //                 satisfaction.
// //               </p>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="min-h-screen mb-8 page-break-after">
// //           <h2 className="text-3xl font-bold text-amber-900 mb-8 border-b-2 border-amber-200 pb-4">
// //             Featured Projects
// //           </h2>

// //           <div className="mb-12 p-6 border border-amber-200 rounded-2xl bg-amber-50/50">
// //             <div className="flex items-start gap-4 mb-6">
// //               <div className="w-14 h-14 bg-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
// //                 <FiHome className="w-7 h-7 text-white" />
// //               </div>
// //               <div>
// //                 <h3 className="text-2xl font-bold text-amber-900">
// //                   {featuredProjects[0].name}
// //                 </h3>
// //                 <div className="flex flex-wrap gap-4 mt-2">
// //                   <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
// //                     {featuredProjects[0].type}
// //                   </span>
// //                   <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
// //                     {featuredProjects[0].location}
// //                   </span>
// //                   <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
// //                     {featuredProjects[0].timeline}
// //                   </span>
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
// //               <div>
// //                 <p className="text-gray-700 mb-6">
// //                   {featuredProjects[0].description}
// //                 </p>

// //                 <div className="mb-6">
// //                   <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
// //                     <FiTarget className="w-4 h-4 text-amber-500" />
// //                     Project Scope
// //                   </h4>
// //                   <p className="text-gray-600">{featuredProjects[0].scope}</p>
// //                 </div>

// //                 <div>
// //                   <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
// //                     <FiCheckCircle className="w-4 h-4 text-amber-500" />
// //                     Services Provided
// //                   </h4>
// //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
// //                     {featuredProjects[0].services.map((service, idx) => (
// //                       <div key={idx} className="flex items-center gap-2">
// //                         <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
// //                         <span className="text-gray-700 text-sm">{service}</span>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>
// //               </div>

// //               <div className="space-y-4">
// //                 <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
// //                   <img
// //                     src={featuredProjects[0].images[0]}
// //                     alt="Sheikh Saqr Al Nayahan Villa - Main View"
// //                     className="w-full h-full object-cover"
// //                   />
// //                 </div>

// //                 <div className="grid grid-cols-3 gap-2">
// //                   {featuredProjects[0].images.slice(1).map((image, index) => (
// //                     <div
// //                       key={index}
// //                       className="aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200"
// //                     >
// //                       <img
// //                         src={image}
// //                         alt={`Sheikh Saqr Al Nayahan Villa - View ${index + 2}`}
// //                         className="w-full h-full object-cover"
// //                       />
// //                     </div>
// //                   ))}
// //                 </div>

// //                 <div className="pt-4 border-t border-amber-200">
// //                   <div className="flex items-center justify-between text-sm">
// //                     <div className="flex items-center gap-2">
// //                       <FiCalendar className="w-4 h-4 text-amber-500" />
// //                       <span className="text-gray-600">Timeline:</span>
// //                       <span className="font-medium">
// //                         {featuredProjects[0].timeline}
// //                       </span>
// //                     </div>
// //                     <div className="flex items-center gap-2">
// //                       <FiHome className="w-4 h-4 text-amber-500" />
// //                       <span className="text-gray-600">Area:</span>
// //                       <span className="font-medium">
// //                         {featuredProjects[0].area}
// //                       </span>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="min-h-screen mb-8 page-break-after">
// //           <h2 className="text-3xl font-bold text-amber-900 mb-8 border-b-2 border-amber-200 pb-4">
// //             Our Services
// //           </h2>

// //           {services.map((service, index) => (
// //             <div key={index} className="mb-8">
// //               <div className="flex items-center gap-4 mb-4">
// //                 <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
// //                   <div className="text-amber-600 text-xl">{service.icon}</div>
// //                 </div>
// //                 <div>
// //                   <h3 className="text-2xl font-semibold text-gray-800">
// //                     {service.title}
// //                   </h3>
// //                   <p className="text-gray-600">{service.description}</p>
// //                 </div>
// //               </div>

// //               <div className="ml-16">
// //                 <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
// //                   {service.details.map((detail, idx) => (
// //                     <li key={idx} className="flex items-start gap-2">
// //                       <FiCheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
// //                       <span className="text-gray-700">{detail}</span>
// //                     </li>
// //                   ))}
// //                 </ul>
// //               </div>

// //               {index < services.length - 1 && (
// //                 <hr className="my-8 border-gray-200" />
// //               )}
// //             </div>
// //           ))}
// //         </div>
// //         <div className="min-h-screen mb-8 page-break-after">
// //           <h2 className="text-3xl font-bold text-amber-900 mb-8 border-b-2 border-amber-200 pb-4">
// //             Why Choose SECURENET?
// //           </h2>

// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
// //             {values.map((value, index) => (
// //               <div
// //                 key={index}
// //                 className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
// //               >
// //                 <div className="flex items-center gap-4 mb-4">
// //                   <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center">
// //                     <FiStar className="w-6 h-6 text-amber-500" />
// //                   </div>
// //                   <h3 className="text-xl font-semibold text-gray-800">
// //                     {value.title}
// //                   </h3>
// //                 </div>
// //                 <p className="text-gray-600">{value.description}</p>
// //               </div>
// //             ))}
// //           </div>

// //           {/* Key Differentiators Section - Added top margin for print */}
// //           <div className="mt-12 print:mt-16">
// //             <h3 className="text-2xl font-semibold text-gray-800 mb-6 print:mb-8">
// //               Key Differentiators
// //             </h3>
// //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
// //               {[
// //                 "Single Point of Contact",
// //                 "End-to-End Solutions",
// //                 "UAE Market Experience",
// //                 "Quality Assurance",
// //                 "Timely Delivery",
// //                 "Competitive Pricing",
// //                 "After-Sales Support",
// //                 "Customized Solutions",
// //               ].map((item, index) => (
// //                 <div
// //                   key={index}
// //                   className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg"
// //                 >
// //                   <FiCheckCircle className="w-5 h-5 text-green-500" />
// //                   <span className="font-medium">{item}</span>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </div>
// //         <div className="min-h-screen mb-8 page-break-after print:break-after-page">
// //           <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
// //             <div className="print:break-inside-avoid">
// //               <h2 className="text-3xl font-bold text-amber-900 mb-8 border-b-2 border-amber-200 pb-4 print:break-before-avoid">
// //                 Our Esteemed Clients
// //               </h2>

// //               <div className="mb-8">
// //                 <h3 className="text-xl font-semibold text-gray-800 mb-4 print:text-lg">
// //                   Our Key Clients
// //                 </h3>
// //                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 print:grid-cols-3 print:gap-3">
// //                   {clients.map((client, index) => (
// //                     <div
// //                       key={index}
// //                       className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:border-amber-300 transition-colors print:p-3 print:shadow-none"
// //                     >
// //                       <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-3 print:w-10 print:h-10 print:mb-2">
// //                         {client.logo ? (
// //                           <img
// //                             src={client.logo}
// //                             alt={client.name}
// //                             className="w-full h-full object-contain rounded-full"
// //                             onError={(e) => {
// //                               e.target.onerror = null;
// //                               e.target.style.display = "none";
// //                               e.target.parentElement.textContent =
// //                                 client.name.charAt(0);
// //                             }}
// //                           />
// //                         ) : (
// //                           client.name.charAt(0)
// //                         )}
// //                       </div>
// //                       <h4 className="font-semibold text-gray-800 print:text-sm">
// //                         {client.name}
// //                       </h4>
// //                       <p className="text-sm text-gray-600 print:text-xs">
// //                         {client.sector}
// //                       </p>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="min-h-screen flex flex-col justify-center items-center print:mt-8">
// //           <div className="text-center max-w-2xl">
// //             <h2 className="text-4xl font-bold text-amber-900 mb-6 print:text-3xl">
// //               Thank You
// //             </h2>
// //             <p className="text-xl text-gray-600 mb-8 print:text-lg print:mb-6">
// //               We appreciate your interest in SECURENET. We look forward to the
// //               opportunity to work with you and deliver exceptional
// //               infrastructure solutions for your next project.
// //             </p>

// //             <div className="my-12 print:my-8">
// //               <div className="w-32 h-32 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 print:w-28 print:h-28">
// //                 <span className="text-white text-4xl font-bold print:text-3xl">
// //                   SN
// //                 </span>
// //               </div>
// //               <p className="text-2xl font-bold text-amber-900 print:text-xl">
// //                 SECURENET
// //               </p>
// //               <p className="text-gray-600 print:text-lg">
// //                 One Roof for All Your Needs
// //               </p>
// //             </div>

// //             <div className="mt-12 pt-8 border-t border-gray-200 print:mt-8">
// //               <p className="text-gray-500 text-sm print:text-xs">
// //                 This document is confidential and intended solely for the use of
// //                 the individual or entity to whom it is addressed.
// //               </p>
// //               <p className="text-gray-400 text-xs mt-4 print:text-xs">
// //                 © {new Date().getFullYear()} SECURENET. All rights reserved.
// //               </p>
// //               <p className="text-gray-400 text-xs mt-1 print:text-xs">
// //                 Dubai, United Arab Emirates • +971 50 901 4421 •
// //                 info@securenet-services.com
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //       <style jsx>{`
// //         @media print {
// //           .print-hidden {
// //             display: none !important;
// //           }
// //           .page-break-after {
// //             page-break-after: always !important;
// //           }
// //           .page-break-before {
// //             page-break-before: always !important;
// //           }
// //           body {
// //             -webkit-print-color-adjust: exact;
// //             print-color-adjust: exact;
// //             margin: 0;
// //             padding: 0;
// //             background: white;
// //             font-family: "Segoe UI", "Roboto", sans-serif;
// //           }
// //           .container {
// //             max-width: 100% !important;
// //             padding: 0 20mm !important;
// //           }
// //           .bg-gradient-to-br,
// //           .bg-gradient-to-r {
// //             -webkit-print-color-adjust: exact;
// //             print-color-adjust: exact;
// //           }
// //           /* Ensure images print properly */
// //           img {
// //             max-width: 100% !important;
// //             page-break-inside: avoid;
// //             break-inside: avoid;
// //             border-radius: 4px;
// //           }
// //           /* Project images styling for print */
// //           .aspect-video {
// //             height: 180px !important;
// //           }
// //           .aspect-square {
// //             height: 80px !important;
// //           }
// //           /* Improve text readability in print */
// //           h1,
// //           h2,
// //           h3,
// //           h4 {
// //             color: #92400e !important;
// //           }
// //           p {
// //             line-height: 1.6;
// //           }
// //           /* Remove hover effects for print */
// //           .hover\\:border-amber-300,
// //           .hover\\:shadow-lg {
// //             border-color: inherit !important;
// //             box-shadow: none !important;
// //           }

// //           /* Added specific print styles for spacing */
// //           .print\\:mt-8 {
// //             margin-top: 2rem !important;
// //           }

// //           .print\\:mt-16 {
// //             margin-top: 4rem !important;
// //           }

// //           .print\\:mb-8 {
// //             margin-bottom: 2rem !important;
// //           }

// //           .print\\:mb-6 {
// //             margin-bottom: 1.5rem !important;
// //           }

// //           .print\\:my-8 {
// //             margin-top: 2rem !important;
// //             margin-bottom: 2rem !important;
// //           }

// //           /* Adjust font sizes for print */
// //           .print\\:text-3xl {
// //             font-size: 1.875rem !important;
// //             line-height: 2.25rem !important;
// //           }

// //           .print\\:text-xl {
// //             font-size: 1.25rem !important;
// //             line-height: 1.75rem !important;
// //           }

// //           .print\\:text-lg {
// //             font-size: 1.125rem !important;
// //             line-height: 1.75rem !important;
// //           }

// //           .print\\:text-xs {
// //             font-size: 0.75rem !important;
// //             line-height: 1rem !important;
// //           }
// //         }

// //         @page {
// //           margin: 20mm;
// //           size: A4;
// //         }

// //         /* Style for screen view */
// //         @media screen {
// //           .container {
// //             max-width: 1200px;
// //           }
// //           img {
// //             transition: transform 0.3s ease;
// //           }
// //           img:hover {
// //             transform: scale(1.02);
// //           }
// //         }
// //       `}</style>
// //     </div>
// //   );
// // };

// // export default CompanyProfilePDF;
