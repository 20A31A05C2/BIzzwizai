import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const StepButton = ({ 
  onClick, 
  children, 
  variant = 'primary', 
  className, 
  disabled = false, 
  type = "button" 
}) => {
  // Force proper corner rendering with always visible border
  const cornerFixClasses = `
    relative overflow-hidden outline-none
    !rounded-xl !border-0
    transition-all duration-300 ease-out
    after:absolute after:inset-0 after:rounded-xl after:z-0
    after:border-2 after:border-white/30 after:pointer-events-none
    hover:after:border-white/60
    after:transition-all after:duration-300
    [&]:!box-border
  `;
  
  const baseClasses = "step-button";
  const variantClasses = variant === 'secondary' ? "step-button-secondary" : "";
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <motion.button
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={cn(
        cornerFixClasses,
        baseClasses, 
        variantClasses, 
        disabledClasses,
        className
      )}
      whileHover={!disabled ? { scale: 1.05, y: -2 } : {}}
      whileTap={!disabled ? { scale: 0.95, y: 0 } : {}}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export default StepButton;