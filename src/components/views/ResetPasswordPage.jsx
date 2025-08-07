import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { Atom, KeyRound, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import ApiService from '@/apiService';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { token } = useParams(); // Get token from URL path
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Optionally prefill email if available from reset link context (e.g., via email parameter)
    // This would require the forgot password email to include email as a query param
  }, []);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!email || !password || !passwordConfirmation) {
      toast({
        title: "Champs Requis",
        description: "Veuillez remplir tous les champs.",
        variant: 'destructive',
      });
      return;
    }

    if (password !== passwordConfirmation) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas.",
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await ApiService('/reset-password', 'POST', {
        token,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      if (response.success) {
        toast({
          title: "Mot de Passe Réinitialisé",
          description: "Votre mot de passe a été réinitialisé avec succès. Redirection vers la connexion...",
          variant: 'default',
        });
        setTimeout(() => {
          setIsLoading(false);
          navigate('/login');
        }, 2000);
      } else {
        throw new Error(response.message || 'Échec de la réinitialisation du mot de passe.');
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: error.response?.data?.message || 'Le lien de réinitialisation est invalide ou a expiré.',
        variant: 'destructive',
      });
      setIsLoading(false);
    }
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
            transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 3 }}
          >
            <Atom size={52} className="mx-auto text-bizzwiz-electric-cyan mb-3 text-glow-electric-cyan" />
          </motion.div>
          <h1 className="text-3xl font-orbitron font-bold text-bizzwiz-star-white mb-1">
            Réinitialisation du Mot de Passe
          </h1>
          <p className="text-bizzwiz-comet-tail text-sm">
            Créez un nouveau mot de passe pour accéder à votre compte.
          </p>
        </div>

        <form onSubmit={handleResetPassword} className="space-y-6">
          <div>
            <Label htmlFor="email" className="text-bizzwiz-comet-tail/90">Adresse Email Galactique</Label>
            <Input
              id="email"
              type="email"
              icon={<User size={16} />}
              placeholder="nom.utilisateur@galaxie.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="futuristic-input mt-1.5"
              disabled={isLoading}
              required
            />
          </div>

          <div>
            <Label htmlFor="password">Nouveau Mot de Passe Stellaire</Label>
            <div className="relative mt-1.5">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                icon={<KeyRound size={16} />}
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
          </div>

          <div>
            <Label htmlFor="passwordConfirmation">Confirmer Mot de Passe</Label>
            <div className="relative mt-1.5">
              <Input
                id="passwordConfirmation"
                type={showConfirmPassword ? "text" : "password"}
                icon={<KeyRound size={16} />}
                placeholder="••••••••••••"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
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
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              >
                <Atom size={20} className="mr-2" />
              </motion.div>
            ) : (
              <KeyRound size={20} className="mr-2" />
            )}
            Réinitialiser le Mot de Passe
          </Button>
        </form>

        <div className="mt-6 text-center space-y-3">
          <button
            onClick={() => navigate('/login')}
            className="text-sm text-bizzwiz-comet-tail hover:text-bizzwiz-electric-cyan transition-colors underline"
            disabled={isLoading}
          >
            <ArrowLeft size={16} className="inline mr-1" /> Retour à la Connexion
          </button>

          <div className="pt-4 border-t border-bizzwiz-electric-cyan/20">
            <p className="text-sm text-bizzwiz-comet-tail">
              Pas encore de compte ?{' '}
              <Link
                to="/register"
                className="text-bizzwiz-electric-cyan hover:text-bizzwiz-magenta-flare transition-colors font-medium underline"
              >
                Créer un compte
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPasswordPage;