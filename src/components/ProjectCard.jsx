import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Edit2, Trash2, Play, Pause, CheckCircle, Clock } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const ProjectCard = ({ project, onAccess, onSetProjects, projects }) => {
  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case 'En cours': return { text: 'En cours', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', Icon: Play };
      case 'Terminé': return { text: 'Terminé', color: 'bg-green-500/20 text-green-400 border-green-500/30', Icon: CheckCircle };
      case 'En pause': return { text: 'En pause', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', Icon: Pause };
      case 'En attente de maquette': return { text: 'En attente', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30', Icon: Clock };
      default: return { text: status, color: 'bg-gray-500/20 text-gray-400 border-gray-500/30', Icon: Clock };
    }
  };

  const statusInfo = getStatusInfo(project.status);

  const handleDelete = (e) => {
    e.stopPropagation();
    onSetProjects(projects.filter(p => p.id !== project.id));
    toast({
      title: "🗑️ Projet Supprimé",
      description: `Le projet "${project.title}" a été supprimé.`,
      variant: "destructive"
    });
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    toast({
      title: "🚧 Fonctionnalité en cours",
      description: "La modification de projet sera bientôt disponible ! 🚀",
    });
  };


  return (
    <motion.div
      variants={cardVariants}
      className="project-card bg-[#1f1f2f]/80 backdrop-blur-md rounded-xl overflow-hidden shadow-lg border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 ease-in-out group"
      onClick={onAccess}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && onAccess()}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold text-gray-100 group-hover:text-purple-300 transition-colors">{project.title}</h3>
          <div className={`status-badge px-3 py-1 text-xs font-medium rounded-full border ${statusInfo.color} flex items-center`}>
            <statusInfo.Icon size={14} className="mr-1.5" />
            {statusInfo.text}
          </div>
        </div>
        
        <p className="text-sm text-gray-400 mb-1 h-10 overflow-hidden">
          {project.description ? (project.description.length > 80 ? project.description.substring(0, 80) + "..." : project.description) : "Pas de description"}
        </p>

        <div className="mt-4 mb-5">
            <p className="text-xs text-gray-500 mb-0.5">Progression</p>
            <div className="w-full bg-gray-700/50 rounded-full h-2">
                <div 
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500 ease-out" 
                    style={{width: `${project.progress || 0}%`}}
                ></div>
            </div>
        </div>

        <div className="text-xs text-gray-500 mb-4">
          Dernière activité : {project.lastActivity}
        </div>
      </div>
      
      <div className="bg-black/20 px-6 py-3 flex justify-between items-center border-t border-purple-500/10">
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" onClick={handleEdit} className="text-gray-400 hover:text-purple-400 hover:bg-purple-500/10 h-8 w-8">
            <Edit2 size={16} />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleDelete} className="text-gray-400 hover:text-red-400 hover:bg-red-500/10 h-8 w-8">
            <Trash2 size={16} />
          </Button>
        </div>
        <Button 
          variant="link" 
          onClick={onAccess} 
          className="text-purple-400 hover:text-purple-300 px-0 group-hover:translate-x-1 transition-transform"
        >
          Accéder au projet <ArrowRight size={16} className="ml-1.5" />
        </Button>
      </div>
      <div className="h-1 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </motion.div>
  );
};

export default ProjectCard;