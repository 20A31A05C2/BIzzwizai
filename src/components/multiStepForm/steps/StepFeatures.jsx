import React from 'react';
import { useFormContext } from '@/contexts/FormContext';
import StepButton from '@/components/multiStepForm/StepButton';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import ChatMessage from '../ChatMessage';
import { ListChecks, UserPlus, ShoppingCart, MessageSquare, BarChart2, Shield, Settings, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils'; // Ensured import is present

const featuresList = [
  { id: 'auth', label: 'auth', icon: <UserPlus size={20} className="mr-3 text-bizzwiz-accent opacity-70" /> },
  { id: 'payment', label: 'payment', icon: <ShoppingCart size={20} className="mr-3 text-bizzwiz-accent opacity-70" /> },
  { id: 'chat', label: 'chat', icon: <MessageSquare size={20} className="mr-3 text-bizzwiz-accent opacity-70" /> },
  { id: 'dashboard', label: 'dashboard', icon: <BarChart2 size={20} className="mr-3 text-bizzwiz-accent opacity-70" /> },
  { id: 'admin', label: 'admin', icon: <Shield size={20} className="mr-3 text-bizzwiz-accent opacity-70" /> },
  { id: 'search', label: 'search', icon: <Search size={20} className="mr-3 text-bizzwiz-accent opacity-70" /> },
  { id: 'notifications', label: 'notifications', icon: <Settings size={20} className="mr-3 text-bizzwiz-accent opacity-70" /> },
];

const StepFeatures = () => {
  const { formData, updateFormData, nextStep, prevStep } = useFormContext();
  const { t } = useTranslation();

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
        <ChatMessage message={t('stepFeatures.chatMessage')} />
        
        <div className="space-y-3.5 max-h-[280px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-bizzwiz-accent/70 scrollbar-track-bizzwiz-card/30">
          {featuresList.map((feature) => (
            <div
              key={feature.id}
              className={cn(
                "flex items-center space-x-3 p-3.5 checkbox-container cursor-pointer group",
                formData.features?.includes(feature.id) && "bg-bizzwiz-card/20"
              )}
              onClick={() => handleCheckboxChange(feature.id)}
            >
              <Checkbox
                id={feature.id}
                checked={formData.features?.includes(feature.id) || false}
                onCheckedChange={() => handleCheckboxChange(feature.id)}
                aria-label={t(`stepFeatures.${feature.label}`)}
              />
              <div className="flex items-center">
                {feature.icon}
                <Label htmlFor={feature.id} className="text-bizzwiz-text-alt text-base cursor-pointer group-hover:text-bizzwiz-text-main transition-colors">
                  {t(`stepFeatures.${feature.label}`)}
                </Label>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-6 flex justify-between">
        <StepButton onClick={prevStep} variant="secondary">{t('stepFeatures.prevButton')}</StepButton>
        <StepButton onClick={nextStep} disabled={formData.features?.length === 0}>{t('stepFeatures.nextButton')}</StepButton>
      </div>
    </div>
  );
};

export default StepFeatures;