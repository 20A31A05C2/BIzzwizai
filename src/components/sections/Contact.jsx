import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, User, MessageSquare, CheckCircle, Heart } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import ApiService from '../../apiService'; // Corrected: Reverted to relative path to resolve the error.

const COLOR_VARIANTS = {
  primary: {
    border: ["border-emerald-500/60", "border-cyan-400/50", "border-slate-600/30"],
    gradient: "from-emerald-500/30",
    accent: "emerald-500",
  },
  secondary: {
    border: ["border-violet-500/60", "border-fuchsia-400/50", "border-slate-600/30"],
    gradient: "from-violet-500/30",
    accent: "violet-500",
  },
  tertiary: {
    border: ["border-orange-500/60", "border-yellow-400/50", "border-slate-600/30"],
    gradient: "from-orange-500/30",
    accent: "orange-500",
  },
  quaternary: {
    border: ["border-purple-500/60", "border-pink-400/50", "border-slate-600/30"],
    gradient: "from-purple-500/30",
    accent: "purple-500",
  },
};

const ContactUs = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [currentVariant, setCurrentVariant] = useState("primary");
  
  const variants = Object.keys(COLOR_VARIANTS);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVariant(prevVariant => {
        const currentIndex = variants.indexOf(prevVariant);
        const nextIndex = (currentIndex + 1) % variants.length;
        return variants[nextIndex];
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [variants]);

  const variantStyles = COLOR_VARIANTS[currentVariant];

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

  const formVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.2
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error(t('contactUs.errorEmptyFields'), {
        style: {
          background: 'rgba(255, 0, 0, 0.2)',
          color: '#fff',
          border: '1px solid rgba(255, 0, 0, 0.3)',
          borderRadius: '12px',
          backdropFilter: 'blur(8px)',
        },
        iconTheme: {
          primary: '#ef4444',
          secondary: '#fff',
        },
      });
      return;
    }
    
    setIsSubmitting(true);
    try {
      // This call format assumes ApiService is a function that takes (url, method, data)
      await ApiService('/contact', 'POST', { 
        name: formData.name, 
        email: formData.email, 
        message: formData.message 
      });
      
      toast.success(t('contactUs.successMessage'), {
        style: {
          background: 'rgba(0, 255, 0, 0.2)',
          color: '#fff',
          border: '1px solid rgba(0, 255, 0, 0.3)',
          borderRadius: '12px',
          backdropFilter: 'blur(8px)',
        },
        iconTheme: {
          primary: '#10b981',
          secondary: '#fff',
        },
      });
      
      setFormData({ name: '', email: '', message: '' });
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (err) {
      toast.error(t('contactUs.errorSubmit'), {
        style: {
          background: 'rgba(255, 0, 0, 0.2)',
          color: '#fff',
          border: '1px solid rgba(255, 0, 0, 0.3)',
          borderRadius: '12px',
          backdropFilter: 'blur(8px)',
        },
        iconTheme: {
          primary: '#ef4444',
          secondary: '#fff',
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-black font-montserrat overflow-hidden mt-40">
      <Toaster position="top-right" />
      
      {/* Animated Background Circles - Responsive */}
      <div className="absolute inset-0">
        <motion.div className="absolute top-10 sm:top-20 md:top-24 lg:top-32 left-1/4 h-[200px] w-[200px] xs:h-[250px] xs:w-[250px] sm:h-[400px] sm:w-[400px] md:h-[500px] md:w-[500px] lg:h-[600px] lg:w-[600px] opacity-40">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className={`absolute inset-0 rounded-full border bg-gradient-to-br to-transparent ${variantStyles.border[i]} ${variantStyles.gradient}`}
              animate={{
                rotate: 360,
                scale: [1, 1.1 + i * 0.05, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 12 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
        
        <motion.div className="absolute bottom-10 sm:bottom-20 md:bottom-24 lg:bottom-32 right-1/4 h-[150px] w-[150px] xs:h-[200px] xs:w-[200px] sm:h-[300px] sm:w-[300px] md:h-[350px] md:w-[350px] lg:h-[400px] lg:w-[400px] opacity-30">
          {[0, 1].map((i) => (
            <motion.div
              key={i}
              className={`absolute inset-0 rounded-full border bg-gradient-to-br to-transparent ${variantStyles.border[i]} ${variantStyles.gradient}`}
              animate={{
                rotate: -360,
                scale: [1, 1.2 + i * 0.1, 1],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 15 + i * 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Background Glow Effects */}
      <div className="absolute inset-0 [mask-image:radial-gradient(70%_50%_at_40%_40%,#000_30%,transparent)]">
        <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_center,${variantStyles.gradient.replace("from-", "")}/15%,transparent_70%)] blur-[60px] sm:blur-[80px] md:blur-[100px] lg:blur-[120px] xl:blur-[150px]`} />
      </div>

      <section id="contact" className="relative z-10 py-0 px-4 sm:px-6 md:px-8 lg:px-12">
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-4 sm:py-6 md:py-8 lg:py-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex flex-col lg:flex-row gap-12 sm:gap-16 md:gap-20 lg:gap-24 items-center">
            {/* Left Side: Info */}
            <motion.div 
              className="flex-1 min-w-0 w-full lg:min-w-[300px] text-center lg:text-left"
              variants={sectionVariants}
            >
              <motion.h1 
                className="flex items-center justify-center lg:justify-start gap-3 sm:gap-4 md:gap-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6 sm:mb-8 md:mb-10"
                variants={sectionVariants}
              >
                <span className="bg-gradient-to-br from-white via-gray-100 to-gray-300 bg-clip-text text-transparent drop-shadow-[0_0_32px_rgba(255,255,255,0.3)]">
                  {t('contactUs.title')}
                </span>
                <Heart className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 text-white fill-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] flex-shrink-0" />
              </motion.h1>
              
              <motion.div
                variants={sectionVariants}
              >
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 leading-relaxed mb-8 sm:mb-12 md:mb-16 font-medium max-w-2xl mx-auto lg:mx-0">
                  {t('contactUs.description')}
                </p>

                {/* Contact Info Cards */}
                <div className="space-y-4 sm:space-y-6 md:space-y-8 max-w-md mx-auto lg:mx-0">
                  <motion.div 
                    className="flex items-center gap-3 sm:gap-4 md:gap-5 p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl lg:rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md group hover:scale-[1.02] transition-all duration-300"
                    whileHover={{ y: -2, backgroundColor: "rgba(255,255,255,0.08)" }}
                  >
                    <div className={`p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl lg:rounded-2xl bg-gradient-to-br ${variantStyles.gradient} to-transparent border border-white/20`}>
                      <Mail className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm sm:text-base md:text-lg">{t('contactUs.emailTitle')}</p>
                      <p className="text-gray-400 text-xs sm:text-sm md:text-base">contact@bizzwiz.ai</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="flex items-center gap-3 sm:gap-4 md:gap-5 p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl lg:rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md group hover:scale-[1.02] transition-all duration-300"
                    whileHover={{ y: -2, backgroundColor: "rgba(255,255,255,0.08)" }}
                  >
                    <div className={`p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl lg:rounded-2xl bg-gradient-to-br ${variantStyles.gradient} to-transparent border border-white/20`}>
                      <MessageSquare className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm sm:text-base md:text-lg">{t('contactUs.responseTimeTitle')}</p>
                      <p className="text-gray-400 text-xs sm:text-sm md:text-base">{t('contactUs.responseTimeDescription')}</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Side: Enhanced Form */}
            <motion.div 
              className="flex-1 min-w-0 w-full lg:min-w-[300px] max-w-2xl mx-auto lg:mx-0"
              variants={formVariants}
            >
              <div className="relative p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 rounded-2xl sm:rounded-3xl lg:rounded-[2rem] border border-white/20 bg-black/30 backdrop-blur-xl shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl sm:rounded-3xl lg:rounded-[2rem]" />
                
                <form onSubmit={handleContactSubmit} className="relative space-y-6 sm:space-y-8 md:space-y-10">
                  {/* Name Field */}
                  <div className="space-y-2 sm:space-y-3">
                    <label htmlFor="name" className="flex items-center gap-2 text-white font-semibold text-base sm:text-lg md:text-xl">
                      <User className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                      {t('contactUs.nameLabel')}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-3 sm:p-4 md:p-5 border-2 border-white/20 bg-white/5 focus:border-white/40 rounded-xl sm:rounded-2xl lg:rounded-3xl text-white placeholder-gray-400 backdrop-blur-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/20 focus:bg-white/10 text-sm sm:text-base md:text-lg"
                        placeholder={t('contactUs.namePlaceholder')}
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2 sm:space-y-3">
                    <label htmlFor="email" className="flex items-center gap-2 text-white font-semibold text-base sm:text-lg md:text-xl">
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                      {t('contactUs.emailLabel')}
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 sm:p-4 md:p-5 border-2 border-white/20 bg-white/5 focus:border-white/40 rounded-xl sm:rounded-2xl lg:rounded-3xl text-white placeholder-gray-400 backdrop-blur-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/20 focus:bg-white/10 text-sm sm:text-base md:text-lg"
                        placeholder={t('contactUs.emailPlaceholder')}
                      />
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2 sm:space-y-3">
                    <label htmlFor="message" className="flex items-center gap-2 text-white font-semibold text-base sm:text-lg md:text-xl">
                      <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                      {t('contactUs.messageLabel')}
                    </label>
                    <div className="relative">
                      <textarea
                        id="message"
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full p-3 sm:p-4 md:p-5 border-2 border-white/20 bg-white/5 focus:border-white/40 rounded-xl sm:rounded-2xl lg:rounded-3xl text-white placeholder-gray-400 backdrop-blur-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/20 focus:bg-white/10 resize-none text-sm sm:text-base md:text-lg"
                        placeholder={t('contactUs.messagePlaceholder')}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 sm:py-4 md:py-5 lg:py-6 px-6 sm:px-8 md:px-10 lg:px-12 rounded-xl sm:rounded-2xl lg:rounded-3xl font-bold text-base sm:text-lg md:text-xl transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 md:gap-4 ${
                      isSubmitting 
                        ? 'bg-white/20 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 hover:scale-[1.02] active:scale-[0.98]'
                    } text-white border border-white/30 backdrop-blur-md shadow-xl`}
                    whileHover={!isSubmitting ? { boxShadow: "0 0 30px rgba(255,255,255,0.2)" } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        {t('contactUs.submitting')}
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                        {t('contactUs.submitButton')}
                      </>
                    )}
                  </motion.button>

                  {/* Success Message */}
                  {submitSuccess && (
                    <motion.div
                      className="p-4 sm:p-6 md:p-8 bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 rounded-xl sm:rounded-2xl lg:rounded-3xl border border-green-500/30 backdrop-blur-md"
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                      <div className="flex items-center gap-3 sm:gap-4">
                        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-green-400 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-white text-sm sm:text-base md:text-lg">{t('contactUs.successTitle')}</p>
                          <p className="text-green-300 text-xs sm:text-sm md:text-base mt-1">{t('contactUs.successDescription')}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </form>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default ContactUs;