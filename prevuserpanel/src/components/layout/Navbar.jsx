import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Atom, Zap, Sparkles, Menu, X, ChevronDown, Rocket, Briefcase, MessageSquare, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const isLandingPage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20); 
    };
    window.addEventListener('scroll', handleScroll);
    document.documentElement.style.setProperty('--navbar-height', '68px'); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinkClasses = (path) => cn(
    "font-medium text-[13.5px] tracking-tight transition-all duration-250 ease-out relative group py-1.5",
    "hover:text-bizzwiz-electric-cyan",
    location.pathname === path || (location.pathname.startsWith('/services') && path === '/services/web-creation' && location.pathname === '/services/web-creation') || (location.pathname.startsWith('/services') && path === '/services/content-generation' && location.pathname === '/services/content-generation') || (location.pathname.startsWith('/services') && path === '/services/consultation' && location.pathname === '/services/consultation')
      ? "text-bizzwiz-electric-cyan" 
      : "text-bizzwiz-comet-tail hover:text-bizzwiz-star-white"
  );

  const navLinkUnderline = (
    <motion.div 
      className="absolute bottom-[-4px] left-0 h-[2px] w-full bg-gradient-to-r from-bizzwiz-magenta-flare to-bizzwiz-electric-cyan rounded-full shadow-[0_0_8px_hsl(var(--bizzwiz-electric-cyan-rgb),0.6)]"
      layoutId="underlineNav"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
    />
  );

  const navItems = [
    { label: 'Portail', path: '/' },
    { 
      label: 'Solutions IA', 
      path: '#services', 
      dropdown: true,
      dropdownItems: [
        { label: 'Web Spatial IA', path: '/services/web-creation', icon: <Zap size={16} className="mr-2.5 text-bizzwiz-electric-cyan" /> },
        { label: 'Contenu Nébuleux IA', path: '/services/content-generation', icon: <Sparkles size={16} className="mr-2.5 text-bizzwiz-magenta-flare" /> },
        { label: 'Stratégie Quantique IA', path: '/services/consultation', icon: <Rocket size={16} className="mr-2.5 text-bizzwiz-nebula-purple" /> },
        { label: 'Portfolio Galactique', path: '/#projects-carousel', icon: <Briefcase size={16} className="mr-2.5 text-yellow-400" /> },
      ]
    },
    { label: 'Tarification', path: '/#pricing-teaser' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleNavigateAndScroll = (path) => {
    if (path.startsWith('/#')) {
      const targetId = path.substring(2);
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            const navbarHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--navbar-height') || '68', 10);
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - navbarHeight;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
          }
        }, 150);
      } else {
        const element = document.getElementById(targetId);
        if (element) {
          const navbarHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--navbar-height') || '68', 10);
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navbarHeight;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }
    } else {
      navigate(path);
    }
    setIsMobileMenuOpen(false);
    setIsServicesMenuOpen(false);
  };

  const renderNavLinks = (isMobile = false) => navItems.map((item) => (
    item.dropdown ? (
      <div key={item.label} className="relative group/main">
        <button
          onClick={() => setIsServicesMenuOpen(!isServicesMenuOpen)}
          className={cn(navLinkClasses(item.path), "flex items-center w-full text-left md:w-auto", location.pathname.startsWith('/services') && "text-bizzwiz-electric-cyan")}
        >
          {item.label}
          <ChevronDown size={16} className={cn("ml-1.5 transition-transform duration-200 ease-in-out group-hover/main:text-bizzwiz-electric-cyan", isServicesMenuOpen ? "rotate-180" : "")} />
           {(location.pathname.startsWith('/services')) && navLinkUnderline}
        </button>
        <AnimatePresence>
        {isServicesMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: isMobile ? 8 : 12, height: 0, scale:0.96 }}
            animate={{ opacity: 1, y: 0, height: 'auto', scale: 1 }}
            exit={{ opacity: 0, y: isMobile ? 8 : 12, height: 0, scale:0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "overflow-hidden mt-1.5",
              isMobile ? "pl-4" : "absolute top-full left-1/2 -translate-x-1/2 w-64 bg-bizzwiz-glass-bg/95 backdrop-blur-xl border border-bizzwiz-electric-cyan/25 rounded-lg shadow-2xl shadow-bizzwiz-nebula-purple/25 p-2 z-50"
            )}
            onMouseEnter={() => !isMobile && setIsServicesMenuOpen(true)}
            onMouseLeave={() => !isMobile && setIsServicesMenuOpen(false)}
          >
            {item.dropdownItems.map(subItem => (
              <button
                key={subItem.label}
                onClick={(e) => { e.preventDefault(); handleNavigateAndScroll(subItem.path);}}
                className={cn(
                  "w-full flex items-center px-3 py-2.5 text-[13px] rounded-md transition-all duration-150 ease-out group/sub",
                  isMobile ? "text-bizzwiz-comet-tail hover:text-bizzwiz-electric-cyan hover:bg-bizzwiz-electric-cyan/10" 
                           : "text-bizzwiz-comet-tail hover:bg-bizzwiz-electric-cyan/15 hover:text-bizzwiz-star-white hover:pl-3.5",
                  location.pathname === subItem.path && (isMobile ? "text-bizzwiz-electric-cyan bg-bizzwiz-electric-cyan/10" : "bg-bizzwiz-electric-cyan/15 text-bizzwiz-star-white pl-3.5")
                )}
              >
                {React.cloneElement(subItem.icon, {className: cn(subItem.icon.props.className, "group-hover/sub:scale-110 group-hover/sub:rotate-[-3deg] transition-transform duration-200")})}
                {subItem.label}
              </button>
            ))}
          </motion.div>
        )}
        </AnimatePresence>
      </div>
    ) : (
      <button
        key={item.label}
        onClick={(e) => { e.preventDefault(); handleNavigateAndScroll(item.path); }}
        className={navLinkClasses(item.path)}
      >
        {item.label}
        {location.pathname === item.path && !item.dropdown && isLandingPage && navLinkUnderline}
        {location.pathname === item.path && !isLandingPage && !location.pathname.startsWith('/services') && navLinkUnderline}
      </button>
    )
  ));

  return (
    <motion.nav
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 22, delay: 0.15, duration: 0.6 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ease-in-out h-[var(--navbar-height,68px)]",
        isScrolled || !isLandingPage || isMobileMenuOpen
          ? "bg-bizzwiz-deep-space/85 backdrop-blur-xl shadow-lg shadow-bizzwiz-nebula-purple/20 border-b border-bizzwiz-electric-cyan/20"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          <Link to="/" className="flex items-center group" onClick={() => {setIsMobileMenuOpen(false); setIsServicesMenuOpen(false);}}>
            <motion.div whileHover={{ scale:1.05, rotate:12 }} transition={{type:"spring", stiffness:300, damping:10}}>
              <Atom size={30} className="text-bizzwiz-electric-cyan group-hover:text-bizzwiz-magenta-flare transition-colors duration-250 drop-shadow-[0_0_12px_currentColor] group-hover:drop-shadow-[0_0_18px_hsla(var(--bizzwiz-magenta-flare-rgb),0.7)]" />
            </motion.div>
            <h1 className="ml-2.5 text-xl md:text-2xl font-orbitron font-bold tracking-tighter">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-bizzwiz-electric-cyan via-bizzwiz-magenta-flare to-bizzwiz-nebula-purple group-hover:brightness-125 transition-all duration-300">
                BizzWiz
              </span>
              <span className="text-bizzwiz-electric-cyan text-opacity-60 group-hover:text-opacity-80 transition-opacity duration-300">AI</span>
            </h1>
          </Link>

          <div className="hidden lg:flex items-center space-x-7">
            {renderNavLinks()}
          </div>

          <div className="hidden lg:flex items-center space-x-3.5">
            <Button
              variant="outline"
              size="sm" 
              onClick={() => navigate('/login')}
              className="border-2 border-bizzwiz-electric-cyan/70 text-bizzwiz-electric-cyan hover:bg-bizzwiz-electric-cyan/15 hover:text-bizzwiz-star-white font-medium text-[13px] px-4 py-[0.85rem] rounded-lg transition-all duration-250 hover:shadow-[0_0_18px_hsla(var(--bizzwiz-electric-cyan-rgb),0.4)] hover:border-bizzwiz-electric-cyan transform hover:scale-103 group"
            >
              <LogIn size={16} className="mr-2 opacity-80 group-hover:opacity-100 transition-opacity"/>
              Connexion
            </Button>
            <Button
              size="sm" 
              onClick={() => navigate('/create-project')}
              className="bg-gradient-to-r from-bizzwiz-magenta-flare to-bizzwiz-nebula-purple hover:from-bizzwiz-magenta-flare/90 hover:to-bizzwiz-nebula-purple/90 text-white font-medium text-[13px] px-5 py-[0.85rem] rounded-lg transition-all duration-250 transform hover:scale-103 navbar-start-button-glow hover:shadow-[0_0_28px_3px_hsla(var(--bizzwiz-magenta-flare-rgb),0.5)] group"
            >
              Débuter Projet IA
              <Zap size={16} className="ml-2 opacity-90 group-hover:opacity-100 transition-opacity group-hover:animate-[pulse_1.2s_ease-out_infinite] group-hover:text-yellow-300" />
            </Button>
          </div>

          <div className="lg:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => { setIsMobileMenuOpen(!isMobileMenuOpen); setIsServicesMenuOpen(false); }}
              className="text-bizzwiz-comet-tail hover:text-bizzwiz-electric-cyan p-1.5 rounded-md"
              aria-label="Ouvrir le menu de navigation"
            >
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -15 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -15 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden absolute top-[var(--navbar-height,68px)] left-0 right-0 bg-bizzwiz-deep-space/95 backdrop-blur-xl shadow-2xl border-t border-bizzwiz-electric-cyan/15"
          >
            <div className="px-5 pt-4 pb-6 space-y-3 flex flex-col">
              {renderNavLinks(true)}
              <Button
                variant="outline"
                size="sm" 
                onClick={() => { navigate('/login'); setIsMobileMenuOpen(false); }}
                className="w-full justify-center border-2 border-bizzwiz-electric-cyan/80 text-bizzwiz-electric-cyan hover:bg-bizzwiz-electric-cyan/15 hover:text-bizzwiz-star-white font-medium py-2.5 rounded-lg text-[13px]"
              >
                <LogIn size={16} className="mr-2"/> Connexion
              </Button>
              <Button
                size="sm" 
                onClick={() => { navigate('/create-project'); setIsMobileMenuOpen(false); }}
                className="w-full justify-center bg-gradient-to-r from-bizzwiz-magenta-flare to-bizzwiz-nebula-purple text-white font-medium py-2.5 rounded-lg text-[13px]"
              >
                Débuter Projet IA
                <Zap size={16} className="ml-2" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;