'use client'

import { useState } from 'react'
import Link from 'next/link'
import { clsx } from 'clsx'
import { Button } from '@/components/ui/Button'
import { NavItem } from '@/types'

interface NavigationProps {
  items: NavItem[]
  className?: string
}

export function Navigation({ items, className }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className={clsx('relative', className)}>
      {/* Desktop Navigation */}
      <div className="hidden md:flex md:items-center md:space-x-8">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-secondary-700 hover:text-primary-600 font-medium transition-colors duration-200"
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
        >
          <div className="flex flex-col space-y-1">
            <span
              className={clsx(
                'block h-0.5 w-6 bg-current transition-all duration-200',
                isMobileMenuOpen && 'rotate-45 translate-y-1.5'
              )}
            />
            <span
              className={clsx(
                'block h-0.5 w-6 bg-current transition-all duration-200',
                isMobileMenuOpen && 'opacity-0'
              )}
            />
            <span
              className={clsx(
                'block h-0.5 w-6 bg-current transition-all duration-200',
                isMobileMenuOpen && '-rotate-45 -translate-y-1.5'
              )}
            />
          </div>
        </Button>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={clsx(
          'absolute top-full left-0 right-0 bg-white shadow-lg border-t border-secondary-200 md:hidden',
          'transition-all duration-200 ease-in-out',
          isMobileMenuOpen
            ? 'opacity-100 translate-y-0 visible'
            : 'opacity-0 -translate-y-2 invisible'
        )}
      >
        <div className="py-4 space-y-2">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-2 text-secondary-700 hover:text-primary-600 hover:bg-secondary-50 font-medium transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}