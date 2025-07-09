// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { Button } from '@/components/ui/button';
// import { useToast } from '@/components/ui/use-toast';
// import { ArrowLeft, Brain, Loader2, Save } from 'lucide-react';
// import ApiService from '@/apiService';
// import ProjectGeneralInfoEditor from '@/components/admin/project-editor/ProjectGeneralInfoEditor';
// import ProjectRoadmapEditor from '@/components/admin/project-editor/ProjectRoadmapEditor';
// import ProjectFeaturesEditor from '@/components/admin/project-editor/ProjectFeaturesEditor';
// import ProjectActivityEditor from '@/components/admin/project-editor/ProjectActivityEditor';
// import ProjectLinksEditor from '@/components/admin/project-editor/ProjectLinksEditor';

// const AdminProjectDetailEditorPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   const [projectData, setProjectData] = useState(null);
//   const [formData, setFormData] = useState(null);
//   const [roadmapItems, setRoadmapItems] = useState([]);
//   const [projectFeatures, setProjectFeatures] = useState([]);
//   const [projectActivities, setProjectActivities] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSavingGeneral, setIsSavingGeneral] = useState(false);
//   const [isSavingLinks, setIsSavingLinks] = useState(false);
//   const [isSavingRoadmap, setIsSavingRoadmap] = useState(false);
//   const [isSavingFeatures, setIsSavingFeatures] = useState(false);
//   const [isSavingActivities, setIsSavingActivities] = useState(false);
//   const [isRegenerating, setIsRegenerating] = useState(false);

//   useEffect(() => {
//     const fetchAllData = async () => {
//       setIsLoading(true);
//       const token = localStorage.getItem('bizwizusertoken');

//       try {
//         // Parallel fetching for performance
//         const [
//           formResponse,
//           projectResponse,
//           linksResponse,
//           roadmapResponse,
//           featuresResponse,
//           activitiesResponse,
//         ] = await Promise.all([
//           ApiService(`/form-data/${id}`, 'GET', null, false, token),
//           ApiService(`/admin/projects/${id}`, 'GET', null, false, token).catch(() => ({ data: null })),
//           ApiService(`/admin/projects/${id}/links`, 'GET', null, false, token).catch(() => ({ data: null })),
//           ApiService(`/admin/projects/${id}/roadmap`, 'GET', null, false, token).catch(() => ({ data: [] })),
//           ApiService(`/admin/projects/${id}/features`, 'GET', null, false, token).catch(() => ({ data: [] })),
//           ApiService(`/admin/projects/${id}/activities`, 'GET', null, false, token).catch(() => ({ data: [] })),
//         ]);

//         // Handle FormData
//         if (!formResponse.data) {
//           throw new Error('Form data not found');
//         }
//         setFormData(formResponse.data);

//         // Handle Project Data
//         const defaultProjectData = {
//           id: null,
//           name: formResponse.data.project_name || '',
//           description: formResponse.data.project_description || '',
//           progress: 0,
//           project_price: formResponse.data.budget || 0,
//           start_date: '',
//           end_date: '',
//           status: 'pending',
//           figma_url: '',
//           payment_url: '',
//           user_id: formResponse.data.user_id,
//           form_data_id: id,
//         };
//         setProjectData({
//           ...defaultProjectData,
//           ...projectResponse.data,
//           figma_url: linksResponse.data?.figma_url || defaultProjectData.figma_url,
//           payment_url: linksResponse.data?.payment_url || defaultProjectData.payment_url,
//         });

//         // Handle Roadmap, Features, and Activities
//         setRoadmapItems(roadmapResponse.data || []);
//         setProjectFeatures(featuresResponse.data || []);
//         setProjectActivities(activitiesResponse.data || []);

//         // Show warnings for missing data
//         if (!projectResponse.data) {
//           toast({
//             title: 'Warning',
//             description: 'No project found. Initialized with default values.',
//             variant: 'default',
//           });
//         }
//         if (!linksResponse.data) {
//           toast({
//             title: 'Warning',
//             description: 'No links found. Using default values.',
//             variant: 'default',
//           });
//         }
//         if (!roadmapResponse.data?.length) {
//           toast({
//             title: 'Warning',
//             description: 'No roadmap items found.',
//             variant: 'default',
//           });
//         }
//         if (!featuresResponse.data?.length) {
//           toast({
//             title: 'Warning',
//             description: 'No features found.',
//             variant: 'default',
//           });
//         }
//         if (!activitiesResponse.data?.length) {
//           toast({
//             title: 'Warning',
//             description: 'No activities found.',
//             variant: 'default',
//           });
//         }
//       } catch (error) {
//         toast({
//           title: 'Error',
//           description: error.message || 'Failed to load project data.',
//           variant: 'destructive',
//         });
//         navigate('/app-admin/projets');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchAllData();
//   }, [id, navigate, toast]);

//   const handleSaveSection = async (section) => {
//     const token = localStorage.getItem('bizwizusertoken');
//     const setIsSaving = {
//       general: setIsSavingGeneral,
//       links: setIsSavingLinks,
//       roadmap: setIsSavingRoadmap,
//       features: setIsSavingFeatures,
//       activities: setIsSavingActivities,
//     }[section];

//     setIsSaving(true);
//     try {
//       if (section === 'general' && projectData) {
//         const data = {
//           project_name: projectData.name,
//           project_description: projectData.description,
//           budget: projectData.project_price,
//           progress: projectData.progress,
//           start_date: projectData.start_date,
//           end_date: projectData.end_date,
//           status: projectData.status,
//           form_data_id: id,
//           user_id: projectData.user_id,
//         };
//         const response = await ApiService(
//           projectData.id ? `/admin/projects/${id}` : `/admin/projects`,
//           projectData.id ? 'PATCH' : 'POST',
//           data,
//           false,
//           token
//         );
//         setProjectData((prev) => ({
//           ...prev,
//           id: response.data.id,
//           name: response.data.project_name,
//           description: response.data.project_description,
//           progress: response.data.progress,
//           project_price: response.data.budget,
//           start_date: response.data.start_date,
//           end_date: response.data.end_date,
//           status: response.data.status,
//           form_data_id: response.data.form_data_id,
//           user_id: response.data.user_id,
//         }));
//         toast({
//           title: 'Success',
//           description: 'General information saved successfully.',
//           className: 'bg-green-500 text-white',
//         });
//       } else if (section === 'links' && projectData) {
//         const data = {
//           figma_url: projectData.figma_url || '',
//           payment_url: projectData.payment_url || '',
//         };
//         const response = await ApiService(`/admin/projects/${id}/links`, 'PATCH', data, false, token);
//         if (response.success) {
//           setProjectData((prev) => ({
//             ...prev,
//             figma_url: response.data.figma_url || prev.figma_url,
//             payment_url: response.data.payment_url || prev.payment_url,
//           }));
//           toast({
//             title: 'Success',
//             description: 'Links saved successfully.',
//             className: 'bg-green-500 text-white',
//           });
//         } else {
//           throw new Error(response.message || 'Failed to save links');
//         }
//       } else if (section === 'roadmap') {
//         const updatedItems = await Promise.all(
//           roadmapItems.map(async (item) => {
//             const data = {
//               name: item.name,
//               description: item.description || '',
//               status: item.status,
//               icon: item.icon,
//               target_date: item.target_date || null,
//               assigned_to: item.assigned_to || '',
//               order_index: item.order_index || 0,
//             };
//             if (!item.id || typeof item.id === 'string') {
//               const response = await ApiService(`/admin/projects/${id}/roadmap`, 'POST', data, false, token);
//               return response.data;
//             }
//             const response = await ApiService(`/admin/projects/${id}/roadmap/${item.id}`, 'PATCH', data, false, token);
//             return response.data;
//           })
//         );
//         setRoadmapItems(updatedItems);
//         toast({
//           title: 'Success',
//           description: 'Roadmap saved successfully.',
//           className: 'bg-green-500 text-white',
//         });
//       } else if (section === 'features') {
//         const updatedFeatures = await Promise.all(
//           projectFeatures.map(async (feature) => {
//             const data = {
//               name: feature.name,
//               description: feature.description || '',
//               status: feature.status,
//               icon: feature.icon,
//             };
//             if (!feature.id || typeof feature.id === 'string') {
//               const response = await ApiService(`/admin/projects/${id}/features`, 'POST', data, false, token);
//               return response.data;
//             }
//             const response = await ApiService(`/admin/projects/${id}/features/${feature.id}`, 'PATCH', data, false, token);
//             return response.data;
//           })
//         );
//         setProjectFeatures(updatedFeatures);
//         toast({
//           title: 'Success',
//           description: 'Features saved successfully.',
//           className: 'bg-green-500 text-white',
//         });
//       } else if (section === 'activities') {
//         const newActivities = projectActivities.filter((activity) => !activity.id && activity.tempId);
//         if (newActivities.length === 0) {
//           toast({
//             title: 'Info',
//             description: 'No new activities to save.',
//             variant: 'default',
//           });
//           setIsSaving(false);
//           return;
//         }

