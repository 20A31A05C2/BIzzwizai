import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { Atom, LogIn, User, KeyRound, Eye, EyeOff, Mail } from 'lucide-react';
import ApiService from '@/apiService';
import Navbar from '../layout/Navbar';
import { useTranslation } from 'react-i18next';

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResetMode, setIsResetMode] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    const token = localStorage.getItem('bizwizusertoken');
    const userRole = localStorage.getItem('bizzwiz-userRole');
    if (token && userRole === 'user') {
      navigate('/select-project');
    } else if (token && userRole === 'admin') {
      navigate('/admindashboard');
    }
  }, [navigate]);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await ApiService('/login', 'POST', { email, password });

      if (response.success) {
        localStorage.setItem('bizwizusertoken', response.data.token);
        localStorage.setItem('bizzwiz-userRole', response.data.user.role);
        localStorage.setItem('bizzwiz-userId', response.data.user.id);

        toast({
          title: t("login.success.title"),
          description: t(`login.success.description.${response.data.user.role === 'admin' ? 'admin' : 'user'}`),
          variant: 'default',
        });

        setTimeout(() => {
          if (isMounted) {
            setIsLoading(false);
            if (response.data.user.role === 'admin') {
              navigate('/admindashboard', { replace: true });
            } else {
              navigate('/select-project', { replace: true });
            }
          }
        }, 1000);
      } else {
        throw new Error(response.message || t('login.error.invalidCredentials'));
      }
    } catch (error) {
      setIsLoading(false);
      
      let errorMessage = t('login.error.generic');
      let errorTitle = t('login.error.title');
      
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        if (errors.email) {
          errorTitle = t('login.error.email.title');
          if (errors.email.includes('not found') || errors.email.includes('does not exist')) {
            errorMessage = t('login.error.email.notFound');
          } else if (errors.email.includes('required')) {
            errorMessage = t('login.error.email.required');
          } else if (errors.email.includes('format')) {
            errorMessage = t('login.error.email.invalidFormat');
          } else {
            errorMessage = errors.email;
          }
        } else if (errors.password) {
          errorTitle = t('login.error.password.title');
          if (errors.password.includes('incorrect') || errors.password.includes('wrong')) {
            errorMessage = t('login.error.password.incorrect');
          } else if (errors.password.includes('required')) {
            errorMessage = t('login.error.password.required');
          } else if (errors.password.includes('min')) {
            errorMessage = t('login.error.password.minLength');
          } else {
            errorMessage = errors.password;
          }
        } else if (errors.credentials) {
          errorTitle = t('login.error.credentials.title');
          errorMessage = t('login.error.credentials.invalid');
        } else if (errors.account) {
          errorTitle = t('login.error.account.title');
          errorMessage = t('login.error.account.unverified');
        } else if (errors.suspended) {
          errorTitle = t('login.error.account.title');
          errorMessage = t('login.error.account.suspended');
        } else {
          errorMessage = error.response.data.message || t('login.error.checkCredentials');
        }
      } else if (error.response?.status === 401) {
        errorTitle = t('login.error.accessDenied.title');
        errorMessage = t('login.error.accessDenied.message');
      } else if (error.response?.status === 422) {
        errorTitle = t('login.error.invalidData.title');
        errorMessage = t('login.error.invalidData.message');
      } else if (error.response?.status === 429) {
        errorTitle = t('login.error.tooManyAttempts.title');
        errorMessage = t('login.error.tooManyAttempts.message');
      } else if (error.response?.status === 500) {
        errorTitle = t('login.error.server.title');
        errorMessage = t('login.error.server.message');
      } else if (error.message) {
        if (error.message.toLowerCase().includes('email')) {
          errorTitle = t('login.error.email.title');
          if (error.message.toLowerCase().includes('not found') || error.message.toLowerCase().includes('doesn\'t exist')) {
            errorMessage = t('login.error.email.notFound');
          } else if (error.message.toLowerCase().includes('invalid')) {
            errorMessage = t('login.error.email.invalidFormat');
          } else {
            errorMessage = error.message;
          }
        } else if (error.message.toLowerCase().includes('password')) {
          errorTitle = t('login.error.password.title');
          if (error.message.toLowerCase().includes('incorrect') || error.message.toLowerCase().includes('wrong')) {
            errorMessage = t('login.error.password.incorrect');
          } else {
            errorMessage = error.message;
          }
        } else if (error.message.toLowerCase().includes('credentials')) {
          errorTitle = t('login.error.credentials.title');
          errorMessage = t('login.error.credentials.invalid');
        } else if (error.message.toLowerCase().includes('network') || error.message.toLowerCase().includes('fetch')) {
          errorTitle = t('login.error.network.title');
          errorMessage = t('login.error.network.message');
        } else {
          errorMessage = error.message;
        }
      }

      toast({
        title: errorTitle,
        description: errorMessage,
        variant: 'destructive',
        duration: 7000,
      });
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: t('login.reset.emailRequired.title'),
        description: t('login.reset.emailRequired.message'),
        variant: 'destructive',
        duration: 7000,
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await ApiService('/forgot-password', 'POST', { email });
      if (response.success) {
        toast({
          title: t('login.reset.success.title'),
          description: t('login.reset.success.message'),
          variant: 'default',
          duration: 7000,
        });
        setIsResetMode(false);
      } else {
        throw new Error(response.message || t('login.reset.error.generic'));
      }
    } catch (error) {
      let errorTitle = t('login.reset.error.title');
      let errorMessage = t('login.reset.error.generic');
      
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        if (errors.email) {
          errorTitle = t('login.reset.error.email.title');
          if (errors.email.includes('not found') || errors.email.includes('does not exist')) {
            errorMessage = t('login.reset.error.email.notFound');
          } else if (errors.email.includes('required')) {
            errorMessage = t('login.reset.emailRequired.message');
          } else if (errors.email.includes('format')) {
            errorMessage = t('login.reset.error.email.invalidFormat');
          } else {
            errorMessage = errors.email;
          }
        } else if (errors.throttle) {
          errorTitle = t('login.reset.error.tooMany.title');
          errorMessage = t('login.reset.error.tooMany.message');
        } else {
          errorMessage = Object.values(errors).flat().join(' ');
        }
      } else if (error.response?.status === 404) {
        errorTitle = t('login.reset.error.email.title');
        errorMessage = t('login.reset.error.email.notFound');
      } else if (error.response?.status === 429) {
        errorTitle = t('login.reset.error.tooMany.title');
        errorMessage = t('login.reset.error.tooMany.message');
      } else if (error.response?.status === 500) {
        errorTitle = t('login.reset.error.server.title');
        errorMessage = t('login.reset.error.server.message');
      } else if (error.message) {
        if (error.message.toLowerCase().includes('not found') || error.message.toLowerCase().includes('doesn\'t exist')) {
          errorTitle = t('login.reset.error.email.title');
          errorMessage = t('login.reset.error.email.notFound');
        } else if (error.message.toLowerCase().includes('already sent') || error.message.toLowerCase().includes('throttle')) {
          errorTitle = t('login.reset.error.alreadySent.title');
          errorMessage = t('login.reset.error.alreadySent.message');
        } else if (error.message.toLowerCase().includes('network') || error.message.toLowerCase().includes('fetch')) {
          errorTitle = t('login.reset.error.network.title');
          errorMessage = t('login.reset.error.network.message');
        } else {
          errorMessage = error.message;
        }
      }
      
      toast({
        title: errorTitle,
        description: errorMessage,
        variant: 'destructive',
        duration: 7000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black font-montserrat">
      {/* Fixed navbar at top */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      
      {/* Main content with proper spacing from navbar */}
      <div className="pt-24 pb-8 px-4 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Login Container */}
          <motion.div
            key={isResetMode ? 'reset' : 'login'}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-1/2 bg-bizzwiz-glass-bg/60 backdrop-blur-2xl p-8 rounded-xl shadow-lg shadow-bizzwiz-magenta-flare/20 border border-bizzwiz-electric-cyan/20"
          >
            <div className="text-center mb-8">
              <img 
                alt={t('login.imageAlt')} 
                className="w-32 h-32 md:w-40 md:h-40 object-contain mx-auto drop-shadow-[0_0_15px_rgba(159,67,242,0.5)]"
                src="/bee.png" 
              />
              <h2 className="text-2xl font-bold text-white mt-4">{isResetMode ? t('login.reset.title') : t('login.title')}</h2>
            </div>

            <form onSubmit={isResetMode ? handleForgotPassword : handleLogin} className="space-y-6">
              <div>
                <Label htmlFor="email" className="text-bizzwiz-text-alt text-sm font-medium">{t('login.email.label')}</Label>
                <div className="relative mt-2">
                  <Input
                    id="email"
                    type="email"
                    placeholder={t('login.email.placeholder')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/10 border-bizzwiz-electric-cyan/30 text-white placeholder-bizzwiz-comet-tail pl-12 pr-4 py-3 rounded-lg focus:bg-white/15 focus:border-bizzwiz-electric-cyan focus:outline-none focus:ring-2 focus:ring-bizzwiz-electric-cyan/50 transition-all duration-300"
                    disabled={isLoading}
                    required
                  />
                  <User size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-bizzwiz-electric-cyan" />
                </div>
              </div>

              {!isResetMode && (
                <div>
                  <Label htmlFor="password" className="text-bizzwiz-text-alt text-sm font-medium">{t('login.password.label')}</Label>
                  <div className="relative mt-2">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder={t('login.password.placeholder')}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white/10 border-bizzwiz-electric-cyan/30 text-white placeholder-bizzwiz-comet-tail pl-12 pr-12 py-3 rounded-lg focus:bg-white/15 focus:border-bizzwiz-electric-cyan focus:outline-none focus:ring-2 focus:ring-bizzwiz-electric-cyan/50 transition-all duration-300"
                      disabled={isLoading}
                      required
                    />
                    <KeyRound size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-bizzwiz-electric-cyan" />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-bizzwiz-comet-tail hover:text-bizzwiz-electric-cyan hover:bg-white/10 rounded-md transition-all duration-300"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </Button>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-semibold py-3 rounded-lg transition-all transform hover:scale-105 disabled:transform-none disabled:opacity-50 shadow-lg hover:shadow-purple-600/25"
                disabled={isLoading}
                size="lg"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    {/* Custom Loading Spinner */}
                    <div className="relative w-6 h-6 mr-3">
                      {/* Outer ring */}
                      <div className="absolute inset-0 border-2 border-white/30 rounded-full"></div>
                      {/* Animated ring */}
                      <div className="absolute inset-0 border-2 border-transparent border-t-white rounded-full animate-spin"></div>
                      {/* Inner pulse */}
                      <div className="absolute inset-1 bg-white/20 rounded-full animate-pulse"></div>
                      {/* Center dot */}
                      <div className="absolute inset-2 bg-white rounded-full animate-ping"></div>
                    </div>
                    <span>{isResetMode ? t('login.reset.submitting') : t('login.submitting')}</span>
                  </div>
                ) : (
                  <>
                    {isResetMode ? <Mail size={20} className="mr-2" /> : <LogIn size={20} className="mr-2" />}
                    {isResetMode ? t('login.reset.submit') : t('login.submit')}
                  </>
                )}
              </Button>
            </form>

            <div className="mt-8 text-center space-y-4">
              {!isResetMode ? (
                <button
                  onClick={() => setIsResetMode(true)}
                  className="text-sm text-bizzwiz-comet-tail hover:text-bizzwiz-electric-cyan transition-colors underline font-medium"
                  disabled={isLoading}
                >
                  {t('login.forgotPassword')}
                </button>
              ) : (
                <button
                  onClick={() => setIsResetMode(false)}
                  className="text-sm text-bizzwiz-comet-tail hover:text-bizzwiz-electric-cyan transition-colors underline font-medium"
                  disabled={isLoading}
                >
                  {t('login.backToLogin')}
                </button>
              )}

              <div className="pt-4 border-t border-bizzwiz-electric-cyan/20">
                <p className="text-sm text-bizzwiz-comet-tail">
                  {t('login.noAccount')}{' '}
                  <Link
                    to="/register"
                    className="text-bizzwiz-electric-cyan hover:text-bizzwiz-magenta-flare transition-colors font-semibold underline"
                  >
                    {t('login.createAccount')}
                  </Link>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Instructions Container */}
          <div className="w-full lg:w-1/2 bg-bizzwiz-glass-bg/60 backdrop-blur-2xl p-8 rounded-xl shadow-lg shadow-bizzwiz-magenta-flare/20 border border-bizzwiz-electric-cyan/20">
            <h2 className="text-2xl font-bold text-white mb-8">{t('login.instructions.title')}</h2>
            <ol className="space-y-5 text-bizzwiz-comet-tail">
              <li className="flex items-start">
                <span className="mr-3 text-bizzwiz-electric-cyan font-bold text-lg">1.</span>
                <p className="text-sm leading-relaxed">{t('login.instructions.step1')}</p>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-bizzwiz-electric-cyan font-bold text-lg">2.</span>
                <p className="text-sm leading-relaxed">{t('login.instructions.step2')}</p>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-bizzwiz-electric-cyan font-bold text-lg">3.</span>
                <p className="text-sm leading-relaxed">{t('login.instructions.step3')}</p>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-bizzwiz-electric-cyan font-bold text-lg">4.</span>
                <p className="text-sm leading-relaxed">{t('login.instructions.step4')}</p>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-bizzwiz-electric-cyan font-bold text-lg">5.</span>
                <p className="text-sm leading-relaxed">{t('login.instructions.step5')}</p>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-bizzwiz-electric-cyan font-bold text-lg">6.</span>
                <p className="text-sm leading-relaxed">{t('login.instructions.step6')}</p>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-bizzwiz-electric-cyan font-bold text-lg">7.</span>
                <p className="text-sm leading-relaxed">{t('login.instructions.step7')}</p>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-bizzwiz-electric-cyan font-bold text-lg">8.</span>
                <p className="text-sm leading-relaxed">{t('login.instructions.step8')}</p>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;