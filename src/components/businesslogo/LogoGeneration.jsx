import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, MessageCircle, CheckCircle, Send, Sparkles, Edit, Download, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import ApiService from '@/apiService'; // Adjust path to your ApiService
import ChatMessage from '@/components/multiStepForm/ChatMessage';
import { useTranslation } from 'react-i18next';

const LogoComponent = ({ setCurrentView }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [chatMessages, setChatMessages] = useState([
    { 
      id: '1', 
      type: 'ai', 
      content: t('logoComponent.welcomeMessage'), 
      timestamp: new Date() 
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedLogo, setSelectedLogo] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [logoExists, setLogoExists] = useState(false);
  const [existingLogoUrl, setExistingLogoUrl] = useState('');

  // States for actions panel
  const [isValidated, setIsValidated] = useState(false);
  const [showValidationDialog, setShowValidationDialog] = useState(false);
  const [remainingAIMods, setRemainingAIMods] = useState(3);

  const chatEndRef = useRef(null);

  // Check if logo already exists for this project and fetch status
  useEffect(() => {
    const checkExistingLogo = async () => {
      const userId = localStorage.getItem('bizwizuser_id');
      const formDataId = localStorage.getItem('bizwiz_form_data_id');
      if (!userId || !formDataId) return;
      try {
        const response = await ApiService('/generate-logo', 'POST', { user_id: userId, form_data_id: formDataId, prompt: 'check' });
        if (response.logo_url) {
          setLogoExists(true);
          setExistingLogoUrl(response.logo_url);
          setSelectedLogo(response.logo_url);
          setChatMessages([
            {
              id: 'existing-logo',
              type: 'ai',
              content: t('logoComponent.existingLogoMessage'),
              timestamp: new Date(),
              logoUrl: response.logo_url,
            }
          ]);
        }
        // Fetch logo modification status
        const status = await ApiService('/logo-modification-status', 'GET', { user_id: userId, form_data_id: formDataId });
        if (status) {
          setRemainingAIMods(status.remaining_logo_ai_modifications ?? 3);
          setIsValidated(!!status.is_logo_validated);
        }
      } catch (err) {
        // ignore if not found
      }
    };
    checkExistingLogo();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const sendMessage = async () => {
    if (!currentMessage.trim() || logoExists) return;

    const userMessage = { 
      id: Date.now().toString(), 
      type: 'user', 
      content: currentMessage, 
      timestamp: new Date() 
    };
    setChatMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsTyping(true);

    try {
      // Persist the base prompt for future modifications
      try {
        if (!localStorage.getItem('bizwiz_logo_base_prompt')) {
          localStorage.setItem('bizwiz_logo_base_prompt', userMessage.content);
        }
      } catch {}

      const response = await ApiService('/generate-logo', 'POST', { 
        user_id: localStorage.getItem('bizwizuser_id'), 
        form_data_id: localStorage.getItem('bizwiz_form_data_id'),
        prompt: currentMessage 
      });
      if (response.logo_url) {
        setLogoExists(true);
        setExistingLogoUrl(response.logo_url);
        setSelectedLogo(response.logo_url);
      }
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: response.logo_url
          ? t('logoComponent.successMessage')
          : (response.error || t('logoComponent.errorMessage')),
        timestamp: new Date(),
        logoUrl: response.logo_url,
      };
      setChatMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: err.error || `${t('logoComponent.errorPrefix')} ${err.message || t('logoComponent.errorFallback')}. ${t('logoComponent.errorRetry')}`,
        timestamp: new Date(),
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const selectLogo = (logoUrl) => {
    setSelectedLogo(logoUrl);
    setIsEditing(false);
  };

  const editLogo = () => {
    setIsEditing(true);
    setSelectedLogo('');
  };

  // Download logo as PNG (fetch as blob, then download)
  const downloadLogo = async () => {
    if (!existingLogoUrl) return;
    try {
      const response = await fetch(existingLogoUrl, { mode: 'cors' });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = t('logoComponent.downloadFileName');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert(t('logoComponent.downloadError'));
    }
  };

  // Back button handler
  const handleBack = () => {
    if (navigate) {
      navigate('/plan');
    } else if (typeof setCurrentView === 'function') {
      setCurrentView('business');
    }
  };

  // Validation confirm with backend and navigate to /slogan
  const handleValidate = () => setShowValidationDialog(true);
  const confirmValidation = async () => {
    try {
      const userId = localStorage.getItem('bizwizuser_id');
      const formDataId = localStorage.getItem('bizwiz_form_data_id');
      await ApiService('/validate-logo', 'POST', { user_id: userId, form_data_id: formDataId });
      setIsValidated(true);
      setShowValidationDialog(false);
      if (navigate) {
        navigate('/slogan');
      } else if (typeof setCurrentView === 'function') {
        setCurrentView('slogan');
      }
    } catch (err) {
      // ignore
    }
  };

  // Request AI modification of logo (max 3)
  const sendLogoModification = async () => {
    if (!currentMessage.trim() || remainingAIMods === 0) return;

    const userMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: currentMessage,
      timestamp: new Date(),
    };
    setChatMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    try {
      const userId = localStorage.getItem('bizwizuser_id');
      const formDataId = localStorage.getItem('bizwiz_form_data_id');
      const basePrompt = localStorage.getItem('bizwiz_logo_base_prompt') || '';
      const response = await ApiService('/request-logo-ai-modification', 'POST', {
        user_id: userId,
        form_data_id: formDataId,
        modification_prompt: currentMessage,
        base_logo_prompt: basePrompt,
        existing_logo_url: existingLogoUrl,
      });
      setCurrentMessage('');
      if (response.logo_url) {
        setLogoExists(true);
        setExistingLogoUrl(response.logo_url);
        setSelectedLogo(response.logo_url);
      }
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: response.logo_url ? t('logoComponent.modificationSuccess') : (response.error || t('logoComponent.modificationError')),
        timestamp: new Date(),
        logoUrl: response.logo_url,
      };
      setChatMessages(prev => [...prev, aiMessage]);
      // Update remainingAIMods from response or fallback by refetching
      if (typeof response.remaining_modifications === 'number') {
        setRemainingAIMods(response.remaining_modifications);
      } else {
        try {
          const status = await ApiService('/logo-modification-status', 'GET', { user_id: userId, form_data_id: formDataId });
          if (status) setRemainingAIMods(status.remaining_logo_ai_modifications ?? 0);
        } catch {}
      }
      // Any modification un-validates the logo
      setIsValidated(false);
    } catch (err) {
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: err.error || `${t('logoComponent.errorPrefix')} ${err.message || t('logoComponent.errorFallback')}.`,
        timestamp: new Date(),
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-var(--navbar-height,68px))] bg-black flex items-center justify-center p-4 sm:p-6 md:p-8" role="main" aria-label={t('logoComponent.ariaLabel')}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-7xl bg-white/10 backdrop-blur-3xl rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8 md:p-10"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl font-montserrat font-bold text-white mb-2"
            >
              {t('logoComponent.title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-gray-300 text-base sm:text-lg font-montserrat"
            >
              {t('logoComponent.subtitle')}
            </motion.p>
          </div>
          <Button onClick={handleBack} className="bg-white/20 text-white border border-white/30 hover:bg-white/30 font-montserrat" aria-label={t('logoComponent.backAriaLabel')}>
            <ArrowLeft className="w-5 h-5 mr-2" /> {t('logoComponent.back')}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Chat and Logo Preview */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 bg-white/10 backdrop-blur-2xl rounded-3xl shadow-lg border border-white/20 p-6 md:p-8"
            role="region"
            aria-label={t('logoComponent.chatAriaLabel')}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white font-montserrat">{t('logoComponent.chatTitle')}</h2>
                <p className="text-sm text-gray-300 font-montserrat">{t('logoComponent.chatSubtitle')}</p>
              </div>
            </div>

            {/* Chat area */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 mb-6 h-64 md:h-96 overflow-y-auto border border-white/20 hover:border-white/40 transition-all duration-300" role="log" aria-live="polite">
              {chatMessages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message.content}
                  logoUrl={message.logoUrl}
                />
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <ChatMessage message="..." />
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Logo preview if exists */}
            {logoExists && (
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 mb-6 border border-white/20" role="region" aria-label={t('logoComponent.logoPreviewAriaLabel')}>
                <div className="flex flex-col items-center gap-4">
                  <img src={existingLogoUrl} alt={t('logoComponent.logoAlt')} className="w-32 h-32 rounded-xl border-2 border-white/30" />
                  <div className="flex gap-2">
                    <Button onClick={downloadLogo} className="bg-white/20 text-white border border-white/30 hover:bg-white/30 font-montserrat" aria-label={t('logoComponent.downloadAriaLabel')}>
                      <Download className="w-5 h-5 mr-2" /> {t('logoComponent.download')}
                    </Button>
                    <Button onClick={handleBack} className="bg-white/20 text-white border border-white/30 hover:bg-white/30 font-montserrat" aria-label={t('logoComponent.backAriaLabel')}>
                      <ArrowLeft className="w-5 h-5 mr-2" /> {t('logoComponent.back')}
                    </Button>
                  </div>
                  <p className="text-gray-300 text-sm font-montserrat">{t('logoComponent.singleLogoMessage')}</p>
                </div>
              </div>
            )}

            {/* Input composer (disabled when logo exists) */}
            {!logoExists && (
              <div className="flex gap-3">
                <input
                  type="text"
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30"
                  placeholder={t('logoComponent.inputPlaceholder')}
                  disabled={logoExists}
                  aria-label={t('logoComponent.inputAriaLabel')}
                />
                <Button 
                  onClick={sendMessage}
                  disabled={!currentMessage.trim() || isTyping || logoExists}
                  className="bg-white/20 text-white border border-white/30 hover:bg-white/30 disabled:opacity-50"
                  aria-label={t('logoComponent.sendAriaLabel')}
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            )}
          </motion.div>

          {/* Right: Actions Panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
            role="complementary"
            aria-label={t('logoComponent.actionsAriaLabel')}
          >
            {/* Validation */}
            <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-lg border border-white/20 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-500/20 backdrop-blur-sm rounded-lg border border-green-500/30">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-white font-montserrat">{t('logoComponent.validationTitle')}</h3>
              </div>
              <p className="text-sm text-gray-300 font-montserrat mb-4">
                {t('logoComponent.validationDescription')}
              </p>
              <Button
                onClick={handleValidate}
                disabled={isValidated || !logoExists}
                className="w-full bg-green-600/20 backdrop-blur-sm text-green-300 font-bold py-3 rounded-xl hover:bg-green-600/30 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 font-montserrat border border-green-500/30"
                aria-label={isValidated ? t('logoComponent.validatedAriaLabel') : t('logoComponent.validateAriaLabel')}
              >
                <CheckCircle className="w-4 h-4" />
                {isValidated ? t('logoComponent.validated') : t('logoComponent.validateButton')}
              </Button>
            </div>

            {/* AI Modification */}
            <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-lg border border-white/20 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500/20 backdrop-blur-sm rounded-lg border border-blue-500/30">
                  <MessageCircle className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white font-montserrat">{t('logoComponent.aiModificationTitle')}</h3>
              </div>
              <p className="text-sm text-gray-300 font-montserrat mb-4">
                {t('logoComponent.aiModificationDescription', { remaining: remainingAIMods })}
              </p>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendLogoModification()}
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30"
                  placeholder={t('logoComponent.modificationPlaceholder')}
                  disabled={remainingAIMods === 0}
                  aria-label={t('logoComponent.modificationInputAriaLabel')}
                />
                <Button
                  onClick={sendLogoModification}
                  disabled={!currentMessage.trim() || remainingAIMods === 0}
                  className="bg-white/20 text-white border border-white/30 hover:bg-white/30 disabled:opacity-50"
                  aria-label={t('logoComponent.modifyAriaLabel')}
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Validation Alert Dialog */}
      <AlertDialog open={showValidationDialog} onOpenChange={setShowValidationDialog}>
        <AlertDialogContent className="bg-white/10 backdrop-blur-3xl border border-white/20">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white font-montserrat">
              {t('logoComponent.validationDialogTitle')}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-300 font-montserrat">
              {t('logoComponent.validationDialogDescription')}
              <br /><br />
              <strong className="text-red-400">{t('logoComponent.validationWarning')}</strong> {t('logoComponent.validationNoReturn')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 font-montserrat" aria-label={t('logoComponent.cancelValidationAriaLabel')}>
              {t('logoComponent.cancelValidation')}
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmValidation}
              className="bg-green-600/20 backdrop-blur-sm text-green-300 border border-green-500/30 hover:bg-green-600/30 font-montserrat"
              aria-label={t('logoComponent.confirmValidationAriaLabel')}
            >
              {t('logoComponent.confirmValidation')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <style>{`
        .font-montserrat { font-family: 'Montserrat', sans-serif; }
      `}</style>
    </div>
  );
};

export default LogoComponent;