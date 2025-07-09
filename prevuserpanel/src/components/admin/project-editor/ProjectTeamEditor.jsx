import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Users, PlusCircle, Trash2, UserPlus } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

const ProjectTeamEditor = ({ projectTeamMembers, setProjectTeamMembers, projectId }) => {
  const [newTeamMemberName, setNewTeamMemberName] = useState('');
  const [newTeamMemberRole, setNewTeamMemberRole] = useState('');

  const handleAddTeamMember = () => {
    if (!newTeamMemberName.trim() || !projectId) return;
    setProjectTeamMembers([...projectTeamMembers, { id: uuidv4(), project_id: projectId, member_name: newTeamMemberName, member_role: newTeamMemberRole || 'Membre' }]);
    setNewTeamMemberName('');
    setNewTeamMemberRole('');
  };

  const handleTeamMemberChange = (id, field, value) => setProjectTeamMembers(projectTeamMembers.map(item => item.id === id ? { ...item, [field]: value } : item));
  const handleRemoveTeamMember = (id) => setProjectTeamMembers(projectTeamMembers.filter(item => item.id !== id));

  return (
    <Card className="bg-slate-700/30 border-slate-600">
      <CardHeader>
        <CardTitle className="text-lg text-red-300 flex items-center">
          <Users size={18} className="mr-2" /> Équipe du Projet
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {projectTeamMembers.map((member, index) => (
          <div key={member.id} className="p-3 border border-slate-600 rounded-md space-y-2">
            <div className="flex justify-between items-center">
              <h4 className="font-medium text-slate-300">Membre {index + 1}</h4>
              <Button variant="ghost" size="icon" onClick={() => handleRemoveTeamMember(member.id)} className="text-red-400 hover:bg-red-500/10">
                <Trash2 size={16} />
              </Button>
            </div>
            <Input placeholder="Nom du membre" value={member.member_name} onChange={(e) => handleTeamMemberChange(member.id, 'member_name', e.target.value)} className="bg-slate-650 border-slate-500" />
            <Input placeholder="Rôle" value={member.member_role} onChange={(e) => handleTeamMemberChange(member.id, 'member_role', e.target.value)} className="bg-slate-650 border-slate-500" />
          </div>
        ))}
        <div className="flex gap-2 items-end">
          <Input placeholder="Nom du nouveau membre" value={newTeamMemberName} onChange={(e) => setNewTeamMemberName(e.target.value)} className="bg-slate-650 border-slate-500" />
          <Input placeholder="Rôle" value={newTeamMemberRole} onChange={(e) => setNewTeamMemberRole(e.target.value)} className="bg-slate-650 border-slate-500" />
          <Button onClick={handleAddTeamMember} className="bg-red-500/80 hover:bg-red-600 whitespace-nowrap">
            <UserPlus size={16} className="mr-2" />Ajouter Membre
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectTeamEditor;