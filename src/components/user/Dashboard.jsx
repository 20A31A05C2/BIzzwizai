import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Cockpit from './Cockpit';
import Projects from './Projects';
import ProjectDetails from './ProjectDetails';
import WizStudio from './WizStudio';
import WizLearn from './WizLearn';
import Settings from './Settings';
import Chat from './Chat';
import Newproject from './Newproject';
import PaymentPage from '@/components/views/PaymentPage';
import Aipage from './AiPage';
import { project, userStats, badges, timelineEvents, chatMessages, notifications } from './data';
import ApiService from '@/apiService';
import { toast } from '@/components/ui/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

function Dashboard({ initialSection = 'cockpit' }) {
  const { t } = useTranslation();
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(initialSection);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [chatMinimized, setChatMinimized] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('Dashboard useEffect: Current path:', window.location.pathname);
    console.log('Active section:', activeSection);

    const token = localStorage.getItem('bizwizusertoken');
    const userRole = localStorage.getItem('bizzwiz-userRole');
    
    if (!token || userRole !== 'user') {
      console.warn('Authentication failed: Redirecting to /login');
      toast({
        title: t('dashboard.authError.title'),
        description: t('dashboard.authError.description'),
        variant: 'destructive',
      });
      navigate('/login');
      return;
    }
    
    if (window.location.pathname.includes('/ai-generated')) {
      console.log('Setting activeSection to ai-generated');
      setActiveSection('ai-generated');
    }

    setIsLoading(false);

    if (projectId) {
      const fetchProjectDetails = async () => {
        try {
          const response = await ApiService(`/user/project-cockpit/${projectId}`, 'GET');
          if (response.success) {
            setSelectedProject(response.data);
            setActiveSection('project-details');
          } else {
            throw new Error(response.message || t('dashboard.fetchProjectError.fallback'));
          }
        } catch (error) {
          console.error('Fetch project error:', error);
          toast({
            title: t('dashboard.fetchProjectError.title'),
            description: error.message || t('dashboard.fetchProjectError.description'),
            variant: 'destructive',
          });
        }
      };
      fetchProjectDetails();
    } else {
      const localProjectId = localStorage.getItem('bizzwiz-selectedProjectId');
      if (localProjectId) {
        const fetchProjectDetails = async () => {
          try {
            const response = await ApiService(`/user/project-cockpit/${localProjectId}`, 'GET');
            if (response.success) {
              setSelectedProject(response.data);
            }
          } catch (error) {
            console.error('Fetch project error:', error);
          }
        };
        fetchProjectDetails();
      }
    }
  }, [projectId, navigate, activeSection, t]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bizzwiz-electric-cyan"></div>
          <p className="text-bizzwiz-comet-tail">{t('dashboard.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-light">
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        selectedProject={selectedProject}
      />
      <motion.div
        key={activeSection}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.3 }}
        className="flex-1 min-w-0 w-full h-screen md:ml-72 overflow-y-auto bg-black"
      >
        <AnimatePresence mode="wait">
          {activeSection === 'cockpit' && (
            <Cockpit 
              project={project} 
              userStats={userStats} 
              badges={badges} 
              timelineEvents={timelineEvents} 
              notifications={notifications} 
              setSelectedProject={setSelectedProject}
              setActiveSection={setActiveSection}
              setShowChat={setShowChat}
            />
          )}
          {activeSection === 'projects' && (
            <Projects 
              project={project} 
              setSelectedProject={setSelectedProject} 
              setActiveSection={setActiveSection} 
            />
          )}
          {activeSection === 'project-details' && (
            <ProjectDetails 
              selectedProject={selectedProject} 
              setActiveSection={setActiveSection}
              setShowChat={setShowChat}
            />
          )}
          {activeSection === 'wiz-studio' && <WizStudio />}
          {activeSection === 'wiz-learn' && <WizLearn />}
          {activeSection === 'ai-generated' && <Aipage />}
          {activeSection === 'settings' && (
            <Settings 
              emailNotifications={emailNotifications}
              setEmailNotifications={setEmailNotifications}
              pushNotifications={pushNotifications}
              setPushNotifications={setPushNotifications}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          )}
          {activeSection === 'new-project' && <Newproject />}
          {activeSection === 'payment' && <PaymentPage />}
        </AnimatePresence>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: showChat ? 1 : 0, y: showChat ? 0 : 30 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-0 right-0 z-50 w-full md:w-[400px]"
        style={{ pointerEvents: showChat ? 'auto' : 'none' }}
      >
        <Chat 
          showChat={showChat}
          setShowChat={setShowChat}
          chatMinimized={chatMinimized}
          setChatMinimized={setChatMinimized}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          project={selectedProject}
          chatMessages={chatMessages}
        />
      </motion.div>
    </div>
  );
}

export default Dashboard;