import React from 'react';
import { useFormContext } from '@/contexts/FormContext';
import StepButton from '@/components/multiStepForm/StepButton';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Users, Briefcase, Building, Target } from 'lucide-react';
import ChatMessage from '../ChatMessage';
import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react'; // Added for selection indicator

const audienceTypes = [
  { id: 'b2c', label: 'b2c', icon: <Users size={24} className="mb-2" /> },
  { id: 'b2b', label: 'b2b', icon: <Briefcase size={24} className="mb-2" /> },
  { id: 'internal', label: 'internal', icon: <Building size={24} className="mb-2" /> },
  { id: 'niche', label: 'niche', icon: <Target size={24} className="mb-2" /> },
];

const StepAudience = () => {
  const { formData, updateFormData, nextStep, prevStep } = useFormContext();
  const { t } = useTranslation();

  const handleSelect = (typeId) => {
    updateFormData({ audience: typeId });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow">
        <ChatMessage message={t('stepAudience.chatMessage')} />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
          {audienceTypes.map((type) => (
            <Button
              key={type.id}
              onClick={() => handleSelect(type.id)}
              variant="outline"
              className={cn(
                "choice-button h-auto py-5 flex flex-col items-center justify-center text-base text-bizzwiz-text-alt hover:text-bizzwiz-text-main group",
                formData.audience === type.id && "selected bg-bizzwiz-accent/10 border-bizzwiz-accent text-bizzwiz-text-main"
              )}
              aria-pressed={formData.audience === type.id}
              aria-label={t(`stepAudience.${type.label}`)}
            >
              <span className={cn(formData.audience === type.id ? "text-bizzwiz-text-main" : "text-bizzwiz-accent opacity-70 group-hover:opacity-100 group-hover:text-white transition-opacity")}>
                {type.icon}
                {formData.audience === type.id && <Check size={16} className="ml-2 text-bizzwiz-text-main" />}
              </span>
              <span>{t(`stepAudience.${type.label}`)}</span>
            </Button>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-6 flex justify-between">
        <StepButton onClick={prevStep} variant="secondary">{t('stepAudience.prevButton')}</StepButton>
        <StepButton onClick={nextStep} disabled={!formData.audience}>{t('stepAudience.nextButton')}</StepButton>
      </div>
    </div>
  );
};

export default StepAudience;