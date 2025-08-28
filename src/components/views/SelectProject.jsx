import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ApiService from '@/apiService';
import { toast } from '@/components/ui/use-toast';
import { LogOut, Linkedin, X } from 'lucide-react';
import LinkedInTemplate from './LinkedInTemplate';
import { useTranslation } from 'react-i18next';


// Payment modal
const PaymentModal = ({ open, paymentUrl, onClose }) => {
  const { t } = useTranslation();
  if (!open) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
    >
      <div className="rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 p-6 sm:p-8 md:p-10 max-w-lg w-full text-center shadow-lg shadow-white/20">
        <h2 className="text-2xl font-semibold text-white bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-4 font-montserrat">{t('selectProject.paymentModal.title')}</h2>
        <p className="mb-6 text-gray-300 text-base font-medium font-montserrat">{t('selectProject.paymentModal.description')}</p>
        <div className="flex flex-col gap-4">
          <a
            href={paymentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-purple-600/20 backdrop-blur-sm text-purple-300 py-3 px-4 rounded-xl hover:bg-purple-600/30 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 border border-purple-500/30 font-medium font-montserrat"
          >
            {t('selectProject.paymentModal.payNow')}
          </a>
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/15 hover:shadow-lg hover:shadow-white/20 transition-all duration-300 font-medium font-montserrat"
          >
            {t('selectProject.paymentModal.cancel')}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

// Appointment modal
const AppointmentModal = ({ open, onClose, onBook }) => {
  const { t } = useTranslation();
  if (!open) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
    >
      <div className="rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 p-6 sm:p-8 md:p-10 max-w-lg w-full text-center shadow-lg shadow-white/20">
        <h2 className="text-2xl font-semibold text-white bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-4 font-montserrat">{t('selectProject.appointmentModal.title')}</h2>
        <p className="mb-6 text-gray-300 text-base font-medium font-montserrat">{t('selectProject.appointmentModal.description')}</p>
        <div className="flex flex-col gap-4">
          <Button
            onClick={onBook}
            className="w-full bg-purple-600/20 backdrop-blur-sm text-purple-300 hover:bg-purple-600/30 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 border border-purple-500/30 font-medium font-montserrat"
          >
            {t('selectProject.appointmentModal.book')}
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/15 hover:shadow-lg hover:shadow-white/20 transition-all duration-300 font-medium font-montserrat"
          >
            {t('selectProject.appointmentModal.cancel')}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

// Already Booked modal
const AlreadyBookedModal = ({ open, onClose }) => {
  const { t } = useTranslation();
  if (!open) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
    >
      <div className="rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 p-6 sm:p-8 md:p-10 max-w-lg w-full text-center shadow-lg shadow-white/20">
        <h2 className="text-2xl font-semibold text-white bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-4 font-montserrat">{t('selectProject.alreadyBookedModal.title')}</h2>
        <p className="mb-6 text-gray-300 text-base font-medium font-montserrat">{t('selectProject.alreadyBookedModal.description')}</p>
        <Button
          variant="outline"
          onClick={onClose}
          className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/15 hover:shadow-lg hover:shadow-white/20 transition-all duration-300 font-medium font-montserrat"
        >
          {t('selectProject.alreadyBookedModal.close')}
        </Button>
      </div>
    </motion.div>
  );
};

const SelectProject = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [pendingProjectId, setPendingProjectId] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [showAlreadyBookedModal, setShowAlreadyBookedModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareProject, setShareProject] = useState(null);

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('bizwizusertoken');
    const userRole = localStorage.getItem('bizzwiz-userRole');
    
    if (!token || userRole !== 'user') {
      toast({
        title: t('selectProject.auth.accessDenied.title'),
        description: t('selectProject.auth.accessDenied.description'),
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    const fetchProjects = async () => {
      const userId = localStorage.getItem('bizzwiz-userId');
      if (!userId) {
        setError(t('selectProject.error.userNotIdentified'));
        setIsLoading(false);
        return;
      }

      try {
        const response = await ApiService(`/form-data/user/${userId}`, 'GET');
        if (response.success) {
          setProjects(response.data);
        } else {
          throw new Error(response.message || t('selectProject.error.fetchFailed'));
        }
      } catch (error) {
        setError(error.message || t('selectProject.error.fetchFailed'));
        toast({
          title: t('selectProject.error.title'),
          description: error.message || t('selectProject.error.fetchFailed'),
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [navigate, t]);

  const handleProjectSelect = async (formDataId) => {
    if (!formDataId) {
      toast({
        title: t('selectProject.error.title'),
        description: t('selectProject.error.invalidProjectId'),
        variant: 'destructive',
      });
      return;
    }
    localStorage.setItem('bizzwiz-selectedProjectId', formDataId);
    localStorage.setItem('bizwiz_form_data_id', formDataId);
    setSelectedProjectId(formDataId);
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
        title: t('selectProject.error.title'),
        description: error.message || t('selectProject.error.statusCheckFailed'),
        variant: "destructive",
      });
    }
  };

  const handleBookAppointment = () => {
    setShowAppointmentModal(false);
    if (pendingProjectId) {
      navigate('/call');
    }
  };
  // Add this with other handler functions
const handleShare = (e, project) => {
  e.stopPropagation(); // Prevent project selection when clicking share
  setShareProject(project);
  setShowShareModal(true);
};

const handleCloseShareModal = () => {
  setShowShareModal(false);
  setShareProject(null);
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
        localStorage.removeItem('bizwiz_form_data_id');
        toast({
          title: t('selectProject.logout.success.title'),
          description: t('selectProject.logout.success.description'),
          variant: 'default',
        });
        navigate('/');
      } else {
        throw new Error(response.message || t('selectProject.logout.error.failed'));
      }
    } catch (error) {
      toast({
        title: t('selectProject.error.title'),
        description: error.message || t('selectProject.logout.error.failed'),
        variant: 'destructive',
      });
    }
  };

  const handleCreateProject = () => {
    navigate('/create-project');
  };

  const handleBusinessPlan = () => {
    if (!selectedProjectId) {
      toast({
        title: t('selectProject.selectionRequired.title'),
        description: t('selectProject.selectionRequired.description'),
        variant: 'destructive',
      });
      return;
    }
    localStorage.setItem('bizwiz_form_data_id', selectedProjectId);
    navigate('/plan?view=business');
  };

  const handleLogoGeneration = () => {
    if (!selectedProjectId) {
      toast({
        title: t('selectProject.selectionRequired.title'),
        description: t('selectProject.selectionRequired.description'),
        variant: 'destructive',
      });
      return;
    }
    localStorage.setItem('bizwiz_form_data_id', selectedProjectId);
    navigate('/plan?view=logo');
  };

  const handleSloganGeneration = () => {
    if (!selectedProjectId) {
      toast({
        title: t('selectProject.selectionRequired.title'),
        description: t('selectProject.selectionRequired.description'),
        variant: 'destructive',
      });
      return;
    }
    localStorage.setItem('bizwiz_form_data_id', selectedProjectId);
    navigate('/slogan');
  };

  const handlePayment = async () => {
    if (!selectedProjectId) {
      toast({
        title: t('selectProject.selectionRequired.title'),
        description: t('selectProject.selectionRequired.description'),
        variant: 'destructive',
      });
      return;
    }
    try {
      const response = await ApiService(`/check-status?form_data_id=${selectedProjectId}`, 'GET');
      if (response.payment_url) {
        setPaymentUrl(response.payment_url);
        setShowPaymentModal(true);
      } else {
        toast({
          title: t('selectProject.info.title'),
          description: t('selectProject.info.noPayment'),
        });
      }
    } catch (error) {
      toast({
        title: t('selectProject.error.title'),
        description: error.message || t('selectProject.error.statusCheckFailed'),
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-[calc(100vh-var(--navbar-height,68px))] bg-black flex items-center justify-center p-4 sm:p-6 md:p-8"
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          <p className="text-gray-300 text-lg font-medium font-montserrat">{t('selectProject.loading')}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-[calc(100vh-var(--navbar-height,68px))] bg-black flex flex-col items-center justify-center p-4 sm:p-6 md:p-8"
    >
      <div className="w-full max-w-7xl bg-white/10 backdrop-blur-3xl rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8 md:p-10">
        <div className="flex justify-between items-center mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center flex-1"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-3 font-montserrat">
              {t('selectProject.title')}
            </h1>
            <p className="text-gray-300 text-base sm:text-lg font-medium font-montserrat max-w-2xl mx-auto">
              {t('selectProject.subtitle')}
            </p>
          </motion.div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="bg-white/10 backdrop-blur-sm text-white font-medium py-3 px-4 rounded-xl hover:bg-white/15 hover:shadow-lg hover:shadow-white/20 transition-all duration-300 border border-white/20 font-montserrat"
          >
            <LogOut className="w-5 h-5 mr-2" />
            <span className="hidden sm:inline">{t('selectProject.logoutButton')}</span>
          </Button>
        </div>

        <div className="mb-8 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Button
              onClick={handleCreateProject}
              className="bg-purple-600/20 backdrop-blur-sm text-purple-300 py-3 px-6 rounded-xl hover:bg-purple-600/30 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 border border-purple-500/30 font-medium font-montserrat"
            >
              {t('selectProject.createProject')}
            </Button>
          </motion.div>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-md mx-auto mb-8 rounded-xl bg-white/5 backdrop-blur-sm border border-red-500/30 p-4"
          >
            <p className="text-red-400 text-base font-medium font-montserrat text-center">{error}</p>
          </motion.div>
        )}

        <div className="max-w-7xl mx-auto">
          {projects.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6"
            >
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  className="group cursor-pointer"
                  onClick={() => handleProjectSelect(project.id)}
                >
               
            <Card
              className={`rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 p-4 sm:p-6 shadow-lg hover:border-white/40 hover:shadow-lg hover:shadow-white/20 transition-all duration-300 ${
                selectedProjectId === project.id ? 'border-purple-500/50 shadow-purple-500/20' : ''
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-600/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-purple-500/30">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <Button
                  variant="ghost"
                  onClick={(e) => handleShare(e, project)}
                  className="text-blue-300 hover:text-blue-400 hover:bg-blue-600/20 rounded-xl p-1.5 sm:p-2"
                >
                  <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </div>
              <div onClick={() => handleProjectSelect(project.id)} className="cursor-pointer">
                <h3 className="text-base sm:text-xl font-semibold text-white bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-2 line-clamp-2 font-montserrat">
                  {project.project_description || t('selectProject.project.untitled')}
                </h3>
                <div className="inline-flex items-center px-2 sm:px-3 py-1 rounded-xl bg-white/5 backdrop-blur-sm border border-white/20 mb-3">
                  <span className="text-xs sm:text-sm text-gray-300 font-medium font-montserrat">
                    {project.solution_type || t('selectProject.project.noType')}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs sm:text-sm text-gray-300 mt-4 font-medium font-montserrat">
                  <span>{t('selectProject.project.idPrefix')}#{project.id}</span>
                  <div className="flex items-center space-x-1">
                    <span>{t('selectProject.project.open')}</span>
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
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
                className="text-center py-12 px-6 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-lg shadow-white/20"
              >
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-6 border border-white/20">
                  <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-white bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-3 font-montserrat">
                  {t('selectProject.noProjects.title')}
                </h3>
                <p className="text-gray-300 text-base font-medium font-montserrat max-w-md mx-auto">
                  {t('selectProject.noProjects.description')}
                </p>
                <Button
                  onClick={handleCreateProject}
                  className="mt-6 bg-purple-600/20 backdrop-blur-sm text-purple-300 py-3 px-6 rounded-xl hover:bg-purple-600/30 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 border border-purple-500/30 font-medium font-montserrat"
                >
                  {t('selectProject.createProject')}
                </Button>
              </motion.div>
            )
          )}
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
        
      
      {showShareModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-2 sm:p-4"
        >
          <div className="w-full max-w-4xl h-[90vh] sm:h-auto overflow-y-auto rounded-2xl">
            <div className="sticky top-0 flex justify-end mb-2 sm:mb-4 z-10">
              <Button
                variant="ghost"
                onClick={handleCloseShareModal}
                className="text-white hover:bg-white/10 rounded-xl backdrop-blur-md bg-black/20"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="px-2 sm:px-0">
              <LinkedInTemplate projectData={shareProject} />
            </div>
          </div>
        </motion.div>
      )}
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
        .hover\:scale-102:hover {
          transform: scale(1.02);
        }
        .hover\:scale-105:hover {
          transform: scale(1.05);
        }
        .active\:scale-95:active {
          transform: scale(0.95);
        }
        .font-montserrat {
          font-family: 'Montserrat', sans-serif;
        }
      `}</style>
    </motion.div>
  );
};

export default SelectProject;