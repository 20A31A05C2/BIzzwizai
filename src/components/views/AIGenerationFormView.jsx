import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from '@/components/ui/use-toast';
import { Zap, Puzzle, Palette, Edit3, Type } from 'lucide-react';

const AIGenerationFormView = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    projectName: '',
    appType: '',
    projectType: '',
    designStyle: '',
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.projectName.trim()) {
      toast({ title: "Nom du projet requis", description: "Donnez un nom à votre future création !", variant: "destructive" });
      return;
    }
    if (!formData.appType) {
      toast({ title: "Type d'application requis", description: "Quel type d'application souhaitez-vous créer ?", variant: "destructive" });
      return;
    }
    if (!formData.projectType) {
      toast({ title: "Type de projet requis", description: "Quel est le domaine de votre projet ?", variant: "destructive" });
      return;
    }
    if (!formData.designStyle) {
      toast({ title: "Style de design requis", description: "Quelle ambiance visuelle préférez-vous ?", variant: "destructive" });
      return;
    }

    setIsGenerating(true);
    toast({
      title: "🧠 L'IA réfléchit...",
      description: "Votre projet est en cours de génération. Un instant...",
    });

    setTimeout(() => {
      onSubmit(formData);
      setIsGenerating(false);
    }, 2500); 
  };

  const appTypes = ["Web App", "Mobile App", "SaaS", "Extension", "Landing Page", "Autre"];
  const projectTypes = ["Intelligence Artificielle", "E-commerce", "CRM", "Marketplace", "Dashboard", "Outil interne", "Blog/Contenu", "Jeu Vidéo"];
  const designStyles = ["Futuriste", "Minimaliste", "Cartoon", "Dark Mode", "Style Apple", "Brutaliste", "Néo-rétro", "Glassmorphism"];

  return (
    <motion.div
      key="aiGenerationForm"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5, ease: "circOut" }}
      className="flex items-center justify-center min-h-full p-4 relative"
    >
      <div className="futuristic-form-panel w-full max-w-2xl p-8 md:p-12 space-y-8">
        <div className="text-center">
          <Zap className="w-16 h-16 text-[#8f4fff] mx-auto mb-4 opacity-80" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#8f4fff] to-[#3b82f6] bg-clip-text text-transparent mb-3">
            Créer un Nouveau Projet
          </h1>
          <p className="text-lg text-gray-400">
            Laissez notre IA dessiner les contours de votre vision.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="projectName" className="text-lg font-medium text-gray-300 mb-2 block">Nom du Projet</Label>
            <Input
              id="projectName"
              icon={<Edit3 size={18} />}
              type="text"
              value={formData.projectName}
              onChange={(e) => handleChange('projectName', e.target.value)}
              placeholder="Ex: VisionCraft AI, NovaShop, ConnectSphere..."
              className="futuristic-input"
            />
          </div>

          <div>
            <Label htmlFor="appType" className="text-lg font-medium text-gray-300 mb-2 block">Type d'Application</Label>
            <Select onValueChange={(value) => handleChange('appType', value)} value={formData.appType}>
              <SelectTrigger id="appType" className="futuristic-select-trigger" icon={<Type size={18} />}>
                <SelectValue placeholder="Choisissez un type d'application..." />
              </SelectTrigger>
              <SelectContent>
                {appTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="projectType" className="text-lg font-medium text-gray-300 mb-2 block">Type de Projet</Label>
            <Select onValueChange={(value) => handleChange('projectType', value)} value={formData.projectType}>
              <SelectTrigger id="projectType" className="futuristic-select-trigger" icon={<Puzzle size={18} />}>
                <SelectValue placeholder="Définissez la nature du projet..." />
              </SelectTrigger>
              <SelectContent>
                {projectTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="designStyle" className="text-lg font-medium text-gray-300 mb-2 block">Style de Design Souhaité</Label>
            <Select onValueChange={(value) => handleChange('designStyle', value)} value={formData.designStyle}>
              <SelectTrigger id="designStyle" className="futuristic-select-trigger" icon={<Palette size={18} />}>
                <SelectValue placeholder="Quelle sera l'ambiance visuelle ?" />
              </SelectTrigger>
              <SelectContent>
                {designStyles.map(style => <SelectItem key={style} value={style}>{style}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full futuristic-button mt-8" disabled={isGenerating}>
            {isGenerating ? (
              <>
                <motion.div 
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                Génération en cours...
              </>
            ) : (
              <>
                <Zap size={20} className="mr-2" /> Générer avec l’IA
              </>
            )}
          </Button>
        </form>
      </div>
    </motion.div>
  );
};

export default AIGenerationFormView;