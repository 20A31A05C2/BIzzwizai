// import React, { useState, useEffect, useCallback } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { toast } from '@/components/ui/use-toast';
// import ApiService from '@/apiService';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Button } from '@/components/ui/button';
// import { 
//   RefreshCw, 
//   ExternalLink, 
//   Trash2, 
//   Calendar, 
//   Building2, 
//   Target, 
//   Users, 
//   DollarSign,
//   FileText,
//   ChevronRight,
//   Plus,
//   Search
// } from 'lucide-react';
// import { statusOptions } from '@/utils/constants';

// const ProjectManagementPage = () => {
//   const { projectId } = useParams();
//   const navigate = useNavigate();
//   const [projects, setProjects] = useState([]);
//   const [selectedProject, setSelectedProject] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');

//   const getStatusLabel = (statusValue) => {
//     const normalized = statusValue?.toLowerCase().trim();
//     const match = statusOptions.find(s => s.value === normalized && s.value !== 'all');
//     return match ? match.label : statusValue || 'Pending';
//   };

//   const getStatusColor = (status) => {
//     const normalized = status?.toLowerCase().trim();
//     switch (normalized) {
//       case 'completed': return 'text-green-400 bg-green-400/20';
//       case 'in_progress': return 'text-blue-400 bg-blue-400/20';
//       case 'pending': return 'text-yellow-400 bg-yellow-400/20';
//       case 'cancelled': return 'text-red-400 bg-red-400/20';
//       default: return 'text-gray-400 bg-gray-400/20';
//     }
//   };

//   const fetchUserProjects = useCallback(async () => {
//     setLoading(true);
//     try {
//       const response = await ApiService('/user-projects', 'GET');
//       if (response.success) {
//         setProjects(response.data);
//         if (projectId) {
//           const project = response.data.find(p => p.id === parseInt(projectId));
//           setSelectedProject(project || null);
//           if (!project) {
//             navigate('/app/dashboard');
//             toast({ title: 'Erreur', description: 'Projet non trouvé.', variant: 'destructive' });
//           }
//         }
//       } else {
//         toast({ title: 'Erreur', description: response.message || 'Échec du chargement des projets', variant: 'destructive' });
//       }
//     } catch (error) {
//       console.error('Erreur lors de la récupération des projets:', error);
//       toast({ title: 'Erreur', description: error.message || 'Erreur inattendue', variant: 'destructive' });
//     } finally {
//       setLoading(false);
//     }
//   }, [projectId, navigate]);

//   useEffect(() => { fetchUserProjects(); }, [fetchUserProjects]);

//   const handleDeleteProject = async () => {
//     if (!selectedProject) return;
//     if (window.confirm(`Supprimer "${selectedProject.project_description || 'Projet'}" ?`)) {
//       try {
//         const response = await ApiService(`/user-projects/${selectedProject.id}`, 'DELETE');
//         if (response.success) {
//           toast({ title: 'Succès', description: 'Projet supprimé' });
//           setProjects(projects.filter(p => p.id !== selectedProject.id));
//           setSelectedProject(null);
//           navigate('/app/dashboard-project/default-user-project');
//         } else {
//           toast({ title: 'Erreur', description: response.message || 'Échec de suppression', variant: 'destructive' });
//         }
//       } catch (error) {
//         console.error('Erreur:', error);
//         toast({ title: 'Erreur', description: error.message || 'Erreur inattendue', variant: 'destructive' });
//       }
//     }
//   };

//   const filteredProjects = projects.filter(project =>
//     project.project_description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     project.user_company?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-bizzwiz-deep-space">
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
//           className="text-[#8f00ff] font-orbitron text-xl"
//         >
//           <RefreshCw size={32} />
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-bizzwiz-deep-space via-bizzwiz-deep-space/95 to-bizzwiz-deep-space text-bizzwiz-star-white">
//       {/* Header Section */}
//       <div className="sticky top-0 z-10 bg-bizzwiz-deep-space/80 backdrop-blur-xl border-b border-[#8f00ff]/10">
//         <div className="max-w-7xl mx-auto px-6 py-6">
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="flex items-center gap-4"
//             >
//               <div className="h-12 w-12 rounded-xl bg-[#8f00ff] flex items-center justify-center">
//                 <Building2 size={24} className="text-bizzwiz-deep-space" />
//               </div>
//               <div>
//                 <h1 className="text-3xl font-orbitron font-bold text-[#8f00ff]">
//                   Gestion des Projets
//                 </h1>
//                 <p className="text-bizzwiz-comet-tail text-sm">
//                   {projects.length} projet{projects.length !== 1 ? 's' : ''} total
//                 </p>
//               </div>
//             </motion.div>
            
//             <div className="flex items-center gap-3">
//               <div className="relative">
//                 <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bizzwiz-comet-tail" />
//                 <input
//                   type="text"
//                   placeholder="Rechercher un projet..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10 pr-4 py-2 bg-bizzwiz-deep-space/50 border border-[#8f00ff]/20 rounded-lg text-bizzwiz-star-white placeholder:text-bizzwiz-comet-tail focus:outline-none focus:border-[#8f00ff]/50"
//                 />
//               </div>
//               <Button
//                 onClick={fetchUserProjects}
//                 variant="outline"
//                 size="sm"
//                 className="border-[#8f00ff]/30 text-[#8f00ff] hover:bg-[#8f00ff]/10"
//               >
//                 <RefreshCw size={16} className="mr-2" />
//                 Actualiser
//               </Button>
//               <Button
//                 onClick={() => navigate('/app/newproject')}
//                 size="sm"
//                 className="bg-[#8f00ff] text-bizzwiz-deep-space hover:shadow-lg hover:shadow-[#8f00ff]/25"
//               >
//                 <Plus size={16} className="mr-2" />
//                 Nouveau
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-6 py-8">
//         {filteredProjects.length === 0 ? (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-center py-20"
//           >
//             <div className="h-32 w-32 mx-auto mb-6 rounded-full bg-[#8f00ff]/20 flex items-center justify-center">
//               <FileText size={48} className="text-bizzwiz-comet-tail" />
//             </div>
//             <h2 className="text-2xl font-orbitron font-semibold mb-3 text-[#8f00ff]">
//               {searchTerm ? 'Aucun projet trouvé' : 'Commencez votre premier projet'}
//             </h2>
//             <p className="text-bizzwiz-comet-tail mb-8 max-w-md mx-auto">
//               {searchTerm 
//                 ? 'Aucun projet ne correspond à votre recherche. Essayez avec d\'autres mots-clés.'
//                 : 'Créez votre premier projet pour commencer à gérer vos solutions digitales.'
//               }
//             </p>
//             {!searchTerm && (
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => navigate('/app/newproject')}
//                 className="px-8 py-3 rounded-xl bg-[#8f00ff] text-bizzwiz-deep-space font-semibold shadow-lg hover:shadow-[#8f00ff]/40 transition-all duration-300"
//               >
//                 <Plus size={20} className="inline mr-2" />
//                 Créer un projet
//               </motion.button>
//             )}
//           </motion.div>
//         ) : (
//           <div className="grid lg:grid-cols-3 gap-8">
//             {/* Projects Grid */}
//             <div className="lg:col-span-2">
//               <div className="grid gap-4">
//                 {filteredProjects.map((project, index) => (
//                   <motion.div
//                     key={project.id}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: index * 0.1 }}
//                     whileHover={{ y: -2 }}
//                     className={`group p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
//                       selectedProject?.id === project.id
//                         ? 'border-[#8f00ff] bg-[#8f00ff]/5 shadow-lg shadow-[#8f00ff]/20'
//                         : 'border-bizzwiz-deep-space/30 bg-bizzwiz-deep-space/40 hover:border-[#8f00ff]/40 hover:bg-bizzwiz-deep-space/60'
//                     } backdrop-blur-sm`}
//                     onClick={() => {
//                       setSelectedProject(project);
//                       navigate(`/app/dashboard-project/${project.id}`);
//                     }}
//                   >
//                     <div className="flex items-start justify-between mb-4">
//                       <div className="flex-1">
//                         <h3 className="text-lg font-semibold text-bizzwiz-star-white mb-2 group-hover:text-[#8f00ff] transition-colors">
//                           {project.project_description || 'Projet sans titre'}
//                         </h3>
//                         <div className="flex items-center gap-2 text-sm text-bizzwiz-comet-tail mb-3">
//                           <Building2 size={14} />
//                           <span>{project.user_company || 'Entreprise non spécifiée'}</span>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
//                           {getStatusLabel(project.status)}
//                         </span>
//                         <ChevronRight size={16} className="text-bizzwiz-comet-tail group-hover:text-[#8f00ff] transition-colors" />
//                       </div>
//                     </div>
                    
//                     <div className="grid grid-cols-2 gap-4 text-sm">
//                       <div className="flex items-center gap-2 text-bizzwiz-comet-tail">
//                         <Target size={14} />
//                         <span>{project.solution_type}</span>
//                       </div>
//                       <div className="flex items-center gap-2 text-bizzwiz-comet-tail">
//                         <DollarSign size={14} />
//                         <span>{project.budget}</span>
//                       </div>
//                       <div className="flex items-center gap-2 text-bizzwiz-comet-tail">
//                         <Users size={14} />
//                         <span>{project.audience}</span>
//                       </div>
//                       <div className="flex items-center gap-2 text-bizzwiz-comet-tail">
//                         <Calendar size={14} />
//                         <span>{new Date(project.created_at).toLocaleDateString('fr-FR')}</span>
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>

//             {/* Detailed View Sidebar */}
//             <div className="lg:col-span-1">
//               <div className="sticky top-32">
//                 <AnimatePresence mode="wait">
//                   {selectedProject ? (
//                     <motion.div
//                       key={selectedProject.id}
//                       initial={{ opacity: 0, x: 20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       exit={{ opacity: 0, x: -20 }}
//                       className="bg-bizzwiz-deep-space/60 backdrop-blur-xl rounded-2xl border border-[#8f00ff]/20 overflow-hidden"
//                     >
//                       {/* Header */}
//                       <div className="p-6 bg-gradient-to-r from-[#8f00ff]/10 to-[#8f00ff]/10 border-b border-[#8f00ff]/20">
//                         <h2 className="text-xl font-orbitron font-bold text-[#8f00ff] mb-2">
//                           Détails du Projet
//                         </h2>
//                         <p className="text-bizzwiz-comet-tail text-sm">
//                           ID: #{selectedProject.id}
//                         </p>
//                       </div>

//                       {/* Content */}
//                       <div className="p-6 space-y-6">
//                         {/* Project Info */}
//                         <div className="space-y-4">
//                           <div>
//                             <label className="text-xs font-medium text-[#8f00ff] uppercase tracking-wider">
//                               Description
//                             </label>
//                             <p className="text-bizzwiz-star-white mt-1 font-medium">
//                               {selectedProject.project_description}
//                             </p>
//                           </div>
                          
//                           <div className="grid grid-cols-2 gap-4">
//                             <div>
//                               <label className="text-xs font-medium text-[#8f00ff] uppercase tracking-wider">
//                                 Entreprise
//                               </label>
//                               <p className="text-bizzwiz-star-white mt-1">
//                                 {selectedProject.user_company || 'N/A'}
//                               </p>
//                             </div>
//                             <div>
//                               <label className="text-xs font-medium text-[#8f00ff] uppercase tracking-wider">
//                                 Type
//                               </label>
//                               <p className="text-bizzwiz-star-white mt-1">
//                                 {selectedProject.solution_type}
//                               </p>
//                             </div>
//                           </div>

//                           <div className="grid grid-cols-2 gap-4">
//                             <div>
//                               <label className="text-xs font-medium text-[#8f00ff] uppercase tracking-wider">
//                                 Audience
//                               </label>
//                               <p className="text-bizzwiz-star-white mt-1">
//                                 {selectedProject.audience}
//                               </p>
//                             </div>
//                             <div>
//                               <label className="text-xs font-medium text-[#8f00ff] uppercase tracking-wider">
//                                 Budget
//                               </label>
//                               <p className="text-bizzwiz-star-white mt-1">
//                                 {selectedProject.budget}
//                               </p>
//                             </div>
//                           </div>

//                           <div>
//                             <label className="text-xs font-medium text-[#8f00ff] uppercase tracking-wider">
//                               Statut
//                             </label>
//                             <div className="mt-2">
//                               <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedProject.status)}`}>
//                                 {getStatusLabel(selectedProject.status)}
//                               </span>
//                             </div>
//                           </div>

//                           <div>
//                             <label className="text-xs font-medium text-[#8f00ff] uppercase tracking-wider">
//                               Date de création
//                             </label>
//                             <p className="text-bizzwiz-star-white mt-1">
//                               {new Date(selectedProject.created_at).toLocaleDateString('fr-FR', {
//                                 year: 'numeric',
//                                 month: 'long',
//                                 day: 'numeric'
//                               })}
//                             </p>
//                           </div>
//                         </div>

//                         {/* Actions */}
//                         <div className="pt-4 border-t border-[#8f00ff]/20 space-y-3">
//                           <motion.button
//                             whileHover={{ scale: 1.02 }}
//                             whileTap={{ scale: 0.98 }}
//                             onClick={() => navigate('/app/payment')}
//                             className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#8f00ff] text-bizzwiz-deep-space font-semibold shadow-lg hover:shadow-[#8f00ff]/40 transition-all duration-300"
//                           >
//                             <ExternalLink size={16} />
//                             Voir les liens
//                           </motion.button>
                          
//                           <motion.button
//                             whileHover={{ scale: 1.02 }}
//                             whileTap={{ scale: 0.98 }}
//                             onClick={handleDeleteProject}
//                             className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/30 text-red-400 font-semibold hover:bg-red-500/30 transition-all duration-300"
//                           >
//                             <Trash2 size={16} />
//                             Supprimer le projet
//                           </motion.button>
//                         </div>
//                       </div>
//                     </motion.div>
//                   ) : (
//                     <motion.div
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       className="bg-bizzwiz-deep-space/40 backdrop-blur-xl rounded-2xl border border-[#8f00ff]/10 p-8 text-center"
//                     >
//                       <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-[#8f00ff]/20 flex items-center justify-center">
//                         <FileText size={24} className="text-[#8f00ff]" />
//                       </div>
//                       <h3 className="text-lg font-semibold text-[#8f00ff] mb-2">
//                         Sélectionnez un projet
//                       </h3>
//                       <p className="text-bizzwiz-comet-tail text-sm">
//                         Cliquez sur un projet dans la liste pour voir ses détails
//                       </p>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProjectManagementPage;

// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import ApiService from '@/apiService';
// import { toast } from '@/components/ui/use-toast';

// const ProjectManagementPage = () => {
//   const { form_data_id } = useParams();
//   const [projectData, setProjectData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     if (!form_data_id || isNaN(form_data_id)) {
//       console.error('Invalid form_data_id:', form_data_id);
//       toast({
//         title: "Erreur",
//         description: 'ID de projet invalide.',
//         variant: 'destructive',
//       });
//       setIsLoading(false);
//       return;
//     }

//     const fetchProjectData = async () => {
//       try {
//         const response = await ApiService(`/form-data/${form_data_id}`, 'GET');
//         if (response.success) {
//           setProjectData(response.data);
//         } else {
//           throw new Error(response.message || 'Échec du chargement des données du projet.');
//         }
//       } catch (error) {
//         console.error('Fetch error:', error);
//         toast({
//           title: "Erreur",
//           description: error.message || 'Impossible de charger les données du projet.',
//           variant: 'destructive',
//         });
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchProjectData();
//   }, [form_data_id]);

//   if (isLoading) {
//     return <div className="text-center py-10 text-white">Loading...</div>;
//   }

//   if (!projectData) {
//     return <div className="text-center py-10 text-white">Projet non trouvé.</div>;
//   }

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4 text-bizzwiz-star-white">Gestion du Projet - {projectData.project_description}</h1>
//       <div>
//         <p><strong>Description :</strong> {projectData.project_description}</p>
//         <p><strong>Type de Solution :</strong> {projectData.solution_type}</p>
//       </div>
//     </div>
//   );
// };

