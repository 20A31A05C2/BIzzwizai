// import React from 'react';
// import { motion } from 'framer-motion';
// import {
//   LayoutDashboard,
//   FolderKanban,
//   Lightbulb,
//   Settings,
//   MessageSquare as BotMessageSquare,
//   ShieldCheck,
//   Briefcase,
//   CreditCard,
//   Calendar,
//   Map
// } from 'lucide-react';
// import { cn } from '@/lib/utils';


// export const sidebarItems = [
//   { id: 'dashboard', label: 'Accueil', icon: LayoutDashboard, pathSegment: 'dashboard' },
//   { id: 'projets', label: 'Mes Projets', icon: FolderKanban, pathSegment: 'mes-projets' },
//   { id: 'nouveauProjet', label: 'Nouveau projet IA', icon: Lightbulb, pathSegment: 'nouveau-projet' },
//   { id: 'payment', label: 'Facturation', icon: CreditCard, pathSegment: 'facturation' },
//   { id: 'schedule', label: 'Planifier rencontre', icon: Calendar, pathSegment: 'parrainage' },
//   { id: 'roadmap', label: 'RUCHS ADS', icon: Map, pathSegment: 'ruchs-ads' },
//   { id: 'parametres', label: 'Paramètres', icon: Settings, pathSegment: 'parametres' },
// ];

// const Sidebar = ({ activeSection, onSectionClick }) => {
//   const logoText = "BizzWiz AI";
//   const logoIcon = <BotMessageSquare size={28} className="text-[#8f00ff]" />;
  
//   return (
//     <motion.aside 
//       initial={{ x: '-100%' }}
//       animate={{ x: 0 }}
//       transition={{ duration: 0.5, ease: 'circOut' }}
//       className="fixed top-0 left-0 h-full w-64 bg-bizzwiz-deep-space/90 backdrop-blur-lg p-6 flex flex-col z-30 border-r border-[#8f00ff]/20"
//     >
//       <div className="flex items-center mb-10 pt-2 pl-1">
//         <div className="relative w-12 h-12 mr-3">
//           <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#8f00ff] to-[#8f00ff] opacity-70 pulse-glow-slow"></div>
//           <div className="absolute inset-1 rounded-full bg-bizzwiz-deep-space flex items-center justify-center">
//             {logoIcon}
//           </div>
//         </div>
//         <h1 className="text-2xl font-orbitron font-bold tracking-tighter text-[#8f00ff]">
//           {logoText}
//         </h1>
//       </div>

//       <nav className="flex-grow">
//         <ul>
//           {sidebarItems.map((item) => (
//             <li key={item.id} className="mb-2.5">
//               <button
//                 onClick={() => onSectionClick(item.id)}
//                 className={cn(
//                   "w-full flex items-center py-3 px-3.5 rounded-lg transition-all duration-200 ease-in-out text-bizzwiz-comet-tail hover:bg-[#8f00ff]/10 hover:text-bizzwiz-star-white group",
//                   activeSection === item.id && "bg-[#8f00ff] text-bizzwiz-star-white shadow-md shadow-[#8f00ff]/10"
//                 )}
//               >
//                 <item.icon size={20} className={cn("mr-3 group-hover:scale-110 transition-transform", activeSection === item.id && "text-[#8f00ff]")} />
//                 <span className="font-medium text-sm">{item.label}</span>
//               </button>
//             </li>
//           ))}
//         </ul>
//       </nav>
//       <div className="mt-auto text-center pb-2">
//         <p className="text-xs text-bizzwiz-comet-tail/60">© 2025 BizzWiz AI</p>
//         <p className="text-xs text-bizzwiz-comet-tail/50">Version Cosmique 1.0.0</p>
//       </div>
//     </motion.aside>
//   );
// };

// export default Sidebar;


