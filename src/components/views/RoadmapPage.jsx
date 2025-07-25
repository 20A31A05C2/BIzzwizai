// import React, { useState, useEffect } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import {
//   MapPin,
//   Lightbulb,
//   BarChart2,
//   Palette,
//   Settings,
//   TerminalSquare,
//   SearchCheck,
//   PartyPopper,
//   CalendarDays,
//   Rocket,
//   Milestone,
//   ClipboardList,
//   Users,
//   TrendingUp,
//   ShieldCheck,
//   Code2,
//   Database,
//   Cloud,
//   Activity,
//   Award,
//   DollarSign,
//   MessageSquare,
//   RefreshCw,
// } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { useToast } from '@/components/ui/use-toast';
// import ApiService from '@/apiService';

// const iconOptions = [
//   { value: 'Milestone', label: 'Jalon Majeur', icon: <Milestone /> },
//   { value: 'ClipboardList', label: 'Planification', icon: <ClipboardList /> },
//   { value: 'Lightbulb', label: 'Recherche/Concept', icon: <Lightbulb /> },
//   { value: 'Palette', label: 'Design UI/UX', icon: <Palette /> },
//   { value: 'Code2', label: 'Développement Frontend', icon: <Code2 /> },
//   { value: 'TerminalSquare', label: 'Développement Backend', icon: <TerminalSquare /> },
//   { value: 'Database', label: 'Base de Données', icon: <Database /> },
//   { value: 'Cloud', label: 'Infrastructure', icon: <Cloud /> },
//   { value: 'ShieldCheck', label: 'Sécurité/Tests', icon: <ShieldCheck /> },
//   { value: 'SearchCheck', label: 'Revue/Feedback', icon: <SearchCheck /> },
//   { value: 'PartyPopper', label: 'Déploiement/Go-Live', icon: <PartyPopper /> },
//   { value: 'Rocket', label: 'Phase de Lancement', icon: <Rocket /> },
//   { value: 'Users', label: 'Phase Utilisateurs', icon: <Users /> },
//   { value: 'BarChart2', label: 'Analyse & Reporting', icon: <BarChart2 /> },
//   { value: 'TrendingUp', label: 'Marketing/Croissance', icon: <TrendingUp /> },
//   { value: 'Settings', label: 'Maintenance/Optimisation', icon: <Settings /> },
//   { value: 'MapPin', label: 'Étape Générique', icon: <MapPin /> },
//   { value: 'Activity', label: 'Tâche Spécifique', icon: <Activity /> },
//   { value: 'Award', label: 'Objectif Atteint', icon: <Award /> },
//   { value: 'DollarSign', label: 'Étape Financière', icon: <DollarSign /> },
//   { value: 'MessageSquare', label: 'Communication/Réunion', icon: <MessageSquare /> },
//   { value: 'CalendarDays', label: 'Échéance Importante', icon: <CalendarDays /> },
// ];

// const getIconComponent = (iconName) => {
//   const selectedIcon = iconOptions.find((opt) => opt.value === iconName);
//   return selectedIcon
//     ? React.cloneElement(selectedIcon.icon, { className: 'h-5 w-5 stroke-2' })
//     : <MapPin className='h-5 w-5 stroke-2' />;
// };

// const roadmapStatusOptions = [
//   { value: 'pending', label: 'En attente', color: 'text-gray-400' },
//   { value: 'upcoming', label: 'À venir', color: 'text-blue-400' },
//   { value: 'active', label: 'En cours', color: 'text-yellow-400' },
//   { value: 'completed', label: 'Terminé', color: 'text-green-400' },
//   { value: 'on_hold', label: 'En pause', color: 'text-orange-400' },
//   { value: 'delayed', label: 'Retardé', color: 'text-red-400' },
//   { value: 'cancelled', label: 'Annulé', color: 'text-red-600' },
// ];

// const getStatusInfo = (status) => {
//   return roadmapStatusOptions.find(opt => opt.value === status) || 
//          { label: status, color: 'text-gray-400' };
// };

// const RoadmapPage = () => {
//   const [roadmapItems, setRoadmapItems] = useState([]);
//   const [userProjects, setUserProjects] = useState([]);
//   const [selectedProject, setSelectedProject] = useState('all');
//   const [isLoading, setIsLoading] = useState(true);
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const [errorMessage, setErrorMessage] = useState(''); // New state for error message
//   const { toast } = useToast();

//   // Fetch user projects
//   const fetchUserProjects = async () => {
//     try {
//       const token = localStorage.getItem('bizwizusertoken');
//       const response = await ApiService('/user-projects', 'GET', null, false, token);
//       if (response.success) {
//         setUserProjects(response.data);
//       } else {
//         toast({
//           title: 'Erreur',
//           description: response.message || 'Échec du chargement des projets.',
//           variant: 'destructive',
//         });
//       }
//     } catch (error) {
//       toast({
//         title: 'Erreur',
//         description: error.message || 'Une erreur est survenue lors de la récupération des projets.',
//         variant: 'destructive',
//       });
//     }
//   };

//   // Fetch roadmap items
//   const fetchRoadmapItems = async () => {
//     try {
//       setIsRefreshing(true);
//       setErrorMessage(''); // Clear previous error message
//       const token = localStorage.getItem('bizwizusertoken');
//       const response = await ApiService('/user-roadmap', 'GET', null, false, token);
//       if (response.success) {
//         setRoadmapItems(response.data);
//       } else {
//         setErrorMessage(response.message || 'Une erreur est survenue.');
//       }
//     } catch (error) {
//       setErrorMessage(error.message || 'Une erreur est survenue lors de la récupération des éléments de la roadmap.');
//     } finally {
//       setIsRefreshing(false);
//     }
//   };

//   // Initial load
//   useEffect(() => {
//     const loadData = async () => {
//       setIsLoading(true);
//       await Promise.all([fetchUserProjects(), fetchRoadmapItems()]);
//       setIsLoading(false);
//     };
//     loadData();
//   }, []);

//   // Refresh when project selection changes
//   useEffect(() => {
//     if (!isLoading) {
//       fetchRoadmapItems();
//     }
//   }, [selectedProject]);

//   const handleRefresh = () => {
//     fetchRoadmapItems();
//   };

