import React, { useEffect } from 'react';
import MultiStepForm from '@/components/multiStepForm/MultiStepForm';
import { useFormContext } from '@/contexts/FormContext';
import { toast } from '@/components/ui/use-toast';
import { useTranslation } from 'react-i18next';

const MultiStepFormView = ({ mode = 'register' }) => {
  const { resetForm } = useFormContext();
  const { t } = useTranslation();
  const isInitialized = React.useRef(false);

  useEffect(() => {
    if (!isInitialized.current) {
      resetForm(mode);
      isInitialized.current = true;
    }
  }, [mode, resetForm]);

  const handleFormSubmit = (formData) => {
    toast({
      title: t('multiStepFormView.successTitle'),
      description: t('multiStepFormView.successDescription'),
      duration: 8000,
    });
    resetForm(mode);
  };

  return (
    <div className="w-full max-w-4xl p-4 sm:p-6 md:p-8" role="region" aria-label={t('multiStepFormView.ariaLabel')}>
      <MultiStepForm onSubmit={handleFormSubmit} mode={mode} />
    </div>
  );
};

export default MultiStepFormView;