import React from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  FolderKanban,
  Lightbulb,
  Settings,
  MessageSquare as BotMessageSquare,
  ShieldCheck,
  Briefcase,
  CreditCard,
  Calendar,
  Map,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export const sidebarItems = [
  { id: 'dashboard', label: 'Accueil', icon: LayoutDashboard, pathSegment: 'dashboard' },
  { id: 'projets', label: 'Mes Projets', icon: FolderKanban, pathSegment: 'mes-projets' },
  { id: 'nouveauProjet', label: 'Nouveau projet IA', icon: Lightbulb, pathSegment: 'nouveau-projet' },
  { id: 'payment', label: 'Facturation', icon: CreditCard, pathSegment: 'facturation' },
  { id: 'schedule', label: 'Planifier rencontre', icon: Calendar, pathSegment: 'parrainage' },
  { id: 'roadmap', label: 'RUCHS ADS', icon: Map, pathSegment: 'ruchs-ads' },
  { id: 'parametres', label: 'Paramètres', icon: Settings, pathSegment: 'parametres' },
  { id: 'deconnexion', label: 'Déconnexion', icon: LogOut, pathSegment: 'deconnexion' },
];

const Sidebar = ({ activeSection, onSectionClick, onLogout }) => {
  const logoText = "BizzWiz AI";
  const logoIcon = <BotMessageSquare size={28} className="text-[#8f00ff]" />;
  
  return (
    <motion.aside 
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, ease: 'circOut' }}
      className="fixed top-0 left-0 h-full w-64 bg-bizzwiz-deep-space/90 backdrop-blur-lg p-6 flex flex-col z-30 border-r border-[#8f00ff]/20"
    >
      <div className="flex items-center mb-10 pt-2 pl-1">
        <div className="relative w-12 h-12 mr-3">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#8f00ff] to-[#8f00ff] opacity-70 pulse-glow-slow"></div>
          <div className="absolute inset-1 rounded-full bg-bizzwiz-deep-space flex items-center justify-center">
            {logoIcon}
          </div>
        </div>
        <h1 className="text-2xl font-orbitron font-bold tracking-tighter text-[#8f00ff]">
          {logoText}
        </h1>
      </div>

      <nav className="flex-grow">
        <ul>
          {sidebarItems.map((item) => (
            <li key={item.id} className="mb-2.5">
              {item.id === 'deconnexion' ? (
                <Button
                  onClick={onLogout}
                  className={cn(
                    "w-full flex items-center py-3 px-3.5 rounded-lg transition-all duration-200 ease-in-out text-bizzwiz-comet-tail hover:bg-[#8f00ff]/10 hover:text-bizzwiz-star-white group",
                    activeSection === item.id && "bg-[#8f00ff] text-bizzwiz-star-white shadow-md shadow-[#8f00ff]/10"
                  )}
                >
                  <item.icon size={20} className={cn("mr-3 group-hover:scale-110 transition-transform", activeSection === item.id && "text-[#8f00ff]")} />
                  <span className="font-medium text-sm">{item.label}</span>
                </Button>
              ) : (
                <button
                  onClick={() => onSectionClick(item.id)}
                  className={cn(
                    "w-full flex items-center py-3 px-3.5 rounded-lg transition-all duration-200 ease-in-out text-bizzwiz-comet-tail hover:bg-[#8f00ff]/10 hover:text-bizzwiz-star-white group",
                    activeSection === item.id && "bg-[#8f00ff] text-bizzwiz-star-white shadow-md shadow-[#8f00ff]/10"
                  )}
                >
                  <item.icon size={20} className={cn("mr-3 group-hover:scale-110 transition-transform", activeSection === item.id && "text-[#8f00ff]")} />
                  <span className="font-medium text-sm">{item.label}</span>
                </button>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto text-center pb-2">
        <p className="text-xs text-bizzwiz-comet-tail/60">© 2025 BizzWiz AI</p>
        <p className="text-xs text-bizzwiz-comet-tail/50">Version Cosmique 1.0.0</p>
      </div>
    </motion.aside>
  );
};

export default Sidebar;