import { MarketingLayout } from '../../components/marketing/MarketingLayout';

export default function TermsPage() {
  return (
    <MarketingLayout>
      <div className="pt-32 pb-20 px-6 max-w-3xl mx-auto">
        <div className="mb-16 border-b border-white/10 pb-10">
          <h1 className="text-4xl font-black mb-4">Terms of Service</h1>
          <p className="text-white/50">Last updated: August 2026</p>
        </div>

        <div className="space-y-10 text-white/70 leading-relaxed text-sm">
          <section>
            <h2 className="text-xl font-bold text-white mb-4">1. Agreement to Terms</h2>
            <p>
              These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Vectra Inc. ("Vectra", "we", "us", or "our"), concerning your access to and use of the vectra.app website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the "Site"). You agree that by accessing the Site, you have read, understood, and agreed to be bound by all of these Terms of Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">2. Use License</h2>
            <p className="mb-3">
              Subject to your compliance with these Terms, Vectra grants you a limited, non-exclusive, non-transferable, revocable license to access and use the Service for your internal business or personal use.
            </p>
            <p className="mb-3">You shall not:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Modify, copy, or create derivative works of the Service.</li>
              <li>Reverse engineer, decompile, or disassemble any aspect of the Service.</li>
              <li>Use the Service to build a competitive product or service.</li>
              <li>Remove any copyright, trademark, or other proprietary notices from any portion of the Service.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">3. Account Responsibilities</h2>
            <p>
              You must provide accurate, complete, and current information when registering for an account. You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password. You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">4. Acceptable Use Policy</h2>
            <p className="mb-3">You may not access or use the Service for any purpose other than that for which we make the Service available. Prohibited activity includes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Using the Service to store or transmit infringing, libelous, or otherwise unlawful or tortious material.</li>
              <li>Using the Service to store or transmit malicious code, malware, or viruses.</li>
              <li>Interfering with or disrupting the integrity or performance of the Service.</li>
              <li>Attempting to gain unauthorized access to the Service or its related systems or networks.</li>
              <li>Using the Service to harass, abuse, or harm another person.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">5. Intellectual Property</h2>
            <p>
              The Service and its original content, features, and functionality are and will remain the exclusive property of Vectra Inc. and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Vectra Inc. You retain all right, title, and interest in and to the data, content, and information you upload to the Service ("Your Data"). You grant Vectra a worldwide, royalty-free, non-exclusive license to host and use Your Data solely to provide the Service to you.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">6. Payment & Billing</h2>
            <p>
              If you subscribe to a paid tier of the Service, you agree to pay all applicable fees as described on our pricing page. Fees are billed in advance on a recurring schedule (e.g., monthly or annually) and are non-refundable except as required by law. We reserve the right to change our pricing upon notice to you. If you upgrade your plan, the new fees will immediately apply and be prorated for the remainder of the billing cycle.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">7. Termination</h2>
            <p>
              We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms. Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service or cancel your subscription from your account settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">8. Disclaimer of Warranties</h2>
            <p>
              THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. VECTRA EXPRESSLY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">9. Limitation of Liability</h2>
            <p>
              IN NO EVENT SHALL VECTRA, NOR ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES, BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICE.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">10. Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">11. Contact</h2>
            <p>
              If you have any questions about these Terms, please contact us at <a href="mailto:legal@vectra.app" className="text-indigo-400 hover:underline">legal@vectra.app</a>.
            </p>
          </section>
        </div>
      </div>
    </MarketingLayout>
  );
}
