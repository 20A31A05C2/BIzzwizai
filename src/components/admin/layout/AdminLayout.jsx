import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import AdminDashboard from '../AdminDashboard';
import AdminUsers from '../AdminUsers';
import { Outlet, useNavigate, useLocation, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import AdminUserDetail from '../user/AdminUserDetail';
import { toast } from '@/components/ui/use-toast';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Determine active tab from URL
  const activeTab = location.pathname.split('/')[2] || 'dashboard';

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('bizwizusertoken');
    const userRole = localStorage.getItem('bizzwiz-userRole');
    
    if (!token || userRole !== 'admin') {
      toast({
        title: "Accès Refusé",
        description: "Vous n'avez pas les permissions nécessaires pour accéder à cette page.",
        variant: "destructive",
      });
      if (userRole === 'user') {
        navigate('/select-project');
      } else {
        navigate('/login');
      }
      return;
    }
    
    setIsLoading(false);
  }, [navigate]);

  const handleTabChange = (tab) => {
    navigate(`/admindashboard/${tab === 'dashboard' ? '' : tab}`);
    setSidebarOpen(false); // Close sidebar on mobile after navigation
  };

  if (isLoading) {
    return (
      <div className="flex h-screen overflow-hidden items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
          <p className="text-gray-600">Vérification de l'authentification...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar for mobile (slide-in) */}
      <div className="md:hidden">
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 z-40 w-72 bg-white shadow-xl flex flex-col"
            >
              <Sidebar
                activeTab={activeTab}
                onTabChange={handleTabChange}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                isMobile={true}
              />
            </motion.div>
            {/* Backdrop for mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-30"
              onClick={() => setSidebarOpen(false)}
            />
          </>
        )}
      </div>
      {/* Sidebar for desktop (always visible) */}
      <div className="hidden md:block">
        <Sidebar
          activeTab={activeTab}
          onTabChange={handleTabChange}
          sidebarOpen={true}
          setSidebarOpen={setSidebarOpen}
          isMobile={false}
        />
      </div>
      <div className="flex-1 flex flex-col min-w-0">
        <Header setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 p-2 sm:p-4 md:p-6 bg-gray-50 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;