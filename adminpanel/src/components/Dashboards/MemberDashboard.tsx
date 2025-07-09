import React from 'react';
import { motion } from 'framer-motion';
import ProjectOverview from '../UI/ProjectOverview';

const MemberDashboard: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard Membre - VINEL</h1>
          <p className="text-gray-600 mt-1">Mes tâches et projets assignés</p>
        </div>
      </div>

      <ProjectOverview userRole="member" />
    </motion.div>
  );
};

export default MemberDashboard;