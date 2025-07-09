import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
import { mockClientRegistrations } from '../../data/mockData';

const AdminAnalytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  // Calculs des métriques
  const totalRegistrations = mockClientRegistrations.length;
  const approvedRegistrations = mockClientRegistrations.filter(r => r.status === 'approved').length;
  const pendingRegistrations = mockClientRegistrations.filter(r => r.status === 'pending').length;
  const rejectedRegistrations = mockClientRegistrations.filter(r => r.status === 'rejected').length;
  
  const totalRevenuePotential = mockClientRegistrations
    .filter(r => r.status === 'approved')
    .reduce((sum, r) => sum + r.budget, 0);
  
  const averageProjectValue = totalRevenuePotential / (approvedRegistrations || 1);
  const conversionRate = (approvedRegistrations / totalRegistrations) * 100;

  // Données simulées pour les graphiques
  const trafficData = [
    { date: '01/02', visitors: 245, registrations: 3 },
    { date: '02/02', visitors: 312, registrations: 5 },
    { date: '03/02', visitors: 189, registrations: 2 },
    { date: '04/02', visitors: 456, registrations: 7 },
    { date: '05/02', visitors: 523, registrations: 4 },
    { date: '06/02', visitors: 398, registrations: 6 },
    { date: '07/02', visitors: 467, registrations: 3 }
  ];

  const industryBreakdown = [
    { industry: 'GreenTech / IoT', count: 1, percentage: 50, color: 'bg-green-500' },
    { industry: 'EdTech / E-learning', count: 1, percentage: 50, color: 'bg-blue-500' }
  ];

  const monthlyRevenue = [
    { month: 'Oct 2023', revenue: 45000, projects: 2 },
    { month: 'Nov 2023', revenue: 67000, projects: 3 },
    { month: 'Déc 2023', revenue: 89000, projects: 4 },
    { month: 'Jan 2024', revenue: 125000, projects: 5 },
    { month: 'Fév 2024', revenue: 205000, projects: 7 }
  ];

  const kpiCards = [
    {
      title: 'Visiteurs Site Web',
      value: '2,847',
      change: '+23%',
      trend: 'up',
      icon: Globe,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Nouvelles Inscriptions',
      value: totalRegistrations.toString(),
      change: '+15%',
      trend: 'up',
      icon: UserPlus,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Taux de Conversion',
      value: `${conversionRate.toFixed(1)}%`,
      change: '+8%',
      trend: 'up',
      icon: Target,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Revenus Générés',
      value: `${(totalRevenuePotential / 1000).toFixed(0)}K€`,
      change: '+45%',
      trend: 'up',
      icon: DollarSign,
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Analytics & Rapports</h1>
          <p className="text-gray-600 mt-1">Vue d'ensemble des performances de BIZZ PLACE</p>
        </div>
        <div className="flex space-x-2">
          {['7d', '30d', '90d', '1y'].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period as any)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
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
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${kpi.color} rounded-xl flex items-center justify-center`}>
                <kpi.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`text-sm font-medium flex items-center space-x-1 ${
                kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {kpi.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span>{kpi.change}</span>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-1">{kpi.value}</h3>
              <p className="text-gray-600 text-sm">{kpi.title}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Graphiques principaux */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trafic et Inscriptions */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <span>Trafic Site Web & Inscriptions</span>
          </h2>
          <div className="space-y-4">
            {trafficData.map((day, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 w-16">{day.date}</span>
                <div className="flex-1 mx-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(day.visitors / 600) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 w-12">{day.visitors}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-green-700">{day.registrations}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600">Visiteurs</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">Inscriptions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Statut des Inscriptions */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
            <Users className="w-5 h-5 text-purple-600" />
            <span>Statut des Inscriptions</span>
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center space-x-3">
                <AlertCircle className="w-8 h-8 text-yellow-600" />
                <div>
                  <h3 className="font-medium text-yellow-800">En Attente</h3>
                  <p className="text-sm text-yellow-700">Nécessitent une validation</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-yellow-800">{pendingRegistrations}</span>
                <p className="text-sm text-yellow-600">inscriptions</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <div>
                  <h3 className="font-medium text-green-800">Approuvées</h3>
                  <p className="text-sm text-green-700">Projets validés</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-green-800">{approvedRegistrations}</span>
                <p className="text-sm text-green-600">projets</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center space-x-3">
                <XCircle className="w-8 h-8 text-red-600" />
                <div>
                  <h3 className="font-medium text-red-800">Rejetées</h3>
                  <p className="text-sm text-red-700">Non conformes</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-red-800">{rejectedRegistrations}</span>
                <p className="text-sm text-red-600">refusées</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Analyses détaillées */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Répartition par secteur */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Secteurs d'Activité</h2>
          <div className="space-y-3">
            {industryBreakdown.map((industry, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{industry.industry}</span>
                  <span className="text-sm font-medium text-gray-800">{industry.count}</span>
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
        </div>

        {/* Métriques Business */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Métriques Business</h2>
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-1">
                <DollarSign className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">Valeur Moyenne Projet</span>
              </div>
              <p className="text-xl font-bold text-blue-800">
                {averageProjectValue.toLocaleString()}€
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-1">
                <Target className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-700">Taux de Conversion</span>
              </div>
              <p className="text-xl font-bold text-purple-800">
                {conversionRate.toFixed(1)}%
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-1">
                <Clock className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-700">Délai Moyen Validation</span>
              </div>
              <p className="text-xl font-bold text-green-800">2.3 jours</p>
            </div>
          </div>
        </div>

        {/* Évolution Revenus */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Évolution Revenus</h2>
          <div className="space-y-3">
            {monthlyRevenue.slice(-4).map((month, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <span className="text-sm text-gray-700">{month.month}</span>
                  <p className="text-xs text-gray-500">{month.projects} projets</p>
                </div>
                <div className="text-right">
                  <span className="font-medium text-gray-800">
                    {(month.revenue / 1000).toFixed(0)}K€
                  </span>
                  <div className="w-16 bg-gray-200 rounded-full h-1 mt-1">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-blue-500 h-1 rounded-full"
                      style={{ width: `${(month.revenue / 250000) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Rapport d'activité récente */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-orange-600" />
          <span>Activité Récente</span>
        </h2>
        <div className="space-y-4">
          {[
            { 
              action: 'Nouvelle inscription', 
              details: 'Sophie Dubois - EduLearn Pro', 
              time: 'Il y a 2 heures',
              type: 'registration'
            },
            { 
              action: 'Projet approuvé', 
              details: 'GreenTech Solutions par SHANKAR', 
              time: 'Il y a 4 heures',
              type: 'approval'
            },
            { 
              action: 'Visite site web', 
              details: '45 nouveaux visiteurs aujourd\'hui', 
              time: 'Il y a 6 heures',
              type: 'traffic'
            },
            { 
              action: 'Devis généré', 
              details: 'Projet EYVO AI - 85,000€', 
              time: 'Hier',
              type: 'quote'
            }
          ].map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                activity.type === 'registration' ? 'bg-blue-100' :
                activity.type === 'approval' ? 'bg-green-100' :
                activity.type === 'traffic' ? 'bg-purple-100' : 'bg-orange-100'
              }`}>
                {activity.type === 'registration' && <UserPlus className="w-4 h-4 text-blue-600" />}
                {activity.type === 'approval' && <CheckCircle className="w-4 h-4 text-green-600" />}
                {activity.type === 'traffic' && <Eye className="w-4 h-4 text-purple-600" />}
                {activity.type === 'quote' && <DollarSign className="w-4 h-4 text-orange-600" />}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800">{activity.action}</p>
                <p className="text-sm text-gray-600">{activity.details}</p>
              </div>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AdminAnalytics;