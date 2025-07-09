// import React from 'react';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
// import { Button } from '@/components/ui/button';

// const ViewSubmissionModal = ({ project, isOpen, onClose }) => {
//     if (!project) return null;

//     const formatSubmissionData = (data) => {
//         if (!data || typeof data !== 'object') {
//           return <p className="text-slate-400 text-sm">Aucune donnée disponible.</p>;
//         }
        
//         return Object.entries(data).map(([key, valObj]) => {
//             if (!valObj || typeof valObj !== 'object') {
//               return (
//                 <div key={key} className="text-sm mb-1.5 p-2 bg-slate-700/30 rounded-md">
//                   <strong className="text-slate-300 block mb-0.5">{key}:</strong> 
//                   <span className="text-slate-400">{String(valObj || 'Non renseigné')}</span>
//                 </div>
//               );
//             }
    
//             let displayValue = valObj.value;
//             if (typeof valObj.value === 'object' && valObj.value !== null) {
//                 if (Array.isArray(valObj.value)) {
//                     displayValue = valObj.value.join(', ') || <span className="italic text-slate-500">Non renseigné</span>;
//                 } else {
//                     displayValue = JSON.stringify(valObj.value);
//                 }
//             } else if (valObj.noIdea) {
//                 displayValue = <span className="italic text-slate-500">Pas d'idée précise / Suggestions demandées</span>;
//             } else if (valObj.value === undefined || valObj.value === null || String(valObj.value).trim() === '') {
//                 displayValue = <span className="italic text-slate-500">Non renseigné</span>;
//             }
            
//             let specifyDisplay = null;
//             if (valObj.specifyText) {
//               if (typeof valObj.specifyText === 'string') {
//                 specifyDisplay = <span className="text-xs text-sky-400 block mt-0.5">Précision: {valObj.specifyText}</span>;
//               } else if (typeof valObj.specifyText === 'object' && valObj.specifyText !== null) {
//                 specifyDisplay = Object.entries(valObj.specifyText).map(([specKey, specVal]) => (
//                   <span key={specKey} className="text-xs text-sky-400 block mt-0.5">Précision ({specKey}): {specVal}</span>
//                 ));
//               }
//             }

//             return (
//                 <div key={key} className="text-sm mb-1.5 p-2 bg-slate-700/30 rounded-md">
//                     <strong className="text-slate-300 block mb-0.5">{valObj.label || key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</strong> 
//                     <span className="text-slate-400">{displayValue}</span>
//                     {specifyDisplay}
//                 </div>
//             );
//         });
//       };
      
//       const formatArtDirectionData = (data) => {
//         if (!data || typeof data !== 'object') {
//           return <p className="text-slate-400 text-sm">Aucune donnée disponible.</p>;
//         }
        
//         return Object.entries(data).map(([key, val]) => (
//             <div key={key} className="text-sm mb-1.5 p-2 bg-slate-700/30 rounded-md">
//                 <strong className="text-slate-300 block mb-0.5">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</strong> 
//                 <span className="text-slate-400">{String(val || 'Non renseigné')}</span>
//             </div>
//         ));
//       };

//     return (
//         <Dialog open={isOpen} onOpenChange={onClose}>
//             <DialogContent className="bg-slate-800 border-slate-700 text-slate-100 sm:max-w-xl">
//                 <DialogHeader>
//                     <DialogTitle className="text-2xl text-green-400">Détails de la Soumission Utilisateur</DialogTitle>
//                     <DialogDescription className="text-slate-400">
//                         Projet ID: {project.id.substring(0,8)}... pour {project.users?.email || 'Utilisateur inconnu'}
//                     </DialogDescription>
//                 </DialogHeader>
//                 <div className="space-y-3 py-4 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-green-500/60 scrollbar-track-slate-700">
//                     <h4 className="font-semibold text-slate-200 border-b border-slate-600 pb-1 mb-2">Réponses au Formulaire :</h4>
//                     {formatSubmissionData(project.form_answers)}
                    
//                     <h4 className="font-semibold text-slate-200 border-b border-slate-600 pb-1 mb-2 mt-4">Choix de Direction Artistique :</h4>
//                     {formatArtDirectionData(project.art_direction)}
//                 </div>
//                 <DialogFooter className="mt-2">
//                     <DialogClose asChild>
//                         <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">Fermer</Button>
//                     </DialogClose>
//                 </DialogFooter>
//             </DialogContent>
//         </Dialog>
//     );
// };

// export default ViewSubmissionModal;



import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const ViewSubmissionModal = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  const formatFormData = (data) => {
    if (!data || typeof data !== 'object') {
      return <p className="text-slate-400 text-sm">Aucune donnée disponible.</p>;
    }
    return Object.entries(data).map(([key, val]) => (
      <div key={key} className="text-sm mb-1.5 p-2 bg-slate-700/30 rounded-md">
        <strong className="text-slate-300 block mb-0.5">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</strong>
        <span className="text-slate-400">{Array.isArray(val) ? val.join(', ') : String(val || 'Non renseigné')}</span>
      </div>
    ));
  };

  // Convert id to string for display
  const displayId = typeof project.id === 'number' ? project.id.toString() : project.id;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-slate-700 text-slate-100 sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-green-400">Détails du Formulaire</DialogTitle>
          <DialogDescription className="text-slate-400">
            ID: {displayId} pour {project.email}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 py-4 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-green-500/60 scrollbar-track-slate-700">
          <h4 className="font-semibold text-slate-200 border-b border-slate-600 pb-1 mb-2">Données du Formulaire :</h4>
          {formatFormData({
            user_id: project.user_id,
            fullname: project.fullname,
            email: project.email,
            user_company: project.user_company,
            user_motivation: project.user_motivation,
            user_inspiration: project.user_inspiration,
            user_concerns: project.user_concerns,
            project_description: project.project_description,
            solution_type: project.solution_type,
            audience: project.audience,
            features: project.features,
            visual_style: project.visual_style,
            timing: project.timing,
            budget: project.budget,
            mission_part1: project.mission_part1,
            mission_part2: project.mission_part2,
            mission_part3: project.mission_part3,
            status: project.status,
          })}
        </div>
        <DialogFooter className="mt-2">
          <DialogClose asChild>
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">Fermer</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewSubmissionModal;