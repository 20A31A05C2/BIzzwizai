import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Building, 
  Mail, 
  Phone, 
  DollarSign, 
  Calendar,
  FileText,
  Target,
  Users,
  TrendingUp,
  Lightbulb,
  Award,
  Image,
  Palette,
  CheckCircle,
  XCircle,
  Edit,
  Save,
  Star,
  AlertTriangle,
  Clock,
  Download
} from 'lucide-react';
import { ClientRegistration } from '../../types';

interface ClientRegistrationDetailProps {
  registration: ClientRegistration;
  onApprove: (evaluation: any) => void;
  onReject: (reason: string) => void;
  onGenerateQuote: (quoteData: any) => void;
}

const ClientRegistrationDetail: React.FC<ClientRegistrationDetailProps> = ({
  registration,
  onApprove,
  onReject,
  onGenerateQuote
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState({
    feasibilityScore: 7,
    complexityLevel: 'medium' as 'low' | 'medium' | 'high',
    estimatedDuration: '6 mois',
    recommendedTeamSize: 3,
    technicalChallenges: [] as string[],
    notes: ''
  });

  const [quoteData, setQuoteData] = useState({
    totalAmount: 0,
    timeline: '6 mois',
    phases: [] as any[],
    paymentSchedule: [] as any[]
  });

  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: User },
    { id: 'founder', label: 'Fondateur', icon: Award },
    { id: 'vision', label: 'Vision Projet', icon: Lightbulb },
    { id: 'business', label: 'Business Plan', icon: TrendingUp },
    { id: 'assets', label: 'Assets & Branding', icon: Palette },
    { id: 'technical', label: 'Technique', icon: FileText }
  ];

  const getComplexityColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleApprove = () => {
    const evaluationData = {
      ...evaluation,
      evaluatedBy: 'SHANKAR',
      evaluatedAt: new Date().toISOString()
    };
    onApprove(evaluationData);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Informations de base */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
          <Building className="w-5 h-5 text-blue-600" />
          <span>Informations Générales</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Nom</p>
                <p className="font-medium text-gray-800">{registration.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium text-gray-800">{registration.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Téléphone</p>
                <p className="font-medium text-gray-800">{registration.phone}</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Building className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Entreprise</p>
                <p className="font-medium text-gray-800">{registration.company}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Award className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Position</p>
                <p className="font-medium text-gray-800">{registration.position}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Soumis le</p>
                <p className="font-medium text-gray-800">
                  {new Date(registration.submittedAt).toLocaleDateString('fr-FR')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projet */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
          <Target className="w-5 h-5 text-purple-600" />
          <span>Projet Demandé</span>
        </h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Type de projet</p>
            <p className="font-medium text-gray-800 text-lg">{registration.projectType}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Description</p>
            <p className="text-gray-700">{registration.description}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-1">
                <DollarSign className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-green-700">Budget</span>
              </div>
              <p className="text-2xl font-bold text-green-800">
                {registration.budget.toLocaleString()}€
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-1">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">Timeline</span>
              </div>
              <p className="text-lg font-bold text-blue-800">{registration.timeline}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Plateformes demandées */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Plateformes Demandées</h3>
        <div className="flex flex-wrap gap-2">
          {registration.smartFormData.platforms.map((platform, index) => (
            <span key={index} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
              {platform}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  const renderFounder = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
          <Award className="w-5 h-5 text-orange-600" />
          <span>Profil du Fondateur</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Âge</p>
              <p className="font-medium text-gray-800">{registration.founderInfo.age} ans</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Formation</p>
              <p className="text-gray-700">{registration.founderInfo.education}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Expérience</p>
              <p className="text-gray-700">{registration.founderInfo.experience}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Projets Précédents</p>
            <div className="space-y-2">
              {registration.founderInfo.previousProjects.map((project, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-700">{project}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6">
          <p className="text-sm text-gray-600 mb-2">Motivation</p>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-gray-700 italic">"{registration.founderInfo.motivation}"</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderVision = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
          <Lightbulb className="w-5 h-5 text-yellow-600" />
          <span>Vision du Projet</span>
        </h3>
        <div className="space-y-6">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Problème Résolu</p>
            <p className="text-gray-700 bg-red-50 p-4 rounded-lg border border-red-200">
              {registration.projectVision.problemSolved}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Proposition de Valeur Unique</p>
            <p className="text-gray-700 bg-green-50 p-4 rounded-lg border border-green-200">
              {registration.projectVision.uniqueValue}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">Marché Cible</p>
              <p className="text-gray-700">{registration.projectVision.targetMarket}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">Taille du Marché</p>
              <p className="text-gray-700 font-medium">{registration.projectVision.marketSize}</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Modèle de Revenus</p>
            <p className="text-gray-700 bg-blue-50 p-4 rounded-lg border border-blue-200">
              {registration.projectVision.revenueModel}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Concurrents Identifiés</p>
            <div className="flex flex-wrap gap-2">
              {registration.projectVision.competitors.map((competitor, index) => (
                <span key={index} className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
                  {competitor}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBusiness = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-green-600" />
          <span>Business Plan</span>
        </h3>
        <div className="space-y-6">
          {Object.entries(registration.businessPlan).map(([key, value]) => (
            <div key={key}>
              <p className="text-sm font-medium text-gray-600 mb-2 capitalize">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </p>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-gray-700">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAssets = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
          <Palette className="w-5 h-5 text-pink-600" />
          <span>Assets & Branding</span>
        </h3>
        <div className="space-y-6">
          {registration.assets.logoUrl && (
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">Logo</p>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 inline-block">
                <img 
                  src={registration.assets.logoUrl} 
                  alt="Logo" 
                  className="w-24 h-24 object-cover rounded-lg"
                />
              </div>
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Couleurs de Marque</p>
            <div className="flex space-x-2">
              {registration.assets.brandColors.map((color, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div 
                    className="w-12 h-12 rounded-lg border border-gray-300"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-xs text-gray-600 mt-1">{color}</span>
                </div>
              ))}
            </div>
          </div>
          {registration.assets.brandGuidelines && (
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">Guidelines de Marque</p>
              <p className="text-gray-700 bg-purple-50 p-4 rounded-lg border border-purple-200">
                {registration.assets.brandGuidelines}
              </p>
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Assets Existants</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {registration.assets.existingAssets.map((asset, index) => (
                <div key={index} className="bg-blue-50 p-3 rounded-lg text-center">
                  <FileText className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                  <p className="text-xs text-blue-700">{asset}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTechnical = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
          <FileText className="w-5 h-5 text-blue-600" />
          <span>Spécifications Techniques</span>
        </h3>
        <div className="space-y-6">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Fonctionnalités Demandées</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {registration.smartFormData.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 bg-blue-50 p-3 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-blue-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Secteur d'Activité</p>
            <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full font-medium">
              {registration.smartFormData.industry}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Audience Cible</p>
            <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
              {registration.smartFormData.targetAudience}
            </p>
          </div>
        </div>
      </div>

      {/* Évaluation du chef d'équipe */}
      {!registration.chefEvaluation && (
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
            <Star className="w-5 h-5 text-yellow-600" />
            <span>Évaluation Technique</span>
          </h3>
          {!isEvaluating ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsEvaluating(true)}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
            >
              <Edit className="w-5 h-5" />
              <span>Commencer l'Évaluation</span>
            </motion.button>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Score de Faisabilité (1-10)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={evaluation.feasibilityScore}
                    onChange={(e) => setEvaluation({...evaluation, feasibilityScore: parseInt(e.target.value)})}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Difficile</span>
                    <span className="font-medium">{evaluation.feasibilityScore}/10</span>
                    <span>Facile</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Niveau de Complexité
                  </label>
                  <select
                    value={evaluation.complexityLevel}
                    onChange={(e) => setEvaluation({...evaluation, complexityLevel: e.target.value as any})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="low">Faible</option>
                    <option value="medium">Moyen</option>
                    <option value="high">Élevé</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Durée Estimée
                  </label>
                  <input
                    type="text"
                    value={evaluation.estimatedDuration}
                    onChange={(e) => setEvaluation({...evaluation, estimatedDuration: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="ex: 6 mois"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Taille d'Équipe Recommandée
                  </label>
                  <input
                    type="number"
                    value={evaluation.recommendedTeamSize}
                    onChange={(e) => setEvaluation({...evaluation, recommendedTeamSize: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="1"
                    max="10"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes et Observations
                </label>
                <textarea
                  value={evaluation.notes}
                  onChange={(e) => setEvaluation({...evaluation, notes: e.target.value})}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Défis techniques, recommandations, points d'attention..."
                />
              </div>
              <div className="flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleApprove}
                  className="flex items-center space-x-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Approuver & Générer Devis</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsEvaluating(false)}
                  className="flex items-center space-x-2 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <XCircle className="w-5 h-5" />
                  <span>Annuler</span>
                </motion.button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'founder': return renderFounder();
      case 'vision': return renderVision();
      case 'business': return renderBusiness();
      case 'assets': return renderAssets();
      case 'technical': return renderTechnical();
      default: return renderOverview();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto"
    >
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {registration.name} - {registration.company}
            </h1>
            <p className="text-gray-600 mb-4">{registration.projectType}</p>
            <div className="flex items-center space-x-4">
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                En attente de validation
              </span>
              <span className="text-sm text-gray-500">
                Soumis le {new Date(registration.submittedAt).toLocaleDateString('fr-FR')}
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-green-600 mb-1">
              {registration.budget.toLocaleString()}€
            </p>
            <p className="text-sm text-gray-600">{registration.timeline}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </motion.div>
  );
};

export default ClientRegistrationDetail;