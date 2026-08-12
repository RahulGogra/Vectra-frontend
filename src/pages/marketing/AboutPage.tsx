import { MarketingLayout } from '../../components/marketing/MarketingLayout';
import { Link } from 'react-router-dom';
import { Target, Eye, Zap, Heart, ArrowRight } from 'lucide-react';

const TEAM = [
  { name: 'Rahul Mehta', role: 'CEO', initials: 'RM', color: 'bg-indigo-600', tagline: 'Tabs over spaces.' },
  { name: 'Priya Sharma', role: 'CTO', initials: 'PS', color: 'bg-violet-600', tagline: 'Vim enthusiast.' },
  { name: 'Marcus Klein', role: 'Head of Design', initials: 'MK', color: 'bg-cyan-600', tagline: 'Obsessed with kerning.' },
  { name: 'Aisha Obi', role: 'Lead Engineer', initials: 'AO', color: 'bg-emerald-600', tagline: 'React hook wizard.' },
  { name: 'James Park', role: 'Product', initials: 'JP', color: 'bg-amber-600', tagline: 'Writes too many tickets.' },
  { name: 'Sofia Chen', role: 'Growth', initials: 'SC', color: 'bg-rose-600', tagline: 'A/B testing everything.' },
];

export default function AboutPage() {
  return (
    <MarketingLayout>
      <div className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-24">
          <h1 className="text-5xl font-black mb-6">Built by developers, for developers</h1>
          <p className="text-xl text-white/50 max-w-2xl mx-auto">
            We were tired of bloated, slow, and overly complex project management tools. So we built the one we wanted to use.
          </p>
        </div>

        {/* Mission */}
        <div className="bg-white/5 border border-white/10 p-10 rounded-3xl mb-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <h2 className="text-3xl font-bold mb-6 relative z-10">Our Mission</h2>
          <p className="text-white/70 text-lg leading-relaxed relative z-10 max-w-3xl">
            Vectra exists because we believe that managing work shouldn't be harder than doing the work. 
            For years, our team struggled with Jira's endless loading spinners, confusing settings, and cluttered UI. 
            We wanted a tool that got out of the way. A tool that was blazingly fast, looked beautiful in dark mode, 
            and natively supported the multi-tenant architecture modern SaaS agencies actually need. 
            That's why we built Vectra.
          </p>
        </div>

        {/* Values */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold mb-10 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: 'Simplicity', icon: Target, desc: 'We say no to 99% of feature requests. A tool that does one thing perfectly is better than one that does everything poorly.' },
              { title: 'Transparency', icon: Eye, desc: 'Honest pricing, open roadmaps, and clear communication when things break.' },
              { title: 'Speed', icon: Zap, desc: 'If an action takes more than 100ms, it\'s a bug. Performance is a feature we never compromise on.' },
              { title: 'User-obsession', icon: Heart, desc: 'We build for the person using the tool every day, not just the manager who buys it.' },
            ].map(val => {
              const Icon = val.icon;
              return (
                <div key={val.title} className="p-8 rounded-2xl bg-[#0a0c16] border border-white/5">
                  <div className="inline-flex h-12 w-12 rounded-xl bg-white/5 items-center justify-center mb-6">
                    <Icon className="h-5 w-5 text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{val.title}</h3>
                  <p className="text-white/60 leading-relaxed text-sm">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Team */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold mb-10 text-center">Meet the Team</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {TEAM.map(member => (
              <div key={member.name} className="text-center p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                <div className={`w-20 h-20 mx-auto rounded-full ${member.color} flex items-center justify-center text-xl font-bold mb-4 shadow-lg`}>
                  {member.initials}
                </div>
                <h4 className="font-bold">{member.name}</h4>
                <p className="text-xs text-indigo-300 font-medium mb-3">{member.role}</p>
                <p className="text-xs text-white/40 italic">"{member.tagline}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-12 border-t border-white/10">
          <h3 className="text-2xl font-bold mb-4">Want to join us?</h3>
          <p className="text-white/50 mb-8">We're always looking for talented people who care about craft.</p>
          <Link to="/careers" className="inline-flex items-center gap-2 font-medium text-white px-6 py-3 rounded-xl border border-white/20 hover:bg-white/5 transition-colors">
            View open roles <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </MarketingLayout>
  );
}