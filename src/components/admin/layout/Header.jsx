import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, Search, Menu } from 'lucide-react';
import ChatService from '../../../services/chatService';

const Header = ({ setSidebarOpen }) => {
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
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="bg-white shadow-sm border-b border-gray-100 px-4 sm:px-6 py-4"
    >
      <div className="flex items-center justify-between">
        {/* Left: Hamburger + Search */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Hamburger for mobile */}
          <button
            className="md:hidden p-2 rounded hover:bg-gray-100 mr-2"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
          <div className="relative w-40 sm:w-64">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-full bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
            />
          </div>
        </div>
        {/* Notification and admin label */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <span className="hidden sm:inline text-sm font-semibold text-purple-700 bg-purple-100 px-3 py-1 rounded-xl shadow-sm">
            👑 Admin
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-xl transition-colors"
          >
            <Bell className="w-5 h-5" />
            {unreadChatCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center"
              >
                {unreadChatCount > 99 ? '99+' : unreadChatCount}
              </motion.span>
            )}
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
