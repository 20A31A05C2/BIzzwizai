import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  MessageCircle, 
  Settings,
  Users,
  BarChart3,
  CheckSquare,
  Crown
} from 'lucide-react';
import { useRole } from '../../contexts/RoleContext';
import { UserRole } from '../../types';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const { currentRole } = useRole();

  const getMenuItems = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'chats', label: 'Chat', icon: MessageCircle },
          { id: 'users', label: 'Users', icon: Users },
          { id: 'analytics', label: 'Analytics', icon: BarChart3 },
          { id: 'settings', label: 'Settings', icon: Settings },
        ];
      case 'chef':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'chats', label: 'Chats', icon: MessageCircle },
          { id: 'team', label: 'Team', icon: Users },
          { id: 'tasks', label: 'Tasks', icon: CheckSquare },
          { id: 'settings', label: 'Settings', icon: Settings },
        ];
      case 'member':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'chats', label: 'Chats', icon: MessageCircle },
          { id: 'tasks', label: 'My Tasks', icon: CheckSquare },
          { id: 'settings', label: 'Settings', icon: Settings },
        ];
      default:
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'chats', label: 'Chats', icon: MessageCircle },
        ];
    }
  };

  const menuItems = getMenuItems(currentRole);

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="w-64 bg-white shadow-xl h-full flex flex-col"
    >
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Crown className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">BIZZ PLACE</h1>
            <p className="text-sm text-gray-500 capitalize">
              {currentRole === 'admin' ? 'SIMO' : 
               currentRole === 'chef' ? 'SHANKAR' : 'VINEL'} - {currentRole}
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </motion.button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {currentRole === 'admin' ? 'AJ' : currentRole === 'chef' ? 'SC' : currentRole === 'member' ? 'MR' : 'EW'}
            </span>
          </div>
          <div>
            <p className="font-medium text-gray-800">
              {currentRole === 'admin' ? 'SIMO' : 
               currentRole === 'chef' ? 'SHANKAR' : 'VINEL'}
            </p>
            <p className="text-xs text-gray-500 capitalize">
              {currentRole === 'admin' ? 'Administrateur' : 
               currentRole === 'chef' ? 'Chef d\'équipe' : 'Développeur'}
            </p>
          </div>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;