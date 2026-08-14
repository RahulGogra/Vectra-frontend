import { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { useUpdateWorkspace, useDeleteWorkspace } from '../hooks/useWorkspaces';
import type { Workspace } from '../../../types';
import { Settings, Trash2, Save, Users, UserPlus } from 'lucide-react';
import { useInviteMember } from '../hooks/useWorkspaces';
import { useWorkspaceMembers } from '../hooks/useWorkspaces';

interface Props {
  workspace: Workspace;
}

export const WorkspaceSettings: React.FC<Props> = ({ workspace }) => {
  const [name, setName] = useState(workspace.name);
  const [confirmDelete, setConfirmDelete] = useState('');

  const { mutate: update, isPending: updating } = useUpdateWorkspace();
  const { mutate: del, isPending: deleting } = useDeleteWorkspace();
  const { mutate: inviteMember, isPending: inviting } = useInviteMember();
  const { data: members = [] } = useWorkspaceMembers(workspace.id);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    update({ id: workspace.id, payload: { name } });
  };

  const handleDelete = () => {
    if (confirmDelete !== workspace.name) return;
    del(workspace.id);
  };

  return (
    <div className="max-w-2xl space-y-8">
      {/* General Settings */}
      <section className="glass rounded-2xl p-6 border border-border">
        <div className="flex items-center gap-2 mb-5">
          <Settings className="h-4 w-4 text-primary" />
          <h2 className="text-base font-semibold text-main">General</h2>
        </div>
        <form onSubmit={handleSave} className="space-y-4">
          <Input
            id="ws-settings-name"
            label="Workspace name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <div className="flex justify-end">
            <Button type="submit" loading={updating} icon={<Save className="h-4 w-4" />}>
              Save changes
            </Button>
          </div>
        </form>
      </section>

            {/* Members Section */}
      <section className="glass rounded-2xl p-6 border border-border">
        <div className="flex items-center gap-2 mb-5">
          <Users className="h-4 w-4 text-primary" />
          <h2 className="text-base font-semibold text-main">Manage Members</h2>
        </div>
        
        {/* Invite Form */}
        <form 
          className="flex gap-3 mb-6"
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const emailInput = form.elements.namedItem('email') as HTMLInputElement;
            inviteMember({ workspaceId: workspace.id, email: emailInput.value }, {
              onSuccess: () => {
                emailInput.value = '';
                alert('Invite sent!');
              },
              onError: (err: any) => alert(err.response?.data?.error || 'Failed to send invite')
            });
          }}
        >
          <div className="flex-1">
            <Input id="email" type="email" placeholder="Email address" required />
          </div>
          <Button type="submit" loading={inviting} icon={<UserPlus className="h-4 w-4" />}>
            Invite
          </Button>
        </form>

        {/* Member List */}
        <div className="space-y-3">
          {members.map((member) => (
            <div key={member.id} className="flex items-center justify-between p-3 rounded-xl bg-surface-2">
              <div>
                <p className="text-sm font-medium text-main">{member.user.first_name || member.user.email.split('@')[0]}</p>
                <p className="text-xs text-muted">{member.user.email}</p>
              </div>
              <div className="flex items-center gap-3">
                {member.status === 'pending' && (
                  <span className="text-[10px] font-semibold bg-amber-500/20 text-amber-500 px-2 py-1 rounded-full uppercase">
                    Pending
                  </span>
                )}
                <span className="text-[10px] font-semibold bg-primary/20 text-primary px-2 py-1 rounded-full uppercase">
                  {member.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Danger Zone */}
      <section className="rounded-2xl p-6 border border-danger/30 bg-danger/5">
        <div className="flex items-center gap-2 mb-2">
          <Trash2 className="h-4 w-4 text-danger" />
          <h2 className="text-base font-semibold text-danger">Danger Zone</h2>
        </div>
        <p className="text-sm text-muted mb-5">
          Deleting this workspace will permanently remove all projects and tasks. This action cannot be undone.
        </p>
        <div className="space-y-3">
          <Input
            id="ws-delete-confirm"
            label={`Type "${workspace.name}" to confirm`}
            placeholder={workspace.name}
            value={confirmDelete}
            onChange={(e) => setConfirmDelete(e.target.value)}
          />
          <Button
            id="ws-delete-btn"
            variant="danger"
            onClick={handleDelete}
            loading={deleting}
            disabled={confirmDelete !== workspace.name}
            icon={<Trash2 className="h-4 w-4" />}
          >
            Delete workspace permanently
          </Button>
        </div>
      </section>
    </div>
  );
};
