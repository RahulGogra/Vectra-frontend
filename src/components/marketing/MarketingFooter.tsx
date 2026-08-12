import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';

const FOOTER_LINKS = {
  Product: [
    { label: 'Features',  to: '/features'  },
    { label: 'Pricing',   to: '/pricing'   },
    { label: 'Changelog', to: '/changelog' },
    { label: 'Roadmap',   to: '/roadmap'   },
  ],
  Company: [
    { label: 'About',    to: '/about'    },
    { label: 'Blog',     to: '/blog'     },
    { label: 'Careers',  to: '/careers'  },
    { label: 'Press',    to: '/press'    },
  ],
  Legal: [
    { label: 'Privacy',        to: '/privacy'       },
    { label: 'Terms',          to: '/terms'         },
    { label: 'Security',       to: '/security'      },
    { label: 'Cookie policy',  to: '/cookie-policy' },
  ],
};

export const MarketingFooter: React.FC = () => (
  <footer
    className="py-16 px-6 border-t"
    style={{ borderColor: 'rgba(255,255,255,0.06)' }}
  >
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-12">
        {/* Brand */}
        <div className="max-w-xs">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <div
              className="h-8 w-8 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
            >
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-white text-lg">Vectra</span>
          </Link>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
            The Kanban-first project management platform for modern SaaS teams.
          </p>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <p className="font-semibold text-white mb-3">{group}</p>
              {links.map(({ label, to }) => (
                <Link
                  key={label}
                  to={to}
                  className="block py-1 transition-colors"
                  style={{ color: 'rgba(255,255,255,0.4)' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'white'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.4)'; }}
                >
                  {label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t text-xs"
        style={{ borderColor: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.3)' }}
      >
        <p>© {new Date().getFullYear()} Vectra Inc. All rights reserved.</p>
        <p>Built with ❤️ using React, Django & Three.js</p>
      </div>
    </div>
  </footer>
);
