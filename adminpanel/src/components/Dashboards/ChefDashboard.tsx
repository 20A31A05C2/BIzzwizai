import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  FileText, 
  Clock, 
  CheckCircle, 
  Eye,
  UserPlus,
  TrendingUp,
  DollarSign,
  Calendar,
  AlertCircle
} from 'lucide-react';
import ClientRegistrationDetail from '../UI/ClientRegistrationDetail';
import { mockClientRegistrations } from '../../data/mockData';

const ChefDashboard: React.FC = () => {
  const [selectedRegistration, setSelectedRegistration] = useState<string | null>(null);
  const [registrations, setRegistrations] = useState(mockClientRegistrations);

  const pendingRegistrations = registrations.filter(r => r.status === 'pending');
  const approvedRegistrations = registrations.filter(r => r.status === 'approved');

  const handleViewRegistration = (registrationId: string) => {
    setSelectedRegistration(registrationId);
  };

  const handleApproveRegistration = (registrationId: string, evaluation: any) => {
    setRegistrations(prev => prev.map(reg => 
      reg.id === registrationId 
        ? { ...reg, status: 'approved', chefEvaluation: evaluation }
        : reg
    ));
    setSelectedRegistration(null);
    // Ici vous pourriez déclencher la génération du devis
    console.log('Inscription approuvée:', registrationId, evaluation);
  };

  const handleRejectRegistration = (registrationId: string, reason: string) => {
    setRegistrations(prev => prev.map(reg => 
      reg.id === registrationId 
        ? { ...reg, status: 'rejected' }
        : reg
    ));
    setSelectedRegistration(null);
    console.log('Inscription rejetée:', registrationId, reason);
  };

  const handleGenerateQuote = (registrationId: string, quoteData: any) => {
    console.log('Génération du devis pour:', registrationId, quoteData);
    // Ici vous pourriez ouvrir un modal pour créer le devis
  };

  if (selectedRegistration) {
    const registration = registrations.find(r => r.id === selectedRegistration);
    if (registration) {
      return (
        <div className="space-y-6">
          <div className="flex items-center space-x-4 mb-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedRegistration(null)}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              ← Retour
            </motion.button>
            <h1 className="text-2xl font-bold text-gray-800">Détail de l'inscription</h1>
          </div>
          <ClientRegistrationDetail
            registration={registration}
            onApprove={(evaluation) => handleApproveRegistration(registration.id, evaluation)}
            onReject={(reason) => handleRejectRegistration(registration.id, reason)}
            onGenerateQuote={(quoteData) => handleGenerateQuote(registration.id, quoteData)}
          />
        </div>
      );
    }
  }

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
          <h1 className="text-3xl font-bold text-gray-800">Dashboard Chef - SHANKAR</h1>
          <p className="text-gray-600 mt-1">Gestion des nouvelles inscriptions et validation des projets</p>
        </div>
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2"
          >
            <FileText className="w-5 h-5" />
            <span>Créer Devis</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2"
          >
            <UserPlus className="w-5 h-5" />
            <span>Assigner Équipe</span>
          </motion.button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <div className="text-sm font-medium text-orange-600">
              +{pendingRegistrations.length}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">{pendingRegistrations.length}</h3>
            <p className="text-gray-600 text-sm">Nouvelles Inscriptions</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">{approvedRegistrations.length}</h3>
            <p className="text-gray-600 text-sm">Projets Approuvés</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">
              {registrations.reduce((sum, reg) => sum + reg.budget, 0).toLocaleString()}€
            </h3>
            <p className="text-gray-600 text-sm">Budget Total Demandé</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">5</h3>
            <p className="text-gray-600 text-sm">Équipes Disponibles</p>
          </div>
        </motion.div>
      </div>

      {/* Nouvelles Inscriptions */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center space-x-2">
          <FileText className="w-5 h-5 text-orange-600" />
          <span>Nouvelles Inscriptions à Valider</span>
          <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
            {pendingRegistrations.length}
          </span>
        </h2>

        {pendingRegistrations.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">Aucune nouvelle inscription</h3>
            <p className="text-gray-500">Toutes les inscriptions ont été traitées.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {pendingRegistrations.map((registration, index) => (
              <motion.div
                key={registration.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">{registration.name}</h3>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {registration.company}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{registration.projectType}</p>
                    <p className="text-gray-700 text-sm line-clamp-2">{registration.description}</p>
                  </div>
                  <div className="text-right ml-6">
                    <p className="text-2xl font-bold text-green-600 mb-1">
                      {registration.budget.toLocaleString()}€
                    </p>
                    <p className="text-sm text-gray-600">{registration.timeline}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Secteur</p>
                    <p className="font-medium text-gray-800">{registration.smartFormData.industry}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Plateformes</p>
                    <p className="font-medium text-gray-800">
                      {registration.smartFormData.platforms.length} plateformes
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Soumis le</p>
                    <p className="font-medium text-gray-800">
                      {new Date(registration.submittedAt).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Fonctionnalités clés:</p>
                  <div className="flex flex-wrap gap-2">
                    {registration.smartFormData.features.slice(0, 4).map((feature, idx) => (
                      <span key={idx} className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                        {feature}
                      </span>
                    ))}
                    {registration.smartFormData.features.length > 4 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                        +{registration.smartFormData.features.length - 4} autres
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Reçu il y a {Math.floor((Date.now() - new Date(registration.submittedAt).getTime()) / (1000 * 60 * 60 * 24))} jours</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleViewRegistration(registration.id)}
                    className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Examiner en Détail</span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Projets Approuvés */}
      {approvedRegistrations.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span>Projets Approuvés</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {approvedRegistrations.map((registration, index) => (
              <motion.div
                key={registration.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="border border-green-200 rounded-xl p-4 bg-green-50"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-800">{registration.name}</h3>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    Approuvé
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{registration.projectType}</p>
                <p className="text-lg font-bold text-green-600">{registration.budget.toLocaleString()}€</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ChefDashboard;