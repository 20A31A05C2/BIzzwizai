// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
// import { Toaster } from '@/components/ui/toaster';
// import { FormProvider } from '@/contexts/FormContext';
// import MultiStepFormView from '@/components/views/MultiStepFormView';
// import LandingPage from '@/components/views/LandingPage';
// import ContactPage from '@/components/views/ContactPage';
// import FAQPage from '@/components/views/FAQPage';
// import Navbar from '@/components/layout/Navbar';
// import { motion } from 'framer-motion';
// import GeneratingRoadmapPage from '@/components/views/GeneratingRoadmapPage';
// import ProjectPendingReviewPage from '@/components/views/ProjectPendingReviewPage';
// import PaymentPage from '@/components/views/PaymentPage';
// import UserDashboardPage from '@/components/views/UserDashboardPage';
// import AdminDashboardPage from '@/components/admin/AdminLayout';
// import AdminUsersPage from '@/components/admin/AdminUsersPage';
// import AdminHomePage from '@/components/admin/AdminHomePage';
// import AdminProjectListPage from '@/components/admin/AdminProjectListPage';
// import LoginPage from '@/components/views/LoginPage';
// import MainDashboardLayout from '@/components/layout/MainDashboardLayout';
// import Newproject from '@/components/user/Newproject';
// import WebCreationPage from '@/components/views/services/WebCreationPage';
// import ContentGenerationPage from '@/components/views/services/ContentGenerationPage';
// import ConsultationPage from '@/components/views/services/ConsultationPage';
// import AdminRegisterPage from './components/views/AdminRegisterPage';
// import AdminSettingsPage from './components/admin/AdminSettingsPage';
// import AdminProjectDetailEditorPage from '@/components/admin/AdminProjectDetailEditorPage';
// import VerifyEmail from '@/components/views/VerifyEmail';
// import ProjectManagementPage from '@/components/views/ProjectManagementPage';
// import UserSettingsPage from '@/components/views/UserSettingsPage';
// import ScheduleMeetPage from '@/components/views/ScheduleMeetPage';
// import RoadmapPage from '@/components/views/RoadmapPage';
// import ScheduleListPage from '@/components/admin/ScheduleListPage';
// import ResetPasswordPage from '@/components/views/ResetPasswordPage';
// import UpdatePasswordPage from '@/components/views/UpdatePasswordPage';
// import EmailVerificationPage from '@/components/EmailVerification';

// const CosmicFlowBackground = () => {
//   const particles = Array.from({ length: 40 });
//   return (
//     <>
//       <div className="fixed inset-0 -z-30 bg-gradient-to-br from-bizzwiz-deep-space via-bizzwiz-nebula-purple/10 to-bizzwiz-deep-space animate-slow-gradient-move"></div>
//       <div className="cosmicflow-bg-elements">
//         {particles.map((_, i) => {
//           const size = Math.random() * 2.5 + 0.5;
//           const duration = Math.random() * 25 + 20;
//           const colors = ['bizzwiz-electric-cyan-rgb', 'bizzwiz-magenta-flare-rgb', 'bizzwiz-nebula-purple-rgb', 'bizzwiz-star-white-rgb'];
//           const colorVar = colors[Math.floor(Math.random() * colors.length)];
//           const opacity = Math.random() * 0.3 + 0.1;

//           return (
//             <motion.div
//               key={i}
//               className="particle"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//                 width: `${size}px`,
//                 height: `${size}px`,
//                 backgroundColor: `hsla(var(--${colorVar}), ${opacity})`,
//                 boxShadow: `0 0 ${Math.random() * 6 + size * 2}px hsla(var(--${colorVar}), ${opacity * 1.5})`,
//                 filter: `blur(${size < 1 ? 0.5 : 0}px)`
//               }}
//               animate={{
//                 x: [0, Math.random() * 150 - 75, Math.random() * -150 + 75, 0],
//                 y: [0, Math.random() * 150 - 75, Math.random() * -150 + 75, 0],
//                 scale: [1, Math.random() * 0.6 + 0.7, Math.random() * 0.6 + 0.7, 1],
//                 rotate: [0, Math.random() * 180 - 90, Math.random() * -180 + 90, 0],
//                 opacity: [opacity, opacity * 0.5, opacity * 1.2, opacity * 0.7, opacity],
//               }}
//               transition={{
//                 duration: duration,
//                 repeat: Infinity,
//                 repeatType: "mirror",
//                 ease: "easeInOut"
//               }}
//             />
//           );
//         })}
//       </div>
//     </>
//   );
// };

