import React, { useEffect, useState } from 'react';
import ApiService from '../../apiService.jsx';
import { motion } from 'framer-motion';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  FolderOpen, 
  UserPlus, 
  Target,
  BarChart3,
  Globe,
  Calendar,
  Award,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await ApiService('/admin/stats', 'GET');
        setStats(data);
      } catch (err) {
        setError(err.message || 'Erreur lors du chargement des statistiques');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  // KPI Cards config (dynamic values from stats)
  const kpiData = stats ? [
    { title: 'Projets Actifs', value: stats.projetsActifs, icon: FolderOpen, trend: '', color: 'from-blue-500 to-cyan-500' },
    { title: 'Revenus Mensuels', value: `€${stats.revenusMensuels}`, icon: DollarSign, trend: '', color: 'from-green-500 to-emerald-500' },
    { title: 'Clients Actifs', value: stats.clientsActifs, icon: Users, trend: '', color: 'from-purple-500 to-pink-500' },
    { title: 'Nouvelles Inscriptions', value: stats.newUsersCount, icon: UserPlus, trend: '', color: 'from-indigo-500 to-purple-500' },
    { title: 'Projets Terminés', value: stats.projetsTermines, icon: CheckCircle, trend: '', color: 'from-teal-500 to-green-500' }
  ] : [];

  if (loading) return <div>Chargement...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Dashboard Admin - SIMO</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">Vue 360° de BIZZ PLACE - Gestion & Marketing</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
        {kpiData.map((kpi, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${kpi.color} rounded-xl flex items-center justify-center`}>
                <kpi.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="text-xs sm:text-sm font-medium text-green-600">
                {kpi.trend}
              </div>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">{kpi.value}</h3>
              <p className="text-gray-600 text-xs sm:text-sm">{kpi.title}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Vue d'ensemble des projets et équipes */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6">
        {/* Projets Récents */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 overflow-x-auto"
        >
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-4 flex items-center space-x-2">
            <FolderOpen className="w-5 h-5 text-blue-600" />
            <span>Projets Récents</span>
          </h2>
          <div className="space-y-3 sm:space-y-4">
            {stats.recentProjects && stats.recentProjects.map((project, index) => (
              <motion.div
                key={project.id || index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 sm:mb-3 gap-2 sm:gap-0">
                  <div>
                    <h3 className="font-medium text-gray-800 text-sm sm:text-base">{project.project_name}</h3>
                    <p className="text-xs sm:text-sm text-gray-600">{project.user ? project.user.fullname : ''}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      project.status === 'PaymentDone' ? 'bg-green-100 text-green-800' :
                      project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      project.status === 'Not Started' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {project.status}
                    </span>
                    <p className="text-xs sm:text-sm font-medium text-gray-800 mt-1">€{project.budget}</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${project.progress || 0}%` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Nouvelles Inscriptions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-lg p-4 sm:p-6"
      >
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-4 flex items-center space-x-2">
          <UserPlus className="w-5 h-5 text-orange-600" />
          <span>Nouvelles Inscriptions</span>
        </h2>
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {stats.newInscriptions && stats.newInscriptions.map((inscription, index) => (
            <motion.div
              key={inscription.id || index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-1 sm:mb-2">
                <h3 className="font-medium text-gray-800 text-sm sm:text-base">{inscription.user ? inscription.user.fullname : ''}</h3>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                  Nouveau
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mb-1">{inscription.user_company}</p>
              <p className="text-xs sm:text-sm text-gray-700 mb-1 sm:mb-2">{inscription.project_name}</p>
              <p className="text-xs sm:text-sm font-medium text-green-600">{inscription.budget}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminDashboard;