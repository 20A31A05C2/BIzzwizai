// import React from 'react';
// import { motion } from 'framer-motion';
// import { Button } from '@/components/ui/button';
// import ProjectCard from '@/components/ProjectCard';
// import { PlusCircle, Zap } from 'lucide-react';

// const DashboardView = ({ projects, onProjectAccess, onCreateNewProjectFlow, onSetProjects }) => {
//   const recentProjects = projects.slice(0, 3);

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: { type: 'spring', stiffness: 100 }
//     }
//   };

//   return (
//     <div className="space-y-10">
//       <motion.section
//         variants={itemVariants}
//         className="bg-[#141419]/70 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-purple-500/20"
//       >
//         <div className="flex flex-col md:flex-row justify-between items-center">
//           <div>
//             <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
//               Bienvenue sur BizzWiz AI
//             </h1>
//             <p className="text-lg text-gray-400">Votre fabrique de projets autonomes.</p>
//           </div>
//           <Button 
//             size="lg" 
//             onClick={onCreateNewProjectFlow} 
//             className="mt-6 md:mt-0 futuristic-button bg-gradient-to-r from-[#8f4fff] to-[#3b82f6] hover:from-[#8f4fff]/90 hover:to-[#3b82f6]/90 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
//           >
//             <PlusCircle size={22} className="mr-2" />
//             Créer un Nouveau Projet
//           </Button>
//         </div>
//       </motion.section>

//       <motion.section variants={itemVariants}>
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-3xl font-semibold text-gray-200">Mes Projets Récents</h2>
//           {projects.length > 3 && (
//              <Button variant="link" className="text-purple-400 hover:text-purple-300">Voir tous les projets</Button>
//           )}
//         </div>
//         {recentProjects.length > 0 ? (
//           <motion.div 
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//           >
//             {recentProjects.map((project) => (
//               <ProjectCard 
//                 key={project.id} 
//                 project={project} 
//                 onAccess={() => onProjectAccess(project)} 
//                 onSetProjects={onSetProjects}
//                 projects={projects}
//               />
//             ))}
//           </motion.div>
//         ) : (
//           <motion.div 
//             variants={itemVariants} 
//             className="text-center py-12 bg-[#141419]/50 rounded-lg border-2 border-dashed border-gray-700/50"
//           >
//             <Zap size={48} className="mx-auto text-gray-500 mb-4" />
//             <h3 className="text-xl font-semibold text-gray-300 mb-2">Aucun projet pour le moment.</h3>
//             <p className="text-gray-500 mb-6">Lancez votre première création pour la voir apparaître ici !</p>
//             <Button 
//               onClick={onCreateNewProjectFlow}
//               className="futuristic-button bg-gradient-to-r from-[#8f4fff] to-[#3b82f6] hover:from-[#8f4fff]/90 hover:to-[#3b82f6]/90 text-white"
//             >
//               <PlusCircle size={20} className="mr-2" />
//               Démarrer un projet
//             </Button>
//           </motion.div>
//         )}
//       </motion.section>
//     </div>
//   );
// };

// export default DashboardView;