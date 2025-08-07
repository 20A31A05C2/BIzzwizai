import React, { useEffect, useState } from 'react';
import { ArrowLeft, Users, Calendar, Clock, BarChart3, ExternalLink, MessageCircle, Pause, RotateCcw, Edit3, Target, Code, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ApiService from '../../apiService';
import dayjs from 'dayjs';

function ProjectDetails({ selectedProject, setActiveSection, setShowChat }) {
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
        setError('Erreur lors du chargement des données dynamiques.');
      } finally {
        setLoading(false);
      }
    }
    fetchDynamicData();
  }, [selectedProject]);

  if (!selectedProject) return null;

  // Default values for missing properties
  const projectData = {
    ...selectedProject,
    teamLead: selectedProject.teamLead || {
      avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMzIiIGZpbGw9IiM2QjI4RjEiLz4KPHN2ZyB4PSIxNiIgeT0iMjAiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJ3aGl0ZSI+CjxwYXRoIGQ9Ik0xMiAxMmMyLjIxIDAgNC0xLjc5IDQtNHMtMS43OS00LTQtNC00IDEuNzktNCA0IDEuNzkgNCA0IDR6bTAgMmMtMi42NyAwLTggMS4zNC04IDR2MmgxNnYtMmMwLTIuNjYtNS4zMy00LTgtNHoiLz4KPC9zdmc+Cjwvc3ZnPgo=',
      name: 'Chef d\'équipe',
      role: 'Project Manager'
    },
    nextMilestone: selectedProject.nextMilestone || {
      name: 'Prochaine étape',
      date: '15 Mars 2024'
    },
    technologies: selectedProject.technologies || ['React', 'Node.js', 'AI/ML', 'Cloud'],
    deliveryDate: selectedProject.deliveryDate || '15 Juin 2024',
    startDate: selectedProject.startDate || selectedProject.start_date || null,
    name: selectedProject.name || selectedProject.project_name || '',
  };

  // Use dynamicData.roadmaps if available, otherwise fallback to static phases
  const phases = dynamicData.roadmaps.length > 0
    ? dynamicData.roadmaps.map((item, idx) => ({
        name: item.project_title,
        progress: item.progress_percentage,
        color: 'from-blue-500 to-cyan-500',
        status: item.status,
        startDate: item.start_date ? dayjs(item.start_date).format('DD MMM YYYY') : '',
        endDate: item.end_date ? dayjs(item.end_date).format('DD MMM YYYY') : '',
        description: item.description,
        deliverables: Array.isArray(item.tags) && item.tags.length > 0 ? item.tags : Array(item.deliverables_count).fill('Livrable'),
        teamLead: item.responsible_person,
      }))
    : [];

  // Use dynamicData.technologies if available, otherwise fallback to static
  const technologies = dynamicData.technologies.length > 0
    ? dynamicData.technologies.map(t => t.name)
    : [];

  // Use dynamicData.team if available, otherwise fallback to static
  const team = dynamicData.team.length > 0
    ? dynamicData.team.map(member => ({ name: member.name, specialization: member.specialization }))
    : [];

  // Calculate dynamic roadmap summary counts and last updated date
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
      transition={{ duration: 0.4 }}
      className="flex-1 p-4 sm:p-6 md:p-8"
    >
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => setActiveSection('projects')}
          className="flex items-center space-x-2 text-white/60 hover:text-white mb-6 sm:mb-8 transition-colors duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-light">Retour au vaisseau</span>
        </button>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              whileHover={{ scale: 1.01, boxShadow: '0 8px 32px 0 rgba(139,92,246,0.10)' }}
              transition={{ duration: 0.3 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 via-cyan-500/20 to-purple-600/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-[#000011] rounded-3xl p-6 sm:p-10 group-hover:shadow-2xl group-hover:shadow-purple-500/10 transition-all duration-500">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6 md:mb-8 gap-4 md:gap-0">
                  <div>
                    <h1 className="text-2xl sm:text-4xl font-light text-white tracking-wide mb-2 sm:mb-3">{projectData.name}</h1>
                    <p className="text-white/60 font-light text-base sm:text-lg mb-2 sm:mb-4">{projectData.category}</p>
                    <p className="text-white/50 font-light text-sm sm:text-base leading-relaxed">{projectData.description}</p>
                    <div className="flex items-center space-x-3 mb-2">
                      {projectData.status && (
                        <div className="px-3 sm:px-4 py-1 sm:py-2 bg-green-500/10 rounded-full">
                          <span className="text-green-400 text-xs sm:text-sm font-light">
                            {projectData.status === 'PaymentDone' ? 'Payé' : projectData.status}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl sm:text-3xl font-light text-purple-400 mb-1 sm:mb-2">{projectData.progress}%</div>
                    <div className="text-white/60 text-xs sm:text-sm font-light">Progression globale</div>
                  </div>
                </div>
                <div className="mb-6 sm:mb-8">
                  <div className="w-full h-2 sm:h-3 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full transition-all duration-1000"
                      style={{ width: `${projectData.progress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                  <div className="text-center">
                    <Users className="w-5 sm:w-6 h-5 sm:h-6 text-purple-400 mx-auto mb-1 sm:mb-2" />
                    <div className="text-white font-light text-base sm:text-xl">{team.length}</div>
                    <div className="text-white/50 text-xs sm:text-sm font-light">Équipe</div>
                  </div>
                  <div className="text-center">
                    <Calendar className="w-5 sm:w-6 h-5 sm:h-6 text-cyan-400 mx-auto mb-1 sm:mb-2" />
                    <div className="text-white font-light text-base sm:text-xl">
                      {projectData.startDate ? new Date(projectData.startDate).toLocaleDateString('fr-FR') : 'N/A'}
                    </div>
                    <div className="text-white/50 text-xs sm:text-sm font-light">Début</div>
                  </div>
                  <div className="text-center">
                    <Clock className="w-5 sm:w-6 h-5 sm:h-6 text-green-400 mx-auto mb-1 sm:mb-2" />
                    <div className="text-white font-light text-base sm:text-xl">{projectData.deliveryDate}</div>
                    <div className="text-white/50 text-xs sm:text-sm font-light">Livraison</div>
                  </div>
                  <div className="text-center">
                    <BarChart3 className="w-5 sm:w-6 h-5 sm:h-6 text-yellow-400 mx-auto mb-1 sm:mb-2" />
                    <div className="text-white font-light text-base sm:text-xl">{projectData.budget}</div>
                    <div className="text-white/50 text-xs sm:text-sm font-light">Budget</div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  <button className="relative group/btn flex-1">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500/50 to-purple-600/50 rounded-2xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 blur-sm"></div>
                    <div className="relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-pink-500/20 to-purple-600/20 rounded-2xl text-white font-light hover:shadow-lg hover:shadow-pink-500/20 transition-all duration-300 flex items-center justify-center space-x-2">
                      <ExternalLink className="w-4 h-4" />
                      <span>Voir en Live</span>
                    </div>
                  </button>
                  <button 
                    onClick={() => setShowChat(true)}
                    className="relative group/btn flex-1"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/50 to-cyan-500/50 rounded-2xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 blur-sm"></div>
                    <div className="relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600/20 to-cyan-500/20 rounded-2xl text-white font-light hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 flex items-center space-x-2">
                      <MessageCircle className="w-4 h-4" />
                      <span>Chat Équipe</span>
                    </div>
                  </button>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              whileHover={{ scale: 1.01, boxShadow: '0 8px 32px 0 rgba(139,92,246,0.10)' }}
              transition={{ duration: 0.3 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 via-cyan-500/20 to-purple-600/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-[#000011] rounded-3xl p-6 sm:p-8 group-hover:shadow-2xl group-hover:shadow-purple-500/10 transition-all duration-500">
                <h3 className="text-xl sm:text-2xl font-light text-white mb-6 sm:mb-8">Roadmap du Projet</h3>
                {loading ? (
                  <div className="flex items-center justify-center h-32 text-white/60 text-lg font-light">
                    Chargement de la roadmap...
                  </div>
                ) : phases.length === 0 ? (
                  <div className="flex items-center justify-center h-32 text-white/60 text-lg font-light">
                    Aucune roadmap trouvée. Veuillez contacter l'administrateur.
                  </div>
                ) : (
                  <div className="space-y-6 sm:space-y-8">
                    {phases.map((phase, index) => (
                      <div key={index} className="relative">
                        {index < 4 && (
                          <div className="absolute left-6 top-16 w-0.5 h-12 bg-gradient-to-b from-white/20 to-white/5"></div>
                        )}
                        <div className={`relative border rounded-2xl p-4 sm:p-6 transition-all duration-300 ${
                          phase.status === 'completed' 
                            ? 'border-green-500/30 bg-green-500/5' 
                            : phase.status === 'active'
                            ? 'border-blue-500/30 bg-blue-500/5'
                            : 'border-white/10 bg-white/2'
                        }`}>
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 sm:mb-4 gap-2 sm:gap-0">
                            <div className="flex items-center space-x-2 sm:space-x-4">
                              <div className={`w-8 sm:w-12 h-8 sm:h-12 rounded-full flex items-center justify-center ${
                                phase.status === 'completed' 
                                  ? 'bg-green-500/20 border-2 border-green-500/50' 
                                  : phase.status === 'active'
                                  ? 'bg-blue-500/20 border-2 border-blue-500/50'
                                  : 'bg-white/5 border-2 border-white/20'
                              }`}>
                                {phase.status === 'completed' ? (
                                  <CheckCircle className="w-5 sm:w-6 h-5 sm:h-6 text-green-400" />
                                ) : phase.status === 'active' ? (
                                  <Clock className="w-5 sm:w-6 h-5 sm:h-6 text-blue-400" />
                                ) : (
                                  <span className="text-white/40 font-light text-xs sm:text-sm">{index + 1}</span>
                                )}
                              </div>
                              <div>
                                <h4 className="text-base sm:text-xl font-light text-white mb-0.5 sm:mb-1">{phase.name}</h4>
                                <p className="text-white/60 text-xs sm:text-sm font-light">{phase.description}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className={`px-2 sm:px-3 py-1 rounded-full text-xs font-light ${
                                phase.status === 'completed' 
                                  ? 'bg-green-500/10 border border-green-500/30 text-green-400' 
                                  : phase.status === 'active'
                                  ? 'bg-blue-500/10 border border-blue-500/30 text-blue-400'
                                  : 'bg-white/5 border border-white/20 text-white/60'
                              }`}>
                                {phase.status === 'completed' ? 'Terminé' : phase.status === 'active' ? 'En cours' : 'En attente'}
                              </div>
                            </div>
                          </div>
                          <div className="mb-3 sm:mb-4">
                            <div className="flex items-center justify-between mb-1 sm:mb-2">
                              <span className="text-white/70 text-xs sm:text-sm font-light">Progression</span>
                              <span className="text-white/80 text-xs sm:text-sm font-light">{phase.progress}%</span>
                            </div>
                            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                              <div className={`h-full bg-gradient-to-r ${phase.color} rounded-full transition-all duration-1000`} style={{ width: `${phase.progress}%` }}></div>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm">
                            <div>
                              <div className="text-white/50 font-light mb-0.5 sm:mb-1">Période</div>
                              <div className="text-white/70 font-light">{phase.startDate} - {phase.endDate}</div>
                            </div>
                            <div>
                              <div className="text-white/50 font-light mb-0.5 sm:mb-1">Responsable</div>
                              <div className="text-white/70 font-light">{phase.teamLead}</div>
                            </div>
                            <div>
                              <div className="text-white/50 font-light mb-0.5 sm:mb-1">Livrables</div>
                              <div className="text-white/70 font-light">{phase.deliverables.length} éléments</div>
                            </div>
                          </div>
                          <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/10">
                            <div className="text-white/50 font-light text-[11px] sm:text-xs mb-1 sm:mb-2">Livrables clés:</div>
                            <div className="flex flex-wrap gap-1 sm:gap-2">
                              {phase.deliverables.map((deliverable, idx) => (
                                <span 
                                  key={idx}
                                  className="px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-white/60 text-[11px] sm:text-xs font-light"
                                >
                                  {deliverable}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/10">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs sm:text-sm gap-2 sm:gap-0">
                    <div className="flex items-center space-x-4 sm:space-x-6">
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-green-500 rounded-full"></div>
                        <span className="text-white/60 font-light">{completedCount} Terminé</span>
                      </div>
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-white/60 font-light">{inProgressCount} En cours</span>
                      </div>
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-white/30 rounded-full"></div>
                        <span className="text-white/60 font-light">{pendingCount} En attente</span>
                      </div>
                    </div>
                    <div className="text-white/40 font-light">
                      Dernière mise à jour: {lastUpdated && lastUpdated > new Date(0) ? dayjs(lastUpdated).format('DD MMM YYYY') : 'N/A'}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              whileHover={{ scale: 1.01, boxShadow: '0 8px 32px 0 rgba(139,92,246,0.10)' }}
              transition={{ duration: 0.3 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-green-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
              <div className="relative bg-[#000011] rounded-2xl p-6 group-hover:shadow-2xl group-hover:shadow-green-500/10 transition-all duration-500">
                <h3 className="text-xl font-light text-white mb-6">Membres de l'équipe</h3>
                {loading ? (
                  <div className="flex items-center justify-center h-20 text-white/60 text-base font-light">
                    Chargement des membres de l'équipe...
                  </div>
                ) : team.length === 0 ? (
                  <div className="flex items-center justify-center h-20 text-white/60 text-base font-light">
                    Aucune donnée trouvée. Veuillez contacter l'administrateur.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {team.map((member, idx) => (
                      <div key={idx} className="flex flex-col mb-2 p-2 bg-white/5 rounded-lg">
                        <div className="text-white font-light text-base">{member.name}</div>
                        {member.specialization && (
                          <div className="text-white/60 text-sm">{member.specialization}</div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
            {/* <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              whileHover={{ scale: 1.01, boxShadow: '0 8px 32px 0 rgba(139,92,246,0.10)' }}
              transition={{ duration: 0.3 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
              <div className="relative bg-[#000011] rounded-2xl p-6 group-hover:shadow-2xl group-hover:shadow-purple-500/10 transition-all duration-500">
                <h3 className="text-xl font-light text-white mb-6">Objectif à venir</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Target className="w-5 h-5 text-purple-400" />
                    <span className="text-white/80 font-light">{projectData.nextMilestone.name}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-cyan-400" />
                    <span className="text-white/80 font-light">{projectData.nextMilestone.date}</span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
                      style={{ width: `70%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </motion.div> */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              whileHover={{ scale: 1.01, boxShadow: '0 8px 32px 0 rgba(139,92,246,0.10)' }}
              transition={{ duration: 0.3 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-cyan-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
              <div className="relative bg-[#000011] rounded-2xl p-6 group-hover:shadow-2xl group-hover:shadow-cyan-500/10 transition-all duration-500">
                <h3 className="text-xl font-light text-white mb-6">Technologies</h3>
                {loading ? (
                  <div className="flex items-center justify-center h-20 text-white/60 text-base font-light">
                    Chargement des technologies...
                  </div>
                ) : technologies.length === 0 ? (
                  <div className="flex items-center justify-center h-20 text-white/60 text-base font-light">
                    Aucune donnée trouvée. Veuillez contacter l'administrateur.
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    {technologies.map((tech, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl">
                        <Code className="w-4 h-4 text-cyan-400" />
                        <span className="text-white/70 font-light text-sm">{tech}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ProjectDetails;