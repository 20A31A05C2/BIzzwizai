// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom';
// import { Toaster } from '@/components/ui/toaster';
// import { FormProvider } from '@/contexts/FormContext';
// import { motion } from 'framer-motion';
// import ErrorBoundary from '@/components/ErrorBoundary';

// import MultiStepFormView from '@/components/views/MultiStepFormView';
// import LandingPage from '@/components/views/LandingPage';
// import ContactPage from '@/components/views/ContactPage';
// import FAQPage from '@/components/views/FAQPage';
// import Navbar from '@/components/layout/Navbar';
// import GeneratingRoadmapPage from '@/components/views/GeneratingRoadmapPage';
// import ProjectPendingReviewPage from '@/components/views/ProjectPendingReviewPage';
// import PaymentPage from '@/components/views/PaymentPage';
// import WebCreationPage from '@/components/views/services/WebCreationPage';
// import ContentGenerationPage from '@/components/views/services/ContentGenerationPage';
// import ConsultationPage from '@/components/views/services/ConsultationPage';
// import AdminRegisterPage from '@/components/views/AdminRegisterPage';
// import VerifyEmail from '@/components/views/VerifyEmail';
// import ScheduleMeetPage from '@/components/views/ScheduleMeetPage';
// import RoadmapPage from '@/components/views/RoadmapPage';
// import ResetPasswordPage from '@/components/views/ResetPasswordPage';
// import EmailVerificationPage from '@/components/EmailVerification';
// import SelectProject from '@/components/views/SelectProject';
// import Planpage from '@/components/businesslogo/Planpage';
// import WaitingValidationPage from '@/components/WaitingValidationPage';
// import LoginPage from '@/components/views/LoginPage';
// import AdminDashboard from '@/components/admin/AdminDashboard';
// import AdminLayout from '@/components/admin/layout/AdminLayout';
// import AdminUsers from '@/components/admin/AdminUsers';
// import AdminChat from '@/components/admin/AdminChat';
// import AdminAnalytics from '@/components/admin/AdminAnalytics';
// import AdminSettings from '@/components/admin/AdminSettings';
// import Dashboard from '@/components/user/Dashboard';
// import AdminUserDetail from '@/components/admin/user/AdminUserDetail';
// import AdminUserDashboardEdit from '@/components/admin/user/AdminUserDashboardEdit';
// import UpdatePasswordPage from '@/components/views/UpdatePasswordPage';
// import AdminAppointment from '@/components/admin/AdminAppointment';
// import { isJwtExpired } from '@/lib/utils';

// // const CosmicFlowBackground = () => {
// //   const particles = Array.from({ length: 40 });
// //   return (
// //     <>
// //       <div className="fixed inset-0 -z-30 bg-gradient-to-br from-bizzwiz-deep-space via-bizzwiz-nebula-purple/10 to-bizzwiz-deep-space animate-slow-gradient-move"></div>
// //       <div className="cosmicflow-bg-elements">
// //         {particles.map((_, i) => {
// //           const size = Math.random() * 2.5 + 0.5;
// //           const duration = Math.random() * 25 + 20;
// //           const colors = ['bizzwiz-electric-cyan-rgb', 'bizzwiz-magenta-flare-rgb', 'bizzwiz-nebula-purple-rgb', 'bizzwiz-star-white-rgb'];
// //           const colorVar = colors[Math.floor(Math.random() * colors.length)];
// //           const opacity = Math.random() * 0.3 + 0.1;

// //           return (
// //             <motion.div
// //               key={i}
// //               className="particle"
// //               style={{
// //                 left: `${Math.random() * 100}%`,
// //                 top: `${Math.random() * 100}%`,
// //                 width: `${size}px`,
// //                 height: `${size}px`,
// //                 backgroundColor: `hsla(var(--${colorVar}), ${opacity})`,
// //                 boxShadow: `0 0 ${Math.random() * 6 + size * 2}px hsla(var(--${colorVar}), ${opacity * 1.5})`,
// //                 filter: `blur(${size < 1 ? 0.5 : 0}px)`
// //               }}
// //               animate={{
// //                 x: [0, Math.random() * 150 - 75, Math.random() * -150 + 75, 0],
// //                 y: [0, Math.random() * 150 - 75, Math.random() * -150 + 75, 0],
// //                 scale: [1, Math.random() * 0.6 + 0.7, Math.random() * 0.6 + 0.7, 1],
// //                 rotate: [0, Math.random() * 180 - 90, Math.random() * -180 + 90, 0],
// //                 opacity: [opacity, opacity * 0.5, opacity * 1.2, opacity * 0.7, opacity],
// //               }}
// //               transition={{
// //                 duration: duration,
// //                 repeat: Infinity,
// //                 repeatType: "mirror",
// //                 ease: "easeInOut"
// //               }}
// //             />
// //           );
// //         })}
// //       </div>
// //     </>
// //   );
// // };

