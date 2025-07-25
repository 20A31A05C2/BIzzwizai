import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings, Bell, Globe } from 'lucide-react';
import ApiService from '../../apiService';

function AdminSettings() {
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('fr');
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminPasswordConfirm, setAdminPasswordConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    // Fetch admin details on mount
    const fetchAdminSettings = async () => {
      setLoading(true);
      setErrorMsg('');
      try {
        const response = await ApiService('/adminsettings', 'GET');
        if (response.success && response.data && response.data.admin_info) {
          setAdminName(response.data.admin_info.admin_name || '');
          setAdminEmail(response.data.admin_info.admin_email || '');
        }
      } catch (err) {
        setErrorMsg('Erreur lors du chargement des informations administrateur.');
      } finally {
        setLoading(false);
      }
    };
    fetchAdminSettings();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');
    try {
      const payload = {
        admin_name: adminName,
        admin_email: adminEmail,
        admin_password: adminPassword,
        admin_password_confirmation: adminPasswordConfirm,
      };
      const response = await ApiService('/update-admin', 'POST', payload);
      if (response.success) {
        setSuccessMsg('Informations administrateur mises à jour avec succès.');
        setAdminPassword('');
        setAdminPasswordConfirm('');
      } else {
        setErrorMsg(response.message || 'Erreur lors de la mise à jour.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Erreur lors de la mise à jour.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4 sm:space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-6">
        <h1 className="text-xl sm:text-3xl font-bold text-gray-800 flex items-center gap-2">
          <Settings className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
          <span>Paramètres Administrateur</span>
        </h1>
      </div>

      {/* Settings Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100 max-w-lg mx-auto"
      >
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2">
          <Settings className="w-5 h-5 text-blue-600" />
          <span>Préférences</span>
        </h2>
        <form onSubmit={handleSave} className="space-y-4 sm:space-y-6">
          {/* Admin Name */}
          <div className="flex flex-col gap-1">
            <label htmlFor="adminName" className="font-medium text-gray-700">Nom complet</label>
            <input
              id="adminName"
              type="text"
              value={adminName}
              onChange={e => setAdminName(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {/* Admin Email */}
          <div className="flex flex-col gap-1">
            <label htmlFor="adminEmail" className="font-medium text-gray-700">Email</label>
            <input
              id="adminEmail"
              type="email"
              value={adminEmail}
              onChange={e => setAdminEmail(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {/* Admin Password */}
          <div className="flex flex-col gap-1">
            <label htmlFor="adminPassword" className="font-medium text-gray-700">Nouveau mot de passe</label>
            <input
              id="adminPassword"
              type="password"
              value={adminPassword}
              onChange={e => setAdminPassword(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Laisser vide pour ne pas changer"
            />
          </div>
          {/* Confirm Password */}
          <div className="flex flex-col gap-1">
            <label htmlFor="adminPasswordConfirm" className="font-medium text-gray-700">Confirmer le mot de passe</label>
            <input
              id="adminPasswordConfirm"
              type="password"
              value={adminPasswordConfirm}
              onChange={e => setAdminPasswordConfirm(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirmer le mot de passe"
            />
          </div>

          {/* Notifications Toggle */}


          {/* Success/Error Messages */}
          {successMsg && <div className="text-green-600 font-medium mt-2">{successMsg}</div>}
          {errorMsg && <div className="text-red-600 font-medium mt-2">{errorMsg}</div>}

          <div className="mt-6 sm:mt-8 flex justify-end">
            <button
              type="submit"
              className="px-4 sm:px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors shadow text-xs sm:text-base disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Sauvegarde...' : 'Sauvegarder'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default AdminSettings;