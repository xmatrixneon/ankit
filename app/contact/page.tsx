export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold text-slate-900">Contact Us</h1>

      <div className="mb-8 rounded-lg border border-slate-200 bg-white p-6">
        <p className="mb-4 text-slate-600">
          Have a question, suggestion, or found a deal that isn't working?
          We'd love to hear from you.
        </p>

        <div className="space-y-4">
          <div>
            <h2 className="mb-1 font-semibold text-slate-900">Email</h2>
            <a
              href="mailto:support@ankitofferwala.online"
              className="text-blue-600 hover:underline"
            >
              support@ankitofferwala.online
            </a>
          </div>

          <div>
            <h2 className="mb-1 font-semibold text-slate-900">Business Inquiries</h2>
            <a
              href="mailto:business@ankitofferwala.online"
              className="text-blue-600 hover:underline"
            >
              business@ankitofferwala.online
            </a>
          </div>

           <div>
            <h2 className="mb-1 font-semibold text-slate-900">Whatsapp</h2>
            <a
              href="https://wa.me/919584359201"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              +91 95843 59201
            </a>
          </div>

          <div>
            <h2 className="mb-1 font-semibold text-slate-900">Submit a Deal</h2>
            <p className="text-sm text-slate-600">
              Know about a great deal we're missing? Send it to{' '}
              <a href="mailto:deals@ankitofferwala.online" className="text-blue-600 hover:underline">
                deals@ankitofferwala.online
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
        <p className="text-sm text-slate-600">
          <strong>Note:</strong> We are not affiliated with any of the stores or brands
          listed on our site. All coupons and deals are provided for informational purposes.
        </p>
      </div>
    </div>
  );
}
