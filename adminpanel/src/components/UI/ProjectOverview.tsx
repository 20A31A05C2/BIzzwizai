import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Users, 
  DollarSign, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  FileText,
  Code,
  Target,
  ExternalLink
} from 'lucide-react';
import LiveProjectLink from './LiveProjectLink';

interface ProjectOverviewProps {
  userRole: 'admin' | 'chef' | 'member';
}

const ProjectOverview: React.FC<ProjectOverviewProps> = ({ userRole }) => {
  const [projectLiveUrl, setProjectLiveUrl] = React.useState('https://eyvo-ai-demo.netlify.app');

  const handleUpdateLiveUrl = (url: string) => {
    setProjectLiveUrl(url);
    // Ici vous pourriez faire un appel API pour sauvegarder l'URL
    console.log('URL live mise à jour:', url);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      default: return 'text-green-600';
    }
  };

  const getRoleSpecificActions = () => {
    switch (userRole) {
      case 'admin':
        return (
          <div className="flex space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
            >
              Superviser Projet
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
            >
              Rapports Financiers
            </motion.button>
          </div>
        );
      case 'chef':
        return (
          <div className="flex space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
            >
              Assigner Tâches
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
            >
              Chat Client
            </motion.button>
          </div>
        );
      case 'member':
        return (
          <div className="flex space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
            >
              Mes Tâches
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
            >
              Chat Équipe
            </motion.button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header du projet */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center space-x-4 mb-3">
              <h1 className="text-3xl font-bold text-gray-800">EYVO AI</h1>
              <span className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 rounded-full text-sm font-medium border border-purple-200">
                En cours
              </span>
              <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium border border-red-200">
                Priorité élevée
              </span>
            </div>
            <p className="text-gray-600 mb-4 max-w-3xl">
              Plateforme d'intelligence artificielle pour l'analyse prédictive et l'automatisation des processus métier
            </p>
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>15 Jan - 30 Juin 2024</span>
              </div>
              <div className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4" />
                <span>85 000€</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>TechCorp Solutions</span>
              </div>
            </div>
          </div>
          {getRoleSpecificActions()}
        </div>

        {/* Barre de progression */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progression globale</span>
            <span className="text-sm font-bold text-gray-800">45%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '45%' }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full"
            />
          </div>
        </div>

        {/* Équipe */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-100">
            <div className="flex items-center space-x-3">
              <img 
                src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop" 
                alt="SIMO" 
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-medium text-gray-800">SIMO</p>
                <p className="text-sm text-gray-600">Administrateur</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-100">
            <div className="flex items-center space-x-3">
              <img 
                src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop" 
                alt="SHANKAR" 
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-medium text-gray-800">SHANKAR</p>
                <p className="text-sm text-gray-600">Chef d'équipe</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-teal-50 p-4 rounded-lg border border-green-100">
            <div className="flex items-center space-x-3">
              <img 
                src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop" 
                alt="VINEL" 
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-medium text-gray-800">VINEL</p>
                <p className="text-sm text-gray-600">Développeur</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Phases du projet */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
          <Target className="w-5 h-5 text-purple-600" />
          <span>Phases du Projet</span>
        </h2>
        <div className="space-y-4">
          {[
            { name: 'Analyse & Conception', status: 'completed', progress: 100, period: '15 Jan - 15 Fév' },
            { name: 'Développement Core', status: 'in-progress', progress: 60, period: '16 Fév - 30 Avr' },
            { name: 'Tests & Déploiement', status: 'pending', progress: 0, period: '1 Mai - 30 Juin' }
          ].map((phase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {phase.status === 'completed' && <CheckCircle className="w-5 h-5 text-green-600" />}
                  {phase.status === 'in-progress' && <Clock className="w-5 h-5 text-blue-600" />}
                  {phase.status === 'pending' && <AlertCircle className="w-5 h-5 text-gray-400" />}
                  <h3 className="font-medium text-gray-800">{phase.name}</h3>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600">{phase.period}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(phase.status)}`}>
                    {phase.status === 'completed' ? 'Terminé' : 
                     phase.status === 'in-progress' ? 'En cours' : 'En attente'}
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${phase.progress}%` }}
                  transition={{ duration: 1, ease: "easeOut", delay: index * 0.2 }}
                  className={`h-2 rounded-full ${
                    phase.status === 'completed' ? 'bg-green-500' :
                    phase.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Technologies et Livrables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
            <Code className="w-5 h-5 text-blue-600" />
            <span>Technologies</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {['React', 'Node.js', 'Python', 'TensorFlow', 'PostgreSQL', 'Docker'].map((tech, index) => (
              <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
            <FileText className="w-5 h-5 text-green-600" />
            <span>Livrables</span>
          </h3>
          <div className="space-y-2">
            {[
              { name: 'Cahier des charges', status: 'completed' },
              { name: 'Maquettes Figma', status: 'completed' },
              { name: 'API Documentation', status: 'in-progress' },
              { name: 'Interface utilisateur', status: 'in-progress' },
              { name: 'Modèle IA', status: 'pending' }
            ].map((deliverable, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{deliverable.name}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(deliverable.status)}`}>
                  {deliverable.status === 'completed' ? 'Terminé' : 
                   deliverable.status === 'in-progress' ? 'En cours' : 'En attente'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dashboard Client */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
            <ExternalLink className="w-5 h-5 text-purple-600" />
            <span>Dashboard Client</span>
          </h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open('https://superlative-genie-d5d8a4.netlify.app/', '_blank')}
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Voir Dashboard</span>
          </motion.button>
        </div>
        <p className="text-gray-600 text-sm">
          Le client TechCorp Solutions peut suivre l'avancement du projet EYVO AI en temps réel via son dashboard personnalisé.
        </p>
      </div>

      {/* Lien Live du Projet */}
      <LiveProjectLink 
        userRole={userRole}
        currentLiveUrl={projectLiveUrl}
        onUpdateLiveUrl={handleUpdateLiveUrl}
      />
    </motion.div>
  );
};

export default ProjectOverview;