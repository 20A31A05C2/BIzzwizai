import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { useTranslation } from 'react-i18next';

const CookiePolicy = () => {
  const { t, i18n } = useTranslation();

  // Animation variants similar to other sections
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const isRtl = i18n.language === 'ar';

  return (
    <div className={`min-h-screen bg-black text-white font-montserrat ${isRtl ? 'rtl' : ''}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <Navbar />

      <motion.section 
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-16 sm:py-20 md:py-24 lg:py-28"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 sm:mb-12 md:mb-16 text-center bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent drop-shadow-[0_0_32px_rgba(255,255,255,0.3)]"
          variants={sectionVariants}
        >
          {t('cookiePolicy.title')}
        </motion.h1>

        <motion.p 
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto mb-8 sm:mb-12 md:mb-16 leading-relaxed text-center"
          variants={itemVariants}
        >
          {t('cookiePolicy.intro')}
        </motion.p>

        <div className="space-y-8 sm:space-y-12 md:space-y-16 max-w-4xl mx-auto">
          {/* Section 1 */}
          <motion.div variants={itemVariants}>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-6 bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">
              {t('cookiePolicy.usage.title')}
            </h2>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed mb-4">
              {t('cookiePolicy.usage.intro')}
            </p>
            <ul className="list-disc pl-5 sm:pl-6 md:pl-8 space-y-2 text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
              <li>{t('cookiePolicy.usage.items.improveExperience')}</li>
              <li>{t('cookiePolicy.usage.items.collectStats')}</li>
            </ul>
          </motion.div>

          {/* Section 2 */}
          <motion.div variants={itemVariants}>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-6 bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">
              {t('cookiePolicy.consent.title')}
            </h2>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
              {t('cookiePolicy.consent.description')}
            </p>
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default CookiePolicy;