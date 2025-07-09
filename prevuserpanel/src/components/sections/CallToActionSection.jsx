import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Rocket, Mail, Sparkles, ArrowRight } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const CallToActionSection = () => {
  const navigate = useNavigate();

  const handleStartProject = () => {
    navigate('/create-project');
  };

  const handleContactUs = () => {
    toast({
      title: "✨ Connexion HoloNet Établie... Presque !",
      description: "Nos ingénieurs peaufinent les hyper-relais. En attendant, initiez votre projet et préparons ensemble le décollage vers l'extraordinaire ! 🚀",
      duration: 4500,
      className: "futuristic-toast"
    });
  };

  const orbVariants = {
    animate: (i) => ({
      scale: [1, 1.35, 0.9, 1.25, 0.95, 1.3, 1],
      opacity: [0.08, 0.25, 0.03, 0.2, 0.06, 0.22, 0.1],
      rotate: [0, 60 * i, -45 * i, 75 * i, -30 * i, 50 * i, 0],
      filter: [`blur(${2 + i*1.5}px)`, `blur(${3 + i*0.5}px)`, `blur(${2 + i*1.5}px)`],
      transition: {
        duration: 12 + i * 4,
        repeat: Infinity,
        ease: "circInOut",
        delay: i * 0.7
      }
    })
  };

  return (
    <motion.div 
      className="max-w-3xl mx-auto text-center relative py-16 md:py-20" 
      initial={{ opacity:0, y: 60, scale: 0.85 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay:0.15, type:"spring", stiffness:70, damping:18 }}
    >
      <div className="absolute inset-0 -z-10 overflow-visible">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            variants={orbVariants}
            custom={i + 1}
            animate="animate"
            className="absolute rounded-full"
            style={{
              width: 120 + i * 60,
              height: 120 + i * 60,
              left: `${15 + i * 18}%`,
              top: `${20 + i * 12}%`,
              background: `radial-gradient(circle, hsla(var(--${['bizzwiz-electric-cyan-rgb','bizzwiz-magenta-flare-rgb','bizzwiz-nebula-purple-rgb', 'bizzwiz-star-white-rgb'][i]}), 0.08) 0%, transparent 65%)`,
            }}
          />
        ))}
      </div>
      
      <motion.div 
        className="mb-7"
        initial={{ scale:0, opacity:0, rotate:-20}}
        whileInView={{scale:1, opacity:1, rotate:0}}
        transition={{type:"spring", stiffness:160, damping:12, delay:0.3}}
      >
        <Sparkles size={56} className="text-bizzwiz-magenta-flare inline-block drop-shadow-[0_0_25px_hsla(var(--bizzwiz-magenta-flare-rgb),0.9)] animate-[pulse_1.4s_cubic-bezier(0.4,0,0.6,1)_infinite]" />
      </motion.div>
      <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-orbitron font-black text-gradient-cosmic mb-7 leading-tight">
        Prêt Pour Votre Odyssée Digitale ?
      </p>
      <p className="text-md md:text-lg lg:text-xl text-bizzwiz-comet-tail mb-12 font-space-grotesk max-w-xl mx-auto leading-relaxed">
        L'avenir est une toile vierge. Vos idées, notre IA : le duo parfait pour peindre des chefs-d'œuvre numériques. N'attendez plus, le cosmos vous appelle à l'action.
      </p>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-x-6 gap-y-5">
        <motion.div whileHover={{scale: 1.04, y: -5}} whileTap={{scale:0.96}}>
          <Button 
            size="lg" 
            className="cyber-button text-base md:text-lg px-9 py-4.5 w-full sm:w-auto group"
            onClick={handleStartProject}
          >
            <Rocket size={22} className="mr-3 transform -rotate-12 transition-all duration-300 group-hover:rotate-[-5deg] group-hover:scale-110 group-hover:text-yellow-300" />
            Lancer Ma Fusée Créative
            <ArrowRight size={20} className="ml-3 opacity-0 transform -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"/>
          </Button>
        </motion.div>
        <motion.div whileHover={{scale: 1.04, y: -5}} whileTap={{scale:0.96}}>
        <Button 
          variant="outline" 
          size="lg" 
          className="border-2 border-bizzwiz-electric-cyan text-bizzwiz-electric-cyan hover:bg-bizzwiz-electric-cyan/20 hover:text-bizzwiz-star-white text-base md:text-lg px-9 py-4.5 w-full sm:w-auto transition-all duration-300 hover:shadow-[0_0_30px_hsla(var(--bizzwiz-electric-cyan-rgb),0.5)] hover:border-bizzwiz-electric-cyan group rounded-lg font-orbitron font-semibold"
          onClick={handleContactUs}
        >
          <Mail size={22} className="mr-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:scale-105 group-hover:text-bizzwiz-magenta-flare" />
          Contacter le Commandement
        </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CallToActionSection;