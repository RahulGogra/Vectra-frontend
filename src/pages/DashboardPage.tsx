import { useOutletContext } from 'react-router-dom';
import {
  FolderKanban, CheckCircle2, AlertCircle, LayoutDashboard, Check, X, TrendingUp, Activity
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { useProjects } from '../features/projects/hooks/useProjects';
import { useTasks } from '../features/tasks/hooks/useTasks';
import { useWorkspaceInvites, useRespondToInvite } from '../features/workspaces/hooks/useWorkspaces';
import { useCurrentUser } from '../features/auth/hooks/useAuth';
import { Spinner } from '../components/ui/Spinner';
import { Button } from '../components/ui/Button';
import type { Workspace } from '../types';

interface OutletCtx { workspace: Workspace; }

const StatCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: number | string;
  colorClass: string;
  trend?: string;
  delay?: number;
}> = ({ icon, label, value, colorClass, trend, delay = 0 }) => (
  <div 
    className="glass-premium rounded-2xl p-6 border relative overflow-hidden animate-fade-in transition-transform hover:scale-[1.02] duration-300"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full blur-3xl opacity-20 ${colorClass.split(' ')[0]}`} />
    
    <div className="flex justify-between items-start mb-4">
      <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${colorClass}`}>
        {icon}
      </div>
      {trend && (
        <span className="flex items-center gap-1 text-xs font-semibold text-success bg-success/10 px-2.5 py-1 rounded-full border border-success/20">
          <TrendingUp className="h-3 w-3" /> {trend}
        </span>
      )}
    </div>
    
    <div>
      <p className="text-4xl font-black text-main mb-1 tracking-tight">{value}</p>
      <p className="text-sm font-medium text-muted">{label}</p>
    </div>
  </div>
);

const MOCK_CHART_DATA = [
  { name: 'Mon', completed: 4, created: 6 },
  { name: 'Tue', completed: 7, created: 8 },
  { name: 'Wed', completed: 5, created: 4 },
  { name: 'Thu', completed: 12, created: 9 },
  { name: 'Fri', completed: 8, created: 5 },
  { name: 'Sat', completed: 15, created: 3 },
  { name: 'Sun', completed: 10, created: 2 },
];

