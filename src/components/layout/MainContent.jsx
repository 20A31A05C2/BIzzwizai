import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import DashboardView from '@/components/views/DashboardView';
import ProjectDetailView from '@/components/views/ProjectDetailView';
import AllProjectsView from '@/components/views/AllProjectsView';
import PlaceholderView from '@/components/views/PlaceholderView';
import AIGenerationFormView from '@/components/views/AIGenerationFormView';
import MultiStepFormView from '@/components/views/MultiStepFormView';
import { sidebarItems } from '@/components/layout/Sidebar';

const MainContent = ({ 
  activeSection, 
  projects, 
  selectedProject, 
  onProjectAccess, 
  onSetSelectedProject,
  onSetActiveSection,
  onSetProjects,
  onCreateNewProjectFlow,
  onSubmitAIGenerationForm,
  onSubmitMultiStepForm
}) => {

  const renderView = () => {
    if (selectedProject && activeSection === 'projectDetail') {
      return (
        <ProjectDetailView 
          project={selectedProject} 
          onBack={() => { onSetSelectedProject(null); onSetActiveSection('projets'); }} 
          onSetProjects={onSetProjects}
          projects={projects}
        />
      );
    }

    switch(activeSection) {
      case 'dashboard':
        return (
          <DashboardView 
            projects={projects} 
            onProjectAccess={onProjectAccess} 
            onCreateNewProjectFlow={onCreateNewProjectFlow}
            onSetProjects={onSetProjects}
          />
        );
      case 'projets':
        return (
          <AllProjectsView
            projects={projects}
            onProjectAccess={onProjectAccess}
          />
        );
      case 'aiGenerationForm': 
        return (
          <AIGenerationFormView onSubmit={onSubmitAIGenerationForm} />
        );
      case 'multiStepForm':
        return (
          <MultiStepFormView onSubmit={onSubmitMultiStepForm} />
        );
      default:
        const currentItem = sidebarItems.find(item => item.id === activeSection);
        return (
          <PlaceholderView 
            title={currentItem?.label || "Section en cours"} 
            icon={currentItem?.icon}
          />
        );
    }
  };

  return (
    <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-auto bg-[#0e0e0e] relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-[#8f4fff]/10 via-transparent to-transparent pointer-events-none -translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-[#12c2e9]/5 via-transparent to-transparent pointer-events-none translate-x-1/3 translate-y-1/3"></div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="relative z-10" 
        >
          {renderView()}
        </motion.div>
      </AnimatePresence>
    </main>
  );
};

export default MainContent;