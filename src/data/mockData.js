// home/src/data/mockData.js

export const mockClientRegistrations = [
  {
    id: 1,
    name: "Jean Dupont",
    company: "TechStart SAS",
    projectType: "E-commerce Platform",
    budget: 50000,
    timeline: "3 mois",
    status: "pending",
    email: "jean.dupont@example.com",
    phone: "0601020304",
    submittedAt: new Date().toISOString(),
    founderInfo: {
      age: 35,
      education: "Ingénieur",
      experience: "10 ans"
    },
    description: "Plateforme e-commerce moderne.",
    projectVision: {
      targetMarket: "France",
      marketSize: "Grand",
      problemSolved: "Digitalisation des ventes"
    },
    technicalSpecs: {
      platforms: ["Web", "Mobile"],
      features: ["Paiement", "Catalogue", "Gestion stock", "Notifications"]
    }
  },
  // Add more clients as needed
];

export const mockUsers = [
  {
    id: 1,
    name: "Alice Martin",
    email: "alice.martin@example.com",
    role: "chef",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    position: "Chef d'équipe",
    createdAt: new Date().toISOString(),
    phone: "0605060708"
  },
  {
    id: 2,
    name: "Bob Durand",
    email: "bob.durand@example.com",
    role: "dev",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    position: "Développeur",
    createdAt: new Date().toISOString(),
    phone: "0608091011"
  }
  // Add more users as needed
];
