import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Loader2, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import ApiService from '@/apiService';
import { useToast } from '@/components/ui/use-toast';

const ProjectActivityEditor = ({ projectActivities, setProjectActivities, projectId }) => {
  const [newActivity, setNewActivity] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [isDeleting, setIsDeleting] = useState({});
  const { toast } = useToast();

  const handleAddActivity = () => {
    if (newActivity.trim() && !isAdding) {
      setIsAdding(true);
      console.log('Attempting to add activity:', newActivity);
      
      const newLog = {
        id: null,
        activity_log: newActivity.trim(),
        actor: 'Admin',
        created_at: new Date().toISOString(),
        tempId: Date.now() + Math.random()
      };
      
      setProjectActivities((prev) => {
        const updatedActivities = [...prev, newLog];
        console.log('Updated activities:', updatedActivities);
        return updatedActivities;
      });
      
      setNewActivity('');
      setIsAdding(false);
    } else {
      console.log('Add failed: newActivity=', newActivity, 'isAdding=', isAdding);
    }
  };

  const handleRemoveActivity = async (activityToRemove) => {
    const identifier = activityToRemove.tempId || activityToRemove.id;
    setIsDeleting((prev) => ({ ...prev, [identifier]: true }));
    
    // If the activity has a tempId and no id, it's not saved to the backend yet, so just remove locally
    if (activityToRemove.tempId && !activityToRemove.id) {
      setProjectActivities((prev) => 
        prev.filter(activity => 
          activity.tempId ? activity.tempId !== activityToRemove.tempId : true
        )
      );
      setIsDeleting((prev) => ({ ...prev, [identifier]: false }));
      toast({
        title: 'Succès',
        description: 'Activité non sauvegardée supprimée.',
        className: 'bg-green-500 text-white'
      });
      return;
    }

    // If the activity has an id, it's saved on the backend, so make an API call
    const token = localStorage.getItem('bizwizusertoken');
    try {
      await ApiService(`/admin/projects/${projectId}/activities/${activityToRemove.id}`, 'DELETE', null, false, token);
      setProjectActivities((prev) => 
        prev.filter(activity => activity.id !== activityToRemove.id)
      );
      toast({
        title: 'Succès',
        description: 'Activité supprimée avec succès.',
        className: 'bg-green-500 text-white'
      });
    } catch (error) {
      console.error('Delete Error:', error.response?.data || error.message);
      toast({
        title: 'Erreur',
        description: error.response?.data?.message || 'Échec de la suppression de l’activité.',
        variant: 'destructive'
      });
    } finally {
      setIsDeleting((prev) => ({ ...prev, [identifier]: false }));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && newActivity.trim() && !isAdding) {
      handleAddActivity();
    }
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString('fr-FR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return dateString;
    }
  };

  return (
    <Card className='bg-slate-700/30 border-slate-600 shadow-lg'>
      <CardHeader className='border-b border-slate-600/70'>
        <CardTitle className='text-lg text-red-300 flex items-center gap-2'>
          Activités Récentes
          {projectActivities.length > 0 && (
            <span className='text-sm text-slate-400'>({projectActivities.length})</span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className='p-4'>
        <div className='space-y-4'>
          <div className='flex gap-2'>
            <Input
              value={newActivity}
              onChange={(e) => setNewActivity(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder='Ajouter une nouvelle activité...'
              className='bg-slate-600 border-slate-500 focus:border-red-400 text-slate-100 placeholder:text-slate-400 flex-1'
            />
            <Button
              onClick={handleAddActivity}
              disabled={isAdding || !newActivity.trim()}
              className='bg-red-500 hover:bg-red-600 text-white'
            >
              {isAdding ? (
                <Loader2 className='h-4 w-4 animate-spin' />
              ) : (
                <Plus className='h-5 w-5 stroke-2' />
              )}
            </Button>
          </div>
          
          <div className='space-y-2'>
            {projectActivities.length === 0 ? (
              <div className='text-center py-8 text-slate-400'>
                <p>Aucune activité pour le moment.</p>
                <p className='text-sm'>Ajoutez une activité ci-dessus pour commencer.</p>
              </div>
            ) : (
              projectActivities.map((activity) => (
                <motion.div
                  key={activity.tempId || activity.id || Math.random()}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='bg-slate-800/50 p-3 rounded border border-slate-600/30 group hover:border-slate-500/50 transition-colors'
                >
                  <div className='flex justify-between items-start gap-2'>
                    <div className='flex-1'>
                      <p className='text-slate-200 mb-1'>{activity.activity_log}</p>
                      <p className='text-xs text-slate-400'>
                        Par {activity.actor} - {formatDate(activity.created_at)}
                        {!activity.id && activity.tempId && (
                          <span className='ml-2 px-1.5 py-0.5 bg-orange-500/20 text-orange-300 rounded text-xs'>
                            Non sauvegardé
                          </span>
                        )}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveActivity(activity)}
                      disabled={isDeleting[activity.tempId || activity.id]}
                      className='opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-300 hover:bg-red-500/10 p-1 h-auto'
                    >
                      {isDeleting[activity.tempId || activity.id] ? (
                        <Loader2 className='h-3 w-3 animate-spin' />
                      ) : (
                        <Trash2 className='h-3 w-3' />
                      )}
                    </Button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
          
          {projectActivities.some(activity => !activity.id && activity.tempId) && (
            <div className='mt-4 p-3 bg-orange-500/10 border border-orange-500/20 rounded'>
              <p className='text-orange-300 text-sm'>
                ⚠️ Vous avez des activités non sauvegardées. Cliquez sur "Sauvegarder" pour les enregistrer.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectActivityEditor;