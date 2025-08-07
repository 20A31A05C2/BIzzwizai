import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ApiService from '@/apiService';
import { toast } from '@/components/ui/use-toast';
import { LogOut } from 'lucide-react';

// Payment modal
const PaymentModal = ({ open, paymentUrl, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 max-w-md w-full text-center">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-slate-900">Complete Payment</h2>
        <p className="mb-6 text-slate-700 text-sm sm:text-base">Please complete your payment to access the dashboard.</p>
        <div className="flex flex-col gap-3">
          <a
            href={paymentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition text-center text-sm sm:text-base"
          >
            Pay Now
          </a>
          <Button variant="outline" onClick={onClose} className="w-full">Cancel</Button>
        </div>
      </div>
    </div>
  );
};

// Appointment modal
const AppointmentModal = ({ open, onClose, onBook }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 max-w-md w-full text-center">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-slate-900">Book an Appointment</h2>
        <p className="mb-6 text-slate-700 text-sm sm:text-base">To proceed with your project, please book an appointment with our team.</p>
        <div className="flex flex-col gap-3">
          <Button onClick={onBook} className="w-full">Book Appointment</Button>
          <Button variant="outline" onClick={onClose} className="w-full">Cancel</Button>
        </div>
      </div>
    </div>
  );
};

// Already Booked modal
const AlreadyBookedModal = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 max-w-md w-full text-center">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-slate-900">Appointment Already Booked</h2>
        <p className="mb-6 text-slate-700 text-sm sm:text-base">You have already booked your appointment. Please wait for the admin to contact you.</p>
        <Button variant="outline" onClick={onClose} className="w-full">Close</Button>
      </div>
    </div>
  );
};

const SelectProject = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [pendingProjectId, setPendingProjectId] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [showAlreadyBookedModal, setShowAlreadyBookedModal] = useState(false);

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('bizwizusertoken');
    const userRole = localStorage.getItem('bizzwiz-userRole');
    
    if (!token || userRole !== 'user') {
      toast({
        title: "Accès Refusé",
        description: "Veuillez vous connecter pour accéder à cette page.",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    const fetchProjects = async () => {
      const userId = localStorage.getItem('bizzwiz-userId');
      if (!userId) {
        setError('Utilisateur non identifié.');
        setIsLoading(false);
        return;
      }

      try {
        const response = await ApiService(`/form-data/user/${userId}`, 'GET');
        if (response.success) {
          setProjects(response.data);
        } else {
          throw new Error(response.message || 'Échec du chargement des projets.');
        }
      } catch (error) {
        setError(error.message || 'Impossible de charger les projets.');
        toast({
          title: "Erreur",
          description: error.message || 'Impossible de charger les projets.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [navigate]);

  const handleProjectSelect = async (formDataId) => {
    if (!formDataId) {
      toast({
        title: "Erreur",
        description: 'ID de projet invalide.',
        variant: 'destructive',
      });
      return;
    }
    localStorage.setItem('bizzwiz-selectedProjectId', formDataId);
    try {
      const response = await ApiService(`/check-status?form_data_id=${formDataId}`, 'GET');
      if (response.success && response.redirect_to === 'dashboard') {
        navigate(`/dashboard`);
      } else if (response.success && response.payment_url) {
        setPaymentUrl(response.payment_url);
        setShowPaymentModal(true);
      } else if (response.success && response.appointment_exists) {
        setShowAlreadyBookedModal(true);
      } else {
        setPendingProjectId(formDataId);
        setShowAppointmentModal(true);
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de vérifier le statut du projet.",
        variant: "destructive",
      });
    }
  };

  const handleBookAppointment = () => {
    setShowAppointmentModal(false);
    if (pendingProjectId) {
      navigate('/call'); // Change '/call' to your actual call/appointment page route if needed
    }
  };

  const handleCloseModal = () => {
    setShowAppointmentModal(false);
    setPendingProjectId(null);
    setShowPaymentModal(false);
    setPaymentUrl(null);
    setShowAlreadyBookedModal(false);
  };

  const handleLogout = async () => {
    try {
      const response = await ApiService('/logout', 'POST');
      if (response.success) {
        localStorage.removeItem('bizwizusertoken');
        localStorage.removeItem('bizzwiz-userId');
        localStorage.removeItem('bizzwiz-userRole');
        localStorage.removeItem('bizzwiz-selectedProjectId');
        localStorage.removeItem('bizzwiz_form_data_id');
        toast({
          title: 'Déconnexion réussie',
          description: 'Vous avez été déconnecté avec succès.',
          variant: 'default',
        });
        navigate('/');
      } else {
        throw new Error(response.message || 'Échec de la déconnexion.');
      }
    } catch (error) {
      toast({
        title: 'Erreur',
        description: error.message || 'Impossible de se déconnecter.',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
          <p className="text-white/80 text-lg text-center">Chargement des projets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900/10 to-transparent"></div>
      <div className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      {/* Header with logout button */}
      <div className="relative z-10">
        <div className="flex justify-between items-start p-4 sm:p-6 lg:p-8">
          <div className="flex-1"></div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm border-white/20 text-white hover:bg-slate-700/50 hover:border-pink-500/30 transition-all duration-300 text-sm sm:text-base"
          >
            <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Déconnexion</span>
          </Button>
        </div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 pb-12">
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4 leading-tight">
            Sélectionner un Projet
          </h1>
          <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto px-4">
            Choisissez le projet sur lequel vous souhaitez travailler
          </p>
        </motion.div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg backdrop-blur-sm"
          >
            <p className="text-red-400 text-center text-sm sm:text-base">{error}</p>
          </motion.div>
        )}

        <div className="max-w-7xl mx-auto">
          {projects.length > 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
            >
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  className="group cursor-pointer"
                  onClick={() => handleProjectSelect(project.id)}
                >
                  <Card className="h-full p-4 sm:p-6 lg:p-8 bg-slate-800/40 backdrop-blur-xl border border-white/10 hover:border-pink-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-pink-500/20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl mb-4 sm:mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-3 group-hover:text-pink-400 transition-colors duration-300 line-clamp-2">
                        {project.project_description || 'Projet sans titre'}
                      </h3>
                      <div className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 mb-3 sm:mb-4">
                        <span className="text-cyan-300 text-xs sm:text-sm font-medium">
                          {project.solution_type || 'Aucun type'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs sm:text-sm text-white/60 mt-4 sm:mt-6">
                        <span>Projet #{project.id}</span>
                        <div className="flex items-center space-x-1">
                          <span>Ouvrir</span>
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10"></div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            !isLoading && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="text-center py-12 sm:py-20 px-4"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">Aucun projet trouvé</h3>
                <p className="text-white/60 max-w-md mx-auto text-sm sm:text-base">
                  Vous n'avez pas encore créé de projets. Commencez par créer votre premier projet.
                </p>
              </motion.div>
            )
          )}
        </div>
      </div>
      
      <PaymentModal
        open={showPaymentModal}
        paymentUrl={paymentUrl}
        onClose={handleCloseModal}
      />
      <AppointmentModal
        open={showAppointmentModal}
        onClose={handleCloseModal}
        onBook={handleBookAppointment}
      />
      <AlreadyBookedModal
        open={showAlreadyBookedModal}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default SelectProject;


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { Button } from '@/components/ui/button';
// import { Card } from '@/components/ui/card';
// import ApiService from '@/apiService';
// import { toast } from '@/components/ui/use-toast';
// import { LogOut } from 'lucide-react';

// // Payment modal
// const PaymentModal = ({ open, paymentUrl, onClose }) => {
//   if (!open) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
//       <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 max-w-md w-full text-center">
//         <h2 className="text-xl sm:text-2xl font-bold mb-4 text-slate-900">Complete Payment</h2>
//         <p className="mb-6 text-slate-700 text-sm sm:text-base">Please complete your payment to access the dashboard.</p>
//         <div className="flex flex-col gap-3">
//           <a
//             href={paymentUrl}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition text-center text-sm sm:text-base"
//           >
//             Pay Now
//           </a>
//           <Button variant="outline" onClick={onClose} className="w-full">Cancel</Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Appointment modal
// const AppointmentModal = ({ open, onClose, onBook }) => {
//   if (!open) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
//       <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 max-w-md w-full text-center">
//         <h2 className="text-xl sm:text-2xl font-bold mb-4 text-slate-900">Book an Appointment</h2>
//         <p className="mb-6 text-slate-700 text-sm sm:text-base">To proceed with your project, please book an appointment with our team.</p>
//         <div className="flex flex-col gap-3">
//           <Button onClick={onBook} className="w-full">Book Appointment</Button>
//           <Button variant="outline" onClick={onClose} className="w-full">Cancel</Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Already Booked modal
// const AlreadyBookedModal = ({ open, onClose }) => {
//   if (!open) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
//       <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 max-w-md w-full text-center">
//         <h2 className="text-xl sm:text-2xl font-bold mb-4 text-slate-900">Appointment Already Booked</h2>
//         <p className="mb-6 text-slate-700 text-sm sm:text-base">You have already booked your appointment. Please wait for the admin to contact you.</p>
//         <Button variant="outline" onClick={onClose} className="w-full">Close</Button>
//       </div>
//     </div>
//   );
// };

// // Project Details Modal
// const ProjectDetailsModal = ({ open, project, onClose, onBookAppointment, onPaymentMode }) => {
//   if (!open || !project) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
//       <div className="bg-gray-800/50 rounded-lg p-6 sm:p-8 max-w-2xl w-full text-white border border-purple-500/50">
//         <h2 className="text-2xl font-bold mb-4">{project.project_description || 'Projet sans titre'}</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
//           <div className="bg-purple-600/50 p-4 rounded-lg">
//             <img src="/wallet-app.png" alt="Project" className="w-full h-48 object-cover rounded mb-4" />
//             <p className="text-sm text-white/70 mb-4">{project.solution_type || 'Aucun type'}</p>
//             <div className="flex justify-center gap-2">
//               <Button onClick={onBookAppointment} className="bg-blue-600 text-white">Book Appointment</Button>
//               <Button onClick={onPaymentMode} className="bg-blue-600 text-white">Payment Mode</Button>
//             </div>
//           </div>
//           <div className="bg-gray-800/50 p-4 rounded-lg flex flex-col justify-between">
//             <div>
//               <Button variant="outline" className="w-full bg-purple-600 text-white mb-2">PRICE 2500$</Button>
//               <Button variant="outline" className="w-full bg-purple-600 text-white mb-2">DEADLINE 30 DAYS</Button>
//               <Button variant="outline" className="w-full bg-purple-600 text-white">DOWNLOAD THE QUOTE</Button>
//             </div>
//             <Button variant="outline" className="w-full bg-purple-600 text-white mt-4">APPROVE THE PROJECT</Button>
//           </div>
//         </div>
//         <p className="text-sm text-white/70">
//           After your payment, you will access your dashboard, where you will find your ongoing projects as well as the dedicated team that will support you throughout the entire process, from development to launch. You are no longer alone.
//         </p>
//         <Button variant="outline" onClick={onClose} className="w-full mt-6">Close</Button>
//       </div>
//     </div>
//   );
// };

// const SelectProject = () => {
//   const navigate = useNavigate();
//   const [projects, setProjects] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showAppointmentModal, setShowAppointmentModal] = useState(false);
//   const [pendingProjectId, setPendingProjectId] = useState(null);
//   const [showPaymentModal, setShowPaymentModal] = useState(false);
//   const [paymentUrl, setPaymentUrl] = useState(null);
//   const [showAlreadyBookedModal, setShowAlreadyBookedModal] = useState(false);
//   const [selectedProject, setSelectedProject] = useState(null);
//   const [showProjectDetailsModal, setShowProjectDetailsModal] = useState(false);

//   useEffect(() => {
//     // Check authentication
//     const token = localStorage.getItem('bizwizusertoken');
//     const userRole = localStorage.getItem('bizzwiz-userRole');
    
//     if (!token || userRole !== 'user') {
//       toast({
//         title: "Accès Refusé",
//         description: "Veuillez vous connecter pour accéder à cette page.",
//         variant: "destructive",
//       });
//       navigate('/login');
//       return;
//     }

//     const fetchProjects = async () => {
//       const userId = localStorage.getItem('bizzwiz-userId');
//       if (!userId) {
//         setError('Utilisateur non identifié.');
//         setIsLoading(false);
//         return;
//       }

//       try {
//         const response = await ApiService(`/form-data/user/${userId}`, 'GET');
//         if (response.success) {
//           setProjects(response.data);
//         } else {
//           throw new Error(response.message || 'Échec du chargement des projets.');
//         }
//       } catch (error) {
//         setError(error.message || 'Impossible de charger les projets.');
//         toast({
//           title: "Erreur",
//           description: error.message || 'Impossible de charger les projets.',
//           variant: 'destructive',
//         });
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchProjects();
//   }, [navigate]);

//   const handleProjectSelect = async (formDataId) => {
//     if (!formDataId) {
//       toast({
//         title: "Erreur",
//         description: 'ID de projet invalide.',
//         variant: 'destructive',
//       });
//       return;
//     }
//     const project = projects.find(p => p.id === formDataId);
//     setSelectedProject(project);
//     setShowProjectDetailsModal(true);
//   };

//   const handleBookAppointment = () => {
//     setShowProjectDetailsModal(false);
//     if (pendingProjectId) {
//       setPendingProjectId(selectedProject.id);
//       setShowAppointmentModal(true);
//     }
//   };

//   const handlePaymentMode = async () => {
//     setShowProjectDetailsModal(false);
//     if (selectedProject) {
//       try {
//         const response = await ApiService(`/check-status?form_data_id=${selectedProject.id}`, 'GET');
//         if (response.success && response.payment_url) {
//           setPaymentUrl(response.payment_url);
//           setShowPaymentModal(true);
//         } else if (response.success && response.appointment_exists) {
//           setShowAlreadyBookedModal(true);
//         } else {
//           setPendingProjectId(selectedProject.id);
//           setShowAppointmentModal(true);
//         }
//       } catch (error) {
//         toast({
//           title: "Erreur",
//           description: error.message || "Impossible de vérifier le statut du projet.",
//           variant: "destructive",
//         });
//       }
//     }
//   };

//   const handleCloseModal = () => {
//     setShowAppointmentModal(false);
//     setPendingProjectId(null);
//     setShowPaymentModal(false);
//     setPaymentUrl(null);
//     setShowAlreadyBookedModal(false);
//     setShowProjectDetailsModal(false);
//     setSelectedProject(null);
//   };

//   const handleLogout = async () => {
//     try {
//       const response = await ApiService('/logout', 'POST');
//       if (response.success) {
//         localStorage.removeItem('bizwizusertoken');
//         localStorage.removeItem('bizzwiz-userId');
//         localStorage.removeItem('bizzwiz-userRole');
//         localStorage.removeItem('bizzwiz-selectedProjectId');
//         localStorage.removeItem('bizzwiz_form_data_id');
//         toast({
//           title: 'Déconnexion réussie',
//           description: 'Vous avez été déconnecté avec succès.',
//           variant: 'default',
//         });
//         navigate('/');
//       } else {
//         throw new Error(response.message || 'Échec de la déconnexion.');
//       }
//     } catch (error) {
//       toast({
//         title: 'Erreur',
//         description: error.message || 'Impossible de se déconnecter.',
//         variant: 'destructive',
//       });
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
//         <div className="flex flex-col items-center space-y-4">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
//           <p className="text-white/80 text-lg text-center">Chargement des projets...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-black relative overflow-hidden">
//       {/* Header */}
//       {/* <div className="relative z-10 flex justify-between items-center p-4 sm:p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
//         <div className="flex items-center">
//           <img src="/flag.png" alt="US Flag" className="w-20 h-10 mr-2" />
//           <span className="text-sm sm:text-base font-bold">LEVEL 5 BÂTISSEUR</span>
//         </div>
//         <div className="flex items-center">
//           <span className="text-sm sm:text-base mr-4">15</span>
//           <Button variant="outline" className="bg-purple-600 text-white px-4 py-2 rounded">GUIDE</Button>
//         </div>
//       </div> */}

      

//       {/* Logout Button */}
//       <div className="relative z-10 container mx-auto px-4 sm:px-6 pb-12">
//         <br />
//         <div className="flex justify-end">
//           <Button
//             variant="outline"
//             onClick={handleLogout}
//             className="flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm border-white/20 text-white hover:bg-slate-700/50 hover:border-pink-500/30 transition-all duration-300 text-sm sm:text-base"
//           >
//             <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
//             <span className="hidden sm:inline">Déconnexion</span>
//           </Button>
//         </div>
//       </div>

//       {/* Projects Grid */}
//       <div className="relative z-10 container mx-auto px-4 sm:px-6 pb-12">
//         {error && (
//           <motion.div 
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="max-w-md mx-auto mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg backdrop-blur-sm"
//           >
//             <p className="text-red-400 text-center text-sm sm:text-base">{error}</p>
//           </motion.div>
//         )}

//         <div className="max-w-7xl mx-auto">
//           {projects.length > 0 ? (
//             <motion.div 
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//               className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
//             >
//               {projects.map((project, index) => (
//                 <motion.div
//                   key={project.id}
//                   initial={{ opacity: 0, y: 30 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.6, delay: index * 0.1 }}
//                   whileHover={{ scale: 1.02, y: -5 }}
//                   whileTap={{ scale: 0.98 }}
//                   className="group cursor-pointer"
//                   onClick={() => handleProjectSelect(project.id)}
//                 >
//                   <Card className="h-full p-4 sm:p-6 lg:p-8 bg-slate-800/40 backdrop-blur-xl border border-white/10 hover:border-pink-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-pink-500/20 relative overflow-hidden">
//                     <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//                     <div className="relative z-10">
//                       <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl mb-4 sm:mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//                         <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012 2v2M7 7h10" />
//                         </svg>
//                       </div>
//                       <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-3 group-hover:text-pink-400 transition-colors duration-300 line-clamp-2">
//                         {project.project_description || 'Projet sans titre'}
//                       </h3>
//                       <div className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 mb-3 sm:mb-4">
//                         <span className="text-cyan-300 text-xs sm:text-sm font-medium">
//                           {project.solution_type || 'Aucun type'}
//                         </span>
//                       </div>
//                       <div className="flex items-center justify-between text-xs sm:text-sm text-white/60 mt-4 sm:mt-6">
//                         <span>Projet #{project.id}</span>
//                         <div className="flex items-center space-x-1">
//                           <span>Ouvrir</span>
//                           <svg className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                           </svg>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10"></div>
//                   </Card>
//                 </motion.div>
//               ))}
//             </motion.div>
//           ) : (
//             !isLoading && (
//               <motion.div 
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.8 }}
//                 className="text-center py-12 sm:py-20 px-4"
//               >
//                 <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
//                   <svg className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012 2v2M7 7h10" />
//                   </svg>
//                 </div>
//                 <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">Aucun projet trouvé</h3>
//                 <p className="text-white/60 max-w-md mx-auto text-sm sm:text-base">
//                   Vous n'avez pas encore créé de projets. Commencez par créer votre premier projet.
//                 </p>
//               </motion.div>
//             )
//           )}
//         </div>
//       </div>

//       <PaymentModal
//         open={showPaymentModal}
//         paymentUrl={paymentUrl}
//         onClose={handleCloseModal}
//       />
//       <AppointmentModal
//         open={showAppointmentModal}
//         onClose={handleCloseModal}
//         onBook={handleBookAppointment}
//       />
//       <AlreadyBookedModal
//         open={showAlreadyBookedModal}
//         onClose={handleCloseModal}
//       />
//       <ProjectDetailsModal
//         open={showProjectDetailsModal}
//         project={selectedProject}
//         onClose={handleCloseModal}
//         onBookAppointment={handleBookAppointment}
//         onPaymentMode={handlePaymentMode}
//       />
//     </div>
//   );
// };

// export default SelectProject;