//   const AppWrapper = () => {
//   const location = useLocation();

//   // Proactive JWT expiry check
//   React.useEffect(() => {
//     const token = localStorage.getItem('bizwizusertoken');
//     if (token && isJwtExpired(token)) {
//       localStorage.removeItem('bizwizusertoken');
//       localStorage.removeItem('bizzwiz-userRole');
//       localStorage.removeItem('bizzwiz-userId');
//       window.location.href = '/login';
//     }
//   }, [location]);

//   //  Routes where you DO NOT want the Navbar
//   const hideNavbarPaths = ['/select-project','/admindashboard','/dashboard',];


//   //  Check if current path matches any route in the list
//   const shouldHideNavbar = hideNavbarPaths.some(prefix => location.pathname.startsWith(prefix));



//   return (
//     <FormProvider>
//       <div className="min-h-screen bg-bg-black text-bizzwiz-text-primary font-space-grotesk selection:bg-bizzwiz-magenta-flare selection:text-bizzwiz-deep-space">
//         {/* <CosmicFlowBackground /> */}
        
//         {!shouldHideNavbar && <Navbar />}

//         <main className={shouldHideNavbar ? '' : 'pt-[var(--navbar-height,68px)]'}>
//           <Routes>
//             <Route path="/" element={<LandingPage />} />
//             <Route path="/contact" element={<ContactPage />} />
//             <Route path="/faq" element={<FAQPage />} />
//             <Route path="/adminregister" element={<AdminRegisterPage />} />
//             <Route path="/create-project" element={
//               <div className="min-h-[calc(100vh-var(--navbar-height,68px))] flex flex-col items-center justify-center p-4 relative">
//                 <MultiStepFormView />
//               </div>
//             } />
//             <Route path="/generating-roadmap" element={<GeneratingRoadmapPage />} />
//             <Route path="/project-pending-review/:projectId" element={<ProjectPendingReviewPage />} />
//             <Route path="/services/web-creation" element={<WebCreationPage />} />
//             <Route path="/services/content-generation" element={<ContentGenerationPage />} />
//             <Route path="/services/consultation" element={<ConsultationPage />} />
//             <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
//             <Route path="/email-verification" element={<EmailVerificationPage />} />
//             <Route path="/select-project" element={<SelectProject />} />
//             <Route path="/schedule-meet" element={<ScheduleMeetPage />} />
//             <Route path="/roadmap/:projectId" element={<RoadmapPage />} />
//             <Route path="/verify-email" element={<VerifyEmail />} />
//             <Route path="/plan" element={<Planpage />} />
//             <Route path="/call" element={<ScheduleMeetPage />} />
//             <Route path="/project" element={<SelectProject />} />
//             <Route path="/waiting-validation" element={<WaitingValidationPage />} />
//             <Route path="/login" element={
//               <ErrorBoundary>
//                 <LoginPage />
//               </ErrorBoundary>
//             } />
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/update-password/:token" element={<UpdatePasswordPage />} />

//             <Route
//               path="/admindashboard"
//               element={
//                 <ErrorBoundary>
//                   <AdminLayout />
//                 </ErrorBoundary>
//               }
//             >
//               <Route index element={<AdminDashboard />} />
//               <Route path="chats" element={<AdminChat />} />
//               <Route path="users" element={<AdminUsers />} />
//               {/* Project-specific detail and edit pages */}
//               <Route path="users/:userId/projects/:formDataId" element={<AdminUserDetail />} />
//               <Route path="users/:userId/projects/:formDataId/edit" element={<AdminUserDashboardEdit />} />
//               <Route path="appointments" element={<AdminAppointment />} />
//               <Route path="analytics" element={<AdminAnalytics />} />
//               <Route path="settings" element={<AdminSettings />} />
//             </Route>
//             <Route path="*" element={<Navigate to="/" />} />
//           </Routes>
//         </main>

//         <Toaster />
//       </div>
//     </FormProvider>
//   );
// };

// const App = () => (
//   <Router>
//     <AppWrapper />
//   </Router>
// );

// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { FormProvider } from '@/contexts/FormContext';
import ErrorBoundary from '@/components/ErrorBoundary';

import MultiStepFormView from '@/components/views/MultiStepFormView';
import LandingPage from '@/components/views/LandingPage';
import ContactPage from '@/components/views/ContactPage';
import FAQPage from '@/components/views/FAQPage';
import GeneratingRoadmapPage from '@/components/views/GeneratingRoadmapPage';
import ProjectPendingReviewPage from '@/components/views/ProjectPendingReviewPage';
import PaymentPage from '@/components/views/PaymentPage';
import WebCreationPage from '@/components/views/services/WebCreationPage';
import ContentGenerationPage from '@/components/views/services/ContentGenerationPage';
import ConsultationPage from '@/components/views/services/ConsultationPage';
import AdminRegisterPage from '@/components/views/AdminRegisterPage';
import VerifyEmail from '@/components/views/VerifyEmail';
import ScheduleMeetPage from '@/components/views/ScheduleMeetPage';
import RoadmapPage from '@/components/views/RoadmapPage';
import ResetPasswordPage from '@/components/views/ResetPasswordPage';
import EmailVerificationPage from '@/components/EmailVerification';
import SelectProject from '@/components/views/SelectProject';
import Planpage from '@/components/businesslogo/Planpage';
import WaitingValidationPage from '@/components/WaitingValidationPage';
import LoginPage from '@/components/views/LoginPage';
import AdminDashboard from '@/components/admin/AdminDashboard';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import AdminUsers from '@/components/admin/AdminUsers';
import AdminChat from '@/components/admin/AdminChat';
import AdminAnalytics from '@/components/admin/AdminAnalytics';
import AdminSettings from '@/components/admin/AdminSettings';
import Dashboard from '@/components/user/Dashboard';
import AdminUserDetail from '@/components/admin/user/AdminUserDetail';
import AdminUserDashboardEdit from '@/components/admin/user/AdminUserDashboardEdit';
import UpdatePasswordPage from '@/components/views/UpdatePasswordPage';
import AdminAppointment from '@/components/admin/AdminAppointment';
import { isJwtExpired } from '@/lib/utils';
import Guideline from './components/views/Guideline';

const AppWrapper = () => {
  const location = useLocation();

  // JWT expiry check
  React.useEffect(() => {
    const token = localStorage.getItem('bizwizusertoken');
    if (token && isJwtExpired(token)) {
      localStorage.removeItem('bizwizusertoken');
      localStorage.removeItem('bizzwiz-userRole');
      localStorage.removeItem('bizzwiz-userId');
      window.location.href = '/login';
    }
  }, [location]);

  return (
    <FormProvider>
      <div className="min-h-screen bg-black text-bizzwiz-text-primary font-space-grotesk selection:bg-bizzwiz-magenta-flare selection:text-bizzwiz-deep-space">
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/adminregister" element={<AdminRegisterPage />} />
            <Route path="/create-project" element={
              <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">
                <MultiStepFormView />
              </div>
            } />
            <Route path="/generating-roadmap" element={<GeneratingRoadmapPage />} />
            <Route path="/project-pending-review/:projectId" element={<ProjectPendingReviewPage />} />
            <Route path="/services/web-creation" element={<WebCreationPage />} />
            <Route path="/services/content-generation" element={<ContentGenerationPage />} />
            <Route path="/services/consultation" element={<ConsultationPage />} />
            <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
            <Route path="/email-verification" element={<EmailVerificationPage />} />
            <Route path="/select-project" element={<SelectProject />} />
            <Route path="/schedule-meet" element={<ScheduleMeetPage />} />
            <Route path="/roadmap/:projectId" element={<RoadmapPage />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/plan" element={<Planpage />} />
            <Route path="/call" element={<ScheduleMeetPage />} />
            <Route path="/project" element={<SelectProject />} />
            <Route path="/guide" element={<Guideline />} />
            <Route path="/waiting-validation" element={<WaitingValidationPage />} />
            <Route path="/login" element={
              <ErrorBoundary>
                <LoginPage />
              </ErrorBoundary>
            } />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/update-password/:token" element={<UpdatePasswordPage />} />
            <Route
              path="/admindashboard"
              element={
                <ErrorBoundary>
                  <AdminLayout />
                </ErrorBoundary>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="chats" element={<AdminChat />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="users/:userId/projects/:formDataId" element={<AdminUserDetail />} />
              <Route path="users/:userId/projects/:formDataId/edit" element={<AdminUserDashboardEdit />} />
              <Route path="appointments" element={<AdminAppointment />} />
              <Route path="analytics" element={<AdminAnalytics />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Toaster />
      </div>
    </FormProvider>
  );
};

const App = () => (
  <Router>
    <AppWrapper />
  </Router>
);

export default App;
