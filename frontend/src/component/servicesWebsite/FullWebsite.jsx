// App.jsx
import React from "react";
import Header from "./Header";
import Hero from "./Hero";
import Services from "./Services";
import ContactSection from "./ContactSection";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";

function FullWebsite() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M36 18c3.314 0 6 2.686 6 6s-2.686 6-6 6-6-2.686-6-6 2.686-6 6-6' stroke='rgba(255,255,255,0.03)' stroke-width='1'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="absolute top-20 left-20 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-20 right-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="relative z-10">
        <Header />
        <Hero />
        <Services />
        <ContactSection />
        <Footer />
      </div>

      <WhatsAppButton />
    </div>
  );
}

export default FullWebsite;
