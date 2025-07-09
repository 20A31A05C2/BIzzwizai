
import React, { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { Briefcase, Loader2, RefreshCw } from 'lucide-react';
import ProjectRow from '@/components/admin/projects/ProjectRow';
import ViewSubmissionModal from '@/components/admin/projects/ViewSubmissionModal';
import ProjectFilters from '@/components/admin/projects/ProjectFilters';
import ApiService from '@/apiService';

const statusOptions = [
  { value: 'all', label: 'Tous les statuts', color: 'bg-gray-500/30 text-gray-300' },
  { value: 'pending', label: 'En attente', color: 'bg-orange-500/30 text-orange-300' },
  { value: 'completed', label: 'Terminé', color: 'bg-teal-500/30 text-teal-300' },
  { value: 'onhold', label: 'En pause', color: 'bg-indigo-500/30 text-indigo-300' },
  { value: 'accepted', label: 'Accepté', color: 'bg-green-500/30 text-green-300' },
  { value: 'rejected', label: 'Rejeté', color: 'bg-red-500/30 text-red-300' },
];

const AdminProjectListPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProjectForView, setSelectedProjectForView] = useState(null);
  const { toast } = useToast();

  const fetchProjects = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('bizwizusertoken');
      const response = await ApiService('/form-data', 'GET', null, false, token);
      console.log('API Response Statuses:', response.data.map(p => p.status));

      const enrichedProjects = response.data.map(formData => ({
        ...formData,
        fullname: formData.user?.name || 'N/A',
        email: formData.user?.email || 'N/A',
      }));

      let filteredProjects = enrichedProjects;

      if (searchTerm) {
        const lowerSearchTerm = searchTerm.toLowerCase();
        filteredProjects = filteredProjects.filter(project =>
          project.email.toLowerCase().includes(lowerSearchTerm) ||
          project.fullname.toLowerCase().includes(lowerSearchTerm) ||
          (project.budget && project.budget.toString().toLowerCase().includes(lowerSearchTerm)) ||
          (project.status && project.status.toLowerCase().includes(lowerSearchTerm))
        );
      }

      if (filterStatus && filterStatus !== 'all') {
        filteredProjects = filteredProjects.filter(project => project.status === filterStatus);
      }

      setProjects(filteredProjects);
    } catch (error) {
      setProjects([]);
      toast({
        title: 'Erreur',
        description: error.response?.data?.message || 'Impossible de charger les données.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, filterStatus, toast]);

  const handleStatusUpdate = useCallback(async (projectId, newStatus) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('bizwizusertoken');
      await ApiService(`/form-data/${projectId}`, 'PATCH', { status: newStatus }, false, token);
      toast({
        title: 'Succès',
        description: `Projet ${newStatus === 'accepted' ? 'accepté' : 'rejeté'} avec succès.`,
        variant: 'default',
      });
      await fetchProjects(); // Refresh the project list
    } catch (error) {
      toast({
        title: 'Erreur',
        description: error.response?.data?.message || 'Impossible de mettre à jour le statut.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast, fetchProjects]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleViewSubmission = (project) => {
    setSelectedProjectForView(project);
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <motion.div
      className="space-y-8"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
    >
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 flex items-center">
            <Briefcase size={32} className="mr-3 text-red-500" />
            Customer Project Management
          </h1>
          <p className="text-slate-400 mt-1">Track and configure user projects.</p>
        </div>
        <Button onClick={fetchProjects} variant="outline" className="border-red-500 text-red-500 hover:bg-red-500/10">
          <RefreshCw size={16} className="mr-2" />
          Refresh
        </Button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <ProjectFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          statusOptions={statusOptions}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="bg-slate-800/70 border-slate-700">
          <CardHeader>
            <CardTitle className="text-xl text-slate-200">List of Projects</CardTitle>
            <CardDescription className="text-slate-400">{projects.length} project(s) found.</CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto scrollbar-thin scrollbar-thumb-red-500/50 scrollbar-track-slate-700/50">
            {isLoading ? (
              <div className="flex justify-center items-center py-10">
                <Loader2 className="h-8 w-8 animate-spin text-red-500" />
                <p className="ml-3 text-slate-300">Loading projects...</p>
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-slate-400 text-lg mb-2">No projects found</p>
                <p className="text-slate-500 text-sm">No projects match the current search criteria.</p>
              </div>
            ) : (
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow className="border-slate-700 hover:bg-slate-700/30">
                    <TableHead className="text-slate-300 font-semibold">Project ID</TableHead>
                    <TableHead className="text-slate-300 font-semibold">User</TableHead>
                    <TableHead className="text-slate-300 font-semibold">Budget (€)</TableHead>
                    <TableHead className="text-slate-300 font-semibold">Status</TableHead>
                    <TableHead className="text-slate-300 font-semibold">Timing</TableHead>
                    <TableHead className="text-right text-slate-300 font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((project, index) => (
                    <ProjectRow
                      key={project.id}
                      project={project}
                      onViewSubmission={handleViewSubmission}
                      onStatusUpdate={handleStatusUpdate}
                      index={index}
                      statusOptions={statusOptions}
                    />
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <ViewSubmissionModal
        project={selectedProjectForView}
        isOpen={!!selectedProjectForView}
        onClose={() => setSelectedProjectForView(null)}
      />
    </motion.div>
  );
};

export default AdminProjectListPage;



// import React, { useState, useCallback } from 'react';
// import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { useToast } from '@/components/ui/use-toast';
// import { Briefcase, Loader2, RefreshCw } from 'lucide-react';
// import ProjectRow from '@/components/admin/projects/ProjectRow';
// import ViewSubmissionModal from '@/components/admin/projects/ViewSubmissionModal';
// import ProjectFilters from '@/components/admin/projects/ProjectFilters';
// import { statusOptions } from '@/utils/constants'; // Import from constants

// const AdminProjectListPage = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [projects, setProjects] = useState([
//     { id: '1', email: 'pothuraju vineel@gmail.com', fullname: 'Vineel Pothuraju', budget: 2500, status: 'pending', timing: 'flexible' },
//     { id: '2', email: 'admin@bizwiz.ai', fullname: 'Admin User', budget: 2500, status: 'pending', timing: 'flexible' },
//   ]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectedProjectForView, setSelectedProjectForView] = useState(null);
//   const navigate = useNavigate();

//   const fetchProjects = useCallback(() => {
//     setIsLoading(true);
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 500); // Simulate loading
//   }, []);

//   const handleViewSubmission = (project) => {
//     setSelectedProjectForView(project);
//   };

//   const handleEdit = (project) => {
//     console.log(`Navigating to /app-admin/projets/${project.id}/edit, user role: ${localStorage.getItem('bizzwiz-userRole')}`); // Debug
//     navigate(`/app-admin/projets/${project.id}/edit`);
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
//   };

//   return (
//     <motion.div
//       className="space-y-8"
//       initial="hidden"
//       animate="visible"
//       variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
//     >
//       <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//         <div>
//           <h1 className="text-3xl font-bold text-slate-100 flex items-center">
//             <Briefcase size={32} className="mr-3 text-red-500" />
//             Customer Project Management
//           </h1>
//           <p className="text-slate-400 mt-1">Track and configure user projects.</p>
//         </div>
//         <Button onClick={fetchProjects} variant="outline" className="border-red-500 text-red-500 hover:bg-red-500/10">
//           <RefreshCw size={16} className="mr-2" />
//           Refresh
//         </Button>
//       </motion.div>

//       <motion.div variants={itemVariants}>
//         <ProjectFilters
//           searchTerm={searchTerm}
//           setSearchTerm={setSearchTerm}
//           filterStatus={filterStatus}
//           setFilterStatus={setFilterStatus}
//           statusOptions={statusOptions}
//         />
//       </motion.div>

//       <motion.div variants={itemVariants}>
//         <Card className="bg-slate-800/70 border-slate-700">
//           <CardHeader>
//             <CardTitle className="text-xl text-slate-200">List of Projects</CardTitle>
//             <CardDescription className="text-slate-400">{projects.length} project(s) found.</CardDescription>
//           </CardHeader>
//           <CardContent className="overflow-x-auto scrollbar-thin scrollbar-thumb-red-500/50 scrollbar-track-slate-700/50">
//             {isLoading ? (
//               <div className="flex justify-center items-center py-10">
//                 <Loader2 className="h-8 w-8 animate-spin text-red-500" />
//                 <p className="ml-3 text-slate-300">Loading projects...</p>
//               </div>
//             ) : projects.length === 0 ? (
//               <div className="text-center py-10">
//                 <p className="text-slate-400 text-lg mb-2">No projects found</p>
//                 <p className="text-slate-500 text-sm">No projects match the current search criteria.</p>
//               </div>
//             ) : (
//               <Table className="min-w-full">
//                 <TableHeader>
//                   <TableRow className="border-slate-700 hover:bg-slate-700/30">
//                     <TableHead className="text-slate-300 font-semibold">Project ID</TableHead>
//                     <TableHead className="text-slate-300 font-semibold">User</TableHead>
//                     <TableHead className="text-slate-300 font-semibold">Budget (€)</TableHead>
//                     <TableHead className="text-slate-300 font-semibold">Status</TableHead>
//                     <TableHead className="text-slate-300 font-semibold">Timing</TableHead>
//                     <TableHead className="text-right text-slate-300 font-semibold">Actions</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {projects.map((project, index) => (
//                     <ProjectRow
//                       key={project.id}
//                       project={project}
//                       onViewSubmission={handleViewSubmission}
//                       onEdit={handleEdit}
//                       index={index}
//                       statusOptions={statusOptions}
//                     />
//                   ))}
//                 </TableBody>
//               </Table>
//             )}
//           </CardContent>
//         </Card>
//       </motion.div>

//       <ViewSubmissionModal
//         project={selectedProjectForView}
//         isOpen={!!selectedProjectForView}
//         onClose={() => setSelectedProjectForView(null)}
//       />
//     </motion.div>
//   );
// };

// export default AdminProjectListPage;