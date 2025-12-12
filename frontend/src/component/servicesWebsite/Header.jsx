import React from "react";
import { FiPhone } from "react-icons/fi";

const Header = () => {
  return (
    <header className="container mx-auto px-4 py-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-amber-400/20 blur-2xl rounded-full w-12 h-12"></div>
            <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center relative">
              <span className="text-white font-bold text-lg">SN</span>
            </div>
          </div>
          <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
            SECURENET
          </span>
        </div>
        
        <a
          href="tel:+971509014421"
          className="inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-amber-500/10 border border-amber-500/50 rounded-lg text-amber-500 hover:bg-amber-500/20 transition-all duration-300 text-xs sm:text-sm font-semibold whitespace-nowrap"
        >
          <FiPhone className="w-3 h-3 sm:w-4 sm:h-4" />
          +971 50 901 4421
        </a>
      </div>
    </header>
  );
};

export default Header;

// import React from "react";
// import { FiPhone } from "react-icons/fi";

// const Header = () => {
//   return (
//     <header className="container mx-auto px-4 py-3">
//       <div className="flex justify-between items-center">
//         <div className="flex items-center gap-3">
//           <div className="relative">
//             <div className="absolute inset-0 bg-amber-400/20 blur-2xl rounded-full w-12 h-12"></div>
//             <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center relative">
//               <span className="text-white font-bold text-lg">SN</span>
//             </div>
//           </div>
//           <span className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
//             SECURENET
//           </span>
//         </div>
//         <div className="absolute top-6 right-6 z-20">
//           <a
//             href="tel:+971509014421"
//             className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/50 rounded-lg text-amber-500 hover:bg-amber-500/20 transition-all duration-300 text-sm font-semibold"
//           >
//             <FiPhone className="w-4 h-4" />
//             +971 50 901 4421
//           </a>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;
