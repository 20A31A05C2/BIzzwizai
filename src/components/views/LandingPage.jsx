import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import ProductPreviewSection from '@/components/sections/ProductPreviewSection';
import HeroSection from '@/components/sections/HeroSection';
import ValuePropositionSection from '@/components/sections/ValuePropositionSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import ProjectsCarouselSection from '@/components/sections/ProjectsCarouselSection';
import PricingTeaserSection from '@/components/sections/PricingTeaserSection';
import CallToActionSection from '@/components/sections/CallToActionSection';
import { Button } from '@/components/ui/button';
import { ArrowUpCircle, Facebook, Twitter, Linkedin, Github, Rss, Copyright, HelpCircle } from 'lucide-react';

const sampleProjects = [
  {
    id: 'proj-001',
    title: 'Portail Nébuleux X-7',
    category: 'Web Spatial IA',
    description: 'Une plateforme web immersive avec navigation 3D assistée par IA et génération de contenu dynamique pour une expérience utilisateur hors-norme.',
    imageUrl: 'placeholder_nebula_portal.jpg',
    altText: 'Portail web futuriste avec des effets de nébuleuse',
  },
  {
    id: 'proj-002',
    title: 'Oracle de Contenu V2',
    category: 'Contenu Nébuleux IA',
    description: 'Système de génération de scripts vidéo et articles optimisés SEO, capable d\'adapter le ton et le style à des audiences variées.',
    imageUrl: 'placeholder_content_oracle.jpg',
    altText: 'Interface d\'un système de génération de contenu IA',
  },
  {
    id: 'proj-003',
    title: 'Optimiseur Quantique Alpha',
    category: 'Stratégie Quantique IA',
    description: 'Solution de consultation IA pour l\'optimisation des processus logistiques, réduisant les coûts et améliorant l\'efficacité opérationnelle.',
    imageUrl: 'placeholder_quantum_optimizer.jpg',
    altText: 'Graphiques et données d\'optimisation IA',
  },
  {
    id: 'proj-004',
    title: 'Synthétiseur d\'Identité Visuelle',
    category: 'Web Spatial IA',
    description: 'Générateur de chartes graphiques et logos par IA, offrant des propositions uniques basées sur les valeurs et la mission de l\'entreprise.',
    imageUrl: 'placeholder_visual_identity.jpg',
    altText: 'Exemples de logos et chartes graphiques générés par IA',
  },
  {
    id: 'proj-005',
    title: 'Chronomètre Galactique Pro',
    category: 'Application IA Spécifique',
    description: 'Application de gestion de projet avancée avec prédictions IA des délais et allocation intelligente des ressources cosmiques.',
    imageUrl: 'placeholder_galactic_timer.jpg',
    altText: 'Interface d\'une application de gestion de projet IA',
  }
];


