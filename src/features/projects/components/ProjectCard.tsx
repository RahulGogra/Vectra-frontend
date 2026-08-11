import { useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight, FolderKanban } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { useDeleteProject } from '../hooks/useProjects';
import type { Project } from '../../../types';

interface Props {
  project: Project;
  workspaceSlug: string;
}

export const ProjectCard: React.FC<Props> = ({ project, workspaceSlug }) => {
  const navigate = useNavigate();
  const { mutate: del, isPending } = useDeleteProject();

  const createdDate = new Date(project.created_at).toLocaleDateString(undefined, {
    month: 'short', day: 'numeric', year: 'numeric',
  });

  return (
    <div className="glass rounded-2xl p-5 border border-border hover:border-border-strong transition-all duration-200 group flex flex-col gap-4 hover:shadow-card animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="h-10 w-10 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center shrink-0">
          <FolderKanban className="h-5 w-5 text-primary" />
        </div>
        <button
          onClick={() => del(project.id)}
          disabled={isPending}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-muted hover:text-danger p-1.5 rounded-lg hover:bg-danger/10"
          aria-label="Delete project"
        >
          {isPending
            ? <span className="h-4 w-4 rounded-full border-2 border-danger border-t-transparent animate-spin-custom block" />
            : <Trash2 className="h-4 w-4" />}
        </button>
      </div>

      {/* Body */}
      <div className="flex-1">
        <h3 className="font-semibold text-main text-base leading-snug group-hover:text-primary transition-colors line-clamp-2">
          {project.name}
        </h3>
        {project.description && (
          <p className="text-sm text-muted mt-1.5 line-clamp-2">{project.description}</p>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-subtle">{createdDate}</span>
        <Button
          variant="ghost"
          size="sm"
          icon={<ArrowRight className="h-3.5 w-3.5" />}
          onClick={() => navigate(`/app/${workspaceSlug}/projects/${project.id}`)}
        >
          Open board
        </Button>
      </div>
    </div>
  );
};
