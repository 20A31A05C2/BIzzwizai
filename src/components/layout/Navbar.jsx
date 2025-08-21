import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isMobileLangDropdownOpen, setIsMobileLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef(null);
  const mobileLangDropdownRef = useRef(null);

  const navItems = [
    { name: t('nav.ourWork'), href: '#our-work' },
    { name: t('nav.process'), href: '#how-it-works' },
    { name: t('nav.services'), href: '#services' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      const navbarHeight = 80;
      const offsetPosition =
        element.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
    setIsMenuOpen(false);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.documentElement.setAttribute('dir', lng === 'ar' ? 'rtl' : 'ltr');
    setIsLangDropdownOpen(false);
    setIsMobileLangDropdownOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setIsMenuOpen(false);
        setIsLangDropdownOpen(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
        setIsLangDropdownOpen(false);
      }
      if (mobileLangDropdownRef.current && !mobileLangDropdownRef.current.contains(event.target)) {
        setIsMobileLangDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-2 xs:px-3 sm:px-4 md:px-6 py-2 md:py-4 font-montserrat"
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className="max-w-7xl mx-auto">
          <div
            className={`backdrop-blur-md ${
              isMenuOpen ? 'bg-black/40' : 'bg-black/20'
            } border border-white/10 rounded-xl sm:rounded-3xl px-3 sm:px-4 md:px-6 py-2 md:py-3 shadow-2xl transition-colors duration-300`}
          >
            <div className="flex items-center justify-between gap-2">
              {/* Logo */}
              <Link
                to="/"
                className="transition-all duration-300 hover:scale-105 hover:shadow-md hover:shadow-white/20 rounded-full flex-shrink-0"
                aria-label={t('nav.home')}
              >
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="h-6 w-6 xs:h-7 xs:w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 object-contain"
                />
              </Link>

              {/* Desktop Nav */}
              <div className="hidden lg:flex items-center space-x-3 xl:space-x-6 border border-white/20 rounded-xl xl:rounded-2xl bg-[#0d0d0d] px-3 xl:px-6 py-1.5">
                {navItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToSection(item.href)}
                    className="text-white transition-all duration-300 text-xs sm:text-sm font-medium px-2 xl:px-3 py-1 rounded-lg xl:rounded-xl hover:text-white/80 hover:bg-white/10 hover:backdrop-blur-md hover:border hover:border-white/10 hover:shadow-md hover:shadow-white/10 whitespace-nowrap"
                  >
                    {item.name}
                  </button>
                ))}
              </div>

              {/* Enhanced Desktop Language Dropdown - Outside Nav */}
              <div className="hidden lg:block relative" ref={langDropdownRef}>
                <button
                  onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                  className="flex items-center gap-2 text-white bg-white/5 backdrop-blur-md border border-white/20 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-300 hover:bg-white/10 hover:border-white/30 hover:shadow-lg hover:shadow-white/10"
                >
                  <span className="text-base">{currentLanguage.flag}</span>
                  <span className="hidden xl:inline">{currentLanguage.name}</span>
                  <span className="xl:hidden">{currentLanguage.code.toUpperCase()}</span>
                  <motion.svg
                    className="w-4 h-4"
                    animate={{ rotate: isLangDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </button>

                <AnimatePresence>
                  {isLangDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full right-0 mt-2 min-w-[180px] bg-black/90 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl overflow-hidden z-[60]"
                    >
                      {languages.map((language) => (
                        <button
                          key={language.code}
                          onClick={() => changeLanguage(language.code)}
                          className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-all duration-200 hover:bg-white/10 first:rounded-t-xl last:rounded-b-xl ${
                            currentLanguage.code === language.code 
                              ? 'text-purple-400 bg-white/5' 
                              : 'text-white'
                          }`}
                        >
                          <span className="text-lg">{language.flag}</span>
                          <span className="font-medium flex-1 text-left">{language.name}</span>
                          {currentLanguage.code === language.code && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-2 h-2 bg-purple-500 rounded-full"
                            />
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Desktop Button */}
              <Link
                to="/login"
                className="hidden sm:flex bg-gradient-to-r from-purple-600 via-purple-500 to-purple-500 hover:from-purple-700 hover:via-purple-600 hover:to-purple-600 text-white px-3 sm:px-4 md:px-6 py-1.5 md:py-2 rounded-full font-medium text-xs sm:text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 items-center gap-1"
              >
                <span>{t('nav.getStarted')}</span>
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden text-white/90 hover:text-white transition-colors p-2"
                onClick={toggleMenu}
                aria-label={t('nav.toggleMenu')}
              >
                <svg
                  className={`w-6 h-6 transition-transform duration-300 ${
                    isMenuOpen ? 'rotate-90' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>

            {/* Mobile Menu */}
            <div
              className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
                isMenuOpen
                  ? 'max-h-[400px] opacity-100 mt-3'
                  : 'max-h-0 opacity-0'
              }`}
            >
              <div className="border-t border-white/10 pt-3">
                <div className="flex flex-col space-y-2">
                  {navItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => scrollToSection(item.href)}
                      className="text-white transition-all duration-300 text-sm font-medium px-3 py-2 rounded-lg hover:text-white/80 hover:bg-white/10 hover:backdrop-blur-md border border-transparent hover:border-white/10 hover:shadow-md hover:shadow-white/10 text-center"
                    >
                      {item.name}
                    </button>
                  ))}
                  
                  {/* Enhanced Mobile Language Dropdown */}
                  <div className="relative" ref={mobileLangDropdownRef}>
                    <button
                      onClick={() => setIsMobileLangDropdownOpen(!isMobileLangDropdownOpen)}
                      className="w-full flex items-center justify-between text-white bg-white/5 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 hover:bg-white/10 hover:border-white/30"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{currentLanguage.flag}</span>
                        <span>{currentLanguage.name}</span>
                      </div>
                      <motion.svg
                        className="w-4 h-4"
                        animate={{ rotate: isMobileLangDropdownOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </motion.svg>
                    </button>

                    <AnimatePresence>
                      {isMobileLangDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="fixed top-20 left-4 right-4 bg-black/80 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl overflow-hidden z-[60]"
                        >
                          {languages.map((language) => (
                            <button
                              key={language.code}
                              onClick={() => changeLanguage(language.code)}
                              className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-all duration-200 hover:bg-white/10 ${
                                currentLanguage.code === language.code 
                                  ? 'text-purple-400 bg-white/5' 
                                  : 'text-white'
                              }`}
                            >
                              <span className="text-lg">{language.flag}</span>
                              <span className="font-medium">{language.name}</span>
                              {currentLanguage.code === language.code && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="ml-auto w-2 h-2 bg-purple-500 rounded-full"
                                />
                              )}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Mobile Get Started */}
                  <Link
                    to="/login"
                    className="sm:hidden bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 hover:from-purple-700 hover:via-purple-600 hover:to-pink-600 text-white px-4 py-2.5 rounded-full font-medium text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 flex items-center justify-center gap-2 mt-2"
                  >
                    <span>{t('nav.getStarted')}</span>
                    <svg
                      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Overlay */}
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