//   const filteredRoadmapItems = selectedProject === 'all' 
//     ? roadmapItems 
//     : roadmapItems.filter(item => item.form_data_id.toString() === selectedProject);

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <Card className="bg-bizzwiz-deep-space/30 border-[#8f00ff]/20 shadow-lg">
//         <CardHeader className="border-b border-[#8f00ff]/50">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//             <CardTitle className="text-2xl font-bold text-[#8f00ff] flex items-center gap-2">
//               <ClipboardList className="h-6 w-6 text-[#8f00ff]" />
//               Feuille de Route du Projet
//             </CardTitle>
//             <div className="flex items-center gap-2">
//               {userProjects.length > 0 && (
//                 <Select value={selectedProject} onValueChange={setSelectedProject}>
//                   <SelectTrigger className="w-[200px] bg-bizzwiz-deep-space/50 border-[#8f00ff]/20 text-bizzwiz-star-white">
//                     <SelectValue placeholder="Sélectionner un projet" />
//                   </SelectTrigger>
//                   <SelectContent className="bg-bizzwiz-deep-space border-[#8f00ff]/20">
//                     <SelectItem value="all" className="text-bizzwiz-star-white hover:bg-[#8f00ff]/20">
//                       Tous les projets
//                     </SelectItem>
//                     {userProjects.map((project) => (
//                       <SelectItem 
//                         key={project.id} 
//                         value={project.id.toString()}
//                         className="text-bizzwiz-star-white hover:bg-[#8f00ff]/20"
//                       >
//                         {project.project_name || project.name}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               )}
//               <Button
//                 onClick={handleRefresh}
//                 disabled={isRefreshing}
//                 variant="outline"
//                 size="sm"
//                 className="border-[#8f00ff]/20 text-[#8f00ff] hover:bg-[#8f00ff]/10"
//               >
//                 <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
//               </Button>
//             </div>
//           </div>
//         </CardHeader>
//         <CardContent className="space-y-4 p-4 md:p-6">
//           {isLoading ? (
//             <div className="text-center py-8">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8f00ff] mx-auto mb-4"></div>
//               <p className="text-bizzwiz-comet-tail">Chargement...</p>
//             </div>
//           ) : errorMessage ? (
//             <div className="flex items-center justify-center h-full min-h-[200px]">
//               <p className="text-bizzwiz-comet-tail text-center text-lg">
//                 {errorMessage}
//               </p>
//             </div>
//           ) : roadmapItems.length === 0 ? (
//             <div className="text-center py-8">
//               <ClipboardList className="h-12 w-12 text-bizzwiz-comet-tail mx-auto mb-4 opacity-50" />
//               <p className="text-bizzwiz-comet-tail">
//                 {selectedProject === 'all' 
//                   ? 'Aucun élément de roadmap disponible.' 
//                   : 'Aucun élément de roadmap pour ce projet.'}
//               </p>
//             </div>
//           ) : (
//             <div className="grid gap-4">
//               {filteredRoadmapItems
//                 .sort((a, b) => (a.order_index || 0) - (b.order_index || 0))
//                 .map((item, index) => {
//                   const statusInfo = getStatusInfo(item.status);
//                   return (
//                     <div
//                       key={item.id}
//                       className="group p-4 border border-[#8f00ff]/20 rounded-lg bg-bizzwiz-deep-space/50 hover:bg-bizzwiz-deep-space/70 transition-all duration-200"
//                     >
//                       <div className="flex items-start justify-between">
//                         <div className="flex items-center gap-3 min-w-0 flex-1">
//                           <div className="flex-shrink-0">
//                             {getIconComponent(item.icon)}
//                           </div>
//                           <div className="min-w-0 flex-1">
//                             <h3 className="font-medium text-bizzwiz-star-white text-lg">
//                               {item.name || `Étape ${index + 1}`}
//                             </h3>
//                             {selectedProject === 'all' && item.form_data_id && (
//                               <p className="text-sm text-[#8f00ff]/70 mb-1">
//                                 Projet: Form Data ID {item.form_data_id}
//                               </p>
//                             )}
//                             {item.description && (
//                               <p className="text-bizzwiz-comet-tail mt-2 leading-relaxed">
//                                 {item.description}
//                               </p>
//                             )}
//                           </div>
//                         </div>
//                         <div className="flex-shrink-0">
//                           <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusInfo.color} bg-current/10`}>
//                             {statusInfo.label}
//                           </span>
//                         </div>
//                       </div>
//                       <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-bizzwiz-comet-tail">
//                         {item.target_date && (
//                           <div className="flex items-center gap-2">
//                             <CalendarDays className="h-4 w-4 text-[#8f00ff]/70" />
//                             <span>
//                               Date cible: {new Date(item.target_date).toLocaleDateString('fr-FR')}
//                             </span>
//                           </div>
//                         )}
//                         {item.assigned_to && (
//                           <div className="flex items-center gap-2">
//                             <Users className="h-4 w-4 text-[#8f00ff]/70" />
//                             <span>Assigné à: {item.assigned_to}</span>
//                           </div>
//                         )}
//                         <div className="flex items-center gap-2">
//                           <span className="text-[#8f00ff]/70">Ordre: {item.order_index || 0}</span>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default RoadmapPage;




import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  MapPin,
  Lightbulb,
  BarChart2,
  Palette,
  Settings,
  TerminalSquare,
  SearchCheck,
  PartyPopper,
  CalendarDays,
  Rocket,
  Milestone,
  ClipboardList,
  Users,
  TrendingUp,
  ShieldCheck,
  Code2,
  Database,
  Cloud,
  Activity,
  Award,
  DollarSign,
  MessageSquare,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import ApiService from '@/apiService';

const iconOptions = [
  { value: 'Milestone', label: 'Jalon Majeur', icon: <Milestone /> },
  { value: 'ClipboardList', label: 'Planification', icon: <ClipboardList /> },
  { value: 'Lightbulb', label: 'Recherche/Concept', icon: <Lightbulb /> },
  { value: 'Palette', label: 'Design UI/UX', icon: <Palette /> },
  { value: 'Code2', label: 'Développement Frontend', icon: <Code2 /> },
  { value: 'TerminalSquare', label: 'Développement Backend', icon: <TerminalSquare /> },
  { value: 'Database', label: 'Base de Données', icon: <Database /> },
  { value: 'Cloud', label: 'Infrastructure', icon: <Cloud /> },
  { value: 'ShieldCheck', label: 'Sécurité/Tests', icon: <ShieldCheck /> },
  { value: 'SearchCheck', label: 'Revue/Feedback', icon: <SearchCheck /> },
  { value: 'PartyPopper', label: 'Déploiement/Go-Live', icon: <PartyPopper /> },
  { value: 'Rocket', label: 'Phase de Lancement', icon: <Rocket /> },
  { value: 'Users', label: 'Phase Utilisateurs', icon: <Users /> },
  { value: 'BarChart2', label: 'Analyse & Reporting', icon: <BarChart2 /> },
  { value: 'TrendingUp', label: 'Marketing/Croissance', icon: <TrendingUp /> },
  { value: 'Settings', label: 'Maintenance/Optimisation', icon: <Settings /> },
  { value: 'MapPin', label: 'Étape Générique', icon: <MapPin /> },
  { value: 'Activity', label: 'Tâche Spécifique', icon: <Activity /> },
  { value: 'Award', label: 'Objectif Atteint', icon: <Award /> },
  { value: 'DollarSign', label: 'Étape Financière', icon: <DollarSign /> },
  { value: 'MessageSquare', label: 'Communication/Réunion', icon: <MessageSquare /> },
  { value: 'CalendarDays', label: 'Échéance Importante', icon: <CalendarDays /> },
];

const roadmapStatusOptions = [
  { value: 'pending', label: 'En attente', color: 'text-gray-400' },
  { value: 'upcoming', label: 'À venir', color: 'text-blue-400' },
  { value: 'active', label: 'En cours', color: 'text-yellow-400' },
  { value: 'completed', label: 'Terminé', color: 'text-green-400' },
  { value: 'on_hold', label: 'En pause', color: 'text-orange-400' },
  { value: 'delayed', label: 'Retardé', color: 'text-red-400' },
  { value: 'cancelled', label: 'Annulé', color: 'text-red-600' },
];

const getIconComponent = (iconName) => {
  const selectedIcon = iconOptions.find((opt) => opt.value === iconName);
  return selectedIcon
    ? React.cloneElement(selectedIcon.icon, { className: 'h-5 w-5 stroke-2' })
    : <MapPin className="h-5 w-5 stroke-2" />;
};

const getStatusInfo = (status) => {
  return (
    roadmapStatusOptions.find((opt) => opt.value === status) || {
      label: status,
      color: 'text-gray-400',
    }
  );
};

const getStatusIcon = (status) => {
  switch (status) {
    case 'rejected':
      return <AlertCircle className="h-6 w-6 text-red-500" />;
    case 'completed':
    case 'payment_done':
      return <CheckCircle className="h-6 w-6 text-green-500" />;
    default:
      return <Clock className="h-6 w-6 text-yellow-500" />;
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'rejected':
      return 'text-red-400';
    case 'completed':
    case 'payment_done':
      return 'text-green-400';
    default:
      return 'text-yellow-400';
  }
};

