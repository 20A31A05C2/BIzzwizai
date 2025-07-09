import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Eye, 
  Search, 
  Filter,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  Building,
  Mail,
  Phone,
  Plus
} from 'lucide-react';
import { mockClientRegistrations, mockUsers } from '../../data/mockData';
import CreateTeamAccount from './CreateTeamAccount';

const AdminUsers: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'team' | 'clients'>('clients');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [teamMembers, setTeamMembers] = useState(mockUsers);

  const filteredClients = mockClientRegistrations.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.projectType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'rejected': return <XCircle className="w-4 h-4 text-red-600" />;
      default: return <AlertCircle className="w-4 h-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'approved': return 'Approuvé';
      case 'rejected': return 'Rejeté';
      default: return 'En attente';
    }
  };

  const handleCreateAccount = (accountData: any) => {
    const newMember = {
      id: accountData.id,
      name: accountData.name,
      email: accountData.email,
      role: accountData.role,
      avatar: accountData.avatar,
      position: accountData.position,
      joinDate: accountData.createdAt,
      status: 'active' as const,
      phone: accountData.phone,
      company: 'BIZZ PLACE',
      lastLogin: new Date().toISOString()
    };
    
    setTeamMembers(prev => [...prev, newMember]);
    setShowCreateAccount(false);
    
    // Ici vous pourriez faire un appel API pour créer le compte
    console.log('Nouveau compte créé:', accountData);
  };

  const selectedClientData = selectedClient ? 
    mockClientRegistrations.find(c => c.id === selectedClient) : null;

  const renderClientDetail = () => {
    if (!selectedClientData) return null;

    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white rounded-xl p-6 border border-gray-200"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Résumé du Projet</h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedClient(null)}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Fermer
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Informations client */}
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-800 mb-3 flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Informations Client</span>
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-blue-600" />
                  <span className="text-gray-700">{selectedClientData.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Building className="w-4 h-4 text-blue-600" />
                  <span className="text-gray-700">{selectedClientData.company}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span className="text-gray-700">{selectedClientData.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span className="text-gray-700">{selectedClientData.phone}</span>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h4 className="font-medium text-purple-800 mb-3">Profil Fondateur</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <p><span className="font-medium">Âge:</span> {selectedClientData.founderInfo.age} ans</p>
                <p><span className="font-medium">Formation:</span> {selectedClientData.founderInfo.education}</p>
                <p><span className="font-medium">Expérience:</span> {selectedClientData.founderInfo.experience}</p>
              </div>
            </div>
          </div>

          {/* Projet */}
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-800 mb-3">Projet Demandé</h4>
              <div className="space-y-2">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Type:</span> {selectedClientData.projectType}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Budget:</span> {selectedClientData.budget.toLocaleString()}€
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Timeline:</span> {selectedClientData.timeline}
                </p>
                <div className="mt-3">
                  <p className="text-sm font-medium text-gray-700 mb-1">Description:</p>
                  <p className="text-sm text-gray-600 bg-white p-2 rounded border">
                    {selectedClientData.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <h4 className="font-medium text-orange-800 mb-3">Vision Business</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <p><span className="font-medium">Marché cible:</span> {selectedClientData.projectVision.targetMarket}</p>
                <p><span className="font-medium">Taille marché:</span> {selectedClientData.projectVision.marketSize}</p>
                <div className="mt-2">
                  <p className="font-medium mb-1">Problème résolu:</p>
                  <p className="text-gray-600 bg-white p-2 rounded border text-xs">
                    {selectedClientData.projectVision.problemSolved}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Plateformes et fonctionnalités */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-800 mb-3">Plateformes Demandées</h4>
            <div className="flex flex-wrap gap-2">
              {selectedClientData.technicalSpecs.platforms.map((platform, index) => (
                <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                  {platform}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-800 mb-3">Fonctionnalités Clés</h4>
            <div className="flex flex-wrap gap-2">
              {selectedClientData.technicalSpecs.features.slice(0, 4).map((feature, index) => (
                <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                  {feature}
                </span>
              ))}
              {selectedClientData.technicalSpecs.features.length > 4 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                  +{selectedClientData.technicalSpecs.features.length - 4} autres
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Statut et actions */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedClientData.status)}`}>
                {getStatusLabel(selectedClientData.status)}
              </span>
              <span className="text-sm text-gray-600">
                Soumis le {new Date(selectedClientData.submittedAt).toLocaleDateString('fr-FR')}
              </span>
            </div>
            {selectedClientData.status === 'approved' && (
              <div className="text-sm text-green-600 font-medium">
                ✓ Projet validé par l'équipe
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Gestion des Utilisateurs</h1>
        <div className="flex items-center space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCreateAccount(true)}
            className="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Créer Compte Équipe</span>
          </motion.button>
          <button
            onClick={() => setActiveTab('clients')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'clients' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Clients ({mockClientRegistrations.length})
          </button>
          <button
            onClick={() => setActiveTab('team')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'team' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Équipe ({mockUsers.filter(u => u.role !== 'admin').length})
            Équipe ({teamMembers.filter(u => u.role !== 'admin').length})
          </button>
        </div>
      </div>

      {activeTab === 'clients' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Liste des clients */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              {/* Filtres */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher un client..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="pending">En attente</option>
                  <option value="approved">Approuvés</option>
                  <option value="rejected">Rejetés</option>
                </select>
              </div>

              {/* Liste */}
              <div className="space-y-4">
                {filteredClients.map((client, index) => (
                  <motion.div
                    key={client.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-medium text-gray-800">{client.name}</h3>
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                            {client.company}
                          </span>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(client.status)}
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(client.status)}`}>
                              {getStatusLabel(client.status)}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{client.projectType}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <DollarSign className="w-4 h-4" />
                            <span>{client.budget.toLocaleString()}€</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{client.timeline}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(client.submittedAt).toLocaleDateString('fr-FR')}</span>
                          </div>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedClient(client.id)}
                        className="flex items-center space-x-2 px-3 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Voir</span>
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Détail du client sélectionné */}
          <div className="lg:col-span-1">
            {selectedClient ? renderClientDetail() : (
              <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
                <Eye className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">
                  Sélectionnez un client
                </h3>
                <p className="text-gray-500">
                  Cliquez sur "Voir" pour afficher le résumé détaillé du projet
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Vue équipe */
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center space-x-2">
            <Users className="w-5 h-5 text-blue-600" />
            <span>Membres de l'Équipe</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teamMembers.filter(user => user.role !== 'admin').map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-center space-x-4">
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-16 h-16 rounded-full"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{user.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{user.position}</p>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.role === 'chef' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {user.role === 'chef' ? 'Chef d\'équipe' : 'Développeur'}
                      </span>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-gray-500">En ligne</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Modal de création de compte */}
      <AnimatePresence>
        {showCreateAccount && (
          <CreateTeamAccount
            onClose={() => setShowCreateAccount(false)}
            onSendInvitation={handleCreateAccount}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AdminUsers;