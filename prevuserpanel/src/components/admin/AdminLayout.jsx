// import React, { useState, useEffect } from 'react';
// import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Button } from '@/components/ui/button';
// import { ShieldCheck, Users, Settings, BarChartBig, LogOut, Menu, X, Zap, Edit, Briefcase, Loader2 } from 'lucide-react';
// import { useToast } from '@/components/ui/use-toast';
// import ApiService from '@/apiService';

// const AdminSidebarLink = ({ to, icon, children, currentPath, onClick }) => {
//   const isActive = currentPath.startsWith(to) && (to !== "/adminpage" || currentPath === "/adminpage" || currentPath === "/adminpage/accueil");

//   return (
//     <Link to={to} onClick={onClick}>
//       <motion.div
//         className={`flex items-center p-3 my-1 rounded-lg transition-all duration-200 ease-in-out group ${
//           isActive 
//             ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg hover:shadow-red-500/50 scale-105' 
//             : 'text-muted-foreground hover:bg-red-500/10 hover:text-red-500'
//         }`}
//         whileHover={{ 
//             x: isActive ? 0 : 4, 
//             scale: isActive ? 1.05 : 1.04,
//             backgroundColor: isActive ? '' : 'hsl(0, 100%, 50%, 0.20)',
//             boxShadow: isActive ? '0 0 15px hsl(0, 100%, 50%, 0.4)' : '0 0 10px hsl(0, 100%, 50%, 0.1)',
//         }}
//         whileTap={{ scale: 0.96 }}
//       >
//         {React.cloneElement(icon, { className: `transition-colors duration-200 flex-shrink-0 ${isActive ? 'text-yellow-300' : 'group-hover:text-red-500'}`, size: 24 })}
//         <span className="ml-4 font-semibold text-sm overflow-hidden whitespace-nowrap">
//             {children}
//         </span>
//       </motion.div>
//     </Link>
//   );
// };

// const AdminLayout = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const [isSidebarOpenMobile, setIsSidebarOpenMobile] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     const userEmail = localStorage.getItem('bizzwiz-userEmail');
//     setCurrentUser({ email: userEmail || 'admin@bizzwiz.ai' });
//     setIsLoading(false);
//   }, []);

//   const navItems = [
//     { to: "/app-admin/accueil", icon: <BarChartBig />, label: "Vue d'Ensemble" },
//     { to: "/app-admin/users", icon: <Users />, label: "Gestion Utilisateurs" },
//     { to: "/app-admin/projets", icon: <Briefcase />, label: "Gestion Projets" },
//     { to: "/app-admin/contenu", icon: <Edit />, label: "Gestion Contenu User" },
//     { to: "/app-admin/parametres", icon: <Settings />, label: "Paramètres Admin" },
//   ];

//   const sidebarVariants = {
//     open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
//     closed: { x: "-100%", transition: { type: "spring", stiffness: 300, damping: 30, delay: 0.1 } },
//   };

//   const closeSidebarMobile = () => setIsSidebarOpenMobile(false);

//   const handleLogout = async () => {
//     try {
//       const token = localStorage.getItem('bizwizusertoken');

//       await ApiService('/logout', 'POST', null, token);

//       localStorage.removeItem('bizwizusertoken');
//       localStorage.removeItem('bizzwiz-userRole');
//       localStorage.removeItem('bizzwiz-userId');
//       localStorage.removeItem('bizzwiz-userEmail');

//       toast({
//         title: 'Déconnexion Réussie',
//         description: 'Vous avez été déconnecté avec succès.',
//         variant: 'default',
//       });

//       navigate('/connexion', { replace: true });
//     } catch (error) {
//       toast({
//         title: 'Erreur',
//         description: error.response?.data?.message || 'Échec de la déconnexion.',
//         variant: 'destructive',
//       });
//     }
//   };

//   if (isLoading && location.pathname.startsWith('/adminpage')) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-red-500">
//         <Loader2 className="h-12 w-12 animate-spin" />
//         <p className="mt-4 text-lg">Chargement du panneau admin...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex bg-slate-900 text-slate-100 dashboard-bg-pattern-admin">
//       <style jsx="true">{`
//         .dashboard-bg-pattern-admin {
//           background-image: radial-gradient(circle at top left, rgba(220, 38, 38, 0.1) 0%, transparent 30%),
//                             radial-gradient(circle at bottom right, rgba(249, 115, 22, 0.1) 0%, transparent 30%);
//           background-size: 100% 100%;
//         }
//       `}</style>

//       <Button
//         variant="ghost"
//         size="icon"
//         className="fixed top-4 left-4 z-[60] md:hidden text-red-400 hover:bg-red-500/20 p-2 rounded-full shadow-md"
//         onClick={() => setIsSidebarOpenMobile(!isSidebarOpenMobile)}
//       >
//         {isSidebarOpenMobile ? <X size={28} /> : <Menu size={28} />}
//       </Button>

