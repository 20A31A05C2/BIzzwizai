import React from 'react';
import { useFormContext } from '@/contexts/FormContext';
import StepButton from '@/components/multiStepForm/StepButton';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Sparkles, Lightbulb, ShieldAlert } from 'lucide-react';
import ChatMessage from '../ChatMessage';
import { useTranslation } from 'react-i18next';
import { toast } from '@/components/ui/use-toast';

const StepUserMotivation = () => {
  const { formData, updateFormData, nextStep, prevStep } = useFormContext();
  const { t } = useTranslation();

  const handleChange = (e) => {
    updateFormData({ [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (!formData.userMotivation?.trim()) {
      toast({
        title: t('stepUserMotivation.error.title'),
        description: t('stepUserMotivation.error.description'),
        variant: 'destructive',
      });
      return;
    }
    nextStep();
  };

  const isFormComplete = formData.userMotivation && formData.userMotivation.trim();

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow space-y-6">
        <ChatMessage message={t('stepUserMotivation.chatMessage')} />
        
        <div className="space-y-5">
          <div>
            <Label htmlFor="userMotivation" className="text-bizzwiz-text-alt text-sm font-medium flex items-center">
              <Sparkles size={18} className="mr-2 text-bizzwiz-accent opacity-70" />
              {t('stepUserMotivation.userMotivation.label')}
            </Label>
            <Textarea
              id="userMotivation"
              name="userMotivation"
              value={formData.userMotivation || ''}
              onChange={handleChange}
              placeholder={t('stepUserMotivation.userMotivation.placeholder')}
              className="form-textarea min-h-[100px] mt-1"
              aria-required="true"
            />
          </div>
          <div>
            <Label htmlFor="userInspiration" className="text-bizzwiz-text-alt text-sm font-medium flex items-center">
              <Lightbulb size={18} className="mr-2 text-bizzwiz-accent opacity-70" />
              {t('stepUserMotivation.userInspiration.label')}
            </Label>
            <Textarea
              id="userInspiration"
              name="userInspiration"
              value={formData.userInspiration || ''}
              onChange={handleChange}
              placeholder={t('stepUserMotivation.userInspiration.placeholder')}
              className="form-textarea min-h-[80px] mt-1"
              aria-required="false"
            />
          </div>
          <div>
            <Label htmlFor="userConcerns" className="text-bizzwiz-text-alt text-sm font-medium flex items-center">
              <ShieldAlert size={18} className="mr-2 text-bizzwiz-accent opacity-70" />
              {t('stepUserMotivation.userConcerns.label')}
            </Label>
            <Textarea
              id="userConcerns"
              name="userConcerns"
              value={formData.userConcerns || ''}
              onChange={handleChange}
              placeholder={t('stepUserMotivation.userConcerns.placeholder')}
              className="form-textarea min-h-[80px] mt-1"
              aria-required="false"
            />
          </div>
        </div>
      </div>

      <div className="mt-auto pt-6 flex justify-between">
        <StepButton onClick={prevStep} variant="secondary">{t('stepUserMotivation.prevButton')}</StepButton>
        <StepButton onClick={handleNext} disabled={!isFormComplete}>{t('stepUserMotivation.nextButton')}</StepButton>
      </div>
    </div>
  );
};

export default StepUserMotivation;