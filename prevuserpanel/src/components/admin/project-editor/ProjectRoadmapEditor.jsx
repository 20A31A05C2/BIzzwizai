import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  MapPin,
  PlusCircle,
  Trash2,
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
} from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

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

const getIconComponent = (iconName) => {
  const selectedIcon = iconOptions.find((opt) => opt.value === iconName);
  return selectedIcon
    ? React.cloneElement(selectedIcon.icon, { className: 'h-5 w-5 stroke-2' })
    : <MapPin className='h-5 w-5 stroke-2' />;
};

const roadmapStatusOptions = [
  { value: 'pending', label: 'En attente' },
  { value: 'upcoming', label: 'À venir' },
  { value: 'active', label: 'En cours' },
  { value: 'completed', label: 'Terminé' },
  { value: 'on_hold', label: 'En pause' },
  { value: 'delayed', label: 'Retardé' },
  { value: 'cancelled', label: 'Annulé' },
];

const ProjectRoadmapEditor = ({ roadmapItems, setRoadmapItems, projectId }) => {
  const handleAddRoadmapItem = () => {
    const newOrderIndex =
      roadmapItems.length > 0
        ? Math.max(...roadmapItems.map((item) => item.order_index || 0)) + 1
        : 0;
    setRoadmapItems([
      ...roadmapItems,
      {
        id: uuidv4(),
        project_id: projectId,
        name: '',
        description: '',
        status: 'upcoming',
        icon: 'MapPin',
        target_date: '',
        assigned_to: '',
        order_index: newOrderIndex,
      },
    ]);
  };

  const handleRoadmapItemChange = (id, field, value) => {
    setRoadmapItems(
      roadmapItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleRemoveRoadmapItem = (id) => {
    setRoadmapItems(roadmapItems.filter((item) => item.id !== id));
  };

  return (
    <Card className='bg-slate-700/30 border-slate-600 shadow-lg'>
      <CardHeader className='border-b border-slate-600/70'>
        <CardTitle className='text-lg text-red-300 flex items-center gap-2'>
          <ClipboardList className='h-5 w-5 text-red-400 stroke-2' />
          Feuille de Route (Roadmap)
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4 p-4 md:p-6 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-red-500/60 scrollbar-track-slate-700/50'>
        {roadmapItems.length === 0 ? (
          <p className='text-sm text-slate-400 text-center'>
            Aucune étape ajoutée à la roadmap.
          </p>
        ) : (
          roadmapItems
            .sort((a, b) => (a.order_index || 0) - (b.order_index || 0))
            .map((item, index) => (
              <div
                key={item.id}
                className='p-4 border border-slate-600/80 rounded-lg space-y-3 bg-slate-700/40 shadow-sm'
              >
                <div className='flex justify-between items-center gap-2'>
                  <div className='flex items-center gap-2 min-w-0'>
                    {getIconComponent(item.icon)}
                    <span
                      className='font-medium text-slate-200 truncate max-w-[200px]'
                      title={item.name || `Étape ${index + 1}`}
                    >
                      {item.name || `Étape ${index + 1}`}
                    </span>
                  </div>
                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={() => handleRemoveRoadmapItem(item.id)}
                    className='text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors'
                    aria-label='Supprimer l’étape'
                  >
                    <Trash2 className='h-4 w-4 stroke-2' />
                  </Button>
                </div>
                <Input
                  placeholder='Nom de l’étape'
                  value={item.name}
                  onChange={(e) =>
                    handleRoadmapItemChange(item.id, 'name', e.target.value)
                  }
                  className='bg-slate-600 border-slate-500 focus:border-red-400 text-slate-100 placeholder:text-slate-400'
                />
                <Textarea
                  placeholder='Description de l’étape'
                  value={item.description}
                  onChange={(e) =>
                    handleRoadmapItemChange(item.id, 'description', e.target.value)
                  }
                  className='bg-slate-600 border-slate-500 min-h-[80px] focus:border-red-400 text-slate-100 placeholder:text-slate-400'
                />
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <Input
                    placeholder='Assigné à (optionnel)'
                    value={item.assigned_to || ''}
                    onChange={(e) =>
                      handleRoadmapItemChange(
                        item.id,
                        'assigned_to',
                        e.target.value
                      )
                    }
                    className='bg-slate-600 border-slate-500 focus:border-red-400 text-slate-100 placeholder:text-slate-400'
                  />
                  <Input
                    type='number'
                    placeholder='Index d’ordre (ex: 1)'
                    value={
                      item.order_index !== null && item.order_index !== undefined
                        ? item.order_index
                        : ''
                    }
                    onChange={(e) =>
                      handleRoadmapItemChange(
                        item.id,
                        'order_index',
                        e.target.value === ''
                          ? 0
                          : Math.max(0, parseInt(e.target.value, 10))
                      )
                    }
                    className='bg-slate-600 border-slate-500 focus:border-red-400 text-slate-100 placeholder:text-slate-400'
                  />
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                  <Select
                    value={item.status}
                    onValueChange={(value) =>
                      handleRoadmapItemChange(item.id, 'status', value)
                    }
                  >
                    <SelectTrigger
                      className='bg-slate-600 border-slate-500 focus:border-red-400 text-slate-100'
                      aria-label='Statut de l’étape'
                    >
                      <SelectValue placeholder='Statut' />
                    </SelectTrigger>
                    <SelectContent className='bg-slate-700 border-slate-600 text-slate-200 max-h-60'>
                      {roadmapStatusOptions.map((opt) => (
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
                    value={item.icon}
                    onValueChange={(value) =>
                      handleRoadmapItemChange(item.id, 'icon', value)
                    }
                  >
                    <SelectTrigger
                      className='bg-slate-600 border-slate-500 focus:border-red-400 text-slate-100'
                      aria-label='Icône de l’étape'
                    >
                      <span className='flex items-center gap-2'>
                        {getIconComponent(item.icon)}
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
                            {React.cloneElement(opt.icon, {
                              className: 'h-5 w-5 stroke-2',
                            })}
                            {opt.label}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    type='date'
                    placeholder='Date cible'
                    value={item.target_date ? item.target_date.split('T')[0] : ''}
                    onChange={(e) =>
                      handleRoadmapItemChange(
                        item.id,
                        'target_date',
                        e.target.value ? `${e.target.value}T00:00:00Z` : ''
                      )
                    }
                    className='bg-slate-600 border-slate-500 focus:border-red-400 text-slate-100 placeholder:text-slate-400'
                  />
                </div>
              </div>
            ))
        )}
        <Button
          onClick={handleAddRoadmapItem}
          variant='outline'
          className='w-full max-w-md mx-auto border-dashed border-red-500 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors py-2.5'
        >
          <PlusCircle className='h-5 w-5 stroke-2 mr-2' />
          Ajouter une Étape à la Roadmap
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProjectRoadmapEditor;

