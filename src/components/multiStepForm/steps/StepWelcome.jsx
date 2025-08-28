import React from 'react';
import { useFormContext } from '@/contexts/FormContext';
import StepButton from '@/components/multiStepForm/StepButton';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const StepWelcome = () => {
  const { nextStep } = useFormContext();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center text-center h-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, type: 'spring', stiffness: 100, delay: 0.2 }}
        className="mb-8"
      >
        <img
          alt={t('stepWelcome.imageAlt')}
          className="w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-[0_0_15px_rgba(159,67,242,0.5)]"
          src="/bee.png"
        />
      </motion.div>
      <motion.h1
        className="text-3xl md:text-4xl font-bold mb-4 text-gradient-bizzwiz"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        {t('stepWelcome.title')}
      </motion.h1>
      <motion.p
        className="text-lg md:text-xl text-bizzwiz-text-alt mb-10 max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        {t('stepWelcome.description')}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        <StepButton onClick={nextStep}>{t('stepWelcome.button')}</StepButton>
      </motion.div>
    </div>
  );
};

export default StepWelcome;