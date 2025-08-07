// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { 
//   Users, 
//   Eye, 
//   Search, 
//   Filter,
//   Calendar,
//   DollarSign,
//   Clock,
//   CheckCircle,
//   XCircle,
//   AlertCircle,
//   User,
//   Building,
//   Mail,
//   Phone,
//   Plus,
//   Trash2
// } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import ApiService from '../../apiService';
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from '@/components/ui/alert-dialog';
// import { toast } from '@/components/ui/use-toast';

// function AdminUsers() {
//   const [activeTab, setActiveTab] = useState('clients');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [deletingUserId, setDeletingUserId] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       const response = await ApiService("/admin/users", "GET");
//       if (response.success) {
//         setUsers(response.data);
//       } else {
//         setError('Failed to fetch users');
//       }
//     } catch (err) {
//       setError('Error fetching users: ' + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteUser = async (userId) => {
//     try {
//       setDeletingUserId(userId);
//       const response = await ApiService(`/admin/users/${userId}`, "DELETE");
      
//       if (response.success) {
//         toast({
//           title: "Utilisateur supprimé",
//           description: "L'utilisateur a été supprimé avec succès.",
//           variant: "default",
//         });
//         // Remove the user from the local state
//         setUsers(prevUsers => prevUsers.filter(user => user.user_id !== userId));
//       } else {
//         toast({
//           title: "Erreur",
//           description: response.message || "Erreur lors de la suppression de l'utilisateur.",
//           variant: "destructive",
//         });
//       }
//     } catch (err) {
//       toast({
//         title: "Erreur",
//         description: "Erreur lors de la suppression de l'utilisateur: " + err.message,
//         variant: "destructive",
//       });
//     } finally {
//       setDeletingUserId(null);
//     }
//   };

//   const filteredUsers = users.filter(user => {
//     const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          user.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          user.projectType.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
//     return matchesSearch && matchesStatus;
//   });

//   // Centralized status mapping
//   const STATUS_MAP = {
//     approved: {
//       label: "Approuvé",
//       color: "bg-green-100 text-green-800 border-green-200",
//       icon: <CheckCircle className="w-4 h-4 text-green-600" />,
//     },
//     rejected: {
//       label: "Rejeté",
//       color: "bg-red-100 text-red-800 border-red-200",
//       icon: <XCircle className="w-4 h-4 text-red-600" />,
//     },
//     inprogress: {
//       label: "En cours",
//       color: "bg-blue-100 text-blue-800 border-blue-200",
//       icon: <Clock className="w-4 h-4 text-blue-600" />,
//     },
//     pending: {
//       label: "En attente",
//       color: "bg-yellow-100 text-yellow-800 border-yellow-200",
//       icon: <AlertCircle className="w-4 h-4 text-yellow-600" />,
//     },
//     // Add more statuses as needed
//   };

//   const getStatusProps = (status) => {
//     if (!status) {
//       return {
//         label: "Statut inconnu",
//         color: "bg-gray-100 text-gray-800 border-gray-200",
//         icon: <AlertCircle className="w-4 h-4 text-gray-600" />,
//       };
//     }
//     return (
//       STATUS_MAP[status] || {
//         label: status.charAt(0).toUpperCase() + status.slice(1),
//         color: "bg-gray-100 text-gray-800 border-gray-200",
//         icon: <AlertCircle className="w-4 h-4 text-gray-600" />,
//       }
//     );
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="text-lg text-gray-600">Chargement...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="text-lg text-red-600">{error}</div>
//       </div>
//     );
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="space-y-4 sm:space-y-6"
//     >
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-6">
//         <h1 className="text-xl sm:text-3xl font-bold text-gray-800">Gestion des Utilisateurs</h1>
//         <div className="flex items-center gap-2 sm:gap-3">
//           <button
//             onClick={() => setActiveTab('clients')}
//             className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-xs sm:text-base ${
//               activeTab === 'clients' 
//                 ? 'bg-blue-500 text-white' 
//                 : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//             }`}
//           >
//             Clients ({users.length})
//           </button>

//         </div>
//       </div>

//       {/* Remove conditional, render clients view directly */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
//         {/* Liste des clients */}
//         <div className="lg:col-span-2">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100"
//           >
//             {/* Filtres */}
//             <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
//               <div className="flex-1 relative">
//                 <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Rechercher un client..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-black"
//                 />
//               </div>
//               <select
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value)}
//                 className="px-3 sm:px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-base text-black"
//               >
//                 <option value="all">Tous les statuts</option>
//                 <option value="pending">En attente</option>
//                 <option value="approved">Approuvés</option>
//                 <option value="rejected">Rejetés</option>
//               </select>
//             </div>

