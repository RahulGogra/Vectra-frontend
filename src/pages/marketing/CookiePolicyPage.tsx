import { MarketingLayout } from '../../components/marketing/MarketingLayout';

export default function CookiePolicyPage() {
  return (
    <MarketingLayout>
      <div className="pt-32 pb-20 px-6 max-w-3xl mx-auto">
        <div className="mb-16 border-b border-white/10 pb-10">
          <h1 className="text-4xl font-black mb-4">Cookie Policy</h1>
          <p className="text-white/50">Last updated: August 2026</p>
        </div>

        <div className="space-y-10 text-white/70 leading-relaxed text-sm">
          <section>
            <h2 className="text-xl font-bold text-white mb-4">1. What Are Cookies</h2>
            <p>
              Cookies are small text files that are stored on your browser or device by websites, apps, online media, and advertisements. 
              Vectra uses cookies and similar technologies (like local storage) to ensure that we give you the best possible experience on our website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">2. How We Use Cookies</h2>
            <p className="mb-3">We use cookies for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Session Management:</strong> To keep you logged in securely and maintain your session across the app.</li>
              <li><strong>Preferences:</strong> To remember your settings, such as your dark mode preference or last visited workspace.</li>
              <li><strong>Analytics:</strong> To understand how visitors interact with our website, helping us improve performance and design.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">3. Types of Cookies We Use</h2>
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-left border-collapse border border-white/10 text-sm">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10">
                    <th className="py-3 px-4 font-semibold text-white">Cookie Name</th>
                    <th className="py-3 px-4 font-semibold text-white">Purpose</th>
                    <th className="py-3 px-4 font-semibold text-white">Duration</th>
                    <th className="py-3 px-4 font-semibold text-white">Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    ['vectra_access_token', 'Authenticates your session securely.', '15 minutes', 'Essential'],
                    ['vectra_refresh_token', 'Keeps you logged in between sessions.', '7 days', 'Essential'],
                    ['csrf_token', 'Protects against Cross-Site Request Forgery attacks.', 'Session', 'Essential'],
                    ['_ga', 'Google Analytics - distinguishes users.', '2 years', 'Analytics'],
                    ['_gid', 'Google Analytics - distinguishes users.', '24 hours', 'Analytics'],
                    ['theme_preference', 'Stores your UI theme choice (dark/light).', '1 year', 'Functional'],
                    ['last_workspace_id', 'Redirects you to your most recent workspace.', '30 days', 'Functional'],
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-white-[0.02]">
                      <td className="py-3 px-4 font-mono text-xs text-indigo-300">{row[0]}</td>
                      <td className="py-3 px-4">{row[1]}</td>
                      <td className="py-3 px-4 text-white/50">{row[2]}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          row[3] === 'Essential' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                          row[3] === 'Analytics' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' :
                          'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}>
                          {row[3]}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">4. Third-Party Cookies</h2>
            <p>
              In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the Service. 
              Specifically, we use Google Analytics to help us understand how users interact with our site. Google Analytics places cookies on your device to generate reports on website activity. 
              You can read more about how Google uses your personal information here: <a href="https://policies.google.com/privacy" className="text-indigo-400 hover:underline" target="_blank" rel="noreferrer">https://policies.google.com/privacy</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">5. Managing Cookies</h2>
            <p className="mb-3">
              You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in your web browser. 
              As the means by which you can refuse cookies through your web browser controls vary from browser to browser, you should visit your browser's help menu for more information.
            </p>
            <p>
              Please note that if you choose to reject essential cookies, you may still use our website, but your access to some functionality and areas of our Service (such as logging in to your workspace) will be restricted.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">6. Contact</h2>
            <p>
              If you have any questions about our use of cookies or other technologies, please email us at <a href="mailto:privacy@vectra.app" className="text-indigo-400 hover:underline">privacy@vectra.app</a>.
            </p>
          </section>
        </div>
      </div>
    </MarketingLayout>
  );
}
