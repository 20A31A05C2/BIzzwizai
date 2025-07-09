import React from 'react';
import { motion } from 'framer-motion';

const StepCard = ({ children }) => {
  return (
    <motion.div
      className="step-card w-full p-6 sm:p-8 md:p-10 min-h-[450px] flex flex-col justify-between"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
};

export default StepCard;