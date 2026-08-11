import { useOutletContext } from 'react-router-dom';
import { ProjectsList } from '../features/projects/components/ProjectsList';
import type { Workspace } from '../types';

interface OutletCtx { workspace: Workspace; }

const ProjectsPage: React.FC = () => {
  const { workspace } = useOutletContext<OutletCtx>();
  return (
    <div className="p-8">
      <ProjectsList workspace={workspace} />
    </div>
  );
};

export default ProjectsPage;
