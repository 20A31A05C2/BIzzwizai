import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BusinessPlan from '@/components/businesslogo/BusinessPlan';
import LogoGeneration from '@/components/businesslogo/LogoGeneration';
import SloganGeneration from '@/components/businesslogo/SloganGeneration';

const Planpage = () => {
  const [currentView, setCurrentView] = useState('business');
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-var(--navbar-height,68px))] bg-gray-900/50 p-4 md:p-6 rounded-2xl shadow-lg border border-gray-800/50 flex flex-col justify-between relative">
      <div className="flex flex-col gap-8 flex-grow">
        {currentView === 'business' ? (
          <BusinessPlan setCurrentView={setCurrentView} />
        ) : currentView === 'logo' ? (
          <LogoGeneration setCurrentView={setCurrentView} />
        ) : currentView === 'slogan' ? (
          <SloganGeneration setCurrentView={setCurrentView} />
        ) : null}
      </div>
      <div className="w-full flex justify-center p-4 bg-transparent">
        <button
          className="w-full max-w-xs sm:max-w-sm md:max-w-md px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition-all duration-200"
          onClick={() => navigate('/call')}
        >
          Valider l'appel
        </button>
      </div>
    </div>
  );
};

export default Planpage;
