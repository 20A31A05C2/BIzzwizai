import React from 'react';
import { motion } from 'framer-motion';
import { Gem, ShieldCheck, Zap, Brain, Star } from 'lucide-react';

const ValuePropositionSection = () => {
  const features = [
    {
      icon: <Gem size={38} className="text-bizzwiz-electric-cyan drop-shadow-[0_0_18px_currentColor]" />,
      title: "Qualité Dimensionnelle Supérieure",
      description: "Chaque pixel, chaque ligne de code est infusé d'excellence, propulsé par notre synergie IA-humain pour des résultats qui transcendent les normes.",
      glowColor: "hsla(var(--bizzwiz-electric-cyan-rgb), 0.35)",
    },
    {
      icon: <ShieldCheck size={38} className="text-bizzwiz-magenta-flare drop-shadow-[0_0_18px_currentColor]" />,
      title: "Tarification Stellaire Inégalée",
      description: "L'efficience de notre IA déconstruit les coûts traditionnels, vous offrant une valeur astronomique. Une garantie à travers les galaxies.",
      glowColor: "hsla(var(--bizzwiz-magenta-flare-rgb), 0.35)",
    },
    {
      icon: <Zap size={38} className="text-yellow-400 drop-shadow-[0_0_18px_currentColor]" />,
      title: "Vitesse de Distorsion Warp 9+",
      description: "De la conception à la mise en orbite en un temps record. Votre projet, livré à la vitesse de la pensée, sans compromis sur la perfection.",
      glowColor: "hsla(50, 100%, 60%, 0.35)",
    },
    {
      icon: <Brain size={38} className="text-bizzwiz-nebula-purple drop-shadow-[0_0_18px_currentColor]" />,
      title: "Intelligence Augmentée, Vision Claire",
      description: "Des stratégies affinées par l'IA, une transparence totale. Un partenariat fondé sur la confiance et des résultats mesurables à chaque étape.",
      glowColor: "hsla(var(--bizzwiz-nebula-purple-rgb), 0.35)",
    }
  ];

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.28, delayChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 70, scale: 0.75, rotateX: -35, filter: "blur(5px)" },
    visible: { 
      opacity: 1, y: 0, scale: 1, rotateX: 0, filter: "blur(0px)",
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], type:"spring", stiffness:65, damping:17 } 
    },
    hover: {
      y: -12,
      scale: 1.035,
      rotateX: 3,
      boxShadow: "0px 22px 55px -8px hsla(var(--bizzwiz-nebula-purple-rgb),0.2), 0px 0px 35px -12px hsla(var(--glow-color-rgb),0.3), 0 0 0 1.5px hsla(var(--glow-color-rgb),0.4)",
      transition: { type: "spring", stiffness: 190, damping: 11 }
    }
  };

  return (
    <section id="value-proposition" className="py-24 md:py-36 bg-bizzwiz-deep-space/90 relative overflow-hidden perspective-1500 section-angled-border-top section-angled-border-bottom">
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="absolute top-0 left-0 w-3/5 h-3/5 bg-gradient-radial from-bizzwiz-nebula-purple/35 to-transparent blur-3xl animate-[spin_22s_linear_infinite_reverse]"></div>
        <div className="absolute bottom-0 right-0 w-3/5 h-3/5 bg-gradient-radial from-bizzwiz-magenta-flare/35 to-transparent blur-3xl animate-[spin_28s_linear_infinite]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: -70, scale:0.85 }}
          whileInView={{ opacity: 1, y: 0, scale:1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], type:"spring", stiffness:70, damping:16 }}
        >
          <div className="inline-flex items-center justify-center p-1.5 bg-bizzwiz-electric-cyan/10 border border-bizzwiz-electric-cyan/30 rounded-full shadow-lg shadow-bizzwiz-electric-cyan/20 mb-5">
            <Star size={20} className="text-bizzwiz-electric-cyan mx-1.5"/>
          </div>
          <h2 className="text-sm font-roboto-mono uppercase tracking-widest text-bizzwiz-electric-cyan mb-5">LA PROMESSE BIZZWIZ AI</h2>
          <p className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-orbitron font-extrabold text-gradient-cosmic mb-9 leading-tight">
            Forger l'Avenir, Ensemble. Avec Panache.
          </p>
          <p className="text-md md:text-lg lg:text-xl text-bizzwiz-comet-tail max-w-2xl mx-auto mb-20 md:mb-28 font-space-grotesk leading-relaxed">
            BizzWiz AI n'est pas une simple agence. C'est votre allié stratégique dans la conquête du futur digital, armé d'une IA révolutionnaire et d'une garantie de prix défiant toute concurrence intergalactique.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12 transform-style-3d"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="p-7 md:p-9 glassmorphic-card flex flex-col items-center text-center border-bizzwiz-electric-cyan/30 hover:border-[hsla(var(--glow-color-rgb),0.5)] backface-hidden"
              style={{ '--glow-color-rgb': feature.glowColor.match(/\(([^)]+)\)/)[1] }}
              variants={itemVariants}
              whileHover="hover"
            >
              <motion.div 
                className="p-4 mb-6 rounded-full bg-gradient-to-br from-bizzwiz-glass-bg/80 to-bizzwiz-deep-space/60 border border-bizzwiz-electric-cyan/35 shadow-2xl shadow-[var(--glow-color)]"
                whileHover={{ scale: 1.12, rotateY:18, boxShadow: `0 0 40px 7px ${feature.glowColor}, 0 0 18px inset ${feature.glowColor}`}}
                transition={{type:"spring", stiffness:240, damping:10}}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl lg:text-2xl font-orbitron font-bold mb-3.5 text-bizzwiz-star-white">{feature.title}</h3>
              <p className="text-bizzwiz-comet-tail text-sm md:text-base leading-relaxed font-space-grotesk flex-grow">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ValuePropositionSection;