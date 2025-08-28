import React, { useState } from 'react';
import { Home, FolderOpen, Settings, LogOut, Zap, Palette, Rocket, Menu, CreditCard, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ApiService from '@/apiService';
import { toast } from '@/components/ui/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

function Sidebar({ activeSection, setActiveSection, selectedProject }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await ApiService('/logout', 'POST');
      if (response.success) {
        localStorage.removeItem('bizwizusertoken');
        localStorage.removeItem('bizzwiz-userId');
        localStorage.removeItem('bizzwiz-userRole');
        localStorage.removeItem('bizzwiz-selectedProjectId');
        localStorage.removeItem('bizzwiz_form_data_id');

        toast({
          title: t('sidebar.toast.success.title'),
          description: t('sidebar.toast.success.description'),
          variant: 'default',
        });

        navigate('/');
      } else {
        throw new Error(response.message || t('sidebar.toast.error.description'));
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: t('sidebar.toast.error.title'),
        description: error.message || t('sidebar.toast.error.description'),
        variant: 'destructive',
      });
    }
  };

  const navItems = [
    { id: 'cockpit', label: t('sidebar.navItems.cockpit'), icon: Home, color: 'blue' },
    { id: 'projects', label: t('sidebar.navItems.projects'), icon: FolderOpen, color: 'green' },
    { id: 'new-project', label: t('sidebar.navItems.newProject'), icon: Rocket, color: 'purple' },
    { id: 'payment', label: t('sidebar.navItems.payment'), icon: CreditCard, color: 'yellow' },
    { id: 'wiz-studio', label: t('sidebar.navItems.wizStudio'), icon: Palette, color: 'blue' },
    { id: 'wiz-learn', label: t('sidebar.navItems.wizLearn'), icon: Rocket, color: 'green' },
    { id: 'ai-generated', label: t('sidebar.navItems.aiGenerated'), icon: Sparkles, color: 'cyan' },
    { id: 'settings', label: t('sidebar.navItems.settings'), icon: Settings, color: 'gray' },
  ];

  return (
    <>
      <Button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 hover:bg-white/30 hover:shadow-lg hover:shadow-white/20 transition-all duration-300 text-white font-montserrat"
        onClick={() => setIsOpen(true)}
        aria-label={t('sidebar.openSidebarAria')}
      >
        <Menu className="w-6 h-6" />
      </Button>

      <div className="hidden md:flex flex-col fixed top-0 left-0 h-screen w-72 bg-black/90 backdrop-blur-3xl border-r border-white/20">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col p-8 h-full"
        >
          <div className="mb-12">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-white text-2xl font-bold font-montserrat tracking-wider">{t('sidebar.title')}</span>
            </div>
          </div>

          <nav className="flex-1 space-y-4 overflow-hidden">
            {navItems.map((item) => (
              <Button
                key={item.id}
                onClick={() => {
                  console.log(`Navigating to section: ${item.id}`);
                  setActiveSection(item.id);
                }}
                className={`w-full flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-300 font-montserrat text-sm font-medium ${
                  activeSection === item.id
                    ? `bg-${item.color}-600/20 backdrop-blur-sm text-${item.color}-300 border border-${item.color}-500/30 hover:bg-${item.color}-600/30 hover:shadow-lg hover:shadow-${item.color}-500/20`
                    : `text-gray-300 bg-white/10 border border-white/20 hover:bg-white/20 hover:text-white hover:shadow-lg hover:shadow-white/20`
                }`}
                aria-label={item.label}
              >
                <item.icon className="w-5 h-5 hover:scale-105 transition-transform" />
                <span>{item.label}</span>
              </Button>
            ))}
          </nav>

          <Button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm text-gray-300 font-montserrat text-sm font-medium border border-white/20 hover:bg-red-600/20 hover:text-red-300 hover:border-red-500/30 hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300"
            aria-label={t('sidebar.logout')}
          >
            <LogOut className="w-5 h-5 hover:scale-105 transition-transform" />
            <span>{t('sidebar.logout')}</span>
          </Button>
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 z-50 w-72 h-screen flex flex-col p-8 bg-black/90 backdrop-blur-3xl border-r border-white/20 md:hidden"
          >
            <Button
              className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 hover:bg-white/30 hover:shadow-lg hover:shadow-white/20 transition-all duration-300 text-white"
              onClick={() => setIsOpen(false)}
              aria-label={t('sidebar.closeSidebarAria')}
            >
              <span className="text-xl">x</span>
            </Button>

            <div className="mb-12">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <span className="text-white text-2xl font-bold font-montserrat tracking-wider">{t('sidebar.title')}</span>
              </div>
            </div>

            <nav className="flex-1 space-y-4 overflow-hidden">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  onClick={() => {
                    console.log(`Navigating to section: ${item.id}`);
                    setActiveSection(item.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-300 font-montserrat text-sm font-medium ${
                    activeSection === item.id
                      ? `bg-${item.color}-600/20 backdrop-blur-sm text-${item.color}-300 border border-${item.color}-500/30 hover:bg-${item.color}-600/30 hover:shadow-lg hover:shadow-${item.color}-500/20`
                      : `text-gray-300 bg-white/10 border border-white/20 hover:bg-white/20 hover:text-white hover:shadow-lg hover:shadow-white/20`
                  }`}
                  aria-label={item.label}
                >
                  <item.icon className="w-5 h-5 hover:scale-105 transition-transform" />
                  <span>{item.label}</span>
                </Button>
              ))}
            </nav>

            <Button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm text-gray-300 font-montserrat text-sm font-medium border border-white/20 hover:bg-red-600/20 hover:text-red-300 hover:border-red-500/30 hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300"
              aria-label={t('sidebar.logout')}
            >
              <LogOut className="w-5 h-5 hover:scale-105 transition-transform" />
              <span>{t('sidebar.logout')}</span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
        .hover\:scale-102:hover {
          transform: scale(1.02);
        }
        .hover\:scale-105:hover {
          transform: scale(1.05);
        }
        .active\:scale-95:active {
          transform: scale(0.95);
        }
        .font-montserrat {
          font-family: 'Montserrat', sans-serif;
        }
      `}</style>
    </>
  );
}

export default Sidebar;