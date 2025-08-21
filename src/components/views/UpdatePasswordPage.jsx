import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { Atom, KeyRound, Eye, EyeOff, ArrowLeft, User, CheckCircle, XCircle } from 'lucide-react';
import ApiService from '@/apiService';
import NavBar from '@/components/layout/Navbar';

const UpdatePasswordPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { token } = useParams(); // Get token from URL path
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Password validation rules
  const passwordRules = {
    minLength: 8,
    hasUppercase: /[A-Z]/,
    hasLowercase: /[a-z]/,
    hasNumber: /\d/,
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/
  };

  useEffect(() => {
    // Fetch user email or prefill based on token (optional, requires backend API)
    // For now, leave email editable as in ResetPasswordPage
  }, [token]);

  // Check password strength
  const checkPasswordStrength = (password) => {
    if (!password) return { score: 0, feedback: [] };
    
    const feedback = [];
    let score = 0;
    
    if (password.length >= passwordRules.minLength) {
      score += 1;
      feedback.push({ text: t('updatePassword.passwordStrength.minLength'), met: true });
    } else {
      feedback.push({ text: t('updatePassword.passwordStrength.minLength'), met: false });
    }
    
    if (passwordRules.hasUppercase.test(password)) {
      score += 1;
      feedback.push({ text: t('updatePassword.passwordStrength.uppercase'), met: true });
    } else {
      feedback.push({ text: t('updatePassword.passwordStrength.uppercase'), met: false });
    }
    
    if (passwordRules.hasLowercase.test(password)) {
      score += 1;
      feedback.push({ text: t('updatePassword.passwordStrength.lowercase'), met: true });
    } else {
      feedback.push({ text: t('updatePassword.passwordStrength.lowercase'), met: false });
    }
    
    if (passwordRules.hasNumber.test(password)) {
      score += 1;
      feedback.push({ text: t('updatePassword.passwordStrength.number'), met: true });
    } else {
      feedback.push({ text: t('updatePassword.passwordStrength.number'), met: false });
    }
    
    if (passwordRules.hasSpecialChar.test(password)) {
      score += 1;
      feedback.push({ text: t('updatePassword.passwordStrength.specialChar'), met: true });
    } else {
      feedback.push({ text: t('updatePassword.passwordStrength.specialChar'), met: false });
    }
    
    return { score, feedback };
  };

  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate form field
  const validateField = (name, value) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case 'email':
        if (!value.trim()) {
          newErrors[name] = t('updatePassword.errors.email.required');
        } else if (!validateEmail(value)) {
          newErrors[name] = t('updatePassword.errors.email.invalid');
        } else {
          delete newErrors[name];
        }
        break;
        
      case 'password':
        if (!value) {
          newErrors[name] = t('updatePassword.errors.password.required');
        } else if (value.length < passwordRules.minLength) {
          newErrors[name] = t('updatePassword.errors.password.minLength');
        } else {
          delete newErrors[name];
        }
        break;
        
      case 'passwordConfirmation':
        if (!value) {
          newErrors[name] = t('updatePassword.errors.passwordConfirmation.required');
        } else if (value !== password) {
          newErrors[name] = t('updatePassword.errors.passwordConfirmation.mismatch');
        } else {
          delete newErrors[name];
        }
        break;
        
      default:
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle field change with validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'passwordConfirmation') {
      setPasswordConfirmation(value);
    }
    
    // Validate field if it has been touched
    if (touched[name]) {
      validateField(name, value);
    }
  };

  // Handle field blur (mark as touched and validate)
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  // Check if form is complete and valid
  const isFormValid = () => {
    return (
      email.trim() &&
      password &&
      passwordConfirmation &&
      password === passwordConfirmation &&
      Object.keys(errors).length === 0
    );
  };

  // Get password strength info
  const passwordStrength = checkPasswordStrength(password);
  const passwordStrengthColor = passwordStrength.score >= 4 ? 'text-green-400' : 
                               passwordStrength.score >= 3 ? 'text-yellow-400' : 
                               passwordStrength.score >= 2 ? 'text-orange-400' : 'text-red-400';

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    
    // Mark all fields as touched and validate
    const allFields = ['email', 'password', 'passwordConfirmation'];
    const newTouched = {};
    allFields.forEach(field => {
      newTouched[field] = true;
      if (field === 'email') {
        validateField(field, email);
      } else if (field === 'password') {
        validateField(field, password);
      } else if (field === 'passwordConfirmation') {
        validateField(field, passwordConfirmation);
      }
    });
    setTouched(newTouched);
    
    if (!isFormValid()) {
      toast({
        title: t('updatePassword.errors.validationTitle'),
        description: t('updatePassword.errors.validationDescription'),
        variant: 'destructive',
        duration: 5000,
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
          title: t('updatePassword.successTitle'),
          description: t('updatePassword.successDescription'),
          variant: 'default',
        });
        setTimeout(() => {
          setIsLoading(false);
          navigate('/login');
        }, 2000);
      } else {
        throw new Error(response.message || t('updatePassword.errors.submitDefault'));
      }
    } catch (error) {
      let errorMessage = t('updatePassword.errors.submitDefault');
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: t('updatePassword.errors.submitTitle'),
        description: errorMessage,
        variant: 'destructive',
        duration: 7000,
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black font-montserrat">
      {/* Fixed navbar at top */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <NavBar />
      </div>
      
      {/* Main content with proper spacing from navbar */}
      <div className="pt-24 pb-8 px-4 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-7xl flex flex-col xl:flex-row gap-6 xl:gap-12">
          {/* Update Password Form Container */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full xl:w-1/2 bg-bizzwiz-glass-bg/60 backdrop-blur-2xl p-6 sm:p-8 rounded-xl shadow-lg shadow-bizzwiz-magenta-flare/20 border border-bizzwiz-electric-cyan/20"
          >
            <div className="text-center mb-6 sm:mb-8">
              <img 
                alt={t('footer.logoAlt')} 
                className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain mx-auto drop-shadow-[0_0_15px_rgba(159,67,242,0.5)]"
                src="/bee.png" 
              />
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-3 sm:mt-4">
                {t('updatePassword.title')}
              </h2>
              <p className="text-bizzwiz-comet-tail text-sm mt-2">
                {t('updatePassword.description')}
              </p>
            </div>

            <form onSubmit={handleUpdatePassword} className="space-y-5 sm:space-y-6">
              {/* Email Field */}
              <div>
                <Label htmlFor="email" className="text-bizzwiz-text-alt text-sm font-medium">
                  {t('updatePassword.emailLabel')} <span className="text-red-400">*</span>
                </Label>
                <div className="relative mt-2">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={t('updatePassword.emailPlaceholder')}
                    className={`w-full bg-white/10 border-bizzwiz-electric-cyan/30 text-white placeholder-bizzwiz-comet-tail pl-12 pr-4 py-3 rounded-lg focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-bizzwiz-electric-cyan/50 transition-all duration-300 ${
                      errors.email ? 'border-red-400 focus:ring-red-400/50' : 'focus:border-bizzwiz-electric-cyan'
                    }`}
                    disabled={isLoading}
                    required
                  />
                  <User size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-bizzwiz-electric-cyan pointer-events-none" />
                </div>
                {touched.email && errors.email && (
                  <div className="flex items-center mt-2 text-red-400 text-xs bg-red-400/10 px-2 py-1 rounded border border-red-400/20">
                    <XCircle size={14} className="mr-2 flex-shrink-0" />
                    <span>{errors.email}</span>
                  </div>
                )}
              </div>

              {/* Password Field */}
              <div>
                <Label htmlFor="password" className="text-bizzwiz-text-alt text-sm font-medium">
                  {t('updatePassword.passwordLabel')} <span className="text-red-400">*</span>
                </Label>
                <div className="relative mt-2">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="••••••••••••"
                    className={`w-full bg-white/10 border-bizzwiz-electric-cyan/30 text-white placeholder-bizzwiz-comet-tail pl-12 pr-12 py-3 rounded-lg focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-bizzwiz-electric-cyan/50 transition-all duration-300 ${
                      errors.password ? 'border-red-400 focus:ring-red-400/50' : 'focus:border-bizzwiz-electric-cyan'
                    }`}
                    disabled={isLoading}
                    required
                  />
                  <KeyRound size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-bizzwiz-electric-cyan pointer-events-none" />
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
                {touched.password && errors.password && (
                  <div className="flex items-center mt-2 text-red-400 text-xs bg-red-400/10 px-2 py-1 rounded border border-red-400/20">
                    <XCircle size={14} className="mr-2 flex-shrink-0" />
                    <span>{errors.password}</span>
                  </div>
                )}
                
                {/* Password Strength Indicator */}
                {password && (
                  <div className="mt-3 p-3 bg-white/5 rounded-lg border border-bizzwiz-electric-cyan/20">
                    <div className="flex items-center justify-between text-xs mb-3">
                      <span className="text-bizzwiz-comet-tail font-medium">{t('updatePassword.passwordStrength.label')}</span>
                      <span className={`font-bold ${passwordStrengthColor}`}>
                        {passwordStrength.score}/5
                      </span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          passwordStrength.score >= 4 ? 'bg-green-500' :
                          passwordStrength.score >= 3 ? 'bg-yellow-500' :
                          passwordStrength.score >= 2 ? 'bg-orange-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                      ></div>
                    </div>
                    
                    {/* Requirements List */}
                    <div className="space-y-2">
                      {passwordStrength.feedback.map((feedback, index) => (
                        <div key={index} className="flex items-center text-xs">
                          <div className="flex-shrink-0 w-4 h-4 mr-2">
                            {feedback.met ? (
                              <CheckCircle size={14} className="text-green-400 w-full h-full" />
                            ) : (
                              <XCircle size={14} className="text-red-400 w-full h-full" />
                            )}
                          </div>
                          <span className={`${feedback.met ? 'text-green-300' : 'text-red-300'}`}>
                            {feedback.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Password Confirmation Field */}
              <div>
                <Label htmlFor="passwordConfirmation" className="text-bizzwiz-text-alt text-sm font-medium">
                  {t('updatePassword.passwordConfirmationLabel')} <span className="text-red-400">*</span>
                </Label>
                <div className="relative mt-2">
                  <Input
                    id="passwordConfirmation"
                    name="passwordConfirmation"
                    type={showConfirmPassword ? "text" : "password"}
                    value={passwordConfirmation}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="••••••••••••"
                    className={`w-full bg-white/10 border-bizzwiz-electric-cyan/30 text-white placeholder-bizzwiz-comet-tail pl-12 pr-12 py-3 rounded-lg focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-bizzwiz-electric-cyan/50 transition-all duration-300 ${
                      errors.passwordConfirmation ? 'border-red-400 focus:ring-red-400/50' : 'focus:border-bizzwiz-electric-cyan'
                    }`}
                    disabled={isLoading}
                    required
                  />
                  <KeyRound size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-bizzwiz-electric-cyan pointer-events-none" />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-bizzwiz-comet-tail hover:text-bizzwiz-electric-cyan hover:bg-white/10 rounded-md transition-all duration-300"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </Button>
                </div>
                {touched.passwordConfirmation && errors.passwordConfirmation && (
                  <div className="flex items-center mt-2 text-red-400 text-xs bg-red-400/10 px-2 py-1 rounded border border-red-400/20">
                    <XCircle size={14} className="mr-2 flex-shrink-0" />
                    <span>{errors.passwordConfirmation}</span>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-semibold py-3 rounded-lg transition-all transform hover:scale-105 disabled:transform-none disabled:opacity-50 shadow-lg hover:shadow-purple-600/25"
                disabled={!isFormValid() || isLoading}
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
                {isLoading ? t('updatePassword.submitting') : t('updatePassword.submitButton')}
              </Button>
            </form>

            <div className="mt-6 sm:mt-8 text-center space-y-3 sm:space-y-4">
              <button
                onClick={() => navigate('/login')}
                className="text-sm text-bizzwiz-comet-tail hover:text-bizzwiz-electric-cyan transition-colors underline"
                disabled={isLoading}
              >
                <ArrowLeft size={16} className="inline mr-1" /> {t('updatePassword.backToLogin')}
              </button>

              <div className="pt-4 border-t border-bizzwiz-electric-cyan/20">
                <p className="text-sm text-bizzwiz-comet-tail">
                  {t('updatePassword.noAccount')}{' '}
                  <Link
                    to="/register"
                    className="text-bizzwiz-electric-cyan hover:text-bizzwiz-magenta-flare transition-colors font-semibold underline"
                  >
                    {t('updatePassword.createAccount')}
                  </Link>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Instructions Container */}
          <div className="w-full xl:w-1/2 bg-bizzwiz-glass-bg/60 backdrop-blur-2xl p-6 sm:p-8 rounded-xl shadow-lg shadow-bizzwiz-magenta-flare/20 border border-bizzwiz-electric-cyan/20">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8">{t('updatePassword.instructions.title')}</h2>
            <ol className="space-y-4 sm:space-y-5 text-bizzwiz-comet-tail">
              <li className="flex items-start">
                <span className="mr-3 text-bizzwiz-electric-cyan font-bold text-base sm:text-lg">1.</span>
                <p className="text-xs sm:text-sm leading-relaxed">{t('updatePassword.instructions.step1')}</p>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-bizzwiz-electric-cyan font-bold text-base sm:text-lg">2.</span>
                <p className="text-xs sm:text-sm leading-relaxed">{t('updatePassword.instructions.step2')}</p>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-bizzwiz-electric-cyan font-bold text-base sm:text-lg">3.</span>
                <p className="text-xs sm:text-sm leading-relaxed">{t('updatePassword.instructions.step3')}</p>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-bizzwiz-electric-cyan font-bold text-base sm:text-lg">4.</span>
                <p className="text-xs sm:text-sm leading-relaxed">{t('updatePassword.instructions.step4')}</p>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-bizzwiz-electric-cyan font-bold text-base sm:text-lg">5.</span>
                <p className="text-xs sm:text-sm leading-relaxed">{t('updatePassword.instructions.step5')}</p>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePasswordPage;