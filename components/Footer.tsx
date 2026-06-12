import Link from 'next/link';

const footerLinks = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
  { href: '/contact', label: 'Contact' },
];

export function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Ankitofferwala
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Discover the latest deals, coupons, and exclusive offers from
              leading brands and online stores.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
              Quick Links
            </h4>
            <ul className="mt-3 space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 transition-colors hover:text-slate-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Address */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
              Address
            </h4>

            <address className="mt-3 not-italic text-sm leading-6 text-slate-600">
              <p>S/O: Charan Singh</p>
              <p>Naya Gaon, Sikandrabad Rural</p>
              <p>PO: Sikandrabad</p>
              <p>District: Bulandshahr</p>
              <p>Uttar Pradesh - 203205</p>
              <p>India</p>
            </address>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
              Contact
            </h4>

            <div className="mt-3 space-y-2 text-sm text-slate-600">
              <p>
                <span className="font-medium text-slate-800">WhatsApp:</span>
              </p>

              <a
                href="https://wa.me/919584359201"
                target="_blank"
                rel="noopener noreferrer"
                className="block  hover:text-green-700"
              >
                +91 95843 59201
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t pt-6">
          <p className="text-center text-sm text-slate-500">
            © {new Date().getFullYear()} Ankitofferwala. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}