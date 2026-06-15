import Link from 'next/link'
import { PawPrint, Facebook, Instagram, Twitter } from 'lucide-react'

const QUICK_LINKS = [
  { href: '/products', label: 'All Products' },
  { href: '/products?category=', label: 'Categories' },
  { href: '/cart', label: 'Cart' },
]

const SOCIAL_LINKS = [
  { href: 'https://facebook.com', label: 'Facebook', Icon: Facebook },
  { href: 'https://instagram.com', label: 'Instagram', Icon: Instagram },
  { href: 'https://twitter.com', label: 'Twitter', Icon: Twitter },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto border-t border-gray-200 bg-gray-50">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <div className="flex items-center gap-2 text-lg font-bold text-brand-600">
            <PawPrint className="h-5 w-5" aria-hidden="true" />
            <span>PetStore</span>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Everything your pet needs, delivered with love.
          </p>
        </div>

        <nav aria-label="Footer quick links">
          <h2 className="text-sm font-semibold text-gray-900">Quick Links</h2>
          <ul className="mt-3 space-y-2">
            {QUICK_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-gray-600 transition-colors hover:text-brand-600"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold text-gray-900">Follow Us</h2>
          <ul className="mt-3 flex gap-4">
            {SOCIAL_LINKS.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="text-gray-600 transition-colors hover:text-brand-600"
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200 py-4">
        <p className="text-center text-sm text-gray-500">
          &copy; {year} PetStore. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
