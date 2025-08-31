import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Bot, MessageCircle, CheckCircle, Send, Download, ArrowLeft, Edit3, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
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
import ApiService from '@/apiService';
import ChatMessage from '@/components/multiStepForm/ChatMessage';
import { useTranslation } from 'react-i18next';
import LevelHeader from '@/components/multiStepForm/LevelHeader';
import TopHeaderBar from '@/components/multiStepForm/TopHeaderBar';

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <h1 className="text-2xl text-center text-gradient-bizzwiz font-montserrat">
          Something went wrong. Please try again later.
        </h1>
      );
    }
    return this.props.children;
  }
}

const LogoComponent = ({ setCurrentView }) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { t, i18n } = useTranslation();
  const [chatMessages, setChatMessages] = useState([
    {
      id: '1',
      type: 'ai',
      content: t('logo_maker.welcome_message', { defaultValue: 'Welcome! I can help you generate a logo based on your design choices. Please provide a description of what you want.' }),
      timestamp: new Date(),
    },
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedLogo, setSelectedLogo] = useState('');
  const [logoExists, setLogoExists] = useState(false);
  const [existingLogoUrl, setExistingLogoUrl] = useState('');
  const [isValidated, setIsValidated] = useState(false);
  const [showValidationDialog, setShowValidationDialog] = useState(false);
  const [showAIModificationModal, setShowAIModificationModal] = useState(false);
  const [aiModificationPrompt, setAiModificationPrompt] = useState('');
  const [aiModificationLoading, setAiModificationLoading] = useState(false);
  const [modificationStatus, setModificationStatus] = useState({
    logo_ai_modification_count: 0,
    remaining_logo_ai_modifications: 2,
    is_logo_validated: false,
    logo_url: null,
    current_credits: 0,
    can_use_ai: true
  });
  const chatEndRef = useRef(null);

  // Extract data from state or localStorage
  const [colorPalette, setColorPalette] = useState([]);
  const [font, setFont] = useState('');
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Determine if the language is RTL (e.g., Arabic)
  const isRtl = i18n.language === 'ar';

  // Fetch required data on component mount
  useEffect(() => {
    const fetchRequiredData = async () => {
      const userId = localStorage.getItem('bizwizuser_id');
      const formDataId = localStorage.getItem('bizwiz_form_data_id');

      if (!userId || !formDataId) {
        navigate('/login');
        return;
      }

      try {
        // Fetch design modification status to get color palette
        const designStatus = await ApiService('/design-modification-status', 'GET', {
          user_id: userId,
          form_data_id: formDataId,
        });

        if (designStatus.color_palette && Array.isArray(designStatus.color_palette)) {
          setColorPalette(designStatus.color_palette);
        }

        // Fetch font selection status
        const fontStatus = await ApiService('/font-selection-status', 'GET', {
          user_id: userId,
          form_data_id: formDataId,
        });

        // Check if we have a validated font selection
        if (fontStatus.is_validated && fontStatus.font_selection) {
          setFont(fontStatus.font_selection);
        }

        // Check if logo already exists
        const logoStatus = await ApiService('/logo-modification-status', 'GET', {
          user_id: userId,
          form_data_id: formDataId,
        });

        setModificationStatus(logoStatus);
        
        if (logoStatus.logo_url) {
          setLogoExists(true);
          setExistingLogoUrl(logoStatus.logo_url);
          setSelectedLogo(logoStatus.logo_url);
          setIsValidated(!!logoStatus.is_logo_validated);

          setChatMessages([
            {
              id: 'existing-logo',
              type: 'ai',
              content: t('logo_maker.existing_logo_message', { defaultValue: 'I found an existing logo for your project. You can modify it or validate it to proceed.' }),
              timestamp: new Date(),
              logoUrl: logoStatus.logo_url,
            },
          ]);
        }
      } catch (err) {
        console.error('Error fetching required data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequiredData();
  }, [navigate, t]);

  // Validate required data exists
  useEffect(() => {
    if (!isLoading && (colorPalette.length === 0 || !font)) {
      // Navigate to design selection if missing colors
      if (colorPalette.length === 0) {
        navigate('/design');
      }
      // Navigate to font selection if missing font
      else if (!font) {
        navigate('/font');
      }
    }
  }, [colorPalette, font, navigate, isLoading]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const sendMessage = async () => {
    if (!currentMessage.trim() || logoExists || isTyping) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: currentMessage,
      timestamp: new Date(),
    };
    setChatMessages((prev) => [...prev, userMessage]);
    setCurrentMessage('');
    setIsTyping(true);

    try {
      const userId = localStorage.getItem('bizwizuser_id');
      const formDataId = localStorage.getItem('bizwiz_form_data_id');

      // Store the base prompt
      localStorage.setItem('bizwiz_logo_base_prompt', currentMessage);

      // Create enhanced prompt with design context
      const enhancedPrompt = `${currentMessage} using colors ${colorPalette.join(', ')} and font ${font}`;

      const response = await ApiService('/generate-logo', 'POST', {
        user_id: userId,
        form_data_id: formDataId,
        prompt: enhancedPrompt,
      });

      if (response.logo_url) {
        setLogoExists(true);
        setExistingLogoUrl(response.logo_url);
        setSelectedLogo(response.logo_url);
      }

      const aiMessage = {
        id: `ai-${Date.now()}`,
        type: 'ai',
        content: response.logo_url
          ? t('logo_maker.generated_logo_message', { defaultValue: 'Great! I\'ve generated a logo based on your description. You can now validate it or request modifications.' })
          : response.error || t('logo_maker.error_message', { error: 'Unknown error' }),
        timestamp: new Date(),
        logoUrl: response.logo_url,
      };
      setChatMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      const errorMessage = {
        id: `error-send-${Date.now()}`,
        type: 'ai',
        content: t('logo_maker.error_message', { error: err.message || 'Unknown error' }),
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  // const downloadLogo = async () => {
  //   if (!existingLogoUrl) return;
  //   try {
  //     const response = await fetch(existingLogoUrl, { mode: 'cors' });
  //     if (!response.ok) throw new Error('Failed to fetch logo');
  //     const blob = await response.blob();
  //     const url = window.URL.createObjectURL(blob);
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.download = 'generated-logo.png';
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //     window.URL.revokeObjectURL(url);
  //   } catch (err) {
  //     console.error('Download failed:', err);
  //   }
  // };

  // Alternative download function that opens in new tab if CORS fails

const downloadLogo = async () => {
  if (!existingLogoUrl) return;
  
  try {
    const userId = localStorage.getItem('bizwizuser_id');
    const formDataId = localStorage.getItem('bizwiz_form_data_id');
    
    // Create download URL
    const downloadUrl = `${process.env.REACT_APP_API_BASE_URL || 'https://bizzwiz.indibase.in/api'}/download-logo?user_id=${userId}&form_data_id=${formDataId}`;
    
    // Fetch the file as blob
    const response = await fetch(downloadUrl);
    if (!response.ok) throw new Error('Download failed');
    
    const blob = await response.blob();
    
    // Create object URL and download
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'generated-logo.png';
    
    // Hide the link and add to DOM
    link.style.display = 'none';
    document.body.appendChild(link);
    
    // Trigger download
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
  } catch (err) {
    console.error('Download failed:', err);
    alert('Download failed. Please try again.');
  }
};
  
  const handleBack = () => {
    navigate('/font');
  };

  const handleValidate = () => setShowValidationDialog(true);

  const confirmValidation = async () => {
    try {
      const userId = localStorage.getItem('bizwizuser_id');
      const formDataId = localStorage.getItem('bizwiz_form_data_id');

      await ApiService('/validate-logo', 'POST', {
        user_id: userId,
        form_data_id: formDataId,
      });

      setIsValidated(true);
      setShowValidationDialog(false);

      // Navigate to next step
      navigate('/call');
    } catch (err) {
      console.error('Validation failed:', err);
    }
  };

  const handleAIModification = () => {
    setShowAIModificationModal(true);
  };

  const submitAIModification = async () => {
    if (!aiModificationPrompt.trim()) return;
    setAiModificationLoading(true);
    
    try {
      const userId = localStorage.getItem('bizwizuser_id');
      const formDataId = localStorage.getItem('bizwiz_form_data_id');
      const basePrompt = localStorage.getItem('bizwiz_logo_base_prompt') || prompt || '';

      console.log('Submitting AI modification request:', {
        userId,
        formDataId,
        modificationPrompt: aiModificationPrompt
      });

      const response = await ApiService('/request-logo-ai-modification', 'POST', {
        user_id: userId,
        form_data_id: formDataId,
        modification_prompt: aiModificationPrompt,
      });

      console.log('AI modification response:', response);

      if (response.success && response.logo_url) {
        setExistingLogoUrl(response.logo_url);
        setSelectedLogo(response.logo_url);
        setAiModificationPrompt('');
        setShowAIModificationModal(false);
        
        // Refresh modification status
        const logoStatus = await ApiService('/logo-modification-status', 'GET', {
          user_id: userId,
          form_data_id: formDataId,
        });
        setModificationStatus(logoStatus);
        
        // Show success message with credit information
        if (response.credits_deducted && response.remaining_credits !== undefined) {
          console.log(`AI modification successful! ${response.credits_deducted} credits deducted. Remaining credits: ${response.remaining_credits}`);
        }
        
        setIsValidated(false);
      }
    } catch (err) {
      console.error('AI modification error:', err);
      console.error('Error details:', {
        message: err.message,
        response: err.response,
        status: err.response?.status
      });
      
      // Handle credit-related errors
      if (err.response?.data?.requires_credits) {
        if (err.response.data.error.includes('Insufficient credits')) {
          console.log(`Insufficient credits. You need ${err.response.data.required_credits} credits for AI modification. Current balance: ${err.response.data.current_credits} credits.`);
        } else if (err.response.data.error.includes('Maximum AI modifications')) {
          console.log('Maximum AI modifications reached. Please purchase more credits to continue.');
        }
        
        // Refresh modification status to get updated credit info
        const userId = localStorage.getItem('bizwizuser_id');
        const formDataId = localStorage.getItem('bizwiz_form_data_id');
        const logoStatus = await ApiService('/logo-modification-status', 'GET', {
          user_id: userId,
          form_data_id: formDataId,
        });
        setModificationStatus(logoStatus);
      } else {
        // Show generic error message
        alert('AI modification failed. Please try again or check your internet connection.');
      }
    } finally {
      setAiModificationLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div
        className={`min-h-[calc(100vh-var(--navbar-height,68px))] bg-bizzwiz-background flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 ${isRtl ? 'rtl' : ''}`}
        role="main"
        aria-label={t('logo_maker.level_header', { defaultValue: 'LOGO MAKER' })}
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        <div className="w-full max-w-7xl space-y-4 mb-8">
          <TopHeaderBar />
          <LevelHeader levelno="Level 5" heading={t('logo_maker.level_header', { defaultValue: 'LOGO MAKER' })} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-7xl bg-bizzwiz-card-background backdrop-blur-3xl rounded-3xl shadow-2xl border border-bizzwiz-border p-6 sm:p-8 md:p-10"
        >
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl font-montserrat font-bold text-gradient-bizzwiz mb-4"
            >
              {t('logo_maker.main_heading', { defaultValue: 'AI Logo Generator' })}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-bizzwiz-text-alt text-base sm:text-lg max-w-2xl mx-auto font-montserrat"
            >
              {t('logo_maker.main_description', { defaultValue: 'Create the perfect logo for your brand using AI and your design choices' })}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: isRtl ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2 bg-bizzwiz-card-secondary backdrop-blur-2xl rounded-3xl shadow-lg border border-bizzwiz-border p-6 md:p-8"
              role="region"
              aria-label={t('logo_maker.ai_logo_generator', { defaultValue: 'AI Logo Generator' })}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-bizzwiz-accent-primary/20 backdrop-blur-sm rounded-xl border border-bizzwiz-accent-primary/30 shadow-[0_0_15px_rgba(159,67,242,0.3)]">
                  <Bot className="w-6 h-6 text-bizzwiz-accent-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gradient-bizzwiz font-montserrat">{t('logo_maker.ai_logo_generator', { defaultValue: 'AI Logo Generator' })}</h2>
                  <p className="text-sm text-bizzwiz-text-alt font-montserrat">{t('logo_maker.describe_logo', { defaultValue: 'Describe your logo and I\'ll create it for you' })}</p>
                </div>
              </div>

              <div
                className="bg-bizzwiz-card-secondary/50 backdrop-blur-sm rounded-xl p-4 mb-6 h-64 md:h-96 overflow-y-auto border border-bizzwiz-border hover:border-bizzwiz-accent-primary/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(159,67,242,0.2)]"
                role="log"
                aria-live="polite"
              >
                {chatMessages.map((message) => (
                  <ChatMessage key={message.id} message={message.content} logoUrl={message.logoUrl} />
                ))}
                {isTyping && (
                  <div className={`flex ${isRtl ? 'justify-end' : 'justify-start'}`}>
                    <ChatMessage message="..." />
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {logoExists && (
                <div
                  className="bg-bizzwiz-card-secondary/50 backdrop-blur-sm rounded-xl p-6 mb-6 border border-bizzwiz-border hover:border-bizzwiz-accent-primary/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(159,67,242,0.2)]"
                  role="region"
                  aria-label={t('logo_maker.logo_preview_description', { defaultValue: 'Generated Logo Preview' })}
                >
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex items-center gap-6 flex-wrap justify-center">
                      {colorPalette?.map((color, index) => (
                        <div key={index} className="w-12 h-12 rounded-lg border border-bizzwiz-border" style={{ backgroundColor: color }} />
                      ))}
                      <img
                        src={existingLogoUrl}
                        alt={t('logo_maker.logo_preview_description', { defaultValue: 'Generated Logo' })}
                        className="w-32 h-32 rounded-xl border-2 border-bizzwiz-accent-primary/30 object-contain"
                      />
                      {font && (
                        <div className="text-bizzwiz-text font-bold text-center" style={{ fontFamily: font }}>
                          {font}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2 flex-wrap justify-center">
                      <Button
                        onClick={downloadLogo}
                        className="bg-bizzwiz-accent-primary/20 backdrop-blur-sm text-bizzwiz-accent-primary border border-bizzwiz-accent-primary/30 hover:bg-bizzwiz-accent-primary/30 hover:shadow-[0_0_15px_rgba(159,67,242,0.4)] transition-all duration-300 font-montserrat"
                        aria-label={t('logo_maker.download_button', { defaultValue: 'Download' })}
                      >
                        <Download className="w-5 h-5 mr-2" /> {t('logo_maker.download_button', { defaultValue: 'Download' })}
                      </Button>
                    </div>
                    <p className="text-bizzwiz-text-alt text-sm font-montserrat text-center">{t('logo_maker.logo_preview_description', { defaultValue: 'Your logo has been generated! You can download it or request modifications.' })}</p>
                  </div>
                </div>
              )}

              <div className="flex gap-3 flex-col sm:flex-row">
                <input
                  type="text"
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (logoExists ? handleAIModification() : sendMessage())}
                  className="flex-1 px-4 py-3 bg-transparent backdrop-blur-sm border border-bizzwiz-border text-white placeholder-white/60 rounded-xl focus:border-bizzwiz-accent-primary/50 focus:shadow-[0_0_10px_rgba(159,67,242,0.2)] font-montserrat"
                  placeholder={logoExists ? t('logo_maker.input_placeholder_modify', { defaultValue: 'Describe how you\'d like to modify your logo...' }) : t('logo_maker.input_placeholder_generate', { defaultValue: 'Describe your logo idea...' })}
                  disabled={isTyping || (logoExists && modificationStatus.remaining_logo_ai_modifications === 0) || colorPalette.length === 0 || !font}
                  aria-label={logoExists ? t('logo_maker.input_placeholder_modify', { defaultValue: 'Logo modification prompt' }) : t('logo_maker.input_placeholder_generate', { defaultValue: 'Logo generation prompt' })}
                />
                <Button
                  onClick={logoExists ? handleAIModification : sendMessage}
                  disabled={!currentMessage.trim() || isTyping || (logoExists && modificationStatus.remaining_logo_ai_modifications === 0) || colorPalette.length === 0 || !font}
                  className="bg-bizzwiz-accent-primary/20 backdrop-blur-sm text-bizzwiz-accent-primary border border-bizzwiz-accent-primary/30 hover:bg-bizzwiz-accent-primary/30 hover:shadow-[0_0_15px_rgba(159,67,242,0.4)] transition-all duration-300 disabled:opacity-50 font-montserrat px-6"
                  aria-label={logoExists ? t('logo_maker.input_placeholder_modify', { defaultValue: 'Modify logo' }) : t('logo_maker.input_placeholder_generate', { defaultValue: 'Generate logo' })}
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>

              {(colorPalette.length === 0 || !font) && (
                <div className="mt-3 p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
                  <p className="text-yellow-300 text-sm text-center font-montserrat">
                    {colorPalette.length === 0 ? t('logo_maker.missing_colors', { defaultValue: 'Please complete color selection first' }) : t('logo_maker.missing_font', { defaultValue: 'Please complete font selection first' })}
                  </p>
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: isRtl ? -40 : 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
              role="complementary"
              aria-label={t('logo_maker.validate_logo_section', { defaultValue: 'Logo Actions' })}
            >
              <div className="bg-bizzwiz-card-secondary backdrop-blur-2xl rounded-3xl shadow-lg border border-bizzwiz-border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-500/20 backdrop-blur-sm rounded-lg border border-green-500/30 shadow-[0_0_10px_rgba(34,197,94,0.3)]">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gradient-bizzwiz font-montserrat">{t('logo_maker.validate_logo_section', { defaultValue: 'Validate Logo' })}</h3>
                </div>
                <p className="text-sm text-bizzwiz-text-alt font-montserrat mb-4">{t('logo_maker.validate_logo_description', { defaultValue: 'Confirm your logo and proceed to the next step' })}</p>
                <Button
                  onClick={handleValidate}
                  disabled={isValidated || !logoExists}
                  className="w-full bg-green-600/20 backdrop-blur-sm text-green-300 font-bold py-3 rounded-xl hover:bg-green-600/30 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 font-montserrat border border-green-500/30"
                  aria-label={isValidated ? t('logo_maker.validate_logo_button_validated', { defaultValue: 'Logo already validated' }) : t('logo_maker.validate_logo_button', { defaultValue: 'Validate logo' })}
                >
                  <CheckCircle className="w-4 h-4" />
                  {isValidated ? t('logo_maker.validate_logo_button_validated', { defaultValue: 'Logo Validated' }) : t('logo_maker.validate_logo_button', { defaultValue: 'Validate Logo' })}
                </Button>
              </div>

              <div className="bg-bizzwiz-card-secondary backdrop-blur-2xl rounded-3xl shadow-lg border border-bizzwiz-border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-500/20 backdrop-blur-sm rounded-lg border border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                    <MessageCircle className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gradient-bizzwiz font-montserrat">{t('logo_maker.ai_modifications_section', { defaultValue: 'AI Modifications' })}</h3>
                </div>
                <p className="text-sm text-bizzwiz-text-alt font-montserrat mb-4">
                  {modificationStatus.remaining_logo_ai_modifications === 0
                    ? t('logo_maker.no_modifications', { defaultValue: 'No AI modifications remaining. Purchase more credits to continue.' })
                    : t(`logo_maker.ai_modifications_remaining${modificationStatus.remaining_logo_ai_modifications !== 1 ? '_plural' : ''}`, { count: modificationStatus.remaining_logo_ai_modifications, defaultValue: `You have ${modificationStatus.remaining_logo_ai_modifications} AI modification${modificationStatus.remaining_logo_ai_modifications !== 1 ? 's' : ''} remaining.` })}
                </p>
                {modificationStatus.remaining_logo_ai_modifications === 0 ? (
                  <div className="space-y-3">
                    <Button
                      onClick={() => navigate('/purchase')}
                      className="w-full bg-orange-600/20 backdrop-blur-sm text-orange-300 font-bold py-3 rounded-xl hover:bg-orange-600/30 hover:shadow-[0_0_15px_rgba(251,146,60,0.4)] transition-all duration-300 flex items-center justify-center gap-3 font-montserrat border border-orange-500/30"
                      aria-label={t('logo_maker.purchase_credits_button', { defaultValue: 'Purchase Credits' })}
                    >
                      {t('logo_maker.purchase_credits_button', { defaultValue: 'Purchase Credits' })}
                    </Button>
                  </div>
                ) : !modificationStatus.can_use_ai ? (
                  <div className="space-y-3">
                    <div className="text-sm text-red-400 text-center p-2 bg-red-500/10 rounded-lg border border-red-500/20">
                      {t('logo_maker.insufficient_credits', { required_credits: 3, defaultValue: 'Insufficient credits. You need 3 credits for AI modification.' })}
                    </div>
                    <Button
                      onClick={() => navigate('/purchase')}
                      className="w-full bg-orange-600/20 backdrop-blur-sm text-orange-300 font-bold py-3 rounded-xl hover:bg-orange-600/30 hover:shadow-[0_0_15px_rgba(251,146,60,0.4)] transition-all duration-300 flex items-center justify-center gap-3 font-montserrat border border-orange-500/30"
                      aria-label={t('logo_maker.purchase_credits_button', { defaultValue: 'Purchase Credits' })}
                    >
                      {t('logo_maker.purchase_credits_button', { defaultValue: 'Purchase Credits' })}
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={handleAIModification}
                    className="w-full bg-blue-600/20 backdrop-blur-sm text-blue-300 font-bold py-3 rounded-xl hover:bg-blue-600/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-all duration-300 flex items-center justify-center gap-3 font-montserrat border border-blue-500/30"
                    aria-label={t('logo_maker.ai_modifications_section', { defaultValue: 'Request AI modification of logo' })}
                  >
                    <MessageCircle className="w-4 h-4" />
                    {t('logo_maker.ai_modifications_section', { defaultValue: 'Request AI Modification' })}
                  </Button>
                )}
              </div>

              <div className="bg-bizzwiz-card-secondary backdrop-blur-2xl rounded-3xl shadow-lg border border-bizzwiz-border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-500/20 backdrop-blur-sm rounded-lg border border-purple-500/30 shadow-[0_0_10px_rgba(147,51,234,0.3)]">
                    <Bot className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gradient-bizzwiz font-montserrat">{t('logo_maker.design_context_section', { defaultValue: 'Design Context' })}</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-bizzwiz-text-alt font-montserrat">{t('logo_maker.color_palette_label', { defaultValue: 'Color Palette' })}</p>
                    <div className="flex gap-2 mt-1 flex-wrap">
                      {colorPalette.map((color, index) => (
                        <div key={index} className="w-6 h-6 rounded border border-bizzwiz-border" style={{ backgroundColor: color }} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-bizzwiz-text-alt font-montserrat">{t('logo_maker.selected_font_label', { defaultValue: 'Selected Font' })}</p>
                    <p className="text-sm text-bizzwiz-text font-montserrat mt-1">{font || t('logo_maker.font_not_selected', { defaultValue: 'Not selected' })}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <AlertDialog open={showValidationDialog} onOpenChange={setShowValidationDialog}>
          <AlertDialogContent className="bg-bizzwiz-card-background backdrop-blur-3xl border border-bizzwiz-border">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-gradient-bizzwiz font-montserrat">{t('logo_maker.validation_dialog_title', { defaultValue: 'Validate Your Logo' })}</AlertDialogTitle>
              <AlertDialogDescription className="text-bizzwiz-text-alt font-montserrat">
                {t('logo_maker.validation_dialog_description', { defaultValue: 'Are you satisfied with your generated logo? Once validated, you\'ll proceed to the next step in your project.' })}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-bizzwiz-card-secondary backdrop-blur-sm text-bizzwiz-text border border-bizzwiz-border hover:bg-bizzwiz-card-secondary/80 font-montserrat">
                {t('logo_maker.validation_dialog_cancel', { defaultValue: 'Cancel' })}
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmValidation}
                className="bg-green-600/20 backdrop-blur-sm text-green-300 border border-green-500/30 hover:bg-green-600/30 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] font-montserrat"
              >
                {t('logo_maker.validation_dialog_confirm', { defaultValue: 'Validate Logo' })}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* AI Modification Modal */}
        {showAIModificationModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-bizzwiz-card-background backdrop-blur-3xl rounded-3xl border border-bizzwiz-border p-6 w-full max-w-2xl shadow-[0_0_30px_rgba(159,67,242,0.3)]"
            >
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gradient-bizzwiz font-montserrat">{t('logo_maker.ai_modification_modal_title', { defaultValue: 'Request AI Modification' })}</h3>
                <p className="text-sm text-bizzwiz-text-alt font-montserrat">{t('logo_maker.ai_modification_modal_description', { defaultValue: 'Describe what you want to change' })}</p>
              </div>
              <Textarea
                value={aiModificationPrompt}
                onChange={(e) => setAiModificationPrompt(e.target.value)}
                rows={4}
                className="w-full bg-bizzwiz-card-secondary backdrop-blur-sm border border-bizzwiz-border text-bizzwiz-text placeholder-bizzwiz-text-alt/60 rounded-xl p-3 font-montserrat focus:border-bizzwiz-accent-primary/50 focus:shadow-[0_0_10px_rgba(159,67,242,0.2)]"
                placeholder={t('logo_maker.ai_modification_placeholder', { defaultValue: 'E.g., Make it more modern and geometric' })}
              />
              <div className="flex gap-3 mt-4">
                <Button
                  onClick={() => setShowAIModificationModal(false)}
                  className="flex-1 bg-bizzwiz-card-secondary backdrop-blur-sm text-bizzwiz-text border border-bizzwiz-border hover:bg-bizzwiz-card-secondary/80 font-montserrat"
                >
                  {t('logo_maker.ai_modification_cancel', { defaultValue: 'Cancel' })}
                </Button>
                <Button
                  onClick={submitAIModification}
                  disabled={!aiModificationPrompt.trim() || aiModificationLoading}
                  className="flex-1 bg-blue-600/20 backdrop-blur-sm text-blue-300 border border-blue-500/30 hover:bg-blue-600/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] disabled:opacity-50 font-montserrat"
                >
                  {aiModificationLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-300"></div>
                  ) : (
                    t('logo_maker.ai_modification_submit', { defaultValue: 'Submit Modification' })
                  )}
                </Button>
              </div>
            </motion.div>
          </div>
        )}

        <style>{`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes slide-up {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 0.6s ease-out;
          }
          .animate-slide-up {
            animation: slide-up 0.8s ease-out;
          }
          .hover\:scale-102:hover {
            transform: scale(1.02);
          }
          .hover\:scale-105:hover {
            transform: scale(1.05);
          }
          .active\:scale-95:active {
            transform: scale(0.95);
          }
          .font-montserrat {
            font-family: 'Montserrat', sans-serif;
          }
          .rtl {
            direction: rtl;
          }
          .rtl .flex {
            flex-direction: row-reverse;
          }
          .rtl .text-left {
            text-align: right;
          }
          .rtl .grid {
            direction: rtl;
          }
          .text-gradient-bizzwiz {
            background: linear-gradient(to right, #9f43f2, #f43f5e);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
          }
        `}</style>
      </div>
    </ErrorBoundary>
  );
};

export default LogoComponent;
