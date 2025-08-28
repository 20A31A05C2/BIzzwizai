import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Tag, Percent, GitBranch, BarChart3, Cpu, ArrowRight } from 'lucide-react';

const PricingTeaserSection = () => {
  const navigate = useNavigate();

  const handleStartProject = () => {
    navigate('/create-project');
  };

  const advantages = [
    {
      icon: <Tag size={32} className="text-bizzwiz-electric-cyan drop-shadow-[0_0_12px_currentColor]" />,
      title: "Clarté Absolue & Transparence",
      text: "Une tarification limpide comme un cristal de l'espace, sans nébuleuses cachées. Chaque crédit investi est tracé et justifié."
    },
    {
      icon: <Percent size={32} className="text-bizzwiz-magenta-flare drop-shadow-[0_0_12px_currentColor]" />,
      title: "Valeur Cosmique Inégalée",
      text: "Un rapport qualité/prix qui défie les lois de la physique concurrentielle. Garanti à 120% pour une satisfaction interstellaire."
    },
    {
      icon: <GitBranch size={32} className="text-yellow-400 drop-shadow-[0_0_12px_currentColor]" />,
      title: "Flexibilité Quantique & Modulaire",
      text: "Des solutions sur mesure, conçues pour s'adapter à la singularité de votre budget et à l'ampleur de vos ambitions galactiques."
    },
    {
      icon: <BarChart3 size={32} className="text-bizzwiz-nebula-purple drop-shadow-[0_0_12px_currentColor]" />,
      title: "ROI Stellaire & Croissance Accélérée",
      text: "Un retour sur investissement propulsé par l'IA, optimisé pour une croissance exponentielle et une domination de votre secteur."
    }
  ];

  const cardVariants = {
    initial: { opacity: 0, y: 35, filter: "blur(8px) saturate(0.6)" },
    animate: (i) => ({ 
      opacity: 1, y: 0, filter: "blur(0px) saturate(1)",
      transition:{ duration:0.8, ease:[0.16, 1, 0.3, 1], type:"spring", stiffness:70, damping:15, delay: i * 0.14 }
    }),
    hover: {
      y: -12,
      scale: 1.035,
      borderColor: "hsla(var(--bizzwiz-electric-cyan-rgb),0.6)",
      boxShadow: "0 0 35px hsla(var(--bizzwiz-electric-cyan-rgb),0.3), 0 0 18px hsla(var(--bizzwiz-magenta-flare-rgb),0.2), inset 0 0 12px hsla(var(--bizzwiz-deep-space-rgb),0.6)",
      transition: { type: "spring", stiffness: 200, damping: 11 }
    }
  };


  return (
    <section id="pricing-teaser" className="py-24 md:py-36 bg-bizzwiz-deep-space/95 relative overflow-hidden section-clip-path-reverse">
      <div className="absolute inset-0 -z-10 opacity-35">
        <div className="absolute -top-1/3 -left-1/3 w-4/5 h-4/5 bg-gradient-radial from-bizzwiz-magenta-flare/30 to-transparent rounded-full blur-3xl animate-[spin_40s_linear_infinite_reverse]"></div>
        <div className="absolute -bottom-1/3 -right-1/3 w-4/5 h-4/5 bg-gradient-radial from-bizzwiz-nebula-purple/30 to-transparent rounded-full blur-3xl animate-[spin_45s_linear_infinite]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-x-12 gap-y-14 xl:gap-x-20 items-center">
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -80, scale:0.85 }}
            whileInView={{ opacity: 1, x: 0, scale:1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay:0.1, type:"spring", stiffness:60, damping:17 }}
          >
            <h2 className="text-sm font-roboto-mono uppercase tracking-widest text-bizzwiz-magenta-flare mb-5">TARIFICATION DE L'ÈRE QUANTIQUE</h2>
            <p className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-orbitron font-extrabold text-gradient-cosmic mb-9 leading-tight">
              L'Excellence IA, Redéfinie et Accessible.
            </p>
            <p className="text-md md:text-lg lg:text-xl text-bizzwiz-comet-tail mb-10 font-space-grotesk leading-relaxed">
              Chez BizzWiz AI, l'innovation de pointe n'est pas synonyme de coûts astronomiques. Notre architecture IA optimise chaque processus, vous offrant une valeur inégalée dans cet univers et au-delà.
            </p>
            <p className="text-lg md:text-xl lg:text-2xl text-bizzwiz-star-white font-semibold mb-12 font-orbitron bg-clip-text text-transparent bg-gradient-to-r from-bizzwiz-electric-cyan via-bizzwiz-magenta-flare to-bizzwiz-nebula-purple animate-text-gradient-cosmic">
              Notre serment : des prix défiant toute concurrence, pour un impact qui résonne à travers les galaxies.
            </p>
            <motion.div whileHover={{scale: 1.035, y: -3}} whileTap={{scale:0.97}}>
<div className="inline-block rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 p-[2px]">
  <Button
    size="lg"
    className="rounded-full bg-[#0e0e1a] text-white w-full h-full flex items-center justify-center text-base md:text-lg px-9 md:px-14 py-4 group"
    onClick={handleStartProject}
  >
    <Cpu
      size={26}
      className="mr-3.5 transition-all duration-300 group-hover:text-yellow-300 group-hover:animate-[spin_1.4s_linear_infinite]"
    />
    Obtenir Mon Devis Interstellaire
    <ArrowRight
      size={22}
      className="ml-3.5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
    />
  </Button>
</div>

            </motion.div>
          </motion.div>

          <motion.div 
            className="lg:col-span-2 space-y-6"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.05 }}
            variants={{ animate: { transition: { staggerChildren: 0.18, delayChildren: 0.25 }}}}
          >
            {advantages.map((adv, index) => (
              <motion.div 
                key={index} 
                className="flex items-start p-5 md:p-6 glassmorphic-card border-bizzwiz-electric-cyan/30 hover:border-bizzwiz-magenta-flare/45 rounded-xl"
                custom={index}
                variants={cardVariants}
                whileHover="hover"
               >
                <div className="p-3 rounded-lg bg-bizzwiz-deep-space/50 border border-bizzwiz-electric-cyan/25 mr-4 md:mr-5 shadow-xl">
                  {adv.icon}
                </div>
                <div>
                  <h4 className="text-md lg:text-lg font-orbitron font-semibold text-bizzwiz-star-white mb-1.5">{adv.title}</h4>
                  <p className="text-xs lg:text-sm text-bizzwiz-comet-tail font-space-grotesk leading-relaxed">{adv.text}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PricingTeaserSection;