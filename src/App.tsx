import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { useAuthStore } from './store/useAuthStore';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { PageLoader } from './components/ui/Spinner';

// ── Lazy-loaded pages ────────────────────────────────────────────────────
const LandingPage          = lazy(() => import('./pages/LandingPage'));
const LoginPage            = lazy(() => import('./pages/LoginPage'));
const RegisterPage         = lazy(() => import('./pages/RegisterPage'));
const OnboardingPage       = lazy(() => import('./pages/OnboardingPage'));
const DashboardPage        = lazy(() => import('./pages/DashboardPage'));
const ProjectsPage         = lazy(() => import('./pages/ProjectsPage'));
const KanbanPage           = lazy(() => import('./pages/KanbanPage'));
const MembersPage          = lazy(() => import('./pages/MembersPage'));
const WorkspaceSettingsPage = lazy(() => import('./pages/WorkspaceSettingsPage'));

// ── Route Guards ─────────────────────────────────────────────────────────

/** Redirect authenticated users away from login/register */
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return isAuthenticated ? <Navigate to="/app" replace /> : <>{children}</>;
};

/** Block unauthenticated users */
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

// ── App ──────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public routes */}
          <Route
            path="/login"
            element={<PublicRoute><LoginPage /></PublicRoute>}
          />
          <Route
            path="/register"
            element={<PublicRoute><RegisterPage /></PublicRoute>}
          />

          {/* Onboarding (authenticated but no workspace yet) */}
          <Route
            path="/onboarding"
            element={<ProtectedRoute><OnboardingPage /></ProtectedRoute>}
          />

          {/* Protected app routes — all live inside DashboardLayout */}
          <Route
            path="/app"
            element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}
          >
            {/* /app → redirect to first workspace via DashboardLayout logic */}
            <Route index element={<Navigate to="." replace />} />

            {/* Workspace-scoped routes */}
            <Route path=":workspaceSlug">
              <Route index element={<DashboardPage />} />
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="projects/:projectId" element={<KanbanPage />} />
              <Route path="members" element={<MembersPage />} />
              <Route path="settings" element={<WorkspaceSettingsPage />} />
            </Route>
          </Route>

          {/* Root → Landing page for visitors, /app for logged-in users */}
          <Route
            path="/"
            element={
              useAuthStore.getState().isAuthenticated
                ? <Navigate to="/app" replace />
                : <LandingPage />
            }
          />

          {/* 404 catch-all */}
          <Route
            path="*"
            element={
              <div className="min-h-screen bg-base flex items-center justify-center flex-col gap-4">
                <h1 className="text-6xl font-black gradient-text">404</h1>
                <p className="text-muted">This page doesn't exist.</p>
                <a href="/app" className="text-primary hover:underline text-sm">← Go to dashboard</a>
              </div>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}