import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const ProgressBar = ({ currentStep, totalSteps }) => {
  const { t } = useTranslation();
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full max-w-3xl mx-auto" role="progressbar" aria-valuenow={progressPercentage} aria-valuemin="0" aria-valuemax="100" aria-label={t('progressBar.ariaLabel')}>
      <div className="flex justify-between text-sm text-bizzwiz-text-alt mb-2">
        <span className="font-medium">{t('progressBar.stepLabel', { current: currentStep, total: totalSteps })}</span>
        <span className="font-medium">{Math.round(progressPercentage)}%</span>
      </div>
      <div className="w-full h-3 bg-bizzwiz-card/50 rounded-full overflow-hidden shadow-inner">
        <motion.div
          className="h-full bg-gradient-to-r from-bizzwiz-accent to-bizzwiz-electric-cyan rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.6, ease: [0.6, 0.01, -0.05, 0.95] }}
          style={{ willChange: 'width' }} // Optimize animation performance
        />
      </div>
    </div>
  );
};

export default ProgressBar;