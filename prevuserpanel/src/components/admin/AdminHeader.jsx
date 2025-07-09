import React from 'react';

const AdminHeader = ({ currentUser }) => {
  return (
    <header className="sticky top-0 z-40 hidden md:flex h-20 items-center justify-between gap-4 border-b border-slate-700/60 bg-slate-800/80 backdrop-blur-lg px-6 md:px-8">
      <div>
        <h2 className="text-xl font-semibold text-slate-300">Panneau d'Administration BizzWiz AI</h2>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-slate-400">
          Connecté en tant que : {currentUser?.email || 'Admin'}
        </span>
      </div>
    </header>
  );
};

export default AdminHeader;