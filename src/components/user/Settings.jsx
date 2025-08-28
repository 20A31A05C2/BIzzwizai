import React, { useState, useEffect } from 'react';
import { Shield, Eye, EyeOff } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ApiService from '@/apiService';
import { toast } from '@/components/ui/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

function Settings({ emailNotifications, setEmailNotifications, pushNotifications, setPushNotifications, showPassword, setShowPassword }) {
  const { t } = useTranslation();
  const [userData, setUserData] = useState({ fullname: '', email: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await ApiService('/user/profile', 'GET');
        if (response.success) {
          setUserData({
            fullname: response.data.fullname || 'N/A',
            email: response.data.email || 'N/A',
          });
        } else {
          throw new Error(response.message || t('settings.error.fetchFailed'));
        }
      } catch (error) {
        setError(error.message || t('settings.error.fetchFailed'));
        toast({
          title: t('settings.toast.loadError.title'),
          description: error.message || t('settings.toast.loadError.description'),
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, [t]);

  const handleUpdateUser = async () => {
    setIsUpdating(true);
    try {
      const response = await ApiService('/user/profile', 'PATCH', {
        fullname: userData.fullname,
        email: userData.email,
        emailNotifications,
        pushNotifications,
      });
      if (response.success) {
        toast({
          title: t('settings.toast.profileSuccess.title'),
          description: t('settings.toast.profileSuccess.description'),
          variant: 'default',
        });
        setNewPassword('');
      } else {
        throw new Error(response.message || t('settings.toast.profileError.description'));
      }
    } catch (error) {
      console.error('Update user error:', error);
      toast({
        title: t('settings.toast.profileError.title'),
        description: error.message || t('settings.toast.profileError.description'),
        variant: 'destructive',
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (!newPassword) {
      toast({
        title: t('settings.toast.passwordEmpty.title'),
        description: t('settings.toast.passwordEmpty.description'),
        variant: 'destructive',
      });
      return;
    }

    setIsUpdating(true);
    try {
      const response = await ApiService('/user/update-password', 'POST', {
        password: newPassword,
      });
      if (response.success) {
        toast({
          title: t('settings.toast.passwordSuccess.title'),
          description: t('settings.toast.passwordSuccess.description'),
          variant: 'default',
        });
        setNewPassword('');
      } else {
        throw new Error(response.message || t('settings.toast.passwordError.description'));
      }
    } catch (error) {
      console.error('Update password error:', error);
      toast({
        title: t('settings.toast.passwordError.title'),
        description: error.message || t('settings.toast.passwordError.description'),
        variant: 'destructive',
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-[calc(100vh-var(--navbar-height,68px))] bg-black flex items-center justify-center p-4 sm:p-6 md:p-8"
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          <p className="text-gray-300 text-lg font-medium font-montserrat">{t('settings.loading')}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-[calc(100vh-var(--navbar-height,68px))] bg-black flex items-center justify-center p-4 sm:p-6 md:p-8"
    >
      <div className="max-w-7xl w-full bg-white/10 backdrop-blur-3xl rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8 md:p-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-3 font-montserrat">
          {t('settings.title')}
        </h1>
        <p className="text-gray-300 text-base sm:text-lg font-medium font-montserrat mb-8 sm:mb-12">
          {t('settings.description')}
        </p>
        {error && (
          <div className="mb-8 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-red-500/30">
            <p className="text-red-400 text-center text-base font-medium font-montserrat">{error}</p>
          </div>
        )}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-lg border border-white/20 hover:border-white/40 hover:shadow-lg hover:shadow-white/20 transition-all duration-300"
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-6 font-montserrat">
                {t('settings.profile.header')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-3 font-montserrat">{t('settings.profile.fullnameLabel')}</label>
                  <input 
                    type="text" 
                    value={userData.fullname}
                    onChange={e => setUserData({ ...userData, fullname: e.target.value })}
                    className="w-full bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 text-white font-medium focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 border border-white/20"
                    aria-label={t('settings.profile.fullnameLabel')}
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-3 font-montserrat">{t('settings.profile.emailLabel')}</label>
                  <input 
                    type="email" 
                    value={userData.email}
                    onChange={e => setUserData({ ...userData, email: e.target.value })}
                    className="w-full bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 text-white font-medium focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 border border-white/20"
                    aria-label={t('settings.profile.emailLabel')}
                  />
                </div>
              </div>
              <div className="mt-6 space-y-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={emailNotifications}
                    onChange={e => setEmailNotifications(e.target.checked)}
                    className="w-5 h-5 text-purple-500 bg-white/10 border-white/20 rounded focus:ring-purple-500/50"
                    aria-label={t('settings.profile.emailNotifications')}
                  />
                  <label className="text-gray-300 text-sm font-medium font-montserrat">{t('settings.profile.emailNotifications')}</label>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={pushNotifications}
                    onChange={e => setPushNotifications(e.target.checked)}
                    className="w-5 h-5 text-purple-500 bg-white/10 border-white/20 rounded focus:ring-purple-500/50"
                    aria-label={t('settings.profile.pushNotifications')}
                  />
                  <label className="text-gray-300 text-sm font-medium font-montserrat">{t('settings.profile.pushNotifications')}</label>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleUpdateUser}
                disabled={isUpdating}
                className="mt-6 px-6 py-3 bg-purple-600/20 backdrop-blur-sm rounded-xl text-purple-300 font-medium hover:bg-purple-600/30 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 border border-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed font-montserrat"
                aria-label={t('settings.profile.updateButton')}
              >
                {isUpdating ? t('settings.profile.updating') : t('settings.profile.updateButton')}
              </motion.button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-lg border border-white/20 hover:border-white/40 hover:shadow-lg hover:shadow-white/20 transition-all duration-300"
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400 mb-6 font-montserrat">
                {t('settings.security.header')}
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-3 font-montserrat">{t('settings.security.newPasswordLabel')}</label>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"}
                      placeholder={t('settings.security.passwordPlaceholder')}
                      className="w-full bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 pr-12 text-white font-medium focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all duration-300 border border-white/20"
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      aria-label={t('settings.security.newPasswordLabel')}
                    />
                    <button 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white transition-colors duration-300"
                      aria-label={showPassword ? t('settings.security.hidePassword') : t('settings.security.showPassword')}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleUpdatePassword}
                  disabled={isUpdating}
                  className="px-6 py-3 bg-green-600/20 backdrop-blur-sm rounded-xl text-green-300 font-medium hover:bg-green-600/30 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 border border-green-500/30 disabled:opacity-50 disabled:cursor-not-allowed font-montserrat"
                  aria-label={t('settings.security.changePasswordButton')}
                >
                  {isUpdating ? t('settings.security.updating') : t('settings.security.changePasswordButton')}
                </motion.button>
                <div className="flex items-center space-x-3 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                  <Shield className="w-5 h-5 text-green-300" />
                  <span className="text-green-300 text-sm font-medium font-montserrat">{t('settings.security.twoFactor')}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
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
    </motion.div>
  );
}

export default Settings;