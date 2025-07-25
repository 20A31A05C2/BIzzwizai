import React from 'react';
import { Rocket, Zap, Target, Trophy, Bell, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function WizLearn() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.4 }}
      className="flex-1 p-4 sm:p-6 md:p-8"
    >
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8 sm:mb-16">
          <div className="w-16 sm:w-24 h-16 sm:h-24 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-2xl shadow-cyan-500/20">
            <Rocket className="w-8 sm:w-12 h-8 sm:h-12 text-white" />
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-light text-white mb-4 sm:mb-6 tracking-wide">WIZ LEARN</h1>
          <p className="text-white/60 font-light text-base sm:text-xl mb-4 sm:mb-8">Plateforme d'apprentissage intelligente</p>
          <div className="inline-flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-orange-500/10 rounded-full">
            <Clock className="w-4 h-4 text-orange-400" />
            <span className="text-orange-400 font-light text-xs sm:text-base">Bientôt disponible</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            whileHover={{ scale: 1.03, boxShadow: '0 8px 32px 0 rgba(34,211,238,0.10)' }}
            transition={{ duration: 0.3 }}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-cyan-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
            <div className="relative bg-[#000011] rounded-2xl p-6 sm:p-8 group-hover:shadow-2xl group-hover:shadow-cyan-500/10 transition-all duration-500">
              <div className="w-12 sm:w-16 h-12 sm:h-16 bg-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Zap className="w-6 sm:w-8 h-6 sm:h-8 text-cyan-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-light text-white mb-2 sm:mb-4">IA Personnalisée</h3>
              <p className="text-white/60 font-light text-xs sm:text-sm">Apprentissage adaptatif basé sur votre profil et objectifs</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            whileHover={{ scale: 1.03, boxShadow: '0 8px 32px 0 rgba(168,85,247,0.10)' }}
            transition={{ duration: 0.3 }}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
            <div className="relative bg-[#000011] rounded-2xl p-6 sm:p-8 group-hover:shadow-2xl group-hover:shadow-purple-500/10 transition-all duration-500">
              <div className="w-12 sm:w-16 h-12 sm:h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Target className="w-6 sm:w-8 h-6 sm:h-8 text-purple-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-light text-white mb-2 sm:mb-4">Objectifs Intelligents</h3>
              <p className="text-white/60 font-light text-xs sm:text-sm">Définition automatique d'objectifs basés sur vos projets</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            whileHover={{ scale: 1.03, boxShadow: '0 8px 32px 0 rgba(236,72,153,0.10)' }}
            transition={{ duration: 0.3 }}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
            <div className="relative bg-[#000011] rounded-2xl p-6 sm:p-8 group-hover:shadow-2xl group-hover:shadow-pink-500/10 transition-all duration-500">
              <div className="w-12 sm:w-16 h-12 sm:h-16 bg-pink-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Trophy className="w-6 sm:w-8 h-6 sm:h-8 text-pink-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-light text-white mb-2 sm:mb-4">Gamification</h3>
              <p className="text-white/60 font-light text-xs sm:text-sm">Système de récompenses et défis pour maintenir la motivation</p>
            </div>
          </motion.div>
        </div>
        <button className="relative group/btn">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-600/50 to-blue-500/50 rounded-2xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 blur-sm"></div>
          <div className="relative px-8 sm:px-12 py-3 sm:py-4 bg-gradient-to-r from-cyan-600/20 to-blue-500/20 rounded-2xl text-white font-light hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 flex items-center space-x-2 sm:space-x-3">
            <Bell className="w-4 sm:w-5 h-4 sm:h-5" />
            <span className="text-xs sm:text-base">Me notifier du lancement</span>
          </div>
        </button>
      </div>
    </motion.div>
  );
}

export default WizLearn;