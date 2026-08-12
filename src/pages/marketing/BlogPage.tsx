import { MarketingLayout } from '../../components/marketing/MarketingLayout';

const POSTS = [
  {
    category: 'Product',
    catColor: 'from-indigo-500 to-violet-500',
    title: 'Why We Ditched Jira and Built Vectra',
    excerpt: 'The story behind our frustration with legacy project management tools and how we set out to build a faster, cleaner alternative.',
    date: 'Aug 12, 2026',
    author: 'RM',
    authorBg: 'bg-indigo-600',
    readTime: '5 min read'
  },
  {
    category: 'Team Tips',
    catColor: 'from-emerald-500 to-teal-500',
    title: '5 Kanban Principles Every Remote Team Should Know',
    excerpt: 'Stop moving cards blindly. Learn how WIP limits, explicit policies, and feedback loops can supercharge your remote workflow.',
    date: 'Jul 28, 2026',
    author: 'JP',
    authorBg: 'bg-amber-600',
    readTime: '8 min read'
  },
  {
    category: 'Engineering',
    catColor: 'from-cyan-500 to-blue-500',
    title: 'How Multi-Tenancy Works Under the Hood',
    excerpt: 'A deep dive into our Django database architecture, foreign key constraints, and how we ensure strict data isolation between workspaces.',
    date: 'Jul 15, 2026',
    author: 'PS',
    authorBg: 'bg-violet-600',
    readTime: '12 min read'
  },
  {
    category: 'Productivity',
    catColor: 'from-amber-500 to-orange-500',
    title: 'The Psychology of Task Prioritization',
    excerpt: 'Why everything feels urgent, and how to use the Eisenhower Matrix within Vectra to actually get the right things done.',
    date: 'Jun 30, 2026',
    author: 'MK',
    authorBg: 'bg-cyan-600',
    readTime: '6 min read'
  },
  {
    category: 'Engineering',
    catColor: 'from-cyan-500 to-blue-500',
    title: 'Building Role-Based Access Control in DRF',
    excerpt: 'How we implemented a secure, scalable RBAC system using custom Django REST Framework permissions and middleware.',
    date: 'Jun 10, 2026',
    author: 'AO',
    authorBg: 'bg-emerald-600',
    readTime: '10 min read'
  },
  {
    category: 'Company',
    catColor: 'from-rose-500 to-pink-500',
    title: 'From 0 to 10,000 Users: Our Growth Story',
    excerpt: 'The marketing experiments that worked, the ones that failed miserably, and how we found our first 10k champions.',
    date: 'May 22, 2026',
    author: 'SC',
    authorBg: 'bg-rose-600',
    readTime: '7 min read'
  }
];

export default function BlogPage() {
  return (
    <MarketingLayout>
      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black mb-6">Insights for modern teams</h1>
          <p className="text-xl text-white/50 max-w-2xl mx-auto">
            Thoughts on engineering, design, productivity, and building a SaaS company from the ground up.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {POSTS.map(post => (
            <article key={post.title} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col hover:bg-white-[0.07] transition-colors cursor-pointer group">
              <div className="mb-4">
                <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r ${post.catColor} text-white shadow-lg`}>
                  {post.category}
                </span>
              </div>
              <h2 className="text-xl font-bold mb-3 group-hover:text-indigo-300 transition-colors">{post.title}</h2>
              <p className="text-white/50 text-sm leading-relaxed mb-6 flex-1">
                {post.excerpt}
              </p>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full ${post.authorBg} flex items-center justify-center text-xs font-bold`}>
                    {post.author}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-white/40">{post.date}</span>
                  </div>
                </div>
                <span className="text-xs text-white/30">{post.readTime}</span>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="max-w-2xl mx-auto bg-gradient-to-br from-[#0a0c16] to-indigo-950/30 p-10 rounded-3xl border border-indigo-500/20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <h3 className="text-2xl font-bold mb-3 relative z-10">Get our latest posts in your inbox</h3>
          <p className="text-white/50 text-sm mb-8 relative z-10">
            No spam, ever. Just high-quality articles once a month. Unsubscribe anytime.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 relative z-10">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
            />
            <button className="px-8 py-3 rounded-xl font-medium text-sm text-white transition-transform hover:scale-[1.02]" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </MarketingLayout>
  );
}