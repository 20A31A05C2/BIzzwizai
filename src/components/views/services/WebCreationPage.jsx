import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Zap, Layers, Palette, Rocket, Users, ShieldCheck, Brain, Code2, Globe } from 'lucide-react';

const WebCreationPage = () => {
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

  const features = [
    { icon: <Palette size={32} className="text-bizzwiz-magenta-flare" />, title: "Design Interstellaire Sur Mesure", description: "Des interfaces utilisateur uniques qui défient la gravité, conçues pour captiver et convertir." },
    { icon: <Layers size={32} className="text-bizzwiz-electric-cyan" />, title: "Architecture Modulaire Quantique", description: "Fondations solides et évolutives, prêtes à s'adapter à la croissance de votre empire galactique." },
    { icon: <Rocket size={32} className="text-bizzwiz-nebula-purple" />, title: "Performance Optimisée à la Vitesse Lumière", description: "Sites web ultra-rapides pour une expérience utilisateur sans latence, même aux confins de l'univers." },
    { icon: <ShieldCheck size={32} className="text-green-400" />, title: "Sécurité HoloNet Impénétrable", description: "Protection de pointe contre les menaces cosmiques, assurant la sérénité de vos données." },
    { icon: <Brain size={32} className="text-yellow-400" />, title: "Intégration IA Intuitive", description: "Fonctionnalités intelligentes propulsées par l'IA pour automatiser, personnaliser et innover." },
    { icon: <Code2 size={32} className="text-orange-400" />, title: "Code Source Stellaire & Maintenable", description: "Un code propre, documenté et optimisé, facilitant les évolutions futures de votre plateforme." },
  ];

  const processSteps = [
    { id: 1, title: "Briefing Cosmique", description: "Nous explorons votre vision, vos objectifs et l'univers de votre marque.", icon: <Users size={24} className="text-bizzwiz-electric-cyan" /> },
    { id: 2, title: "Conception Galactique", description: "Nos designers créent des maquettes visuelles époustouflantes et fonctionnelles.", icon: <Palette size={24} className="text-bizzwiz-magenta-flare" /> },
    { id: 3, title: "Développement Stellaire", description: "Nos ingénieurs codent votre site avec les technologies les plus avancées.", icon: <Code2 size={24} className="text-bizzwiz-nebula-purple" /> },
    { id: 4, title: "Lancement Orbital", description: "Déploiement et mise en orbite de votre nouvelle plateforme web.", icon: <Rocket size={24} className="text-green-400" /> },
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
        <Zap size={52} className="mx-auto mb-4 text-bizzwiz-electric-cyan drop-shadow-[0_0_15px_currentColor]" />
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-orbitron font-black text-glow-electric-cyan">
          Web Spatial <span className="text-gradient-cosmic">IA</span>
        </h1>
        <p className="text-lg md:text-xl text-bizzwiz-comet-tail mt-4 max-w-2xl mx-auto">
          Propulsez votre présence en ligne vers de nouvelles dimensions avec des sites web conçus par l'IA, alliant esthétique futuriste et performance stellaire.
        </p>
      </motion.div>

      <motion.section variants={itemVariants} className="mb-16 md:mb-20">
        <h2 className="text-2xl sm:text-3xl font-orbitron font-bold text-center mb-10 text-bizzwiz-star-white">
          Avantages <span className="text-bizzwiz-magenta-flare">Clés</span> de Nos Créations Web
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="p-6 glassmorphic-card border-bizzwiz-electric-cyan/20 hover:border-bizzwiz-magenta-flare/40 flex flex-col items-center text-center"
            >
              <div className="p-3 mb-4 rounded-full bg-gradient-to-br from-bizzwiz-deep-space to-bizzwiz-nebula-purple/20 border border-bizzwiz-electric-cyan/30 shadow-lg">
                {feature.icon}
              </div>
              <h3 className="text-lg font-orbitron font-semibold mb-2 text-bizzwiz-star-white">{feature.title}</h3>
              <p className="text-sm text-bizzwiz-comet-tail leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section variants={itemVariants} className="mb-16 md:mb-20">
        <h2 className="text-2xl sm:text-3xl font-orbitron font-bold text-center mb-10 text-bizzwiz-star-white">
          Notre Processus de <span className="text-bizzwiz-electric-cyan">Création</span>
        </h2>
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-bizzwiz-electric-cyan/30 via-bizzwiz-magenta-flare/30 to-bizzwiz-nebula-purple/30 rounded-full transform -translate-x-1/2 hidden md:block"></div>
          {processSteps.map((step, index) => (
            <motion.div
              key={step.id}
              variants={itemVariants}
              className={`flex items-start mb-8 md:mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
              <div className="md:w-1/2 flex md:justify-center">
                <div className={`relative p-5 glassmorphic-card border-bizzwiz-electric-cyan/20 w-full md:max-w-sm ${index % 2 === 0 ? 'md:mr-6' : 'md:ml-6'}`}>
                  <div className="absolute -top-4 -left-4 md:hidden">
                    <div className="w-10 h-10 bg-bizzwiz-magenta-flare rounded-full flex items-center justify-center text-bizzwiz-deep-space font-bold text-lg shadow-lg">
                      {step.id}
                    </div>
                  </div>
                  <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 ${index % 2 === 0 ? '-right-5' : '-left-5'} transform`}>
                     <div className="w-10 h-10 bg-bizzwiz-magenta-flare rounded-full flex items-center justify-center text-bizzwiz-deep-space font-bold text-lg shadow-lg border-2 border-bizzwiz-deep-space">
                       {step.id}
                     </div>
                  </div>
                  <div className="flex items-center mb-2 md:hidden">
                     {React.cloneElement(step.icon, {size: 20, className: "mr-2"})}
                     <h3 className="text-md font-orbitron font-semibold text-bizzwiz-star-white">{step.title}</h3>
                  </div>
                  <h3 className="hidden md:block text-md font-orbitron font-semibold text-bizzwiz-star-white mb-1.5">{step.title}</h3>
                  <p className="text-xs text-bizzwiz-comet-tail leading-relaxed">{step.description}</p>
                </div>
              </div>
              <div className="hidden md:w-1/2 md:flex items-center justify-center">
                 {React.cloneElement(step.icon, {size: 48, className: `opacity-30 group-hover:opacity-60 transition-opacity duration-300 ${index % 2 === 0 ? 'ml-8' : 'mr-8'}`})}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.div variants={itemVariants} className="text-center">
        <p className="text-lg text-bizzwiz-comet-tail mb-6">Prêt à lancer votre site web dans une nouvelle galaxie ?</p>
        <Button 
          size="lg" 
          className="cyber-button group text-sm md:text-base px-8 md:px-10 py-4 md:py-5"
          onClick={() => navigate('/create-project?service=web-creation')}
        >
          <Globe size={20} className="mr-2.5 transform transition-transform duration-300 group-hover:rotate-[15deg] group-hover:scale-110" />
          Construire Mon Site Spatial
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default WebCreationPage;