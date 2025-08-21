import React, { useState, useEffect } from 'react';
import { MessageCircle, Bell } from 'lucide-react';
import { motion } from 'framer-motion';
import ChatService from '../../services/chatService';

const ChatNotification = ({ onClick }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUnreadCount();
    // Refresh unread count every 30 seconds
    const interval = setInterval(loadUnreadCount, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadUnreadCount = async () => {
    try {
      setLoading(true);
      const response = await ChatService.getUnreadCount();
      setUnreadCount(response.data.unread_count);
    } catch (error) {
      console.error('Error loading unread count:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="relative cursor-pointer p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200"
    >
      <Bell className="w-5 h-5 text-white" />
      
      {unreadCount > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
        >
          <span className="text-xs text-white font-medium">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        </motion.div>
      )}
      
      {loading && (
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
        </div>
      )}
    </motion.div>
  );
};

export default ChatNotification; 