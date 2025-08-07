import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Trash2, Play, Pause, CheckCircle, Clock, DollarSign, Palette, Users, ListChecks, Target as TargetIcon } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const DetailItem = ({ icon: Icon, label, value, className = "" }) => (
  <div className={`flex items-start space-x-3 p-3 rounded-lg bg-white/5 ${className}`}>
    <Icon size={20} className="text-purple-400 mt-1" />
    <div>
      <p className="text-sm text-gray-400">{label}</p>
      <p className="text-md font-medium text-gray-200">{value || 'Non spécifié'}</p>
    </div>
  </div>
);

const ProjectDetailView = ({ project, onBack, onSetProjects, projects }) => {
  if (!project) {
    return (
      <div className="text-center p-10">
        <h2 className="text-2xl font-semibold text-gray-400">Projet non trouvé.</h2>
        <Button onClick={onBack} className="mt-4">Retour</Button>
      </div>
    );
  }

  const handleDeleteProject = () => {
    onSetProjects(projects.filter(p => p.id !== project.id));
    toast({
      title: "🗑️ Projet Supprimé",
      description: `Le projet "${project.title}" a été supprimé.`,
      variant: "destructive"
    });
    onBack();
  };
  
  const handleNotImplemented = () => {
    toast({
      title: "🚧 Fonctionnalité en cours de développement",
      description: "Cette action n'est pas encore implémentée. Revenez bientôt ! 🚀",
    });
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case 'En cours': return { text: 'En cours', color: 'text-blue-400', Icon: Play };
      case 'Terminé': return { text: 'Terminé', color: 'text-green-400', Icon: CheckCircle };
      case 'En pause': return { text: 'En pause', color: 'text-yellow-400', Icon: Pause };
      case 'En attente de maquette': return { text: 'En attente de maquette', color: 'text-purple-400', Icon: Clock };
      default: return { text: status, color: 'text-gray-400', Icon: Clock };
    }
  };
  const statusInfo = getStatusInfo(project.status);


  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4, ease: "circOut" }}
      className="space-y-8 p-1"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Button onClick={onBack} variant="outline" className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10">
          <ArrowLeft size={18} className="mr-2" />
          Retour aux projets
        </Button>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={handleNotImplemented} className="border-gray-600 hover:border-purple-400 text-gray-300 hover:text-purple-300">
            <Edit size={16} className="mr-2" /> Modifier
          </Button>
          <Button variant="destructive" onClick={handleDeleteProject} className="bg-red-700/80 hover:bg-red-600">
            <Trash2 size={16} className="mr-2" /> Supprimer
          </Button>
        </div>
      </div>

      <div className="bg-[#141419]/80 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-2xl border border-purple-500/20">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-6 border-b border-gray-700/50">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-100 mb-1">{project.title}</h1>
            <div className="flex items-center">
              <statusInfo.Icon size={20} className={`mr-2 ${statusInfo.color}`} />
              <p className={`text-lg font-medium ${statusInfo.color}`}>{statusInfo.text}</p>
            </div>
          </div>
          <div className="mt-4 sm:mt-0 text-right">
            <p className="text-sm text-gray-500">Dernière activité</p>
            <p className="text-gray-300">{project.lastActivity}</p>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-purple-300 mb-3">Description du Projet</h2>
          <p className="text-gray-300 leading-relaxed whitespace-pre-line">
            {project.description || "Aucune description fournie pour ce projet."}
          </p>
        </div>

        {project.mission && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-purple-300 mb-3">Mission du Projet</h2>
            <DetailItem icon={TargetIcon} label="Mission" value={project.mission} className="bg-purple-500/10 border border-purple-500/20"/>
          </div>
        )}

        <h2 className="text-xl font-semibold text-purple-300 mb-4">Détails Complémentaires</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {project.solutionType && <DetailItem icon={Play} label="Type de Solution" value={project.solutionType} />}
          {project.appType && <DetailItem icon={Play} label="Type d'Application" value={project.appType} />}
          {project.projectType && <DetailItem icon={Play} label="Type de Projet (IA Gen)" value={project.projectType} />}
          {project.audience && <DetailItem icon={Users} label="Audience Cible" value={project.audience} />}
          {project.visualStyle && <DetailItem icon={Palette} label="Style Visuel" value={project.visualStyle} />}
          {project.designStyle && <DetailItem icon={Palette} label="Style de Design (IA Gen)" value={project.designStyle} />}
          {project.timing && <DetailItem icon={Clock} label="Timing" value={project.timing} />}
          {project.budget && <DetailItem icon={DollarSign} label="Budget" value={project.budget} />}
        </div>

        {project.features && project.features.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-purple-300 mb-3">Fonctionnalités Clés</h2>
            <div className="flex flex-wrap gap-3">
              {project.features.map(feature => (
                <div key={feature} className="flex items-center bg-white/10 px-3 py-1.5 rounded-full text-sm text-purple-300">
                  <ListChecks size={16} className="mr-2 opacity-70" />
                  {feature.split(/(?=[A-Z])/).join(" ") } {/* Format camelCase to readable */}
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-8 pt-6 border-t border-gray-700/50">
            <h3 className="text-lg font-semibold text-gray-300 mb-3">Progression du projet</h3>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div 
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-2.5 rounded-full transition-all duration-500 ease-out" 
                    style={{width: `${project.progress || 0}%`}}
                ></div>
            </div>
            <p className="text-right text-sm text-gray-400 mt-1">{project.progress || 0}% complété</p>
        </div>

      </div>
    </motion.div>
  );
};

export default ProjectDetailView;