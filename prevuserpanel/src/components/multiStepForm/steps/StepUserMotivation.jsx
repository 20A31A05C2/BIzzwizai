import React from 'react';
import { useFormContext } from '@/contexts/FormContext';
import StepButton from '@/components/multiStepForm/StepButton';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Sparkles, Lightbulb, ShieldAlert } from 'lucide-react';

const StepUserMotivation = () => {
  const { formData, updateFormData, nextStep, prevStep } = useFormContext();

  const handleChange = (e) => {
    updateFormData({ [e.target.name]: e.target.value });
  };
  
  const isFormComplete = formData.userMotivation.trim();

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow space-y-6">
        <div className="text-center mb-8">
          <Sparkles className="w-12 h-12 text-bizzwiz-accent mx-auto mb-3 opacity-80" />
          <h2 className="text-2xl font-bold text-gradient-bizzwiz">Votre Vision & Moteurs</h2>
          <p className="text-bizzwiz-text-alt">Dites-nous ce qui vous anime pour ce projet.</p>
        </div>
        
        <div className="space-y-5">
          <div>
            <Label htmlFor="userMotivation" className="text-bizzwiz-text-alt text-sm font-medium flex items-center">
              <Sparkles size={18} className="mr-2 text-bizzwiz-accent opacity-70" />
              Quelle est votre principale motivation derrière ce projet ?
            </Label>
            <Textarea
              id="userMotivation"
              name="userMotivation"
              value={formData.userMotivation}
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
              value={formData.userInspiration}
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
              value={formData.userConcerns}
              onChange={handleChange}
              placeholder="Ex: Peur de ne pas avoir les compétences techniques, inquiétude sur le budget, difficulté à atteindre la cible..."
              className="form-textarea min-h-[80px] mt-1"
            />
          </div>
        </div>
      </div>

      <div className="mt-auto pt-6 flex justify-between">
        <StepButton onClick={prevStep} variant="secondary">Précédent</StepButton>
        <StepButton onClick={nextStep} disabled={!isFormComplete}>Suivant</StepButton>
      </div>
    </div>
  );
};

export default StepUserMotivation;