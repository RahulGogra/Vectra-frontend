import { MarketingLayout } from '../../components/marketing/MarketingLayout';
import { Link } from 'react-router-dom';
import { Check, X } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

const FAQS = [
  { q: 'Can I use Vectra for free?', a: 'Yes! Our Free plan is completely free forever. It includes 1 workspace and up to 3 projects, which is perfect for individuals or small teams just getting started.' },
  { q: 'How does billing work for the Pro plan?', a: 'The Pro plan is billed at $15 per user per month. You can add or remove users at any time, and we will prorate your bill automatically.' },
  { q: 'What happens if I hit the project limit on the Free plan?', a: 'You will not be able to create new projects until you upgrade to Pro or delete an existing project. However, you will never lose access to your existing data.' },
  { q: 'Can I cancel my subscription at any time?', a: 'Absolutely. There are no long-term contracts. If you cancel, you\'ll remain on the Pro plan until the end of your current billing cycle, then be downgraded to Free.' },
  { q: 'Are team seats charged differently depending on roles?', a: 'No, all seats (Owners, Admins, and Members) are charged at the same flat rate of $15/month.' },
  { q: 'Is my data secure?', a: 'Security is our top priority. All data is encrypted at rest using AES-256 and in transit via TLS 1.3. We also perform regular third-party security audits.' },
];

export default function FullPricingPage() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return (
    <MarketingLayout>
      <div className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-black mb-6">Simple, honest pricing</h1>
          <p className="text-xl text-white/50 max-w-2xl mx-auto">
            Start for free and upgrade when your team needs more power. No hidden fees or complex tiers.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          <div className="rounded-3xl p-8 border border-white/10 bg-white/5 flex flex-col">
            <h3 className="text-xl font-bold mb-2">Free</h3>
            <p className="text-white/50 mb-6 min-h-[48px]">Perfect for individuals and small teams finding their footing.</p>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-5xl font-black">$0</span>
              <span className="text-white/50">/forever</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              {['1 Workspace', 'Up to 3 Projects', 'Unlimited Tasks', '3 Team Members', 'Standard Kanban Boards', 'Community Support'].map(f => (
                <li key={f} className="flex items-center gap-3 text-white/80"><Check className="h-5 w-5 text-indigo-400" /> {f}</li>
              ))}
            </ul>
            {isAuthenticated ? (
              <Link to="/app" className="w-full inline-block py-4 text-center rounded-xl border border-white/20 hover:bg-white/5 transition-colors font-semibold">
                Go to Workspace
              </Link>
            ) : (
              <Link to="/register" className="w-full inline-block py-4 text-center rounded-xl border border-white/20 hover:bg-white/5 transition-colors font-semibold">
                Get Started Free
              </Link>
            )}
          </div>

          <div className="rounded-3xl p-8 border border-indigo-500/30 bg-gradient-to-b from-indigo-500/10 to-transparent flex flex-col relative shadow-[0_0_30px_rgba(99,102,241,0.1)]">
            <div className="absolute top-0 right-8 -translate-y-1/2 bg-gradient-to-r from-indigo-500 to-violet-500 text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</div>
            <h3 className="text-xl font-bold mb-2 text-indigo-100">Pro</h3>
            <p className="text-indigo-200/60 mb-6 min-h-[48px]">For growing teams that need unlimited flexibility and control.</p>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-5xl font-black">$15</span>
              <span className="text-white/50">/user/month</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              {['Unlimited Workspaces', 'Unlimited Projects', 'Unlimited Tasks', 'Unlimited Team Members', 'Advanced Role-Based Access', 'Priority Email Support', 'Custom Integrations', 'Analytics Dashboard'].map(f => (
                <li key={f} className="flex items-center gap-3 text-white/80"><Check className="h-5 w-5 text-indigo-400" /> {f}</li>
              ))}
            </ul>
            {isAuthenticated ? (
              <Link to="/app" className="w-full inline-block py-4 text-center rounded-xl text-white font-semibold shadow-lg transition-transform hover:scale-[1.02]" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                Upgrade from Workspace
              </Link>
            ) : (
              <Link to="/register" className="w-full inline-block py-4 text-center rounded-xl text-white font-semibold shadow-lg transition-transform hover:scale-[1.02]" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                Upgrade to Pro
              </Link>
            )}
          </div>
        </div>

        {/* Feature Comparison */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold mb-10 text-center">Compare features</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-4 px-4 font-semibold text-white/50">Feature</th>
                  <th className="py-4 px-4 font-semibold text-center w-1/4">Free</th>
                  <th className="py-4 px-4 font-semibold text-center w-1/4">Pro</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {[
                  ['Workspaces', '1', 'Unlimited'],
                  ['Projects', '3 per workspace', 'Unlimited'],
                  ['Tasks', 'Unlimited', 'Unlimited'],
                  ['Team Members', 'Up to 3', 'Unlimited'],
                  ['Role-Based Access (RBAC)', <X className="h-4 w-4 mx-auto text-white/20" key="1" />, <Check className="h-4 w-4 mx-auto text-indigo-400" key="2" />],
                  ['Analytics Dashboard', <X className="h-4 w-4 mx-auto text-white/20" key="3" />, <Check className="h-4 w-4 mx-auto text-indigo-400" key="4" />],
                  ['Integrations', 'Basic', 'Advanced Custom'],
                  ['Support', 'Community', 'Priority Email'],
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-white-[0.02] transition-colors">
                    <td className="py-4 px-4 font-medium">{row[0]}</td>
                    <td className="py-4 px-4 text-center text-white/70">{row[1]}</td>
                    <td className="py-4 px-4 text-center text-white/70">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQs */}
        <div>
          <h2 className="text-3xl font-bold mb-10 text-center">Frequently asked questions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white/5 p-6 rounded-2xl border border-white/10">
                <h4 className="font-semibold text-lg mb-3">{faq.q}</h4>
                <p className="text-white/60 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MarketingLayout>
  );
}
