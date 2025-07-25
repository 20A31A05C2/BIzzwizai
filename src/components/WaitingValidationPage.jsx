import React from 'react';
import { motion } from 'framer-motion';

const WaitingValidationPage = () => {
  const handleNavigateToLogin = () => {
    // If user is logged in, go to dashboard, else go to login
    if (localStorage.getItem('bizwizusertoken') || localStorage.getItem('bizwizuser_id')) {
      window.location.href = '/select-project';
    } else {
      window.location.href = '/login';
    }
  };

  // Determine button text based on login status
  const isLoggedIn = localStorage.getItem('bizwizusertoken') || localStorage.getItem('bizwizuser_id');

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-bizzwiz-deep-space text-bizzwiz-star-white px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Enhanced background with particle system */}
      <div className="absolute inset-0">
        {/* Floating particles */}
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: '#8f00ff',
              boxShadow: '0 0 10px rgba(143, 0, 255, 0.3)',
            }}
            animate={{
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.5, 1],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
          />
        ))}
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#8f00ff]/5 to-transparent" />
      </div>

      {/* Main content with enhanced styling */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 max-w-2xl w-full"
      >
        {/* Enhanced title with advanced effects */}
        <motion.div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-2xl sm:text-3xl md:text-4xl font-orbitron font-bold text-[#8f00ff] mb-4 relative inline-block"
          >
            <motion.span
              animate={{
                textShadow: [
                  '0 0 20px rgba(143, 0, 255, 0.4), 0 0 40px rgba(143, 0, 255, 0.2)',
                  '0 0 30px rgba(143, 0, 255, 0.6), 0 0 60px rgba(143, 0, 255, 0.3)',
                  '0 0 20px rgba(143, 0, 255, 0.4), 0 0 40px rgba(143, 0, 255, 0.2)'
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              ⏳ Rendez-vous enregistré
            </motion.span>
            
            {/* Decorative underline */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-[#8f00ff] to-transparent opacity-50"
            />
          </motion.h1>
        </motion.div>
        
        {/* Enhanced content card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative group mb-8"
        >
          {/* Card background with enhanced effects */}
          <div className="absolute inset-0 bg-bizzwiz-star-white/5 backdrop-blur-sm rounded-2xl border border-bizzwiz-star-white/10 group-hover:border-[#8f00ff]/20 transition-all duration-500" />
          
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#8f00ff]/0 via-[#8f00ff]/5 to-[#8f00ff]/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10 p-8">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-base sm:text-lg text-bizzwiz-comet-tail text-center max-w-xl mx-auto leading-relaxed"
            >
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                Merci ! Votre rendez-vous a bien été enregistré.
              </motion.span>
              <br /><br />
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                L'un de nos consultants vous contactera sous 24 heures pour vérifier la viabilité de votre projet.
                Veuillez rester disponible.
              </motion.span>
            </motion.p>
          </div>
        </motion.div>

        {/* Enhanced button with advanced effects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex justify-center"
        >
          <motion.button
            onClick={handleNavigateToLogin}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 15px 35px rgba(143, 0, 255, 0.4), 0 0 0 1px rgba(143, 0, 255, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            className="relative bg-[#8f00ff] hover:bg-[#7a00e6] text-bizzwiz-star-white font-semibold py-4 px-10 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden group"
          >
            {/* Button background effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#8f00ff] to-[#9f10ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] skew-x-12"
              animate={{
                translateX: ['-100%', '100%']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut"
              }}
            />
            
            {/* Pulse effect */}
            <motion.div
              className="absolute inset-0 rounded-xl border-2 border-[#8f00ff]/50"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <span className="relative z-10 flex items-center gap-2">
              {isLoggedIn ? 'Dashboard' : 'Se connecter'}
              <motion.span
                animate={{
                  x: [0, 3, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                →
              </motion.span>
            </span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Enhanced floating decorations */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.7, 0.3],
          rotate: [0, 10, 0]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-1/4 w-3 h-3 bg-[#8f00ff] rounded-full opacity-30"
        style={{
          boxShadow: '0 0 15px rgba(143, 0, 255, 0.5)'
        }}
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          opacity: [0.2, 0.6, 0.2],
          rotate: [0, -15, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-1/4 right-1/4 w-4 h-4 bg-[#8f00ff] rounded-full opacity-20"
        style={{
          boxShadow: '0 0 20px rgba(143, 0, 255, 0.4)'
        }}
      />
      
      {/* Additional ambient decorations */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/3 right-1/3 w-2 h-2 bg-[#8f00ff] rounded-full opacity-20"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.4, 0.15]
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-[#8f00ff] rounded-full opacity-15"
      />
    </div>
  );
};

export default WaitingValidationPage;
