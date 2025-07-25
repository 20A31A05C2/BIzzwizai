import React, { useState, useEffect } from 'react';
import { FolderOpen, ChevronRight, Users, Calendar } from 'lucide-react';
import ApiService from '@/apiService';
import { toast } from '@/components/ui/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function Projects({ setSelectedProject, setActiveSection }) {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      const userId = localStorage.getItem('bizzwiz-userId');
      const selectedProjectId = localStorage.getItem('bizzwiz-selectedProjectId');

      if (!userId) {
        setError('Utilisateur non identifié.');
        setIsLoading(false);
        return;
      }

      try {
        const response = await ApiService(`/form-data/user/${userId}`, 'GET');
        if (response.success) {
          const fetchedProjects = response.data.map(project => ({
            id: project.id,
            name: project.project_name || 'Projet sans nom',
            description: project.project_description || 'Aucune description',
            category: project.solution_type || 'Non spécifié',
            progress: project.project ? (project.project.progress || 0) : 0,
            team: project.team || 'Équipe non assignée',
            createdAt: project.project && project.project.created_at 
              ? project.project.created_at 
              : project.created_at || new Date().toISOString(),
              budget: project.project?.budget 
              ? `€${project.project.budget}` 
              : project.budget 
                ? `€${project.budget}` 
                : 'Non défini',
            
            status: project.project && project.project.status 
              ? project.project.status 
              : (project.status || 'pending'),
          }));
          setProjects(fetchedProjects);
          if (selectedProjectId) {
            const selected = fetchedProjects.find(p => p.id === parseInt(selectedProjectId));
            if (selected) {
              setSelectedProject(selected);
            }
          }
        } else {
          throw new Error(response.message || 'Échec du chargement des projets.');
        }
      } catch (error) {
        setError(error.message || 'Impossible de charger les projets.');
        toast({
          title: 'Erreur',
          description: error.message || 'Impossible de charger les projets.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, [setSelectedProject]);

  if (isLoading) {
    return (
      <div className="flex-1 p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.4 }}
      className="flex-1 p-4 sm:p-6 md:p-8"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 sm:mb-12 gap-2 sm:gap-0">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-light text-white mb-2 sm:mb-4 tracking-wide">Le Vaisseau</h1>
            <p className="text-white/60 font-light text-sm sm:text-base">Gérer et suivre vos projets</p>
          </div>
        </div>
        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-400 text-center">{error}</p>
          </div>
        )}
        {projects.length === 0 && !error && (
          <div className="text-center text-white/60">
            Aucun projet trouvé. Créez un nouveau projet pour commencer.
          </div>
        )}
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          <AnimatePresence>
            {projects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.3, delay: idx * 0.07 }}
                whileHover={{ scale: 1.02, boxShadow: '0 8px 32px 0 rgba(88,101,242,0.15)' }}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 via-cyan-500/20 to-purple-600/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div
                  onClick={() => {
                    const selectedProjectId = localStorage.getItem('bizzwiz-selectedProjectId');
                    if (String(project.id) === String(selectedProjectId)) {
                      // If already selected, just update dashboard
                      localStorage.setItem('bizzwiz-selectedProjectId', project.id);
                      setSelectedProject(project);
                      setActiveSection('project-details');
                    } else {
                      // If not, redirect to select-project page
                      navigate('/select-project');
                    }
                  }}
                  className="relative bg-[#000011] rounded-3xl p-6 sm:p-8 group-hover:shadow-2xl group-hover:shadow-purple-500/10 transition-all duration-500 cursor-pointer"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4 md:mb-6 gap-2 md:gap-0">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-light text-white tracking-wide">{project.name}</h3>
                        <div className="px-3 py-1 bg-green-500/10 rounded-full">
                          <span className="text-green-400 text-xs sm:text-sm font-light">
                            {project.status === 'payment_done' ? 'Payé' : 
                             project.status === 'pending' ? 'En attente' :
                             project.status === 'completed' ? 'Terminé' :
                             project.status === 'rejected' ? 'Rejeté' :
                             project.status === 'active' ? 'Actif' : project.status}
                          </span>
                        </div>
                      </div>
                      <p className="text-white/60 text-xs sm:text-sm font-light">{project.category}</p>
                    </div>
                    <ChevronRight className="w-6 h-6 text-white/40 group-hover:text-white/70 transition-colors duration-300" />
                  </div>
                  <p className="text-white/50 text-xs sm:text-sm font-light mb-4 md:mb-6 leading-relaxed">{project.description}</p>
                  <div className="mb-4 md:mb-6">
                    <div className="flex items-center justify-between mb-2 md:mb-3">
                      <span className="text-white/70 font-light text-xs sm:text-sm">Progression</span>
                      <span className="text-purple-400 font-light text-xs sm:text-sm">{project.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full transition-all duration-1000"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm gap-2 sm:gap-0">
                    <div className="flex items-center space-x-4 sm:space-x-6">
                      {/* <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-white/40" />
                        <span className="text-white/60 font-light">{project.team}</span>
                      </div> */}
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-white/40" />
                        <span className="text-white/60 font-light">{new Date(project.createdAt).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>
                    <span className="text-purple-400 font-light">{project.budget}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export default Projects;