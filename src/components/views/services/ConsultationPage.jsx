import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Rocket, Brain, Lightbulb, BarChart3, Users, ShieldAlert, Target, Microscope as Telescope } from 'lucide-react';

const ConsultationPage = () => {
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

  const services = [
    { icon: <Brain size={32} className="text-bizzwiz-nebula-purple" />, title: "Stratégie IA Sur Mesure", description: "Définition d'une feuille de route IA alignée sur vos objectifs business galactiques." },
    { icon: <Lightbulb size={32} className="text-yellow-400" />, title: "Identification d'Opportunités IA", description: "Détection des potentiels d'innovation et d'optimisation grâce à l'intelligence artificielle." },
    { icon: <BarChart3 size={32} className="text-green-400" />, title: "Analyse de Données Quantiques", description: "Transformation de vos données brutes en informations stratégiques exploitables." },
    { icon: <Users size={32} className="text-bizzwiz-electric-cyan" />, title: "Formation & Accompagnement d'Équipes", description: "Montée en compétence de vos équipes pour une adoption réussie de l'IA." },
    { icon: <ShieldAlert size={32} className="text-orange-400" />, title: "Audit & Éthique IA", description: "Assurer une IA responsable, transparente et conforme aux régulations interstellaires." },
    { icon: <Target size={32} className="text-bizzwiz-magenta-flare" />, title: "Optimisation de Processus IA", description: "Intégration de l'IA pour automatiser et améliorer l'efficacité de vos opérations." },
  ];

  const consultationPhases = [
    { phase: 1, title: "Exploration & Diagnostic", description: "Analyse approfondie de votre environnement, de vos défis et de vos ambitions.", color: "bizzwiz-electric-cyan" },
    { phase: 2, title: "Stratégie & Feuille de Route", description: "Co-création d'un plan d'action IA personnalisé et réalisable.", color: "bizzwiz-magenta-flare" },
    { phase: 3, title: "Implémentation & Suivi", description: "Accompagnement dans la mise en œuvre des solutions et mesure des impacts.", color: "bizzwiz-nebula-purple" },
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
        <Rocket size={52} className="mx-auto mb-4 text-bizzwiz-nebula-purple drop-shadow-[0_0_15px_currentColor]" />
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-orbitron font-black text-glow-nebula-purple">
          Stratégie Quantique <span className="text-gradient-cosmic">IA</span>
        </h1>
        <p className="text-lg md:text-xl text-bizzwiz-comet-tail mt-4 max-w-2xl mx-auto">
          Naviguez les complexités de l'intelligence artificielle avec nos experts et tracez la trajectoire optimale pour votre transformation digitale.
        </p>
      </motion.div>

      <motion.section variants={itemVariants} className="mb-16 md:mb-20">
        <h2 className="text-2xl sm:text-3xl font-orbitron font-bold text-center mb-10 text-bizzwiz-star-white">
          Nos Domaines d'<span className="text-bizzwiz-nebula-purple">Expertise</span> en Consultation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="p-6 glassmorphic-card border-bizzwiz-nebula-purple/20 hover:border-bizzwiz-electric-cyan/40 flex flex-col items-center text-center"
            >
              <div className="p-3 mb-4 rounded-full bg-gradient-to-br from-bizzwiz-deep-space to-bizzwiz-electric-cyan/15 border border-bizzwiz-nebula-purple/30 shadow-lg">
                {service.icon}
              </div>
              <h3 className="text-lg font-orbitron font-semibold mb-2 text-bizzwiz-star-white">{service.title}</h3>
              <p className="text-sm text-bizzwiz-comet-tail leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section variants={itemVariants} className="mb-16 md:mb-20">
        <h2 className="text-2xl sm:text-3xl font-orbitron font-bold text-center mb-12 text-bizzwiz-star-white">
          Votre Voyage de <span className="text-bizzwiz-magenta-flare">Transformation IA</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {consultationPhases.map((phase) => (
            <motion.div 
              key={phase.phase}
              variants={itemVariants}
              className={`p-6 rounded-xl shadow-xl bg-bizzwiz-glass-bg border border-${phase.color}/30 hover:shadow-${phase.color}/30 transition-shadow duration-300`}
            >
              <div className={`w-12 h-12 mb-4 rounded-lg bg-${phase.color}/20 flex items-center justify-center text-${phase.color} border border-${phase.color}/40`}>
                <span className="font-orbitron text-xl font-bold">{phase.phase}</span>
              </div>
              <h3 className={`text-xl font-orbitron font-semibold mb-2 text-${phase.color}`}>{phase.title}</h3>
              <p className="text-sm text-bizzwiz-comet-tail leading-relaxed">{phase.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.div variants={itemVariants} className="text-center">
        <p className="text-lg text-bizzwiz-comet-tail mb-6">Prêt à définir votre stratégie IA et conquérir de nouveaux horizons ?</p>
        <Button 
          size="lg" 
          className="cyber-button group text-sm md:text-base px-8 md:px-10 py-4 md:py-5"
          onClick={() => navigate('/contact?subject=consultation-ia')}
        >
          <Telescope size={20} className="mr-2.5 transform transition-transform duration-300 group-hover:rotate-[5deg] group-hover:scale-110" />
          Planifier Ma Consultation Stratégique
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default ConsultationPage;