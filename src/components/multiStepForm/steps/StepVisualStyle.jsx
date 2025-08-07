import React from 'react';
import { useFormContext } from '@/contexts/FormContext';
import StepButton from '@/components/multiStepForm/StepButton';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Palette, Zap, Droplet, Gem, ShieldHalf, Sparkles as CosmicSparkles } from 'lucide-react';
import TopHeaderBar from '../TopHeaderBar';
import LevelHeader from '../LevelHeader';
import ProgressBar from '../ProgressBar';
import ChatMessage from '../ChatMessage';

const visualStyles = [
  { id: 'classic', label: 'Classique & Épuré', icon: <ShieldHalf size={24} className="mb-2" /> },
  { id: 'futuristic', label: 'Futuriste & Néon', icon: <Zap size={24} className="mb-2" /> },
  { id: 'colorful', label: 'Vibrant & Coloré', icon: <Droplet size={24} className="mb-2" /> },
  { id: 'minimalist', label: 'Minimaliste & Moderne', icon: <Palette size={24} className="mb-2" /> }, 
  { id: 'premium', label: 'Luxueux & Premium', icon: <Gem size={24} className="mb-2" /> },
  { id: 'cosmic', label: 'Cosmique & Immersif', icon: <CosmicSparkles size={24} className="mb-2" /> },
];

const StepVisualStyle = () => {
  const { formData, updateFormData, nextStep, prevStep } = useFormContext();

  const handleSelect = (styleId) => {
    updateFormData({ visualStyle: styleId });
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-montserrat">
      {/* Top Header Bar */}
      <TopHeaderBar />

      {/* Level Header */}
      <LevelHeader />

      {/* Progress Bar */}
      <div className="px-4 sm:px-6 md:px-8 mb-8 sm:mb-10 w-full">
        <ProgressBar currentStep={8} totalSteps={11} />
      </div>

      {/* Main Content Container with White Glassmorphism */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 md:px-8">
        <div className="rounded-3xl bg-white/10 backdrop-blur-md border border-white/30 p-4 sm:p-6 md:p-8 max-w-lg sm:max-w-xl md:max-w-2xl w-full text-center shadow-[0_0_40px_rgba(168,85,247,0.35)]">
          <ChatMessage message="Style Visuel Préféré. Quelle ambiance souhaitez-vous pour votre projet ?" />
          
          <div className="space-y-6 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {visualStyles.map((style) => (
                <Button
                  key={style.id}
                  onClick={() => handleSelect(style.id)}
                  variant="outline"
                  className={cn(
                    "choice-button h-auto py-5 flex flex-col items-center justify-center text-base text-bizzwiz-text-alt group",
                    "bg-white/10 backdrop-blur-md border border-white/30 rounded-xl transition-all duration-300",
                    formData.visualStyle === style.id && "selected bg-white/20 text-bizzwiz-text-main",
                    "hover:bg-white/20 hover:border-bizzwiz-accent hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                  )}
                >
                  <span className={cn(
                    formData.visualStyle === style.id ? "text-bizzwiz-text-main" : "text-bizzwiz-accent opacity-70",
                    "group-hover:opacity-100 transition-opacity"
                  )}>{style.icon}</span>
                  <span>{style.label}</span>
                </Button>
              ))}
            </div>

            <div className="mt-6 flex justify-between">
              <StepButton onClick={prevStep} variant="secondary">Précédent</StepButton>
              <StepButton onClick={nextStep} disabled={!formData.visualStyle}>Suivant</StepButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepVisualStyle;