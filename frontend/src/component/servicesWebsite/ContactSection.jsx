// components/ContactSection.jsx
import React from "react";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";

const ContactSection = () => {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-slate-400 text-lg">
            Get a free consultation and quote for your infrastructure needs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
          <div>
            <ContactInfo />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

// import React from "react";
// import ContactForm from "./ContactForm";
// import ContactInfo from "./ContactInfo";

// const ContactSection = () => {
//   return (
//     <section className="container mx-auto px-4 py-8">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
//         <ContactForm />
//         <ContactInfo />
//       </div>
//     </section>
//   );
// };

// export default ContactSection;