//             {/* Liste */}
//             <div className="space-y-3 sm:space-y-4">
//               {filteredUsers.map((user, index) => {
//                 const { label, color, icon } = getStatusProps(user.status);
//                 return (
//                   <motion.div
//                     key={user.id}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: index * 0.1 }}
//                     className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow"
//                   >
//                     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
//                       <div className="flex-1">
//                         <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
//                           <h3 className="font-medium text-gray-800 text-sm sm:text-base">{user.name}</h3>
//                           <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
//                             {user.company}
//                           </span>
//                           <div className="flex items-center gap-1">
//                             {icon}
//                             <span className={`px-2 py-1 rounded-full text-xs font-medium border ${color}`}>
//                               {label}
//                             </span>
//                           </div>
//                         </div>
//                         <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">{user.projectType}</p>
//                         <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">{user.projectName}</p>
//                         <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-500">
//                           <div className="flex items-center gap-1">
//                             <DollarSign className="w-4 h-4" />
//                             <span>{user.budget.toLocaleString()}€</span>
//                           </div>
//                           <div className="flex items-center gap-1">
//                             <Clock className="w-4 h-4" />
//                             <span>{user.timeline}</span>
//                           </div>
//                           <div className="flex items-center gap-1">
//                             <Calendar className="w-4 h-4" />
//                             <span>{new Date(user.submittedAt).toLocaleDateString('fr-FR')}</span>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <motion.button
//                           whileHover={{ scale: 1.05 }}
//                           whileTap={{ scale: 0.95 }}
//                           onClick={() => navigate(`/admindashboard/users/${user.user_id}/projects/${user.id}`)}
//                           className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors text-xs sm:text-base"
//                         >
//                           <Eye className="w-4 h-4" />
//                           <span>Voir</span>
//                         </motion.button>
                        
//                         <AlertDialog>
//                           <AlertDialogTrigger asChild>
//                             <motion.button
//                               whileHover={{ scale: 1.05 }}
//                               whileTap={{ scale: 0.95 }}
//                               disabled={deletingUserId === user.user_id}
//                               className="flex items-center gap-2 px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-xs sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
//                             >
//                               <Trash2 className="w-4 h-4" />
//                               <span>{deletingUserId === user.user_id ? 'Suppression...' : 'Supprimer'}</span>
//                             </motion.button>
//                           </AlertDialogTrigger>
//                           <AlertDialogContent>
//                             <AlertDialogHeader>
//                               <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
//                               <AlertDialogDescription>
//                                 Cette action ne peut pas être annulée. Cela supprimera définitivement l'utilisateur{" "}
//                                 <strong>{user.name}</strong> et toutes ses données associées.
//                               </AlertDialogDescription>
//                             </AlertDialogHeader>
//                             <AlertDialogFooter>
//                               <AlertDialogCancel>Annuler</AlertDialogCancel>
//                               <AlertDialogAction
//                                 onClick={() => handleDeleteUser(user.user_id)}
//                                 className="bg-red-600 hover:bg-red-700"
//                               >
//                                 Supprimer
//                               </AlertDialogAction>
//                             </AlertDialogFooter>
//                           </AlertDialogContent>
//                         </AlertDialog>
//                       </div>
//                     </div>
//                   </motion.div>
//                 );
//               })}
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// export default AdminUsers;



import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Eye, 
  Search, 
  Filter,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  Building,
  Mail,
  Phone,
  Plus,
  Trash2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../apiService';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from '@/components/ui/use-toast';

