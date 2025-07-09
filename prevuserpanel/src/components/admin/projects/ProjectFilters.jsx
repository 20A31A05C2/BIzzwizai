

import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, ListFilter } from 'lucide-react';

const ProjectFilters = ({ searchTerm, setSearchTerm, filterStatus, setFilterStatus, statusOptions }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center">
      <div className="relative w-full sm:flex-grow">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
        <Input
          type="search"
          placeholder="Rechercher (email, statut, budget, ID...)"
          className="pl-10 bg-slate-700 border-slate-600 text-slate-200 focus:border-red-500 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="w-full sm:w-auto">
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-[240px] bg-slate-700 border-slate-600 text-slate-200 focus:border-red-500">
            <ListFilter size={16} className="mr-2 text-slate-400" />
            <SelectValue placeholder="Filtrer par statut" />
          </SelectTrigger>
          <SelectContent className="bg-slate-700 border-slate-600 text-slate-200">
            {statusOptions.map(opt => (
              <SelectItem key={opt.value} value={opt.value} className="hover:bg-slate-600 focus:bg-slate-600">{opt.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ProjectFilters;