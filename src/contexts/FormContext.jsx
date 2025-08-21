import React, { createContext, useState, useContext } from 'react';

const FormContext = createContext();

export const useFormContext = () => useContext(FormContext);

export const FormProvider = ({ children }) => {
  const [totalSteps, setTotalSteps] = useState(12); // Initialize to 12 for register mode
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
    projectName: '',
    projectDescription: '',
    solutionType: '',
    audience: '',
    features: [],
    visualStyle: '',
    font: '', // Changed from null to empty string
    colorPalette: [], // Changed from null to empty array
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
      userMotivation: '',
      userInspiration: '',
      userConcerns: '',
      projectName: '',
      projectDescription: '',
      solutionType: '',
      audience: '',
      features: [],
      visualStyle: '',
      font: '', // Changed from null
      colorPalette: [], // Changed from null
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
      projectName: '',
      projectDescription: '',
      solutionType: '',
      audience: '',
      features: [],
      visualStyle: '',
      font: '', // Changed from null
      colorPalette: [], // Changed from null
      timing: '',
      budget: '',
      missionPart1: '',
      missionPart2: '',
      missionPart3: '',
    };
    setFormData(resetData);
    setCurrentStep(1);
    setTotalSteps(mode === "register" ? 12 : 11); // 12 steps for register, 11 for dashboard
    // console.log("Form reset for mode:", mode);
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



// import React, { createContext, useState, useContext } from 'react';

// const FormContext = createContext();

// export const useFormContext = () => useContext(FormContext);

// export const FormProvider = ({ children }) => {
//   const [totalSteps, setTotalSteps] = useState(11);
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

//   const resetForm = (mode = "register") => {
//     const resetData = mode === "dashboard" ? {
//       // Include motivation fields for dashboard mode since we now use StepUserMotivation
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
//     } : {
//       userName: '',
//       userEmail: '',
//       userPassword: '',
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
//     };
//     setFormData(resetData);
//     setCurrentStep(1);
//     // Fix: Set totalSteps to 9 for dashboard mode (was 8 before)
//     setTotalSteps(mode === "register" ? 11 : 9);
//     console.log("Form reset for mode:", mode);
//   };

//   return (
//     <FormContext.Provider
//       value={{
//         currentStep,
//         setCurrentStep,
//         totalSteps,
//         setTotalSteps,
//         formData,
//         setFormData,
//         updateFormData,
//         nextStep,
//         prevStep,
//         goToStep,
//         resetForm,
//       }}
//     >
//       {children}
//     </FormContext.Provider>
//   );
// };