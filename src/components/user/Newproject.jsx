import React, { useRef } from 'react';
import MultiStepFormView from '@/components/views/MultiStepFormView';
import { motion } from 'framer-motion';

const Newproject = () => {
  const isMounted = useRef(false);

  if (!isMounted.current) {
    console.log("Rendering Newproject with mode: dashboard (initial mount)");
    isMounted.current = true;
  }

  return (
    <div>
      <main className="flex-1">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.4 }}
          className="min-h-[calc(100vh-var(--navbar-height,68px))] flex flex-col items-center justify-center p-4 relative"
        >
          <MultiStepFormView mode="dashboard" />
        </motion.div>
      </main>
    </div>
  );
};

export default Newproject;