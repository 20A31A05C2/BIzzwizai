import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle, XCircle, AlertCircle, Mail } from 'lucide-react';
import ApiService from '@/apiService'; // Adjust path to your ApiService

const EmailVerificationPage = () => {
  const { t } = useTranslation();
  const { status, user_id, form_data_id } = Object.fromEntries(new URLSearchParams(window.location.search));
  const [countdown, setCountdown] = useState(5);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user_id) {
      localStorage.setItem('bizwizuser_id', user_id);
    }
    // if (form_data_id) {
    //   localStorage.setItem('bizwiz_form_data_id', form_data_id);
    // }

    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    if (status === 'success') {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            window.location.href = '/login';
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        clearInterval(timer);
        clearTimeout(loadingTimer);
      };
    }

    return () => clearTimeout(loadingTimer);
  }, [status, user_id, form_data_id]);

  const getStatusContent = () => {
    switch (status) {
      case 'success':
        return {
          icon: <CheckCircle className="w-16 h-16 text-green-500 mb-4" />,
          title: t('emailVerification.success.title'),
          message: t('emailVerification.success.message'),
          buttonText: t('emailVerification.success.buttonText'),
          buttonAction: () => window.location.href = '/login',
          buttonClass: 'bg-green-500 hover:bg-green-600',
          showCountdown: true,
        };
      case 'already-verified':
        return {
          icon: <CheckCircle className="w-16 h-16 text-blue-500 mb-4" />,
          title: t('emailVerification.alreadyVerified.title'),
          message: t('emailVerification.alreadyVerified.message'),
          buttonText: t('emailVerification.alreadyVerified.buttonText'),
          buttonAction: () => window.location.href = '/login',
          buttonClass: 'bg-blue-500 hover:bg-blue-600',
          showCountdown: false,
        };
      case 'invalid':
        return {
          icon: <XCircle className="w-16 h-16 text-red-500 mb-4" />,
          title: t('emailVerification.invalid.title'),
          message: t('emailVerification.invalid.message'),
          buttonText: t('emailVerification.invalid.buttonText'),
          buttonAction: () => window.location.href = '/resend-verification',
          buttonClass: 'bg-red-500 hover:bg-red-600',
          showCountdown: false,
        };
      case 'error':
        return {
          icon: <AlertCircle className="w-16 h-16 text-yellow-500 mb-4" />,
          title: t('emailVerification.error.title'),
          message: t('emailVerification.error.message'),
          buttonText: t('emailVerification.error.buttonText'),
          buttonAction: () => window.location.href = '/contact',
          buttonClass: 'bg-yellow-500 hover:bg-yellow-600',
          showCountdown: false,
        };
      default:
        return {
          icon: <Mail className="w-16 h-16 text-gray-500 mb-4" />,
          title: t('emailVerification.default.title'),
          message: t('emailVerification.default.message'),
          buttonText: t('emailVerification.default.buttonText'),
          buttonAction: () => window.location.href = '/',
          buttonClass: 'bg-gray-500 hover:bg-gray-600',
          showCountdown: false,
        };
    }
  };

  const statusContent = getStatusContent();

  const LoadingScreen = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0f] px-4">
      <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto">
        <div className="relative mb-8">
          <div className="w-16 h-16 md:w-20 md:h-20 border-4 border-gray-800 rounded-full animate-spin">
            <div className="w-full h-full border-4 border-t-[#9f43f2] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          </div>
          <div className="absolute inset-0 w-16 h-16 md:w-20 md:h-20 border-4 border-gray-700 rounded-full animate-pulse opacity-30"></div>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          {t('emailVerification.loading.title')}
        </h2>
        <p className="text-gray-400 text-base md:text-lg mb-6">
          {t('emailVerification.loading.description')}
        </p>
        <div className="flex justify-center space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-[#9f43f2] rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.2}s`, animationDuration: '1.5s' }}
            />
          ))}
        </div>
      </div>
    </div>
  );

  const MainContent = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0f] px-4">
      <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto">
        <div className="mb-8 transform hover:scale-105 transition-transform duration-300">
          <img
            alt={t('emailVerification.imageAlt')}
            className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain filter drop-shadow-[0_0_20px_rgba(159,67,242,0.6)]"
            src="/bee.png"
            loading="eager"
          />
        </div>
        <div className="mb-6 transform hover:scale-110 transition-transform duration-300">
          {statusContent.icon}
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
          <span className="text-white">{t('emailVerification.titlePart1')} </span>
          <span className="text-[#00bfff]">{t('emailVerification.titlePart2')} </span>
          <span className="text-[#e91e63]">{t('emailVerification.titlePart3')}</span>
        </h1>
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 mb-6 shadow-2xl">
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            {statusContent.message}
          </p>
        </div>
        {statusContent.showCountdown && (
          <div className="mb-6 bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-xl p-4">
            <p className="text-green-300 text-sm">
              {t('emailVerification.success.countdown', { countdown })}
            </p>
          </div>
        )}
        <div className="flex flex-col gap-4 w-full max-w-xs">
          <button
            onClick={statusContent.buttonAction}
            className="bg-[#e91e63] hover:bg-[#d81b60] text-white font-bold py-3 px-6 rounded-full w-full transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {statusContent.buttonText}
          </button>
          {(status === 'invalid' || status === 'error') && (
            <button
              onClick={() => window.location.href = '/'}
              className="bg-transparent border border-gray-600 text-gray-300 font-medium py-3 px-6 rounded-full w-full hover:bg-gray-800/50 transition-all duration-300"
            >
              {t('emailVerification.invalid.backToHome')}
            </button>
          )}
        </div>
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-xs mb-2">
            {t('emailVerification.footer.copyright', { year: new Date().getFullYear() })}
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="/contact"
              className="text-gray-400 text-xs hover:text-[#e91e63] transition-colors duration-200"
            >
              {t('emailVerification.footer.contactUs')}
            </a>
            <a
              href="/privacy"
              className="text-gray-400 text-xs hover:text-[#e91e63] transition-colors duration-200"
            >
              {t('emailVerification.footer.privacyPolicy')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      {isLoading ? <LoadingScreen /> : <MainContent />}
    </div>
  );
};

export default EmailVerificationPage;