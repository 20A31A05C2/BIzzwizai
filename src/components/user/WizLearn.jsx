import React from 'react';
import { Rocket, Zap, Target, Trophy, Bell, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

function WizLearn() {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-[calc(100vh-var(--navbar-height,68px))] bg-black flex items-center justify-center p-4 sm:p-6 md:p-8"
    >
      <div className="max-w-7xl w-full bg-white/10 backdrop-blur-3xl rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8 md:p-10 text-center">
        <div className="mb-8 sm:mb-12">
          <div className="w-16 sm:w-20 h-16 sm:h-20 bg-cyan-600/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-6 sm:mb-8 border border-cyan-500/30">
            <Rocket className="w-8 sm:w-10 h-8 sm:h-10 text-cyan-300" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-3 font-montserrat">
            {t('wizLearn.title')}
          </h1>
          <p className="text-gray-300 text-base sm:text-lg font-medium font-montserrat mb-4 sm:mb-6">
            {t('wizLearn.description')}
          </p>
          <div className="inline-flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <Clock className="w-5 h-5 text-gray-300" />
            <span className="text-gray-300 text-sm font-medium font-montserrat">{t('wizLearn.comingSoon')}</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-lg border border-white/20 hover:border-white/40 hover:shadow-lg hover:shadow-white/20 transition-all duration-300"
          >
            <div className="p-6">
              <div className="w-12 h-12 bg-cyan-600/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4 border border-cyan-500/30">
                <Zap className="w-6 h-6 text-cyan-300" />
              </div>
              <h3 className="text-xl font-semibold text-white bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-3 font-montserrat">
                {t('wizLearn.features.personalizedAI.header')}
              </h3>
              <p className="text-gray-200 text-sm font-medium font-montserrat">
                {t('wizLearn.features.personalizedAI.description')}
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-lg border border-white/20 hover:border-white/40 hover:shadow-lg hover:shadow-white/20 transition-all duration-300"
          >
            <div className="p-6">
              <div className="w-12 h-12 bg-purple-600/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4 border border-purple-500/30">
                <Target className="w-6 h-6 text-purple-300" />
              </div>
              <h3 className="text-xl font-semibold text-white bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-3 font-montserrat">
                {t('wizLearn.features.smartGoals.header')}
              </h3>
              <p className="text-gray-200 text-sm font-medium font-montserrat">
                {t('wizLearn.features.smartGoals.description')}
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-lg border border-white/20 hover:border-white/40 hover:shadow-lg hover:shadow-white/20 transition-all duration-300"
          >
            <div className="p-6">
              <div className="w-12 h-12 bg-pink-600/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4 border border-pink-500/30">
                <Trophy className="w-6 h-6 text-pink-300" />
              </div>
              <h3 className="text-xl font-semibold text-white bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-3 font-montserrat">
                {t('wizLearn.features.gamification.header')}
              </h3>
              <p className="text-gray-200 text-sm font-medium font-montserrat">
                {t('wizLearn.features.gamification.description')}
              </p>
            </div>
          </motion.div>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 sm:px-12 py-3 bg-cyan-600/20 backdrop-blur-sm rounded-xl text-cyan-300 font-medium hover:bg-cyan-600/30 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 border border-cyan-500/30 flex items-center space-x-3 mx-auto font-montserrat"
          aria-label={t('wizLearn.notifyButton')}
        >
          <Bell className="w-5 h-5" />
          <span className="text-sm sm:text-base">{t('wizLearn.notifyButton')}</span>
        </motion.button>
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
        .hover\:scale-102:hover {
          transform: scale(1.02);
        }
        .hover\:scale-105:hover {
          transform: scale(1.05);
        }
        .active\:scale-95:active {
          transform: scale(0.95);
        }
        .font-montserrat {
          font-family: 'Montserrat', sans-serif;
        }
      `}</style>
    </motion.div>
  );
}

export default WizLearn;