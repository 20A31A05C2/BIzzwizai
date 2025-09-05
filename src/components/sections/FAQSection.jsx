import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronDown, HelpCircle, MessageCircle, Zap, Shield, CreditCard, Rocket } from 'lucide-react';

const FAQSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [openItems, setOpenItems] = useState(new Set([0]));

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const faqCategories = [
    {
      title: t('faq.startup_title'),
      icon: <Rocket size={20} />,
      color: 'bizzwiz-electric-cyan',
      questions: [
        {
          question: t('faq.startup_question1'),
          answer: t('faq.startup_answer1'),
        },
        {
          question: t('faq.startup_question2'),
          answer: t('faq.startup_answer2'),
        },
        {
          question: t('faq.startup_question3'),
          answer: t('faq.startup_answer3'),
        },
      ],
    },
    {
      title: t('faq.credits_title'),
      icon: <CreditCard size={20} />,
      color: 'bizzwiz-magenta-flare',
      questions: [
        {
          question: t('faq.credits_question1'),
          answer: t('faq.credits_answer1'),
        },
        {
          question: t('faq.credits_question2'),
          answer: t('faq.credits_answer2'),
        },
      ],
    },
    {
      title: t('faq.features_title'),
      icon: <Zap size={20} />,
      color: 'bizzwiz-nebula-purple',
      questions: [
        {
          question: t('faq.features_question1'),
          answer: t('faq.features_answer1'),
        },
        {
          question: t('faq.features_question2'),
          answer: t('faq.features_answer2'),
        },
        {
          question: t('faq.features_question3'),
          answer: t('faq.features_answer3'),
        },
      ],
    },
    {
      title: t('faq.security_title'),
      icon: <Shield size={20} />,
      color: 'bizzwiz-star-white',
      questions: [
        {
          question: t('faq.security_question1'),
          answer: t('faq.security_answer1'),
        },
        {
          question: t('faq.security_question2'),
          answer: t('faq.security_answer2'),
        },
        {
          question: t('faq.security_question3'),
          answer: t('faq.security_answer3'),
        },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section
      id="faq"
      className="relative py-16 md:py-24 bg-gradient-to-b from-bizzwiz-deep-space/10 via-bizzwiz-nebula-purple/5 to-bizzwiz-deep-space/20"
    >
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-gradient-radial from-bizzwiz-electric-cyan/40 to-transparent blur-2xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-radial from-bizzwiz-magenta-flare/40 to-transparent blur-2xl animate-pulse-slow" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 text-xs font-roboto-mono tracking-wider text-bizzwiz-nebula-purple bg-bizzwiz-nebula-purple/10 rounded-full border border-bizzwiz-nebula-purple/25">
              <HelpCircle size={14} className="mr-2 animate-[pulse_1.5s_ease-in-out_infinite]" />
              {t('faq.badge')}
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-orbitron font-bold bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent drop-shadow-[0_0_32px_rgba(255,255,255,0.3)] mb-4">
              {t('faq.title')} <span className="text-gradient-cosmic">{t('faq.title_highlight')}</span>
            </h2>
            <p className="text-base md:text-lg text-bizzwiz-comet-tail max-w-2xl mx-auto leading-relaxed">
              {t('faq.description')}
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid md:grid-cols-2 gap-8"
        >
          {faqCategories.map((category, categoryIndex) => (
            <motion.div key={categoryIndex} variants={itemVariants} className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  className={`p-2 rounded-lg bg-${category.color}/20`}
                  whileHover={{ scale: 1.1, rotate: 12 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`text-${category.color} group-hover:animate-[spin_1.4s_linear_infinite]`}>
                    {category.icon}
                  </div>
                </motion.div>
                <h3 className="text-xl font-orbitron font-semibold text-bizzwiz-star-white">
                  {category.title}
                </h3>
              </div>

              <div className="space-y-3">
                {category.questions.map((faq, questionIndex) => {
                  const globalIndex = categoryIndex * 10 + questionIndex;
                  const isOpen = openItems.has(globalIndex);

                  return (
                    <motion.div
                      key={globalIndex}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                      className="border border-bizzwiz-comet-tail/20 rounded-xl overflow-hidden bg-bizzwiz-glass-bg/20 backdrop-blur-sm hover:border-bizzwiz-magenta-flare/30 hover:shadow-[0_0_20px_hsla(var(--bizzwiz-electric-cyan-rgb),0.2)] transition-all duration-300"
                    >
                      <button
                        onClick={() => toggleItem(globalIndex)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-bizzwiz-magenta-flare/5 transition-colors duration-200"
                      >
                        <span className="text-sm md:text-base font-medium text-bizzwiz-star-white pr-4">
                          {faq.question}
                        </span>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex-shrink-0"
                        >
                          <ChevronDown size={20} className="text-bizzwiz-electric-cyan group-hover:animate-[pulse_1s_ease-in-out_infinite]" />
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-4 border-t border-bizzwiz-comet-tail/10">
                              <p className="text-sm md:text-base text-bizzwiz-comet-tail leading-relaxed pt-4">
                                {faq.answer}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-block p-8 rounded-2xl bg-gradient-to-br from-bizzwiz-electric-cyan/10 via-bizzwiz-magenta-flare/5 to-bizzwiz-nebula-purple/10 border border-bizzwiz-electric-cyan/20 backdrop-blur-sm hover:shadow-[0_0_30px_hsla(var(--bizzwiz-magenta-flare-rgb),0.3)] transition-all duration-300">
            <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
              <MessageCircle size={48} className="text-bizzwiz-electric-cyan mx-auto mb-4 animate-[pulse_1.5s_ease-in-out_infinite]" />
            </motion.div>
            <h3 className="text-xl md:text-2xl font-orbitron font-semibold text-bizzwiz-star-white mb-3">
              {t('faq.cta_title')}
            </h3>
            <p className="text-bizzwiz-comet-tail mb-6 max-w-md mx-auto">
              {t('faq.cta_description')}
            </p>
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
              <div className="inline-block rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 p-[2px]">
                <button 
                  onClick={() => navigate('/login')}
                  className="rounded-full bg-[#0e0e1a] text-white px-8 py-3 font-orbitron font-medium hover:bg-[#1a1a2e] transition-all duration-300 flex items-center gap-2"
                >
                  <MessageCircle size={18} className="group-hover:animate-[pulse_1s_ease-in-out_infinite]" />
                  {t('faq.cta_button')}
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;