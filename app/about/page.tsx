export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold text-slate-900">About CouponHub</h1>

      <div className="prose prose-slate max-w-none">
        <p className="mb-4 text-slate-600">
          CouponHub is your trusted source for verified deals and coupons from top retailers.
          We scour the web to find the best discounts so you don&apos;t have to.
        </p>

        <h2 className="mb-3 text-xl font-semibold text-slate-900">Our Mission</h2>
        <p className="mb-4 text-slate-600">
          We believe everyone deserves to save money on the things they need and love.
          Our team works daily to verify deals, update expired offers, and bring you
          the most current savings opportunities.
        </p>

        <h2 className="mb-3 text-xl font-semibold text-slate-900">How It Works</h2>
        <ul className="mb-4 list-disc space-y-2 pl-6 text-slate-600">
          <li>Browse categories or search for your favorite stores</li>
          <li>Find a deal that interests you</li>
          <li>Copy the coupon code (if required)</li>
          <li>Click through to the store and apply the code at checkout</li>
          <li>Enjoy your savings!</li>
        </ul>

        <h2 className="mb-3 text-xl font-semibold text-slate-900">Verified Deals</h2>
        <p className="text-slate-600">
          Look for the "Verified" badge on our deals. These have been tested and confirmed
          to work by our team. We update our database daily to ensure you're always
          seeing current offers.
        </p>
      </div>
    </div>
  );
}
