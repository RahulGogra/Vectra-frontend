import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Zap, ArrowRight, Menu, X } from 'lucide-react';

interface MarketingNavProps {
  /** Start transparent and fade-in on scroll (use on hero pages only) */
  transparent?: boolean;
}

const NAV_LINKS = [
  { label: 'Features', to: '/features' },
  { label: 'Pricing',  to: '/pricing'  },
  { label: 'About',    to: '/about'    },
];

export const MarketingNav: React.FC<MarketingNavProps> = ({ transparent = false }) => {
  const [scrolled, setScrolled]       = useState(!transparent);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!transparent) return;
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [transparent]);

  // Close mobile menu on route change
  useEffect(() => { 
    const timeout = setTimeout(() => setMobileOpen(false), 0);
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <nav
      id="marketing-nav"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(4,6,18,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        padding: scrolled ? '12px 0' : '24px 0',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div
            className="h-8 w-8 rounded-xl flex items-center justify-center transition-shadow group-hover:shadow-glow"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
          >
            <Zap className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-white text-xl tracking-tight">Vectra</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, to }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={label}
                to={to}
                className="text-sm transition-colors"
                style={{ color: isActive ? '#a78bfa' : 'rgba(255,255,255,0.55)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'white'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = isActive ? '#a78bfa' : 'rgba(255,255,255,0.55)'; }}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm transition-colors px-4 py-2"
            style={{ color: 'rgba(255,255,255,0.55)' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'white'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)'; }}
          >
            Sign in
          </Link>
          <Link
            to="/register"
            id="nav-get-started"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white px-5 py-2.5 rounded-xl transition-all hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              boxShadow: '0 0 20px rgba(99,102,241,0.35)',
            }}
          >
            Get started <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden transition-colors p-1"
          style={{ color: 'rgba(255,255,255,0.6)' }}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden px-6 py-5 space-y-4 animate-fade-in"
          style={{ background: 'rgba(4,6,18,0.97)', borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          {NAV_LINKS.map(({ label, to }) => (
            <Link key={label} to={to} className="block text-sm py-1" style={{ color: 'rgba(255,255,255,0.6)' }}>
              {label}
            </Link>
          ))}
          <div className="flex gap-3 pt-2">
            <Link to="/login"    className="flex-1 text-center border text-sm py-2.5 rounded-xl" style={{ borderColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}>Sign in</Link>
            <Link to="/register" className="flex-1 text-center text-white text-sm font-medium py-2.5 rounded-xl" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>Get started</Link>
          </div>
        </div>
      )}
    </nav>
  );
};
