import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { Atom, UserPlus, User, KeyRound, Eye, EyeOff, Mail, CheckCircle } from 'lucide-react';
import ApiService from '@/apiService';

const AdminRegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: [],
  });

  useEffect(() => {
    const token = localStorage.getItem('bizwizusertoken');
    const userRole = localStorage.getItem('bizzwiz-userRole');
    if (token && userRole === 'user') {
      navigate('/select-project');
    } else if (token && userRole === 'admin') {
      navigate('/admindashboard');
    }
  }, [navigate]);

  const checkPasswordStrength = (password) => {
    let score = 0;
    const feedback = [];

    if (password.length >= 8) score += 1; else feedback.push('Au moins 8 caractères');
    if (/[A-Z]/.test(password)) score += 1; else feedback.push('Une majuscule');
    if (/[0-9]/.test(password)) score += 1; else feedback.push('Un chiffre');
    if (/[^A-Za-z0-9]/.test(password)) score += 1; else feedback.push('Un caractère spécial');

    setPasswordStrength({ score, feedback });
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field === 'password') checkPasswordStrength(value);
  };

  const validateForm = () => {
    if (!formData.fullname || !formData.email || !formData.password || !formData.confirmPassword) {
      toast({
        title: 'Champs Requis',
        description: 'Veuillez remplir tous les champs.',
        variant: 'destructive',
      });
      return false;
    }

    if (formData.fullname.trim().length < 2) {
      toast({
        title: 'Nom Invalide',
        description: 'Le nom complet doit contenir au moins 2 caractères.',
        variant: 'destructive',
      });
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'Mots de Passe Différents',
        description: 'Les mots de passe ne correspondent pas.',
        variant: 'destructive',
      });
      return false;
    }

    if (passwordStrength.score < 3) {
      toast({
        title: 'Mot de Passe Faible',
        description: 'Le mot de passe doit être plus fort pour assurer la sécurité.',
        variant: 'destructive',
      });
      return false;
    }

    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await ApiService('/register', 'POST', {
        fullname: formData.fullname.trim(),
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
        role: 'admin',
      });

      if (response.success) {
        localStorage.setItem('bizwizusertoken', response.data.token);
        localStorage.setItem('bizzwiz-userRole', response.data.user.role);
        localStorage.setItem('bizzwiz-userId', response.data.user.id);

        toast({
          title: 'Inscription Réussie',
          description: 'Compte administrateur créé avec succès.',
          variant: 'default',
        });

        navigate('/login');
      } else {
        throw new Error(response.message || 'Une erreur est survenue lors de l\'inscription');
      }
    } catch (error) {
      let errorMessage = 'Une erreur inattendue s\'est produite.';
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        if (errors.email) {
          errorMessage = 'Cette adresse email est déjà utilisée.';
        } else if (errors.password) {
          errorMessage = 'Le mot de passe doit contenir au moins 8 caractères.';
        } else if (errors.fullname) {
          errorMessage = 'Le nom complet est invalide.';
        } else {
          errorMessage = error.response.data.message || 'Veuillez vérifier les informations saisies.';
        }
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast({
        title: 'Erreur d\'Inscription',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength.score <= 2) return 'bg-red-500';
    if (passwordStrength.score <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength.score <= 2) return 'Faible';
    if (passwordStrength.score <= 3) return 'Moyen';
    return 'Fort';
  };

  return (
    <div className="min-h-[calc(100vh-var(--navbar-height,68px))] flex items-center justify-center p-4 bg-gradient-to-br from-bizzwiz-deep-space via-bizzwiz-nebula-purple/30 to-bizzwiz-deep-space">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md bg-bizzwiz-glass-bg/60 backdrop-blur-2xl p-8 sm:p-10 rounded-2xl shadow-2xl shadow-bizzwiz-magenta-flare/25 border border-bizzwiz-electric-cyan/25"
      >
        <div className="text-center mb-8">
          <motion.div
            animate={{ rotate: [0, 15, -10, 10, -5, 5, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 1.5, ease: 'easeInOut', repeat: Infinity, repeatDelay: 3 }}
          >
            <Atom size={52} className="mx-auto text-bizzwiz-electric-cyan mb-3 text-glow-electric-cyan" />
          </motion.div>
          <h1 className="text-3xl font-orbitron font-bold text-bizzwiz-star-white mb-1">Inscription Admin</h1>
          <p className="text-bizzwiz-comet-tail text-sm">Rejoignez l'univers BizzWiz AI.</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <Label htmlFor="fullname" className="text-bizzwiz-comet-tail/90">Nom Complet Galactique</Label>
            <Input
              id="fullname"
              type="text"
              icon={<User size={16} />}
              placeholder="Commandant Jean Dupont"
              value={formData.fullname}
              onChange={(e) => handleInputChange('fullname', e.target.value)}
              className="futuristic-input mt-1.5"
              disabled={isLoading}
              required
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-bizzwiz-comet-tail/90">Adresse Email Galactique</Label>
            <Input
              id="email"
              type="email"
              icon={<Mail size={16} />}
              placeholder="admin@galaxie.com"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="futuristic-input mt-1.5"
              disabled={isLoading}
              required
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-bizzwiz-comet-tail/90">Mot de Passe Stellaire</Label>
            <div className="relative mt-1.5">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                icon={<KeyRound size={16} />}
                placeholder="••••••••••••"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="futuristic-input pr-12"
                disabled={isLoading}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-bizzwiz-comet-tail hover:text-bizzwiz-electric-cyan hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </Button>
            </div>

            {formData.password && (
              <div className="mt-2 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-bizzwiz-comet-tail">Force du mot de passe :</span>
                  <span
                    className={`font-medium ${
                      passwordStrength.score <= 2
                        ? 'text-red-400'
                        : passwordStrength.score <= 3
                        ? 'text-yellow-400'
                        : 'text-green-400'
                    }`}
                  >
                    {getPasswordStrengthText()}
                  </span>
                </div>
                <div className="w-full bg-bizzwiz-deep-space/50 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                    style={{ width: `${(passwordStrength.score / 4) * 100}%` }}
                  />
                </div>
                {passwordStrength.feedback.length > 0 && (
                  <div className="text-xs text-bizzwiz-comet-tail">
                    Manque: {passwordStrength.feedback.join(', ')}
                  </div>
                )}
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="confirmPassword" className="text-bizzwiz-comet-tail/90">Confirmer le Mot de Passe</Label>
            <div className="relative mt-1.5">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                icon={<CheckCircle size={16} />}
                placeholder="••••••••••••"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className="futuristic-input pr-12"
                disabled={isLoading}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-bizzwiz-comet-tail hover:text-bizzwiz-electric-cyan hover:bg-transparent"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={isLoading}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </Button>
            </div>

            {formData.confirmPassword && formData.password && (
              <div className="mt-2 flex items-center text-xs">
                {formData.password === formData.confirmPassword ? (
                  <span className="text-green-400 flex items-center">
                    <CheckCircle size={14} className="mr-1" />
                    Les mots de passe correspondent
                  </span>
                ) : (
                  <span className="text-red-400">
                    Les mots de passe ne correspondent pas
                  </span>
                )}
              </div>
            )}
          </div>

          <Button
            type="submit"
            className="w-full futuristic-button bg-gradient-to-r from-bizzwiz-electric-cyan to-bizzwiz-magenta-flare text-bizzwiz-deep-space font-bold py-3 text-base shadow-lg hover:shadow-xl hover:shadow-bizzwiz-magenta-flare/40"
            disabled={isLoading}
            size="lg"
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
              >
                <Atom size={20} className="mr-2" />
              </motion.div>
            ) : (
              <UserPlus size={20} className="mr-2" />
            )}
            Créer un compte administrateur
          </Button>
        </form>

        <div className="mt-6 text-center">
          <div className="pt-4 border-t border-bizzwiz-electric-cyan/20">
            <p className="text-sm text-bizzwiz-comet-tail">
              Déjà un compte administrateur ?{' '}
              <Link
                to="/login"
                className="text-bizzwiz-electric-cyan hover:text-bizzwiz-magenta-flare transition-colors font-medium"
              >
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminRegisterPage;