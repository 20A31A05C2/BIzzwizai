// // import React, { useState, useEffect } from "react";
// // import { AnimatePresence } from "framer-motion";
// // import { useNavigate } from "react-router-dom";
// // import { useFormContext } from "@/contexts/FormContext";
// // import ProgressBar from "@/components/multiStepForm/ProgressBar";
// // import StepCard from "@/components/multiStepForm/StepCard";
// // import StepWelcome from "@/components/multiStepForm/steps/StepWelcome";
// // import StepUserInfo from "@/components/multiStepForm/steps/StepUserInfo";
// // import StepUserMotivation from "@/components/multiStepForm/steps/StepUserMotivation";
// // import StepDescribeProject from "@/components/multiStepForm/steps/StepDescribeProject";
// // import StepSolutionType from "@/components/multiStepForm/steps/StepSolutionType";
// // import StepAudience from "@/components/multiStepForm/steps/StepAudience";
// // import StepFeatures from "@/components/multiStepForm/steps/StepFeatures";
// // import StepVisualStyle from "@/components/multiStepForm/steps/StepVisualStyle";
// // import StepTiming from "@/components/multiStepForm/steps/StepTiming";
// // import StepBudget from "@/components/multiStepForm/steps/StepBudget";
// // import StepMission from "@/components/multiStepForm/steps/StepMission";
// // import { toast } from "@/components/ui/use-toast";
// // import ApiService from "@/apiService";

// // const MultiStepForm = ({ onSubmit: onSubmitExternal, mode = "register" }) => {
// //   const {
// //     currentStep,
// //     totalSteps,
// //     setCurrentStep,
// //     setTotalSteps,
// //     formData,
// //     setFormData,
// //     resetForm,
// //   } = useFormContext();

// //   const navigate = useNavigate();
// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const isInitialized = React.useRef(false);

// //   useEffect(() => {
// //     if (!isInitialized.current) {
// //       console.log("MultiStepForm initialized with mode:", mode);
// //       resetForm(mode);
// //       isInitialized.current = true;
// //     }
// //   }, [mode, resetForm]);

// //   const handleSubmit = async () => {
// //     setIsSubmitting(true);
// //     try {
// //       const userId = localStorage.getItem("bizzwiz-userId");
// //       if (mode === "dashboard" && !userId) {
// //         throw new Error("User not logged in");
// //       }

// //       const submitData = {
// //         mode,
// //         userId: mode === "dashboard" ? userId : undefined,
// //         userName: mode === "register" ? formData.userName : undefined,
// //         userEmail: mode === "register" ? formData.userEmail : undefined,
// //         userPassword: mode === "register" ? formData.userPassword : undefined,
// //         userRole: mode === "register" ? "user" : undefined,
// //         userCompany: mode === "register" ? formData.userCompany : undefined,
// //         userMotivation: mode === "register" ? formData.userMotivation : undefined,
// //         userInspiration: mode === "register" ? formData.userInspiration : undefined,
// //         userConcerns: mode === "register" ? formData.userConcerns : undefined,
// //         projectDescription: formData.projectDescription,
// //         solutionType: formData.solutionType,
// //         audience: formData.audience,
// //         features: formData.features,
// //         visualStyle: formData.visualStyle,
// //         timing: formData.timing,
// //         budget: formData.budget,
// //         missionPart1: formData.missionPart1,
// //         missionPart2: formData.missionPart2,
// //         missionPart3: formData.missionPart3,
// //       };

// //       const endpoint = mode === "register" ? "/submit-form" : "/projects";
// //       const response = await ApiService(endpoint, "POST", submitData);

// //       if (response.success) {
// //         if (mode === "register" && response.data.token) {
// //           localStorage.setItem("bizwizusertoken", response.data.token);
// //         }
// //         toast({
// //           title: "🚀 Success",
// //           description: mode === "register" ? "Account created successfully." : "Project created successfully.",
// //           duration: 3000,
// //         });
// //         resetForm(mode);
// //         if (onSubmitExternal) onSubmitExternal(formData);
// //         if (mode === "register") {
// //           navigate("/verify-email", {
// //             state: { email: formData.userEmail },
// //           });
// //         } else {
// //           navigate("/generating-roadmap", {
// //             state: { formData: response.data.form_data, user: response.data.user || null },
// //           });
// //         }
// //       } else {
// //         throw new Error(response.message || "Submission failed");
// //       }
// //       //   navigate("/generating-roadmap", {
// //       //     state: { formData: response.data.form_data, user: response.data.user || null },
// //       //   });
// //       // } else {
// //       //   throw new Error(response.message || "Submission failed");
// //       // }
// //     } catch (error) {
// //       console.error("Form submission error:", error);
// //       toast({
// //         title: "Error",
// //         description: error.message || "Failed to submit form",
// //         variant: "destructive",
// //         duration: 5000,
// //       });
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   const renderStepContent = () => {
// //     console.log("Rendering step:", currentStep, "Mode:", mode, "Total Steps:", totalSteps);
// //     if (mode === "dashboard") {
// //       if (currentStep > 8) setCurrentStep(1); // Prevent invalid steps
// //       switch (currentStep) {
// //         case 1: return <StepDescribeProject />;
// //         case 2: return <StepSolutionType />;
// //         case 3: return <StepAudience />;
// //         case 4: return <StepFeatures />;
// //         case 5: return <StepVisualStyle />;
// //         case 6: return <StepTiming />;
// //         case 7: return <StepBudget />;
// //         case 8: return <StepMission onSubmit={handleSubmit} isSubmitting={isSubmitting} />;
// //         default:
// //           console.warn("Invalid step in dashboard mode:", currentStep);
// //           setCurrentStep(1);
// //           return <StepDescribeProject />;
// //       }
// //     }
// //     switch (currentStep) {
// //       case 1: return <StepWelcome />;
// //       case 2: return <StepUserInfo />;
// //       case 3: return <StepUserMotivation />;
// //       case 4: return <StepDescribeProject />;
// //       case 5: return <StepSolutionType />;
// //       case 6: return <StepAudience />;
// //       case 7: return <StepFeatures />;
// //       case 8: return <StepVisualStyle />;
// //       case 9: return <StepTiming />;
// //       case 10: return <StepBudget />;
// //       case 11: return <StepMission onSubmit={handleSubmit} isSubmitting={isSubmitting} />;
// //       default:
// //         console.warn("Invalid step in register mode:", currentStep);
// //         setCurrentStep(1);
// //         return <StepWelcome />;
// //     }
// //   };

// //   return (
// //     <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
// //       <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
// //       <div className="w-full mt-8">
// //         <AnimatePresence mode="wait">
// //           <StepCard key={currentStep}>{renderStepContent()}</StepCard>
// //         </AnimatePresence>
// //       </div>
// //     </div>
// //   );
// // };

// // export default MultiStepForm;


// import React, { useState, useEffect } from "react";
// import { AnimatePresence, motion } from "framer-motion"; // Added motion import
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

// const MultiStepForm = ({ onSubmit: onSubmitExternal, mode = "register" }) => {
//   const {
//     currentStep,
//     totalSteps,
//     setCurrentStep,
//     setTotalSteps,
//     formData,
//     setFormData,
//     resetForm,
//   } = useFormContext();

//   const navigate = useNavigate();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isReloading, setIsReloading] = useState(false);
//   const isInitialized = React.useRef(false);

//   useEffect(() => {
//     if (!isInitialized.current) {
//       console.log("MultiStepForm initialized with mode:", mode);
//       resetForm(mode);
//       isInitialized.current = true;
//     }
//   }, [mode, resetForm]);

//   const handleSubmit = async () => {
//     setIsSubmitting(true);
//     setIsReloading(true);
//     try {
//       const userId = localStorage.getItem("bizzwiz-userId");
//       if (mode === "dashboard" && !userId) {
//         throw new Error("User not logged in");
//       }

//       const submitData = {
//         mode,
//         userId: mode === "dashboard" ? userId : undefined,
//         userName: mode === "register" ? formData.userName : undefined,
//         userEmail: mode === "register" ? formData.userEmail : undefined,
//         userPassword: mode === "register" ? formData.userPassword : undefined,
//         userRole: mode === "register" ? "user" : undefined,
//         userCompany: mode === "register" ? formData.userCompany : undefined,
//         userMotivation: mode === "register" ? formData.userMotivation : undefined,
//         userInspiration: mode === "register" ? formData.userInspiration : undefined,
//         userConcerns: mode === "register" ? formData.userConcerns : undefined,
//         projectName: formData.projectName,
//         projectDescription: formData.projectDescription,
//         solutionType: formData.solutionType,
//         audience: formData.audience,
//         features: formData.features,
//         visualStyle: formData.visualStyle,
//         timing: formData.timing,
//         budget: formData.budget,
//         missionPart1: formData.missionPart1,
//         missionPart2: formData.missionPart2,
//         missionPart3: formData.missionPart3,
//       };

//       const endpoint = mode === "register" ? "/submit-form" : "/projects";
//       const response = await ApiService(endpoint, "POST", submitData);

//       if (response.success) {
//         if (mode === "register" && response.data.token) {
//           localStorage.setItem("bizwizusertoken", response.data.token);
//         }
//         toast({
//           title: "🚀 Success",
//           description: mode === "register" ? "Account created successfully." : "Project created successfully.",
//           duration: 3000,
//         });
//         resetForm(mode);
//         if (onSubmitExternal) onSubmitExternal(formData);
//         if (mode === "register") {
//           navigate("/verify-email", {
//             state: { email: formData.userEmail },
//           });
//         }
//       } else {
//         throw new Error(response.message || "Submission failed");
//       }
//     } catch (error) {
//       console.error("Form submission error:", error);
//       toast({
//         title: "Error",
//         description: error.message || "Failed to submit form",
//         variant: "destructive",
//         duration: 5000,
//       });
//     } finally {
//       setTimeout(() => {
//         setIsReloading(false);
//         setIsSubmitting(false);
//       }, 1000);
//     }
//   };

//   const renderStepContent = () => {
//     console.log("Rendering step:", currentStep, "Mode:", mode, "Total Steps:", totalSteps);
//     if (mode === "dashboard") {
//       if (currentStep > 8) setCurrentStep(1);
//       switch (currentStep) {
        
//         case 1: return <StepDescribeProject />;
//         case 2: return <StepSolutionType />;
//         case 3: return <StepAudience />;
//         case 4: return <StepFeatures />;
//         case 5: return <StepVisualStyle />;
//         case 6: return <StepTiming />;
//         case 7: return <StepBudget />;
//         case 8: return <StepMission onSubmit={handleSubmit} isSubmitting={isSubmitting} />;
//         default:
//           console.warn("Invalid step in dashboard mode:", currentStep);
//           setCurrentStep(1);
//           return <StepDescribeProject />;
//       }
//     }
//     switch (currentStep) {
//       case 1: return <StepWelcome />;
//       case 2: return <StepUserInfo />;
//       case 3: return <StepUserMotivation />;
//       case 4: return <StepDescribeProject />;
//       case 5: return <StepSolutionType />;
//       case 6: return <StepAudience />;
//       case 7: return <StepFeatures />;
//       case 8: return <StepVisualStyle />;
//       case 9: return <StepTiming />;
//       case 10: return <StepBudget />;
//       case 11: return <StepMission onSubmit={handleSubmit} isSubmitting={isSubmitting} />;
//       default:
//         console.warn("Invalid step in register mode:", currentStep);
//         setCurrentStep(1);
//         return <StepWelcome />;
//     }
//   };

//   const LoadingScreen = () => (
//     <motion.div
//       key="loading"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -20 }}
//       transition={{ duration: 0.5 }}
//       className="flex flex-col items-center justify-center min-h-[400px] md:min-h-[500px] px-4 py-8"
//     >
//       {/* Loading Spinner */}
//       <div className="relative mb-8">
//         <div className="w-16 h-16 md:w-20 md:h-20 border-4 border-gray-200 rounded-full animate-spin">
//           <div className="w-full h-full border-4 border-t-bizzwiz-accent border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
//         </div>
//         <div className="absolute inset-0 w-16 h-16 md:w-20 md:h-20 border-4 border-gray-100 rounded-full animate-pulse"></div>
//       </div>

//       {/* Loading Content */}
//       <div className="text-center max-w-md mx-auto">
//         <motion.h2 
//           className="text-2xl md:text-3xl font-bold text-bizzwiz-text mb-4"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.2 }}
//         >
//           {mode === "register" ? "Creating Your Account" : "Creating Your Project"}
//         </motion.h2>
        
//         <motion.p 
//           className="text-bizzwiz-text-alt text-base md:text-lg mb-6"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.4 }}
//         >
//           {mode === "register" 
//             ? "Setting up your BizzWiz account and preparing your workspace..."
//             : "Processing your project details and generating your business plan..."
//           }
//         </motion.p>

//         {/* Progress Dots */}
//         <motion.div 
//           className="flex justify-center space-x-2"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.6 }}
//         >
//           {[0, 1, 2].map((i) => (
//             <motion.div
//               key={i}
//               className="w-2 h-2 bg-bizzwiz-accent rounded-full"
//               animate={{
//                 scale: [1, 1.5, 1],
//                 opacity: [0.5, 1, 0.5],
//               }}
//               transition={{
//                 duration: 1.5,
//                 repeat: Infinity,
//                 delay: i * 0.2,
//               }}
//             />
//           ))}
//         </motion.div>
//       </div>
//     </motion.div>
//   );

//   return (
//     <div className="w-full max-w-3xl mx-auto flex flex-col items-center px-4 sm:px-6 lg:px-8">
//       {/* Only show progress bar when not reloading */}
//       {!isReloading && (
//         <div className="w-full">
//           <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
//         </div>
//       )}
      
//       <div className={`w-full ${!isReloading ? 'mt-8' : 'mt-4'}`}>
//         <AnimatePresence mode="wait">
//           {isReloading ? (
//             <LoadingScreen />
//           ) : (
//             <StepCard key={currentStep}>{renderStepContent()}</StepCard>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default MultiStepForm;


// import React, { useState, useEffect } from "react";
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

// const MultiStepForm = ({ onSubmit: onSubmitExternal, mode = "register" }) => {
//   const {
//     currentStep,
//     totalSteps,
//     setCurrentStep,
//     setTotalSteps,
//     formData,
//     setFormData,
//     resetForm,
//   } = useFormContext();

//   const navigate = useNavigate();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const isInitialized = React.useRef(false);

//   useEffect(() => {
//     if (!isInitialized.current) {
//       console.log("MultiStepForm initialized with mode:", mode);
//       resetForm(mode);
//       isInitialized.current = true;
//     }
//   }, [mode, resetForm]);

//   const handleSubmit = async () => {
//     setIsSubmitting(true);
//     try {
//       const userId = localStorage.getItem("bizzwiz-userId");
//       if (mode === "dashboard" && !userId) {
//         throw new Error("User not logged in");
//       }

//       const submitData = {
//         mode,
//         userId: mode === "dashboard" ? userId : undefined,
//         userName: mode === "register" ? formData.userName : undefined,
//         userEmail: mode === "register" ? formData.userEmail : undefined,
//         userPassword: mode === "register" ? formData.userPassword : undefined,
//         userRole: mode === "register" ? "user" : undefined,
//         userCompany: mode === "register" ? formData.userCompany : undefined,
//         userMotivation: mode === "register" ? formData.userMotivation : undefined,
//         userInspiration: mode === "register" ? formData.userInspiration : undefined,
//         userConcerns: mode === "register" ? formData.userConcerns : undefined,
//         projectDescription: formData.projectDescription,
//         solutionType: formData.solutionType,
//         audience: formData.audience,
//         features: formData.features,
//         visualStyle: formData.visualStyle,
//         timing: formData.timing,
//         budget: formData.budget,
//         missionPart1: formData.missionPart1,
//         missionPart2: formData.missionPart2,
//         missionPart3: formData.missionPart3,
//       };

//       const endpoint = mode === "register" ? "/submit-form" : "/projects";
//       const response = await ApiService(endpoint, "POST", submitData);

//       if (response.success) {
//         if (mode === "register" && response.data.token) {
//           localStorage.setItem("bizwizusertoken", response.data.token);
//         }
//         toast({
//           title: "🚀 Success",
//           description: mode === "register" ? "Account created successfully." : "Project created successfully.",
//           duration: 3000,
//         });
//         resetForm(mode);
//         if (onSubmitExternal) onSubmitExternal(formData);
//         if (mode === "register") {
//           navigate("/verify-email", {
//             state: { email: formData.userEmail },
//           });
//         } else {
//           navigate("/generating-roadmap", {
//             state: { formData: response.data.form_data, user: response.data.user || null },
//           });
//         }
//       } else {
//         throw new Error(response.message || "Submission failed");
//       }
//       //   navigate("/generating-roadmap", {
//       //     state: { formData: response.data.form_data, user: response.data.user || null },
//       //   });
//       // } else {
//       //   throw new Error(response.message || "Submission failed");
//       // }
//     } catch (error) {
//       console.error("Form submission error:", error);
//       toast({
//         title: "Error",
//         description: error.message || "Failed to submit form",
//         variant: "destructive",
//         duration: 5000,
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const renderStepContent = () => {
//     console.log("Rendering step:", currentStep, "Mode:", mode, "Total Steps:", totalSteps);
//     if (mode === "dashboard") {
//       if (currentStep > 8) setCurrentStep(1); // Prevent invalid steps
//       switch (currentStep) {
//         case 1: return <StepDescribeProject />;
//         case 2: return <StepSolutionType />;
//         case 3: return <StepAudience />;
//         case 4: return <StepFeatures />;
//         case 5: return <StepVisualStyle />;
//         case 6: return <StepTiming />;
//         case 7: return <StepBudget />;
//         case 8: return <StepMission onSubmit={handleSubmit} isSubmitting={isSubmitting} />;
//         default:
//           console.warn("Invalid step in dashboard mode:", currentStep);
//           setCurrentStep(1);
//           return <StepDescribeProject />;
//       }
//     }
//     switch (currentStep) {
//       case 1: return <StepWelcome />;
//       case 2: return <StepUserInfo />;
//       case 3: return <StepUserMotivation />;
//       case 4: return <StepDescribeProject />;
//       case 5: return <StepSolutionType />;
//       case 6: return <StepAudience />;
//       case 7: return <StepFeatures />;
//       case 8: return <StepVisualStyle />;
//       case 9: return <StepTiming />;
//       case 10: return <StepBudget />;
//       case 11: return <StepMission onSubmit={handleSubmit} isSubmitting={isSubmitting} />;
//       default:
//         console.warn("Invalid step in register mode:", currentStep);
//         setCurrentStep(1);
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
import { AnimatePresence, motion } from "framer-motion"; // Added motion import
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
import Navbar from '../layout/Navbar';
import Header from '../multiStepForm/Header';


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
  const [isReloading, setIsReloading] = useState(false);
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
    setIsReloading(true);
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
        userMotivation: formData.userMotivation,
        userInspiration: formData.userInspiration,
        userConcerns: formData.userConcerns,
        projectName: formData.projectName,
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
        // Set IDs in localStorage for dashboard mode (and register mode if needed)
        if (mode === "dashboard") {
          if (response.data.user_id) {
            localStorage.setItem("bizwizuser_id", response.data.user_id);
          }
          if (response.data.form_data_id) {
            localStorage.setItem("bizwiz_form_data_id", response.data.form_data_id);
          }
          // Navigate to business/logo generation page after project creation
          navigate("/plan", {
            state: {
              formData: response.data.form_data,
              user: response.data.user || null,
            },
          });
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
        }
      } else {
        throw new Error(response.message || "Submission failed");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to submit form",
        variant: "destructive",
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
    console.log("Rendering step:", currentStep, "Mode:", mode, "Total Steps:", totalSteps);
    if (mode === "dashboard") {
      if (currentStep > 9) setCurrentStep(1);
      switch (currentStep) {
        case 1: return <StepUserMotivation />;
        case 2: return <StepDescribeProject />;
        case 3: return <StepSolutionType />;
        case 4: return <StepAudience />;
        case 5: return <StepFeatures />;
        case 6: return <StepVisualStyle />;
        case 7: return <StepTiming />;
        case 8: return <StepBudget />;
        case 9: return <StepMission onSubmit={handleSubmit} isSubmitting={isSubmitting} />;
        default:
          console.warn("Invalid step in dashboard mode:", currentStep);
          setCurrentStep(1);
          return <StepUserMotivation />;
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

  const LoadingScreen = () => (
    <motion.div
      key="loading"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-[400px] md:min-h-[500px] px-4 py-8"
    >
      {/* Loading Spinner */}
      <div className="relative mb-8">
        <div className="w-16 h-16 md:w-20 md:h-20 border-4 border-gray-200 rounded-full animate-spin">
          <div className="w-full h-full border-4 border-t-bizzwiz-accent border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        </div>
        <div className="absolute inset-0 w-16 h-16 md:w-20 md:h-20 border-4 border-gray-100 rounded-full animate-pulse"></div>
      </div>

      {/* Loading Content */}
      <div className="text-center max-w-md mx-auto">
        <motion.h2 
          className="text-2xl md:text-3xl font-bold text-bizzwiz-text mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {mode === "register" ? "Creating Your Account" : "Creating Your Project"}
        </motion.h2>
        
        <motion.p 
          className="text-bizzwiz-text-alt text-base md:text-lg mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {mode === "register" 
            ? "Setting up your BizzWiz account and preparing your workspace..."
            : "Processing your project details and generating your business plan..."
          }
        </motion.p>

        {/* Progress Dots */}
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
    
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center px-4 sm:px-6 lg:px-8">
      {/* <Navbar /> */}
      <Header />
      {/* Only show progress bar when not reloading */}
      {/* {!isReloading && (
        <div className="w-full">
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        </div>
      )} */}
      
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