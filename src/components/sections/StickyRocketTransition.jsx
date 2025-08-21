import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// This is a self-contained rocket component for use within the transition.
const Rocket = () => (
  <div className="flex justify-center items-center flex-col">
    <div className="relative flex flex-col items-center">
      <img
        src="/rocket.png"
        alt="Rocket"
        className="w-full max-w-[300px] h-auto"
      />
      <img
        src="/fire.png"
        alt="Rocket Fire"
        className="w-full max-w-[600px] h-auto -mt-20"
      />
    </div>
  </div>
);

export const StickyRocketTransition = ({ children }) => {
  const [sectionOne, sectionTwo] = React.Children.toArray(children);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // --- IMPROVED TIMING: Smooth rocket pull effect ---

  // First section (HowItWorks) - fully visible, then gets pulled up cleanly by rocket
  const sectionOneOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6], // Fully visible, then fades out as it gets pulled up
    [1, 1, 0]
  );
  const sectionOneY = useTransform(
    scrollYProgress,
    [0.3, 0.7], // Gets pulled up continuously by rocket from 30% to 70% scroll
    [0, "-150vh"]
  );
    
  // Rocket appears and continuously pulls sections up
  const rocketScale = useTransform(
    scrollYProgress, 
    [0.25, 0.35], // Appears between 25-35% scroll
    [0, 1]
  );
  const rocketY = useTransform(
    scrollYProgress,
    [0.25, 0.35, 0.9], // Appears, then continuously moves up pulling content
    ["100vh", "30vh", "-150vh"]
  );
  
  // Second section (Features) - gets continuously pulled up by rocket
  const sectionTwoY = useTransform(
    scrollYProgress,
    [0.4, 0.9], // Gets pulled up continuously from 40% to 90% scroll
    ["120vh", "-50vh"]
  );
  const sectionTwoOpacity = useTransform(
      scrollYProgress,
      [0.4, 0.6], // Fades in as it gets pulled up
      [0, 1]
  );

  return (
    // Container height increased for proper invisible scroll spacing
    <div ref={containerRef} className="min-h-[800vh] relative">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-visible">
        
        {/* First section - HowItWorks - Full height container */}
        <motion.div 
          className="absolute inset-0 w-full h-full" 
          style={{ 
            opacity: sectionOneOpacity,
            y: sectionOneY
          }}
        >
          <div className="w-full h-full flex items-center justify-center">
            {sectionOne}
          </div>
        </motion.div>

        {/* Rocket - appears after first section is gone */}
        <motion.div 
          className="absolute inset-0 z-10 flex items-center justify-center" 
          style={{ 
            y: rocketY, 
            scale: rocketScale,
            opacity: rocketScale
          }}
        >
          <Rocket />
        </motion.div>
        
        {/* Second section - Features - Full height container */}
        <motion.div 
          className="absolute inset-0 w-full h-full z-20"
          style={{ 
            y: sectionTwoY, 
            opacity: sectionTwoOpacity 
          }}
        >
          <div className="w-full h-full flex items-center justify-center">
            {sectionTwo}
          </div>
        </motion.div>

      </div>
    </div>
  );
};
