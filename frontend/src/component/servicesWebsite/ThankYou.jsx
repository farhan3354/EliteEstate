// components/ThankYou.jsx
import React from "react";
import { FiCheckCircle, FiHome, FiPhone } from "react-icons/fi";

const ThankYou = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <FiCheckCircle className="w-10 h-10 text-white" />
        </div>

        <h1 className="text-3xl font-bold text-white mb-4">Thank You!</h1>
        <p className="text-slate-300 mb-6">
          Your message has been sent successfully. Our team will contact you
          within 24 hours.
        </p>

        <div className="space-y-4 mt-8">
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg transition-all duration-300 hover:from-amber-600 hover:to-orange-600"
          >
            <FiHome />
            Back to Home
          </a>

          <a
            href="tel:+971509014421"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-700/50 border border-slate-600 text-slate-300 font-semibold rounded-lg transition-all duration-300 hover:bg-slate-600/50"
          >
            <FiPhone />
            Call Now: +971 50 901 4421
          </a>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
