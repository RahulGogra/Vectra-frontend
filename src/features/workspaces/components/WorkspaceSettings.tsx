import { useState } from 'react';
import { Settings, Trash2, Save } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { useUpdateWorkspace, useDeleteWorkspace } from '../hooks/useWorkspaces';
import type { Workspace } from '../../../types';

interface Props {
  workspace: Workspace;
}

export const WorkspaceSettings: React.FC<Props> = ({ workspace }) => {
  const [name, setName] = useState(workspace.name);
  const [confirmDelete, setConfirmDelete] = useState('');

  const { mutate: update, isPending: updating } = useUpdateWorkspace();
  const { mutate: del, isPending: deleting } = useDeleteWorkspace();

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
