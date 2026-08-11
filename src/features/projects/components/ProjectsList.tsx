import { useState } from 'react';
import { Plus, FolderKanban, Search } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { ProjectCard } from './ProjectCard';
import { CreateProjectModal } from './CreateProjectModal';
import { Spinner } from '../../../components/ui/Spinner';
import type { Workspace } from '../../../types';
import { useProjects } from '../hooks/useProjects';

interface Props {
  workspace: Workspace;
}

export const ProjectsList: React.FC<Props> = ({ workspace }) => {
  const [createOpen, setCreateOpen] = useState(false);
  const [search, setSearch] = useState('');
  const { data: projects = [], isLoading } = useProjects(workspace.id);

  const filtered = projects.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-main">Projects</h1>
          <p className="text-muted text-sm mt-0.5">{workspace.name}</p>
        </div>
        <div className="flex items-center gap-3">
          <Input
            id="projects-search"
            placeholder="Search projects…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<Search className="h-4 w-4" />}
            className="w-52"
          />
          <Button
            id="create-project-btn"
            icon={<Plus className="h-4 w-4" />}
            onClick={() => setCreateOpen(true)}
          >
            New project
          </Button>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex justify-center py-24"><Spinner /></div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="h-16 w-16 rounded-2xl bg-surface-2 border border-border flex items-center justify-center mb-4">
            <FolderKanban className="h-8 w-8 text-muted" />
          </div>
          <h3 className="font-semibold text-main">
            {search ? 'No projects match your search' : 'No projects yet'}
          </h3>
          <p className="text-muted text-sm mt-1 max-w-xs">
            {search ? 'Try a different search term.' : 'Create your first project to start organizing work.'}
          </p>
          {!search && (
            <Button
              className="mt-5"
              icon={<Plus className="h-4 w-4" />}
              onClick={() => setCreateOpen(true)}
            >
              Create first project
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProjectCard key={p.id} project={p} workspaceSlug={workspace.slug} />
          ))}
        </div>
      )}

      <CreateProjectModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        workspaceId={workspace.id}
      />
    </div>
  );
};
