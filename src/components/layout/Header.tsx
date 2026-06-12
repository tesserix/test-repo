import Link from 'next/link'
import { useState } from 'react'
import { Container } from '@/components/ui/Container'
import { Navigation } from './Navigation'
import { NavItem } from '@/types'

const navigationItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Categories', href: '/categories' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function Header() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <header className="bg-white shadow-sm border-b border-secondary-200">
      <Container>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">🐾</span>
            </div>
            <span className="font-bold text-xl text-secondary-900">PetStore</span>
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pr-10 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-secondary-600 hover:text-primary-600 transition-colors duration-200"
                aria-label="Search"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div className="hidden lg:block">
            <Navigation items={navigationItems} />
          </div>

          {/* Cart button */}
          <div className="flex items-center space-x-4">
            <Link
              href="/cart"
              className="flex items-center space-x-2 px-4 py-2 text-secondary-600 hover:text-primary-600 transition-colors duration-200"
              aria-label="Cart (0 items)"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5H21M7 13v6a2 2 0 002 2h6a2 2 0 002-2v-6"
                />
              </svg>
              <span className="hidden sm:inline">Cart</span>
              <span className="bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                0
              </span>
            </Link>
          </div>
        </div>
      </Container>
    </header>
  )
}