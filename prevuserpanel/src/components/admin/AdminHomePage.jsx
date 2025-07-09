// import React, { useState, useEffect, useCallback } from 'react';
// import { motion } from 'framer-motion';
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from '@/components/ui/card';
// import {
//   Users,
//   FolderGit2,
//   CheckCircle,
//   AlertCircle,
//   ArrowUpRight,
//   Loader2,
// } from 'lucide-react';
// import { useToast } from '@/components/ui/use-toast';

// const AdminHomePage = () => {
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalProjects: 0,
//     activeProjects: 0,
//     pendingProjects: 0,
//     recentUsers: [],
//     recentProjects: [],
//   });
//   const [isLoading, setIsLoading] = useState(true);
//   const { toast } = useToast();

//   const fetchStats = useCallback(async () => {
//     setIsLoading(true);
//     try {
//       const token = localStorage.getItem('bizwizusertoken'); // use if needed
//       const response = await fetch('/admin-stats', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Erreur lors du chargement des statistiques');
//       }

//       const data = await response.json();

//       if (data.error) {
//         throw new Error(data.error);
//       }

//       setStats(data);
//     } catch (error) {
//       console.error('Erreur de récupération:', error.message);
//       toast({
//         title: 'Erreur',
//         description: `Impossible de charger les statistiques: ${error.message}`,
//         variant: 'destructive',
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   }, [toast]);

//   useEffect(() => {
//     fetchStats();
//   }, [fetchStats]);

//   const StatCard = ({ title, value, icon: Icon, trend, color = 'text-red-500' }) => (
//     <Card className="bg-slate-800/70 border-slate-700 hover:bg-slate-800/90 transition-colors">
//       <CardHeader className="flex flex-row items-center justify-between pb-2">
//         <CardTitle className="text-sm font-medium text-slate-400">{title}</CardTitle>
//         <Icon className={`h-4 w-4 ${color}`} />
//       </CardHeader>
//       <CardContent>
//         <div className="text-2xl font-bold text-slate-100">{value}</div>
//         {trend && (
//           <p className="text-xs text-slate-400 mt-1 flex items-center">
//             <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
//             <span className="text-green-500">{trend}</span> ce mois
//           </p>
//         )}
//       </CardContent>
//     </Card>
//   );

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <Loader2 className="h-8 w-8 animate-spin text-red-500" />
//         <span className="ml-3 text-slate-300">Chargement des statistiques...</span>
//       </div>
//     );
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="space-y-8"
//     >
//       <div>
//         <h1 className="text-3xl font-bold text-slate-100">Vue d'Ensemble</h1>
//         <p className="text-slate-400 mt-1">Tableau de bord administrateur BizzWiz AI</p>
//       </div>

//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//         <StatCard title="Utilisateurs Total" value={stats.totalUsers} icon={Users} trend="+12%" />
//         <StatCard title="Projets Total" value={stats.totalProjects} icon={FolderGit2} color="text-blue-500" trend="+8%" />
//         <StatCard title="Projets Actifs" value={stats.activeProjects} icon={CheckCircle} color="text-green-500" trend="+15%" />
//         <StatCard title="Projets en Attente" value={stats.pendingProjects} icon={AlertCircle} color="text-yellow-500" trend="+5%" />
//       </div>

//       <div className="grid gap-6 md:grid-cols-2">
//         {/* 🔹 Recent Users */}
//         <Card className="bg-slate-800/70 border-slate-700">
//           <CardHeader>
//             <CardTitle className="text-lg text-slate-200">Derniers Utilisateurs</CardTitle>
//             <CardDescription className="text-slate-400">Utilisateurs récemment inscrits</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {stats.recentUsers.map((user) => (
//                 <div
//                   key={user.id}
//                   className="flex items-center justify-between border-b border-slate-700 pb-3 last:border-0"
//                 >
//                   <div>
//                     <p className="text-sm font-medium text-slate-200">{user.email}</p>
//                     <p className="text-xs text-slate-400">
//                       {new Date(user.created_at).toLocaleDateString()}
//                     </p>
//                   </div>
//                   <span
//                     className={`px-2 py-1 text-xs rounded-full ${
//                       user.email_confirmed_at
//                         ? 'bg-green-500/20 text-green-400'
//                         : 'bg-yellow-500/20 text-yellow-400'
//                     }`}
//                   >
//                     {user.email_confirmed_at ? 'Vérifié' : 'En attente'}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>

//         {/* 🔹 Recent Projects */}
//         <Card className="bg-slate-800/70 border-slate-700">
//           <CardHeader>
//             <CardTitle className="text-lg text-slate-200">Derniers Projets</CardTitle>
//             <CardDescription className="text-slate-400">Projets récemment créés</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {stats.recentProjects.map((project) => (
//                 <div
//                   key={project.id}
//                   className="flex items-center justify-between border-b border-slate-700 pb-3 last:border-0"
//                 >
//                   <div>
//                     <p className="text-sm font-medium text-slate-200">
//                       {project.form_answers?.projectDescription?.value?.substring(0, 30) || 'Nouveau Projet'}...
//                     </p>
//                     <p className="text-xs text-slate-400">
//                       {new Date(project.created_at).toLocaleDateString()}
//                     </p>
//                   </div>
//                   <span
//                     className={`px-2 py-1 text-xs rounded-full ${
//                       project.status === 'active'
//                         ? 'bg-green-500/20 text-green-400'
//                         : project.status?.includes('pending')
//                         ? 'bg-yellow-500/20 text-yellow-400'
//                         : 'bg-slate-500/20 text-slate-400'
//                     }`}
//                   >
//                     {project.status === 'active'
//                       ? 'Actif'
//                       : project.status?.includes('pending')
//                       ? 'En Attente'
//                       : 'Autre'}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </motion.div>
//   );
// };

// export default AdminHomePage;


import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Users,
  FolderGit2,
  CheckCircle,
  AlertCircle,
  ArrowUpRight,
  Loader2,
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const AdminHomePage = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProjects: 0,
    activeProjects: 0,
    pendingProjects: 0,
    recentUsers: [],
    recentProjects: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchStats = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('bizwizusertoken');

      const response = await fetch('http://localhost:8000/api/admin-stats', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setStats(data);
    } catch (error) {
      console.error('Erreur de récupération:', error.message);
      toast({
        title: 'Erreur',
        description: `Impossible de charger les statistiques: ${error.message}`,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const StatCard = ({ title, value, icon: Icon, trend, color = 'text-red-500' }) => (
    <Card className="bg-slate-800/70 border-slate-700 hover:bg-slate-800/90 transition-colors">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-slate-400">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-slate-100">{value}</div>
        {trend && (
          <p className="text-xs text-slate-400 mt-1 flex items-center">
            <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
            <span className="text-green-500">{trend}</span> ce mois
          </p>
        )}
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-red-500" />
        <span className="ml-3 text-slate-300">Chargement des statistiques...</span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-slate-100">Vue d'Ensemble</h1>
        <p className="text-slate-400 mt-1">Tableau de bord administrateur BizzWiz AI</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Utilisateurs Total" value={stats.totalUsers} icon={Users} trend="+12%" />
        <StatCard title="Projets Total" value={stats.totalProjects} icon={FolderGit2} color="text-blue-500" trend="+8%" />
        <StatCard title="Projets Actifs" value={stats.activeProjects} icon={CheckCircle} color="text-green-500" trend="+15%" />
        <StatCard title="Projets en Attente" value={stats.pendingProjects} icon={AlertCircle} color="text-yellow-500" trend="+5%" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-slate-800/70 border-slate-700">
          <CardHeader>
            <CardTitle className="text-lg text-slate-200">Derniers Utilisateurs</CardTitle>
            <CardDescription className="text-slate-400">Utilisateurs récemment inscrits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between border-b border-slate-700 pb-3 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-slate-200">{user.email}</p>
                    <p className="text-xs text-slate-400">{new Date(user.created_at).toLocaleDateString()}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    user.email_verified_at ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {user.email_verified_at ? 'Vérifié' : 'En attente'}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/70 border-slate-700">
          <CardHeader>
            <CardTitle className="text-lg text-slate-200">Derniers Projets</CardTitle>
            <CardDescription className="text-slate-400">Projets récemment créés</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentProjects.map((project) => (
                <div key={project.id} className="flex items-center justify-between border-b border-slate-700 pb-3 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-slate-200">
                      {project.project_description?.substring(0, 30) || 'Nouveau Projet'}...
                    </p>
                    <p className="text-xs text-slate-400">{new Date(project.created_at).toLocaleDateString()}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    project.status === 'active' ? 'bg-green-500/20 text-green-400' :
                    project.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-slate-500/20 text-slate-400'
                  }`}>
                    {project.status === 'active' ? 'Actif' : project.status === 'pending' ? 'En Attente' : 'Autre'}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default AdminHomePage;
