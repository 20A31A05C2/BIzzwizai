import { motion } from 'framer-motion';
import React from 'react';
import { useTranslation } from 'react-i18next';

const WaitingValidationPage = () => {
  const { t } = useTranslation();

  const handleNavigateToLogin = () => {
    // If user is logged in, go to dashboard, else go to login
    if (localStorage.getItem('bizwizusertoken') || localStorage.getItem('bizwizuser_id')) {
      window.location.href = '/login';
    } 
    // else {
    //   window.location.href = '/login';
    // }
  };

  // Determine button text based on login status
  const isLoggedIn = localStorage.getItem('bizwizusertoken') || localStorage.getItem('bizwizuser_id');

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center">
      {/* Main content container */}
      <div className="relative z-10 bg-transparent p-6 max-w-2xl w-full text-center border-2 border-[#00d4ff]/20 rounded-xl shadow-lg">
        {/* Character image */}
        <div className="flex justify-center mb-4">
          <img
            src="image.png" // Replace with the correct path to the character image
            alt={t('waitingValidation.imageAlt')}
            className="w-32 h-32 object-contain"
          />
        </div>

        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-[#00d4ff] mb-2">
            {t('waitingValidation.title')}
          </h1>
          <p className="text-sm sm:text-base text-gray-400 mb-4">
            {t('waitingValidation.description')}
          </p>
          <div className="flex items-center justify-center mb-4">
            <span className="text-[#00d4ff] mr-2">⏳</span>
            <p className="text-sm sm:text-base text-gray-400">
              {t('waitingValidation.confirmationMessage')}
            </p>
          </div>
        </motion.div>

        {/* Decorative dots */}
        <div className="flex justify-center text-[#00d4ff] text-xs">
          <span>•••</span>
        </div>

        {/* Enhanced button with advanced effects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex justify-center mt-6"
        >
          <motion.button
            onClick={handleNavigateToLogin}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 15px 35px rgba(0, 212, 255, 0.4), 0 0 0 1px rgba(0, 212, 255, 0.3)',
            }}
            whileTap={{ scale: 0.95 }}
            className="relative bg-[#00d4ff] hover:bg-[#00b7e6] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg overflow-hidden"
          >
            {/* Button background effects */}
            <div className="absolute inset-0 bg-purple-400" />
            <span className="relative z-10 flex items-center gap-2">
              {t('waitingValidation.buttonText')}
              <motion.span
                animate={{
                  x: [0, 3, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                →
              </motion.span>
            </span>
          </motion.button>
        </motion.div>
      </div>

      {/* Enhanced floating decorations */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.7, 0.3],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 left-1/4 w-3 h-3 bg-[#00d4ff] rounded-full opacity-30"
        style={{
          boxShadow: '0 0 15px rgba(0, 212, 255, 0.5)',
        }}
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          opacity: [0.2, 0.6, 0.2],
          rotate: [0, -15, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-1/4 right-1/4 w-4 h-4 bg-[#00d4ff] rounded-full opacity-20"
        style={{
          boxShadow: '0 0 20px rgba(0, 212, 255, 0.4)',
        }}
      />
    </div>
  );
};

export default WaitingValidationPage;