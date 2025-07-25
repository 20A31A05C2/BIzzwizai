import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Eye, Layers, Zap, ArrowRight } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const ProjectCard3D = ({ project, isActive, offset, angle, onClick }) => {
  const cardStyle = {
    transform: `rotateY(${offset * angle}deg) translateZ(${isActive ? '0px' : '300px'}) translateX(${offset * (isActive ? 0 : 90)}%) scale(${isActive ? 1 : 0.8})`,
    opacity: isActive ? 1 : 0.5,
    zIndex: isActive ? 20 : Math.max(0, 10 - Math.abs(offset)),
    filter: isActive ? 'brightness(1) saturate(1)' : `brightness(${1 - Math.abs(offset)*0.15}) saturate(${1 - Math.abs(offset)*0.2}) blur(${Math.abs(offset)*0.5}px)`,
    transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.6s ease-out, filter 0.6s ease-out',
  };

  const handleViewProject = (e) => {
    e.stopPropagation(); 
    toast({
      title: `🌌 Exploration du projet "${project.title}" initiée...`,
      description: "Les coordonnées de cette nébuleuse créative sont en cours de calcul. Préparez-vous à l'hyper-saut ! 🌠",
      duration: 3500,
      className: "futuristic-toast"
    });
  };

  return (
    <motion.div
      style={cardStyle}
      className="absolute w-full h-full glassmorphic-card flex flex-col overflow-hidden cursor-pointer backface-hidden border-bizzwiz-electric-cyan/20 hover:border-bizzwiz-magenta-flare/35"
      onClick={() => onClick(offset)}
      whileHover={isActive ? { y: -12, scale:1.025, transition:{type:'spring', stiffness:180, damping:12}} : {}}
      layout
    >
      <div className="relative h-48 sm:h-56 md:h-64 group overflow-hidden">
        <img-replace 
          src={project.imageUrl} 
          alt={project.altText || `Visualisation du projet ${project.title}`} 
          className="w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:filter group-hover:brightness-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bizzwiz-deep-space/80 via-bizzwiz-deep-space/30 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-300"></div>
        <div className="absolute top-4 right-4 p-2.5 bg-gradient-to-br from-bizzwiz-magenta-flare to-bizzwiz-nebula-purple rounded-full shadow-lg animate-[pulse_1.7s_cubic-bezier(0.4,0,0.6,1)_infinite]">
           <Layers size={20} className="text-bizzwiz-star-white" />
        </div>
        <div className="absolute bottom-4 left-4">
          <span className="px-4 py-2 bg-gradient-to-r from-bizzwiz-electric-cyan to-bizzwiz-magenta-flare text-bizzwiz-deep-space text-xs font-orbitron font-bold rounded-full shadow-md uppercase tracking-wider">{project.category}</span>
        </div>
      </div>
      <div className="p-5 sm:p-6 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-orbitron font-bold text-bizzwiz-star-white mb-3 leading-tight">{project.title}</h3>
          <p className="text-xs sm:text-sm text-bizzwiz-comet-tail mb-5 h-16 overflow-y-auto font-space-grotesk leading-relaxed scrollbar-thin scrollbar-thumb-bizzwiz-electric-cyan/60 scrollbar-track-transparent pr-2">{project.description}</p>
        </div>
        {isActive && (
          <div className="inline-block rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 p-[2px]">
            <Button
              size="lg"
              className="rounded-full bg-[#0e0e1a] text-white w-full h-full flex items-center justify-center text-base md:text-lg px-9 md:px-14 py-4 group"
              onClick={handleViewProject}
            >
              <Eye
                size={26}
                className="mr-3.5 transition-all duration-300 group-hover:text-yellow-300 group-hover:animate-[spin_1.4s_linear_infinite]"
              />
              Plonger dans le Projet
              <ArrowRight
                size={22}
                className="ml-3.5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
              />
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const ProjectsCarouselSection = ({ projects = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(
    projects && projects.length > 0 ? Math.floor(projects.length / 2) : 0
  );
  const carouselRef = useRef(null);
  const angle = 38; 

  const navigateCarousel = useCallback((direction) => {
    if (projects && projects.length > 0) {
      setCurrentIndex(prevIndex => (prevIndex + direction + projects.length) % projects.length);
    }
  }, [projects]);

  const handleCardClick = (offset) => {
    if (offset !== 0 && projects && projects.length > 0) { 
      setCurrentIndex(prevIndex => (prevIndex + offset + projects.length) % projects.length);
    }
  };

  useEffect(() => {
    if (projects && projects.length > 0) {
      const timer = setTimeout(() => navigateCarousel(1), 8000); 
      return () => clearTimeout(timer);
    }
  }, [currentIndex, navigateCarousel, projects]);

  if (!projects || projects.length === 0) {
    return (
      <section id="projects-carousel" className="py-24 md:py-36 bg-bizzwiz-deep-space/85 relative overflow-hidden section-angled-border-bottom">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Zap size={48} className="text-bizzwiz-magenta-flare mx-auto mb-6" />
          <h2 className="text-3xl font-orbitron font-bold text-gradient-cosmic mb-4">Aucun projet à afficher pour le moment.</h2>
          <p className="text-lg text-bizzwiz-comet-tail">Revenez bientôt pour découvrir nos créations interstellaires !</p>
        </div>
      </section>
    );
  }

  return (
    <section id="projects-carousel" className="py-24 md:py-36 bg-bizzwiz-deep-space/85 relative overflow-hidden section-angled-border-bottom">
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-1/3 left-1/4 w-3/5 h-3/5 bg-gradient-radial from-bizzwiz-electric-cyan/25 to-transparent rounded-full blur-3xl animate-[spin_25s_linear_infinite]"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-20 md:mb-24"
          initial={{ opacity: 0, y: -60, scale:0.85 }}
          whileInView={{ opacity: 1, y: 0, scale:1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], type:"spring", stiffness:70, damping:16 }}
        >
          <div className="inline-block mb-5 p-2.5 bg-bizzwiz-magenta-flare/15 border border-bizzwiz-magenta-flare/35 rounded-full shadow-xl shadow-bizzwiz-magenta-flare/25">
            <Zap size={32} className="text-bizzwiz-magenta-flare" />
          </div>
          <h2 className="text-sm font-roboto-mono uppercase tracking-widest text-bizzwiz-magenta-flare mb-5">NOS CONSTELLATIONS DE PROJETS</h2>
          <p className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-orbitron font-extrabold text-gradient-cosmic mb-9 leading-tight">
            Univers de Créativité IA.
          </p>
          <p className="text-md md:text-lg lg:text-xl text-bizzwiz-comet-tail max-w-xl mx-auto font-space-grotesk leading-relaxed">
            Explorez nos réalisations passées, des écosystèmes numériques façonnés par l'IA et une vision sans compromis.
          </p>
        </motion.div>

        <div className="relative h-[520px] sm:h-[580px] md:h-[650px] w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto perspective-1500 transform-style-3d" ref={carouselRef}>
          {projects.map((project, index) => {
            const offset = index - currentIndex;
            const isActive = index === currentIndex;
            return (
              <ProjectCard3D
                key={project.id}
                project={project}
                isActive={isActive}
                offset={offset}
                angle={angle}
                onClick={handleCardClick}
              />
            );
          })}
        </div>
        
        <div className="flex justify-center items-center mt-14 space-x-7">
          <Button 
            variant="outline" 
            size="icon" 
            className="z-20 bg-bizzwiz-glass-bg/75 hover:bg-bizzwiz-magenta-flare hover:text-bizzwiz-deep-space border-2 border-bizzwiz-magenta-flare/75 hover:border-bizzwiz-magenta-flare text-bizzwiz-magenta-flare w-12 h-12 rounded-full shadow-lg transform hover:scale-105 transition-all duration-250 backdrop-blur-md"
            onClick={() => navigateCarousel(-1)}
            aria-label="Projet précédent"
          >
            <ChevronLeft size={28} />
          </Button>
          <div className="flex space-x-3">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ease-out transform focus:outline-none focus:ring-2 focus:ring-bizzwiz-magenta-flare/60 focus:ring-offset-2 focus:ring-offset-bizzwiz-deep-space ${currentIndex === index ? 'bg-gradient-to-r from-bizzwiz-electric-cyan to-bizzwiz-magenta-flare scale-130 shadow-lg shadow-bizzwiz-magenta-flare/35' : 'bg-bizzwiz-comet-tail/30 hover:bg-bizzwiz-comet-tail/60'}`}
                aria-label={`Aller au projet ${index + 1}`}
              />
            ))}
          </div>
          <Button 
            variant="outline" 
            size="icon" 
            className="z-20 bg-bizzwiz-glass-bg/75 hover:bg-bizzwiz-electric-cyan hover:text-bizzwiz-deep-space border-2 border-bizzwiz-electric-cyan/75 hover:border-bizzwiz-electric-cyan text-bizzwiz-electric-cyan w-12 h-12 rounded-full shadow-lg transform hover:scale-105 transition-all duration-250 backdrop-blur-md"
            onClick={() => navigateCarousel(1)}
            aria-label="Projet suivant"
          >
            <ChevronRight size={28} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsCarouselSection;