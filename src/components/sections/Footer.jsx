// import { motion } from "framer-motion";
// import {
//   Mail,
//   Phone,
//   MapPin,
//   Facebook,
//   Twitter,
//   Instagram,
//   Linkedin,
//   Github,
//   ArrowUp,
// } from "lucide-react";
// import { useState } from "react";

// const Footer = () => {
//   const [email, setEmail] = useState("");
//   const [isSubscribed, setIsSubscribed] = useState(false);

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const footerLinks = {
//     services: [
//       { name: "Web Development", href: "#" },
//       { name: "Mobile Apps", href: "#" },
//       { name: "UI/UX Design", href: "#" },
//       { name: "Digital Marketing", href: "#" },
//       { name: "Consulting", href: "#" },
//     ],
//     company: [
//       { name: "About Us", href: "#" },
//       { name: "Our Team", href: "#" },
//       { name: "Careers", href: "#" },
//       { name: "Contact", href: "#" },
//       { name: "Blog", href: "#" },
//     ],
//     resources: [
//       { name: "Documentation", href: "#" },
//       { name: "Help Center", href: "#" },
//       { name: "Privacy Policy", href: "#" },
//       { name: "Terms of Service", href: "#" },
//       { name: "Cookie Policy", href: "#" },
//     ],
//   };

//   const socialLinks = [
//     { Icon: Facebook, href: "https://www.facebook.com/bizzwizai", color: "hover:text-blue-400" },
//     { Icon: Twitter, href: "https://x.com/bizzwizai", color: "hover:text-sky-400" },
//     { Icon: Instagram, href: "https://instagram.com/bizzwizai", color: "hover:text-pink-400" },
//     { Icon: Linkedin, href: "https://linkedin.com/company/bizzwizai", color: "hover:text-blue-500" },
//     { Icon: Github, href: "https://github.com/bizzwizai", color: "hover:text-gray-300" },
//   ];

//   return (
//     <footer className="relative bg-black text-white font-montserrat overflow-hidden">
//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
//           {/* Left Section: Logo and Contact */}
//           <motion.div
//             className="lg:col-span-4 text-center lg:text-left"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//           >
//             <div className="flex items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-3 sm:mb-4">
//               <img
//                 src="/logo.jpg"
//                 alt="BizzwizAI Logo"
//                 className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg sm:rounded-xl object-contain"
//               />
//               <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">
//                 BizzwizAI
//               </h3>
//             </div>

//             <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base max-w-md mx-auto lg:mx-0">
//               We bring your digital visions to life with cutting-edge technology and creative excellence.
//               Your success is our mission.
//             </p>

//             {/* Contact Info */}
//             <div className="space-y-2 sm:space-y-3 text-gray-300 text-sm">
//               <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3">
//                 <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400 flex-shrink-0" />
//                 <span className="break-all">contact@bizzwiz.ai</span>
//               </div>
//               <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3">
//                 <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 flex-shrink-0" />
//                 <span>+33 0 800 BIZZ WIZ</span>
//               </div>
//               <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3">
//                 <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />
//                 <span className="text-center lg:text-left">Nebula Quadrant, Station BizzWiz-01</span>
//               </div>
//             </div>
//           </motion.div>

//           {/* Right Section: Footer Links */}
//           <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-6 lg:mt-0">
//             {Object.entries(footerLinks).map(([category, links], index) => (
//               <motion.div
//                 key={category}
//                 className="text-center sm:text-left"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: index * 0.1 }}
//                 viewport={{ once: true }}
//               >
//                 <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent capitalize">
//                   {category}
//                 </h4>
//                 <ul className="space-y-2 sm:space-y-3">
//                   {links.map((link, linkIndex) => (
//                     <li key={linkIndex}>
//                       <a
//                         href={link.href}
//                         className="text-gray-300 hover:text-white transition-colors duration-200 text-sm hover:translate-x-1 inline-block"
//                       >
//                         {link.name}
//                       </a>
//                     </li>
//                   ))}
//                 </ul>
//               </motion.div>
//             ))}
//           </div>
//         </div>

//         {/* Bottom Footer */}
//         <div className="mt-8 sm:mt-12 border-t-2 border-purple-400 pt-4 sm:pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
//           {/* Social Icons */}
//           <div className="flex gap-3 sm:gap-4 order-2 md:order-1">
//             {socialLinks.map(({ Icon, href, color }, index) => (
//               <motion.a
//                 key={index}
//                 href={href}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className={`w-8 h-8 sm:w-10 sm:h-10 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl flex items-center justify-center text-gray-400 transition-all hover:bg-white/10 hover:border-white/20 ${color}`}
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
//               </motion.a>
//             ))}
//           </div>

//           {/* Copyright */}
//           <p className="text-gray-400 text-xs sm:text-sm text-center order-1 md:order-2">
//             © 2025 BizzwizAI. All rights reserved. Built with ❤️
//           </p>

//           {/* Scroll to top */}
//           <motion.button
//             onClick={scrollToTop}
//             className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg sm:rounded-xl flex items-center justify-center text-white transition-all hover:scale-110 hover:rotate-12 order-3"
//             whileHover={{ scale: 1.1, rotate: 12 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <ArrowUp className="w-3 h-3 sm:w-4 sm:h-4" />
//           </motion.button>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;



"use client";

import { motion } from "framer-motion";
import { useState } from "react";
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

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerLinks = {
    Services: [
      { name: "Développement web", href: "#" },
      { name: "Applications mobiles", href: "#" },
      { name: "Conception UI/UX", href: "#" },
      { name: "Marketing numérique", href: "#" },
      { name: "Consulting", href: "#" },
    ],
    Entreprise: [
      { name: "À propos de nous", href: "#" },
      { name: "Notre équipe", href: "#" },
      { name: "Carrières", href: "#" },
      { name: "Contact", href: "#" },
      { name: "Blog", href: "#" },
    ],
    Ressources: [
      { name: "Documentation", href: "#" },
      { name: "Centre d'aide", href: "#" },
      { name: "Politique de confidentialité", href: "#" },
      { name: "Conditions d'utilisation", href: "#" },
      { name: "Politique de cookies", href: "#" },
    ],
  };

  const socialLinks = [
    { Icon: Facebook, href: "https://www.facebook.com/bizzwizai", color: "hover:text-blue-400" },
    { Icon: Twitter, href: "https://x.com/bizzwizai", color: "hover:text-sky-400" },
    { Icon: Instagram, href: "https://instagram.com/bizzwizai", color: "hover:text-pink-400" },
    { Icon: Linkedin, href: "https://linkedin.com/company/bizzwizai", color: "hover:text-blue-500" },
    { Icon: Github, href: "https://github.com/bizzwizai", color: "hover:text-gray-300" },
  ];

  return (
    <footer className="relative bg-black text-white font-montserrat overflow-hidden py-20 sm:py-24 md:py-28 lg:py-32">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
          {/* Left Section: Logo and Contact */}
          <motion.div
            className="lg:col-span-4 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-3 sm:mb-4">
              <img
                src="/logo.jpg"
                alt="Logo BizzwizAI"
                className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg sm:rounded-xl object-contain"
              />
              <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">
                BizzwizAI
              </h3>
            </div>

            <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base max-w-md mx-auto lg:mx-0">
              Nous donnons vie à vos visions numériques avec une technologie de pointe et une excellence créative. Votre succès est notre mission.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 sm:space-y-3 text-gray-300 text-sm">
              <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400 flex-shrink-0" />
                <span className="break-all">contact@bizzwiz.ai</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3">
                <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 flex-shrink-0" />
                <span>+33 0 800 BIZZ WIZ</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />
                <span className="text-center lg:text-left">Quadrant Nébuleuse, Station BizzWiz-01</span>
              </div>
            </div>
          </motion.div>

          {/* Right Section: Footer Links */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-6 lg:mt-0">
            {Object.entries(footerLinks).map(([category, links], index) => (
              <motion.div
                key={category}
                className="text-center sm:text-left"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">
                  {category}
                </h4>
                <ul className="space-y-2 sm:space-y-3">
                  {links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors duration-200 text-sm hover:translate-x-1 inline-block"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-8 sm:mt-12 border-t-2 border-purple-400 pt-4 sm:pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Social Icons */}
          <div className="flex gap-3 sm:gap-4 order-2 md:order-1">
            {socialLinks.map(({ Icon, href, color }, index) => (
              <motion.a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-8 h-8 sm:w-10 sm:h-10 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl flex items-center justify-center text-gray-400 transition-all hover:bg-white/10 hover:border-white/20 ${color}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-gray-400 text-xs sm:text-sm text-center order-1 md:order-2">
            © 2025 BizzwizAI. Tous droits réservés. Construit avec ❤️
          </p>

          {/* Scroll to top */}
          <motion.button
            onClick={scrollToTop}
            className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg sm:rounded-xl flex items-center justify-center text-white transition-all hover:scale-110 hover:rotate-12 order-3"
            whileHover={{ scale: 1.1, rotate: 12 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUp className="w-3 h-3 sm:w-4 sm:h-4" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;