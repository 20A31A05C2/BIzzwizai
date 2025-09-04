import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '@/apiService';
import { useTranslation } from 'react-i18next';

const TopHeaderBar = () => {
  const { t, i18n } = useTranslation();
  const [credits, setCredits] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const userId = localStorage.getItem('bizzwiz-userId');
        if (!userId) return;
        const response = await ApiService(`/users/${userId}/credits`, 'GET');
        if (response && response.credits !== undefined) {
          setCredits(response.credits);
        }
      } catch (error) {
        setCredits('--');
      }
    };
    fetchCredits();
  }, []);

  return (
    <div className="flex items-center justify-between px-3 py-2 sm:px-6 sm:py-4 w-full">
      {/* Left Logo */}
      <div className="flex items-center">
        <img
          src="flag.png"
          alt="Logo"
          className="w-12 h-6 rounded-2xl object-contain cursor-pointer"
          onClick={() => navigate('/')}
        />
      </div>

      {/* Right Section */}
      <div className="flex-1 flex justify-end">
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Shield Icon */}
          <img
            src="shield.png"
            alt="Shield"
            className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 object-contain"
          />

          {/* Credits Display */}
          <span className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-white whitespace-nowrap">
            {credits !== null ? credits : ''}{" "}
            <span className="ml-1 text-xs sm:text-sm md:text-base lg:text-lg font-medium">
              {t('topHeaderBar.credits')}
            </span>
          </span>

          {/* Purchase Button */}
          <button
            onClick={() => navigate('/purchase')}
            className="ml-2 sm:ml-3 px-2 py-1 sm:px-4 sm:py-2
                        bg-gradient-to-r from-purple-600 to-pink-500
                        text-white rounded-lg text-xs sm:text-sm md:text-base
                        hover:opacity-90 transition-all"
          >
            {t('topHeaderBar.purchase')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopHeaderBar;
