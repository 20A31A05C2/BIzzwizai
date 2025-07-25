import React from 'react';
import { useFormContext } from '@/contexts/FormContext';
import StepButton from '@/components/multiStepForm/StepButton';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ListChecks, UserPlus, ShoppingCart, MessageSquare, BarChart2, Shield, Settings, Search } from 'lucide-react';

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
    <div className="flex flex-col h-full">
      <div className="flex-grow">
        <div className="text-center mb-8">
          <ListChecks className="w-12 h-12 text-bizzwiz-accent mx-auto mb-4 opacity-80" />
          <h2 className="text-2xl font-bold text-gradient-bizzwiz">Fonctionnalités Clés</h2>
          <p className="text-bizzwiz-text-alt">Quelles sont les capacités essentielles de votre projet ?</p>
        </div>
        
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
      </div>

      <div className="mt-auto pt-6 flex justify-between">
        <StepButton onClick={prevStep} variant="secondary">Précédent</StepButton>
        <StepButton onClick={nextStep} disabled={formData.features.length === 0}>Suivant</StepButton>
      </div>
    </div>
  );
};

export default StepFeatures;