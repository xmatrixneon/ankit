export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold text-slate-900">Privacy Policy</h1>

      <div className="prose prose-slate max-w-none">
        <p className="mb-4 text-sm text-slate-500">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <h2 className="mb-3 text-xl font-semibold text-slate-900">Information We Collect</h2>
        <p className="mb-4 text-slate-600">
          CouponHub collects minimal information to provide our service. We may collect:
        </p>
        <ul className="mb-4 list-disc space-y-2 pl-6 text-slate-600">
          <li>Usage data through analytics tools</li>
          <li>Browser type and device information</li>
          <li>IP address for security purposes</li>
        </ul>

        <h2 className="mb-3 text-xl font-semibold text-slate-900">How We Use Information</h2>
        <p className="mb-4 text-slate-600">
          We use the information we collect to:
        </p>
        <ul className="mb-4 list-disc space-y-2 pl-6 text-slate-600">
          <li>Improve our service and user experience</li>
          <li>Analyze usage patterns</li>
          <li>Ensure site security</li>
        </ul>

        <h2 className="mb-3 text-xl font-semibold text-slate-900">Cookies</h2>
        <p className="mb-4 text-slate-600">
          We use cookies and similar technologies to remember your preferences and
          analyze site traffic. You can control cookie settings through your browser.
        </p>

        <h2 className="mb-3 text-xl font-semibold text-slate-900">Third-Party Links</h2>
        <p className="mb-4 text-slate-600">
          Our site contains links to third-party retailers. We are not responsible for
          the privacy practices of these external sites. We encourage you to read their
          privacy policies.
        </p>

        <h2 className="mb-3 text-xl font-semibold text-slate-900">Affiliate Relationships</h2>
        <p className="mb-4 text-slate-600">
          CouponHub participates in affiliate marketing programs. When you click on links
          and make purchases, we may earn a commission. This does not affect the price
          you pay or our editorial independence.
        </p>

        <h2 className="mb-3 text-xl font-semibold text-slate-900">Contact</h2>
        <p className="text-slate-600">
          If you have questions about this privacy policy, please contact us at{' '}
          <a href="mailto:privacy@ankitofferwala.online" className="text-blue-600 hover:underline">
            privacy@ankitofferwala.online
          </a>
        </p>
      </div>
    </div>
  );
}
