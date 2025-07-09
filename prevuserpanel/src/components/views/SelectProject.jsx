// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { Button } from '@/components/ui/button';
// import { Card } from '@/components/ui/card';
// import ApiService from '@/apiService';
// import { toast } from '@/components/ui/use-toast';

// const SelectProject = () => {
//   const navigate = useNavigate();
//   const [projects, setProjects] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProjects = async () => {
//       const userId = localStorage.getItem('bizzwiz-userId');
//       if (!userId) {
//         setError('Utilisateur non identifié.');
//         setIsLoading(false);
//         return;
//       }

//       try {
//         console.log(`Fetching projects for userId: ${userId}`);
//         const response = await ApiService(`/form-data/user/${userId}`, 'GET');
//         if (response.success) {
//           setProjects(response.data);
//         } else {
//           throw new Error(response.message || 'Échec du chargement des projets.');
//         }
//       } catch (error) {
//         console.error('Fetch error:', error);
//         setError(error.message || 'Impossible de charger les projets.');
//         toast({
//           title: "Erreur",
//           description: error.message || 'Impossible de charger les projets.',
//           variant: 'destructive',
//         });
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchProjects();
//   }, []);

//   const handleProjectSelect = (formDataId) => {
//     if (!formDataId) {
//       console.error('Invalid formDataId:', formDataId);
//       toast({
//         title: "Erreur",
//         description: 'ID de projet invalide.',
//         variant: 'destructive',
//       });
//       return;
//     }
//     // Updated navigation path to match new routing structure
//     navigate(`/app/dashboard/project/${formDataId}`);
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
//         <div className="flex flex-col items-center space-y-4">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
//           <p className="text-white/80 text-lg">Chargement des projets...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
//       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900/10 to-transparent"></div>
//       <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
//       <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
//       <div className="relative z-10 container mx-auto px-6 py-12">
//         <motion.div 
//           initial={{ opacity: 0, y: -30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-16"
//         >
//           <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
//             Sélectionner un Projet
//           </h1>
//           <p className="text-white/70 text-lg max-w-2xl mx-auto">
//             Choisissez le projet sur lequel vous souhaitez travailler
//           </p>
//         </motion.div>

//         {error && (
//           <motion.div 
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="max-w-md mx-auto mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg backdrop-blur-sm"
//           >
//             <p className="text-red-400 text-center">{error}</p>
//           </motion.div>
//         )}

//         <div className="max-w-7xl mx-auto">
//           {projects.length > 0 ? (
//             <motion.div 
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//               className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
//             >
//               {projects.map((project, index) => (
//                 <motion.div
//                   key={project.id}
//                   initial={{ opacity: 0, y: 30 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.6, delay: index * 0.1 }}
//                   whileHover={{ scale: 1.02, y: -5 }}
//                   whileTap={{ scale: 0.98 }}
//                   className="group cursor-pointer"
//                   onClick={() => handleProjectSelect(project.id)}
//                 >
//                   <Card className="h-full p-8 bg-slate-800/40 backdrop-blur-xl border border-white/10 hover:border-pink-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-pink-500/20 relative overflow-hidden">
//                     <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//                     <div className="relative z-10">
//                       <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//                         <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012 2v2M7 7h10" />
//                         </svg>
//                       </div>
//                       <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-pink-400 transition-colors duration-300">
//                         {project.project_description || 'Projet sans titre'}
//                       </h3>
//                       <div className="inline-flex items-center px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 mb-4">
//                         <span className="text-cyan-300 text-sm font-medium">
//                           {project.solution_type || 'Aucun type'}
//                         </span>
//                       </div>
//                       <div className="flex items-center justify-between text-sm text-white/60 mt-6">
//                         <span>Projet #{project.id}</span>
//                         <div className="flex items-center space-x-1">
//                           <span>Ouvrir</span>
//                           <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                           </svg>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10"></div>
//                   </Card>
//                 </motion.div>
//               ))}
//             </motion.div>
//           ) : (
//             !isLoading && (
//               <motion.div 
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.8 }}
//                 className="text-center py-20"
//               >
//                 <div className="w-24 h-24 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
//                   <svg className="w-12 h-12 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012 2v2M7 7h10" />
//                   </svg>
//                 </div>
//                 <h3 className="text-2xl font-semibold text-white mb-2">Aucun projet trouvé</h3>
//                 <p className="text-white/60 max-w-md mx-auto">
//                   Vous n'avez pas encore créé de projets. Commencez par créer votre premier projet.
//                 </p>
//               </motion.div>
//             )
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SelectProject;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ApiService from '@/apiService';
import { toast } from '@/components/ui/use-toast';

const SelectProject = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const userId = localStorage.getItem('bizzwiz-userId');
      if (!userId) {
        setError('Utilisateur non identifié.');
        setIsLoading(false);
        return;
      }

      try {
        console.log(`Fetching projects for userId: ${userId}`);
        const response = await ApiService(`/form-data/user/${userId}`, 'GET');
        if (response.success) {
          setProjects(response.data);
        } else {
          throw new Error(response.message || 'Échec du chargement des projets.');
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error.message || 'Impossible de charger les projets.');
        toast({
          title: "Erreur",
          description: error.message || 'Impossible de charger les projets.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectSelect = (formDataId) => {
    if (!formDataId) {
      console.error('Invalid formDataId:', formDataId);
      toast({
        title: "Erreur",
        description: 'ID de projet invalide.',
        variant: 'destructive',
      });
      return;
    }
    // Store the selected project ID in localStorage
    localStorage.setItem('bizzwiz-selectedProjectId', formDataId);
    // Navigate to the project-specific dashboard
    navigate(`/app/dashboard/project/${formDataId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
          <p className="text-white/80 text-lg">Chargement des projets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900/10 to-transparent"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="relative z-10 container mx-auto px-6 py-12">
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            Sélectionner un Projet
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Choisissez le projet sur lequel vous souhaitez travailler
          </p>
        </motion.div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg backdrop-blur-sm"
          >
            <p className="text-red-400 text-center">{error}</p>
          </motion.div>
        )}

        <div className="max-w-7xl mx-auto">
          {projects.length > 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  className="group cursor-pointer"
                  onClick={() => handleProjectSelect(project.id)}
                >
                  <Card className="h-full p-8 bg-slate-800/40 backdrop-blur-xl border border-white/10 hover:border-pink-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-pink-500/20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                      <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-pink-400 transition-colors duration-300">
                        {project.project_description || 'Projet sans titre'}
                      </h3>
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 mb-4">
                        <span className="text-cyan-300 text-sm font-medium">
                          {project.solution_type || 'Aucun type'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-white/60 mt-6">
                        <span>Projet #{project.id}</span>
                        <div className="flex items-center space-x-1">
                          <span>Ouvrir</span>
                          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10"></div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            !isLoading && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="text-center py-20"
              >
                <div className="w-24 h-24 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-2">Aucun projet trouvé</h3>
                <p className="text-white/60 max-w-md mx-auto">
                  Vous n'avez pas encore créé de projets. Commencez par créer votre premier projet.
                </p>
              </motion.div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectProject;