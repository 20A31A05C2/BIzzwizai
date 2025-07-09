// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Button } from '@/components/ui/button';
// import { useToast } from '@/components/ui/use-toast';
// import { 
//   ArrowLeft, 
//   ExternalLink, 
//   CreditCard, 
//   Figma, 
//   Copy, 
//   CheckCircle2, 
//   AlertCircle,
//   RefreshCw,
//   Shield,
//   Clock,
//   Link as LinkIcon
// } from 'lucide-react';
// import ApiService from '@/apiService';

// const PaymentPage = () => {
//   const { projectId } = useParams();
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const [links, setLinks] = useState({
//     figma_url: '',
//     payment_url: '',
//   });
//   const [isLoading, setIsLoading] = useState(true);
//   const [copiedLink, setCopiedLink] = useState(null);

//   useEffect(() => {
//     const fetchProjectData = async () => {
//       setIsLoading(true);
//       try {
//         const token = localStorage.getItem('bizwizusertoken');
//         if (!token) {
//           throw new Error('Utilisateur non authentifié. Veuillez vous connecter.');
//         }

//         const endpoint = `/user-projects/${projectId}/payment-links`;
//         console.log('Fetching from endpoint:', endpoint);
//         const response = await ApiService(endpoint, 'GET', null, false, token);
//         console.log('API Response:', response);

//         if (response.success && response.data) {
//           setLinks({
//             figma_url: response.data.figma_url || '',
//             payment_url: response.data.payment_url || '',
//           });
//         } else {
//           throw new Error(response.message || 'Aucun lien de paiement trouvé.');
//         }
//       } catch (error) {
//         console.error('Erreur lors de la récupération des données:', error);
//         toast({
//           title: 'Erreur',
//           description: error.message || 'Impossible de charger les données du projet.',
//           variant: 'destructive',
//         });
//         if (error.message.includes('authentifié') || error.response?.status === 403) {
//           navigate('/app/dashboard');
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchProjectData();
//   }, [projectId, navigate, toast]);

//   const handlePayClick = () => {
//     if (links.payment_url) {
//       window.open(links.payment_url, '_blank', 'noopener,noreferrer');
//     } else {
//       toast({
//         title: 'Erreur',
//         description: 'Aucun lien de paiement disponible.',
//         variant: 'destructive',
//       });
//     }
//   };

//   const handleCopyLink = async (url, type) => {
//     try {
//       await navigator.clipboard.writeText(url);
//       setCopiedLink(type);
//       toast({
//         title: 'Copié !',
//         description: 'Le lien a été copié dans le presse-papiers.',
//       });
//       setTimeout(() => setCopiedLink(null), 2000);
//     } catch (error) {
//       toast({
//         title: 'Erreur',
//         description: 'Impossible de copier le lien.',
//         variant: 'destructive',
//       });
//     }
//   };

//   const openFigmaLink = () => {
//     if (links.figma_url) {
//       window.open(links.figma_url, '_blank', 'noopener,noreferrer');
//     }
//   };

//   const canAccessFigma = !!links.figma_url;

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-bizzwiz-deep-space">
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
//           className="text-[#8f00ff]"
//         >
//           <RefreshCw size={32} />
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-bizzwiz-deep-space via-bizzwiz-deep-space/95 to-bizzwiz-deep-space text-bizzwiz-star-white">
//       <div className="sticky top-0 z-10 bg-bizzwiz-deep-space/80 backdrop-blur-xl border-b border-[#8f00ff]/10">
//         <div className="max-w-4xl mx-auto px-6 py-6">
//           <div className="flex items-center justify-between">
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               className="flex items-center gap-4"
//             >
//               <div className="h-12 w-12 rounded-xl bg-[#8f00ff] flex items-center justify-center">
//                 <CreditCard size={24} className="text-bizzwiz-deep-space" />
//               </div>
//               <div>
//                 <h1 className="text-3xl font-orbitron font-bold text-[#8f00ff]">
//                   Liens du Projet
//                 </h1>
//                 <p className="text-bizzwiz-comet-tail text-sm">
//                   Accédez à vos ressources et effectuez le paiement
//                 </p>
//               </div>
//             </motion.div>
            
//             <Button
//               variant="outline"
//               onClick={() => navigate('/app/dashboard')}
//               className="border-[#8f00ff]/30 text-[#8f00ff] hover:bg-[#8f00ff]/10"
//             >
//               <ArrowLeft size={16} className="mr-2" />
//               Retour
//             </Button>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-4xl mx-auto px-6 py-12">
//         <div className="grid lg:grid-cols-2 gap-8">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 }}
//             className="group"
//           >
//             <div className="bg-bizzwiz-deep-space/60 backdrop-blur-xl rounded-2xl border border-[#8f00ff]/20 overflow-hidden hover:border-[#8f00ff]/40 transition-all duration-300">
//               <div className="p-6 bg-gradient-to-r from-[#8f00ff]/10 to-[#8f00ff]/10 border-b border-[#8f00ff]/20">
//                 <div className="flex items-center gap-3 mb-3">
//                   <div className="h-10 w-10 rounded-lg bg-[#8f00ff]/20 flex items-center justify-center">
//                     <Figma size={20} className="text-[#8f00ff]" />
//                   </div>
//                   <div>
//                     <h2 className="text-xl font-orbitron font-bold text-[#8f00ff]">
//                       Design Figma
//                     </h2>
//                     <p className="text-bizzwiz-comet-tail text-sm">
//                       Consultez vos maquettes
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className="p-6">
//                 {canAccessFigma ? (
//                   <div className="space-y-4">
//                     <div className="p-4 bg-bizzwiz-deep-space/40 rounded-xl border border-[#8f00ff]/10">
//                       <div className="flex items-center gap-2 mb-2">
//                         <LinkIcon size={14} className="text-[#8f00ff]" />
//                         <span className="text-xs font-medium text-[#8f00ff] uppercase tracking-wider">
//                           Lien Figma
//                         </span>
//                       </div>
//                       <p className="text-sm text-bizzwiz-comet-tail break-all font-mono">
//                         {links.figma_url}
//                       </p>
//                     </div>
                    
//                     <div className="flex gap-2">
//                       <motion.button
//                         whileHover={{ scale: 1.02 }}
//                         whileTap={{ scale: 0.98 }}
//                         onClick={openFigmaLink}
//                         className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#8f00ff] text-white font-semibold shadow-lg hover:shadow-[#8f00ff]/25 transition-all duration-300"
//                       >
//                         <ExternalLink size={16} />
//                         Ouvrir Figma
//                       </motion.button>
                      
//                       <motion.button
//                         whileHover={{ scale: 1.02 }}
//                         whileTap={{ scale: 0.98 }}
//                         onClick={() => handleCopyLink(links.figma_url, 'figma')}
//                         className="px-4 py-3 rounded-xl bg-bizzwiz-deep-space/60 border border-[#8f00ff]/30 text-[#8f00ff] hover:bg-[#8f00ff]/10 transition-all duration-300"
//                       >
//                         {copiedLink === 'figma' ? (
//                           <CheckCircle2 size={16} className="text-green-400" />
//                         ) : (
//                           <Copy size={16} />
//                         )}
//                       </motion.button>
//                     </div>
                    
//                     <div className="flex items-center gap-2 text-xs text-green-400">
//                       <CheckCircle2 size={14} />
//                       <span>Lien disponible</span>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="space-y-4">
//                     <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
//                       <div className="flex items-center gap-2 mb-2">
//                         <AlertCircle size={16} className="text-red-400" />
//                         <span className="text-sm font-medium text-red-400">
//                           Lien non disponible
//                         </span>
//                       </div>
//                       <p className="text-sm text-bizzwiz-comet-tail">
//                         Vous pouvez accéder après le paiement.
//                       </p>
//                     </div>
                    
//                     <div className="flex items-center gap-2 text-xs text-bizzwiz-comet-tail">
//                       <Clock size={14} />
//                       <span>En attente de paiement</span>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="group"
//           >
//             <div className="bg-bizzwiz-deep-space/60 backdrop-blur-xl rounded-2xl border border-[#8f00ff]/20 overflow-hidden hover:border-[#8f00ff]/40 transition-all duration-300">
//               <div className="p-6 bg-gradient-to-r from-[#8f00ff]/10 to-[#8f00ff]/10 border-b border-[#8f00ff]/20">
//                 <div className="flex items-center gap-3 mb-3">
//                   <div className="h-10 w-10 rounded-lg bg-[#8f00ff]/20 flex items-center justify-center">
//                     <CreditCard size={20} className="text-[#8f00ff]" />
//                   </div>
//                   <div>
//                     <h2 className="text-xl font-orbitron font-bold text-[#8f00ff]">
//                       Paiement Sécurisé
//                     </h2>
//                     <p className="text-bizzwiz-comet-tail text-sm">
//                       Finalisez votre commande
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className="p-6">
//                 {links.payment_url ? (
//                   <div className="space-y-4">
//                     <div className="p-4 bg-bizzwiz-deep-space/40 rounded-xl border border-[#8f00ff]/10">
//                       <div className="flex items-center gap-2 mb-2">
//                         <Shield size={14} className="text-[#8f00ff]" />
//                         <span className="text-xs font-medium text-[#8f00ff] uppercase tracking-wider">
//                           Lien de Paiement
//                         </span>
//                       </div>
//                       <p className="text-sm text-bizzwiz-comet-tail break-all font-mono">
//                         {links.payment_url}
//                       </p>
//                     </div>
                    
//                     <div className="space-y-4">
//                       <motion.button
//                         whileHover={{ scale: 1.02 }}
//                         whileTap={{ scale: 0.98 }}
//                         onClick={handlePayClick}
//                         className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#8f00ff] text-bizzwiz-deep-space font-semibold shadow-lg hover:shadow-[#8f00ff]/40 transition-all duration-300"
//                       >
//                         <CreditCard size={16} />
//                         Payer Maintenant
//                       </motion.button>
                      
//                       <motion.button
//                         whileHover={{ scale: 1.02 }}
//                         whileTap={{ scale: 0.98 }}
//                         onClick={() => handleCopyLink(links.payment_url, 'payment')}
//                         className="px-4 py-3 rounded-xl bg-bizzwiz-deep-space/60 border border-[#8f00ff]/30 text-[#8f00ff] hover:bg-[#8f00ff]/10 transition-all duration-300"
//                       >
//                         {copiedLink === 'payment' ? (
//                           <CheckCircle2 size={16} className="text-green-400" />
//                         ) : (
//                           <Copy size={16} />
//                         )}
//                       </motion.button>
//                     </div>
                    
//                     <div className="flex items-center gap-2 text-xs text-green-400">
//                       <CheckCircle2 size={14} />
//                       <span>Paiement sécurisé disponible</span>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="space-y-4">
//                     <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
//                       <div className="flex items-center gap-2 mb-2">
//                         <AlertCircle size={16} className="text-red-400" />
//                         <span className="text-sm font-medium text-red-400">
//                           Paiement non disponible
//                         </span>
//                       </div>
//                       <p className="text-sm text-bizzwiz-comet-tail">
//                         Le lien de paiement n'a pas encore été configuré pour ce projet.
//                       </p>
//                     </div>
                    
//                     <div className="flex items-center gap-2 text-xs text-bizzwiz-comet-tail">
//                       <Clock size={14} />
//                       <span>En attente de configuration</span>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </motion.div>
//         </div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3 }}
//           className="mt-12"
//         >
//           <div className="bg-bizzwiz-deep-space/40 backdrop-blur-xl rounded-2xl border border-[#8f00ff]/10 p-6">
//             <h3 className="text-lg font-orbitron font-semibold text-[#8f00ff] mb-4">
//               Informations Importantes
//             </h3>
//             <div className="grid md:grid-cols-2 gap-6 text-sm text-bizzwiz-comet-tail">
//               <div className="space-y-3">
//                 <div className="flex items-start gap-3">
//                   <Shield size={16} className="text-[#8f00ff] mt-0.5 flex-shrink-0" />
//                   <div>
//                     <h4 className="font-medium text-bizzwiz-star-white mb-1">Sécurité</h4>
//                     <p>Tous les paiements sont sécurisés et traités via des plateformes certifiées.</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-3">
//                   <Figma size={16} className="text-[#8f00ff] mt-0.5 flex-shrink-0" />
//                   <div>
//                     <h4 className="font-medium text-bizzwiz-star-white mb-1">Accès Figma</h4>
//                     <p>Les designs sont accessibles via le lien Figma fourni après le paiement.</p>
//                   </div>
//                 </div>
//               </div>
//               <div className="space-y-3">
//                 <div className="flex items-start gap-3">
//                   <ExternalLink size={16} className="text-[#8f00ff] mt-0.5 flex-shrink-0" />
//                   <div>
//                     <h4 className="font-medium text-bizzwiz-star-white mb-1">Liens Externes</h4>
//                     <p>Les liens s'ouvrent dans de nouveaux onglets pour votre sécurité.</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-3">
//                   <Copy size={16} className="text-[#8f00ff] mt-0.5 flex-shrink-0" />
//                   <div>
//                     <h4 className="font-medium text-bizzwiz-star-white mb-1">Copier les Liens</h4>
//                     <p>Utilisez le bouton copier pour partager les liens facilement.</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4 }}
//           className="mt-8 text-center"
//         >
//           <div className="inline-flex items-center gap-2 px-4 py-2 bg-bizzwiz-deep-space/40 rounded-full border border-[#8f00ff]/10">
//             <AlertCircle size={16} className="text-[#8f00ff]" />
//             <span className="text-sm text-bizzwiz-comet-tail">
//               Besoin d'aide ? Contactez notre support client
//             </span>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default PaymentPage;


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  const { projectId: urlProjectId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [links, setLinks] = useState({
    figma_url: '',
    payment_url: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [copiedLink, setCopiedLink] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  useEffect(() => {
    const fetchProjectData = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('bizwizusertoken');
        if (!token) {
          throw new Error('Utilisateur non authentifié. Veuillez vous connecter.');
        }

        // Get selected project ID from localStorage, fall back to URL param
        const storedProjectId = localStorage.getItem('bizzwiz-selectedProjectId');
        const projectIdToFetch = storedProjectId || urlProjectId;

        if (!projectIdToFetch || isNaN(projectIdToFetch)) {
          setLinks({ figma_url: '', payment_url: '' }); // Default to empty links
          setSelectedProjectId(null);
          return; // No redirect, just show empty UI
        }

        // Validate project existence
        const projectResponse = await ApiService(`/user-projects/${projectIdToFetch}`, 'GET', null, false, token);
        if (!projectResponse.success || !projectResponse.data) {
          setLinks({ figma_url: '', payment_url: '' }); // Default to empty links
          setSelectedProjectId(null);
          toast({
            title: 'Avertissement',
            description: 'Projet non trouvé ou non autorisé. Affichage avec données par défaut.',
            variant: 'default',
          });
          return;
        }

        // Fetch payment links
        const endpoint = `/user-projects/${projectIdToFetch}/payment-links`;
        console.log('Fetching from endpoint:', endpoint);
        const response = await ApiService(endpoint, 'GET', null, false, token);
        console.log('API Response:', response);

        if (response.success && response.data) {
          setLinks({
            figma_url: response.data.figma_url || '',
            payment_url: response.data.payment_url || '',
          });
        } else {
          // No links found, set empty links without error
          setLinks({ figma_url: '', payment_url: '' });
        }
        setSelectedProjectId(projectIdToFetch);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        setLinks({ figma_url: '', payment_url: '' }); // Default to empty links on error
        setSelectedProjectId(null);
        toast({
          title: 'Erreur',
          description: error.message || 'Impossible de charger les données du projet.',
          variant: 'destructive',
        });
        // No redirect on error, just show empty UI
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjectData();
  }, [urlProjectId, navigate, toast]);

  const handlePayClick = () => {
    if (links.payment_url) {
      window.open(links.payment_url, '_blank', 'noopener,noreferrer');
    } else {
      toast({
        title: 'Information',
        description: 'Aucun lien de paiement disponible pour ce projet.',
        variant: 'default',
      });
    }
  };

  const handleCopyLink = async (url, type) => {
    if (!url) {
      toast({
        title: 'Information',
        description: `Aucun lien ${type === 'figma' ? 'Figma' : 'de paiement'} disponible.`,
        variant: 'default',
      });
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopiedLink(type);
      toast({
        title: 'Copié !',
        description: 'Le lien a été copié dans le presse-papiers.',
      });
      setTimeout(() => setCopiedLink(null), 2000);
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de copier le lien.',
        variant: 'destructive',
      });
    }
  };

  const openFigmaLink = () => {
    if (links.figma_url) {
      window.open(links.figma_url, '_blank', 'noopener,noreferrer');
    } else {
      toast({
        title: 'Information',
        description: 'Aucun lien Figma disponible. Veuillez finaliser le paiement.',
        variant: 'default',
      });
    }
  };

  const canAccessFigma = !!links.figma_url;

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
    <div className="min-h-screen bg-gradient-to-br from-bizzwiz-deep-space via-bizzwiz-deep-space/95 to-bizzwiz-deep-space text-bizzwiz-star-white">
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
              onClick={() => navigate('/app/dashboard')}
              className="border-[#8f00ff]/30 text-[#8f00ff] hover:bg-[#8f00ff]/10"
            >
              <ArrowLeft size={16} className="mr-2" />
              Retour
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
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
                      onClick={openFigmaLink}
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
                    {canAccessFigma ? (
                      <span className="text-green-400">
                        <CheckCircle2 size={14} /> Lien disponible
                      </span>
                    ) : (
                      <span className="text-bizzwiz-comet-tail">
                        <Clock size={14} /> En attente de paiement
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

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
                      onClick={handlePayClick}
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