const RoadmapPage = () => {
  const [roadmapItems, setRoadmapItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [projectStatus, setProjectStatus] = useState('');
  const [projectName, setProjectName] = useState('');
  const [projectId, setProjectId] = useState('');

  // Get project ID from localStorage
  useEffect(() => {
    const savedProjectId = localStorage.getItem('bizzwiz-selectedProjectId');
    if (savedProjectId) {
      setProjectId(savedProjectId);
    } else {
      setStatusMessage('Aucun projet sélectionné. Veuillez définir un projet.');
      setIsLoading(false);
    }
  }, []);

  // Fetch roadmap items for the project
  const fetchRoadmapItems = async () => {
    if (!projectId) return;

    try {
      setIsRefreshing(true);
      setStatusMessage('');
      setRoadmapItems([]);

      const token = localStorage.getItem('bizwizusertoken');
      const response = await ApiService(`/roadmap/${projectId}`, 'GET', null, false, token);

      if (response.success) {
        setRoadmapItems(response.data || []);
        setProjectStatus(response.project_status || '');
        setProjectName(response.project_name || 'Projet Sans Nom');
        setStatusMessage(response.message || '');
      } else {
        setStatusMessage(
          response.message || 'Une erreur est survenue lors de la récupération de la feuille de route.'
        );
        toast({
          title: 'Erreur',
          description: response.message || 'Échec de la récupération de la feuille de route.',
          variant: 'destructive',
        });
        setRoadmapItems([]);
      }
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      setStatusMessage(
        error.response?.data?.message ||
          'Une erreur est survenue lors de la récupération de la feuille de route.'
      );
      toast({
        title: 'Erreur',
        description:
          error.response?.data?.message || 'Échec de la récupération de la feuille de route.',
        variant: 'destructive',
      });
      setRoadmapItems([]);
    } finally {
      setIsRefreshing(false);
      setIsLoading(false);
    }
  };

  // Fetch roadmap when projectId is set
  useEffect(() => {
    if (projectId) {
      fetchRoadmapItems();
    }
  }, [projectId]);

  const handleRefresh = () => {
    if (projectId) {
      fetchRoadmapItems();
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Card className="bg-bizzwiz-deep-space/30 border-[#8f00ff]/20 shadow-lg">
        <CardHeader className="border-b border-[#8f00ff]/50">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold text-[#8f00ff] flex items-center gap-2">
              <ClipboardList className="h-6 w-6 text-[#8f00ff]" />
              Feuille de Route du Projet
            </CardTitle>
            <Button
              onClick={handleRefresh}
              disabled={isRefreshing || !projectId}
              variant="outline"
              size="sm"
              className="border-[#8f00ff]/20 text-[#8f00ff] hover:bg-[#8f00ff]/10"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </Button>
          </div>
          {projectName && (
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm text-bizzwiz-comet-tail">Projet actuel:</span>
              <span className="text-sm font-medium text-bizzwiz-star-white">{projectName}</span>
              {projectStatus && (
                <div className="flex items-center gap-1">
                  {getStatusIcon(projectStatus)}
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                      projectStatus
                    )} bg-current/10`}
                  >
                    {projectStatus}
                  </span>
                </div>
              )}
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-4 p-4 md:p-6">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8f00ff] mx-auto mb-4"></div>
              <p className="text-bizzwiz-comet-tail">Chargement...</p>
            </div>
          ) : !projectId ? (
            <div className="text-center py-8">
              <ClipboardList className="h-12 w-12 text-bizzwiz-comet-tail mx-auto mb-4 opacity-50" />
              <p className="text-bizzwiz-comet-tail">Aucun projet sélectionné. Veuillez définir un projet.</p>
            </div>
          ) : statusMessage && roadmapItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[200px]">
              {getStatusIcon(projectStatus)}
              <p className="text-bizzwiz-comet-tail text-center text-lg mt-4">{statusMessage}</p>
            </div>
          ) : roadmapItems.length === 0 ? (
            <div className="text-center py-8">
              <ClipboardList className="h-12 w-12 text-bizzwiz-comet-tail mx-auto mb-4 opacity-50" />
              <p className="text-bizzwiz-comet-tail">Ce projet n'a pas encore de feuille de route.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {roadmapItems
  .sort((a, b) => (a.order_index || 0) - (b.order_index || 0))
  .map((item, index) => {
    const statusInfo = getStatusInfo(item.status);
    return (
      <div
        key={item.id}
        className="group p-4 border border-[#8f00ff]/20 rounded-lg bg-bizzwiz-deep-space/50 hover:bg-bizzwiz-deep-space/70 transition-all duration-200"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="flex-shrink-0">{getIconComponent(item.icon)}</div>
            <div className="min-w-0 flex-1">
              <h3 className="font-medium text-bizzwiz-star-white text-lg">
                {item.name || `Étape ${index + 1}`}
              </h3>
              {item.description && (
                <p className="text-bizzwiz-comet-tail mt-2 leading-relaxed">{item.description}</p>
              )}
            </div>
          </div>
          <div className="flex-shrink-0">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${statusInfo.color} bg-current/10`}
            >
              {statusInfo.label}
            </span>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-bizzwiz-comet-tail">
          {item.target_date && (
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-[#8f00ff]/70" />
              <span>Date cible: Kopiera {new Date(item.target_date).toLocaleDateString('fr-FR')}</span>
            </div>
          )}
          {item.assigned_to && (
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-[#8f00ff]/70" />
              <span>Assigné à: {item.assigned_to}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <span className="text-[#8f00ff]/70">Ordre: {item.order_index || 0}</span>
          </div>
        </div>
      </div>
    );
  })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RoadmapPage;