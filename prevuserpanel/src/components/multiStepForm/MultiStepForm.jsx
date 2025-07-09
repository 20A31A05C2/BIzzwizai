// import React, { useState } from "react";
// import { AnimatePresence } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { useFormContext } from "@/contexts/FormContext";
// import ProgressBar from "@/components/multiStepForm/ProgressBar";
// import StepCard from "@/components/multiStepForm/StepCard";
// import StepWelcome from "@/components/multiStepForm/steps/StepWelcome";
// import StepUserInfo from "@/components/multiStepForm/steps/StepUserInfo";
// import StepUserMotivation from "@/components/multiStepForm/steps/StepUserMotivation";
// import StepDescribeProject from "@/components/multiStepForm/steps/StepDescribeProject";
// import StepSolutionType from "@/components/multiStepForm/steps/StepSolutionType";
// import StepAudience from "@/components/multiStepForm/steps/StepAudience";
// import StepFeatures from "@/components/multiStepForm/steps/StepFeatures";
// import StepVisualStyle from "@/components/multiStepForm/steps/StepVisualStyle";
// import StepTiming from "@/components/multiStepForm/steps/StepTiming";
// import StepBudget from "@/components/multiStepForm/steps/StepBudget";
// import StepMission from "@/components/multiStepForm/steps/StepMission";
// import { toast } from "@/components/ui/use-toast";
// import ApiService from "@/apiService";

// const MultiStepForm = ({ onSubmitExternal }) => {
//   const { currentStep, totalSteps, formData, resetForm } = useFormContext();
//   const navigate = useNavigate();
//   const [isSubmitting, setIsSubmitting] = useState(false);

// const handleSubmit = async () => {
//   setIsSubmitting(true);

//   try {
//     const submitData = {
//       userName: formData.userName,
//       userEmail: formData.userEmail,
//       userPassword: formData.userPassword,
//       userRole: "user",
//       userCompany: formData.userCompany,
//       userMotivation: formData.userMotivation,
//       userInspiration: formData.userInspiration,
//       userConcerns: formData.userConcerns,
//       projectDescription: formData.projectDescription,
//       solutionType: formData.solutionType,
//       audience: formData.audience,
//       features: formData.features,
//       visualStyle: formData.visualStyle,
//       timing: formData.timing,
//       budget: formData.budget,
//       missionPart1: formData.missionPart1,
//       missionPart2: formData.missionPart2,
//       missionPart3: formData.missionPart3,
//     };

//     console.log("Submitting form data:", submitData);

//     const response = await ApiService("/submit-form", "POST", submitData);

//     if (response.success) {
//       // Store token if provided
//       if (response.data.token) {
//         localStorage.setItem("bizwizusertoken", response.data.token);
//       }

//       toast({
//         title: "🚀 Projet Soumis !",
//         description: "Votre compte a été créé avec succès. Vous êtes maintenant connecté.",
//         duration: 3000,
//       });

//       resetForm();

//       if (onSubmitExternal) {
//         onSubmitExternal(formData);
//       }

//       navigate("/generating-roadmap", {
//         state: {
//           formData: response.data.form_data,
//           user: response.data.user,
//         },
//       });
//     } else {
//       throw new Error(response.message || "Une erreur est survenue lors de l'envoi du formulaire");
//     }
//   } catch (error) {
//     console.error("Form submission error:", error);

//     let errorMessage = "Une erreur est survenue lors de l'envoi du formulaire";

//     if (error.response?.data?.errors) {
//       const errors = error.response.data.errors;
//       if (errors.userEmail) {
//         errorMessage = "Cette adresse e-mail est déjà utilisée";
//       } else if (errors.userPassword) {
//         errorMessage = "Le mot de passe doit contenir au moins 8 caractères";
//       } else {
//         errorMessage = "Veuillez vérifier les informations saisies";
//       }
//     } else if (error.message) {
//       errorMessage = error.message;
//     }

//     toast({
//       title: "Erreur",
//       description: errorMessage,
//       variant: "destructive",
//       duration: 5000,
//     });
//   } finally {
//     setIsSubmitting(false);
//   }
// };

//   const renderStepContent = () => {
//     switch (currentStep) {
//       case 1:
//         return <StepWelcome />;
//       case 2:
//         return <StepUserInfo />;
//       case 3:
//         return <StepUserMotivation />;
//       case 4:
//         return <StepDescribeProject />;
//       case 5:
//         return <StepSolutionType />;
//       case 6:
//         return <StepAudience />;
//       case 7:
//         return <StepFeatures />;
//       case 8:
//         return <StepVisualStyle />;
//       case 9:
//         return <StepTiming />;
//       case 10:
//         return <StepBudget />;
//       case 11:
//         return <StepMission onSubmit={handleSubmit} isSubmitting={isSubmitting} />;
//       default:
//         return <StepWelcome />;
//     }
//   };

//   return (
//     <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
//       <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
//       <div className="w-full mt-8">
//         <AnimatePresence mode="wait">
//           <StepCard key={currentStep}>{renderStepContent()}</StepCard>
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default MultiStepForm;




import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "@/contexts/FormContext";
import ProgressBar from "@/components/multiStepForm/ProgressBar";
import StepCard from "@/components/multiStepForm/StepCard";
import StepWelcome from "@/components/multiStepForm/steps/StepWelcome";
import StepUserInfo from "@/components/multiStepForm/steps/StepUserInfo";
import StepUserMotivation from "@/components/multiStepForm/steps/StepUserMotivation";
import StepDescribeProject from "@/components/multiStepForm/steps/StepDescribeProject";
import StepSolutionType from "@/components/multiStepForm/steps/StepSolutionType";
import StepAudience from "@/components/multiStepForm/steps/StepAudience";
import StepFeatures from "@/components/multiStepForm/steps/StepFeatures";
import StepVisualStyle from "@/components/multiStepForm/steps/StepVisualStyle";
import StepTiming from "@/components/multiStepForm/steps/StepTiming";
import StepBudget from "@/components/multiStepForm/steps/StepBudget";
import StepMission from "@/components/multiStepForm/steps/StepMission";
import { toast } from "@/components/ui/use-toast";
import ApiService from "@/apiService";

const MultiStepForm = ({ onSubmit: onSubmitExternal, mode = "register" }) => {
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isInitialized = React.useRef(false);

  useEffect(() => {
    if (!isInitialized.current) {
      console.log("MultiStepForm initialized with mode:", mode);
      resetForm(mode);
      isInitialized.current = true;
    }
  }, [mode, resetForm]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const userId = localStorage.getItem("bizzwiz-userId");
      if (mode === "dashboard" && !userId) {
        throw new Error("User not logged in");
      }

      const submitData = {
        mode,
        userId: mode === "dashboard" ? userId : undefined,
        userName: mode === "register" ? formData.userName : undefined,
        userEmail: mode === "register" ? formData.userEmail : undefined,
        userPassword: mode === "register" ? formData.userPassword : undefined,
        userRole: mode === "register" ? "user" : undefined,
        userCompany: mode === "register" ? formData.userCompany : undefined,
        userMotivation: mode === "register" ? formData.userMotivation : undefined,
        userInspiration: mode === "register" ? formData.userInspiration : undefined,
        userConcerns: mode === "register" ? formData.userConcerns : undefined,
        projectDescription: formData.projectDescription,
        solutionType: formData.solutionType,
        audience: formData.audience,
        features: formData.features,
        visualStyle: formData.visualStyle,
        timing: formData.timing,
        budget: formData.budget,
        missionPart1: formData.missionPart1,
        missionPart2: formData.missionPart2,
        missionPart3: formData.missionPart3,
      };

      const endpoint = mode === "register" ? "/submit-form" : "/projects";
      const response = await ApiService(endpoint, "POST", submitData);

      if (response.success) {
        if (mode === "register" && response.data.token) {
          localStorage.setItem("bizwizusertoken", response.data.token);
        }
        toast({
          title: "🚀 Success",
          description: mode === "register" ? "Account created successfully." : "Project created successfully.",
          duration: 3000,
        });
        resetForm(mode);
        if (onSubmitExternal) onSubmitExternal(formData);
        if (mode === "register") {
          navigate("/verify-email", {
            state: { email: formData.userEmail },
          });
        } else {
          navigate("/generating-roadmap", {
            state: { formData: response.data.form_data, user: response.data.user || null },
          });
        }
      } else {
        throw new Error(response.message || "Submission failed");
      }
      //   navigate("/generating-roadmap", {
      //     state: { formData: response.data.form_data, user: response.data.user || null },
      //   });
      // } else {
      //   throw new Error(response.message || "Submission failed");
      // }
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to submit form",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    console.log("Rendering step:", currentStep, "Mode:", mode, "Total Steps:", totalSteps);
    if (mode === "dashboard") {
      if (currentStep > 8) setCurrentStep(1); // Prevent invalid steps
      switch (currentStep) {
        case 1: return <StepDescribeProject />;
        case 2: return <StepSolutionType />;
        case 3: return <StepAudience />;
        case 4: return <StepFeatures />;
        case 5: return <StepVisualStyle />;
        case 6: return <StepTiming />;
        case 7: return <StepBudget />;
        case 8: return <StepMission onSubmit={handleSubmit} isSubmitting={isSubmitting} />;
        default:
          console.warn("Invalid step in dashboard mode:", currentStep);
          setCurrentStep(1);
          return <StepDescribeProject />;
      }
    }
    switch (currentStep) {
      case 1: return <StepWelcome />;
      case 2: return <StepUserInfo />;
      case 3: return <StepUserMotivation />;
      case 4: return <StepDescribeProject />;
      case 5: return <StepSolutionType />;
      case 6: return <StepAudience />;
      case 7: return <StepFeatures />;
      case 8: return <StepVisualStyle />;
      case 9: return <StepTiming />;
      case 10: return <StepBudget />;
      case 11: return <StepMission onSubmit={handleSubmit} isSubmitting={isSubmitting} />;
      default:
        console.warn("Invalid step in register mode:", currentStep);
        setCurrentStep(1);
        return <StepWelcome />;
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      <div className="w-full mt-8">
        <AnimatePresence mode="wait">
          <StepCard key={currentStep}>{renderStepContent()}</StepCard>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MultiStepForm;