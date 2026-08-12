import { MarketingLayout } from '../../components/marketing/MarketingLayout';
import { Send, Clock, CircleDot, CheckCircle2 } from 'lucide-react';

export default function RoadmapPage() {
  return (
    <MarketingLayout>
      <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black mb-6">The future of Vectra</h1>
          <p className="text-xl text-white/50 max-w-2xl mx-auto mb-8">
            We're building the ultimate project management tool. Here's exactly what we're working on next, and where we're going.
          </p>
          
          {/* Legend */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-white/70">
              <CircleDot className="h-4 w-4 text-indigo-400" /> In Progress
            </div>
            <div className="flex items-center gap-2 text-white/70">
              <Clock className="h-4 w-4 text-amber-400" /> Planned
            </div>
            <div className="flex items-center gap-2 text-white/70">
              <CheckCircle2 className="h-4 w-4 text-white/30" /> Under Consideration
            </div>
          </div>
        </div>

        {/* Roadmap Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-24 items-start">
          
          {/* Q3 2026 */}
          <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-indigo-500/50" />
            <div className="p-6 border-b border-white/5">
              <h2 className="text-xl font-bold">Q3 2026</h2>
              <p className="text-xs text-white/50">Currently in development</p>
            </div>
            <div className="p-6 space-y-4">
              {[
                { title: 'Real-time WebSockets', desc: 'See coworkers moving cards instantly without refreshing.', status: 'progress' },
                { title: 'File attachments', desc: 'Drag and drop files directly onto Kanban cards.', status: 'progress' },
                { title: 'Activity feed', desc: 'Audit log of who changed what and when.', status: 'progress' }
              ].map(f => (
                <div key={f.title} className="bg-[#04060f] p-4 rounded-xl border border-white/5">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-sm">{f.title}</h4>
                    <CircleDot className="h-4 w-4 text-indigo-400 shrink-0" />
                  </div>
                  <p className="text-xs text-white/50 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Q4 2026 */}
          <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden relative opacity-90">
            <div className="absolute top-0 left-0 right-0 h-1 bg-amber-500/50" />
            <div className="p-6 border-b border-white/5">
              <h2 className="text-xl font-bold">Q4 2026</h2>
              <p className="text-xs text-white/50">Up next</p>
            </div>
            <div className="p-6 space-y-4">
              {[
                { title: 'Time tracking', desc: 'Built-in timer for logging hours against specific tasks.', status: 'planned' },
                { title: 'Gantt chart view', desc: 'Visualize dependencies and project timelines.', status: 'planned' },
                { title: 'Slack & Jira Integrations', desc: 'Two-way sync and rich unfurling.', status: 'planned' },
                { title: 'Custom fields', desc: 'Add arbitrary key-value pairs to tasks.', status: 'planned' }
              ].map(f => (
                <div key={f.title} className="bg-[#04060f] p-4 rounded-xl border border-white/5">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-sm">{f.title}</h4>
                    <Clock className="h-4 w-4 text-amber-400 shrink-0" />
                  </div>
                  <p className="text-xs text-white/50 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Q1 2027 */}
          <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden relative opacity-75">
            <div className="absolute top-0 left-0 right-0 h-1 bg-white/20" />
            <div className="p-6 border-b border-white/5">
              <h2 className="text-xl font-bold">Q1 2027</h2>
              <p className="text-xs text-white/50">Exploring</p>
            </div>
            <div className="p-6 space-y-4">
              {[
                { title: 'AI task suggestions', desc: 'Auto-generate subtasks based on issue title.', status: 'consider' },
                { title: 'Sprint planning', desc: 'Dedicated views for agile scrum workflows.', status: 'consider' },
                { title: 'Native mobile apps', desc: 'iOS and Android native clients.', status: 'consider' }
              ].map(f => (
                <div key={f.title} className="bg-[#04060f] p-4 rounded-xl border border-white/5">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-sm text-white/80">{f.title}</h4>
                    <CheckCircle2 className="h-4 w-4 text-white/30 shrink-0" />
                  </div>
                  <p className="text-xs text-white/40 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Feature Request */}
        <div className="max-w-2xl mx-auto bg-gradient-to-br from-indigo-500/10 to-violet-500/10 p-10 rounded-3xl border border-indigo-500/20 text-center shadow-[0_0_40px_rgba(99,102,241,0.05)]">
          <div className="inline-flex h-12 w-12 rounded-full bg-indigo-500/20 items-center justify-center mb-4 border border-indigo-500/30">
            <Send className="h-5 w-5 text-indigo-400" />
          </div>
          <h3 className="text-2xl font-bold mb-3">Want to see something else?</h3>
          <p className="text-white/60 text-sm mb-8">
            We build features based on what our users actually need. Let us know what would make your workflow better.
          </p>
          <div className="flex flex-col gap-3 text-left">
            <input type="email" placeholder="Your email address" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition-colors w-full" />
            <textarea placeholder="Describe your feature request..." rows={3} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition-colors w-full resize-none" />
            <button className="w-full py-3 rounded-xl font-medium text-sm text-white mt-2 transition-transform hover:scale-[1.01]" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
              Submit Request
            </button>
          </div>
        </div>
      </div>
    </MarketingLayout>
  );
}
