// import React, { createContext, useState, useContext } from 'react';

// const FormContext = createContext();

// export const useFormContext = () => useContext(FormContext);

// export const FormProvider = ({ children }) => {
//   const totalSteps = 11; // Increased from 9 to 11
//   const [currentStep, setCurrentStep] = useState(1);
//   const [formData, setFormData] = useState({
//     userName: '',
//     userEmail: '',
//     userRole: '',
//     userCompany: '',
//     userMotivation: '',
//     userInspiration: '',
//     userConcerns: '',
//     projectName: '',
//     projectDescription: '',
//     solutionType: '',
//     audience: '',
//     features: [],
//     visualStyle: '',
//     timing: '',
//     budget: '',
//     missionPart1: '',
//     missionPart2: '',
//     missionPart3: '',
//   });

//   const updateFormData = (data) => {
//     setFormData((prev) => ({ ...prev, ...data }));
//   };

//   const nextStep = () => {
//     if (currentStep < totalSteps) {
//       setCurrentStep((prev) => prev + 1);
//     }
//   };

//   const prevStep = () => {
//     if (currentStep > 1) {
//       setCurrentStep((prev) => prev - 1);
//     }
//   };

//   const goToStep = (stepNumber) => {
//     if (stepNumber >= 1 && stepNumber <= totalSteps) {
//       setCurrentStep(stepNumber);
//     }
//   };
  
//   const resetForm = () => {
//     setFormData({
//       userName: '',
//       userEmail: '',
//       userRole: '',
//       userCompany: '',
//       userMotivation: '',
//       userInspiration: '',
//       userConcerns: '',
//       projectName: '',
//       projectDescription: '',
//       solutionType: '',
//       audience: '',
//       features: [],
//       visualStyle: '',
//       timing: '',
//       budget: '',
//       missionPart1: '',
//       missionPart2: '',
//       missionPart3: '',
//     });
//     setCurrentStep(1);
//   };


//   return (
//     <FormContext.Provider
//       value={{
//         currentStep,
//         totalSteps,
//         formData,
//         updateFormData,
//         nextStep,
//         prevStep,
//         goToStep,
//         resetForm
//       }}
//     >
//       {children}
//     </FormContext.Provider>
//   );
// };





// import React, { createContext, useState, useContext } from 'react';

// const FormContext = createContext();

// export const useFormContext = () => useContext(FormContext);

// export const FormProvider = ({ children }) => {
//   const totalSteps = 11;
//   const [currentStep, setCurrentStep] = useState(1);
//   const [formData, setFormData] = useState({
//     userName: '',
//     userEmail: '',
//     userPassword: '',
//     userRole: '',
//     userCompany: '',
//     userMotivation: '',
//     userInspiration: '',
//     userConcerns: '',
//     projectDescription: '',
//     solutionType: '',
//     audience: '',
//     features: [],
//     visualStyle: '',
//     timing: '',
//     budget: '',
//     missionPart1: '',
//     missionPart2: '',
//     missionPart3: '',
//   });

//   const updateFormData = (data) => {
//     setFormData((prev) => ({ ...prev, ...data }));
//   };

//   const nextStep = () => {
//     if (currentStep < totalSteps) {
//       setCurrentStep((prev) => prev + 1);
//     }
//   };

//   const prevStep = () => {
//     if (currentStep > 1) {
//       setCurrentStep((prev) => prev - 1);
//     }
//   };

//   const goToStep = (stepNumber) => {
//     if (stepNumber >= 1 && stepNumber <= totalSteps) {
//       setCurrentStep(stepNumber);
//     }
//   };
  
//   const resetForm = () => {
//     setFormData({
//       userName: '',
//       userEmail: '',
//       userPassword: '',
//       userRole: '',
//       userCompany: '',
//       userMotivation: '',
//       userInspiration: '',
//       userConcerns: '',
//       projectDescription: '',
//       solutionType: '',
//       audience: '',
//       features: [],
//       visualStyle: '',
//       timing: '',
//       budget: '',
//       missionPart1: '',
//       missionPart2: '',
//       missionPart3: '',
//     });
//     setCurrentStep(1);
//   };

//   return (
//     <FormContext.Provider
//       value={{
//         currentStep,
//         totalSteps,
//         formData,
//         updateFormData,
//         nextStep,
//         prevStep,
//         goToStep,
//         resetForm
//       }}
//     >
//       {children}
//     </FormContext.Provider>
//   );
// };





import React, { createContext, useState, useContext } from 'react';

const FormContext = createContext();

export const useFormContext = () => useContext(FormContext);

export const FormProvider = ({ children }) => {
  const [totalSteps, setTotalSteps] = useState(11);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    userPassword: '',
    userRole: '',
    userCompany: '',
    userMotivation: '',
    userInspiration: '',
    userConcerns: '',
    projectDescription: '',
    solutionType: '',
    audience: '',
    features: [],
    visualStyle: '',
    timing: '',
    budget: '',
    missionPart1: '',
    missionPart2: '',
    missionPart3: '',
  });

  const updateFormData = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const goToStep = (stepNumber) => {
    if (stepNumber >= 1 && stepNumber <= totalSteps) {
      setCurrentStep(stepNumber);
    }
  };

  const resetForm = (mode = "register") => {
    const resetData = mode === "dashboard" ? {
      projectDescription: '',
      solutionType: '',
      audience: '',
      features: [],
      visualStyle: '',
      timing: '',
      budget: '',
      missionPart1: '',
      missionPart2: '',
      missionPart3: '',
    } : {
      userName: '',
      userEmail: '',
      userPassword: '',
      userRole: '',
      userCompany: '',
      userMotivation: '',
      userInspiration: '',
      userConcerns: '',
      projectDescription: '',
      solutionType: '',
      audience: '',
      features: [],
      visualStyle: '',
      timing: '',
      budget: '',
      missionPart1: '',
      missionPart2: '',
      missionPart3: '',
    };
    setFormData(resetData);
    setCurrentStep(1);
    setTotalSteps(mode === "register" ? 11 : 8);
    console.log("Form reset for mode:", mode);
  };

  return (
    <FormContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        totalSteps,
        setTotalSteps,
        formData,
        setFormData,
        updateFormData,
        nextStep,
        prevStep,
        goToStep,
        resetForm,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};