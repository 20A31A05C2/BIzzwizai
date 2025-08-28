import React, { useEffect, useState } from 'react';
import { FileText, ImageIcon, Quote, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import ApiService from '@/apiService';
import { jsPDF } from 'jspdf';

const AiPage = () => {
  const { t } = useTranslation();
  const [businessPlan, setBusinessPlan] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [slogans, setSlogans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFinalizedData = async () => {
      const userId = localStorage.getItem('bizwizuser_id');
      const formDataId = localStorage.getItem('bizwiz_form_data_id');
      if (!userId || !formDataId) {
        setError(t('aiPage.error.missingIds'));
        setLoading(false);
        return;
      }

      try {
        // 1) Check business plan validation status
        let businessPlanFetched = false;
        try {
          const bpStatus = await ApiService('/business-plan-modification-status', 'GET', { 
            user_id: userId, 
            form_data_id: formDataId 
          });
          if (bpStatus?.is_validated) {
            // Fetch business plan only if validated
            const bpResponse = await ApiService('/generate-business-plan', 'POST', { 
              user_id: userId, 
              form_data_id: formDataId 
            });
            if (bpResponse?.business_plan) {
              setBusinessPlan(bpResponse.business_plan);
              businessPlanFetched = true;
            }
          }
        } catch (err) {
          console.error('Business plan fetch error:', err);
          // Continue to allow other sections to render
        }

        // 2) Check logo validation status
        try {
          const logoStatus = await ApiService('/logo-modification-status', 'GET', { 
            user_id: userId, 
            form_data_id: formDataId 
          });
          if (logoStatus?.is_logo_validated && logoStatus?.logo_url) {
            setLogoUrl(logoStatus.logo_url);
          }
        } catch (err) {
          console.error('Logo fetch error:', err);
          // Continue to allow other sections to render
        }

        // 3) Fetch slogans only if they exist
        try {
          const slogansResponse = await ApiService('/generate-slogans', 'POST', { 
            user_id: userId, 
            form_data_id: formDataId, 
            prompt: 'check' 
          });
          if (slogansResponse?.slogans) {
            setSlogans(slogansResponse.slogans);
          }
        } catch (err) {
          console.error('Slogans fetch error:', err);
          // Continue to allow other sections to render
        }

        // Only set loading to false if no business plan was fetched or if both status checks are complete
        if (!businessPlanFetched || (businessPlanFetched && logoUrl)) {
          setLoading(false);
        }
      } catch (err) {
        setError(err.message || t('aiPage.error.fetchFailed'));
        setLoading(false);
      }
    };

    fetchFinalizedData();
  }, [t]);

  const downloadBusinessPlan = () => {
    if (!businessPlan) return;
    const doc = new jsPDF();
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);

    // Add a title
    doc.setFontSize(16);
    doc.text(t('aiPage.businessPlan.header'), 10, 10);
    doc.setFontSize(12);

    // Split text into lines to handle pagination
    const lines = doc.splitTextToSize(businessPlan, 190);

    // Define page dimensions and margins (in mm, default unit)
    const pageHeight = doc.internal.pageSize.getHeight();
    const marginTop = 20; // Starting y after title
    const marginBottom = 10;
    const marginLeft = 10;
    const lineHeightFactor = 1.15; // Typical line spacing factor
    const fontSize = 12; // In points
    const lineHeight = (fontSize * lineHeightFactor) / 2.83464567; // Convert pt to mm

    let y = marginTop; // Starting y position after title

    lines.forEach((line) => {
      if (y + lineHeight > pageHeight - marginBottom) {
        doc.addPage();
        y = marginTop;
      }
      doc.text(line, marginLeft, y);
      y += lineHeight;
    });

    doc.save('business-plan.pdf');
  };

  const downloadLogo = () => {
    if (!logoUrl) return;
    const link = document.createElement('a');
    link.href = logoUrl;
    link.download = 'logo.png';
    link.click();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-12 font-montserrat"
      >
        {t('aiPage.title')}
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Business Plan Section */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/10 p-6 rounded-xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-6 h-6" />
            <h2 className="text-2xl font-semibold font-montserrat">{t('aiPage.businessPlan.header')}</h2>
          </div>
          {businessPlan ? (
            <>
              <pre className="whitespace-pre-wrap text-sm overflow-y-auto max-h-64 mb-4 font-montserrat">{businessPlan}</pre>
              <Button 
                onClick={downloadBusinessPlan} 
                className="w-full bg-white/20 text-white border border-white/30 hover:bg-white/30 font-montserrat"
                aria-label={t('aiPage.businessPlan.downloadButton')}
              >
                <Download className="w-4 h-4 mr-2" />
                {t('aiPage.businessPlan.downloadButton')}
              </Button>
            </>
          ) : (
            <p className="text-gray-300 font-montserrat">{t('aiPage.businessPlan.noData')}</p>
          )}
        </motion.div>

        {/* Logo Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 p-6 rounded-xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <ImageIcon className="w-6 h-6" />
            <h2 className="text-2xl font-semibold font-montserrat">{t('aiPage.logo.header')}</h2>
          </div>
          {logoUrl ? (
            <>
              <img 
                src={logoUrl} 
                alt={t('aiPage.logo.imageAlt')} 
                className="w-full max-h-64 object-contain mb-4" 
              />
              <Button 
                onClick={downloadLogo} 
                className="w-full bg-white/20 text-white border border-white/30 hover:bg-white/30 font-montserrat"
                aria-label={t('aiPage.logo.downloadButton')}
              >
                <Download className="w-4 h-4 mr-2" />
                {t('aiPage.logo.downloadButton')}
              </Button>
            </>
          ) : (
            <p className="text-gray-300 font-montserrat">{t('aiPage.logo.noData')}</p>
          )}
        </motion.div>

        {/* Slogans Section */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/10 p-6 rounded-xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <Quote className="w-6 h-6" />
            <h2 className="text-2xl font-semibold font-montserrat">{t('aiPage.slogans.header')}</h2>
          </div>
          {slogans.length > 0 ? (
            <ul className="space-y-2">
              {slogans.map((slogan, index) => (
                <li key={index} className="text-sm border-b border-white/20 pb-2 font-montserrat">{slogan}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-300 font-montserrat">{t('aiPage.slogans.noData')}</p>
          )}
        </motion.div>
      </div>

      <style>{`
        .font-montserrat { font-family: 'Montserrat', sans-serif; }
      `}</style>
    </div>
  );
};

export default AiPage;