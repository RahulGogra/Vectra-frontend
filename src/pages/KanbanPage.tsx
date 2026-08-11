import { useParams, useOutletContext } from 'react-router-dom';
import { KanbanBoard } from '../features/tasks/components/KanbanBoard';
import { useProjects } from '../features/projects/hooks/useProjects';
import { PageLoader } from '../components/ui/Spinner';
import type { Workspace } from '../types';

interface OutletCtx { workspace: Workspace; }

const KanbanPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { workspace } = useOutletContext<OutletCtx>();
  const { data: projects = [], isLoading } = useProjects(workspace.id);

  if (isLoading) return <PageLoader />;

  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="p-8 text-center text-muted">
        Project not found.
      </div>
    );
  }

  return (
    <div className="p-8">
      <KanbanBoard
        projectId={project.id}
        projectName={project.name}
        workspaceId={workspace.id}
        workspaceSlug={workspace.slug}
      />
    </div>
  );
};

export default KanbanPage;
