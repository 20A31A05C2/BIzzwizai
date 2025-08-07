import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ currentStep, totalSteps }) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between text-sm text-gray-400 mb-1">
        <span>Étape {currentStep} sur {totalSteps}</span>
        <span>{Math.round(progressPercentage)}%</span>
      </div>
      <div className="w-full h-3 progress-bar-bg rounded-full overflow-hidden shadow-inner">
        <motion.div
          className="h-full progress-bar-fill rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.6, ease: [0.6, 0.01, -0.05, 0.95] }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;