// import React from 'react';
// import { motion } from 'framer-motion';
// import { 
//   FileText, Eye, Figma, Map, BarChart3, CreditCard,
//   Mail, TrendingUp, Target, FileCode
// } from 'lucide-react';

// const FeaturesSection = () => {
//   const bizzHubFeatures = [
//     { icon: <FileText className="w-5 h-5 sm:w-6 sm:h-6" />, title: "Business plan IA", description: "AI-powered business planning and strategy development" },
//     { icon: <Eye className="w-5 h-5 sm:w-6 sm:h-6" />, title: "Logo & identité visuelle", description: "Complete visual identity and brand design solutions" },
//     { icon: <Figma className="w-5 h-5 sm:w-6 sm:h-6" />, title: "Maquette Figma", description: "Professional UI/UX design mockups and prototypes" },
//     { icon: <Map className="w-5 h-5 sm:w-6 sm:h-6" />, title: "Devis + roadmap", description: "Detailed project quotes with comprehensive roadmaps" },
//     { icon: <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6" />, title: "Dashboard live", description: "Real-time analytics and performance monitoring" }
//   ];

//   const wizGrowFeatures = [
//     { icon: <CreditCard className="w-5 h-5 sm:w-6 sm:h-6" />, title: "Mini CRM", description: "Streamlined customer relationship management" },
//     { icon: <Mail className="w-5 h-5 sm:w-6 sm:h-6" />, title: "Emailing IA", description: "AI-driven email marketing campaigns" },
//     { icon: <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />, title: "Analytics & SEO sim", description: "Advanced analytics and SEO simulation tools" },
//     { icon: <Target className="w-5 h-5 sm:w-6 sm:h-6" />, title: "Tunnel marketing", description: "Optimized marketing funnel strategies" },
//     { icon: <FileCode className="w-5 h-5 sm:w-6 sm:h-6" />, title: "Templates & scripts", description: "Ready-to-use templates and automation scripts" }
//   ];

//   return (
//     // This parent container correctly centers all the content within the viewport
//     <div className="w-full h-full flex flex-col items-center justify-center bg-black font-montserrat p-4">
//       <div className="max-w-7xl w-full mx-auto">
//         <div className="text-center mb-12 sm:mb-16">
//           <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent drop-shadow-[0_0_32px_rgba(255,255,255,0.3)]">
//             Our Services
//           </h2>
//           <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
//             Comprehensive digital solutions to elevate your business
//           </p>
//         </div>
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
//           {/* BIZZ HUB Section */}
//           <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] transition-all duration-300">
//             <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-xl sm:rounded-2xl pointer-events-none" />
//             <div className="flex items-center mb-6">
//               <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center border border-purple-400/20 mr-3 sm:mr-4">
//                 <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-purple-400 to-purple-600 rounded" />
//               </div>
//               <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">
//                 BIZZ HUB
//               </h3>
//             </div>
//             <p className="text-gray-400 mb-6 sm:mb-8 text-sm">
//               Création express de ton projet digital
//             </p>
//             <div className="space-y-3 sm:space-y-4">
//               {bizzHubFeatures.map((feature, index) => (
//                 <div key={index} className="flex items-center p-3 sm:p-4 rounded-lg sm:rounded-xl backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
//                   <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md sm:rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center border border-purple-400/20 mr-3 sm:mr-4 text-purple-300 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
//                     {feature.icon}
//                   </div>
//                   <div>
//                     <h4 className="font-semibold bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent mb-1 text-sm sm:text-base">{feature.title}</h4>
//                     <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{feature.description}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//           {/* WIZ GROW Section */}
//           <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] transition-all duration-300">
//             <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent rounded-xl sm:rounded-2xl pointer-events-none" />
//             <div className="flex items-center mb-6">
//               <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center border border-blue-400/20 mr-3 sm:mr-4">
//                 <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded" />
//               </div>
//               <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">
//                 WIZ GROW
//               </h3>
//             </div>
//             <p className="text-gray-400 mb-6 sm:mb-8 text-sm">
//               Booster visuel pour ta croissance
//             </p>
//             <div className="space-y-3 sm:space-y-4">
//               {wizGrowFeatures.map((feature, index) => (
//                 <div key={index} className="flex items-center p-3 sm:p-4 rounded-lg sm:rounded-xl backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
//                   <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md sm:rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center border border-blue-400/20 mr-3 sm:mr-4 text-blue-300 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
//                     {feature.icon}
//                   </div>
//                   <div>
//                     <h4 className="font-semibold bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent mb-1 text-sm sm:text-base">{feature.title}</h4>
//                     <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{feature.description}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* UPDATED: Removed the large bottom padding (pb-*) from this container */}
//         <div className="text-center mt-12 sm:mt-16">
//           <div className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 rounded-full backdrop-blur-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group">
//             <span className="bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent font-semibold mr-2 text-sm sm:text-base">
//               Ready to get started?
//             </span>
//             <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//               <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//               </svg>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FeaturesSection;


