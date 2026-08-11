import { Outlet, Navigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { useWorkspaceStore } from '../../store/useWorkspaceStore';
import { useWorkspaces } from '../../features/workspaces/hooks/useWorkspaces';
import { PageLoader } from '../ui/Spinner';
import { useEffect } from 'react';

export const DashboardLayout: React.FC = () => {
  const { activeWorkspaceId, setActiveWorkspaceId } = useWorkspaceStore();
  const { data: workspaces, isLoading } = useWorkspaces();

  // Auto-select first workspace if none is active
  useEffect(() => {
    if (!isLoading && workspaces && workspaces.length > 0 && !activeWorkspaceId) {
      setActiveWorkspaceId(workspaces[0].id);
    }
  }, [isLoading, workspaces, activeWorkspaceId, setActiveWorkspaceId]);

  if (isLoading) return <PageLoader />;

  // If user has no workspaces, redirect them to create one
  if (!isLoading && workspaces && workspaces.length === 0) {
    return <Navigate to="/onboarding" replace />;
  }

  const activeWorkspace = workspaces?.find((w) => w.id === activeWorkspaceId) ?? workspaces?.[0];

  return (
    <div className="flex min-h-screen bg-base">
      <Sidebar />
      <main className="content-with-sidebar flex-1 min-h-screen overflow-y-auto">
        <Outlet context={{ workspace: activeWorkspace }} />
      </main>
    </div>
  );
};
