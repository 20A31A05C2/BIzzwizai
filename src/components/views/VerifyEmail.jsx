import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useTranslation , Trans  } from "react-i18next";
import ApiService from "@/apiService";

const VerifyEmail = () => {
  const { t } = useTranslation();
  const { id, hash } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isVerifying, setIsVerifying] = useState(!!id && !!hash);
  const [isResending, setIsResending] = useState(false);
  const [isReloading, setIsReloading] = useState(false);
  const email = state?.email || "your inbox";

  useEffect(() => {
    const verifyEmail = async () => {
      if (id && hash) {
        setIsVerifying(true);
        setIsReloading(true);
        try {
          const response = await ApiService(`/email/verify/${id}/${hash}`, "GET");
          if (response.success) {
            toast({
              title: t('verifyEmail.toast.success.title'),
              description: t('verifyEmail.toast.success.description'),
              duration: 3000,
            });
            setMessage(response.message);
            setTimeout(() => navigate("/login"), 2000);
          } else {
            throw new Error(response.message || t('verifyEmail.toast.error.description'));
          }
        } catch (error) {
          console.error("Verification error:", error);
          toast({
            title: t('verifyEmail.toast.error.title'),
            description: error.message || t('verifyEmail.toast.error.description'),
            variant: "destructive",
            duration: 5000,
          });
          setMessage(error.message || t('verifyEmail.toast.error.description'));
        } finally {
          setTimeout(() => {
            setIsReloading(false);
            setIsVerifying(false);
          }, 1000);
        }
      }
    };
    verifyEmail();
  }, [id, hash, navigate, t]);

  const handleResend = async () => {
    setIsResending(true);
    setIsReloading(true);
    try {
      const response = await ApiService("/email/resend", "POST", { email });
      if (response.success) {
        toast({
          title: t('verifyEmail.toast.resendSuccess.title'),
          description: t('verifyEmail.toast.resendSuccess.description'),
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Resend email error:", error);
      toast({
        title: t('verifyEmail.toast.resendError.title'),
        description: error.response?.data?.message || t('verifyEmail.toast.resendError.description'),
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setTimeout(() => {
        setIsReloading(false);
        setIsResending(false);
      }, 1000);
    }
  };

  const LoadingScreen = () => (
    <motion.div
      key="loading"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-screen bg-bizzwiz-background px-4"
    >
      <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto">
        {/* Loading Spinner */}
        <div className="relative mb-8">
          <div className="w-16 h-16 md:w-20 md:h-20 border-4 border-gray-200 rounded-full animate-spin">
            <div className="w-full h-full border-4 border-t-bizzwiz-magenta-flare border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          </div>
          <div className="absolute inset-0 w-16 h-16 md:w-20 md:h-20 border-4 border-gray-100 rounded-full animate-pulse"></div>
        </div>

        {/* Loading Content */}
        <motion.h2 
          className="text-2xl md:text-3xl font-bold text-gradient-bizzwiz mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {isVerifying ? t('verifyEmail.loading.verifying') : isResending ? t('verifyEmail.loading.resending') : t('verifyEmail.loading.processing')}
        </motion.h2>
        
        <motion.p 
          className="text-bizzwiz-text-alt text-base md:text-lg mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {isVerifying 
            ? t('verifyEmail.loading.verifyingDescription')
            : isResending 
            ? t('verifyEmail.loading.resendingDescription')
            : t('verifyEmail.loading.processingDescription')}
        </motion.p>

        {/* Progress Dots */}
        <motion.div 
          className="flex justify-center space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-bizzwiz-magenta-flare rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );

  const MainContent = () => (
    <motion.div
      key="main"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-screen bg-bizzwiz-background px-4"
    >
      <div className="flex flex-col items-center justify-center text-center h-full max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100, delay: 0.2 }}
          className="mb-8"
        >
          <img
            alt={t('verifyEmail.imageAlt')}
            className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 object-contain drop-shadow-[0_0_15px_rgba(159,67,242,0.5)]"
            src="/image.png"
          />
        </motion.div>
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gradient-bizzwiz"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {t('verifyEmail.main.title')}
        </motion.h1>
        <motion.p
          className="text-base sm:text-lg md:text-xl text-bizzwiz-text-alt mb-6 max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          {message ? (
    message
  ) : (
    <Trans i18nKey="verifyEmail.main.message" values={{ email }} components={[<strong />]} />
  )}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="flex flex-col gap-4 w-full max-w-xs"
        >
          <Button
            onClick={handleResend}
            className="bg-bizzwiz-magenta-flare text-white hover:bg-bizzwiz-magenta-flare/90 font-bold py-2 px-6 rounded-full w-full"
            disabled={isVerifying || isResending}
          >
            {isResending ? t('verifyEmail.main.resendingButton') : t('verifyEmail.main.resendButton')}
          </Button>
          <Button
            onClick={() => navigate("/")}
            variant="link"
            className="text-bizzwiz-text-alt hover:text-bizzwiz-magenta-flare"
            disabled={isVerifying || isResending}
          >
            {t('verifyEmail.main.backToHome')}
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {isReloading ? <LoadingScreen /> : <MainContent />}
      </AnimatePresence>
    </div>
  );
};

export default VerifyEmail;