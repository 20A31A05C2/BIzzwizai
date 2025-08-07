import React from 'react';
import { useFormContext } from '@/contexts/FormContext';
import StepButton from '@/components/multiStepForm/StepButton';
import { motion } from 'framer-motion';
import ProgressBar from '../ProgressBar';
import TopHeaderBar from '../TopHeaderBar';
import LevelHeader from '../LevelHeader';

const StepWelcome = () => {
  const { nextStep } = useFormContext();
  const currentStep = 1;
  const totalSteps = 11;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-montserrat">
      {/* Top Header Bar */}
      <TopHeaderBar />

      {/* Level Header */}
      <LevelHeader />

      {/* Progress Bar */}
      <div className="px-4 sm:px-6 mb-8 sm:mb-10">
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      </div>

      {/* Main Content Container with White Glassmorphism */}
      <div className="flex-1 flex items-center justify-center">
        <div className="rounded-3xl bg-white/10 backdrop-blur-md border border-white/30 p-4 sm:p-6 md:p-8 max-w-lg sm:max-w-xl md:max-w-2xl w-full text-center shadow-[0_0_40px_rgba(168,85,247,0.35)]">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 100, delay: 0.2 }}
            className="mb-4 sm:mb-6"
          >
            <img
              alt="Mascotte BizzWiz AI"
              className="w-32 sm:w-40 md:w-48 h-28 sm:h-32 md:h-40 object-contain mx-auto"
              src="/bee.png"
            />
          </motion.div>
          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Welcome to the BizzWiz AI universe
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg md:text-xl text-white/80 mb-6 sm:mb-8 max-w-xs sm:max-w-md md:max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            You're not just filling out a form. You're co-creating your digital project.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <StepButton
              onClick={nextStep}
              className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-2xl hover:opacity-90 transition-opacity"
            >
              START CO-CREATION
            </StepButton>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default StepWelcome;