import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Type, Download, CheckCircle, Save, RefreshCw, Check, Copy, Eye, MessageSquare, Edit3, X } from 'lucide-react';
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
import { useFormContext } from '@/contexts/FormContext';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import LevelHeader from '@/components/multiStepForm/LevelHeader';
import TopHeaderBar from '@/components/multiStepForm/TopHeaderBar';
import ApiService from '@/apiService';

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <h1 className="text-2xl text-center text-gradient-bizzwiz font-montserrat">
          {t('font_selection.error_boundary')}
        </h1>
      );
    }
    return this.props.children;
  }
}

const fonts = [
  { id: '1', name: 'Roboto', family: 'Roboto, sans-serif', category: 'Sans Serif', popularity: 'Most Popular' },
  { id: '2', name: 'Open Sans', family: 'Open Sans, sans-serif', category: 'Sans Serif', popularity: 'Popular' },
  { id: '3', name: 'Montserrat', family: 'Montserrat, sans-serif', category: 'Sans Serif', popularity: 'Trending' },
  { id: '4', name: 'Lato', family: 'Lato, sans-serif', category: 'Sans Serif', popularity: 'Popular' },
  { id: '5', name: 'Playfair Display', family: 'Playfair Display, serif', category: 'Serif', popularity: 'Elegant' },
  { id: '6', name: 'Raleway', family: 'Raleway, sans-serif', category: 'Sans Serif', popularity: 'Modern' },
  { id: '7', name: 'Merriweather', family: 'Merriweather, serif', category: 'Serif', popularity: 'Readable' },
  { id: '8', name: 'Poppins', family: 'Poppins, sans-serif', category: 'Sans Serif', popularity: 'Trending' },
  { id: '9', name: 'Nunito', family: 'Nunito, sans-serif', category: 'Sans Serif', popularity: 'Friendly' },
  { id: '10', name: 'Oswald', family: 'Oswald, sans-serif', category: 'Sans Serif', popularity: 'Bold' },
  { id: '11', name: 'Orbitron', family: 'Orbitron, sans-serif', category: 'Futuristic', popularity: 'Unique' },
  { id: '12', name: 'Exo 2', family: 'Exo 2, sans-serif', category: 'Futuristic', popularity: 'Tech' },
  { id: '13', name: 'Bebas Neue', family: 'Bebas Neue, sans-serif', category: 'Display', popularity: 'Impact' },
  { id: '14', name: 'Source Code Pro', family: 'Source Code Pro, monospace', category: 'Monospace', popularity: 'Code' },
  { id: '15', name: 'Inter', family: 'Inter, sans-serif', category: 'Sans Serif', popularity: 'UI Design' },
  { id: '16', name: 'Rubik', family: 'Rubik, sans-serif', category: 'Sans Serif', popularity: 'Rounded' },
  { id: '17', name: 'Cinzel', family: 'Cinzel, serif', category: 'Serif', popularity: 'Classical' },
  { id: '18', name: 'Teko', family: 'Teko, sans-serif', category: 'Condensed', popularity: 'Compact' },
];

