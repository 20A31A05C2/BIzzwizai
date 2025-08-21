// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { toast } from '@/components/ui/use-toast';
// import { ArrowLeft, User, Mail, Phone, Lock, Camera } from 'lucide-react';
// import { cn } from '@/lib/utils';
// import ApiService from '@/apiService';

// const UserSettingsPage = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     fullname: '',
//     email: '',
//     phone_number: '',
//     password: '',
//     confirmPassword: '',
//     profile_picture: null,
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [previewImage, setPreviewImage] = useState(null);
//   const userId = localStorage.getItem('bizzwiz-userId');

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   const fetchUserData = async () => {
//     try {
//       const response = await ApiService(`/appointments/user/${userId}`, 'GET');
//       if (response.success) {
//         setFormData({
//           fullname: response.data.user?.fullname || '',
//           email: response.data.user?.email || '',
//           phone_number: response.data.appointment?.phone_number || '',
//           password: '',
//           confirmPassword: '',
//           profile_picture: null,
//         });
//         if (response.data.user?.profile_picture) {
//           setPreviewImage(response.data.user.profile_picture);
//         }
//       } else {
//         toast({
//           title: 'Erreur',
//           description: response.message || 'Échec du chargement des données utilisateur.',
//           variant: 'destructive',
//         });
//       }
//     } catch (error) {
//       toast({
//         title: 'Erreur',
//         description: error.message || 'Une erreur s’est produite lors du chargement des données utilisateur.',
//         variant: 'destructive',
//       });
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData((prev) => ({ ...prev, profile_picture: file }));
//       setPreviewImage(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (formData.password && formData.password !== formData.confirmPassword) {
//       toast({
//         title: 'Erreur',
//         description: 'Les mots de passe ne correspondent pas.',
//         variant: 'destructive',
//       });
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const formDataToSend = new FormData();
//       formDataToSend.append('fullname', formData.fullname);
//       formDataToSend.append('email', formData.email);
//       formDataToSend.append('phone_number', formData.phone_number);
//       if (formData.password) {
//         formDataToSend.append('password', formData.password);
//         formDataToSend.append('password_confirmation', formData.confirmPassword);
//       }
//       if (formData.profile_picture) {
//         formDataToSend.append('profile_picture', formData.profile_picture);
//       }

//       const response = await ApiService(`/appointments/user/${userId}`, 'POST', formDataToSend, {
//         'Content-Type': 'multipart/form-data',
//       });

//       if (response.success) {
//         toast({
//           title: 'Succès',
//           description: 'Profil mis à jour avec succès.',
//           variant: 'success',
//         });
//         navigate('/app/dashboard');
//       } else {
//         toast({
//           title: 'Erreur',
//           description: response.message || 'Échec de la mise à jour du profil.',
//           variant: 'destructive',
//         });
//       }
//     } catch (error) {
//       toast({
//         title: 'Erreur',
//         description: error.message || 'Une erreur s’est produite lors de la mise à jour du profil.',
//         variant: 'destructive',
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="p-6 bg-bizzwiz-deep-space/30 min-h-[calc(100vh-var(--header-height,72px))]"
//     >
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
//         <motion.h1
//           initial={{ x: -50, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ delay: 0.1 }}
//           className="text-4xl font-orbitron font-bold bg-clip-text text-transparent bg-gradient-to-r from-bizzwiz-electric-cyan to-bizzwiz-magenta-flare"
//         >
//           <User className="mr-3 text-bizzwiz-electric-cyan" size={38} />
//           Paramètres du Profil
//         </motion.h1>
//         <Button
//           variant="outline"
//           onClick={() => navigate('/app/dashboard')}
//           className="border-bizzwiz-electric-cyan/30 text-bizzwiz-star-white hover:bg-bizzwiz-electric-cyan/10 hover:text-bizzwiz-electric-cyan"
//           aria-label="Retour au tableau de bord"
//         >
//           <ArrowLeft size={16} className="mr-2" />
//           Retour
//         </Button>
//       </div>

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.2 }}
//       >
//         <Card className="bg-bizzwiz-glass-bg/60 backdrop-blur-lg border-bizzwiz-electric-cyan/20 shadow-xl shadow-bizzwiz-nebula-purple/30 max-w-2xl mx-auto">
//           <CardHeader>
//             <CardTitle className="text-2xl font-orbitron text-bizzwiz-star-white">
//               Modifier le Profil
//             </CardTitle>
//             <CardDescription className="text-bizzwiz-comet-tail/90">
//               Mettez à jour vos informations personnelles et votre mot de passe.
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <Label htmlFor="fullname" className="text-bizzwiz-star-white">
//                     Nom Complet
//                   </Label>
//                   <Input
//                     type="text"
//                     name="fullname"
//                     id="fullname"
//                     value={formData.fullname}
//                     onChange={handleInputChange}
//                     icon={<User size={16} />}
//                     className="bg-bizzwiz-glass-bg text-bizzwiz-star-white border-bizzwiz-electric-cyan/20 focus:ring-bizzwiz-electric-cyan focus:border-bizzwiz-electric-cyan"
//                     placeholder="Entrez votre nom complet"
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="email" className="text-bizzwiz-star-white">
//                     Email
//                   </Label>
//                   <Input
//                     type="email"
//                     name="email"
//                     id="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     icon={<Mail size={16} />}
//                     className="bg-bizzwiz-glass-bg text-bizzwiz-star-white border-bizzwiz-electric-cyan/20 focus:ring-bizzwiz-electric-cyan focus:border-bizzwiz-electric-cyan"
//                     placeholder="Entrez votre email"
//                   />
//                 </div>
//               </div>
//               <div>
//                 <Label htmlFor="phone_number" className="text-bizzwiz-star-white">
//                   Numéro de Téléphone
//                 </Label>
//                 <Input
//                   type="text"
//                   name="phone_number"
//                   id="phone_number"
//                   value={formData.phone_number}
//                   onChange={handleInputChange}
//                   icon={<Phone size={16} />}
//                   className="bg-bizzwiz-glass-bg text-bizzwiz-star-white border-bizzwiz-electric-cyan/20 focus:ring-bizzwiz-electric-cyan focus:border-bizzwiz-electric-cyan"
//                   placeholder="Entrez votre numéro de téléphone"
//                 />
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <Label htmlFor="password" className="text-bizzwiz-star-white">
//                     Nouveau Mot de Passe
//                   </Label>
//                   <Input
//                     type="password"
//                     name="password"
//                     id="password"
//                     value={formData.password}
//                     onChange={handleInputChange}
//                     icon={<Lock size={16} />}
//                     className="bg-bizzwiz-glass-bg text-bizzwiz-star-white border-bizzwiz-electric-cyan/20 focus:ring-bizzwiz-electric-cyan focus:border-bizzwiz-electric-cyan"
//                     placeholder="Entrez le nouveau mot de passe"
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="confirmPassword" className="text-bizzwiz-star-white">
//                     Confirmer le Mot de Passe
//                   </Label>
//                   <Input
//                     type="password"
//                     name="confirmPassword"
//                     id="confirmPassword"
//                     value={formData.confirmPassword}
//                     onChange={handleInputChange}
//                     icon={<Lock size={16} />}
//                     className="bg-bizzwiz-glass-bg text-bizzwiz-star-white border-bizzwiz-electric-cyan/20 focus:ring-bizzwiz-electric-cyan focus:border-bizzwiz-electric-cyan"
//                     placeholder="Confirmez le nouveau mot de passe"
//                   />
//                 </div>
//               </div>
//               <div className="flex justify-end space-x-4">
//                 <Button
//                   variant="outline"
//                   onClick={() => navigate('/app/dashboard')}
//                   className="border-bizzwiz-electric-cyan/30 text-bizzwiz-star-white hover:bg-bizzwiz-electric-cyan/10 hover:text-bizzwiz-electric-cyan"
//                 >
//                   Annuler
//                 </Button>
//                 <motion.button
//                   type="submit"
//                   disabled={isLoading}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className={cn(
//                     'px-6 py-3 rounded-lg bg-gradient-to-r from-bizzwiz-electric-cyan to-bizzwiz-magenta-flare text-bizzwiz-deep-space font-orbitron font-medium shadow-md shadow-bizzwiz-electric-cyan/30 hover:shadow-bizzwiz-electric-cyan/50',
//                     isLoading && 'opacity-50 cursor-not-allowed'
//                   )}
//                 >
//                   {isLoading ? 'Enregistrement...' : 'Enregistrer les Modifications'}
//                 </motion.button>
//               </div>
//             </form>
//           </CardContent>
//         </Card>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default UserSettingsPage;


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Button } from '@/components/ui/button';
// import { toast } from '@/components/ui/use-toast';
// import { ArrowLeft, User, Mail, Lock, Phone, Camera } from 'lucide-react';
// import { cn } from '@/lib/utils';
// import ApiService from '@/apiService';

// const UserSettingsPage = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     fullname: '',
//     email: '',
//     phone_number: '',
//     password: '',
//     confirmPassword: '',
//     profile_picture: null,
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [previewImage, setPreviewImage] = useState(null);
//   const userId = localStorage.getItem('bizzwiz-userId');

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   const fetchUserData = async () => {
//     try {
//       const response = await ApiService(`/appointments/user/${userId}`, 'GET');
//       if (response.success) {
//         setFormData({
//           fullname: response.data.user?.fullname || '',
//           email: response.data.user?.email || '',
//           phone_number: response.data.appointment?.phone_number || '',
//           password: '',
//           confirmPassword: '',
//           profile_picture: null,
//         });
//         if (response.data.user?.profile_picture) {
//           setPreviewImage(response.data.user.profile_picture);
//         }
//       } else {
//         toast({
//           title: 'Erreur',
//           description: response.message || 'Échec du chargement des données utilisateur.',
//           variant: 'destructive',
//         });
//       }
//     } catch (error) {
//       toast({
//         title: 'Erreur',
//         description: error.message || 'Une erreur s’est produite lors du chargement des données utilisateur.',
//         variant: 'destructive',
//       });
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData((prev) => ({ ...prev, profile_picture: file }));
//       setPreviewImage(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (formData.password && formData.password !== formData.confirmPassword) {
//       toast({
//         title: 'Erreur',
//         description: 'Les mots de passe ne correspondent pas.',
//         variant: 'destructive',
//       });
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const formDataToSend = new FormData();
//       formDataToSend.append('fullname', formData.fullname);
//       formDataToSend.append('email', formData.email);
//       formDataToSend.append('phone_number', formData.phone_number);
//       if (formData.password) {
//         formDataToSend.append('password', formData.password);
//         formDataToSend.append('password_confirmation', formData.confirmPassword);
//       }
//       if (formData.profile_picture) {
//         formDataToSend.append('profile_picture', formData.profile_picture);
//       }

//       const response = await ApiService(`/appointments/user/${userId}`, 'POST', formDataToSend, {
//         'Content-Type': 'multipart/form-data',
//       });

//       if (response.success) {
//         toast({
//           title: 'Succès',
//           description: 'Profil mis à jour avec succès.',
//         });
//         navigate('/app/dashboard');
//       } else {
//         toast({
//           title: 'Erreur',
//           description: response.message || 'Échec de la mise à jour du profil.',
//           variant: 'destructive',
//         });
//       }
//     } catch (error) {
//       toast({
//         title: 'Erreur',
//         description: error.message || 'Une erreur s’est produite lors de la mise à jour du profil.',
//         variant: 'destructive',
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-[calc(100vh-var(--header-height,72px))] p-6 bg-bizzwiz-deep-space text-bizzwiz-star-white">
//       <div className="flex justify-between items-center mb-8">
//         <motion.h1
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-4xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-bizzwiz-electric-cyan to-bizzwiz-magenta-flare relative"
//         >
//           Paramètres du Profil
//           <span className="absolute -bottom-2 left-0 w-1/4 h-1 bg-gradient-to-r from-bizzwiz-electric-cyan to-bizzwiz-magenta-flare rounded-full opacity-50 animate-pulse"></span>
//         </motion.h1>
//         <Button
//           variant="outline"
//           onClick={() => navigate('/app/dashboard')}
//           className="border-bizzwiz-electric-cyan text-bizzwiz-electric-cyan hover:bg-bizzwiz-electric-cyan/10"
//           aria-label="Retour au tableau de bord"
//         >
//           <ArrowLeft size={16} className="mr-2" />
//           Retour
//         </Button>
//       </div>

//       <AnimatePresence>
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -20 }}
//           className="p-6 rounded-xl border border-bizzwiz-electric-cyan/20 bg-bizzwiz-deep-space/30 backdrop-blur-lg shadow-lg max-w-2xl mx-auto"
//         >
//           <h2 className="text-2xl font-orbitron font-bold text-bizzwiz-magenta-flare mb-4">
//             Modifier le Profil
//           </h2>
//           <form onSubmit={handleSubmit} className="space-y-4 text-bizzwiz-comet-tail">
//             <div className="relative">
//               <label htmlFor="fullname" className="block font-medium text-bizzwiz-star-white mb-1">
//                 Nom Complet
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <User size={16} className="text-bizzwiz-electric-cyan" />
//                 </div>
//                 <input
//                   type="text"
//                   name="fullname"
//                   id="fullname"
//                   value={formData.fullname}
//                   onChange={handleInputChange}
//                   className={cn(
//                     'w-full p-3 pl-10 rounded-lg bg-bizzwiz-deep-space/50 text-bizzwiz-star-white border border-bizzwiz-electric-cyan/20 focus:border-bizzwiz-electric-cyan focus:ring-2 focus:ring-bizzwiz-electric-cyan/50 outline-none transition-all'
//                   )}
//                   placeholder="Entrez votre nom complet"
//                 />
//               </div>
//             </div>
//             <div className="relative">
//               <label htmlFor="email" className="block font-medium text-bizzwiz-star-white mb-1">
//                 Email
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Mail size={16} className="text-bizzwiz-electric-cyan" />
//                 </div>
//                 <input
//                   type="email"
//                   name="email"
//                   id="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   className={cn(
//                     'w-full p-3 pl-10 rounded-lg bg-bizzwiz-deep-space/50 text-bizzwiz-star-white border border-bizzwiz-electric-cyan/20 focus:border-bizzwiz-electric-cyan focus:ring-2 focus:ring-bizzwiz-electric-cyan/50 outline-none transition-all'
//                   )}
//                   placeholder="Entrez votre email"
//                 />
//               </div>
//             </div>
//             <div className="relative">
//               <label htmlFor="phone_number" className="block font-medium text-bizzwiz-star-white mb-1">
//                 Numéro de Téléphone
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Phone size={16} className="text-bizzwiz-electric-cyan" />
//                 </div>
//                 <input
//                   type="text"
//                   name="phone_number"
//                   id="phone_number"
//                   value={formData.phone_number}
//                   onChange={handleInputChange}
//                   className={cn(
//                     'w-full p-3 pl-10 rounded-lg bg-bizzwiz-deep-space/50 text-bizzwiz-star-white border border-bizzwiz-electric-cyan/20 focus:border-bizzwiz-electric-cyan focus:ring-2 focus:ring-bizzwiz-electric-cyan/50 outline-none transition-all'
//                   )}
//                   placeholder="Entrez votre numéro de téléphone"
//                 />
//               </div>
//             </div>
//             <div className="relative">
//               <label htmlFor="password" className="block font-medium text-bizzwiz-star-white mb-1">
//                 Nouveau Mot de Passe
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Lock size={16} className="text-bizzwiz-electric-cyan" />
//                 </div>
//                 <input
//                   type="password"
//                   name="password"
//                   id="password"
//                   value={formData.password}
//                   onChange={handleInputChange}
//                   className={cn(
//                     'w-full p-3 pl-10 rounded-lg bg-bizzwiz-deep-space/50 text-bizzwiz-star-white border border-bizzwiz-electric-cyan/20 focus:border-bizzwiz-electric-cyan focus:ring-2 focus:ring-bizzwiz-electric-cyan/50 outline-none transition-all'
//                   )}
//                   placeholder="Entrez le nouveau mot de passe"
//                 />
//               </div>
//             </div>
//             <div className="relative">
//               <label htmlFor="confirmPassword" className="block font-medium text-bizzwiz-star-white mb-1">
//                 Confirmer le Mot de Passe
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Lock size={16} className="text-bizzwiz-electric-cyan" />
//                 </div>
//                 <input
//                   type="password"
//                   name="confirmPassword"
//                   id="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleInputChange}
//                   className={cn(
//                     'w-full p-3 pl-10 rounded-lg bg-bizzwiz-deep-space/50 text-bizzwiz-star-white border border-bizzwiz-electric-cyan/20 focus:border-bizzwiz-electric-cyan focus:ring-2 focus:ring-bizzwiz-electric-cyan/50 outline-none transition-all'
//                   )}
//                   placeholder="Confirmez le nouveau mot de passe"
//                 />
//               </div>
//             </div>
          
//             <div className="flex justify-end space-x-4">
//               <Button
//                 variant="outline"
//                 onClick={() => navigate('/app/dashboard')}
//                 className="border-bizzwiz-electric-cyan text-bizzwiz-electric-cyan hover:bg-bizzwiz-electric-cyan/10"
//               >
//                 Annuler
//               </Button>
//               <motion.button
//                 type="submit"
//                 disabled={isLoading}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className={cn(
//                   'px-6 py-3 rounded-xl bg-gradient-to-r from-bizzwiz-electric-cyan to-bizzwiz-magenta-flare text-bizzwiz-deep-space font-semibold shadow-lg hover:shadow-bizzwiz-electric-cyan/50 transition-all duration-300',
//                   isLoading && 'opacity-50 cursor-not-allowed'
//                 )}
//               >
//                 {isLoading ? 'Enregistrement...' : 'Enregistrer les Modifications'}
//               </motion.button>
//             </div>
//           </form>
//         </motion.div>
//       </AnimatePresence>
//     </div>
//   );
// };

// export default UserSettingsPage;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { ArrowLeft, User, Mail, Phone, Lock, Camera } from 'lucide-react';
import { cn } from '@/lib/utils';
import ApiService from '@/apiService';

const UserSettingsPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone_number: '',
    password: '',
    confirmPassword: '',
    profile_picture: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const userId = localStorage.getItem('bizzwiz-userId');

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await ApiService(`/appointments/user/${userId}`, 'GET');
      if (response.success) {
        setFormData({
          fullname: response.data.user?.fullname || '',
          email: response.data.user?.email || '',
          phone_number: response.data.appointment?.phone_number || '',
          password: '',
          confirmPassword: '',
          profile_picture: null,
        });
        if (response.data.user?.profile_picture) {
          setPreviewImage(response.data.user.profile_picture);
        }
      } else {
        toast({
          title: 'Erreur',
          description: response.message || 'Échec du chargement des données utilisateur.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Erreur',
        description: error.message || 'Une erreur s’est produite lors du chargement des données utilisateur.',
        variant: 'destructive',
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profile_picture: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password && formData.password !== formData.confirmPassword) {
      toast({
        title: 'Erreur',
        description: 'Les mots de passe ne correspondent pas.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('fullname', formData.fullname);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone_number', formData.phone_number);
      if (formData.password) {
        formDataToSend.append('password', formData.password);
        formDataToSend.append('password_confirmation', formData.confirmPassword);
      }
      if (formData.profile_picture) {
        formDataToSend.append('profile_picture', formData.profile_picture);
      }

      const response = await ApiService(`/appointments/user/${userId}`, 'POST', formDataToSend, {
        'Content-Type': 'multipart/form-data',
      });

      if (response.success) {
        toast({
          title: 'Succès',
          description: 'Profil mis à jour avec succès.',
          variant: 'success',
        });
        navigate('/app/dashboard');
      } else {
        toast({
          title: 'Erreur',
          description: response.message || 'Échec de la mise à jour du profil.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Erreur',
        description: error.message || 'Une erreur s’est produite lors de la mise à jour du profil.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-bizzwiz-deep-space/30 min-h-[calc(100vh-var(--header-height,72px))]"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <motion.h1
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-4xl font-orbitron font-bold text-[#8f00ff]"
        >
          {/* <User className="mr-3 text-[#8f00ff]" size={38} /> */}
          Paramètres du Profil
        </motion.h1>
        <Button
          variant="outline"
          onClick={() => navigate('/app/dashboard')}
          className="border-[#8f00ff]/30 text-bizzwiz-star-white hover:bg-[#8f00ff]/10 hover:text-[#8f00ff]"
          aria-label="Retour au tableau de bord"
        >
          <ArrowLeft size={16} className="mr-2" />
          Retour
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-bizzwiz-glass-bg/60 backdrop-blur-lg border-[#8f00ff]/20 shadow-xl shadow-[#8f00ff]/30 max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-orbitron text-[#8f00ff]">
              Modifier le Profil
            </CardTitle>
            <CardDescription className="text-bizzwiz-comet-tail/90">
              Mettez à jour vos informations personnelles et votre mot de passe.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullname" className="text-bizzwiz-star-white">
                    Nom Complet
                  </Label>
                  <Input
                    type="text"
                    name="fullname"
                    id="fullname"
                    value={formData.fullname}
                    onChange={handleInputChange}
                    icon={<User size={16} />}
                    className="bg-bizzwiz-glass-bg text-bizzwiz-star-white border-[#8f00ff]/20 focus:ring-[#8f00ff] focus:border-[#8f00ff]"
                    placeholder="Entrez votre nom complet"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-bizzwiz-star-white">
                    Email
                  </Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    icon={<Mail size={16} />}
                    className="bg-bizzwiz-glass-bg text-bizzwiz-star-white border-[#8f00ff]/20 focus:ring-[#8f00ff] focus:border-[#8f00ff]"
                    placeholder="Entrez votre email"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="phone_number" className="text-bizzwiz-star-white">
                  Numéro de Téléphone
                </Label>
                <Input
                  type="text"
                  name="phone_number"
                  id="phone_number"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                  icon={<Phone size={16} />}
                  className="bg-bizzwiz-glass-bg text-bizzwiz-star-white border-[#8f00ff]/20 focus:ring-[#8f00ff] focus:border-[#8f00ff]"
                  placeholder="Entrez votre numéro de téléphone"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="password" className="text-bizzwiz-star-white">
                    Nouveau Mot de Passe
                  </Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    icon={<Lock size={16} />}
                    className="bg-bizzwiz-glass-bg text-bizzwiz-star-white border-[#8f00ff]/20 focus:ring-[#8f00ff] focus:border-[#8f00ff]"
                    placeholder="Entrez le nouveau mot de passe"
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword" className="text-bizzwiz-star-white">
                    Confirmer le Mot de Passe
                  </Label>
                  <Input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    icon={<Lock size={16} />}
                    className="bg-bizzwiz-glass-bg text-bizzwiz-star-white border-[#8f00ff]/20 focus:ring-[#8f00ff] focus:border-[#8f00ff]"
                    placeholder="Confirmez le nouveau mot de passe"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <Button
                  variant="outline"
                  onClick={() => navigate('/app/dashboard')}
                  className="border-[#8f00ff]/30 text-bizzwiz-star-white hover:bg-[#8f00ff]/10 hover:text-[#8f00ff]"
                >
                  Annuler
                </Button>
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    'px-6 py-3 rounded-lg bg-[#8f00ff] text-bizzwiz-deep-space font-orbitron font-medium shadow-md shadow-[#8f00ff]/30 hover:shadow-[#8f00ff]/50',
                    isLoading && 'opacity-50 cursor-not-allowed'
                  )}
                >
                  {isLoading ? 'Enregistrement...' : 'Enregistrer les Modifications'}
                </motion.button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default UserSettingsPage;