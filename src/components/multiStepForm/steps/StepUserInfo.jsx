import React, { useState } from 'react';
import { useFormContext } from '@/contexts/FormContext';
import StepButton from '@/components/multiStepForm/StepButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserCircle, AtSign, Briefcase, Building, Lock, Eye, EyeOff } from 'lucide-react';
import TopHeaderBar from '../TopHeaderBar';
import LevelHeader from '../LevelHeader';
import ProgressBar from '../ProgressBar';
import ChatMessage from '../ChatMessage';

const StepUserInfo = () => {
  const { formData, updateFormData, nextStep, prevStep } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    updateFormData({ [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const isFormComplete = formData.userName.trim() && formData.userEmail.trim() && formData.userPassword.trim();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-montserrat">
      {/* Top Header Bar */}
      <TopHeaderBar />

      {/* Level Header */}
      <LevelHeader />

      {/* Progress Bar */}
      <div className="px-4 sm:px-6 md:px-8 mb-8 sm:mb-10 w-full">
        <ProgressBar currentStep={2} totalSteps={11} />
      </div>

      {/* Main Content Container with White Glassmorphism */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 md:px-8">
        <div className="rounded-3xl bg-white/10 backdrop-blur-md border border-white/30 p-4 sm:p-6 md:p-8 max-w-lg sm:max-w-xl md:max-w-2xl w-full text-center shadow-[0_0_40px_rgba(168,85,247,0.35)]">
          <ChatMessage message="Donnez-nous vos informations." />
          
          <div className="space-y-6 text-left">
            <div className="space-y-5">
              <div>
                <Label htmlFor="userName" className="text-bizzwiz-text-alt text-sm font-medium block mb-1.5">Nom complet</Label>
                <Input
                  id="userName"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  placeholder="Ex: Jean Dupont"
                  icon={<UserCircle size={18} />}
                  className="form-input"
                />
              </div>
              <div>
                <Label htmlFor="userEmail" className="text-bizzwiz-text-alt text-sm font-medium block mb-1.5">Adresse e-mail</Label>
                <Input
                  id="userEmail"
                  name="userEmail"
                  type="email"
                  value={formData.userEmail}
                  onChange={handleChange}
                  placeholder="Ex: jean.dupont@email.com"
                  icon={<AtSign size={18} />}
                  className="form-input"
                />
              </div>
              <div className="relative">
                <Label htmlFor="userPassword" className="text-bizzwiz-text-alt text-sm font-medium block mb-1.5">Mot de passe</Label>
                <Input
                  id="userPassword"
                  name="userPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.userPassword}
                  onChange={handleChange}
                  placeholder="Entrez votre mot de passe"
                  icon={<Lock size={18} />}
                  className="form-input pr-10"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-10 text-bizzwiz-text-alt hover:text-bizzwiz-accent"
                  aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div>
                <Label htmlFor="userCompany" className="text-bizzwiz-text-alt text-sm font-medium block mb-1.5">Votre entreprise (Optionnel)</Label>
                <Input
                  id="userCompany"
                  name="userCompany"
                  value={formData.userCompany}
                  onChange={handleChange}
                  placeholder="Ex: BizzWiz AI Corp."
                  icon={<Building size={18} />}
                  className="form-input"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-between">
              <StepButton onClick={prevStep} variant="secondary">Précédent</StepButton>
              <StepButton onClick={nextStep} disabled={!isFormComplete}>Suivant</StepButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepUserInfo;