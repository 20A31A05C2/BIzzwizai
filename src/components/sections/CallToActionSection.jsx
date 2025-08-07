import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Rocket, Mail, Sparkles, ArrowRight, Cpu } from 'lucide-react';
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
          <div className="inline-block rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 p-[2px]">
            <Button 
              size="sm" 
              className="rounded-full bg-[#0e0e1a] text-white w-full h-full flex items-center justify-center text-sm md:text-base px-6 md:px-8 py-3 group font-orbitron font-medium"
              onClick={handleStartProject}
            >
              <Cpu 
                size={20} 
                className="mr-2.5 transition-all duration-300 group-hover:text-yellow-300 group-hover:animate-[spin_1.4s_linear_infinite]" 
              />
              Lancer Ma Fusée Créative
              <ArrowRight 
                size={18} 
                className="ml-2.5 opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
              />
            </Button>
          </div>
        </motion.div>
        
        <motion.div whileHover={{scale: 1.04, y: -5}} whileTap={{scale:0.96}}>
          <div className="inline-block rounded-full bg-gradient-to-r from-bizzwiz-electric-cyan via-teal-400 to-bizzwiz-electric-cyan p-[2px]">
            <Button 
              size="sm" 
              className="rounded-full bg-[#0e0e1a] text-bizzwiz-electric-cyan w-full h-full flex items-center justify-center text-sm md:text-base px-6 md:px-8 py-3 group font-orbitron font-medium hover:bg-[#1a1a2e] hover:text-white transition-all duration-300"
              onClick={handleContactUs}
            >
              <Mail 
                size={20} 
                className="mr-2.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:scale-105 group-hover:text-bizzwiz-magenta-flare" 
              />
              Contacter le Commandement
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CallToActionSection;