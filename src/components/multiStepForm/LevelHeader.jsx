// import React from 'react';
// import { BookOpen } from 'lucide-react';

// const LevelHeader = () => {
//   return (
//     <div className="px-2 sm:px-4 md:px-6 mb-4 sm:mb-6 md:mb-8">
//       <div className="flex items-center justify-start mt-2 sm:mt-4 md:mt-6">
//         <div className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-2xl px-3 sm:px-4 md:px-6 py-1 sm:py-2 md:py-3 flex justify-between items-center w-full max-w-xs sm:max-w-sm md:max-w-3xl">
//           <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3">
//             <span className="text-xs sm:text-sm md:text-base font-medium text-white/80">LEVEL 1</span>
//             <span className="text-sm sm:text-lg md:text-xl font-bold text-white">VISIONAIRE</span>
//           </div>
//           <button className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 flex items-center space-x-1 sm:space-x-1.5 md:space-x-2 hover:opacity-90 transition-opacity">
//             <BookOpen size={16} sm:size={20} md:size={24} className="text-white" />
//             <span className="font-bold text-white text-xs sm:text-sm md:text-base">GUIDE</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LevelHeader;

import React from 'react';
import { BookOpen } from 'lucide-react';

const LevelHeader = ({levelno = '', heading = ''}) => {
  return (
    <div className="px-4 sm:px-6 mb-6 sm:mb-8">
      <div className="flex items-center justify-start mt-4 sm:mt-6">
        <div className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-3xl px-4 sm:px-6 md:px-8 py-2 sm:py-3 flex justify-between items-center w-full max-w-xs sm:max-w-sm md:max-w-2xl">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <span className="text-xs sm:text-sm md:text-base font-medium text-white/80">{levelno}</span>
            <span className="text-lg sm:text-xl md:text-2xl font-bold text-white">{heading}</span>
          </div>
          <button className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl px-2 sm:px-3 md:px-4 py-1 sm:py-2 flex items-center space-x-1 sm:space-x-2 hover:opacity-90 transition-opacity">
            <BookOpen size={20} className="text-white" />
            <span className="font-bold text-white text-xs sm:text-sm md:text-base">GUIDE</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LevelHeader;