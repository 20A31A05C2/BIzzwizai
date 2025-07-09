import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import ApiService from "@/apiService";

const VerifyEmail = () => {
  const { id, hash } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isVerifying, setIsVerifying] = useState(!!id && !!hash);
  const email = state?.email || "your inbox";

  useEffect(() => {
    const verifyEmail = async () => {
      if (id && hash) {
        setIsVerifying(true);
        try {
          const response = await ApiService(`/email/verify/${id}/${hash}`, "GET");
          if (response.success) {
            toast({
              title: "Email Verified",
              description: "Your email has been verified successfully. Redirecting to login...",
              duration: 3000,
            });
            setMessage(response.message);
            setTimeout(() => navigate("/login"), 2000);
          } else {
            throw new Error(response.message || "Verification failed");
          }
        } catch (error) {
          console.error("Verification error:", error);
          toast({
            title: "Verification Error",
            description: error.message || "Failed to verify email. Please try again or resend the verification email.",
            variant: "destructive",
            duration: 5000,
          });
          setMessage(error.message || "Failed to verify email.");
        } finally {
          setIsVerifying(false);
        }
      }
    };
    verifyEmail();
  }, [id, hash, navigate]);

  const handleResend = async () => {
    try {
      const response = await ApiService("/email/resend", "POST", { email });
      if (response.success) {
        toast({
          title: "Email Resent",
          description: "A new verification link has been sent to your email address.",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Resend email error:", error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to resend verification email.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bizzwiz-background">
      <div className="flex flex-col items-center justify-center text-center h-full max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100, delay: 0.2 }}
          className="mb-8"
        >
          <img
            alt="BizzWiz AI futuristic 3D bee mascot with neon purple and blue accents, premium cyberpunk style"
            className="計 w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-[0_0_15px_rgba(159,67,242,0.5)]"
            src="https://storage.googleapis.com/hostinger-horizons-assets-prod/a989574d-4ac8-453f-b942-2e53c4521d48/9397bc0a67103e2199f08da814eae151.png"
          />
        </motion.div>
        <motion.h1
          className="text-3xl md:text-4xl font-bold mb-4 text-gradient-bizzwiz"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Verify Your Email
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-bizzwiz-text-alt mb-6 max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          {isVerifying ? (
            "Verifying your email..."
          ) : message ? (
            message
          ) : (
            <>
              A verification email has been sent to <strong>{email}</strong>. Please check your inbox or spam folder to confirm your email address. Once verified, our team will be notified to review your account.
            </>
          )}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="flex flex-col gap-4"
        >
          <Button
            onClick={handleResend}
            className="bg-bizzwiz-magenta-flare text-white hover:bg-bizzwiz-magenta-flare/90 font-bold py-2 px-6 rounded-full"
            disabled={isVerifying}
          >
            Resend Email
          </Button>
          <Button
            onClick={() => navigate("/")}
            variant="link"
            className="text-bizzwiz-text-alt hover:text-bizzwiz-magenta-flare"
            disabled={isVerifying}
          >
            Back to Home
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default VerifyEmail;