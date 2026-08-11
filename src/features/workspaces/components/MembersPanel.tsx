import { Users, Crown, Shield, User } from 'lucide-react';
import { useWorkspaceMembers } from '../hooks/useWorkspaces';
import { Badge } from '../../../components/ui/Badge';
import { Spinner } from '../../../components/ui/Spinner';
import type { WorkspaceRole } from '../../../types';

const roleIcons: Record<WorkspaceRole, React.ReactNode> = {
  owner:  <Crown  className="h-3 w-3" />,
  admin:  <Shield className="h-3 w-3" />,
  member: <User   className="h-3 w-3" />,
};

const roleVariants: Record<WorkspaceRole, 'warning' | 'primary' | 'muted'> = {
  owner:  'warning',
  admin:  'primary',
  member: 'muted',
};

interface Props { workspaceId: string; }

export const MembersPanel: React.FC<Props> = ({ workspaceId }) => {
  const { data: members, isLoading } = useWorkspaceMembers(workspaceId);

  if (isLoading) return (
    <div className="flex justify-center py-16"><Spinner /></div>
  );

  return (
    <div className="max-w-2xl">
      <div className="glass rounded-2xl border border-border overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center gap-2">
          <Users className="h-4 w-4 text-primary" />
          <h2 className="font-semibold text-main">Members</h2>
          <span className="ml-auto text-xs text-muted">{members?.length ?? 0} total</span>
        </div>
        <ul className="divide-y divide-border">
          {members?.map((m) => {
            const initials = `${m.user.first_name?.[0] ?? ''}${m.user.last_name?.[0] ?? ''}`.toUpperCase()
              || m.user.email[0].toUpperCase();
            const displayName = `${m.user.first_name} ${m.user.last_name}`.trim() || m.user.email;
            return (
              <li key={m.id} className="flex items-center gap-4 px-6 py-4 hover:bg-surface-2 transition-colors">
                <div className="h-9 w-9 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-primary">{initials}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-main truncate">{displayName}</p>
                  <p className="text-xs text-muted truncate">{m.user.email}</p>
                </div>
                <Badge variant={roleVariants[m.role]}>
                  <span className="flex items-center gap-1">
                    {roleIcons[m.role]}
                    {m.role.charAt(0).toUpperCase() + m.role.slice(1)}
                  </span>
                </Badge>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
