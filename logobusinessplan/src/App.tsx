import React, { useState, useEffect, useRef } from 'react';
import { Download, Palette, Clock, CheckCircle, XCircle, Link, DollarSign, User, FileText, Image, Calendar, Home, Settings, Plus, Trash2, Tag, Users, Send, Bot, CreditCard, Shield, Star, ArrowRight, Sparkles, Zap, Play, Eye, MessageCircle, Loader, Check } from 'lucide-react';

interface Project {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  businessName: string;
  businessType: string;
  description: string;
  businessPlan: string;
  logo: string;
  status: 'pending' | 'approved' | 'rejected';
  figmaLink?: string;
  roadmap?: RoadmapSection[];
  price?: number;
  createdAt: Date;
}

interface RoadmapSection {
  id: string;
  title: string;
  description: string;
  status: 'not-started' | 'in-progress' | 'completed';
  progress: number;
  startDate: string;
  endDate: string;
  responsible: string;
  deliverables: string[];
}

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  logoSuggestion?: string;
}

const teamMembers = [
  'Alexandre M.',
  'Sophie L.',
  'Thomas R.',
  'Marie D.',
  'Lucas B.',
  'Emma C.',
  'Nicolas P.',
  'Camille V.'
];

function App() {
  const [currentView, setCurrentView] = useState<'client' | 'chat' | 'waiting' | 'proposal' | 'payment' | 'confirmation' | 'admin'>('client');
  const [userRole, setUserRole] = useState<'client' | 'admin'>('client');
  const [generatedLogo, setGeneratedLogo] = useState<string>('');
  const [logoPrompt, setLogoPrompt] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Bonjour ! Je suis votre assistant IA pour créer le logo parfait. Pouvez-vous me décrire votre vision pour le logo de votre entreprise ?',
      timestamp: new Date()
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedLogo, setSelectedLogo] = useState<string>('');
  const [paymentProgress, setPaymentProgress] = useState(0);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      clientName: 'Jean Dupont',
      email: 'jean.dupont@email.com',
      phone: '0123456789',
      businessName: 'TechStart Solutions',
      businessType: 'SaaS',
      description: 'Plateforme de gestion de projets pour PME',
      businessPlan: 'Plan d\'affaires détaillé pour TechStart Solutions...',
      logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=200&fit=crop',
      status: 'pending',
      createdAt: new Date('2024-01-15')
    },
    {
      id: '2',
      clientName: 'Marie Martin',
      email: 'marie.martin@email.com',
      phone: '0987654321',
      businessName: 'EcoGreen Store',
      businessType: 'E-commerce',
      description: 'Boutique en ligne de produits écologiques',
      businessPlan: 'Plan d\'affaires pour EcoGreen Store...',
      logo: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=200&h=200&fit=crop',
      status: 'approved',
      figmaLink: 'https://figma.com/design/example1',
      price: 5000,
      roadmap: [
        {
          id: '1',
          title: 'Recherche & Analyse',
          description: 'Étude de marché et analyse des besoins',
          status: 'completed',
          progress: 100,
          startDate: '2024-01-15',
          endDate: '2024-01-28',
          responsible: 'Alexandre M.',
          deliverables: ['Rapport d\'analyse', 'Spécifications techniques']
        },
        {
          id: '2',
          title: 'Design & Prototypage',
          description: 'Création des maquettes et prototypes',
          status: 'in-progress',
          progress: 65,
          startDate: '2024-01-29',
          endDate: '2024-02-15',
          responsible: 'Sophie L.',
          deliverables: ['Maquettes Figma', 'Prototype interactif', 'Guide de style']
        }
      ],
      createdAt: new Date('2024-01-10')
    }
  ]);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const sampleBusinessPlan = `
BUSINESS PLAN - TECHSTART SOLUTIONS

1. RÉSUMÉ EXÉCUTIF
TechStart Solutions est une plateforme SaaS innovante qui simplifie la gestion de projets pour les PME.

2. ANALYSE DU MARCHÉ
- Marché cible : PME de 10-100 employés
- Taille du marché : 2.3 milliards d'euros
- Croissance attendue : 15% par an

3. PRODUIT/SERVICE
- Plateforme de gestion de projets intuitive
- Collaboration en temps réel
- Tableaux de bord personnalisables
- Intégrations avec outils populaires

4. STRATÉGIE MARKETING
- Marketing digital ciblé
- Partenariats avec consultants
- Freemium model

5. PRÉVISIONS FINANCIÈRES
- Année 1 : 150K€ de CA
- Année 2 : 450K€ de CA
- Année 3 : 1.2M€ de CA

6. ÉQUIPE
- CEO : Expert en SaaS
- CTO : Développeur senior
- CMO : Marketing digital
  `;

  const defaultRoadmap: RoadmapSection[] = [
    {
      id: '1',
      title: 'Recherche & Analyse',
      description: 'Étude de marché et analyse des besoins',
      status: 'not-started',
      progress: 0,
      startDate: '',
      endDate: '',
      responsible: '',
      deliverables: []
    },
    {
      id: '2',
      title: 'Design & Prototypage',
      description: 'Création des maquettes et prototypes',
      status: 'not-started',
      progress: 0,
      startDate: '',
      endDate: '',
      responsible: '',
      deliverables: []
    },
    {
      id: '3',
      title: 'Développement Frontend',
      description: 'Développement de l\'interface utilisateur',
      status: 'not-started',
      progress: 0,
      startDate: '',
      endDate: '',
      responsible: '',
      deliverables: []
    },
    {
      id: '4',
      title: 'Développement Backend',
      description: 'Développement de l\'API et base de données',
      status: 'not-started',
      progress: 0,
      startDate: '',
      endDate: '',
      responsible: '',
      deliverables: []
    },
    {
      id: '5',
      title: 'Tests & Déploiement',
      description: 'Tests complets et mise en production',
      status: 'not-started',
      progress: 0,
      startDate: '',
      endDate: '',
      responsible: '',
      deliverables: []
    }
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const downloadBusinessPlan = () => {
    const element = document.createElement('a');
    const file = new Blob([sampleBusinessPlan], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'business-plan.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const sendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: currentMessage,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsTyping(true);

    // Simulation de réponse IA
    setTimeout(() => {
      const aiResponses = [
        {
          content: "Excellente idée ! Voici 3 propositions de logo basées sur votre description :",
          logoSuggestion: generateLogoUrl('modern-tech')
        },
        {
          content: "J'aime cette direction ! Que pensez-vous de ces variations ?",
          logoSuggestion: generateLogoUrl('creative-design')
        },
        {
          content: "Parfait ! Voici une version finale qui capture parfaitement votre vision :",
          logoSuggestion: generateLogoUrl('final-logo')
        }
      ];

      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: randomResponse.content,
        timestamp: new Date(),
        logoSuggestion: randomResponse.logoSuggestion
      };

      setChatMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const generateLogoUrl = (type: string) => {
    const colors = ['3B82F6', '10B981', 'F59E0B', 'EF4444', '8B5CF6', '06B6D4'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    return `https://via.placeholder.com/200x200/${randomColor}/FFFFFF?text=${encodeURIComponent(type.slice(0, 2).toUpperCase())}`;
  };

  const selectLogo = (logoUrl: string) => {
    setSelectedLogo(logoUrl);
  };

  const validateLogo = () => {
    setCurrentView('waiting');
  };

  const proceedToProposal = () => {
    setCurrentView('proposal');
  };

  const proceedToPayment = () => {
    setCurrentView('payment');
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const processPayment = async () => {
    setIsProcessingPayment(true);
    setPaymentProgress(0);

    // Animation de progression du paiement
    const interval = setInterval(() => {
      setPaymentProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setCurrentView('confirmation');
            setIsProcessingPayment(false);
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const approveProject = (projectId: string, figmaLink: string, price: number, roadmap: RoadmapSection[]) => {
    setProjects(prev => prev.map(p => 
      p.id === projectId 
        ? { ...p, status: 'approved', figmaLink, price, roadmap }
        : p
    ));
    setSelectedProject(null);
  };

  const rejectProject = (projectId: string) => {
    setProjects(prev => prev.map(p => 
      p.id === projectId ? { ...p, status: 'rejected' } : p
    ));
    setSelectedProject(null);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'not-started': return '⏳';
      case 'in-progress': return '🚧';
      case 'completed': return '✅';
      default: return '⏳';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'not-started': return 'from-gray-500 to-gray-600';
      case 'in-progress': return 'from-[#00eaff] to-[#8f00ff]';
      case 'completed': return 'from-green-500 to-green-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Non définie';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  // Arrière-plan animé avec orbes flottants
  const AnimatedBackground = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-[#00eaff]/20 to-[#8f00ff]/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-[#ff00b8]/20 to-[#00eaff]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#8f00ff]/10 to-[#ff00b8]/10 rounded-full blur-3xl animate-pulse delay-500"></div>
    </div>
  );

  const ClientView = () => (
    <div className="min-h-screen bg-[#0e0e14] relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header Premium */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#00eaff]/20 to-[#8f00ff]/20 backdrop-blur-sm border border-[#00eaff]/30 rounded-full px-6 py-3 mb-6">
              <Sparkles className="w-5 h-5 text-[#00eaff] animate-pulse" />
              <span className="text-[#00eaff] font-medium">Plateforme Premium</span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
                ))}
              </div>
            </div>
            
            <h1 className="text-5xl font-bold bg-gradient-to-r from-[#00eaff] via-[#8f00ff] to-[#ff00b8] bg-clip-text text-transparent mb-4 animate-gradient">
              Votre Business Plan
            </h1>
            <p className="text-xl text-[#9ca3af] max-w-2xl mx-auto leading-relaxed">
              Découvrez votre plan d'affaires personnalisé et commencez votre parcours entrepreneurial
            </p>
          </div>
          
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-800/50 p-8 mb-8 hover:shadow-cyan-500/10 transition-all duration-500 group">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Business Plan Section */}
              <div className="space-y-6">
                <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50 hover:border-[#00eaff]/30 transition-all duration-300 group">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-gradient-to-r from-[#00eaff]/20 to-[#8f00ff]/20 rounded-xl border border-[#00eaff]/30">
                      <FileText className="w-6 h-6 text-[#00eaff]" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-[#e5e7eb] group-hover:text-[#00eaff] transition-colors">
                        Business Plan Complet
                      </h2>
                      <p className="text-sm text-[#9ca3af]">Plan d'affaires détaillé et personnalisé</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-900/50 rounded-xl p-4 mb-6 max-h-64 overflow-y-auto border border-gray-700/50 hover:border-[#00eaff]/20 transition-all duration-300">
                    <pre className="text-sm text-[#9ca3af] whitespace-pre-wrap leading-relaxed">{sampleBusinessPlan}</pre>
                  </div>
                  
                  <button
                    onClick={downloadBusinessPlan}
                    className="w-full bg-gradient-to-r from-[#00eaff] to-[#8f00ff] text-white py-4 rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 flex items-center justify-center gap-3 group hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Download className="w-5 h-5 group-hover:animate-bounce" />
                    <span className="font-medium">Télécharger le Business Plan</span>
                  </button>
                </div>
              </div>

              {/* Next Step Section */}
              <div className="space-y-6">
                <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50 hover:border-[#ff00b8]/30 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-gradient-to-r from-[#ff00b8]/20 to-[#8f00ff]/20 rounded-xl border border-[#ff00b8]/30">
                      <ArrowRight className="w-6 h-6 text-[#ff00b8]" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-[#e5e7eb]">
                        Prochaine Étape
                      </h2>
                      <p className="text-sm text-[#9ca3af]">Création de votre identité visuelle</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3 p-3 bg-gray-900/30 rounded-lg border border-gray-700/30">
                      <div className="w-8 h-8 bg-gradient-to-r from-[#00eaff] to-[#8f00ff] rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                      <span className="text-[#e5e7eb]">Chat avec IA pour créer votre logo</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-900/30 rounded-lg border border-gray-700/30">
                      <div className="w-8 h-8 bg-gradient-to-r from-[#8f00ff] to-[#ff00b8] rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                      <span className="text-[#e5e7eb]">Validation de votre identité visuelle</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-900/30 rounded-lg border border-gray-700/30">
                      <div className="w-8 h-8 bg-gradient-to-r from-[#ff00b8] to-[#00eaff] rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                      <span className="text-[#e5e7eb]">Proposition commerciale personnalisée</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setCurrentView('chat')}
                    className="w-full bg-gradient-to-r from-[#ff00b8] to-[#8f00ff] text-white py-4 rounded-xl hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-300 flex items-center justify-center gap-3 group hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <MessageCircle className="w-5 h-5 group-hover:animate-pulse" />
                    <span className="font-medium">Commencer le Chat IA</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Admin Access */}
                <div className="text-center">
                  <button
                    onClick={() => setUserRole('admin')}
                    className="px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-xl hover:shadow-lg hover:shadow-gray-500/25 transition-all duration-300 border border-gray-600"
                  >
                    <Settings className="w-4 h-4 inline mr-2" />
                    Mode Admin
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ChatView = () => (
    <div className="min-h-screen bg-[#0e0e14] relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#8f00ff]/20 to-[#ff00b8]/20 backdrop-blur-sm border border-[#8f00ff]/30 rounded-full px-6 py-3 mb-6">
              <Bot className="w-5 h-5 text-[#8f00ff] animate-pulse" />
              <span className="text-[#8f00ff] font-medium">Assistant IA Logo</span>
              <Sparkles className="w-4 h-4 text-[#ff00b8] animate-pulse" />
            </div>
            
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#8f00ff] via-[#ff00b8] to-[#00eaff] bg-clip-text text-transparent mb-4">
              Créons Votre Logo Parfait
            </h1>
            <p className="text-lg text-[#9ca3af] max-w-2xl mx-auto">
              Notre IA va vous aider à créer un logo unique qui représente parfaitement votre marque
            </p>
          </div>

          {/* Chat Container */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-800/50 overflow-hidden">
            {/* Chat Messages */}
            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-[#00eaff] to-[#8f00ff] text-white'
                      : 'bg-gray-800/50 text-[#e5e7eb] border border-gray-700/50'
                  }`}>
                    {message.type === 'ai' && (
                      <div className="flex items-center gap-2 mb-2">
                        <Bot className="w-4 h-4 text-[#8f00ff]" />
                        <span className="text-xs text-[#9ca3af]">Assistant IA</span>
                      </div>
                    )}
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    
                    {message.logoSuggestion && (
                      <div className="mt-3 p-3 bg-gray-900/50 rounded-xl border border-gray-700/30">
                        <img 
                          src={message.logoSuggestion} 
                          alt="Logo suggestion" 
                          className="w-24 h-24 mx-auto mb-3 rounded-lg"
                        />
                        <button
                          onClick={() => selectLogo(message.logoSuggestion!)}
                          className={`w-full py-2 px-3 rounded-lg text-xs font-medium transition-all duration-300 ${
                            selectedLogo === message.logoSuggestion
                              ? 'bg-gradient-to-r from-[#00eaff] to-[#8f00ff] text-white'
                              : 'bg-gray-700/50 text-[#9ca3af] hover:bg-gray-600/50'
                          }`}
                        >
                          {selectedLogo === message.logoSuggestion ? (
                            <span className="flex items-center justify-center gap-1">
                              <Check className="w-3 h-3" />
                              Sélectionné
                            </span>
                          ) : (
                            'Sélectionner ce logo'
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start animate-fade-in">
                  <div className="bg-gray-800/50 text-[#e5e7eb] border border-gray-700/50 px-4 py-3 rounded-2xl">
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4 text-[#8f00ff]" />
                      <span className="text-xs text-[#9ca3af]">Assistant IA écrit...</span>
                    </div>
                    <div className="flex gap-1 mt-2">
                      <div className="w-2 h-2 bg-[#8f00ff] rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-[#8f00ff] rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-[#8f00ff] rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input */}
            <div className="border-t border-gray-800/50 p-6">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Décrivez votre vision du logo..."
                  className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-[#8f00ff] focus:border-transparent text-[#e5e7eb] placeholder-[#9ca3af] transition-all duration-300"
                />
                <button
                  onClick={sendMessage}
                  disabled={!currentMessage.trim() || isTyping}
                  className="px-6 py-3 bg-gradient-to-r from-[#8f00ff] to-[#ff00b8] text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Validation Button */}
            {selectedLogo && (
              <div className="border-t border-gray-800/50 p-6 bg-gray-800/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={selectedLogo} alt="Selected logo" className="w-12 h-12 rounded-lg" />
                    <div>
                      <p className="text-[#e5e7eb] font-medium">Logo sélectionné</p>
                      <p className="text-sm text-[#9ca3af]">Prêt pour validation</p>
                    </div>
                  </div>
                  <button
                    onClick={validateLogo}
                    className="px-8 py-3 bg-gradient-to-r from-[#00eaff] to-[#8f00ff] text-white rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 flex items-center gap-2 hover:scale-105 active:scale-95"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Valider ce Logo
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const WaitingView = () => (
    <div className="min-h-screen bg-[#0e0e14] relative overflow-hidden flex items-center justify-center">
      <AnimatedBackground />
      
      <div className="text-center bg-gray-900/50 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-800/50 p-12 max-w-md mx-4 relative z-10 animate-fade-in">
        <div className="mb-8">
          <div className="relative mb-6">
            <Clock className="w-20 h-20 text-[#00eaff] mx-auto animate-pulse" />
            <div className="absolute inset-0 w-20 h-20 mx-auto border-4 border-[#00eaff]/20 rounded-full animate-ping"></div>
          </div>
          
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#00eaff] to-[#8f00ff] bg-clip-text text-transparent mb-4">
            Projet en Cours de Validation
          </h1>
          <p className="text-[#9ca3af] leading-relaxed mb-6">
            Un conseiller va vous appeler prochainement pour valider la viabilité de votre projet et discuter des prochaines étapes.
          </p>
        </div>
        
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50 mb-6">
          <h3 className="font-semibold text-[#e5e7eb] mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#00eaff]" />
            Timeline des prochaines étapes
          </h3>
          <div className="space-y-3 text-left">
            {[
              { step: 1, text: 'Appel de validation dans les 24h', icon: '📞' },
              { step: 2, text: 'Présentation de la maquette', icon: '🎨' },
              { step: 3, text: 'Définition du planning', icon: '📅' },
              { step: 4, text: 'Proposition commerciale', icon: '💼' }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-900/30 rounded-lg border border-gray-700/30">
                <div className="w-8 h-8 bg-gradient-to-r from-[#00eaff] to-[#8f00ff] rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {item.step}
                </div>
                <span className="text-sm text-[#9ca3af]">{item.icon} {item.text}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-3">
          <button
            onClick={proceedToProposal}
            className="w-full px-6 py-3 bg-gradient-to-r from-[#00eaff] to-[#8f00ff] text-white rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
          >
            <ArrowRight className="w-5 h-5" />
            Voir la Proposition (Simulation)
          </button>
          
          <button
            onClick={() => setCurrentView('client')}
            className="w-full text-[#00eaff] hover:text-[#8f00ff] transition-colors text-sm"
          >
            Retour au tableau de bord
          </button>
        </div>
      </div>
    </div>
  );

  const ProposalView = () => (
    <div className="min-h-screen bg-[#0e0e14] relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#00eaff]/20 to-[#8f00ff]/20 backdrop-blur-sm border border-[#00eaff]/30 rounded-full px-6 py-3 mb-6">
              <FileText className="w-5 h-5 text-[#00eaff] animate-pulse" />
              <span className="text-[#00eaff] font-medium">Proposition Commerciale</span>
              <Star className="w-4 h-4 text-yellow-400 fill-current animate-pulse" />
            </div>
            
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00eaff] via-[#8f00ff] to-[#ff00b8] bg-clip-text text-transparent mb-4">
              Votre Projet TechStart Solutions
            </h1>
            <p className="text-lg text-[#9ca3af] max-w-2xl mx-auto">
              Découvrez notre proposition personnalisée pour donner vie à votre vision
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Maquette Preview */}
            <div className="space-y-6">
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50 hover:border-[#00eaff]/30 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-[#00eaff]/20 to-[#8f00ff]/20 rounded-xl border border-[#00eaff]/30">
                    <Eye className="w-6 h-6 text-[#00eaff]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-[#e5e7eb]">Maquette Figma</h2>
                    <p className="text-sm text-[#9ca3af]">Design de votre plateforme</p>
                  </div>
                </div>
                
                <div className="relative group">
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700/50 aspect-video flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00eaff]/10 to-[#8f00ff]/10"></div>
                    <div className="relative z-10 text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-[#00eaff] to-[#8f00ff] rounded-2xl flex items-center justify-center mb-4 mx-auto">
                        <Image className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-[#e5e7eb] mb-2">TechStart Solutions</h3>
                      <p className="text-sm text-[#9ca3af] mb-4">Plateforme de gestion de projets</p>
                      <div className="flex items-center justify-center gap-2">
                        <Play className="w-4 h-4 text-[#00eaff]" />
                        <span className="text-sm text-[#00eaff]">Voir le prototype</span>
                      </div>
                    </div>
                    
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00eaff]/0 via-[#00eaff]/5 to-[#00eaff]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  
                  <button className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                      <Play className="w-8 h-8 text-white" />
                    </div>
                  </button>
                </div>
                
                <div className="mt-4 flex items-center gap-2 text-sm text-[#9ca3af]">
                  <Link className="w-4 h-4" />
                  <span>figma.com/design/techstart-solutions</span>
                </div>
              </div>

              {/* Planning */}
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-[#8f00ff]/20 to-[#ff00b8]/20 rounded-xl border border-[#8f00ff]/30">
                    <Calendar className="w-6 h-6 text-[#8f00ff]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-[#e5e7eb]">Planning de Réalisation</h2>
                    <p className="text-sm text-[#9ca3af]">12 semaines de développement</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {[
                    { phase: 'Recherche & Analyse', duration: '2 semaines', progress: 100, color: 'from-green-500 to-green-600' },
                    { phase: 'Design & Prototypage', duration: '3 semaines', progress: 75, color: 'from-[#00eaff] to-[#8f00ff]' },
                    { phase: 'Développement Frontend', duration: '4 semaines', progress: 30, color: 'from-[#8f00ff] to-[#ff00b8]' },
                    { phase: 'Développement Backend', duration: '2 semaines', progress: 0, color: 'from-gray-500 to-gray-600' },
                    { phase: 'Tests & Déploiement', duration: '1 semaine', progress: 0, color: 'from-gray-500 to-gray-600' }
                  ].map((item, index) => (
                    <div key={index} className="p-4 bg-gray-800/30 rounded-xl border border-gray-700/30">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-[#e5e7eb]">{item.phase}</span>
                        <span className="text-sm text-[#9ca3af]">{item.duration}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full bg-gradient-to-r ${item.color} transition-all duration-1000`}
                          style={{ width: `${item.progress}%` }}
                        ></div>
                      </div>
                      <div className="text-right text-xs text-[#9ca3af] mt-1">{item.progress}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Devis et Validation */}
            <div className="space-y-6">
              {/* Devis */}
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-[#ff00b8]/20 to-[#00eaff]/20 rounded-xl border border-[#ff00b8]/30">
                    <DollarSign className="w-6 h-6 text-[#ff00b8]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-[#e5e7eb]">Devis Détaillé</h2>
                    <p className="text-sm text-[#9ca3af]">Tarification transparente</p>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  {[
                    { service: 'Design UI/UX', price: '1 500€', description: 'Maquettes et prototypes' },
                    { service: 'Développement Frontend', price: '2 000€', description: 'Interface utilisateur React' },
                    { service: 'Développement Backend', price: '1 200€', description: 'API et base de données' },
                    { service: 'Tests & Déploiement', price: '300€', description: 'Tests complets et mise en ligne' }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-4 bg-gray-800/30 rounded-xl border border-gray-700/30">
                      <div>
                        <span className="font-medium text-[#e5e7eb]">{item.service}</span>
                        <p className="text-sm text-[#9ca3af]">{item.description}</p>
                      </div>
                      <span className="text-lg font-bold text-[#00eaff]">{item.price}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-gray-700/50 pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-bold text-[#e5e7eb]">Total</span>
                    <span className="text-3xl font-bold bg-gradient-to-r from-[#00eaff] to-[#8f00ff] bg-clip-text text-transparent">5 000€</span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 bg-gray-800/30 rounded-lg border border-gray-700/30">
                      <div className="text-lg font-bold text-[#00eaff]">30%</div>
                      <div className="text-xs text-[#9ca3af]">Acompte</div>
                    </div>
                    <div className="p-3 bg-gray-800/30 rounded-lg border border-gray-700/30">
                      <div className="text-lg font-bold text-[#8f00ff]">50%</div>
                      <div className="text-xs text-[#9ca3af]">Mi-parcours</div>
                    </div>
                    <div className="p-3 bg-gray-800/30 rounded-lg border border-gray-700/30">
                      <div className="text-lg font-bold text-[#ff00b8]">20%</div>
                      <div className="text-xs text-[#9ca3af]">Livraison</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Garanties */}
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50">
                <h3 className="font-semibold text-[#e5e7eb] mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#00eaff]" />
                  Nos Garanties
                </h3>
                <div className="space-y-3">
                  {[
                    '✅ Livraison dans les délais',
                    '✅ Support technique 6 mois',
                    '✅ Révisions illimitées',
                    '✅ Code source fourni',
                    '✅ Formation incluse'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 text-sm text-[#9ca3af]">
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Validation */}
              <div className="bg-gradient-to-r from-[#00eaff]/10 to-[#8f00ff]/10 backdrop-blur-sm rounded-2xl p-6 border border-[#00eaff]/30">
                <h3 className="font-semibold text-[#e5e7eb] mb-4 text-center">
                  Prêt à Démarrer Votre Projet ?
                </h3>
                <button
                  onClick={proceedToPayment}
                  className="w-full bg-gradient-to-r from-[#00eaff] to-[#8f00ff] text-white py-4 rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 flex items-center justify-center gap-3 text-lg font-semibold hover:scale-105 active:scale-95"
                >
                  <CreditCard className="w-6 h-6" />
                  Valider et Payer
                  <ArrowRight className="w-5 h-5" />
                </button>
                
                <p className="text-center text-xs text-[#9ca3af] mt-3">
                  Paiement sécurisé • SSL • Satisfaction garantie
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const PaymentView = () => (
    <div className="min-h-screen bg-[#0e0e14] relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#00eaff]/20 to-[#8f00ff]/20 backdrop-blur-sm border border-[#00eaff]/30 rounded-full px-6 py-3 mb-6">
              <CreditCard className="w-5 h-5 text-[#00eaff] animate-pulse" />
              <span className="text-[#00eaff] font-medium">Paiement Sécurisé</span>
              <Shield className="w-4 h-4 text-green-400 animate-pulse" />
            </div>
            
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00eaff] via-[#8f00ff] to-[#ff00b8] bg-clip-text text-transparent mb-4">
              Finaliser Votre Commande
            </h1>
            <p className="text-lg text-[#9ca3af] max-w-2xl mx-auto">
              Paiement sécurisé SSL • Acompte de 30% pour démarrer votre projet
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Récapitulatif */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50">
              <h2 className="text-xl font-semibold text-[#e5e7eb] mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#00eaff]" />
                Récapitulatif de Commande
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="p-4 bg-gray-800/30 rounded-xl border border-gray-700/30">
                  <h3 className="font-medium text-[#e5e7eb] mb-2">TechStart Solutions</h3>
                  <p className="text-sm text-[#9ca3af] mb-3">Plateforme de gestion de projets pour PME</p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#9ca3af]">Montant total</span>
                      <span className="text-[#e5e7eb]">5 000€</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#9ca3af]">Acompte (30%)</span>
                      <span className="text-[#00eaff] font-semibold">1 500€</span>
                    </div>
                    <div className="flex justify-between text-xs text-[#9ca3af]">
                      <span>Reste à payer</span>
                      <span>3 500€ (en 2 fois)</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-xl border border-green-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-green-400" />
                    <span className="text-sm font-medium text-green-400">Garanties Incluses</span>
                  </div>
                  <ul className="text-xs text-green-300 space-y-1">
                    <li>• Support technique 6 mois</li>
                    <li>• Révisions illimitées</li>
                    <li>• Livraison garantie</li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-gray-700/50 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-[#e5e7eb]">À payer aujourd'hui</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-[#00eaff] to-[#8f00ff] bg-clip-text text-transparent">1 500€</span>
                </div>
              </div>
            </div>

            {/* Formulaire de Paiement */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50">
              <h2 className="text-xl font-semibold text-[#e5e7eb] mb-6 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#ff00b8]" />
                Informations de Paiement
              </h2>
              
              {!isProcessingPayment ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#e5e7eb] mb-2">
                      Numéro de carte
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-[#00eaff] focus:border-transparent text-[#e5e7eb] placeholder-[#9ca3af] transition-all duration-300"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#e5e7eb] mb-2">
                        Date d'expiration
                      </label>
                      <input
                        type="text"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                        placeholder="MM/AA"
                        maxLength={5}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-[#00eaff] focus:border-transparent text-[#e5e7eb] placeholder-[#9ca3af] transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#e5e7eb] mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                        placeholder="123"
                        maxLength={3}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-[#00eaff] focus:border-transparent text-[#e5e7eb] placeholder-[#9ca3af] transition-all duration-300"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#e5e7eb] mb-2">
                      Nom sur la carte
                    </label>
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="Jean Dupont"
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-[#00eaff] focus:border-transparent text-[#e5e7eb] placeholder-[#9ca3af] transition-all duration-300"
                    />
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 bg-gray-800/30 rounded-xl border border-gray-700/30">
                    <Shield className="w-5 h-5 text-green-400" />
                    <div>
                      <p className="text-sm font-medium text-[#e5e7eb]">Paiement 100% sécurisé</p>
                      <p className="text-xs text-[#9ca3af]">Chiffrement SSL 256-bit • Certifié PCI DSS</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={processPayment}
                    disabled={!cardNumber || !expiryDate || !cvv || !cardName}
                    className="w-full bg-gradient-to-r from-[#00eaff] to-[#8f00ff] text-white py-4 rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 flex items-center justify-center gap-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
                  >
                    <CreditCard className="w-6 h-6" />
                    Payer 1 500€
                  </button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="mb-6">
                    <Loader className="w-16 h-16 text-[#00eaff] mx-auto animate-spin" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-[#e5e7eb] mb-4">
                    Traitement du Paiement
                  </h3>
                  
                  <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
                    <div 
                      className="h-3 rounded-full bg-gradient-to-r from-[#00eaff] to-[#8f00ff] transition-all duration-300"
                      style={{ width: `${paymentProgress}%` }}
                    ></div>
                  </div>
                  
                  <p className="text-[#9ca3af]">
                    {paymentProgress < 50 ? 'Vérification des informations...' :
                     paymentProgress < 80 ? 'Autorisation bancaire...' :
                     'Finalisation du paiement...'}
                  </p>
                  
                  <div className="text-sm text-[#00eaff] mt-2">{paymentProgress}%</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ConfirmationView = () => (
    <div className="min-h-screen bg-[#0e0e14] relative overflow-hidden flex items-center justify-center">
      <AnimatedBackground />
      
      <div className="text-center bg-gray-900/50 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-800/50 p-12 max-w-2xl mx-4 relative z-10 animate-fade-in">
        <div className="mb-8">
          <div className="relative mb-6">
            <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <div className="absolute inset-0 w-24 h-24 mx-auto border-4 border-green-400/20 rounded-full animate-ping"></div>
          </div>
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent mb-4">
            Paiement Confirmé !
          </h1>
          <p className="text-xl text-[#9ca3af] leading-relaxed mb-6">
            Félicitations ! Votre projet TechStart Solutions est officiellement lancé.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="p-4 bg-gray-800/30 rounded-xl border border-gray-700/30">
            <div className="text-2xl font-bold text-[#00eaff]">1 500€</div>
            <div className="text-sm text-[#9ca3af]">Acompte payé</div>
          </div>
          <div className="p-4 bg-gray-800/30 rounded-xl border border-gray-700/30">
            <div className="text-2xl font-bold text-[#8f00ff]">12 sem.</div>
            <div className="text-sm text-[#9ca3af]">Durée projet</div>
          </div>
          <div className="p-4 bg-gray-800/30 rounded-xl border border-gray-700/30">
            <div className="text-2xl font-bold text-[#ff00b8]">24h</div>
            <div className="text-sm text-[#9ca3af]">Premier contact</div>
          </div>
        </div>
        
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50 mb-8">
          <h3 className="font-semibold text-[#e5e7eb] mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#00eaff]" />
            Prochaines Étapes
          </h3>
          <div className="space-y-3 text-left">
            {[
              { step: 1, text: 'Appel de lancement dans les 24h', status: 'pending' },
              { step: 2, text: 'Kick-off meeting équipe projet', status: 'pending' },
              { step: 3, text: 'Début phase recherche & analyse', status: 'pending' },
              { step: 4, text: 'Premier livrable (J+14)', status: 'pending' }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-900/30 rounded-lg border border-gray-700/30">
                <div className="w-8 h-8 bg-gradient-to-r from-[#00eaff] to-[#8f00ff] rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {item.step}
                </div>
                <span className="text-sm text-[#9ca3af]">{item.text}</span>
                <div className="ml-auto">
                  <Clock className="w-4 h-4 text-orange-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-4 text-sm text-[#9ca3af]">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>Paiement sécurisé</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-400" />
              <span>Projet garanti</span>
            </div>
          </div>
          
          <button
            onClick={() => setCurrentView('client')}
            className="px-8 py-3 bg-gradient-to-r from-[#00eaff] to-[#8f00ff] text-white rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Retour au Dashboard
          </button>
        </div>
      </div>
    </div>
  );

  const AdminView = () => (
    <div className="min-h-screen bg-[#0e0e14]">
      <div className="bg-gray-900/50 backdrop-blur-sm shadow-sm border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-[#e5e7eb] flex items-center gap-2">
              <Settings className="w-6 h-6 text-[#00eaff]" />
              Dashboard Chef d'Équipe
            </h1>
            <button
              onClick={() => setUserRole('client')}
              className="px-6 py-3 bg-gradient-to-r from-[#00eaff] to-[#8f00ff] text-white rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
            >
              Mode Client
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#9ca3af]">Projets en attente</p>
                  <p className="text-2xl font-bold text-[#ff00b8]">{projects.filter(p => p.status === 'pending').length}</p>
                </div>
                <Clock className="w-8 h-8 text-[#ff00b8]" />
              </div>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#9ca3af]">Projets approuvés</p>
                  <p className="text-2xl font-bold text-[#00eaff]">{projects.filter(p => p.status === 'approved').length}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-[#00eaff]" />
              </div>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#9ca3af]">Projets refusés</p>
                  <p className="text-2xl font-bold text-red-400">{projects.filter(p => p.status === 'rejected').length}</p>
                </div>
                <XCircle className="w-8 h-8 text-red-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-sm border border-gray-800">
          <div className="p-6 border-b border-gray-800">
            <h2 className="text-xl font-semibold text-[#e5e7eb]">Projets à Valider</h2>
          </div>
          <div className="p-6">
            <div className="grid gap-4">
              {projects.map(project => (
                <div key={project.id} className="border border-gray-700 rounded-lg p-4 hover:shadow-md hover:shadow-cyan-500/10 transition-all duration-300 bg-gray-800/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#00eaff] to-[#8f00ff] rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#e5e7eb]">{project.businessName}</h3>
                        <p className="text-sm text-[#9ca3af]">{project.clientName} • {project.businessType}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        project.status === 'pending' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' :
                        project.status === 'approved' ? 'bg-[#00eaff]/20 text-[#00eaff] border border-[#00eaff]/30' :
                        'bg-red-500/20 text-red-300 border border-red-500/30'
                      }`}>
                        {project.status === 'pending' ? 'En attente' : 
                         project.status === 'approved' ? 'Approuvé' : 'Refusé'}
                      </span>
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="px-4 py-2 bg-gradient-to-r from-[#8f00ff] to-[#ff00b8] text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                      >
                        Voir Détails
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)}
          onApprove={approveProject}
          onReject={rejectProject}
          defaultRoadmap={defaultRoadmap}
        />
      )}
    </div>
  );

  const ProjectModal = ({ project, onClose, onApprove, onReject, defaultRoadmap }: {
    project: Project;
    onClose: () => void;
    onApprove: (id: string, figmaLink: string, price: number, roadmap: RoadmapSection[]) => void;
    onReject: (id: string) => void;
    defaultRoadmap: RoadmapSection[];
  }) => {
    const [figmaLink, setFigmaLink] = useState(project.figmaLink || '');
    const [price, setPrice] = useState(project.price || 0);
    const [roadmap, setRoadmap] = useState<RoadmapSection[]>(project.roadmap || defaultRoadmap);
    const [newDeliverable, setNewDeliverable] = useState<{[key: string]: string}>({});

    const updateRoadmapSection = (sectionId: string, field: keyof RoadmapSection, value: any) => {
      setRoadmap(prev => prev.map(section => 
        section.id === sectionId ? { ...section, [field]: value } : section
      ));
    };

    const addDeliverable = (sectionId: string) => {
      const deliverable = newDeliverable[sectionId];
      if (deliverable && deliverable.trim()) {
        updateRoadmapSection(sectionId, 'deliverables', [
          ...roadmap.find(s => s.id === sectionId)?.deliverables || [],
          deliverable.trim()
        ]);
        setNewDeliverable(prev => ({ ...prev, [sectionId]: '' }));
      }
    };

    const removeDeliverable = (sectionId: string, index: number) => {
      const section = roadmap.find(s => s.id === sectionId);
      if (section) {
        const newDeliverables = section.deliverables.filter((_, i) => i !== index);
        updateRoadmapSection(sectionId, 'deliverables', newDeliverables);
      }
    };

    const addNewPhase = () => {
      const newPhase: RoadmapSection = {
        id: Date.now().toString(),
        title: '',
        description: '',
        status: 'not-started',
        progress: 0,
        startDate: '',
        endDate: '',
        responsible: '',
        deliverables: []
      };
      setRoadmap(prev => [...prev, newPhase]);
    };

    const removePhase = (sectionId: string) => {
      setRoadmap(prev => prev.filter(section => section.id !== sectionId));
    };

    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-gray-900/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700 max-w-7xl w-full max-h-[95vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#e5e7eb]">{project.businessName}</h2>
              <button
                onClick={onClose}
                className="text-[#9ca3af] hover:text-[#e5e7eb] transition-colors"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-[#e5e7eb] mb-2">Informations Client</h3>
                  <div className="bg-gray-800/50 rounded-lg p-4 space-y-2 border border-gray-700">
                    <p className="text-[#9ca3af]"><span className="font-medium text-[#e5e7eb]">Nom:</span> {project.clientName}</p>
                    <p className="text-[#9ca3af]"><span className="font-medium text-[#e5e7eb]">Email:</span> {project.email}</p>
                    <p className="text-[#9ca3af]"><span className="font-medium text-[#e5e7eb]">Téléphone:</span> {project.phone}</p>
                    <p className="text-[#9ca3af]"><span className="font-medium text-[#e5e7eb]">Type:</span> {project.businessType}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-[#e5e7eb] mb-2">Description</h3>
                  <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                    <p className="text-sm text-[#9ca3af]">{project.description}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-[#e5e7eb] mb-2">Logo</h3>
                  <div className="bg-gray-800/50 rounded-lg p-4 flex justify-center border border-gray-700">
                    <img src={project.logo} alt="Logo" className="w-24 h-24 object-contain" />
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-[#e5e7eb] mb-2">Business Plan</h3>
                  <div className="bg-gray-800/50 rounded-lg p-4 max-h-32 overflow-y-auto border border-gray-700">
                    <p className="text-sm text-[#9ca3af]">{project.businessPlan}</p>
                  </div>
                </div>
              </div>
            </div>

            {project.status === 'pending' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#e5e7eb] mb-2">
                      Lien Maquette Figma
                    </label>
                    <input
                      type="url"
                      value={figmaLink}
                      onChange={(e) => setFigmaLink(e.target.value)}
                      placeholder="https://figma.com/design/..."
                      className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#00eaff] focus:border-transparent text-[#e5e7eb] placeholder-[#9ca3af]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#e5e7eb] mb-2">
                      Prix du Projet (€)
                    </label>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      placeholder="5000"
                      className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#00eaff] focus:border-transparent text-[#e5e7eb] placeholder-[#9ca3af]"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-[#e5e7eb]">Roadmap du Projet</h3>
                    <button
                      onClick={addNewPhase}
                      className="px-4 py-2 bg-gradient-to-r from-[#00eaff] to-[#8f00ff] text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Ajouter Phase
                    </button>
                  </div>
                  
                  <div className="grid lg:grid-cols-2 gap-6">
                    {/* Formulaire */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-[#e5e7eb] mb-3">📝 Configuration des Phases</h4>
                      {roadmap.map((section, index) => (
                        <div key={section.id} className="border border-gray-700 rounded-lg p-4 bg-gray-800/30">
                          <div className="flex items-center justify-between mb-4">
                            <h5 className="font-medium text-[#00eaff]">Phase {index + 1}</h5>
                            {roadmap.length > 1 && (
                              <button
                                onClick={() => removePhase(section.id)}
                                className="text-red-400 hover:text-red-300 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                          
                          <div className="space-y-3">
                            {/* Titre */}
                            <div>
                              <label className="block text-xs font-medium text-[#9ca3af] mb-1">
                                Titre de la phase
                              </label>
                              <input
                                type="text"
                                value={section.title}
                                onChange={(e) => updateRoadmapSection(section.id, 'title', e.target.value)}
                                placeholder="Ex: Recherche & Analyse"
                                className="w-full px-3 py-2 bg-gray-900/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#00eaff] focus:border-transparent text-[#e5e7eb] placeholder-[#9ca3af] text-sm"
                              />
                            </div>

                            {/* Description */}
                            <div>
                              <label className="block text-xs font-medium text-[#9ca3af] mb-1">
                                Description
                              </label>
                              <input
                                type="text"
                                value={section.description}
                                onChange={(e) => updateRoadmapSection(section.id, 'description', e.target.value)}
                                placeholder="Ex: Étude de marché et analyse des besoins"
                                className="w-full px-3 py-2 bg-gray-900/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#00eaff] focus:border-transparent text-[#e5e7eb] placeholder-[#9ca3af] text-sm"
                              />
                            </div>

                            {/* Statut */}
                            <div>
                              <label className="block text-xs font-medium text-[#9ca3af] mb-1">
                                Statut
                              </label>
                              <select
                                value={section.status}
                                onChange={(e) => updateRoadmapSection(section.id, 'status', e.target.value)}
                                className="w-full px-3 py-2 bg-gray-900/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#00eaff] focus:border-transparent text-[#e5e7eb] text-sm"
                              >
                                <option value="not-started">Non démarré</option>
                                <option value="in-progress">En cours</option>
                                <option value="completed">Terminé</option>
                              </select>
                            </div>

                            {/* Progression */}
                            <div>
                              <label className="block text-xs font-medium text-[#9ca3af] mb-1">
                                Progression (%)
                              </label>
                              <div className="flex items-center gap-3">
                                <input
                                  type="range"
                                  min="0"
                                  max="100"
                                  value={section.progress}
                                  onChange={(e) => updateRoadmapSection(section.id, 'progress', Number(e.target.value))}
                                  className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                                />
                                <span className="text-[#00eaff] font-medium text-sm w-12">{section.progress}%</span>
                              </div>
                            </div>

                            {/* Dates */}
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="block text-xs font-medium text-[#9ca3af] mb-1">
                                  Date début
                                </label>
                                <input
                                  type="date"
                                  value={section.startDate}
                                  onChange={(e) => updateRoadmapSection(section.id, 'startDate', e.target.value)}
                                  className="w-full px-3 py-2 bg-gray-900/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#00eaff] focus:border-transparent text-[#e5e7eb] text-sm"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-[#9ca3af] mb-1">
                                  Date fin
                                </label>
                                <input
                                  type="date"
                                  value={section.endDate}
                                  onChange={(e) => updateRoadmapSection(section.id, 'endDate', e.target.value)}
                                  className="w-full px-3 py-2 bg-gray-900/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#00eaff] focus:border-transparent text-[#e5e7eb] text-sm"
                                />
                              </div>
                            </div>

                            {/* Responsable */}
                            <div>
                              <label className="block text-xs font-medium text-[#9ca3af] mb-1">
                                Responsable
                              </label>
                              <select
                                value={section.responsible}
                                onChange={(e) => updateRoadmapSection(section.id, 'responsible', e.target.value)}
                                className="w-full px-3 py-2 bg-gray-900/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#00eaff] focus:border-transparent text-[#e5e7eb] text-sm"
                              >
                                <option value="">Sélectionner un responsable</option>
                                {teamMembers.map(member => (
                                  <option key={member} value={member}>{member}</option>
                                ))}
                              </select>
                            </div>

                            {/* Livrables */}
                            <div>
                              <label className="block text-xs font-medium text-[#9ca3af] mb-1">
                                Livrables
                              </label>
                              <div className="space-y-2">
                                <div className="flex gap-2">
                                  <input
                                    type="text"
                                    value={newDeliverable[section.id] || ''}
                                    onChange={(e) => setNewDeliverable(prev => ({ ...prev, [section.id]: e.target.value }))}
                                    placeholder="Ex: Rapport d'analyse"
                                    className="flex-1 px-3 py-2 bg-gray-900/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#00eaff] focus:border-transparent text-[#e5e7eb] placeholder-[#9ca3af] text-sm"
                                    onKeyPress={(e) => e.key === 'Enter' && addDeliverable(section.id)}
                                  />
                                  <button
                                    onClick={() => addDeliverable(section.id)}
                                    className="px-3 py-2 bg-gradient-to-r from-[#8f00ff] to-[#ff00b8] text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                                  >
                                    <Plus className="w-4 h-4" />
                                  </button>
                                </div>
                                <div className="flex flex-wrap gap-1">
                                  {section.deliverables.map((deliverable, idx) => (
                                    <span
                                      key={idx}
                                      className="inline-flex items-center gap-1 px-2 py-1 bg-[#00eaff]/20 text-[#00eaff] rounded-md text-xs border border-[#00eaff]/30"
                                    >
                                      {deliverable}
                                      <button
                                        onClick={() => removeDeliverable(section.id, idx)}
                                        className="text-[#00eaff] hover:text-white transition-colors"
                                      >
                                        ×
                                      </button>
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Preview Live */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-[#e5e7eb] mb-3">🔥 Aperçu Live</h4>
                      <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                        <h5 className="font-semibold text-[#e5e7eb] mb-4">Roadmap - {project.businessName}</h5>
                        <div className="space-y-3">
                          {roadmap.map((section, index) => (
                            <div key={section.id} className="bg-gray-900/50 rounded-lg p-4 border border-gray-600">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-lg">{getStatusIcon(section.status)}</span>
                                  <h6 className="font-medium text-[#e5e7eb]">
                                    {section.title || `Phase ${index + 1}`}
                                  </h6>
                                </div>
                                <span className="text-xs text-[#9ca3af]">
                                  {section.responsible || 'Non assigné'}
                                </span>
                              </div>
                              
                              <p className="text-sm text-[#9ca3af] mb-3">
                                {section.description || 'Description à définir'}
                              </p>
                              
                              <div className="space-y-2">
                                <div className="flex justify-between text-xs text-[#9ca3af]">
                                  <span>Progression</span>
                                  <span>{section.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-2">
                                  <div 
                                    className={`h-2 rounded-full bg-gradient-to-r ${getStatusColor(section.status)}`}
                                    style={{ width: `${section.progress}%` }}
                                  ></div>
                                </div>
                              </div>
                              
                              <div className="flex justify-between text-xs text-[#9ca3af] mt-2">
                                <span>📅 {formatDate(section.startDate)}</span>
                                <span>📅 {formatDate(section.endDate)}</span>
                              </div>
                              
                              {section.deliverables.length > 0 && (
                                <div className="mt-2">
                                  <p className="text-xs text-[#9ca3af] mb-1">
                                    📦 Livrables ({section.deliverables.length})
                                  </p>
                                  <div className="flex flex-wrap gap-1">
                                    {section.deliverables.slice(0, 3).map((deliverable, idx) => (
                                      <span
                                        key={idx}
                                        className="px-2 py-1 bg-[#00eaff]/10 text-[#00eaff] rounded text-xs border border-[#00eaff]/20"
                                      >
                                        {deliverable}
                                      </span>
                                    ))}
                                    {section.deliverables.length > 3 && (
                                      <span className="px-2 py-1 bg-gray-700 text-[#9ca3af] rounded text-xs">
                                        +{section.deliverables.length - 3}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => onApprove(project.id, figmaLink, price, roadmap)}
                    disabled={!figmaLink || !price}
                    className="flex-1 bg-gradient-to-r from-[#00eaff] to-[#8f00ff] text-white py-3 rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Approuver le Projet
                  </button>
                  <button
                    onClick={() => onReject(project.id)}
                    className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-lg hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <XCircle className="w-5 h-5" />
                    Refuser le Projet
                  </button>
                </div>
              </div>
            )}

            {project.status === 'approved' && (
              <div className="space-y-4">
                <div className="bg-[#00eaff]/10 border border-[#00eaff]/30 rounded-lg p-4">
                  <h3 className="font-semibold text-[#00eaff] mb-2">Projet Approuvé</h3>
                  <div className="space-y-2">
                    <p className="text-[#9ca3af]">
                      <span className="font-medium text-[#e5e7eb]">Maquette:</span> 
                      <a href={project.figmaLink} target="_blank" rel="noopener noreferrer" className="text-[#00eaff] hover:underline ml-2">
                        {project.figmaLink}
                      </a>
                    </p>
                    <p className="text-[#9ca3af]">
                      <span className="font-medium text-[#e5e7eb]">Prix:</span> 
                      <span className="text-[#00eaff] ml-2">{project.price?.toLocaleString()}€</span>
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-[#e5e7eb] mb-4">Roadmap Validée</h3>
                  <div className="space-y-3">
                    {project.roadmap?.map((section, index) => (
                      <div key={section.id} className="border border-gray-700 rounded-lg p-4 bg-gray-800/30">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{getStatusIcon(section.status)}</span>
                            <h4 className="font-medium text-[#e5e7eb]">{section.title}</h4>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-[#9ca3af]">{section.responsible}</span>
                            <span className="text-sm text-[#00eaff]">{section.progress}%</span>
                          </div>
                        </div>
                        <p className="text-sm text-[#9ca3af] mb-2">{section.description}</p>
                        <div className="flex justify-between text-xs text-[#9ca3af] mb-2">
                          <span>📅 {formatDate(section.startDate)}</span>
                          <span>📅 {formatDate(section.endDate)}</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                          <div 
                            className={`h-2 rounded-full bg-gradient-to-r ${getStatusColor(section.status)}`}
                            style={{ width: `${section.progress}%` }}
                          ></div>
                        </div>
                        {section.deliverables.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {section.deliverables.map((deliverable, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-[#00eaff]/20 text-[#00eaff] rounded text-xs border border-[#00eaff]/30"
                              >
                                {deliverable}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {project.status === 'rejected' && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <h3 className="font-semibold text-red-400">Projet Refusé</h3>
                <p className="text-sm text-red-300 mt-1">Ce projet a été refusé et le client a été notifié.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #00eaff, #8f00ff);
          cursor: pointer;
          border: 2px solid #1f2937;
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #00eaff, #8f00ff);
          cursor: pointer;
          border: 2px solid #1f2937;
        }
      `}</style>
      
      {userRole === 'admin' ? (
        <AdminView />
      ) : (
        currentView === 'client' ? <ClientView /> :
        currentView === 'chat' ? <ChatView /> :
        currentView === 'waiting' ? <WaitingView /> :
        currentView === 'proposal' ? <ProposalView /> :
        currentView === 'payment' ? <PaymentView /> :
        currentView === 'confirmation' ? <ConfirmationView /> :
        <AdminView />
      )}
    </div>
  );
}

export default App;