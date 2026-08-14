import { create } from 'zustand';
import { api } from '../lib/axios';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  created_at: string;
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  socket: WebSocket | null;
  fetchHistory: () => Promise<void>;
  connect: (token: string) => void;
  disconnect: () => void;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  addNotification: (notification: Notification) => void;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  socket: null,
  
  fetchHistory: async () => {
    try {
      const res = await api.get<Notification[]>('/notifications/');
      set({ 
        notifications: res.data, 
        unreadCount: res.data.filter(n => !n.is_read).length 
      });
    } catch (e) {
      console.error('Failed to fetch notifications', e);
    }
  },

  connect: (token: string) => {
    if (get().socket) return;
    
    get().fetchHistory();
    
    // Connect to WebSocket using token in query string
    const wsUrl = `ws://localhost:8000/ws/notifications/?token=${token}`;
    const ws = new WebSocket(wsUrl);
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'notification') {
        get().addNotification(data.data);
        // Dispatch an event so a Toast component can catch it
        window.dispatchEvent(new CustomEvent('new-notification', { detail: data.data }));
      }
    };
    
    ws.onclose = () => {
      set({ socket: null });
    };
    
    set({ socket: ws });
  },
  
  disconnect: () => {
    const socket = get().socket;
    if (socket) {
      socket.close();
    }
    set({ socket: null, notifications: [], unreadCount: 0 });
  },
  
  addNotification: (notification: Notification) => {
    set((state) => {
      const exists = state.notifications.find(n => n.id === notification.id);
      if (exists) return state;
      
      const newNotifications = [notification, ...state.notifications];
      return {
        notifications: newNotifications,
        unreadCount: newNotifications.filter(n => !n.is_read).length
      };
    });
  },
  
  markAsRead: async (id: string) => {
    try {
      await api.post(`/notifications/${id}/mark-read/`);
      set((state) => {
        const newNotifications = state.notifications.map(n => 
          n.id === id ? { ...n, is_read: true } : n
        );
        return {
          notifications: newNotifications,
          unreadCount: newNotifications.filter(n => !n.is_read).length
        };
      });
    } catch (e) {
      console.error(e);
    }
  },
  
  markAllAsRead: async () => {
    try {
      await api.post(`/notifications/mark-all-read/`);
      set((state) => {
        const newNotifications = state.notifications.map(n => ({ ...n, is_read: true }));
        return {
          notifications: newNotifications,
          unreadCount: 0
        };
      });
    } catch (e) {
      console.error(e);
    }
  }
}));