//       <AnimatePresence>
//         {isSidebarOpenMobile && (
//           <motion.div 
//             className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[45] md:hidden"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={closeSidebarMobile}
//           />
//         )}
//       </AnimatePresence>

//       <motion.aside
//         className={`fixed md:sticky top-0 left-0 h-screen z-50 bg-slate-800/90 backdrop-blur-lg border-r border-slate-700/60 flex flex-col shadow-2xl 
//                    ${isSidebarOpenMobile ? 'w-72 p-5' : 'w-0 p-0 md:w-72 md:p-5'}`}
//         variants={sidebarVariants}
//         initial={false}
//         animate={isSidebarOpenMobile || window.innerWidth >= 768 ? "open" : "closed"}
//       >
//         <div className="flex items-center justify-start mb-10 pt-3 px-2">
//           <Link to="/app-admin/dashboard" className="flex items-center">
//             <ShieldCheck size={38} className="text-red-500 flex-shrink-0"/>
//             <span className="ml-2.5 text-2xl font-['Space_Grotesk'] font-bold tracking-tight text-slate-100">
//               Admin<span className="text-red-500">Panel</span>
//             </span>
//           </Link>
//         </div>
        
//         <nav className="flex-grow space-y-1 px-1">
//           {navItems.map(item => (
//             <AdminSidebarLink key={item.to} to={item.to} icon={item.icon} currentPath={location.pathname} onClick={closeSidebarMobile}>
//               {item.label}
//             </AdminSidebarLink>
//           ))}
//         </nav>
        
//         <div className="mt-auto space-y-1 px-1 pb-2">
//           <AdminSidebarLink to="/app-admin/dashboard" icon={<Zap />} currentPath={location.pathname} onClick={closeSidebarMobile}>
//             Retour BizzWiz AI
//           </AdminSidebarLink>
//           <div onClick={handleLogout} className="cursor-pointer">
//             <AdminSidebarLink to="#" icon={<LogOut />} currentPath={location.pathname} onClick={closeSidebarMobile}>
//               Déconnexion Admin
//             </AdminSidebarLink>
//           </div>
//         </div>
//       </motion.aside>

//       <div className="flex-1 flex flex-col overflow-hidden">
//         <header className="sticky top-0 z-40 hidden md:flex h-20 items-center justify-between gap-4 border-b border-slate-700/60 bg-slate-800/80 backdrop-blur-lg px-6 md:px-8">
//           <div>
//             <h2 className="text-xl font-semibold text-slate-300">Panneau d'Administration BizzWiz AI</h2>
//           </div>
//           <div className="flex items-center gap-4">
//             <span className="text-sm text-slate-400">
//               Connecté en tant que : {currentUser?.email || 'Admin'}
//             </span>
//           </div>
//         </header>

//         <main className="flex-1 p-5 md:p-8 lg:p-10 overflow-y-auto scrollbar-thin scrollbar-thumb-red-500/60 scrollbar-track-slate-700">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={location.pathname}
//               initial={{ opacity: 0, y: 25 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -25 }}
//               transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
//             >
//               <Outlet context={{ user: currentUser }} />
//             </motion.div>
//           </AnimatePresence>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;





import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Users, Settings, BarChartBig, LogOut, Menu, X, Zap, Edit, Briefcase, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import ApiService from '@/apiService';

const AdminSidebarLink = ({ to, icon, children, currentPath, onClick }) => {
  const isActive = currentPath.startsWith(to) && (to !== "/app-admin" || currentPath === "/app-admin" || currentPath === "/app-admin/accueil");

  return (
    <Link to={to} onClick={onClick}>
      <motion.div
        className={`flex items-center p-3 my-1 rounded-lg transition-all duration-200 ease-in-out group ${
          isActive 
            ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg hover:shadow-red-500/50 scale-105' 
            : 'text-muted-foreground hover:bg-red-500/10 hover:text-red-500'
        }`}
        whileHover={{ 
            x: isActive ? 0 : 4, 
            scale: isActive ? 1.05 : 1.04,
            backgroundColor: isActive ? '' : 'hsl(0, 100%, 50%, 0.20)',
            boxShadow: isActive ? '0 0 15px hsl(0, 100%, 50%, 0.4)' : '0 0 10px hsl(0, 100%, 50%, 0.1)',
        }}
        whileTap={{ scale: 0.96 }}
      >
        {React.cloneElement(icon, { className: `transition-colors duration-200 flex-shrink-0 ${isActive ? 'text-yellow-300' : 'group-hover:text-red-500'}`, size: 24 })}
        <span className="ml-4 font-semibold text-sm overflow-hidden whitespace-nowrap">
            {children}
        </span>
      </motion.div>
    </Link>
  );
};

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSidebarOpenMobile, setIsSidebarOpenMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const userEmail = localStorage.getItem('bizzwiz-userEmail');
    setCurrentUser({ email: userEmail || 'admin@bizzwiz.ai' });
    setIsLoading(false);
  }, []);

  const navItems = [
    { to: "/app-admin/accueil", icon: <BarChartBig />, label: "Vue d'Ensemble" },
    { to: "/app-admin/users", icon: <Users />, label: "Gestion Utilisateurs" },
    { to: "/app-admin/projets", icon: <Briefcase />, label: "Gestion Projets" },
    { to: "/app-admin/schedule-list", icon: <Edit />, label: "Schedule List" }, // Updated label
    { to: "/app-admin/parametres", icon: <Settings />, label: "Paramètres Admin" },
  ];

  const sidebarVariants = {
    open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    closed: { x: "-100%", transition: { type: "spring", stiffness: 300, damping: 30, delay: 0.1 } },
  };

  const closeSidebarMobile = () => setIsSidebarOpenMobile(false);

