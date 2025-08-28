import React, { useState, useEffect, useRef } from 'react';
import Sidebar, { sidebarItems } from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import ApiService from '@/apiService';

const MainDashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMounted = useRef(false);

  const [activeSection, setActiveSection] = useState('dashboard');
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (!isMounted.current) {
      document.documentElement.style.setProperty('--sidebar-width', '256px');
      document.documentElement.style.setProperty('--header-height', '72px');
      fetchUserProjects();
      isMounted.current = true;
    }
  }, []);

  useEffect(() => {
    const pathParts = location.pathname.split('/');
    let currentSection = 'dashboard';
    let projId = null;

    if (pathParts[2] === 'dashboard') {
      if (pathParts[3] === 'newproject') {
        currentSection = 'nouveauProjet';
      } else if (pathParts[3] === 'mesprojet' && pathParts[4]) {
        // This is the project management page (mes projets)
        currentSection = 'projets';
        projId = pathParts[4];
      } else if (pathParts[3] === 'project' && pathParts[4]) {
        // This is the individual project dashboard
        currentSection = 'dashboard';
        projId = pathParts[4];
      } else if (pathParts[3] === 'settings') {
        currentSection = 'parametres';
      } else if (pathParts[3] === 'payment') {
        currentSection = 'payment';
      } else if (pathParts[3] === 'schedule-meet') {
        currentSection = 'schedule';
      } else if (pathParts[3] === 'roadmap') {
        currentSection = 'roadmap';
      } else {
        currentSection = 'dashboard';
      }
    }

    if (projId) {
      const foundProject = projects.find(p => p.id === parseInt(projId));
      setSelectedProject(foundProject || null);
    } else {
      setSelectedProject(null);
    }

    setActiveSection(currentSection);
  }, [location.pathname, projects]);

  const fetchUserProjects = async () => {
    try {
      const token = localStorage.getItem('bizwizusertoken');
      if (!token) {
        throw new Error('Utilisateur non authentifié. Veuillez vous connecter.');
      }

      const response = await ApiService('/user-projects', 'GET', null, false, token);
      if (response.success) {
        setProjects(response.data);
      } else {
        toast({
          title: 'Error',
          description: response.message || 'Failed to load projects',
          variant: 'destructive',
        });
        setProjects([]);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'An error occurred while fetching projects',
        variant: 'destructive',
      });
      setProjects([]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('bizzwiz-userRole');
    localStorage.removeItem('bizzwiz-userId');
    localStorage.removeItem('bizwizusertoken');
    toast({ title: 'Déconnexion Réussie', description: 'Vous avez été déconnecté(e).' });
    navigate('/login');
  };

  const handleSectionClick = (sectionId) => {
    setSelectedProject(null);
    const sectionConfig = sidebarItems.find(item => item.id === sectionId);
    if (!sectionConfig) return;

    const selectedProjectId = localStorage.getItem('bizzwiz-selectedProjectId');

    if (sectionId === 'dashboard') {
      if (selectedProjectId) {
        const projectExists = projects.find(p => p.id === parseInt(selectedProjectId));
        if (projectExists) {
          navigate(`/app/dashboard/project/${selectedProjectId}`);
        } else {
          const firstProject = projects[0];
          if (firstProject) {
            localStorage.setItem('bizzwiz-selectedProjectId', firstProject.id.toString());
            navigate(`/app/dashboard/project/${firstProject.id}`);
          } else {
            navigate('/app/select-project');
          }
        }
      } else {
        const firstProject = projects[0];
        if (firstProject) {
          localStorage.setItem('bizzwiz-selectedProjectId', firstProject.id.toString());
          navigate(`/app/dashboard/project/${firstProject.id}`);
        } else {
          navigate('/app/select-project');
        }
      }
    } else if (sectionId === 'projets') {
      // Navigate to project management page
      if (selectedProjectId) {
        const projectExists = projects.find(p => p.id === parseInt(selectedProjectId));
        if (projectExists) {
          navigate(`/app/dashboard/mesprojet/${selectedProjectId}`);
        } else {
          const firstProject = projects[0];
          if (firstProject) {
            localStorage.setItem('bizzwiz-selectedProjectId', firstProject.id.toString());
            navigate(`/app/dashboard/mesprojet/${firstProject.id}`);
          } else {
            navigate('/app/select-project');
          }
        }
      } else {
        const firstProject = projects[0];
        if (firstProject) {
          localStorage.setItem('bizzwiz-selectedProjectId', firstProject.id.toString());
          navigate(`/app/dashboard/mesprojet/${firstProject.id}`);
        } else {
          navigate('/app/select-project');
        }
      }
    } else if (sectionId === 'parametres') {
      navigate('/app/dashboard/settings');
    } else if (sectionId === 'nouveauProjet') {
      navigate('/app/dashboard/newproject');
    } else if (sectionId === 'payment') {
      const projectId = selectedProject?.id || selectedProjectId || projects[0]?.id;
      if (projectId) {
        const projectExists = projects.find(p => p.id === parseInt(projectId));
        if (projectExists) {
          navigate(`/app/dashboard/payment/${projectId}`);
        } else {
          toast({
            title: 'Error',
            description: 'Aucun projet valide sélectionné pour le paiement',
            variant: 'destructive',
          });
          navigate('/app/select-project');
        }
      } else {
        toast({
          title: 'Error',
          description: 'Aucun projet sélectionné pour le paiement',
          variant: 'destructive',
        });
        navigate('/app/select-project');
      }
    } else if (sectionId === 'schedule') {
      navigate('/app/dashboard/schedule-meet');
    } else if (sectionId === 'roadmap') {
  const selectedProjectId = localStorage.getItem('bizzwiz-selectedProjectId');
  if (selectedProjectId) {
    navigate(`/app/dashboard/roadmap/${selectedProjectId}`);
  } else {
    navigate('/app/dashboard/roadmap');
  }

    } else if (sectionId === 'deconnexion') {
      handleLogout();
    }

    setActiveSection(sectionId);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-bizzwiz-deep-space via-bizzwiz-nebula-purple/5 to-bizzwiz-deep-space text-bizzwiz-star-white">
      <Sidebar
        activeSection={activeSection}
        onSectionClick={handleSectionClick}
        onLogout={handleLogout}
      />
      <div className="flex-1 flex flex-col overflow-hidden ml-[var(--sidebar-width,256px)]">
        <Header
          activeSection={activeSection}
          selectedProject={selectedProject}
        />
        <main className="flex-1 overflow-y-auto bg-bizzwiz-deep-space/30">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainDashboardLayout;