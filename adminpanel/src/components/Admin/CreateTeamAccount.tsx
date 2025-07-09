import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  UserPlus, 
  Mail, 
  Users,
  Send,
  X,
  Shield,
  CheckCircle,
  User,
  Crown
} from 'lucide-react';

interface CreateTeamAccountProps {
  onClose: () => void;
  onSendInvitation: (invitationData: any) => void;
}

const CreateTeamAccount: React.FC<CreateTeamAccountProps> = ({ onClose, onSendInvitation }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    role: 'member' as 'chef' | 'member',
    email: '',
    firstName: '',
    lastName: '',
    position: '',
    department: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Effacer l'erreur si elle existe
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validation des champs obligatoires
    if (!formData.email.trim()) newErrors.email = 'Email requis';
    if (!formData.firstName.trim()) newErrors.firstName = 'Prénom requis';
    if (!formData.lastName.trim()) newErrors.lastName = 'Nom requis';
    if (!formData.position.trim()) newErrors.position = 'Poste requis';

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Format email invalide';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      
      // Simuler l'envoi de l'invitation
      setTimeout(() => {
        const invitationData = {
          ...formData,
          id: Date.now().toString(),
          invitedBy: 'SIMO',
          invitedAt: new Date().toISOString(),
          invitationToken: `inv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 jours
        };
        
        onSendInvitation(invitationData);
        setIsLoading(false);
        setStep('success');
      }, 2000);
    }
  };

  const renderForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Sélection du rôle */}
      <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center space-x-2">
          <Shield className="w-5 h-5" />
          <span>Type de Compte</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleInputChange('role', 'member')}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              formData.role === 'member' 
                ? 'border-blue-500 bg-blue-100' 
                : 'border-gray-300 bg-white hover:border-blue-300'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                formData.role === 'member' ? 'bg-blue-500' : 'bg-gray-400'
              }`}>
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Membre d'Équipe</h4>
                <p className="text-sm text-gray-600">Développeur, Designer, etc.</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleInputChange('role', 'chef')}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              formData.role === 'chef' 
                ? 'border-purple-500 bg-purple-100' 
                : 'border-gray-300 bg-white hover:border-purple-300'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                formData.role === 'chef' ? 'bg-purple-500' : 'bg-gray-400'
              }`}>
                <Crown className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Chef d'Équipe</h4>
                <p className="text-sm text-gray-600">Responsable de projet</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Informations de base */}
      <div className="bg-green-50 p-6 rounded-xl border border-green-200">
        <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center space-x-2">
          <User className="w-5 h-5" />
          <span>Informations de Base</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prénom *
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.firstName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Prénom"
            />
            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom *
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.lastName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Nom"
            />
            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="email@bizzwiz.ai"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
        </div>
      </div>

      {/* Informations professionnelles */}
      <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
        <h3 className="text-lg font-semibold text-purple-800 mb-4 flex items-center space-x-2">
          <Users className="w-5 h-5" />
          <span>Informations Professionnelles</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Poste *
            </label>
            <input
              type="text"
              value={formData.position}
              onChange={(e) => handleInputChange('position', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                errors.position ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="ex: Développeur Full-Stack, Chef de projet..."
            />
            {errors.position && <p className="text-red-500 text-xs mt-1">{errors.position}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Département
            </label>
            <select
              value={formData.department}
              onChange={(e) => handleInputChange('department', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Sélectionner un département</option>
              <option value="development">Développement</option>
              <option value="design">Design</option>
              <option value="marketing">Marketing</option>
              <option value="management">Management</option>
              <option value="sales">Commercial</option>
            </select>
          </div>
        </div>
      </div>

      {/* Message personnalisé */}
      <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
        <h3 className="text-lg font-semibold text-orange-800 mb-4 flex items-center space-x-2">
          <Mail className="w-5 h-5" />
          <span>Message d'Invitation (Optionnel)</span>
        </h3>
        <textarea
          value={formData.message}
          onChange={(e) => handleInputChange('message', e.target.value)}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Message personnalisé à inclure dans l'email d'invitation..."
        />
      </div>

      {/* Boutons d'action */}
      <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          Annuler
        </motion.button>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isLoading}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center space-x-2 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Envoi en cours...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Envoyer l'Invitation</span>
            </>
          )}
        </motion.button>
      </div>
    </form>
  );

  const renderSuccess = () => (
    <div className="text-center py-8">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <CheckCircle className="w-10 h-10 text-green-600" />
      </motion.div>
      
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Invitation Envoyée !</h3>
      
      <div className="bg-green-50 p-6 rounded-xl border border-green-200 mb-6">
        <p className="text-green-800 mb-4">
          Une invitation a été envoyée à <strong>{formData.email}</strong>
        </p>
        <div className="text-sm text-green-700 space-y-2">
          <p>• L'invitation expire dans 7 jours</p>
          <p>• {formData.firstName} {formData.lastName} recevra un lien pour créer son mot de passe</p>
          <p>• Le compte sera automatiquement activé après validation</p>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
        <h4 className="font-medium text-blue-800 mb-2">Détails du compte à créer :</h4>
        <div className="text-sm text-blue-700 space-y-1">
          <p><strong>Nom :</strong> {formData.firstName} {formData.lastName}</p>
          <p><strong>Rôle :</strong> {formData.role === 'chef' ? 'Chef d\'équipe' : 'Membre d\'équipe'}</p>
          <p><strong>Poste :</strong> {formData.position}</p>
          {formData.department && <p><strong>Département :</strong> {formData.department}</p>}
        </div>
      </div>

      <div className="flex items-center justify-center space-x-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setStep('form');
            setFormData({
              role: 'member',
              email: '',
              firstName: '',
              lastName: '',
              position: '',
              department: '',
              message: ''
            });
          }}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Envoyer une Autre Invitation
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          Fermer
        </motion.button>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <UserPlus className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {step === 'form' ? 'Inviter un Nouveau Membre' : 'Invitation Envoyée'}
                </h2>
                <p className="text-gray-600">
                  {step === 'form' 
                    ? 'Envoyer une invitation pour rejoindre l\'équipe BIZZ PLACE'
                    : 'L\'invitation a été envoyée avec succès'
                  }
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </motion.button>
          </div>
        </div>

        <div className="p-6">
          {step === 'form' ? renderForm() : renderSuccess()}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CreateTeamAccount;