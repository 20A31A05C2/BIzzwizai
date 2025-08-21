import React from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, Eye } from 'lucide-react';

const ProductPreviewSection = () => {
  return (
    <section 
      id="product-preview" 
      className="relative py-16 md:py-24 bg-gradient-to-b from-bizzwiz-deep-space via-bizzwiz-nebula-purple/5 to-bizzwiz-deep-space/20 isolate"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="text-center mb-10 md:mb-12"
        >
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 text-xs font-roboto-mono tracking-wider text-bizzwiz-magenta-flare bg-bizzwiz-magenta-flare/10 rounded-full border border-bizzwiz-magenta-flare/25">
            <Eye size={14} className="mr-2" />
            Aperçu Exclusif
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-orbitron font-bold mb-4">
            Découvrez <span className="text-gradient-cosmic">BizzWiz AI</span> en Action
          </h2>
          <p className="text-base md:text-lg text-bizzwiz-comet-tail max-w-2xl mx-auto leading-relaxed">
            Visualisez la puissance de notre plateforme. Un simple aperçu de la manière dont nous transformons les idées en réalité numérique époustouflante.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-4xl mx-auto aspect-[16/9] rounded-xl md:rounded-2xl overflow-hidden
                     bg-bizzwiz-glass-bg/30 backdrop-blur-lg 
                     border-2 border-bizzwiz-electric-cyan/30 
                     shadow-[0_0_40px_hsla(var(--bizzwiz-electric-cyan-rgb),0.2),_0_0_70px_hsla(var(--bizzwiz-nebula-purple-rgb),0.15)]
                     hover:shadow-[0_0_50px_hsla(var(--bizzwiz-electric-cyan-rgb),0.3),_0_0_80px_hsla(var(--bizzwiz-magenta-flare-rgb),0.25)]
                     hover:border-bizzwiz-magenta-flare/50 transition-all duration-350 group"
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
            <PlayCircle size={64} className="text-bizzwiz-star-white/50 mb-6 opacity-40 group-hover:opacity-70 group-hover:scale-110 transition-all duration-300" />
            <h3 className="text-xl md:text-2xl font-orbitron font-semibold text-bizzwiz-star-white/80 mb-2">
              Votre GIF/Vidéo de Démonstration Ici
            </h3>
            <p className="text-sm md:text-base text-bizzwiz-comet-tail/70">
              Cet espace est réservé pour votre incroyable aperçu animé.
            </p>
            <div className="mt-4 text-xs font-roboto-mono text-bizzwiz-electric-cyan/60">
              (Dimensions recommandées: 16:9)
            </div>
          </div>
          
          <div className="absolute inset-0 -z-10 opacity-30 group-hover:opacity-50 transition-opacity duration-300">
            <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-radial from-bizzwiz-electric-cyan/40 to-transparent filter blur-2xl animate-pulse-slow"></div>
            <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-radial from-bizzwiz-magenta-flare/40 to-transparent filter blur-2xl animate-pulse-slow animation-delay-2000"></div>
            <div className="absolute top-1/4 left-1/2 w-1/2 h-1/2 bg-gradient-radial from-bizzwiz-nebula-purple/30 to-transparent filter blur-3xl animate-pulse-slow animation-delay-4000"></div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default ProductPreviewSection;