import React from 'react';
import { useFormContext } from '@/contexts/FormContext';
import StepButton from '@/components/multiStepForm/StepButton';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CreditCard, TrendingUp, DollarSign, PiggyBank } from 'lucide-react';

const budgetOptions = [
  { id: 'lessThan2k', label: '< 2k€', icon: <PiggyBank size={24} className="mb-2" /> },
  { id: '2kTo5k', label: '2k€ - 5k€', icon: <DollarSign size={24} className="mb-2" /> },
  { id: '5kTo10k', label: '5k€ - 10k€', icon: <CreditCard size={24} className="mb-2" /> },
  { id: 'moreThan10k', label: '10k€ +', icon: <TrendingUp size={24} className="mb-2" /> },
];

const StepBudget = () => {
  const { formData, updateFormData, nextStep, prevStep } = useFormContext();

  const handleSelect = (budgetId) => {
    updateFormData({ budget: budgetId });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow">
        <div className="text-center mb-10">
          <CreditCard className="w-12 h-12 text-bizzwiz-accent mx-auto mb-4 opacity-80" />
          <h2 className="text-2xl font-bold text-gradient-bizzwiz">Budget Estimé</h2>
          <p className="text-bizzwiz-text-alt">Quelle est votre fourchette budgétaire pour ce projet ?</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {budgetOptions.map((option) => (
            <Button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              variant="outline"
              className={cn(
                "choice-button h-auto py-5 flex flex-col items-center justify-center text-base text-bizzwiz-text-alt hover:text-bizzwiz-text-main group",
                formData.budget === option.id && "selected text-bizzwiz-text-main"
              )}
            >
              <span className={cn(formData.budget === option.id ? "text-bizzwiz-text-main" : "text-bizzwiz-accent opacity-70 group-hover:opacity-100 transition-opacity")}>{option.icon}</span>
              <span>{option.label}</span>
            </Button>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-6 flex justify-between">
        <StepButton onClick={prevStep} variant="secondary">Précédent</StepButton>
        <StepButton onClick={nextStep} disabled={!formData.budget}>Suivant</StepButton>
      </div>
    </div>
  );
};

export default StepBudget;