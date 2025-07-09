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

//   const from = location.state?.from?.pathname || "/";

//   useEffect(() => {
//     const token = localStorage.getItem('bizwizusertoken');
//     const userRole = localStorage.getItem('bizzwiz-userRole');
//     if (token && userRole === 'user') {
//       navigate('/app/dashboard-project/');
//     } else if (token && userRole === 'admin') {
//       navigate('/app-admin/dashboard');
//     }
//   }, [navigate]);

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
//           setIsLoading(false);
//           if (response.data.user.role === 'admin') {
//             navigate('/app-admin/dashboard');
//           } else {
//             navigate('/app/dashboard-project/default-user-project');
//           }
//         }, 1000);
//       } else {
//         throw new Error(response.message || 'Invalid login credentials');
//       }
//     } catch (error) {
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
//       });
//       setIsLoading(false);
//     }
//   };

//   const handleForgotPassword = async (e) => {
//     e.preventDefault();
//     if (!email) {
//       toast({
//         title: "Email Requis",
//         description: "Veuillez entrer votre adresse email.",
//         variant: 'destructive',
//       });
//       return;
//     }

//     setIsLoading(true);

//     try {
//     const response = await ApiService('/forgot-password', 'POST', { email }); // Updated from '/forgotpassword' to '/forgot-password'
//     if (response.success) {
//       toast({
//         title: "Email Envoyé",
//         description: "Un lien de réinitialisation a été envoyé à votre adresse email. Vérifiez votre boîte de réception.",
//         variant: 'default',
//       });
//       setIsResetMode(false);
//     } else {
//       throw new Error(response.message || 'Échec de l\'envoi du lien de réinitialisation.');
//     }
//     } catch (error) {
//       toast({
//         title: "Erreur",
//         description: error.response?.data?.message || 'Échec de l\'envoi du lien de réinitialisation.',
//         variant: 'destructive',
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-[calc(100vh-var(--navbar-height,68px))] flex items-center justify-center p-4 bg-gradient-to-br from-bizzwiz-deep-space via-bizzwiz-nebula-purple/30 to-bizzwiz-deep-space">
//       <motion.div
//         initial={{ opacity: 0, y: 30, scale: 0.95 }}
//         animate={{ opacity: 1, y: 0, scale: 1 }}
//         transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
//         className="w-full max-w-md bg-bizzwiz-glass-bg/60 backdrop-blur-2xl p-8 sm:p-10 rounded-2xl shadow-2xl shadow-bizzwiz-magenta-flare/25 border border-bizzwiz-electric-cyan/25"
//       >
//         <div className="text-center mb-8">
//           <motion.div
//             animate={{ rotate: [0, 15, -10, 10, -5, 5, 0], scale: [1, 1.05, 1] }}
//             transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 3 }}
//           >
//             <Atom size={52} className="mx-auto text-bizzwiz-electric-cyan mb-3 text-glow-electric-cyan" />
//           </motion.div>
//           <h1 className="text-3xl font-orbitron font-bold text-bizzwiz-star-white mb-1">
//             {isResetMode ? 'Réinitialisation' : 'Portail de Connexion'}
//           </h1>
//           <p className="text-bizzwiz-comet-tail text-sm">
//             {isResetMode ? 'Récupérez l\'accès à votre compte.' : 'Accédez à votre univers BizzWiz AI.'}
//           </p>
//         </div>

//         <form onSubmit={isResetMode ? handleForgotPassword : handleLogin} className="space-y-6">
//           <div>
//             <Label htmlFor="email" className="text-bizzwiz-comet-tail/90">Adresse Email Galactique</Label>
//             <Input
//               id="email"
//               type="email"
//               icon={<User size={16} />}
//               placeholder="nom.utilisateur@galaxie.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="futuristic-input mt-1.5"
//               disabled={isLoading}
//               required
//             />
//           </div>

//           {!isResetMode && (
//             <div>
//               <Label htmlFor="password">Mot de Passe Stellaire</Label>
//               <div className="relative mt-1.5">
//                 <Input
//                   id="password"
//                   type={showPassword ? "text" : "password"}
//                   icon={<KeyRound size={16} />}
//                   placeholder="••••••••••••"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="futuristic-input pr-12"
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
//             className="w-full futuristic-button bg-gradient-to-r from-bizzwiz-electric-cyan to-bizzwiz-magenta-flare text-bizzwiz-deep-space font-bold py-3 text-base shadow-lg hover:shadow-xl hover:shadow-bizzwiz-magenta-flare/40"
//             disabled={isLoading}
//             size="lg"
//           >
//             {isLoading ? (
//               <motion.div
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
//             {isResetMode ? 'Envoyer Email' : 'Connexion Standard'}
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

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResetMode, setIsResetMode] = useState(false);

  const from = location.state?.from?.pathname || "/";

useEffect(() => {
  const token = localStorage.getItem('bizwizusertoken');
  const userRole = localStorage.getItem('bizzwiz-userRole');
  if (token && userRole === 'user') {
    navigate('/app/select-project');
  } else if (token && userRole === 'admin') {
    navigate('/app-admin/accueil');
  }
}, [navigate]);

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
        setIsLoading(false);
        if (response.data.user.role === 'admin') {
          navigate('/app-admin/accueil');
        } else {
          navigate('/app/select-project');
        }
      }, 1000);
    } else {
      throw new Error(response.message || 'Invalid login credentials');
    }
  } catch (error) {
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
      });
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Email Requis",
        description: "Veuillez entrer votre adresse email.",
        variant: 'destructive',
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
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-var(--navbar-height,68px))] flex items-center justify-center p-4 bg-gradient-to-br from-bizzwiz-deep-space via-bizzwiz-nebula-purple/30 to-bizzwiz-deep-space">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md bg-bizzwiz-glass-bg/60 backdrop-blur-2xl p-8 sm:p-10 rounded-2xl shadow-2xl shadow-bizzwiz-magenta-flare/25 border border-bizzwiz-electric-cyan/25"
      >
        <div className="text-center mb-8">
          <motion.div
            animate={{ rotate: [0, 15, -10, 10, -5, 5, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 3 }}
          >
            <Atom size={52} className="mx-auto text-bizzwiz-electric-cyan mb-3 text-glow-electric-cyan" />
          </motion.div>
          <h1 className="text-3xl font-orbitron font-bold text-bizzwiz-star-white mb-1">
            {isResetMode ? 'Réinitialisation' : 'Portail de Connexion'}
          </h1>
          <p className="text-bizzwiz-comet-tail text-sm">
            {isResetMode ? 'Récupérez l\'accès à votre compte.' : 'Accédez à votre univers BizzWiz AI.'}
          </p>
        </div>

        <form onSubmit={isResetMode ? handleForgotPassword : handleLogin} className="space-y-6">
          <div>
            <Label htmlFor="email" className="text-bizzwiz-comet-tail/90">Adresse Email Galactique</Label>
            <Input
              id="email"
              type="email"
              icon={<User size={16} />}
              placeholder="nom.utilisateur@galaxie.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="futuristic-input mt-1.5"
              disabled={isLoading}
              required
            />
          </div>

          {!isResetMode && (
            <div>
              <Label htmlFor="password">Mot de Passe Stellaire</Label>
              <div className="relative mt-1.5">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  icon={<KeyRound size={16} />}
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="futuristic-input pr-12"
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
            className="w-full futuristic-button bg-gradient-to-r from-bizzwiz-electric-cyan to-bizzwiz-magenta-flare text-bizzwiz-deep-space font-bold py-3 text-base shadow-lg hover:shadow-xl hover:shadow-bizzwiz-magenta-flare/40"
            disabled={isLoading}
            size="lg"
          >
            {isLoading ? (
              <motion.div
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
            {isResetMode ? 'Envoyer Email' : 'Connexion Standard'}
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
    </div>
  );
};

export default LoginPage;
