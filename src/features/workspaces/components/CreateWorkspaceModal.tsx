import { useState } from 'react';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { useCreateWorkspace } from '../hooks/useWorkspaces';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const CreateWorkspaceModal: React.FC<Props> = ({ open, onClose }) => {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [slugEdited, setSlugEdited] = useState(false);

  const { mutate: create, isPending, error, isError } = useCreateWorkspace();

  const autoSlug = (s: string) =>
    s.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (!slugEdited) setSlug(autoSlug(e.target.value));
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlug(autoSlug(e.target.value));
    setSlugEdited(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    create({ name, slug }, {
      onSuccess: () => {
        setName(''); setSlug(''); setSlugEdited(false);
        onClose();
      },
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const err = error as any;
  const apiErrors: Record<string, string[]> = isError && err?.response?.data
    ? err.response.data
    : {};

  return (
    <Modal open={open} onClose={onClose} title="New workspace" size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="ws-name"
          label="Workspace name"
          placeholder="Acme Corp"
          value={name}
          onChange={handleNameChange}
          error={apiErrors.name?.[0]}
          required
          autoFocus
        />
        <div>
          <Input
            id="ws-slug"
            label="URL slug"
            placeholder="acme-corp"
            value={slug}
            onChange={handleSlugChange}
            error={apiErrors.slug?.[0]}
            required
          />
          {slug && (
            <p className="text-xs text-muted mt-1">
              Your workspace URL: <span className="text-primary">vectra.app/<b>{slug}</b></span>
            </p>
          )}
        </div>

        {apiErrors.non_field_errors && (
          <p className="text-xs text-danger">{apiErrors.non_field_errors[0]}</p>
        )}

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
          <Button type="submit" loading={isPending}>Create workspace</Button>
        </div>
      </form>
    </Modal>
  );
};
