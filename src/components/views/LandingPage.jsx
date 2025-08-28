// import React from 'react';
// import { motion } from 'framer-motion';
// import Navbar from '../layout/Navbar';
// import HeroSection from '../sections/HeroSection';
// import HowItWorksSection from '../sections/HowItWorksSection';
// import OurWorksSection from '../sections/OurWorksSection';
// import Footer from '../sections/Footer';
// import Contact from '../sections/Contact';
// import FeaturesSection from '../sections/FeaturesSection';
// import EndingSection from '../sections/EndingSection';
// import { StickyRocketTransition } from '../sections/StickyRocketTransition';

// const LandingPage = () => {
//   // Animation variants for staggered section reveals
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//         delayChildren: 0.1
//       }
//     }
//   };

//   const sectionVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.6,
//         ease: "easeOut"
//       }
//     }
//   };

//   return (
//     <div className="bg-black min-h-screen">
//       <Navbar />
      
//       {/* Main content with consistent spacing */}
//       <motion.div 
//         className="pt-16 sm:pt-20 md:pt-24 lg:pt-28 xl:pt-32"
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         {/* Hero Section */}
//         <motion.div variants={sectionVariants}>
//           <HeroSection />
//         </motion.div>

//         {/* Our Works Section with consistent spacing */}
//         <motion.div 
//           className="py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32"
//           variants={sectionVariants}
//         >
//           <OurWorksSection />
//         </motion.div>

//         {/* Sticky Rocket Transition Section */}
//         <motion.div variants={sectionVariants}>
//           <StickyRocketTransition>
//             <HowItWorksSection />
//             <FeaturesSection />
//           </StickyRocketTransition>
//         </motion.div>

//         {/* Contact Section with minimal spacing */}
//         <motion.div variants={sectionVariants}>
//           <Contact />
//         </motion.div>

//         {/* Ending Section with minimal spacing */}
//         <motion.div variants={sectionVariants}>
//           <EndingSection />
//         </motion.div>

//         {/* Footer */}
//         <motion.div variants={sectionVariants}>
//           <Footer />
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

// export default LandingPage;

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../layout/Navbar';
import HeroSection from '../sections/HeroSection';
import HowItWorksSection from '../sections/HowItWorksSection';
import OurWorksSection from '../sections/OurWorksSection';
import Footer from '../sections/Footer';
import Contact from '../sections/Contact';
import FeaturesSection from '../sections/FeaturesSection';
import EndingSection from '../sections/EndingSection';

const LandingPage = () => {
  // Animation variants for staggered section reveals
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="bg-black">
      <Navbar />
      
      {/* Main content with responsive spacing */}
      <motion.div 
        className="pt-16 sm:pt-20 md:pt-24 lg:pt-28 xl:pt-32"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <motion.div variants={sectionVariants} className="pb-12 sm:pb-16 md:pb-20 lg:pb-24 xl:pb-28">
          <HeroSection />
        </motion.div>

        {/* Our Works Section */}
        <motion.div 
          variants={sectionVariants}
          className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28"
        >
          <OurWorksSection />
        </motion.div>

        {/* How It Works Section */}
        <motion.div 
          variants={sectionVariants}
          className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28"
        >
          <HowItWorksSection />
        </motion.div>

        {/* Features Section */}
        <motion.div 
          variants={sectionVariants}
          className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28"
        >
          <FeaturesSection />
        </motion.div>

        {/* Contact Section */}
        <motion.div 
          variants={sectionVariants}
          className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28"
        >
          <Contact />
        </motion.div>

        {/* Ending Section */}
        <motion.div 
          variants={sectionVariants}
          className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28"
        >
          <EndingSection />
        </motion.div>

        {/* Footer */}
        <motion.div variants={sectionVariants} className="pt-12 sm:pt-16 md:pt-20 lg:pt-24 xl:pt-28">
          <Footer />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LandingPage;
