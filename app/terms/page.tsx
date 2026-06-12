export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold text-slate-900">Terms of Service</h1>

      <div className="prose prose-slate max-w-none">
        <p className="mb-4 text-sm text-slate-500">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <h2 className="mb-3 text-xl font-semibold text-slate-900">Acceptance of Terms</h2>
        <p className="mb-4 text-slate-600">
          By accessing and using CouponHub, you accept and agree to be bound by these
          Terms of Service. If you do not agree to these terms, please do not use our service.
        </p>

        <h2 className="mb-3 text-xl font-semibold text-slate-900">Description of Service</h2>
        <p className="mb-4 text-slate-600">
          CouponHub is a coupon aggregation website that displays deals and discounts
          from various third-party retailers. We do not sell products directly. All
          purchases are made through third-party websites.
        </p>

        <h2 className="mb-3 text-xl font-semibold text-slate-900">Accuracy of Information</h2>
        <p className="mb-4 text-slate-600">
          While we strive to provide accurate and up-to-date information, we cannot guarantee
          that all coupons and deals are current or error-free. Retailers may change or
          discontinue promotions without notice. We recommend verifying deals at the retailer's
          website before making a purchase.
        </p>

        <h2 className="mb-3 text-xl font-semibold text-slate-900">User Conduct</h2>
        <p className="mb-4 text-slate-600">
          You agree not to:
        </p>
        <ul className="mb-4 list-disc space-y-2 pl-6 text-slate-600">
          <li>Use automated tools to scrape or harvest data from our site</li>
          <li>Attempt to gain unauthorized access to our systems</li>
          <li>Use our service for any illegal or unauthorized purpose</li>
          <li>Reproduce, modify, or distribute our content without permission</li>
        </ul>

        <h2 className="mb-3 text-xl font-semibold text-slate-900">Affiliate Disclosure</h2>
        <p className="mb-4 text-slate-600">
          CouponHub contains affiliate links. When you make a purchase through these links,
          we may earn a commission. This helps support our service at no additional cost to you.
        </p>

        <h2 className="mb-3 text-xl font-semibold text-slate-900">Disclaimer of Warranties</h2>
        <p className="mb-4 text-slate-600">
          CouponHub is provided "as is" without any warranties, expressed or implied. We do
          not guarantee uninterrupted or error-free operation of the service.
        </p>

        <h2 className="mb-3 text-xl font-semibold text-slate-900">Limitation of Liability</h2>
        <p className="mb-4 text-slate-600">
          CouponHub and its operators shall not be liable for any indirect, incidental,
          special, or consequential damages resulting from the use or inability to use
          our service.
        </p>

        <h2 className="mb-3 text-xl font-semibold text-slate-900">Changes to Terms</h2>
        <p className="mb-4 text-slate-600">
          We reserve the right to modify these terms at any time. Continued use of the
          service after changes constitutes acceptance of the new terms.
        </p>

        <h2 className="mb-3 text-xl font-semibold text-slate-900">Contact</h2>
        <p className="text-slate-600">
          Questions about these terms? Contact us at{' '}
          <a href="mailto:legal@couponhub.com" className="text-blue-600 hover:underline">
            legal@couponhub.com
          </a>
        </p>
      </div>
    </div>
  );
}
