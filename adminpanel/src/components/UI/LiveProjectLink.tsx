import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, ExternalLink, Eye, Edit3, Save, X, Globe } from 'lucide-react';

interface LiveProjectLinkProps {
  userRole: 'admin' | 'chef' | 'member';
  currentLiveUrl?: string;
  onUpdateLiveUrl?: (url: string) => void;
}

const LiveProjectLink: React.FC<LiveProjectLinkProps> = ({ 
  userRole, 
  currentLiveUrl = '',
  onUpdateLiveUrl 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [liveUrl, setLiveUrl] = useState(currentLiveUrl);
  const [tempUrl, setTempUrl] = useState(currentLiveUrl);

  const handleSave = () => {
    setLiveUrl(tempUrl);
    onUpdateLiveUrl?.(tempUrl);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempUrl(liveUrl);
    setIsEditing(false);
  };

  const canEdit = userRole === 'member' || userRole === 'chef';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
          <Globe className="w-5 h-5 text-green-600" />
          <span>Projet en Live</span>
        </h3>
        {canEdit && !isEditing && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsEditing(true)}
            className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
          >
            <Edit3 className="w-4 h-4" />
          </motion.button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL du projet en développement
            </label>
            <input
              type="url"
              value={tempUrl}
              onChange={(e) => setTempUrl(e.target.value)}
              placeholder="https://votre-projet-live.netlify.app"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Sauvegarder</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCancel}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
              <span>Annuler</span>
            </motion.button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {liveUrl ? (
            <>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-green-800">Projet accessible en live</span>
                </div>
                <p className="text-sm text-green-700 break-all">{liveUrl}</p>
              </div>
              
              <div className="flex items-center space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.open(liveUrl, '_blank')}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Voir le Projet Live</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    navigator.clipboard.writeText(liveUrl);
                    // Vous pourriez ajouter une notification ici
                  }}
                  className="px-4 py-3 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  <Link className="w-4 h-4" />
                </motion.button>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-start space-x-3">
                  <Eye className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-800 mb-1">Visible par le client</h4>
                    <p className="text-sm text-blue-700">
                      Le client peut voir l'avancement du projet en temps réel via ce lien. 
                      Assurez-vous que la version déployée soit stable.
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-center">
              <Globe className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h4 className="font-medium text-gray-800 mb-2">Aucun lien live configuré</h4>
              <p className="text-sm text-gray-600 mb-4">
                {userRole === 'member' 
                  ? 'Ajoutez le lien de votre projet en développement pour que le client puisse suivre les progrès en temps réel.'
                  : 'L\'équipe n\'a pas encore configuré de lien live pour ce projet.'
                }
              </p>
              {canEdit && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
                >
                  Ajouter un lien live
                </motion.button>
              )}
            </div>
          )}

          {userRole === 'member' && (
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-white text-xs font-bold">!</span>
                </div>
                <div>
                  <h4 className="font-medium text-yellow-800 mb-1">Conseils pour le lien live</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Utilisez Netlify, Vercel ou GitHub Pages pour un déploiement automatique</li>
                    <li>• Mettez à jour le lien à chaque nouvelle version stable</li>
                    <li>• Testez le lien avant de le partager avec le client</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default LiveProjectLink;