import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ApiService from '../../apiService.jsx';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Users, 
  DollarSign, 
  Eye,
  UserPlus,
  CheckCircle,
  XCircle,
  AlertCircle,
  Calendar,
  Globe,
  Target,
  Award,
  Clock
} from 'lucide-react';

const AdminAnalytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await ApiService('/admin/analytics', 'GET');
        setAnalytics(data);
      } catch (err) {
        setError(err.message || 'Erreur lors du chargement des analytics');
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!analytics) return null;

  // KPI Cards
  const kpiCards = [
    {
      title: 'Visiteurs Site Web',
      value: 'N/A', // No backend data for visitors
      change: '+0%',
      trend: 'up',
      icon: Globe,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Nouvelles Inscriptions',
      value: analytics.kpi.totalRegistrations.toString(),
      change: '+0%',
      trend: 'up',
      icon: UserPlus,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Taux de Conversion',
      value: `${analytics.kpi.conversionRate.toFixed(1)}%`,
      change: '+0%',
      trend: 'up',
      icon: Target,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Revenus Générés',
      value: `${(analytics.kpi.totalRevenuePotential / 1000).toFixed(0)}K€`,
      change: '+0%',
      trend: 'up',
      icon: DollarSign,
      color: 'from-orange-500 to-red-500'
    }
  ];

  // Registration status breakdown
  const pendingRegistrations = analytics.kpi.pendingRegistrations;
  const approvedRegistrations = analytics.kpi.approvedRegistrations;
  const rejectedRegistrations = analytics.kpi.rejectedRegistrations;

  // Trafic & Inscriptions (last 7 days)
  const trafficData = analytics.trafficData.map(day => ({
    date: day.date,
    visitors: 0, // No visitors data
    registrations: day.registrations
  }));

  // Industry breakdown
  const industryBreakdown = analytics.industryBreakdown.map(ind => ({
    industry: ind.industry || 'Non spécifié',
    count: ind.count,
    percentage: ind.percentage,
    color: 'bg-blue-500' // You can assign colors dynamically if needed
  }));

  // Monthly revenue
  const monthlyRevenue = analytics.monthlyRevenue.map(month => ({
    month: month.month,
    revenue: Number(month.revenue),
    projects: month.projects
  }));

  // Recent activity
  const recentActivity = analytics.recentActivity.map(item => {
    let type = 'registration';
    let action = 'Nouvelle inscription';
    if (item.status === 'approved') {
      type = 'approval';
      action = 'Projet approuvé';
    } else if (item.status === 'rejected') {
      type = 'rejection';
      action = 'Projet rejeté';
    }
    return {
      action,
      details: `${item.user_company || ''} - ${item.project_name || ''}`.trim(),
      time: new Date(item.updated_at).toLocaleString(),
      type
    };
  });

  // Average validation delay
  const averageProjectValue = analytics.kpi.averageProjectValue;
  const avgValidationDelay = analytics.avgValidationDelay ? Number(analytics.avgValidationDelay).toFixed(1) : 'N/A';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4 sm:space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-6">
        <div>
          <h1 className="text-xl sm:text-3xl font-bold text-gray-800">Analytics & Rapports</h1>
          <p className="text-gray-600 mt-1 text-xs sm:text-base">Vue d'ensemble des performances de BIZZ PLACE</p>
        </div>
        {/* <div className="flex gap-2 sm:gap-2 mt-2 md:mt-0">
          {['7d', '30d', '90d', '1y'].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-xs sm:text-base ${
                selectedPeriod === period 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {period === '7d' ? '7 jours' : 
               period === '30d' ? '30 jours' : 
               period === '90d' ? '3 mois' : '1 an'}
            </button>
          ))}
        </div> */}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
        {kpiCards.map((kpi, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-3 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${kpi.color} rounded-xl flex items-center justify-center`}>
                <kpi.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className={`text-xs sm:text-sm font-medium flex items-center space-x-1 ${
                kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {kpi.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span>{kpi.change}</span>
              </div>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">{kpi.value}</h3>
              <p className="text-xs sm:text-sm text-gray-600">{kpi.title}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Graphiques principaux */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Trafic et Inscriptions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-3 sm:p-6 overflow-x-auto"
        >
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-4 flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <span>Trafic Site Web & Inscriptions</span>
          </h2>
          <div className="space-y-3 sm:space-y-4 min-w-[300px]">
            {trafficData.map((day, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-xs sm:text-sm text-gray-600 w-14 sm:w-16">{day.date}</span>
                <div className="flex-1 mx-2 sm:mx-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(day.registrations / 10) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 w-10 sm:w-12">{day.registrations}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-green-700">{day.registrations}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600">Inscriptions</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Statut des Inscriptions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-3 sm:p-6"
        >
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-4 flex items-center space-x-2">
            <Users className="w-5 h-5 text-purple-600" />
            <span>Statut des Inscriptions</span>
          </h2>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between p-3 sm:p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center gap-2 sm:gap-3">
                <AlertCircle className="w-7 h-7 sm:w-8 sm:h-8 text-yellow-600" />
                <div>
                  <h3 className="font-medium text-yellow-800 text-sm sm:text-base">En Attente</h3>
                  <p className="text-xs sm:text-sm text-yellow-700">Nécessitent une validation</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xl sm:text-2xl font-bold text-yellow-800">{pendingRegistrations}</span>
                <p className="text-xs sm:text-sm text-yellow-600">inscriptions</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 sm:p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 sm:gap-3">
                <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8 text-green-600" />
                <div>
                  <h3 className="font-medium text-green-800 text-sm sm:text-base">Approuvées</h3>
                  <p className="text-xs sm:text-sm text-green-700">Projets validés</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xl sm:text-2xl font-bold text-green-800">{approvedRegistrations}</span>
                <p className="text-xs sm:text-sm text-green-600">projets</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 sm:p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center gap-2 sm:gap-3">
                <XCircle className="w-7 h-7 sm:w-8 sm:h-8 text-red-600" />
                <div>
                  <h3 className="font-medium text-red-800 text-sm sm:text-base">Rejetées</h3>
                  <p className="text-xs sm:text-sm text-red-700">Non conformes</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xl sm:text-2xl font-bold text-red-800">{rejectedRegistrations}</span>
                <p className="text-xs sm:text-sm text-red-600">refusées</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Analyses détaillées */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Répartition par secteur */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-3 sm:p-6"
        >
          <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-4">Secteurs d'Activité</h2>
          <div className="space-y-2 sm:space-y-3">
            {industryBreakdown.map((industry, index) => (
              <div key={index} className="space-y-1 sm:space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-gray-700">{industry.industry}</span>
                  <span className="text-xs sm:text-sm font-medium text-gray-800">{industry.count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`${industry.color} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${industry.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Métriques Business */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-3 sm:p-6"
        >
          <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-4">Métriques Business</h2>
          <div className="space-y-3 sm:space-y-4">
            <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className="w-4 h-4 text-blue-600" />
                <span className="text-xs sm:text-sm font-medium text-blue-700">Valeur Moyenne Projet</span>
              </div>
              <p className="text-lg sm:text-xl font-bold text-blue-800">
                {averageProjectValue.toLocaleString()}€
              </p>
            </div>
            <div className="bg-purple-50 p-3 sm:p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Target className="w-4 h-4 text-purple-600" />
                <span className="text-xs sm:text-sm font-medium text-purple-700">Taux de Conversion</span>
              </div>
              <p className="text-lg sm:text-xl font-bold text-purple-800">
                {analytics.kpi.conversionRate.toFixed(1)}%
              </p>
            </div>
            <div className="bg-green-50 p-3 sm:p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-green-600" />
                <span className="text-xs sm:text-sm font-medium text-green-700">Délai Moyen Validation</span>
              </div>
              <p className="text-lg sm:text-xl font-bold text-green-800">{avgValidationDelay} jours</p>
            </div>
          </div>
        </motion.div>

        {/* Évolution Revenus */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-3 sm:p-6"
        >
          <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-4">Évolution Revenus</h2>
          <div className="space-y-2 sm:space-y-3">
            {monthlyRevenue.map((month, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <span className="text-xs sm:text-sm text-gray-700">{month.month}</span>
                  <p className="text-[10px] sm:text-xs text-gray-500">{month.projects} projets</p>
                </div>
                <div className="text-right">
                  <span className="font-medium text-gray-800">
                    {(month.revenue / 1000).toFixed(0)}K€
                  </span>
                  <div className="w-12 sm:w-16 bg-gray-200 rounded-full h-1 mt-1">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-blue-500 h-1 rounded-full"
                      style={{ width: `${(month.revenue / 250000) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Rapport d'activité récente */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-lg p-3 sm:p-6"
      >
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-4 flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-orange-600" />
          <span>Activité Récente</span>
        </h2>
        <div className="space-y-3 sm:space-y-4">
          {recentActivity.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 sm:gap-4 p-2 sm:p-3 bg-gray-50 rounded-lg"
            >
              <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
                activity.type === 'registration' ? 'bg-blue-100' :
                activity.type === 'approval' ? 'bg-green-100' :
                activity.type === 'rejection' ? 'bg-red-100' : 'bg-orange-100'
              }`}>
                {activity.type === 'registration' && <UserPlus className="w-4 h-4 text-blue-600" />}
                {activity.type === 'approval' && <CheckCircle className="w-4 h-4 text-green-600" />}
                {activity.type === 'rejection' && <XCircle className="w-4 h-4 text-red-600" />}
                {activity.type === 'quote' && <DollarSign className="w-4 h-4 text-orange-600" />}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800 text-xs sm:text-base">{activity.action}</p>
                <p className="text-xs sm:text-sm text-gray-600">{activity.details}</p>
              </div>
              <span className="text-[10px] sm:text-xs text-gray-500">{activity.time}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminAnalytics;