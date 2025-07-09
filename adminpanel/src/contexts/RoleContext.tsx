import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserRole } from '../types';

interface RoleContextType {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  isAdmin: boolean;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>('admin');
  const isAdmin = currentRole === 'admin';

  return (
    <RoleContext.Provider value={{ currentRole, setCurrentRole, isAdmin }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};