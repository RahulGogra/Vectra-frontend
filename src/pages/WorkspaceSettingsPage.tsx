import { useOutletContext } from 'react-router-dom';
import { Settings } from 'lucide-react';
import { WorkspaceSettings } from '../features/workspaces/components/WorkspaceSettings';
import type { Workspace } from '../types';

interface OutletCtx { workspace: Workspace; }

const WorkspaceSettingsPage: React.FC = () => {
  const { workspace } = useOutletContext<OutletCtx>();
  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <Settings className="h-5 w-5 text-primary" />
        <h1 className="text-2xl font-bold text-main">Workspace Settings</h1>
      </div>
      <WorkspaceSettings workspace={workspace} />
    </div>
  );
};

export default WorkspaceSettingsPage;
