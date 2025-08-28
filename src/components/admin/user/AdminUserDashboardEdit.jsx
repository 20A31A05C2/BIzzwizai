import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Edit3, 
  Trash2, 
  Plus, 
  Search, 
  Calendar,
  User,
  BarChart3,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  X,
  Link as LinkIcon,
  Settings,
  Lightbulb,
  TerminalSquare,
  Palette,
  Code2,
  ShieldCheck,
  Users,
  DollarSign,
  BarChart2,
  MessageSquare,
  Database,
  Cloud,
  SearchCheck,
  Rocket,
  Award,
  TrendingUp,
  Activity,
  Milestone
} from 'lucide-react';
import ApiService from '../../../apiService';
import { toast } from '@/components/ui/use-toast';

const AdminUserDashboardEdit = () => {
  const navigate = useNavigate();
  const { userId, formDataId } = useParams();
  const [activeTab, setActiveTab] = useState('projectdetails');
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingRoadmap, setEditingRoadmap] = useState(null);
  const [formData, setFormData] = useState({
    user_id: userId,
    form_data_id: formDataId,
    project_title: '',
    description: '',
    responsible_person: '',
    status: 'en_attente',
    progress_percentage: 0,
    deliverables_count: 0,
    start_date: '',
    end_date: '',
    tags: []
  });
  const [projectDetails, setProjectDetails] = useState({
    project_name: '',
    description: '',
    type: '',
    team_assigned: '', // ensure not null
    progress: '',
    status: '',
    budget: '',
    start_date: '',
    end_date: ''
  });
  const [existingProjectDetails, setExistingProjectDetails] = useState(null);
  const [formDataInfo, setFormDataInfo] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [technologies, setTechnologies] = useState([]);
  const [technologyInput, setTechnologyInput] = useState("");
  const [technologyEditId, setTechnologyEditId] = useState(null);
  const [technologyLoading, setTechnologyLoading] = useState(false);
  const [showTechDeleteId, setShowTechDeleteId] = useState(null);
  const [showRoadmapDeleteId, setShowRoadmapDeleteId] = useState(null);
  const [team, setTeam] = useState([]);
  const [teamInput, setTeamInput] = useState({ name: '', specialization: '' });
  const [teamEditId, setTeamEditId] = useState(null);
  const [showTeamDeleteId, setShowTeamDeleteId] = useState(null);
  const [loadingProjectDetails, setLoadingProjectDetails] = useState(true);
  const [projectLinks, setProjectLinks] = useState({ figma_url: '', payment_url: '' });
  const [linksLoading, setLinksLoading] = useState(false);
  const [linksForm, setLinksForm] = useState({ figma_url: '', payment_url: '' });
  const [features, setFeatures] = useState([]);
  const [showFeatureForm, setShowFeatureForm] = useState(false);
  const [editingFeature, setEditingFeature] = useState(null);
  const [featureForm, setFeatureForm] = useState({
    name: '',
    description: '',
    status: 'planned',
    icon: 'Activity',
  });

  const featureStatusOptions = [
    { value: 'planned', label: 'Planifié' },
    { value: 'in_progress', label: 'En cours' },
    { value: 'development', label: 'En développement' },
    { value: 'testing', label: 'En test' },
    { value: 'completed', label: 'Terminé' },
    { value: 'on_hold', label: 'En attente' },
    { value: 'cancelled', label: 'Annulé' },
    { value: 'needs_review', label: 'Nécessite révision' },
  ];
  const featureIconOptions = [
    { value: 'Settings', label: 'Configuration', icon: <Settings /> },
    { value: 'Lightbulb', label: 'Idéation', icon: <Lightbulb /> },
    { value: 'TerminalSquare', label: 'Développement Backend', icon: <TerminalSquare /> },
    { value: 'Palette', label: 'Design UI/UX', icon: <Palette /> },
    { value: 'Code2', label: 'Développement Frontend', icon: <Code2 /> },
    { value: 'ShieldCheck', label: 'Sécurité', icon: <ShieldCheck /> },
    { value: 'Users', label: 'Gestion Utilisateurs', icon: <Users /> },
    { value: 'DollarSign', label: 'Monétisation', icon: <DollarSign /> },
    { value: 'BarChart2', label: 'Analyse & Données', icon: <BarChart2 /> },
    { value: 'MessageSquare', label: 'Communication', icon: <MessageSquare /> },
    { value: 'Database', label: 'Base de Données', icon: <Database /> },
    { value: 'Cloud', label: 'Infrastructure Cloud', icon: <Cloud /> },
    { value: 'SearchCheck', label: 'Tests & QA', icon: <SearchCheck /> },
    { value: 'Rocket', label: 'Lancement', icon: <Rocket /> },
    { value: 'Award', label: 'Objectif Clé', icon: <Award /> },
    { value: 'TrendingUp', label: 'Croissance/Marketing', icon: <TrendingUp /> },
    { value: 'Activity', label: 'Tâche Générale', icon: <Activity /> },
    { value: 'Milestone', label: 'Jalon Important', icon: <Milestone /> },
  ];
  const getFeatureIcon = (iconName) => {
    const found = featureIconOptions.find(opt => opt.value === iconName);
    return found ? React.cloneElement(found.icon, { className: 'w-5 h-5' }) : <Activity className='w-5 h-5' />;
  };

  const [featuresLoading, setFeaturesLoading] = useState(false);
  // Add a new state to track selected team member IDs for the multi-select
  const [selectedTeamIds, setSelectedTeamIds] = useState([]);

  useEffect(() => {
    fetchRoadmaps();
    fetchProjectDetails();
  }, [userId, formDataId]);

  const fetchRoadmaps = async () => {
    setLoading(true);
    try {
      const response = await ApiService(`/admin/users/${userId}/projects/${formDataId}/roadmaps`, 'GET');
       setRoadmaps(response.data || []);
    } catch (error) {
      toast({ title: 'Erreur', description: "Erreur lors du chargement des feuilles de route.", variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const fetchProjectDetails = async () => {
  setLoadingProjectDetails(true);
  try {
    const formDataResponse = await ApiService(`/form-data/${formDataId}`, 'GET');
    setFormDataInfo(formDataResponse.data);

    const teamResponse = await ApiService(`/admin/users/${userId}/projects/${formDataId}/team`, 'GET');
    setTeamMembers(teamResponse.data || []);

    const response = await ApiService(`/admin/users/${userId}/projects/${formDataId}/project-details`, 'GET');
    console.log('Project Details Response:', response); // Debug the response
    if (response.data && response.data.length > 0) {
      const details = response.data[0];
      console.log('Setting existingProjectDetails:', details); // Debug the details
      setExistingProjectDetails(details);
      setProjectDetails({
        project_name: details.project_name || '',
        description: details.description || '',
        type: details.type || '',
        team_assigned: details.team_assigned || '', // ensure not null
        progress: details.progress || '',
        status: details.status || '',
        budget: details.budget || '',
        start_date: details.start_date || '',
        end_date: details.end_date || ''
      });
    } else {
      console.log('No project details found, resetting existingProjectDetails');
      setExistingProjectDetails(null); // Ensure reset if no details
      const projectName = formDataResponse.data?.project_name || formDataResponse.data?.projectDescription || formDataResponse.data?.project_description || '';
      const description = formDataResponse.data?.project_description || '';
      const type = formDataResponse.data?.solution_type || '';
      const teamAssigned = (teamResponse.data && teamResponse.data.length > 0)
        ? teamResponse.data.map(m => m.name + (m.specialization ? ` (${m.specialization})` : '')).join(', ')
        : '';
      setProjectDetails({
        project_name: projectName,
        description: description,
        type: type,
        team_assigned: teamAssigned || '', // ensure not null
        progress: '',
        status: '',
        budget: '',
        start_date: '',
        end_date: ''
      });
    }
  } catch (error) {
    console.error('Error fetching project details:', error);
    setProjectDetails({
      project_name: '',
      description: '',
      type: '',
      team_assigned: '',
      progress: '',
      status: '',
      budget: '',
      start_date: '',
      end_date: ''
    });
  } finally {
    setLoadingProjectDetails(false);
  }
};

  const fetchTechnologies = async () => {
    setTechnologyLoading(true);
    try {
      const response = await ApiService(`/admin/users/${userId}/projects/${formDataId}/technologies`, 'GET');
      setTechnologies(response.data || []);
    } catch (error) {
      toast({ title: 'Erreur', description: "Erreur lors du chargement des technologies.", variant: 'destructive' });
    } finally {
      setTechnologyLoading(false);
    }
  };

  useEffect(() => {
    fetchTechnologies();
  }, [userId, formDataId]);

  const fetchTeam = async () => {
    const response = await ApiService(`/admin/users/${userId}/projects/${formDataId}/team`, 'GET');
    setTeam(response.data || []);
  };

  useEffect(() => {
    fetchTeam();
  }, [userId, formDataId]);

  const handleTechnologySubmit = async (e) => {
    e.preventDefault();
    setTechnologyLoading(true);
    try {
      if (technologyEditId) {
        await ApiService(`/admin/users/${userId}/projects/${formDataId}/technologies/${technologyEditId}`, 'PATCH', { name: technologyInput });
        toast({ title: 'Technologie modifiée', description: 'La technologie a été mise à jour.', variant: 'default' });
      } else {
        await ApiService(`/admin/users/${userId}/projects/${formDataId}/technologies`, 'POST', {
          name: technologyInput,
        });
        toast({ title: 'Technologie ajoutée', description: 'La technologie a été ajoutée.', variant: 'default' });
      }
      setTechnologyEditId(null);
      setTechnologyInput("");
      fetchTechnologies();
    } catch (error) {
      toast({ title: 'Erreur', description: "Erreur lors de l'enregistrement de la technologie.", variant: 'destructive' });
    } finally {
      setTechnologyLoading(false);
    }
  };

  const handleTechnologyEdit = (tech) => {
    setTechnologyInput(tech.name);
    setTechnologyEditId(tech.id);
  };

  const handleTechnologyDelete = async (techId) => {
    setTechnologyLoading(true);
    try {
      await ApiService(`/admin/users/${userId}/projects/${formDataId}/technologies/${techId}`, 'DELETE');
      if (technologyEditId === techId) {
        setTechnologyEditId(null);
        setTechnologyInput("");
      }
      fetchTechnologies();
      toast({ title: 'Technologie supprimée', description: 'La technologie a été supprimée.', variant: 'default' });
    } catch (error) {
      toast({ title: 'Erreur', description: "Erreur lors de la suppression de la technologie.", variant: 'destructive' });
    } finally {
      setTechnologyLoading(false);
      setShowTechDeleteId(null);
    }
  };

  const updateProjectDetailsTeamAssigned = async (updatedTeamList) => {
    if (!existingProjectDetails) return;
    const teamAssigned = updatedTeamList.map(m => `${m.name}${m.specialization ? ` (${m.specialization})` : ''}`).join(', ');
    try {
      await ApiService(`/admin/users/${userId}/projects/${formDataId}/project-details/${existingProjectDetails.id}`, 'PATCH', {
        team_assigned: teamAssigned
      });
      fetchProjectDetails();
    } catch (error) {
      toast({ title: 'Erreur', description: "Erreur lors de la mise à jour de l'équipe assignée.", variant: 'destructive' });
    }
  };

  const handleTeamSubmit = async (e) => {
    e.preventDefault();
    try {
      if (teamEditId) {
        await ApiService(`/admin/users/${userId}/projects/${formDataId}/team/${teamEditId}`, 'PATCH', teamInput);
        toast({ title: 'Membre mis à jour', description: 'Le membre de l\'équipe a été mis à jour.', variant: 'default' });
      } else {
        await ApiService(`/admin/users/${userId}/projects/${formDataId}/team`, 'POST', teamInput);
        toast({ title: 'Membre ajouté', description: 'Le membre de l\'équipe a été ajouté.', variant: 'default' });
      }
      setTeamInput({ name: '', specialization: '' });
      setTeamEditId(null);
      const response = await ApiService(`/admin/users/${userId}/projects/${formDataId}/team`, 'GET');
      setTeam(response.data || []);
      updateProjectDetailsTeamAssigned(response.data || []);
      fetchProjectDetails();
    } catch (error) {
      toast({ title: 'Erreur', description: "Erreur lors de l'enregistrement du membre.", variant: 'destructive' });
    }
  };

  const handleTeamDelete = async (id) => {
    try {
      await ApiService(`/admin/users/${userId}/projects/${formDataId}/team/${id}`, 'DELETE');
      const response = await ApiService(`/admin/users/${userId}/projects/${formDataId}/team`, 'GET');
      setTeam(response.data || []);
      updateProjectDetailsTeamAssigned(response.data || []);
      fetchProjectDetails();
      toast({ title: 'Membre supprimé', description: 'Le membre de l\'équipe a été supprimé.', variant: 'default' });
    } catch (error) {
      toast({ title: 'Erreur', description: "Erreur lors de la suppression du membre.", variant: 'destructive' });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTagAdd = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleProjectDetailsChange = (e) => {
    const { name, value, selectedOptions } = e.target;
    if (name === 'team_assigned') {
      const selectedIds = Array.from(selectedOptions).map(option => option.value);
      setSelectedTeamIds(selectedIds);
      // Map IDs to names with specialization
      const selectedNames = team
        .filter(member => selectedIds.includes(member.id.toString()))
        .map(member => `${member.name}${member.specialization ? ` (${member.specialization})` : ''}`);
      setProjectDetails(prev => ({
        ...prev,
        [name]: selectedNames.join(', ')
      }));
    } else {
      setProjectDetails(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // When loading project details, set selectedTeamIds based on the stored string
  useEffect(() => {
    if (projectDetails.team_assigned && team.length > 0) {
      // Parse the stored string to get the names
      const names = projectDetails.team_assigned.split(',').map(s => s.trim());
      // Find the IDs of team members whose name+specialization matches
      const ids = team.filter(member =>
        names.includes(`${member.name}${member.specialization ? ` (${member.specialization})` : ''}`)
      ).map(member => member.id.toString());
      setSelectedTeamIds(ids);
    }
  }, [projectDetails.team_assigned, team]);

  const handleProjectDetailsSubmit = async (e) => {
  e.preventDefault();
  // Always assign all team members
  const allNames = team.map(
    member => `${member.name}${member.specialization ? ` (${member.specialization})` : ''}`
  );
  const payload = {
    ...projectDetails,
    team_assigned: allNames.join(', ')
  };
  setLoading(true);
  try {
    if (existingProjectDetails && existingProjectDetails.id) {
      await ApiService(`/admin/users/${userId}/projects/${formDataId}/project-details/${existingProjectDetails.id}`, 'PATCH', payload);
      toast({ title: 'Succès', description: 'Les détails du projet ont été mis à jour.', variant: 'default' });
    } else {
      await ApiService(`/admin/users/${userId}/projects/${formDataId}/project-details`, 'POST', payload);
      toast({ title: 'Succès', description: 'Les détails du projet ont été créés.', variant: 'default' });
    }
    fetchProjectDetails();
  } catch (error) {
    console.error('Error saving project details:', error);
    toast({ title: 'Erreur', description: "Erreur lors de l'enregistrement des détails du projet.", variant: 'destructive' });
  } finally {
    setLoading(false);
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingRoadmap) {
        await ApiService(`/admin/users/${formData.user_id}/projects/${formData.form_data_id}/roadmaps/${editingRoadmap.id}`, 'PATCH', formData);
        toast({ title: 'Feuille de route modifiée', description: 'La feuille de route a été mise à jour.', variant: 'default' });
      } else {
        await ApiService(`/admin/users/${formData.user_id}/projects/${formData.form_data_id}/roadmaps`, 'POST', formData);
        toast({ title: 'Feuille de route ajoutée', description: 'La feuille de route a été ajoutée.', variant: 'default' });
      }
      setShowForm(false);
      setEditingRoadmap(null);
      resetForm();
      fetchRoadmaps();
    } catch (error) {
      toast({ title: 'Erreur', description: "Erreur lors de l'enregistrement de la feuille de route.", variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (roadmap) => {
    setEditingRoadmap(roadmap);
    setFormData({
      user_id: roadmap.user_id,
      form_data_id: roadmap.form_data_id || formDataId,
      project_title: roadmap.project_title,
      description: roadmap.description || '',
      responsible_person: roadmap.responsible_person,
      status: roadmap.status,
      progress_percentage: roadmap.progress_percentage,
      deliverables_count: roadmap.deliverables_count,
      start_date: roadmap.start_date || '',
      end_date: roadmap.end_date || '',
      tags: roadmap.tags || []
    });
    setShowForm(true);
  };

  const handleDelete = async (roadmapId) => {
    setShowRoadmapDeleteId(roadmapId);
  };

  const confirmDeleteRoadmap = async (roadmapId) => {
    setLoading(true);
    try {
      await ApiService(`/admin/users/${userId}/projects/${formDataId}/roadmaps/${roadmapId}`, 'DELETE');
      fetchRoadmaps();
      toast({ title: 'Feuille de route supprimée', description: 'La feuille de route a été supprimée.', variant: 'default' });
    } catch (error) {
      toast({ title: 'Erreur', description: "Erreur lors de la suppression de la feuille de route.", variant: 'destructive' });
    } finally {
      setLoading(false);
      setShowRoadmapDeleteId(null);
    }
  };

  const resetForm = () => {
    setFormData({
      user_id: userId,
      form_data_id: formDataId,
      project_title: '',
      description: '',
      responsible_person: '',
      status: 'en_attente',
      progress_percentage: 0,
      deliverables_count: 0,
      start_date: '',
      end_date: '',
      tags: []
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'en_cours': return 'bg-blue-100 text-blue-800';
      case 'termine': return 'bg-green-100 text-green-800';
      case 'en_attente': return 'bg-yellow-100 text-yellow-800';
      case 'annule': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'en_cours': return <BarChart3 className="w-4 h-4" />;
      case 'termine': return <CheckCircle className="w-4 h-4" />;
      case 'en_attente': return <Clock className="w-4 h-4" />;
      case 'annule': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const filteredRoadmaps = roadmaps.filter(roadmap => {
    const matchesSearch = roadmap.project_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         roadmap.responsible_person.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || roadmap.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const fetchProjectLinks = async () => {
    setLinksLoading(true);
    try {
      const response = await ApiService(`/admin/users/${userId}/projects/${formDataId}/links`, 'GET');
      setProjectLinks(response.data || { figma_url: '', payment_url: '' });
      setLinksForm(response.data || { figma_url: '', payment_url: '' });
    } catch (error) {
      toast({ title: 'Erreur', description: "Erreur lors du chargement des liens du projet.", variant: 'destructive' });
    } finally {
      setLinksLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectLinks();
  }, [userId, formDataId]);

  const handleLinksInputChange = (e) => {
    const { name, value } = e.target;
    setLinksForm(prev => ({ ...prev, [name]: value }));
  };

  const handleLinksSave = async (e) => {
    e.preventDefault();
    setLinksLoading(true);
    try {
      if (!projectLinks || !projectLinks.id) {
        await ApiService(`/admin/users/${userId}/projects/${formDataId}/links`, 'POST', linksForm);
        toast({ title: 'Succès', description: 'Les liens ont été créés.', variant: 'default' });
      } else {
        await ApiService(`/admin/users/${userId}/projects/${formDataId}/links`, 'PATCH', linksForm);
        toast({ title: 'Succès', description: 'Les liens ont été mis à jour.', variant: 'default' });
      }
      fetchProjectLinks();
    } catch (error) {
      toast({ title: 'Erreur', description: "Erreur lors de l'enregistrement des liens.", variant: 'destructive' });
    } finally {
      setLinksLoading(false);
    }
  };

  const handleFeatureInputChange = (e) => {
    const { name, value } = e.target;
    setFeatureForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFeatureSelectChange = (name, value) => {
    setFeatureForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAddFeature = () => {
    setEditingFeature(null);
    setFeatureForm({ name: '', description: '', status: 'planned', icon: 'Activity' });
    setShowFeatureForm(true);
  };

  const fetchFeatures = async () => {
    setFeaturesLoading(true);
    try {
      const response = await ApiService(`/admin/projects/${formDataId}/features`, 'GET');
      setFeatures(response.data || []);
    } catch (error) {
      toast({ title: 'Erreur', description: "Erreur lors du chargement des fonctionnalités.", variant: 'destructive' });
    } finally {
      setFeaturesLoading(false);
    }
  };

  useEffect(() => {
    fetchFeatures();
  }, [formDataId]);

  const handleFeatureFormSubmit = async (e) => {
    e.preventDefault();
    setFeaturesLoading(true);
    try {
      if (editingFeature !== null && features[editingFeature]?.id) {
        await ApiService(`/admin/projects/${formDataId}/features/${features[editingFeature].id}`, 'PATCH', {
          user_id: userId,
          ...featureForm
        });
        toast({ title: 'Succès', description: 'Fonctionnalité mise à jour.', variant: 'default' });
      } else {
        await ApiService(`/admin/projects/${formDataId}/features`, 'POST', {
          user_id: userId,
          ...featureForm
        });
        toast({ title: 'Succès', description: 'Fonctionnalité ajoutée.', variant: 'default' });
      }
      setShowFeatureForm(false);
      setEditingFeature(null);
      fetchFeatures();
    } catch (error) {
      toast({ title: 'Erreur', description: "Erreur lors de l'enregistrement de la fonctionnalité.", variant: 'destructive' });
    } finally {
      setFeaturesLoading(false);
    }
  };

  const handleEditFeature = (feature, idx) => {
    setEditingFeature(idx);
    setFeatureForm(feature);
    setShowFeatureForm(true);
  };

  const handleDeleteFeature = async (idx) => {
    const feature = features[idx];
    if (!feature?.id) return;
    setFeaturesLoading(true);
    try {
      await ApiService(`/admin/projects/${formDataId}/features/${feature.id}`, 'DELETE');
      toast({ title: 'Succès', description: 'Fonctionnalité supprimée.', variant: 'default' });
      fetchFeatures();
    } catch (error) {
      toast({ title: 'Erreur', description: "Erreur lors de la suppression de la fonctionnalité.", variant: 'destructive' });
    } finally {
      setFeaturesLoading(false);
    }
  };

  // Auto-assign all team members if team_assigned is empty
  useEffect(() => {
    if (
      team.length > 0 &&
      (!projectDetails.team_assigned || projectDetails.team_assigned.trim() === '')
    ) {
      const allNames = team.map(
        member => `${member.name}${member.specialization ? ` (${member.specialization})` : ''}`
      );
      setProjectDetails(prev => ({
        ...prev,
        team_assigned: allNames.join(', ')
      }));
      setSelectedTeamIds(team.map(member => member.id.toString()));
    }
  }, [team, projectDetails.team_assigned]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 mt-4 mb-8 p-0 sm:p-0"
    >
      <div className="sticky top-0 z-30 bg-white rounded-t-2xl border-b border-gray-100 flex flex-col items-center px-4 pt-4 pb-2">
        <div className="w-full flex items-center justify-between mb-2">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium shadow-sm border border-gray-200"
          >
            <ArrowLeft className="w-4 h-4" /> Retour
          </button>
          <div className="flex-1 flex justify-center">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">Gestion des Feuilles de Route</h2>
          </div>
          <div className="w-20" />
        </div>
      </div>

      <div className="flex border-b border-gray-200 bg-gray-50 overflow-x-auto">
        <button
          className={`flex items-center gap-2 px-4 sm:px-6 py-3 text-sm sm:text-base font-medium focus:outline-none transition-colors duration-150 border-b-2 whitespace-nowrap ${
            activeTab === 'projectdetails' ? 'border-blue-600 text-blue-600 bg-white' : 'border-transparent text-gray-700 hover:bg-gray-100'
          }`}
          onClick={() => setActiveTab('projectdetails')}
        >
          <FileText className="w-4 h-4" /> Détails du Projet
        </button>
        <button
          className={`flex items-center gap-2 px-4 sm:px-6 py-3 text-sm sm:text-base font-medium focus:outline-none transition-colors duration-150 border-b-2 whitespace-nowrap ${
            activeTab === 'roadmap' ? 'border-blue-600 text-blue-600 bg-white' : 'border-transparent text-gray-700 hover:bg-gray-100'
          }`}
          onClick={() => setActiveTab('roadmap')}
        >
          <FileText className="w-4 h-4" /> Feuilles de Route
        </button>
        <button
          className={`flex items-center gap-2 px-4 sm:px-6 py-3 text-sm sm:text-base font-medium focus:outline-none transition-colors duration-150 border-b-2 whitespace-nowrap ${
            activeTab === 'technologies' ? 'border-blue-600 text-blue-600 bg-white' : 'border-transparent text-gray-700 hover:bg-gray-100'
          }`}
          onClick={() => setActiveTab('technologies')}
        >
          <BarChart3 className="w-4 h-4" /> Technologies
        </button>
        <button
          className={`flex items-center gap-2 px-4 sm:px-6 py-3 text-sm sm:text-base font-medium focus:outline-none transition-colors duration-150 border-b-2 whitespace-nowrap ${
            activeTab === 'team' ? 'border-blue-600 text-blue-600 bg-white' : 'border-transparent text-gray-700 hover:bg-gray-100'
          }`}
          onClick={() => setActiveTab('team')}
        >
          <User className="w-4 h-4" /> Équipe
        </button>
        <button
          className={`flex items-center gap-2 px-4 sm:px-6 py-3 text-sm sm:text-base font-medium focus:outline-none transition-colors duration-150 border-b-2 whitespace-nowrap ${
            activeTab === 'projectlinks' ? 'border-blue-600 text-blue-600 bg-white' : 'border-transparent text-gray-700 hover:bg-gray-100'
          }`}
          onClick={() => setActiveTab('projectlinks')}
        >
          <LinkIcon className="w-4 h-4" /> Project Links
        </button>
        <button
          className={`flex items-center gap-2 px-4 sm:px-6 py-3 text-sm sm:text-base font-medium focus:outline-none transition-colors duration-150 border-b-2 whitespace-nowrap ${
            activeTab === 'features' ? 'border-blue-600 text-blue-600 bg-white' : 'border-transparent text-gray-700 hover:bg-gray-100'
          }`}
          onClick={() => setActiveTab('features')}
        >
          <Award className="w-4 h-4" /> Fonctionnalités
        </button>
      </div>

      <div className="p-4 sm:p-6 lg:p-8">
        {activeTab === 'projectdetails' && (
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 mt-8 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              {existingProjectDetails ? 'Modifier les Détails du Projet' : 'Créer un Nouveau Projet'}
            </h3>
            <form onSubmit={handleProjectDetailsSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Nom du Projet</label>
                  {loadingProjectDetails ? (
                    <div>Chargement...</div>
                  ) : (
                    <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                      {projectDetails.project_name || 'Non spécifié'}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Description</label>
                  {loadingProjectDetails ? (
                    <div>Chargement...</div>
                  ) : (
                    <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                      {projectDetails.description || 'Non spécifié'}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Type de Solution</label>
                  {loadingProjectDetails ? (
                    <div>Chargement...</div>
                  ) : (
                    <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                      {projectDetails.type || 'Non spécifié'}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Équipe Assignée</label>
                  <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                    {team.length > 0
                      ? team.map(member => `${member.name}${member.specialization ? ` (${member.specialization})` : ''}`).join(', ')
                      : 'Aucun membre d\'équipe'}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Progression (%) *</label>
                  <input
                    type="number"
                    name="progress"
                    placeholder="Progression (%)"
                    value={projectDetails.progress}
                    onChange={handleProjectDetailsChange}
                    min="0"
                    max="100"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Statut *</label>
                  <select 
                    name="status" 
                    value={projectDetails.status} 
                    onChange={handleProjectDetailsChange} 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    required
                  >
                    <option value="">Sélectionner le Statut</option>
                    <option value="Not Started">Pas Commencé</option>
                    <option value="In Progress">En Cours</option>
                    <option value="Completed">Terminé</option>
                    <option value="PaymentDone">Paiement Effectué</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Budget (€)</label>
                  <input
                    type="number"
                    name="budget"
                    placeholder="Budget (€)"
                    value={projectDetails.budget}
                    onChange={handleProjectDetailsChange}
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Date de Début</label>
                  <input
                    type="date"
                    name="start_date"
                    value={projectDetails.start_date}
                    onChange={handleProjectDetailsChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Date de Fin</label>
                  <input
                    type="date"
                    name="end_date"
                    value={projectDetails.end_date}
                    onChange={handleProjectDetailsChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  />
                </div>
              </div>
              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium"
                >
                  {loading ? 'Enregistrement...' : (existingProjectDetails ? 'Mettre à jour' : 'Créer')}
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'roadmap' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-3 flex-1">
                <div className="relative flex-1 max-w-xs">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900 placeholder-gray-500"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="en_attente">En Attente</option>
                  <option value="en_cours">En Cours</option>
                  <option value="termine">Terminé</option>
                  <option value="annule">Annulé</option>
                </select>
              </div>
              <button
                onClick={() => {
                  setEditingRoadmap(null);
                  resetForm();
                  setShowForm(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium"
              >
                <Plus className="w-4 h-4" /> Nouvelle Feuille de Route
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : filteredRoadmaps.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Aucune feuille de route trouvée</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredRoadmaps.map((roadmap) => (
                  <motion.div
                    key={roadmap.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-2">
                        {roadmap.project_title}
                      </h3>
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleEdit(roadmap)}
                          className="p-1 text-gray-400 hover:text-blue-600"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(roadmap.id)}
                          className="p-1 text-gray-400 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs sm:text-sm">
                      <div className="flex items-center gap-2">
                        <User className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-600">{roadmap.responsible_person}</span>
                      </div>

                      {roadmap.form_data && (
                        <div className="flex items-center gap-2">
                          <FileText className="w-3 h-3 text-gray-400" />
                          <span className="text-gray-600 line-clamp-1">
                            {roadmap.form_data.project_description || `Projet ${roadmap.form_data.id}`}
                          </span>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2">
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getStatusColor(roadmap.status)}`}> 
                          {getStatusIcon(roadmap.status)}
                          <span className="capitalize">
                            {roadmap.status.replace('_', ' ')}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-600">{roadmap.progress_percentage}%</span>
                      </div>

                      {roadmap.start_date && (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          <span className="text-gray-600">
                            {new Date(roadmap.start_date).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                      )}

                      {roadmap.tags && roadmap.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {roadmap.tags.slice(0, 3).map((tag, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                              {tag}
                            </span>
                          ))}
                          {roadmap.tags.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                              +{roadmap.tags.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'technologies' && (
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 mt-8 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Technologies</h3>
            <form
              onSubmit={handleTechnologySubmit}
              className="flex flex-col sm:flex-row gap-2 mb-6"
            >
              <input
                type="text"
                value={technologyInput}
                onChange={e => setTechnologyInput(e.target.value)}
                placeholder="Ajouter une technologie"
                className={`w-full sm:flex-1 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${technologyEditId ? 'bg-blue-50 border-blue-400' : 'bg-white border-gray-300 text-gray-900'}`}
                required
                autoFocus={!!technologyEditId}
                disabled={technologyEditId !== null}
              />
              <button
                type="submit"
                className={`w-full sm:w-auto px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700`}
                disabled={technologyLoading || technologyEditId !== null}
              >
                Ajouter
              </button>
            </form>
            <div className="flex flex-col gap-4">
              {technologyLoading ? (
                <div className="text-gray-400 col-span-2 text-center">Chargement...</div>
              ) : technologies.length === 0 ? (
                <div className="text-gray-400 col-span-2 text-center">Aucune technologie</div>
              ) : (
                technologies.map(tech => (
                  <motion.div
                    key={tech.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between transition-shadow gap-2 sm:gap-0"
                    style={{ minWidth: 0 }}
                  >
                    {technologyEditId === tech.id ? (
                      <form
                        onSubmit={async (e) => {
                          e.preventDefault();
                          await handleTechnologySubmit(e);
                        }}
                        className="flex flex-col sm:flex-row flex-1 gap-2 items-stretch sm:items-center w-full"
                      >
                        <input
                          type="text"
                          value={technologyInput}
                          onChange={e => setTechnologyInput(e.target.value)}
                          className="w-full sm:flex-1 px-3 py-2 rounded-lg border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50 text-gray-900"
                          required
                          autoFocus
                          disabled={technologyLoading && technologyEditId === tech.id}
                        />
                        <button
                          type="submit"
                          className="w-full sm:w-auto px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                          disabled={technologyLoading && technologyEditId === tech.id}
                        >
                          Enregistrer
                        </button>
                        <button
                          type="button"
                          className="w-full sm:w-auto px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                          onClick={() => { setTechnologyEditId(null); setTechnologyInput(''); }}
                          disabled={technologyLoading && technologyEditId === tech.id}
                        >
                          Annuler
                        </button>
                      </form>
                    ) : (
                      <>
                        <span className="text-gray-900 font-medium flex-1 truncate mb-2 sm:mb-0">{tech.name}</span>
                        <div className="flex gap-2 w-full sm:w-auto">
                          <button
                            className="text-blue-600 hover:text-blue-800 disabled:opacity-50"
                            onClick={() => { setTechnologyEditId(tech.id); setTechnologyInput(tech.name); }}
                            title="Modifier"
                            disabled={technologyLoading || technologyEditId !== null}
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            className="text-red-600 hover:text-red-800 disabled:opacity-50"
                            onClick={() => setShowTechDeleteId(tech.id)}
                            title="Supprimer"
                            disabled={technologyLoading || technologyEditId !== null}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </>
                    )}
                    <AnimatePresence>
                      {showTechDeleteId === tech.id && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center"
                          onClick={() => setShowTechDeleteId(null)}
                        >
                          <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full"
                            onClick={e => e.stopPropagation()}
                          >
                            <h4 className="text-lg font-semibold mb-2 text-gray-900">Confirmer la suppression</h4>
                            <p className="text-gray-700 mb-4">Voulez-vous vraiment supprimer cette technologie ?</p>
                            <div className="flex gap-3 justify-end">
                              <button
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                                onClick={() => setShowTechDeleteId(null)}
                                disabled={technologyLoading && showTechDeleteId === tech.id}
                              >Annuler</button>
                              <button
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                onClick={() => handleTechnologyDelete(tech.id)}
                                disabled={technologyLoading && showTechDeleteId === tech.id}
                              >Supprimer</button>
                            </div>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'team' && (
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 mt-8 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Équipe</h3>
            <form onSubmit={handleTeamSubmit} className="flex flex-col sm:flex-row gap-2 mb-6">
              <input
                type="text"
                placeholder="Nom du membre"
                value={teamInput.name}
                onChange={e => setTeamInput({ ...teamInput, name: e.target.value })}
                className="w-full sm:flex-1 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                required
              />
              <input
                type="text"
                placeholder="Spécialisation"
                value={teamInput.specialization}
                onChange={e => setTeamInput({ ...teamInput, specialization: e.target.value })}
                className="w-full sm:flex-1 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                required
              />
              <button type="submit" className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                {teamEditId ? 'Mettre à jour' : 'Ajouter'}
              </button>
            </form>
            <div className="flex flex-col gap-4">
              {team.length === 0 ? (
                <p className="text-gray-500">Aucun membre d'équipe</p>
              ) : (
                team.map(member => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between transition-shadow gap-2 sm:gap-0"
                  >
                    <div className="mb-2 sm:mb-0">
                      <p className="font-medium text-gray-900">{member.name}</p>
                      <p className="text-sm text-gray-600">{member.specialization}</p>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => { setTeamEditId(member.id); setTeamInput({ name: member.name, specialization: member.specialization }); }}
                        title="Modifier"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => setShowTeamDeleteId(member.id)}
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'projectlinks' && (
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 mt-8 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Liens du Projet</h3>
            {linksLoading ? (
              <div className="text-gray-400 text-center">Chargement...</div>
            ) : (
              <form onSubmit={handleLinksSave} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Figma URL</label>
                  <input
                    type="url"
                    name="figma_url"
                    value={linksForm.figma_url || ''}
                    onChange={handleLinksInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                    placeholder="https://figma.com/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Payment URL</label>
                  <input
                    type="url"
                    name="payment_url"
                    value={linksForm.payment_url || ''}
                    onChange={handleLinksInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                    placeholder="https://..."
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    disabled={linksLoading}
                  >{linksLoading ? 'Enregistrement...' : 'Enregistrer'}</button>
                </div>
              </form>
            )}
          </div>
        )}

        {activeTab === 'features' && (
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 mt-8 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Fonctionnalités du Projet</h3>
            <button
              onClick={handleAddFeature}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-4"
            >
              <Plus className="w-4 h-4" /> Ajouter une fonctionnalité
            </button>
            {featuresLoading ? (
              <div className="text-gray-400 text-center">Chargement des fonctionnalités...</div>
            ) : features.length === 0 ? (
              <p className="text-gray-500">Aucune fonctionnalité ajoutée.</p>
            ) : (
              <div className="flex flex-col gap-4">
                {features.map((feature, idx) => (
                  <div key={idx} className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getFeatureIcon(feature.icon)}
                      <div>
                        <div className="font-medium text-gray-900">{feature.name || `Fonctionnalité ${idx + 1}`}</div>
                        <div className="text-sm text-gray-600">{feature.description}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          Statut: {featureStatusOptions.find(opt => opt.value === feature.status)?.label || feature.status}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => handleEditFeature(feature, idx)}
                        title="Modifier"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDeleteFeature(idx)}
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <AnimatePresence>
              {showFeatureForm && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
                  onClick={() => setShowFeatureForm(false)}
                >
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
                    onClick={e => e.stopPropagation()}
                  >
                    <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {editingFeature !== null ? 'Modifier la fonctionnalité' : 'Nouvelle fonctionnalité'}
                      </h3>
                      <button
                        onClick={() => setShowFeatureForm(false)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <form onSubmit={handleFeatureFormSubmit} className="p-6 space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">Nom *</label>
                        <input
                          type="text"
                          name="name"
                          value={featureForm.name}
                          onChange={handleFeatureInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                          placeholder="Nom de la fonctionnalité"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">Description</label>
                        <textarea
                          name="description"
                          value={featureForm.description}
                          onChange={handleFeatureInputChange}
                          rows="3"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                          placeholder="Description de la fonctionnalité (optionnel)"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-700">Statut</label>
                          <select
                            name="status"
                            value={featureForm.status}
                            onChange={handleFeatureInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                          >
                            {featureStatusOptions.map(opt => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-700">Icône</label>
                          <select
                            name="icon"
                            value={featureForm.icon}
                            onChange={handleFeatureInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                          >
                            {featureIconOptions.map(opt => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="flex gap-3 pt-4">
                        <button
                          type="button"
                          onClick={() => setShowFeatureForm(false)}
                          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                        >Annuler</button>
                        <button
                          type="submit"
                          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >{editingFeature !== null ? 'Mettre à jour' : 'Créer'}</button>
                      </div>
                    </form>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {editingRoadmap ? 'Modifier la Feuille de Route' : 'Nouvelle Feuille de Route'}
                  </h3>
                  <button
                    onClick={() => setShowForm(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Titre du Projet *</label>
                  <input
                    type="text"
                    name="project_title"
                    value={formData.project_title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                    placeholder="Entrez le titre du projet"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Responsable *</label>
                    <input
                      type="text"
                      name="responsible_person"
                      value={formData.responsible_person}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                      placeholder="Nom du responsable"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Statut *</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    >
                      <option value="en_attente">En Attente</option>
                      <option value="en_cours">En Cours</option>
                      <option value="termine">Terminé</option>
                      <option value="annule">Annulé</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                    placeholder="Description du projet (optionnel)"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Progression (%)</label>
                    <input
                      type="number"
                      name="progress_percentage"
                      value={formData.progress_percentage}
                      onChange={handleInputChange}
                      min="0"
                      max="100"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                      placeholder="0-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Livrables</label>
                    <input
                      type="number"
                      name="deliverables_count"
                      value={formData.deliverables_count}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                      placeholder="Nombre de livrables"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Date de Début</label>
                    <input
                      type="date"
                      name="start_date"
                      value={formData.start_date}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Date de Fin</label>
                    <input
                      type="date"
                      name="end_date"
                      value={formData.end_date}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Étiquettes</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleTagAdd())}
                      placeholder="Ajouter une étiquette"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                    />
                    <button
                      type="button"
                      onClick={handleTagAdd}
                      className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleTagRemove(tag)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    {loading ? 'Enregistrement...' : (editingRoadmap ? 'Mettre à jour' : 'Créer')}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showRoadmapDeleteId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center"
            onClick={() => setShowRoadmapDeleteId(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full"
              onClick={e => e.stopPropagation()}
            >
              <h4 className="text-lg font-semibold mb-2 text-gray-900">Confirmer la suppression</h4>
              <p className="text-gray-700 mb-4">Voulez-vous vraiment supprimer cette feuille de route ?</p>
              <div className="flex gap-3 justify-end">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  onClick={() => setShowRoadmapDeleteId(null)}
                >Annuler</button>
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  onClick={() => confirmDeleteRoadmap(showRoadmapDeleteId)}
                  disabled={loading}
                >Supprimer</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showTeamDeleteId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center"
            onClick={() => setShowTeamDeleteId(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full"
              onClick={e => e.stopPropagation()}
            >
              <h4 className="text-lg font-semibold mb-2 text-gray-900">Confirmer la suppression</h4>
              <p className="text-gray-700 mb-4">Voulez-vous vraiment supprimer ce membre d'équipe ?</p>
              <div className="flex gap-3 justify-end">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  onClick={() => setShowTeamDeleteId(null)}
                >Annuler</button>
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  onClick={() => {
                    handleTeamDelete(showTeamDeleteId);
                    setShowTeamDeleteId(null);
                  }}
                >Supprimer</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AdminUserDashboardEdit;