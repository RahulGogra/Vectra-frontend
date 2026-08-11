import { useOutletContext } from 'react-router-dom';
import {
  FolderKanban, Users, CheckCircle2, Clock, AlertCircle, LayoutDashboard,
} from 'lucide-react';
import { useProjects } from '../features/projects/hooks/useProjects';
import { useTasks } from '../features/tasks/hooks/useTasks';
import { Spinner } from '../components/ui/Spinner';
import type { Workspace } from '../types';

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

  return (
    <div className="p-8">
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
        <>
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              icon={<FolderKanban className="h-5 w-5 text-primary" />}
              label="Total projects"
              value={projects.length}
              color="bg-primary/15"
            />
            <StatCard
              icon={<Clock className="h-5 w-5 text-warning" />}
              label="In progress"
              value={stats.in_progress}
              color="bg-warning/15"
            />
            <StatCard
              icon={<AlertCircle className="h-5 w-5 text-accent" />}
              label="In review"
              value={stats.review}
              color="bg-accent/15"
            />
            <StatCard
              icon={<CheckCircle2 className="h-5 w-5 text-success" />}
              label="Completed"
              value={stats.done}
              color="bg-success/15"
            />
          </div>

          {/* Recent projects */}
          <section>
            <h2 className="text-base font-semibold text-main mb-4">Recent projects</h2>
            {projects.length === 0 ? (
              <div className="glass rounded-2xl p-10 border border-border text-center">
                <FolderKanban className="h-10 w-10 text-muted mx-auto mb-3" />
                <p className="text-main font-medium">No projects yet</p>
                <p className="text-muted text-sm mt-1">
                  Head to the Projects tab to create your first one.
                </p>
              </div>
            ) : (
              <div className="grid gap-3">
                {projects.slice(0, 5).map((p) => (
                  <div
                    key={p.id}
                    className="glass rounded-xl px-5 py-4 border border-border flex items-center gap-4 animate-fade-in"
                  >
                    <div className="h-8 w-8 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
                      <FolderKanban className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-main truncate">{p.name}</p>
                      {p.description && (
                        <p className="text-xs text-muted truncate">{p.description}</p>
                      )}
                    </div>
                    <span className="text-xs text-subtle shrink-0">
                      {new Date(p.created_at).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default DashboardPage;
