import React, { useState, useEffect } from 'react';
import { 
  Calendar, Briefcase, MessageCircle, ExternalLink, Trophy, Clock, Bell, BarChart3, CheckCircle, Euro, UserPlus, Figma,
  Settings, Lightbulb, TerminalSquare, Palette, Code2, ShieldCheck, Users, DollarSign,
  BarChart2, MessageSquare, Database, Cloud, SearchCheck, Rocket, Award, TrendingUp, Activity, Milestone
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatService from '../../services/chatService';
import ApiService from '../../apiService';

const featureIconOptions = [
  { value: 'Settings', label: 'Configuration', icon: <Settings className="w-5 h-5" /> },
  { value: 'Lightbulb', label: 'Idéation', icon: <Lightbulb className="w-5 h-5" /> },
  { value: 'TerminalSquare', label: 'Développement Backend', icon: <TerminalSquare className="w-5 h-5" /> },
  { value: 'Palette', label: 'Design UI/UX', icon: <Palette className="w-5 h-5" /> },
  { value: 'Code2', label: 'Développement Frontend', icon: <Code2 className="w-5 h-5" /> },
  { value: 'ShieldCheck', label: 'Sécurité', icon: <ShieldCheck className="w-5 h-5" /> },
  { value: 'Users', label: 'Gestion Utilisateurs', icon: <Users className="w-5 h-5" /> },
  { value: 'DollarSign', label: 'Monétisation', icon: <DollarSign className="w-5 h-5" /> },
  { value: 'BarChart2', label: 'Analyse & Données', icon: <BarChart2 className="w-5 h-5" /> },
  { value: 'MessageSquare', label: 'Communication', icon: <MessageSquare className="w-5 h-5" /> },
  { value: 'Database', label: 'Base de Données', icon: <Database className="w-5 h-5" /> },
  { value: 'Cloud', label: 'Infrastructure Cloud', icon: <Cloud className="w-5 h-5" /> },
  { value: 'SearchCheck', label: 'Tests & QA', icon: <SearchCheck className="w-5 h-5" /> },
  { value: 'Rocket', label: 'Lancement', icon: <Rocket className="w-5 h-5" /> },
  { value: 'Award', label: 'Objectif Clé', icon: <Award className="w-5 h-5" /> },
  { value: 'TrendingUp', label: 'Croissance/Marketing', icon: <TrendingUp className="w-5 h-5" /> },
  { value: 'Activity', label: 'Tâche Générale', icon: <Activity className="w-5 h-5" /> },
  { value: 'Milestone', label: 'Jalon Important', icon: <Milestone className="w-5 h-5" /> },
];

const getFeatureIcon = (iconName) => {
  const found = featureIconOptions.find(opt => opt.value === iconName);
  return found ? found.icon : <Activity className="w-5 h-5" />;
};

function calculateBadgesAndXP(userStats) {
  const badges = [];
  let xp = 0;

  // Badge: New User
  if (userStats.totalProjects === 1) {
    badges.push({
      id: 'new-user',
      name: 'New User',
      unlocked: true,
      rarity: 'common',
      icon: <Users className="w-6 h-6" />,
    });
    xp += 100;
  }

  // Badge: Best User (multiple projects)
  if (userStats.totalProjects > 1) {
    badges.push({
      id: 'best-user',
      name: 'Best User',
      unlocked: true,
      rarity: 'rare',
      icon: <Award className="w-6 h-6" />,
    });
    xp += 100;
  }

  // Badge: Pro Investor (investment ≥ 100,000)
  if (userStats.totalInvestment >= 100000) {
    badges.push({
      id: 'pro-investor',
      name: 'Pro Investor',
      unlocked: true,
      rarity: 'epic',
      icon: <Euro className="w-6 h-6" />,
    });
    xp += 100;
  }

  // Add more badge rules as needed...

  return { badges, xp };
}

function Cockpit({ notifications, setSelectedProject, setActiveSection, setShowChat }) {
  const [chatNotifications, setChatNotifications] = useState([]);
  const [unreadChatCount, setUnreadChatCount] = useState(0);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load chat notifications
  useEffect(() => {
    const loadChatNotifications = async () => {
      try {
        if (ChatService && typeof ChatService.getUnreadCount === 'function') {
          const response = await ChatService.getUnreadCount();
          if (response && response.data) {
            setUnreadChatCount(response.data.unread_count || 0);
          }
        }
      } catch (error) {
        console.error('Error loading chat notifications:', error);
      }
    };

    loadChatNotifications();
    const interval = setInterval(loadChatNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  // Fetch project details from new endpoint
  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      const projectId = localStorage.getItem('bizzwiz-selectedProjectId');
      if (!projectId) {
        setLoading(false);
        return;
      }
      try {
        const response = await ApiService(`/user/project-cockpit/${projectId}`, 'GET');
        if (response.success && response.data) {
          setProject(response.data);

          // Calculate badges and XP
          let newBadges = [];
          let newXp = 0;

          // Always give New User badge
          newBadges.push({
            id: 'new-user',
            name: 'New User',
            unlocked: true,
            icon: <Users className="w-6 h-6" />,
          });
          newXp += 100;

          // Pro Investor
          if (response.data.budget >= 100000) {
            newBadges.push({
              id: 'pro-investor',
              name: 'Pro Investor',
              unlocked: true,
              icon: <Euro className="w-6 h-6" />,
            });
            newXp += 100;
          }

          // Project Completed
          if (response.data.status && response.data.status.toLowerCase() === 'completed') {
            newBadges.push({
              id: 'completed',
              name: 'Project Completed',
              unlocked: true,
              icon: <CheckCircle className="w-6 h-6" />,
            });
            newXp += 100;
          }

          // Payment Done
          if (
            response.data.status &&
            (response.data.status.toLowerCase() === 'paymentdone' ||
              response.data.status.toLowerCase() === 'payment')
          ) {
            newBadges.push({
              id: 'payment-done',
              name: 'Payment Done',
              unlocked: true,
              icon: <DollarSign className="w-6 h-6" />,
            });
            newXp += 100;
          }

          // Big Team (5+ members)
          let teamCount = 0;
          if (Array.isArray(response.data.team_assigned)) {
            teamCount = response.data.team_assigned.length;
          } else if (typeof response.data.team_assigned === 'string') {
            teamCount = response.data.team_assigned.split(',').filter(Boolean).length;
          } else if (typeof response.data.team_assigned === 'number') {
            teamCount = response.data.team_assigned;
          }
          if (teamCount >= 5) {
            newBadges.push({
              id: 'big-team',
              name: 'Big Team',
              unlocked: true,
              icon: <Users className="w-6 h-6" />,
            });
            newXp += 100;
          }

          // Speedster (completed < 30 days)
          if (
            response.data.status &&
            response.data.status.toLowerCase() === 'completed' &&
            response.data.start_date &&
            response.data.end_date
          ) {
            const start = new Date(response.data.start_date);
            const end = new Date(response.data.end_date);
            const days = (end - start) / (1000 * 60 * 60 * 24);
            if (days > 0 && days < 30) {
              newBadges.push({
                id: 'speedster',
                name: 'Speedster',
                unlocked: true,
                icon: <Rocket className="w-6 h-6" />,
              });
              newXp += 100;
            }
          }

          // Persistent (in progress > 6 months)
          if (
            response.data.status &&
            response.data.status.toLowerCase() !== 'completed' &&
            response.data.start_date
          ) {
            const start = new Date(response.data.start_date);
            const now = new Date();
            const months = (now - start) / (1000 * 60 * 60 * 24 * 30);
            if (months >= 6) {
              newBadges.push({
                id: 'persistent',
                name: 'Persistent',
                unlocked: true,
                icon: <Clock className="w-6 h-6" />,
              });
              newXp += 100;
            }
          }

          // Milestone Achiever (50%/75% progress)
          if (response.data.progress >= 75) {
            newBadges.push({
              id: 'milestone-75',
              name: '75% Milestone',
              unlocked: true,
              icon: <Milestone className="w-6 h-6" />,
            });
            newXp += 100;
          } else if (response.data.progress >= 50) {
            newBadges.push({
              id: 'milestone-50',
              name: '50% Milestone',
              unlocked: true,
              icon: <Milestone className="w-6 h-6" />,
            });
            newXp += 100;
          }

          // Early Bird (created in January)
          if (response.data.created_at && new Date(response.data.created_at).getMonth() === 0) {
            newBadges.push({
              id: 'early-bird',
              name: 'Early Bird',
              unlocked: true,
              icon: <Calendar className="w-6 h-6" />,
            });
            newXp += 100;
          }

          setBadges(newBadges);
          setXp(newXp);
        }
      } catch (error) {
        // Optionally handle error
      }
      setLoading(false);
    };
    fetchProject();
  }, []);

  const iconMap = {
    CheckCircle: <CheckCircle className="w-5 h-5" />,
    Euro: <Euro className="w-5 h-5" />,
    UserPlus: <UserPlus className="w-5 h-5" />,
    Figma: <Figma className="w-5 h-5" />,
    // ...add all icons you use in features
  };

  const [timelineEvents, setTimelineEvents] = useState([]);

  useEffect(() => {
    const fetchTimeline = async () => {
      const userId = localStorage.getItem('bizzwiz-userId');
      const formDataId = localStorage.getItem('bizzwiz-selectedProjectId');
      if (!userId || !formDataId) return;
      try {
        const res = await ApiService(`/user/projects/${userId}/${formDataId}/features`, 'GET');
        if (res.data) {
          setTimelineEvents(
            res.data.map(feature => ({
              ...feature, // keep all fields
              iconComponent: getFeatureIcon(feature.icon),
              date: new Date(feature.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }),
            }))
          );
        }
      } catch (e) {
        // handle error
      }
    };
    fetchTimeline();
  }, []);

  const [userStats, setUserStats] = useState(null);
  const [badges, setBadges] = useState([]);
  const [xp, setXp] = useState(0);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#000011] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
          <p className="text-white/80 text-lg">Chargement du projet...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#000011] flex items-center justify-center">
        <p className="text-white/80 text-lg">Aucun projet sélectionné.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.4 }}
      className="flex-1 p-4 sm:p-6 md:p-8"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-4 sm:mb-6 tracking-wide">
            Synchro établie, bienvenue Marie
          </h1>
          <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              whileHover={{ scale: 1.01, boxShadow: '0 8px 32px 0 rgba(139,92,246,0.10)' }}
              transition={{ duration: 0.3 }}
              className="relative group mb-6 lg:mb-0"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 via-cyan-500/20 to-purple-600/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-[#000011] rounded-3xl p-4 sm:p-8 md:p-10 group-hover:shadow-2xl group-hover:shadow-purple-500/10 transition-all duration-500">
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <div className="flex items-center space-x-3 sm:space-x-4 mb-2 sm:mb-4">
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white tracking-wide">{project.project_name}</h2>
                      <div className="px-3 sm:px-4 py-1 sm:py-2 bg-green-500/10 rounded-full">
                        <span className="text-green-400 text-xs sm:text-sm font-light">{project.status === 'PaymentDone' ? 'Payé' : project.status}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center space-x-4 sm:space-x-8 text-xs sm:text-sm text-white/70">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-purple-400" />
                        <span>Livraison: {project.end_date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Briefcase className="w-4 h-4 text-cyan-400" />
                        <span>€{project.budget}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-3">
                    <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                      <div className="text-right">
                        <div className="text-white font-light text-sm sm:text-base">
                        {Array.isArray(project?.team_assigned)
  ? project.team_assigned.join(', ')
  : (typeof project?.team_assigned === 'string'
      ? project.team_assigned
      : 'Non défini')}

                        </div>
                        <div className="text-white/50 text-xs sm:text-sm">Équipe assignée</div>
                      </div>
                    </div>
                    <button 
                      onClick={() => setShowChat(true)}
                      className="relative px-3 sm:px-4 py-1 sm:py-2 bg-purple-500/10 rounded-xl text-purple-400 hover:bg-purple-500/20 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 flex items-center space-x-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-xs sm:text-sm font-light">Chat crypté</span>
                      {unreadChatCount > 0 && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
                        >
                          <span className="text-xs text-white font-medium">
                            {unreadChatCount > 99 ? '99+' : unreadChatCount}
                          </span>
                        </motion.div>
                      )}
                    </button>
                  </div>
                </div>
                <div className="mb-6 md:mb-8">
                  <div className="flex items-center justify-between mb-2 md:mb-4">
                    {/* <span className="text-white/80 font-light text-base sm:text-lg">Phase actuelle: Développement Backend</span> */}
                    <div className="text-right">
                      <div className="text-2xl sm:text-3xl font-light text-purple-400">{project.progress ?? 0}%</div>
                      <div className="text-white/50 text-xs sm:text-sm">Prochain: 50%</div>
                    </div>
                  </div>
                  <div className="w-full h-2 sm:h-3 bg-white/5 rounded-full overflow-hidden mb-2 sm:mb-4">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full transition-all duration-1000 relative"
                      style={{ width: `${project.progress ?? 0}%` }}
                    >
                      <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm text-white/60 gap-1 sm:gap-0">
                    {/* <span>Milestone prochain: Architecture Core</span> */}
                    <span>Date cible: {project.end_date ?? '-'}</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  <button 
                    onClick={() => {
                      setSelectedProject(project);
                      setActiveSection('project-details');
                    }}
                    className="flex-1 relative group/btn"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/50 to-pink-500/50 rounded-2xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 blur-sm"></div>
                    <div className="relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600/20 to-pink-500/20 rounded-2xl text-white font-light hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300">
                      Détails du projet
                    </div>
                  </button>
                  <button className="flex-1 relative group/btn">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500/50 to-purple-600/50 rounded-2xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 blur-sm"></div>
                    <div className="relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-pink-500/20 to-purple-600/20 rounded-2xl text-white font-light hover:shadow-lg hover:shadow-pink-500/20 transition-all duration-300 flex items-center space-x-2">
                      <ExternalLink className="w-4 h-4" />
                      <span>Ascendant</span>
                    </div>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="lg:col-span-4 space-y-6">
            {/* Niveau (XP/Level) Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              whileHover={{ scale: 1.01, boxShadow: '0 8px 32px 0 rgba(250,204,21,0.10)' }}
              transition={{ duration: 0.3 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-yellow-500/20 to-orange-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
              <div className="relative bg-[#000011] rounded-2xl p-4 sm:p-6 group-hover:shadow-2xl group-hover:shadow-yellow-500/10 transition-all duration-500">
                <div className="text-center mb-4 sm:mb-6">
                  <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                    <Trophy className="w-5 sm:w-6 h-5 sm:h-6 text-yellow-400" />
                    <span className="text-lg sm:text-2xl font-light text-white">Niveau</span>
                  </div>
                  <div className="text-yellow-400 font-light text-base sm:text-lg mb-1 sm:mb-2">{xp.toLocaleString()} XP</div>
                  <div className="text-white/50 text-xs sm:text-sm">Prochain niveau: XP</div>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden mb-4 sm:mb-6">
                  <div 
                    className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"
                    style={{ width: `${Math.min((xp / 3000) * 100, 100)}%` }}
                  ></div>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:gap-4 text-center">
                  <div>
                    <div className="text-lg sm:text-2xl font-light text-cyan-400">€{project?.budget ? (project.budget / 1000).toFixed(0) + 'K' : '0K'}</div>
                    <div className="text-white/50 text-xs">Investissement</div>
                  </div>
                  <div>
                    <div className="text-lg sm:text-2xl font-light text-green-400">
                      {Array.isArray(project?.team_assigned)
                        ? project.team_assigned.length
                        : (typeof project?.team_assigned === 'string'
                            ? project.team_assigned.split(',').filter(Boolean).length
                            : project?.team_assigned ?? 0)}
                    </div>
                    <div className="text-white/50 text-xs">Équipiers</div>
                  </div>
                  <div>
                    <div className="text-lg sm:text-2xl font-light text-purple-400">1</div>
                    <div className="text-white/50 text-xs">Projets</div>
                  </div>
                  <div>
                    <div className="text-lg sm:text-2xl font-light text-pink-400">{project?.progress ?? 0}%</div>
                    <div className="text-white/50 text-xs">Progression</div>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              whileHover={{ scale: 1.01, boxShadow: '0 8px 32px 0 rgba(139,92,246,0.10)' }}
              transition={{ duration: 0.3 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-purple-500/20 to-cyan-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
              <div className="relative bg-[#000011] rounded-2xl p-4 sm:p-6 group-hover:shadow-2xl group-hover:shadow-purple-500/10 transition-all duration-500">
                <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                  <Clock className="w-5 sm:w-6 h-5 sm:h-6 text-purple-400" />
                  <h3 className="text-white font-light text-base sm:text-lg">Timeline</h3>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  {timelineEvents.map((event, index) => (
                    <div key={event.id} className="flex items-start space-x-3 sm:space-x-4">
                      <div className="relative">
                        <div className="w-6 sm:w-8 h-6 sm:h-8 rounded-full flex items-center justify-center" style={{ color: '#8A2BE2' }}>
                          {event.iconComponent}
                        </div>
                        {index < timelineEvents.length - 1 && (
                          <div className="absolute top-8 left-4 w-px h-6 bg-white/10"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-2">
                        <div className="text-white/80 font-light text-xs sm:text-sm">{event.title}</div>
                        <div className="text-white/50 text-xs">{event.date}</div>
                        {/* Show more fields */}
                        <div className="text-white/60 text-xs">{event.description}</div>
                        <div className="text-white/40 text-xs">Status: {event.status}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              whileHover={{ scale: 1.01, boxShadow: '0 8px 32px 0 rgba(34,211,238,0.10)' }}
              transition={{ duration: 0.3 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-cyan-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
              <div className="relative bg-[#000011] rounded-2xl p-4 sm:p-6 group-hover:shadow-2xl group-hover:shadow-cyan-500/10 transition-all duration-500">
                <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                  <Bell className="w-5 sm:w-6 h-5 sm:h-6 text-cyan-400" />
                  <h3 className="text-white font-light text-base sm:text-lg">Notifications</h3>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  {/* Chat notification */}
                  {unreadChatCount > 0 && (
                    <div 
                      onClick={() => setShowChat(true)}
                      className="p-3 sm:p-4 bg-purple-500/10 rounded-xl hover:bg-purple-500/20 transition-colors duration-300 cursor-pointer border border-purple-500/20"
                    >
                      <div className="flex items-start justify-between mb-1 sm:mb-2">
                        <div className="flex items-center space-x-2">
                          <MessageCircle className="w-4 h-4 text-purple-400" />
                          <p className="text-purple-400 text-xs sm:text-sm font-light">Nouveaux messages</p>
                        </div>
                        <span className="text-purple-400 text-xs">{unreadChatCount} nouveau{unreadChatCount > 1 ? 'x' : ''}</span>
                      </div>
                      <p className="text-purple-300 text-xs">Vous avez des messages non lus dans le chat</p>
                    </div>
                  )}
                  
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id}
                      className="p-3 sm:p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors duration-300"
                    >
                      <div className="flex items-start justify-between mb-1 sm:mb-2">
                        <p className="text-white/80 text-xs sm:text-sm font-light">{notification.title}</p>
                        <span className="text-white/40 text-xs">{notification.time}</span>
                      </div>
                      <p className="text-white/60 text-xs">{notification.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
            {/* Badges Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              whileHover={{ scale: 1.01, boxShadow: '0 8px 32px 0 rgba(139,92,246,0.10)' }}
              transition={{ duration: 0.3 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
              <div className="relative bg-[#000011] rounded-2xl p-4 sm:p-6 group-hover:shadow-2xl group-hover:shadow-purple-500/10 transition-all duration-500">
                <div className="flex items-center space-x-3 mb-6">
                  <Award className="w-5 h-5 text-purple-400" />
                  <h3 className="text-white font-light text-lg">Badges</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {badges.length === 0 && (
                    <div className="text-white/30 text-center col-span-2">Aucun badge débloqué</div>
                  )}
                  {badges.map((badge) => (
                    <div 
                      key={badge.id}
                      className={`relative p-4 rounded-xl bg-white/5`}
                    >
                      <div className="text-white flex flex-col items-center space-y-2">
                        {badge.icon}
                        <div className="text-xs text-center font-light">{badge.name}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Cockpit;