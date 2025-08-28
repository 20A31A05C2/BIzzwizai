import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Calendar, Briefcase, MessageCircle, ExternalLink, Trophy, Clock, Bell, BarChart3, CheckCircle, Euro, UserPlus, Figma,
  Settings, Lightbulb, TerminalSquare, Palette, Code2, ShieldCheck, Users, DollarSign,
  BarChart2, MessageSquare, Database, Cloud, SearchCheck, Rocket, Award, TrendingUp, Activity, Milestone
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import ChatService from '../../services/chatService';
import ApiService from '../../apiService';

const featureIconOptions = [
  { value: 'Settings', label: 'projectDetails.featureIcons.Settings', icon: <Settings className="w-5 h-5" /> },
  { value: 'Lightbulb', label: 'projectDetails.featureIcons.Lightbulb', icon: <Lightbulb className="w-5 h-5" /> },
  { value: 'TerminalSquare', label: 'projectDetails.featureIcons.TerminalSquare', icon: <TerminalSquare className="w-5 h-5" /> },
  { value: 'Palette', label: 'projectDetails.featureIcons.Palette', icon: <Palette className="w-5 h-5" /> },
  { value: 'Code2', label: 'projectDetails.featureIcons.Code2', icon: <Code2 className="w-5 h-5" /> },
  { value: 'ShieldCheck', label: 'projectDetails.featureIcons.ShieldCheck', icon: <ShieldCheck className="w-5 h-5" /> },
  { value: 'Users', label: 'projectDetails.featureIcons.Users', icon: <Users className="w-5 h-5" /> },
  { value: 'DollarSign', label: 'projectDetails.featureIcons.DollarSign', icon: <DollarSign className="w-5 h-5" /> },
  { value: 'BarChart2', label: 'projectDetails.featureIcons.BarChart2', icon: <BarChart2 className="w-5 h-5" /> },
  { value: 'MessageSquare', label: 'projectDetails.featureIcons.MessageSquare', icon: <MessageSquare className="w-5 h-5" /> },
  { value: 'Database', label: 'projectDetails.featureIcons.Database', icon: <Database className="w-5 h-5" /> },
  { value: 'Cloud', label: 'projectDetails.featureIcons.Cloud', icon: <Cloud className="w-5 h-5" /> },
  { value: 'SearchCheck', label: 'projectDetails.featureIcons.SearchCheck', icon: <SearchCheck className="w-5 h-5" /> },
  { value: 'Rocket', label: 'projectDetails.featureIcons.Rocket', icon: <Rocket className="w-5 h-5" /> },
  { value: 'Award', label: 'projectDetails.featureIcons.Award', icon: <Award className="w-5 h-5" /> },
  { value: 'TrendingUp', label: 'projectDetails.featureIcons.TrendingUp', icon: <TrendingUp className="w-5 h-5" /> },
  { value: 'Activity', label: 'projectDetails.featureIcons.Activity', icon: <Activity className="w-5 h-5" /> },
  { value: 'Milestone', label: 'projectDetails.featureIcons.Milestone', icon: <Milestone className="w-5 h-5" /> },
];

const getFeatureIcon = (iconName) => {
  const found = featureIconOptions.find(opt => opt.value === iconName);
  return found ? found.icon : <Activity className="w-5 h-5" />;
};

function calculateBadgesAndXP(userStats, t) {
  const badges = [];
  let xp = 0;

  if (userStats.totalProjects === 1) {
    badges.push({
      id: 'new-user',
      name: t('cockpit.badges.newUser'),
      unlocked: true,
      rarity: 'common',
      icon: <Users className="w-6 h-6" />,
    });
    xp += 100;
  }

  if (userStats.totalProjects > 1) {
    badges.push({
      id: 'best-user',
      name: t('cockpit.badges.bestUser'),
      unlocked: true,
      rarity: 'rare',
      icon: <Award className="w-6 h-6" />,
    });
    xp += 100;
  }

  if (userStats.totalInvestment >= 100000) {
    badges.push({
      id: 'pro-investor',
      name: t('cockpit.badges.proInvestor'),
      unlocked: true,
      rarity: 'epic',
      icon: <Euro className="w-6 h-6" />,
    });
    xp += 100;
  }

  return { badges, xp };
}

