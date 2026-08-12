import { MarketingLayout } from '../../components/marketing/MarketingLayout';
import { Shield, Lock, Activity, Server, AlertTriangle } from 'lucide-react';

export default function SecurityPage() {
  return (
    <MarketingLayout>
      <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex h-20 w-20 rounded-full bg-indigo-500/10 items-center justify-center mb-6 border border-indigo-500/20 shadow-[0_0_40px_rgba(99,102,241,0.2)]">
            <Shield className="h-10 w-10 text-indigo-400" />
          </div>
          <h1 className="text-5xl font-black mb-6">Security is our foundation</h1>
          <p className="text-xl text-white/50 max-w-2xl mx-auto">
            We employ enterprise-grade security measures to ensure your project data remains isolated, encrypted, and highly available.
          </p>
        </div>

        {/* Trust Metrics */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center">
            <Lock className="h-8 w-8 text-white/70 mx-auto mb-4" />
            <h3 className="font-bold mb-1">AES-256 Encryption</h3>
            <p className="text-xs text-white/50">At rest and in transit</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center">
            <Shield className="h-8 w-8 text-white/70 mx-auto mb-4" />
            <h3 className="font-bold mb-1">SOC 2 Type II</h3>
            <p className="text-xs text-white/50">Audit in progress</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center">
            <Activity className="h-8 w-8 text-white/70 mx-auto mb-4" />
            <h3 className="font-bold mb-1">99.9% Uptime SLA</h3>
            <p className="text-xs text-white/50">Backed by AWS infrastructure</p>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-12 text-white/70 leading-relaxed text-sm">
          <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <Server className="h-6 w-6 text-indigo-400" />
              <h2 className="text-xl font-bold text-white">1. Infrastructure Security</h2>
            </div>
            <p className="mb-3">
              Vectra is hosted on Amazon Web Services (AWS), utilizing their highly secure, compliant data centers. 
              Our infrastructure is deployed across multiple availability zones to ensure fault tolerance.
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>All application servers reside within a Virtual Private Cloud (VPC) with strict firewall rules.</li>
              <li>Network traffic is protected by AWS Shield for DDoS mitigation.</li>
              <li>Strict tenant isolation logic is enforced at the database level to ensure cross-workspace data leakage is impossible.</li>
            </ul>
          </section>

          <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="h-6 w-6 text-indigo-400" />
              <h2 className="text-xl font-bold text-white">2. Data Encryption</h2>
            </div>
            <p className="mb-3">
              We encrypt all data in transit and at rest to prevent unauthorized access.
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>In Transit:</strong> All communications between your browser and our servers are encrypted using TLS 1.3 (HTTPS).</li>
              <li><strong>At Rest:</strong> Databases and file storage are encrypted at the volume level using AES-256 encryption.</li>
              <li><strong>Backups:</strong> Database backups are taken daily, encrypted, and stored in geographically redundant AWS S3 buckets.</li>
            </ul>
          </section>

          <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-6 w-6 text-indigo-400" />
              <h2 className="text-xl font-bold text-white">3. Access Controls</h2>
            </div>
            <p className="mb-3">
              Identity and access management is core to our multi-tenant architecture.
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Authentication is handled via stateless JSON Web Tokens (JWT) with short expiration times.</li>
              <li>Tokens are stored securely in HTTP-only, secure cookies to prevent XSS attacks.</li>
              <li>Granular Role-Based Access Control (RBAC) ensures users can only perform actions permitted by their role (Owner, Admin, Member).</li>
            </ul>
          </section>

          <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <Activity className="h-6 w-6 text-indigo-400" />
              <h2 className="text-xl font-bold text-white">4. Penetration Testing</h2>
            </div>
            <p>
              Vectra engages with independent, third-party security firms to conduct annual penetration testing and vulnerability assessments. 
              These tests simulate real-world attacks to identify and remediate potential security flaws in our application and infrastructure before they can be exploited.
            </p>
          </section>

          <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-indigo-400" />
              <h2 className="text-xl font-bold text-white">5. Incident Response</h2>
            </div>
            <p>
              We maintain a comprehensive Incident Response Plan. In the event of a security incident, our engineering team is paged immediately. 
              We commit to a 24-hour SLA for triaging critical security issues. If a data breach occurs, we will notify affected users within 72 hours of discovery, in compliance with GDPR and other regulatory requirements.
            </p>
          </section>
        </div>

        {/* Responsible Disclosure */}
        <div className="mt-16 bg-gradient-to-br from-indigo-500/10 to-violet-500/10 border border-indigo-500/20 rounded-3xl p-10 text-center shadow-[0_0_40px_rgba(99,102,241,0.05)]">
          <h3 className="text-2xl font-bold mb-3 text-white">Report a Vulnerability</h3>
          <p className="text-white/70 text-sm mb-6 max-w-xl mx-auto">
            We believe in working closely with the security community. If you believe you have found a security vulnerability in Vectra, please disclose it to us responsibly. We operate a bug bounty program for validated, critical reports.
          </p>
          <a href="mailto:security@vectra.app" className="inline-flex items-center px-6 py-3 rounded-xl font-medium text-sm text-white transition-transform hover:scale-[1.02]" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
            Email security@vectra.app
          </a>
        </div>
      </div>
    </MarketingLayout>
  );
}