const FontSelection = ({ setCurrentView }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { formData, updateFormData, nextStep, prevStep } = useFormContext();
  const [selectedFont, setSelectedFont] = useState(() => formData.font ? fonts.find(f => f.name === formData.font) : null);
  const [previewText, setPreviewText] = useState(t('font_selection.preview_text', { defaultValue: 'The quick brown fox jumps over the lazy dog' }));
  const [filterCategory, setFilterCategory] = useState('All');
  const [isValidated, setIsValidated] = useState(false);
  const [showValidationDialog, setShowValidationDialog] = useState(false);
  const chatEndRef = useRef(null);

  const [showAIModificationModal, setShowAIModificationModal] = useState(false);
  const [aiModificationPrompt, setAiModificationPrompt] = useState('');
  const [aiModificationLoading, setAiModificationLoading] = useState(false);
  const [showManualEditModal, setShowManualEditModal] = useState(false);
  const [editedFont, setEditedFont] = useState('');
  const [manualEditLoading, setManualEditLoading] = useState(false);
  const [modificationStatus, setModificationStatus] = useState({
    ai_modification_count: 0,
    remaining_ai_modifications: 2,
    manual_edit_count: 0,
    is_validated: false,
    current_credits: 0,
    can_use_ai: true
  });

  const isRtl = i18n.language === 'ar';

  const categories = ['All', 'Sans Serif', 'Serif', 'Display', 'Monospace', 'Futuristic', 'Condensed'];

  useEffect(() => {
    const current = formData?.font || '';
    const next = selectedFont ? selectedFont.name : '';
    if (current !== next) {
      updateFormData({ font: next });
    }
  }, [selectedFont, updateFormData, formData?.font]);

  useEffect(() => {
    const autogen = async () => {
      try {
        const userId = localStorage.getItem('bizwizuser_id') || localStorage.getItem('bizzwiz-userId');
        const formDataId = localStorage.getItem('bizwiz_form_data_id');
        if (!userId || !formDataId) return;
        const res = await ApiService('/generate-font-selection', 'POST', { user_id: userId, form_data_id: formDataId });
        if (res.font_selection) {
          const match = fonts.find(f => f.name === res.font_selection) || null;
          setSelectedFont(match);
        }
        await fetchFontStatus();
      } catch (e) {
        // silent
      }
    };
    autogen();
  }, []);

  const fetchFontStatus = async () => {
    try {
      const userId = localStorage.getItem('bizwizuser_id') || localStorage.getItem('bizzwiz-userId');
      const formDataId = localStorage.getItem('bizwiz_form_data_id');
      const res = await ApiService('/font-selection-status', 'GET', { user_id: userId, form_data_id: formDataId });
      setModificationStatus(res);
      setIsValidated(res.is_validated);
    } catch (e) {
      // silent
    }
  };

  const handleSelect = (font) => {
    setSelectedFont(font);
  };

  const getRandomFont = () => {
    const randomIndex = Math.floor(Math.random() * fonts.length);
    setSelectedFont(fonts[randomIndex]);
  };

  const filteredFonts = filterCategory === 'All' 
    ? fonts 
    : fonts.filter(font => font.category === filterCategory);

  const copyFontCSS = () => {
    if (selectedFont) {
      const cssCode = `font-family: ${selectedFont.family};`;
      navigator.clipboard.writeText(cssCode);
      alert(t('font_selection.copy_font_alert', { css_code: cssCode }));
    }
  };

  const downloadFontInfo = () => {
    if (selectedFont) {
      const fontInfo = `
${t('font_selection.font_name')}: ${selectedFont.name}
${t('font_selection.font_family')}: ${selectedFont.family}
${t('font_selection.category')}: ${selectedFont.category}
${t('font_selection.preview')}: ${previewText}
${t('font_selection.css')}: font-family: ${selectedFont.family};
      `;
      const blob = new Blob([fontInfo], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${selectedFont.name.replace(/\s+/g, '-').toLowerCase()}-font-info.txt`;
      a.click();
      URL.revokeObjectURL(url);
      alert(t('font_selection.download_font_info', { font_name: selectedFont.name }));
    }
  };

  const handleValidation = () => {
    setShowValidationDialog(true);
  };

  const confirmValidation = async () => {
    try {
      let userId = localStorage.getItem('bizwizuser_id') || localStorage.getItem('bizzwiz-userId');
      let formDataId = localStorage.getItem('bizwiz_form_data_id');

      if (!userId) {
        alert(t('font_selection.missing_user'));
        navigate('/login');
        return;
      }
      if (!formDataId) {
        alert(t('font_selection.no_project'));
        navigate('/select-project');
        return;
      }

      await ApiService('/validate-font-selection', 'POST', { user_id: userId, form_data_id: formDataId });
      setIsValidated(true);
      setShowValidationDialog(false);
      await fetchFontStatus();
      if (navigate) {
        navigate('/logo', { state: { colorPalette: formData?.colorPalette || [], font: selectedFont?.name || '' } });
      } else if (typeof setCurrentView === 'function') {
        setCurrentView('logo');
      }
    } catch (e) {
      // silent
    }
  };

  const handleAIModification = () => {
    setShowAIModificationModal(true);
  };

  const submitAIModification = async () => {
    if (!aiModificationPrompt.trim()) return;
    setAiModificationLoading(true);
    try {
      const userId = localStorage.getItem('bizwizuser_id') || localStorage.getItem('bizzwiz-userId');
      const formDataId = localStorage.getItem('bizwiz_form_data_id');
      const res = await ApiService('/request-font-ai-modification', 'POST', {
        user_id: userId,
        form_data_id: formDataId,
        modification_prompt: aiModificationPrompt
      });
      if (res.success && res.font_selection) {
        const match = fonts.find(f => f.name === res.font_selection) || null;
        setSelectedFont(match);
        setAiModificationPrompt('');
        setShowAIModificationModal(false);
        await fetchFontStatus();
        if (res.credits_deducted && res.remaining_credits !== undefined) {
          console.log(`AI modification successful! ${res.credits_deducted} credits deducted. Remaining credits: ${res.remaining_credits}`);
        }
      }
    } catch (err) {
      if (err.response?.data?.requires_credits) {
        if (err.response.data.error.includes('Insufficient credits')) {
          alert(t('font_selection.ai_modification_error_insufficient_credits', {
            required_credits: err.response.data.required_credits,
            current_credits: err.response.data.current_credits
          }));
        } else if (err.response.data.error.includes('Maximum AI modifications')) {
          alert(t('font_selection.ai_modification_error_max_reached'));
        }
        await fetchFontStatus();
      } else {
        alert(t('font_selection.ai_modification_error_generic'));
      }
    } finally {
      setAiModificationLoading(false);
    }
  };

  const handleManualEdit = () => {
    setEditedFont(selectedFont?.name || '');
    setShowManualEditModal(true);
  };

  const saveManualEdit = async () => {
    if (!editedFont) return;
    setManualEditLoading(true);
    try {
      const userId = localStorage.getItem('bizwizuser_id') || localStorage.getItem('bizzwiz-userId');
      const formDataId = localStorage.getItem('bizwiz_form_data_id');
      const res = await ApiService('/manually-edit-font-selection', 'POST', {
        user_id: userId,
        form_data_id: formDataId,
        edited_font: editedFont
      });
      if (res.success) {
        const match = fonts.find(f => f.name === editedFont) || null;
        setSelectedFont(match);
        setShowManualEditModal(false);
        await fetchFontStatus();
      }
    } catch (e) {
      alert(t('font_selection.manual_edit_error'));
    } finally {
      setManualEditLoading(false);
    }
  };

  return (
    <ErrorBoundary>
      <div
        className={`min-h-[calc(100vh-var(--navbar-height,68px))] bg-bizzwiz-background flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 ${isRtl ? 'rtl' : ''}`}
        role="main"
        aria-label={t('font_selection.level_header')}
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        <div className="w-full max-w-7xl space-y-4 mb-8">
          <TopHeaderBar />
          <LevelHeader levelno="Level 3" heading={t('font_selection.level_header')} />
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
              {t('font_selection.main_heading')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-bizzwiz-text-alt text-base sm:text-lg max-w-2xl mx-auto font-montserrat"
            >
              {t('font_selection.main_description')}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: isRtl ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2 bg-bizzwiz-card-secondary backdrop-blur-2xl rounded-3xl shadow-lg border border-bizzwiz-border p-6 md:p-8"
              role="region"
              aria-label={t('font_selection.typography_studio')}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-bizzwiz-accent-primary/20 backdrop-blur-sm rounded-xl border border-bizzwiz-accent-primary/30 shadow-[0_0_15px_rgba(159,67,242,0.3)]">
                  <Type className="w-6 h-6 text-bizzwiz-accent-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gradient-bizzwiz font-montserrat">{t('font_selection.typography_studio')}</h2>
                  <p className="text-sm text-bizzwiz-text-alt font-montserrat">{t('font_selection.typography_description')}</p>
                </div>
              </div>

              {selectedFont && (
                <div className="bg-bizzwiz-card-secondary/50 backdrop-blur-sm rounded-xl p-6 mb-6 border border-bizzwiz-border hover:border-bizzwiz-accent-primary/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(159,67,242,0.2)]">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gradient-bizzwiz font-montserrat">{t('font_selection.selected_font_preview')}</h3>
                    <span className="text-xs text-bizzwiz-text-alt bg-bizzwiz-accent-primary/20 px-2 py-1 rounded-full border border-bizzwiz-accent-primary/30">
                      {t(`font_selection.popularity.${selectedFont.popularity.toLowerCase().replace(/\s+/g, '_')}`, { defaultValue: selectedFont.popularity })}
                    </span>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-bizzwiz-text-alt font-montserrat mb-2">{t('font_selection.font_name_category')}</p>
                      <p className="text-xl font-semibold text-bizzwiz-text" style={{ fontFamily: selectedFont.family }}>
                        {selectedFont.name} - {t(`font_selection.category.${selectedFont.category.toLowerCase().replace(/\s+/g, '_')}`, { defaultValue: selectedFont.category })}
                      </p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-bizzwiz-border/50">
                      <p className="text-lg leading-relaxed" style={{ fontFamily: selectedFont.family, color: '#e2e8f0' }}>
                        {previewText}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-lg font-semibold text-gradient-bizzwiz font-montserrat">{t('font_selection.font_categories')}</h3>
                  <Button
                    onClick={getRandomFont}
                    size="sm"
                    className="bg-blue-600/20 backdrop-blur-sm text-blue-300 border border-blue-500/30 hover:bg-blue-600/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] font-montserrat"
                    aria-label={t('font_selection.random_button')}
                  >
                    <RefreshCw className="w-4 h-4 mr-1" />
                    {t('font_selection.random_button')}
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      onClick={() => setFilterCategory(category)}
                      size="sm"
                      className={cn(
                        "font-montserrat transition-all duration-300",
                        filterCategory === category
                          ? "bg-bizzwiz-accent-primary/30 text-bizzwiz-accent-primary border border-bizzwiz-accent-primary/50 shadow-[0_0_10px_rgba(159,67,242,0.3)]"
                          : "bg-bizzwiz-card-secondary/50 text-bizzwiz-text-alt border border-bizzwiz-border hover:bg-bizzwiz-card-secondary/80"
                      )}
                      aria-label={t(`font_selection.category.${category.toLowerCase().replace(/\s+/g, '_')}`, { defaultValue: category })}
                    >
                      {t(`font_selection.category.${category.toLowerCase().replace(/\s+/g, '_')}`, { defaultValue: category })}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="max-h-96 overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {filteredFonts.map((font) => (
                    <Button
                      key={font.id}
                      onClick={() => handleSelect(font)}
                      variant="outline"
                      className={cn(
                        "h-auto py-4 flex flex-col items-center justify-center text-base group relative bg-bizzwiz-card-secondary/50 backdrop-blur-sm border transition-all duration-300 font-montserrat",
                        selectedFont?.id === font.id 
                          ? "bg-bizzwiz-accent-primary/20 border-bizzwiz-accent-primary text-bizzwiz-accent-primary shadow-[0_0_15px_rgba(159,67,242,0.3)]" 
                          : "border-bizzwiz-border text-bizzwiz-text-alt hover:border-bizzwiz-accent-primary/50 hover:bg-bizzwiz-card-secondary/80"
                      )}
                      aria-pressed={selectedFont?.id === font.id}
                      aria-label={font.name}
                    >
                      <span
                        style={{ fontFamily: font.family }}
                        className="text-lg mb-2 transition-all duration-300"
                      >
                        {font.name}
                      </span>
                      <span
                        style={{ fontFamily: font.family }}
                        className="text-sm opacity-70"
                      >
                        {t('font_selection.sample_text', { defaultValue: 'Sample Text' })}
                      </span>
                      <span className="text-xs mt-1 opacity-60">
                        {t(`font_selection.category.${font.category.toLowerCase().replace(/\s+/g, '_')}`, { defaultValue: font.category })}
                      </span>
                      {selectedFont?.id === font.id && (
                        <div className="absolute top-2 right-2 bg-bizzwiz-accent-primary/80 backdrop-blur-sm rounded-full p-1 border border-bizzwiz-accent-primary/50">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </Button>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: isRtl ? -40 : 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
              role="complementary"
              aria-label={t('font_selection.validate_font_section')}
            >
              <div className="bg-bizzwiz-card-secondary backdrop-blur-2xl rounded-3xl shadow-lg border border-bizzwiz-border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-500/20 backdrop-blur-sm rounded-lg border border-green-500/30 shadow-[0_0_10px_rgba(34,197,94,0.3)]">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gradient-bizzwiz font-montserrat">{t('font_selection.validate_font_section')}</h3>
                </div>
                <p className="text-sm text-bizzwiz-text-alt font-montserrat mb-4">{t('font_selection.validate_font_description')}</p>
                <Button
                  onClick={handleValidation}
                  disabled={!selectedFont || isValidated}
                  className="w-full bg-green-600/20 backdrop-blur-sm text-green-300 font-bold py-3 rounded-xl hover:bg-green-600/30 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 font-montserrat border border-green-500/30"
                  aria-label={isValidated ? t('font_selection.validate_font_button_validated') : t('font_selection.validate_font_button')}
                >
                  <CheckCircle className="w-4 h-4" />
                  {isValidated ? t('font_selection.validate_font_button_validated') : t('font_selection.validate_font_button')}
                </Button>
              </div>

              <div className="bg-bizzwiz-card-secondary backdrop-blur-2xl rounded-3xl shadow-lg border border-bizzwiz-border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-500/20 backdrop-blur-sm rounded-lg border border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                    <MessageSquare className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gradient-bizzwiz font-montserrat">{t('font_selection.ai_modification_section')}</h3>
                </div>
                <p className="text-sm text-bizzwiz-text-alt font-montserrat mb-4">
                  {modificationStatus.remaining_ai_modifications === 0
                    ? t('font_selection.no_modifications')
                    : t(`font_selection.ai_modifications_remaining${modificationStatus.remaining_ai_modifications !== 1 ? '_plural' : ''}`, { count: modificationStatus.remaining_ai_modifications })}
                </p>
                {modificationStatus.remaining_ai_modifications === 0 ? (
                  <div className="space-y-3">
                    <Button
                      onClick={() => navigate('/purchase')}
                      className="w-full bg-orange-600/20 backdrop-blur-sm text-orange-300 font-bold py-3 rounded-xl hover:bg-orange-600/30 hover:shadow-[0_0_15px_rgba(251,146,60,0.4)] transition-all duration-300 flex items-center justify-center gap-3 font-montserrat border border-orange-500/30"
                      aria-label={t('font_selection.purchase_credits_button')}
                    >
                      {t('font_selection.purchase_credits_button')}
                    </Button>
                  </div>
                ) : !modificationStatus.can_use_ai ? (
                  <div className="space-y-3">
                    <div className="text-sm text-red-400 text-center p-2 bg-red-500/10 rounded-lg border border-red-500/20">
                      {t('font_selection.insufficient_credits', { required_credits: 3 })}
                    </div>
                    <Button
                      onClick={() => navigate('/purchase')}
                      className="w-full bg-orange-600/20 backdrop-blur-sm text-orange-300 font-bold py-3 rounded-xl hover:bg-orange-600/30 hover:shadow-[0_0_15px_rgba(251,146,60,0.4)] transition-all duration-300 flex items-center justify-center gap-3 font-montserrat border border-orange-500/30"
                      aria-label={t('font_selection.purchase_credits_button')}
                    >
                      {t('font_selection.purchase_credits_button')}
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={handleAIModification}
                    className="w-full bg-blue-600/20 backdrop-blur-sm text-blue-300 font-bold py-3 rounded-xl hover:bg-blue-600/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-all duration-300 flex items-center justify-center gap-3 font-montserrat border border-blue-500/30"
                    aria-label={t('font_selection.ai_modification_section')}
                  >
                    <MessageSquare className="w-4 h-4" />
                    {t('font_selection.ai_modification_section')}
                  </Button>
                )}
              </div>

              <div className="bg-bizzwiz-card-secondary backdrop-blur-2xl rounded-3xl shadow-lg border border-bizzwiz-border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-bizzwiz-accent-primary/20 backdrop-blur-sm rounded-lg border border-bizzwiz-accent-primary/30 shadow-[0_0_10px_rgba(159,67,242,0.3)]">
                    <Edit3 className="w-5 h-5 text-bizzwiz-accent-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-gradient-bizzwiz font-montserrat">{t('font_selection.manual_edit_section')}</h3>
                </div>
                <p className="text-sm text-bizzwiz-text-alt font-montserrat mb-4">{t('font_selection.manual_edit_description')}</p>
                <Button
                  onClick={handleManualEdit}
                  className="w-full bg-bizzwiz-accent-primary/20 backdrop-blur-sm text-bizzwiz-accent-primary font-bold py-3 rounded-xl hover:bg-bizzwiz-accent-primary/30 hover:shadow-[0_0_15px_rgba(159,67,242,0.4)] transition-all duration-300 flex items-center justify-center gap-3 font-montserrat border border-bizzwiz-accent-primary/30"
                  aria-label={t('font_selection.edit_font_button')}
                >
                  <Edit3 className="w-4 h-4" />
                  {t('font_selection.edit_font_button')}
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <AlertDialog open={showValidationDialog} onOpenChange={setShowValidationDialog}>
          <AlertDialogContent className="bg-bizzwiz-card-background backdrop-blur-3xl border border-bizzwiz-border">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-gradient-bizzwiz font-montserrat">{t('font_selection.validation_dialog_title')}</AlertDialogTitle>
              <AlertDialogDescription className="text-bizzwiz-text-alt font-montserrat">
                {t('font_selection.validation_dialog_description', { font_name: selectedFont?.name || 'None' })}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-bizzwiz-card-secondary backdrop-blur-sm text-bizzwiz-text border border-bizzwiz-border hover:bg-bizzwiz-card-secondary/80 font-montserrat">
                {t('font_selection.validation_dialog_cancel')}
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmValidation}
                className="bg-green-600/20 backdrop-blur-sm text-green-300 border border-green-500/30 hover:bg-green-600/30 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] font-montserrat"
              >
                {t('font_selection.validation_dialog_confirm')}
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
                <h3 id="ai-modification-title" className="text-xl font-semibold text-gradient-bizzwiz font-montserrat">{t('font_selection.ai_modification_modal_title')}</h3>
                <Button
                  onClick={() => setShowAIModificationModal(false)}
                  variant="ghost"
                  className="p-2 hover:bg-bizzwiz-card-secondary text-bizzwiz-text"
                  aria-label={t('font_selection.ai_modification_cancel')}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-bizzwiz-text-alt font-montserrat mb-2">{t('font_selection.ai_modification_modal_description')}</label>
                  <Textarea
                    value={aiModificationPrompt}
                    onChange={(e) => setAiModificationPrompt(e.target.value)}
                    placeholder={t('font_selection.ai_modification_placeholder')}
                    className="w-full bg-bizzwiz-card-secondary backdrop-blur-sm border border-bizzwiz-border text-bizzwiz-text placeholder-bizzwiz-text-alt/60 rounded-xl p-3 font-montserrat focus:border-bizzwiz-accent-primary/50 focus:shadow-[0_0_10px_rgba(159,67,242,0.2)]"
                    rows={4}
                    aria-label={t('font_selection.ai_modification_modal_description')}
                  />
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={() => setShowAIModificationModal(false)}
                    className="flex-1 bg-bizzwiz-card-secondary backdrop-blur-sm text-bizzwiz-text border border-bizzwiz-border hover:bg-bizzwiz-card-secondary/80 font-montserrat"
                    aria-label={t('font_selection.ai_modification_cancel')}
                  >
                    {t('font_selection.ai_modification_cancel')}
                  </Button>
                  <Button
                    onClick={submitAIModification}
                    disabled={!aiModificationPrompt.trim() || aiModificationLoading}
                    className="flex-1 bg-blue-600/20 backdrop-blur-sm text-blue-300 border border-blue-500/30 hover:bg-blue-600/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] font-montserrat disabled:opacity-50"
                    aria-label={t('font_selection.ai_modification_submit')}
                  >
                    {aiModificationLoading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-300"></div>
                    ) : (
                      t('font_selection.ai_modification_submit')
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
                <h3 id="manual-edit-title" className="text-xl font-semibold text-gradient-bizzwiz font-montserrat">{t('font_selection.manual_edit_modal_title')}</h3>
                <Button
                  onClick={() => setShowManualEditModal(false)}
                  variant="ghost"
                  className="p-2 hover:bg-bizzwiz-card-secondary text-bizzwiz-text"
                  aria-label={t('font_selection.manual_edit_cancel')}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-bizzwiz-text-alt font-montserrat mb-2">{t('font_selection.manual_edit_modal_description')}</label>
                  <select
                    value={editedFont}
                    onChange={(e) => setEditedFont(e.target.value)}
                    className="w-full bg-bizzwiz-card-secondary backdrop-blur-sm border text-black border-bizzwiz-border text-bizzwiz-text rounded-xl p-3 font-montserrat focus:border-bizzwiz-accent-primary/50"
                    aria-label={t('font_selection.manual_edit_modal_description')}
                  >
                    <option value="" disabled>{t('font_selection.manual_edit_select_placeholder')}</option>
                    {fonts.map(f => (
                      <option key={f.id} value={f.name}>{f.name} ({t(`font_selection.category.${f.category.toLowerCase().replace(/\s+/g, '_')}`, { defaultValue: f.category })})</option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={() => setShowManualEditModal(false)}
                    className="flex-1 bg-bizzwiz-card-secondary backdrop-blur-sm text-bizzwiz-text border border-bizzwiz-border hover:bg-bizzwiz-card-secondary/80 font-montserrat"
                    aria-label={t('font_selection.manual_edit_cancel')}
                  >
                    {t('font_selection.manual_edit_cancel')}
                  </Button>
                  <Button
                    onClick={saveManualEdit}
                    disabled={!editedFont || manualEditLoading}
                    className="flex-1 bg-bizzwiz-accent-primary/20 backdrop-blur-sm text-bizzwiz-accent-primary border border-bizzwiz-accent-primary/30 hover:bg-bizzwiz-accent-primary/30 hover:shadow-[0_0_15px_rgba(159,67,242,0.4)] font-montserrat disabled:opacity-50"
                    aria-label={t('font_selection.save_font_button')}
                  >
                    {manualEditLoading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-bizzwiz-accent-primary"></div>
                    ) : (
                      t('font_selection.save_font_button')
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
        `}</style>
      </div>
    </ErrorBoundary>
  );
};

export default FontSelection;
