// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Button } from '@/components/ui/button';
// import { ArrowLeft, Calendar } from 'lucide-react';
// import { toast } from '@/components/ui/use-toast';
// import { cn } from '@/lib/utils';
// import ApiService from '@/apiService';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// // Custom CSS for react-datepicker to match ProjectManagementPage theme
// const datePickerStyles = `
//   .react-datepicker {
//     background-color: #0A0B1A; /* bizzwiz-deep-space */
//     border: 1px solid rgba(0, 255, 255, 0.2); /* border-bizzwiz-electric-cyan/20 */
//     border-radius: 0.5rem;
//     color: #F5F5F5; /* text-bizzwiz-star-white */
//     font-family: Satoshi, sans-serif;
//   }
//   .react-datepicker__header {
//     background-color: #0A0B1A; /* bizzwiz-deep-space */
//     border-bottom: 1px solid rgba(0, 255, 255, 0.2);
//     color: #F5F5F5;
//   }
//   .react-datepicker__current-month,
//   .react-datepicker__day-name {
//     color: #F5F5F5; /* text-bizzwiz-star-white */
//   }
//   .react-datepicker__day {
//     color: #A0AEC0; /* text-bizzwiz-comet-tail */
//   }
//   .react-datepicker__day:hover {
//     background-color: rgba(0, 255, 255, 0.1); /* bizzwiz-electric-cyan/10 */
//     border-radius: 0.25rem;
//   }
//   .react-datepicker__day--selected,
//   .react-datepicker__day--keyboard-selected {
//     background-color: #00FFFF; /* bizzwiz-electric-cyan */
//     color: #0A0B1A; /* bizzwiz-deep-space */
//     border-radius: 0.25rem;
//   }
//   .react-datepicker__time-container,
//   .react-datepicker__time-box {
//     background-color: #0A0B1A;
//     border: 1px solid rgba(0, 255, 255, 0.2);
//     color: #F5F5F5;
//   }
//   .react-datepicker__time-list-item {
//     color: #A0AEC0;
//   }
//   .react-datepicker__time-list-item:hover {
//     background-color: rgba(0, 255, 255, 0.1);
//   }
//   .react-datepicker__time-list-item--selected {
//     background-color: #00FFFF;
//     color: #0A0B1A;
//   }
//   .react-datepicker__triangle {
//     display: none; /* Hide triangle for cleaner look */
//   }
// `;

// const ScheduleMeetPage = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: '',
//     figma_url: '',
//     phone_number: '',
//     appointment_date: '',
//     appointment_time: '',
//   });
//   const [selectedDateTime, setSelectedDateTime] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleDateTimeChange = (date) => {
//     setSelectedDateTime(date);
//     if (date) {
//       const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD
//       const formattedTime = date.toTimeString().slice(0, 5); // HH:MM
//       setFormData((prev) => ({
//         ...prev,
//         appointment_date: formattedDate,
//         appointment_time: formattedTime,
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         appointment_date: '',
//         appointment_time: '',
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.name || !formData.phone_number || !formData.appointment_date || !formData.appointment_time) {
//       toast({
//         title: 'Erreur',
//         description: 'Veuillez remplir tous les champs obligatoires.',
//         variant: 'destructive',
//       });
//       return;
//     }
//     setIsSubmitting(true);

//     try {
//       const userId = localStorage.getItem('bizzwiz-userId');
//       if (!userId) {
//         toast({
//           title: 'Erreur',
//           description: 'Utilisateur non authentifié.',
//           variant: 'destructive',
//         });
//         return;
//       }

//       const response = await ApiService('/appointments', 'POST', formData);

//       if (response.success) {
//         toast({
//           title: 'Succès',
//           description: 'Rendez-vous réservé avec succès.',
//         });
//         setFormData({
//           name: '',
//           figma_url: '',
//           phone_number: '',
//           appointment_date: '',
//           appointment_time: '',
//         });
//         setSelectedDateTime(null);
//       } else {
//         toast({
//           title: 'Erreur',
//           description: response.message || 'Échec de la réservation du rendez-vous.',
//           variant: 'destructive',
//         });
//       }
//     } catch (error) {
//       console.error('Erreur lors de la réservation du rendez-vous:', error);
//       toast({
//         title: 'Erreur',
//         description: error.message || 'Une erreur s’est produite lors de la réservation du rendez-vous.',
//         variant: 'destructive',
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-[calc(100vh-var(--header-height,72px))] p-6 bg-bizzwiz-deep-space text-bizzwiz-star-white">
//       <style>{datePickerStyles}</style>
//       <div className="flex justify-between items-center mb-8">
//         <motion.h1
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-4xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-bizzwiz-electric-cyan to-bizzwiz-magenta-flare relative"
//         >
//           Planifier un Rendez-vous
//           <span className="absolute -bottom-2 left-0 w-1/4 h-1 bg-gradient-to-r from-bizzwiz-electric-cyan to-bizzwiz-magenta-flare rounded-full opacity-50 animate-pulse"></span>
//         </motion.h1>
//         <Button
//           variant="outline"
//           onClick={() => navigate('/app/dashboard')}
//           className="border-bizzwiz-nebula-purple text-bizzwiz-star-white hover:bg-bizzwiz-nebula-purple/10 px-4 py-2 bg-gradient-to-r from-bizzwiz-nebula-purple to-bizzwiz-magenta-flare"
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
//             Formulaire de Réservation
//           </h2>
//           <form onSubmit={handleSubmit} className="space-y-4 text-bizzwiz-comet-tail">
//             <div>
//               <label className="font-medium text-bizzwiz-star-white block mb-1">Nom</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 required
//                 className={cn(
//                   'w-full p-3 rounded-lg bg-bizzwiz-deep-space/50 text-bizzwiz-star-white border border-bizzwiz-electric-cyan/20 focus:border-bizzwiz-electric-cyan focus:ring-2 focus:ring-bizzwiz-electric-cyan/50 outline-none transition-all'
//                 )}
//                 placeholder="Entrez votre nom"
//               />
//             </div>
//             <div>
//               <label className="font-medium text-bizzwiz-star-white block mb-1">Lien Figma (Optionnel)</label>
//               <input
//                 type="url"
//                 name="figma_url"
//                 value={formData.figma_url}
//                 onChange={handleInputChange}
//                 className={cn(
//                   'w-full p-3 rounded-lg bg-bizzwiz-deep-space/50 text-bizzwiz-star-white border border-bizzwiz-electric-cyan/20 focus:border-bizzwiz-electric-cyan focus:ring-2 focus:ring-bizzwiz-electric-cyan/50 outline-none transition-all'
//                 )}
//                 placeholder="Entrez l’URL Figma (optionnel)"
//               />
//             </div>
//             <div>
//               <label className="font-medium text-bizzwiz-star-white block mb-1">Numéro de Téléphone</label>
//               <input
//                 type="tel"
//                 name="phone_number"
//                 value={formData.phone_number}
//                 onChange={handleInputChange}
//                 required
//                 className={cn(
//                   'w-full p-3 rounded-lg bg-bizzwiz-deep-space/50 text-bizzwiz-star-white border border-bizzwiz-electric-cyan/20 focus:border-bizzwiz-electric-cyan focus:ring-2 focus:ring-bizzwiz-electric-cyan/50 outline-none transition-all'
//                 )}
//                 placeholder="Entrez votre numéro de téléphone"
//               />
//             </div>
//             <div>
//               <label className="font-medium text-bizzwiz-star-white block mb-1">Date et Heure du Rendez-vous</label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Calendar size={16} className="text-bizzwiz-electric-cyan" />
//                 </div>
//                 <DatePicker
//                   selected={selectedDateTime}
//                   onChange={handleDateTimeChange}
//                   showTimeSelect
//                   timeIntervals={15}
//                   minDate={new Date()}
//                   dateFormat="yyyy-MM-dd HH:mm"
//                   placeholderText="Sélectionnez la date et l’heure"
//                   className={cn(
//                     'w-full p-3 pl-10 rounded-lg bg-bizzwiz-deep-space/50 text-bizzwiz-star-white border border-bizzwiz-electric-cyan/20 focus:border-bizzwiz-electric-cyan focus:ring-2 focus:ring-bizzwiz-electric-cyan/50 outline-none transition-all'
//                   )}
//                   required
//                 />
//               </div>
//             </div>
//             <motion.button
//               type="submit"
//               disabled={isSubmitting}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className={cn(
//                 'w-full p-6 py-4 rounded-xl bg-gradient-to-r from-bizzwiz-nebula-purple to-bizzwiz-magenta-flare text-bizzwiz-deep-space font-semibold shadow-lg hover:shadow-bizzwiz-nebula-purple/50 transition-all duration-300',
//                 isSubmitting && 'opacity-50 cursor-not-allowed'
//               )}
//             >
//               {isSubmitting ? 'Réservation...' : 'Réserver le Rendez-vous'}
//             </motion.button>
//           </form>
//         </motion.div>
//       </AnimatePresence>
//     </div>
//   );
// };

// export default ScheduleMeetPage;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Button } from '@/components/ui/button';
// import { ArrowLeft, Calendar } from 'lucide-react';
// import { toast } from '@/components/ui/use-toast';
// import { cn } from '@/lib/utils';
// import ApiService from '@/apiService';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// // Custom CSS for react-datepicker to match ProjectManagementPage theme
// const datePickerStyles = `
//   .react-datepicker {
//     background-color: #0A0B1A; /* bizzwiz-deep-space */
//     border: 1px solid rgba(0, 255, 255, 0.2); /* border-bizzwiz-electric-cyan/20 */
//     border-radius: 0.5rem;
//     color: #F5F5F5; /* text-bizzwiz-star-white */
//     font-family: Satoshi, sans-serif;
//   }
//   .react-datepicker__header {
//     background-color: #0A0B1A; /* bizzwiz-deep-space */
//     border-bottom: 1px solid rgba(0, 255, 255, 0.2);
//     color: #F5F5F5;
//   }
//   .react-datepicker__current-month,
//   .react-datepicker__day-name {
//     color: #F5F5F5; /* text-bizzwiz-star-white */
//   }
//   .react-datepicker__day {
//     color: #A0AEC0; /* text-bizzwiz-comet-tail */
//   }
//   .react-datepicker__day:hover {
//     background-color: rgba(0, 255, 255, 0.1); /* bizzwiz-electric-cyan/10 */
//     border-radius: 0.25rem;
//   }
//   .react-datepicker__day--selected,
//   .react-datepicker__day--keyboard-selected {
//     background-color: #00FFFF; /* bizzwiz-electric-cyan */
//     color: #0A0B1A; /* bizzwiz-deep-space */
//     border-radius: 0.25rem;
//   }
//   .react-datepicker__time-container,
//   .react-datepicker__time-box {
//     background-color: #0A0B1A;
//     border: 1px solid rgba(0, 255, 255, 0.2);
//     color: #F5F5F5;
//   }
//   .react-datepicker__time-list-item {
//     color: #A0AEC0;
//   }
//   .react-datepicker__time-list-item:hover {
//     background-color: rgba(0, 255, 255, 0.1);
//   }
//   .react-datepicker__time-list-item--selected {
//     background-color: #00FFFF;
//     color: #0A0B1A;
//   }
//   .react-datepicker__triangle {
//     display: none; /* Hide triangle for cleaner look */
//   }
// `;

// const ScheduleMeetPage = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: '',
//     figma_url: '',
//     phone_number: '',
//     appointment_date: '',
//     appointment_time: '',
//   });
//   const [selectedDateTime, setSelectedDateTime] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleDateTimeChange = (date) => {
//     setSelectedDateTime(date);
//     if (date) {
//       const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD
//       const formattedTime = date.toTimeString().slice(0, 5); // HH:MM
//       setFormData((prev) => ({
//         ...prev,
//         appointment_date: formattedDate,
//         appointment_time: formattedTime,
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         appointment_date: '',
//         appointment_time: '',
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.name || !formData.phone_number || !formData.appointment_date || !formData.appointment_time) {
//       toast({
//         title: 'Erreur',
//         description: 'Veuillez remplir tous les champs obligatoires.',
//         variant: 'destructive',
//       });
//       return;
//     }
//     setIsSubmitting(true);

//     try {
//       const userId = localStorage.getItem('bizzwiz-userId');
//       if (!userId) {
//         toast({
//           title: 'Erreur',
//           description: 'Utilisateur non authentifié.',
//           variant: 'destructive',
//         });
//         return;
//       }

//       const response = await ApiService('/appointments', 'POST', formData);

//       if (response.success) {
//         toast({
//           title: 'Succès',
//           description: 'Rendez-vous réservé avec succès.',
//         });
//         setFormData({
//           name: '',
//           figma_url: '',
//           phone_number: '',
//           appointment_date: '',
//           appointment_time: '',
//         });
//         setSelectedDateTime(null);
//       } else {
//         toast({
//           title: 'Erreur',
//           description: response.message || 'Échec de la réservation du rendez-vous.',
//           variant: 'destructive',
//         });
//       }
//     } catch (error) {
//       console.error('Erreur lors de la réservation du rendez-vous:', error);
//       toast({
//         title: 'Erreur',
//         description: error.message || 'Une erreur s’est produite lors de la réservation du rendez-vous.',
//         variant: 'destructive',
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-[calc(100vh-var(--header-height,72px))] p-6 bg-bizzwiz-deep-space text-bizzwiz-star-white">
//       <style>{datePickerStyles}</style>
//       <div className="flex justify-between items-center mb-8">
//         <motion.h1
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-4xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-bizzwiz-electric-cyan to-bizzwiz-magenta-flare relative"
//         >
//           Planifier un Rendez-vous
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
//             Formulaire de Réservation
//           </h2>
//           <form onSubmit={handleSubmit} className="space-y-4 text-bizzwiz-comet-tail">
//             <div>
//               <label className="font-medium text-bizzwiz-star-white block mb-1">Nom</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 required
//                 className={cn(
//                   'w-full p-3 rounded-lg bg-bizzwiz-deep-space/50 text-bizzwiz-star-white border border-bizzwiz-electric-cyan/20 focus:border-bizzwiz-electric-cyan focus:ring-2 focus:ring-bizzwiz-electric-cyan/50 outline-none transition-all'
//                 )}
//                 placeholder="Entrez votre nom"
//               />
//             </div>
//             <div>
//               <label className="font-medium text-bizzwiz-star-white block mb-1">Lien Figma (Optionnel)</label>
//               <input
//                 type="url"
//                 name="figma_url"
//                 value={formData.figma_url}
//                 onChange={handleInputChange}
//                 className={cn(
//                   'w-full p-3 rounded-lg bg-bizzwiz-deep-space/50 text-bizzwiz-star-white border border-bizzwiz-electric-cyan/20 focus:border-bizzwiz-electric-cyan focus:ring-2 focus:ring-bizzwiz-electric-cyan/50 outline-none transition-all'
//                 )}
//                 placeholder="Entrez l’URL Figma (optionnel)"
//               />
//             </div>
//             <div>
//               <label className="font-medium text-bizzwiz-star-white block mb-1">Numéro de Téléphone</label>
//               <input
//                 type="tel"
//                 name="phone_number"
//                 value={formData.phone_number}
//                 onChange={handleInputChange}
//                 required
//                 className={cn(
//                   'w-full p-3 rounded-lg bg-bizzwiz-deep-space/50 text-bizzwiz-star-white border border-bizzwiz-electric-cyan/20 focus:border-bizzwiz-electric-cyan focus:ring-2 focus:ring-bizzwiz-electric-cyan/50 outline-none transition-all'
//                 )}
//                 placeholder="Entrez votre numéro de téléphone"
//               />
//             </div>
//             <div>
//               <label className="font-medium text-bizzwiz-star-white block mb-1">Date et Heure du Rendez-vous</label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Calendar size={16} className="text-bizzwiz-electric-cyan" />
//                 </div>
//                 <DatePicker
//                   selected={selectedDateTime}
//                   onChange={handleDateTimeChange}
//                   showTimeSelect
//                   timeIntervals={15}
//                   minDate={new Date()}
//                   dateFormat="yyyy-MM-dd HH:mm"
//                   placeholderText="Sélectionnez la date et l’heure"
//                   className={cn(
//                     'w-full p-3 pl-10 rounded-lg bg-bizzwiz-deep-space/50 text-bizzwiz-star-white border border-bizzwiz-electric-cyan/20 focus:border-bizzwiz-electric-cyan focus:ring-2 focus:ring-bizzwiz-electric-cyan/50 outline-none transition-all'
//                   )}
//                   required
//                 />
//               </div>
//             </div>
//             <motion.button
//               type="submit"
//               disabled={isSubmitting}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className={cn(
//                 'w-full p-3 rounded-xl bg-gradient-to-r from-bizzwiz-electric-cyan to-bizzwiz-magenta-flare text-bizzwiz-deep-space font-semibold shadow-lg hover:shadow-bizzwiz-electric-cyan/50 transition-all duration-300',
//                 isSubmitting && 'opacity-50 cursor-not-allowed'
//               )}
//             >
//               {isSubmitting ? 'Réservation...' : 'Réserver le Rendez-vous'}
//             </motion.button>
//           </form>
//         </motion.div>
//       </AnimatePresence>
//     </div>
//   );
// };

// export default ScheduleMeetPage;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import ApiService from '@/apiService';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Custom CSS for react-datepicker to match theme with updated colors
const datePickerStyles = `
  .react-datepicker {
    background-color: #0A0B1A; /* bizzwiz-deep-space */
    border: 1px solid rgba(143, 0, 255, 0.2); /* border-[#8f00ff]/20 */
    border-radius: 0.5rem;
    color: #F5F5F5; /* text-bizzwiz-star-white */
    font-family: Satoshi, sans-serif;
  }
  .react-datepicker__header {
    background-color: #0A0B1A; /* bizzwiz-deep-space */
    border-bottom: 1px solid rgba(143, 0, 255, 0.2);
    color: #F5F5F5;
  }
  .react-datepicker__current-month,
  .react-datepicker__day-name {
    color: #F5F5F5; /* text-bizzwiz-star-white */
  }
  .react-datepicker__day {
    color: #A0AEC0; /* text-bizzwiz-comet-tail */
  }
  .react-datepicker__day:hover {
    background-color: rgba(143, 0, 255, 0.1); /* [#8f00ff]/10 */
    border-radius: 0.25rem;
  }
  .react-datepicker__day--selected,
  .react-datepicker__day--keyboard-selected {
    background-color: #8f00ff; /* [#8f00ff] */
    color: #0A0B1A; /* bizzwiz-deep-space */
    border-radius: 0.25rem;
  }
  .react-datepicker__time-container,
  .react-datepicker__time-box {
    background-color: #0A0B1A;
    border: 1px solid rgba(143, 0, 255, 0.2);
    color: #F5F5F5;
  }
  .react-datepicker__time-list-item {
    color: #A0AEC0;
  }
  .react-datepicker__time-list-item:hover {
    background-color: rgba(143, 0, 255, 0.1);
  }
  .react-datepicker__time-list-item--selected {
    background-color: #8f00ff;
    color: #0A0B1A;
  }
  .react-datepicker__triangle {
    display: none; /* Hide triangle for cleaner look */
  }
`;

const ScheduleMeetPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    figma_url: '',
    phone_number: '',
    appointment_date: '',
    appointment_time: '',
  });
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateTimeChange = (date) => {
    setSelectedDateTime(date);
    if (date) {
      const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD
      const formattedTime = date.toTimeString().slice(0, 5); // HH:MM
      setFormData((prev) => ({
        ...prev,
        appointment_date: formattedDate,
        appointment_time: formattedTime,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        appointment_date: '',
        appointment_time: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone_number || !formData.appointment_date || !formData.appointment_time) {
      toast({
        title: 'Erreur',
        description: 'Veuillez remplir tous les champs obligatoires.',
        variant: 'destructive',
      });
      return;
    }
    setIsSubmitting(true);

    try {
      const userId = localStorage.getItem('bizzwiz-userId');
      if (!userId) {
        toast({
          title: 'Erreur',
          description: 'Utilisateur non authentifié.',
          variant: 'destructive',
        });
        return;
      }

      const response = await ApiService('/appointments', 'POST', formData);

      if (response.success) {
        toast({
          title: 'Succès',
          description: 'Rendez-vous réservé avec succès.',
        });
        setFormData({
          name: '',
          figma_url: '',
          phone_number: '',
          appointment_date: '',
          appointment_time: '',
        });
        setSelectedDateTime(null);
      } else {
        toast({
          title: 'Erreur',
          description: response.message || 'Échec de la réservation du rendez-vous.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Erreur lors de la réservation du rendez-vous:', error);
      toast({
        title: 'Erreur',
        description: error.message || 'Une erreur s’est produite lors de la réservation du rendez-vous.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-var(--header-height,72px))] p-6 bg-bizzwiz-deep-space text-bizzwiz-star-white">
      <style>{datePickerStyles}</style>
      <div className="flex justify-between items-center mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-orbitron font-bold text-[#8f00ff] relative"
        >
          Planifier un Rendez-vous
          <span className="absolute -bottom-2 left-0 w-1/4 h-1 bg-[#8f00ff] rounded-full opacity-50 animate-pulse"></span>
        </motion.h1>
        <Button
          variant="outline"
          onClick={() => navigate('/app/dashboard')}
          className="border-[#8f00ff] text-bizzwiz-star-white hover:bg-[#8f00ff]/10 px-4 py-2 bg-[#8f00ff]"
          aria-label="Retour au tableau de bord"
        >
          <ArrowLeft size={16} className="mr-2" />
          Retour
        </Button>
      </div>

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="p-6 rounded-xl border border-[#8f00ff]/20 bg-bizzwiz-deep-space/30 backdrop-blur-lg shadow-lg max-w-2xl mx-auto"
        >
          <h2 className="text-2xl font-orbitron font-bold text-[#8f00ff] mb-4">
            Formulaire de Réservation
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4 text-bizzwiz-comet-tail">
            <div>
              <label className="font-medium text-bizzwiz-star-white block mb-1">Nom</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className={cn(
                  'w-full p-3 rounded-lg bg-bizzwiz-deep-space/50 text-bizzwiz-star-white border border-[#8f00ff]/20 focus:border-[#8f00ff] focus:ring-2 focus:ring-[#8f00ff]/50 outline-none transition-all'
                )}
                placeholder="Entrez votre nom"
              />
            </div>
            <div>
              <label className="font-medium text-bizzwiz-star-white block mb-1">Lien Figma (Optionnel)</label>
              <input
                type="url"
                name="figma_url"
                value={formData.figma_url}
                onChange={handleInputChange}
                className={cn(
                  'w-full p-3 rounded-lg bg-bizzwiz-deep-space/50 text-bizzwiz-star-white border border-[#8f00ff]/20 focus:border-[#8f00ff] focus:ring-2 focus:ring-[#8f00ff]/50 outline-none transition-all'
                )}
                placeholder="Entrez l’URL Figma (optionnel)"
              />
            </div>
            <div>
              <label className="font-medium text-bizzwiz-star-white block mb-1">Numéro de Téléphone</label>
              <input
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
                required
                className={cn(
                  'w-full p-3 rounded-lg bg-bizzwiz-deep-space/50 text-bizzwiz-star-white border border-[#8f00ff]/20 focus:border-[#8f00ff] focus:ring-2 focus:ring-[#8f00ff]/50 outline-none transition-all'
                )}
                placeholder="Entrez votre numéro de téléphone"
              />
            </div>
            <div>
              <label className="font-medium text-bizzwiz-star-white block mb-1">Date et Heure du Rendez-vous</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar size={16} className="text-[#8f00ff]" />
                </div>
                <DatePicker
                  selected={selectedDateTime}
                  onChange={handleDateTimeChange}
                  showTimeSelect
                  timeIntervals={15}
                  minDate={new Date()}
                  dateFormat="yyyy-MM-dd HH:mm"
                  placeholderText="Sélectionnez la date et l’heure"
                  className={cn(
                    'w-full p-3 pl-10 rounded-lg bg-bizzwiz-deep-space/50 text-bizzwiz-star-white border border-[#8f00ff]/20 focus:border-[#8f00ff] focus:ring-2 focus:ring-[#8f00ff]/50 outline-none transition-all'
                  )}
                  required
                />
              </div>
            </div>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'w-full p-6 py-4 rounded-xl bg-[#8f00ff] text-bizzwiz-deep-space font-semibold shadow-lg hover:shadow-[#8f00ff]/50 transition-all duration-300',
                isSubmitting && 'opacity-50 cursor-not-allowed'
              )}
            >
              {isSubmitting ? 'Réservation...' : 'Réserver le Rendez-vous'}
            </motion.button>
          </form>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ScheduleMeetPage;