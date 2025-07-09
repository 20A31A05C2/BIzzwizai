import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Save, Loader2 } from 'lucide-react';

const ProjectLinksEditor = ({ projectData, setProjectData, isSavingLinks, handleSaveSection }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Card className='bg-slate-700/30 border-slate-600 shadow-lg'>
      <CardHeader className='border-b border-slate-600/70'>
        <CardTitle className='text-lg text-red-300 flex items-center gap-2'>
          Liens
        </CardTitle>
      </CardHeader>
      <CardContent className='p-4'>
        <div className='space-y-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <label htmlFor="figma_url" className='text-slate-300 block'>
                Lien Figma
              </label>
              <Input
                id="figma_url"
                name="figma_url"
                value={projectData.figma_url}
                onChange={handleInputChange}
                className='bg-slate-600 border-slate-500 focus:border-red-400 text-slate-100 placeholder:text-slate-400 w-full'
                placeholder='https://example.com/figma'
              />
            </div>
            <div className='space-y-2'>
              <label htmlFor="payment_url" className='text-slate-300 block'>
                Lien de Paiement
              </label>
              <Input
                id="payment_url"
                name="payment_url"
                value={projectData.payment_url}
                onChange={handleInputChange}
                className='bg-slate-600 border-slate-500 focus:border-red-400 text-slate-100 placeholder:text-slate-400 w-full'
                placeholder='https://example.com/payment'
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectLinksEditor;