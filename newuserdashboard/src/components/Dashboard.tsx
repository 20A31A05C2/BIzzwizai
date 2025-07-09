import React, { useState } from 'react';
import { 
  Home, 
  FolderOpen, 
  Settings, 
  LogOut, 
  Play, 
  ExternalLink,
  Bell,
  Zap,
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  BarChart3,
  Code,
  Palette,
  Rocket,
  MessageCircle,
  Send,
  Paperclip,
  X,
  Minimize2,
  Maximize2,
  Lock,
  ChevronRight,
  Briefcase,
  Trophy,
  Award,
  Gem,
  Crown,
  Target,
  CheckCircle,
  Euro,
  UserPlus,
  Figma,
  Pause,
  RotateCcw,
  Edit3,
  Shield,
  Eye,
  EyeOff
} from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string;
  progress: number;
  status: 'active' | 'completed' | 'draft';
  createdAt: string;
  lastUpdate: string;
  category: string;
  technologies: string[];
  team: number;
  budget: string;
  paid: boolean;
  teamLead: {
    name: string;
    role: string;
    avatar: string;
    online: boolean;
  };
  nextMilestone: {
    name: string;
    target: number;
    date: string;
  };
  currentPhase: string;
  deliveryDate: string;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'team';
  message: string;
  timestamp: string;
  senderName?: string;
}

interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  icon: React.ReactNode;
  color: string;
}

const Dashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState('cockpit');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [chatMinimized, setChatMinimized] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const project: Project = {
    id: '1',
    name: 'EYVO AI',
    description: 'Intelligence artificielle avancée pour l\'analyse prédictive et l\'automatisation des processus métier avec machine learning et deep learning intégrés.',
    progress: 35,
    status: 'active',
    createdAt: '2024-01-15',
    lastUpdate: '2024-01-28',
    category: 'Intelligence Artificielle',
    technologies: ['Python', 'TensorFlow', 'React', 'Node.js', 'PostgreSQL', 'Docker'],
    team: 8,
    budget: '€250,000',
    paid: true,
    teamLead: {
      name: 'Alexandre Moreau',
      role: 'Lead Developer & AI Specialist',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      online: true
    },
    nextMilestone: {
      name: 'Architecture Core',
      target: 50,
      date: '15 Février 2024'
    },
    currentPhase: 'Développement Backend',
    deliveryDate: '15 Juin 2024'
  };

  const userStats = {
    level: 12,
    xp: 2450,
    nextLevelXp: 3000,
    title: 'Innovateur',
    totalProjects: 1,
    totalInvestment: 250000,
    teamMembers: 8,
    completionRate: 35
  };

  const badges: Badge[] = [
    {
      id: '1',
      name: 'Visionnaire',
      description: 'Premier projet créé',
      icon: <Crown className="w-5 h-5" />,
      rarity: 'rare',
      unlocked: true
    },
    {
      id: '2',
      name: 'Investisseur Pro',
      description: 'Investissement de +€100K',
      icon: <Gem className="w-5 h-5" />,
      rarity: 'epic',
      unlocked: true
    },
    {
      id: '3',
      name: 'Innovateur IA',
      description: 'Projet IA lancé',
      icon: <Zap className="w-5 h-5" />,
      rarity: 'legendary',
      unlocked: true
    },
    {
      id: '4',
      name: 'Collaborateur',
      description: 'Équipe de 10+ membres',
      icon: <Users className="w-5 h-5" />,
      rarity: 'common',
      unlocked: false,
      progress: 8,
      maxProgress: 10
    }
  ];

  const timelineEvents: TimelineEvent[] = [
    {
      id: '1',
      title: 'Projet créé',
      date: 'Il y a 5 jours',
      icon: <CheckCircle className="w-4 h-4" />,
      color: '#8A2BE2'
    },
    {
      id: '2',
      title: 'Paiement effectué',
      date: 'Il y a 4 jours',
      icon: <Euro className="w-4 h-4" />,
      color: '#00FFFF'
    },
    {
      id: '3',
      title: 'Équipe assignée',
      date: 'Il y a 3 jours',
      icon: <UserPlus className="w-4 h-4" />,
      color: '#8A2BE2'
    },
    {
      id: '4',
      title: 'Maquette envoyée',
      date: 'Hier',
      icon: <Figma className="w-4 h-4" />,
      color: '#00FFFF'
    }
  ];

  const chatMessages: ChatMessage[] = [
    {
      id: '1',
      sender: 'team',
      message: 'Bonjour Marie ! Félicitations pour le lancement d\'EYVO AI. L\'équipe est très motivée pour ce projet innovant ! 🚀',
      timestamp: '09:15',
      senderName: 'Alexandre'
    },
    {
      id: '2',
      sender: 'team',
      message: 'Nous avons terminé la phase de recherche avec succès. Les premiers algorithmes d\'IA sont très prometteurs.',
      timestamp: '09:18',
      senderName: 'Alexandre'
    },
    {
      id: '3',
      sender: 'team',
      message: 'Prochaine étape : Architecture du système. Nous visons 50% de progression d\'ici le 15 février.',
      timestamp: '09:20',
      senderName: 'Alexandre'
    }
  ];

  const notifications = [
    {
      id: '1',
      title: 'EYVO AI - Paiement confirmé',
      message: 'Votre paiement de €250,000 a été traité avec succès',
      time: '1h',
      type: 'success' as const
    },
    {
      id: '2',
      title: 'Équipe assignée',
      message: 'Alexandre Moreau est maintenant votre chef d\'équipe',
      time: '2h',
      type: 'info' as const
    }
  ];

  const renderSidebar = () => (
    <div className="w-72 h-screen flex flex-col p-8">
      <div className="mb-16">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-white text-2xl font-light tracking-wider">BIZZ HUB</span>
        </div>
      </div>
      
      <nav className="flex-1 space-y-3">
        <button
          onClick={() => setActiveSection('cockpit')}
          className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${
            activeSection === 'cockpit' 
              ? 'bg-purple-500/10 text-white shadow-lg shadow-purple-500/20' 
              : 'text-white/60 hover:text-white hover:bg-white/5 hover:shadow-lg hover:shadow-white/10'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="font-light">Ton cockpit</span>
        </button>
        
        <button
          onClick={() => setActiveSection('projects')}
          className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${
            activeSection === 'projects' 
              ? 'bg-cyan-500/10 text-white shadow-lg shadow-cyan-500/20' 
              : 'text-white/60 hover:text-white hover:bg-white/5 hover:shadow-lg hover:shadow-white/10'
          }`}
        >
          <FolderOpen className="w-5 h-5" />
          <span className="font-light">Le Vaisseau</span>
        </button>
        
        <button
          onClick={() => setActiveSection('wiz-studio')}
          className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${
            activeSection === 'wiz-studio' 
              ? 'bg-purple-500/10 text-white shadow-lg shadow-purple-500/20' 
              : 'text-white/60 hover:text-white hover:bg-white/5 hover:shadow-lg hover:shadow-white/10'
          }`}
        >
          <Palette className="w-5 h-5" />
          <span className="font-light">WIZ Studio</span>
        </button>
        
        <button
          onClick={() => setActiveSection('wiz-learn')}
          className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${
            activeSection === 'wiz-learn' 
              ? 'bg-cyan-500/10 text-white shadow-lg shadow-cyan-500/20' 
              : 'text-white/60 hover:text-white hover:bg-white/5 hover:shadow-lg hover:shadow-white/10'
          }`}
        >
          <Rocket className="w-5 h-5" />
          <span className="font-light">WIZ Learn</span>
        </button>
        
        <button
          onClick={() => setActiveSection('settings')}
          className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${
            activeSection === 'settings' 
              ? 'bg-gray-500/10 text-white shadow-lg shadow-gray-500/20' 
              : 'text-white/60 hover:text-white hover:bg-white/5 hover:shadow-lg hover:shadow-white/10'
          }`}
        >
          <Settings className="w-5 h-5" />
          <span className="font-light">Paramètres</span>
        </button>
      </nav>
      
      <button className="w-full flex items-center space-x-4 px-6 py-4 rounded-2xl text-white/40 hover:text-red-400 hover:bg-red-500/5 hover:shadow-lg hover:shadow-red-500/10 transition-all duration-300">
        <LogOut className="w-5 h-5" />
        <span className="font-light">Déconnexion</span>
      </button>
    </div>
  );

  const renderCockpit = () => (
    <div className="flex-1 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-light text-white mb-6 tracking-wide">
            Synchro établie, bienvenue Marie
          </h1>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto"></div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Main Project Card */}
          <div className="col-span-8">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 via-cyan-500/20 to-purple-600/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-[#000011] rounded-3xl p-10 group-hover:shadow-2xl group-hover:shadow-purple-500/10 transition-all duration-500">
                
                {/* Project Header */}
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <div className="flex items-center space-x-4 mb-4">
                      <h2 className="text-4xl font-light text-white tracking-wide">EYVO AI</h2>
                      <div className="px-4 py-2 bg-green-500/10 rounded-full">
                        <span className="text-green-400 text-sm font-light">Payé</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-8 text-sm text-white/70">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-purple-400" />
                        <span>Livraison: {project.deliveryDate}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Briefcase className="w-4 h-4 text-cyan-400" />
                        <span>{project.budget}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Team Lead */}
                  <div className="text-right">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="text-right">
                        <div className="text-white font-light">{project.teamLead.name}</div>
                        <div className="text-white/50 text-sm">{project.teamLead.role}</div>
                      </div>
                      <div className="relative">
                        <img 
                          src={project.teamLead.avatar} 
                          alt="Team Lead" 
                          className="w-12 h-12 rounded-full border-2 border-green-500/50"
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#000011]"></div>
                      </div>
                    </div>
                    <button 
                      onClick={() => setShowChat(true)}
                      className="px-4 py-2 bg-purple-500/10 rounded-xl text-purple-400 hover:bg-purple-500/20 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 flex items-center space-x-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm font-light">Chat crypté</span>
                    </button>
                  </div>
                </div>

                {/* Progress Section */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white/80 font-light text-lg">Phase actuelle: {project.currentPhase}</span>
                    <div className="text-right">
                      <div className="text-3xl font-light text-purple-400">{project.progress}%</div>
                      <div className="text-white/50 text-sm">Prochain: {project.nextMilestone.target}%</div>
                    </div>
                  </div>
                  <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden mb-4">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full transition-all duration-1000 relative"
                      style={{ width: `${project.progress}%` }}
                    >
                      <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-white/60">
                    <span>Milestone prochain: {project.nextMilestone.name}</span>
                    <span>Date cible: {project.nextMilestone.date}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <button 
                    onClick={() => {
                      setSelectedProject(project);
                      setActiveSection('project-details');
                    }}
                    className="flex-1 relative group/btn"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/50 to-pink-500/50 rounded-2xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 blur-sm"></div>
                    <div className="relative px-8 py-4 bg-gradient-to-r from-purple-600/20 to-pink-500/20 rounded-2xl text-white font-light hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300">
                      Détails du projet
                    </div>
                  </button>
                  
                  <button className="relative group/btn">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500/50 to-purple-600/50 rounded-2xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 blur-sm"></div>
                    <div className="relative px-8 py-4 bg-gradient-to-r from-pink-500/20 to-purple-600/20 rounded-2xl text-white font-light hover:shadow-lg hover:shadow-pink-500/20 transition-all duration-300 flex items-center space-x-2">
                      <ExternalLink className="w-4 h-4" />
                      <span>LIVE</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-span-4 space-y-6">
            {/* User Level & XP */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
              <div className="relative bg-[#000011] rounded-2xl p-6 group-hover:shadow-2xl group-hover:shadow-yellow-500/10 transition-all duration-500">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center space-x-3 mb-3">
                    <Trophy className="w-6 h-6 text-yellow-400" />
                    <span className="text-2xl font-light text-white">Niveau {userStats.level}</span>
                  </div>
                  <div className="text-yellow-400 font-light text-lg mb-2">{userStats.xp.toLocaleString()} XP</div>
                  <div className="text-white/50 text-sm">Prochain niveau: {userStats.nextLevelXp.toLocaleString()} XP</div>
                </div>
                
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden mb-6">
                  <div 
                    className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"
                    style={{ width: `${(userStats.xp / userStats.nextLevelXp) * 100}%` }}
                  ></div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-light text-cyan-400">€{(userStats.totalInvestment / 1000).toFixed(0)}K</div>
                    <div className="text-white/50 text-xs">Investissement</div>
                  </div>
                  <div>
                    <div className="text-2xl font-light text-green-400">{userStats.teamMembers}</div>
                    <div className="text-white/50 text-xs">Équipiers</div>
                  </div>
                  <div>
                    <div className="text-2xl font-light text-purple-400">{userStats.totalProjects}</div>
                    <div className="text-white/50 text-xs">Projets</div>
                  </div>
                  <div>
                    <div className="text-2xl font-light text-pink-400">{userStats.completionRate}%</div>
                    <div className="text-white/50 text-xs">Progression</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
              <div className="relative bg-[#000011] rounded-2xl p-6 group-hover:shadow-2xl group-hover:shadow-purple-500/10 transition-all duration-500">
                <div className="flex items-center space-x-3 mb-6">
                  <Clock className="w-5 h-5 text-purple-400" />
                  <h3 className="text-white font-light text-lg">Timeline</h3>
                </div>
                
                <div className="space-y-4">
                  {timelineEvents.map((event, index) => (
                    <div key={event.id} className="flex items-start space-x-4">
                      <div className="relative">
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{ width: `${(project.progress / project.nextMilestone.target) * 100}%` }}
                        >
                          <div style={{ color: event.color }}>
                            {event.icon}
                          </div>
                        </div>
                        {index < timelineEvents.length - 1 && (
                          <div className="absolute top-8 left-4 w-px h-6 bg-white/10"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-2">
                        <div className="text-white/80 font-light text-sm">{event.title}</div>
                        <div className="text-white/50 text-xs">{event.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-cyan-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
              <div className="relative bg-[#000011] rounded-2xl p-6 group-hover:shadow-2xl group-hover:shadow-cyan-500/10 transition-all duration-500">
                <div className="flex items-center space-x-3 mb-6">
                  <Bell className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-white font-light text-lg">Notifications</h3>
                </div>
                
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id}
                      className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors duration-300"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <p className="text-white/80 text-sm font-light">{notification.title}</p>
                        <span className="text-white/40 text-xs">{notification.time}</span>
                      </div>
                      <p className="text-white/60 text-xs">{notification.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Badges */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
              <div className="relative bg-[#000011] rounded-2xl p-6 group-hover:shadow-2xl group-hover:shadow-purple-500/10 transition-all duration-500">
                <div className="flex items-center space-x-3 mb-6">
                  <Award className="w-5 h-5 text-purple-400" />
                  <h3 className="text-white font-light text-lg">Badges</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {badges.map((badge) => (
                    <div 
                      key={badge.id}
                      className={`relative p-4 rounded-xl transition-all duration-300 ${
                        badge.unlocked 
                          ? `bg-${badge.rarity === 'legendary' ? 'yellow' : badge.rarity === 'epic' ? 'purple' : badge.rarity === 'rare' ? 'blue' : 'gray'}-500/10 shadow-lg shadow-${badge.rarity === 'legendary' ? 'yellow' : badge.rarity === 'epic' ? 'purple' : badge.rarity === 'rare' ? 'blue' : 'gray'}-500/20`
                          : 'bg-white/5'
                      }`}
                    >
                      <div className={`${badge.unlocked ? 'text-white' : 'text-white/30'} flex flex-col items-center space-y-2`}>
                        {badge.icon}
                        <div className="text-xs text-center font-light">{badge.name}</div>
                        {!badge.unlocked && badge.progress !== undefined && (
                          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full transition-all duration-1000"
                              style={{ width: `${(badge.progress! / badge.maxProgress!) * 100}%` }}
                            ></div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="flex-1 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-light text-white mb-4 tracking-wide">Le Vaisseau</h1>
            <p className="text-white/60 font-light">Gérer et suivre le projet EYVO AI</p>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 via-cyan-500/20 to-purple-600/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div 
            onClick={() => {
              setSelectedProject(project);
              setActiveSection('project-details');
            }}
            className="relative bg-[#000011] rounded-3xl p-8 group-hover:shadow-2xl group-hover:shadow-purple-500/10 transition-all duration-500 cursor-pointer"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-3xl font-light text-white tracking-wide">{project.name}</h3>
                  <div className="px-3 py-1 bg-green-500/10 rounded-full">
                    <span className="text-green-400 text-sm font-light">Payé</span>
                  </div>
                </div>
                <p className="text-white/60 text-sm font-light">{project.category}</p>
              </div>
              <ChevronRight className="w-6 h-6 text-white/40 group-hover:text-white/70 transition-colors duration-300" />
            </div>
            
            <p className="text-white/50 text-sm font-light mb-6 leading-relaxed">{project.description}</p>
            
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white/70 font-light">Progression</span>
                <span className="text-purple-400 font-light">{project.progress}%</span>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full transition-all duration-1000"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-white/40" />
                  <span className="text-white/60 font-light">{project.team}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-white/40" />
                  <span className="text-white/60 font-light">{new Date(project.createdAt).toLocaleDateString('fr-FR')}</span>
                </div>
              </div>
              <span className="text-purple-400 font-light">{project.budget}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProjectDetails = () => {
    if (!selectedProject) return null;

    const phases = [
      { name: 'Recherche & Analyse', progress: 100, color: 'from-green-500 to-emerald-500' },
      { name: 'Architecture Système', progress: 85, color: 'from-blue-500 to-cyan-500' },
      { name: 'Développement Backend', progress: 45, color: 'from-purple-500 to-pink-500' },
      { name: 'Interface Utilisateur', progress: 20, color: 'from-orange-500 to-red-500' },
      { name: 'Tests & Déploiement', progress: 0, color: 'from-gray-500 to-gray-600' }
    ];

    return (
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => setActiveSection('projects')}
            className="flex items-center space-x-2 text-white/60 hover:text-white mb-8 transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-light">Retour au vaisseau</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Project Header */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 via-cyan-500/20 to-purple-600/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-[#000011] rounded-3xl p-10 group-hover:shadow-2xl group-hover:shadow-purple-500/10 transition-all duration-500">
                  <div className="flex items-start justify-between mb-8">
                    <div>
                      <h1 className="text-4xl font-light text-white tracking-wide mb-3">{selectedProject.name}</h1>
                      <p className="text-white/60 font-light text-lg mb-4">{selectedProject.category}</p>
                      <p className="text-white/50 font-light leading-relaxed">{selectedProject.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-light text-purple-400 mb-2">{selectedProject.progress}%</div>
                      <div className="text-white/60 text-sm font-light">Progression globale</div>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full transition-all duration-1000"
                        style={{ width: `${selectedProject.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                    <div className="text-center">
                      <Users className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                      <div className="text-white font-light text-xl">{selectedProject.team}</div>
                      <div className="text-white/50 text-sm font-light">Équipe</div>
                    </div>
                    <div className="text-center">
                      <Calendar className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                      <div className="text-white font-light text-xl">{new Date(selectedProject.createdAt).toLocaleDateString('fr-FR')}</div>
                      <div className="text-white/50 text-sm font-light">Créé le</div>
                    </div>
                    <div className="text-center">
                      <Clock className="w-6 h-6 text-green-400 mx-auto mb-2" />
                      <div className="text-white font-light text-xl">{selectedProject.deliveryDate}</div>
                      <div className="text-white/50 text-sm font-light">Livraison</div>
                    </div>
                    <div className="text-center">
                      <BarChart3 className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                      <div className="text-white font-light text-xl">{selectedProject.budget}</div>
                      <div className="text-white/50 text-sm font-light">Budget</div>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button className="relative group/btn flex-1">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500/50 to-purple-600/50 rounded-2xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 blur-sm"></div>
                      <div className="relative px-8 py-4 bg-gradient-to-r from-pink-500/20 to-purple-600/20 rounded-2xl text-white font-light hover:shadow-lg hover:shadow-pink-500/20 transition-all duration-300 flex items-center justify-center space-x-2">
                        <ExternalLink className="w-4 h-4" />
                        <span>Voir en Live</span>
                      </div>
                    </button>
                    <button 
                      onClick={() => setShowChat(true)}
                      className="relative group/btn"
                    >
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/50 to-cyan-500/50 rounded-2xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 blur-sm"></div>
                      <div className="relative px-8 py-4 bg-gradient-to-r from-purple-600/20 to-cyan-500/20 rounded-2xl text-white font-light hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 flex items-center space-x-2">
                        <MessageCircle className="w-4 h-4" />
                        <span>Chat Équipe</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Roadmap */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 via-cyan-500/20 to-purple-600/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-[#000011] rounded-3xl p-8 group-hover:shadow-2xl group-hover:shadow-purple-500/10 transition-all duration-500">
                  <h3 className="text-2xl font-light text-white mb-8">Roadmap du Projet</h3>
                  
                  <div className="space-y-8">
                    {[
                      { 
                        name: 'Recherche & Analyse', 
                        progress: 100, 
                        color: 'from-green-500 to-emerald-500', 
                        status: 'completed',
                        startDate: '15 Jan 2024',
                        endDate: '28 Jan 2024',
                        description: 'Étude de marché et analyse des besoins',
                        deliverables: ['Rapport d\'analyse', 'Spécifications techniques'],
                        teamLead: 'Alexandre M.'
                      },
                      { 
                        name: 'Architecture Système', 
                        progress: 85, 
                        color: 'from-blue-500 to-cyan-500', 
                        status: 'active',
                        startDate: '29 Jan 2024',
                        endDate: '15 Fév 2024',
                        description: 'Conception de l\'architecture IA et infrastructure',
                        deliverables: ['Schéma d\'architecture', 'Documentation technique'],
                        teamLead: 'Alexandre M.'
                      },
                      { 
                        name: 'Développement Backend', 
                        progress: 45, 
                        color: 'from-purple-500 to-pink-500', 
                        status: 'active',
                        startDate: '10 Fév 2024',
                        endDate: '30 Mar 2024',
                        description: 'Développement des algorithmes IA et API',
                        deliverables: ['API REST', 'Modèles IA', 'Base de données'],
                        teamLead: 'Sarah L.'
                      },
                      { 
                        name: 'Interface Utilisateur', 
                        progress: 20, 
                        color: 'from-orange-500 to-red-500', 
                        status: 'pending',
                        startDate: '15 Mar 2024',
                        endDate: '30 Avr 2024',
                        description: 'Création de l\'interface utilisateur moderne',
                        deliverables: ['Interface web', 'Dashboard admin', 'Mobile app'],
                        teamLead: 'Thomas K.'
                      },
                      { 
                        name: 'Tests & Déploiement', 
                        progress: 0, 
                        color: 'from-gray-500 to-gray-600', 
                        status: 'pending',
                        startDate: '20 Avr 2024',
                        endDate: '15 Juin 2024',
                        description: 'Tests complets et mise en production',
                        deliverables: ['Tests automatisés', 'Documentation', 'Déploiement'],
                        teamLead: 'Marie D.'
                      }
                    ].map((phase, index) => (
                      <div key={index} className="relative">
                        {/* Timeline connector */}
                        {index < 4 && (
                          <div className="absolute left-6 top-16 w-0.5 h-12 bg-gradient-to-b from-white/20 to-white/5"></div>
                        )}
                        
                        <div className={`relative border rounded-2xl p-6 transition-all duration-300 ${
                          phase.status === 'completed' 
                            ? 'border-green-500/30 bg-green-500/5' 
                            : phase.status === 'active'
                            ? 'border-blue-500/30 bg-blue-500/5'
                            : 'border-white/10 bg-white/2'
                        }`}>
                          
                          {/* Phase Header */}
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-4">
                              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                phase.status === 'completed' 
                                  ? 'bg-green-500/20 border-2 border-green-500/50' 
                                  : phase.status === 'active'
                                  ? 'bg-blue-500/20 border-2 border-blue-500/50'
                                  : 'bg-white/5 border-2 border-white/20'
                              }`}>
                                {phase.status === 'completed' ? (
                                  <CheckCircle className="w-6 h-6 text-green-400" />
                                ) : phase.status === 'active' ? (
                                  <Clock className="w-6 h-6 text-blue-400" />
                                ) : (
                                  <span className="text-white/40 font-light text-sm">{index + 1}</span>
                                )}
                              </div>
                              <div>
                                <h4 className="text-xl font-light text-white mb-1">{phase.name}</h4>
                                <p className="text-white/60 text-sm font-light">{phase.description}</p>
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <div className={`px-3 py-1 rounded-full text-xs font-light ${
                                phase.status === 'completed' 
                                  ? 'bg-green-500/10 border border-green-500/30 text-green-400' 
                                  : phase.status === 'active'
                                  ? 'bg-blue-500/10 border border-blue-500/30 text-blue-400'
                                  : 'bg-white/5 border border-white/20 text-white/60'
                              }`}>
                                {phase.status === 'completed' ? 'Terminé' : phase.status === 'active' ? 'En cours' : 'En attente'}
                              </div>
                            </div>
                          </div>
                          
                          {/* Progress Bar */}
                          <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-white/70 text-sm font-light">Progression</span>
                              <span className="text-white/80 text-sm font-light">{phase.progress}%</span>
                            </div>
                            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                              <div 
                                className={`h-full bg-gradient-to-r ${phase.color} rounded-full transition-all duration-1000`}
                                style={{ width: `${phase.progress}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          {/* Phase Details */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <div className="text-white/50 font-light mb-1">Période</div>
                              <div className="text-white/70 font-light">{phase.startDate} - {phase.endDate}</div>
                            </div>
                            <div>
                              <div className="text-white/50 font-light mb-1">Responsable</div>
                              <div className="text-white/70 font-light">{phase.teamLead}</div>
                            </div>
                            <div>
                              <div className="text-white/50 font-light mb-1">Livrables</div>
                              <div className="text-white/70 font-light">{phase.deliverables.length} éléments</div>
                            </div>
                          </div>
                          
                          {/* Deliverables */}
                          <div className="mt-4 pt-4 border-t border-white/10">
                            <div className="text-white/50 font-light text-xs mb-2">Livrables clés:</div>
                            <div className="flex flex-wrap gap-2">
                              {phase.deliverables.map((deliverable, idx) => (
                                <span 
                                  key={idx}
                                  className="px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-white/60 text-xs font-light"
                                >
                                  {deliverable}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Timeline Summary */}
                  <div className="mt-8 pt-6 border-t border-white/10">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-white/60 font-light">1 Terminé</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <span className="text-white/60 font-light">2 En cours</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                          <span className="text-white/60 font-light">2 En attente</span>
                        </div>
                      </div>
                      <div className="text-white/70 font-light">
                        Livraison prévue: <span className="text-purple-400">15 Juin 2024</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions rapides */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 via-cyan-500/20 to-purple-600/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-[#000011] rounded-3xl p-8 group-hover:shadow-2xl group-hover:shadow-purple-500/10 transition-all duration-500">
                  <h3 className="text-2xl font-light text-white mb-8">Actions rapides</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <button className="flex flex-col items-center space-y-3 p-6 bg-orange-500/10 rounded-2xl hover:bg-orange-500/20 hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300">
                      <Pause className="w-6 h-6 text-orange-400" />
                      <span className="text-white/80 font-light text-sm">Pause</span>
                    </button>
                    <button className="flex flex-col items-center space-y-3 p-6 bg-green-500/10 rounded-2xl hover:bg-green-500/20 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300">
                      <RotateCcw className="w-6 h-6 text-green-400" />
                      <span className="text-white/80 font-light text-sm">Reprendre</span>
                    </button>
                    <button className="flex flex-col items-center space-y-3 p-6 bg-blue-500/10 rounded-2xl hover:bg-blue-500/20 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
                      <Edit3 className="w-6 h-6 text-blue-400" />
                      <span className="text-white/80 font-light text-sm">Modifier</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Team Lead */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-green-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                <div className="relative bg-[#000011] rounded-2xl p-6 group-hover:shadow-2xl group-hover:shadow-green-500/10 transition-all duration-500">
                  <h3 className="text-xl font-light text-white mb-6">Chef d'équipe</h3>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="relative">
                      <img 
                        src={project.teamLead.avatar} 
                        alt="Team Lead" 
                        className="w-16 h-16 rounded-full border-2 border-green-500/50"
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-[#000011]"></div>
                    </div>
                    <div>
                      <div className="text-white font-light text-lg">{project.teamLead.name}</div>
                      <div className="text-white/60 text-sm">{project.teamLead.role}</div>
                      <div className="flex items-center space-x-1 mt-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-green-400 text-xs">En ligne</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowChat(true)}
                    className="w-full px-4 py-3 bg-green-500/10 rounded-xl text-green-400 hover:bg-green-500/20 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span className="font-light">Contacter</span>
                  </button>
                </div>
              </div>

              {/* Objectif à venir */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                <div className="relative bg-[#000011] rounded-2xl p-6 group-hover:shadow-2xl group-hover:shadow-purple-500/10 transition-all duration-500">
                  <h3 className="text-xl font-light text-white mb-6">Objectif à venir</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Target className="w-5 h-5 text-purple-400" />
                      <span className="text-white/80 font-light">{project.nextMilestone.name}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-cyan-400" />
                      <span className="text-white/80 font-light">{project.nextMilestone.date}</span>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
                        style={{ width: `70%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Technologies */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-cyan-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                <div className="relative bg-[#000011] rounded-2xl p-6 group-hover:shadow-2xl group-hover:shadow-cyan-500/10 transition-all duration-500">
                  <h3 className="text-xl font-light text-white mb-6">Technologies</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedProject.technologies.map((tech, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl">
                        <Code className="w-4 h-4 text-cyan-400" />
                        <span className="text-white/70 font-light text-sm">{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderWizStudio = () => (
    <div className="flex-1 p-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-16">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-purple-500/20">
            <Palette className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl font-light text-white mb-6 tracking-wide">WIZ STUDIO</h1>
          <p className="text-white/60 font-light text-xl mb-8">Studio de création visuelle avancé</p>
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-orange-500/10 rounded-full">
            <Clock className="w-4 h-4 text-orange-400" />
            <span className="text-orange-400 font-light">Bientôt disponible</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
            <div className="relative bg-[#000011] rounded-2xl p-8 group-hover:shadow-2xl group-hover:shadow-purple-500/10 transition-all duration-500">
              <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Palette className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-light text-white mb-4">Design System</h3>
              <p className="text-white/60 font-light text-sm">Créez des systèmes de design cohérents et évolutifs avec l'IA</p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-0.5 bg-cyan-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
            <div className="relative bg-[#000011] rounded-2xl p-8 group-hover:shadow-2xl group-hover:shadow-cyan-500/10 transition-all duration-500">
              <div className="w-16 h-16 bg-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Code className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-xl font-light text-white mb-4">Code Generation</h3>
              <p className="text-white/60 font-light text-sm">Générez du code optimisé directement depuis vos designs</p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-0.5 bg-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
            <div className="relative bg-[#000011] rounded-2xl p-8 group-hover:shadow-2xl group-hover:shadow-pink-500/10 transition-all duration-500">
              <div className="w-16 h-16 bg-pink-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-pink-400" />
              </div>
              <h3 className="text-xl font-light text-white mb-4">Collaboration</h3>
              <p className="text-white/60 font-light text-sm">Collaborez en temps réel avec votre équipe de design</p>
            </div>
          </div>
        </div>

        <button className="relative group/btn">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/50 to-pink-500/50 rounded-2xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 blur-sm"></div>
          <div className="relative px-12 py-4 bg-gradient-to-r from-purple-600/20 to-pink-500/20 rounded-2xl text-white font-light hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 flex items-center space-x-3">
            <Bell className="w-5 h-5" />
            <span>Me notifier du lancement</span>
          </div>
        </button>
      </div>
    </div>
  );

  const renderWizLearn = () => (
    <div className="flex-1 p-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-16">
          <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-cyan-500/20">
            <Rocket className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl font-light text-white mb-6 tracking-wide">WIZ LEARN</h1>
          <p className="text-white/60 font-light text-xl mb-8">Plateforme d'apprentissage intelligente</p>
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-orange-500/10 rounded-full">
            <Clock className="w-4 h-4 text-orange-400" />
            <span className="text-orange-400 font-light">Bientôt disponible</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-cyan-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
            <div className="relative bg-[#000011] rounded-2xl p-8 group-hover:shadow-2xl group-hover:shadow-cyan-500/10 transition-all duration-500">
              <div className="w-16 h-16 bg-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-xl font-light text-white mb-4">IA Personnalisée</h3>
              <p className="text-white/60 font-light text-sm">Apprentissage adaptatif basé sur votre profil et objectifs</p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-0.5 bg-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
            <div className="relative bg-[#000011] rounded-2xl p-8 group-hover:shadow-2xl group-hover:shadow-purple-500/10 transition-all duration-500">
              <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-light text-white mb-4">Objectifs Intelligents</h3>
              <p className="text-white/60 font-light text-sm">Définition automatique d'objectifs basés sur vos projets</p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-0.5 bg-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
            <div className="relative bg-[#000011] rounded-2xl p-8 group-hover:shadow-2xl group-hover:shadow-pink-500/10 transition-all duration-500">
              <div className="w-16 h-16 bg-pink-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-8 h-8 text-pink-400" />
              </div>
              <h3 className="text-xl font-light text-white mb-4">Gamification</h3>
              <p className="text-white/60 font-light text-sm">Système de récompenses et défis pour maintenir la motivation</p>
            </div>
          </div>
        </div>

        <button className="relative group/btn">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-600/50 to-blue-500/50 rounded-2xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 blur-sm"></div>
          <div className="relative px-12 py-4 bg-gradient-to-r from-cyan-600/20 to-blue-500/20 rounded-2xl text-white font-light hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 flex items-center space-x-3">
            <Bell className="w-5 h-5" />
            <span>Me notifier du lancement</span>
          </div>
        </button>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="flex-1 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-light text-white mb-4 tracking-wide">Paramètres</h1>
        <p className="text-white/60 font-light mb-12">Gérer votre compte et préférences</p>

        <div className="space-y-8">
          {/* Profile Settings */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
            <div className="relative bg-[#000011] rounded-2xl p-8 group-hover:shadow-2xl group-hover:shadow-purple-500/10 transition-all duration-500">
              <h3 className="text-2xl font-light text-white mb-8">Profil</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white/70 font-light mb-3">Nom complet</label>
                  <input 
                    type="text" 
                    defaultValue="Marie Dubois"
                    className="w-full bg-white/5 rounded-xl px-4 py-3 text-white font-light focus:bg-white/10 focus:outline-none transition-colors duration-300"
                  />
                </div>
                <div>
                  <label className="block text-white/70 font-light mb-3">Email</label>
                  <input 
                    type="email" 
                    defaultValue="marie@bizzhub.com"
                    className="w-full bg-white/5 rounded-xl px-4 py-3 text-white font-light focus:bg-white/10 focus:outline-none transition-colors duration-300"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Notifications Settings */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-cyan-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
            <div className="relative bg-[#000011] rounded-2xl p-8 group-hover:shadow-2xl group-hover:shadow-cyan-500/10 transition-all duration-500">
              <h3 className="text-2xl font-light text-white mb-8">Notifications</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white/70 font-light text-lg">Notifications email</div>
                    <div className="text-white/50 text-sm font-light">Recevoir les mises à jour par email</div>
                  </div>
                  <button 
                    onClick={() => setEmailNotifications(!emailNotifications)}
                    className={`w-14 h-7 rounded-full transition-all duration-300 ${
                      emailNotifications ? 'bg-purple-500/30' : 'bg-white/10'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
                      emailNotifications ? 'translate-x-8' : 'translate-x-1'
                    }`}></div>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white/70 font-light text-lg">Notifications push</div>
                    <div className="text-white/50 text-sm font-light">Notifications en temps réel</div>
                  </div>
                  <button 
                    onClick={() => setPushNotifications(!pushNotifications)}
                    className={`w-14 h-7 rounded-full transition-all duration-300 ${
                      pushNotifications ? 'bg-cyan-500/30' : 'bg-white/10'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
                      pushNotifications ? 'translate-x-8' : 'translate-x-1'
                    }`}></div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-green-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
            <div className="relative bg-[#000011] rounded-2xl p-8 group-hover:shadow-2xl group-hover:shadow-green-500/10 transition-all duration-500">
              <h3 className="text-2xl font-light text-white mb-8">Sécurité</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-white/70 font-light mb-3">Mot de passe actuel</label>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="w-full bg-white/5 rounded-xl px-4 py-3 pr-12 text-white font-light focus:bg-white/10 focus:outline-none transition-colors duration-300"
                    />
                    <button 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors duration-300"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-green-500/10 rounded-xl">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span className="text-green-400 font-light text-sm">Authentification à deux facteurs activée</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderChat = () => {
    if (!showChat) return null;

    return (
      <div className={`fixed ${chatMinimized ? 'bottom-4 right-4 w-80 h-16' : 'bottom-4 right-4 w-96 h-[600px]'} z-50 transition-all duration-300`}>
        <div className="relative group h-full">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/20 to-cyan-500/20 rounded-2xl blur-sm"></div>
          <div className="relative bg-[#000011] rounded-2xl h-full flex flex-col">
            
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img 
                    src={project.teamLead.avatar} 
                    alt="Team Lead" 
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-[#000011]"></div>
                </div>
                <div>
                  <div className="text-white text-sm font-light">{project.teamLead.name}</div>
                  <div className="flex items-center space-x-1">
                    <Lock className="w-3 h-3 text-green-400" />
                    <span className="text-green-400 text-xs">Chiffré E2E</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setChatMinimized(!chatMinimized)}
                  className="p-1 text-white/60 hover:text-white transition-colors duration-200"
                >
                  {chatMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button 
                  onClick={() => setShowChat(false)}
                  className="p-1 text-white/60 hover:text-white transition-colors duration-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!chatMinimized && (
              <>
                {/* Chat Messages */}
                <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                  {chatMessages.map((message) => (
                    <div 
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] p-3 rounded-xl ${
                        message.sender === 'user' 
                          ? 'bg-purple-500/20 text-white' 
                          : 'bg-white/5 text-white/90'
                      }`}>
                        <p className="text-sm font-light">{message.message}</p>
                        <div className="text-xs text-white/50 mt-1">{message.timestamp}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="p-4">
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-white/60 hover:text-white transition-colors duration-200">
                      <Paperclip className="w-4 h-4" />
                    </button>
                    <input 
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Tapez votre message..."
                      className="flex-1 bg-white/5 rounded-lg px-3 py-2 text-white text-sm font-light focus:bg-white/10 focus:outline-none transition-colors duration-300"
                    />
                    <button className="p-2 bg-purple-500/20 rounded-lg text-purple-400 hover:bg-purple-500/30 transition-all duration-300">
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#000011] flex font-light">
      {renderSidebar()}
      
      {activeSection === 'cockpit' && renderCockpit()}
      {activeSection === 'projects' && renderProjects()}
      {activeSection === 'project-details' && renderProjectDetails()}
      {activeSection === 'wiz-studio' && renderWizStudio()}
      {activeSection === 'wiz-learn' && renderWizLearn()}
      {activeSection === 'settings' && renderSettings()}
      
      {renderChat()}
    </div>
  );
};

export default Dashboard;