import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFormContext } from '@/contexts/FormContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserCircle, AtSign, Building, Lock, Eye, EyeOff, Atom, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import ApiService from '@/apiService';
import NavBar from '@/components/layout/Navbar';

const RegisterPage = () => {
  const { t } = useTranslation();
  const { formData, updateFormData, resetForm } = useFormContext();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  // Check password strength
  const checkPasswordStrength = (password) => {
    if (!password) return { score: 0, feedback: [] };
    
    const feedback = [];
    let score = 0;
    
    if (password.length >= passwordRules.minLength) {
      score += 1;
      feedback.push({ text: t('register.passwordStrength.minLength'), met: true });
    } else {
      feedback.push({ text: t('register.passwordStrength.minLength'), met: false });
    }
    
    if (passwordRules.hasUppercase.test(password)) {
      score += 1;
      feedback.push({ text: t('register.passwordStrength.uppercase'), met: true });
    } else {
      feedback.push({ text: t('register.passwordStrength.uppercase'), met: false });
    }
    
    if (passwordRules.hasLowercase.test(password)) {
      score += 1;
      feedback.push({ text: t('register.passwordStrength.lowercase'), met: true });
    } else {
      feedback.push({ text: t('register.passwordStrength.lowercase'), met: false });
    }
    
    if (passwordRules.hasNumber.test(password)) {
      score += 1;
      feedback.push({ text: t('register.passwordStrength.number'), met: true });
    } else {
      feedback.push({ text: t('register.passwordStrength.number'), met: false });
    }
    
    if (passwordRules.hasSpecialChar.test(password)) {
      score += 1;
      feedback.push({ text: t('register.passwordStrength.specialChar'), met: true });
    } else {
      feedback.push({ text: t('register.passwordStrength.specialChar'), met: false });
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
      case 'userName':
        if (!value.trim()) {
          newErrors[name] = t('register.errors.userName.required');
        } else if (value.trim().length < 2) {
          newErrors[name] = t('register.errors.userName.minLength');
        } else if (value.trim().length > 50) {
          newErrors[name] = t('register.errors.userName.maxLength');
        } else {
          delete newErrors[name];
        }
        break;
        
      case 'userEmail':
        if (!value.trim()) {
          newErrors[name] = t('register.errors.userEmail.required');
        } else if (!validateEmail(value)) {
          newErrors[name] = t('register.errors.userEmail.invalid');
        } else {
          delete newErrors[name];
        }
        break;
        
      case 'userPassword':
        if (!value) {
          newErrors[name] = t('register.errors.userPassword.required');
        } else if (value.length < passwordRules.minLength) {
          newErrors[name] = t('register.errors.userPassword.minLength');
        } else {
          delete newErrors[name];
        }
        break;
        
      case 'userPasswordConfirmation':
        if (!value) {
          newErrors[name] = t('register.errors.userPasswordConfirmation.required');
        } else if (value !== (formData?.userPassword || '')) {
          newErrors[name] = t('register.errors.userPasswordConfirmation.mismatch');
        } else {
          delete newErrors[name];
        }
        break;
        
      case 'userCompany':
        if (value && value.trim().length > 100) {
          newErrors[name] = t('register.errors.userCompany.maxLength');
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
    updateFormData({ [name]: value });
    
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

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const togglePasswordConfirmationVisibility = () => {
    setShowPasswordConfirmation((prev) => !prev);
  };

  const defaultFormData = {
    userName: '',
    userEmail: '',
    userPassword: '',
    userPasswordConfirmation: '',
    userCompany: ''
  };

  // Check if form is complete and valid
  const isFormValid = () => {
    const currentData = formData || defaultFormData;
    return (
      currentData.userName?.trim() &&
      currentData.userEmail?.trim() &&
      currentData.userPassword &&
      currentData.userPasswordConfirmation &&
      currentData.userPassword === currentData.userPasswordConfirmation &&
      Object.keys(errors).length === 0
    );
  };

  // Get password strength info
  const passwordStrength = checkPasswordStrength(formData?.userPassword || '');
  const passwordStrengthColor = passwordStrength.score >= 4 ? 'text-green-400' : 
                               passwordStrength.score >= 3 ? 'text-yellow-400' : 
                               passwordStrength.score >= 2 ? 'text-orange-400' : 'text-red-400';

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mark all fields as touched and validate
    const allFields = ['userName', 'userEmail', 'userPassword', 'userPasswordConfirmation'];
    const newTouched = {};
    allFields.forEach(field => {
      newTouched[field] = true;
      validateField(field, formData?.[field] || '');
    });
    setTouched(newTouched);
    
    if (!isFormValid()) {
      toast({
        title: t('register.errors.validationTitle'),
        description: t('register.errors.validationDescription'),
        variant: 'destructive',
        duration: 5000,
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const submitData = {
        fullname: formData?.userName?.trim(),
        email: formData?.userEmail?.trim(),
        password: formData?.userPassword,
        password_confirmation: formData?.userPasswordConfirmation,
        role: 'user',
      };

      const response = await ApiService('/register', 'POST', submitData);

      if (response.success) {
        localStorage.setItem('bizwizusertoken', response.data.token);
        localStorage.setItem('bizzwiz-userId', response.data.userId);
        toast({
          title: t('register.successTitle'),
          description: t('register.successDescription'),
          duration: 5000,
        });
        resetForm('register');
        navigate('/verify-email', { state: { email: formData?.userEmail } });
      } else {
        throw new Error(response.message || t('register.errors.submitDefault'));
      }
    } catch (error) {
      console.error('Registration error:', error);
      let errorMessage = t('register.errors.submitDefault');
      
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        if (errors.email) {
          errorMessage = t('register.errors.submitEmailUsed');
        } else if (errors.fullname) {
          errorMessage = t('register.errors.submitInvalidName');
        } else if (errors.password) {
          errorMessage = t('register.errors.submitInvalidPassword');
        } else if (errors.password_confirmation) {
          errorMessage = t('register.errors.submitPasswordMismatch');
        } else {
          errorMessage = Object.values(errors).flat().join(' ');
        }
      } else if (error.message) {
        if (error.message.includes('email')) {
          errorMessage = t('register.errors.submitEmailUsed');
        } else if (error.message.includes('password')) {
          errorMessage = t('register.errors.submitInvalidPassword');
        } else {
          errorMessage = error.message;
        }
      }
      
      toast({
        title: t('register.errors.submitTitle'),
        description: errorMessage,
        variant: 'destructive',
        duration: 7000,
      });
    } finally {
      setIsSubmitting(false);
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
          {/* Registration Form Container */}
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
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-3 sm:mt-4">Bizzwiz AI</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              {/* Full Name Field */}
              <div>
                <Label htmlFor="userName" className="text-bizzwiz-text-alt text-sm font-medium">
                  {t('contactUs.nameLabel')} <span className="text-red-400">*</span>
                </Label>
                <div className="relative mt-2">
                  <Input
                    id="userName"
                    name="userName"
                    value={formData?.userName ?? defaultFormData.userName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={t('contactUs.namePlaceholder')}
                    className={`w-full bg-white/10 border-bizzwiz-electric-cyan/30 text-white placeholder-bizzwiz-comet-tail pl-12 pr-4 py-3 rounded-lg focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-bizzwiz-electric-cyan/50 transition-all duration-300 ${
                      errors.userName ? 'border-red-400 focus:ring-red-400/50' : 'focus:border-bizzwiz-electric-cyan'
                    }`}
                    disabled={isSubmitting}
                    required
                  />
                  <UserCircle size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-bizzwiz-electric-cyan pointer-events-none" />
                </div>
                {touched.userName && errors.userName && (
                  <div className="flex items-center mt-2 text-red-400 text-xs bg-red-400/10 px-2 py-1 rounded border border-red-400/20">
                    <XCircle size={14} className="mr-2 flex-shrink-0" />
                    <span>{errors.userName}</span>
                  </div>
                )}
              </div>

              {/* Email Field */}
              <div>
                <Label htmlFor="userEmail" className="text-bizzwiz-text-alt text-sm font-medium">
                  {t('contactUs.emailLabel')} <span className="text-red-400">*</span>
                </Label>
                <div className="relative mt-2">
                  <Input
                    id="userEmail"
                    name="userEmail"
                    type="email"
                    value={formData?.userEmail ?? defaultFormData.userEmail}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={t('contactUs.emailPlaceholder')}
                    className={`w-full bg-white/10 border-bizzwiz-electric-cyan/30 text-white placeholder-bizzwiz-comet-tail pl-12 pr-4 py-3 rounded-lg focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-bizzwiz-electric-cyan/50 transition-all duration-300 ${
                      errors.userEmail ? 'border-red-400 focus:ring-red-400/50' : 'focus:border-bizzwiz-electric-cyan'
                    }`}
                    disabled={isSubmitting}
                    required
                  />
                  <AtSign size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-bizzwiz-electric-cyan pointer-events-none" />
                </div>
                {touched.userEmail && errors.userEmail && (
                  <div className="flex items-center mt-2 text-red-400 text-xs bg-red-400/10 px-2 py-1 rounded border border-red-400/20">
                    <XCircle size={14} className="mr-2 flex-shrink-0" />
                    <span>{errors.userEmail}</span>
                  </div>
                )}
              </div>

              {/* Password Field */}
              <div>
                <Label htmlFor="userPassword" className="text-bizzwiz-text-alt text-sm font-medium">
                  {t('register.passwordLabel')} <span className="text-red-400">*</span>
                </Label>
                <div className="relative mt-2">
                  <Input
                    id="userPassword"
                    name="userPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={formData?.userPassword ?? defaultFormData.userPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="••••••••••••"
                    className={`w-full bg-white/10 border-bizzwiz-electric-cyan/30 text-white placeholder-bizzwiz-comet-tail pl-12 pr-12 py-3 rounded-lg focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-bizzwiz-electric-cyan/50 transition-all duration-300 ${
                      errors.userPassword ? 'border-red-400 focus:ring-red-400/50' : 'focus:border-bizzwiz-electric-cyan'
                    }`}
                    disabled={isSubmitting}
                    required
                  />
                  <Lock size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-bizzwiz-electric-cyan pointer-events-none" />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-bizzwiz-comet-tail hover:text-bizzwiz-electric-cyan hover:bg-white/10 rounded-md transition-all duration-300"
                    onClick={togglePasswordVisibility}
                    disabled={isSubmitting}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </Button>
                </div>
                {touched.userPassword && errors.userPassword && (
                  <div className="flex items-center mt-2 text-red-400 text-xs bg-red-400/10 px-2 py-1 rounded border border-red-400/20">
                    <XCircle size={14} className="mr-2 flex-shrink-0" />
                    <span>{errors.userPassword}</span>
                  </div>
                )}
                
                {/* Password Strength Indicator */}
                {formData?.userPassword && (
                  <div className="mt-3 p-3 bg-white/5 rounded-lg border border-bizzwiz-electric-cyan/20">
                    <div className="flex items-center justify-between text-xs mb-3">
                      <span className="text-bizzwiz-comet-tail font-medium">{t('register.passwordStrength.label')}</span>
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
                <Label htmlFor="userPasswordConfirmation" className="text-bizzwiz-text-alt text-sm font-medium">
                  {t('register.passwordConfirmationLabel')} <span className="text-red-400">*</span>
                </Label>
                <div className="relative mt-2">
                  <Input
                    id="userPasswordConfirmation"
                    name="userPasswordConfirmation"
                    type={showPasswordConfirmation ? 'text' : 'password'}
                    value={formData?.userPasswordConfirmation ?? defaultFormData.userPasswordConfirmation}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="••••••••••••"
                    className={`w-full bg-white/10 border-bizzwiz-electric-cyan/30 text-white placeholder-bizzwiz-comet-tail pl-12 pr-12 py-3 rounded-lg focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-bizzwiz-electric-cyan/50 transition-all duration-300 ${
                      errors.userPasswordConfirmation ? 'border-red-400 focus:ring-red-400/50' : 'focus:border-bizzwiz-electric-cyan'
                    }`}
                    disabled={isSubmitting}
                    required
                  />
                  <Lock size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-bizzwiz-electric-cyan pointer-events-none" />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-bizzwiz-comet-tail hover:text-bizzwiz-electric-cyan hover:bg-white/10 rounded-md transition-all duration-300"
                    onClick={togglePasswordConfirmationVisibility}
                    disabled={isSubmitting}
                  >
                    {showPasswordConfirmation ? <EyeOff size={18} /> : <Eye size={18} />}
                  </Button>
                </div>
                {touched.userPasswordConfirmation && errors.userPasswordConfirmation && (
                  <div className="flex items-center mt-2 text-red-400 text-xs bg-red-400/10 px-2 py-1 rounded border border-red-400/20">
                    <XCircle size={14} className="mr-2 flex-shrink-0" />
                    <span>{errors.userPasswordConfirmation}</span>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-semibold py-3 rounded-lg transition-all transform hover:scale-105 disabled:transform-none disabled:opacity-50 shadow-lg hover:shadow-purple-600/25"
                disabled={!isFormValid() || isSubmitting}
                size="lg"
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                  >
                    <Atom size={20} className="mr-2" />
                  </motion.div>
                ) : (
                  <Atom size={20} className="mr-2" />
                )}
                {isSubmitting ? t('register.submitting') : t('register.submitButton')}
              </Button>
            </form>

            <div className="mt-6 sm:mt-8 text-center space-y-3 sm:space-y-4">
              <div className="pt-4 border-t border-bizzwiz-electric-cyan/20">
                <p className="text-sm text-bizzwiz-comet-tail">
                  {t('register.alreadyHaveAccount')}{' '}
                  <Link
                    to="/login"
                    className="text-bizzwiz-electric-cyan hover:text-bizzwiz-magenta-flare transition-colors font-semibold underline"
                  >
                    {t('register.loginLink')}
                  </Link>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Instructions Container */}
          <div className="w-full xl:w-1/2 bg-bizzwiz-glass-bg/60 backdrop-blur-2xl p-6 sm:p-8 rounded-xl shadow-lg shadow-bizzwiz-magenta-flare/20 border border-bizzwiz-electric-cyan/20">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8">{t('howItWorks.title')}</h2>
            <ol className="space-y-4 sm:space-y-5 text-bizzwiz-comet-tail">
              <li className="flex items-start">
                <span className="mr-3 text-bizzwiz-electric-cyan font-bold text-base sm:text-lg">1.</span>
                <p className="text-xs sm:text-sm leading-relaxed">{t('register.instructions.step1')}</p>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-bizzwiz-electric-cyan font-bold text-base sm:text-lg">2.</span>
                <p className="text-xs sm:text-sm leading-relaxed">{t('register.instructions.step2')}</p>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-bizzwiz-electric-cyan font-bold text-base sm:text-lg">3.</span>
                <p className="text-xs sm:text-sm leading-relaxed">{t('register.instructions.step3')}</p>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-bizzwiz-electric-cyan font-bold text-base sm:text-lg">4.</span>
                <p className="text-xs sm:text-sm leading-relaxed">{t('register.instructions.step4')}</p>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-bizzwiz-electric-cyan font-bold text-base sm:text-lg">5.</span>
                <p className="text-xs sm:text-sm leading-relaxed">{t('register.instructions.step5')}</p>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-bizzwiz-electric-cyan font-bold text-base sm:text-lg">6.</span>
                <p className="text-xs sm:text-sm leading-relaxed">{t('register.instructions.step6')}</p>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-bizzwiz-electric-cyan font-bold text-base sm:text-lg">7.</span>
                <p className="text-xs sm:text-sm leading-relaxed">{t('register.instructions.step7')}</p>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-bizzwiz-electric-cyan font-bold text-base sm:text-lg">8.</span>
                <p className="text-xs sm:text-sm leading-relaxed">{t('register.instructions.step8')}</p>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;