function Cockpit({ notifications, setSelectedProject, setActiveSection, setShowChat }) {
  const { t } = useTranslation();
  const [chatNotifications, setChatNotifications] = useState([]);
  const [unreadChatCount, setUnreadChatCount] = useState(0);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

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

          let newBadges = [];
          let newXp = 0;

          newBadges.push({
            id: 'new-user',
            name: t('cockpit.badges.newUser'),
            unlocked: true,
            icon: <Users className="w-6 h-6" />,
          });
          newXp += 100;

          if (response.data.budget >= 100000) {
            newBadges.push({
              id: 'pro-investor',
              name: t('cockpit.badges.proInvestor'),
              unlocked: true,
              icon: <Euro className="w-6 h-6" />,
            });
            newXp += 100;
          }

          if (response.data.status && response.data.status.toLowerCase() === 'completed') {
            newBadges.push({
              id: 'completed',
              name: t('cockpit.badges.projectCompleted'),
              unlocked: true,
              icon: <CheckCircle className="w-6 h-6" />,
            });
            newXp += 100;
          }

          if (
            response.data.status &&
            (response.data.status.toLowerCase() === 'paymentdone' ||
              response.data.status.toLowerCase() === 'payment')
          ) {
            newBadges.push({
              id: 'payment-done',
              name: t('cockpit.badges.paymentDone'),
              unlocked: true,
              icon: <DollarSign className="w-6 h-6" />,
            });
            newXp += 100;
          }

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
              name: t('cockpit.badges.bigTeam'),
              unlocked: true,
              icon: <Users className="w-6 h-6" />,
            });
            newXp += 100;
          }

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
                name: t('cockpit.badges.speedster'),
                unlocked: true,
                icon: <Rocket className="w-6 h-6" />,
              });
              newXp += 100;
            }
          }

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
                name: t('cockpit.badges.persistent'),
                unlocked: true,
                icon: <Clock className="w-6 h-6" />,
              });
              newXp += 100;
            }
          }

          if (response.data.progress >= 75) {
            newBadges.push({
              id: 'milestone-75',
              name: t('cockpit.badges.milestone75'),
              unlocked: true,
              icon: <Milestone className="w-6 h-6" />,
            });
            newXp += 100;
          } else if (response.data.progress >= 50) {
            newBadges.push({
              id: 'milestone-50',
              name: t('cockpit.badges.milestone50'),
              unlocked: true,
              icon: <Milestone className="w-6 h-6" />,
            });
            newXp += 100;
          }

          if (response.data.created_at && new Date(response.data.created_at).getMonth() === 0) {
            newBadges.push({
              id: 'early-bird',
              name: t('cockpit.badges.earlyBird'),
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
  }, [t]);

  const iconMap = {
    CheckCircle: <CheckCircle className="w-5 h-5" />,
    Euro: <Euro className="w-5 h-5" />,
    UserPlus: <UserPlus className="w-5 h-5" />,
    Figma: <Figma className="w-5 h-5" />,
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
              ...feature,
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
      <div className="min-h-[calc(100vh-68px)] bg-black flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          <p className="text-gray-300 font-montserrat text-lg">{t('cockpit.loading')}</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-[calc(100vh-68px)] bg-black flex items-center justify-center">
        <p className="text-gray-300 font-montserrat text-lg">{t('cockpit.noProject')}</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="flex-1 p-4 sm:p-6 md:p-8 bg-black"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl font-montserrat font-bold text-white mb-4"
          >
            {t('cockpit.welcome', { name: 'Marie' })}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-300 font-montserrat text-base sm:text-lg max-w-2xl mx-auto"
          >
            {t('cockpit.description')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-lg border border-white/20 p-6 md:p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
                      <Briefcase className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl md:text-2xl font-montserrat font-semibold text-white">{project.project_name}</h2>
                      <p className="text-sm text-gray-300 font-montserrat">
                        {project.status === 'PaymentDone' ? t('cockpit.status.PaymentDone') : t(`cockpit.status.${project.status}`) || t('cockpit.status.default')}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-300 font-montserrat">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-blue-400" />
                      <span>{t('cockpit.overview.delivery')}: {project.end_date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Euro className="w-5 h-5 text-green-400" />
                      <span>€{project.budget}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <div className="text-right">
                    <div className="text-gray-300 font-montserrat text-sm">
                      {Array.isArray(project?.team_assigned)
                        ? project.team_assigned.join(', ')
                        : (typeof project?.team_assigned === 'string'
                            ? project.team_assigned
                            : t('cockpit.overview.noTeam'))}
                    </div>
                    <div className="text-gray-400 font-montserrat text-xs">{t('cockpit.overview.teamAssigned')}</div>
                  </div>
                  <Button
                    onClick={() => setShowChat(true)}
                    className="bg-blue-600/20 backdrop-blur-sm text-blue-300 font-montserrat font-medium py-2 px-4 rounded-xl border border-blue-500/30 hover:bg-blue-600/30 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{t('cockpit.overview.encryptedChat')}</span>
                    {unreadChatCount > 0 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
                      >
                        <span className="text-xs text-white font-montserrat">
                          {unreadChatCount > 99 ? '99+' : unreadChatCount}
                        </span>
                      </motion.div>
                    )}
                  </Button>
                </div>
              </div>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-right">
                    <div className="text-2xl font-montserrat font-semibold text-blue-300">{project.progress ?? 0}%</div>
                    <div className="text-gray-400 font-montserrat text-xs">{t('cockpit.overview.nextMilestone', { milestone: '50%' })}</div>
                  </div>
                </div>
                <div className="w-full h-3 bg-white/10 backdrop-blur-sm rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${project.progress ?? 0}%` }}
                    transition={{ duration: 1 }}
                    className="h-full bg-blue-600/50 rounded-full"
                  />
                </div>
                <div className="text-gray-300 font-montserrat text-sm mt-2">
                  {t('cockpit.overview.targetDate')}: {project.end_date ?? t('cockpit.fallback.noDate')}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => {
                    setSelectedProject(project);
                    setActiveSection('project-details');
                  }}
                  className="flex-1 bg-purple-600/20 backdrop-blur-sm text-purple-300 font-montserrat font-medium py-3 rounded-xl border border-purple-500/30 hover:bg-purple-600/30 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
                >
                  {t('cockpit.overview.projectDetails')}
                </Button>
                <Button
                  className="flex-1 bg-green-600/20 backdrop-blur-sm text-green-300 font-montserrat font-medium py-3 rounded-xl border border-green-500/30 hover:bg-green-600/30 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>{t('cockpit.overview.ascendant')}</span>
                </Button>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-lg border border-white/20 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-montserrat font-semibold text-white">{t('cockpit.timeline.header')}</h3>
              </div>
              <div className="space-y-4">
                {timelineEvents.map((event, index) => (
                  <div key={event.id} className="flex items-start gap-4">
                    <div className="relative">
                      <div className="w-8 h-8 bg-blue-600/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-blue-500/30">
                        {event.iconComponent}
                      </div>
                      {index < timelineEvents.length - 1 && (
                        <div className="absolute top-8 left-4 w-px h-6 bg-blue-500/20" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-200 font-montserrat text-sm">{event.title}</div>
                      <div className="text-gray-400 font-montserrat text-xs">{event.date}</div>
                      <div className="text-gray-300 font-montserrat text-xs">{event.description}</div>
                      <div className="text-gray-400 font-montserrat text-xs">{t('cockpit.timeline.status')}: {t(`cockpit.status.${event.status}`) || t('cockpit.status.default')}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-lg border border-white/20 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-yellow-500/20 backdrop-blur-sm rounded-lg border border-yellow-500/30">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                </div>
                <h3 className="text-lg font-montserrat font-semibold text-white">{t('cockpit.level.header')}</h3>
              </div>
              <div className="text-center mb-4">
                <div className="text-yellow-300 font-montserrat text-lg font-medium">{xp.toLocaleString()} {t('cockpit.level.xp')}</div>
                <div className="text-gray-400 font-montserrat text-xs">{t('cockpit.level.nextLevel', { milestone: 'XP' })}</div>
              </div>
              <div className="w-full h-2 bg-white/10 backdrop-blur-sm rounded-full overflow-hidden mb-4">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((xp / 3000) * 100, 100)}%` }}
                  transition={{ duration: 1 }}
                  className="h-full bg-yellow-600/50 rounded-full"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-lg font-montserrat font-medium text-green-300">€{project?.budget ? (project.budget / 1000).toFixed(0) + 'K' : '0K'}</div>
                  <div className="text-gray-400 font-montserrat text-xs">{t('cockpit.level.investment')}</div>
                </div>
                <div>
                  <div className="text-lg font-montserrat font-medium text-blue-300">
                    {Array.isArray(project?.team_assigned)
                      ? project.team_assigned.length
                      : (typeof project?.team_assigned === 'string'
                          ? project.team_assigned.split(',').filter(Boolean).length
                          : project?.team_assigned ?? 0)}
                  </div>
                  <div className="text-gray-400 font-montserrat text-xs">{t('cockpit.level.teammates')}</div>
                </div>
                <div>
                  <div className="text-lg font-montserrat font-medium text-purple-300">1</div>
                  <div className="text-gray-400 font-montserrat text-xs">{t('cockpit.level.projects')}</div>
                </div>
                <div>
                  <div className="text-lg font-montserrat font-medium text-red-300">{project?.progress ?? 0}%</div>
                  <div className="text-gray-400 font-montserrat text-xs">{t('cockpit.level.progress')}</div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-lg border border-white/20 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-cyan-500/20 backdrop-blur-sm rounded-lg border border-cyan-500/30">
                  <Bell className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="text-lg font-montserrat font-semibold text-white">{t('cockpit.notifications.header')}</h3>
              </div>
              <div className="space-y-4">
                {unreadChatCount > 0 && (
                  <div
                    onClick={() => setShowChat(true)}
                    className="p-4 bg-blue-600/20 backdrop-blur-sm rounded-xl border border-blue-500/30 hover:bg-blue-600/30 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4 text-blue-400" />
                        <p className="text-blue-300 font-montserrat text-sm">{t('cockpit.notifications.newMessages')}</p>
                      </div>
                      <span className="text-blue-300 font-montserrat text-xs">{unreadChatCount} {t('cockpit.notifications.new', { count: unreadChatCount })}</span>
                    </div>
                    <p className="text-gray-300 font-montserrat text-xs">{t('cockpit.notifications.unreadMessages')}</p>
                  </div>
                )}
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 hover:shadow-lg hover:shadow-white/20 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-gray-200 font-montserrat text-sm">{notification.title}</p>
                      <span className="text-gray-400 font-montserrat text-xs">{notification.time}</span>
                    </div>
                    <p className="text-gray-300 font-montserrat text-xs">{notification.message}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-lg border border-white/20 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-500/20 backdrop-blur-sm rounded-lg border border-purple-500/30">
                  <Award className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="text-lg font-montserrat font-semibold text-white">{t('cockpit.badges.header')}</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {badges.length === 0 && (
                  <div className="text-gray-400 font-montserrat text-center col-span-2">{t('cockpit.badges.noBadges')}</div>
                )}
                {badges.map((badge) => (
                  <div
                    key={badge.id}
                    className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
                  >
                    <div className="text-gray-200 font-montserrat flex flex-col items-center gap-2">
                      {badge.icon}
                      <div className="text-xs text-center">{badge.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
        .hover\:scale-102:hover {
          transform: scale(1.02);
        }
        .hover\:scale-105:hover {
          transform: scale(1.05);
        }
        .active\:scale-95:active {
          transform: scale(0.95);
        }
        .font-montserrat {
          font-family: 'Montserrat', sans-serif;
        }
      `}</style>
    </motion.div>
  );
}

export default Cockpit;