import { MarketingNav } from './MarketingNav';
import { MarketingFooter } from './MarketingFooter';

interface Props {
  children: React.ReactNode;
  /** Pass true only on the hero landing page so the nav starts transparent */
  transparentNav?: boolean;
}

export const MarketingLayout: React.FC<Props> = ({ children, transparentNav = false }) => (
  <div style={{ background: '#04060f', color: '#e8eaf6', minHeight: '100vh' }}>
    <MarketingNav transparent={transparentNav} />
    {children}
    <MarketingFooter />
  </div>
);
