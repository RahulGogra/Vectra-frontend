import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Zap, ArrowRight, Check, Menu, X,
  LayoutDashboard, Users, Shield, Kanban,
  Sparkles, Globe, GitBranch, Star,
  ChevronRight, Play, Lock,
} from 'lucide-react';
import { HeroCanvas } from '../components/three/HeroCanvas';

// ── Scroll-reveal hook ────────────────────────────────────────────────────
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ── Mock Kanban board (hero UI mockup) ────────────────────────────────────
const MOCK_BOARD = [
  {
    id: 'todo', label: 'To Do', dot: '#94a3b8',
    tasks: [
      { title: 'Redesign onboarding flow', priority: 'High',   priorityCls: 'bg-red-500/15 text-red-400',    avatar: 'JD', avatarBg: 'bg-indigo-600' },
      { title: 'API rate limiting',        priority: 'Medium', priorityCls: 'bg-amber-500/15 text-amber-400', avatar: 'SA', avatarBg: 'bg-violet-600' },
      { title: 'Docs update',              priority: 'Low',    priorityCls: 'bg-emerald-500/15 text-emerald-400', avatar: '',   avatarBg: '' },
    ],
  },
  {
    id: 'in_progress', label: 'In Progress', dot: '#6366f1',
    tasks: [
      { title: 'Payment integration',       priority: 'High',   priorityCls: 'bg-red-500/15 text-red-400',    avatar: 'MK', avatarBg: 'bg-cyan-600' },
      { title: 'Analytics dashboard',       priority: 'Medium', priorityCls: 'bg-amber-500/15 text-amber-400', avatar: 'JD', avatarBg: 'bg-indigo-600' },
    ],
  },
  {
    id: 'review', label: 'Review', dot: '#a78bfa',
    tasks: [
      { title: 'Mobile responsive fixes',  priority: 'Medium', priorityCls: 'bg-amber-500/15 text-amber-400', avatar: 'SA', avatarBg: 'bg-violet-600' },
    ],
  },
  {
    id: 'done', label: 'Done', dot: '#34d399',
    tasks: [
      { title: 'Auth system refactor',     priority: 'High',   priorityCls: 'bg-red-500/15 text-red-400',    avatar: 'MK', avatarBg: 'bg-cyan-600' },
      { title: 'CI/CD pipeline setup',     priority: 'Low',    priorityCls: 'bg-emerald-500/15 text-emerald-400', avatar: 'JD', avatarBg: 'bg-indigo-600' },
    ],
  },
];

