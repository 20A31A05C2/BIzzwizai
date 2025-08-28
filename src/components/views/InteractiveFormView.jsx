import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea'; 
import { toast } from '@/components/ui/use-toast';
import { Sparkles, UserCircle, Target, FileText } from 'lucide-react';

const InteractiveFormView = ({ onSubmit }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    projectName: '',
    projectConcept: '',
    userProfile: '',
    projectGoal: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (step === 1 && !formData.projectName.trim()) {
      toast({ title: "Nom du projet requis", description: "Veuillez donner un nom à votre vision.", variant: "destructive" });
      return;
    }
    if (step === 2 && !formData.projectConcept.trim()) {
      toast({ title: "Concept du projet requis", description: "Expliquez-nous brièvement votre idée.", variant: "destructive" });
      return;
    }
    setStep(prev => prev + 1);
  };
  
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = () => {
    if (!formData.projectName.trim() || !formData.projectConcept.trim()) {
        toast({ title: "Informations manquantes", description: "Le nom et le concept du projet sont essentiels.", variant: "destructive"});
        return;
    }
    if (!formData.userProfile.trim()) {
      toast({ title: "Profil utilisateur manquant", description: "Décrivez-nous qui vous êtes ou votre entreprise.", variant: "destructive"});
      return;
    }
    if (!formData.projectGoal.trim()) {
      toast({ title: "Objectif du projet manquant", description: "Quel est le but principal de ce projet ?", variant: "destructive"});
      return;
    }
    onSubmit(formData);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div key="step1" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="space-y-6">
            <Label htmlFor="projectName" className="text-xl font-semibold text-gray-200 flex items-center"><FileText className="w-6 h-6 mr-3 text-[#8f4fff]" />Quel est le nom de votre projet visionnaire ?</Label>
            <Input 
              id="projectName" 
              name="projectName" 
              value={formData.projectName} 
              onChange={handleChange} 
              placeholder="Ex: Plateforme Révolutionnaire X" 
              className="text-lg p-4 bg-[#121212] border-gray-600 focus:ring-[#8f4fff] focus:border-[#8f4fff]" 
            />
            <p className="text-sm text-gray-400">Un nom accrocheur est un excellent début !</p>
          </motion.div>
        );
      case 2:
        return (
          <motion.div key="step2" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="space-y-6">
            <Label htmlFor="projectConcept" className="text-xl font-semibold text-gray-200 flex items-center"><Sparkles className="w-6 h-6 mr-3 text-[#8f4fff]" />Décrivez-nous le concept de votre projet.</Label>
            <Textarea 
              id="projectConcept" 
              name="projectConcept" 
              value={formData.projectConcept} 
              onChange={handleChange} 
              placeholder="Ex: Une application mobile qui connecte les artisans locaux avec des clients en quête de produits uniques..." 
              className="text-lg p-4 min-h-[150px] bg-[#121212] border-gray-600 focus:ring-[#8f4fff] focus:border-[#8f4fff]"
            />
            <p className="text-sm text-gray-400">Soyez aussi précis que possible, laissez votre créativité s'exprimer !</p>
          </motion.div>
        );
      case 3:
        return (
          <motion.div key="step3" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="space-y-6">
            <Label htmlFor="userProfile" className="text-xl font-semibold text-gray-200 flex items-center"><UserCircle className="w-6 h-6 mr-3 text-[#8f4fff]" />Parlez-nous un peu de vous (ou de votre entreprise).</Label>
            <Textarea 
              id="userProfile" 
              name="userProfile" 
              value={formData.userProfile} 
              onChange={handleChange} 
              placeholder="Ex: Je suis un entrepreneur solo passionné par la technologie / Nous sommes une PME dans le secteur du bien-être..." 
              className="text-lg p-4 min-h-[120px] bg-[#121212] border-gray-600 focus:ring-[#8f4fff] focus:border-[#8f4fff]"
            />
            <p className="text-sm text-gray-400">Cela nous aide à mieux cerner vos besoins.</p>
          </motion.div>
        );
      case 4:
        return (
          <motion.div key="step4" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="space-y-6">
            <Label htmlFor="projectGoal" className="text-xl font-semibold text-gray-200 flex items-center"><Target className="w-6 h-6 mr-3 text-[#8f4fff]" />Quel est l'objectif principal de ce projet ?</Label>
            <Textarea 
              id="projectGoal" 
              name="projectGoal" 
              value={formData.projectGoal} 
              onChange={handleChange} 
              placeholder="Ex: Générer 1000 utilisateurs actifs en 6 mois / Améliorer l'engagement client de 20% / Devenir leader sur un marché de niche..." 
              className="text-lg p-4 min-h-[120px] bg-[#121212] border-gray-600 focus:ring-[#8f4fff] focus:border-[#8f4fff]"
            />
            <p className="text-sm text-gray-400">Une vision claire de l'objectif est la clé du succès.</p>
          </motion.div>
        );
      default:
        return null;
    }
  };

  const totalSteps = 4;
  const progressPercentage = (step / totalSteps) * 100;

  return (
    <motion.div
      key="interactiveForm"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="max-w-3xl mx-auto p-8 bg-[#1f1f2f] rounded-2xl shadow-2xl border border-gray-700/50"
    >
      <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-[#8f4fff] to-[#3b82f6] bg-clip-text text-transparent mb-2">
        Donnons Vie à Votre Idée !
      </h1>
      <p className="text-center text-gray-400 mb-8">Suivez ces quelques étapes pour nous aider à comprendre votre vision.</p>

      <div className="w-full bg-gray-700 rounded-full h-2.5 mb-10">
        <motion.div
          className="bg-gradient-to-r from-[#8f4fff] to-[#3b82f6] h-2.5 rounded-full"
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>
      
      <div className="min-h-[250px]">
        <AnimatePresence mode="wait">
            {renderStep()}
        </AnimatePresence>
      </div>

      <div className="mt-10 flex justify-between items-center">
        <Button 
          variant="outline" 
          onClick={prevStep} 
          disabled={step === 1}
          className="text-gray-300 hover:text-white border-gray-600 hover:border-gray-400 disabled:opacity-50"
        >
          Précédent
        </Button>
        <p className="text-sm text-gray-500">Étape {step} sur {totalSteps}</p>
        {step < totalSteps ? (
          <Button onClick={nextStep} className="bg-[#8f4fff] hover:bg-[#7c3aed]">
            Suivant
          </Button>
        ) : (
          <Button onClick={handleSubmit} className="bg-green-500 hover:bg-green-600 text-white">
            Soumettre ma Vision !
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default InteractiveFormView;