const LandingPage = () => {
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScrollTop && window.pageYOffset > 400) {
        setShowScrollTop(true);
      } else if (showScrollTop && window.pageYOffset <= 400) {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScrollTop]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = [
    { name: 'À Propos de Nous (Concept)', path: '/about-concept' },
    { name: 'Carrières Cosmiques', path: '/careers' },
    { name: 'Blog Nébuleux', path: '/blog' },
    { name: 'Politique de Confidentialité Stellaire', path: '/privacy' },
    { name: 'Termes de Service Galactiques', path: '/terms' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: <Facebook size={20} />, path: 'https://facebook.com/bizzwizai' },
    { name: 'Twitter', icon: <Twitter size={20} />, path: 'https://twitter.com/bizzwizai' },
    { name: 'LinkedIn', icon: <Linkedin size={20} />, path: 'https://linkedin.com/company/bizzwizai' },
    { name: 'GitHub', icon: <Github size={20} />, path: 'https://github.com/bizzwizai' },
  ];

  return (
    <div className="bg-bizzwiz-background overflow-x-hidden">
      <ProductPreviewSection />
      <HeroSection />
      <ValuePropositionSection />
      <HowItWorksSection />
      <ProjectsCarouselSection projects={sampleProjects} />
      <PricingTeaserSection />
      <CallToActionSection />

      <footer className="relative bg-gradient-to-t from-bizzwiz-deep-space/60 via-bizzwiz-deep-space/30 to-transparent pt-16 pb-8 text-bizzwiz-comet-tail/80">
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-bizzwiz-deep-space/0 to-bizzwiz-deep-space/30 -translate-y-full"></div>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
            <div>
              <h3 className="text-lg font-orbitron font-semibold text-bizzwiz-star-white mb-4">BizzWiz AI</h3>
              <p className="text-sm leading-relaxed">
                Votre partenaire de confiance pour la création de solutions IA innovantes, propulsant votre entreprise vers de nouvelles frontières galactiques.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-orbitron font-semibold text-bizzwiz-star-white mb-4">Navigation Stellaire</h3>
              <ul className="space-y-2.5">
                {footerLinks.map(link => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-sm hover:text-bizzwiz-electric-cyan transition-colors duration-200 futuristic-link-glow">
                      {link.name}
                    </Link>
                  </li>
                ))}
                 <li>
                  <Link to="/faq" className="text-sm hover:text-bizzwiz-electric-cyan transition-colors duration-200 futuristic-link-glow flex items-center">
                    <HelpCircle size={16} className="mr-1.5 text-bizzwiz-magenta-flare/80" /> FAQ Intergalactique
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-orbitron font-semibold text-bizzwiz-star-white mb-4">Restez Connecté</h3>
              <div className="flex space-x-4 mb-4">
                {socialLinks.map(social => (
                  <a key={social.name} href={social.path} target="_blank" rel="noopener noreferrer" aria-label={social.name}
                     className="p-2 rounded-full bg-bizzwiz-glass-bg/50 border border-bizzwiz-electric-cyan/20 hover:bg-bizzwiz-electric-cyan/20 hover:text-bizzwiz-star-white transition-all duration-200 transform hover:scale-110 futuristic-icon-glow">
                    {social.icon}
                  </a>
                ))}
              </div>
              <p className="text-sm mb-1.5">Abonnez-vous à notre Holo-Gazette :</p>
              <form className="flex">
                <input type="email" placeholder="Votre email cosmique" className="futuristic-input text-xs !py-2 !px-3 flex-grow min-w-0 rounded-r-none border-r-0 focus:z-10" />
                <Button type="submit" variant="outline" size="sm" className="cyber-button !text-xs !py-2 !px-3 rounded-l-none border-l-bizzwiz-magenta-flare/50 hover:!bg-bizzwiz-magenta-flare/80">
                  <Rss size={16} />
                </Button>
              </form>
            </div>
            <div>
              <h3 className="text-lg font-orbitron font-semibold text-bizzwiz-star-white mb-4">Contactez le QG</h3>
              <p className="text-sm mb-1.5">Email: <a href="mailto:contact@bizzwiz.ai" className="hover:text-bizzwiz-electric-cyan futuristic-link-glow">contact@bizzwiz.ai</a></p>
              <p className="text-sm mb-1.5">HoloLink: <a href="tel:+330800BizzWiz" className="hover:text-bizzwiz-electric-cyan futuristic-link-glow">+33 0 800 BIZZ WIZ</a></p>
              <p className="text-sm">Nebula Quadrant, Station BizzWiz-01</p>
            </div>
          </div>
          <div className="border-t border-bizzwiz-electric-cyan/20 pt-8 text-center">
            <p className="text-xs flex items-center justify-center">
              <Copyright size={14} className="mr-1.5" /> {new Date().getFullYear()} BizzWiz AI. Tous droits réservés à travers la galaxie.
            </p>
            <p className="text-xs mt-1">Conçu avec des Poussières d'Étoiles et du Code Quantique.</p>
          </div>
        </div>
        <AnimatePresence>
          {showScrollTop && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 250, damping: 20 }}
              className="fixed bottom-6 right-6 z-50"
            >
              <Button
                variant="outline"
                size="icon"
                onClick={scrollToTop}
                className="h-12 w-12 rounded-full bg-bizzwiz-magenta-flare/80 text-white hover:bg-bizzwiz-magenta-flare border-2 border-bizzwiz-deep-space shadow-2xl shadow-bizzwiz-magenta-flare/50 hover:scale-105 transition-all duration-200"
                aria-label="Retourner en haut de la page"
              >
                <ArrowUpCircle size={26} />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </footer>
    </div>
  );
};

export default LandingPage;