"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  ArrowUp,
} from "lucide-react";
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Define footer links structure with translation keys
  const footerLinksData = {
    // services: [
    //   { key: 'footer.services.webDevelopment', href: "#" },
    //   { key: 'footer.services.mobileApps', href: "#" },
    //   { key: 'footer.services.uiUxDesign', href: "#" },
    //   { key: 'footer.services.digitalMarketing', href: "#" },
    //   { key: 'footer.services.consulting', href: "#" },
    // ],
    company: [
      { key: 'footer.company.aboutUs', href: "#" },
      { key: 'footer.company.ourTeam', href: "#" },
      { key: 'footer.company.careers', href: "#" },
      { key: 'footer.company.contact', href: "#" },
      // { key: 'footer.company.blog', href: "#" },
    ],
    resources: [
      { key: 'footer.resources.documentation', href: "/documentation" },
      { key: 'footer.resources.helpCenter', href: "#" },
      { key: 'footer.resources.privacyPolicy', href: "#" },
      { key: 'footer.resources.termsOfUse', href: "#" },
      { key: 'footer.resources.cookiePolicy', href: "#" },
    ],
  };

  const socialLinks = [
    // { Icon: Facebook, href: "https://www.facebook.com/bizzwizai", color: "hover:text-blue-400" },
    // { Icon: Twitter, href: "https://x.com/bizzwizai", color: "hover:text-sky-400" },
    // { Icon: Instagram, href: "https://instagram.com/bizzwizai", color: "hover:text-pink-400" },
    { Icon: Linkedin, href: "https://linkedin.com/company/bizzwizai", color: "hover:text-blue-500" },
    { Icon: Github, href: "https://github.com/bizzwizai", color: "hover:text-gray-300" },
  ];

  return (
    <footer className="relative bg-black text-white font-montserrat overflow-hidden py-0">
      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16 lg:py-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 md:gap-16">
          {/* Left Section: Logo and Contact */}
          <motion.div
            className="lg:col-span-4 text-center lg:text-left"
            variants={itemVariants}
          >
            <div className="flex items-center justify-center lg:justify-start gap-3 sm:gap-4 md:gap-5 mb-3 sm:mb-4 md:mb-6">
              <img
                src="/logo.jpg"
                alt={t('footer.logoAlt')}
                className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 rounded-lg sm:rounded-xl lg:rounded-2xl object-contain"
              />
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">
                BizzwizAI
              </h3>
            </div>

            <p className="text-gray-300 mb-4 sm:mb-6 md:mb-8 leading-relaxed text-sm sm:text-base md:text-lg lg:text-xl max-w-md mx-auto lg:mx-0">
              {t('footer.description')}
            </p>

            {/* Contact Info */}
            <div className="space-y-2 sm:space-y-3 md:space-y-4 text-gray-300 text-sm sm:text-base md:text-lg">
              <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3 md:gap-4">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-purple-400 flex-shrink-0" />
                <span className="break-all">contact@bizzwiz.ai</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3 md:gap-4">
                <Phone className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-blue-400 flex-shrink-0" />
                <span>+33 0 800 BIZZ WIZ</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3 md:gap-4">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-green-400 flex-shrink-0" />
                <span className="text-center lg:text-left">{t('footer.address')}</span>
              </div>
            </div>
          </motion.div>

          {/* Right Section: Footer Links */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 md:gap-10 mt-6 lg:mt-0">
            {Object.entries(footerLinksData).map(([category, links], index) => (
              <motion.div
                key={category}
                className="text-center sm:text-left"
                variants={itemVariants}
                custom={index}
              >
                <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4 md:mb-6 bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">
                  {t(`footer.categories.${category}`)}
                </h4>
                <ul className="space-y-2 sm:space-y-3 md:space-y-4">
                  {links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      {link.href.startsWith('/') ? (
                        <Link
                          to={link.href}
                          className="text-gray-300 hover:text-white transition-all duration-300 text-sm sm:text-base md:text-lg hover:translate-x-1 inline-block hover:scale-105"
                        >
                          {t(link.key)}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          className="text-gray-300 hover:text-white transition-all duration-300 text-sm sm:text-base md:text-lg hover:translate-x-1 inline-block hover:scale-105"
                        >
                          {t(link.key)}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Footer */}
        <motion.div 
          className="mt-8 sm:mt-12 md:mt-16 lg:mt-20 border-t-2 border-purple-400 pt-4 sm:pt-6 md:pt-8 lg:pt-10 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6"
          variants={itemVariants}
        >
          {/* Social Icons */}
          <div className="flex gap-3 sm:gap-4 md:gap-5 order-2 md:order-1">
            {socialLinks.map(({ Icon, href, color }, index) => (
              <motion.a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl lg:rounded-2xl flex items-center justify-center text-gray-400 transition-all hover:bg-white/10 hover:border-white/20 ${color} hover:scale-110`}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-gray-400 text-xs sm:text-sm md:text-base text-center order-1 md:order-2">
            {t('footer.copyright')}
          </p>

          {/* Scroll to top */}
          <motion.button
            onClick={scrollToTop}
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg sm:rounded-xl lg:rounded-2xl flex items-center justify-center text-white transition-all hover:scale-110 hover:rotate-12 order-3"
            whileHover={{ scale: 1.1, rotate: 12, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUp className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
          </motion.button>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
