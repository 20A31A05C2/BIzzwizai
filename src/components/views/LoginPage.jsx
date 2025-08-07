// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation, Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { toast } from '@/components/ui/use-toast';
// import { Atom, LogIn, User, KeyRound, Eye, EyeOff, Mail } from 'lucide-react';
// import ApiService from '@/apiService';

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isResetMode, setIsResetMode] = useState(false);
//   const [isMounted, setIsMounted] = useState(true);

//   const from = location.state?.from?.pathname || "/";

//   useEffect(() => {
//     const token = localStorage.getItem('bizwizusertoken');
//     const userRole = localStorage.getItem('bizzwiz-userRole');
//     if (token && userRole === 'user') {
//       navigate('/select-project');
//     } else if (token && userRole === 'admin') {
//       navigate('/admindashboard');
//     }
//   }, [navigate]);

//   useEffect(() => {
//     setIsMounted(true);
//     return () => {
//       setIsMounted(false);
//     };
//   }, []);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       const response = await ApiService('/login', 'POST', { email, password });

//       if (response.success) {
//         localStorage.setItem('bizwizusertoken', response.data.token);
//         localStorage.setItem('bizzwiz-userRole', response.data.user.role);
//         localStorage.setItem('bizzwiz-userId', response.data.user.id);

//         toast({
//           title: "Connexion Réussie",
//           description: `Bienvenue ${response.data.user.role === 'admin' ? 'Admin' : 'Utilisateur'}!`,
//           variant: 'default',
//         });

//         setTimeout(() => {
//           if (isMounted) {
//             setIsLoading(false);
//             if (response.data.user.role === 'admin') {
//               navigate('/admindashboard', { replace: true });
//             } else {
//               navigate('/select-project', { replace: true });
//             }
//           }
//         }, 1000);
//       } else {
//         throw new Error(response.message || 'Invalid login credentials');
//       }
//     } catch (error) {
//       setIsLoading(false);
      
//       let errorMessage = 'Une erreur est survenue lors de la connexion.';
//       if (error.response?.data?.errors) {
//         const errors = error.response.data.errors;
//         if (errors.email) {
//           errorMessage = 'Adresse email invalide.';
//         } else if (errors.password) {
//           errorMessage = 'Mot de passe incorrect.';
//         } else {
//           errorMessage = error.response.data.message || 'Veuillez vérifier vos identifiants.';
//         }
//       } else if (error.message) {
//         errorMessage = error.message;
//       }

//       toast({
//         title: "Échec de Connexion",
//         description: errorMessage,
//         variant: 'destructive',
//         duration: 7000,
//       });
//     }
//   };

//   const handleForgotPassword = async (e) => {
//     e.preventDefault();
//     if (!email) {
//       toast({
//         title: "Email Requis",
//         description: "Veuillez entrer votre adresse email.",
//         variant: 'destructive',
//         duration: 7000,
//       });
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const response = await ApiService('/forgot-password', 'POST', { email });
//       if (response.success) {
//         toast({
//           title: "Email Envoyé",
//           description: "Un lien de réinitialisation a été envoyé à votre adresse email. Vérifiez votre boîte de réception.",
//           variant: 'default',
//           duration: 7000,
//         });
//         setIsResetMode(false);
//       } else {
//         throw new Error(response.message || 'Échec de l\'envoi du lien de réinitialisation.');
//       }
//     } catch (error) {
//       toast({
//         title: "Erreur",
//         description: error.response?.data?.message || 'Échec de l\'envoi du lien de réinitialisation.',
//         variant: 'destructive',
//         duration: 7000,
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-black flex items-center justify-center">
//       <motion.div
//         key={isResetMode ? 'reset' : 'login'}
//         initial={{ opacity: 0, y: 30, scale: 0.95 }}
//         animate={{ opacity: 1, y: 0, scale: 1 }}
//         exit={{ opacity: 0, y: -30, scale: 0.95 }}
//         transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
//         className="w-full max-w-md bg-bizzwiz-glass-bg/60 backdrop-blur-2xl p-8 rounded-xl shadow-lg shadow-bizzwiz-magenta-flare/20 border border-bizzwiz-electric-cyan/20"
//       >
//         <div className="text-center mb-6">
//         <img 
//             alt="Mascotte abeille 3D futuriste BizzWiz AI avec des accents violets et bleus néon, style cyberpunk premium" 
//             className="w-32 h-32 md:w-48 md:h-48 object-contain mx-auto drop-shadow-[0_0_15px_rgba(159,67,242,0.5)]"
//             src="/bee.png" 
//           />
//           <h2 className="text-2xl font-bold text-white">{isResetMode ? 'Réinitialisation du mot de passe' : 'Bizzwiz AI'}</h2>
//         </div>

//         <form onSubmit={isResetMode ? handleForgotPassword : handleLogin} className="space-y-5">
//           <div>
//             <Label htmlFor="email" className="text-bizzwiz-text-alt text-sm">Adresse Email</Label>
//             <Input
//               id="email"
//               type="email"
//               icon={<User size={16} />}
//               placeholder="nom.utilisateur@galaxie.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="mt-1.5 bg-white/10 border-bizzwiz-electric-cyan/30 text-white placeholder-bizzwiz-comet-tail"
//               disabled={isLoading}
//               required
//             />
//           </div>

//           {!isResetMode && (
//             <div>
//               <Label htmlFor="password" className="text-bizzwiz-text-alt text-sm">Mot de Passe</Label>
//               <div className="relative mt-1.5">
//                 <Input
//                   id="password"
//                   type={showPassword ? "text" : "password"}
//                   icon={<KeyRound size={16} />}
//                   placeholder="••••••••••••"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="pr-12 bg-white/10 border-bizzwiz-electric-cyan/30 text-white placeholder-bizzwiz-comet-tail"
//                   disabled={isLoading}
//                   required
//                 />
//                 <Button
//                   type="button"
//                   variant="ghost"
//                   size="icon"
//                   className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-bizzwiz-comet-tail hover:text-bizzwiz-electric-cyan hover:bg-transparent"
//                   onClick={() => setShowPassword(!showPassword)}
//                   disabled={isLoading}
//                 >
//                   {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </Button>
//               </div>
//             </div>
//           )}

//           <Button
//             type="submit"
//             className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-bold py-2.5 rounded-lg transition-all transform hover:scale-105 disabled:transform-none disabled:opacity-50"
//             disabled={isLoading}
//             size="lg"
//           >
//             {isLoading ? (
//               <motion.div
//                 key="loading-spinner"
//                 animate={{ rotate: 360 }}
//                 transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
//               >
//                 <Atom size={20} className="mr-2" />
//               </motion.div>
//             ) : (
//               <>
//                 {isResetMode ? <Mail size={20} className="mr-2" /> : <LogIn size={20} className="mr-2" />}
//               </>
//             )}
//             {isResetMode ? 'Envoyer Email' : 'Connexion'}
//           </Button>
//         </form>

//         <div className="mt-6 text-center space-y-3">
//           {!isResetMode ? (
//             <button
//               onClick={() => setIsResetMode(true)}
//               className="text-sm text-bizzwiz-comet-tail hover:text-bizzwiz-electric-cyan transition-colors underline"
//               disabled={isLoading}
//             >
//               Mot de passe oublié ?
//             </button>
//           ) : (
//             <button
//               onClick={() => setIsResetMode(false)}
//               className="text-sm text-bizzwiz-comet-tail hover:text-bizzwiz-electric-cyan transition-colors underline"
//               disabled={isLoading}
//             >
//               Retour à la connexion
//             </button>
//           )}

