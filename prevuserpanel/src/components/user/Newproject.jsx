import React, { useRef } from 'react';
import MultiStepFormView from '@/components/views/MultiStepFormView';

const Newproject = () => {
  const isMounted = useRef(false);

  if (!isMounted.current) {
    console.log("Rendering Newproject with mode: dashboard (initial mount)");
    isMounted.current = true;
  }

  return (
    <div>
      <main className="flex-1">
        <div className="min-h-[calc(100vh-var(--navbar-height,68px))] flex flex-col items-center justify-center p-4 relative">
          <MultiStepFormView mode="dashboard" />
        </div>
      </main>
    </div>
  );
};

export default Newproject;