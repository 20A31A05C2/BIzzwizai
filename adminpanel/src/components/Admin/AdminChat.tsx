import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageCircle, 
  Send, 
  Search, 
  User,
  Clock,
  CheckCircle,
  Circle
} from 'lucide-react';
import { mockUsers } from '../../data/mockData';

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  read: boolean;
}

const AdminChat: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Simuler des conversations
  const [conversations, setConversations] = useState<Record<string, ChatMessage[]>>({
    '2': [ // SHANKAR
      {
        id: '1',
        senderId: '2',
        senderName: 'SHANKAR',
        content: 'Bonjour SIMO, j\'ai validé le projet GreenTech Solutions. Le devis est prêt.',
        timestamp: '2024-02-05T10:30:00Z',
        read: true
      },
      {
        id: '2',
        senderId: '1',
        senderName: 'SIMO',
        content: 'Parfait ! Quel est le montant final ?',
        timestamp: '2024-02-05T10:35:00Z',
        read: true
      },
      {
        id: '3',
        senderId: '2',
        senderName: 'SHANKAR',
        content: '120 000€ sur 6 mois. Le client a déjà accepté.',
        timestamp: '2024-02-05T10:40:00Z',
        read: false
      }
    ],
    '3': [ // VINEL
      {
        id: '4',
        senderId: '3',
        senderName: 'VINEL',
        content: 'SIMO, j\'ai mis à jour le lien live du projet EYVO AI.',
        timestamp: '2024-02-05T14:20:00Z',
        read: false
      },
      {
        id: '5',
        senderId: '1',
        senderName: 'SIMO',
        content: 'Merci VINEL, je vais vérifier.',
        timestamp: '2024-02-05T14:25:00Z',
        read: true
      }
    ]
  });

  const teamMembers = mockUsers.filter(user => user.role !== 'admin');
  const filteredMembers = teamMembers.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!message.trim() || !selectedUser) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: '1', // SIMO
      senderName: 'SIMO',
      content: message,
      timestamp: new Date().toISOString(),
      read: true
    };

    setConversations(prev => ({
      ...prev,
      [selectedUser]: [...(prev[selectedUser] || []), newMessage]
    }));

    setMessage('');
  };

  const getLastMessage = (userId: string) => {
    const userConversation = conversations[userId];
    if (!userConversation || userConversation.length === 0) return null;
    return userConversation[userConversation.length - 1];
  };

  const getUnreadCount = (userId: string) => {
    const userConversation = conversations[userId];
    if (!userConversation) return 0;
    return userConversation.filter(msg => !msg.read && msg.senderId !== '1').length;
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full flex bg-white rounded-2xl shadow-lg overflow-hidden"
    >
      {/* Liste des membres */}
      <div className="w-1/3 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
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
              className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredMembers.map((member) => {
            const lastMessage = getLastMessage(member.id);
            const unreadCount = getUnreadCount(member.id);
            
            return (
              <motion.div
                key={member.id}
                whileHover={{ backgroundColor: '#f8fafc' }}
                onClick={() => setSelectedUser(member.id)}
                className={`p-4 cursor-pointer border-b border-gray-100 transition-colors ${
                  selectedUser === member.id ? 'bg-blue-50 border-blue-200' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img 
                      src={member.avatar} 
                      alt={member.name} 
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-800 truncate">{member.name}</h3>
                      {lastMessage && (
                        <span className="text-xs text-gray-500">
                          {formatTime(lastMessage.timestamp)}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{member.position}</p>
                    {lastMessage && (
                      <p className="text-sm text-gray-500 truncate">
                        {lastMessage.senderId === '1' ? 'Vous: ' : ''}{lastMessage.content}
                      </p>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-medium">{unreadCount}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Zone de conversation */}
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            {/* Header de la conversation */}
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center space-x-3">
                <img 
                  src={teamMembers.find(m => m.id === selectedUser)?.avatar} 
                  alt="" 
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="font-medium text-gray-800">
                    {teamMembers.find(m => m.id === selectedUser)?.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {teamMembers.find(m => m.id === selectedUser)?.position}
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {(conversations[selectedUser] || []).map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.senderId === '1' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    msg.senderId === '1' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-800'
                  }`}>
                    <p className="text-sm">{msg.content}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className={`text-xs ${
                        msg.senderId === '1' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {formatTime(msg.timestamp)}
                      </span>
                      {msg.senderId === '1' && (
                        <div className="ml-2">
                          {msg.read ? (
                            <CheckCircle className="w-3 h-3 text-blue-100" />
                          ) : (
                            <Circle className="w-3 h-3 text-blue-100" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Zone de saisie */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Tapez votre message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                Sélectionnez un membre
              </h3>
              <p className="text-gray-500">
                Choisissez un membre de l'équipe pour commencer une conversation
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AdminChat;