//           <div className="pt-4 border-t border-bizzwiz-electric-cyan/20">
//             <p className="text-sm text-bizzwiz-comet-tail">
//               Pas encore de compte ?{' '}
//               <Link
//                 to="/create-project"
//                 className="text-bizzwiz-electric-cyan hover:text-bizzwiz-magenta-flare transition-colors font-medium underline"
//               >
//                 Créer un compte
//               </Link>
//             </p>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default LoginPage;

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { Atom, LogIn, User, KeyRound, Eye, EyeOff, Mail } from 'lucide-react';
import ApiService from '@/apiService';
import Navbar from '../layout/Navbar';


const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResetMode, setIsResetMode] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    const token = localStorage.getItem('bizwizusertoken');
    const userRole = localStorage.getItem('bizzwiz-userRole');
    if (token && userRole === 'user') {
      navigate('/select-project');
    } else if (token && userRole === 'admin') {
      navigate('/admindashboard');
    }
  }, [navigate]);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await ApiService('/login', 'POST', { email, password });

      if (response.success) {
        localStorage.setItem('bizwizusertoken', response.data.token);
        localStorage.setItem('bizzwiz-userRole', response.data.user.role);
        localStorage.setItem('bizzwiz-userId', response.data.user.id);

        toast({
          title: "Connexion Réussie",
          description: `Bienvenue ${response.data.user.role === 'admin' ? 'Admin' : 'Utilisateur'}!`,
          variant: 'default',
        });

        setTimeout(() => {
          if (isMounted) {
            setIsLoading(false);
            if (response.data.user.role === 'admin') {
              navigate('/admindashboard', { replace: true });
            } else {
              navigate('/select-project', { replace: true });
            }
          }
        }, 1000);
      } else {
        throw new Error(response.message || 'Invalid login credentials');
      }
    } catch (error) {
      setIsLoading(false);
      
      let errorMessage = 'Une erreur est survenue lors de la connexion.';
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        if (errors.email) {
          errorMessage = 'Adresse email invalide.';
        } else if (errors.password) {
          errorMessage = 'Mot de passe incorrect.';
        } else {
          errorMessage = error.response.data.message || 'Veuillez vérifier vos identifiants.';
        }
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast({
        title: "Échec de Connexion",
        description: errorMessage,
        variant: 'destructive',
        duration: 7000,
      });
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Email Requis",
        description: "Veuillez entrer votre adresse email.",
        variant: 'destructive',
        duration: 7000,
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await ApiService('/forgot-password', 'POST', { email });
      if (response.success) {
        toast({
          title: "Email Envoyé",
          description: "Un lien de réinitialisation a été envoyé à votre adresse email. Vérifiez votre boîte de réception.",
          variant: 'default',
          duration: 7000,
        });
        setIsResetMode(false);
      } else {
        throw new Error(response.message || 'Échec de l\'envoi du lien de réinitialisation.');
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: error.response?.data?.message || 'Échec de l\'envoi du lien de réinitialisation.',
        variant: 'destructive',
        duration: 7000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <Navbar />
      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-8">
        {/* Login Container */}
        <motion.div
          key={isResetMode ? 'reset' : 'login'}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.95 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full md:w-1/2 bg-bizzwiz-glass-bg/60 backdrop-blur-2xl p-8 rounded-xl shadow-lg shadow-bizzwiz-magenta-flare/20 border border-bizzwiz-electric-cyan/20"
        >
          <div className="text-center mb-6">
            <img 
              alt="Mascotte abeille 3D futuriste BizzWiz AI avec des accents violets et bleus néon, style cyberpunk premium" 
              className="w-32 h-32 md:w-48 md:h-48 object-contain mx-auto drop-shadow-[0_0_15px_rgba(159,67,242,0.5)]"
              src="/bee.png" 
            />
            <h2 className="text-2xl font-bold text-white">{isResetMode ? 'Réinitialisation du mot de passe' : 'Bizzwiz AI'}</h2>
          </div>

          <form onSubmit={isResetMode ? handleForgotPassword : handleLogin} className="space-y-5">
            <div>
              <Label htmlFor="email" className="text-bizzwiz-text-alt text-sm">Adresse Email</Label>
              <Input
                id="email"
                type="email"
                icon={<User size={16} />}
                placeholder="nom.utilisateur@galaxie.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 bg-white/10 border-bizzwiz-electric-cyan/30 text-white placeholder-bizzwiz-comet-tail"
                disabled={isLoading}
                required
              />
            </div>

            {!isResetMode && (
              <div>
                <Label htmlFor="password" className="text-bizzwiz-text-alt text-sm">Mot de Passe</Label>
                <div className="relative mt-1.5">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    icon={<KeyRound size={16} />}
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-12 bg-white/10 border-bizzwiz-electric-cyan/30 text-white placeholder-bizzwiz-comet-tail"
                    disabled={isLoading}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-bizzwiz-comet-tail hover:text-bizzwiz-electric-cyan hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </Button>
                </div>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-bold py-2.5 rounded-lg transition-all transform hover:scale-105 disabled:transform-none disabled:opacity-50"
              disabled={isLoading}
              size="lg"
            >
              {isLoading ? (
                <motion.div
                  key="loading-spinner"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                >
                  <Atom size={20} className="mr-2" />
                </motion.div>
              ) : (
                <>
                  {isResetMode ? <Mail size={20} className="mr-2" /> : <LogIn size={20} className="mr-2" />}
                </>
              )}
              {isResetMode ? 'Envoyer Email' : 'Connexion'}
            </Button>
          </form>

          <div className="mt-6 text-center space-y-3">
            {!isResetMode ? (
              <button
                onClick={() => setIsResetMode(true)}
                className="text-sm text-bizzwiz-comet-tail hover:text-bizzwiz-electric-cyan transition-colors underline"
                disabled={isLoading}
              >
                Mot de passe oublié ?
              </button>
            ) : (
              <button
                onClick={() => setIsResetMode(false)}
                className="text-sm text-bizzwiz-comet-tail hover:text-bizzwiz-electric-cyan transition-colors underline"
                disabled={isLoading}
              >
                Retour à la connexion
              </button>
            )}

            <div className="pt-4 border-t border-bizzwiz-electric-cyan/20">
              <p className="text-sm text-bizzwiz-comet-tail">
                Pas encore de compte ?{' '}
                <Link
                  to="/create-project"
                  className="text-bizzwiz-electric-cyan hover:text-bizzwiz-magenta-flare transition-colors font-medium underline"
                >
                  Créer un compte
                </Link>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Instructions Container */}
        <div className="w-full md:w-1/2 bg-bizzwiz-glass-bg/60 backdrop-blur-2xl p-8 rounded-xl shadow-lg shadow-bizzwiz-magenta-flare/20 border border-bizzwiz-electric-cyan/20">
          <h2 className="text-2xl font-bold text-white mb-6">Comment commencer</h2>
          <ol className="space-y-4 text-bizzwiz-comet-tail">
          <li className="flex items-start">
            <span className="mr-2 text-bizzwiz-electric-cyan font-bold">1.</span>
            <p>Veuillez vous connecter à votre compte avec votre email et votre mot de passe.</p>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-bizzwiz-electric-cyan font-bold">2.</span>
            <p>Sélectionnez le projet dans votre liste de projets.</p>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-bizzwiz-electric-cyan font-bold">3.</span>
            <p>Réservez un rendez-vous pour le projet sélectionné.</p>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-bizzwiz-electric-cyan font-bold">4.</span>
            <p>Attendez qu'un administrateur vous contacte concernant votre rendez-vous et le paiement.</p>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-bizzwiz-electric-cyan font-bold">5.</span>
            <p>Effectuez le paiement pour le projet réservé après la confirmation de l'administrateur.</p>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-bizzwiz-electric-cyan font-bold">6.</span>
            <p>Une fois le rendez-vous réservé et le paiement effectué, accédez à toutes les fonctionnalités du tableau de bord utilisateur.</p>
          </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;