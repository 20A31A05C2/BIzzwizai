import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { FormProvider } from '@/contexts/FormContext';
import ErrorBoundary from '@/components/ErrorBoundary';

import MultiStepFormView from '@/components/views/MultiStepFormView';
import LandingPage from '@/components/views/LandingPage';
import ContactPage from '@/components/views/ContactPage';
import FAQPage from '@/components/views/FAQPage';
import DocumentationPage from '@/components/views/DocumentationPage';
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
import RegisterPage from '@/components/views/RegisterPage';
import SloganGeneration from './components/businesslogo/SloganGeneration';
import BusinessPlan from './components/businesslogo/BusinessPlan';
import LogoGeneration from './components/businesslogo/LogoGeneration';
import DesignSelection from './components/businesslogo/DesignSelection';
import Creditspurchase from './components/views/Creditpurchase';
import FontSelection from './components/businesslogo/FontSelection';
import VisualIdentityConfirmation from './components/businesslogo/VisualIdentityConfirmation';

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
            <Route path="/documentation" element={<DocumentationPage />} />
            <Route path="/register" element={<RegisterPage />} />
{/*             <Route path="/adminregister" element={<AdminRegisterPage />} /> */}
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
            <Route path="/plan" element={<BusinessPlan />} />
            <Route path="/logo" element={<LogoGeneration />} />
            <Route path="/design" element={<DesignSelection />} />
            <Route path="/font" element={<FontSelection />} />
            <Route path="/slogan" element={<SloganGeneration />} />
            <Route path="/call" element={<ScheduleMeetPage />} />
            <Route path="/purchase" element={<Creditspurchase />} />
            <Route path="/project" element={<SelectProject />} />
            <Route path="/waiting-validation" element={<WaitingValidationPage />} />
            <Route path="/verified" element={<VisualIdentityConfirmation />} />
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
