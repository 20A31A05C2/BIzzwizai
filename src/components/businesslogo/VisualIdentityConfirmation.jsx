import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Palette, Type, Image as ImageIcon } from 'lucide-react';
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
import { useFormContext } from '@/contexts/FormContext';
import { useTranslation } from 'react-i18next';
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
          {this.props.t('visual_identity.fetch_error')}
        </h1>
      );
    }
    return this.props.children;
  }
}

const VisualIdentityConfirmation = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { formData } = useFormContext(); // Assuming formData holds colorPalette, font, logo
  const [colorPalette, setColorPalette] = useState(formData.colorPalette || []);
  const [selectedFont, setSelectedFont] = useState(formData.font || '');
  const [logoUrl, setLogoUrl] = useState(formData.logo || '');
  const [isLoading, setIsLoading] = useState(true);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

  const isRtl = i18n.language === 'ar';

  useEffect(() => {
    const fetchValidatedData = async () => {
      const userId = localStorage.getItem('bizwizuser_id');
      const formDataId = localStorage.getItem('bizwiz_form_data_id');

      if (!userId || !formDataId) {
        navigate('/login');
        return;
      }

      try {
        // Fetch design (color palette)
        const designStatus = await ApiService('/design-modification-status', 'GET', {
          user_id: userId,
          form_data_id: formDataId,
        });
        if (designStatus.color_palette && Array.isArray(designStatus.color_palette) && designStatus.is_validated) {
          setColorPalette(designStatus.color_palette);
        } else {
          navigate('/design');
          return;
        }

        // Fetch font
        const fontStatus = await ApiService('/font-selection-status', 'GET', {
          user_id: userId,
          form_data_id: formDataId,
        });
        if (fontStatus.font_selection && fontStatus.is_validated) {
          setSelectedFont(fontStatus.font_selection);
        } else {
          navigate('/font');
          return;
        }

        // Fetch logo
        const logoStatus = await ApiService('/logo-modification-status', 'GET', {
          user_id: userId,
          form_data_id: formDataId,
        });
        if (logoStatus.logo_url && logoStatus.is_logo_validated) {
          setLogoUrl(logoStatus.logo_url);
        } else {
          navigate('/logo');
          return;
        }
      } catch (err) {
        console.error('Error fetching validated data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchValidatedData();
  }, [navigate, t]);

  const handleConfirm = () => {
    setShowConfirmationDialog(true);
  };

  const confirmFinalValidation = async () => {
    try {
      const userId = localStorage.getItem('bizwizuser_id');
      const formDataId = localStorage.getItem('bizwiz_form_data_id');

      // Optional: Call an API to mark final visual identity as confirmed
      await ApiService('/validate-visual-identity', 'POST', {
        user_id: userId,
        form_data_id: formDataId,
      });

      setShowConfirmationDialog(false);
      navigate('/call');
    } catch (err) {
      console.error('Final validation failed:', err);
      // Proceed anyway if API fails
      navigate('/call');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        <p className="ml-2 text-white">{t('visual_identity.loading')}</p>
      </div>
    );
  }

  if (!colorPalette.length || !selectedFont || !logoUrl) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <p className="text-white mb-4">{t('visual_identity.no_data_to_display')}</p>
        <div className="flex gap-4">
          <Button
            onClick={() => navigate('/design')}
            className="bg-blue-600/20 backdrop-blur-sm text-blue-300 font-bold py-2 px-4 rounded-xl hover:bg-blue-600/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-all duration-300 font-montserrat border border-blue-500/30"
          >
            {t('visual_identity.go_back_design')}
          </Button>
          <Button
            onClick={() => navigate('/logo')}
            className="bg-purple-600/20 backdrop-blur-sm text-purple-300 font-bold py-2 px-4 rounded-xl hover:bg-purple-600/30 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all duration-300 font-montserrat border border-purple-500/30"
          >
            {t('visual_identity.go_back_button')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary t={t}>
      <div
        className={`min-h-[calc(100vh-var(--navbar-height,68px))] bg-bizzwiz-background flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 ${isRtl ? 'rtl' : ''}`}
        role="main"
        aria-label={t('visual_identity.level_header')}
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        <div className="w-full max-w-7xl space-y-4 mb-8">
          <TopHeaderBar />
          <LevelHeader levelno="Level 5" heading={t('visual_identity.level_header')} />
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
              {t('visual_identity.confirm_description')}
            </motion.h1>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-12">
            {/* Color Palette Display */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-blue-900 rounded-lg mb-2" style={{ backgroundColor: colorPalette[0] || '#0000ff' }}></div>
              <p className="text-sm text-bizzwiz-text-alt font-montserrat">{t('visual_identity.color_palette_title')}</p>
            </div>

            {/* Logo Display */}
            <div className="flex flex-col items-center">
              {logoUrl ? (
                <img src={logoUrl} alt={t('visual_identity.validated_logo_alt')} className="w-24 h-24 object-contain mb-2" />
              ) : (
                <div className="w-24 h-24 bg-black rounded-lg flex items-center justify-center mb-2">
                  <ImageIcon className="w-12 h-12 text-white" />
                </div>
              )}
              <p className="text-sm text-bizzwiz-text-alt font-montserrat">{t('visual_identity.logo_title')}</p>
            </div>

            {/* Font Display */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-black rounded-lg flex items-center justify-center mb-2" style={{ fontFamily: selectedFont }}>
                <p className="text-white text-sm" style={{ fontFamily: selectedFont }}>{selectedFont || 'LEAGUE SPARTAN'}</p>
              </div>
              <p className="text-sm text-bizzwiz-text-alt font-montserrat">{t('visual_identity.font_title')}</p>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={handleConfirm}
              className="bg-purple-600/20 backdrop-blur-sm text-purple-300 font-bold py-3 px-8 rounded-xl hover:bg-purple-600/30 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all duration-300 flex items-center justify-center gap-3 font-montserrat border border-purple-500/30"
              aria-label={t('visual_identity.confirm_button')}
            >
              <CheckCircle className="w-4 h-4" />
              {t('visual_identity.confirm_button')}
            </Button>
          </div>
        </motion.div>

        <AlertDialog open={showConfirmationDialog} onOpenChange={setShowConfirmationDialog}>
          <AlertDialogContent className="bg-bizzwiz-card-background backdrop-blur-3xl border border-bizzwiz-border">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-gradient-bizzwiz font-montserrat">
                {t('visual_identity.confirm_button')}
              </AlertDialogTitle>
              <AlertDialogDescription className="text-bizzwiz-text-alt font-montserrat">
                {t('visual_identity.confirm_description')}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-bizzwiz-card-secondary backdrop-blur-sm text-bizzwiz-text border border-bizzwiz-border hover:bg-bizzwiz-card-secondary/80 font-montserrat">
                {t('visual_identity.go_back_button')}
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmFinalValidation}
                className="bg-green-600/20 backdrop-blur-sm text-green-300 border border-green-500/30 hover:bg-green-600/30 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] font-montserrat"
              >
                {t('visual_identity.confirm_button')}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <style>{`
          .text-gradient-bizzwiz {
            background: linear-gradient(to right, #9f43f2, #f43f5e);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
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
        `}</style>
      </div>
    </ErrorBoundary>
  );
};

export default VisualIdentityConfirmation;