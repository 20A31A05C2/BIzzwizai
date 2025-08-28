import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Building, Mail, Phone, X, DollarSign, Calendar, Clock, Check, X as XIcon } from 'lucide-react';
import ApiService from '../../../apiService';
import { toast } from '@/components/ui/use-toast';

const AdminUserDetail = () => {
  const navigate = useNavigate();
  const { userId, formDataId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchUserDetail();
  }, [userId, formDataId]);

  const fetchUserDetail = async () => {
    try {
      setLoading(true);
      const response = await ApiService(`/admin/users/${userId}/projects/${formDataId}`, "GET");
      if (response.success) {
        setUser(response.data);
      } else {
        setError('Failed to fetch project details');
      }
    } catch (err) {
      setError('Error fetching project details: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async () => {
    try {
      setActionLoading(true);
      const response = await ApiService(`/admin/users/${userId}/projects/${formDataId}/project-status`, "POST", { action: 'accept' });
      if (response.success) {
        setUser(prev => ({ ...prev, status: 'approved' }));
        toast({
          title: 'Projet accepté avec succès!',
          description: 'Le projet a été accepté avec succès.',
          className: 'text-green-700 bg-green-50 border border-green-200',
        });
      } else {
        toast({
          title: 'Erreur lors de l\'acceptation du projet',
          description: 'Une erreur est survenue lors de l\'acceptation du projet.',
          variant: 'destructive',
        });
      }
    } catch (err) {
      toast({
        title: 'Erreur lors de l\'acceptation du projet',
        description: 'Une erreur est survenue lors de l\'acceptation du projet.',
        variant: 'destructive',
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    try {
      setActionLoading(true);
      const response = await ApiService(`/admin/users/${userId}/projects/${formDataId}/project-status`, "POST", { action: 'reject' });
      if (response.success) {
        setUser(prev => ({ ...prev, status: 'rejected' }));
        toast({
          title: 'Projet rejeté.',
          description: 'Le projet a été rejeté avec succès.',
          className: 'text-red-700 bg-red-50 border border-red-200',
        });
      } else {
        toast({
          title: 'Erreur lors du rejet du projet',
          description: 'Une erreur est survenue lors du rejet du projet.',
          variant: 'destructive',
        });
      }
    } catch (err) {
      toast({
        title: 'Erreur lors du rejet du projet',
        description: 'Une erreur est survenue lors du rejet du projet.',
        variant: 'destructive',
      });
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8">
        <div className="text-lg text-gray-600">Chargement...</div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8">
        <p className="text-lg text-red-600">{error || 'Client introuvable.'}</p>
        <button onClick={() => navigate(-1)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">Retour</button>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'pending':
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 mt-8 mb-8 p-0 sm:p-0"
    >
      <div className="flex items-center justify-between p-5 pb-2 border-b border-gray-100">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium"
        >
          <span>&larr;</span> Retour
        </button>
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Résumé du Projet</h3>
        <div className="w-12" />
      </div>
      <div className="divide-y divide-gray-100">
        <section className="p-5">
          <h4 className="font-semibold text-gray-700 mb-2 text-sm uppercase tracking-wide">Informations Client</h4>
          <div className="space-y-1 text-sm text-gray-700">
            <div className="flex items-center gap-2"><User className="w-4 h-4 text-blue-500" /><span>{user.name}</span></div>
            <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-blue-500" /><span>{user.email}</span></div>
          </div>
        </section>
        <section className="p-5">
          <h4 className="font-semibold text-gray-700 mb-2 text-sm uppercase tracking-wide">Projet Demandé</h4>
          <div className="space-y-1 text-sm text-gray-700">
            <div><span className="font-medium">Type:</span> {user.projectType}</div>
            <div className="flex flex-wrap gap-4">
              <span><span className="font-medium">Budget:</span> {user.budget.toLocaleString()}€</span>
              <span><span className="font-medium">Timeline:</span> {user.timeline}</span>
            </div>
            <div><span className="font-medium">Description:</span> <span className="text-gray-600">{user.description}</span></div>
            <div><span className="font-medium text-gray-700">Nom du projet:</span> <span className="text-gray-600">{user.projectName}</span></div>
          </div>
        </section>
        <section className="p-5">
          <h4 className="font-semibold text-gray-700 mb-2 text-sm uppercase tracking-wide">Motivation et Inspiration</h4>
          <div className="space-y-1 text-sm text-gray-700">
            <div><span className="font-medium">Motivation:</span> <span className="text-gray-600">{user.user_motivation}</span></div>
            <div><span className="font-medium">Inspiration:</span> <span className="text-gray-600">{user.user_inspiration}</span></div>
            <div><span className="font-medium">Préoccupations:</span> <span className="text-gray-600">{user.user_concerns}</span></div>
          </div>
        </section>
        <section className="p-5">
          <h4 className="font-semibold text-gray-700 mb-2 text-sm uppercase tracking-wide">Mission</h4>
          <div className="space-y-1 text-sm text-gray-700">
            <div><span className="font-medium">Partie 1:</span> <span className="text-gray-600">{user.mission_part1}</span></div>
            <div><span className="font-medium">Partie 2:</span> <span className="text-gray-600">{user.mission_part2}</span></div>
            <div><span className="font-medium">Partie 3:</span> <span className="text-gray-600">{user.mission_part3}</span></div>
          </div>
        </section>
        <section className="p-5">
          <h4 className="font-semibold text-gray-700 mb-2 text-sm uppercase tracking-wide">Spécifications Techniques</h4>
          <div className="space-y-2">
            <div><span className="font-medium text-gray-700">Audience:</span> <span className="text-gray-600">{user.audience}</span></div>
            <div><span className="font-medium text-gray-700">Style visuel:</span> <span className="text-gray-600">{user.visual_style}</span></div>
            
            <div>
              <span className="font-medium text-gray-700">Palette de couleurs:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {user.colorPalette && user.colorPalette.map((color, idx) => (
                  <span
                    key={idx}
                    style={{ backgroundColor: color }}
                    className="w-6 h-6 rounded-full border border-gray-200"
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {user.features && user.features.map((feature, idx) => (
                <span key={idx} className="px-2 py-1 bg-purple-50 text-purple-700 rounded-full text-xs border border-purple-100">{feature}</span>
              ))}
            </div>
          </div>
        </section>
        <section className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(user.status)}`}>
                {user.status === 'approved' ? 'Approuvé' : user.status === 'rejected' ? 'Rejeté' : 'En attente'}
              </span>
              <span className="text-xs text-gray-500">Soumis le {new Date(user.submittedAt).toLocaleDateString('fr-FR')}</span>
            </div>

            {user.status === 'pending' && (
              <div className="flex gap-2">
                <button
                  onClick={handleAccept}
                  disabled={actionLoading}
                  className="flex items-center gap-1 px-3 py-1 bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white rounded-lg text-xs font-medium transition-colors"
                >
                  <Check className="w-3 h-3" />
                  {actionLoading ? 'Acceptation...' : 'Accepter'}
                </button>
                <button
                  onClick={handleReject}
                  disabled={actionLoading}
                  className="flex items-center gap-1 px-3 py-1 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white rounded-lg text-xs font-medium transition-colors"
                >
                  <XIcon className="w-3 h-3" />
                  {actionLoading ? 'Rejet...' : 'Rejeter'}
                </button>
              </div>
            )}

            {user.status !== 'rejected' && (
              <div className="flex items-center gap-3">
                {user.status === 'approved' && (
                  <span className="text-xs text-green-600 font-medium">✓ Projet validé par l'équipe</span>
                )}
                <button
                  onClick={() => navigate(`/admindashboard/users/${userId}/projects/${formDataId}/edit`)}
                  className="flex items-center gap-1 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs font-medium transition-colors"
                >
                  <User className="w-3 h-3" />
                  Modifier le Tableau de Bord Utilisateur
                </button>
              </div>
            )}

            {user.status === 'rejected' && (
              <span className="text-xs text-red-600 font-medium">✗ Projet rejeté</span>
            )}
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default AdminUserDetail;