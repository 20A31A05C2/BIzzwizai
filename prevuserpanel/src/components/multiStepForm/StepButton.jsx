import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const StepButton = ({ onClick, children, variant = 'primary', className, disabled = false, type = "button" }) => {
  const baseClasses = "step-button";
  const variantClasses = variant === 'secondary' ? "step-button-secondary" : "";

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(baseClasses, variantClasses, className, disabled ? "opacity-50 cursor-not-allowed" : "")}
      whileHover={!disabled ? { scale: 1.05, y: -2 } : {}}
      whileTap={!disabled ? { scale: 0.98, y: 0 } : {}}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.button>
  );
};

export default StepButton;