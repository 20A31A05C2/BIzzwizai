import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { Eye, Pencil, Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProjectRow = React.memo(({ project, onViewSubmission, onStatusUpdate, index, statusOptions }) => {
  const navigate = useNavigate();

  const getStatusLabelAndStyle = (statusValue) => {
    const normalized = statusValue?.toLowerCase().trim();
    const match = statusOptions.find(s => s.value === normalized);

    return match
      ? { label: match.label, style: match.color }
      : { label: statusValue || 'Unknown', style: 'bg-slate-600 text-white' };
  };

  const { label: statusLabel, style: statusStyle } = useMemo(() => getStatusLabelAndStyle(project.status), [project.status, statusOptions]);
  const displayId = typeof project.id === 'number' ? project.id.toString() : project.id;
  const displayBudget = typeof project.budget === 'number'
    ? `${project.budget.toFixed(2)}€`
    : project.budget || '-';

  const handleEdit = () => {
    navigate(`/app-admin/projets/${project.id}/edit`);
  };

  const handleAccept = () => {
    onStatusUpdate(project.id, 'accepted');
  };

  const handleReject = () => {
    onStatusUpdate(project.id, 'rejected');
  };

  return (
    <motion.tr
      key={project.id}
      className="border-slate-700 hover:bg-slate-750/50 transition-colors"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.03 }}
    >
      <TableCell className="font-mono text-xs text-slate-400">{displayId}</TableCell>
      <TableCell className="text-slate-300">
        <div>
          <div>{project.email}</div>
          <div className="text-xs text-slate-500">{project.fullname}</div>
        </div>
      </TableCell>
      <TableCell className="text-slate-300">{displayBudget}</TableCell>
      <TableCell>
        <span className={`text-sm px-2 py-1 rounded-full ${statusStyle}`}>
          {statusLabel}
        </span>
      </TableCell>
      <TableCell className="text-slate-400">{project.timing || '-'}</TableCell>
      <TableCell className="text-right">
        <Button
          variant="ghost"
          size="icon"
          className="text-green-400 hover:text-green-300 hover:bg-green-500/20 rounded-full mr-1"
          onClick={() => onViewSubmission(project)}
        >
          <Eye size={18} />
        </Button>
        {project.status !== 'rejected' && (
          <Button
            variant="ghost"
            size="icon"
            className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 rounded-full mr-1"
            onClick={handleEdit}
          >
            <Pencil size={18} />
          </Button>
        )}
        {project.status === 'pending' && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="text-teal-400 hover:text-teal-300 hover:bg-teal-500/20 rounded-full mr-1"
              onClick={handleAccept}
            >
              <Check size={18} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-full"
              onClick={handleReject}
            >
              <X size={18} />
            </Button>
          </>
        )}
      </TableCell>
    </motion.tr>
  );
});

export default ProjectRow;