import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, Eye, Figma, Map, BarChart3, CreditCard,
  Mail, TrendingUp, Target, FileCode
} from 'lucide-react';

const FeaturesSection = () => {
  const bizzHubFeatures = [
    { icon: <FileText className="w-5 h-5 sm:w-6 sm:h-6" />, title: "Plan d'affaires IA", description: "Planification et stratégie d'entreprise alimentées par l'IA" },
    { icon: <Eye className="w-5 h-5 sm:w-6 sm:h-6" />, title: "Logo & identité visuelle", description: "Solutions complètes de conception d'identité visuelle et de marque" },
    { icon: <Figma className="w-5 h-5 sm:w-6 sm:h-6" />, title: "Maquette Figma", description: "Maquettes et prototypes de conception UI/UX professionnels" },
    { icon: <Map className="w-5 h-5 sm:w-6 sm:h-6" />, title: "Devis + roadmap", description: "Devis de projet détaillés avec des feuilles de route complètes" },
    { icon: <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6" />, title: "Tableau de bord en direct", description: "Analyse et suivi des performances en temps réel" }
  ];

  const wizGrowFeatures = [
    { icon: <CreditCard className="w-5 h-5 sm:w-6 sm:h-6" />, title: "Mini CRM", description: "Gestion simplifiée des relations avec les clients" },
    { icon: <Mail className="w-5 h-5 sm:w-6 sm:h-6" />, title: "Emailing IA", description: "Campagnes de marketing par email alimentées par l'IA" },
    { icon: <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />, title: "Analyse & Simulation SEO", description: "Outils avancés d'analyse et de simulation SEO" },
    { icon: <Target className="w-5 h-5 sm:w-6 sm:h-6" />, title: "Tunnel marketing", description: "Stratégies de tunnel de marketing optimisées" },
    { icon: <FileCode className="w-5 h-5 sm:w-6 sm:h-6" />, title: "Modèles & scripts", description: "Modèles prêts à l'emploi et scripts d'automatisation" }
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-black font-montserrat p-4">
      <div className="max-w-7xl w-full mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent drop-shadow-[0_0_32px_rgba(255,255,255,0.3)]">
            Nos Services
          </h2>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
            Solutions numériques complètes pour propulser votre entreprise
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* BIZZ HUB Section */}
          <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-xl sm:rounded-2xl pointer-events-none" />
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center border border-purple-400/20 mr-3 sm:mr-4">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-purple-400 to-purple-600 rounded" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">
                BIZZ HUB
              </h3>
            </div>
            <p className="text-gray-400 mb-6 sm:mb-8 text-sm">
              Création express de ton projet digital
            </p>
            <div className="space-y-3 sm:space-y-4">
              {bizzHubFeatures.map((feature, index) => (
                <div key={index} className="flex items-center p-3 sm:p-4 rounded-lg sm:rounded-xl backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md sm:rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center border border-purple-400/20 mr-3 sm:mr-4 text-purple-300 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent mb-1 text-sm sm:text-base">{feature.title}</h4>
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* WIZ GROW Section */}
          <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent rounded-xl sm:rounded-2xl pointer-events-none" />
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center border border-blue-400/20 mr-3 sm:mr-4">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">
                WIZ GROW
              </h3>
            </div>
            <p className="text-gray-400 mb-6 sm:mb-8 text-sm">
              Booster visuel pour ta croissance
            </p>
            <div className="space-y-3 sm:space-y-4">
              {wizGrowFeatures.map((feature, index) => (
                <div key={index} className="flex items-center p-3 sm:p-4 rounded-lg sm:rounded-xl backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md sm:rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center border border-blue-400/20 mr-3 sm:mr-4 text-blue-300 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent mb-1 text-sm sm:text-base">{feature.title}</h4>
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-12 sm:mt-16">
          <div className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 rounded-full backdrop-blur-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group">
            <span className="bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent font-semibold mr-2 text-sm sm:text-base">
              Prêt à commencer ?
            </span>
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
