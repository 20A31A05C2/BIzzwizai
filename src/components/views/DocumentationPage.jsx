import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from '../layout/Navbar';
import Footer from '../sections/Footer';
import VideoSection from '../sections/VideoSection';
import FAQSection from '../sections/FAQSection';
import { Rocket } from 'lucide-react';

const DocumentationPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="bg-black min-h-screen relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-gradient-radial from-bizzwiz-electric-cyan/40 to-transparent blur-2xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-radial from-bizzwiz-magenta-flare/40 to-transparent blur-2xl animate-pulse-slow" />
      </div>

      <Navbar />

      {/* Main content */}
      <motion.div
        className="pt-16 sm:pt-20 md:pt-24 lg:pt-28 xl:pt-32"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Header */}
        <motion.section
          className="relative py-16 md:py-24 bg-gradient-to-b from-bizzwiz-deep-space via-bizzwiz-nebula-purple/10 to-bizzwiz-deep-space/20 border-b border-bizzwiz-comet-tail/10"
          variants={sectionVariants}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            >
              <motion.img
                src="/bizzwizicon.png"
                alt="BizzWiz AI Logo"
                className="w-[120px] sm:w-[150px] md:w-[200px] h-auto mx-auto mb-6"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ duration: 0.3 }}
              />
              <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 text-xs font-roboto-mono tracking-wider text-bizzwiz-magenta-flare bg-bizzwiz-magenta-flare/10 rounded-full border border-bizzwiz-magenta-flare/25">
                <Rocket size={14} className="mr-2 animate-[pulse_1.5s_ease-in-out_infinite]" />
                {t('documentation.badge')}
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-orbitron font-black bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent drop-shadow-[0_0_32px_rgba(255,255,255,0.3)] mb-6 leading-tight">
                {t('documentation.title')}
              </h1>
              <p className="text-lg md:text-xl text-bizzwiz-comet-tail max-w-3xl mx-auto leading-relaxed mb-8">
                {t('documentation.description')}
              </p>
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
                <div className="inline-block rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 p-[2px]">
                  <button 
                    onClick={() => navigate('/register')}
                    className="rounded-full bg-[#0e0e1a] text-white px-8 py-3 font-orbitron font-medium hover:bg-[#1a1a2e] transition-all duration-300 flex items-center gap-2"
                  >
                    <Rocket size={18} className="group-hover:animate-[pulse_1s_ease-in-out_infinite]" />
                    {t('documentation.cta')}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Video Section */}
        <motion.div variants={sectionVariants}>
          <VideoSection />
        </motion.div>

        {/* FAQ Section */}
        <motion.div variants={sectionVariants}>
          <FAQSection />
        </motion.div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default DocumentationPage;