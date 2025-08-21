import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import {
  ArrowLeft,
  ExternalLink,
  CreditCard,
  Figma,
  Copy,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Shield,
  Clock,
  Link as LinkIcon
} from 'lucide-react';
import ApiService from '@/apiService';

const PaymentPage = () => {
  const { t } = useTranslation();
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [links, setLinks] = useState({ figma_url: '', payment_url: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [copiedLink, setCopiedLink] = useState(null);

  useEffect(() => {
    const fetchLinks = async () => {
      setIsLoading(true);
      try {
        const userId = localStorage.getItem('bizzwiz-userId');
        const projectId = localStorage.getItem('bizzwiz-selectedProjectId');
        const response = await ApiService(`/user-projects/${userId}/${projectId}/links`, 'GET');
        if (response && response.data) {
          setLinks({
            figma_url: response.data.figma_url || '',
            payment_url: response.data.payment_url || '',
          });
        } else {
          setLinks({ figma_url: '', payment_url: '' });
        }
      } catch (error) {
        setLinks({ figma_url: '', payment_url: '' });
        toast({
          title: t('paymentPage.fetchLinksError.title'),
          description: t('paymentPage.fetchLinksError.description'),
          variant: 'default',
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchLinks();
  }, [toast, t]);

  const handleCopyLink = async (url, type) => {
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedLink(type);
      toast({
        title: t('paymentPage.copySuccess.title'),
        description: t('paymentPage.copySuccess.description'),
      });
      setTimeout(() => setCopiedLink(null), 2000);
    } catch {
      toast({
        title: t('paymentPage.copyError.title'),
        description: t('paymentPage.copyError.description'),
        variant: 'destructive',
      });
    }
  };

  const openLink = (url) => {
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-[calc(100vh-var(--navbar-height,68px))] bg-black flex items-center justify-center p-4 sm:p-6 md:p-8"
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          <p className="text-gray-300 text-lg font-medium font-montserrat">{t('paymentPage.loading')}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-[calc(100vh-var(--navbar-height,68px))] bg-black flex flex-col items-center justify-center p-4 sm:p-6 md:p-8"
    >
      <div className="w-full max-w-7xl bg-white/10 backdrop-blur-3xl rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8 md:p-10">
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4"
          >
            <div className="h-12 w-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
              <CreditCard size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-3 font-montserrat">
                {t('paymentPage.header')}
              </h1>
              <p className="text-gray-300 text-base sm:text-lg font-medium font-montserrat">
                {t('paymentPage.description')}
              </p>
            </div>
          </motion.div>
          <Button
            variant="outline"
            onClick={() => navigate('/dashboard')}
            className="bg-white/10 backdrop-blur-sm text-white font-medium py-3 px-4 rounded-xl hover:bg-white/20 hover:shadow-lg hover:shadow-white/20 transition-all duration-300 border border-white/30 font-montserrat"
          >
            <ArrowLeft size={20} className="mr-2" />
            {t('paymentPage.back')}
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Figma Link Card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-lg border border-white/20 hover:border-white/40 hover:shadow-lg hover:shadow-white/20 transition-all duration-300"
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-purple-600/20 backdrop-blur-sm flex items-center justify-center border border-purple-500/30">
                  <Figma size={24} className="text-purple-300" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 font-montserrat">
                    {t('paymentPage.figma.header')}
                  </h2>
                  <p className="text-gray-300 text-sm font-medium font-montserrat">
                    {t('paymentPage.figma.description')}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/20">
                  <div className="flex items-center gap-2 mb-2">
                    <LinkIcon size={16} className="text-purple-300" />
                    <span className="text-sm font-medium text-purple-300 uppercase font-montserrat">
                      {t('paymentPage.figma.linkLabel')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-200 break-all font-mono">
                    {links.figma_url || t('paymentPage.fallback.notAvailable')}
                  </p>
                </div>
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openLink(links.figma_url)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-purple-600/20 backdrop-blur-sm rounded-xl text-purple-300 font-medium hover:bg-purple-600/30 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 border border-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed font-montserrat"
                    disabled={!links.figma_url}
                  >
                    <ExternalLink size={20} />
                    {t('paymentPage.figma.open')}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCopyLink(links.figma_url, 'figma')}
                    className="px-4 py-3 bg-white/10 backdrop-blur-sm rounded-xl text-white font-medium hover:bg-white/15 hover:shadow-lg hover:shadow-white/20 transition-all duration-300 border border-white/30 disabled:opacity-50 disabled:cursor-not-allowed font-montserrat"
                    disabled={!links.figma_url}
                  >
                    {copiedLink === 'figma' ? (
                      <CheckCircle2 size={20} className="text-green-300" />
                    ) : (
                      <Copy size={20} />
                    )}
                  </motion.button>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium font-montserrat">
                  {links.figma_url ? (
                    <span className="text-green-300">
                      <CheckCircle2 size={16} /> {t('paymentPage.figma.available')}
                    </span>
                  ) : (
                    <span className="text-gray-300">
                      <Clock size={16} /> {t('paymentPage.figma.pending')}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Payment Link Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-lg border border-white/20 hover:border-white/40 hover:shadow-lg hover:shadow-white/20 transition-all duration-300"
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-purple-600/20 backdrop-blur-sm flex items-center justify-center border border-purple-500/30">
                  <CreditCard size={24} className="text-purple-300" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 font-montserrat">
                    {t('paymentPage.payment.header')}
                  </h2>
                  <p className="text-gray-300 text-sm font-medium font-montserrat">
                    {t('paymentPage.payment.description')}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield size={16} className="text-purple-300" />
                    <span className="text-sm font-medium text-purple-300 uppercase font-montserrat">
                      {t('paymentPage.payment.linkLabel')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-200 break-all font-mono">
                    {links.payment_url || t('paymentPage.fallback.notAvailable')}
                  </p>
                </div>
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openLink(links.payment_url)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-purple-600/20 backdrop-blur-sm rounded-xl text-purple-300 font-medium hover:bg-purple-600/30 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 border border-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed font-montserrat"
                    disabled={!links.payment_url}
                  >
                    <CreditCard size={20} />
                    {t('paymentPage.payment.payNow')}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCopyLink(links.payment_url, 'payment')}
                    className="px-4 py-3 bg-white/10 backdrop-blur-sm rounded-xl text-white font-medium hover:bg-white/15 hover:shadow-lg hover:shadow-white/20 transition-all duration-300 border border-white/30 disabled:opacity-50 disabled:cursor-not-allowed font-montserrat"
                    disabled={!links.payment_url}
                  >
                    {copiedLink === 'payment' ? (
                      <CheckCircle2 size={20} className="text-green-300" />
                    ) : (
                      <Copy size={20} />
                    )}
                  </motion.button>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium font-montserrat">
                  {links.payment_url ? (
                    <span className="text-green-300">
                      <CheckCircle2 size={16} /> {t('paymentPage.payment.available')}
                    </span>
                  ) : (
                    <span className="text-gray-300">
                      <Clock size={16} /> {t('paymentPage.payment.pending')}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Informations Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12"
        >
          <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-lg border border-white/20 p-6">
            <h3 className="text-xl font-semibold text-white mb-6 bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 font-montserrat">
              {t('paymentPage.information.header')}
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-200 font-medium font-montserrat">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Shield size={20} className="text-purple-300 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">{t('paymentPage.information.security.header')}</h4>
                    <p>{t('paymentPage.information.security.description')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Figma size={20} className="text-purple-300 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">{t('paymentPage.information.figmaAccess.header')}</h4>
                    <p>{t('paymentPage.information.figmaAccess.description')}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <ExternalLink size={20} className="text-purple-300 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">{t('paymentPage.information.externalLinks.header')}</h4>
                    <p>{t('paymentPage.information.externalLinks.description')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Copy size={20} className="text-purple-300 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">{t('paymentPage.information.copyLinks.header')}</h4>
                    <p>{t('paymentPage.information.copyLinks.description')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Support Note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <AlertCircle size={20} className="text-purple-300" />
            <span className="text-sm text-gray-200 font-medium font-montserrat">
              {t('paymentPage.support')}
            </span>
          </div>
        </motion.div>
      </div>
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
    </motion.div>
  );
};

export default PaymentPage;