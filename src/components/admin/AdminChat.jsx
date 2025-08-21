import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageCircle, 
  Send, 
  Search, 
  User,
  Clock,
  CheckCircle,
  Circle,
  Paperclip,
  Download,
  File,
  X,
  RefreshCw,
  ArrowLeft
} from 'lucide-react';
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

const AdminChat = () => {
  const [selectedChatRoom, setSelectedChatRoom] = useState(null);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [chatRooms, setChatRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [checkingMessages, setCheckingMessages] = useState(false);
  const [attachment, setAttachment] = useState(null);
  const [attachmentPreview, setAttachmentPreview] = useState(null);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Load chat rooms on component mount
  useEffect(() => {
    loadChatRooms();
  }, []);

  // Load messages when chat room is selected
  useEffect(() => {
    if (selectedChatRoom) {
      loadMessages(selectedChatRoom.id);
    }
  }, [selectedChatRoom]);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Real-time updates - poll for new messages every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedChatRoom) {
        checkForNewMessages(selectedChatRoom.id);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [selectedChatRoom]);

  // Refresh chat rooms list every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      loadChatRooms();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const loadChatRooms = async () => {
    try {
      setError(null);
      
      if (!ChatService || typeof ChatService.getAdminChatRooms !== 'function') {
        throw new Error('ChatService not available');
      }
      
      const response = await ChatService.getAdminChatRooms();
      if (response && response.data) {
        setChatRooms(response.data);
      } else {
        setChatRooms([]);
      }
    } catch (error) {
      console.error('Error loading chat rooms:', error);
      setError('Erreur lors du chargement des conversations');
      setChatRooms([]);
    }
  };

  const loadMessages = async (chatRoomId) => {
    try {
      setLoading(true);
      setError(null);
      
      if (!ChatService || typeof ChatService.getMessages !== 'function') {
        throw new Error('ChatService not available');
      }
      
      const response = await ChatService.getMessages(chatRoomId);
      if (response && response.data && response.data.messages) {
        setMessages(response.data.messages);
      } else {
        setMessages([]);
      }
    } catch (error) {
      console.error('Error loading messages:', error);
      setError('Erreur lors du chargement des messages');
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  const checkForNewMessages = async (chatRoomId) => {
    try {
      if (!ChatService || typeof ChatService.getMessages !== 'function') {
        return;
      }
      
      setCheckingMessages(true);
      const response = await ChatService.getMessages(chatRoomId);
      if (response && response.data && response.data.messages) {
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

  const filteredChatRooms = chatRooms.filter(room => 
    (room.user?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (room.project?.name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = async () => {
    if ((!message.trim() && !attachment) || !selectedChatRoom) return;

    try {
      setSending(true);
      const response = await ChatService.sendMessage(selectedChatRoom.id, message, attachment);
      
      // Add new message to the list
      setMessages(prev => [...prev, response.data]);
      
      // Update chat room's last message
      setChatRooms(prev => prev.map(room => 
        room.id === selectedChatRoom.id 
          ? { ...room, last_message: response.data, last_message_at: new Date().toISOString() }
          : room
      ));

      setMessage('');
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
      alert('Erreur lors du téléchargement du fichier');
    }
  };

  // Don't render if ChatService is not available
  if (!ChatService) {
    return (
      <div className="h-full flex items-center justify-center bg-white rounded-2xl shadow-lg">
        <div className="text-center">
          <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">
            Service de chat non disponible
          </h3>
          <p className="text-sm text-gray-500">
            Le service de chat n'est pas configuré correctement
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col lg:flex-row bg-white rounded-2xl shadow-lg overflow-hidden"
    >
      {/* Liste des membres - hide on mobile when chat is selected */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`w-full lg:w-1/3 xl:w-1/4 border-b lg:border-b-0 lg:border-r border-gray-200 flex-shrink-0 flex flex-col min-h-0 ${selectedChatRoom ? 'hidden lg:flex' : 'flex'}`}
      >
        <div className="p-3 lg:p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
          <h2 className="text-base lg:text-lg font-semibold text-gray-800 mb-3 flex items-center space-x-2">
            <MessageCircle className="w-5 h-5 text-blue-600" />
            <span>Chat Équipe</span>
          </h2>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un membre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center p-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center p-4 text-red-500">
              <p className="text-sm">{error}</p>
            </div>
          ) : filteredChatRooms.length === 0 ? (
            <div className="flex items-center justify-center p-4 text-gray-500">
              <p className="text-sm">Aucune conversation trouvée</p>
            </div>
          ) : (
            filteredChatRooms.map((room) => (
              <motion.div
                key={room.id}
                whileHover={{ backgroundColor: '#f8fafc' }}
                onClick={() => setSelectedChatRoom(room)}
                className={`p-3 cursor-pointer border-b border-gray-100 transition-colors ${
                  selectedChatRoom?.id === room.id ? 'bg-blue-50 border-blue-200' : ''
                } flex items-center gap-3`}
              >
                <div className="relative flex-shrink-0">
                  <img 
                    src={room.user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(room.user?.name || 'User')}&color=7C3AED&background=EBF4FF`} 
                    alt={room.user?.name || 'User'} 
                    className="w-10 h-10 rounded-full"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(room.user?.name || 'User')}&color=7C3AED&background=EBF4FF`;
                    }}
                  />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-gray-800 truncate text-sm">{room.user?.name || 'User'}</h3>
                    {room.last_message?.timestamp && (
                      <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                        {safeFormatTime(room.last_message.timestamp)}
                      </span>
                    )}
                  </div>
                  {room.project?.name && (
                    <p className="text-xs text-gray-600 mb-1 truncate">{room.project.name}</p>
                  )}
                  {room.last_message?.message && (
                    <p className="text-xs text-gray-500 truncate">
                      {room.last_message.sender_type === 'admin' ? 'Vous: ' : ''}{room.last_message.message}
                    </p>
                  )}
                </div>
                {(room.unread_count || 0) > 0 && (
                  <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs text-white font-medium">{room.unread_count}</span>
                  </div>
                )}
              </motion.div>
            ))
          )}
        </div>
      </motion.div>

      {/* Zone de conversation */}
      <div className="flex-1 flex flex-col min-h-0">
        {selectedChatRoom ? (
          <>
            {/* Header de la conversation - back button replaces avatar/details on mobile */}
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="p-3 lg:p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between sticky top-0 z-10"
            >
              <div className="flex items-center gap-3 w-full">
                {/* Back button for mobile */}
                <button
                  type="button"
                  onClick={() => setSelectedChatRoom(null)}
                  className="block lg:hidden p-2 mr-1 rounded-lg hover:bg-gray-200 focus:outline-none"
                  title="Retour"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                {/* On mobile, show only name/project, on desktop show avatar+details */}
                <div className="flex items-center gap-2 w-full">
                  <img 
                    src={selectedChatRoom.user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedChatRoom.user?.name || 'User')}&color=7C3AED&background=EBF4FF`} 
                    alt="" 
                    className="w-10 h-10 rounded-full hidden lg:block"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedChatRoom.user?.name || 'User')}&color=7C3AED&background=EBF4FF`;
                    }}
                  />
                  <div className="flex flex-col">
                    <h3 className="font-medium text-gray-800 text-sm truncate">
                      {selectedChatRoom.user?.name || 'User'}
                    </h3>
                    <p className="text-xs text-gray-600 truncate">
                      {selectedChatRoom.project?.name || 'Chat général'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {checkingMessages && (
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <div className="animate-spin rounded-full h-3 w-3 border-b border-blue-500"></div>
                    <span>Vérification...</span>
                  </div>
                )}
                <button
                  onClick={() => selectedChatRoom && checkForNewMessages(selectedChatRoom.id)}
                  disabled={checkingMessages}
                  className="p-1.5 text-gray-500 hover:text-blue-600 transition-colors disabled:opacity-50 rounded-lg hover:bg-gray-100"
                  title="Actualiser les messages"
                >
                  <RefreshCw className={`w-4 h-4 ${checkingMessages ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </motion.div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 lg:p-4 space-y-3 bg-white">
              {loading ? (
                <div className="flex items-center justify-center p-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.sender_type === 'admin' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] px-3 py-2.5 rounded-lg text-sm ${
                      msg.sender_type === 'admin' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-800'
                    }`}>
                      <p className="break-words">{msg.message || ''}</p>
                      
                      {/* Attachment */}
                      {msg.attachment && (
                        <div className={`mt-2 p-2.5 rounded-lg ${
                          msg.sender_type === 'admin' 
                            ? 'bg-blue-400/20' 
                            : 'bg-gray-100'
                        }`}>
                          <div className="flex items-center gap-2">
                            <span className="text-lg flex-shrink-0">{safeGetFileIcon(msg.attachment.type)}</span>
                            <div className="flex-1 min-w-0">
                              <p className={`text-xs font-medium truncate ${
                                msg.sender_type === 'admin' ? 'text-blue-100' : 'text-gray-700'
                              }`}>
                                {msg.attachment?.name || 'File'}
                              </p>
                              <p className={`text-xs ${
                                msg.sender_type === 'admin' ? 'text-blue-200' : 'text-gray-500'
                              }`}>
                                {msg.attachment?.size || ''}
                              </p>
                            </div>
                            <button
                              onClick={() => downloadAttachment(msg.attachment, msg.id)}
                              className={`p-1.5 rounded flex-shrink-0 ${
                                msg.sender_type === 'admin' 
                                  ? 'text-blue-100 hover:bg-blue-400/30' 
                                  : 'text-gray-500 hover:bg-gray-200'
                              }`}
                            >
                              <Download className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between mt-1.5">
                        <span className={`text-xs ${
                          msg.sender_type === 'admin' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {safeFormatTime(msg.timestamp)}
                        </span>
                        {msg.sender_type === 'admin' && (
                          <div className="ml-2">
                            {msg.is_read ? (
                              <CheckCircle className="w-3.5 h-3.5 text-blue-100" />
                            ) : (
                              <Circle className="w-3.5 h-3.5 text-blue-100" />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Zone de saisie */}
            <div className="p-3 lg:p-4 border-t border-gray-200 bg-gray-50">
              {/* Attachment preview */}
              {attachmentPreview && (
                <div className="mb-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {attachmentPreview.type === 'image' ? (
                        <img src={attachmentPreview.url} alt="Preview" className="w-10 h-10 rounded object-cover" />
                      ) : (
                        <span className="text-lg">{safeGetFileIcon(attachmentPreview.name)}</span>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-600 truncate">{attachmentPreview.name}</p>
                        <p className="text-xs text-gray-500">{attachmentPreview.size ? ChatService.formatFileSize(attachmentPreview.size) : ''}</p>
                      </div>
                    </div>
                    <button
                      onClick={removeAttachment}
                      className="text-red-500 hover:text-red-700 p-1 rounded-lg hover:bg-red-50"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
              {/* Responsive input area */}
              <div className="flex items-center gap-2 w-full">
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileSelect}
                  className="hidden"
                  accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip,.rar"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2.5 text-gray-500 hover:text-gray-700 transition-colors rounded-lg hover:bg-gray-100 flex-shrink-0"
                >
                  <Paperclip className="w-4 h-4" />
                </button>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Tapez votre message..."
                  className="flex-1 px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-black min-w-0"
                  style={{ minWidth: 0 }}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  disabled={(!message.trim() && !attachment) || sending}
                  className="flex-shrink-0 px-4 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  style={{ minWidth: '44px' }}
                >
                  {sending ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </motion.button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-white">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                Sélectionnez une conversation
              </h3>
              <p className="text-sm text-gray-500">
                Choisissez une conversation pour commencer à discuter
              </p>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AdminChat;


