import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '@/contexts/FormContext';
import ProgressBar from '@/components/multiStepForm/ProgressBar';
import StepCard from '@/components/multiStepForm/StepCard';
import StepWelcome from '@/components/multiStepForm/steps/StepWelcome';
import StepUserMotivation from '@/components/multiStepForm/steps/StepUserMotivation';
import StepDescribeProject from '@/components/multiStepForm/steps/StepDescribeProject';
import StepSolutionType from '@/components/multiStepForm/steps/StepSolutionType';
import StepAudience from '@/components/multiStepForm/steps/StepAudience';
import StepFeatures from '@/components/multiStepForm/steps/StepFeatures';
import StepVisualStyle from '@/components/multiStepForm/steps/StepVisualStyle';
// import ColorPaletteSelection from '@/components/multiStepForm/steps/ColorPaletteSelection';
import StepTiming from '@/components/multiStepForm/steps/StepTiming';
import StepBudget from '@/components/multiStepForm/steps/StepBudget';
import StepMission from '@/components/multiStepForm/steps/StepMission';
import { toast } from '@/components/ui/use-toast';
import ApiService from '@/apiService';
import { useTranslation } from 'react-i18next';
import LevelHeader from '@/components/multiStepForm/LevelHeader';
import TopHeaderBar from './TopHeaderBar';