//         const savedActivities = await Promise.all(
//           newActivities.map(async (activity) => {
//             const data = {
//               activity_log: activity.activity_log,
//               actor: activity.actor,
//               created_at: activity.created_at,
//             };
//             const response = await ApiService(`/admin/projects/${id}/activities`, 'POST', data, false, token);
//             return response.data;
//           })
//         );

//         const activitiesResponse = await ApiService(`/admin/projects/${id}/activities`, 'GET', null, false, token);
//         setProjectActivities(activitiesResponse.data || savedActivities);
//         toast({
//           title: 'Success',
//           description: `${savedActivities.length} activity(ies) saved successfully.`,
//           className: 'bg-green-500 text-white',
//         });
//       }
//     } catch (error) {
//       toast({
//         title: 'Error',
//         description: error.message || `Failed to save ${section} section.`,
//         variant: 'destructive',
//       });
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleRegenerateAI = async () => {
//     setIsRegenerating(true);
//     try {
//       toast({
//         title: 'Info',
//         description: 'AI regeneration not implemented yet.',
//         variant: 'default',
//       });
//     } catch (error) {
//       toast({
//         title: 'Error',
//         description: error.message || 'AI regeneration failed.',
//         variant: 'destructive',
//       });
//     } finally {
//       setIsRegenerating(false);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <Loader2 className="h-8 w-8 animate-spin text-red-500" />
//         <p className="ml-3 text-slate-300">Loading project...</p>
//       </div>
//     );
//   }

//   if (!formData) {
//     return (
//       <div className="flex flex-col justify-center items-center h-64">
//         <p className="text-slate-300 mb-4">No form data found for this ID.</p>
//         <Button
//           variant="outline"
//           onClick={() => navigate('/app-admin/projets')}
//           className="border-red-500 text-red-400 hover:bg-red-500/10 hover:text-red-300"
//         >
//           Back to Projects
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3 }}
//       className="container max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8"
//     >
//       <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
//         <Button
//           variant="ghost"
//           onClick={() => navigate('/app-admin/projets')}
//           className="text-red-400 hover:bg-red-500/10 hover:text-red-300 w-full sm:w-auto"
//           aria-label="Back to projects"
//         >
//           <ArrowLeft className="h-5 w-5 stroke-2 mr-2" />
//           Back to Projects
//         </Button>
//         <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
//           <Button
//             onClick={handleRegenerateAI}
//             disabled={isRegenerating || isSavingGeneral || isSavingLinks || isSavingRoadmap || isSavingFeatures || isSavingActivities}
//             variant="outline"
//             className="border-red-500 text-red-400 hover:bg-red-500/10 hover:text-red-300 w-full sm:w-auto"
//           >
//             {isRegenerating ? (
//               <Loader2 className="h-4 w-4 animate-spin mr-2" />
//             ) : (
//               <Brain className="h-5 w-5 stroke-2 mr-2" />
//             )}
//             Regenerate (AI)
//           </Button>
//         </div>
//       </div>

//       <div className="space-y-6">
//         <div className="bg-slate-700/30 border-slate-600 shadow-lg rounded-lg p-4">
//           <ProjectGeneralInfoEditor
//             projectData={projectData}
//             setProjectData={setProjectData}
//             originalFormAnswers={formData}
//           />
//           <div className="mt-4">
//             <Button
//               onClick={() => handleSaveSection('general')}
//               disabled={isSavingGeneral || isRegenerating || !projectData}
//               className="bg-red-500 hover:bg-red-600 text-white w-full sm:w-auto"
//             >
//               {isSavingGeneral ? (
//                 <Loader2 className="h-4 w-4 animate-spin mr-2" />
//               ) : (
//                 <Save className="h-5 w-5 stroke-2 mr-2" />
//               )}
//               Save
//             </Button>
//           </div>
//         </div>

//         <div className="bg-slate-700/30 border-slate-600 shadow-lg rounded-lg p-4">
//           <ProjectLinksEditor
//             projectData={projectData}
//             setProjectData={setProjectData}
//             isSavingLinks={isSavingLinks}
//             handleSaveSection={handleSaveSection}
//           />
//           <div className="mt-4">
//             <Button
//               onClick={() => handleSaveSection('links')}
//               disabled={isSavingLinks || isRegenerating || !projectData}
//               className="bg-red-500 hover:bg-red-600 text-white w-full sm:w-auto"
//             >
//               {isSavingLinks ? (
//                 <Loader2 className="h-4 w-4 animate-spin mr-2" />
//               ) : (
//                 <Save className="h-5 w-5 stroke-2 mr-2" />
//               )}
//               Save
//             </Button>
//           </div>
//         </div>

//         <div className="bg-slate-700/30 border-slate-600 shadow-lg rounded-lg p-4">
//           <ProjectRoadmapEditor
//             roadmapItems={roadmapItems}
//             setRoadmapItems={setRoadmapItems}
//             projectId={id}
//           />
//           <div className="mt-4">
//             <Button
//               onClick={() => handleSaveSection('roadmap')}
//               disabled={isSavingRoadmap || isRegenerating}
//               className="bg-red-500 hover:bg-red-600 text-white w-full sm:w-auto"
//             >
//               {isSavingRoadmap ? (
//                 <Loader2 className="h-4 w-4 animate-spin mr-2" />
//               ) : (
//                 <Save className="h-5 w-5 stroke-2 mr-2" />
//               )}
//               Save
//             </Button>
//           </div>
//         </div>

//         <div className="bg-slate-700/30 border-slate-600 shadow-lg rounded-lg p-4">
//           <ProjectFeaturesEditor
//             projectFeatures={projectFeatures}
//             setProjectFeatures={setProjectFeatures}
//             projectId={id}
//           />
//           <div className="mt-4">
//             <Button
//               onClick={() => handleSaveSection('features')}
//               disabled={isSavingFeatures || isRegenerating}
//               className="bg-red-500 hover:bg-red-600 text-white w-full sm:w-auto"
//             >
//               {isSavingFeatures ? (
//                 <Loader2 className="h-4 w-4 animate-spin mr-2" />
//               ) : (
//                 <Save className="h-5 w-5 stroke-2 mr-2" />
//               )}
//               Save
//             </Button>
//           </div>
//         </div>

//         <div className="bg-slate-700/30 border-slate-600 shadow-lg rounded-lg p-4">
//           <ProjectActivityEditor
//             projectActivities={projectActivities}
//             setProjectActivities={setProjectActivities}
//             projectId={id}
//           />
//           <div className="mt-4">
//             <Button
//               onClick={() => handleSaveSection('activities')}
//               disabled={isSavingActivities || isRegenerating}
//               className="bg-red-500 hover:bg-red-600 text-white w-full sm:w-auto"
//             >
//               {isSavingActivities ? (
//                 <Loader2 className="h-4 w-4 animate-spin mr-2" />
//               ) : (
//                 <Save className="h-5 w-5 stroke-2 mr-2" />
//               )}
//               Save
//             </Button>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default AdminProjectDetailEditorPage;



import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, Brain, Loader2, Save } from 'lucide-react';
import ApiService from '@/apiService';
import ProjectGeneralInfoEditor from '@/components/admin/project-editor/ProjectGeneralInfoEditor';
import ProjectRoadmapEditor from '@/components/admin/project-editor/ProjectRoadmapEditor';
import ProjectFeaturesEditor from '@/components/admin/project-editor/ProjectFeaturesEditor';
import ProjectActivityEditor from '@/components/admin/project-editor/ProjectActivityEditor';
import ProjectLinksEditor from '@/components/admin/project-editor/ProjectLinksEditor';

const AdminProjectDetailEditorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [projectData, setProjectData] = useState(null);
  const [formData, setFormData] = useState(null);
  const [roadmapItems, setRoadmapItems] = useState([]);
  const [projectFeatures, setProjectFeatures] = useState([]);
  const [projectActivities, setProjectActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingGeneral, setIsSavingGeneral] = useState(false);
  const [isSavingLinks, setIsSavingLinks] = useState(false);
  const [isSavingRoadmap, setIsSavingRoadmap] = useState(false);
  const [isSavingFeatures, setIsSavingFeatures] = useState(false);
  const [isSavingActivities, setIsSavingActivities] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      const token = localStorage.getItem('bizwizusertoken');

      try {
        // Parallel fetching for performance
        const [
          formResponse,
          projectResponse,
          linksResponse,
          roadmapResponse,
          featuresResponse,
          activitiesResponse,
        ] = await Promise.all([
          ApiService(`/form-data/${id}`, 'GET', null, false, token),
          ApiService(`/admin/projects/${id}`, 'GET', null, false, token).catch(() => ({ data: null })),
          ApiService(`/admin/projects/${id}/links`, 'GET', null, false, token).catch(() => ({ data: null })),
          ApiService(`/admin/projects/${id}/roadmap`, 'GET', null, false, token).catch(() => ({ data: [] })),
          ApiService(`/admin/projects/${id}/features`, 'GET', null, false, token).catch(() => ({ data: [] })),
          ApiService(`/admin/projects/${id}/activities`, 'GET', null, false, token).catch(() => ({ data: [] })),
        ]);

        // Handle FormData
        if (!formResponse.data) {
          throw new Error('Form data not found');
        }
        setFormData(formResponse.data);

        // Handle Project Data
        const defaultProjectData = {
          id: null,
          name: formResponse.data.project_name || '',
          description: formResponse.data.project_description || '',
          progress: 0,
          project_price: formResponse.data.budget || 0,
          start_date: '',
          end_date: '',
          status: 'pending',
          figma_url: '',
          payment_url: '',
          user_id: formResponse.data.user_id,
          form_data_id: id,
        };
        setProjectData({
          ...defaultProjectData,
          ...projectResponse.data,
          figma_url: linksResponse.data?.figma_url || defaultProjectData.figma_url,
          payment_url: linksResponse.data?.payment_url || defaultProjectData.payment_url,
        });

        // Handle Roadmap, Features, and Activities
        setRoadmapItems(roadmapResponse.data || []);
        setProjectFeatures(featuresResponse.data || []);
        setProjectActivities(activitiesResponse.data || []);

        // Show [

        // Show warnings for missing data
        if (!projectResponse.data) {
          toast({
            title: 'Warning',
            description: 'No project found. Initialized with default values.',
            variant: 'default',
          });
        }
        if (!linksResponse.data) {
          toast({
            title: 'Warning',
            description: 'No links found. Using default values.',
            variant: 'default',
          });
        }
        if (!roadmapResponse.data?.length) {
          toast({
            title: 'Warning',
            description: 'No roadmap items found.',
            variant: 'default',
          });
        }
        if (!featuresResponse.data?.length) {
          toast({
            title: 'Warning',
            description: 'No features found.',
            variant: 'default',
          });
        }
        if (!activitiesResponse.data?.length) {
          toast({
            title: 'Warning',
            description: 'No activities found.',
            variant: 'default',
          });
        }
      } catch (error) {
        toast({
          title: 'Error',
          description: error.message || 'Failed to load project data.',
          variant: 'destructive',
        });
        navigate('/app-admin/projets');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, [id, navigate, toast]);

  const handleSaveSection = async (section) => {
    const token = localStorage.getItem('bizwizusertoken');
    const setIsSaving = {
      general: setIsSavingGeneral,
      links: setIsSavingLinks,
      roadmap: setIsSavingRoadmap,
      features: setIsSavingFeatures,
      activities: setIsSavingActivities,
    }[section];

    setIsSaving(true);
    try {
      if (section === 'general' && projectData) {
        const data = {
          project_name: projectData.name,
          project_description: projectData.description,
          budget: projectData.project_price,
          progress: projectData.progress,
          start_date: projectData.start_date,
          end_date: projectData.end_date,
          status: projectData.status,
          form_data_id: id,
          user_id: projectData.user_id,
        };
        const response = await ApiService(
          `/admin/projects/${id}`,
          projectData.id ? 'PATCH' : 'POST',
          data,
          false,
          token
        );
        setProjectData((prev) => ({
          ...prev,
          id: response.data.id,
          name: response.data.project_name,
          description: response.data.project_description,
          progress: response.data.progress,
          project_price: response.data.budget,
          start_date: response.data.start_date,
          end_date: response.data.end_date,
          status: response.data.status,
          form_data_id: response.data.form_data_id,
          user_id: response.data.user_id,
        }));
        toast({
          title: 'Success',
          description: 'General information saved successfully.',
          className: 'bg-green-500 text-white',
        });
      } else if (section === 'links' && projectData) {
        const data = {
          figma_url: projectData.figma_url || '',
          payment_url: projectData.payment_url || '',
        };
        const response = await ApiService(`/admin/projects/${id}/links`, 'POST', data, false, token);
        if (response.success) {
          setProjectData((prev) => ({
            ...prev,
            figma_url: response.data.figma_url || prev.figma_url,
            payment_url: response.data.payment_url || prev.payment_url,
          }));
          toast({
            title: 'Success',
            description: 'Links saved successfully.',
            className: 'bg-green-500 text-white',
          });
        } else {
          throw new Error(response.message || 'Failed to save links');
        }
      } else if (section === 'roadmap') {
        const updatedItems = await Promise.all(
          roadmapItems.map(async (item) => {
            const data = {
              name: item.name,
              description: item.description || '',
              status: item.status,
              icon: item.icon,
              target_date: item.target_date || null,
              assigned_to: item.assigned_to || '',
              order_index: item.order_index || 0,
            };
            if (!item.id || typeof item.id === 'string') {
              const response = await ApiService(`/admin/projects/${id}/roadmap`, 'POST', data, false, token);
              return response.data;
            }
            const response = await ApiService(`/admin/projects/${id}/roadmap/${item.id}`, 'PATCH', data, false, token);
            return response.data;
          })
        );
        setRoadmapItems(updatedItems);
        toast({
          title: 'Success',
          description: 'Roadmap saved successfully.',
          className: 'bg-green-500 text-white',
        });
      } else if (section === 'features') {
        const updatedFeatures = await Promise.all(
          projectFeatures.map(async (feature) => {
            const data = {
              name: feature.name,
              description: feature.description || '',
              status: feature.status,
              icon: feature.icon,
            };
            if (!feature.id || typeof feature.id === 'string') {
              const response = await ApiService(`/admin/projects/${id}/features`, 'POST', data, false, token);
              return response.data;
            }
            const response = await ApiService(`/admin/projects/${id}/features/${feature.id}`, 'PATCH', data, false, token);
            return response.data;
          })
        );
        setProjectFeatures(updatedFeatures);
        toast({
          title: 'Success',
          description: 'Features saved successfully.',
          className: 'bg-green-500 text-white',
        });
      } else if (section === 'activities') {
        const newActivities = projectActivities.filter((activity) => !activity.id && activity.tempId);
        if (newActivities.length === 0) {
          toast({
            title: 'Info',
            description: 'No new activities to save.',
            variant: 'default',
          });
          setIsSaving(false);
          return;
        }

        const savedActivities = await Promise.all(
          newActivities.map(async (activity) => {
            const data = {
              activity_log: activity.activity_log,
              actor: activity.actor,
              created_at: activity.created_at,
            };
            const response = await ApiService(`/admin/projects/${id}/activities`, 'POST', data, false, token);
            return response.data;
          })
        );

        const activitiesResponse = await ApiService(`/admin/projects/${id}/activities`, 'GET', null, false, token);
        setProjectActivities(activitiesResponse.data || savedActivities);
        toast({
          title: 'Success',
          description: `${savedActivities.length} activity(ies) saved successfully.`,
          className: 'bg-green-500 text-white',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || `Failed to save ${section} section.`,
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleRegenerateAI = async () => {
    setIsRegenerating(true);
    try {
      toast({
        title: 'Info',
        description: 'AI regeneration not implemented yet.',
        variant: 'default',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'AI regeneration failed.',
        variant: 'destructive',
      });
    } finally {
      setIsRegenerating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-red-500" />
        <p className="ml-3 text-slate-300">Loading project...</p>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="flex flex-col justify-center items-center h-64">
        <p className="text-slate-300 mb-4">No form data found for this ID.</p>
        <Button
          variant="outline"
          onClick={() => navigate('/app-admin/projets')}
          className="border-red-500 text-red-400 hover:bg-red-500/10 hover:text-red-300"
        >
          Back to Projects
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="container max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8"
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate('/app-admin/projets')}
          className="text-red-400 hover:bg-red-500/10 hover:text-red-300 w-full sm:w-auto"
          aria-label="Back to projects"
        >
          <ArrowLeft className="h-5 w-5 stroke-2 mr-2" />
          Back to Projects
        </Button>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Button
            onClick={handleRegenerateAI}
            disabled={isRegenerating || isSavingGeneral || isSavingLinks || isSavingRoadmap || isSavingFeatures || isSavingActivities}
            variant="outline"
            className="border-red-500 text-red-400 hover:bg-red-500/10 hover:text-red-300 w-full sm:w-auto"
          >
            {isRegenerating ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Brain className="h-5 w-5 stroke-2 mr-2" />
            )}
            Regenerate (AI)
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-slate-700/30 border-slate-600 shadow-lg rounded-lg p-4">
          <ProjectGeneralInfoEditor
            projectData={projectData}
            setProjectData={setProjectData}
            originalFormAnswers={formData}
          />
          <div className="mt-4">
            <Button
              onClick={() => handleSaveSection('general')}
              disabled={isSavingGeneral || isRegenerating || !projectData}
              className="bg-red-500 hover:bg-red-600 text-white w-full sm:w-auto"
            >
              {isSavingGeneral ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Save className="h-5 w-5 stroke-2 mr-2" />
              )}
              Save
            </Button>
          </div>
        </div>

        <div className="bg-slate-700/30 border-slate-600 shadow-lg rounded-lg p-4">
          <ProjectLinksEditor
            projectData={projectData}
            setProjectData={setProjectData}
            isSavingLinks={isSavingLinks}
            handleSaveSection={handleSaveSection}
          />
          <div className="mt-4">
            <Button
              onClick={() => handleSaveSection('links')}
              disabled={isSavingLinks || isRegenerating || !projectData}
              className="bg-red-500 hover:bg-red-600 text-white w-full sm:w-auto"
            >
              {isSavingLinks ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Save className="h-5 w-5 stroke-2 mr-2" />
              )}
              Save
            </Button>
          </div>
        </div>

        <div className="bg-slate-700/30 border-slate-600 shadow-lg rounded-lg p-4">
          <ProjectRoadmapEditor
            roadmapItems={roadmapItems}
            setRoadmapItems={setRoadmapItems}
            projectId={id}
          />
          <div className="mt-4">
            <Button
              onClick={() => handleSaveSection('roadmap')}
              disabled={isSavingRoadmap || isRegenerating}
              className="bg-red-500 hover:bg-red-600 text-white w-full sm:w-auto"
            >
              {isSavingRoadmap ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Save className="h-5 w-5 stroke-2 mr-2" />
              )}
              Save
            </Button>
          </div>
        </div>

        <div className="bg-slate-700/30 border-slate-600 shadow-lg rounded-lg p-4">
          <ProjectFeaturesEditor
            projectFeatures={projectFeatures}
            setProjectFeatures={setProjectFeatures}
            projectId={id}
          />
          <div className="mt-4">
            <Button
              onClick={() => handleSaveSection('features')}
              disabled={isSavingFeatures || isRegenerating}
              className="bg-red-500 hover:bg-red-600 text-white w-full sm:w-auto"
            >
              {isSavingFeatures ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Save className="h-5 w-5 stroke-2 mr-2" />
              )}
              Save
            </Button>
          </div>
        </div>

        <div className="bg-slate-700/30 border-slate-600 shadow-lg rounded-lg p-4">
          <ProjectActivityEditor
            projectActivities={projectActivities}
            setProjectActivities={setProjectActivities}
            projectId={id}
          />
          <div className="mt-4">
            <Button
              onClick={() => handleSaveSection('activities')}
              disabled={isSavingActivities || isRegenerating}
              className="bg-red-500 hover:bg-red-600 text-white w-full sm:w-auto"
            >
              {isSavingActivities ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Save className="h-5 w-5 stroke-2 mr-2" />
              )}
              Save
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminProjectDetailEditorPage;