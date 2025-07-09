import { ClientRegistration, User, Project } from '../types';

export const mockClientRegistrations: ClientRegistration[] = [
  {
    id: '1',
    name: 'Alexandre Martin',
    email: 'alexandre.martin@greentech.fr',
    phone: '+33 6 45 78 92 13',
    company: 'GreenTech Solutions',
    position: 'Fondateur & CEO',
    projectType: 'Plateforme IoT Écologique',
    budget: 120000,
    timeline: '6-8 mois',
    description: 'Plateforme IoT pour optimiser la consommation énergétique des entreprises avec IA prédictive',
    requirements: ['Capteurs IoT', 'Dashboard temps réel', 'IA prédictive', 'API REST', 'Mobile app'],
    submittedAt: '2024-02-01T14:30:00Z',
    founderInfo: {
      age: 32,
      experience: '8 ans en développement logiciel, 3 ans en management',
      education: 'Master Ingénieur Informatique - École Centrale Paris',
      previousProjects: [
        'CTO chez StartupTech (2019-2022)',
        'Lead Developer chez TechCorp (2016-2019)',
        'Freelance développeur (2014-2016)'
      ],
      motivation: 'Passionné par les technologies vertes et l\'impact environnemental du numérique. Je souhaite créer des solutions qui aident les entreprises à réduire leur empreinte carbone tout en optimisant leurs coûts.'
    },
    projectVision: {
      problemSolved: 'Les entreprises gaspillent 30% de leur énergie par manque de visibilité et d\'optimisation en temps réel',
      targetMarket: 'PME et grandes entreprises soucieuses de leur impact environnemental (marché français puis européen)',
      uniqueValue: 'Première plateforme combinant IoT, IA prédictive et gamification pour l\'économie d\'énergie',
      competitors: ['Schneider Electric EcoStruxure', 'Siemens Building Technologies', 'Honeywell Forge'],
      marketSize: '2.5 milliards € en Europe (marché de l\'efficacité énergétique)',
      revenueModel: 'SaaS mensuel (99€-999€/mois selon taille entreprise) + vente capteurs IoT + consulting'
    },
    businessPlan: {
      executiveSummary: 'GreenTech Solutions développe une plateforme IoT révolutionnaire qui permet aux entreprises de réduire leur consommation énergétique de 25% grâce à l\'IA prédictive et à des capteurs intelligents.',
      marketAnalysis: 'Le marché européen de l\'efficacité énergétique croît de 8% par an. 78% des entreprises cherchent des solutions pour réduire leur impact environnemental.',
      financialProjections: 'Année 1: 50K€ CA, Année 2: 300K€, Année 3: 1.2M€. Break-even prévu mois 18.',
      marketingStrategy: 'Marketing digital B2B, partenariats avec consultants énergie, salons professionnels, content marketing sur LinkedIn',
      operationalPlan: 'Équipe de 3 personnes (dev, commercial, marketing). Développement MVP 6 mois, puis itérations rapides basées sur feedback clients.',
      riskAnalysis: 'Risques: concurrence des grands groupes, adoption lente du marché, complexité technique IoT. Mitigation: focus niche PME, partenariats stratégiques.'
    },
    assets: {
      logoUrl: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      brandColors: ['#2ECC71', '#27AE60', '#F39C12', '#FFFFFF'],
      brandGuidelines: 'Identité moderne et écologique, couleurs vertes dominantes, typographie clean et professionnelle',
      existingAssets: ['Logo vectoriel', 'Charte graphique', 'Mockups interface', 'Photos produits']
    },
    technicalSpecs: {
      industry: 'GreenTech / IoT',
      targetAudience: 'Directeurs techniques, Responsables RSE, PME 50-500 employés',
      competitors: ['Schneider Electric', 'Siemens', 'Honeywell'],
      features: ['Capteurs IoT', 'IA prédictive', 'Dashboard temps réel', 'Alertes intelligentes', 'Rapports automatisés'],
      platforms: ['Web Dashboard', 'Mobile iOS', 'Mobile Android', 'API REST']
    }
  },
  {
    id: '2',
    name: 'Sophie Dubois',
    email: 'sophie.dubois@edulearn.com',
    phone: '+33 6 23 45 67 89',
    company: 'EduLearn Pro',
    position: 'Fondatrice',
    projectType: 'Plateforme E-learning IA',
    budget: 85000,
    timeline: '5-7 mois',
    description: 'Plateforme d\'apprentissage personnalisée avec IA pour adapter le contenu au profil de chaque apprenant',
    requirements: ['IA personnalisation', 'Vidéos interactives', 'Gamification', 'Analytics apprentissage', 'Multi-device'],
    submittedAt: '2024-02-02T09:45:00Z',
    founderInfo: {
      age: 28,
      experience: '5 ans en EdTech, ancienne professeure',
      education: 'Master Sciences de l\'Éducation + Formation développement web',
      previousProjects: [
        'Professeure lycée (2018-2021)',
        'Consultante pédagogique freelance (2021-2023)',
        'Co-fondatrice startup EdTech (échec en 2023)'
      ],
      motivation: 'Révolutionner l\'apprentissage en ligne en rendant l\'éducation vraiment personnalisée et engageante pour chaque apprenant.'
    },
    projectVision: {
      problemSolved: 'Les plateformes e-learning actuelles proposent du contenu générique qui ne s\'adapte pas au rythme et style d\'apprentissage de chaque utilisateur',
      targetMarket: 'Entreprises pour formation employés + particuliers pour développement personnel',
      uniqueValue: 'IA qui analyse le comportement d\'apprentissage et adapte automatiquement le contenu, la difficulté et le format',
      competitors: ['Coursera', 'Udemy', 'LinkedIn Learning', 'OpenClassrooms'],
      marketSize: '350 milliards $ mondial (e-learning), 8 milliards € en France',
      revenueModel: 'Freemium (gratuit limité) + Premium 29€/mois particuliers + Enterprise 99€/utilisateur/mois'
    },
    businessPlan: {
      executiveSummary: 'EduLearn Pro révolutionne l\'e-learning avec une IA qui personnalise l\'apprentissage en temps réel selon le profil de chaque utilisateur.',
      marketAnalysis: 'Marché e-learning en croissance de 15% par an. 73% des entreprises investissent dans la formation digitale.',
      financialProjections: 'Année 1: 80K€, Année 2: 450K€, Année 3: 1.8M€. Objectif 10K utilisateurs payants en 24 mois.',
      marketingStrategy: 'Content marketing éducatif, partenariats écoles/entreprises, influenceurs éducation, SEO/SEA ciblé',
      operationalPlan: 'MVP 6 mois, beta test avec 100 utilisateurs, puis scaling progressif. Équipe tech + pédagogique.',
      riskAnalysis: 'Concurrence forte des géants, complexité IA, acquisition utilisateurs coûteuse. Focus niche spécialisée au début.'
    },
    assets: {
      logoUrl: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      brandColors: ['#3498DB', '#9B59B6', '#E74C3C', '#F8F9FA'],
      brandGuidelines: 'Design moderne et accessible, couleurs vives mais professionnelles, iconographie éducative',
      existingAssets: ['Logo', 'Mockups interface', 'Vidéos démo', 'Contenu pédagogique pilote']
    },
    technicalSpecs: {
      industry: 'EdTech / E-learning',
      targetAudience: 'Professionnels en formation continue, étudiants, entreprises RH',
      competitors: ['Coursera', 'Udemy', 'LinkedIn Learning'],
      features: ['IA personnalisation', 'Vidéos interactives', 'Quizz adaptatifs', 'Gamification', 'Analytics'],
      platforms: ['Web', 'Mobile iOS', 'Mobile Android', 'Tablet']
    }
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'SIMO',
    email: 'simo@bizzwiz.ai',
    role: 'admin',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    position: 'Administrateur'
  },
  {
    id: '2',
    name: 'SHANKAR',
    email: 'shankar@bizzwiz.ai',
    role: 'chef',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    position: 'Chef d\'équipe'
  },
  {
    id: '3',
    name: 'VINEL',
    email: 'vinel@bizzwiz.ai',
    role: 'member',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    position: 'Développeur'
  }
];

export const eyvoProject: Project = {
  id: 'eyvo-1',
  name: 'EYVO AI',
  description: 'Plateforme d\'intelligence artificielle pour l\'analyse prédictive et l\'automatisation des processus métier',
  status: 'in-progress',
  priority: 'high',
  progress: 45,
  budget: 85000,
  startDate: '2024-01-15',
  deadline: '2024-06-30',
  clientName: 'TechCorp Solutions',
  clientEmail: 'contact@techcorp.com',
  chefId: '2', // SHANKAR
  teamMembers: ['3'], // VINEL
  adminId: '1', // SIMO
  phases: [
    {
      id: 'phase-1',
      name: 'Analyse & Conception',
      status: 'completed',
      progress: 100,
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      tasks: ['Analyse des besoins', 'Architecture système', 'Maquettes UI/UX']
    },
    {
      id: 'phase-2',
      name: 'Développement',
      status: 'in-progress',
      progress: 60,
      startDate: '2024-02-16',
      endDate: '2024-05-15',
      tasks: ['API Backend', 'Interface utilisateur', 'Intégration IA']
    },
    {
      id: 'phase-3',
      name: 'Tests & Déploiement',
      status: 'pending',
      progress: 0,
      startDate: '2024-05-16',
      endDate: '2024-06-30',
      tasks: ['Tests unitaires', 'Tests d\'intégration', 'Déploiement production']
    }
  ],
  technologies: ['React', 'Node.js', 'Python', 'TensorFlow', 'PostgreSQL', 'Docker'],
  deliverables: [
    { name: 'Cahier des charges', status: 'completed', dueDate: '2024-02-01' },
    { name: 'Maquettes Figma', status: 'completed', dueDate: '2024-02-10' },
    { name: 'API Documentation', status: 'in-progress', dueDate: '2024-03-15' },
    { name: 'Interface utilisateur', status: 'in-progress', dueDate: '2024-04-20' },
    { name: 'Modèle IA', status: 'pending', dueDate: '2024-05-15' }
  ],
  currentTasks: [
    {
      id: 'task-1',
      title: 'Développement API Authentication',
      assignedTo: '3', // VINEL
      status: 'in-progress',
      priority: 'high',
      dueDate: '2024-02-10',
      description: 'Implémentation du système d\'authentification JWT'
    },
    {
      id: 'task-2',
      title: 'Interface Dashboard Analytics',
      assignedTo: '3', // VINEL
      status: 'todo',
      priority: 'medium',
      dueDate: '2024-02-20',
      description: 'Création des composants pour le dashboard d\'analytics'
    },
    {
      id: 'task-3',
      title: 'Intégration modèle ML',
      assignedTo: '2', // SHANKAR (supervision)
      status: 'todo',
      priority: 'high',
      dueDate: '2024-03-01',
      description: 'Intégration du modèle de machine learning dans l\'API'
    }
  ],
  clientDashboardUrl: 'https://superlative-genie-d5d8a4.netlify.app/',
  liveProjectUrl: 'https://eyvo-ai-demo.netlify.app',
  meetings: [
    { date: '2024-01-15', type: 'Kickoff', participants: ['SIMO', 'SHANKAR', 'Client'] },
    { date: '2024-02-01', type: 'Review Phase 1', participants: ['SHANKAR', 'VINEL', 'Client'] },
    { date: '2024-02-15', type: 'Sprint Planning', participants: ['SHANKAR', 'VINEL'] }
  ]
};