function AdminUsers() {
  const [activeTab, setActiveTab] = useState('clients');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingUserId, setDeletingUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await ApiService("/admin/users", "GET");
      if (response.success) {
        setUsers(response.data);
      } else {
        setError('Failed to fetch users');
      }
    } catch (err) {
      setError('Error fetching users: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      setDeletingUserId(userId);
      const response = await ApiService(`/admin/users/${userId}`, "DELETE");
      
      if (response.success) {
        toast({
          title: "Utilisateur supprimé",
          description: "L'utilisateur a été supprimé avec succès.",
          variant: "default",
        });
        // Remove the user from the local state
        setUsers(prevUsers => prevUsers.filter(user => user.user_id !== userId));
      } else {
        toast({
          title: "Erreur",
          description: response.message || "Erreur lors de la suppression de l'utilisateur.",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Erreur",
        description: "Erreur lors de la suppression de l'utilisateur: " + err.message,
        variant: "destructive",
      });
    } finally {
      setDeletingUserId(null);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.projectType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Centralized status mapping
  const STATUS_MAP = {
    approved: {
      label: "Approuvé",
      color: "bg-green-100 text-green-800 border-green-200",
      icon: <CheckCircle className="w-4 h-4 text-green-600" />,
    },
    rejected: {
      label: "Rejeté",
      color: "bg-red-100 text-red-800 border-red-200",
      icon: <XCircle className="w-4 h-4 text-red-600" />,
    },
    inprogress: {
      label: "En cours",
      color: "bg-blue-100 text-blue-800 border-blue-200",
      icon: <Clock className="w-4 h-4 text-blue-600" />,
    },
    pending: {
      label: "En attente",
      color: "bg-yellow-100 text-yellow-800 border-yellow-200",
      icon: <AlertCircle className="w-4 h-4 text-yellow-600" />,
    },
    // Add more statuses as needed
  };

  const getStatusProps = (status) => {
    if (!status) {
      return {
        label: "Statut inconnu",
        color: "bg-gray-100 text-gray-800 border-gray-200",
        icon: <AlertCircle className="w-4 h-4 text-gray-600" />,
      };
    }
    return (
      STATUS_MAP[status] || {
        label: status.charAt(0).toUpperCase() + status.slice(1),
        color: "bg-gray-100 text-gray-800 border-gray-200",
        icon: <AlertCircle className="w-4 h-4 text-gray-600" />,
      }
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Chargement...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4 sm:space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-6">
        <h1 className="text-xl sm:text-3xl font-bold text-gray-800">Gestion des Utilisateurs</h1>
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setActiveTab('clients')}
            className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-xs sm:text-base ${
              activeTab === 'clients' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Clients ({users.length})
          </button>

        </div>
      </div>

      {/* Remove conditional, render clients view directly */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Liste des clients */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100"
          >
            {/* Filtres */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher un client..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-black"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-base text-black">
                    <SelectValue placeholder="Tous les statuts" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 text-gray-50 border-gray-800">
                    <SelectItem value="all" className="cursor-pointer focus:bg-purple-600 focus:text-gray-50">
                      Tous les statuts
                    </SelectItem>
                    <SelectItem value="pending" className="cursor-pointer focus:bg-purple-600 focus:text-gray-50">
                      En attente
                    </SelectItem>
                    <SelectItem value="approved" className="cursor-pointer focus:bg-purple-600 focus:text-gray-50">
                      Approuvés
                    </SelectItem>
                    <SelectItem value="rejected" className="cursor-pointer focus:bg-purple-600 focus:text-gray-50">
                      Rejetés
                    </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Liste */}
            <div className="space-y-3 sm:space-y-4">
              {filteredUsers.map((user, index) => {
                const { label, color, icon } = getStatusProps(user.status);
                return (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                          <h3 className="font-medium text-gray-800 text-sm sm:text-base">{user.name}</h3>
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                            {user.company}
                          </span>
                          <div className="flex items-center gap-1">
                            {icon}
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${color}`}>
                              {label}
                            </span>
                          </div>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">{user.projectType}</p>
                        <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">{user.projectName}</p>
                        <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            <span>{user.budget.toLocaleString()}€</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{user.timeline}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(user.submittedAt).toLocaleDateString('fr-FR')}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => navigate(`/admindashboard/users/${user.user_id}/projects/${user.id}`)}
                          className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors text-xs sm:text-base"
                        >
                          <Eye className="w-4 h-4" />
                          <span>Voir</span>
                        </motion.button>
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              disabled={deletingUserId === user.user_id}
                              className="flex items-center gap-2 px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-xs sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Trash2 className="w-4 h-4" />
                              <span>{deletingUserId === user.user_id ? 'Suppression...' : 'Supprimer'}</span>
                            </motion.button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Cette action ne peut pas être annulée. Cela supprimera définitivement l'utilisateur{" "}
                                <strong>{user.name}</strong> et toutes ses données associées.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Annuler</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteUser(user.user_id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Supprimer
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default AdminUsers;