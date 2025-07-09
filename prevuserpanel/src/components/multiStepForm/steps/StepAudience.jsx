import React from 'react';
import { useFormContext } from '@/contexts/FormContext';
import StepButton from '@/components/multiStepForm/StepButton';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Users, Briefcase, Building, Target } from 'lucide-react';

const audienceTypes = [
  { id: 'b2c', label: 'B2C (Grand Public)', icon: <Users size={24} className="mb-2" /> },
  { id: 'b2b', label: 'B2B (Entreprises)', icon: <Briefcase size={24} className="mb-2" /> },
  { id: 'internal', label: 'Interne (Équipe/Organisation)', icon: <Building size={24} className="mb-2" /> },
  { id: 'niche', label: 'Niche Spécifique', icon: <Target size={24} className="mb-2" /> },
];

const StepAudience = () => {
  const { formData, updateFormData, nextStep, prevStep } = useFormContext();

  const handleSelect = (typeId) => {
    updateFormData({ audience: typeId });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow">
        <div className="text-center mb-10">
          <Users className="w-12 h-12 text-bizzwiz-accent mx-auto mb-4 opacity-80" />
          <h2 className="text-2xl font-bold text-gradient-bizzwiz">Votre Audience Cible</h2>
          <p className="text-bizzwiz-text-alt">À qui s'adresse principalement votre solution ?</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {audienceTypes.map((type) => (
            <Button
              key={type.id}
              onClick={() => handleSelect(type.id)}
              variant="outline"
              className={cn(
                "choice-button h-auto py-5 flex flex-col items-center justify-center text-base text-bizzwiz-text-alt hover:text-bizzwiz-text-main group",
                formData.audience === type.id && "selected text-bizzwiz-text-main"
              )}
            >
              <span className={cn(formData.audience === type.id ? "text-bizzwiz-text-main" : "text-bizzwiz-accent opacity-70 group-hover:opacity-100 transition-opacity")}>{type.icon}</span>
              <span>{type.label}</span>
            </Button>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-6 flex justify-between">
        <StepButton onClick={prevStep} variant="secondary">Précédent</StepButton>
        <StepButton onClick={nextStep} disabled={!formData.audience}>Suivant</StepButton>
      </div>
    </div>
  );
};

export default StepAudience;