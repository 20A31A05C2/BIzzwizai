import { useState, useEffect, useCallback } from 'react';
import ChatService from '../services/chatService';

export const useChat = (chatRoomId) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);

  // Load messages for a chat room
  const loadMessages = useCallback(async (roomId) => {
    if (!roomId) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await ChatService.getMessages(roomId);
      setMessages(response.data.messages);
    } catch (err) {
      setError(err.message);
      console.error('Error loading messages:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Send a message
  const sendMessage = useCallback(async (message, attachment = null) => {
    if (!chatRoomId) return;
    
    try {
      setError(null);
      const response = await ChatService.sendMessage(chatRoomId, message, attachment);
      
      // Add new message to the list
      setMessages(prev => [...prev, response.data]);
      
      return response.data;
    } catch (err) {
      setError(err.message);
      console.error('Error sending message:', err);
      throw err;
    }
  }, [chatRoomId]);

  // Mark messages as read
  const markAsRead = useCallback(async () => {
    if (!chatRoomId) return;
    
    try {
      await ChatService.markAsRead(chatRoomId);
      // Update local messages to mark them as read
      setMessages(prev => prev.map(msg => ({
        ...msg,
        is_read: true,
        read_at: new Date().toISOString()
      })));
    } catch (err) {
      console.error('Error marking messages as read:', err);
    }
  }, [chatRoomId]);

  // Get unread count
  const loadUnreadCount = useCallback(async () => {
    try {
      const response = await ChatService.getUnreadCount();
      setUnreadCount(response.data.unread_count);
    } catch (err) {
      console.error('Error loading unread count:', err);
    }
  }, []);

  // Load messages when chat room changes
  useEffect(() => {
    if (chatRoomId) {
      loadMessages(chatRoomId);
    }
  }, [chatRoomId, loadMessages]);

  // Auto-refresh unread count every 30 seconds
  useEffect(() => {
    const interval = setInterval(loadUnreadCount, 30000);
    return () => clearInterval(interval);
  }, [loadUnreadCount]);

  return {
    messages,
    loading,
    error,
    unreadCount,
    sendMessage,
    markAsRead,
    loadMessages,
    loadUnreadCount
  };
};

export default useChat; 