import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { useAuthStore } from './store/useAuthStore';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { PageLoader } from './components/ui/Spinner';

// ── App pages ─────────────────────────────────────────────────────────────
const LandingPage           = lazy(() => import('./pages/LandingPage'));
const LoginPage             = lazy(() => import('./pages/LoginPage'));
const RegisterPage          = lazy(() => import('./pages/RegisterPage'));
const OnboardingPage        = lazy(() => import('./pages/OnboardingPage'));
const DashboardPage         = lazy(() => import('./pages/DashboardPage'));
const ProjectsPage          = lazy(() => import('./pages/ProjectsPage'));
const KanbanPage            = lazy(() => import('./pages/KanbanPage'));
const MembersPage           = lazy(() => import('./pages/MembersPage'));
const WorkspaceSettingsPage = lazy(() => import('./pages/WorkspaceSettingsPage'));

// ── Marketing / static pages ──────────────────────────────────────────────
const FeaturesPage     = lazy(() => import('./pages/marketing/FeaturesPage'));
const FullPricingPage  = lazy(() => import('./pages/marketing/FullPricingPage'));
const ChangelogPage    = lazy(() => import('./pages/marketing/ChangelogPage'));
const RoadmapPage      = lazy(() => import('./pages/marketing/RoadmapPage'));
const AboutPage        = lazy(() => import('./pages/marketing/AboutPage'));
const BlogPage         = lazy(() => import('./pages/marketing/BlogPage'));
const CareersPage      = lazy(() => import('./pages/marketing/CareersPage'));
const PressPage        = lazy(() => import('./pages/marketing/PressPage'));
const PrivacyPage      = lazy(() => import('./pages/marketing/PrivacyPage'));
const TermsPage        = lazy(() => import('./pages/marketing/TermsPage'));
const SecurityPage     = lazy(() => import('./pages/marketing/SecurityPage'));
const CookiePolicyPage = lazy(() => import('./pages/marketing/CookiePolicyPage'));

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

// ── App ───────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* ── Auth ──────────────────────────────────────────────────── */}
          <Route path="/login"      element={<PublicRoute><LoginPage /></PublicRoute>} />
          <Route path="/register"   element={<PublicRoute><RegisterPage /></PublicRoute>} />
          <Route path="/onboarding" element={<ProtectedRoute><OnboardingPage /></ProtectedRoute>} />

          {/* ── Protected app ─────────────────────────────────────────── */}
          <Route path="/app" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            <Route index element={<Navigate to="." replace />} />
            <Route path=":workspaceSlug">
              <Route index element={<DashboardPage />} />
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="projects/:projectId" element={<KanbanPage />} />
              <Route path="members" element={<MembersPage />} />
              <Route path="settings" element={<WorkspaceSettingsPage />} />
            </Route>
          </Route>

          {/* ── Marketing / static pages ──────────────────────────────── */}
          <Route path="/features"     element={<FeaturesPage />} />
          <Route path="/pricing"      element={<FullPricingPage />} />
          <Route path="/changelog"    element={<ChangelogPage />} />
          <Route path="/roadmap"      element={<RoadmapPage />} />
          <Route path="/about"        element={<AboutPage />} />
          <Route path="/blog"         element={<BlogPage />} />
          <Route path="/careers"      element={<CareersPage />} />
          <Route path="/press"        element={<PressPage />} />
          <Route path="/privacy"      element={<PrivacyPage />} />
          <Route path="/terms"        element={<TermsPage />} />
          <Route path="/security"     element={<SecurityPage />} />
          <Route path="/cookie-policy" element={<CookiePolicyPage />} />

          {/* ── Root ──────────────────────────────────────────────────── */}
          <Route
            path="/"
            element={
              useAuthStore.getState().isAuthenticated
                ? <Navigate to="/app" replace />
                : <LandingPage />
            }
          />

          {/* ── 404 ───────────────────────────────────────────────────── */}
          <Route
            path="*"
            element={
              <div
                className="min-h-screen flex flex-col items-center justify-center gap-6"
                style={{ background: '#04060f' }}
              >
                <div
                  className="text-8xl font-black"
                  style={{
                    background: 'linear-gradient(135deg, #6366f1, #22d3ee)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  404
                </div>
                <p style={{ color: 'rgba(255,255,255,0.5)' }} className="text-lg">
                  This page doesn't exist.
                </p>
                <a
                  href="/"
                  className="text-sm font-medium px-5 py-2.5 rounded-xl text-white transition-all hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
                >
                  ← Back to Vectra
                </a>
              </div>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}