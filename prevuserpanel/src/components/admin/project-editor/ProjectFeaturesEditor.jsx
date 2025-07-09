import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Settings,
  PlusCircle,
  Trash2,
  Lightbulb,
  BarChart2,
  Palette,
  TerminalSquare,
  SearchCheck,
  Rocket,
  ShieldCheck,
  Users,
  Award,
  MessageSquare,
  DollarSign,
  TrendingUp,
  Code2,
  Database,
  Cloud,
  Activity,
  Milestone,
} from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/components/ui/use-toast';
import ApiService from '@/apiService';

const iconOptions = [
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

const getIconComponent = (iconName) => {
  const selectedIcon = iconOptions.find((opt) => opt.value === iconName);
  return selectedIcon
    ? React.cloneElement(selectedIcon.icon, { className: 'h-5 w-5 stroke-2' })
    : <Activity className='h-5 w-5 stroke-2' />;
};

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

const ProjectFeaturesEditor = ({ projectFeatures, setProjectFeatures, projectId }) => {
  const { toast } = useToast();

  const handleAddProjectFeature = () => {
    setProjectFeatures([
      ...projectFeatures,
      {
        id: uuidv4(),
        form_data_id: projectId, // Use form_data_id instead of project_id
        name: '',
        description: '',
        status: 'planned',
        icon: 'Activity',
      },
    ]);
  };

  const handleProjectFeatureChange = (id, field, value) => {
    setProjectFeatures(projectFeatures.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleRemoveProjectFeature = async (id) => {
    const feature = projectFeatures.find((item) => item.id === id);
    if (!feature) return;

    // If the feature has a temporary UUID (not saved to server), remove it from local state
    if (typeof feature.id === 'string') {
      setProjectFeatures(projectFeatures.filter((item) => item.id !== id));
      toast({
        title: 'Succès',
        description: 'Fonctionnalité supprimée localement.',
        className: 'bg-green-500 text-white',
      });
      return;
    }

    // For saved features, send DELETE request to the server
    try {
      const token = localStorage.getItem('bizwizusertoken');
      await ApiService(`/admin/projects/${projectId}/features/${id}`, 'DELETE', null, false, token);
      setProjectFeatures(projectFeatures.filter((item) => item.id !== id));
      toast({
        title: 'Succès',
        description: 'Fonctionnalité supprimée avec succès.',
        className: 'bg-green-500 text-white',
      });
    } catch (error) {
      console.error('Error deleting feature:', error.response?.data || error.message);
      toast({
        title: 'Erreur',
        description: error.response?.data?.message || 'Échec de la suppression de la fonctionnalité.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className='bg-slate-700/30 border-slate-600 shadow-lg'>
      <CardHeader className='border-b border-slate-600/70'>
        <CardTitle className='text-lg text-red-300 flex items-center gap-2'>
          <Award className='h-5 w-5 text-red-400' />
          Fonctionnalités Clés du Projet
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4 p-4 md:p-6 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-red-500/60 scrollbar-track-slate-700/50'>
        {projectFeatures.length === 0 ? (
          <p className='text-sm text-slate-400 text-center'>Aucune fonctionnalité ajoutée.</p>
        ) : (
          projectFeatures.map((feature, index) => (
            <div
              key={feature.id}
              className='p-4 border border-slate-600/80 rounded-lg space-y-3 bg-slate-700/40 shadow-sm'
            >
              <div className='flex justify-between items-center gap-2'>
                <div className='flex items-center gap-2 min-w-0'>
                  {getIconComponent(feature.icon)}
                  <span
                    className='font-medium text-slate-200 truncate max-w-[200px]'
                    title={feature.name || `Fonctionnalité ${index + 1}`}
                  >
                    {feature.name || `Fonctionnalité ${index + 1}`}
                  </span>
                </div>
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={() => handleRemoveProjectFeature(feature.id)}
                  className='text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors'
                  aria-label='Supprimer la fonctionnalité'
                >
                  <Trash2 className='h-4 w-4' />
                </Button>
              </div>
              <Input
                placeholder='Nom de la fonctionnalité'
                value={feature.name}
                onChange={(e) => handleProjectFeatureChange(feature.id, 'name', e.target.value)}
                className='bg-slate-600 border-slate-500 focus:border-red-400 text-slate-100 placeholder:text-slate-400'
              />
              <Textarea
                placeholder='Description détaillée de la fonctionnalité'
                value={feature.description}
                onChange={(e) => handleProjectFeatureChange(feature.id, 'description', e.target.value)}
                className='bg-slate-600 border-slate-500 min-h-[80px] focus:border-red-400 text-slate-100 placeholder:text-slate-400'
              />
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <Select
                  value={feature.status}
                  onValueChange={(value) => handleProjectFeatureChange(feature.id, 'status', value)}
                >
                  <SelectTrigger className='bg-slate-600 border-slate-500 focus:border-red-400 text-slate-100'>
                    <SelectValue placeholder='Statut' />
                  </SelectTrigger>
                  <SelectContent className='bg-slate-700 border-slate-600 text-slate-200'>
                    {featureStatusOptions.map((opt) => (
                      <SelectItem
                        key={opt.value}
                        value={opt.value}
                        className='focus:bg-red-500/30'
                      >
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={feature.icon}
                  onValueChange={(value) => handleProjectFeatureChange(feature.id, 'icon', value)}
                >
                  <SelectTrigger className='bg-slate-600 border-slate-500 focus:border-red-400 text-slate-100'>
                    <span className='flex items-center gap-2'>
                      {getIconComponent(feature.icon)}
                      <SelectValue placeholder='Icône' />
                    </span>
                  </SelectTrigger>
                  <SelectContent className='bg-slate-700 border-slate-600 text-slate-200 max-h-60'>
                    {iconOptions.map((opt) => (
                      <SelectItem
                        key={opt.value}
                        value={opt.value}
                        className='focus:bg-red-500/30'
                      >
                        <span className='flex items-center gap-2'>
                          {React.cloneElement(opt.icon, { className: 'h-5 w-5 stroke-2' })}
                          {opt.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          ))
        )}
        <Button
          onClick={handleAddProjectFeature}
          variant='outline'
          className='w-full max-w-md mx-auto border-dashed border-red-500 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors py-2.5'
        >
          <PlusCircle className='h-5 w-5 mr-2' />
          Ajouter une Fonctionnalité
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProjectFeaturesEditor;