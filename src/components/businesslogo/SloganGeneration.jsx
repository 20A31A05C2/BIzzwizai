import React, { useState, useEffect, useRef } from 'react';
import { Send, ArrowLeft, Sparkles, CheckCircle, MessageCircle, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ApiService from '@/apiService';
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
import ChatMessage from '@/components/multiStepForm/ChatMessage';
import { useTranslation } from 'react-i18next';

const SloganGeneration = ({ setCurrentView }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [prompt, setPrompt] = useState('');
  const [slogans, setSlogans] = useState([]);
  const [selectedSlogan, setSelectedSlogan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [existingSlogans, setExistingSlogans] = useState([]);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 'initial',
      type: 'ai',
      content: t('sloganComponent.welcomeMessage'),
      timestamp: new Date(),
    },
  ]);
  const chatEndRef = useRef(null);

  // States for actions
  const [isValidated, setIsValidated] = useState(false);
  const [showValidationDialog, setShowValidationDialog] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [showManualModal, setShowManualModal] = useState(false);
  const [manualText, setManualText] = useState('');
  const [remainingAIMods, setRemainingAIMods] = useState(3);

  const cleanSlogans = (input) => {
    const lines = (Array.isArray(input) ? input : String(input).split('\n'))
      .map((l) => String(l).trim())
      .filter(Boolean)
      // remove obvious headers/intro lines
      .filter((l) => !/^(here\s+(are|is)|these|below|voici|here's)/i.test(l))
      // drop short lines that end with a colon (likely headers)
      .filter((l) => !/[:：]\s*$/.test(l))
      // strip numbering/bullets
      .map((l) => l.replace(/^[\s\-\*•]*\d+\.?\s+/, '').replace(/^[\s\-\*•]+/, ''));

    const deduped = [];
    const seen = new Set();
    for (const l of lines) {
      const key = l.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        deduped.push(l);
      }
    }
    return deduped;
  };

  useEffect(() => {
    const checkExistingSlogans = async () => {
      const userId = localStorage.getItem('bizwizuser_id');
      const formDataId = localStorage.getItem('bizwiz_form_data_id');
      if (!userId || !formDataId) return;

      try {
        const response = await ApiService('/generate-slogans', 'POST', {
          user_id: userId,
          form_data_id: formDataId,
          prompt: 'check',
        });
        if (response.slogans && response.slogans.length > 0) {
          const cleaned = cleanSlogans(response.slogans);
          setExistingSlogans(cleaned);
          setSlogans(cleaned);
          setChatMessages((prev) => [
            ...prev,
            {
              id: 'existing-slogans',
              type: 'ai',
              content: t('sloganComponent.existingListIntro'),
              timestamp: new Date(),
            },
            ...cleaned.map((slogan, index) => ({
              id: `slogan-${index}`,
              type: 'ai',
              content: slogan,
              timestamp: new Date(),
            })),
          ]);
        }
        // Fetch status
        const status = await ApiService('/slogans-status', 'GET', { user_id: userId, form_data_id: formDataId });
        if (status) {
          setRemainingAIMods(status.remaining_slogans_ai_modifications ?? 3);
          setIsValidated(!!status.is_slogans_validated);
        }
      } catch (err) {
        console.error('Error checking existing slogans:', err);
      }
    };
    checkExistingSlogans();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const generateSlogans = async () => {
    if (!prompt.trim() || existingSlogans.length > 0) return;

    setLoading(true);
    setError(null);

    const userMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: prompt,
      timestamp: new Date(),
    };
    setChatMessages((prev) => [...prev, userMessage]);

    try {
      const userId = localStorage.getItem('bizwizuser_id');
      const formDataId = localStorage.getItem('bizwiz_form_data_id');
      const response = await ApiService('/generate-slogans', 'POST', {
        user_id: userId,
        form_data_id: formDataId,
        prompt,
      });

      if (response.slogans) {
        const cleaned = cleanSlogans(response.slogans);
        setSlogans(cleaned);
        setExistingSlogans(cleaned);
        setChatMessages((prev) => [
          ...prev,
          {
            id: 'ai-response',
            type: 'ai',
            content: t('sloganComponent.generatedListMessage'),
            timestamp: new Date(),
          },
          ...cleaned.map((slogan, index) => ({
            id: `slogan-${index}`,
            type: 'ai',
            content: slogan,
            timestamp: new Date(),
          })),
        ]);
      } else {
        setError(response.error || t('sloganComponent.errorGenerate'));
        setChatMessages((prev) => [
          ...prev,
          {
            id: 'error',
            type: 'ai',
            content: response.error || t('sloganComponent.errorGenerate'),
            timestamp: new Date(),
          },
        ]);
      }
    } catch (err) {
      setError(err.message || t('sloganComponent.errorGenerate'));
      setChatMessages((prev) => [
        ...prev,
        {
          id: 'error',
          type: 'ai',
          content: err.message || t('sloganComponent.errorGenerate'),
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
      setPrompt('');
    }
  };

  const selectSlogan = (slogan) => {
    setSelectedSlogan(slogan);
    setChatMessages((prev) => [
      ...prev,
      {
        id: `selected-${Date.now()}`,
        type: 'user',
        content: t('sloganComponent.selectedMessage', { slogan }),
        timestamp: new Date(),
      },
    ]);
  };

  // Validation actions (navigate to next or finish)
  const openValidate = () => setShowValidationDialog(true);
  const confirmValidate = async () => {
    try {
      const userId = localStorage.getItem('bizwizuser_id');
      const formDataId = localStorage.getItem('bizwiz_form_data_id');
      await ApiService('/validate-slogans', 'POST', { user_id: userId, form_data_id: formDataId });
      setIsValidated(true);
      setShowValidationDialog(false);
      // Next step after slogans validation (adjust route as needed)
      if (navigate) {
        navigate('/call');
      }
    } catch (err) {
      // ignore
    }
  };

  const openAIModal = () => setShowAIModal(true);
  const submitAIModal = async () => {
    if (!aiPrompt.trim() || remainingAIMods === 0) return;
    try {
      const userId = localStorage.getItem('bizwizuser_id');
      const formDataId = localStorage.getItem('bizwiz_form_data_id');
      const response = await ApiService('/request-slogans-ai-modification', 'POST', {
        user_id: userId,
        form_data_id: formDataId,
        modification_prompt: aiPrompt,
      });
      if (response.success && response.slogans) {
        const cleaned = cleanSlogans(response.slogans);
        setSlogans(cleaned);
        setExistingSlogans(cleaned);
        setChatMessages((prev) => [
          ...prev,
          { id: 'ai-mod', type: 'ai', content: t('sloganComponent.updatedMessage'), timestamp: new Date() },
          ...cleaned.map((slogan, index) => ({ id: `slogan-${Date.now()}-${index}`, type: 'ai', content: slogan, timestamp: new Date() })),
        ]);
        setRemainingAIMods(typeof response.remaining_modifications === 'number' ? response.remaining_modifications : remainingAIMods);
        setIsValidated(false); // any change requires re-validation
      }
    } catch (err) {
      setChatMessages((prev) => [...prev, { id: 'ai-mod-error', type: 'ai', content: t('sloganComponent.errorModify'), timestamp: new Date() }]);
    } finally {
      setShowAIModal(false);
      setAiPrompt('');
    }
  };

  const openManualModal = () => {
    setManualText(slogans.join('\n'));
    setShowManualModal(true);
  };
  const saveManualModal = async () => {
    const updated = manualText
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    try {
      const userId = localStorage.getItem('bizwizuser_id');
      const formDataId = localStorage.getItem('bizwiz_form_data_id');
      const response = await ApiService('/manually-edit-slogans', 'POST', {
        user_id: userId,
        form_data_id: formDataId,
        edited_content: updated.join('\n'),
      });
      if (response.success) {
        setSlogans(updated);
        setExistingSlogans(updated);
        setIsValidated(false); // any manual change requires re-validation
      }
    } catch (err) {
      // ignore
    } finally {
      setShowManualModal(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-var(--navbar-height,68px))] bg-black flex items-center justify-center p-4 sm:p-6 md:p-8">
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
              {t('sloganComponent.title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-gray-300 text-base sm:text-lg font-montserrat"
            >
              {t('sloganComponent.subtitle')}
            </motion.p>
          </div>
          <Button onClick={() => setCurrentView('business')} className="bg-white/20 text-white border border-white/30 hover:bg-white/30 font-montserrat">
            <ArrowLeft className="w-5 h-5 mr-2" /> {t('sloganComponent.back')}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Prompt + Results */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Prompt Card */}
            <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-lg border border-white/20 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white font-montserrat">{t('sloganComponent.promptTitle')}</h2>
                  <p className="text-sm text-gray-300 font-montserrat">{t('sloganComponent.promptSubtitle')}</p>
                </div>
              </div>

              <div className="space-y-4">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={4}
                  className="w-full bg-white/10 border border-white/30 rounded-xl text-white placeholder-gray-400 p-4 font-montserrat"
                  placeholder={t('sloganComponent.inputPlaceholder')}
                  disabled={existingSlogans.length > 0}
                />
                <div className="flex gap-3">
                  <Button
                    onClick={generateSlogans}
                    className="px-6 py-3 bg-white/20 text-white border border-white/30 rounded-xl hover:bg-white/30 transition-all duration-300 flex items-center gap-2 disabled:opacity-50"
                    disabled={loading || !prompt.trim() || existingSlogans.length > 0}
                  >
                    <Send className="w-5 h-5" /> {t('sloganComponent.generate')}
                  </Button>
                </div>
              </div>
            </div>

            {/* Results Card */}
            <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-lg border border-white/20 p-6 md:p-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white font-montserrat">{t('sloganComponent.generatedTitle')}</h2>
                {slogans.length > 0 && (
                  <span className="text-sm text-gray-300 font-montserrat">{t('sloganComponent.countFound', { count: slogans.length })}</span>
                )}
              </div>

              {error && <p className="text-red-400 mb-4 font-montserrat">{error}</p>}

              {loading && (
                <div className="flex items-center gap-2 text-gray-300 font-montserrat mb-4">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  {t('sloganComponent.loading')}
                </div>
              )}

              {slogans.length === 0 ? (
                <p className="text-gray-400 font-montserrat">{t('sloganComponent.noResults')}</p>
              ) : (
                <div className="grid gap-4">
                  {slogans.map((slogan, index) => (
                    <div
                      key={index}
                      className={`p-4 bg-white/5 rounded-xl border ${
                        selectedSlogan === slogan ? 'border-white/50' : 'border-white/20'
                      } hover:border-white/40 transition-all duration-300`}
                    >
                      <p className="text-gray-200 text-sm font-montserrat">{slogan}</p>
                      <div className="mt-3 flex gap-2">
                        <Button
                          onClick={() => selectSlogan(slogan)}
                          className="px-4 py-1 bg-white/20 text-white text-sm rounded-lg border border-white/30 hover:bg-white/30 transition-all duration-300 disabled:opacity-50"
                          disabled={selectedSlogan === slogan}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" /> {selectedSlogan === slogan ? t('sloganComponent.selected') : t('sloganComponent.select')}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Right: Actions Panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Validation */}
            <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-lg border border-white/20 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-500/20 backdrop-blur-sm rounded-lg border border-green-500/30">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-white font-montserrat">{t('sloganComponent.validationTitle')}</h3>
              </div>
              <p className="text-sm text-gray-300 font-montserrat mb-4">{t('sloganComponent.validationDescription')}</p>
              <Button
                onClick={openValidate}
                disabled={isValidated || slogans.length === 0}
                className="w-full bg-green-600/20 backdrop-blur-sm text-green-300 font-bold py-3 rounded-xl hover:bg-green-600/30 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 font-montserrat border border-green-500/30"
              >
                <CheckCircle className="w-4 h-4" /> {isValidated ? t('sloganComponent.validated') : t('sloganComponent.validate')}
              </Button>
            </div>

            {/* AI Modification (UI only) */}
            <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-lg border border-white/20 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500/20 backdrop-blur-sm rounded-lg border border-blue-500/30">
                  <MessageCircle className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white font-montserrat">{t('sloganComponent.aiPanelTitle')}</h3>
              </div>
              <p className="text-sm text-gray-300 font-montserrat mb-4">{t('sloganComponent.aiPanelDescription', { remaining: remainingAIMods })}</p>
              <Button
                onClick={openAIModal}
                disabled={slogans.length === 0}
                className="w-full bg-blue-600/20 backdrop-blur-sm text-blue-300 font-bold py-3 rounded-xl hover:bg-blue-600/30 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 font-montserrat border border-blue-500/30"
              >
                {t('sloganComponent.openAIModalButton')}
              </Button>
            </div>

            {/* Manual Edit (UI only) */}
            <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-lg border border-white/20 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-500/20 backdrop-blur-sm rounded-lg border border-purple-500/30">
                  <Edit className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-white font-montserrat">{t('sloganComponent.manualPanelTitle')}</h3>
              </div>
              <p className="text-sm text-gray-300 font-montserrat mb-4">{t('sloganComponent.manualPanelDescription')}</p>
              <Button
                onClick={openManualModal}
                disabled={slogans.length === 0}
                className="w-full bg-purple-600/20 backdrop-blur-sm text-purple-300 font-bold py-3 rounded-xl hover:bg-purple-600/30 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 font-montserrat border border-purple-500/30"
              >
                {t('sloganComponent.openManualEditor')}
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Validation Dialog */}
      <AlertDialog open={showValidationDialog} onOpenChange={setShowValidationDialog}>
        <AlertDialogContent className="bg-white/10 backdrop-blur-3xl border border-white/20">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white font-montserrat">{t('sloganComponent.validationDialogTitle')}</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-300 font-montserrat">
              {t('sloganComponent.validationDialogDescription')}
              <br /><br />
              <strong className="text-red-400">{t('sloganComponent.validationWarning')}</strong> {t('sloganComponent.validationNoReturn')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 font-montserrat">{t('sloganComponent.cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={confirmValidate} className="bg-green-600/20 backdrop-blur-sm text-green-300 border border-green-500/30 hover:bg-green-600/30 font-montserrat">{t('sloganComponent.confirm')}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* AI Modification Modal (UI only) */}
      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white/10 backdrop-blur-3xl rounded-3xl border border-white/20 p-6 w-full max-w-2xl">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-white font-montserrat">{t('sloganComponent.aiModalTitle')}</h3>
              <p className="text-sm text-gray-300 font-montserrat">{t('sloganComponent.aiModalHelp')}</p>
            </div>
            <textarea
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              rows={5}
              className="w-full bg-white/10 border border-white/30 rounded-xl text-white placeholder-gray-400 p-3 font-montserrat"
              placeholder={t('sloganComponent.aiModalPlaceholder')}
            />
            <div className="flex gap-3 mt-4">
              <Button onClick={() => setShowAIModal(false)} className="flex-1 bg-white/20 text-white border border-white/30 hover:bg-white/30 font-montserrat">{t('sloganComponent.cancel')}</Button>
              <Button onClick={submitAIModal} disabled={!aiPrompt.trim()} className="flex-1 bg-blue-600/20 text-blue-300 border border-blue-500/30 hover:bg-blue-600/30 disabled:opacity-50 font-montserrat">{t('sloganComponent.submit')}</Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Manual Edit Modal (UI only) */}
      {showManualModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white/10 backdrop-blur-3xl rounded-3xl border border-white/20 p-6 w-full max-w-3xl">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-white font-montserrat">{t('sloganComponent.manualModalTitle')}</h3>
              <p className="text-sm text-gray-300 font-montserrat">{t('sloganComponent.manualModalHelp')}</p>
            </div>
            <textarea
              value={manualText}
              onChange={(e) => setManualText(e.target.value)}
              rows={12}
              className="w-full bg-white/10 border border-white/30 rounded-xl text-white placeholder-gray-400 p-3 font-montserrat"
              placeholder={t('sloganComponent.manualModalPlaceholder')}
            />
            <div className="flex gap-3 mt-4">
              <Button onClick={() => setShowManualModal(false)} className="flex-1 bg-white/20 text-white border border-white/30 hover:bg-white/30 font-montserrat">{t('sloganComponent.cancel')}</Button>
              <Button onClick={saveManualModal} disabled={!manualText.trim()} className="flex-1 bg-purple-600/20 text-purple-300 border border-purple-500/30 hover:bg-purple-600/30 disabled:opacity-50 font-montserrat">{t('sloganComponent.save')}</Button>
            </div>
          </motion.div>
        </div>
      )}

      <style>{`
        .font-montserrat { font-family: 'Montserrat', sans-serif; }
      `}</style>
    </div>
  );
};

export default SloganGeneration;