import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';
import { FolderKanban, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const AllProjectsView = ({ projects, onProjectAccess, onSetProjects }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07
      }
    }
  };

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row justify-between items-center gap-4 p-6 bg-[#141419]/70 backdrop-blur-sm rounded-xl shadow-lg border border-purple-500/20"
      >
        <div className="flex items-center">
          <FolderKanban size={32} className="mr-3 text-purple-400" />
          <h1 className="text-3xl font-bold text-gray-100">Tous Mes Projets</h1>
        </div>
        <div className="relative w-full md:w-auto">
          <Input 
            type="text"
            placeholder="Rechercher un projet..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full md:w-72 bg-gray-800/50 border-gray-700 text-gray-200 rounded-lg focus:border-purple-500 focus:ring-purple-500"
            icon={<Search size={18} className="text-gray-500" />}
          />
        </div>
      </motion.div>

      {filteredProjects.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredProjects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onAccess={() => onProjectAccess(project)}
              onSetProjects={onSetProjects}
              projects={projects}
            />
          ))}
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16 bg-[#141419]/50 rounded-lg border-2 border-dashed border-gray-700/50"
        >
          <Search size={56} className="mx-auto text-gray-600 mb-6" />
          <h3 className="text-2xl font-semibold text-gray-300 mb-3">Aucun projet trouvé</h3>
          <p className="text-gray-500">
            {searchTerm ? `Aucun projet ne correspond à "${searchTerm}". Essayez un autre terme.` : "Vous n'avez pas encore de projets. Créez-en un !"}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default AllProjectsView;