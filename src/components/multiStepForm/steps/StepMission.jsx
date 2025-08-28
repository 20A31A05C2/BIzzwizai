import React from 'react';
import { useFormContext } from '@/contexts/FormContext';
import StepButton from '@/components/multiStepForm/StepButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Award } from 'lucide-react';
import ChatMessage from '../ChatMessage';
import { useTranslation } from 'react-i18next';

const StepMission = ({ onSubmit }) => {
  const { formData, updateFormData, prevStep } = useFormContext();
  const { t } = useTranslation();

  const handleChange = (e) => {
    updateFormData({ [e.target.name]: e.target.value });
  };

  const isFormComplete = formData.missionPart1.trim() && formData.missionPart2.trim() && formData.missionPart3.trim();

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow space-y-6">
        <ChatMessage message={t('stepMission.chatMessage')} />
        
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-2 sm:space-y-0">
            <Label htmlFor="missionPart1" className="text-bizzwiz-text-alt text-lg whitespace-nowrap shrink-0">{t('stepMission.labelPart1')}</Label>
            <Input
              id="missionPart1"
              name="missionPart1"
              value={formData.missionPart1 || ''}
              onChange={handleChange}
              placeholder={t('stepMission.placeholderPart1')}
              className="form-input text-lg flex-grow"
              aria-label={t('stepMission.ariaLabelPart1')}
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-2 sm:space-y-0">
            <Label htmlFor="missionPart2" className="text-bizzwiz-text-alt text-lg whitespace-nowrap shrink-0">{t('stepMission.labelPart2')}</Label>
            <Input
              id="missionPart2"
              name="missionPart2"
              value={formData.missionPart2 || ''}
              onChange={handleChange}
              placeholder={t('stepMission.placeholderPart2')}
              className="form-input text-lg flex-grow"
              aria-label={t('stepMission.ariaLabelPart2')}
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-2 sm:space-y-0">
            <Label htmlFor="missionPart3" className="text-bizzwiz-text-alt text-lg whitespace-nowrap shrink-0">{t('stepMission.labelPart3')}</Label>
            <Input
              id="missionPart3"
              name="missionPart3"
              value={formData.missionPart3 || ''}
              onChange={handleChange}
              placeholder={t('stepMission.placeholderPart3')}
              className="form-input text-lg flex-grow"
              aria-label={t('stepMission.ariaLabelPart3')}
            />
          </div>
        </div>
        <p className="text-sm text-bizzwiz-text-alt/70 text-center pt-3">{t('stepMission.exampleText')}</p>
      </div>

      <div className="mt-auto pt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 sm:justify-between">
        <StepButton onClick={prevStep} variant="secondary">{t('stepMission.prevButton')}</StepButton>
        <StepButton onClick={onSubmit} disabled={!isFormComplete}>{t('stepMission.submitButton')}</StepButton>
      </div>
    </div>
  );
};

export default StepMission;