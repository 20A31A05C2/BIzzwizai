import React from 'react';
import { useFormContext } from '@/contexts/FormContext';
import StepButton from '@/components/multiStepForm/StepButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Award } from 'lucide-react';
import TopHeaderBar from '../TopHeaderBar';
import LevelHeader from '../LevelHeader';
import ProgressBar from '../ProgressBar';
import ChatMessage from '../ChatMessage';

const StepMission = ({ onSubmit }) => {
  const { formData, updateFormData, prevStep } = useFormContext();

  const handleChange = (e) => {
    updateFormData({ [e.target.name]: e.target.value });
  };

  const isFormComplete = formData.missionPart1.trim() && formData.missionPart2.trim() && formData.missionPart3.trim();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-montserrat">
      {/* Top Header Bar */}
      <TopHeaderBar />

      {/* Level Header */}
      <LevelHeader />

      {/* Progress Bar */}
      <div className="px-4 sm:px-6 md:px-8 mb-8 sm:mb-10 w-full">
        <ProgressBar currentStep={11} totalSteps={11} />
      </div>

      {/* Main Content Container with White Glassmorphism */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 md:px-8">
        <div className="rounded-3xl bg-white/10 backdrop-blur-md border border-white/30 p-4 sm:p-6 md:p-8 max-w-lg sm:max-w-xl md:max-w-2xl w-full text-center shadow-[0_0_40px_rgba(168,85,247,0.35)]">
          <ChatMessage message="Votre Mission en une Phrase. Résumez l'essence de votre projet." />
          
          <div className="space-y-6 text-left">
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-2 sm:space-y-0">
                <Label htmlFor="missionPart1" className="text-bizzwiz-text-alt text-lg whitespace-nowrap shrink-0">Je veux aider</Label>
                <Input
                  id="missionPart1"
                  name="missionPart1"
                  value={formData.missionPart1}
                  onChange={handleChange}
                  placeholder="[mon audience cible]"
                  className="form-input text-lg flex-grow"
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-2 sm:space-y-0">
                <Label htmlFor="missionPart2" className="text-bizzwiz-text-alt text-lg whitespace-nowrap shrink-0">à</Label>
                <Input
                  id="missionPart2"
                  name="missionPart2"
                  value={formData.missionPart2}
                  onChange={handleChange}
                  placeholder="[résoudre leur problème / atteindre leur objectif]"
                  className="form-input text-lg flex-grow"
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-2 sm:space-y-0">
                <Label htmlFor="missionPart3" className="text-bizzwiz-text-alt text-lg whitespace-nowrap shrink-0">grâce à</Label>
                <Input
                  id="missionPart3"
                  name="missionPart3"
                  value={formData.missionPart3}
                  onChange={handleChange}
                  placeholder="[ma solution unique]"
                  className="form-input text-lg flex-grow"
                />
              </div>
            </div>
            <p className="text-sm text-bizzwiz-text-alt/70 text-center pt-3">Ex: Je veux aider les freelances créatifs à trouver plus de clients grâce à une plateforme de mise en relation intelligente.</p>

            <div className="mt-6 flex justify-between">
              <StepButton onClick={prevStep} variant="secondary">Précédent</StepButton>
              <StepButton onClick={onSubmit} disabled={!isFormComplete}>Soumettre le Projet ✨</StepButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepMission;