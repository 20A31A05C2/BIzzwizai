"use client";

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const EndingSection = () => {
  const { t } = useTranslation();

  // Animation variants
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

  const itemVariants = {
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

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="flex flex-col items-center justify-center py-16 sm:py-20 text-white text-center px-4 sm:px-6 md:px-8 lg:px-12 bg-black font-montserrat">
      <motion.div 
        className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-4 sm:py-6 md:py-8 lg:py-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div 
          className="p-2 sm:p-4 md:p-6 lg:p-8"
          variants={itemVariants}
        >
          <img
            src="/bizzwizicon.png"
            alt={t('ending.imageAlt')}
            className="w-[150px] h-[150px] xs:w-[180px] xs:h-[180px] sm:w-[220px] sm:h-[220px] md:w-[280px] md:h-[280px] lg:w-[320px] lg:h-[320px] xl:w-[360px] xl:h-[360px] 2xl:w-[400px] 2xl:h-[400px] object-contain mx-auto"
          />
        </motion.div>

        <motion.div 
          className="mt-4 sm:mt-6 md:mt-8 max-w-4xl mx-auto"
          variants={itemVariants}
        >
          <motion.h1 
            className="mt-4 sm:mt-6 md:mt-8 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold tracking-tight bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent drop-shadow-[0_0_32px_rgba(255,255,255,0.3)] leading-tight"
            variants={itemVariants}
          >
            {t('ending.title')}
          </motion.h1>
          
          <motion.p 
            className="mt-3 sm:mt-4 md:mt-5 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-300 max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            {t('ending.description')}
          </motion.p>

          <motion.div 
            className="mt-4 sm:mt-6 md:mt-8 flex justify-center max-w-sm sm:max-w-md md:max-w-lg lg:max-w-none mx-auto"
            variants={buttonVariants}
          >
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/login"
                className="inline-block bg-white text-black px-4 sm:px-5 md:px-6 lg:px-8 py-2 sm:py-2.5 md:py-3 lg:py-4 rounded-full font-medium hover:bg-gray-200 transition-all duration-300 text-sm sm:text-base md:text-lg lg:text-xl hover:scale-105 hover:shadow-lg hover:shadow-white/20"
              >
                {t('ending.cta')}
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default EndingSection;