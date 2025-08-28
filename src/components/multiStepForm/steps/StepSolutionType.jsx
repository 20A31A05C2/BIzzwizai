import React from 'react';
import { useFormContext } from '@/contexts/FormContext';
import StepButton from '@/components/multiStepForm/StepButton';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import ChatMessage from '../ChatMessage';
import { Laptop, Smartphone, Rocket, Brain, FileCode } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react'; // Added for selection indicator

const solutionTypes = [
  { id: 'webApp', label: 'webApp', icon: <Laptop size={24} className="mb-2" /> },
  { id: 'mobileApp', label: 'mobileApp', icon: <Smartphone size={24} className="mb-2" /> },
  { id: 'landingPage', label: 'landingPage', icon: <Rocket size={24} className="mb-2" /> },
  { id: 'aiTool', label: 'aiTool', icon: <Brain size={24} className="mb-2" /> },
  { id: 'other', label: 'other', icon: <FileCode size={24} className="mb-2" /> },
];

const StepSolutionType = () => {
  const { formData, updateFormData, nextStep, prevStep } = useFormContext();
  const { t } = useTranslation();

  const handleSelect = (typeId) => {
    updateFormData({ solutionType: typeId });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow">
        <ChatMessage message={t('stepSolutionType.chatMessage')} />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
          {solutionTypes.map((type) => (
            <Button
              key={type.id}
              onClick={() => handleSelect(type.id)}
              variant="outline"
              className={cn(
                "choice-button h-auto py-5 flex flex-col items-center justify-center text-base text-bizzwiz-text-alt hover:text-bizzwiz-text-main group",
                formData.solutionType === type.id && "selected bg-bizzwiz-accent/10 border-bizzwiz-accent text-bizzwiz-text-main"
              )}
              aria-pressed={formData.solutionType === type.id}
              aria-label={t(`stepSolutionType.${type.label}`)}
            >
              <span className={cn(formData.solutionType === type.id ? "text-bizzwiz-text-main" : "text-bizzwiz-accent opacity-70 group-hover:opacity-100 group-hover:text-white transition-opacity")}>
                {type.icon}
                {formData.solutionType === type.id && <Check size={16} className="ml-2 text-bizzwiz-text-main" />}
              </span>
              <span>{t(`stepSolutionType.${type.label}`)}</span>
            </Button>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-6 flex justify-between">
        <StepButton onClick={prevStep} variant="secondary">{t('stepSolutionType.prevButton')}</StepButton>
        <StepButton onClick={nextStep} disabled={!formData.solutionType}>{t('stepSolutionType.nextButton')}</StepButton>
      </div>
    </div>
  );
};

export default StepSolutionType;