const DashboardPage: React.FC = () => {
  const { workspace } = useOutletContext<OutletCtx>();
  const { data: user } = useCurrentUser();
  const { data: projects = [], isLoading: loadingProjects } = useProjects(workspace.id);

  // Aggregate task stats across all projects (naive approach for MVP)
  const firstProject = projects[0];
  const { data: tasks = [], isLoading: loadingTasks } = useTasks(firstProject?.id ?? null);

  const isLoading = loadingProjects || (projects.length > 0 && loadingTasks);

  const stats = {
    todo:        tasks.filter((t) => t.status === 'todo').length,
    in_progress: tasks.filter((t) => t.status === 'in_progress').length,
    review:      tasks.filter((t) => t.status === 'review').length,
    done:        tasks.filter((t) => t.status === 'done').length,
  };

  const { data: invites = [] } = useWorkspaceInvites();
  const { mutate: respondToInvite, isPending: responding } = useRespondToInvite();

  const completionRate = tasks.length ? Math.round((stats.done / tasks.length) * 100) : 0;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* ── Invites ── */}
      {invites.length > 0 && (
        <div className="space-y-3">
          {invites.map((invite) => (
            <div key={invite.workspace_id} className="glass-premium bg-amber-500/5 border-amber-500/20 rounded-2xl p-5 flex items-center justify-between animate-fade-in shadow-[0_0_30px_rgba(245,158,11,0.1)]">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <AlertCircle className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <h3 className="text-amber-500 font-semibold text-sm mb-0.5">Workspace Invitation</h3>
                  <p className="text-muted text-sm">
                    You have been invited to join <span className="text-main font-medium">{invite.workspace_name}</span> as a {invite.role}.
                  </p>
                </div>
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
                  className="bg-amber-500 hover:bg-amber-600 text-white border-none shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                >
                  Accept
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Header ── */}
      <div className="glass-premium flex flex-col md:flex-row items-start md:items-end justify-between gap-4 bg-gradient-to-r from-primary/10 to-transparent p-8 rounded-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="relative z-10">
          <h1 className="text-3xl font-black text-main mb-2 tracking-tight">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">{user?.first_name || 'User'}</span>
          </h1>
          <p className="text-muted text-base max-w-xl">
            Here's what's happening in <strong className="text-main">{workspace.name}</strong> today. 
            You have <strong className="text-main">{stats.todo}</strong> tasks to do and <strong className="text-main">{stats.in_progress}</strong> in progress.
          </p>
        </div>
        <div className="relative z-10 glass rounded-2xl px-6 py-4 border-white/5 shadow-xl flex items-center gap-4">
          <div>
            <p className="text-xs text-muted font-medium mb-1 uppercase tracking-wider">Completion</p>
            <p className="text-2xl font-black text-main">{completionRate}%</p>
          </div>
          <div className="h-12 w-12 rounded-full border-4 border-surface-2 relative flex items-center justify-center bg-base/50">
            <svg className="absolute inset-0 h-full w-full -rotate-90">
              <circle cx="20" cy="20" r="20" className="stroke-primary" strokeWidth="4" fill="none" strokeDasharray="125" strokeDashoffset={125 - (125 * completionRate) / 100} strokeLinecap="round" />
            </svg>
            <CheckCircle2 className="h-5 w-5 text-primary relative z-10" />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20"><Spinner /></div>
      ) : (
        <>
          {/* ── Stat Cards ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              delay={0}
              icon={<AlertCircle className="h-6 w-6" />} 
              label="To Do" value={stats.todo} colorClass="bg-red-500/10 text-red-500" 
            />
            <StatCard 
              delay={100}
              icon={<Activity className="h-6 w-6" />} 
              label="In Progress" value={stats.in_progress} colorClass="bg-amber-500/10 text-amber-500" 
            />
            <StatCard 
              delay={200}
              icon={<FolderKanban className="h-6 w-6" />} 
              label="In Review" value={stats.review} colorClass="bg-indigo-500/10 text-indigo-500" 
            />
            <StatCard 
              delay={300}
              icon={<CheckCircle2 className="h-6 w-6" />} 
              label="Completed" value={stats.done} colorClass="bg-emerald-500/10 text-emerald-500" 
              trend="+12%"
            />
          </div>

          {/* ── Charts ── */}
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 glass-premium rounded-3xl p-6 border-white/5 flex flex-col min-h-[400px]">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-lg font-bold text-main">Task Velocity</h3>
                  <p className="text-sm text-muted">Completed vs Created tasks over the last 7 days</p>
                </div>
              </div>
              <div className="flex-1 w-full relative">
                <div className="absolute inset-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={MOCK_CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorCreated" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1f2937', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                        itemStyle={{ color: '#f8fafc' }}
                      />
                      <Area type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorCompleted)" />
                      <Area type="monotone" dataKey="created" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorCreated)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="glass-premium rounded-3xl p-6 border-white/5 flex flex-col">
              <h3 className="text-lg font-bold text-main mb-6">Recent Projects</h3>
              <div className="flex-1 space-y-4">
                {projects.slice(0, 4).map((p) => (
                  <div key={p.id} className="group flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-white/5">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <LayoutDashboard className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-main text-sm">{p.name}</p>
                      <p className="text-xs text-muted line-clamp-1">{p.description || 'No description provided.'}</p>
                    </div>
                  </div>
                ))}
                {projects.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-full text-center py-10 opacity-50">
                    <FolderKanban className="h-10 w-10 mb-3" />
                    <p className="text-sm">No projects yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardPage;