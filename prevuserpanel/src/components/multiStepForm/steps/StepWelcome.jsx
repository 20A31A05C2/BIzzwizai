import React from 'react';
import { useFormContext } from '@/contexts/FormContext';
import StepButton from '@/components/multiStepForm/StepButton';
import { motion } from 'framer-motion';

const StepWelcome = () => {
  const { nextStep } = useFormContext();

  return (
    <div className="flex flex-col items-center justify-center text-center h-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100, delay: 0.2 }}
        className="mb-8"
      >
        <img 
            alt="Mascotte abeille 3D futuriste BizzWiz AI avec des accents violets et bleus néon, style cyberpunk premium" 
            className="w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-[0_0_15px_rgba(159,67,242,0.5)]"
          src="https://storage.googleapis.com/hostinger-horizons-assets-prod/a989574d-4ac8-453f-b942-2e53c4521d48/9397bc0a67103e2199f08da814eae151.png" />
      </motion.div>
      <motion.h1 
        className="text-3xl md:text-4xl font-bold mb-4 text-gradient-bizzwiz"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        Bienvenue dans l’univers BizzWiz AI
      </motion.h1>
      <motion.p 
        className="text-lg md:text-xl text-bizzwiz-text-alt mb-10 max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        Tu ne remplis pas un formulaire. Tu co-crées ton projet digital.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        <StepButton onClick={nextStep}>Commencer la Co-création</StepButton>
      </motion.div>
    </div>
  );
};

export default StepWelcome;