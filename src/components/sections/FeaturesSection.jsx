import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, Eye, Figma, Map, BarChart3, CreditCard,
  Mail, TrendingUp, Target, FileCode
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FeaturesSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
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

  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const bizzHubFeatures = [
    { icon: <FileText className="w-5 h-5 sm:w-6 sm:h-6" />, title: "features.bizzHub.aiBusinessPlanTitle", description: "features.bizzHub.aiBusinessPlanDescription" },
    { icon: <Eye className="w-5 h-5 sm:w-6 sm:h-6" />, title: "features.bizzHub.logoIdentityTitle", description: "features.bizzHub.logoIdentityDescription" },
    { icon: <Figma className="w-5 h-5 sm:w-6 sm:h-6" />, title: "features.bizzHub.figmaMockupTitle", description: "features.bizzHub.figmaMockupDescription" },
    { icon: <Map className="w-5 h-5 sm:w-6 sm:h-6" />, title: "features.bizzHub.quoteRoadmapTitle", description: "features.bizzHub.quoteRoadmapDescription" },
    { icon: <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6" />, title: "features.bizzHub.liveDashboardTitle", description: "features.bizzHub.liveDashboardDescription" }
  ];

  const wizGrowFeatures = [
    { icon: <CreditCard className="w-5 h-5 sm:w-6 sm:h-6" />, title: "features.wizGrow.miniCrmTitle", description: "features.wizGrow.miniCrmDescription" },
    { icon: <Mail className="w-5 h-5 sm:w-6 sm:h-6" />, title: "features.wizGrow.aiEmailingTitle", description: "features.wizGrow.aiEmailingDescription" },
    { icon: <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />, title: "features.wizGrow.seoAnalysisTitle", description: "features.wizGrow.seoAnalysisDescription" },
    { icon: <Target className="w-5 h-5 sm:w-6 sm:h-6" />, title: "features.wizGrow.marketingFunnelTitle", description: "features.wizGrow.marketingFunnelDescription" },
    { icon: <FileCode className="w-5 h-5 sm:w-6 sm:h-6" />, title: "features.wizGrow.templatesScriptsTitle", description: "features.wizGrow.templatesScriptsDescription" }
  ];

  return (
    <div className="w-full bg-black font-montserrat p-0">
      <motion.div 
        className="max-w-7xl w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16 lg:py-20 pb-16 sm:pb-20 md:pb-24 lg:pb-28 xl:pb-32"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div 
          className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24"
          variants={sectionVariants}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 md:mb-8 bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent drop-shadow-[0_0_32px_rgba(255,255,255,0.3)]">
            {t('features.title')}
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {t('features.description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          {/* BIZZ HUB Section */}
          <motion.div 
            className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl lg:rounded-[2rem] xl:rounded-[2.5rem] p-6 sm:p-8 md:p-10 lg:p-12 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] transition-all duration-300 group hover:scale-[1.02]"
            variants={sectionVariants}
            whileHover={{ y: -5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-2xl sm:rounded-3xl lg:rounded-[2rem] xl:rounded-[2.5rem] pointer-events-none" />
            <div className="flex items-center mb-6 sm:mb-8 md:mb-10">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-lg sm:rounded-xl lg:rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center border border-purple-400/20 mr-3 sm:mr-4 md:mr-5">
                <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded" />
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">
                {t('features.bizzHub.title')}
              </h3>
            </div>
            <p className="text-gray-400 mb-6 sm:mb-8 md:mb-10 text-sm sm:text-base md:text-lg">
              {t('features.bizzHub.description')}
            </p>
            <div className="space-y-3 sm:space-y-4 md:space-y-5">
              {bizzHubFeatures.map((feature, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl lg:rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group-hover:scale-[1.02]"
                  variants={featureVariants}
                  whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.08)" }}
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-md sm:rounded-lg lg:rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center border border-purple-400/20 mr-3 sm:mr-4 md:mr-5 text-purple-300 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent mb-1 text-sm sm:text-base md:text-lg">{t(feature.title)}</h4>
                    <p className="text-xs sm:text-sm md:text-base text-gray-400 leading-relaxed">{t(feature.description)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* WIZ GROW Section */}
          <motion.div 
            className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl lg:rounded-[2rem] xl:rounded-[2.5rem] p-6 sm:p-8 md:p-10 lg:p-12 shadow-[0_12px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)] transition-all duration-300 group hover:scale-[1.02]"
            variants={sectionVariants}
            whileHover={{ y: -5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent rounded-2xl sm:rounded-3xl lg:rounded-[2rem] xl:rounded-[2.5rem] pointer-events-none" />
            <div className="flex items-center mb-6 sm:mb-8 md:mb-10">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-lg sm:rounded-xl lg:rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center border border-blue-400/20 mr-3 sm:mr-4 md:mr-5">
                <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded" />
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">
                {t('features.wizGrow.title')}
              </h3>
            </div>
            <p className="text-gray-400 mb-6 sm:mb-8 md:mb-10 text-sm sm:text-base md:text-lg">
              {t('features.wizGrow.description')}
            </p>
            <div className="space-y-3 sm:space-y-4 md:space-y-5">
              {wizGrowFeatures.map((feature, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl lg:rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group-hover:scale-[1.02]"
                  variants={featureVariants}
                  whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.08)" }}
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-md sm:rounded-lg lg:rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center border border-blue-400/20 mr-3 sm:mr-4 md:mr-5 text-blue-300 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent mb-1 text-sm sm:text-base md:text-lg">{t(feature.title)}</h4>
                    <p className="text-xs sm:text-sm md:text-base text-gray-400 leading-relaxed">{t(feature.description)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="text-center mt-12 sm:mt-16 md:mt-20 lg:mt-24"
          variants={sectionVariants}
        >
          <motion.div 
            onClick={() => navigate('/register')}
            className="inline-flex items-center px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-4 md:py-5 lg:py-6 rounded-full backdrop-blur-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group hover:scale-105"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent font-semibold mr-2 text-sm sm:text-base md:text-lg lg:text-xl">
              {t('features.cta')}
            </span>
            <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FeaturesSection;
