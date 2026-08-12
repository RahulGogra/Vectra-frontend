import { MarketingLayout } from '../../components/marketing/MarketingLayout';
import { ArrowRight, Sparkles, Wrench, Zap, CheckCircle2 } from 'lucide-react';

const RELEASES = [
  {
    version: 'v1.3.0',
    date: 'August 10, 2026',
    intro: 'This month we focused on making Vectra feel faster and more intuitive. The core Kanban experience got a major rewrite under the hood for smoother drag-and-drop.',
    highlights: [
      { type: 'improved', text: 'Rewrote the Kanban board drag-and-drop engine for 60fps performance even with 1000+ tasks.' },
      { type: 'new', text: 'Added bulk task update API endpoints.' },
      { type: 'improved', text: 'Major improvements to mobile responsiveness on the dashboard.' },
      { type: 'fixed', text: 'Fixed a bug where avatars would occasionally flicker on task re-render.' }
    ]
  },
  {
    version: 'v1.2.0',
    date: 'July 15, 2026',
    intro: 'Multi-tenancy is here! You can now manage multiple client workspaces from a single Vectra account without having to log in and out.',
    highlights: [
      { type: 'new', text: 'Multi-workspace support with isolated data per tenant.' },
      { type: 'new', text: 'Global workspace switcher added to the sidebar.' },
      { type: 'improved', text: 'Role permissions overhaul: Owners now have explicit control over workspace deletion.' },
      { type: 'fixed', text: 'Fixed an issue with JWT token refresh looping.' }
    ]
  },
  {
    version: 'v1.1.0',
    date: 'June 02, 2026',
    intro: 'We heard your feedback: prioritization is hard without explicit tools. We\'ve added robust metadata fields to all tasks.',
    highlights: [
      { type: 'new', text: 'Task due dates with visual overdue indicators.' },
      { type: 'new', text: 'Priority labels (Low, Medium, High) with color coding.' },
      { type: 'new', text: 'Filter board by assignee or priority.' },
      { type: 'performance', text: 'Reduced initial payload size by 45%.' }
    ]
  },
  {
    version: 'v1.0.0',
    date: 'May 10, 2026',
    intro: 'Vectra is officially live! We\'ve built a clean, fast alternative to the heavy project management tools on the market.',
    highlights: [
      { type: 'new', text: 'Initial launch of visual Kanban boards.' },
      { type: 'new', text: 'Secure JWT authentication system.' },
      { type: 'new', text: 'Team management and invitations.' },
      { type: 'new', text: 'Dark mode by default.' }
    ]
  }
];

const Tag = ({ type }: { type: string }) => {
  const configs = {
    new: { icon: Sparkles, color: 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20' },
    improved: { icon: ArrowRight, color: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20' },
    fixed: { icon: Wrench, color: 'text-amber-400 bg-amber-400/10 border-amber-400/20' },
    performance: { icon: Zap, color: 'text-rose-400 bg-rose-400/10 border-rose-400/20' }
  };
  const conf = configs[type as keyof typeof configs] || { icon: CheckCircle2, color: 'text-white/70 bg-white/10 border-white/20' };
  const Icon = conf.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-bold border ${conf.color}`}>
      <Icon className="h-3 w-3" />
      {type}
    </span>
  );
};

export default function ChangelogPage() {
  return (
    <MarketingLayout>
      <div className="pt-32 pb-20 px-6 max-w-3xl mx-auto">
        <div className="mb-20">
          <h1 className="text-5xl font-black mb-6">What's new in Vectra</h1>
          <p className="text-xl text-white/50">
            We ship fast and frequently. Here's a log of everything we've been working on.
          </p>
        </div>

        <div className="relative border-l border-white/10 ml-4 space-y-16 pb-16">
          {RELEASES.map((release) => (
            <div key={release.version} className="relative pl-8">
              {/* Timeline dot */}
              <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
              
              <div className="flex items-center gap-4 mb-4">
                <h2 className="text-2xl font-bold">{release.version}</h2>
                <span className="text-white/40 text-sm font-medium">{release.date}</span>
              </div>
              
              <p className="text-white/70 mb-6 leading-relaxed">
                {release.intro}
              </p>

              <ul className="space-y-4">
                {release.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="mt-1 flex-shrink-0"><Tag type={h.type} /></div>
                    <span className="text-white/80 leading-relaxed text-sm">{h.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold mb-2">Never miss an update</h3>
          <p className="text-white/50 mb-6 text-sm">Subscribe to get notified when we ship major features.</p>
          <div className="flex max-w-md mx-auto gap-2">
            <input type="email" placeholder="your@email.com" className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-indigo-500 transition-colors" />
            <button className="px-6 py-2 rounded-lg font-medium text-sm transition-colors hover:opacity-90" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </MarketingLayout>
  );
}
