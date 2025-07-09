import React from 'react';
import { useFormContext } from '@/contexts/FormContext';
import StepButton from '@/components/multiStepForm/StepButton';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Palette, Zap, Droplet, Gem, ShieldHalf } from 'lucide-react';

const visualStyles = [
  { id: 'classic', label: 'Classique', icon: <ShieldHalf size={24} className="mb-2" /> },
  { id: 'futuristic', label: 'Futuriste', icon: <Zap size={24} className="mb-2" /> },
  { id: 'colorful', label: 'Coloré', icon: <Droplet size={24} className="mb-2" /> },
  { id: 'minimalist', label: 'Minimaliste', icon: <Palette size={24} className="mb-2" /> }, 
  { id: 'premium', label: 'Premium', icon: <Gem size={24} className="mb-2" /> },
];

const StepVisualStyle = () => {
  const { formData, updateFormData, nextStep, prevStep } = useFormContext();

  const handleSelect = (styleId) => {
    updateFormData({ visualStyle: styleId });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow">
        <div className="text-center mb-10">
          <Palette className="w-12 h-12 text-bizzwiz-accent mx-auto mb-4 opacity-80" />
          <h2 className="text-2xl font-bold text-gradient-bizzwiz">Style Visuel Préféré</h2>
          <p className="text-bizzwiz-text-alt">Quelle ambiance souhaitez-vous pour votre projet ?</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {visualStyles.map((style) => (
            <Button
              key={style.id}
              onClick={() => handleSelect(style.id)}
              variant="outline"
              className={cn(
                "choice-button h-auto py-5 flex flex-col items-center justify-center text-base text-bizzwiz-text-alt hover:text-bizzwiz-text-main group",
                formData.visualStyle === style.id && "selected text-bizzwiz-text-main"
              )}
            >
              <span className={cn(formData.visualStyle === style.id ? "text-bizzwiz-text-main" : "text-bizzwiz-accent opacity-70 group-hover:opacity-100 transition-opacity")}>{style.icon}</span>
              <span>{style.label}</span>
            </Button>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-6 flex justify-between">
        <StepButton onClick={prevStep} variant="secondary">Précédent</StepButton>
        <StepButton onClick={nextStep} disabled={!formData.visualStyle}>Suivant</StepButton>
      </div>
    </div>
  );
};

export default StepVisualStyle;