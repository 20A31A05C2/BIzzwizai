import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, User, MessageSquare, CheckCircle, Heart } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast'; // Add react-hot-toast for notifications
import axios from 'axios'; // Using axios for API calls (alternatively, you can use fetch)

// Simulated ApiService for making API requests
const ApiService = async (url, method, data) => {
  try {
    const response = await axios({
      method,
      url: `/api${url}`, // Adjust base URL as needed (e.g., 'https://your-backend.com/api/contact')
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erreur réseau ou serveur');
  }
};

const COLOR_VARIANTS = {
  primary: {
    border: ["border-emerald-500/60", "border-cyan-400/50", "border-slate-600/30"],
    gradient: "from-emerald-500/30",
    accent: "emerald-500",
  },
  secondary: {
    border: ["border-violet-500/60", "border-fuchsia-400/50", "border-slate-600/30"],
    gradient: "from-violet-500/30",
    accent: "violet-500",
  },
  tertiary: {
    border: ["border-orange-500/60", "border-yellow-400/50", "border-slate-600/30"],
    gradient: "from-orange-500/30",
    accent: "orange-500",
  },
  quaternary: {
    border: ["border-purple-500/60", "border-pink-400/50", "border-slate-600/30"],
    gradient: "from-purple-500/30",
    accent: "purple-500",
  },
};

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [currentVariant, setCurrentVariant] = useState("primary");
  
  const variants = Object.keys(COLOR_VARIANTS);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVariant(prevVariant => {
        const currentIndex = variants.indexOf(prevVariant);
        const nextIndex = (currentIndex + 1) % variants.length;
        return variants[nextIndex];
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [variants]);

  const variantStyles = COLOR_VARIANTS[currentVariant];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }
    if (!formData.email.trim()) {
      newErrors.email = "L'e-mail est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Le format de l'e-mail est invalide";
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await ApiService('/contact', 'POST', {
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      toast.success('Message envoyé avec succès ! Nous vous répondrons dans les 24 heures.', {
        style: {
          background: 'rgba(0, 255, 0, 0.2)',
          color: '#fff',
          border: '1px solid rgba(0, 255, 0, 0.3)',
          borderRadius: '12px',
          backdropFilter: 'blur(8px)',
        },
        iconTheme: {
          primary: '#10b981',
          secondary: '#fff',
        },
      });
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      toast.error(error.message || 'Une erreur est survenue lors de l’envoi du message.', {
        style: {
          background: 'rgba(255, 0, 0, 0.2)',
          color: '#fff',
          border: '1px solid rgba(255, 0, 0, 0.3)',
          borderRadius: '12px',
          backdropFilter: 'blur(8px)',
        },
        iconTheme: {
          primary: '#ef4444',
          secondary: '#fff',
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-black font-montserrat overflow-hidden">
      <Toaster position="top-right" /> {/* Add Toaster for toast notifications */}
      {/* Animated Background Circles - Responsive */}
      <div className="absolute inset-0">
        <motion.div className="absolute top-10 sm:top-20 left-1/4 h-[300px] w-[300px] sm:h-[600px] sm:w-[600px] opacity-40">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className={`absolute inset-0 rounded-full border bg-gradient-to-br to-transparent ${variantStyles.border[i]} ${variantStyles.gradient}`}
              animate={{
                rotate: 360,
                scale: [1, 1.1 + i * 0.05, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 12 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
        
        <motion.div className="absolute bottom-10 sm:bottom-20 right-1/4 h-[200px] w-[200px] sm:h-[400px] sm:w-[400px] opacity-30">
          {[0, 1].map((i) => (
            <motion.div
              key={i}
              className={`absolute inset-0 rounded-full border bg-gradient-to-br to-transparent ${variantStyles.border[i]} ${variantStyles.gradient}`}
              animate={{
                rotate: -360,
                scale: [1, 1.2 + i * 0.1, 1],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 15 + i * 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Background Glow Effects */}
      <div className="absolute inset-0 [mask-image:radial-gradient(70%_50%_at_40%_40%,#000_30%,transparent)]">
        <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_center,${variantStyles.gradient.replace("from-", "")}/15%,transparent_70%)] blur-[80px] sm:blur-[120px]`} />
      </div>

      <section id="contact" className="relative z-10 py-20 sm:py-24 md:py-28 lg:py-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 sm:gap-16 items-center">
            {/* Left Side: Info */}
            <motion.div 
              className="flex-1 min-w-0 w-full lg:min-w-[300px] text-center lg:text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.h1 
                className="flex items-center justify-center lg:justify-start gap-3 sm:gap-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6 sm:mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <span className="bg-gradient-to-br from-white via-gray-100 to-gray-300 bg-clip-text text-transparent drop-shadow-[0_0_32px_rgba(255,255,255,0.3)]">
                  Connectons-nous
                </span>
                <Heart className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white fill-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 sm:mb-12 font-medium max-w-2xl mx-auto lg:mx-0">
                  Vous avez une question ou souhaitez collaborer ? Nous serions ravis d'avoir de vos nouvelles. Remplissez le formulaire, et nous vous répondrons dans les 24 heures.
                </p>

                {/* Contact Info Cards */}
                <div className="space-y-4 sm:space-y-6 max-w-md mx-auto lg:mx-0">
                  <motion.div 
                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md"
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className={`p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br ${variantStyles.gradient} to-transparent border border-white/20`}>
                      <Mail className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm sm:text-base">Contactez-nous par e-mail</p>
                      <p className="text-gray-400 text-xs sm:text-sm">contact@bizzwiz.ai</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md"
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className={`p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br ${variantStyles.gradient} to-transparent border border-white/20`}>
                      <MessageSquare className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm sm:text-base">Temps de réponse</p>
                      <p className="text-gray-400 text-xs sm:text-sm">Dans les 24 heures</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Side: Enhanced Form */}
            <motion.div 
              className="flex-1 min-w-0 w-full lg:min-w-[300px] max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <div className="relative p-6 sm:p-8 lg:p-12 rounded-2xl sm:rounded-3xl border border-white/20 bg-black/30 backdrop-blur-xl shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl sm:rounded-3xl" />
                
                <form onSubmit={handleSubmit} className="relative space-y-6 sm:space-y-8">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="flex items-center gap-2 text-white font-semibold text-base sm:text-lg">
                      <User className="w-4 h-4 sm:w-5 sm:h-5" />
                      Nom
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full p-3 sm:p-4 border-2 ${
                          errors.name 
                            ? 'border-red-500/60 bg-red-500/5' 
                            : 'border-white/20 bg-white/5 focus:border-white/40'
                        } rounded-xl sm:rounded-2xl text-white placeholder-gray-400 backdrop-blur-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/20 focus:bg-white/10 text-sm sm:text-base`}
                        placeholder="Votre nom complet"
                      />
                      {errors.name && (
                        <motion.p 
                          className="mt-2 text-sm text-red-400 flex items-center gap-1"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          ⚠️ {errors.name}
                        </motion.p>
                      )}
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="flex items-center gap-2 text-white font-semibold text-base sm:text-lg">
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                      E-mail
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full p-3 sm:p-4 border-2 ${
                          errors.email 
                            ? 'border-red-500/60 bg-red-500/5' 
                            : 'border-white/20 bg-white/5 focus:border-white/40'
                        } rounded-xl sm:rounded-2xl text-white placeholder-gray-400 backdrop-blur-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/20 focus:bg-white/10 text-sm sm:text-base`}
                        placeholder="votre.email@exemple.com"
                      />
                      {errors.email && (
                        <motion.p 
                          className="mt-2 text-sm text-red-400 flex items-center gap-1"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          ⚠️ {errors.email}
                        </motion.p>
                      )}
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="flex items-center gap-2 text-white font-semibold text-base sm:text-lg">
                      <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
                      Message
                    </label>
                    <div className="relative">
                      <textarea
                        id="message"
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        className={`w-full p-3 sm:p-4 border-2 ${
                          errors.message 
                            ? 'border-red-500/60 bg-red-500/5' 
                            : 'border-white/20 bg-white/5 focus:border-white/40'
                        } rounded-xl sm:rounded-2xl text-white placeholder-gray-400 backdrop-blur-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/20 focus:bg-white/10 resize-none text-sm sm:text-base`}
                        placeholder="Parlez-nous de votre projet, de vos idées ou de vos questions..."
                      />
                      {errors.message && (
                        <motion.p 
                          className="mt-2 text-sm text-red-400 flex items-center gap-1"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          ⚠️ {errors.message}
                        </motion.p>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 ${
                      isSubmitting 
                        ? 'bg-white/20 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 hover:scale-[1.02] active:scale-[0.98]'
                    } text-white border border-white/30 backdrop-blur-md shadow-xl`}
                    whileHover={!isSubmitting ? { boxShadow: "0 0 30px rgba(255,255,255,0.2)" } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Envoi du message...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 sm:w-6 sm:h-6" />
                        Envoyer le message
                      </>
                    )}
                  </motion.button>

                  {/* Success Message */}
                  {submitSuccess && (
                    <motion.div
                      className="p-4 sm:p-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 rounded-xl sm:rounded-2xl border border-green-500/30 backdrop-blur-md"
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-white text-sm sm:text-base">Message envoyé avec succès ! 🎉</p>
                          <p className="text-green-300 text-xs sm:text-sm mt-1">Merci de nous avoir contactés. Nous vous répondrons dans les 24 heures.</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;


// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Send, Mail, User, MessageSquare, CheckCircle, Heart } from 'lucide-react';

// const COLOR_VARIANTS = {
//   primary: {
//     border: ["border-emerald-500/60", "border-cyan-400/50", "border-slate-600/30"],
//     gradient: "from-emerald-500/30",
//     accent: "emerald-500",
//   },
//   secondary: {
//     border: ["border-violet-500/60", "border-fuchsia-400/50", "border-slate-600/30"],
//     gradient: "from-violet-500/30",
//     accent: "violet-500",
//   },
//   tertiary: {
//     border: ["border-orange-500/60", "border-yellow-400/50", "border-slate-600/30"],
//     gradient: "from-orange-500/30",
//     accent: "orange-500",
//   },
//   quaternary: {
//     border: ["border-purple-500/60", "border-pink-400/50", "border-slate-600/30"],
//     gradient: "from-purple-500/30",
//     accent: "purple-500",
//   },
// };

// const ContactUs = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: '',
//   });

//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitSuccess, setSubmitSuccess] = useState(false);
//   const [currentVariant, setCurrentVariant] = useState("primary");
  
//   const variants = Object.keys(COLOR_VARIANTS);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentVariant(prevVariant => {
//         const currentIndex = variants.indexOf(prevVariant);
//         const nextIndex = (currentIndex + 1) % variants.length;
//         return variants[nextIndex];
//       });
//     }, 4000);

//     return () => clearInterval(interval);
//   }, [variants]);

//   const variantStyles = COLOR_VARIANTS[currentVariant];

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.name.trim()) {
//       newErrors.name = 'Le nom est requis';
//     }
//     if (!formData.email.trim()) {
//       newErrors.email = "L'e-mail est requis";
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = "Le format de l'e-mail est invalide";
//     }
//     if (!formData.message.trim()) {
//       newErrors.message = 'Le message est requis';
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: '' }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setIsSubmitting(true);
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 2000));
//       console.log('Form data submitted:', formData);
//       setSubmitSuccess(true);
//       setFormData({ name: '', email: '', message: '' });
//       setTimeout(() => setSubmitSuccess(false), 5000);
//     } catch (error) {
//       console.error('Error submitting form:', error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="relative min-h-screen w-full bg-black font-montserrat overflow-hidden">
//       {/* Animated Background Circles - Responsive */}
//       <div className="absolute inset-0">
//         <motion.div className="absolute top-10 sm:top-20 left-1/4 h-[300px] w-[300px] sm:h-[600px] sm:w-[600px] opacity-40">
//           {[0, 1, 2].map((i) => (
//             <motion.div
//               key={i}
//               className={`absolute inset-0 rounded-full border bg-gradient-to-br to-transparent ${variantStyles.border[i]} ${variantStyles.gradient}`}
//               animate={{
//                 rotate: 360,
//                 scale: [1, 1.1 + i * 0.05, 1],
//                 opacity: [0.3, 0.6, 0.3],
//               }}
//               transition={{
//                 duration: 12 + i * 2,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               }}
//             />
//           ))}
//         </motion.div>
        
//         <motion.div className="absolute bottom-10 sm:bottom-20 right-1/4 h-[200px] w-[200px] sm:h-[400px] sm:w-[400px] opacity-30">
//           {[0, 1].map((i) => (
//             <motion.div
//               key={i}
//               className={`absolute inset-0 rounded-full border bg-gradient-to-br to-transparent ${variantStyles.border[i]} ${variantStyles.gradient}`}
//               animate={{
//                 rotate: -360,
//                 scale: [1, 1.2 + i * 0.1, 1],
//                 opacity: [0.2, 0.5, 0.2],
//               }}
//               transition={{
//                 duration: 15 + i * 3,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               }}
//             />
//           ))}
//         </motion.div>
//       </div>

//       {/* Background Glow Effects */}
//       <div className="absolute inset-0 [mask-image:radial-gradient(70%_50%_at_40%_40%,#000_30%,transparent)]">
//         <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_center,${variantStyles.gradient.replace("from-", "")}/15%,transparent_70%)] blur-[80px] sm:blur-[120px]`} />
//       </div>

//       <section id="contact" className="relative z-10 py-20 sm:py-24 md:py-28 lg:py-32 px-4 sm:px-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex flex-col lg:flex-row gap-12 sm:gap-16 items-center">
//             {/* Left Side: Info */}
//             <motion.div 
//               className="flex-1 min-w-0 w-full lg:min-w-[300px] text-center lg:text-left"
//               initial={{ opacity: 0, x: -50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8, ease: "easeOut" }}
//             >
//               <motion.h1 
//                 className="flex items-center justify-center lg:justify-start gap-3 sm:gap-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6 sm:mb-8"
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2, duration: 0.8 }}
//               >
//                 <span className="bg-gradient-to-br from-white via-gray-100 to-gray-300 bg-clip-text text-transparent drop-shadow-[0_0_32px_rgba(255,255,255,0.3)]">
//                   Connectons-nous
//                 </span>
//                 <Heart className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white fill-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
//               </motion.h1>
              
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.4, duration: 0.8 }}
//               >
//                 <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 sm:mb-12 font-medium max-w-2xl mx-auto lg:mx-0">
//                   Vous avez une question ou souhaitez collaborer ? Nous serions ravis d'avoir de vos nouvelles. Remplissez le formulaire, et nous vous répondrons dans les 24 heures.
//                 </p>

//                 {/* Contact Info Cards */}
//                 <div className="space-y-4 sm:space-y-6 max-w-md mx-auto lg:mx-0">
//                   <motion.div 
//                     className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md"
//                     whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
//                     transition={{ duration: 0.2 }}
//                   >
//                     <div className={`p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br ${variantStyles.gradient} to-transparent border border-white/20`}>
//                       <Mail className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
//                     </div>
//                     <div>
//                       <p className="text-white font-semibold text-sm sm:text-base">Contactez-nous par e-mail</p>
//                       <p className="text-gray-400 text-xs sm:text-sm">contact@bizzwiz.ai</p>
//                     </div>
//                   </motion.div>

//                   <motion.div 
//                     className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md"
//                     whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
//                     transition={{ duration: 0.2 }}
//                   >
//                     <div className={`p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br ${variantStyles.gradient} to-transparent border border-white/20`}>
//                       <MessageSquare className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
//                     </div>
//                     <div>
//                       <p className="text-white font-semibold text-sm sm:text-base">Temps de réponse</p>
//                       <p className="text-gray-400 text-xs sm:text-sm">Dans les 24 heures</p>
//                     </div>
//                   </motion.div>
//                 </div>
//               </motion.div>
//             </motion.div>

//             {/* Right Side: Enhanced Form */}
//             <motion.div 
//               className="flex-1 min-w-0 w-full lg:min-w-[300px] max-w-2xl mx-auto lg:mx-0"
//               initial={{ opacity: 0, x: 50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
//             >
//               <div className="relative p-6 sm:p-8 lg:p-12 rounded-2xl sm:rounded-3xl border border-white/20 bg-black/30 backdrop-blur-xl shadow-2xl">
//                 <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl sm:rounded-3xl" />
                
//                 <form onSubmit={handleSubmit} className="relative space-y-6 sm:space-y-8">
//                   {/* Name Field */}
//                   <div className="space-y-2">
//                     <label htmlFor="name" className="flex items-center gap-2 text-white font-semibold text-base sm:text-lg">
//                       <User className="w-4 h-4 sm:w-5 sm:h-5" />
//                       Nom
//                     </label>
//                     <div className="relative">
//                       <input
//                         type="text"
//                         id="name"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         className={`w-full p-3 sm:p-4 border-2 ${
//                           errors.name 
//                             ? 'border-red-500/60 bg-red-500/5' 
//                             : 'border-white/20 bg-white/5 focus:border-white/40'
//                         } rounded-xl sm:rounded-2xl text-white placeholder-gray-400 backdrop-blur-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/20 focus:bg-white/10 text-sm sm:text-base`}
//                         placeholder="Votre nom complet"
//                       />
//                       {errors.name && (
//                         <motion.p 
//                           className="mt-2 text-sm text-red-400 flex items-center gap-1"
//                           initial={{ opacity: 0, y: -10 }}
//                           animate={{ opacity: 1, y: 0 }}
//                         >
//                           ⚠️ {errors.name}
//                         </motion.p>
//                       )}
//                     </div>
//                   </div>

//                   {/* Email Field */}
//                   <div className="space-y-2">
//                     <label htmlFor="email" className="flex items-center gap-2 text-white font-semibold text-base sm:text-lg">
//                       <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
//                       E-mail
//                     </label>
//                     <div className="relative">
//                       <input
//                         type="email"
//                         id="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         className={`w-full p-3 sm:p-4 border-2 ${
//                           errors.email 
//                             ? 'border-red-500/60 bg-red-500/5' 
//                             : 'border-white/20 bg-white/5 focus:border-white/40'
//                         } rounded-xl sm:rounded-2xl text-white placeholder-gray-400 backdrop-blur-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/20 focus:bg-white/10 text-sm sm:text-base`}
//                         placeholder="votre.email@exemple.com"
//                       />
//                       {errors.email && (
//                         <motion.p 
//                           className="mt-2 text-sm text-red-400 flex items-center gap-1"
//                           initial={{ opacity: 0, y: -10 }}
//                           animate={{ opacity: 1, y: 0 }}
//                         >
//                           ⚠️ {errors.email}
//                         </motion.p>
//                       )}
//                     </div>
//                   </div>

//                   {/* Message Field */}
//                   <div className="space-y-2">
//                     <label htmlFor="message" className="flex items-center gap-2 text-white font-semibold text-base sm:text-lg">
//                       <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
//                       Message
//                     </label>
//                     <div className="relative">
//                       <textarea
//                         id="message"
//                         name="message"
//                         rows="5"
//                         value={formData.message}
//                         onChange={handleChange}
//                         className={`w-full p-3 sm:p-4 border-2 ${
//                           errors.message 
//                             ? 'border-red-500/60 bg-red-500/5' 
//                             : 'border-white/20 bg-white/5 focus:border-white/40'
//                         } rounded-xl sm:rounded-2xl text-white placeholder-gray-400 backdrop-blur-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/20 focus:bg-white/10 resize-none text-sm sm:text-base`}
//                         placeholder="Parlez-nous de votre projet, de vos idées ou de vos questions..."
//                       />
//                       {errors.message && (
//                         <motion.p 
//                           className="mt-2 text-sm text-red-400 flex items-center gap-1"
//                           initial={{ opacity: 0, y: -10 }}
//                           animate={{ opacity: 1, y: 0 }}
//                         >
//                           ⚠️ {errors.message}
//                         </motion.p>
//                       )}
//                     </div>
//                   </div>

//                   {/* Submit Button */}
//                   <motion.button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className={`w-full py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 ${
//                       isSubmitting 
//                         ? 'bg-white/20 cursor-not-allowed' 
//                         : 'bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 hover:scale-[1.02] active:scale-[0.98]'
//                     } text-white border border-white/30 backdrop-blur-md shadow-xl`}
//                     whileHover={!isSubmitting ? { boxShadow: "0 0 30px rgba(255,255,255,0.2)" } : {}}
//                     whileTap={!isSubmitting ? { scale: 0.98 } : {}}
//                   >
//                     {isSubmitting ? (
//                       <>
//                         <motion.div
//                           className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white/30 border-t-white rounded-full"
//                           animate={{ rotate: 360 }}
//                           transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//                         />
//                         Envoi du message...
//                       </>
//                     ) : (
//                       <>
//                         <Send className="w-5 h-5 sm:w-6 sm:h-6" />
//                         Envoyer le message
//                       </>
//                     )}
//                   </motion.button>

//                   {/* Success Message */}
//                   {submitSuccess && (
//                     <motion.div
//                       className="p-4 sm:p-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 rounded-xl sm:rounded-2xl border border-green-500/30 backdrop-blur-md"
//                       initial={{ opacity: 0, scale: 0.9, y: 20 }}
//                       animate={{ opacity: 1, scale: 1, y: 0 }}
//                       transition={{ duration: 0.5, ease: "easeOut" }}
//                     >
//                       <div className="flex items-center gap-3">
//                         <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 flex-shrink-0" />
//                         <div>
//                           <p className="font-semibold text-white text-sm sm:text-base">Message envoyé avec succès ! 🎉</p>
//                           <p className="text-green-300 text-xs sm:text-sm mt-1">Merci de nous avoir contactés. Nous vous répondrons dans les 24 heures.</p>
//                         </div>
//                       </div>
//                     </motion.div>
//                   )}
//                 </form>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default ContactUs;