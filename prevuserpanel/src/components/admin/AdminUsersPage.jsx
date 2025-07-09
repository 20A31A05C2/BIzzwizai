// import React, { useState, useEffect, useCallback } from 'react';
// import { motion } from 'framer-motion';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogFooter,
//   DialogTitle,
//   DialogDescription,
//   DialogClose,
// } from '@/components/ui/dialog';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Label } from '@/components/ui/label';
// import { useToast } from '@/components/ui/use-toast';
// import { Users,Search, Edit3, Trash2, Loader2, Filter } from 'lucide-react';
// import ApiService from '@/apiService';

// const AdminUsersPage = () => {
//   const [users, setUsers] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterRole, setFilterRole] = useState('all');
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [editFormData, setEditFormData] = useState({ id: '', email: '', role: '', full_name: '' });
//   const [userToDelete, setUserToDelete] = useState(null);

//   const { toast } = useToast();

//   const fetchUsers = useCallback(async () => {
//     setIsLoading(true);
//     try {
//       const token = localStorage.getItem('bizwizusertoken');
//       const response = await ApiService('/users', 'GET', null, false, token);

//       const enrichedUsers = response.data.map(user => ({
//         ...user,
//         role: user.role === 'admin' ? 'Admin' : 'Membre',
//         full_name: user.fullname || 'N/A',
//         status: 'Actif',
//       }));

//       let filteredUsers = enrichedUsers;

//       if (searchTerm) {
//         const lowerSearchTerm = searchTerm.toLowerCase();
//         filteredUsers = filteredUsers.filter(user =>
//           user.email?.toLowerCase().includes(lowerSearchTerm) ||
//           user.full_name.toLowerCase().includes(lowerSearchTerm)
//         );
//       }

//       if (filterRole && filterRole !== 'all') {
//         filteredUsers = filteredUsers.filter(user => user.role === filterRole);
//       }

//       setUsers(filteredUsers);
//     } catch (error) {
//       setUsers([]);
//       toast({
//         title: 'Erreur',
//         description: error.response?.data?.message || 'Impossible de charger les utilisateurs.',
//         variant: 'destructive',
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   }, [searchTerm, filterRole, toast]);

//   useEffect(() => {
//     fetchUsers();
//   }, [fetchUsers]);

//   const handleEditUser = (user) => {
//     setSelectedUser(user);
//     setEditFormData({
//       id: user.id,
//       email: user.email || '',
//       role: user.role || '',
//       full_name: user.full_name || '',
//     });
//     setIsEditModalOpen(true);
//   };

//   const handleEditFormChange = (e) => {
//     const { name, value } = e.target;
//     setEditFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleRoleChange = (value) => {
//     setEditFormData(prev => ({ ...prev, role: value }));
//   };

//   const handleSubmitEdit = async () => {
//     if (!selectedUser) return;

//     // Client-side validation
//     if (!editFormData.email || !editFormData.role || !editFormData.full_name) {
//       toast({
//         title: 'Erreur',
//         description: 'Veuillez remplir tous les champs requis (email, rôle, nom complet).',
//         variant: 'destructive',
//       });
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       const token = localStorage.getItem('bizwizusertoken');
//       const payload = {
//         email: editFormData.email,
//         role: editFormData.role === 'Admin' ? 'admin' : 'user',
//         full_name: editFormData.full_name,
//       };
//       const response = await ApiService(`/users/${selectedUser.id}`, 'PUT', payload, false, token);

