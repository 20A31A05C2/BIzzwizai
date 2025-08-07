// "use client";

// import React from "react";

// const EndingSection = () => {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen text-white text-center px-4 sm:px-6 md:px-8 bg-black font-montserrat py-16 sm:py-20">
//       <div className="p-2 sm:p-4">
//         <img
//           src="/bizzwizicon.png"
//           alt="BizzWiz Icon"
//           className="w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] object-contain"
//         />
//       </div>

//       <div className="mt-6 sm:mt-8 md:mt-10 max-w-4xl mx-auto">
//         <h1 className="mt-6 sm:mt-8 md:mt-10 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent drop-shadow-[0_0_32px_rgba(255,255,255,0.3)] leading-tight">
//           Step into the <br />
//           future of design
//         </h1>
//         <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-300 max-w-md mx-auto leading-relaxed">
//           Join thousands of designers and teams using Framer to turn ideas into
//           high-performing websites, fast.
//         </p>

//         <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-sm sm:max-w-none mx-auto">
//           <button className="bg-white text-black px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-medium hover:bg-gray-200 transition text-sm sm:text-base">
//             Start for free
//           </button>
//           <button className="bg-gray-800 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-medium hover:bg-gray-700 transition text-sm sm:text-base">
//             Start with AI
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EndingSection;



"use client";

import React from "react";

const EndingSection = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen text-white text-center px-4 sm:px-6 md:px-8 bg-black font-montserrat py-20 sm:py-24 md:py-28 lg:py-32">
      <div className="p-2 sm:p-4">
        <img
          src="/bizzwizicon.png"
          alt="BizzWiz Icon"
          className="w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] object-contain"
        />
      </div>

      <div className="mt-6 sm:mt-8 md:mt-10 max-w-4xl mx-auto">
        <h1 className="mt-6 sm:mt-8 md:mt-10 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent drop-shadow-[0_0_32px_rgba(255,255,255,0.3)] leading-tight">
          Entrez dans le <br />
          l'avenir du design
        </h1>
        <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-300 max-w-md mx-auto leading-relaxed">
          Rejoignez des milliers de designers et d'équipes qui utilisent Framer pour transformer rapidement leurs idées en sites Web performants.
        </p>

        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-sm sm:max-w-none mx-auto">
          <button className="bg-white text-black px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-medium hover:bg-gray-200 transition text-sm sm:text-base">
            Commencez gratuitement
          </button>
          <button className="bg-gray-800 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-medium hover:bg-gray-700 transition text-sm sm:text-base">
            Commencez avec l'IA
          </button>
        </div>
      </div>
    </section>
  );
};

export default EndingSection;