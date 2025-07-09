import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RoleProvider, useRole } from './contexts/RoleContext';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import AdminDashboard from './components/Dashboards/AdminDashboard';
import ChefDashboard from './components/Dashboards/ChefDashboard';
import MemberDashboard from './components/Dashboards/MemberDashboard';
import AdminChat from './components/Admin/AdminChat';
import AdminUsers from './components/Admin/AdminUsers';
import AdminAnalytics from './components/Admin/AdminAnalytics';

const DashboardContent: React.FC = () => {
  const { currentRole } = useRole();
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderDashboard = () => {
    if (activeTab !== 'dashboard') {
      // Gestion des onglets spécifiques pour l'admin
      if (currentRole === 'admin') {
        switch (activeTab) {
          case 'chats':
            return <AdminChat />;
          case 'users':
            return <AdminUsers />;
          case 'analytics':
            return <AdminAnalytics />;
          default:
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-4 capitalize">
                  {activeTab} - {currentRole} View
                </h2>
                <p className="text-gray-600">
                  This section would contain the {activeTab} interface tailored for the {currentRole} role.
                </p>
              </motion.div>
            );
        }
      } else {
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4 capitalize">
              {activeTab} - {currentRole} View
            </h2>
            <p className="text-gray-600">
              This section would contain the {activeTab} interface tailored for the {currentRole} role.
            </p>
          </motion.div>
        );
      }
    }

    switch (currentRole) {
      case 'admin':
        return <AdminDashboard />;
      case 'chef':
        return <ChefDashboard />;
      case 'member':
        return <MemberDashboard />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <div className="flex h-screen">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          
          <main className="flex-1 overflow-y-auto p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentRole}-${activeTab}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderDashboard()}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <RoleProvider>
      <DashboardContent />
    </RoleProvider>
  );
};

export default App;