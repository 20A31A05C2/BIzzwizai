
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MessageSquare, Brain, Users, Settings, AlertTriangle } from 'lucide-react';

const AdminAssistantPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-8 px-4"
    >
      <div className="mb-8">
        <h1 className="text-4xl font-black flex items-center bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-red-500 to-orange-500">
          <MessageSquare size={36} className="mr-3 text-red-500" /> Assistant Admin BizzWiz
        </h1>
        <p className="text-lg text-slate-400 mt-2">
          Gérez les interactions, configurez l'IA et optimisez l'assistance pour vos utilisateurs.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-slate-800/60 border-slate-700 shadow-xl hover:shadow-red-500/20 transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-xl text-red-400 flex items-center">
              <Brain size={24} className="mr-2" /> Configuration de l'IA
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-slate-400">
              Ajustez les paramètres de l'assistant IA, les réponses automatiques et les scénarios d'interaction.
            </CardDescription>
            <button className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300">
              Configurer l'IA
            </button>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/60 border-slate-700 shadow-xl hover:shadow-red-500/20 transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-xl text-red-400 flex items-center">
              <Users size={24} className="mr-2" /> Suivi des Interactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-slate-400">
              Visualisez les logs de conversation, analysez les demandes fréquentes et identifiez les points d'amélioration.
            </CardDescription>
            <button className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300">
              Voir les Logs
            </button>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/60 border-slate-700 shadow-xl hover:shadow-red-500/20 transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-xl text-red-400 flex items-center">
              <Settings size={24} className="mr-2" /> Paramètres Généraux
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-slate-400">
              Gérez les notifications, les intégrations et les options avancées de l'assistant.
            </CardDescription>
            <button className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300">
              Accéder aux Paramètres
            </button>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8 bg-yellow-500/10 border-yellow-600/50 shadow-lg">
        <CardHeader className="flex flex-row items-center">
          <AlertTriangle size={24} className="mr-3 text-yellow-400" />
          <CardTitle className="text-yellow-300">Section en Développement</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-yellow-400">
            Cette page est actuellement en cours de construction. Les fonctionnalités complètes de l'assistant admin seront bientôt disponibles.
          </p>
        </CardContent>
      </Card>

    </motion.div>
  );
};

export default AdminAssistantPage;
