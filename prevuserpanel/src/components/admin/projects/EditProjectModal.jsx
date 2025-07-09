import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, PackageCheck, Link as LinkIconLucide, CircleDollarSign, StickyNote, Info, MessageSquare, Edit3, Settings2 } from 'lucide-react'; // Renamed Link to LinkIconLucide
import { statusOptions } from '../AdminProjectListPage';
import { Link as RouterLink } from 'react-router-dom'; // Renamed Link to RouterLink

const EditProjectModal = ({ project, isOpen, onClose, onSubmit, isSubmitting, editData, onEditDataChange, onStatusChange }) => {
    if (!project) return null;
    
    const currentStatusInfo = statusOptions.find(s => s.value === editData.status) || { label: editData.status, color: 'bg-gray-500/30 text-gray-300' };
    const isDashboardSetupStage = project.status === 'pending_dashboard_setup';

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-slate-800 border-slate-700 text-slate-100 sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-2xl text-red-400 flex items-center">
                         {isDashboardSetupStage ? <Settings2 size={28} className="mr-2 text-purple-400"/> : null}
                        Modifier le Projet (Base)
                    </DialogTitle>
                    <DialogDescription className="text-slate-400">
                        Projet ID: {project.id.substring(0,8)}... pour {project.users?.email || 'Utilisateur inconnu'}
                        <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${currentStatusInfo.color}`}>
                            {currentStatusInfo.label}
                        </span>
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4 max-h-[70vh] overflow-y-auto pr-3 scrollbar-thin scrollbar-thumb-red-500/60 scrollbar-track-slate-700">
                    <Card className="bg-slate-700/30 border-slate-600">
                        <CardHeader><CardTitle className="text-lg text-red-300 flex items-center"><Info size={18} className="mr-2"/>Détails & Devis</CardTitle></CardHeader>
                        <CardContent className="space-y-3">
                            <div>
                                <Label htmlFor="status" className="text-slate-300"><PackageCheck size={16} className="inline mr-2"/>Statut</Label>
                                <Select value={editData.status} onValueChange={onStatusChange}>
                                    <SelectTrigger id="status" className="w-full bg-slate-700 border-slate-600 text-slate-200 focus:border-red-500 mt-1">
                                        <SelectValue placeholder="Choisir un statut" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-slate-700 border-slate-600 text-slate-200">
                                        {statusOptions.filter(opt => opt.value !== 'all').map(opt => (
                                            <SelectItem key={opt.value} value={opt.value} className="hover:bg-slate-600 focus:bg-slate-600">{opt.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="mockup_link" className="text-slate-300"><LinkIconLucide size={16} className="inline mr-2"/>Lien de la Maquette</Label>
                                <Input id="mockup_link" name="mockup_link" value={editData.mockup_link} onChange={onEditDataChange} placeholder="https://figma.com/..." className="mt-1 bg-slate-700 border-slate-600 text-slate-200 focus:border-red-500"/>
                            </div>
                            <div>
                                <Label htmlFor="project_price" className="text-slate-300"><CircleDollarSign size={16} className="inline mr-2"/>Prix du Projet (€)</Label>
                                <Input id="project_price" name="project_price" type="number" step="0.01" value={editData.project_price} onChange={onEditDataChange} placeholder="1500.00" className="mt-1 bg-slate-700 border-slate-600 text-slate-200 focus:border-red-500"/>
                            </div>
                            <div>
                                <Label htmlFor="admin_notes" className="text-slate-300"><StickyNote size={16} className="inline mr-2"/>Notes Administrateur</Label>
                                <Textarea id="admin_notes" name="admin_notes" value={editData.admin_notes} onChange={onEditDataChange} placeholder="Notes internes sur le projet..." className="mt-1 bg-slate-700 border-slate-600 text-slate-200 focus:border-red-500 min-h-[80px]"/>
                            </div>
                        </CardContent>
                    </Card>

                    <Button asChild variant="outline" className="w-full border-purple-500 text-purple-300 hover:bg-purple-500/10 hover:text-purple-200 py-3 text-base">
                        <RouterLink to={`/adminpage/projets/${project.id}/edit`} onClick={onClose}>
                            <Edit3 size={20} className="mr-2"/> Éditer Dashboard & Détails Avancés
                        </RouterLink>
                    </Button>

                     {project.user_feedback && (
                        <div className="p-3 bg-pink-500/10 rounded-md border border-pink-500/30">
                            <h4 className="text-sm font-semibold text-pink-400 mb-1 flex items-center"><MessageSquare size={16} className="mr-2"/>Feedback de l'utilisateur :</h4>
                            <p className="text-xs text-slate-300 whitespace-pre-wrap">{project.user_feedback}</p>
                        </div>
                    )}
                </div>
                <DialogFooter className="mt-2">
                    <DialogClose asChild>
                        <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">Annuler</Button>
                    </DialogClose>
                    <Button 
                        onClick={onSubmit} 
                        disabled={isSubmitting} 
                        className="bg-red-500 hover:bg-red-600 text-white"
                    >
                        {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Sauvegarder Changements de Base
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EditProjectModal;



