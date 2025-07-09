import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import AIAssistantPanel from '@/components/AIAssistantPanel';
import { toast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { 
  Layers, MessageSquare, Zap, CheckSquare, ListChecks, CalendarDays, 
  FileText, BarChart3, BrainCircuit, Image as ImageIcon, Palette, 
  Users, Target as TargetIcon, AlarmClock as ClockIcon, CheckCircle, 
  Loader2, XCircle, AlertCircle, PlayCircle, Lightbulb, Star,
  Settings2, UserPlus, Sparkles, FolderGit2, Megaphone, CreditCard,
  Info, Clock, Package, Rocket
} from 'lucide-react';
import ApiService from '@/apiService';
import Roadmap from '@/components/views/RoadmapPage';

const StatCard = ({ title, value, icon: Icon, color, cta, ctaLink, gradientFrom, gradientTo, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 90, duration: 0.7, delay }}
      viewport={{ once: true, amount: 0.1 }}
    >
      <Card className={`bg-gradient-to-br ${gradientFrom} ${gradientTo} border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
              <p className={`text-3xl font-bold ${color} group-hover:scale-105 transition-transform`}>{value}%</p>
            </div>
            <div className={`${color} opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all`}>
              <Icon size={28} />
            </div>
          </div>
          {cta && (
            <div className="mt-4">
              <Button variant="ghost" size="sm" className="text-xs hover:bg-primary/10 p-0 h-auto">
                {cta} →
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

const QuickActionCard = ({ title, description, icon: Icon, onClick, isDisabled = false, delay = 0, buttonText = "Accéder", count }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 90, duration: 0.7, delay }}
      viewport={{ once: true, amount: 0.1 }}
    >
      <Card className={`h-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group ${isDisabled ? 'opacity-60' : 'hover:border-primary/40 cursor-pointer'}`}>
        <CardContent className="p-6 flex flex-col h-full">
          <div className="flex items-center mb-4">
            <div className="mr-4 p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Icon size={24} className="text-primary" />
            </div>
            <h3 className="font-semibold text-lg">{title}</h3>
          </div>
          <p className="text-muted-foreground text-sm flex-grow mb-4">{description}</p>
          <Button 
            onClick={onClick}
            disabled={isDisabled}
            size="sm" 
            className="w-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 hover:border-primary/40"
          >
            {buttonText} {count > 0 && `(${count})`}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ProjectOverviewCard = ({ project, onOpenModal, progress }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="col-span-1 md:col-span-2 lg:col-span-1 mb-8"
    >
      <Card className="bg-gradient-to-br from-primary/10 via-card to-secondary/10 border border-primary/30 shadow-lg hover:shadow-primary/20 transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary flex items-center">
            <FolderGit2 size={26} className="mr-3" /> Projet Actif: "{project.project_name || 'Mon Projet'}"
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <img
                src={project.mockup_link || "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=800&auto=format&fit=crop"}
                alt={`Maquette de ${project.project_name || 'Projet'}`}
                className="w-full h-48 object-cover rounded-lg border-2 border-primary/30 shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => onOpenModal('mockup', { title: "Aperçu de la Maquette", imageUrl: project.mockup_link || "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1200&auto=format&fit=crop" })}
              />
            </div>
            <div className="md:w-2/3">
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div className="flex items-center"><TargetIcon size={16} className="mr-2 text-primary"/> <strong className="text-muted-foreground mr-1">Mission:</strong> {project.project_description || 'Non définie'}</div>
                <div className="flex items-center"><Layers size={16} className="mr-2 text-primary"/> <strong className="text-muted-foreground mr-1">Statut:</strong> {project.status || 'Non défini'}</div>
                <div className="flex items-center"><ClockIcon size={16} className="mr-2 text-primary"/> <strong className="text-muted-foreground mr-1">Date de Début:</strong> {project.start_date ? new Date(project.start_date).toLocaleDateString() : 'Non définie'}</div>
                <div className="flex items-center"><ClockIcon size={16} className="mr-2 text-primary"/> <strong className="text-muted-foreground mr-1">Date de Fin:</strong> {project.end_date ? new Date(project.end_date).toLocaleDateString() : 'Non définie'}</div>
                <div className="flex items-center"><BarChart3 size={16} className="mr-2 text-primary"/> <strong className="text-muted-foreground mr-1">Budget:</strong> {project.budget || 'Non défini'}</div>
                <div className="flex items-center"><Users size={16} className="mr-2 text-primary"/> <strong className="text-muted-foreground mr-1">Audience:</strong> {project.audience || 'Non définie'}</div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Progression Totale:</p>
                <div className="w-full bg-secondary/20 rounded-full h-3 border border-primary/20">
                  <motion.div 
                    className="bg-gradient-to-r from-primary to-secondary h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
                <p className="text-right text-xs text-primary mt-1">{progress}%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const TaskListModalContent = ({ tasks, onToggleTaskStatus }) => {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        <CheckSquare size={40} className="mx-auto mb-3 opacity-50" />
        <p>Aucune tâche assignée pour le moment.</p>
        <p className="text-xs mt-1">L'administrateur peut vous assigner des tâches pour vous aider à progresser.</p>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      {tasks.map(task => (
        <motion.div
          key={task.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg border ${task.status === 'Terminé' ? 'border-green-500/30 bg-green-500/10' : 'border-primary/20 bg-card/50'}`}
        >
          <div className="flex items-start justify-between">
            <div>
              <h4 className={`font-semibold ${task.status === 'Terminé' ? 'text-green-400 line-through' : 'text-foreground'}`}>{task.title}</h4>
              {task.description && <p className={`text-xs mt-1 ${task.status === 'Terminé' ? 'text-muted-foreground line-through' : 'text-muted-foreground'}`}>{task.description}</p>}
              <p className="text-xs mt-2 text-muted-foreground">Assignée par: {task.assignedBy} - Le {new Date(task.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="flex items-center space-x-2 pt-1">
              <Label htmlFor={`task-${task.id}`} className="text-xs text-muted-foreground cursor-pointer hover:text-foreground">
                {task.status === 'Terminé' ? 'Terminée' : 'À faire'}
              </Label>
              <Checkbox
                id={`task-${task.id}`}
                checked={task.status === 'Terminé'}
                onCheckedChange={() => onToggleTaskStatus(task.id)}
                className={task.status === 'Terminé' ? 'border-green-500 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-600' : 'border-primary'}
              />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const ActivityModalContent = ({ activities }) => {
  if (!activities || activities.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        <CheckSquare size={40} className="mx-auto mb-3 opacity-50" />
        <p>Aucune activité enregistrée pour le moment.</p>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      {activities.map(activity => (
        <motion.div
          key={activity.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-lg border border-primary/20 bg-card/50"
        >
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-semibold text-foreground">{activity.activity_log}</h4>
              <p className="text-xs mt-1 text-muted-foreground">Form ID: {activity.form_data_id}</p>
              <p className="text-xs mt-1 text-muted-foreground">Acteur: {activity.actor}</p>
              <p className="text-xs mt-1 text-muted-foreground">Créé le: {new Date(activity.created_at).toLocaleDateString()}</p>
              <p className="text-xs mt-1 text-muted-foreground">Mis à jour le: {new Date(activity.updated_at).toLocaleDateString()}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const UserDashboardPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState(null);
  const [projects, setProjects] = useState([]);
  const [activities, setActivities] = useState([]);
  const [activityCount, setActivityCount] = useState(0);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [newTaskNotificationCount, setNewTaskNotificationCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("Utilisateur");
  const [projectStatus, setProjectStatus] = useState(null);
  const [progress, setProgress] = useState(0); // Added progress state

  const checkProjectStatus = async () => {
    try {
      console.log('Checking project status for projectId:', projectId);
      const response = await ApiService('/check-status', 'GET', { project_id: projectId });
      console.log('Response from /check-status:', response);
      if (response.success) {
        setProjectStatus(response.status);
        return response.status;
      } else {
        toast({ title: "Erreur", description: response.message || 'Impossible de vérifier le statut du projet', variant: "destructive" });
        setProjectStatus('error');
        return 'error';
      }
    } catch (error) {
      console.error('Error checking project status:', error);
      toast({ title: "Erreur", description: error.message || 'Une erreur s\'est produite lors de la vérification du statut', variant: "destructive" });
      setProjectStatus('error');
      return 'error';
    }
  };

  const loadProjectData = async () => {
    try {
      const response = await ApiService('/projects-table', 'GET');
      if (response.success && response.data.length > 0) {
        setProjects(response.data);
        const currentProject = response.data.find(p => p.id === parseInt(projectId)) || response.data[0];
        setProjectData(currentProject);
        setAssignedTasks(currentProject.assignedTasks || []);
        const newTasks = (currentProject.assignedTasks || []).filter(task => task.status === 'À faire' && !task.isViewed);
        setNewTaskNotificationCount(newTasks.length);
        setProgress(currentProject.progress || 0); // Set progress from project data
      } else {
        toast({ title: "Erreur", description: response.message || 'Aucun projet trouvé', variant: "destructive" });
        setProjectData(null);
        setProgress(0);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast({ title: projectId === 'default-user-project' ? "Information" : "Erreur", description: error.message || 'Une erreur s\'est produite lors du chargement des projets', variant: "destructive" });
      setProjectData(null);
      setProgress(0);
    }
  };

  const loadActivitiesData = async (formDataId = null) => {
    try {
      const response = await ApiService('/projects-activites', 'GET', { form_data_id: formDataId });
      if (response.success) {
        setActivities(response.data);
        setActivityCount(response.count);
      } else {
        toast({ title: "Erreur", description: response.message || 'Aucune activité trouvée', variant: "destructive" });
        setActivities([]);
        setActivityCount(0);
      }
    } catch (error) {
      console.error('Error fetching activities:', error);
      toast({ title: "Erreur", description: error.message || 'Une erreur s\'est produite lors du chargement des activités', variant: "destructive" });
      setActivities([]);
      setActivityCount(0);
    }
  };

  useEffect(() => {
    const initializeDashboard = async () => {
      setLoading(true);
      const status = await checkProjectStatus();
      console.log('Project status set to:', status);

      if (status === 'rejected') {
        toast({ title: "Projet Rejeté", description: "Votre projet a été rejeté.", variant: "destructive" });
        setLoading(false);
        return;
      }

      while (projectStatus === null) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      if (projectStatus !== 'completed' && projectStatus !== 'payment_done') {
        toast({ title: "En Attente", description: "L'administrateur examine votre projet.", variant: "default" });
        setLoading(false);
        return;
      }

      await loadProjectData();
      const formDataId = projectData?.form_data_id || 1;
      await loadActivitiesData(formDataId);
      setUserName("ADMIN 1");
      setLoading(false);
    };

    initializeDashboard();
  }, [projectId, navigate, projectStatus]);

  const handleOpenModal = (type, data) => {
    setModalContent({ type, ...data });
    setIsModalOpen(true);
    if (type === 'taskList') {
      const updatedTasks = (projectData?.assignedTasks || []).map(task => ({ ...task, isViewed: true }));
      setAssignedTasks(updatedTasks);
      setNewTaskNotificationCount(0);
    }
  };

  const handleFeatureClick = (featureTitle, description) => {
    handleOpenModal('featureInfo', { title: featureTitle, content: description || "Cette fonctionnalité est en cours de mise à jour pour enrichir votre expérience BizzWiz AI !" });
  };

  const handleToggleTaskStatus = (taskId) => {
    const updatedTasks = assignedTasks.map(task => 
      task.id === taskId 
        ? { ...task, status: task.status === 'À faire' ? 'Terminé' : 'À faire' }
        : task
    );
    setAssignedTasks(updatedTasks);
    setNewTaskNotificationCount(updatedTasks.filter(task => task.status === 'À faire' && !task.isViewed).length);

    if (projectId && projectId !== 'default-user-project') {
      toast({ title: "Statut de Tâche Mis à Jour", description: "Le statut de la tâche a été modifié." });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.07, delayChildren: 0.1 }
    }
  };

  const itemMotionProps = (delay = 0) => ({
    initial: { opacity: 0, y: 25, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 90, duration: 0.7, delay } },
    viewport: { once: true, amount: 0.1 }
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-150px)]">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
        <p className="mt-6 text-xl text-muted-foreground">Chargement de votre espace personnalisé...</p>
      </div>
    );
  }

  if (projectStatus === 'rejected') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-150px)]">
        <XCircle className="h-16 w-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-foreground">Projet Rejeté</h2>
        <p className="text-muted-foreground mt-2">Votre projet a été rejeté. Veuillez contacter l'administrateur pour plus de détails.</p>
        <Button 
          className="mt-6 bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80"
          onClick={() => navigate('/dashboard')}
        >
          Retour au Tableau de Bord
        </Button>
      </div>
    );
  }

  if (projectStatus !== 'completed' && projectStatus !== 'payment_done') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-150px)] bg-gray-900 text-white">
        <AlertCircle className="h-16 w-16 text-yellow-500 mb-4" />
        <h2 className="text-2xl font-bold">Pending Review</h2>
        <p className="text-muted-foreground mt-2">The administrator is reviewing your project. You will receive a notification once it is approved.</p>
        <Button 
          className="mt-6 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
          onClick={() => navigate('/dashboard')}
        >
          Back to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-10 md:space-y-12 p-6"
    >
      {/* Stats Cards */}
      <div className="grid gap-5 md:gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Objectif Principal" 
          value="Lancement V1" 
          icon={TargetIcon} 
          color="text-primary" 
          delay={0.1} 
          cta="Voir mes projets" 
          ctaLink="/dashboard/projets" 
          gradientFrom="from-primary/15" 
          gradientTo="to-card/70" 
        />
        <StatCard 
          title="Prochain Jalon" 
          value="Finaliser Design" 
          icon={CheckCircle} 
          color="text-green-400" 
          delay={0.2} 
          cta="Consulter rapports" 
          ctaLink="/dashboard/rapports" 
          gradientFrom="from-green-500/15" 
          gradientTo="to-card/70" 
        />
        <StatCard 
          title="Aperçu des Activités" 
          value={activityCount} 
          icon={Lightbulb} 
          color="text-yellow-400" 
          delay={0.3} 
          cta="Explorer activités" 
          ctaLink="#" 
          gradientFrom="from-yellow-500/15" 
          gradientTo="to-card/70" 
        />
        <StatCard 
          title="Progression Globale" 
          value={progress} 
          icon={BarChart3} 
          color="text-sky-400" 
          delay={0.4} 
          cta="Voir feuille de route" 
          ctaLink="/dashboard/feuille-de-route" 
          gradientFrom="from-sky-500/15" 
          gradientTo="to-card/70" 
        />
      </div>

      {/* Project Overview */}
      <ProjectOverviewCard project={projectData} onOpenModal={handleOpenModal} progress={progress} />

      {/* Quick Actions Grid */}
      <motion.div {...itemMotionProps(0.35)}>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-5 md:mb-6 flex items-center">
          <Sparkles className="text-secondary mr-2.5 opacity-80" size={28} /> Tableau de Bord Projet
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <QuickActionCard 
            title="Feuille de Route Interactive" 
            description="Suivez les étapes de développement en temps réel et visualisez les détails de chaque phase." 
            icon={ListChecks}
            onClick={() => handleOpenModal('roadmap', { title: "Feuille de Route Interactive" })}
            delay={0.1}
            buttonText="Voir Roadmap"
          />
          <QuickActionCard 
            title="Assistant BizzWiz Dédié" 
            description="Discutez avec votre IA assistante pour toute question ou conseil sur votre projet." 
            icon={BrainCircuit}
            onClick={() => setIsAssistantOpen(true)}
            delay={0.2}
            buttonText="Mon Assistant"
          />
          <QuickActionCard  
            title="Aperçu des Activités" 
            description="Consultez et suivez toutes vos activités récentes et assignées par votre administrateur." 
            icon={CheckSquare}
            onClick={() => handleOpenModal('activityOverview', { title: "Aperçu des Activités", activities })}
            delay={0.3}
            buttonText="Activités"
            count={activityCount}
          />
          <QuickActionCard 
            title="Marketplace" 
            description="Découvrez des outils et ressources pour optimiser votre projet." 
            icon={Package}
            onClick={() => handleFeatureClick("Marketplace", "Explorez notre marketplace d'outils et de ressources.")}
            delay={0.4}
            buttonText="Explorer"
          />
          <QuickActionCard 
            title="RUCHS ADS" 
            description="Boostez votre projet avec des campagnes publicitaires intelligentes." 
            icon={Megaphone}
            onClick={() => handleFeatureClick("RUCHS ADS", "Lancez des campagnes publicitaires ciblées pour votre projet.")}
            delay={0.5}
            buttonText="Campagnes"
          />
          <QuickActionCard 
            title="Parrainage" 
            description="Invitez des collaborateurs et développez votre réseau professionnel." 
            icon={Users}
            onClick={() => handleFeatureClick("Parrainage", "Invitez des membres et bénéficiez d'avantages exclusifs.")}
            delay={0.6}
            buttonText="Inviter"
          />
        </div>
      </motion.div>

      {/* AI Assistant Panel */}
      <AnimatePresence>
        {isAssistantOpen && (
          <AIAssistantPanel 
            onClose={() => setIsAssistantOpen(false)} 
            projectName={projectData?.project_name || 'Général'}
          />
        )}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && modalContent && (
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="bg-card border-primary text-foreground max-w-lg sm:max-w-xl md:max-w-2xl">
              <DialogHeader>
                <DialogTitle className="font-bold text-primary text-2xl">{modalContent.title}</DialogTitle>
                {modalContent.type === 'roadmap' && (
                  <DialogDescription className="text-muted-foreground">
                    Visualisez la feuille de route complète de votre projet.
                  </DialogDescription>
                )}
                {modalContent.type === 'taskList' && (
                  <DialogDescription className="text-muted-foreground">
                    Voici les tâches qui vous ont été assignées. Vous pouvez les marquer comme terminées.
                  </DialogDescription>
                )}
                {modalContent.type === 'activityOverview' && (
                  <DialogDescription className="text-muted-foreground">
                    Voici les activités récentes pour ce projet.
                  </DialogDescription>
                )}
                {modalContent.type === 'roadmapDetail' && (
                  <DialogDescription className="text-muted-foreground">
                    Détails de la phase sélectionnée.
                  </DialogDescription>
                )}
                {modalContent.type === 'featureInfo' && (
                  <DialogDescription className="text-muted-foreground">
                    Informations sur la fonctionnalité.
                  </DialogDescription>
                )}
              </DialogHeader>
              <div className="py-4 max-h-[70vh] overflow-y-auto">
                {modalContent.type === 'mockup' && (
                  <img
                    src={modalContent.imageUrl}
                    alt="Maquette détaillée"
                    className="w-full h-auto object-contain rounded-lg border border-primary/20"
                  />
                )}
                {modalContent.type === 'roadmap' && (
                  <Roadmap projectData={projectData} onOpenModal={handleOpenModal} />
                )}
                {modalContent.type === 'taskList' && (
                  <TaskListModalContent tasks={modalContent.tasks} onToggleTaskStatus={handleToggleTaskStatus} />
                )}
                {modalContent.type === 'activityOverview' && (
                  <ActivityModalContent activities={modalContent.activities} />
                )}
                {modalContent.type === 'roadmapDetail' && (
                  <div>
                    <p className="text-muted-foreground mb-4">{modalContent.content}</p>
                    {modalContent.tasks && modalContent.tasks.length > 0 && (
                      <>
                        <h5 className="font-semibold text-primary mb-2">Tâches associées :</h5>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground/90">
                          {modalContent.tasks.map((task, i) => (
                            <li key={i}>
                              {task.name} -{' '}
                              <span
                                className={`font-medium ${
                                  task.status === 'Terminé' ? 'text-green-400' : 'text-primary/80'
                                }`}
                              >
                                {task.status}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                    {(!modalContent.tasks || modalContent.tasks.length === 0) && (
                      <p className="text-sm text-muted-foreground/70">
                        Aucune tâche spécifique listée pour cette phase.
                      </p>
                    )}
                  </div>
                )}
                {modalContent.type === 'featureInfo' && (
                  <p className="text-muted-foreground">{modalContent.content}</p>
                )}
              </div>
              <DialogFooter>
                <Button 
                  onClick={() => setIsModalOpen(false)} 
                  className="bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80"
                >
                  Fermer
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      {/* Bottom CTA Section */}
      <motion.div 
        {...itemMotionProps(0.6)}
        className="mt-12 bg-gradient-to-r from-primary/10 via-card to-secondary/10 border border-primary/30 rounded-xl p-6 shadow-lg"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-2">Besoin d'aide supplémentaire ?</h3>
            <p className="text-muted-foreground">Notre équipe est disponible pour vous accompagner dans la réussite de votre projet.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-primary/30 hover:border-primary/50">
              <MessageSquare size={16} className="mr-2"/> Contacter le Support
            </Button>
            <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80">
              <UserPlus size={16} className="mr-2"/> Demander un Expert
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default UserDashboardPage;

