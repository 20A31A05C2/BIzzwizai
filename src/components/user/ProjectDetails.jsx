import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Users, Calendar, Clock, BarChart3, ExternalLink, MessageCircle, CheckCircle, Code } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ApiService from '../../apiService';
import dayjs from 'dayjs';

function ProjectDetails({ selectedProject, setActiveSection, setShowChat }) {
  const { t } = useTranslation();
  const [dynamicData, setDynamicData] = useState({ roadmaps: [], technologies: [], team: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDynamicData() {
      setLoading(true);
      setError(null);
      try {
        const userId = localStorage.getItem('bizzwiz-userId');
        const formDataId = localStorage.getItem('bizzwiz-selectedProjectId');
        if (userId && formDataId) {
          const res = await ApiService(`/user/projects/${userId}/${formDataId}/details`, 'GET');
          setDynamicData({
            roadmaps: res.roadmaps || [],
            technologies: res.technologies || [],
            team: res.team || [],
          });
        }
      } catch (err) {
        setError(t('projectDetails.roadmap.error'));
      } finally {
        setLoading(false);
      }
    }
    fetchDynamicData();
  }, [selectedProject, t]);

  if (!selectedProject) return null;

  const projectData = {
    ...selectedProject,
    teamLead: selectedProject.teamLead || {
      avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMzIiIGZpbGw9IiM2QjI4RjEiLz4KPHN2ZyB4PSIxNiIgeT0iMjAiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJ3aGl0ZSI+CjxwYXRoIGQ9Ik0xMiAxMmMyLjIxIDAgNC0xLjc5IDQtNHMtMS43OS00LTQtNC00IDEuNzktNCA0IDEuNzkgNCA0IDR6bTAgMmMtMi42NyAwLTggMS4zNC04IDR2MmgxNnYtMmMwLTIuNjYtNS4zMy00LTgtNHoiLz4KPC9zdmc+Cjwvc3ZnPgo=',
      name: t('projectDetails.fallback.teamLead.name'),
      role: t('projectDetails.fallback.teamLead.role')
    },
    nextMilestone: selectedProject.nextMilestone || {
      name: t('projectDetails.fallback.nextMilestone.name'),
      date: t('projectDetails.fallback.nextMilestone.date')
    },
    technologies: selectedProject.technologies || t('projectDetails.fallback.technologies'),
    deliveryDate: selectedProject.deliveryDate || t('projectDetails.fallback.deliveryDate'),
    startDate: selectedProject.startDate || selectedProject.start_date || null,
    name: selectedProject.name || selectedProject.project_name || '',
  };

  const phases = dynamicData.roadmaps.length > 0
    ? dynamicData.roadmaps.map((item, idx) => ({
        name: item.project_title,
        progress: item.progress_percentage,
        color: 'from-blue-600 to-cyan-600',
        status: item.status,
        startDate: item.start_date ? dayjs(item.start_date).format('DD MMM YYYY') : '',
        endDate: item.end_date ? dayjs(item.end_date).format('DD MMM YYYY') : '',
        description: item.description,
        deliverables: Array.isArray(item.tags) && item.tags.length > 0 ? item.tags : Array(item.deliverables_count).fill(t('projectDetails.roadmap.deliverables')),
        teamLead: item.responsible_person,
      }))
    : [];

  const technologies = dynamicData.technologies.length > 0
    ? dynamicData.technologies.map(t => t.name)
    : [];

  const team = dynamicData.team.length > 0
    ? dynamicData.team.map(member => ({ name: member.name, specialization: member.specialization }))
    : [];

  const completedCount = phases.filter(phase => phase.status === 'termine').length;
  const inProgressCount = phases.filter(phase => phase.status === 'en_cours').length;
  const pendingCount = phases.filter(phase => phase.status === 'en_attente').length;
  const lastUpdated = phases.length > 0
    ? phases.reduce((latest, phase) => {
        const date = new Date(phase.endDate || phase.end_date);
        return date > latest ? date : latest;
      }, new Date(0))
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-[calc(100vh-var(--navbar-height,68px))] bg-black flex items-center justify-center p-4 sm:p-6 md:p-8"
    >
      <div className="max-w-7xl w-full bg-white/10 backdrop-blur-3xl rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8 md:p-10">
        <button
          onClick={() => setActiveSection('projects')}
          className="flex items-center space-x-2 text-gray-300 hover:text-white mb-6 sm:mb-8 transition-colors duration-300 font-montserrat"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">{t('projectDetails.backButton')}</span>
        </button>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-lg border border-white/20 p-6 md:p-8"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8 gap-4 md:gap-0">
                <div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-3 font-montserrat">{projectData.name}</h1>
                  <p className="text-gray-300 text-base sm:text-lg mb-4 font-montserrat">{projectData.category}</p>
                  <p className="text-gray-200 text-sm sm:text-base leading-relaxed line-clamp-3 font-montserrat">{projectData.description}</p>
                  <div className="flex items-center space-x-3 mb-4">
                    {projectData.status && (
                      <div className="px-4 py-2 bg-green-600/20 rounded-xl border border-green-500/30">
                        <span className="text-green-300 text-sm font-medium font-montserrat">
                          {projectData.status === 'PaymentDone' ? t('projectDetails.status.PaymentDone') : t(`projectDetails.status.${projectData.status}`) || t('projectDetails.status.default')}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-purple-300 mb-2 font-montserrat">{projectData.progress}%</div>
                  <div className="text-gray-300 text-sm font-medium font-montserrat">{t('projectDetails.overview.progress')}</div>
                </div>
              </div>
              <div className="mb-8">
                <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 rounded-full transition-all duration-1000 relative"
                    style={{ width: `${projectData.progress}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <Users className="w-6 h-6 text-purple-300 mx-auto mb-2" />
                  <div className="text-white text-xl font-medium font-montserrat">{team.length}</div>
                  <div className="text-gray-300 text-sm font-medium font-montserrat">{t('projectDetails.overview.team')}</div>
                </div>
                <div className="text-center">
                  <Calendar className="w-6 h-6 text-cyan-300 mx-auto mb-2" />
                  <div className="text-white text-xl font-medium font-montserrat">
                    {projectData.startDate ? new Date(projectData.startDate).toLocaleDateString('fr-FR') : t('projectDetails.fallback.noDate')}
                  </div>
                  <div className="text-gray-300 text-sm font-medium font-montserrat">{t('projectDetails.overview.start')}</div>
                </div>
                <div className="text-center">
                  <Clock className="w-6 h-6 text-green-300 mx-auto mb-2" />
                  <div className="text-white text-xl font-medium font-montserrat">{projectData.deliveryDate}</div>
                  <div className="text-gray-300 text-sm font-medium font-montserrat">{t('projectDetails.overview.delivery')}</div>
                </div>
                <div className="text-center">
                  <BarChart3 className="w-6 h-6 text-yellow-300 mx-auto mb-2" />
                  <div className="text-white text-xl font-medium font-montserrat">{projectData.budget}</div>
                  <div className="text-gray-300 text-sm font-medium font-montserrat">{t('projectDetails.overview.budget')}</div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <button className="flex-1 bg-white/20 backdrop-blur-sm text-white font-bold py-4 rounded-xl hover:bg-white/30 hover:shadow-lg hover:shadow-white/20 transition-all duration-300 flex items-center justify-center gap-3 font-montserrat border border-white/30">
                  <ExternalLink className="w-5 h-5" />
                  <span className="font-medium">{t('projectDetails.overview.viewLive')}</span>
                </button>
                <button 
                  onClick={() => setShowChat(true)}
                  className="flex-1 bg-purple-600/20 backdrop-blur-sm text-purple-300 font-bold py-4 rounded-xl hover:bg-purple-600/30 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 flex items-center justify-center gap-3 font-montserrat border border-purple-500/30"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-medium">{t('projectDetails.overview.teamChat')}</span>
                </button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-lg border border-white/20 p-6 md:p-8"
            >
              <h3 className="text-2xl font-semibold text-white mb-8 bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 font-montserrat">{t('projectDetails.roadmap.header')}</h3>
              {loading ? (
                <div className="flex items-center justify-center h-32">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                    <p className="text-gray-300 font-montserrat">{t('projectDetails.roadmap.loading')}</p>
                  </div>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center h-32 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-red-500/30">
                  <p className="text-red-400 font-montserrat">{error}</p>
                </div>
              ) : phases.length === 0 ? (
                <div className="flex items-center justify-center h-32 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <p className="text-gray-300 font-montserrat">{t('projectDetails.roadmap.noData')}</p>
                </div>
              ) : (
                <div className="space-y-8">
                  {phases.map((phase, index) => (
                    <div key={index} className="relative">
                      {index < phases.length - 1 && (
                        <div className="absolute left-6 top-16 w-0.5 h-12 bg-gradient-to-b from-white/20 to-white/10"></div>
                      )}
                      <div className={`relative border rounded-2xl p-6 transition-all duration-300 ${
                        phase.status === 'completed' 
                          ? 'border-green-500/30 bg-green-600/10' 
                          : phase.status === 'active'
                          ? 'border-blue-500/30 bg-blue-600/10'
                          : 'border-white/20 bg-white/5'
                      }`}>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2 sm:gap-0">
                          <div className="flex items-center space-x-4">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                              phase.status === 'completed' 
                                ? 'bg-green-600/20 border-2 border-green-500/30' 
                                : phase.status === 'active'
                                ? 'bg-blue-600/20 border-2 border-blue-500/30'
                                : 'bg-white/10 border-2 border-white/20'
                            }`}>
                              {phase.status === 'completed' ? (
                                <CheckCircle className="w-6 h-6 text-green-300" />
                              ) : phase.status === 'active' ? (
                                <Clock className="w-6 h-6 text-blue-300" />
                              ) : (
                                <span className="text-gray-300 text-sm font-medium font-montserrat">{index + 1}</span>
                              )}
                            </div>
                            <div>
                              <h4 className="text-xl font-semibold text-white mb-1 font-montserrat">{phase.name}</h4>
                              <p className="text-gray-200 text-sm font-medium font-montserrat">{phase.description}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`px-3 py-1 rounded-xl text-sm font-medium font-montserrat ${
                              phase.status === 'completed' 
                                ? 'bg-green-600/20 border border-green-500/30 text-green-300' 
                                : phase.status === 'active'
                                ? 'bg-blue-600/20 border border-blue-500/30 text-blue-300'
                                : 'bg-white/10 border border-white/20 text-gray-300'
                            }`}>
                              {t(`projectDetails.roadmap.status.${phase.status}`) || t('projectDetails.roadmap.status.default')}
                            </div>
                          </div>
                        </div>
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-300 text-sm font-medium font-montserrat">{t('projectDetails.roadmap.progress')}</span>
                            <span className="text-white text-sm font-medium font-montserrat">{phase.progress}%</span>
                          </div>
                          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                            <div className={`h-full bg-gradient-to-r ${phase.color} rounded-full transition-all duration-1000 relative`} style={{ width: `${phase.progress}%` }}>
                              <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
                            </div>
                          </div>
                        </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <div className="text-gray-300 font-medium mb-1 font-montserrat">{t('projectDetails.roadmap.period')}</div>
                              <div className="text-white font-medium font-montserrat">{phase.startDate} - {phase.endDate}</div>
                            </div>
                            <div>
                              <div className="text-gray-300 font-medium mb-1 font-montserrat">{t('projectDetails.roadmap.responsible')}</div>
                              <div className="text-white font-medium font-montserrat">{phase.teamLead}</div>
                            </div>
                            <div>
                              <div className="text-gray-300 font-medium mb-1 font-montserrat">{t('projectDetails.roadmap.deliverables')}</div>
                              <div className="text-white font-medium font-montserrat">{phase.deliverables.length} {t('projectDetails.roadmap.deliverables')}</div>
                            </div>
                          </div>
                          <div className="mt-4 pt-4 border-t border-white/10">
                            <div className="text-gray-300 font-medium text-xs mb-2 font-montserrat">{t('projectDetails.roadmap.keyDeliverables')}</div>
                            <div className="flex flex-wrap gap-2">
                              {phase.deliverables.map((deliverable, idx) => (
                                <span 
                                  key={idx}
                                  className="px-2 py-1 bg-white/10 border border-white/20 rounded-lg text-gray-200 text-xs font-medium font-montserrat"
                                >
                                  {deliverable}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="mt-8 pt-6 border-t border-white/10">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-sm gap-2 sm:gap-0">
                        <div className="flex items-center space-x-6">
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                            <span className="text-gray-300 font-medium font-montserrat">{completedCount} {t('projectDetails.roadmap.completed')}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                            <span className="text-gray-300 font-medium font-montserrat">{inProgressCount} {t('projectDetails.roadmap.inProgress')}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                            <span className="text-gray-300 font-medium font-montserrat">{pendingCount} {t('projectDetails.roadmap.pending')}</span>
                          </div>
                        </div>
                        <div className="text-gray-300 font-medium font-montserrat">
                          {t('projectDetails.roadmap.lastUpdated')}: {lastUpdated && lastUpdated > new Date(0) ? dayjs(lastUpdated).format('DD MMM YYYY') : t('projectDetails.fallback.noDate')}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-lg border border-white/20 p-6"
              >
                <h3 className="text-xl font-semibold text-white mb-6 bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400 font-montserrat">{t('projectDetails.team.header')}</h3>
                {loading ? (
                  <div className="flex items-center justify-center h-20">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                      <p className="text-gray-300 font-montserrat">{t('projectDetails.team.loading')}</p>
                    </div>
                  </div>
                ) : error ? (
                  <div className="flex items-center justify-center h-20 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-red-500/30">
                    <p className="text-red-400 font-montserrat">{error}</p>
                  </div>
                ) : team.length === 0 ? (
                  <div className="flex items-center justify-center h-20 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <p className="text-gray-300 font-montserrat">{t('projectDetails.team.noData')}</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {team.map((member, idx) => (
                      <div key={idx} className="flex flex-col p-3 bg-white/10 rounded-xl border border-white/20 hover:bg-white/15 hover:shadow-lg hover:shadow-white/20 transition-all duration-300">
                        <div className="text-white text-base font-medium font-montserrat">{member.name}</div>
                        {member.specialization && (
                          <div className="text-gray-200 text-sm font-medium font-montserrat">{member.specialization}</div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-lg border border-white/20 p-6"
              >
                <h3 className="text-xl font-semibold text-white mb-6 bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-montserrat">{t('projectDetails.technologies.header')}</h3>
                {loading ? (
                  <div className="flex items-center justify-center h-20">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                      <p className="text-gray-300 font-montserrat">{t('projectDetails.technologies.loading')}</p>
                    </div>
                  </div>
                ) : error ? (
                  <div className="flex items-center justify-center h-20 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-red-500/30">
                    <p className="text-red-400 font-montserrat">{t('projectDetails.technologies.error')}</p>
                  </div>
                ) : technologies.length === 0 ? (
                  <div className="flex items-center justify-center h-20 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <p className="text-gray-300 font-montserrat">{t('projectDetails.technologies.noData')}</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    {technologies.map((tech, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-white/10 rounded-xl border border-white/20 hover:bg-white/15 hover:shadow-lg hover:shadow-white/20 transition-all duration-300">
                        <Code className="w-5 h-5 text-cyan-300" />
                        <span className="text-gray-200 text-sm font-medium font-montserrat">{tech}</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
        <style>{`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes slide-up {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
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
}

export default ProjectDetails;