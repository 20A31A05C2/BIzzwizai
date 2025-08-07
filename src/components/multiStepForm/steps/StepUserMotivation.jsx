// import React from 'react';
// import { useFormContext } from '@/contexts/FormContext';
// import StepButton from '@/components/multiStepForm/StepButton';
// import { Textarea } from '@/components/ui/textarea';
// import { Label } from '@/components/ui/label';
// import { Sparkles, Lightbulb, ShieldAlert } from 'lucide-react';

// const StepUserMotivation = () => {
//   const { formData, updateFormData, nextStep, prevStep } = useFormContext();

//   const handleChange = (e) => {
//     updateFormData({ [e.target.name]: e.target.value });
//   };
  
//   // Fix: Add null/undefined checks and provide default values
//   const isFormComplete = formData.userMotivation && formData.userMotivation.trim();

//   return (
//     <div className="flex flex-col h-full">
//       <div className="flex-grow space-y-6">
//         <div className="space-y-5">
//           <div>
//             <Label htmlFor="userMotivation" className="text-bizzwiz-text-alt text-sm font-medium flex items-center">
//               <Sparkles size={18} className="mr-2 text-bizzwiz-accent opacity-70" />
//               Quelle est votre principale motivation derrière ce projet ?
//             </Label>
//             <Textarea
//               id="userMotivation"
//               name="userMotivation"
//               value={formData.userMotivation || ''}
//               onChange={handleChange}
//               placeholder="Ex: Résoudre un problème urgent, explorer une passion, innover dans mon secteur..."
//               className="form-textarea min-h-[100px] mt-1"
//             />
//           </div>
//           <div>
//             <Label htmlFor="userInspiration" className="text-bizzwiz-text-alt text-sm font-medium flex items-center">
//               <Lightbulb size={18} className="mr-2 text-bizzwiz-accent opacity-70" />
//               Y a-t-il des projets, idées ou personnes qui vous inspirent pour cela ? (Optionnel)
//             </Label>
//             <Textarea
//               id="userInspiration"
//               name="userInspiration"
//               value={formData.userInspiration || ''}
//               onChange={handleChange}
//               placeholder="Ex: J'admire l'approche de [entreprise X], ou je suis inspiré par [personne Y]..."
//               className="form-textarea min-h-[80px] mt-1"
//             />
//           </div>
//            <div>
//             <Label htmlFor="userConcerns" className="text-bizzwiz-text-alt text-sm font-medium flex items-center">
//               <ShieldAlert size={18} className="mr-2 text-bizzwiz-accent opacity-70" />
//               Avez-vous des craintes ou des appréhensions spécifiques concernant ce projet ? (Optionnel)
//             </Label>
//             <Textarea
//               id="userConcerns"
//               name="userConcerns"
//               value={formData.userConcerns || ''}
//               onChange={handleChange}
//               placeholder="Ex: Peur de ne pas avoir les compétences techniques, inquiétude sur le budget, difficulté à atteindre la cible..."
//               className="form-textarea min-h-[80px] mt-1"
//             />
//           </div>
//         </div>
//       </div>

//       <div className="mt-auto pt-6 flex justify-between">
//         <StepButton onClick={prevStep} variant="secondary">Précédent</StepButton>
//         <StepButton onClick={nextStep} disabled={!isFormComplete}>Suivant</StepButton>
//       </div>
//     </div>
//   );
// };

// export default StepUserMotivation;






import React from 'react';
import { useFormContext } from '@/contexts/FormContext';
import StepButton from '@/components/multiStepForm/StepButton';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Sparkles, Lightbulb, ShieldAlert } from 'lucide-react';
import TopHeaderBar from '../TopHeaderBar';
import LevelHeader from '../LevelHeader';
import ProgressBar from '../ProgressBar';
import ChatMessage from '../ChatMessage';

const StepUserMotivation = () => {
  const { formData, updateFormData, nextStep, prevStep } = useFormContext();

  const handleChange = (e) => {
    updateFormData({ [e.target.name]: e.target.value });
  };

  const isFormComplete = formData.userMotivation && formData.userMotivation.trim();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-montserrat">
      {/* Top Header Bar */}
      <TopHeaderBar />

      {/* Level Header */}
      <LevelHeader />

      {/* Progress Bar */}
      <div className="px-4 sm:px-6 md:px-8 mb-8 sm:mb-10 w-full">
        <ProgressBar currentStep={3} totalSteps={11} />
      </div>

      {/* Main Content Container with White Glassmorphism */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 md:px-8">
        <div className="rounded-3xl bg-white/10 backdrop-blur-md border border-white/30 p-4 sm:p-6 md:p-8 max-w-lg sm:max-w-xl md:max-w-2xl w-full text-center shadow-[0_0_40px_rgba(168,85,247,0.35)]">
          <ChatMessage message="Dites-nous ce qui vous anime pour ce projet." />
          
          <div className="space-y-6 text-left">
            <div className="space-y-5">
              <div>
                <Label htmlFor="userMotivation" className="text-bizzwiz-text-alt text-sm font-medium flex items-center">
                  <Sparkles size={18} className="mr-2 text-bizzwiz-accent opacity-70" />
                  Quelle est votre principale motivation derrière ce projet ?
                </Label>
                <Textarea
                  id="userMotivation"
                  name="userMotivation"
                  value={formData.userMotivation || ''}
                  onChange={handleChange}
                  placeholder="Ex: Résoudre un problème urgent, explorer une passion, innover dans mon secteur..."
                  className="form-textarea min-h-[100px] mt-1"
                />
              </div>
              <div>
                <Label htmlFor="userInspiration" className="text-bizzwiz-text-alt text-sm font-medium flex items-center">
                  <Lightbulb size={18} className="mr-2 text-bizzwiz-accent opacity-70" />
                  Y a-t-il des projets, idées ou personnes qui vous inspirent pour cela ? (Optionnel)
                </Label>
                <Textarea
                  id="userInspiration"
                  name="userInspiration"
                  value={formData.userInspiration || ''}
                  onChange={handleChange}
                  placeholder="Ex: J'admire l'approche de [entreprise X], ou je suis inspiré par [personne Y]..."
                  className="form-textarea min-h-[80px] mt-1"
                />
              </div>
              <div>
                <Label htmlFor="userConcerns" className="text-bizzwiz-text-alt text-sm font-medium flex items-center">
                  <ShieldAlert size={18} className="mr-2 text-bizzwiz-accent opacity-70" />
                  Avez-vous des craintes ou des appréhensions spécifiques concernant ce projet ? (Optionnel)
                </Label>
                <Textarea
                  id="userConcerns"
                  name="userConcerns"
                  value={formData.userConcerns || ''}
                  onChange={handleChange}
                  placeholder="Ex: Peur de ne pas avoir les compétences techniques, inquiétude sur le budget, difficulté à atteindre la cible..."
                  className="form-textarea min-h-[80px] mt-1"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-between">
              <StepButton onClick={prevStep} variant="secondary">Précédent</StepButton>
              <StepButton onClick={nextStep} disabled={!isFormComplete}>Suivant</StepButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepUserMotivation;