import React from 'react';
import { useFormContext } from '@/contexts/FormContext';
import StepButton from '@/components/multiStepForm/StepButton';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileText } from 'lucide-react';
import TopHeaderBar from '../TopHeaderBar';
import LevelHeader from '../LevelHeader';
import ProgressBar from '../ProgressBar';
import ChatMessage from '../ChatMessage';

const StepDescribeProject = () => {
  const { formData, updateFormData, nextStep, prevStep } = useFormContext();

  const handleChange = (e) => {
    updateFormData({ [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-montserrat">
      {/* Top Header Bar */}
      <TopHeaderBar />

      {/* Level Header */}
      <LevelHeader />

      {/* Progress Bar */}
      <div className="px-4 sm:px-6 md:px-8 mb-8 sm:mb-10 w-full">
        <ProgressBar currentStep={4} totalSteps={11} />
      </div>

      {/* Main Content Container with White Glassmorphism */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 md:px-8">
        <div className="rounded-3xl bg-white/10 backdrop-blur-md border border-white/30 p-4 sm:p-6 md:p-8 max-w-lg sm:max-w-xl md:max-w-2xl w-full text-center shadow-[0_0_40px_rgba(168,85,247,0.35)]">
          <ChatMessage message="Décrivez votre Projet. Plus c'est clair, mieux c'est pour notre IA !" />
          
          <div className="space-y-6 text-left">
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="projectName" className="text-bizzwiz-text-alt text-sm font-medium">
                  Nom du projet :
                </Label>
                <Input
                  id="projectName"
                  name="projectName"
                  value={formData.projectName || ''}
                  onChange={handleChange}
                  placeholder="Ex: Plateforme de Musique Live"
                  className="form-input text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="projectDescription" className="text-bizzwiz-text-alt text-sm font-medium">
                  Votre idée, vos mots :
                </Label>
                <Textarea
                  id="projectDescription"
                  name="projectDescription"
                  value={formData.projectDescription || ''}
                  onChange={handleChange}
                  placeholder="Ex: Une plateforme pour connecter les musiciens indépendants avec des petites salles de concert locales, avec un système de matching basé sur le style musical et la disponibilité..."
                  className="form-textarea min-h-[200px] text-base"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-between">
              <StepButton onClick={prevStep} variant="secondary">Précédent</StepButton>
              <StepButton 
                onClick={nextStep} 
                disabled={!formData.projectName?.trim() || !formData.projectDescription?.trim()}
              >
                Suivant
              </StepButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepDescribeProject;