import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Edit, Save, Eye, BarChart2, Lightbulb, CalendarDays, Target, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

const CONTENT_CONFIG_ID = 'user_dashboard_v1';

const AdminContentManagementPage = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    welcomeMessage: "",
    userName: "",
    statCard1Title: "",
    statCard1Value: "",
    statCard2Title: "",
    statCard2Value: "",
    statCard3Title: "",
    statCard3Value: "",
    statCard4Title: "",
    statCard4Value: "",
    priorityObjectiveTitle: "",
    priorityObjectiveDescription: "",
    tipOfTheDayTitle: "",
    tipOfTheDayDescription: "",
  });

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('dashboard_content')
        .select('data')
        .eq('config_id', CONTENT_CONFIG_ID)
        .maybeSingle();

      if (error) {
        console.error('Error fetching dashboard content:', error);
        toast({
          title: "Erreur de chargement",
          description: "Impossible de charger le contenu du dashboard depuis Supabase.",
          variant: "destructive",
        });
      } else if (data) {
        setDashboardData(data.data);
      } else {
         toast({
          title: "Aucun contenu configuré",
          description: "Le contenu par défaut sera utilisé. Sauvegardez pour créer une configuration.",
          variant: "default",
        });
      }
      setIsLoading(false);
    };

    fetchContent();
  }, [toast]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDashboardData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveContent = async () => {
    setIsSaving(true);
    const { error } = await supabase
      .from('dashboard_content')
      .upsert({ config_id: CONTENT_CONFIG_ID, data: dashboardData, last_updated: new Date().toISOString() }, { onConflict: 'config_id' });

    if (error) {
      console.error('Error saving dashboard content:', error);
      toast({
        title: "Erreur de sauvegarde",
        description: "Impossible de sauvegarder le contenu sur Supabase.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Contenu Sauvegardé !",
        description: "Les informations du dashboard utilisateur ont été mises à jour sur Supabase.",
        className: "bg-green-500 text-white",
      });
    }
    setIsSaving(false);
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-12 w-12 animate-spin text-red-500" />
        <p className="ml-4 text-xl text-slate-300">Chargement du contenu...</p>
      </div>
    );
  }

  return (
    <motion.div 
      className="space-y-8"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.1 }}}}
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold text-slate-100 flex items-center">
          <Edit size={32} className="mr-3 text-red-500" />
          Gestion du Contenu (Dashboard Utilisateur)
        </h1>
        <p className="text-slate-400 mt-1">Modifiez ici les informations affichées sur le dashboard des utilisateurs via Supabase.</p>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="bg-slate-800/70 border-slate-700">
          <CardHeader>
            <CardTitle className="text-xl text-slate-200">Contenu Principal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="userName" className="text-slate-300">Nom d'utilisateur par défaut</Label>
              <Input id="userName" name="userName" value={dashboardData.userName} onChange={handleInputChange} className="mt-1 bg-slate-700 border-slate-600 text-slate-200 focus:border-red-500" />
            </div>
            <div>
              <Label htmlFor="welcomeMessage" className="text-slate-300">Message de motivation/accueil</Label>
              <Textarea id="welcomeMessage" name="welcomeMessage" value={dashboardData.welcomeMessage} onChange={handleInputChange} className="mt-1 bg-slate-700 border-slate-600 text-slate-200 focus:border-red-500" rows={3} />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="bg-slate-800/70 border-slate-700">
          <CardHeader>
            <CardTitle className="text-xl text-slate-200 flex items-center"><BarChart2 size={22} className="mr-2 text-red-400"/> Cartes de Statistiques</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2 p-3 bg-slate-700/30 rounded-md">
              <Label htmlFor="statCard1Title" className="text-slate-300">Stat 1 - Titre</Label>
              <Input id="statCard1Title" name="statCard1Title" value={dashboardData.statCard1Title} onChange={handleInputChange} className="bg-slate-700 border-slate-600 text-slate-200 focus:border-red-500" />
              <Label htmlFor="statCard1Value" className="text-slate-300">Stat 1 - Valeur</Label>
              <Input id="statCard1Value" name="statCard1Value" value={dashboardData.statCard1Value} onChange={handleInputChange} className="bg-slate-700 border-slate-600 text-slate-200 focus:border-red-500" />
            </div>
            <div className="space-y-2 p-3 bg-slate-700/30 rounded-md">
              <Label htmlFor="statCard2Title" className="text-slate-300">Stat 2 - Titre</Label>
              <Input id="statCard2Title" name="statCard2Title" value={dashboardData.statCard2Title} onChange={handleInputChange} className="bg-slate-700 border-slate-600 text-slate-200 focus:border-red-500" />
              <Label htmlFor="statCard2Value" className="text-slate-300">Stat 2 - Valeur</Label>
              <Input id="statCard2Value" name="statCard2Value" value={dashboardData.statCard2Value} onChange={handleInputChange} className="bg-slate-700 border-slate-600 text-slate-200 focus:border-red-500" />
            </div>
            <div className="space-y-2 p-3 bg-slate-700/30 rounded-md">
              <Label htmlFor="statCard3Title" className="text-slate-300">Stat 3 - Titre</Label>
              <Input id="statCard3Title" name="statCard3Title" value={dashboardData.statCard3Title} onChange={handleInputChange} className="bg-slate-700 border-slate-600 text-slate-200 focus:border-red-500" />
              <Label htmlFor="statCard3Value" className="text-slate-300">Stat 3 - Valeur</Label>
              <Input id="statCard3Value" name="statCard3Value" value={dashboardData.statCard3Value} onChange={handleInputChange} className="bg-slate-700 border-slate-600 text-slate-200 focus:border-red-500" />
            </div>
            <div className="space-y-2 p-3 bg-slate-700/30 rounded-md">
              <Label htmlFor="statCard4Title" className="text-slate-300">Stat 4 - Titre</Label>
              <Input id="statCard4Title" name="statCard4Title" value={dashboardData.statCard4Title} onChange={handleInputChange} className="bg-slate-700 border-slate-600 text-slate-200 focus:border-red-500" />
              <Label htmlFor="statCard4Value" className="text-slate-300">Stat 4 - Valeur</Label>
              <Input id="statCard4Value" name="statCard4Value" value={dashboardData.statCard4Value} onChange={handleInputChange} className="bg-slate-700 border-slate-600 text-slate-200 focus:border-red-500" />
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Card className="bg-slate-800/70 border-slate-700">
          <CardHeader>
            <CardTitle className="text-xl text-slate-200 flex items-center"><Target size={22} className="mr-2 text-red-400"/> Carte "Objectif Prioritaire"</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="priorityObjectiveTitle" className="text-slate-300">Titre de l'objectif</Label>
              <Input id="priorityObjectiveTitle" name="priorityObjectiveTitle" value={dashboardData.priorityObjectiveTitle} onChange={handleInputChange} className="mt-1 bg-slate-700 border-slate-600 text-slate-200 focus:border-red-500" />
            </div>
            <div>
              <Label htmlFor="priorityObjectiveDescription" className="text-slate-300">Description de l'objectif</Label>
              <Textarea id="priorityObjectiveDescription" name="priorityObjectiveDescription" value={dashboardData.priorityObjectiveDescription} onChange={handleInputChange} className="mt-1 bg-slate-700 border-slate-600 text-slate-200 focus:border-red-500" rows={3} />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="bg-slate-800/70 border-slate-700">
          <CardHeader>
            <CardTitle className="text-xl text-slate-200 flex items-center"><Lightbulb size={22} className="mr-2 text-red-400"/> Carte "Astuce du Jour"</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="tipOfTheDayTitle" className="text-slate-300">Titre de l'astuce</Label>
              <Input id="tipOfTheDayTitle" name="tipOfTheDayTitle" value={dashboardData.tipOfTheDayTitle} onChange={handleInputChange} className="mt-1 bg-slate-700 border-slate-600 text-slate-200 focus:border-red-500" />
            </div>
            <div>
              <Label htmlFor="tipOfTheDayDescription" className="text-slate-300">Description de l'astuce</Label>
              <Textarea id="tipOfTheDayDescription" name="tipOfTheDayDescription" value={dashboardData.tipOfTheDayDescription} onChange={handleInputChange} className="mt-1 bg-slate-700 border-slate-600 text-slate-200 focus:border-red-500" rows={3} />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-end items-center gap-3 pt-4">
        <Button variant="outline" className="border-sky-500 text-sky-400 hover:bg-sky-500/20 hover:text-sky-300 w-full sm:w-auto">
          <Eye size={18} className="mr-2" /> Prévisualiser (Simulé)
        </Button>
        <Button 
            size="lg" 
            onClick={handleSaveContent} 
            disabled={isSaving}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-3 w-full sm:w-auto"
        >
          {isSaving ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Save className="mr-2 h-5 w-5" />}
          {isSaving ? "Sauvegarde..." : "Sauvegarder le Contenu"}
        </Button>
      </motion.div>

       <motion.p variants={itemVariants} className="text-xs text-center text-slate-500">
        Les modifications sont sauvegardées sur Supabase et affecteront le dashboard utilisateur.
      </motion.p>
    </motion.div>
  );
};

export default AdminContentManagementPage;