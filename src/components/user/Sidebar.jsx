import React, { useState } from 'react';
import { Home, FolderOpen, Settings, LogOut, Zap, Palette, Rocket, Menu, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ApiService from '@/apiService';
import { toast } from '@/components/ui/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

function Sidebar({ activeSection, setActiveSection, selectedProject }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await ApiService('/logout', 'POST');
      if (response.success) {
        // Clear localStorage
        localStorage.removeItem('bizwizusertoken');
        localStorage.removeItem('bizzwiz-userId');
        localStorage.removeItem('bizzwiz-userRole');
        localStorage.removeItem('bizzwiz-selectedProjectId');
        localStorage.removeItem('bizzwiz_form_data_id');

        // Show success toast
        toast({
          title: 'Déconnexion réussie',
          description: 'Vous avez été déconnecté avec succès.',
          variant: 'default',
        });

        // Redirect to homepage
        navigate('/');
      } else {
        throw new Error(response.message || 'Échec de la déconnexion.');
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: 'Erreur',
        description: error.message || 'Impossible de se déconnecter.',
        variant: 'destructive',
      });
    }
  };

  // Hamburger button for mobile
  // ... existing code ...
  return (
    <>
      {/* Hamburger menu for mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-black/60 text-white"
        onClick={() => setIsOpen(true)}
        aria-label="Open sidebar"
      >
        <Menu className="w-7 h-7" />
      </button>

      {/* Sidebar for desktop */}
      <div className="hidden md:flex">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: 0 }}
          exit={{ x: -300 }}
          className="w-72 h-screen flex flex-col p-8 bg-transparent"
        >
          {/* Sidebar content unchanged */}
          {/* ... existing code ... */}
          <div className="mb-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-white text-2xl font-light tracking-wider">BIZZ HUB</span>
            </div>
          </div>
          <nav className="flex-1 space-y-3">
            {/* ... existing nav buttons ... */}
            <button
              onClick={() => setActiveSection('cockpit')}
              className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${
                activeSection === 'cockpit' 
                  ? 'bg-purple-500/10 text-white shadow-lg shadow-purple-500/20' 
                  : 'text-white/60 hover:text-white hover:bg-white/5 hover:shadow-lg hover:shadow-white/10'
              }`}
            >
              <Home className="w-5 h-5" />
              <span className="font-light">Ton cockpit</span>
            </button>
            <button
              onClick={() => setActiveSection('projects')}
              className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${
                activeSection === 'projects' 
                  ? 'bg-cyan-500/10 text-white shadow-lg shadow-cyan-500/20' 
                  : 'text-white/60 hover:text-white hover:bg-white/5 hover:shadow-lg hover:shadow-white/10'
              }`}
            >
              <FolderOpen className="w-5 h-5" />
              <span className="font-light">Le Vaisseau</span>
            </button>
            <button
              onClick={() => setActiveSection('new-project')}
              className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${
                activeSection === 'new-project'
                  ? 'bg-green-500/10 text-white shadow-lg shadow-green-500/20'
                  : 'text-white/60 hover:text-white hover:bg-white/5 hover:shadow-lg hover:shadow-green-500/10'
              }`}
            >
              <Rocket className="w-5 h-5" />
              <span className="font-light">Nouveau Projet</span>
            </button>
            <button
              onClick={() => setActiveSection('payment')}
              className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${
                activeSection === 'payment'
                  ? 'bg-yellow-500/10 text-white shadow-lg shadow-yellow-500/20'
                  : 'text-white/60 hover:text-white hover:bg-white/5 hover:shadow-lg hover:shadow-yellow-500/10'
              }`}
            >
              <CreditCard className="w-5 h-5" />
              <span className="font-light">Paiement</span>
            </button>
            <button
              onClick={() => setActiveSection('wiz-studio')}
              className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${
                activeSection === 'wiz-studio' 
                  ? 'bg-purple-500/10 text-white shadow-lg shadow-purple-500/20' 
                  : 'text-white/60 hover:text-white hover:bg-white/5 hover:shadow-lg hover:shadow-white/10'
              }`}
            >
              <Palette className="w-5 h-5" />
              <span className="font-light">WIZ Studio</span>
            </button>
            <button
              onClick={() => setActiveSection('wiz-learn')}
              className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${
                activeSection === 'wiz-learn' 
                  ? 'bg-cyan-500/10 text-white shadow-lg shadow-cyan-500/20' 
                  : 'text-white/60 hover:text-white hover:bg-white/5 hover:shadow-lg hover:shadow-white/10'
              }`}
            >
              <Rocket className="w-5 h-5" />
              <span className="font-light">WIZ Learn</span>
            </button>
            <button
              onClick={() => setActiveSection('settings')}
              className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${
                activeSection === 'settings' 
                  ? 'bg-gray-500/10 text-white shadow-lg shadow-gray-500/20' 
                  : 'text-white/60 hover:text-white hover:bg-white/5 hover:shadow-lg hover:shadow-white/10'
              }`}
            >
              <Settings className="w-5 h-5" />
              <span className="font-light">Paramètres</span>
            </button>
          </nav>
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-4 px-6 py-4 rounded-2xl text-white/40 hover:text-red-400 hover:bg-red-500/5 hover:shadow-lg hover:shadow-red-500/10 transition-all duration-300"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-light">Déconnexion</span>
          </button>
        </motion.div>
      </div>

      {/* Sidebar for mobile (drawer) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 z-40 w-72 h-screen flex flex-col p-8 bg-[#18192a] shadow-2xl md:hidden"
          >
            {/* Close button */}
            <button
              className="absolute top-4 right-4 p-2 rounded-lg bg-black/30 text-white"
              onClick={() => setIsOpen(false)}
              aria-label="Close sidebar"
            >
              <span className="text-xl">×</span>
            </button>
            {/* Sidebar content unchanged */}
            <div className="mb-16">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-white text-2xl font-light tracking-wider">BIZZ HUB</span>
              </div>
            </div>
            <nav className="flex-1 space-y-3">
              {/* ... existing nav buttons ... */}
              <button
                onClick={() => { setActiveSection('cockpit'); setIsOpen(false); }}
                className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${
                  activeSection === 'cockpit' 
                    ? 'bg-purple-500/10 text-white shadow-lg shadow-purple-500/20' 
                    : 'text-white/60 hover:text-white hover:bg-white/5 hover:shadow-lg hover:shadow-white/10'
                }`}
              >
                <Home className="w-5 h-5" />
                <span className="font-light">Ton cockpit</span>
              </button>
              <button
                onClick={() => { setActiveSection('projects'); setIsOpen(false); }}
                className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${
                  activeSection === 'projects' 
                    ? 'bg-cyan-500/10 text-white shadow-lg shadow-cyan-500/20' 
                    : 'text-white/60 hover:text-white hover:bg-white/5 hover:shadow-lg hover:shadow-white/10'
                }`}
              >
                <FolderOpen className="w-5 h-5" />
                <span className="font-light">Le Vaisseau</span>
              </button>
              <button
                onClick={() => { setActiveSection('new-project'); setIsOpen(false); }}
                className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${
                  activeSection === 'new-project'
                    ? 'bg-green-500/10 text-white shadow-lg shadow-green-500/20'
                    : 'text-white/60 hover:text-white hover:bg-white/5 hover:shadow-lg hover:shadow-green-500/10'
                }`}
              >
                <Rocket className="w-5 h-5" />
                <span className="font-light">Nouveau Projet</span>
              </button>
              <button
                onClick={() => { setActiveSection('payment'); setIsOpen(false); }}
                className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${
                  activeSection === 'payment'
                    ? 'bg-yellow-500/10 text-white shadow-lg shadow-yellow-500/20'
                    : 'text-white/60 hover:text-white hover:bg-white/5 hover:shadow-lg hover:shadow-yellow-500/10'
                }`}
              >
                <CreditCard className="w-5 h-5" />
                <span className="font-light">Paiement</span>
              </button>
              <button
                onClick={() => { setActiveSection('wiz-studio'); setIsOpen(false); }}
                className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${
                  activeSection === 'wiz-studio' 
                    ? 'bg-purple-500/10 text-white shadow-lg shadow-purple-500/20' 
                    : 'text-white/60 hover:text-white hover:bg-white/5 hover:shadow-lg hover:shadow-white/10'
                }`}
              >
                <Palette className="w-5 h-5" />
                <span className="font-light">WIZ Studio</span>
              </button>
              <button
                onClick={() => { setActiveSection('wiz-learn'); setIsOpen(false); }}
                className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${
                  activeSection === 'wiz-learn' 
                    ? 'bg-cyan-500/10 text-white shadow-lg shadow-cyan-500/20' 
                    : 'text-white/60 hover:text-white hover:bg-white/5 hover:shadow-lg hover:shadow-white/10'
                }`}
              >
                <Rocket className="w-5 h-5" />
                <span className="font-light">WIZ Learn</span>
              </button>
              <button
                onClick={() => { setActiveSection('settings'); setIsOpen(false); }}
                className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${
                  activeSection === 'settings' 
                    ? 'bg-gray-500/10 text-white shadow-lg shadow-gray-500/20' 
                    : 'text-white/60 hover:text-white hover:bg-white/5 hover:shadow-lg hover:shadow-white/10'
                }`}
              >
                <Settings className="w-5 h-5" />
                <span className="font-light">Paramètres</span>
              </button>
            </nav>
            <button
              onClick={() => { handleLogout(); setIsOpen(false); }}
              className="w-full flex items-center space-x-4 px-6 py-4 rounded-2xl text-white/40 hover:text-red-400 hover:bg-red-500/5 hover:shadow-lg hover:shadow-red-500/10 transition-all duration-300"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-light">Déconnexion</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Sidebar;