import React from 'react';
import { useFormContext } from '@/contexts/FormContext';
import StepButton from '@/components/multiStepForm/StepButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Award } from 'lucide-react';

const StepMission = ({ onSubmit }) => {
  const { formData, updateFormData, prevStep } = useFormContext();

  const handleChange = (e) => {
    updateFormData({ [e.target.name]: e.target.value });
  };

  const isFormComplete = formData.missionPart1.trim() && formData.missionPart2.trim() && formData.missionPart3.trim();

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow space-y-6">
        <div className="text-center mb-8">
          <Award className="w-12 h-12 text-bizzwiz-accent mx-auto mb-4 opacity-80" />
          <h2 className="text-2xl font-bold text-gradient-bizzwiz">Votre Mission en une Phrase</h2>
          <p className="text-bizzwiz-text-alt">Résumez l'essence de votre projet.</p>
        </div>
        
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-2 sm:space-y-0">
            <Label htmlFor="missionPart1" className="text-bizzwiz-text-alt text-lg whitespace-nowrap shrink-0">Je veux aider</Label>
            <Input
              id="missionPart1"
              name="missionPart1"
              value={formData.missionPart1}
              onChange={handleChange}
              placeholder="[mon audience cible]"
              className="form-input text-lg flex-grow"
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-2 sm:space-y-0">
            <Label htmlFor="missionPart2" className="text-bizzwiz-text-alt text-lg whitespace-nowrap shrink-0">à</Label>
            <Input
              id="missionPart2"
              name="missionPart2"
              value={formData.missionPart2}
              onChange={handleChange}
              placeholder="[résoudre leur problème / atteindre leur objectif]"
              className="form-input text-lg flex-grow"
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-2 sm:space-y-0">
            <Label htmlFor="missionPart3" className="text-bizzwiz-text-alt text-lg whitespace-nowrap shrink-0">grâce à</Label>
            <Input
              id="missionPart3"
              name="missionPart3"
              value={formData.missionPart3}
              onChange={handleChange}
              placeholder="[ma solution unique]"
              className="form-input text-lg flex-grow"
            />
          </div>
        </div>
        <p className="text-sm text-bizzwiz-text-alt/70 text-center pt-3">Ex: Je veux aider les freelances créatifs à trouver plus de clients grâce à une plateforme de mise en relation intelligente.</p>
      </div>

      <div className="mt-auto pt-6 flex justify-between">
        <StepButton onClick={prevStep} variant="secondary">Précédent</StepButton>
        <StepButton onClick={onSubmit} disabled={!isFormComplete}>Soumettre le Projet ✨</StepButton>
      </div>
    </div>
  );
};

export default StepMission;