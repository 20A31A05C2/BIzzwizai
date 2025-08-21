import React from 'react';
import { useFormContext } from '@/contexts/FormContext';
import StepButton from '@/components/multiStepForm/StepButton';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileText } from 'lucide-react';
import ChatMessage from '../ChatMessage';
import { useTranslation } from 'react-i18next';
import { toast } from '@/components/ui/use-toast';

const StepDescribeProject = () => {
  const { formData, updateFormData, nextStep, prevStep } = useFormContext();
  const { t } = useTranslation();

  const handleChange = (e) => {
    updateFormData({ [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (!formData.projectName?.trim() || !formData.projectDescription?.trim()) {
      toast({
        title: t('stepDescribeProject.error.title'),
        description: t('stepDescribeProject.error.description'),
        variant: 'destructive',
      });
      return;
    }
    nextStep();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow space-y-6">
        <ChatMessage message={t('stepDescribeProject.chatMessage')} />
        
        <div className="space-y-2">
          <Label htmlFor="projectName" className="text-bizzwiz-text-alt text-sm font-medium">
            {t('stepDescribeProject.projectName.label')}
          </Label>
          <Input
            id="projectName"
            name="projectName"
            value={formData.projectName || ''}
            onChange={handleChange}
            placeholder={t('stepDescribeProject.projectName.placeholder')}
            className="form-input text-base"
            aria-required="true"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="projectDescription" className="text-bizzwiz-text-alt text-sm font-medium">
            {t('stepDescribeProject.projectDescription.label')}
          </Label>
          <Textarea
            id="projectDescription"
            name="projectDescription"
            value={formData.projectDescription || ''}
            onChange={handleChange}
            placeholder={t('stepDescribeProject.projectDescription.placeholder')}
            className="form-textarea min-h-[200px] text-base"
            aria-required="true"
          />
        </div>
      </div>

      <div className="mt-auto pt-6 flex justify-between">
        <StepButton onClick={prevStep} variant="secondary">{t('stepDescribeProject.prevButton')}</StepButton>
        <StepButton 
          onClick={handleNext} 
          disabled={!formData.projectName?.trim() || !formData.projectDescription?.trim()}
        >
          {t('stepDescribeProject.nextButton')}
        </StepButton>
      </div>
    </div>
  );
};

export default StepDescribeProject;