const KanbanMockup: React.FC = () => (
  <div
    className="relative w-full max-w-2xl"
    style={{ perspective: '1200px' }}
  >
    {/* Glow behind the card */}
    <div
      className="absolute -inset-6 rounded-3xl opacity-30 blur-3xl pointer-events-none"
      style={{ background: 'radial-gradient(ellipse at center, #6366f1 0%, #7c3aed 50%, transparent 100%)' }}
    />

    <div
      className="relative rounded-2xl border border-white/10 overflow-hidden"
      style={{
        background: 'rgba(13,15,30,0.85)',
        backdropFilter: 'blur(20px)',
        transform: 'rotateY(-12deg) rotateX(4deg)',
        boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)',
      }}
    >
      {/* Titlebar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
        <div className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
        <div className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
        <div className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
        <div className="flex-1 mx-3 h-5 rounded-md bg-white/5 flex items-center px-2">
          <span className="text-[10px] text-white/20">vectra.app/acme/projects/sprint-42</span>
        </div>
      </div>

      {/* Board */}
      <div className="flex gap-3 p-4 overflow-x-auto">
        {MOCK_BOARD.map((col) => (
          <div key={col.id} className="flex-1 min-w-[130px]">
            {/* Column header */}
            <div className="flex items-center gap-1.5 mb-3">
              <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ backgroundColor: col.dot }} />
              <span className="text-[11px] font-semibold text-white/60 truncate">{col.label}</span>
              <span className="ml-auto text-[10px] text-white/30">{col.tasks.length}</span>
            </div>

            {/* Task cards */}
            {col.tasks.map((task, ti) => (
              <div
                key={ti}
                className="mb-2 rounded-xl p-3 border border-white/5 hover:border-white/10 transition-colors"
                style={{ background: 'rgba(255,255,255,0.03)' }}
              >
                <p className="text-[11px] text-white/80 leading-tight mb-2 line-clamp-2">{task.title}</p>
                <div className="flex items-center justify-between">
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${task.priorityCls}`}>
                    {task.priority}
                  </span>
                  {task.avatar ? (
                    <div className={`h-4 w-4 rounded-full ${task.avatarBg} flex items-center justify-center flex-shrink-0`}>
                      <span className="text-[8px] font-bold text-white">{task.avatar}</span>
                    </div>
                  ) : (
                    <div className="h-4 w-4 rounded-full border border-dashed border-white/20 flex-shrink-0" />
                  )}
                </div>
              </div>
            ))}

            {/* Add task ghost */}
            <button className="w-full text-[10px] text-white/20 hover:text-white/40 py-1.5 rounded-lg border border-dashed border-white/10 hover:border-white/20 transition-colors">
              + Add task
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ── Navbar ─────────────────────────────────────────────────────────────────
const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Pricing', href: '#pricing' },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(4,6,18,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        padding: scrolled ? '12px 0' : '24px 0',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 0 20px rgba(99,102,241,0.4)' }}>
            <Zap className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-white text-xl tracking-tight">Vectra</span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm text-white/60 hover:text-white transition-colors px-4 py-2"
          >
            Sign in
          </Link>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white px-5 py-2.5 rounded-xl transition-all"
            style={{
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              boxShadow: '0 0 20px rgba(99,102,241,0.35)',
            }}
          >
            Start free <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white/60 hover:text-white p-1"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden px-6 py-5 space-y-4 animate-fade-in"
          style={{ background: 'rgba(4,6,18,0.95)', borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          {navLinks.map(({ label, href }) => (
            <a key={label} href={href} className="block text-sm text-white/60 hover:text-white py-1">
              {label}
            </a>
          ))}
          <div className="flex gap-3 pt-2">
            <Link to="/login"    className="flex-1 text-center border border-white/10 text-white/70 text-sm py-2.5 rounded-xl">Sign in</Link>
            <Link to="/register" className="flex-1 text-center bg-indigo-600 text-white text-sm font-medium py-2.5 rounded-xl">Get started</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

// ── Features ───────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: <Kanban className="h-5 w-5" />,
    title: 'Visual Kanban Boards',
    desc: 'Drag-and-drop task management with real-time updates. Move tasks across columns and watch your team sync instantly.',
    gradient: 'from-indigo-600 to-violet-600',
    glow: 'rgba(99,102,241,0.3)',
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: 'Role-Based Access Control',
    desc: 'Owner, Admin, and Member tiers. Every action is permission-checked. Your data stays yours.',
    gradient: 'from-violet-600 to-purple-700',
    glow: 'rgba(124,58,237,0.3)',
  },
  {
    icon: <Globe className="h-5 w-5" />,
    title: 'Multi-Workspace',
    desc: 'Switch between client workspaces in one click. Full data isolation between tenants — SaaS-grade architecture.',
    gradient: 'from-cyan-600 to-blue-600',
    glow: 'rgba(34,211,238,0.3)',
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: 'Team Collaboration',
    desc: 'Assign tasks, tag teammates, track who is working on what. Full visibility into your team\'s workload.',
    gradient: 'from-emerald-600 to-teal-600',
    glow: 'rgba(52,211,153,0.3)',
  },
  {
    icon: <GitBranch className="h-5 w-5" />,
    title: 'Priority Management',
    desc: 'Mark tasks as Low, Medium, or High priority. Filter and sort boards to focus on what matters most.',
    gradient: 'from-amber-600 to-orange-600',
    glow: 'rgba(251,191,36,0.3)',
  },
  {
    icon: <Sparkles className="h-5 w-5" />,
    title: 'Clean, Fast UI',
    desc: 'Built on React + Vite. Sub-second load times, smooth animations, zero bloat. Feels great to use every day.',
    gradient: 'from-rose-600 to-pink-600',
    glow: 'rgba(244,63,94,0.3)',
  },
];

// ── Steps ─────────────────────────────────────────────────────────────────
const STEPS = [
  { n: '01', title: 'Create a workspace', desc: 'Set up your team\'s workspace in seconds. Invite members and assign roles instantly.' },
  { n: '02', title: 'Build your projects', desc: 'Create projects, break them into tasks, set priorities and due dates.' },
  { n: '03', title: 'Ship together', desc: 'Drag tasks across the Kanban board as work progresses. Everyone stays in sync.' },
];

// ── Testimonials ──────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote: 'We replaced Jira and Asana with Vectra in one afternoon. The Kanban board is buttery smooth and the role system just works.',
    name: 'Priya Sharma', role: 'CTO at Loopline', avatar: 'PS', color: 'bg-indigo-600',
  },
  {
    quote: 'Managing 4 client workspaces from one login is a game-changer. The multi-tenant isolation means I never worry about data leaks.',
    name: 'Marcus Klein', role: 'Founder at Devshift', avatar: 'MK', color: 'bg-violet-600',
  },
  {
    quote: 'The drag-and-drop is so satisfying. Tasks snap into place, updates persist instantly. It feels like a native app.',
    name: 'Aisha Obi', role: 'PM at Stackfire', avatar: 'AO', color: 'bg-cyan-600',
  },
];

// ── Pricing ───────────────────────────────────────────────────────────────
const PLANS = [
  {
    name: 'Free', price: '$0', period: 'forever',
    desc: 'Perfect for small teams getting started.',
    features: ['1 workspace', 'Up to 3 projects', 'Unlimited tasks', 'Kanban boards', '3 team members', 'Email support'],
    cta: 'Start for free',
    href: '/register',
    highlight: false,
  },
  {
    name: 'Pro', price: '$15', period: 'per month',
    desc: 'For growing teams that need more power.',
    features: ['Unlimited workspaces', 'Unlimited projects', 'Unlimited tasks', 'Advanced RBAC', 'Unlimited members', 'Priority support', 'Custom integrations', 'Analytics dashboard'],
    cta: 'Upgrade to Pro',
    href: '/register',
    highlight: true,
  },
];

// ── Stats bar ─────────────────────────────────────────────────────────────
const STATS = [
  { value: '12,000+', label: 'Teams using Vectra' },
  { value: '2M+',     label: 'Tasks completed' },
  { value: '99.9%',   label: 'Uptime SLA' },
  { value: '< 200ms', label: 'API response time' },
];

// ── Landing Page ──────────────────────────────────────────────────────────
const LandingPage: React.FC = () => {
  const featuresReveal = useReveal();
  const stepsReveal    = useReveal();
  const priceReveal    = useReveal();
  const testReveal     = useReveal();

  return (
    <div className="min-h-screen" style={{ background: '#04060f', color: '#e8eaf6' }}>
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Three.js canvas */}
        <HeroCanvas />

        {/* Radial gradient overlay to darken edges */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(4,6,15,0) 0%, rgba(4,6,15,0.7) 100%)',
          }}
        />
        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #04060f)' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Left column — text */}
            <div className="flex-1 text-center lg:text-left animate-fade-in">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-xs font-semibold"
                style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)', color: '#a78bfa' }}>
                <Sparkles className="h-3 w-3" /> Kanban-first project management
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6">
                <span className="text-white">Build.</span>{' '}
                <span className="text-white">Ship.</span>{' '}
                <br />
                <span
                  style={{
                    background: 'linear-gradient(135deg, #6366f1 0%, #a78bfa 50%, #22d3ee 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Win together.
                </span>
              </h1>

              <p className="text-lg text-white/50 max-w-xl mb-10 leading-relaxed mx-auto lg:mx-0">
                Vectra is the multi-tenant project management platform built for modern SaaS teams.
                Visual Kanban boards, role-based access, and real-time sync — all in one workspace.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link
                  to="/register"
                  id="hero-cta-primary"
                  className="inline-flex items-center justify-center gap-2 font-semibold text-white px-8 py-4 rounded-2xl text-base transition-all hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    boxShadow: '0 0 30px rgba(99,102,241,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
                  }}
                >
                  Get started free <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 font-medium text-white/70 hover:text-white px-8 py-4 rounded-2xl text-base transition-all border"
                  style={{ borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)' }}
                >
                  <Play className="h-4 w-4" /> See how it works
                </a>
              </div>

              <p className="mt-5 text-xs text-white/30">
                No credit card required · Free forever plan · Up in 60 seconds
              </p>
            </div>

            {/* Right column — Kanban mockup */}
            <div className="flex-1 w-full flex justify-center lg:justify-end animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <KanbanMockup />
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────────────────── */}
      <section
        className="py-12 border-y"
        style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-3xl font-black text-white mb-1"
                  style={{
                    background: 'linear-gradient(135deg, #e8eaf6, #a78bfa)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                  {value}
                </p>
                <p className="text-sm text-white/40">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section id="features" className="py-32 px-6">
        <div
          ref={featuresReveal.ref}
          className={`max-w-7xl mx-auto transition-all duration-700 ${featuresReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', color: '#8b5cf6' }}>
              <Sparkles className="h-3 w-3" /> Everything your team needs
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-5">
              Built for how{' '}
              <span style={{ background: 'linear-gradient(135deg, #6366f1, #22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                teams actually work
              </span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto text-lg">
              No bloated features. No steep learning curves. Just the tools you need to ship faster.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className="group relative rounded-2xl p-6 border transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  borderColor: 'rgba(255,255,255,0.06)',
                  animationDelay: `${i * 80}ms`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(99,102,241,0.3)';
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${f.glow}`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                <div
                  className={`h-10 w-10 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center text-white mb-5`}
                  style={{ boxShadow: `0 0 20px ${f.glow}` }}
                >
                  {f.icon}
                </div>
                <h3 className="font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-32 px-6 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, #6366f1, transparent)' }} />

        <div
          ref={stepsReveal.ref}
          className={`max-w-5xl mx-auto transition-all duration-700 ${stepsReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-5">Up and running in minutes</h2>
            <p className="text-white/50 text-lg">Three steps. That's it.</p>
          </div>

          <div className="relative">
            {/* Connector line */}
            <div className="hidden lg:block absolute top-16 left-[16.67%] right-[16.67%] h-px"
              style={{ background: 'linear-gradient(to right, transparent, rgba(99,102,241,0.4), transparent)' }} />

            <div className="grid lg:grid-cols-3 gap-10">
              {STEPS.map((step, i) => (
                <div key={step.n} className="relative text-center lg:text-left">
                  <div
                    className="inline-flex h-12 w-12 rounded-2xl items-center justify-center font-black text-sm mb-5 relative"
                    style={{
                      background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                      boxShadow: '0 0 25px rgba(99,102,241,0.5)',
                    }}
                  >
                    {step.n}
                    {i < STEPS.length - 1 && (
                      <ChevronRight className="hidden lg:block absolute -right-9 top-1/2 -translate-y-1/2 h-4 w-4 text-indigo-500/40" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-white/50 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCT SHOWCASE ─────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div
            className="relative rounded-3xl overflow-hidden border"
            style={{
              background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(124,58,237,0.05))',
              borderColor: 'rgba(99,102,241,0.2)',
              boxShadow: '0 0 60px rgba(99,102,241,0.15), inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
          >
            <div className="px-8 py-10 text-center">
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.25)', color: '#a78bfa' }}>
                <Lock className="h-3 w-3" /> Enterprise-grade multi-tenancy
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
                One platform, infinite workspaces
              </h2>
              <p className="text-white/50 max-w-2xl mx-auto mb-10">
                Every workspace is completely isolated. Invite clients, manage separate teams, and switch contexts
                in one click — all from a single login.
              </p>

              {/* Workspace switcher mockup */}
              <div className="inline-flex flex-col gap-2 text-left w-72 rounded-2xl p-4 border"
                style={{ background: 'rgba(4,6,15,0.8)', borderColor: 'rgba(255,255,255,0.08)' }}>
                <p className="text-xs text-white/40 px-1 mb-1">Your workspaces</p>
                {['Acme Corp', 'Devshift Labs', 'Personal Projects'].map((ws, i) => (
                  <div
                    key={ws}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-colors"
                    style={{
                      borderColor: i === 0 ? 'rgba(99,102,241,0.35)' : 'transparent',
                      background: i === 0 ? 'rgba(99,102,241,0.1)' : 'rgba(255,255,255,0.02)',
                    }}
                  >
                    <div
                      className="h-7 w-7 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                      style={{ background: ['#6366f1', '#7c3aed', '#0891b2'][i] }}
                    >
                      {ws[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-white truncate">{ws}</p>
                      <p className="text-[10px] text-white/30">{['Owner', 'Admin', 'Owner'][i]}</p>
                    </div>
                    {i === 0 && <div className="h-2 w-2 rounded-full bg-indigo-400 flex-shrink-0" />}
                  </div>
                ))}
                <button
                  className="flex items-center gap-2 px-3 py-2 text-xs text-white/30 hover:text-white/60 transition-colors"
                >
                  <span className="text-base leading-none">+</span> New workspace
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div
          ref={testReveal.ref}
          className={`max-w-6xl mx-auto transition-all duration-700 ${testReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-3">Loved by teams worldwide</h2>
            <p className="text-white/40">Don't just take our word for it.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl p-6 border transition-all hover:scale-[1.02]"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  borderColor: 'rgba(255,255,255,0.06)',
                }}
              >
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-5">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className={`h-9 w-9 rounded-full ${t.color} flex items-center justify-center text-xs font-bold text-white flex-shrink-0`}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-white/40">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────────────────── */}
      <section id="pricing" className="py-32 px-6">
        <div
          ref={priceReveal.ref}
          className={`max-w-4xl mx-auto transition-all duration-700 ${priceReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-5">Simple, honest pricing</h2>
            <p className="text-white/50 text-lg">Start free. Upgrade when you need more.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className="relative rounded-2xl p-8 border transition-all hover:scale-[1.01]"
                style={{
                  background: plan.highlight
                    ? 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(124,58,237,0.1))'
                    : 'rgba(255,255,255,0.02)',
                  borderColor: plan.highlight ? 'rgba(99,102,241,0.4)' : 'rgba(255,255,255,0.07)',
                  boxShadow: plan.highlight ? '0 0 40px rgba(99,102,241,0.2)' : 'none',
                }}
              >
                {plan.highlight && (
                  <div
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white"
                    style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
                  >
                    Most popular
                  </div>
                )}

                <div className="mb-6">
                  <p className="text-sm font-semibold text-white/50 mb-2">{plan.name}</p>
                  <div className="flex items-end gap-1 mb-1">
                    <span className="text-5xl font-black text-white">{plan.price}</span>
                    <span className="text-white/40 mb-1.5 text-sm">/{plan.period}</span>
                  </div>
                  <p className="text-sm text-white/50">{plan.desc}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-white/70">
                      <Check className="h-4 w-4 text-indigo-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  to={plan.href}
                  className="block w-full text-center font-semibold py-3.5 rounded-xl text-sm transition-all"
                  style={
                    plan.highlight
                      ? {
                          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                          color: 'white',
                          boxShadow: '0 0 25px rgba(99,102,241,0.4)',
                        }
                      : {
                          border: '1px solid rgba(255,255,255,0.1)',
                          color: 'rgba(255,255,255,0.7)',
                          background: 'rgba(255,255,255,0.03)',
                        }
                  }
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center relative">
          {/* Glow */}
          <div className="absolute inset-0 rounded-3xl opacity-20 blur-3xl pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, #6366f1, #7c3aed, transparent)' }} />

          <div
            className="relative rounded-3xl p-16 border"
            style={{
              background: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(124,58,237,0.08), rgba(34,211,238,0.06))',
              borderColor: 'rgba(99,102,241,0.25)',
              boxShadow: '0 0 60px rgba(99,102,241,0.15), inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
          >
            <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.25)', color: '#a78bfa' }}>
              <Zap className="h-3 w-3" /> Ready to get started?
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-5">
              Your team deserves better tools.
            </h2>
            <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto">
              Join thousands of teams who ship faster with Vectra. Free forever. No credit card needed.
            </p>
            <Link
              to="/register"
              id="cta-banner-btn"
              className="inline-flex items-center gap-2 font-bold text-white px-10 py-4 rounded-2xl text-base transition-all hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                boxShadow: '0 0 40px rgba(99,102,241,0.5), inset 0 1px 0 rgba(255,255,255,0.15)',
              }}
            >
              Create your free workspace <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer
        className="py-16 px-6 border-t"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-12">
            {/* Brand */}
            <div className="max-w-xs">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                  <Zap className="h-4 w-4 text-white" />
                </div>
                <span className="font-bold text-white text-lg">Vectra</span>
              </div>
              <p className="text-sm text-white/40 leading-relaxed">
                The Kanban-first project management platform for modern SaaS teams.
              </p>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
              <div>
                <p className="font-semibold text-white mb-3">Product</p>
                {['Features', 'Pricing', 'Changelog', 'Roadmap'].map((l) => (
                  <a key={l} href="#" className="block text-white/40 hover:text-white py-1 transition-colors">{l}</a>
                ))}
              </div>
              <div>
                <p className="font-semibold text-white mb-3">Company</p>
                {['About', 'Blog', 'Careers', 'Press'].map((l) => (
                  <a key={l} href="#" className="block text-white/40 hover:text-white py-1 transition-colors">{l}</a>
                ))}
              </div>
              <div>
                <p className="font-semibold text-white mb-3">Legal</p>
                {['Privacy', 'Terms', 'Security', 'Cookie policy'].map((l) => (
                  <a key={l} href="#" className="block text-white/40 hover:text-white py-1 transition-colors">{l}</a>
                ))}
              </div>
            </div>
          </div>

          <div
            className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t text-xs text-white/30"
            style={{ borderColor: 'rgba(255,255,255,0.05)' }}
          >
            <p>© 2026 Vectra Inc. All rights reserved.</p>
            <p>Built with ❤️ using React, Django & Three.js</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
