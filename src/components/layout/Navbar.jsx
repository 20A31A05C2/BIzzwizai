import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const navItems = [
    { name: 'Notre travail', href: '#our-work' },
    { name: 'Processus', href: '#how-it-works' },
    { name: 'Services', href: '#services' },
    { name: 'Nous contacter', href: '#contact' }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Smooth scroll to section
  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      const navbarHeight = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  // Handle navbar visibility on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setIsMenuOpen(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 md:px-6 py-3 md:py-4 font-montserrat"
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className={`backdrop-blur-md ${isMenuOpen ? 'bg-black/40' : 'bg-black/20'} border border-white/10 rounded-2xl sm:rounded-3xl px-3 sm:px-4 md:px-6 py-2.5 md:py-3 shadow-2xl transition-colors duration-300`}>
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center flex-shrink-0">
              <Link
                  to="/"
                  className="transition-all duration-300 hover:scale-105 hover:shadow-md hover:shadow-white/20 rounded-full"
                  aria-label="Retour à la page d'accueil"
                >
                  <img
                    src="/logo.jpg"
                    alt="Logo"
                    className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 object-contain"
                  />
                </Link>
              </div>

              {/* Desktop Navigation Items */}
              <div className="hidden lg:flex items-center space-x-4 xl:space-x-6 border border-white/20 rounded-xl xl:rounded-2xl bg-[#0d0d0d] px-4 xl:px-6 py-2">
                {navItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToSection(item.href)}
                    className="text-white transition-all duration-300 text-sm font-medium px-2 xl:px-3 py-1 rounded-lg xl:rounded-xl
                               hover:text-white/80 hover:bg-white/10 hover:backdrop-blur-md hover:border hover:border-white/10 hover:shadow-md hover:shadow-white/10
                               whitespace-nowrap cursor-pointer"
                  >
                    {item.name}
                  </button>
                ))}
              </div>

              {/* Desktop Get Started Button */}
              <Link
                to="/login"
                className="hidden sm:flex bg-gradient-to-r from-purple-600 via-purple-500 to-purple-500
                           hover:from-purple-700 hover:via-purple-600 hover:to-purple-600
                           text-white px-3 sm:px-4 md:px-6 py-2 md:py-2.5 rounded-full font-medium text-xs sm:text-sm
                           transition-all duration-300 hover:scale-105
                           hover:shadow-lg hover:shadow-purple-500/25
                           items-center space-x-1 sm:space-x-2 group flex-shrink-0"
              >
                <span>Commencer</span>
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>

              {/* Mobile Menu Button */}
              <button 
                className="lg:hidden text-white/90 hover:text-white transition-colors p-1.5 sm:p-2"
                onClick={toggleMenu}
                aria-label="Basculer le menu"
              >
                <svg 
                  className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

            {/* Mobile Menu */}
            <div className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
              isMenuOpen ? 'max-h-96 opacity-100 mt-3 sm:mt-4' : 'max-h-0 opacity-0'
            }`}>
              <div className="border-t border-white/10 pt-3 sm:pt-4">
                <div className="flex flex-col space-y-2 sm:space-y-3">
                  {navItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => scrollToSection(item.href)}
                      className="text-white transition-all duration-300 text-sm font-medium px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl
                                 hover:text-white/80 hover:bg-white/10 hover:backdrop-blur-md
                                 border border-transparent hover:border-white/10
                                 hover:shadow-md hover:shadow-white/10
                                 text-center cursor-pointer"
                    >
                      {item.name}
                    </button>
                  ))}
                  
                  {/* Mobile Get Started Button */}
                  <Link
                    to="/login"
                    className="sm:hidden bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500
                               hover:from-purple-700 hover:via-purple-600 hover:to-pink-600
                               text-white px-4 py-2.5 rounded-full font-medium text-sm
                               transition-all duration-300 hover:scale-105
                               hover:shadow-lg hover:shadow-purple-500/25
                               flex items-center justify-center space-x-2 group
                               mx-3 mt-2"
                  >
                    <span>Commencer</span>
                    <svg
                      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;