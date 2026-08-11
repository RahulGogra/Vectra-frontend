import { useState } from 'react';
import { Zap, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useCreateWorkspace } from '../features/workspaces/hooks/useWorkspaces';
import { useNavigate } from 'react-router-dom';

/**
 * Shown when a logged-in user has no workspaces yet.
 * Forces them to create one before entering the app.
 */
const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [slugEdited, setSlugEdited] = useState(false);
  const { mutate: create, isPending, isError, error } = useCreateWorkspace();

  const autoSlug = (s: string) =>
    s.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (!slugEdited) setSlug(autoSlug(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    create({ name, slug }, {
      onSuccess: (ws) => navigate(`/app/${ws.slug}`),
    });
  };

  const apiErrors: Record<string, string[]> = isError && (error as any)?.response?.data
    ? (error as any).response.data : {};

  return (
    <div className="min-h-screen bg-base flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.12),transparent_60%)] pointer-events-none" />
      <div className="relative z-10 w-full max-w-md animate-fade-in text-center">
        <div className="h-14 w-14 rounded-2xl bg-primary flex items-center justify-center shadow-glow mx-auto mb-6 animate-pulse-glow">
          <Zap className="h-7 w-7 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-main">Create your workspace</h1>
        <p className="text-muted mt-2 mb-8 text-sm">
          A workspace is your team's shared home inside Vectra.
        </p>

        <div className="glass-strong rounded-2xl p-8 text-left">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              id="onboarding-ws-name"
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
                id="onboarding-ws-slug"
                label="URL slug"
                placeholder="acme-corp"
                value={slug}
                onChange={(e) => { setSlug(autoSlug(e.target.value)); setSlugEdited(true); }}
                error={apiErrors.slug?.[0]}
                required
              />
              {slug && (
                <p className="text-xs text-muted mt-1">
                  vectra.app/<span className="text-primary font-medium">{slug}</span>
                </p>
              )}
            </div>
            <Button
              id="onboarding-submit"
              type="submit"
              fullWidth
              size="lg"
              loading={isPending}
              icon={<ArrowRight className="h-4 w-4" />}
              className="mt-2"
            >
              Get started
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