const MultiStepForm = ({ onSubmit: onSubmitExternal, mode = 'register' }) => {
  const {
    currentStep,
    totalSteps,
    setCurrentStep,
    setTotalSteps,
    formData,
    setFormData,
    resetForm,
  } = useFormContext();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isReloading, setIsReloading] = useState(false);
  const isInitialized = React.useRef(false);

  useEffect(() => {
    if (!isInitialized.current) {
      resetForm(mode);
      setTotalSteps(mode === 'dashboard' ? 10 : 11);
      isInitialized.current = true;
    }
  }, [mode, resetForm, setTotalSteps]);

  const validateFormData = () => {
    const requiredFields = {
      userMotivation: formData.userMotivation,
      projectName: formData.projectName,
      projectDescription: formData.projectDescription,
      solutionType: formData.solutionType,
      audience: formData.audience,
      features: Array.isArray(formData.features) && formData.features.length > 0 ? formData.features : [],
      visualStyle: formData.visualStyle,
      // font removed
      //colorPalette: Array.isArray(formData.colorPalette) && formData.colorPalette.length > 0 ? formData.colorPalette : [],
      timing: formData.timing,
      budget: formData.budget,
      missionPart1: formData.missionPart1,
      missionPart2: formData.missionPart2,
      missionPart3: formData.missionPart3,
    };
    return Object.values(requiredFields).every(value => 
      (Array.isArray(value) ? value.length > 0 : !!value.trim())
    );
  };

  const handleSubmit = async () => {
    if (!validateFormData()) {
      toast({
        title: t('multiStepForm.errorTitle'),
        description: t('multiStepForm.incompleteForm'),
        variant: 'destructive',
        duration: 5000,
      });
      return;
    }

    setIsSubmitting(true);
    setIsReloading(true);
    try {
      const userId = localStorage.getItem('bizzwiz-userId');
      if (!userId) {
        throw new Error(t('multiStepForm.notLoggedIn'));
      }

      const submitData = {
        mode,
        userId,
        userMotivation: formData.userMotivation,
        userInspiration: formData.userInspiration || '',
        userConcerns: formData.userConcerns || '',
        projectName: formData.projectName,
        projectDescription: formData.projectDescription,
        solutionType: formData.solutionType,
        audience: formData.audience,
        features: formData.features,
        visualStyle: formData.visualStyle,
        // font removed
        // colorPalette: formData.colorPalette,
        timing: formData.timing,
        budget: formData.budget,
        missionPart1: formData.missionPart1,
        missionPart2: formData.missionPart2,
        missionPart3: formData.missionPart3,
      };

      const endpoint = '/projects';
      const response = await ApiService(endpoint, 'POST', submitData);

      if (response.success) {
        if (response.data.user_id) {
          localStorage.setItem('bizwizuser_id', response.data.user_id);
        }
        if (response.data.form_data_id) {
          localStorage.setItem('bizwiz_form_data_id', response.data.form_data_id);
        }
        navigate('/plan', {
          state: {
            formData: response.data.form_data,
            user: response.data.user || null,
          },
        });
        toast({
          title: t('multiStepForm.successTitle'),
          description: t('multiStepForm.successDescription'),
          duration: 3000,
        });
        resetForm(mode);
        if (onSubmitExternal) onSubmitExternal(formData);
      } else {
        throw new Error(response.message || t('multiStepForm.submissionFailure'));
      }
    } catch (error) {
      console.error('Erreur de soumission du formulaire:', error);
      let errorMessage = t('multiStepForm.submissionFailure');
      if (error.response && error.response.status === 422) {
        errorMessage = t('multiStepForm.validationFailed') + JSON.stringify(error.response.data.errors);
      } else if (error.message.includes('Network error')) {
        errorMessage = t('multiStepForm.networkError');
      }
      toast({
        title: t('multiStepForm.errorTitle'),
        description: errorMessage,
        variant: 'destructive',
        duration: 5000,
      });
    } finally {
      setTimeout(() => {
        setIsReloading(false);
        setIsSubmitting(false);
      }, 1000);
    }
  };

  const renderStepContent = () => {
    if (mode === 'dashboard') {
      switch (currentStep) {
        case 1:
          return <StepDescribeProject onNext={() => setCurrentStep(2)} />;
        case 2:
          return <StepUserMotivation onNext={() => setCurrentStep(3)} />;
        case 3:
          return <StepSolutionType onNext={() => setCurrentStep(4)} />;
        case 4:
          return <StepAudience onNext={() => setCurrentStep(5)} />;
        case 5:
          return <StepFeatures onNext={() => setCurrentStep(6)} />;
        case 6:
          return <StepVisualStyle onNext={() => setCurrentStep(7)} />;
        // case 7:
        //   return <ColorPaletteSelection onNext={() => setCurrentStep(8)} />;
        case 7:
          return <StepTiming onNext={() => setCurrentStep(9)} />;
        case 8:
          return <StepBudget onNext={() => setCurrentStep(10)} />;
        case 9:
          return <StepMission onSubmit={handleSubmit} isSubmitting={isSubmitting} />;
        default:
          setCurrentStep(1);
          return <StepDescribeProject onNext={() => setCurrentStep(2)} />;
      }
    }
    switch (currentStep) {
      case 1:
        return <StepWelcome />;
      case 2:
        return <StepDescribeProject onNext={() => setCurrentStep(3)} />;
      case 3:
        return <StepUserMotivation onNext={() => setCurrentStep(4)} />;
      case 4:
        return <StepSolutionType onNext={() => setCurrentStep(5)} />;
      case 5:
        return <StepAudience onNext={() => setCurrentStep(6)} />;
      case 6:
        return <StepFeatures onNext={() => setCurrentStep(7)} />;
      case 7:
        return <StepVisualStyle onNext={() => setCurrentStep(8)} />;
      // case 8:
      //   return <ColorPaletteSelection onNext={() => setCurrentStep(9)} />;
      case 8:
        return <StepTiming onNext={() => setCurrentStep(10)} />;
      case 9:
        return <StepBudget onNext={() => setCurrentStep(11)} />;
      case 10:
        return <StepMission onSubmit={handleSubmit} isSubmitting={isSubmitting} />;
      default:
        setCurrentStep(1);
        return <StepWelcome />;
    }
  };

  const LoadingScreen = () => (
    <motion.div
      key="loading"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-[400px] md:min-h-[500px] px-4 py-8"
      role="alert"
      aria-live="polite"
    >
      <div className="relative mb-8">
        <div className="w-16 h-16 md:w-20 md:h-20 border-4 border-gray-200 rounded-full animate-spin">
          <div className="w-full h-full border-4 border-t-bizzwiz-accent border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        </div>
        <div className="absolute inset-0 w-16 h-16 md:w-20 md:h-20 border-4 border-gray-100 rounded-full animate-pulse"></div>
      </div>
      <div className="text-center max-w-md mx-auto">
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-bizzwiz-text mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {t('multiStepForm.loadingTitle')}
        </motion.h2>
        <motion.p
          className="text-bizzwiz-text-alt text-base md:text-lg mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {t('multiStepForm.loadingDescription')}
        </motion.p>
        <motion.div
          className="flex justify-center space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-bizzwiz-accent rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center px-4 sm:px-6 lg:px-8" role="form" aria-label={t('multiStepForm.ariaLabel')}>
      {!isReloading && (
        <div className="w-full">
           <TopHeaderBar/>
        </div>
      )}
      {!isReloading && (
        <div className="w-full">
           <LevelHeader levelno='Level 1' heading={t('multiStepForm.levelheader')} />
        </div>
      )}
      {!isReloading && (
        <div className="w-full">
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        </div>
      )}
      <div className={`w-full ${!isReloading ? 'mt-8' : 'mt-4'}`}>
        <AnimatePresence mode="wait">
          {isReloading ? (
            <LoadingScreen />
          ) : (
            <StepCard key={currentStep}>{renderStepContent()}</StepCard>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MultiStepForm;
