import ApiService from '../apiService';

class ChatService {
  // Get chat rooms for admin
  static async getAdminChatRooms() {
    return await ApiService('/admin/chat-rooms', 'GET');
  }

  // Get chat rooms for user
  static async getUserChatRooms(userId) {
    return await ApiService(`/user/chat-rooms`, 'GET');
  }

  // Get or create chat room
  static async getOrCreateChatRoom(data) {
    const userRole = localStorage.getItem('bizzwiz-userRole');
    const endpoint = userRole === 'admin' ? '/admin/chat-rooms' : '/user/chat-rooms';
    return await ApiService(endpoint, 'POST', data);
  }

  // Get messages for a chat room
  static async getMessages(chatRoomId) {
    const userRole = localStorage.getItem('bizzwiz-userRole');
    const endpoint = userRole === 'admin' 
      ? `/admin/chat-rooms/${chatRoomId}/messages`
      : `/user/chat-rooms/${chatRoomId}/messages`;
    return await ApiService(endpoint, 'GET');
  }

  // Send a message
  static async sendMessage(chatRoomId, message, attachment = null) {
    const userRole = localStorage.getItem('bizzwiz-userRole');
    const endpoint = userRole === 'admin' 
      ? `/admin/chat-rooms/${chatRoomId}/messages`
      : `/user/chat-rooms/${chatRoomId}/messages`;

    if (attachment) {
      // Handle file upload
      const formData = new FormData();
      if (message) formData.append('message', message);
      formData.append('attachment', attachment);
      return await ApiService(endpoint, 'POST', formData, true);
    } else {
      return await ApiService(endpoint, 'POST', { message });
    }
  }

  // Mark messages as read
  static async markAsRead(chatRoomId) {
    const userRole = localStorage.getItem('bizzwiz-userRole');
    const endpoint = userRole === 'admin' 
      ? `/admin/chat-rooms/${chatRoomId}/mark-read`
      : `/user/chat-rooms/${chatRoomId}/mark-read`;
    return await ApiService(endpoint, 'POST');
  }

  // Get unread count
  static async getUnreadCount(userId = null) {
    const userRole = localStorage.getItem('bizzwiz-userRole');
    let endpoint;
    
    if (userRole === 'admin') {
      endpoint = userId 
        ? `/admin/users/${userId}/unread-count`
        : '/admin/users/1/unread-count'; // Default to first user for admin
    } else {
      endpoint = '/user/unread-count';
    }
    
    return await ApiService(endpoint, 'GET');
  }

  // Format timestamp for display
  static formatTime(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });
    }
  }

  // Format file size
  static formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Get file icon based on type
  static getFileIcon(fileType) {
    if (fileType.startsWith('image/')) return '🖼️';
    if (fileType.startsWith('video/')) return '🎥';
    if (fileType.startsWith('audio/')) return '🎵';
    if (fileType.includes('pdf')) return '📄';
    if (fileType.includes('word') || fileType.includes('document')) return '📝';
    if (fileType.includes('excel') || fileType.includes('spreadsheet')) return '📊';
    if (fileType.includes('powerpoint') || fileType.includes('presentation')) return '📈';
    if (fileType.includes('zip') || fileType.includes('rar')) return '📦';
    return '📎';
  }
}

export default ChatService; 