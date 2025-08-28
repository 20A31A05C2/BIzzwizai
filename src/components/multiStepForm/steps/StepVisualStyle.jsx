import React from 'react';
import { useFormContext } from '@/contexts/FormContext';
import StepButton from '@/components/multiStepForm/StepButton';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Palette, Zap, Droplet, Gem, ShieldHalf } from 'lucide-react';
import ChatMessage from '../ChatMessage'; // Added for consistency
import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react'; // Added for selection indicator

const visualStyles = [
  { id: 'classic', label: 'classic', icon: <ShieldHalf size={24} className="mb-2" /> },
  { id: 'futuristic', label: 'futuristic', icon: <Zap size={24} className="mb-2" /> },
  { id: 'colorful', label: 'colorful', icon: <Droplet size={24} className="mb-2" /> },
  { id: 'minimalist', label: 'minimalist', icon: <Palette size={24} className="mb-2" /> },
  { id: 'premium', label: 'premium', icon: <Gem size={24} className="mb-2" /> },
];

const StepVisualStyle = () => {
  const { formData, updateFormData, nextStep, prevStep } = useFormContext();
  const { t } = useTranslation();

  const handleSelect = (styleId) => {
    updateFormData({ visualStyle: styleId });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow">
        <ChatMessage message={t('stepVisualStyle.chatMessage')} /> {/* Replaced traditional heading with ChatMessage for consistency */}
        {/* <div className="text-center mb-10">
          <Palette className="w-12 h-12 text-bizzwiz-accent mx-auto mb-4 opacity-80" />
          <h2 className="text-2xl font-bold text-gradient-bizzwiz">Style Visuel Préféré</h2>
          <p className="text-bizzwiz-text-alt">Quelle ambiance souhaitez-vous pour votre projet ?</p>
        </div> */}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
          {visualStyles.map((style) => (
            <Button
              key={style.id}
              onClick={() => handleSelect(style.id)}
              variant="outline"
              className={cn(
                "choice-button h-auto py-5 flex flex-col items-center justify-center text-base text-bizzwiz-text-alt hover:text-bizzwiz-text-main group",
                formData.visualStyle === style.id && "selected bg-bizzwiz-accent/10 border-bizzwiz-accent text-bizzwiz-text-main"
              )}
              aria-pressed={formData.visualStyle === style.id}
              aria-label={t(`stepVisualStyle.${style.label}`)}
            >
              <span className={cn(formData.visualStyle === style.id ? "text-bizzwiz-text-main" : "text-bizzwiz-accent opacity-70 group-hover:opacity-100 group-hover:text-white transition-opacity")}>
                {style.icon}
                {formData.visualStyle === style.id && <Check size={16} className="ml-2 text-bizzwiz-text-main" />}
              </span>
              <span>{t(`stepVisualStyle.${style.label}`)}</span>
            </Button>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-6 flex justify-between">
        <StepButton onClick={prevStep} variant="secondary">{t('stepVisualStyle.prevButton')}</StepButton>
        <StepButton onClick={nextStep} disabled={!formData.visualStyle}>{t('stepVisualStyle.nextButton')}</StepButton>
      </div>
    </div>
  );
};

export default StepVisualStyle;