import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import {
  ArrowLeft,
  ExternalLink,
  CreditCard,
  Figma,
  Copy,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Shield,
  Clock,
  Link as LinkIcon
} from 'lucide-react';
import ApiService from '@/apiService';

const PaymentPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [links, setLinks] = useState({ figma_url: '', payment_url: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [copiedLink, setCopiedLink] = useState(null);

  useEffect(() => {
    const fetchLinks = async () => {
      setIsLoading(true);
      try {
        // Get userId and projectId from localStorage
        const userId = localStorage.getItem('bizzwiz-userId');
        const projectId = localStorage.getItem('bizzwiz-selectedProjectId');
        const response = await ApiService(`/user-projects/${userId}/${projectId}/links`, 'GET');
        if (response && response.data) {
          setLinks({
            figma_url: response.data.figma_url || '',
            payment_url: response.data.payment_url || '',
          });
        } else {
          setLinks({ figma_url: '', payment_url: '' });
        }
      } catch (error) {
        setLinks({ figma_url: '', payment_url: '' });
        toast({
          title: 'Information',
          description: "Aucun lien de paiement ou Figma disponible pour ce projet.",
          variant: 'default',
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchLinks();
  }, [toast]);

  const handleCopyLink = async (url, type) => {
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedLink(type);
      toast({
        title: 'Copié !',
        description: 'Le lien a été copié dans le presse-papiers.',
      });
      setTimeout(() => setCopiedLink(null), 2000);
    } catch {
      toast({
        title: 'Erreur',
        description: 'Impossible de copier le lien.',
        variant: 'destructive',
      });
    }
  };

  const openLink = (url) => {
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-bizzwiz-deep-space">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="text-[#8f00ff]"
        >
          <RefreshCw size={32} />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bizzwiz-deep-space via-bizzwiz-deep-space/95 to-bizzwiz-deep-space text-bizzwiz-star-white flex flex-col">
      <div className="sticky top-0 z-10 bg-bizzwiz-deep-space/80 backdrop-blur-xl border-b border-[#8f00ff]/10">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4"
            >
              <div className="h-12 w-12 rounded-xl bg-[#8f00ff] flex items-center justify-center">
                <CreditCard size={24} className="text-bizzwiz-deep-space" />
              </div>
              <div>
                <h1 className="text-3xl font-orbitron font-bold text-[#8f00ff]">
                  Liens du Projet
                </h1>
                <p className="text-bizzwiz-comet-tail text-sm">
                  Accédez à vos ressources et effectuez le paiement
                </p>
              </div>
            </motion.div>
            <Button
              variant="outline"
              onClick={() => navigate('/dashboard')}
              className="border-[#8f00ff]/30 text-[#8f00ff] hover:bg-[#8f00ff]/10"
            >
              <ArrowLeft size={16} className="mr-2" />
              Retour
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full max-w-4xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Figma Link Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="group"
          >
            <div className="bg-bizzwiz-deep-space/60 backdrop-blur-xl rounded-2xl border border-[#8f00ff]/20 overflow-hidden hover:border-[#8f00ff]/40 transition-all duration-300">
              <div className="p-6 bg-gradient-to-r from-[#8f00ff]/10 to-[#8f00ff]/10 border-b border-[#8f00ff]/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-lg bg-[#8f00ff]/20 flex items-center justify-center">
                    <Figma size={20} className="text-[#8f00ff]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-orbitron font-bold text-[#8f00ff]">
                      Design Figma
                    </h2>
                    <p className="text-bizzwiz-comet-tail text-sm">
                      Consultez vos maquettes
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="p-4 bg-bizzwiz-deep-space/40 rounded-xl border border-[#8f00ff]/10">
                    <div className="flex items-center gap-2 mb-2">
                      <LinkIcon size={14} className="text-[#8f00ff]" />
                      <span className="text-xs font-medium text-[#8f00ff] uppercase tracking-wider">
                        Lien Figma
                      </span>
                    </div>
                    <p className="text-sm text-bizzwiz-comet-tail break-all font-mono">
                      {links.figma_url || 'Non disponible'}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => openLink(links.figma_url)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#8f00ff] text-white font-semibold shadow-lg hover:shadow-[#8f00ff]/25 transition-all duration-300"
                      disabled={!links.figma_url}
                    >
                      <ExternalLink size={16} />
                      Ouvrir Figma
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleCopyLink(links.figma_url, 'figma')}
                      className="px-4 py-3 rounded-xl bg-bizzwiz-deep-space/60 border border-[#8f00ff]/30 text-[#8f00ff] hover:bg-[#8f00ff]/10 transition-all duration-300"
                      disabled={!links.figma_url}
                    >
                      {copiedLink === 'figma' ? (
                        <CheckCircle2 size={16} className="text-green-400" />
                      ) : (
                        <Copy size={16} />
                      )}
                    </motion.button>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    {links.figma_url ? (
                      <span className="text-green-400">
                        <CheckCircle2 size={14} /> Lien disponible
                      </span>
                    ) : (
                      <span className="text-bizzwiz-comet-tail">
                        <Clock size={14} /> En attente de configuration
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Payment Link Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="group"
          >
            <div className="bg-bizzwiz-deep-space/60 backdrop-blur-xl rounded-2xl border border-[#8f00ff]/20 overflow-hidden hover:border-[#8f00ff]/40 transition-all duration-300">
              <div className="p-6 bg-gradient-to-r from-[#8f00ff]/10 to-[#8f00ff]/10 border-b border-[#8f00ff]/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-lg bg-[#8f00ff]/20 flex items-center justify-center">
                    <CreditCard size={20} className="text-[#8f00ff]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-orbitron font-bold text-[#8f00ff]">
                      Paiement Sécurisé
                    </h2>
                    <p className="text-bizzwiz-comet-tail text-sm">
                      Finalisez votre commande
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="p-4 bg-bizzwiz-deep-space/40 rounded-xl border border-[#8f00ff]/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield size={14} className="text-[#8f00ff]" />
                      <span className="text-xs font-medium text-[#8f00ff] uppercase tracking-wider">
                        Lien de Paiement
                      </span>
                    </div>
                    <p className="text-sm text-bizzwiz-comet-tail break-all font-mono">
                      {links.payment_url || 'Non disponible'}
                    </p>
                  </div>
                  <div className="space-y-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => openLink(links.payment_url)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#8f00ff] text-bizzwiz-deep-space font-semibold shadow-lg hover:shadow-[#8f00ff]/40 transition-all duration-300"
                      disabled={!links.payment_url}
                    >
                      <CreditCard size={16} />
                      Payer Maintenant
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleCopyLink(links.payment_url, 'payment')}
                      className="px-4 py-3 rounded-xl bg-bizzwiz-deep-space/60 border border-[#8f00ff]/30 text-[#8f00ff] hover:bg-[#8f00ff]/10 transition-all duration-300"
                      disabled={!links.payment_url}
                    >
                      {copiedLink === 'payment' ? (
                        <CheckCircle2 size={16} className="text-green-400" />
                      ) : (
                        <Copy size={16} />
                      )}
                    </motion.button>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    {links.payment_url ? (
                      <span className="text-green-400">
                        <CheckCircle2 size={14} /> Paiement sécurisé disponible
                      </span>
                    ) : (
                      <span className="text-bizzwiz-comet-tail">
                        <Clock size={14} /> En attente de configuration
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Informations Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <div className="bg-bizzwiz-deep-space/40 backdrop-blur-xl rounded-2xl border border-[#8f00ff]/10 p-6">
            <h3 className="text-lg font-orbitron font-semibold text-[#8f00ff] mb-4">
              Informations Importantes
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-bizzwiz-comet-tail">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Shield size={16} className="text-[#8f00ff] mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-bizzwiz-star-white mb-1">Sécurité</h4>
                    <p>Tous les paiements sont sécurisés et traités via des plateformes certifiées.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Figma size={16} className="text-[#8f00ff] mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-bizzwiz-star-white mb-1">Accès Figma</h4>
                    <p>Les designs sont accessibles via le lien Figma fourni après le paiement.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <ExternalLink size={16} className="text-[#8f00ff] mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-bizzwiz-star-white mb-1">Liens Externes</h4>
                    <p>Les liens s'ouvrent dans de nouveaux onglets pour votre sécurité.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Copy size={16} className="text-[#8f00ff] mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-bizzwiz-star-white mb-1">Copier les Liens</h4>
                    <p>Utilisez le bouton copier pour partager les liens facilement.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Support Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-bizzwiz-deep-space/40 rounded-full border border-[#8f00ff]/10">
            <AlertCircle size={16} className="text-[#8f00ff]" />
            <span className="text-sm text-bizzwiz-comet-tail">
              Besoin d'aide ? Contactez notre support client
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentPage;
