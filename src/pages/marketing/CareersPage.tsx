import { MarketingLayout } from '../../components/marketing/MarketingLayout';
import { Globe2, TrendingUp, Palmtree, BookOpen, HeartPulse, DollarSign, Laptop, Coffee, Plane, Briefcase } from 'lucide-react';

const JOBS = [
  { dept: 'Engineering', title: 'Senior Full-Stack Engineer', type: 'Full-time', location: 'Remote', salary: '$140k - $180k', desc: 'Lead architecture for real-time collaborative features across our React and Django stack.' },
  { dept: 'Engineering', title: 'Backend Engineer (Django)', type: 'Full-time', location: 'Remote', salary: '$120k - $160k', desc: 'Optimize our DRF API endpoints and database queries for sub-100ms response times.' },
  { dept: 'Engineering', title: 'React Developer', type: 'Full-time', location: 'Remote', salary: '$110k - $140k', desc: 'Build beautiful, performant UI components using Tailwind CSS and Zustand.' },
  { dept: 'Design', title: 'Product Designer', type: 'Full-time', location: 'Remote (US/EU)', salary: '$120k - $150k', desc: 'Own the end-to-end design process from wireframes to high-fidelity prototypes.' },
  { dept: 'Growth', title: 'Growth Marketing Manager', type: 'Full-time', location: 'Remote', salary: '$100k - $130k', desc: 'Drive acquisition and retention through data-driven marketing experiments.' },
];

const PERKS = [
  { icon: Globe2, title: 'Remote-first', desc: 'Work from anywhere in the world. Async communication is our default.' },
  { icon: TrendingUp, title: 'Equity', desc: 'We want you to own a piece of what you build. Generous stock options.' },
  { icon: Palmtree, title: 'Unlimited PTO', desc: 'Take time when you need it. We mandate a minimum of 4 weeks off per year.' },
  { icon: BookOpen, title: 'Learning budget', desc: '$1,500/yr for books, courses, or conferences to grow your career.' },
];

const BENEFITS = [
  { icon: HeartPulse, text: 'Top-tier health, dental, and vision insurance' },
  { icon: DollarSign, text: '401(k) matching up to 5%' },
  { icon: Laptop, text: 'Latest MacBook Pro and accessories' },
  { icon: Briefcase, text: '$1,000 home office stipend' },
  { icon: Coffee, text: 'Monthly wellness & coffee budget' },
  { icon: Plane, text: 'Annual all-expenses-paid team retreats' },
];

export default function CareersPage() {
  const departments = Array.from(new Set(JOBS.map(j => j.dept)));

  return (
    <MarketingLayout>
      <div className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-24">
          <h1 className="text-5xl font-black mb-6">Come build the future of work</h1>
          <p className="text-xl text-white/50 max-w-2xl mx-auto">
            We're a small, fast-moving team building tools that make people happy. Join us on our mission to kill bloated enterprise software.
          </p>
        </div>

        {/* Culture & Perks */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold mb-10 text-center">Life at Vectra</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PERKS.map(p => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center">
                  <div className="inline-flex h-12 w-12 rounded-full bg-indigo-500/10 items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-indigo-400" />
                  </div>
                  <h3 className="font-bold mb-2">{p.title}</h3>
                  <p className="text-xs text-white/50 leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Jobs Listing */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold mb-10">Open Roles</h2>
          
          <div className="space-y-12">
            {departments.map(dept => (
              <div key={dept}>
                <h3 className="text-xl font-bold mb-4 text-indigo-300 border-b border-white/10 pb-2">{dept}</h3>
                <div className="space-y-4">
                  {JOBS.filter(j => j.dept === dept).map(job => (
                    <div key={job.title} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white/[0.07] transition-colors group">
                      <div className="flex-1">
                        <h4 className="text-lg font-bold mb-2 group-hover:text-indigo-300 transition-colors">{job.title}</h4>
                        <div className="flex flex-wrap gap-3 mb-3">
                          <span className="text-xs font-medium text-white/50 bg-white/5 px-2 py-1 rounded">{job.type}</span>
                          <span className="text-xs font-medium text-white/50 bg-white/5 px-2 py-1 rounded">{job.location}</span>
                          <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">{job.salary}</span>
                        </div>
                        <p className="text-sm text-white/60">{job.desc}</p>
                      </div>
                      <div>
                        <button className="px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors bg-white/10 hover:bg-white/20">
                          Apply Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="bg-[#0a0c16] border border-white/5 rounded-3xl p-10">
          <h2 className="text-2xl font-bold mb-8 text-center">Comprehensive Benefits</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map(b => {
              const Icon = b.icon;
              return (
                <div key={b.text} className="flex items-center gap-4">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                    <Icon className="h-5 w-5 text-white/60" />
                  </div>
                  <span className="text-sm text-white/70">{b.text}</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </MarketingLayout>
  );
}