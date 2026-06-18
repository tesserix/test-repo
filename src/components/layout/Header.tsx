'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ShoppingCart, PawPrint } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/products?category=', label: 'Categories' },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-brand-600"
        >
          <PawPrint className="h-6 w-6" aria-hidden="true" />
          <span>PetStore</span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-sm font-medium text-gray-700 transition-colors hover:text-brand-600"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href="/cart"
            aria-label="View shopping cart"
            className="rounded-full p-2 text-gray-700 transition-colors hover:bg-brand-50 hover:text-brand-600"
          >
            <ShoppingCart className="h-5 w-5" aria-hidden="true" />
          </Link>

          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            className="rounded-md p-2 text-gray-700 transition-colors hover:bg-brand-50 md:hidden"
          >
            {isOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      <div
        className={cn(
          'border-t border-gray-200 md:hidden',
          isOpen ? 'block' : 'hidden'
        )}
      >
        <ul className="space-y-1 px-4 py-3">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 transition-colors hover:bg-brand-50 hover:text-brand-600"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
