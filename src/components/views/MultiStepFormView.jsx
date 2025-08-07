// import React, { useEffect } from 'react';
// import MultiStepForm from '@/components/multiStepForm/MultiStepForm';
// import { useFormContext } from '@/contexts/FormContext';
// import { toast } from '@/components/ui/use-toast';

// const MultiStepFormView = ({ mode = "register" }) => {
//   const { resetForm } = useFormContext();
//   const isInitialized = React.useRef(false);

//   useEffect(() => {
//     if (!isInitialized.current) {
//       console.log("MultiStepFormView initialized with mode:", mode);
//       resetForm(mode);
//       isInitialized.current = true;
//     }
//   }, [mode, resetForm]);

//   const handleFormSubmit = (formData) => {
//     // console.log("Final Form Data from View:", formData);
//     toast({
//       title: "🎉 Vision Partagée !",
//       description: "Votre projet a été soumis avec succès. Nous sommes impatients de le concrétiser !",
//       duration: 8000,
//     });
//     resetForm(mode);
//   };

//   return (
//     <div className="w-full max-w-4xl p-4 sm:p-6 md:p-8">
//       <MultiStepForm onSubmit={handleFormSubmit} mode={mode} />
//     </div>
//   );
// };

// export default MultiStepFormView;





import React, { useEffect } from 'react';
import MultiStepForm from '@/components/multiStepForm/MultiStepForm';
import { useFormContext } from '@/contexts/FormContext';
import { toast } from '@/components/ui/use-toast';

const MultiStepFormView = ({ mode = 'register' }) => {
  const { resetForm, formMode } = useFormContext();
  const isInitialized = React.useRef(false);

  useEffect(() => {
    if (!isInitialized.current && formMode !== mode) {
      console.log('MultiStepFormView initialized with mode:', mode);
      resetForm(mode);
      isInitialized.current = true;
    }
  }, [mode, formMode]); // Depend on formMode instead of resetForm

  const handleFormSubmit = (formData) => {
    toast({
      title: '🎉 Vision Partagée !',
      description: 'Votre projet a été soumis avec succès. Nous sommes impatients de le concrétiser !',
      duration: 8000,
    });
    resetForm(mode);
  };

  return (
    <div className="w-full max-w-4xl p-4 sm:p-6 md:p-8">
      <MultiStepForm onSubmit={handleFormSubmit} mode={mode} />
    </div>
  );
};

export default MultiStepFormView;
