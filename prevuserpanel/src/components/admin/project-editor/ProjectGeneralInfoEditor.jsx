import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Info, DollarSign, CalendarDays, Percent } from 'lucide-react';
import { statusOptions } from '@/utils/constants'; // Import from constants

const ProjectGeneralInfoEditor = ({ projectData, setProjectData, originalFormAnswers }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;
    if (name === 'project_price') {
      processedValue = value ? Math.max(0, parseFloat(value)) : '';
    }
    if (name === 'progress') {
      processedValue = value ? Math.min(100, Math.max(0, parseInt(value, 10))) : '';
    }
    setProjectData((prev) => ({ ...prev, [name]: processedValue }));
  };

  const handleStatusChange = (value) => {
    setProjectData((prev) => ({ ...prev, status: value }));
  };

  return (
    <Card className='bg-slate-700/30 border-slate-600 shadow-lg'>
      <CardHeader className='border-b border-slate-600/70'>
        <CardTitle className='text-lg text-red-300 flex items-center gap-2'>
          <Info className='h-5 w-5 stroke-2' />
          Informations Générales du Projet
        </CardTitle>
        {originalFormAnswers?.projectDescription?.value && (
          <CardDescription
            className='text-slate-400 pt-2 truncate max-w-[600px]'
            title={originalFormAnswers.projectDescription.value}
          >
            Basé sur la soumission : "{originalFormAnswers.projectDescription.value}"
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4 md:p-6'>
        <div className='space-y-2'>
          <Label htmlFor='projectName' className='text-slate-300 flex items-center gap-1.5'>
            Nom du Projet
          </Label>
          <Input
            id='projectName'
            name='name'
            value={projectData.name || ''}
            onChange={handleInputChange}
            placeholder='Ex: Plateforme E-commerce XYZ'
            className='bg-slate-600 border-slate-500 focus:border-red-400 text-slate-100 placeholder:text-slate-400'
          />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='projectStatus' className='text-slate-300 flex items-center gap-1.5'>
            Statut du Projet
          </Label>
          <Select value={projectData.status || ''} onValueChange={handleStatusChange}>
            <SelectTrigger
              id='projectStatus'
              className='bg-slate-600 border-slate-500 focus:border-red-400 text-slate-100'
              aria-label='Statut du Projet'
            >
              <SelectValue placeholder='Sélectionner un statut' />
            </SelectTrigger>
            <SelectContent className='bg-slate-700 border-slate-600 text-slate-200 max-h-60'>
              {statusOptions
                .filter((opt) => opt.value !== 'all')
                .map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className='focus:bg-red-500/30'
                  >
                    {option.label}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        <div className='space-y-2 md:col-span-2'>
          <Label htmlFor='projectDescription' className='text-slate-300 flex items-center gap-1.5'>
            Description du Projet
          </Label>
          <Textarea
            id='projectDescription'
            name='description'
            value={projectData.description || ''}
            onChange={handleInputChange}
            placeholder='Description détaillée du projet...'
            className='bg-slate-600 border-slate-500 min-h-[120px] focus:border-red-400 text-slate-100 placeholder:text-slate-400'
          />
        </div>
        <div className='space-y-2'>
          <Label
            htmlFor='projectPrice'
            className='text-slate-300 flex items-center gap-1.5'
          >
            <DollarSign className='h-4 w-4 stroke-2' />
            Prix du Projet (€)
          </Label>
          <Input
            id='projectPrice'
            name='project_price'
            type='number'
            min='0'
            step='0.01'
            value={projectData.project_price || ''}
            onChange={handleInputChange}
            placeholder='Ex: 2500'
            className='bg-slate-600 border-slate-500 focus:border-red-400 text-slate-100 placeholder:text-slate-400'
          />
        </div>
        <div className='space-y-2'>
          <Label
            htmlFor='projectProgress'
            className='text-slate-300 flex items-center gap-1.5'
          >
            <Percent className='h-4 w-4 stroke-2' />
            Progression (%)
          </Label>
          <Input
            id='projectProgress'
            name='progress'
            type='number'
            min='0'
            max='100'
            step='1'
            value={projectData.progress || ''}
            onChange={handleInputChange}
            placeholder='Ex: 25'
            className='bg-slate-600 border-slate-500 focus:border-red-400 text-slate-100 placeholder:text-slate-400'
          />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='startDate' className='text-slate-300 flex items-center gap-1.5'>
            <CalendarDays className='h-4 w-4 stroke-2' />
            Date de Début
          </Label>
          <Input
            id='startDate'
            name='start_date'
            type='date'
            value={projectData.start_date || ''}
            onChange={handleInputChange}
            className='bg-slate-600 border-slate-500 focus:border-red-400 text-slate-100'
          />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='endDate' className='text-slate-300 flex items-center gap-1.5'>
            <CalendarDays className='h-4 w-4 stroke-2' />
            Date de Fin Prévue
          </Label>
          <Input
            id='endDate'
            name='end_date'
            type='date'
            value={projectData.end_date || ''}
            onChange={handleInputChange}
            className='bg-slate-600 border-slate-500 focus:border-red-400 text-slate-100'
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectGeneralInfoEditor;