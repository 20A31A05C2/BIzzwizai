import React, { useState, useEffect } from 'react';
import { FolderOpen, ChevronRight, Users, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ApiService from '@/apiService';
import { toast } from '@/components/ui/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function Projects({ setSelectedProject, setActiveSection }) {
  const { t } = useTranslation();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      const userId = localStorage.getItem('bizzwiz-userId');
      const selectedProjectId = localStorage.getItem('bizzwiz-selectedProjectId');

      if (!userId) {
        setError(t('projects.error.noUser'));
        setIsLoading(false);
        return;
      }

      try {
        const response = await ApiService(`/form-data/user/${userId}`, 'GET');
        if (response.success) {
          const fetchedProjects = response.data.map(project => ({
            id: project.id,
            name: project.project_name || t('projects.labels.noName'),
            description: project.project_description || t('projects.labels.noDescription'),
            category: project.solution_type || t('projects.labels.category'),
            progress: project.project ? (project.project.progress || 0) : 0,
            team: project.team || t('projects.labels.noTeam'),
            createdAt: project.project && project.project.created_at 
              ? project.project.created_at 
              : project.created_at || new Date().toISOString(),
            budget: project.project?.budget 
              ? `€${project.project.budget}` 
              : project.budget 
                ? `€${project.budget}` 
                : t('projects.labels.noBudget'),
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
          throw new Error(response.message || t('projects.error.fetchFailed'));
        }
      } catch (error) {
        setError(error.message || t('projects.error.fetchFailed'));
        toast({
          title: t('projects.toast.error.title'),
          description: error.message || t('projects.toast.error.description'),
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, [setSelectedProject, t]);

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-[calc(100vh-var(--navbar-height,68px))] bg-black flex items-center justify-center p-4 sm:p-6 md:p-8"
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          <p className="text-gray-300 text-lg font-medium font-montserrat">{t('projects.loading')}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-[calc(100vh-var(--navbar-height,68px))] bg-black flex items-center justify-center p-4 sm:p-6 md:p-8"
    >
      <div className="max-w-7xl w-full bg-white/10 backdrop-blur-3xl rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8 md:p-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 sm:mb-12 gap-4 sm:gap-0">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-3 font-montserrat">{t('projects.title')}</h1>
            <p className="text-gray-300 text-base sm:text-lg font-medium font-montserrat">{t('projects.description')}</p>
          </div>
        </div>
        {error && (
          <div className="mb-8 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-red-500/30">
            <p className="text-red-400 text-center text-base font-medium font-montserrat">{error}</p>
          </div>
        )}
        {projects.length === 0 && !error && (
          <div className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <p className="text-gray-300 text-base font-medium font-montserrat">{t('projects.noProjects')}</p>
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
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-lg border border-white/20 p-6 hover:border-white/40 hover:shadow-lg hover:shadow-white/20 transition-all duration-300 cursor-pointer"
                onClick={() => {
                  const selectedProjectId = localStorage.getItem('bizzwiz-selectedProjectId');
                  if (String(project.id) === String(selectedProjectId)) {
                    localStorage.setItem('bizzwiz-selectedProjectId', project.id);
                    setSelectedProject(project);
                    setActiveSection('project-details');
                  } else {
                    navigate('/select-project');
                  }
                }}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6 gap-4 md:gap-0">
                  <div>
                    <div className="flex items-center space-x-3 mb-3">
                      <FolderOpen className="w-6 h-6 text-purple-300" />
                      <h3 className="text-xl sm:text-2xl font-semibold text-white font-montserrat">{project.name}</h3>
                    </div>
                    <div className="px-4 py-2 bg-green-600/20 rounded-xl border border-green-500/30">
                      <span className="text-green-300 text-sm font-medium font-montserrat">
                        {t(`projects.status.${project.status}`) || t('projects.status.default')}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm font-medium font-montserrat mt-2">{project.category}</p>
                  </div>
                  <ChevronRight className="w-6 h-6 text-gray-300 hover:text-white transition-colors duration-300" />
                </div>
                <p className="text-gray-200 text-sm font-medium font-montserrat mb-6 leading-relaxed line-clamp-3">{project.description}</p>
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300 text-sm font-medium font-montserrat">{t('projects.labels.progress')}</span>
                    <span className="text-purple-300 text-sm font-medium font-montserrat">{project.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 rounded-full transition-all duration-1000 relative"
                      style={{ width: `${project.progress}%` }}
                    >
                      <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm gap-4 sm:gap-0">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5 text-gray-300" />
                      <span className="text-gray-200 font-medium font-montserrat">{new Date(project.createdAt).toLocaleDateString('en-US', { localeMatcher: 'best fit' })}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-gray-300" />
                      <span className="text-gray-200 font-medium font-montserrat">{project.team}</span>
                    </div>
                  </div>
                  <span className="text-purple-300 font-medium font-montserrat">{project.budget}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
        .hover\:scale-102:hover {
          transform: scale(1.02);
        }
        .hover\:scale-105:hover {
          transform: scale(1.05);
        }
        .active\:scale-95:active {
          transform: scale(0.95);
        }
        .font-montserrat {
          font-family: 'Montserrat', sans-serif;
        }
      `}</style>
    </motion.div>
  );
}

export default Projects;