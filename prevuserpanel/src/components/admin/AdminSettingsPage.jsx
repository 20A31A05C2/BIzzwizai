import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MailCheck, UserCog, Save, Send, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import ApiService from '@/apiService';

const AdminSettingsPage = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingAdmin, setIsSavingAdmin] = useState(false);
  const [isSavingEmail, setIsSavingEmail] = useState(false);
  const [isTesting, setIsTesting] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  const [adminInfo, setAdminInfo] = useState({
    admin_email: '',
    admin_password: '',
    admin_password_confirmation: '',
  });

  const [emailSettings, setEmailSettings] = useState({
    mail_host: '',
    mail_port: '',
    mail_username: '',
    mail_password: '',
    mail_encryption: '',
    mail_from_address: '',
    mail_from_name: '',
  });

  const [testEmail, setTestEmail] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('bizwizusertoken');
      const response = await ApiService('/adminsettings', 'GET', null, false, token);

      if (response.success) {
        setAdminInfo((prev) => ({
          ...prev,
          ...response.data.admin_info,
        }));
        setEmailSettings(response.data.email_settings);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les paramètres',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminChange = (e) => {
    setAdminInfo({ ...adminInfo, [e.target.id]: e.target.value });
  };

  const handleEmailChange = (e) => {
    setEmailSettings({ ...emailSettings, [e.target.id]: e.target.value });
  };

  const saveAdminSettings = async () => {
    if (adminInfo.admin_password !== adminInfo.admin_password_confirmation) {
      toast({
        title: 'Erreur',
        description: 'Les mots de passe ne correspondent pas.',
        variant: 'destructive',
      });
      return;
    }

    setIsSavingAdmin(true);
    try {
      const token = localStorage.getItem('bizwizusertoken');
      const response = await ApiService('/update-admin', 'POST', adminInfo, false, token);

      if (response.success) {
        toast({ title: 'Succès', description: 'Informations sauvegardées', variant: 'success' });
      }
    } catch (error) {
      toast({
        title: 'Erreur',
        description: error.message || 'Erreur lors de la sauvegarde',
        variant: 'destructive',
      });
    } finally {
      setIsSavingAdmin(false);
    }
  };

  const saveEmailSettings = async () => {
    setIsSavingEmail(true);
    try {
      const token = localStorage.getItem('bizwizusertoken');
      const response = await ApiService('/update-email', 'POST', emailSettings, false, token);

      if (response.success) {
        toast({ title: 'Succès', description: 'Email sauvegardé', variant: 'success' });
      }
    } catch (error) {
      toast({
        title: 'Erreur',
        description: error.message || 'Erreur lors de la sauvegarde email',
        variant: 'destructive',
      });
    } finally {
      setIsSavingEmail(false);
    }
  };

  const testEmailConnection = async () => {
    if (!testEmail) {
      toast({
        title: 'Erreur',
        description: 'Veuillez entrer une adresse email de test',
        variant: 'destructive',
      });
      return;
    }

    setIsTesting(true);
    try {
      const token = localStorage.getItem('bizwizusertoken');
      const response = await ApiService('/test-email', 'POST', { test_email: testEmail }, false, token);

      if (response.success) {
        toast({ title: 'Succès', description: response.message, variant: 'success' });
      }
    } catch (error) {
      toast({
        title: 'Erreur',
        description: error.message || 'Impossible d\'envoyer l\'email',
        variant: 'destructive',
      });
    } finally {
      setIsTesting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-slate-300">
        Chargement des paramètres...
      </div>
    );
  }

  return (
    <motion.div
      className="space-y-10 max-w-4xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
    >
      {/* Admin Info */}
      <motion.div variants={itemVariants}>
        <Card className="bg-slate-800/70 border-slate-700">
          <CardHeader>
            <CardTitle className="text-xl text-slate-200 flex items-center">
              <UserCog size={22} className="mr-2.5 text-red-400" /> Informations de l'Administrateur
            </CardTitle>
            <CardDescription className="text-slate-400">
              Email et mot de passe pour l’administrateur.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="admin_email" className="text-slate-300">Adresse Email</Label>
              <Input
                id="admin_email"
                value={adminInfo.admin_email}
                onChange={handleAdminChange}
                className="mt-1 bg-slate-700 border-slate-600 text-slate-200"
              />
            </div>
            <div className="relative">
              <Label htmlFor="admin_password" className="text-slate-300">Mot de passe</Label>
              <Input
                id="admin_password"
                type={showPassword ? 'text' : 'password'}
                value={adminInfo.admin_password}
                onChange={handleAdminChange}
                className="mt-1 bg-slate-700 border-slate-600 text-slate-200 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-[38px] text-slate-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <div className="relative">
              <Label htmlFor="admin_password_confirmation" className="text-slate-300">Confirmer mot de passe</Label>
              <Input
                id="admin_password_confirmation"
                type={showConfirmPassword ? 'text' : 'password'}
                value={adminInfo.admin_password_confirmation}
                onChange={handleAdminChange}
                className="mt-1 bg-slate-700 border-slate-600 text-slate-200 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-2 top-[38px] text-slate-400"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <div className="col-span-1 md:col-span-2">
              <Button
                onClick={saveAdminSettings}
                disabled={isSavingAdmin}
                className="mt-2 bg-red-500 hover:bg-red-600 text-white font-semibold"
              >
                {isSavingAdmin ? 'Sauvegarde...' : 'Sauvegarder Admin'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Email Settings */}
      <motion.div variants={itemVariants}>
        <Card className="bg-slate-800/70 border-slate-700">
          <CardHeader>
            <CardTitle className="text-xl text-slate-200 flex items-center">
              <MailCheck size={22} className="mr-2.5 text-red-400" /> Paramètres Email SMTP
            </CardTitle>
            <CardDescription className="text-slate-400">
              Configuration SMTP pour l’envoi des emails.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { id: 'mail_host', label: 'SMTP Host' },
              { id: 'mail_port', label: 'SMTP Port' },
              { id: 'mail_username', label: 'Email utilisateur' },
              { id: 'mail_password', label: 'Mot de passe / App password' },
              { id: 'mail_encryption', label: 'Chiffrement (tls/ssl)' },
              { id: 'mail_from_address', label: 'Adresse Email Expéditeur' },
              { id: 'mail_from_name', label: 'Nom Expéditeur' },
            ].map(({ id, label }) => (
              <div key={id}>
                <Label htmlFor={id} className="text-slate-300">{label}</Label>
                <Input
                  id={id}
                  value={emailSettings[id]}
                  onChange={handleEmailChange}
                  className="mt-1 bg-slate-700 border-slate-600 text-slate-200"
                />
              </div>
            ))}
            <div className="col-span-1 md:col-span-2">
              <Button
                onClick={saveEmailSettings}
                disabled={isSavingEmail}
                className="mt-2 bg-red-500 hover:bg-red-600 text-white font-semibold"
              >
                {isSavingEmail ? 'Sauvegarde...' : 'Sauvegarder Email'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Test Email */}
      <motion.div variants={itemVariants}>
        <Card className="bg-slate-800/70 border-slate-700">
          <CardHeader>
            <CardTitle className="text-xl text-slate-200 flex items-center">
              <Send size={22} className="mr-2.5 text-green-400" /> Test Email SMTP
            </CardTitle>
            <CardDescription className="text-slate-400">
              Testez l’envoi avec votre configuration actuelle.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="test_email" className="text-slate-300">Email de test</Label>
              <Input
                id="test_email"
                type="email"
                placeholder="ex: test@example.com"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                className="mt-1 bg-slate-700 border-slate-600 text-slate-200"
              />
            </div>
            <Button
              onClick={testEmailConnection}
              disabled={isTesting}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              {isTesting ? 'Envoi en cours...' : 'Envoyer Email de Test'}
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default AdminSettingsPage;


