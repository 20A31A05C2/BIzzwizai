import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Feather, Edit3, MessageCircle, TrendingUp, Bot, FileText, Mic2 } from 'lucide-react';

const ContentGenerationPage = () => {
  const navigate = useNavigate();

  const pageVariants = {
    initial: { opacity: 0, y: 40, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.15 } },
    exit: { opacity: 0, y: -30, scale: 0.97, transition: { duration: 0.4, ease: "easeIn" } }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 25, filter: "blur(3px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  const benefits = [
    { icon: <Feather size={32} className="text-bizzwiz-electric-cyan" />, title: "Créativité Augmentée par l'IA", description: "Des textes originaux, des scripts captivants et des idées innovantes générés par nos algorithmes avancés." },
    { icon: <Edit3 size={32} className="text-bizzwiz-magenta-flare" />, title: "Ton & Style Personnalisés", description: "Adaptez la voix de l'IA à votre marque pour une communication authentique et cohérente." },
    { icon: <TrendingUp size={32} className="text-green-400" />, title: "Optimisation SEO Cosmique", description: "Contenu optimisé pour les moteurs de recherche galactiques, augmentant votre visibilité." },
    { icon: <MessageCircle size={32} className="text-yellow-400" />, title: "Engagement Amplifié", description: "Des narrations et des messages qui résonnent avec votre audience et suscitent l'interaction." },
    { icon: <Bot size={32} className="text-bizzwiz-nebula-purple" />, title: "Production de Contenu à Grande Échelle", description: "Générez rapidement de grandes quantités de contenu de haute qualité pour tous vos canaux." },
    { icon: <FileText size={32} className="text-orange-400" />, title: "Formats Multiples & Adaptables", description: "Articles de blog, scripts vidéo, posts réseaux sociaux, descriptions produits, et bien plus encore." },
  ];

  const useCases = [
    { title: "Articles de Blog Stellaire", description: "Des articles informatifs, engageants et optimisés SEO pour votre blog.", icon: <FileText size={20} /> },
    { title: "Scripts Vidéo Galactiques", description: "Des scénarios captivants pour vos vidéos promotionnelles ou explicatives.", icon: <Mic2 size={20} /> },
    { title: "Posts Réseaux Sociaux Magnétiques", description: "Des publications percutantes pour animer vos communautés en ligne.", icon: <MessageCircle size={20} /> },
    { title: "Descriptions Produits Cosmiques", description: "Des textes de vente persuasifs qui transforment les visiteurs en clients.", icon: <Sparkles size={20} /> },
  ];

  return (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-[calc(100vh-var(--navbar-height,68px))] container mx-auto px-4 py-12 md:py-20 lg:py-24"
    >
      <motion.div variants={itemVariants} className="text-center mb-12 md:mb-16">
        <Sparkles size={52} className="mx-auto mb-4 text-bizzwiz-magenta-flare drop-shadow-[0_0_15px_currentColor]" />
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-orbitron font-black text-glow-magenta-flare">
          Contenu Nébuleux <span className="text-gradient-cosmic">IA</span>
        </h1>
        <p className="text-lg md:text-xl text-bizzwiz-comet-tail mt-4 max-w-2xl mx-auto">
          Libérez la puissance créative de l'IA pour générer du contenu unique, engageant et optimisé qui propulse votre message à travers la galaxie.
        </p>
      </motion.div>

      <motion.section variants={itemVariants} className="mb-16 md:mb-20">
        <h2 className="text-2xl sm:text-3xl font-orbitron font-bold text-center mb-10 text-bizzwiz-star-white">
          Les <span className="text-bizzwiz-electric-cyan">Super-Pouvoirs</span> de Notre IA Créative
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {benefits.map((benefit, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="p-6 glassmorphic-card border-bizzwiz-magenta-flare/20 hover:border-bizzwiz-electric-cyan/40 flex flex-col items-center text-center"
            >
              <div className="p-3 mb-4 rounded-full bg-gradient-to-br from-bizzwiz-deep-space to-bizzwiz-electric-cyan/20 border border-bizzwiz-magenta-flare/30 shadow-lg">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-orbitron font-semibold mb-2 text-bizzwiz-star-white">{benefit.title}</h3>
              <p className="text-sm text-bizzwiz-comet-tail leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section variants={itemVariants} className="mb-16 md:mb-20">
        <h2 className="text-2xl sm:text-3xl font-orbitron font-bold text-center mb-10 text-bizzwiz-star-white">
          Applications <span className="text-bizzwiz-magenta-flare">Interstellaires</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {useCases.map((useCase, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="p-5 glassmorphic-card border-bizzwiz-electric-cyan/15 hover:border-bizzwiz-magenta-flare/30 text-center"
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-bizzwiz-nebula-purple/20 flex items-center justify-center border border-bizzwiz-magenta-flare/25 text-bizzwiz-magenta-flare">
                {useCase.icon}
              </div>
              <h3 className="text-md font-orbitron font-semibold mb-1 text-bizzwiz-star-white">{useCase.title}</h3>
              <p className="text-xs text-bizzwiz-comet-tail leading-relaxed">{useCase.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.div variants={itemVariants} className="text-center">
        <p className="text-lg text-bizzwiz-comet-tail mb-6">Prêt à créer du contenu qui voyage à la vitesse de la pensée ?</p>
        <Button 
          size="lg" 
          className="cyber-button group text-sm md:text-base px-8 md:px-10 py-4 md:py-5"
          onClick={() => navigate('/create-project?service=content-generation')}
        >
          <Feather size={20} className="mr-2.5 transform transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-110" />
          Générer Mon Contenu IA
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default ContentGenerationPage;