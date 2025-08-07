import React from 'react';
import { useFormContext } from '@/contexts/FormContext';
import StepButton from '@/components/multiStepForm/StepButton';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ListChecks, UserPlus, ShoppingCart, MessageSquare, BarChart2, Shield, Settings, Search } from 'lucide-react';
import TopHeaderBar from '../TopHeaderBar';
import LevelHeader from '../LevelHeader';
import ProgressBar from '../ProgressBar';
import ChatMessage from '../ChatMessage';

const featuresList = [
  { id: 'auth', label: 'Authentification Utilisateur', icon: <UserPlus size={20} className="mr-3 text-bizzwiz-accent opacity-70" /> },
  { id: 'payment', label: 'Système de Paiement', icon: <ShoppingCart size={20} className="mr-3 text-bizzwiz-accent opacity-70" /> },
  { id: 'chat', label: 'Messagerie / Chat', icon: <MessageSquare size={20} className="mr-3 text-bizzwiz-accent opacity-70" /> },
  { id: 'dashboard', label: 'Tableau de Bord Analytique', icon: <BarChart2 size={20} className="mr-3 text-bizzwiz-accent opacity-70" /> },
  { id: 'admin', label: 'Panneau Administrateur', icon: <Shield size={20} className="mr-3 text-bizzwiz-accent opacity-70" /> },
  { id: 'search', label: 'Recherche Avancée', icon: <Search size={20} className="mr-3 text-bizzwiz-accent opacity-70" /> },
  { id: 'notifications', label: 'Notifications Push/Email', icon: <Settings size={20} className="mr-3 text-bizzwiz-accent opacity-70" /> },
];

const StepFeatures = () => {
  const { formData, updateFormData, nextStep, prevStep } = useFormContext();

  const handleCheckboxChange = (featureId) => {
    const currentFeatures = formData.features || [];
    let updatedFeatures;
    if (currentFeatures.includes(featureId)) {
      updatedFeatures = currentFeatures.filter(id => id !== featureId);
    } else {
      updatedFeatures = [...currentFeatures, featureId];
    }
    updateFormData({ features: updatedFeatures });
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-montserrat">
      {/* Top Header Bar */}
      <TopHeaderBar />

      {/* Level Header */}
      <LevelHeader />

      {/* Progress Bar */}
      <div className="px-4 sm:px-6 md:px-8 mb-8 sm:mb-10 w-full">
        <ProgressBar currentStep={7} totalSteps={11} />
      </div>

      {/* Main Content Container with White Glassmorphism */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 md:px-8">
        <div className="rounded-3xl bg-white/10 backdrop-blur-md border border-white/30 p-4 sm:p-6 md:p-8 max-w-lg sm:max-w-xl md:max-w-2xl w-full text-center shadow-[0_0_40px_rgba(168,85,247,0.35)]">
          <ChatMessage message="Fonctionnalités Clés. Quelles sont les capacités essentielles de votre projet ?" />
          
          <div className="space-y-6 text-left">
            <div className="space-y-3.5 max-h-[280px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-bizzwiz-accent/50 scrollbar-track-bizzwiz-card/50">
              {featuresList.map((feature) => (
                <div
                  key={feature.id}
                  className="flex items-center space-x-3 p-3.5 checkbox-container cursor-pointer group"
                  onClick={() => handleCheckboxChange(feature.id)}
                >
                  <Checkbox
                    id={feature.id}
                    checked={formData.features.includes(feature.id)}
                    onCheckedChange={() => handleCheckboxChange(feature.id)}
                  />
                  <div className="flex items-center">
                    {feature.icon}
                    <Label htmlFor={feature.id} className="text-bizzwiz-text-alt text-base cursor-pointer group-hover:text-bizzwiz-text-main transition-colors">
                      {feature.label}
                    </Label>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-between">
              <StepButton onClick={prevStep} variant="secondary">Précédent</StepButton>
              <StepButton onClick={nextStep} disabled={formData.features.length === 0}>Suivant</StepButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepFeatures;