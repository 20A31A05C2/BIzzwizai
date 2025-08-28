import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Download, CheckCircle, Edit3, MessageSquare, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { jsPDF } from 'jspdf';
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

const BusinessComponent = ({ setCurrentView }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [businessPlan, setBusinessPlan] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isValidated, setIsValidated] = useState(false);
  const [showValidationDialog, setShowValidationDialog] = useState(false);
  const [showAIModificationModal, setShowAIModificationModal] = useState(false);
  const [aiModificationPrompt, setAiModificationPrompt] = useState('');
  const [aiModificationLoading, setAiModificationLoading] = useState(false);
  const [showManualEditModal, setShowManualEditModal] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const [manualEditLoading, setManualEditLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [modificationStatus, setModificationStatus] = useState({
    ai_modification_count: 0,
    remaining_ai_modifications: 2,
    manual_edit_count: 0,
    is_validated: false,
    current_credits: 0,
    can_use_ai: true
  });

  useEffect(() => {
    const fetchBusinessPlan = async () => {
      const userId = localStorage.getItem('bizwizuser_id');
      const formDataId = localStorage.getItem('bizwiz_form_data_id');
      if (!userId || !formDataId) {
        setError(t('businessComponent.errorUserId'));
        setLoading(false);
        return;
      }

      try {
        const response = await ApiService('/generate-business-plan', 'POST', { user_id: userId, form_data_id: formDataId });
        if (response.business_plan) {
          setBusinessPlan(response.business_plan);
        } else if (response.message === 'Business plan already generated') {
          setBusinessPlan(response.business_plan || t('businessComponent.planAlreadyExists'));
        }
        setLoading(false);
        
        fetchModificationStatus();
      } catch (err) {
        setError(t('businessComponent.fetchFailure') || 'Failed to fetch business plan');
        setLoading(false);
      }
    };

    fetchBusinessPlan();
  }, []);

  // Refresh credits when component mounts and when user returns from purchase page
  useEffect(() => {
    // Credits are now handled elsewhere in the app
  }, []);

  const fetchModificationStatus = async () => {
    try {
      const userId = localStorage.getItem('bizwizuser_id');
      const formDataId = localStorage.getItem('bizwiz_form_data_id');
      
      const response = await ApiService('/business-plan-modification-status', 'GET', { 
        user_id: userId, 
        form_data_id: formDataId 
      });
      
      setModificationStatus(response);
      setIsValidated(response.is_validated);
    } catch (err) {
      // Removed console.error
    }
  };

  const downloadBusinessPlan = () => {
    const doc = new jsPDF();
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);

    doc.setFontSize(16);
    doc.text(t('businessComponent.downloadTitle'), 10, 10);
    doc.setFontSize(12);

    const lines = doc.splitTextToSize(businessPlan, 190);
    const pageHeight = doc.internal.pageSize.getHeight();
    const marginTop = 20;
    const marginBottom = 10;
    const marginLeft = 10;
    const lineHeightFactor = 1.15;
    const fontSize = 12;
    const lineHeight = (fontSize * lineHeightFactor) / 2.83464567;

    let y = marginTop;

    lines.forEach((line) => {
      if (y + lineHeight > pageHeight - marginBottom) {
        doc.addPage();
        y = marginTop;
      }

      doc.text(line, marginLeft, y);
      y += lineHeight;
    });

    doc.save(t('businessComponent.downloadFileName'));
  };

  const handleValidation = () => {
    setShowValidationDialog(true);
  };

  const confirmValidation = async () => {
    try {
      const userId = localStorage.getItem('bizwizuser_id');
      const formDataId = localStorage.getItem('bizwiz_form_data_id');
      
      await ApiService('/validate-business-plan', 'POST', { 
        user_id: userId, 
        form_data_id: formDataId 
      });
      
      setIsValidated(true);
      setShowValidationDialog(false);
      fetchModificationStatus();
      if (navigate) {
        navigate('/slogan');
      } else if (typeof setCurrentView === 'function') {
        setCurrentView('slogan');
      }
    } catch (err) {
      // Removed console.error
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
      
      console.log('Submitting AI modification request...');
      console.log('Current modification status:', modificationStatus);
      
      const response = await ApiService('/request-ai-modification', 'POST', {
        user_id: userId,
        form_data_id: formDataId,
        modification_prompt: aiModificationPrompt
      });

      console.log('AI modification response:', response);

      if (response.success) {
        setBusinessPlan(response.business_plan);
        setAiModificationPrompt('');
        setShowAIModificationModal(false);
        
        // Refresh modification status to get updated counts
        await fetchModificationStatus();
        
        // Show success message with credit information
        if (response.credits_deducted && response.remaining_credits !== undefined) {
          console.log(`AI modification successful! ${response.credits_deducted} credits deducted. Remaining credits: ${response.remaining_credits}`);
        }
      }
    } catch (err) {
      console.error('AI modification error:', err);
      
      // Handle credit-related errors
      if (err.response?.data?.requires_credits) {
        if (err.response.data.error.includes('Insufficient credits')) {
          // Show insufficient credits message
          alert(`Insufficient credits. You need ${err.response.data.required_credits} credits for AI modification. Current balance: ${err.response.data.current_credits} credits.`);
        } else if (err.response.data.error.includes('Maximum AI modifications')) {
          // Show max modifications reached message
          alert('Maximum AI modifications reached. Please purchase more credits to continue.');
        }
        // Refresh modification status to get updated credit info
        await fetchModificationStatus();
      } else {
        // Handle other errors
        alert(err.response?.data?.error || 'Failed to submit AI modification request.');
      }
    } finally {
      setAiModificationLoading(false);
    }
  };

  const handleManualEdit = () => {
    setEditedContent(businessPlan);
    setShowManualEditModal(true);
  };

  const saveManualEdit = async () => {
    if (!editedContent.trim()) return;

    setManualEditLoading(true);
    try {
      const userId = localStorage.getItem('bizwizuser_id');
      const formDataId = localStorage.getItem('bizwiz_form_data_id');
      
      const response = await ApiService('/manually-edit-business-plan', 'POST', {
        user_id: userId,
        form_data_id: formDataId,
        edited_content: editedContent
      });

      if (response.success) {
        setBusinessPlan(editedContent);
        setShowManualEditModal(false);
        fetchModificationStatus();
      }
    } catch (err) {
      // Removed console.error
    } finally {
      setManualEditLoading(false);
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-[calc(100vh-var(--navbar-height,68px))] bg-bizzwiz-background flex flex-col items-center justify-center p-4 sm:p-6 md:p-8" role="main" aria-label={t('businessComponent.ariaLabel')}>
            <div className="w-full max-w-7xl space-y-4 mb-8">
              <TopHeaderBar/>
              <LevelHeader levelno ='Level 2' heading = {t('businessComponent.levelheader')}/>
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
              {t('businessComponent.title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-bizzwiz-text-alt text-base sm:text-lg max-w-2xl mx-auto font-montserrat"
            >
              {t('businessComponent.subtitle')}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2 bg-bizzwiz-card-secondary backdrop-blur-2xl rounded-3xl shadow-lg border border-bizzwiz-border p-6 md:p-8"
              role="region"
              aria-label={t('businessComponent.contentAriaLabel')}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-bizzwiz-accent-primary/20 backdrop-blur-sm rounded-xl border border-bizzwiz-accent-primary/30 shadow-[0_0_15px_rgba(159,67,242,0.3)]">
                  <FileText className="w-6 h-6 text-bizzwiz-accent-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gradient-bizzwiz font-montserrat">{t('businessComponent.contentTitle')}</h2>
                  <p className="text-sm text-bizzwiz-text-alt font-montserrat">{t('businessComponent.contentSubtitle')}</p>
                </div>
              </div>

              {loading ? (
                <div className="bg-bizzwiz-card-secondary/50 backdrop-blur-sm rounded-xl p-4 mb-6 h-80 md:h-96 flex items-center justify-center border border-bizzwiz-border" role="status">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bizzwiz-accent-primary"></div>
                    <p className="text-bizzwiz-text-alt font-montserrat">{t('businessComponent.loading')}</p>
                  </div>
                </div>
              ) : error ? (
                <div className="bg-bizzwiz-card-secondary/50 backdrop-blur-sm rounded-xl p-4 mb-6 h-80 md:h-96 flex items-center justify-center border border-red-500/30" role="alert">
                  <p className="text-red-400 font-montserrat">{error}</p>
                </div>
              ) : (
                <div className="bg-bizzwiz-card-secondary/50 backdrop-blur-sm rounded-xl p-4 mb-6 h-80 md:h-96 overflow-y-auto border border-bizzwiz-border hover:border-bizzwiz-accent-primary/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(159,67,242,0.2)]">
                  <pre className="text-sm text-bizzwiz-text whitespace-pre-wrap leading-relaxed font-montserrat">{businessPlan}</pre>
                </div>
              )}

              <Button
                onClick={downloadBusinessPlan}
                disabled={loading || error || !businessPlan}
                className="w-full bg-bizzwiz-accent-primary/20 backdrop-blur-sm text-bizzwiz-accent-primary font-bold py-4 rounded-xl hover:bg-bizzwiz-accent-primary/30 hover:shadow-[0_0_20px_rgba(159,67,242,0.4)] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 font-montserrat border border-bizzwiz-accent-primary/30"
                aria-label={t('businessComponent.downloadAriaLabel')}
              >
                <Download className="w-5 h-5" />
                <span className="font-medium">{t('businessComponent.downloadButton')}</span>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
              role="complementary"
              aria-label={t('businessComponent.actionsAriaLabel')}
            >
              <div className="bg-bizzwiz-card-secondary backdrop-blur-2xl rounded-3xl shadow-lg border border-bizzwiz-border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-500/20 backdrop-blur-sm rounded-lg border border-green-500/30 shadow-[0_0_10px_rgba(34,197,94,0.3)]">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gradient-bizzwiz font-montserrat">{t('businessComponent.validationTitle')}</h3>
                </div>
                <p className="text-sm text-bizzwiz-text-alt font-montserrat mb-4">
                  {t('businessComponent.validationDescription')}
                </p>
                <Button
                  onClick={handleValidation}
                  disabled={isValidated}
                  className="w-full bg-green-600/20 backdrop-blur-sm text-green-300 font-bold py-3 rounded-xl hover:bg-green-600/30 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 font-montserrat border border-green-500/30"
                  aria-label={isValidated ? t('businessComponent.validatedAriaLabel') : t('businessComponent.validateAriaLabel')}
                >
                  <CheckCircle className="w-4 h-4" />
                  {isValidated ? t('businessComponent.validated') : t('businessComponent.validateButton')}
                </Button>
              </div>

              <div className="bg-bizzwiz-card-secondary backdrop-blur-2xl rounded-3xl shadow-lg border border-bizzwiz-border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-500/20 backdrop-blur-sm rounded-lg border border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                    <MessageSquare className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gradient-bizzwiz font-montserrat">{t('businessComponent.aiModificationTitle')}</h3>
                </div>
                
                <p className="text-sm text-bizzwiz-text-alt font-montserrat mb-4">
                  {modificationStatus.remaining_ai_modifications === 0 
                    ? 'Maximum AI modifications reached. Purchase more credits to continue.'
                    : `You have ${modificationStatus.remaining_ai_modifications} AI modification${modificationStatus.remaining_ai_modifications !== 1 ? 's' : ''} remaining.`
                  }
                </p>
                
                {modificationStatus.remaining_ai_modifications === 0 ? (
                  <div className="space-y-3">
                    <Button
                      onClick={() => navigate('/purchase')}
                      className="w-full bg-orange-600/20 backdrop-blur-sm text-orange-300 font-bold py-3 rounded-xl hover:bg-orange-600/30 hover:shadow-[0_0_15px_rgba(251,146,60,0.4)] transition-all duration-300 flex items-center justify-center gap-3 font-montserrat border border-orange-500/30"
                      aria-label="Purchase credits to continue AI modifications"
                    >
                      <span>Purchase Credits</span>
                    </Button>
                  </div>
                ) : !modificationStatus.can_use_ai ? (
                  <div className="space-y-3">
                    <div className="text-sm text-red-400 text-center p-2 bg-red-500/10 rounded-lg border border-red-500/20">
                      Insufficient credits. You need 3 credits for AI modification.
                    </div>
                    <Button
                      onClick={() => navigate('/purchase')}
                      className="w-full bg-orange-600/20 backdrop-blur-sm text-orange-300 font-bold py-3 rounded-xl hover:bg-orange-600/30 hover:shadow-[0_0_15px_rgba(251,146,60,0.4)] transition-all duration-300 flex items-center justify-center gap-3 font-montserrat border border-orange-500/30"
                      aria-label="Purchase credits to enable AI modifications"
                    >
                      <span>Purchase Credits</span>
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={handleAIModification}
                    className="w-full bg-blue-600/20 backdrop-blur-sm text-blue-300 font-bold py-3 rounded-xl hover:bg-blue-600/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-all duration-300 flex items-center justify-center gap-3 font-montserrat border border-blue-500/30"
                    aria-label="Request AI modification of business plan"
                  >
                    <MessageSquare className="w-4 h-4" />
                    {t('businessComponent.aiModificationButton')}
                  </Button>
                )}
              </div>

              <div className="bg-bizzwiz-card-secondary backdrop-blur-2xl rounded-3xl shadow-lg border border-bizzwiz-border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-bizzwiz-accent-primary/20 backdrop-blur-sm rounded-lg border border-bizzwiz-accent-primary/30 shadow-[0_0_10px_rgba(159,67,242,0.3)]">
                    <Edit3 className="w-5 h-5 text-bizzwiz-accent-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-gradient-bizzwiz font-montserrat">{t('businessComponent.manualEditTitle')}</h3>
                </div>
                <p className="text-sm text-bizzwiz-text-alt font-montserrat mb-4">
                  {t('businessComponent.manualEditDescription')}
                </p>
                <Button
                  onClick={handleManualEdit}
                  className="w-full bg-bizzwiz-accent-primary/20 backdrop-blur-sm text-bizzwiz-accent-primary font-bold py-3 rounded-xl hover:bg-bizzwiz-accent-primary/30 hover:shadow-[0_0_15px_rgba(159,67,242,0.4)] transition-all duration-300 flex items-center justify-center gap-3 font-montserrat border border-bizzwiz-accent-primary/30"
                  aria-label={t('businessComponent.manualEditAriaLabel')}
                >
                  <Edit3 className="w-4 h-4" />
                  {t('businessComponent.manualEditButton')}
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <AlertDialog open={showValidationDialog} onOpenChange={setShowValidationDialog}>
        <AlertDialogContent className="bg-bizzwiz-card-background backdrop-blur-3xl border border-bizzwiz-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gradient-bizzwiz font-montserrat">
              {t('businessComponent.validationDialogTitle')}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-bizzwiz-text-alt font-montserrat">
              {t('businessComponent.validationDialogDescription')}
              <br /><br />
              <strong className="text-red-400">{t('businessComponent.validationWarning')}</strong> {t('businessComponent.validationNoReturn')}
              <br /><br />
              {t('businessComponent.validationNextStep')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-bizzwiz-card-secondary backdrop-blur-sm text-bizzwiz-text border border-bizzwiz-border hover:bg-bizzwiz-card-secondary/80 font-montserrat">
              {t('businessComponent.cancel')}
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmValidation}
              className="bg-green-600/20 backdrop-blur-sm text-green-300 border border-green-500/30 hover:bg-green-600/30 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] font-montserrat"
            >
              {t('businessComponent.confirmValidation')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {showAIModificationModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-bizzwiz-card-background backdrop-blur-3xl rounded-3xl border border-bizzwiz-border p-6 w-full max-w-2xl shadow-[0_0_30px_rgba(159,67,242,0.3)]"
            role="dialog"
            aria-labelledby="ai-modification-title"
            aria-describedby="ai-modification-description"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 id="ai-modification-title" className="text-xl font-semibold text-gradient-bizzwiz font-montserrat">{t('businessComponent.aiModificationModalTitle')}</h3>
              <Button
                onClick={() => setShowAIModificationModal(false)}
                variant="ghost"
                className="p-2 hover:bg-bizzwiz-card-secondary text-bizzwiz-text"
                aria-label={t('businessComponent.closeModal')}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-bizzwiz-text-alt font-montserrat mb-2">
                  {t('businessComponent.aiModificationLabel')}
                </label>
                <Textarea
                  value={aiModificationPrompt}
                  onChange={(e) => setAiModificationPrompt(e.target.value)}
                  placeholder={t('businessComponent.aiModificationPlaceholder')}
                  className="w-full bg-bizzwiz-card-secondary backdrop-blur-sm border border-bizzwiz-border text-bizzwiz-text placeholder-bizzwiz-text-alt/60 rounded-xl p-3 font-montserrat focus:border-bizzwiz-accent-primary/50 focus:shadow-[0_0_10px_rgba(159,67,242,0.2)]"
                  rows={4}
                  aria-label={t('businessComponent.aiModificationInputAriaLabel')}
                />
              </div>
              
              <div className="flex gap-3">
                <Button
                  onClick={() => setShowAIModificationModal(false)}
                  className="flex-1 bg-bizzwiz-card-secondary backdrop-blur-sm text-bizzwiz-text border border-bizzwiz-border hover:bg-bizzwiz-card-secondary/80 font-montserrat"
                  aria-label={t('businessComponent.cancel')}
                >
                  {t('businessComponent.cancel')}
                </Button>
                <Button
                  onClick={submitAIModification}
                  disabled={!aiModificationPrompt.trim() || aiModificationLoading}
                  className="flex-1 bg-blue-600/20 backdrop-blur-sm text-blue-300 border border-blue-500/30 hover:bg-blue-600/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] font-montserrat disabled:opacity-50"
                  aria-label={t('businessComponent.submitModificationAriaLabel')}
                >
                  {aiModificationLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-300"></div>
                  ) : (
                    t('businessComponent.submitModification')
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {showManualEditModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-bizzwiz-card-background backdrop-blur-3xl rounded-3xl border border-bizzwiz-border p-6 w-full max-w-2xl shadow-[0_0_30px_rgba(159,67,242,0.3)]"
            role="dialog"
            aria-labelledby="manual-edit-title"
            aria-describedby="manual-edit-description"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 id="manual-edit-title" className="text-xl font-semibold text-gradient-bizzwiz font-montserrat">{t('businessComponent.manualEditModalTitle')}</h3>
              <Button
                onClick={() => setShowManualEditModal(false)}
                variant="ghost"
                className="p-2 hover:bg-bizzwiz-card-secondary text-bizzwiz-text"
                aria-label={t('businessComponent.closeModal')}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-bizzwiz-text-alt font-montserrat mb-2">
                  {t('businessComponent.manualEditLabel')}
                </label>
                <Textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  placeholder={t('businessComponent.manualEditPlaceholder')}
                  className="w-full bg-bizzwiz-card-secondary backdrop-blur-sm border border-bizzwiz-border text-bizzwiz-text placeholder-bizzwiz-text-alt/60 rounded-xl p-3 font-montserrat focus:border-bizzwiz-accent-primary/50 focus:shadow-[0_0_10px_rgba(159,67,242,0.2)]"
                  rows={15}
                  aria-label={t('businessComponent.manualEditInputAriaLabel')}
                />
              </div>
              
              <div className="flex gap-3">
                <Button
                  onClick={() => setShowManualEditModal(false)}
                  className="flex-1 bg-bizzwiz-card-secondary backdrop-blur-sm text-bizzwiz-text border border-bizzwiz-border hover:bg-bizzwiz-card-secondary/80 font-montserrat"
                  aria-label={t('businessComponent.cancel')}
                >
                  {t('businessComponent.cancel')}
                </Button>
                <Button
                  onClick={saveManualEdit}
                  disabled={!editedContent.trim() || manualEditLoading}
                  className="flex-1 bg-bizzwiz-accent-primary/20 backdrop-blur-sm text-bizzwiz-accent-primary border border-bizzwiz-accent-primary/30 hover:bg-bizzwiz-accent-primary/30 hover:shadow-[0_0_15px_rgba(159,67,242,0.4)] font-montserrat disabled:opacity-50"
                  aria-label={t('businessComponent.saveEditAriaLabel')}
                >
                  {manualEditLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-bizzwiz-accent-primary"></div>
                  ) : (
                    t('businessComponent.saveEdit')
                  )}
                </Button>
              </div>
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
      `}</style>
    </ErrorBoundary>
  );
};

export default BusinessComponent;