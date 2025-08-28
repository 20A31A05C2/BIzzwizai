import React from 'react';
import { BookOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const LevelHeader = ({levelno = '', heading = ''}) => {
  const { t, i18n } = useTranslation();
  return (
    <div className="px-4 sm:px-6 mb-6 sm:mb-8">
      <div className="flex items-center justify-start mt-4 sm:mt-6">
        <div className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-3xl px-4 sm:px-6 md:px-8 py-2 sm:py-3 flex justify-between items-center w-full">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <span className="text-xs sm:text-sm md:text-base font-medium text-white/80">{levelno}</span>
            <span className="text-lg sm:text-xl md:text-2xl font-bold text-white">{heading}</span>
          </div>
          <button className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl px-2 sm:px-3 md:px-4 py-1 sm:py-2 flex items-center space-x-1 sm:space-x-2 hover:opacity-90 transition-opacity">
            <BookOpen size={20} className="text-white" />
            <span className="font-bold text-white text-xs sm:text-sm md:text-base">{t('levelHeader.guide')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LevelHeader;