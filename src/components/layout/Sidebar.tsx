import { NavLink, useParams } from 'react-router-dom';
import {
  LayoutDashboard, FolderKanban, Users, Settings,
  LogOut, ChevronDown, Plus, Zap, Bell
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useWorkspaces } from '../../features/workspaces/hooks/useWorkspaces';
import { useWorkspaceStore } from '../../store/useWorkspaceStore';
import { useCurrentUser, useLogout } from '../../features/auth/hooks/useAuth';
import { CreateWorkspaceModal } from '../../features/workspaces/components/CreateWorkspaceModal';
import { useNotificationStore } from '../../store/useNotificationStore';
import { NotificationToast } from '../ui/NotificationToast';

interface NavItem {
  to: string;
  label: string;
  icon: React.ReactNode;
}

export const Sidebar: React.FC = () => {
  const { workspaceSlug } = useParams<{ workspaceSlug: string }>();
  const { data: workspaces = [] } = useWorkspaces();
  const { data: user } = useCurrentUser();
  const { activeWorkspaceId, setActiveWorkspaceId } = useWorkspaceStore();
  const logout = useLogout();
  const [wsMenuOpen, setWsMenuOpen] = useState(false);
  const [createWsOpen, setCreateWsOpen] = useState(false);
  const [notifMenuOpen, setNotifMenuOpen] = useState(false);

  const token = localStorage.getItem('accessToken');
  const { connect, disconnect, unreadCount, notifications, markAllAsRead } = useNotificationStore();

  useEffect(() => {
    if (token) {
      connect(token);
    }
    return () => disconnect();
  }, [token, connect, disconnect]);

  const activeWorkspace = workspaces.find((w) => w.id === activeWorkspaceId) ?? workspaces[0];
  const slug = workspaceSlug ?? activeWorkspace?.slug ?? '';

  const navItems: NavItem[] = [
    { to: `/app/${slug}`,           label: 'Dashboard',  icon: <LayoutDashboard className="h-4 w-4" /> },
    { to: `/app/${slug}/projects`,  label: 'Projects',   icon: <FolderKanban className="h-4 w-4" /> },
    { to: `/app/${slug}/members`,   label: 'Members',    icon: <Users className="h-4 w-4" /> },
    { to: `/app/${slug}/settings`,  label: 'Settings',   icon: <Settings className="h-4 w-4" /> },
  ];

  const initials = user
    ? `${user.first_name?.[0] ?? ''}${user.last_name?.[0] ?? ''}`.toUpperCase() || user.email[0].toUpperCase()
    : '?';

  return (
    <>
      <aside className="fixed left-0 top-0 h-screen sidebar-width flex flex-col bg-surface border-r border-border z-30 animate-slide-in">
        {/* Logo */}
        <div className="px-5 py-5 flex items-center gap-2.5 border-b border-border">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shadow-glow">
            <Zap className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-main text-lg tracking-tight">Vectra</span>
        </div>

        {/* Workspace Switcher */}
        <div className="px-3 py-3 border-b border-border">
          <button
            id="workspace-switcher"
            onClick={() => setWsMenuOpen((v) => !v)}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-surface-2 transition-colors text-left group"
          >
            <div className="h-7 w-7 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
              <span className="text-xs font-bold text-primary">
                {activeWorkspace?.name?.[0]?.toUpperCase() ?? 'W'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-main truncate">
                {activeWorkspace?.name ?? 'Select workspace'}
              </p>
              <p className="text-xs text-muted truncate">Workspace</p>
            </div>
            <ChevronDown
              className={`h-4 w-4 text-muted transition-transform ${wsMenuOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Dropdown */}
          {wsMenuOpen && (
            <div className="mt-1 rounded-xl border border-border bg-surface-2 shadow-modal py-1 animate-scale-in">
              {workspaces.map((ws) => (
                <button
                  key={ws.id}
                  onClick={() => { setActiveWorkspaceId(ws.id); setWsMenuOpen(false); }}
                  className={[
                    'w-full flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-surface transition-colors',
                    ws.id === activeWorkspaceId ? 'text-primary' : 'text-main',
                  ].join(' ')}
                >
                  <div className="h-5 w-5 rounded bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                    {ws.name[0].toUpperCase()}
                  </div>
                  {ws.name}
                </button>
              ))}
              <div className="border-t border-border mt-1 pt-1">
                <button
                  onClick={() => { setCreateWsOpen(true); setWsMenuOpen(false); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-muted hover:text-main hover:bg-surface transition-colors"
                >
                  <Plus className="h-4 w-4" /> New workspace
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === `/app/${slug}`}
              className={({ isActive }) => [
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150',
                isActive
                  ? 'bg-primary/15 text-primary border border-primary/20'
                  : 'text-muted hover:text-main hover:bg-surface-2',
              ].join(' ')}
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* User footer */}
        <div className="px-3 py-3 border-t border-border flex flex-col gap-2 relative">
          {/* Notifications Dropdown */}
          {notifMenuOpen && (
            <div className="absolute bottom-16 left-3 w-72 rounded-xl border border-border bg-surface shadow-modal py-2 z-50 animate-scale-in">
              <div className="px-3 pb-2 border-b border-border flex justify-between items-center">
                <span className="font-bold text-main">Notifications</span>
                {unreadCount > 0 && (
                  <button onClick={() => markAllAsRead()} className="text-xs text-primary hover:underline">Mark all read</button>
                )}
              </div>
              <div className="max-h-60 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="text-xs text-muted text-center py-4">No notifications yet.</p>
                ) : (
                  notifications.map(n => (
                    <div key={n.id} className={`px-3 py-2 text-sm border-b border-white/5 ${!n.is_read ? 'bg-primary/5' : ''}`}>
                      <p className="font-semibold text-main text-xs">{n.title}</p>
                      <p className="text-muted text-xs line-clamp-2">{n.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 px-3 py-2 rounded-xl">
            <div className="h-8 w-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
              <span className="text-xs font-bold text-primary">{initials}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-main truncate">
                {user ? `${user.first_name} ${user.last_name}`.trim() || user.email : '…'}
              </p>
              <p className="text-xs text-muted truncate">{user?.email}</p>
            </div>
            
            <button
              onClick={() => setNotifMenuOpen(!notifMenuOpen)}
              title="Notifications"
              className="relative text-muted hover:text-primary transition-colors p-1.5 rounded-lg hover:bg-surface-2"
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-danger animate-pulse border border-surface"></span>
              )}
            </button>

            <button
              onClick={logout}
              title="Logout"
              className="text-muted hover:text-danger transition-colors p-1.5 rounded-lg hover:bg-surface-2"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      <NotificationToast />
      <CreateWorkspaceModal open={createWsOpen} onClose={() => setCreateWsOpen(false)} />
    </>
  );
};