// const ProtectedRoute = ({ children, roleRequired }) => {
//   const currentUserRole = localStorage.getItem('bizzwiz-userRole');
//   const location = useLocation();

//   if (!currentUserRole || (roleRequired && currentUserRole !== roleRequired)) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }
//   return children;
// };

// const App = () => {
//   return (
//     <Router>
//       <FormProvider>
//         <div className="min-h-screen bg-bizzwiz-background text-bizzwiz-text-primary font-space-grotesk selection:bg-bizzwiz-magenta-flare selection:text-bizzwiz-deep-space">
//           <CosmicFlowBackground />
//           <Routes>
//             <Route path="/*" element={<AppLayoutRoutes />} />
//             <Route path="/app/*" element={
//               <ProtectedRoute roleRequired="user">
//                 <DashboardRoutes />
//               </ProtectedRoute>
//             } />
//             <Route path="/app-admin/*" element={
//               <ProtectedRoute roleRequired="admin">
//                 <AdminDashboardRoutes />
//               </ProtectedRoute>
//             } />
//           </Routes>
//           <Toaster />
//         </div>
//       </FormProvider>
//     </Router>
//   );
// };

// const AppLayoutRoutes = () => (
//   <>
//     <Navbar />
//     <main className="pt-[var(--navbar-height,68px)]">
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/contact" element={<ContactPage />} />
//         <Route path="/faq" element={<FAQPage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/adminregister" element={<AdminRegisterPage />} />
//         <Route path="/create-project" element={
//           <div className="min-h-[calc(100vh-var(--navbar-height,68px))] flex flex-col items-center justify-center p-4 relative">
//             <MultiStepFormView />
//           </div>
//         } />
//         <Route path="/generating-roadmap" element={<GeneratingRoadmapPage />} />
//         <Route path="/project-pending-review/:projectId" element={<ProjectPendingReviewPage />} />
//         <Route path="/payment/:projectId" element={<PaymentPage />} />
//         <Route path="/services/web-creation" element={<WebCreationPage />} />
//         <Route path="/services/content-generation" element={<ContentGenerationPage />} />
//         <Route path="/services/consultation" element={<ConsultationPage />} />
//         <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
//         <Route path="/email-verification" element={<EmailVerificationPage />} />
//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//     </main>
//   </>
// );

// const DashboardRoutes = () => (
//   <MainDashboardLayout>
//     <Routes>
//       <Route path="/dashboard" element={<UserDashboardPage />} />
//       <Route path="/dashboard-project/:projectId" element={<ProjectManagementPage />} />
//       <Route path="/newproject" element={<Newproject />} />
//       {/* <Route path="/payment" element={<PaymentPage />} /> */}
//       <Route path="/payment/:projectId" element={<PaymentPage />} />
//       <Route path="/schedule-meet" element={<ScheduleMeetPage />} />
//       <Route path="/roadmap" element={<RoadmapPage />} />
//       {/* <Route path="/dashboard-project/:projectId/roadmap" element={<RoadmapPage />} /> */}
//       <Route path="/dashboard-project/user-settings" element={<UserSettingsPage />} />
//       <Route path="*" element={<Navigate to="/app/dashboard" />} />
//     </Routes>
//   </MainDashboardLayout>
// );

// const AdminDashboardRoutes = () => (
//   <AdminDashboardPage>
//     <Routes>
//       <Route path="/accueil" element={<AdminHomePage />} />
//       <Route path="/users" element={<AdminUsersPage />} />
//       <Route path="/projets" element={<AdminProjectListPage />} />
//       <Route path="/projets/:id/edit" element={<AdminProjectDetailEditorPage />} />
//       <Route path="/schedule-list" element={<ScheduleListPage />} />
//       <Route path="/parametres" element={<AdminSettingsPage />} />
//       <Route path="/dashboard" element={<Navigate to="/app-admin/accueil" replace />} />
//       <Route path="*" element={<Navigate to="/app-admin/accueil" />} />
//     </Routes>
//   </AdminDashboardPage>
// );

// export default App;



import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { FormProvider } from '@/contexts/FormContext';
import MultiStepFormView from '@/components/views/MultiStepFormView';
import LandingPage from '@/components/views/LandingPage';
import ContactPage from '@/components/views/ContactPage';
import FAQPage from '@/components/views/FAQPage';
import Navbar from '@/components/layout/Navbar';
import { motion } from 'framer-motion';
import GeneratingRoadmapPage from '@/components/views/GeneratingRoadmapPage';
import ProjectPendingReviewPage from '@/components/views/ProjectPendingReviewPage';
import PaymentPage from '@/components/views/PaymentPage';
import UserDashboardPage from '@/components/views/UserDashboardPage';
import AdminDashboardPage from '@/components/admin/AdminLayout';
import AdminUsersPage from '@/components/admin/AdminUsersPage';
import AdminHomePage from '@/components/admin/AdminHomePage';
import AdminProjectListPage from '@/components/admin/AdminProjectListPage';
import LoginPage from '@/components/views/LoginPage';
import MainDashboardLayout from '@/components/layout/MainDashboardLayout';
import Newproject from '@/components/user/Newproject';
import WebCreationPage from '@/components/views/services/WebCreationPage';
import ContentGenerationPage from '@/components/views/services/ContentGenerationPage';
import ConsultationPage from '@/components/views/services/ConsultationPage';
import AdminRegisterPage from './components/views/AdminRegisterPage';
import AdminSettingsPage from './components/admin/AdminSettingsPage';
import AdminProjectDetailEditorPage from '@/components/admin/AdminProjectDetailEditorPage';
import VerifyEmail from '@/components/views/VerifyEmail';
import ProjectManagementPage from '@/components/views/ProjectManagementPage';
import UserSettingsPage from '@/components/views/UserSettingsPage';
import ScheduleMeetPage from '@/components/views/ScheduleMeetPage';
import RoadmapPage from '@/components/views/RoadmapPage';
import ScheduleListPage from '@/components/admin/ScheduleListPage';
import ResetPasswordPage from '@/components/views/ResetPasswordPage';
import UpdatePasswordPage from '@/components/views/UpdatePasswordPage';
import EmailVerificationPage from '@/components/EmailVerification';
import SelectProject from '@/components/views/SelectProject';

const CosmicFlowBackground = () => {
  const particles = Array.from({ length: 40 });
  return (
    <>
      <div className="fixed inset-0 -z-30 bg-gradient-to-br from-bizzwiz-deep-space via-bizzwiz-nebula-purple/10 to-bizzwiz-deep-space animate-slow-gradient-move"></div>
      <div className="cosmicflow-bg-elements">
        {particles.map((_, i) => {
          const size = Math.random() * 2.5 + 0.5;
          const duration = Math.random() * 25 + 20;
          const colors = ['bizzwiz-electric-cyan-rgb', 'bizzwiz-magenta-flare-rgb', 'bizzwiz-nebula-purple-rgb', 'bizzwiz-star-white-rgb'];
          const colorVar = colors[Math.floor(Math.random() * colors.length)];
          const opacity = Math.random() * 0.3 + 0.1;

          return (
            <motion.div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: `hsla(var(--${colorVar}), ${opacity})`,
                boxShadow: `0 0 ${Math.random() * 6 + size * 2}px hsla(var(--${colorVar}), ${opacity * 1.5})`,
                filter: `blur(${size < 1 ? 0.5 : 0}px)`
              }}
              animate={{
                x: [0, Math.random() * 150 - 75, Math.random() * -150 + 75, 0],
                y: [0, Math.random() * 150 - 75, Math.random() * -150 + 75, 0],
                scale: [1, Math.random() * 0.6 + 0.7, Math.random() * 0.6 + 0.7, 1],
                rotate: [0, Math.random() * 180 - 90, Math.random() * -180 + 90, 0],
                opacity: [opacity, opacity * 0.5, opacity * 1.2, opacity * 0.7, opacity],
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut"
              }}
            />
          );
        })}
      </div>
    </>
  );
};

