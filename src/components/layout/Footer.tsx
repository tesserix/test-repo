'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Container } from '@/components/ui/Container'

export function Footer() {
  const [email, setEmail] = useState('')

  return (
    <footer role="contentinfo" className="bg-secondary-900 text-secondary-300">
      <Container>
        <div className="py-12">
          {/* Main footer content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="mb-4">
                <h3 className="font-bold text-xl text-white">PetStore</h3>
                <p className="text-secondary-400 text-sm mt-2">
                  Your trusted partner for all pet needs
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-white transition-colors duration-200"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shipping"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link
                    href="/returns"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Returns
                  </Link>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-semibold text-white mb-4">Categories</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/categories/dogs"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Dogs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/categories/cats"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Cats
                  </Link>
                </li>
                <li>
                  <Link
                    href="/categories/birds"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Birds
                  </Link>
                </li>
                <li>
                  <Link
                    href="/categories/fish"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Fish
                  </Link>
                </li>
                <li>
                  <Link
                    href="/categories/small-pets"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Small Pets
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h3 className="font-semibold text-white mb-4">Customer Service</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/help"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="/track-order"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Track Order
                  </Link>
                </li>
                <li>
                  <Link
                    href="/size-guide"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Size Guide
                  </Link>
                </li>
                <li>
                  <Link
                    href="/care-tips"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Care Tips
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="border-t border-secondary-800 mt-12 pt-8">
            <div>
              <h3 className="font-semibold text-white mb-4">Newsletter</h3>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2 bg-secondary-800 border border-secondary-700 rounded-lg text-white placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button
                  type="button"
                  className="px-6 py-2 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-secondary-900 transition-colors duration-200"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Social links and copyright */}
          <div className="border-t border-secondary-800 mt-8 pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center space-x-6 mb-4 sm:mb-0">
              <Link
                href="https://facebook.com/petstore"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-400 hover:text-white transition-colors duration-200"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link
                href="https://twitter.com/petstore"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-400 hover:text-white transition-colors duration-200"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link
                href="https://instagram.com/petstore"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-400 hover:text-white transition-colors duration-200"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm4.25 7.5h-1.5c-.138 0-.25.112-.25.25v4.5c0 .138.112.25.25.25h1.5c.138 0 .25-.112.25-.25v-4.5c0-.138-.112-.25-.25-.25zm-3 0c-1.381 0-2.5 1.119-2.5 2.5s1.119 2.5 2.5 2.5 2.5-1.119 2.5-2.5-1.119-2.5-2.5-2.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link
                href="https://youtube.com/petstore"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-400 hover:text-white transition-colors duration-200"
                aria-label="YouTube"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M18.54 4.24a2.25 2.25 0 00-1.58-1.6C15.64 2.25 12 2.25 12 2.25s-3.64 0-4.96.39a2.25 2.25 0 00-1.58 1.6A23.92 23.92 0 005 10a23.92 23.92 0 00.46 5.76 2.25 2.25 0 001.58 1.6c1.32.39 4.96.39 4.96.39s3.64 0 4.96-.39a2.25 2.25 0 001.58-1.6A23.92 23.92 0 0019 10a23.92 23.92 0 00-.46-5.76zM9.75 12.9V7.1L13.5 10l-3.75 2.9z" />
                </svg>
              </Link>
            </div>
            
            <div className="text-secondary-400 text-sm">
              <p className="mb-2">
                © {new Date().getFullYear()} PetStore. All rights reserved.
              </p>
              <div className="flex space-x-4">
                <Link
                  href="/privacy"
                  className="hover:text-white transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="hover:text-white transition-colors duration-200"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}