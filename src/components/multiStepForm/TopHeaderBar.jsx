import React from 'react';

const TopHeaderBar = () => {
  return (
    <div className="flex items-center justify-between p-2 sm:p-4 md:p-6">
      <div className="flex items-center">
        <img src="flag.png" alt="Flag" className="w-8 sm:w-10 md:w-12 h-4 sm:h-5 md:h-6 rounded-xl object-contain" />
      </div>
      <div className="flex-1 flex justify-end pr-2 sm:pr-4 md:pr-6">
        <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3">
          <img src="shield.png" alt="Shield" className="w-4 sm:w-6 md:w-8 h-4 sm:h-6 md:h-8 object-contain" />
          <span className="text-base sm:text-lg md:text-xl font-bold text-white">15</span>
        </div>
      </div>
    </div>
  );
};

export default TopHeaderBar;