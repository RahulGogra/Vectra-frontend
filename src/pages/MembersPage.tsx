import { useOutletContext } from 'react-router-dom';
import { MembersPanel } from '../features/workspaces/components/MembersPanel';
import type { Workspace } from '../types';

interface OutletCtx { workspace: Workspace; }

const MembersPage: React.FC = () => {
  const { workspace } = useOutletContext<OutletCtx>();
  return (
    <div className="p-8">
      <div className="flex items-center gap-2 mb-8">
        <h1 className="text-2xl font-bold text-main">Members</h1>
      </div>
      <MembersPanel workspaceId={workspace.id} />
    </div>
  );
};

export default MembersPage;
