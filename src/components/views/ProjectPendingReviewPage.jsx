// import React, { useState, useEffect } from 'react';
// import { useParams, useLocation, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { Button } from '@/components/ui/button';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { toast } from '@/components/ui/use-toast';
// import { CheckCircle, Edit3, PhoneCall, Send, FileText, CreditCard, MessageCircle, Eye, FileSpreadsheet, Download, Image as ImageIcon, ListChecks as RoadmapIcon } from 'lucide-react';

// const DetailItem = ({ label, value, className }) => (
//   <div className={`mb-3 ${className}`}>
//     <p className="text-xs text-bizzwiz-comet-tail/80 font-roboto-mono uppercase tracking-wider">{label}</p>
//     <p className="text-bizzwiz-star-white">{value || 'Non spécifié'}</p>
//   </div>
// );

// const PlaceholderSectionCard = ({ title, icon: Icon, children, actionButton }) => (
//   <motion.div 
//     initial={{ opacity: 0, y: 15 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.5, delay: 0.2 }}
//     className="bg-bizzwiz-deep-space/70 p-4 rounded-lg border border-bizzwiz-electric-cyan/20"
//   >
//     <div className="flex items-center mb-3">
//       <Icon size={22} className="mr-3 text-bizzwiz-electric-cyan" />
//       <h3 className="text-lg font-satoshi font-semibold text-bizzwiz-star-white">{title}</h3>
//     </div>
//     <div className="text-sm text-bizzwiz-comet-tail/90 mb-3">
//       {children}
//     </div>
//     {actionButton && <div className="mt-auto pt-3 border-t border-bizzwiz-electric-cyan/10">{actionButton}</div>}
//   </motion.div>
// );

// const ProjectPendingReviewPage = () => {
//   const { projectId } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [projectData, setProjectData] = useState(location.state?.formData);
//   const [isModificationModalOpen, setIsModificationModalOpen] = useState(false);
//   const [modificationRequest, setModificationRequest] = useState('');
//   const [isMockupModalOpen, setIsMockupModalOpen] = useState(false);

//   useEffect(() => {
//     if (!projectData) {
//       const storedProjects = JSON.parse(localStorage.getItem('bizzwiz-projects')) || [];
//       const currentProject = storedProjects.find(p => p.id === projectId);
//       if (currentProject) {
//         setProjectData(currentProject);
//       } else {
//         toast({ title: "Erreur", description: "Projet non trouvé. Redirection...", variant: "destructive" });
//         navigate('/create-project');
//       }
//     }
//   }, [projectId, projectData, navigate]);

//   const handleValidateAndPay = () => {
//     navigate(`/payment/${projectId}`, { state: { projectData } });
//   };

//   const handleRequestModification = () => {
//     setIsModificationModalOpen(true);
//   };

//   const submitModificationRequest = () => {
//     if (!modificationRequest.trim()) {
//       toast({ title: "Erreur", description: "Veuillez décrire votre demande de modification.", variant: "destructive" });
//       return;
//     }
//     console.log(`Demande de modification pour ${projectId}: ${modificationRequest}`);
//     toast({
//       title: "✅ Demande Envoyée",
//       description: "Votre demande de modification a été transmise à notre équipe. Nous vous contacterons bientôt.",
//     });
//     setIsModificationModalOpen(false);
//     setModificationRequest('');
//   };
  
//   const handlePlaceholderAction = (featureName) => {
//     toast({
//       title: `🚧 ${featureName}`,
//       description: "Cette fonctionnalité sera pleinement opérationnelle bientôt. Pour l'instant, ceci est un aperçu.",
//     });
//   };

//   if (!projectData) {
//     return <div className="min-h-screen flex items-center justify-center text-bizzwiz-star-white bg-bizzwiz-deep-space">Chargement du projet...</div>;
//   }
  
