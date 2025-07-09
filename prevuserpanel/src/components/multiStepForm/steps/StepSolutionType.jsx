import React from 'react';
import { useFormContext } from '@/contexts/FormContext';
import StepButton from '@/components/multiStepForm/StepButton';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Laptop, Smartphone, Rocket, Brain, FileCode } from 'lucide-react';

const solutionTypes = [
  { id: 'webApp', label: 'Web App', icon: <Laptop size={24} className="mb-2" /> },
  { id: 'mobileApp', label: 'Mobile App', icon: <Smartphone size={24} className="mb-2" /> },
  { id: 'landingPage', label: 'Landing Page', icon: <Rocket size={24} className="mb-2" /> },
  { id: 'aiTool', label: 'Outil IA', icon: <Brain size={24} className="mb-2" /> },
  { id: 'other', label: 'Autre', icon: <FileCode size={24} className="mb-2" /> },
];

const StepSolutionType = () => {
  const { formData, updateFormData, nextStep, prevStep } = useFormContext();

  const handleSelect = (typeId) => {
    updateFormData({ solutionType: typeId });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow">
        <div className="text-center mb-10">
          <Laptop className="w-12 h-12 text-bizzwiz-accent mx-auto mb-4 opacity-80" />
          <h2 className="text-2xl font-bold text-gradient-bizzwiz">Type de Solution</h2>
          <p className="text-bizzwiz-text-alt">Quelle forme prendra votre projet ?</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {solutionTypes.map((type) => (
            <Button
              key={type.id}
              onClick={() => handleSelect(type.id)}
              variant="outline"
              className={cn(
                "choice-button h-auto py-5 flex flex-col items-center justify-center text-base text-bizzwiz-text-alt hover:text-bizzwiz-text-main group",
                formData.solutionType === type.id && "selected text-bizzwiz-text-main"
              )}
            >
              <span className={cn(formData.solutionType === type.id ? "text-bizzwiz-text-main" : "text-bizzwiz-accent opacity-70 group-hover:opacity-100 transition-opacity")}>{type.icon}</span>
              <span>{type.label}</span>
            </Button>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-6 flex justify-between">
        <StepButton onClick={prevStep} variant="secondary">Précédent</StepButton>
        <StepButton onClick={nextStep} disabled={!formData.solutionType}>Suivant</StepButton>
      </div>
    </div>
  );
};

export default StepSolutionType;