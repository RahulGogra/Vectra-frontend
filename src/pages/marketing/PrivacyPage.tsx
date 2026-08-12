import { MarketingLayout } from '../../components/marketing/MarketingLayout';

export default function PrivacyPage() {
  return (
    <MarketingLayout>
      <div className="pt-32 pb-20 px-6 max-w-3xl mx-auto">
        <div className="mb-16 border-b border-white/10 pb-10">
          <h1 className="text-4xl font-black mb-4">Privacy Policy</h1>
          <p className="text-white/50">Last updated: August 2026</p>
        </div>

        <div className="space-y-10 text-white/70 leading-relaxed text-sm">
          <section>
            <h2 className="text-xl font-bold text-white mb-4">1. Introduction</h2>
            <p>
              At Vectra Inc. ("Vectra", "we", "us", or "our"), we respect your privacy and are committed to protecting your personal data. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website (vectra.app) 
              or use our SaaS project management application (the "Service"). Please read this privacy policy carefully. If you do not agree 
              with the terms of this privacy policy, please do not access the site or the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">2. Information We Collect</h2>
            <p className="mb-3">We collect personal information that you voluntarily provide to us when you register on the Service, express an interest in obtaining information about us or our products, or otherwise contact us. This includes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Account Data:</strong> Name, email address, password (hashed), and profile picture.</li>
              <li><strong>Workspace Data:</strong> Information about your company, projects, tasks, and team members.</li>
              <li><strong>Usage Data:</strong> We automatically collect certain information when you visit, use, or navigate the Service. This information does not reveal your specific identity but may include device and usage information, such as your IP address, browser and device characteristics, operating system, referring URLs, device name, country, and information about how and when you use our Service.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">3. How We Use Your Information</h2>
            <p className="mb-3">We use the information we collect or receive for various business purposes, including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To facilitate account creation and logon process.</li>
              <li>To provide, operate, and maintain our Service.</li>
              <li>To improve, personalize, and expand our Service.</li>
              <li>To understand and analyze how you use our Service to drive product decisions.</li>
              <li>To communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the Service, and for marketing and promotional purposes.</li>
              <li>To send you emails regarding your account or order.</li>
              <li>To find and prevent fraud and ensure the security of our platform.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">4. Sharing Your Information</h2>
            <p>
              We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. 
              We may share your data with third-party vendors, service providers, contractors, or agents who perform services for us or on our behalf and require access to such information to do that work (e.g., AWS for hosting, Stripe for payment processing). 
              If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">5. Data Retention</h2>
            <p>
              We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law (such as tax, accounting or other legal requirements). 
              When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">6. Your Privacy Rights</h2>
            <p>
              Depending on where you are located geographically, you may have certain rights regarding your personal information, including the right to request access and obtain a copy of your personal information, to request rectification or erasure, to restrict the processing of your personal information, and, if applicable, to data portability. 
              In certain circumstances, you may also have the right to object to the processing of your personal information. To make such a request, please contact us at privacy@vectra.app.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">7. Security</h2>
            <p>
              We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. 
              Data is encrypted in transit using TLS 1.3 and at rest using AES-256. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">8. Children's Privacy</h2>
            <p>
              We do not knowingly solicit data from or market to children under 13 years of age. By using the Service, you represent that you are at least 13 or that you are the parent or guardian of such a minor and consent to such minor dependent’s use of the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">9. Changes to Policy</h2>
            <p>
              We may update this privacy notice from time to time. The updated version will be indicated by an updated "Last updated" date and the updated version will be effective as soon as it is accessible. If we make material changes to this privacy notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">10. Contact Us</h2>
            <p>
              If you have questions or comments about this notice, you may email us at <a href="mailto:privacy@vectra.app" className="text-indigo-400 hover:underline">privacy@vectra.app</a> or by post to:
              <br /><br />
              Vectra Inc.<br />
              123 Startup Way, Suite 100<br />
              San Francisco, CA 94105<br />
              United States
            </p>
          </section>
        </div>
      </div>
    </MarketingLayout>
  );
}
