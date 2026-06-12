import Link from 'next/link'
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

          {/* Navigation */}
          <Navigation items={navigationItems} />

          {/* Action buttons */}
          <div className="flex items-center space-x-4">
            <Link
              href="/search"
              className="p-2 text-secondary-600 hover:text-primary-600 transition-colors duration-200"
              aria-label="Search products"
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
            </Link>
            
            <Link
              href="/cart"
              className="p-2 text-secondary-600 hover:text-primary-600 transition-colors duration-200 relative"
              aria-label="Shopping cart"
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
              {/* Cart count badge - will be populated by cart context later */}
              <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                0
              </span>
            </Link>
          </div>
        </div>
      </Container>
    </header>
  )
}