import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  MessageCircle,
  Settings,
  Users,
  BarChart3,
  Crown,
  X,
  LogOut,
  Calendar
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ApiService from '@/apiService';
import { toast } from '@/components/ui/use-toast';
import ChatService from '../../../services/chatService';

const Sidebar = ({ activeTab, onTabChange, sidebarOpen, setSidebarOpen, isMobile }) => {
  const navigate = useNavigate();
  const [unreadChatCount, setUnreadChatCount] = useState(0);

  // Load chat notifications
  useEffect(() => {
    const loadChatNotifications = async () => {
      try {
        if (ChatService && typeof ChatService.getUnreadCount === 'function') {
          const response = await ChatService.getUnreadCount();
          if (response && response.data) {
            setUnreadChatCount(response.data.unread_count || 0);
          }
        }
      } catch (error) {
        console.error('Error loading chat notifications:', error);
      }
    };

    loadChatNotifications();
    
    // Refresh every 30 seconds
    const interval = setInterval(loadChatNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await ApiService('/logout', 'POST');
      if (response.success) {
        // Clear localStorage
        localStorage.removeItem('bizwizusertoken');
        localStorage.removeItem('bizzwiz-userId');
        localStorage.removeItem('bizzwiz-userRole');
        localStorage.removeItem('bizzwiz-selectedProjectId');
        localStorage.removeItem('bizzwiz_form_data_id');

        // Show success toast
        toast({
          title: 'Déconnexion réussie',
          description: 'Vous avez été déconnecté avec succès.',
          variant: 'default',
        });

        // Redirect to homepage
        navigate('/');
      } else {
        throw new Error(response.message || 'Échec de la déconnexion.');
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: 'Erreur',
        description: error.message || 'Impossible de se déconnecter.',
        variant: 'destructive',
      });
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'chats', label: 'Chat', icon: MessageCircle },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Sidebar variants for motion (only used for mobile)
  const sidebarVariants = {
    open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    closed: { x: '-100%', transition: { type: 'spring', stiffness: 300, damping: 30 } }
  };

  return (
    <aside
      className="w-72 md:w-64 bg-white shadow-xl h-full flex flex-col"
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Crown className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">BIZZ PLACE</h1>
            <p className="text-sm text-gray-500 capitalize">SIMO - admin</p>
          </div>
        </div>
        {/* Close button for mobile only */}
        {isMobile && (
          <button
            className="md:hidden ml-2 p-2 rounded hover:bg-gray-100"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        )}
      </div>
      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const to = item.id === 'dashboard' ? '/admindashboard' : `/admindashboard/${item.id}`;
          return (
            <Link
              key={item.id}
              to={to}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 relative ${
                isActive
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
              {item.id === 'chats' && unreadChatCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center"
                >
                  {unreadChatCount > 99 ? '99+' : unreadChatCount}
                </motion.span>
              )}
            </Link>
          );
        })}
      </nav>
      {/* Footer */}
      <div className="p-4 border-t border-gray-100 space-y-3">
        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">AJ</span>
          </div>
          <div>
            <p className="font-medium text-gray-800">SIMO</p>
            <p className="text-xs text-gray-500">Administrateur</p>
          </div>
        </div>
        
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-600 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Déconnexion</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;