const ProtectedRoute = ({ children, roleRequired }) => {
  const currentUserRole = localStorage.getItem('bizzwiz-userRole');
  const location = useLocation();

  if (!currentUserRole || (roleRequired && currentUserRole !== roleRequired)) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

const App = () => {
  return (
    <Router>
      <FormProvider>
        <div className="min-h-screen bg-bizzwiz-background text-bizzwiz-text-primary font-space-grotesk selection:bg-bizzwiz-magenta-flare selection:text-bizzwiz-deep-space">
          <CosmicFlowBackground />
          <Routes>
            <Route path="/*" element={<AppLayoutRoutes />} />
            <Route
              path="/app/*"
              element={
                <ProtectedRoute roleRequired="user">
                  <UserAppRoutes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/app-admin/*"
              element={
                <ProtectedRoute roleRequired="admin">
                  <AdminDashboardRoutes />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Toaster />
        </div>
      </FormProvider>
    </Router>
  );
};

const AppLayoutRoutes = () => (
  <>
    <Navbar />
    <main className="pt-[var(--navbar-height,68px)]">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/adminregister" element={<AdminRegisterPage />} />
        <Route path="/create-project" element={
          <div className="min-h-[calc(100vh-var(--navbar-height,68px))] flex flex-col items-center justify-center p-4 relative">
            <MultiStepFormView />
          </div>
        } />
        <Route path="/generating-roadmap" element={<GeneratingRoadmapPage />} />
        <Route path="/project-pending-review/:projectId" element={<ProjectPendingReviewPage />} />
        <Route path="/payment/:projectId" element={<PaymentPage />} />
        <Route path="/services/web-creation" element={<WebCreationPage />} />
        <Route path="/services/content-generation" element={<ContentGenerationPage />} />
        <Route path="/services/consultation" element={<ConsultationPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/email-verification" element={<EmailVerificationPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </main>
  </>
);

// NEW: Separate user app routes - SelectProject standalone, others in dashboard layout
const UserAppRoutes = () => (
  <Routes>

    {/* Standalone SelectProject page (no layout) */}
    <Route path="/select-project" element={<SelectProject />} /> 
    {/* Dashboard routes (with MainDashboardLayout) */}
    <Route path="/dashboard/*" element={<DashboardRoutes />} />
    {/* Default redirect */}
    <Route path="*" element={<Navigate to="/app/select-project" />} />
    
  </Routes>
);


{/* Main Dashboard Routes - MainDashboardLayout layout */}
const DashboardRoutes = () => (
  <MainDashboardLayout>
    <Routes>

      {/* shows user project */}
      <Route path="/mesprojet/:form_data_id" element={<ProjectManagementPage />} />
      {/* Specific Project Dashboard Page */}
      <Route path="/project/:form_data_id" element={<UserDashboardPage />} />
      {/* For newproject route */}
      <Route path="/newproject" element={<Newproject />} />
      {/* Payment page for specific project */}
      <Route path="/payment/:projectId" element={<PaymentPage />} />
      {/* Schedule Meet page */}
      <Route path="/schedule-meet" element={<ScheduleMeetPage />} />
      {/* Roadmap page */}
      {/* <Route path="/roadmap" element={<RoadmapPage />} /> */}
      <Route path="/roadmap/:projectId" element={<RoadmapPage />} />
      {/* User Settings page */}
      <Route path="/settings" element={<UserSettingsPage />} />
      {/* Default redirect to select project if no specific route */}
      <Route path="*" element={<Navigate to="/app/select-project" />} />

    </Routes>
  </MainDashboardLayout>
);


{/* Admin Dashboard Routes - AdminDashboardPage layout */}
const AdminDashboardRoutes = () => (
  <AdminDashboardPage>
    <Routes>
      {/* Admin Home Page */}
      <Route path="/accueil" element={<AdminHomePage />} />
      {/* Admin Users Page */}
      <Route path="/users" element={<AdminUsersPage />} />
      {/* Admin Project List Page */}
      <Route path="/projets" element={<AdminProjectListPage />} />
      {/* Admin Project Detail Editor Page */}
      <Route path="/projets/:id/edit" element={<AdminProjectDetailEditorPage />} />
      {/* Admin Schedule List Page */}
      <Route path="/schedule-list" element={<ScheduleListPage />} />
      {/* Admin Settings Page */}
      <Route path="/parametres" element={<AdminSettingsPage />} />
      {/* Redirect to Admin Home on /dashboard */}
      <Route path="/dashboard" element={<Navigate to="/app-admin/accueil" replace />} />
      {/* Default redirect to Admin Home */}
      <Route path="*" element={<Navigate to="/app-admin/accueil" />} />

    </Routes>
  </AdminDashboardPage>
);

export default App;