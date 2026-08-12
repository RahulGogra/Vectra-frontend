import { MarketingLayout } from '../../components/marketing/MarketingLayout';
import { Link } from 'react-router-dom';
import { Kanban, Shield, Globe, Users, GitBranch, Sparkles, ArrowRight } from 'lucide-react';

const FEATURES = [
  {
    id: 'kanban',
    title: 'Visual Kanban Boards',
    icon: <Kanban className="h-8 w-8 text-indigo-400" />,
    description: 'Drag-and-drop task management with real-time updates. Move tasks across columns and watch your team sync instantly. Our boards are built for speed, handling thousands of tasks without a hiccup. Customize columns to match your exact workflow.',
    mockup: (
      <div className="flex gap-2 opacity-80 pointer-events-none">
        <div className="flex-1 bg-white/5 rounded-lg p-2 min-h-[120px]">
          <div className="h-2 w-16 bg-white/20 rounded mb-2" />
          <div className="bg-white/10 h-10 rounded-md mb-2 border border-white/5" />
          <div className="bg-white/10 h-10 rounded-md border border-white/5" />
        </div>
        <div className="flex-1 bg-white/5 rounded-lg p-2 min-h-[120px]">
          <div className="h-2 w-16 bg-white/20 rounded mb-2" />
          <div className="bg-indigo-500/20 h-10 rounded-md border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.2)]" />
        </div>
      </div>
    )
  },
  {
    id: 'rbac',
    title: 'Role-Based Access Control',
    icon: <Shield className="h-8 w-8 text-violet-400" />,
    description: 'Owner, Admin, and Member tiers. Every action is permission-checked. Your data stays yours. Restrict who can invite users, delete projects, or modify workspace settings. Security isn\'t an afterthought; it\'s baked into every endpoint.',
    mockup: (
      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2"><div className="w-6 h-6 rounded-full bg-emerald-500/20" /><div className="h-2 w-24 bg-white/20 rounded" /></div>
          <div className="text-[10px] bg-white/10 px-2 py-1 rounded text-white/50">Owner</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2"><div className="w-6 h-6 rounded-full bg-amber-500/20" /><div className="h-2 w-20 bg-white/20 rounded" /></div>
          <div className="text-[10px] bg-white/10 px-2 py-1 rounded text-white/50">Member</div>
        </div>
      </div>
    )
  },
  {
    id: 'workspaces',
    title: 'Multi-Workspace',
    icon: <Globe className="h-8 w-8 text-cyan-400" />,
    description: 'Switch between client workspaces in one click. Full data isolation between tenants — SaaS-grade architecture. Perfect for agencies managing multiple clients, or enterprises with separate departments.',
    mockup: (
      <div className="bg-white/5 rounded-lg p-3 border border-white/10 flex flex-col gap-2">
        <div className="bg-indigo-500/20 border border-indigo-500/30 p-2 rounded-md flex items-center gap-2">
          <div className="w-4 h-4 bg-indigo-500 rounded text-[8px] flex items-center justify-center font-bold">A</div>
          <div className="h-2 w-16 bg-white/40 rounded" />
        </div>
        <div className="bg-white/5 p-2 rounded-md flex items-center gap-2">
          <div className="w-4 h-4 bg-rose-500 rounded text-[8px] flex items-center justify-center font-bold">B</div>
          <div className="h-2 w-20 bg-white/20 rounded" />
        </div>
      </div>
    )
  },
  {
    id: 'collaboration',
    title: 'Team Collaboration',
    icon: <Users className="h-8 w-8 text-emerald-400" />,
    description: 'Assign tasks, tag teammates, track who is working on what. Full visibility into your team\'s workload. See assignee avatars instantly on the board to know exactly who is handling which feature.',
    mockup: (
      <div className="flex -space-x-2">
        <div className="w-8 h-8 rounded-full bg-indigo-500 border-2 border-[#04060f] z-30" />
        <div className="w-8 h-8 rounded-full bg-emerald-500 border-2 border-[#04060f] z-20" />
        <div className="w-8 h-8 rounded-full bg-amber-500 border-2 border-[#04060f] z-10" />
        <div className="w-8 h-8 rounded-full bg-white/10 border-2 border-[#04060f] flex items-center justify-center text-[10px] text-white/50">+3</div>
      </div>
    )
  },
  {
    id: 'priority',
    title: 'Priority Management',
    icon: <GitBranch className="h-8 w-8 text-amber-400" />,
    description: 'Mark tasks as Low, Medium, or High priority. Filter and sort boards to focus on what matters most. Color-coded badges make it immediately obvious what needs attention right now.',
    mockup: (
      <div className="flex gap-2">
        <div className="px-2 py-1 rounded-full bg-red-500/15 text-red-400 text-xs border border-red-500/20">High</div>
        <div className="px-2 py-1 rounded-full bg-amber-500/15 text-amber-400 text-xs border border-amber-500/20">Medium</div>
        <div className="px-2 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-xs border border-emerald-500/20">Low</div>
      </div>
    )
  },
  {
    id: 'ui',
    title: 'Clean, Fast UI',
    icon: <Sparkles className="h-8 w-8 text-rose-400" />,
    description: 'Built on React + Vite. Sub-second load times, smooth animations, zero bloat. Feels great to use every day. We obsessed over the details so you don\'t have to.',
    mockup: (
      <div className="w-full h-16 rounded-lg bg-gradient-to-r from-indigo-500/10 via-violet-500/10 to-cyan-500/10 border border-white/5 flex items-center justify-center">
        <div className="h-2 w-24 bg-white/20 rounded-full animate-pulse" />
      </div>
    )
  }
];

export default function FeaturesPage() {
  return (
    <MarketingLayout>
      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-5xl font-black mb-6">
            Every feature your team needs
          </h1>
          <p className="text-xl text-white/50 leading-relaxed">
            We built Vectra with everything you need to ship products, and nothing you don't. Experience a project management tool that actually feels like a tool, not a chore.
          </p>
        </div>

        <div className="space-y-32">
          {FEATURES.map((feat, idx) => (
            <div key={feat.id} className={`flex flex-col ${idx % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-16`}>
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex h-16 w-16 rounded-2xl bg-white/5 border border-white/10 items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,255,255,0.02)]">
                  {feat.icon}
                </div>
                <h3 className="text-3xl font-bold mb-4">{feat.title}</h3>
                <p className="text-white/60 leading-relaxed text-lg">
                  {feat.description}
                </p>
              </div>
              <div className="flex-1 w-full flex justify-center">
                <div className="w-full max-w-md p-8 rounded-3xl bg-white/5 border border-white/10 shadow-2xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10 flex items-center justify-center min-h-[160px]">
                    {feat.mockup}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-32 p-12 rounded-3xl text-center border border-white/10 bg-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/10 to-transparent pointer-events-none" />
          <h2 className="text-3xl font-bold mb-4 relative z-10">Ready to streamline your workflow?</h2>
          <p className="text-white/50 mb-8 relative z-10">Join thousands of teams already using Vectra.</p>
          <Link
            to="/register"
            className="inline-flex relative z-10 items-center gap-2 font-semibold text-white px-8 py-4 rounded-xl transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 0 20px rgba(99,102,241,0.35)' }}
          >
            Get started for free <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </MarketingLayout>
  );
}
