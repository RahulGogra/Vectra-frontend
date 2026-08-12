import { MarketingLayout } from '../../components/marketing/MarketingLayout';
import { Download, Zap, MessageSquareQuote } from 'lucide-react';

const COLORS = [
  { name: 'Vectra Indigo', hex: '#6366f1', text: 'white' },
  { name: 'Vectra Violet', hex: '#8b5cf6', text: 'white' },
  { name: 'Midnight Background', hex: '#04060f', text: 'white' },
  { name: 'Surface Gray', hex: '#1e293b', text: 'white' },
];

const PRESS_MENTIONS = [
  { quote: 'Vectra is doing to Jira what Slack did to email. It\'s fast, beautiful, and completely rethinking how developers manage tasks.', source: 'TechCrunch' },
  { quote: 'The multi-tenant architecture is a game-changer for agencies. It\'s the first project management tool that actually understands B2B workflows.', source: 'The Verge' },
  { quote: 'Blazingly fast. If you\'re tired of waiting for loading spinners every time you move a Kanban card, Vectra is the answer.', source: 'Developer Weekly' },
  { quote: 'A masterclass in SaaS design. The dark mode implementation is gorgeous, but the performance is what keeps teams hooked.', source: 'UI/UX Magazine' },
];

export default function PressPage() {
  return (
    <MarketingLayout>
      <div className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-24">
          <h1 className="text-5xl font-black mb-6">Press & Media</h1>
          <p className="text-xl text-white/50 max-w-2xl mx-auto">
            Everything you need to write about Vectra. Find our official brand assets, guidelines, and company information below.
          </p>
        </div>

        {/* Brand Assets */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold mb-10 border-b border-white/10 pb-4">Brand Assets</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col items-center text-center">
              <div className="flex items-center gap-3 mb-8 scale-150 transform">
                <div className="h-8 w-8 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                  <Zap className="h-4 w-4 text-white" />
                </div>
                <span className="font-bold text-white text-xl tracking-tight">Vectra</span>
              </div>
              <p className="text-sm text-white/50 mb-6">Primary Logomark (Dark Background)</p>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium">
                <Download className="h-4 w-4" /> Download SVG
              </button>
            </div>
            <div className="bg-white border border-white/10 rounded-2xl p-8 flex flex-col items-center text-center">
              <div className="flex items-center gap-3 mb-8 scale-150 transform">
                <div className="h-8 w-8 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                  <Zap className="h-4 w-4 text-white" />
                </div>
                <span className="font-bold text-[#04060f] text-xl tracking-tight">Vectra</span>
              </div>
              <p className="text-sm text-[#04060f]/50 mb-6">Primary Logomark (Light Background)</p>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#04060f]/5 hover:bg-[#04060f]/10 transition-colors text-sm font-medium text-[#04060f]">
                <Download className="h-4 w-4" /> Download SVG
              </button>
            </div>
          </div>
        </div>

        {/* Colors */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold mb-10 border-b border-white/10 pb-4">Brand Colors</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {COLORS.map(c => (
              <div key={c.name} className="rounded-xl overflow-hidden border border-white/10 bg-white/5">
                <div className="h-24 w-full" style={{ backgroundColor: c.hex }} />
                <div className="p-4">
                  <p className="font-bold text-sm mb-1">{c.name}</p>
                  <p className="text-xs text-white/50 uppercase tracking-wider">{c.hex}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Press Mentions */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold mb-10 border-b border-white/10 pb-4">As Seen In</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {PRESS_MENTIONS.map((mention, i) => (
              <div key={i} className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 p-8 rounded-2xl relative">
                <MessageSquareQuote className="absolute top-6 right-6 h-8 w-8 text-white/5" />
                <p className="text-lg text-white/80 leading-relaxed font-medium mb-6 relative z-10">"{mention.quote}"</p>
                <p className="text-indigo-400 font-bold tracking-wide uppercase text-sm relative z-10">— {mention.source}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Boilerplate & Contact */}
        <div className="grid md:grid-cols-2 gap-12 pt-12 border-t border-white/10">
          <div>
            <h3 className="text-2xl font-bold mb-4">About Vectra (Boilerplate)</h3>
            <p className="text-white/60 leading-relaxed text-sm">
              Vectra is a modern project management platform designed specifically for fast-moving software teams and agencies. Founded in 2026, Vectra combines visual Kanban boards with enterprise-grade multi-tenancy and robust role-based access control. Built with performance as a primary feature, Vectra provides a blazing-fast, clutter-free alternative to legacy project management tools. Vectra is headquartered entirely on the internet with a fully remote, global team.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">Media Contact</h3>
            <p className="text-white/60 leading-relaxed text-sm mb-4">
              For press inquiries, interview requests, or additional media assets, please reach out to our communications team.
            </p>
            <a href="mailto:press@vectra.app" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors font-medium">
              press@vectra.app
            </a>
          </div>
        </div>

      </div>
    </MarketingLayout>
  );
}