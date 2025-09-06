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
        <motion.div variants={sectionVariants} className="pb-8 sm:pb-12 md:pb-16 lg:pb-20 xl:pb-24">
          <HeroSection />
        </motion.div>

        {/* Our Works Section */}
        <motion.div 
          variants={sectionVariants}
          className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24"
        >
          <OurWorksSection />
        </motion.div>

        {/* How It Works Section */}
        <motion.div 
          variants={sectionVariants}
          className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24"
        >
          <HowItWorksSection />
        </motion.div>

        {/* Features Section */}
        <motion.div 
          variants={sectionVariants}
          className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24"
        >
          <FeaturesSection />
        </motion.div>

        {/* Contact Section */}
        <motion.div 
          variants={sectionVariants}
          className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24"
        >
          <Contact />
        </motion.div>

        {/* Ending Section */}
        <motion.div 
          variants={sectionVariants}
          className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24"
        >
          <EndingSection />
        </motion.div>

        {/* Footer */}
        <motion.div variants={sectionVariants} className="pt-8 sm:pt-12 md:pt-16 lg:pt-20 xl:pt-24">
          <Footer />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LandingPage;
