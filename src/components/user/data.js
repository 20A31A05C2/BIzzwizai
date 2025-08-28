import { Crown, Gem, Zap, Users, CheckCircle, Euro, UserPlus, Figma } from 'lucide-react';

export const project = {
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

export const userStats = {
  level: 12,
  xp: 2450,
  nextLevelXp: 3000,
  title: 'Innovateur',
  totalProjects: 1,
  totalInvestment: 250000,
  teamMembers: 8,
  completionRate: 35
};

export const badges = [
  {
    id: '1',
    name: 'Visionnaire',
    description: 'Premier projet créé',
    icon: 'Crown',
    iconSize: { width: 5, height: 5 },
    rarity: 'rare',
    unlocked: true
  },
  {
    id: '2',
    name: 'Investisseur Pro',
    description: 'Investissement de +€100K',
    icon: 'Gem',
    iconSize: { width: 5, height: 5 },
    rarity: 'epic',
    unlocked: true
  },
  {
    id: '3',
    name: 'Innovateur IA',
    description: 'Projet IA lancé',
    icon: 'Zap',
    iconSize: { width: 5, height: 5 },
    rarity: 'legendary',
    unlocked: true
  },
  {
    id: '4',
    name: 'Collaborateur',
    description: 'Équipe de 10+ membres',
    icon: 'Users',
    iconSize: { width: 5, height: 5 },
    rarity: 'common',
    unlocked: false,
    progress: 8,
    maxProgress: 10
  }
];

export const timelineEvents = [
  {
    id: '1',
    title: 'Projet créé',
    date: 'Il y a 5 jours',
    icon: 'CheckCircle',
    iconSize: { width: 4, height: 4 },
    color: '#8A2BE2'
  },
  {
    id: '2',
    title: 'Paiement effectué',
    date: 'Il y a 4 jours',
    icon: 'Euro',
    iconSize: { width: 4, height: 4 },
    color: '#00FF00'
  },
  {
    id: '3',
    title: 'Équipe constituée',
    date: 'Il y a 3 jours',
    icon: 'UserPlus',
    iconSize: { width: 4, height: 4 },
    color: '#00B7EB'
  },
  {
    id: '4',
    title: 'Phase de recherche terminée',
    date: 'Il y a 2 jours',
    icon: 'CheckCircle',
    iconSize: { width: 4, height: 4 },
    color: '#FF69B4'
  },
  {
    id: '5',
    title: 'Début du développement backend',
    date: 'Il y a 1 jour',
    icon: 'Figma',
    iconSize: { width: 4, height: 4 },
    color: '#FFA500'
  }
];

export const chatMessages = [
  {
    id: '1',
    sender: 'teamLead',
    message: 'Bonjour Marie, le projet EYVO AI avance bien. Nous avons terminé la phase de recherche. Prête pour la revue des spécifications ?',
    timestamp: '2024-01-28 09:15'
  },
  {
    id: '2',
    sender: 'user',
    message: 'Salut Alexandre ! Oui, je suis prête. Peux-tu partager le rapport d’analyse ?',
    timestamp: '2024-01-28 09:30'
  },
  {
    id: '3',
    sender: 'teamLead',
    message: 'Bien sûr, je viens de l’envoyer via le canal sécurisé. On peut planifier une réunion demain pour discuter des prochaines étapes.',
    timestamp: '2024-01-28 10:00'
  },
  {
    id: '4',
    sender: 'user',
    message: 'Parfait, demain 14h ça te va ?',
    timestamp: '2024-01-28 10:15'
  },
  {
    id: '5',
    sender: 'teamLead',
    message: 'Oui, 14h c’est bon. Je vais inviter l’équipe. À demain !',
    timestamp: '2024-01-28 10:20'
  }
];

export const notifications = [];