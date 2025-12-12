// components/Hero.jsx
import React from "react";
import logo from "./../../assets/SeCuRe NeT.png";
const Hero = () => {
  return (
    <section className="max-w-4xl mx-auto text-center px-4 py-6">
      {/* Logo Display */}
      {/* <div className="flex justify-center mb-8 relative">
        <div className="relative">
          <div className="absolute inset-0 bg-amber-400/20 blur-2xl rounded-full w-32 h-32"></div>
          <div className="w-32 h-32 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center relative">
            <span className="text-white text-4xl font-bold">SN</span>
          </div>
        </div>
      </div> */}
      <div className="flex justify-center mb-8 relative">
        <div className="relative">
          <div className="absolute inset-0 bg-amber-400/20 blur-2xl rounded-full w-40 h-40"></div>
          <img
            src={logo}
            alt="SECURENET Logo"
            className="w-32 h-32 object-contain relative z-10"
          />
        </div>
      </div>

      <h1 className="text-amber-500 text-2xl md:text-5xl font-bold tracking-widest uppercase mb-2">
        SECURENET
      </h1>

      <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-amber-200 to-orange-200 bg-clip-text text-transparent leading-tight">
        One Roof for All Your Needs
      </h2>

      <p className="text-lg md:text-xl text-slate-300 mb-3 max-w-2xl mx-auto leading-relaxed">
        Complete infrastructure solutions for your home and business
      </p>

      <p className="text-slate-400 mb-4 max-w-2xl mx-auto">
        From computer networks to electrical systems, HVAC installations, and
        everything you need to build your home
      </p>
    </section>
  );
};

export default Hero;
