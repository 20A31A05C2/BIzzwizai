import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { sidebarItems } from '@/components/layout/Sidebar';

const Header = ({ activeSection, selectedProject }) => {
  const getSectionLabel = () => {
    if (selectedProject && activeSection === 'projectDetail') {
      return (
        <>
          <span className="text-bizzwiz-comet-tail/80">Mes Projets</span>
          <ChevronRight size={20} className="mx-1 text-bizzwiz-comet-tail/60" />
          <span>{selectedProject.title}</span>
        </>
      );
    }
    const item = sidebarItems.find(i => i.id === activeSection);
    return item ? item.label : "BizzWiz AI";
  };

  // Retrieve username from localStorage (adjust key if different)
  const username = localStorage.getItem('bizzwiz-username') || 'Utilisateur';

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'circOut' }}
      className="bg-bizzwiz-deep-space/80 backdrop-blur-xl h-[var(--header-height,72px)] flex items-center justify-between px-6 md:px-8 border-b border-[#8f00ff]/20 shadow-md sticky top-0 z-20"
    >
      {/* <h1 className="text-lg md:text-xl font-satoshi font-semibold text-[#8f00ff] flex items-center">
        {getSectionLabel()}
      </h1> */}
      <div className="flex items-center space-x-4 md:space-x-6">
        {/* Logout button removed */}
      </div>
    </motion.header>
  );
};

export default Header;