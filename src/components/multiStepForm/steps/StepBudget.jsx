import React from 'react';
import { useFormContext } from '@/contexts/FormContext';
import StepButton from '@/components/multiStepForm/StepButton';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import ChatMessage from '../ChatMessage';
import { CreditCard, TrendingUp, DollarSign, PiggyBank } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react'; // Added for selection indicator

const budgetOptions = [
  { id: 'lessThan2k', label: 'lessThan2k', icon: <PiggyBank size={24} className="mb-2" /> },
  { id: '2kTo5k', label: '2kTo5k', icon: <DollarSign size={24} className="mb-2" /> },
  { id: '5kTo10k', label: '5kTo10k', icon: <CreditCard size={24} className="mb-2" /> },
  { id: 'moreThan10k', label: 'moreThan10k', icon: <TrendingUp size={24} className="mb-2" /> },
];

const StepBudget = () => {
  const { formData, updateFormData, nextStep, prevStep } = useFormContext();
  const { t } = useTranslation();

  const handleSelect = (budgetId) => {
    updateFormData({ budget: budgetId });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow">
        <ChatMessage message={t('stepBudget.chatMessage')} />
        {/* <div className="text-center mb-10">
          <CreditCard className="w-12 h-12 text-bizzwiz-accent mx-auto mb-4 opacity-80" />
          <h2 className="text-2xl font-bold text-gradient-bizzwiz">Budget Estimé</h2>
          <p className="text-bizzwiz-text-alt">Quelle est votre fourchette budgétaire pour ce projet ?</p>
        </div> */}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
          {budgetOptions.map((option) => (
            <Button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              variant="outline"
              className={cn(
                "choice-button h-auto py-5 flex flex-col items-center justify-center text-base text-bizzwiz-text-alt hover:text-bizzwiz-text-main group",
                formData.budget === option.id && "selected bg-bizzwiz-accent/10 border-bizzwiz-accent text-bizzwiz-text-main"
              )}
              aria-pressed={formData.budget === option.id}
              aria-label={t(`stepBudget.${option.label}`)}
            >
              <span className={cn(formData.budget === option.id ? "text-bizzwiz-text-main" : "text-bizzwiz-accent opacity-70 group-hover:opacity-100 group-hover:text-white transition-opacity")}>
                {option.icon}
                {formData.budget === option.id && <Check size={16} className="ml-2 text-bizzwiz-text-main" />}
              </span>
              <span>{t(`stepBudget.${option.label}`)}</span>
            </Button>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-6 flex justify-between">
        <StepButton onClick={prevStep} variant="secondary">{t('stepBudget.prevButton')}</StepButton>
        <StepButton onClick={nextStep} disabled={!formData.budget}>{t('stepBudget.nextButton')}</StepButton>
      </div>
    </div>
  );
};

export default StepBudget;