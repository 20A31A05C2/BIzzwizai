import React from 'react';
import { useFormContext } from '@/contexts/FormContext';
import StepButton from '@/components/multiStepForm/StepButton';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import ChatMessage from '../ChatMessage';
import { Clock, Zap, CalendarDays, Coffee } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react'; // Added for selection indicator

const timingOptions = [
  { id: 'urgent', label: 'urgent', icon: <Zap size={24} className="mb-2" /> },
  { id: 'fast', label: 'fast', icon: <Clock size={24} className="mb-2" /> },
  { id: 'standard', label: 'standard', icon: <CalendarDays size={24} className="mb-2" /> },
  { id: 'flexible', label: 'flexible', icon: <Coffee size={24} className="mb-2" /> },
];

const StepTiming = () => {
  const { formData, updateFormData, nextStep, prevStep } = useFormContext();
  const { t } = useTranslation();

  const handleSelect = (timingId) => {
    updateFormData({ timing: timingId });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow">
        <ChatMessage message={t('stepTiming.chatMessage')} />
        {/* <div className="text-center mb-10">
          <Clock className="w-12 h-12 text-bizzwiz-accent mx-auto mb-4 opacity-80" />
          <h2 className="text-2xl font-bold text-gradient-bizzwiz">Timing / Urgence</h2>
          <p className="text-bizzwiz-text-alt">Quel est votre délai idéal pour ce projet ?</p>
        </div> */}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
          {timingOptions.map((option) => (
            <Button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              variant="outline"
              className={cn(
                "choice-button h-auto py-5 flex flex-col items-center justify-center text-base text-bizzwiz-text-alt hover:text-bizzwiz-text-main group",
                formData.timing === option.id && "selected bg-bizzwiz-accent/10 border-bizzwiz-accent text-bizzwiz-text-main"
              )}
              aria-pressed={formData.timing === option.id}
              aria-label={t(`stepTiming.${option.label}`)}
            >
              <span className={cn(formData.timing === option.id ? "text-bizzwiz-text-main" : "text-bizzwiz-accent opacity-70 group-hover:opacity-100 group-hover:text-white transition-opacity")}>
                {option.icon}
                {formData.timing === option.id && <Check size={16} className="ml-2 text-bizzwiz-text-main" />}
              </span>
              <span>{t(`stepTiming.${option.label}`)}</span>
            </Button>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-6 flex justify-between">
        <StepButton onClick={prevStep} variant="secondary">{t('stepTiming.prevButton')}</StepButton>
        <StepButton onClick={nextStep} disabled={!formData.timing}>{t('stepTiming.nextButton')}</StepButton>
      </div>
    </div>
  );
};

export default StepTiming;