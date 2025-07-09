import React from 'react';
import { useFormContext } from '@/contexts/FormContext';
import StepButton from '@/components/multiStepForm/StepButton';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Clock, Zap, CalendarDays, Coffee } from 'lucide-react';

const timingOptions = [
  { id: 'urgent', label: 'Urgent ( ASAP )', icon: <Zap size={24} className="mb-2" /> },
  { id: 'fast', label: 'Rapide ( < 3 mois )', icon: <Clock size={24} className="mb-2" /> },
  { id: 'standard', label: 'Standard ( 3-6 mois )', icon: <CalendarDays size={24} className="mb-2" /> },
  { id: 'flexible', label: 'Flexible ( +6 mois )', icon: <Coffee size={24} className="mb-2" /> },
];

const StepTiming = () => {
  const { formData, updateFormData, nextStep, prevStep } = useFormContext();

  const handleSelect = (timingId) => {
    updateFormData({ timing: timingId });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow">
        <div className="text-center mb-10">
          <Clock className="w-12 h-12 text-bizzwiz-accent mx-auto mb-4 opacity-80" />
          <h2 className="text-2xl font-bold text-gradient-bizzwiz">Timing / Urgence</h2>
          <p className="text-bizzwiz-text-alt">Quel est votre délai idéal pour ce projet ?</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {timingOptions.map((option) => (
            <Button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              variant="outline"
              className={cn(
                "choice-button h-auto py-5 flex flex-col items-center justify-center text-base text-bizzwiz-text-alt hover:text-bizzwiz-text-main group",
                formData.timing === option.id && "selected text-bizzwiz-text-main"
              )}
            >
             <span className={cn(formData.timing === option.id ? "text-bizzwiz-text-main" : "text-bizzwiz-accent opacity-70 group-hover:opacity-100 transition-opacity")}>{option.icon}</span>
              <span>{option.label}</span>
            </Button>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-6 flex justify-between">
        <StepButton onClick={prevStep} variant="secondary">Précédent</StepButton>
        <StepButton onClick={nextStep} disabled={!formData.timing}>Suivant</StepButton>
      </div>
    </div>
  );
};

export default StepTiming;