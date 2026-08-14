import { useEffect, useState } from 'react';
import { Bell, X } from 'lucide-react';

export const NotificationToast = () => {
  const [toast, setToast] = useState<any>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleNewNotification = (e: Event) => {
      const customEvent = e as CustomEvent;
      setToast(customEvent.detail);
      setVisible(true);
      setTimeout(() => setVisible(false), 5000);
    };

    window.addEventListener('new-notification', handleNewNotification);
    return () => window.removeEventListener('new-notification', handleNewNotification);
  }, []);

  if (!toast) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-500 transform ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'
      }`}
    >
      <div className="glass-premium rounded-xl p-4 border border-primary/30 shadow-[0_0_30px_rgba(99,102,241,0.2)] max-w-sm flex items-start gap-3 relative bg-surface">
        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
          <Bell className="h-5 w-5 text-primary animate-pulse" />
        </div>
        <div className="flex-1 pr-6">
          <h4 className="text-sm font-bold text-main">{toast.title}</h4>
          <p className="text-xs text-muted mt-1">{toast.message}</p>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="absolute top-4 right-4 text-muted hover:text-main"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
