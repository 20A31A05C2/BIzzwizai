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

// // Custom CSS for react-datepicker
// const datePickerStyles = `
//   .react-datepicker {
//     background-color: #0A0B1A;
//     border: 1px solid rgba(143, 0, 255, 0.2);
//     border-radius: 0.5rem;
//     color: #F5F5F5;
//     font-family: Satoshi, sans-serif;
//   }
//   .react-datepicker__header {
//     background-color: #0A0B1A;
//     border-bottom: 1px solid rgba(143, 0, 255, 0.2);
//     color: #F5F5F5;
//   }
//   .react-datepicker__current-month,
//   .react-datepicker__day-name {
//     color: #F5F5F5;
//   }
//   .react-datepicker__day {
//     color: #A0AEC0;
//   }
//   .react-datepicker__day:hover {
//     background-color: rgba(143, 0, 255, 0.1);
//     border-radius: 0.25rem;
//   }
//   .react-datepicker__day--selected,
//   .react-datepicker__day--keyboard-selected {
//     background-color: #8f00ff;
//     color: #0A0B1A;
//     border-radius: 0.25rem;
//   }
//   .react-datepicker__time-container,
//   .react-datepicker__time-box {
//     background-color: #0A0B1A;
//     border: 1px solid rgba(143, 0, 255, 0.2);
//     color: #F5F5F5;
//   }
//   .react-datepicker__time-list-item {
//     color: #A0AEC0;
//   }
//   .react-datepicker__time-list-item:hover {
//     background-color: rgba(143, 0, 255, 0.1);
//   }
//   .react-datepicker__time-list-item--selected {
//     background-color: #8f00ff;
//     color: #0A0B1A;
//   }
//   .react-datepicker__triangle {
//     display: none;
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

//     const userId = localStorage.getItem('bizwizuser_id');
//     const formDataId = localStorage.getItem('bizwiz_form_data_id');

//     const updatedFormData = {
//       ...formData,
//       ...(userId && { user_id: parseInt(userId) }),
//       ...(formDataId && { form_data_id: parseInt(formDataId) }),
//     };

//     try {
//       const response = await ApiService('/appointments/public', 'POST', updatedFormData);

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

//         // ✅ Navigate to waiting page
//         setTimeout(() => {
//           navigate('/waiting-validation');
//         }, 1000);
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
//           className="text-4xl font-orbitron font-bold text-[#8f00ff] relative"
//         >
//           Planifier un Rendez-vous
//           <span className="absolute -bottom-2 left-0 w-1/4 h-1 bg-[#8f00ff] rounded-full opacity-50 animate-pulse"></span>
//         </motion.h1>
//         <Button
//           variant="outline"
//           onClick={() => navigate('/app/dashboard')}
//           className="border-[#8f00ff] text-bizzwiz-star-white hover:bg-[#8f00ff]/10 px-4 py-2 bg-[#8f00ff]"
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
//           className="p-6 rounded-xl border border-[#8f00ff]/20 bg-bizzwiz-deep-space/30 backdrop-blur-lg shadow-lg max-w-2xl mx-auto"
//         >
//           <h2 className="text-2xl font-orbitron font-bold text-[#8f00ff] mb-4">
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
//                   'w-full p-3 rounded-lg bg-bizzwiz-deep-space/50 text-bizzwiz-star-white border border-[#8f00ff]/20 focus:border-[#8f00ff] focus:ring-2 focus:ring-[#8f00ff]/50 outline-none transition-all'
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
//                   'w-full p-3 rounded-lg bg-bizzwiz-deep-space/50 text-bizzwiz-star-white border border-[#8f00ff]/20 focus:border-[#8f00ff] focus:ring-2 focus:ring-[#8f00ff]/50 outline-none transition-all'
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
//                   'w-full p-3 rounded-lg bg-bizzwiz-deep-space/50 text-bizzwiz-star-white border border-[#8f00ff]/20 focus:border-[#8f00ff] focus:ring-2 focus:ring-[#8f00ff]/50 outline-none transition-all'
//                 )}
//                 placeholder="Entrez votre numéro de téléphone"
//               />
//             </div>

//             <div>
//               <label className="font-medium text-bizzwiz-star-white block mb-1">Date et Heure du Rendez-vous</label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Calendar size={16} className="text-[#8f00ff]" />
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
//                     'w-full p-3 pl-10 rounded-lg bg-bizzwiz-deep-space/50 text-bizzwiz-star-white border border-[#8f00ff]/20 focus:border-[#8f00ff] focus:ring-2 focus:ring-[#8f00ff]/50 outline-none transition-all'
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
//                 'w-full p-6 py-4 rounded-xl bg-[#8f00ff] text-bizzwiz-deep-space font-semibold shadow-lg hover:shadow-[#8f00ff]/50 transition-all duration-300',
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
import { Link } from 'react-router-dom';

// Custom CSS for react-datepicker
const datePickerStyles = `
  .react-datepicker {
    background-color: #0A0B1A;
    border: 1px solid rgba(143, 0, 255, 0.2);
    border-radius: 0.5rem;
    color: #F5F5F5;
    font-family: Satoshi, sans-serif;
  }
  .react-datepicker__header {
    background-color: #0A0B1A;
    border-bottom: 1px solid rgba(143, 0, 255, 0.2);
    color: #F5F5F5;
  }
  .react-datepicker__current-month,
  .react-datepicker__day-name {
    color: #F5F5F5;
  }
  .react-datepicker__day {
    color: #A0AEC0;
  }
  .react-datepicker__day:hover {
    background-color: rgba(143, 0, 255, 0.1);
    border-radius: 0.25rem;
  }
  .react-datepicker__day--selected,
  .react-datepicker__day--keyboard-selected {
    background-color: #8f00ff;
    color: #0A0B1A;
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
    display: none;
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
  const [step, setStep] = useState(1); // Single-step for simplicity

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

    const userId = localStorage.getItem('bizwizuser_id');
    const formDataId = localStorage.getItem('bizwiz_form_data_id');

    const updatedFormData = {
      ...formData,
      ...(userId && { user_id: parseInt(userId) }),
      ...(formDataId && { form_data_id: parseInt(formDataId) }),
    };

    try {
      const response = await ApiService('/appointments/public', 'POST', updatedFormData);

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

        setTimeout(() => {
          navigate('/waiting-validation');
        }, 1000);
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
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="flex items-center justify-between p-4 bg-gray-800 border-b border-[#8f00ff]/20">
        <Link
                  to="/"
                >
                  <img
                    src="/logo.png"
                    alt="Logo"
                    className="w-15 h-10 sm:h-15 sm:w-10 object-contain"
                  />
                </Link>
        <Button
          variant="outline"
          onClick={() => navigate('/app/dashboard')}
          className="border-[#8f00ff] text-white hover:bg-[#8f00ff]/10 px-4 py-2"
          aria-label="Retour au tableau de bord"
        >
          <ArrowLeft size={16} className="mr-2" />
          Retour
        </Button>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-xl border border-[#8f00ff]/20 bg-gray-800/50 backdrop-blur-lg shadow-lg"
        >
          <h1 className="text-3xl font-bold text-[#8f00ff] mb-6">Planifier un Rendez-vous</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Nom</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full p-3 rounded-lg bg-gray-700/50 text-white border border-[#8f00ff]/20 focus:border-[#8f00ff] focus:ring-2 focus:ring-[#8f00ff]/50 outline-none transition-all"
                placeholder="Entrez votre nom"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Lien Figma (Optionnel)</label>
              <input
                type="url"
                name="figma_url"
                value={formData.figma_url}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg bg-gray-700/50 text-white border border-[#8f00ff]/20 focus:border-[#8f00ff] focus:ring-2 focus:ring-[#8f00ff]/50 outline-none transition-all"
                placeholder="Entrez l’URL Figma (optionnel)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Numéro de Téléphone</label>
              <input
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
                required
                className="w-full p-3 rounded-lg bg-gray-700/50 text-white border border-[#8f00ff]/20 focus:border-[#8f00ff] focus:ring-2 focus:ring-[#8f00ff]/50 outline-none transition-all"
                placeholder="Entrez votre numéro de téléphone"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Date et Heure du Rendez-vous</label>
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
                  className="w-full p-3 pl-10 rounded-lg bg-gray-700/50 text-white border border-[#8f00ff]/20 focus:border-[#8f00ff] focus:ring-2 focus:ring-[#8f00ff]/50 outline-none transition-all"
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
                'w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 text-gray-900 font-semibold shadow-lg hover:shadow-[#8f00ff]/50 transition-all duration-300',
                isSubmitting && 'opacity-50 cursor-not-allowed'
              )}
            >
              {isSubmitting ? 'Réservation...' : 'Réserver le Rendez-vous'}
            </motion.button>
          </form>
          <Button
            variant="outline"
            onClick={() => navigate('/app/dashboard')}
            className="mt-4 border-[#8f00ff] text-white hover:bg-[#8f00ff]/10 px-4 py-2 w-full hidden" // Hidden duplicate button
            aria-label="Retour au tableau de bord"
          >
            <ArrowLeft size={16} className="mr-2" />
            Retour
          </Button>
        </motion.div>
      </div>
      <style>{datePickerStyles}</style>
    </div>
  );
};

export default ScheduleMeetPage;

