import React, { useState } from 'react';
import { useFormContext } from '@/contexts/FormContext';
import StepButton from '@/components/multiStepForm/StepButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserCircle, AtSign, Briefcase, Building, Lock, Eye, EyeOff } from 'lucide-react';

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
    <div className="flex flex-col h-full">
      <div className="flex-grow space-y-6">
        <div className="text-center mb-8">
          <UserCircle className="w-12 h-12 text-bizzwiz-accent mx-auto mb-3 opacity-80" />
          <h2 className="text-2xl font-bold text-gradient-bizzwiz">Faisons connaissance</h2>
          <p className="text-bizzwiz-text-alt">Quelques informations pour mieux vous accompagner.</p>
        </div>
        
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
            <Label htmlFor="userRole" className="text-bizzwiz-text-alt text-sm font-medium block mb-1.5">Votre rôle (Optionnel)</Label>
            <Input
              id="userRole"
              name="userRole"
              value={formData.userRole}
              onChange={handleChange}
              placeholder="Ex: Fondateur, Chef de projet..."
              icon={<Briefcase size={18} />}
              className="form-input"
            />
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
      </div>

      <div className="mt-auto pt-6 flex justify-between">
        <StepButton onClick={prevStep} variant="secondary">Précédent</StepButton>
        <StepButton onClick={nextStep} disabled={!isFormComplete}>Suivant</StepButton>
      </div>
    </div>
  );
};

export default StepUserInfo;