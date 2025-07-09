import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Users, Settings, BarChartBig, Zap, Edit, Briefcase, LogOut } from 'lucide-react';

const AdminSidebar = ({ isSidebarOpenMobile, closeSidebarMobile, handleLogout, currentPath }) => {
  const navItems = [
    { to: "/app-admin/accueil", icon: <BarChartBig />, label: "Vue d'Ensemble" },
    { to: "/app-admin/users", icon: <Users />, label: "Gestion Utilisateurs" },
    { to: "/app-admin/projets", icon: <Briefcase />, label: "Gestion Projets" },
    { to: "/app-admin/schedule-list", icon: <Edit />, label: "Schedule List" },
    { to: "/app-admin/parametres", icon: <Settings />, label: "Paramètres Admin" },
  ];

  const sidebarVariants = {
    open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    closed: { x: "-100%", transition: { type: "spring", stiffness: 300, damping: 30, delay: 0.1 } },
  };

  return (
    <motion.aside
      className={`fixed md:sticky top-0 left-0 h-screen z-50 bg-slate-800/90 backdrop-blur-lg border-r border-slate-700/60 flex flex-col shadow-2xl 
                 ${isSidebarOpenMobile ? 'w-72 p-5' : 'w-0 p-0 md:w-72 md:p-5'}`}
      variants={sidebarVariants}
      initial={false}
      animate={isSidebarOpenMobile || window.innerWidth >= 768 ? "open" : "closed"}
    >
      <div className="flex items-center justify-start mb-10 pt-3 px-2">
        <Link to="/app-admin/dashboard" className="flex items-center">
          <ShieldCheck size={38} className="text-red-500 flex-shrink-0"/>
          <span className="ml-2.5 text-2xl font-['Space_Grotesk'] font-bold tracking-tight text-slate-100">
            Admin<span className="text-red-500">Panel</span>
          </span>
        </Link>
      </div>
      
      <nav className="flex-grow space-y-1 px-1">
        {navItems.map(item => (
          <Link key={item.to} to={item.to} onClick={closeSidebarMobile}>
            <motion.div
              className={`flex items-center p-3 my-1 rounded-lg transition-all duration-200 ease-in-out group ${
                currentPath.startsWith(item.to) && (item.to !== "/adminpage" || currentPath === "/adminpage" || currentPath === "/adminpage/accueil")
                  ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg hover:shadow-red-500/50 scale-105' 
                  : 'text-muted-foreground hover:bg-red-500/10 hover:text-red-500'
              }`}
              whileHover={{ 
                x: currentPath.startsWith(item.to) ? 0 : 4, 
                scale: currentPath.startsWith(item.to) ? 1.05 : 1.04,
                backgroundColor: currentPath.startsWith(item.to) ? '' : 'hsl(0, 100%, 50%, 0.20)',
                boxShadow: currentPath.startsWith(item.to) ? '0 0 15px hsl(0, 100%, 50%, 0.4)' : '0 0 10px hsl(0, 100%, 50%, 0.1)',
              }}
              whileTap={{ scale: 0.96 }}
            >
              {React.cloneElement(item.icon, { className: `transition-colors duration-200 flex-shrink-0 ${currentPath.startsWith(item.to) ? 'text-yellow-300' : 'group-hover:text-red-500'}`, size: 24 })}
              <span className="ml-4 font-semibold text-sm overflow-hidden whitespace-nowrap">
                {item.label}
              </span>
            </motion.div>
          </Link>
        ))}
      </nav>
      
      <div className="mt-auto space-y-1 px-1 pb-2">
        <Link to="/app-admin/dashboard" onClick={closeSidebarMobile}>
          <motion.div
            className={`flex items-center p-3 my-1 rounded-lg transition-all duration-200 ease-in-out group ${
              currentPath === "/app-admin/dashboard"
                ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg hover:shadow-red-500/50 scale-105' 
                : 'text-muted-foreground hover:bg-red-500/10 hover:text-red-500'
            }`}
            whileHover={{ 
              x: currentPath === "/app-admin/dashboard" ? 0 : 4, 
              scale: currentPath === "/app-admin/dashboard" ? 1.05 : 1.04,
              backgroundColor: currentPath === "/app-admin/dashboard" ? '' : 'hsl(0, 100%, 50%, 0.20)',
              boxShadow: currentPath === "/app-admin/dashboard" ? '0 0 15px hsl(0, 100%, 50%, 0.4)' : '0 0 10px hsl(0, 100%, 50%, 0.1)',
            }}
            whileTap={{ scale: 0.96 }}
          >
            <Zap className={`transition-colors duration-200 flex-shrink-0 ${currentPath === "/app-admin/dashboard" ? 'text-yellow-300' : 'group-hover:text-red-500'}`} size={24} />
            <span className="ml-4 font-semibold text-sm overflow-hidden whitespace-nowrap">
              Retour BizzWiz AI
            </span>
          </motion.div>
        </Link>
        <div onClick={handleLogout} className="cursor-pointer">
          <motion.div
            className="flex items-center p-3 my-1 rounded-lg transition-all duration-200 ease-in-out group text-muted-foreground hover:bg-red-500/10 hover:text-red-500"
            whileHover={{ 
              x: 4, 
              scale: 1.04,
              backgroundColor: 'hsl(0, 100%, 50%, 0.20)',
              boxShadow: '0 0 10px hsl(0, 100%, 50%, 0.1)',
            }}
            whileTap={{ scale: 0.96 }}
          >
            <LogOut className="transition-colors duration-200 flex-shrink-0 group-hover:text-red-500" size={24} />
            <span className="ml-4 font-semibold text-sm overflow-hidden whitespace-nowrap">
              Déconnexion Admin
            </span>
          </motion.div>
        </div>
      </div>
    </motion.aside>
  );
};

export default AdminSidebar;