const handleLogout = async () => {
  const token = localStorage.getItem('bizwizusertoken');

  try {
    // Fix: Pass parameters in correct order - endpoint, method, data, isFormData, token
    await ApiService('/logout', 'POST', null, false, token);
    
    toast({
      title: 'Déconnexion Réussie',
      description: 'Vous avez été déconnecté avec succès.',
      variant: 'default',
    });
  } catch (error) {
    console.error('Logout error:', error);
    toast({
      title: 'Erreur',
      description: error.response?.data?.message || 'Échec de la déconnexion.',
      variant: 'destructive',
    });
  } finally {
    // Always remove tokens, even if API fails
    localStorage.removeItem('bizwizusertoken');
    localStorage.removeItem('bizzwiz-userRole');
    localStorage.removeItem('bizzwiz-userId');
    localStorage.removeItem('bizzwiz-userEmail');

    navigate('/login', { replace: true });
  }
};


  if (isLoading && location.pathname.startsWith('/app-admin')) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-red-500">
        <Loader2 className="h-12 w-12 animate-spin" />
        <p className="mt-4 text-lg">Chargement du panneau admin...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-slate-900 text-slate-100 dashboard-bg-pattern-admin">
      <style jsx="true">{`
        .dashboard-bg-pattern-admin {
          background-image: radial-gradient(circle at top left, rgba(220, 38, 38, 0.1) 0%, transparent 30%),
                            radial-gradient(circle at bottom right, rgba(249, 115, 22, 0.1) 0%, transparent 30%);
          background-size: 100% 100%;
        }
      `}</style>

      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-[60] md:hidden text-red-400 hover:bg-red-500/20 p-2 rounded-full shadow-md"
        onClick={() => setIsSidebarOpenMobile(!isSidebarOpenMobile)}
      >
        {isSidebarOpenMobile ? <X size={28} /> : <Menu size={28} />}
      </Button>

      <AnimatePresence>
        {isSidebarOpenMobile && (
          <motion.div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[45] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSidebarMobile}
          />
        )}
      </AnimatePresence>

      <motion.aside
        className={`fixed md:sticky top-0 left-0 h-screen z-50 bg-slate-800/90 backdrop-blur-lg border-r border-slate-700/60 flex flex-col shadow-2xl 
                   ${isSidebarOpenMobile ? 'w-72 p-5' : 'w-0 p-0 md:w-72 md:p-5'}`}
        variants={sidebarVariants}
        initial={false}
        animate={isSidebarOpenMobile || window.innerWidth >= 768 ? "open" : "closed"}
      >
        <div className="flex items-center justify-start mb-10 pt-3 px-2">
          <Link to="/app-admin/accueil" className="flex items-center">
            <ShieldCheck size={38} className="text-red-500 flex-shrink-0"/>
            <span className="ml-2.5 text-2xl font-['Space_Grotesk'] font-bold tracking-tight text-slate-100">
              Admin<span className="text-red-500">Panel</span>
            </span>
          </Link>
        </div>
        
        <nav className="flex-grow space-y-1 px-1">
          {navItems.map(item => (
            <AdminSidebarLink key={item.to} to={item.to} icon={item.icon} currentPath={location.pathname} onClick={closeSidebarMobile}>
              {item.label}
            </AdminSidebarLink>
          ))}
        </nav>
        
        <div className="mt-auto space-y-1 px-1 pb-2">
          <div onClick={handleLogout} className="cursor-pointer">
            <AdminSidebarLink to="#" icon={<LogOut />} currentPath={location.pathname} onClick={closeSidebarMobile}>
              Déconnexion Admin
            </AdminSidebarLink>
          </div>
        </div>
      </motion.aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="sticky top-0 z-40 hidden md:flex h-20 items-center justify-between gap-4 border-b border-slate-700/60 bg-slate-800/80 backdrop-blur-lg px-6 md:px-8">
          <div>
            <h2 className="text-xl font-semibold text-slate-300">Panneau d'Administration BizzWiz AI</h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400">
              Connecté en tant que : {currentUser?.email || 'Admin'}
            </span>
          </div>
        </header>

        <main className="flex-1 p-5 md:p-8 lg:p-10 overflow-y-auto scrollbar-thin scrollbar-thumb-red-500/60 scrollbar-track-slate-700">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {children || <Outlet context={{ user: currentUser }} />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;


