import React from 'react';
import { useFormContext } from '@/contexts/FormContext';
import StepButton from '@/components/multiStepForm/StepButton';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Clock, Zap, CalendarDays, Coffee } from 'lucide-react';
import TopHeaderBar from '../TopHeaderBar';
import LevelHeader from '../LevelHeader';
import ProgressBar from '../ProgressBar';
import ChatMessage from '../ChatMessage';

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
    <div className="min-h-screen bg-black text-white flex flex-col font-montserrat">
      {/* Top Header Bar */}
      <TopHeaderBar />

      {/* Level Header */}
      <LevelHeader />

      {/* Progress Bar */}
      <div className="px-4 sm:px-6 md:px-8 mb-8 sm:mb-10 w-full">
        <ProgressBar currentStep={9} totalSteps={11} />
      </div>

      {/* Main Content Container with White Glassmorphism */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 md:px-8">
        <div className="rounded-3xl bg-white/10 backdrop-blur-md border border-white/30 p-4 sm:p-6 md:p-8 max-w-lg sm:max-w-xl md:max-w-2xl w-full text-center shadow-[0_0_40px_rgba(168,85,247,0.35)]">
          <ChatMessage message="Timing / Urgence. Quel est votre délai idéal pour ce projet ?" />
          
          <div className="space-y-6 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {timingOptions.map((option) => (
                <Button
                  key={option.id}
                  onClick={() => handleSelect(option.id)}
                  variant="outline"
                  className={cn(
                    "choice-button h-auto py-5 flex flex-col items-center justify-center text-base text-bizzwiz-text-alt group",
                    "bg-white/10 backdrop-blur-md border border-white/30 rounded-xl transition-all duration-300",
                    formData.timing === option.id && "selected bg-white/20 text-bizzwiz-text-main",
                    "hover:bg-white/20 hover:border-bizzwiz-accent hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                  )}
                >
                  <span className={cn(
                    formData.timing === option.id ? "text-bizzwiz-text-main" : "text-bizzwiz-accent opacity-70",
                    "group-hover:opacity-100 transition-opacity"
                  )}>{option.icon}</span>
                  <span>{option.label}</span>
                </Button>
              ))}
            </div>

            <div className="mt-6 flex justify-between">
              <StepButton onClick={prevStep} variant="secondary">Précédent</StepButton>
              <StepButton onClick={nextStep} disabled={!formData.timing}>Suivant</StepButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepTiming;