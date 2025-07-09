import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, Mail } from 'lucide-react';

const EmailVerificationPage = () => {
  // Get status from URL parameters (you'll need to implement this based on your routing)
  const status = new URLSearchParams(window.location.search).get('status');
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (status === 'success') {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            window.location.href = '/login'; // Redirect to login page
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [status]);

  const getStatusContent = () => {
    switch (status) {
      case 'success':
        return {
          icon: <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />,
          title: 'Email Verified Successfully!',
          message: 'Your email has been verified. You can now access all features of BizzWiz.',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          textColor: 'text-green-800',
          showCountdown: true,
        };
      case 'already-verified':
        return {
          icon: <CheckCircle className="w-16 h-16 text-blue-500 mx-auto mb-4" />,
          title: 'Email Already Verified',
          message: 'Your email was already verified. You can continue using BizzWiz.',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          textColor: 'text-blue-800',
          showCountdown: false,
        };
      case 'invalid':
        return {
          icon: <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />,
          title: 'Invalid Verification Link',
          message: 'The verification link is invalid or has expired. Please request a new verification email.',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          textColor: 'text-red-800',
          showCountdown: false,
        };
      case 'error':
        return {
          icon: <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />,
          title: 'Verification Failed',
          message: 'Something went wrong during verification. Please try again or contact support.',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          textColor: 'text-yellow-800',
          showCountdown: false,
        };
      default:
        return {
          icon: <Mail className="w-16 h-16 text-gray-500 mx-auto mb-4" />,
          title: 'Email Verification',
          message: 'Processing your email verification...',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          textColor: 'text-gray-800',
          showCountdown: false,
        };
    }
  };

  const statusContent = getStatusContent();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900 to-purple-800 px-6 py-8 text-center">
          <img 
            src="https://storage.googleapis.com/hostinger-horizons-assets-prod/a989574d-4ac8-453f-b942-2e53c4521d48/9397bc0a67103e2199f08da814eae151.png" 
            alt="BizzWiz Logo" 
            className="h-12 mx-auto mb-2"
          />
          <h1 className="text-white text-xl font-semibold">BizzWiz</h1>
        </div>

        {/* Content */}
        <div className="p-8 text-center">
          {statusContent.icon}
          
          <h2 className={`text-2xl font-bold mb-4 ${statusContent.textColor}`}>
            {statusContent.title}
          </h2>
          
          <div className={`p-4 rounded-lg border ${statusContent.bgColor} ${statusContent.borderColor} mb-6`}>
            <p className={`${statusContent.textColor} text-sm leading-relaxed`}>
              {statusContent.message}
            </p>
          </div>

          {statusContent.showCountdown && (
            <div className="mb-6">
              <p className="text-gray-600 text-sm">
                Redirecting to login in <span className="font-semibold text-green-600">{countdown}</span> seconds...
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            {status === 'success' || status === 'already-verified' ? (
              <button
                onClick={() => window.location.href = '/login'}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white font-medium py-3 px-4 rounded-md transition duration-200"
              >
                Go to Login
              </button>
            ) : (
              <div className="space-y-2">
                <button
                  onClick={() => window.location.href = '/resend-verification'}
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white font-medium py-3 px-4 rounded-md transition duration-200"
                >
                  Request New Verification Email
                </button>
                <button
                  onClick={() => window.location.href = '/contact'}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-4 rounded-md transition duration-200"
                >
                  Contact Support
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 text-center">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} BizzWiz. All rights reserved.
          </p>
          <div className="mt-2">
            <a href="/contact" className="text-pink-600 text-xs hover:underline mr-4">
              Contact Us
            </a>
            <a href="/privacy" className="text-pink-600 text-xs hover:underline">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPage;