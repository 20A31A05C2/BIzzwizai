import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Search, ChevronDown } from 'lucide-react';
import { useRole } from '../../contexts/RoleContext';
import { UserRole } from '../../types';

const Header: React.FC = () => {
  const { currentRole, setCurrentRole } = useRole();

  const roles: { value: UserRole; label: string; color: string }[] = [
    { value: 'admin', label: '👑 Admin', color: 'from-purple-600 to-indigo-600' },
    { value: 'chef', label: '🧑‍💼 Team Leader', color: 'from-blue-600 to-cyan-600' },
    { value: 'member', label: '💻 Team Member', color: 'from-green-600 to-teal-600' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="bg-white shadow-sm border-b border-gray-100 px-6 py-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-64 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <select
              value={currentRole}
              onChange={(e) => setCurrentRole(e.target.value as UserRole)}
              className="appearance-none bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-xl font-medium shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-300 cursor-pointer"
            >
              {roles.map((role) => (
                <option key={role.value} value={role.value} className="bg-white text-gray-800">
                  {role.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-white pointer-events-none" />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-xl transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
              3
            </span>
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;