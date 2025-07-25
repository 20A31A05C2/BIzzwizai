import React, { useState, useEffect } from 'react';
import { Shield, Eye, EyeOff } from 'lucide-react';
import ApiService from '@/apiService';
import { toast } from '@/components/ui/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

function Settings({ emailNotifications, setEmailNotifications, pushNotifications, setPushNotifications, showPassword, setShowPassword }) {
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
          throw new Error(response.message || 'Échec du chargement des données utilisateur.');
        }
      } catch (error) {
        setError(error.message || 'Impossible de charger les données utilisateur.');
        toast({
          title: 'Erreur',
          description: error.message || 'Impossible de charger les données utilisateur.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleUpdateUser = async () => {
    setIsUpdating(true);
    try {
      const response = await ApiService('/user/profile', 'PATCH', {
        fullname: userData.fullname,
        email: userData.email,
      });
      if (response.success) {
        toast({
          title: 'Succès',
          description: 'Profil mis à jour avec succès.',
          variant: 'default',
        });
        setNewPassword(''); // Clear password field when profile is updated
      } else {
        throw new Error(response.message || 'Échec de la mise à jour du profil.');
      }
    } catch (error) {
      console.error('Update user error:', error);
      toast({
        title: 'Erreur',
        description: error.message || 'Impossible de mettre à jour le profil.',
        variant: 'destructive',
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (!newPassword) {
      toast({
        title: 'Erreur',
        description: 'Veuillez entrer un nouveau mot de passe.',
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
          title: 'Succès',
          description: 'Mot de passe mis à jour avec succès.',
          variant: 'default',
        });
        setNewPassword('');
      } else {
        throw new Error(response.message || 'Échec de la mise à jour du mot de passe.');
      }
    } catch (error) {
      console.error('Update password error:', error);
      toast({
        title: 'Erreur',
        description: error.message || 'Impossible de mettre à jour le mot de passe.',
        variant: 'destructive',
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.4 }}
      className="flex-1 p-4 sm:p-6 md:p-8"
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-light text-white mb-2 sm:mb-4 tracking-wide">Paramètres</h1>
        <p className="text-white/60 font-light mb-6 sm:mb-12 text-sm sm:text-base">Gérer votre compte et préférences</p>
        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-400 text-center">{error}</p>
          </div>
        )}
        <div className="space-y-6 sm:space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            whileHover={{ scale: 1.01, boxShadow: '0 8px 32px 0 rgba(139,92,246,0.10)' }}
            transition={{ duration: 0.3 }}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
            <div className="relative bg-[#000011] rounded-2xl p-4 sm:p-8 group-hover:shadow-2xl group-hover:shadow-purple-500/10 transition-all duration-500">
              <h3 className="text-xl sm:text-2xl font-light text-white mb-4 sm:mb-8">Profil</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-white/70 font-light mb-2 sm:mb-3">Nom complet</label>
                  <input 
                    type="text" 
                    value={userData.fullname}
                    onChange={e => setUserData({ ...userData, fullname: e.target.value })}
                    className="w-full bg-white/5 rounded-xl px-4 py-3 text-white font-light focus:bg-white/10 focus:outline-none transition-colors duration-300"
                  />
                </div>
                <div>
                  <label className="block text-white/70 font-light mb-2 sm:mb-3">Email</label>
                  <input 
                    type="email" 
                    value={userData.email}
                    onChange={e => setUserData({ ...userData, email: e.target.value })}
                    className="w-full bg-white/5 rounded-xl px-4 py-3 text-white font-light focus:bg-white/10 focus:outline-none transition-colors duration-300"
                  />
                </div>
              </div>
              <button
                onClick={handleUpdateUser}
                disabled={isUpdating}
                className="mt-6 px-6 py-2 rounded-xl bg-purple-500 text-white font-light hover:bg-purple-600 transition-colors duration-300 disabled:opacity-50"
              >
                {isUpdating ? 'Mise à jour...' : 'Mettre à jour le profil'}
              </button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            whileHover={{ scale: 1.01, boxShadow: '0 8px 32px 0 rgba(34,197,94,0.10)' }}
            transition={{ duration: 0.3 }}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-green-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
            <div className="relative bg-[#000011] rounded-2xl p-4 sm:p-8 group-hover:shadow-2xl group-hover:shadow-green-500/10 transition-all duration-500">
              <h3 className="text-xl sm:text-2xl font-light text-white mb-4 sm:mb-8">Sécurité</h3>
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-white/70 font-light mb-2 sm:mb-3">Nouveau mot de passe</label>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="w-full bg-white/5 rounded-xl px-4 py-3 pr-12 text-white font-light focus:bg-white/10 focus:outline-none transition-colors duration-300"
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                    />
                    <button 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors duration-300"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <button
                  onClick={handleUpdatePassword}
                  disabled={isUpdating}
                  className={`px-6 py-3 rounded-xl text-white font-light transition-all duration-300 ${
                    isUpdating ? 'bg-green-500/50 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
                  }`}
                >
                  {isUpdating ? 'Mise à jour...' : 'Changer le mot de passe'}
                </button>
                <div className="flex items-center space-x-3 p-4 bg-green-500/10 rounded-xl">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span className="text-green-400 font-light text-xs sm:text-sm">Authentification à deux facteurs activée</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default Settings;