//       toast({
//         title: 'Succès',
//         description: response.message || 'Utilisateur mis à jour.',
//         className: 'bg-green-500 text-white',
//       });
//       fetchUsers();
//       setIsEditModalOpen(false);
//     } catch (error) {
//       const errorMessage = error.response?.data?.errors
//         ? Object.values(error.response.data.errors).flat().join(', ')
//         : error.response?.data?.message || 'Échec de la mise à jour de l’utilisateur.';
//       toast({
//         title: 'Erreur',
//         description: errorMessage,
//         variant: 'destructive',
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleDeleteUser = (userId) => {
//     setUserToDelete(userId);
//     setIsDeleteModalOpen(true);
//   };

//   const confirmDelete = async () => {
//     if (!userToDelete) return;
//     setIsSubmitting(true);
//     try {
//       const token = localStorage.getItem('bizwizusertoken');
//       await ApiService(`/users/${userToDelete}`, 'DELETE', null, false, token);

//       toast({
//         title: 'Succès',
//         description: 'Utilisateur supprimé.',
//         className: 'bg-green-500 text-white',
//       });
//       fetchUsers();
//     } catch (error) {
//       toast({
//         title: 'Erreur',
//         description: error.response?.data?.message || 'Échec de la suppression de l’utilisateur.',
//         variant: 'destructive',
//       });
//     } finally {
//       setIsSubmitting(false);
//       setIsDeleteModalOpen(false);
//       setUserToDelete(null);
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
//   };

//   return (
    
//     <motion.div
//       className="space-y-8"
//       initial="hidden"
//       animate="visible"
//       variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
//     >
//       <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//         <div>
//           <h1 className="text-3xl font-bold text-slate-100 flex items-center">
//             <Users size={32} className="mr-3 text-red-500" />
//             Gestion des Utilisateurs
//           </h1>
//           <p className="text-slate-400 mt-1">Administrez les comptes utilisateurs de la plateforme.</p>
//         </div>
//       </motion.div>
//       <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 items-center">
//         <div className="relative w-full sm:flex-grow">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
//           <Input
//             type="search"
//             placeholder="Rechercher par email ou nom..."
//             className="pl-10 bg-slate-700 border-slate-600 text-slate-200 focus:border-red-500 w-full"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//         <div className="w-full sm:w-auto">
//           <Select value={filterRole} onValueChange={setFilterRole}>
//             <SelectTrigger className="w-full sm:w-[200px] bg-slate-700 border-slate-600 text-slate-200 focus:border-red-500">
//               <Filter size={16} className="mr-2 text-slate-400" />
//               <SelectValue placeholder="Filtrer par rôle" />
//             </SelectTrigger>
//             <SelectContent className="bg-slate-700 border-slate-600 text-slate-200">
//               <SelectItem value="all" className="hover:bg-slate-600 focus:bg-slate-600">Tous les rôles</SelectItem>
//               <SelectItem value="Admin" className="hover:bg-slate-600 focus:bg-slate-600">Admin</SelectItem>
//               <SelectItem value="Membre" className="hover:bg-slate-600 focus:bg-slate-600">Membre</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </motion.div>

//       <motion.div variants={itemVariants}>
//         <Card className="bg-slate-800/70 border-slate-700">
//           <CardHeader>
//             <CardTitle className="text-xl text-slate-200">Liste des Utilisateurs</CardTitle>
//             <CardDescription className="text-slate-400">Actuellement {users.length} utilisateur(s) trouvé(s).</CardDescription>
//           </CardHeader>
//           <CardContent className="overflow-x-auto scrollbar-thin scrollbar-thumb-red-500/50 scrollbar-track-slate-700/50">
//             {isLoading ? (
//               <div className="flex justify-center items-center py-10">
//                 <Loader2 className="h-8 w-8 animate-spin text-red-500" />
//                 <p className="ml-3 text-slate-300">Chargement des utilisateurs...</p>
//               </div>
//             ) : users.length === 0 ? (
//               <p className="text-center py-6 text-slate-400">Aucun utilisateur trouvé pour les critères actuels.</p>
//             ) : (
//               <Table className="min-w-full">
//                 <TableHeader>
//                   <TableRow className="border-slate-700 hover:bg-slate-700/30">
//                     <TableHead className="text-slate-300 font-semibold">Nom Complet</TableHead>
//                     <TableHead className="text-slate-300 font-semibold">Email</TableHead>
//                     <TableHead className="text-slate-300 font-semibold">Rôle</TableHead>
//                     <TableHead className="text-slate-300 font-semibold">Statut</TableHead>
//                     <TableHead className="text-slate-300 font-semibold">Inscrit le</TableHead>
//                     <TableHead className="text-right text-slate-300 font-semibold">Actions</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {users.map((user, index) => (
//                     <motion.tr
//                       key={user.id}
//                       className="border-slate-700 hover:bg-slate-750/50 transition-colors"
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       transition={{ delay: index * 0.05 + 0.2 }}
//                     >
//                       <TableCell className="text-slate-200">{user.full_name}</TableCell>
//                       <TableCell className="text-slate-200">{user.email}</TableCell>
//                       <TableCell className="text-slate-300">
//                         <span className={`px-2 py-0.5 text-xs rounded-full ${user.role === 'Admin' ? 'bg-red-500/30 text-red-300' : 'bg-sky-500/30 text-sky-300'}`}>
//                           {user.role}
//                         </span>
//                       </TableCell>
//                       <TableCell>
//                         <span className={`px-2 py-0.5 text-xs rounded-full ${user.status === 'Actif' ? 'bg-green-500/30 text-green-300' : 'bg-yellow-500/30 text-yellow-300'}`}>
//                           {user.status}
//                         </span>
//                       </TableCell>
//                       <TableCell className="text-slate-400">{new Date(user.created_at).toLocaleDateString()}</TableCell>
//                       <TableCell className="text-right">
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           className="text-sky-400 hover:text-sky-300 hover:bg-sky-500/20 rounded-full"
//                           onClick={() => handleEditUser(user)}
//                         >
//                           <Edit3 size={18} />
//                         </Button>
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           className="text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-full ml-1"
//                           onClick={() => handleDeleteUser(user.id)}
//                           disabled={isSubmitting}
//                         >
//                           <Trash2 size={18} />
//                         </Button>
//                       </TableCell>
//                     </motion.tr>
//                   ))}
//                 </TableBody>
//               </Table>
//             )}
//           </CardContent>
//         </Card>
//       </motion.div>

//       <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
//         <DialogContent className="bg-slate-800 border-slate-700 text-slate-100 sm:max-w-lg">
//           <DialogHeader>
//             <DialogTitle className="text-2xl text-red-400">Modifier l'Utilisateur</DialogTitle>
//             <DialogDescription className="text-slate-400">
//               Modification de {selectedUser?.email || ''}
//             </DialogDescription>
//           </DialogHeader>
//           <div className="space-y-4 py-4">
//             <div>
//               <Label htmlFor="edit_email" className="text-slate-300">Email</Label>
//               <Input
//                 id="edit_email"
//                 name="email"
//                 value={editFormData.email}
//                 onChange={handleEditFormChange}
//                 className="mt-1 bg-slate-700 border-slate-600 text-slate-200 focus:border-red-500"
//               />
//             </div>
//             <div>
//               <Label htmlFor="edit_full_name" className="text-slate-300">Nom Complet</Label>
//               <Input
//                 id="edit_full_name"
//                 name="full_name"
//                 value={editFormData.full_name}
//                 onChange={handleEditFormChange}
//                 className="mt-1 bg-slate-700 border-slate-600 text-slate-200 focus:border-red-500"
//               />
//             </div>
//             <div>
//               <Label htmlFor="edit_role" className="text-slate-300">Rôle</Label>
//               <Select value={editFormData.role} onValueChange={handleRoleChange}>
//                 <SelectTrigger id="edit_role" className="w-full bg-slate-700 border-slate-600 text-slate-200 focus:border-red-500 mt-1">
//                   <SelectValue placeholder="Choisir un rôle" />
//                 </SelectTrigger>
//                 <SelectContent className="bg-slate-700 border-slate-600 text-slate-200">
//                   <SelectItem value="Admin" className="hover:bg-slate-600 focus:bg-slate-600">Admin</SelectItem>
//                   <SelectItem value="Membre" className="hover:bg-slate-600 focus:bg-slate-600">Membre</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//           <DialogFooter>
//             <DialogClose asChild>
//               <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">Annuler</Button>
//             </DialogClose>
//             <Button
//               onClick={handleSubmitEdit}
//               disabled={isSubmitting}
//               className="bg-red-500 hover:bg-red-600 text-white"
//             >
//               {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
//               Sauvegarder
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
//         <DialogContent className="bg-slate-800 border-slate-700 text-slate-100 sm:max-w-md">
//           <DialogHeader>
//             <DialogTitle className="text-2xl text-red-400">Confirmer la Suppression</DialogTitle>
//             <DialogDescription className="text-slate-400">
//               Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.
//             </DialogDescription>
//           </DialogHeader>
//           <DialogFooter>
//             <DialogClose asChild>
//               <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">Annuler</Button>
//             </DialogClose>
//             <Button
//               onClick={confirmDelete}
//               disabled={isSubmitting}
//               className="bg-red-500 hover:bg-red-600 text-white"
//             >
//               {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
//               Oui, Supprimer
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </motion.div>
//   );
// };

// export default AdminUsersPage;



import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Users, Search, Edit3, Trash2, Loader2, Filter } from 'lucide-react';
import ApiService from '@/apiService';

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editFormData, setEditFormData] = useState({ id: '', email: '', role: '', full_name: '' });
  const [userToDelete, setUserToDelete] = useState(null);

  const { toast } = useToast();

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('bizwizusertoken');
      const response = await ApiService('/users', 'GET', null, false, token);

      const enrichedUsers = response.data.map(user => ({
        ...user,
        role: user.role === 'admin' ? 'Admin' : 'Membre',
        full_name: user.fullname || 'N/A',
        status: 'Actif',
      }));

      let filteredUsers = enrichedUsers;

      if (searchTerm) {
        const lowerSearchTerm = searchTerm.toLowerCase();
        filteredUsers = filteredUsers.filter(user =>
          user.email?.toLowerCase().includes(lowerSearchTerm) ||
          user.full_name.toLowerCase().includes(lowerSearchTerm)
        );
      }

      if (filterRole && filterRole !== 'all') {
        filteredUsers = filteredUsers.filter(user => user.role === filterRole);
      }

      setUsers(filteredUsers);
    } catch (error) {
      setUsers([]);
      toast({
        title: 'Erreur',
        description: error.response?.data?.message || 'Impossible de charger les utilisateurs.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, filterRole, toast]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setEditFormData({
      id: user.id,
      email: user.email || '',
      role: user.role || '',
      full_name: user.full_name || '',
    });
    setIsEditModalOpen(true);
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value) => {
    setEditFormData(prev => ({ ...prev, role: value }));
  };

  const handleSubmitEdit = async () => {
    if (!selectedUser) return;

    // Client-side validation
    if (!editFormData.email || !editFormData.role || !editFormData.full_name) {
      toast({
        title: 'Erreur',
        description: 'Veuillez remplir tous les champs requis (email, rôle, nom complet).',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('bizwizusertoken');
      const payload = {
        email: editFormData.email,
        role: editFormData.role === 'Admin' ? 'admin' : 'user',
        full_name: editFormData.full_name,
      };
      const response = await ApiService(`/users/${selectedUser.id}`, 'PUT', payload, false, token);

      toast({
        title: 'Succès',
        description: response.message || 'Utilisateur mis à jour.',
        className: 'bg-green-500 text-white',
      });
      fetchUsers();
      setIsEditModalOpen(false);
      setSelectedUser(null);
    } catch (error) {
      const errorMessage = error.response?.data?.errors
        ? Object.values(error.response.data.errors).flat().join(', ')
        : error.response?.data?.message || "Échec de la mise à jour de l'utilisateur.";
      toast({
        title: 'Erreur',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteUser = (userId) => {
    setUserToDelete(userId);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('bizwizusertoken');
      await ApiService(`/users/${userToDelete}`, 'DELETE', null, false, token);

      toast({
        title: 'Succès',
        description: 'Utilisateur supprimé.',
        className: 'bg-green-500 text-white',
      });
      fetchUsers();
    } catch (error) {
      toast({
        title: 'Erreur',
        description: error.response?.data?.message || "Échec de la suppression de l'utilisateur.",
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
    }
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedUser(null);
    setEditFormData({ id: '', email: '', role: '', full_name: '' });
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <motion.div
      className="space-y-8"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
    >
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 flex items-center">
            <Users size={32} className="mr-3 text-red-500" />
            Gestion des Utilisateurs
          </h1>
          <p className="text-slate-400 mt-1">Administrez les comptes utilisateurs de la plateforme.</p>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative w-full sm:flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <Input
            type="search"
            placeholder="Rechercher par email ou nom..."
            className="pl-10 bg-slate-700 border-slate-600 text-slate-200 focus:border-red-500 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-auto">
          <Select value={filterRole} onValueChange={setFilterRole}>
            <SelectTrigger className="w-full sm:w-[200px] bg-slate-700 border-slate-600 text-slate-200 focus:border-red-500">
              <Filter size={16} className="mr-2 text-slate-400" />
              <SelectValue placeholder="Filtrer par rôle" />
            </SelectTrigger>
            <SelectContent className="bg-slate-700 border-slate-600 text-slate-200">
              <SelectItem value="all" className="hover:bg-slate-600 focus:bg-slate-600">Tous les rôles</SelectItem>
              <SelectItem value="Admin" className="hover:bg-slate-600 focus:bg-slate-600">Admin</SelectItem>
              <SelectItem value="Membre" className="hover:bg-slate-600 focus:bg-slate-600">Membre</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="bg-slate-800/70 border-slate-700">
          <CardHeader>
            <CardTitle className="text-xl text-slate-200">Liste des Utilisateurs</CardTitle>
            <CardDescription className="text-slate-400">Actuellement {users.length} utilisateur(s) trouvé(s).</CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto scrollbar-thin scrollbar-thumb-red-500/50 scrollbar-track-slate-700/50">
            {isLoading ? (
              <div className="flex justify-center items-center py-10">
                <Loader2 className="h-8 w-8 animate-spin text-red-500" />
                <p className="ml-3 text-slate-300">Chargement des utilisateurs...</p>
              </div>
            ) : users.length === 0 ? (
              <p className="text-center py-6 text-slate-400">Aucun utilisateur trouvé pour les critères actuels.</p>
            ) : (
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow className="border-slate-700 hover:bg-slate-700/30">
                    <TableHead className="text-slate-300 font-semibold">Nom Complet</TableHead>
                    <TableHead className="text-slate-300 font-semibold">Email</TableHead>
                    <TableHead className="text-slate-300 font-semibold">Rôle</TableHead>
                    <TableHead className="text-slate-300 font-semibold">Statut</TableHead>
                    <TableHead className="text-slate-300 font-semibold">Inscrit le</TableHead>
                    <TableHead className="text-right text-slate-300 font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user, index) => (
                    <TableRow
                      key={`user-${user.id}-${index}`}
                      className="border-slate-700 hover:bg-slate-750/50 transition-colors"
                    >
                      <TableCell className="text-slate-200">{user.full_name}</TableCell>
                      <TableCell className="text-slate-200">{user.email}</TableCell>
                      <TableCell className="text-slate-300">
                        <span className={`px-2 py-0.5 text-xs rounded-full ${user.role === 'Admin' ? 'bg-red-500/30 text-red-300' : 'bg-sky-500/30 text-sky-300'}`}>
                          {user.role}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${user.status === 'Actif' ? 'bg-green-500/30 text-green-300' : 'bg-yellow-500/30 text-yellow-300'}`}>
                          {user.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-slate-400">{new Date(user.created_at).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-sky-400 hover:text-sky-300 hover:bg-sky-500/20 rounded-full"
                          onClick={() => handleEditUser(user)}
                        >
                          <Edit3 size={18} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-full ml-1"
                          onClick={() => handleDeleteUser(user.id)}
                          disabled={isSubmitting}
                        >
                          <Trash2 size={18} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <Dialog open={isEditModalOpen} onOpenChange={handleCloseEditModal}>
        <DialogContent className="bg-slate-800 border-slate-700 text-slate-100 sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl text-red-400">Modifier l'Utilisateur</DialogTitle>
            <DialogDescription className="text-slate-400">
              Modification de {selectedUser?.email || ''}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="edit_email" className="text-slate-300">Email</Label>
              <Input
                id="edit_email"
                name="email"
                value={editFormData.email}
                onChange={handleEditFormChange}
                className="mt-1 bg-slate-700 border-slate-600 text-slate-200 focus:border-red-500"
              />
            </div>
            <div>
              <Label htmlFor="edit_full_name" className="text-slate-300">Nom Complet</Label>
              <Input
                id="edit_full_name"
                name="full_name"
                value={editFormData.full_name}
                onChange={handleEditFormChange}
                className="mt-1 bg-slate-700 border-slate-600 text-slate-200 focus:border-red-500"
              />
            </div>
            <div>
              <Label htmlFor="edit_role" className="text-slate-300">Rôle</Label>
              <Select value={editFormData.role} onValueChange={handleRoleChange}>
                <SelectTrigger id="edit_role" className="w-full bg-slate-700 border-slate-600 text-slate-200 focus:border-red-500 mt-1">
                  <SelectValue placeholder="Choisir un rôle" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600 text-slate-200">
                  <SelectItem value="Admin" className="hover:bg-slate-600 focus:bg-slate-600">Admin</SelectItem>
                  <SelectItem value="Membre" className="hover:bg-slate-600 focus:bg-slate-600">Membre</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
              onClick={handleCloseEditModal}
            >
              Annuler
            </Button>
            <Button
              onClick={handleSubmitEdit}
              disabled={isSubmitting}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Sauvegarder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteModalOpen} onOpenChange={handleCloseDeleteModal}>
        <DialogContent className="bg-slate-800 border-slate-700 text-slate-100 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl text-red-400">Confirmer la Suppression</DialogTitle>
            <DialogDescription className="text-slate-400">
              Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
              onClick={handleCloseDeleteModal}
            >
              Annuler
            </Button>
            <Button
              onClick={confirmDelete}
              disabled={isSubmitting}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Oui, Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default AdminUsersPage;