import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Zap, ChevronsDown, Layers, Cpu, Aperture, Move3d } from 'lucide-react';

const HeroSection = () => {
  const navigate = useNavigate();
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"] 
  });

  const initialTextOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const initialTextY = useTransform(scrollYProgress, [0, 0.15], ["30px", "0px"]);

  const cardsContainerOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const cardsContainerY = useTransform(scrollYProgress, [0.1, 0.3], ["40px", "0px"]);
  const cardsContainerScale = useTransform(scrollYProgress, [0.1, 0.3], [0.9, 1]);


  const handleStartProject = () => {
    navigate('/create-project');
  };

  const scrollToNextSection = () => {
    const nextSection = document.getElementById('value-proposition');
    if (nextSection) {
      const navbarHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--navbar-height') || '68', 10);
      const elementPosition = nextSection.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const floatingOrbVariants = (delay = 0, size = 1) => ({
    initial: { opacity: 0, scale: 0, x:0, y:0 },
    animate: {
      opacity: [0, 0.3, 0.15, 0.3, 0],
      scale: [0, size * 0.6, size, size * 0.6, 0],
      x: [0, Math.random() * 60 - 30, Math.random() * -60 + 30, 0],
      y: [0, Math.random() * 60 - 30, Math.random() * -60 + 30, 0],
      transition: {
        delay: delay + Math.random() * 1.5,
        duration: Math.random() * 8 + 7,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "circInOut"
      }
    },
  });

  const featureCardVariants = {
    initial: { opacity: 0, y: 25, filter: "blur(5px) saturate(0.8)" },
    animate: { 
      opacity: 1, y: 0, filter: "blur(0px) saturate(1)",
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], type: "spring", stiffness: 50, damping: 12 } 
    },
    hover: {
      y: -6,
      scale: 1.025,
      borderColor: "hsla(var(--bizzwiz-magenta-flare-rgb), 0.5)",
      boxShadow: "0px 12px 30px hsla(var(--bizzwiz-nebula-purple-rgb),0.2), 0px 0px 20px hsla(var(--bizzwiz-magenta-flare-rgb),0.15), 0 0 0 1px hsla(var(--bizzwiz-magenta-flare-rgb),0.35)",
      transition: { type: "spring", stiffness: 150, damping: 9 }
    }
  };

  const features = [
    { icon: <Layers size={26} className="text-bizzwiz-electric-cyan" />, title: "Framework Modulaire Avancé", description: "Architecture flexible et évolutive pour une intégration fluide et des possibilités infinies." },
    { icon: <Cpu size={26} className="text-bizzwiz-magenta-flare" />, title: "Noyau IA Auto-Adaptatif", description: "Intelligence artificielle qui apprend et s'optimise en continu pour des performances de pointe." },
    { icon: <Aperture size={26} className="text-bizzwiz-nebula-purple" />, title: "Esthétique Visionnaire & Immersive", description: "Designs avant-gardistes et expériences utilisateur qui captivent et engagent profondément." },
  ];

  return (
    <section 
      ref={targetRef} 
      id="hero-section" 
      className="relative min-h-[calc(100vh-var(--navbar-height,68px)+100px)] md:min-h-[calc(100vh-var(--navbar-height,68px)+50px)] lg:min-h-[calc(100vh-var(--navbar-height,68px))] flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 isolate overflow-hidden pt-20 pb-20 md:pt-24 md:pb-24 perspective-1000"
    >
      <div className="absolute inset-0 -z-10 transform-style-3d">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`orb-bg-${i}`}
            className="absolute rounded-full blur-2xl"
            style={{
              width: `${Math.random() * 180 + 120}px`,
              height: `${Math.random() * 180 + 120}px`,
              backgroundColor: `hsla(var(--${['bizzwiz-nebula-purple-rgb', 'bizzwiz-electric-cyan-rgb', 'bizzwiz-magenta-flare-rgb'][i % 3]}), ${Math.random() * 0.025 + 0.008})`,
              left: `${Math.random() * 100 - 10}%`,
              top: `${Math.random() * 100 - 10}%`,
            }}
            variants={floatingOrbVariants(i * 0.15, Math.random() * 0.4 + 0.5)}
            initial="initial"
            animate="animate"
          />
        ))}
      </div>
      
      <motion.div 
        className="relative z-10 max-w-3xl w-full mx-auto flex flex-col items-center"
        style={{ opacity: initialTextOpacity, y: initialTextY }}
      >
        <motion.div 
          className="mb-5 px-3.5 py-1.5 text-[0.65rem] sm:text-xs font-medium tracking-wider text-bizzwiz-electric-cyan bg-bizzwiz-electric-cyan/10 rounded-full border border-bizzwiz-electric-cyan/25 shadow-md shadow-bizzwiz-electric-cyan/10 cursor-default font-roboto-mono flex items-center"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        >
          <Move3d size={14} className="mr-1.5 text-bizzwiz-magenta-flare animate-pulse"/>
          NOUVELLE DIMENSION DE CRÉATION DIGITALE IA
        </motion.div>

        <motion.h1 
          className="text-4xl sm:text-5xl md:text-6xl font-orbitron font-extrabold mb-5 sm:mb-6 leading-tight tracking-tight"
          initial={{ opacity: 0, y: 30, letterSpacing: "-0.05em" }}
          animate={{ opacity: 1, y: 0, letterSpacing: "-0.015em" }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-glow-electric-cyan">BIZZWIZ AI:</span> <span className="text-gradient-cosmic">Transcendez Votre Vision.</span>
        </motion.h1>

        <motion.p 
          className="text-sm md:text-base lg:text-lg text-bizzwiz-comet-tail mb-7 sm:mb-8 max-w-lg mx-auto font-space-grotesk leading-relaxed"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          Fusionnez des designs d'avant-garde avec une intelligence artificielle révolutionnaire. BizzWiz AI est votre portail vers des expériences numériques qui défient les conventions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.55, type: "spring", stiffness: 80, damping:11 }}
        >
          <Button 
            size="lg" 
            className="cyber-button text-xs md:text-sm px-7 md:px-9 py-3.5 md:py-4 group"
            onClick={handleStartProject}
          >
            <Zap size={18} className="mr-2 transform -rotate-12 transition-all duration-300 group-hover:rotate-[-6deg] group-hover:scale-105 group-hover:text-yellow-300" />
            Initier la Création Quantique
          </Button>
        </motion.div>
        
        <motion.div
          className="absolute -bottom-16 sm:-bottom-20 left-1/2 -translate-x-1/2 cursor-pointer opacity-70 hover:opacity-100"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: [0, 0.7, 0.4, 0.7, 0.4, 0.7], y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, repeat: Infinity, repeatType: "reverse", ease:"easeInOut" }}
          onClick={scrollToNextSection}
          title="Explorer davantage"
        >
          <ChevronsDown size={30} className="text-bizzwiz-electric-cyan/50 hover:text-bizzwiz-magenta-flare transition-colors duration-300 animate-[bounce_2.2s_ease-in-out_infinite_0.5s]" />
        </motion.div>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full max-w-4xl mx-auto mt-16 md:mt-20 lg:mt-24"
        style={{ opacity: cardsContainerOpacity, y: cardsContainerY, scale: cardsContainerScale }}
        initial="initial"
        animate="animate"
        variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
      >
        {features.map((item, index) => (
          <motion.div 
            key={index} 
            className="p-4 glassmorphic-card flex flex-col items-center text-center border-bizzwiz-electric-cyan/15 hover:border-bizzwiz-magenta-flare/30"
            variants={featureCardVariants}
            whileHover="hover"
          >
            <div className="p-2.5 mb-3 rounded-full bg-gradient-to-br from-bizzwiz-nebula-purple/15 to-bizzwiz-magenta-flare/15 border border-bizzwiz-electric-cyan/20 shadow-lg">
              {item.icon}
            </div>
            <h3 className="text-sm md:text-base font-orbitron font-semibold mb-1.5 text-bizzwiz-star-white">{item.title}</h3>
            <p className="text-xs md:text-[0.8rem] text-bizzwiz-comet-tail font-space-grotesk leading-relaxed">{item.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default HeroSection;