import { useOutletContext } from 'react-router-dom';
import {
  FolderKanban, CheckCircle2, Clock, AlertCircle, LayoutDashboard, Check, X
} from 'lucide-react';
import { useProjects } from '../features/projects/hooks/useProjects';
import { useTasks } from '../features/tasks/hooks/useTasks';
import { Spinner } from '../components/ui/Spinner';
import { Button } from '../components/ui/Button';
import type { Workspace } from '../types';
// 1. Import the new hooks
import { useWorkspaceInvites, useRespondToInvite } from '../features/workspaces/hooks/useWorkspaces';

interface OutletCtx { workspace: Workspace; }

const StatCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: number | string;
  color: string;
}> = ({ icon, label, value, color }) => (
  <div className="glass rounded-2xl p-5 border border-border animate-fade-in">
    <div className={`h-10 w-10 rounded-xl flex items-center justify-center mb-4 ${color}`}>
      {icon}
    </div>
    <p className="text-3xl font-bold text-main">{value}</p>
    <p className="text-sm text-muted mt-0.5">{label}</p>
  </div>
);

const DashboardPage: React.FC = () => {
  const { workspace } = useOutletContext<OutletCtx>();
  const { data: projects = [], isLoading: loadingProjects } = useProjects(workspace.id);

  // Aggregate task stats across all projects
  const firstProject = projects[0];
  const { data: tasks = [], isLoading: loadingTasks } = useTasks(firstProject?.id ?? null);

  const isLoading = loadingProjects || (projects.length > 0 && loadingTasks);

  const stats = {
    todo:        tasks.filter((t) => t.status === 'todo').length,
    in_progress: tasks.filter((t) => t.status === 'in_progress').length,
    review:      tasks.filter((t) => t.status === 'review').length,
    done:        tasks.filter((t) => t.status === 'done').length,
  };

  // 2. Fetch the invites and setup the response mutation
  const { data: invites = [] } = useWorkspaceInvites();
  const { mutate: respondToInvite, isPending: responding } = useRespondToInvite();

  return (
    <div className="p-8">
      {/* 3. Render Invitation Banners */}
      {invites.length > 0 && (
        <div className="mb-8 space-y-3">
          {invites.map((invite) => (
            <div key={invite.workspace_id} className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 flex items-center justify-between animate-fade-in">
              <div>
                <h3 className="text-amber-500 font-semibold text-sm mb-1">Workspace Invitation</h3>
                <p className="text-muted text-sm">
                  You have been invited to join <span className="text-main font-medium">{invite.workspace_name}</span> as a {invite.role}.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  disabled={responding}
                  onClick={() => respondToInvite({ workspaceId: invite.workspace_id, accept: false })}
                  icon={<X className="h-4 w-4" />}
                >
                  Decline
                </Button>
                <Button 
                  size="sm"
                  disabled={responding}
                  onClick={() => respondToInvite({ workspaceId: invite.workspace_id, accept: true })}
                  icon={<Check className="h-4 w-4" />}
                  className="bg-amber-500 hover:bg-amber-600 text-white border-none"
                >
                  Accept
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Page header */}
      <div className="flex items-center gap-3 mb-8">
        <LayoutDashboard className="h-5 w-5 text-primary" />
        <div>
          <h1 className="text-2xl font-bold text-main">Dashboard</h1>
          <p className="text-sm text-muted">{workspace.name}</p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-16"><Spinner /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            icon={<AlertCircle className="h-5 w-5" />} 
            label="To Do" value={stats.todo} color="bg-red-500/10 text-red-500" 
          />
          <StatCard 
            icon={<Clock className="h-5 w-5" />} 
            label="In Progress" value={stats.in_progress} color="bg-amber-500/10 text-amber-500" 
          />
          <StatCard 
            icon={<FolderKanban className="h-5 w-5" />} 
            label="In Review" value={stats.review} color="bg-indigo-500/10 text-indigo-500" 
          />
          <StatCard 
            icon={<CheckCircle2 className="h-5 w-5" />} 
            label="Completed" value={stats.done} color="bg-emerald-500/10 text-emerald-500" 
          />
        </div>
      )}
    </div>
  );
};

export default DashboardPage;