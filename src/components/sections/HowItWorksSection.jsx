import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Cpu, Rocket, Zap, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: Lightbulb,
    title: "Phase 1: Conceptualisation Éclairée",
    description: "Partagez votre vision. Notre IA intuitive décode vos besoins et esquisse les fondations de votre projet en un éclair.",
    accentColor: "hsl(var(--bizzwiz-electric-cyan))",
    glowRgb: "var(--bizzwiz-electric-cyan-rgb)",
  },
  {
    icon: Cpu,
    title: "Phase 2: Architecture Neuronale",
    description: "Visualisez votre futur digital avec une maquette interactive ultra-précise, générée par IA, accompagnée d'un devis transparent en moins de 24h.",
    accentColor: "hsl(var(--bizzwiz-magenta-flare))",
    glowRgb: "var(--bizzwiz-magenta-flare-rgb)",
  },
  {
    icon: Rocket,
    title: "Phase 3: Déploiement Cosmique",
    description: "Assistez à la naissance de votre projet en temps réel via un tableau de bord dédié. De la genèse à la mise en orbite, vous restez aux commandes.",
    accentColor: "hsl(var(--bizzwiz-nebula-purple))",
    glowRgb: "var(--bizzwiz-nebula-purple-rgb)",
  }
];

const HowItWorksSection = () => {
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.35, delayChildren: 0.25 }
    }
  };

  const stepCardVariants = {
    hidden: { opacity: 0, y: 60, filter: "blur(12px) saturate(0.4)" },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px) saturate(1)",
      transition: {
        type: "spring",
        stiffness: 55,
        damping: 15,
        duration: 0.8,
        delay: custom * 0.12
      }
    }),
    hover: {
      y: -15,
      scale: 1.05,
      boxShadow: "0px 25px 60px -5px hsla(var(--bizzwiz-nebula-purple-rgb),0.25), 0px 0px 40px -10px hsla(var(--accent-color-rgb),0.35), 0 0 0 2px hsla(var(--accent-color-rgb),0.5)",
      transition: { type: "spring", stiffness: 210, damping: 12 }
    }
  };

  const iconContainerVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: {
      scale: 1.1,
      rotate: 5,
      boxShadow: `0 0 35px 8px hsla(var(--accent-color-rgb), 0.5), inset 0 0 20px hsla(var(--accent-color-rgb), 0.3)`,
      transition: { type: "spring", stiffness: 260, damping: 9 }
    }
  };
  
  return (
    <section id="how-it-works" className="py-24 md:py-36 relative overflow-hidden bg-bizzwiz-deep-space section-clip-path">
      <div className="absolute inset-0 -z-10 opacity-25">
        <div className="absolute top-[-25%] left-[-25%] w-[70%] h-[70%] bg-gradient-radial from-bizzwiz-nebula-purple/45 to-transparent rounded-full blur-3xl animate-[spin_35s_linear_infinite]"></div>
        <div className="absolute bottom-[-25%] right-[-25%] w-[70%] h-[70%] bg-gradient-radial from-bizzwiz-magenta-flare/45 to-transparent rounded-full blur-3xl animate-[spin_40s_linear_infinite_reverse]"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-20 md:mb-24"
          initial={{ opacity: 0, y: -60, scale:0.85 }}
          whileInView={{ opacity: 1, y: 0, scale:1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], type:"spring", stiffness:70, damping:16 }}
        >
          <div className="inline-block mb-5 p-2.5 bg-bizzwiz-electric-cyan/15 border border-bizzwiz-electric-cyan/35 rounded-full shadow-xl shadow-bizzwiz-electric-cyan/25">
            <Zap size={32} className="text-bizzwiz-electric-cyan" />
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-orbitron font-black mb-7">
            Votre Vision, <span className="text-gradient-cosmic">Notre Processus Stellaire.</span>
          </h2>
          <p className="text-md md:text-lg lg:text-xl text-bizzwiz-comet-tail max-w-xl mx-auto font-space-grotesk leading-relaxed">
            Découvrez la simplicité et la puissance de notre approche tripartite, conçue pour transformer vos idées en réalités numériques extraordinaires.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-10 lg:gap-14 items-stretch perspective-1500"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={stepCardVariants}
              whileHover="hover"
              className="glassmorphic-card p-7 md:p-9 rounded-xl flex flex-col items-center text-center transform-style-3d backface-hidden border-bizzwiz-electric-cyan/25 hover:border-[hsla(var(--accent-color-rgb),0.6)]"
              style={{ '--accent-color-rgb': step.glowRgb }}
            >
              <motion.div 
                className="p-4 rounded-full mb-7 border-2"
                style={{ 
                  borderColor: step.accentColor, 
                  boxShadow: `0 0 30px hsla(${step.glowRgb}, 0.45), inset 0 0 18px hsla(${step.glowRgb}, 0.25)`,
                  background: `radial-gradient(circle, hsla(${step.glowRgb}, 0.2) 0%, transparent 75%)`
                }}
                variants={iconContainerVariants}
                initial="initial"
              >
                <step.icon className="w-11 h-11 drop-shadow-[0_0_12px_currentColor]" style={{ color: step.accentColor }} strokeWidth={1.75} />
              </motion.div>
              <h3 className="text-xl lg:text-2xl font-orbitron font-bold mb-4 text-bizzwiz-star-white" style={{ color: step.accentColor }}>{step.title}</h3>
              <p className="text-bizzwiz-comet-tail font-space-grotesk text-sm md:text-base leading-relaxed flex-grow">
                {step.description}
              </p>
              {index < steps.length -1 && (
                 <div className="absolute top-1/2 -right-12 hidden lg:block transform -translate-y-1/2 opacity-30 group-hover:opacity-60 transition-opacity duration-300">
                    <ArrowRight size={36} className="text-bizzwiz-comet-tail/50 animate-pulse"/>
                 </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;