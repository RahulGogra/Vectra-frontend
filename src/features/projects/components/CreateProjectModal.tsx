import { useState } from 'react';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Textarea } from '../../../components/ui/Input';
import { useCreateProject } from '../hooks/useProjects';

interface Props {
  open: boolean;
  onClose: () => void;
  workspaceId: string;
}

export const CreateProjectModal: React.FC<Props> = ({ open, onClose, workspaceId }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const { mutate: create, isPending, isError, error } = useCreateProject();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    create({ workspace: workspaceId, name, description }, {
      onSuccess: () => { setName(''); setDescription(''); onClose(); },
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const err = error as any;
  const apiErrors: Record<string, string[]> = isError && err?.response?.data
    ? err.response.data : {};

  return (
    <Modal open={open} onClose={onClose} title="Create project" size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="project-name"
          label="Project name"
          placeholder="Website Redesign"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={apiErrors.name?.[0]}
          required
          autoFocus
        />
        <Textarea
          id="project-description"
          label="Description (optional)"
          placeholder="What is this project about?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
        {apiErrors.non_field_errors && (
          <p className="text-xs text-danger">{apiErrors.non_field_errors[0]}</p>
        )}
        {apiErrors.detail && (
          <p className="text-xs text-danger">{apiErrors.detail}</p>
        )}
        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
          <Button type="submit" loading={isPending}>Create project</Button>
        </div>
      </form>
    </Modal>
  );
};
