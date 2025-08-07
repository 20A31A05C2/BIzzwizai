import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// This is a self-contained rocket component for use within the transition.
const Rocket = () => (
  <div className="flex justify-center items-center flex-col">
    <div className="relative flex flex-col items-center">
      <img
        src="/rocket.png"
        alt="Rocket"
        className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] object-contain z-20 relative"
      />
      <img
        src="/fire.png"
        alt="Rocket Fire"
        className="w-[800px] h-[800px] sm:w-[1000px] sm:h-[1000px] object-contain -mt-48 sm:-mt-60 z-10"
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

  // --- ADJUSTED TIMING FOR LONGER INVISIBLE SCROLL ---

  // Fade out the first section (HowItWorks)
  const sectionOneOpacity = useTransform(
    scrollYProgress,
    [0.65, 0.75], // Fades out LATER, as section two covers it
    [1, 0]
  );
    
  // Animate the rocket
  const rocketScale = useTransform(
    scrollYProgress, 
    [0.5, 0.6], // Rocket appears LATER (after 50% scroll)
    [0.5, 1]
  );
  const rocketY = useTransform(
    scrollYProgress,
    [0.5, 0.65, 0.9], // Animation starts at 50% scroll
    ["100vh", "20vh", "-100vh"]
  );
  
  // Animate the second section (Features)
  const sectionTwoY = useTransform(
    scrollYProgress,
    [0.65, 0.8], // Starts sliding in LATER (at 65%)
    ["100vh", "0vh"]
  );
  const sectionTwoOpacity = useTransform(
      scrollYProgress,
      [0.65, 0.7], // Fades in as it slides
      [0, 1]
  );

  return (
    // UPDATED: Container is now taller for more scroll room
    <div ref={containerRef} className="h-[400vh] relative">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        
        <motion.div className="absolute inset-0" style={{ opacity: sectionOneOpacity }}>
          {sectionOne}
        </motion.div>

        <motion.div className="absolute inset-0 z-10" style={{ y: rocketY, scale: rocketScale }}>
          <Rocket />
        </motion.div>
        
        <motion.div 
            className="absolute inset-0 z-20" 
            style={{ y: sectionTwoY, opacity: sectionTwoOpacity }}
        >
          {sectionTwo}
        </motion.div>
      </div>
    </div>
  );
};