// export default ProjectManagementPage;


import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import ApiService from '@/apiService';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  RefreshCw, 
  ExternalLink, 
  Trash2, 
  Calendar, 
  Building2, 
  Target, 
  Users, 
  DollarSign,
  FileText,
  ChevronRight,
  Plus,
  Search
} from 'lucide-react';
import { statusOptions } from '@/utils/constants';

const ProjectManagementPage = () => {
  const { form_data_id } = useParams();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusLabel = (statusValue) => {
    const normalized = statusValue?.toLowerCase().trim();
    const match = statusOptions.find(s => s.value === normalized && s.value !== 'all');
    return match ? match.label : statusValue || 'Pending';
  };

  const getStatusColor = (status) => {
    const normalized = status?.toLowerCase().trim();
    switch (normalized) {
      case 'completed': return 'text-green-400 bg-green-400/20';
      case 'in_progress': return 'text-blue-400 bg-blue-400/20';
      case 'pending': return 'text-yellow-400 bg-yellow-400/20';
      case 'cancelled': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  // Get selected project ID from localStorage
  const getSelectedProjectId = () => {
    const storedProjectId = localStorage.getItem('bizzwiz-selectedProjectId');
    return storedProjectId ? parseInt(storedProjectId) : null;
  };

  // Fetch specific project by ID
  const fetchSpecificProject = useCallback(async (projectId) => {
    if (!projectId) return;
    
    setLoading(true);
    try {
      const response = await ApiService(`/user-projects/${projectId}`, 'GET');
      if (response.success) {
        setSelectedProject(response.data);
        setProjects([response.data]); // Set as single project array
      } else {
        toast({ 
          title: 'Erreur', 
          description: response.message || 'Projet non trouvé', 
          variant: 'destructive' 
        });
        // If project not found, redirect to select project page
        navigate('/app/select-project');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du projet:', error);
      toast({ 
        title: 'Erreur', 
        description: error.message || 'Erreur inattendue', 
        variant: 'destructive' 
      });
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    // Priority: 1. URL param, 2. localStorage, 3. Redirect to select project
    const urlProjectId = form_data_id ? parseInt(form_data_id) : null;
    const storageProjectId = getSelectedProjectId();
    
    if (urlProjectId) {
      fetchSpecificProject(urlProjectId);
    } else if (storageProjectId) {
      fetchSpecificProject(storageProjectId);
    } else {
      // No project selected, redirect to select project page
      navigate('/app/select-project');
    }
  }, [form_data_id, fetchSpecificProject, navigate]);

  const handleDeleteProject = async () => {
    if (!selectedProject) return;
    if (window.confirm(`Supprimer "${selectedProject.project_description || 'Projet'}" ?`)) {
      try {
        const response = await ApiService(`/user-projects/${selectedProject.id}`, 'DELETE');
        if (response.success) {
          toast({ title: 'Succès', description: 'Projet supprimé' });
          
          // Clear localStorage
          localStorage.removeItem('bizzwiz-selectedProjectId');
          
          // Navigate to select project page
          navigate('/app/select-project');
        } else {
          toast({ 
            title: 'Erreur', 
            description: response.message || 'Échec de suppression', 
            variant: 'destructive' 
          });
        }
      } catch (error) {
        console.error('Erreur:', error);
        toast({ 
          title: 'Erreur', 
          description: error.message || 'Erreur inattendue', 
          variant: 'destructive' 
        });
      }
    }
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    // Update localStorage
    localStorage.setItem('bizzwiz-selectedProjectId', project.id.toString());
    navigate(`/app/dashboard/mesprojet/${project.id}`);
  };

  const handleViewProjectDetails = () => {
    if (selectedProject) {
      navigate(`/app/dashboard/project/${selectedProject.id}`);
    }
  };

  const handleRefresh = () => {
    const currentProjectId = selectedProject?.id || getSelectedProjectId();
    if (currentProjectId) {
      fetchSpecificProject(currentProjectId);
    } else {
      // No project selected, redirect to select project page
      navigate('/app/select-project');
    }
  };

  const filteredProjects = projects;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-bizzwiz-deep-space">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="text-[#8f00ff] font-orbitron text-xl"
        >
          <RefreshCw size={32} />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bizzwiz-deep-space via-bizzwiz-deep-space/95 to-bizzwiz-deep-space text-bizzwiz-star-white">
      {/* Header Section */}
      <div className="sticky top-0 z-10 bg-bizzwiz-deep-space/80 backdrop-blur-xl border-b border-[#8f00ff]/10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4"
            >
              <div className="h-12 w-12 rounded-xl bg-[#8f00ff] flex items-center justify-center">
                <Building2 size={24} className="text-bizzwiz-deep-space" />
              </div>
              <div>
                <h1 className="text-3xl font-orbitron font-bold text-[#8f00ff]">
                  {selectedProject ? selectedProject.project_description : 'Mes Projets'}
                </h1>
                <p className="text-bizzwiz-comet-tail text-sm">
                  {selectedProject ? 'Projet sélectionné' : `${projects.length} projet${projects.length !== 1 ? 's' : ''} total`}
                </p>
              </div>
            </motion.div>
            
            <div className="flex items-center gap-3">
              <Button
                onClick={handleRefresh}
                variant="outline"
                size="sm"
                className="border-[#8f00ff]/30 text-[#8f00ff] hover:bg-[#8f00ff]/10"
              >
                <RefreshCw size={16} className="mr-2" />
                Actualiser
              </Button>
              <Button
                onClick={() => navigate('/app/select-project')}
                variant="outline"
                size="sm"
                className="border-[#8f00ff]/30 text-[#8f00ff] hover:bg-[#8f00ff]/10"
              >
                Changer de projet
              </Button>
              <Button
                onClick={() => navigate('/app/dashboard/newproject')}
                size="sm"
                className="bg-[#8f00ff] text-bizzwiz-deep-space hover:shadow-lg hover:shadow-[#8f00ff]/25"
              >
                <Plus size={16} className="mr-2" />
                Nouveau
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="h-32 w-32 mx-auto mb-6 rounded-full bg-[#8f00ff]/20 flex items-center justify-center">
              <FileText size={48} className="text-bizzwiz-comet-tail" />
            </div>
            <h2 className="text-2xl font-orbitron font-semibold mb-3 text-[#8f00ff]">
              Aucun projet sélectionné
            </h2>
            <p className="text-bizzwiz-comet-tail mb-8 max-w-md mx-auto">
              Veuillez sélectionner un projet pour accéder à cette page.
            </p>
            <div className="flex gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/app/select-project')}
                className="px-8 py-3 rounded-xl bg-[#8f00ff] text-bizzwiz-deep-space font-semibold shadow-lg hover:shadow-[#8f00ff]/40 transition-all duration-300"
              >
                Sélectionner un projet
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/app/dashboard/newproject')}
                className="px-8 py-3 rounded-xl border border-[#8f00ff]/30 text-[#8f00ff] font-semibold hover:bg-[#8f00ff]/10 transition-all duration-300"
              >
                <Plus size={20} className="inline mr-2" />
                Créer un projet
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Projects Grid - Always show single project */}
            <div className="lg:col-span-2">
              <div className="grid gap-4">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -2 }}
                    className="group p-6 rounded-2xl border transition-all duration-300 cursor-default border-[#8f00ff] bg-[#8f00ff]/5 shadow-lg shadow-[#8f00ff]/20 backdrop-blur-sm"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-bizzwiz-star-white mb-2">
                          {project.project_description || 'Projet sans titre'}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-bizzwiz-comet-tail mb-3">
                          <Building2 size={14} />
                          <span>{project.user_company || 'Entreprise non spécifiée'}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                          {getStatusLabel(project.status)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-bizzwiz-comet-tail">
                        <Target size={14} />
                        <span>{project.solution_type}</span>
                      </div>
                      <div className="flex items-center gap-2 text-bizzwiz-comet-tail">
                        <DollarSign size={14} />
                        <span>{project.budget}</span>
                      </div>
                      <div className="flex items-center gap-2 text-bizzwiz-comet-tail">
                        <Users size={14} />
                        <span>{project.audience}</span>
                      </div>
                      <div className="flex items-center gap-2 text-bizzwiz-comet-tail">
                        <Calendar size={14} />
                        <span>{new Date(project.created_at).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Detailed View Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-32">
                <AnimatePresence mode="wait">
                  {selectedProject ? (
                    <motion.div
                      key={selectedProject.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="bg-bizzwiz-deep-space/60 backdrop-blur-xl rounded-2xl border border-[#8f00ff]/20 overflow-hidden"
                    >
                      {/* Header */}
                      <div className="p-6 bg-gradient-to-r from-[#8f00ff]/10 to-[#8f00ff]/10 border-b border-[#8f00ff]/20">
                        <h2 className="text-xl font-orbitron font-bold text-[#8f00ff] mb-2">
                          Détails du Projet
                        </h2>
                        <p className="text-bizzwiz-comet-tail text-sm">
                          ID: #{selectedProject.id}
                        </p>
                      </div>

                      {/* Content */}
                      <div className="p-6 space-y-6">
                        {/* Project Info */}
                        <div className="space-y-4">
                          <div>
                            <label className="text-xs font-medium text-[#8f00ff] uppercase tracking-wider">
                              Description
                            </label>
                            <p className="text-bizzwiz-star-white mt-1 font-medium">
                              {selectedProject.project_description}
                            </p>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-xs font-medium text-[#8f00ff] uppercase tracking-wider">
                                Entreprise
                              </label>
                              <p className="text-bizzwiz-star-white mt-1">
                                {selectedProject.user_company || 'N/A'}
                              </p>
                            </div>
                            <div>
                              <label className="text-xs font-medium text-[#8f00ff] uppercase tracking-wider">
                                Type
                              </label>
                              <p className="text-bizzwiz-star-white mt-1">
                                {selectedProject.solution_type}
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-xs font-medium text-[#8f00ff] uppercase tracking-wider">
                                Audience
                              </label>
                              <p className="text-bizzwiz-star-white mt-1">
                                {selectedProject.audience}
                              </p>
                            </div>
                            <div>
                              <label className="text-xs font-medium text-[#8f00ff] uppercase tracking-wider">
                                Budget
                              </label>
                              <p className="text-bizzwiz-star-white mt-1">
                                {selectedProject.budget}
                              </p>
                            </div>
                          </div>

                          <div>
                            <label className="text-xs font-medium text-[#8f00ff] uppercase tracking-wider">
                              Statut
                            </label>
                            <div className="mt-2">
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedProject.status)}`}>
                                {getStatusLabel(selectedProject.status)}
                              </span>
                            </div>
                          </div>

                          <div>
                            <label className="text-xs font-medium text-[#8f00ff] uppercase tracking-wider">
                              Date de création
                            </label>
                            <p className="text-bizzwiz-star-white mt-1">
                              {new Date(selectedProject.created_at).toLocaleDateString('fr-FR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="pt-4 border-t border-[#8f00ff]/20 space-y-3">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleViewProjectDetails}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#8f00ff] text-bizzwiz-deep-space font-semibold shadow-lg hover:shadow-[#8f00ff]/40 transition-all duration-300"
                          >
                            <ExternalLink size={16} />
                            Voir le dashboard
                          </motion.button>
                          
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleDeleteProject}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/30 text-red-400 font-semibold hover:bg-red-500/30 transition-all duration-300"
                          >
                            <Trash2 size={16} />
                            Supprimer le projet
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-bizzwiz-deep-space/40 backdrop-blur-xl rounded-2xl border border-[#8f00ff]/10 p-8 text-center"
                    >
                      <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-[#8f00ff]/20 flex items-center justify-center">
                        <FileText size={24} className="text-[#8f00ff]" />
                      </div>
                      <h3 className="text-lg font-semibold text-[#8f00ff] mb-2">
                        Sélectionnez un projet
                      </h3>
                      <p className="text-bizzwiz-comet-tail text-sm">
                        Cliquez sur un projet dans la liste pour voir ses détails
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectManagementPage;