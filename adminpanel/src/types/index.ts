export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'chef' | 'member' | 'client';
  avatar?: string;
  joinDate: string;
  status?: 'active' | 'inactive' | 'pending';
  lastLogin?: string;
  phone?: string;
  company?: string;
  position?: string;
}

export interface ClientRegistration {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  projectType: string;
  budget: number;
  timeline: string;
  description: string;
  requirements: string[];
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  // Informations détaillées du fondateur
  founderInfo: {
    age: number;
    experience: string;
    education: string;
    previousProjects: string[];
    motivation: string;
  };
  // Vision et idée du projet
  projectVision: {
    problemSolved: string;
    targetMarket: string;
    uniqueValue: string;
    competitors: string[];
    marketSize: string;
    revenueModel: string;
  };
  // Business plan
  businessPlan: {
    executiveSummary: string;
    marketAnalysis: string;
    financialProjections: string;
    marketingStrategy: string;
    operationalPlan: string;
    riskAnalysis: string;
  };
  // Logo et assets
  assets: {
    logoUrl?: string;
    brandColors: string[];
    brandGuidelines?: string;
    existingAssets: string[];
  };
  smartFormData: {
    industry: string;
    targetAudience: string;
    competitors: string[];
    features: string[];
    platforms: string[];
  };
  technicalSpecs: {
    industry: string;
    targetAudience: string;
    competitors: string[];
    features: string[];
    platforms: string[];
  };
  // Évaluation du chef d'équipe
  chefEvaluation?: {
    evaluatedBy: string;
    evaluatedAt: string;
    feasibilityScore: number; // 1-10
    complexityLevel: 'low' | 'medium' | 'high';
    estimatedDuration: string;
    recommendedTeamSize: number;
    technicalChallenges: string[];
    notes: string;
  };
  // Devis généré
  quote?: {
    id: string;
    totalAmount: number;
    breakdown: QuoteItem[];
    timeline: string;
    terms: string;
    roadmap: ProjectPhase[];
    paymentSchedule: PaymentSchedule[];
    validUntil: string;
    pdfUrl?: string;
  };
}

export interface ProjectPhase {
  id: string;
  name: string;
  description: string;
  duration: number; // en semaines
  deliverables: string[];
  milestones: string[];
}

export interface PaymentSchedule {
  id: string;
  phase: string;
  percentage: number;
  amount: number;
  dueDate: string;
  description: string;
}
export interface Quote {
  id: string;
  registrationId: string;
  projectName: string;
  description: string;
  totalAmount: number;
  breakdown: QuoteItem[];
  timeline: string;
  terms: string;
  figmaUrl?: string;
  status: 'draft' | 'sent' | 'accepted' | 'rejected';
  createdAt: string;
  validUntil: string;
}

export interface QuoteItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface ProjectRoadmap {
  id: string;
  projectId: string;
  phases: RoadmapPhase[];
  totalDuration: number;
  createdAt: string;
  updatedAt: string;
}

export interface RoadmapPhase {
  id: string;
  name: string;
  description: string;
  duration: number;
  startDate: string;
  endDate: string;
  status: 'pending' | 'in-progress' | 'completed';
  tasks: string[];
  deliverables: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'in-progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high';
  progress: number;
  budget: number;
  deadline: string;
  clientId: string;
  chefId?: string;
  memberIds: string[];
  createdAt: string;
  files: ProjectFile[];
  clientDashboardUrl?: string;
  clientAccess?: {
    canViewFiles: boolean;
    canComment: boolean;
    canRequestChanges: boolean;
  };
  quoteId?: string;
  roadmapId?: string;
  paymentStatus: 'pending' | 'paid' | 'partial';
  assignedTeam?: string[];
}

export interface ProjectFile {
  id: string;
  name: string;
  type: 'figma' | 'bp' | 'invoice' | 'document';
  url: string;
  uploadDate: string;
  sharedWithClient?: boolean;
  clientComments?: ClientComment[];
}

export interface ClientComment {
  id: string;
  content: string;
  timestamp: string;
  status: 'pending' | 'resolved';
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  assignedTo: string;
  projectId: string;
  dueDate: string;
  createdAt: string;
  clientVisible?: boolean;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  type: 'text' | 'file' | 'system';
}

export interface ChatRoom {
  id: string;
  name: string;
  type: 'private' | 'group' | 'global';
  participants: string[];
  messages: ChatMessage[];
  projectId?: string;
  lastActivity: string;
}

export type UserRole = 'admin' | 'chef' | 'member' | 'client';

export interface DashboardStats {
  totalProjects: number;
  activeProjects: number;
  totalRevenue: number;
  totalUsers: number;
  completedTasks: number;
  pendingTasks: number;
  clientSatisfaction: number;
  activeClients: number;
}