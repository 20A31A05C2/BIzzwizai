import React from 'react';
import { useFormContext } from '@/contexts/FormContext';
import StepButton from '@/components/multiStepForm/StepButton';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { FileText } from 'lucide-react';

const StepDescribeProject = () => {
  const { formData, updateFormData, nextStep, prevStep } = useFormContext();

  const handleChange = (e) => {
    updateFormData({ projectDescription: e.target.value });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow space-y-6">
        <div className="text-center mb-8">
          <FileText className="w-12 h-12 text-bizzwiz-accent mx-auto mb-3 opacity-80" />
          <h2 className="text-2xl font-bold text-gradient-bizzwiz">Décrivez votre Projet</h2>
          <p className="text-bizzwiz-text-alt">Plus c'est clair, mieux c'est pour notre IA !</p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="projectDescription" className="text-bizzwiz-text-alt text-sm font-medium">
            Votre idée, vos mots :
          </Label>
          <Textarea
            id="projectDescription"
            value={formData.projectDescription}
            onChange={handleChange}
            placeholder="Ex: Une plateforme pour connecter les musiciens indépendants avec des petites salles de concert locales, avec un système de matching basé sur le style musical et la disponibilité..."
            className="form-textarea min-h-[200px] text-base"
          />
        </div>
      </div>

      <div className="mt-auto pt-6 flex justify-between">
        <StepButton onClick={prevStep} variant="secondary">Précédent</StepButton>
        <StepButton onClick={nextStep} disabled={!formData.projectDescription.trim()}>Suivant</StepButton>
      </div>
    </div>
  );
};

export default StepDescribeProject;