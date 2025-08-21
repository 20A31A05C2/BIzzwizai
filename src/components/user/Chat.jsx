import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Lock, Minimize2, Maximize2, X, Paperclip, Send, Download, File, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatService from '../../services/chatService';
import notificationSound from '../../utils/notificationSound';

// Ensure ChatService methods exist
const safeFormatTime = (timestamp) => {
  try {
    return ChatService.formatTime ? ChatService.formatTime(timestamp) : new Date(timestamp).toLocaleTimeString();
  } catch (error) {
    return new Date(timestamp).toLocaleTimeString();
  }
};

const safeGetFileIcon = (fileType) => {
  try {
    return ChatService.getFileIcon ? ChatService.getFileIcon(fileType) : '📎';
  } catch (error) {
    return '📎';
  }
};

function Chat({ showChat, setShowChat, chatMinimized, setChatMinimized, project }) {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [chatRoomId, setChatRoomId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [checkingMessages, setCheckingMessages] = useState(false);
  const [attachment, setAttachment] = useState(null);
  const [attachmentPreview, setAttachmentPreview] = useState(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Initialize chat room when component mounts or project changes
  useEffect(() => {
    if (showChat && project) {
      initializeChatRoom();
    }
  }, [showChat, project]);

  // Load messages when chat room is set
  useEffect(() => {
    if (chatRoomId) {
      loadMessages();
    }
  }, [chatRoomId]);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Real-time updates - poll for new messages every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (chatRoomId) {
        checkForNewMessages();
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [chatRoomId]);

  const initializeChatRoom = async () => {
    try {
      setLoading(true);
      const response = await ChatService.getOrCreateChatRoom({
        project_id: project.id
      });
      setChatRoomId(response.data.chat_room_id);
    } catch (error) {
      console.error('Error initializing chat room:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async () => {
    try {
      setLoading(true);
      const response = await ChatService.getMessages(chatRoomId);
      setMessages(response.data.messages);
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkForNewMessages = async () => {
    try {
      setCheckingMessages(true);
      const response = await ChatService.getMessages(chatRoomId);
      const newMessages = response.data.messages;
      const previousMessageCount = messages.length;
      
      // Only update if there are new messages
      if (newMessages.length > previousMessageCount) {
        setMessages(newMessages);
        
        // Play notification sound if new messages arrived
        if (previousMessageCount > 0) {
          notificationSound.play();
        }
      }
    } catch (error) {
      console.error('Error checking for new messages:', error);
    } finally {
      setCheckingMessages(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if ((!newMessage.trim() && !attachment) || !chatRoomId) return;

    try {
      setSending(true);
      const response = await ChatService.sendMessage(chatRoomId, newMessage, attachment);
      
      // Add new message to the list
      setMessages(prev => [...prev, response.data]);
      
      setNewMessage('');
      setAttachment(null);
      setAttachmentPreview(null);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSending(false);
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAttachment(file);
      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => setAttachmentPreview({ type: 'image', url: e.target.result });
        reader.readAsDataURL(file);
      } else if (file.type === 'application/pdf') {
        setAttachmentPreview({ type: 'pdf', name: file.name, size: file.size });
      } else {
        setAttachmentPreview({ type: 'file', name: file.name, size: file.size });
      }
    }
  };

  const removeAttachment = () => {
    setAttachment(null);
    setAttachmentPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const downloadAttachment = async (attachment, messageId) => {
    const userRole = localStorage.getItem('bizzwiz-userRole');
    const baseUrl = 'https://bizzwiz.indibase.in/api';
    const endpoint = userRole === 'admin'
      ? `/admin/chat-attachments/${messageId}/download`
      : `/user/chat-attachments/${messageId}/download`;

    const token = localStorage.getItem('bizwizusertoken');
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Download failed');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', attachment.name);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert(t('chat.downloadError'));
    }
  };

  if (!showChat) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="chat-panel"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.3 }}
        className={`fixed ${chatMinimized ? 'bottom-4 right-4 w-72 h-14' : 'bottom-0 left-0 right-0 mx-auto w-full max-w-md h-[80vh] sm:bottom-4 sm:right-4 sm:left-auto sm:mx-0 sm:w-96 sm:h-[600px]'} z-50 transition-all duration-300`}
        style={{ pointerEvents: showChat ? 'auto' : 'none' }}
      >
        <div className="relative group h-full">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/20 to-cyan-500/20 rounded-2xl blur-sm"></div>
          <div className="relative bg-[#000011] rounded-2xl h-full flex flex-col">
            <div className="flex items-center justify-between p-3 sm:p-4">
              <div className="flex items-center space-x-2 sm:space-x-3">
                {/* <div className="relative">
                  <img 
                    src={project.teamLead.avatar} 
                    alt="Team Lead" 
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full"
                  />
                  <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full border border-[#000011]"></div>
                </div> */}
                <div>
                  <div className="text-white text-xs sm:text-sm font-light">
                    {project?.teamLead?.name || t('chat.fallback.teamLeadName')}
                  </div>
                  <div className="flex items-center space-x-1">
                    <Lock className="w-3 h-3 text-green-400" />
                    <span className="text-green-400 text-xs">{t('chat.encrypted')}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2">
                {!chatMinimized && (
                  <button
                    onClick={() => checkForNewMessages()}
                    disabled={checkingMessages}
                    className="p-1 text-white/60 hover:text-white transition-colors duration-200 disabled:opacity-50"
                    title={t('chat.refreshMessages')}
                  >
                    <RefreshCw className={`w-4 h-4 ${checkingMessages ? 'animate-spin' : ''}`} />
                  </button>
                )}
                <button 
                  onClick={() => setChatMinimized(!chatMinimized)}
                  className="p-1 text-white/60 hover:text-white transition-colors duration-200"
                  title={chatMinimized ? t('chat.maximize') : t('chat.minimize')}
                >
                  {chatMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button 
                  onClick={() => setShowChat(false)}
                  className="p-1 text-white/60 hover:text-white transition-colors duration-200"
                  title={t('chat.close')}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            {!chatMinimized && (
              <>
                <div className="flex-1 p-3 sm:p-4 space-y-3 sm:space-y-4 overflow-y-auto">
                  {loading ? (
                    <div className="flex items-center justify-center p-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-400"></div>
                    </div>
                  ) : checkingMessages ? (
                    <div className="flex items-center justify-center p-2">
                      <div className="flex items-center gap-2 text-xs text-white/60">
                        <div className="animate-spin rounded-full h-3 w-3 border-b border-purple-400"></div>
                        <span>{t('chat.checkingMessages')}</span>
                      </div>
                    </div>
                  ) : (
                    messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`flex ${message.sender_type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[80%] p-2 sm:p-3 rounded-xl ${
                          message.sender_type === 'user' 
                            ? 'bg-purple-500/20 text-white' 
                            : 'bg-white/5 text-white/90'
                        }`}>
                          <p className="text-xs sm:text-sm font-light">{message.message}</p>
                          {/* Attachment */}
                          {message.attachment && (
                            <div className={`mt-2 p-2 rounded-lg ${
                              message.sender_type === 'user' 
                                ? 'bg-purple-400/20' 
                                : 'bg-white/10'
                            }`}>
                              <div className="flex items-center gap-2">
                                <span className="text-lg">{safeGetFileIcon(message.attachment.type)}</span>
                                <div className="flex-1 min-w-0">
                                  <p className={`text-xs font-medium truncate ${
                                    message.sender_type === 'user' ? 'text-purple-100' : 'text-white/90'
                                  }`}>
                                    {message.attachment.name}
                                  </p>
                                  <p className={`text-[10px] ${
                                    message.sender_type === 'user' ? 'text-purple-200' : 'text-white/60'
                                  }`}>
                                    {message.attachment.size}
                                  </p>
                                </div>
                                <button
                                  onClick={() => downloadAttachment(message.attachment, message.id)}
                                  className={`p-1 rounded ${
                                    message.sender_type === 'user' 
                                      ? 'text-purple-100 hover:bg-purple-400/30' 
                                      : 'text-white/60 hover:bg-white/20'
                                  }`}
                                  title={t('chat.download')}
                                >
                                  <Download className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          )}
                          <div className="text-[10px] sm:text-xs text-white/50 mt-1">
                            {safeFormatTime(message.timestamp)}
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>
                <div className="p-3 sm:p-4">
                  {/* Attachment preview */}
                  {attachmentPreview && (
                    <div className="mb-3 p-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {attachmentPreview.type === 'image' ? (
                            <img src={attachmentPreview.url} alt={t('chat.preview')} className="w-8 h-8 rounded" />
                          ) : (
                            <span className="text-lg">{safeGetFileIcon(attachment.type || attachmentPreview.name)}</span>
                          )}
                          <span className="text-xs text-white/80">{attachment.name || attachmentPreview.name}</span>
                          <span className="text-xs text-white/60">{attachment.size ? ChatService.formatFileSize(attachment.size) : ''}</span>
                        </div>
                        <button
                          onClick={removeAttachment}
                          className="text-red-400 hover:text-red-300"
                          title={t('chat.removeAttachment')}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      onChange={handleFileSelect}
                      className="hidden"
                      accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip,.rar"
                    />
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="p-2 text-white/60 hover:text-white transition-colors duration-200"
                      title={t('chat.attachFile')}
                    >
                      <Paperclip className="w-4 h-4" />
                    </button>
                    <input 
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder={t('chat.placeholder')}
                      className="flex-1 bg-white/5 rounded-lg px-2 sm:px-3 py-2 text-white text-xs sm:text-sm font-light focus:bg-white/10 focus:outline-none transition-colors duration-300"
                    />
                    <button 
                      onClick={handleSendMessage}
                      disabled={(!newMessage.trim() && !attachment) || sending}
                      className="p-2 bg-purple-500/20 rounded-lg text-purple-400 hover:bg-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                      title={t('chat.send')}
                    >
                      {sending ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-400"></div>
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Chat;