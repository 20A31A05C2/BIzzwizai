import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, Mail } from 'lucide-react';
import ApiService from '@/apiService'; // Adjust path to your ApiService

const EmailVerificationPage = () => {
  const { status, user_id, form_data_id } = Object.fromEntries(new URLSearchParams(window.location.search));
  const [countdown, setCountdown] = useState(5);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user_id) {
      localStorage.setItem('bizwizuser_id', user_id);
    }
    if (form_data_id) {
      localStorage.setItem('bizwiz_form_data_id', form_data_id);
    }

    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    if (status === 'success') {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            window.location.href = '/plan';
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
          title: 'Email Verified Successfully!',
          message: 'Your email has been verified. You can now access all features of BizzWiz.',
          buttonText: 'Go to Plan',
          buttonAction: () => window.location.href = '/plan',
          buttonClass: 'bg-green-500 hover:bg-green-600',
          showCountdown: true,
        };
      case 'already-verified':
        return {
          icon: <CheckCircle className="w-16 h-16 text-blue-500 mb-4" />,
          title: 'Email Already Verified',
          message: 'Your email was already verified. You can continue using BizzWiz.',
          buttonText: 'Go to Plan',
          buttonAction: () => window.location.href = '/plan',
          buttonClass: 'bg-blue-500 hover:bg-blue-600',
          showCountdown: false,
        };
      case 'invalid':
        return {
          icon: <XCircle className="w-16 h-16 text-red-500 mb-4" />,
          title: 'Invalid Verification Link',
          message: 'The verification link is invalid or has expired. Please request a new verification email.',
          buttonText: 'Request New Email',
          buttonAction: () => window.location.href = '/resend-verification',
          buttonClass: 'bg-red-500 hover:bg-red-600',
          showCountdown: false,
        };
      case 'error':
        return {
          icon: <AlertCircle className="w-16 h-16 text-yellow-500 mb-4" />,
          title: 'Verification Failed',
          message: 'Something went wrong during verification. Please try again or contact support.',
          buttonText: 'Contact Support',
          buttonAction: () => window.location.href = '/contact',
          buttonClass: 'bg-yellow-500 hover:bg-yellow-600',
          showCountdown: false,
        };
      default:
        return {
          icon: <Mail className="w-16 h-16 text-gray-500 mb-4" />,
          title: 'Email Verification',
          message: 'Processing your email verification...',
          buttonText: 'Go to Home',
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
          Verifying Email
        </h2>
        <p className="text-gray-400 text-base md:text-lg mb-6">
          Please wait while we verify your email address...
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
            alt="BizzWiz AI futuristic 3D bee mascot"
            className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain filter drop-shadow-[0_0_20px_rgba(159,67,242,0.6)]"
            src="/bee.png"
            loading="eager"
          />
        </div>
        <div className="mb-6 transform hover:scale-110 transition-transform duration-300">
          {statusContent.icon}
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
          <span className="text-white">Verify </span>
          <span className="text-[#00bfff]">Your </span>
          <span className="text-[#e91e63]">Email</span>
        </h1>
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 mb-6 shadow-2xl">
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            {statusContent.message}
          </p>
        </div>
        {statusContent.showCountdown && (
          <div className="mb-6 bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-xl p-4">
            <p className="text-green-300 text-sm">
              Redirecting to plan in <span className="font-bold text-green-200 text-lg">{countdown}</span> seconds...
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
              Back to Home
            </button>
          )}
        </div>
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-xs mb-2">
            © {new Date().getFullYear()} BizzWiz. All rights reserved.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="/contact"
              className="text-gray-400 text-xs hover:text-[#e91e63] transition-colors duration-200"
            >
              Contact Us
            </a>
            <a
              href="/privacy"
              className="text-gray-400 text-xs hover:text-[#e91e63] transition-colors duration-200"
            >
              Privacy Policy
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