//   const simulatedQuoteAmount = projectData.budget ? `~${projectData.budget}` : "À définir (Contactez-nous)";
//   const simulatedRoadmapSteps = [
//     "Phase 1: Analyse des besoins et Conception UX/UI",
//     "Phase 2: Développement Frontend & Intégrations Clés",
//     "Phase 3: Développement Backend & Base de Données (si applicable)",
//     "Phase 4: Tests Qualité & Optimisations",
//     "Phase 5: Déploiement & Lancement Initial",
//     "Phase 6: Suivi Post-Lancement & Maintenance (optionnel)"
//   ];


//   return (
//     <div className="min-h-[calc(100vh-var(--navbar-height,68px))] bg-gradient-to-br from-bizzwiz-deep-space via-bizzwiz-nebula-purple/30 to-bizzwiz-deep-space text-bizzwiz-star-white p-4 sm:p-8 flex flex-col items-center justify-center">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//         className="w-full max-w-4xl bg-bizzwiz-glass-bg/70 backdrop-blur-xl border border-bizzwiz-electric-cyan/20 rounded-2xl shadow-2xl shadow-bizzwiz-nebula-purple/30 p-6 sm:p-10"
//       >
//         <div className="text-center mb-8">
//           <CheckCircle size={64} className="mx-auto text-bizzwiz-electric-cyan mb-4 text-glow-electric-cyan" />
//           <h1 className="text-3xl sm:text-4xl font-orbitron font-bold text-bizzwiz-star-white mb-2">Projet Soumis & Prêt pour Examen !</h1>
//           <p className="text-bizzwiz-comet-tail text-sm sm:text-base">
//             L'équipe BizzWiz AI a préparé les documents initiaux pour votre projet. Veuillez les examiner.
//           </p>
//           <p className="text-xs text-bizzwiz-comet-tail/70 mt-1">ID du Projet : {projectId}</p>
//         </div>

//         <div className="mb-8">
//           <h2 className="text-2xl font-satoshi font-bold text-bizzwiz-magenta-flare mb-4 border-b border-bizzwiz-magenta-flare/30 pb-2">Résumé de votre Demande :</h2>
//           <div className="bg-bizzwiz-deep-space/50 p-4 sm:p-6 rounded-xl border border-bizzwiz-magenta-flare/20">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
//               <DetailItem label="Nom du Projet" value={projectData.projectName} />
//               <DetailItem label="Type de Solution" value={projectData.solutionType} />
//               <DetailItem label="Audience Cible" value={projectData.audience} />
//               <DetailItem label="Style Visuel" value={projectData.visualStyle} />
//               {projectData.budget && <DetailItem label="Budget Estimé par Vous" value={projectData.budget} />}
//               {projectData.timing && <DetailItem label="Délai Souhaité" value={projectData.timing} />}
//             </div>
//             {projectData.projectDescription && (
//               <div className="mt-3">
//                 <p className="text-xs text-bizzwiz-comet-tail/80 font-roboto-mono uppercase tracking-wider">Votre Description</p>
//                 <p className="text-bizzwiz-star-white text-sm max-h-20 overflow-y-auto pr-2 no-scrollbar">{projectData.projectDescription}</p>
//               </div>
//             )}
//           </div>
//         </div>
        
//         <div className="mb-10">
//             <h2 className="text-2xl font-satoshi font-bold text-bizzwiz-electric-cyan mb-4 border-b border-bizzwiz-electric-cyan/30 pb-2">Documents Préparés par l'Équipe :</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 <PlaceholderSectionCard title="Aperçu de la Maquette" icon={ImageIcon}
//                     actionButton={
//                         <Button onClick={() => setIsMockupModalOpen(true)} variant="outline" size="sm" className="w-full border-bizzwiz-electric-cyan/50 text-bizzwiz-electric-cyan hover:bg-bizzwiz-electric-cyan/10 hover:text-bizzwiz-star-white">
//                             <Eye size={16} className="mr-2"/>Voir la Maquette (Simulé)
//                         </Button>
//                     }
//                 >
//                     <img  alt="Aperçu de la maquette du projet utilisateur" className="w-full h-32 object-cover rounded-md bg-bizzwiz-deep-space/30 border border-bizzwiz-star-white/10 my-2" src="https://images.unsplash.com/photo-1558798516-8f5a6bbfab8c" />
//                     Une première visualisation de l'interface et de l'expérience utilisateur proposées.
//                 </PlaceholderSectionCard>

//                 <PlaceholderSectionCard title="Feuille de Route Initiale" icon={RoadmapIcon}
//                      actionButton={
//                         <Button onClick={() => handlePlaceholderAction("Feuille de Route Détaillée")} variant="outline" size="sm" className="w-full border-bizzwiz-electric-cyan/50 text-bizzwiz-electric-cyan hover:bg-bizzwiz-electric-cyan/10 hover:text-bizzwiz-star-white">
//                             <FileSpreadsheet size={16} className="mr-2"/>Consulter Détails (Simulé)
//                         </Button>
//                     }
//                 >
//                     <ul className="space-y-1 text-xs list-disc list-inside pl-1">
//                         {simulatedRoadmapSteps.slice(0,3).map(step => <li key={step}>{step}</li>)}
//                         <li>Et plus...</li>
//                     </ul>
//                 </PlaceholderSectionCard>
                
//                 <PlaceholderSectionCard title="Devis Estimatif" icon={FileText}
//                     actionButton={
//                         <Button onClick={() => handlePlaceholderAction("Téléchargement du Devis")} variant="outline" size="sm" className="w-full border-bizzwiz-electric-cyan/50 text-bizzwiz-electric-cyan hover:bg-bizzwiz-electric-cyan/10 hover:text-bizzwiz-star-white">
//                             <Download size={16} className="mr-2"/>Télécharger PDF (Simulé)
//                         </Button>
//                     }
//                 >
//                     Montant estimé pour la réalisation de votre projet : <strong className="text-bizzwiz-star-white font-orbitron">{simulatedQuoteAmount}</strong>.
//                     <p className="text-xs mt-1">Un devis détaillé vous sera envoyé par email.</p>
//                 </PlaceholderSectionCard>
//             </div>
//         </div>
        
//         <Dialog open={isModificationModalOpen} onOpenChange={setIsModificationModalOpen}>
//           <DialogContent className="bg-bizzwiz-deep-space border-bizzwiz-magenta-flare text-bizzwiz-star-white">
//             <DialogHeader>
//               <DialogTitle className="font-orbitron text-bizzwiz-electric-cyan text-2xl">Demander une Modification</DialogTitle>
//               <DialogDescription className="text-bizzwiz-comet-tail">
//                 Expliquez les modifications que vous souhaitez apporter ou demandez un appel avec un assistant.
//               </DialogDescription>
//             </DialogHeader>
//             <div className="py-4 space-y-4">
//               <Textarea
//                 placeholder="Décrivez votre demande ici... Par exemple : 'Je voudrais discuter des fonctionnalités X et Y', 'Pouvons-nous revoir le budget ?', 'J'aimerais planifier un appel pour clarifier certains points.'"
//                 value={modificationRequest}
//                 onChange={(e) => setModificationRequest(e.target.value)}
//                 className="min-h-[120px] futuristic-textarea"
//               />
//                <Button onClick={() => { 
//                  setModificationRequest(prev => prev + "\n\nJe souhaite planifier un appel avec un assistant pour discuter de mon projet.");
//                  toast({title:"Astuce", description: "N'hésitez pas à préciser vos disponibilités pour l'appel."})
//                 }} 
//                 variant="ghost" className="text-bizzwiz-electric-cyan hover:text-bizzwiz-star-white hover:bg-bizzwiz-electric-cyan/20 text-sm">
//                  <PhoneCall size={16} className="mr-2" /> Ajouter une demande d'appel rapide
//                </Button>
//             </div>
//             <DialogFooter>
//               <Button variant="outline" onClick={() => setIsModificationModalOpen(false)} className="text-bizzwiz-comet-tail border-bizzwiz-comet-tail/50 hover:border-bizzwiz-comet-tail hover:text-bizzwiz-star-white">Annuler</Button>
//               <Button onClick={submitModificationRequest} className="futuristic-button bg-bizzwiz-magenta-flare hover:bg-bizzwiz-magenta-flare/80">
//                 <Send size={16} className="mr-2"/> Envoyer la Demande
//               </Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>

//         <Dialog open={isMockupModalOpen} onOpenChange={setIsMockupModalOpen}>
//             <DialogContent className="bg-bizzwiz-deep-space border-bizzwiz-electric-cyan text-bizzwiz-star-white max-w-2xl">
//                 <DialogHeader>
//                     <DialogTitle className="font-orbitron text-bizzwiz-electric-cyan text-2xl">Aperçu de la Maquette (Simulation)</DialogTitle>
//                     <DialogDescription className="text-bizzwiz-comet-tail">
//                         Ceci est une représentation de la maquette qui sera développée pour votre projet.
//                     </DialogDescription>
//                 </DialogHeader>
//                 <div className="py-4">
//                     <img  alt="Maquette détaillée du projet utilisateur" className="w-full h-auto max-h-[70vh] object-contain rounded-lg bg-bizzwiz-deep-space/50 border border-bizzwiz-star-white/20" src="https://images.unsplash.com/photo-1558798516-8f5a6bbfab8c" />
//                     <p className="text-xs text-bizzwiz-comet-tail/70 mt-2 text-center">Note: Image de remplacement. La maquette réelle sera plus détaillée.</p>
//                 </div>
//                  <DialogFooter>
//                     <Button onClick={() => setIsMockupModalOpen(false)} className="futuristic-button bg-bizzwiz-electric-cyan hover:bg-bizzwiz-electric-cyan/80">Fermer</Button>
//                 </DialogFooter>
//             </DialogContent>
//         </Dialog>

//       </motion.div>
//     </div>
//   );
// };

// export default ProjectPendingReviewPage;

import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { CheckCircle, Edit3, PhoneCall, Send, FileText, CreditCard, MessageCircle, Eye, FileSpreadsheet, Download, Image as ImageIcon, ListChecks as RoadmapIcon, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

const DetailItem = ({ label, value, className }) => (
  <div className={`mb-3 ${className}`}>
    <p className="text-xs text-bizzwiz-comet-tail/80 font-roboto-mono uppercase tracking-wider">{label}</p>
    <p className="text-bizzwiz-star-white">{value || 'Non spécifié'}</p>
  </div>
);

const PlaceholderSectionCard = ({ title, icon: Icon, children, actionButton }) => (
  <motion.div 
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className="bg-bizzwiz-deep-space/70 p-4 rounded-lg border border-bizzwiz-electric-cyan/20"
  >
    <div className="flex items-center mb-3">
      <Icon size={22} className="mr-3 text-bizzwiz-electric-cyan" />
      <h3 className="text-lg font-satoshi font-semibold text-bizzwiz-star-white">{title}</h3>
    </div>
    <div className="text-sm text-bizzwiz-comet-tail/90 mb-3">
      {children}
    </div>
    {actionButton && <div className="mt-auto pt-3 border-t border-bizzwiz-electric-cyan/10">{actionButton}</div>}
  </motion.div>
);

const ProjectPendingReviewPage = () => {
  const { projectId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState(location.state?.formData);
  const [isModificationModalOpen, setIsModificationModalOpen] = useState(false);
  const [modificationRequest, setModificationRequest] = useState('');
  const [isMockupModalOpen, setIsMockupModalOpen] = useState(false);

  useEffect(() => {
    if (!projectData) {
      const storedProjects = JSON.parse(localStorage.getItem('bizzwiz-projects')) || [];
      const currentProject = storedProjects.find(p => p.id === projectId);
      if (currentProject) {
        setProjectData(currentProject);
      } else {
        toast({ title: "Erreur", description: "Projet non trouvé. Redirection...", variant: "destructive" });
        navigate('/create-project');
      }
    }
  }, [projectId, projectData, navigate]);

  const handleValidateAndPay = () => {
    navigate(`/payment/${projectId}`, { state: { projectData } });
  };

  const handleRequestModification = () => {
    setIsModificationModalOpen(true);
  };

  const submitModificationRequest = () => {
    if (!modificationRequest.trim()) {
      toast({ title: "Erreur", description: "Veuillez décrire votre demande de modification.", variant: "destructive" });
      return;
    }
    console.log(`Demande de modification pour ${projectId}: ${modificationRequest}`);
    toast({
      title: "✅ Demande Envoyée",
      description: "Votre demande de modification a été transmise à notre équipe. Nous vous contacterons bientôt.",
    });
    setIsModificationModalOpen(false);
    setModificationRequest('');
  };
  
  const handlePlaceholderAction = (featureName) => {
    toast({
      title: `🚧 ${featureName}`,
      description: "Cette fonctionnalité sera pleinement opérationnelle bientôt. Pour l'instant, ceci est un aperçu.",
    });
  };

  if (!projectData) {
    return <div className="min-h-screen flex items-center justify-center text-bizzwiz-star-white bg-bizzwiz-deep-space">Chargement du projet...</div>;
  }
  
  const simulatedQuoteAmount = projectData.budget ? `~${projectData.budget}` : "À définir (Contactez-nous)";
  const simulatedRoadmapSteps = [
    "Phase 1: Analyse des besoins et Conception UX/UI",
    "Phase 2: Développement Frontend & Intégrations Clés",
    "Phase 3: Développement Backend & Base de Données (si applicable)",
    "Phase 4: Tests Qualité & Optimisations",
    "Phase 5: Déploiement & Lancement Initial",
    "Phase 6: Suivi Post-Lancement & Maintenance (optionnel)"
  ];

  return (
    <div className="min-h-[calc(100vh-var(--navbar-height,68px))] bg-gradient-to-br from-bizzwiz-deep-space via-bizzwiz-nebula-purple/30 to-bizzwiz-deep-space text-bizzwiz-star-white p-4 sm:p-8 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-4xl bg-bizzwiz-glass-bg/70 backdrop-blur-xl border border-bizzwiz-electric-cyan/20 rounded-2xl shadow-2xl shadow-bizzwiz-nebula-purple/30 p-6 sm:p-10"
      >
        <div className="text-center mb-8">
          <CheckCircle size={64} className="mx-auto text-bizzwiz-electric-cyan mb-4 text-glow-electric-cyan" />
          <h1 className="text-3xl sm:text-4xl font-orbitron font-bold text-bizzwiz-star-white mb-2">Projet Soumis & Prêt pour Examen !</h1>
          <p className="text-bizzwiz-comet-tail text-sm sm:text-base">
            L'équipe BizzWiz AI a préparé les documents initiaux pour votre projet. Veuillez les examiner.
          </p>
          <p className="text-xs text-bizzwiz-comet-tail/70 mt-1">ID du Projet : {projectId}</p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-satoshi font-bold text-bizzwiz-magenta-flare mb-4 border-b border-bizzwiz-magenta-flare/30 pb-2">Résumé de votre Demande :</h2>
          <div className="bg-bizzwiz-deep-space/50 p-4 sm:p-6 rounded-xl border border-bizzwiz-magenta-flare/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
              <DetailItem label="Nom du Projet" value={projectData.projectName} />
              <DetailItem label="Type de Solution" value={projectData.solutionType} />
              <DetailItem label="Audience Cible" value={projectData.audience} />
              <DetailItem label="Style Visuel" value={projectData.visualStyle} />
              {projectData.budget && <DetailItem label="Budget Estimé par Vous" value={projectData.budget} />}
              {projectData.timing && <DetailItem label="Délai Souhaité" value={projectData.timing} />}
            </div>
            {projectData.projectDescription && (
              <div className="mt-3">
                <p className="text-xs text-bizzwiz-comet-tail/80 font-roboto-mono uppercase tracking-wider">Votre Description</p>
                <p className="text-bizzwiz-star-white text-sm max-h-20 overflow-y-auto pr-2 no-scrollbar">{projectData.projectDescription}</p>
              </div>
            )}
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-satoshi font-bold text-bizzwiz-electric-cyan mb-4 border-b border-bizzwiz-electric-cyan/30 pb-2">
            Planifier une Réunion avec l'Admin
          </h2>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-bizzwiz-deep-space/70 p-4 rounded-lg border border-bizzwiz-electric-cyan/20"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="text-bizzwiz-comet-tail/90">
                <p className="text-sm font-satoshi">
                  Organisez une réunion avec notre administrateur pour discuter des détails de votre projet ou poser des questions.
                </p>
              </div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => navigate('/app/schedule-meet')}
                  className={cn(
                    'w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-bizzwiz-electric-cyan to-bizzwiz-magenta-flare text-bizzwiz-deep-space font-semibold shadow-lg hover:shadow-bizzwiz-electric-cyan/50 transition-all duration-300'
                  )}
                >
                  <Calendar size={16} className="mr-2" />
                  Planifier Maintenant
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <Dialog open={isModificationModalOpen} onOpenChange={setIsModificationModalOpen}>
          <DialogContent className="bg-bizzwiz-deep-space border-bizzwiz-magenta-flare text-bizzwiz-star-white">
            <DialogHeader>
              <DialogTitle className="font-orbitron text-bizzwiz-electric-cyan text-2xl">Demander une Modification</DialogTitle>
              <DialogDescription className="text-bizzwiz-comet-tail">
                Expliquez les modifications que vous souhaitez apporter ou demandez un appel avec un assistant.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <Textarea
                placeholder="Décrivez votre demande ici... Par exemple : 'Je voudrais discuter des fonctionnalités X et Y', 'Pouvons-nous revoir le budget ?', 'J'aimerais planifier un appel pour clarifier certains points.'"
                value={modificationRequest}
                onChange={(e) => setModificationRequest(e.target.value)}
                className="min-h-[120px] futuristic-textarea"
              />
              <Button
                onClick={() => {
                  setModificationRequest(prev => prev + "\n\nJe souhaite planifier un appel avec un assistant pour discuter de mon projet.");
                  toast({ title: "Astuce", description: "N'hésitez pas à préciser vos disponibilités pour l'appel." });
                }}
                variant="ghost"
                className="text-bizzwiz-electric-cyan hover:text-bizzwiz-star-white hover:bg-bizzwiz-electric-cyan/20 text-sm"
              >
                <PhoneCall size={16} className="mr-2" />
                Ajouter une demande d'appel rapide
              </Button>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsModificationModalOpen(false)}
                className="text-bizzwiz-comet-tail border-bizzwiz-comet-tail/50 hover:border-bizzwiz-comet-tail hover:text-bizzwiz-star-white"
              >
                Annuler
              </Button>
              <Button
                onClick={submitModificationRequest}
                className="futuristic-button bg-bizzwiz-magenta-flare hover:bg-bizzwiz-magenta-flare/80"
              >
                <Send size={16} className="mr-2" />
                Envoyer la Demande
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isMockupModalOpen} onOpenChange={setIsMockupModalOpen}>
          <DialogContent className="bg-bizzwiz-deep-space border-bizzwiz-electric-cyan text-bizzwiz-star-white max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-orbitron text-bizzwiz-electric-cyan text-2xl">Aperçu de la Maquette (Simulation)</DialogTitle>
              <DialogDescription className="text-bizzwiz-comet-tail">
                Ceci est une représentation de la maquette qui sera développée pour votre projet.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <img
                alt="Maquette détaillée du projet utilisateur"
                className="w-full h-auto max-h-[70vh] object-contain rounded-lg bg-bizzwiz-deep-space/50 border border-bizzwiz-star-white/20"
                src="https://images.unsplash.com/photo-1558798516-8f5a6bbfab8c"
              />
              <p className="text-xs text-bizzwiz-comet-tail/70 mt-2 text-center">
                Note: Image de remplacement. La maquette réelle sera plus détaillée.
              </p>
            </div>
            <DialogFooter>
              <Button
                onClick={() => setIsMockupModalOpen(false)}
                className="futuristic-button bg-bizzwiz-electric-cyan hover:bg-bizzwiz-electric-cyan/80"
              >
                Fermer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
};

export default ProjectPendingReviewPage;