"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Menu, PawPrint, ShoppingCart, X } from "lucide-react";
import { adminLink, storefrontLinks } from "@/lib/nav-links";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <Link
          href="/"
          onClick={closeMenu}
          className="flex items-center gap-2 text-lg font-bold text-gray-900"
        >
          <PawPrint aria-hidden="true" className="h-6 w-6 text-indigo-600" />
          Petstore
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {storefrontLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={clsx(
                "text-sm font-medium transition-colors hover:text-indigo-600",
                isActive(link.href) ? "text-indigo-600" : "text-gray-600",
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={adminLink.href}
            aria-current={isActive(adminLink.href) ? "page" : undefined}
            className={clsx(
              "rounded-md border px-3 py-1.5 text-sm font-medium transition-colors hover:border-indigo-600 hover:text-indigo-600",
              isActive(adminLink.href)
                ? "border-indigo-600 text-indigo-600"
                : "border-gray-300 text-gray-600",
            )}
          >
            {adminLink.label}
          </Link>
          <Link
            href="/cart"
            aria-label="Shopping cart"
            className={clsx(
              "transition-colors hover:text-indigo-600",
              isActive("/cart") ? "text-indigo-600" : "text-gray-600",
            )}
          >
            <ShoppingCart aria-hidden="true" className="h-5 w-5" />
          </Link>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <Link
            href="/cart"
            aria-label="Shopping cart"
            onClick={closeMenu}
            className="text-gray-600 hover:text-indigo-600"
          >
            <ShoppingCart aria-hidden="true" className="h-5 w-5" />
          </Link>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="text-gray-600 hover:text-indigo-600"
          >
            {menuOpen ? (
              <X aria-hidden="true" className="h-6 w-6" />
            ) : (
              <Menu aria-hidden="true" className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-gray-200 bg-white md:hidden"
        >
          <div className="space-y-1 px-4 py-3">
            {[...storefrontLinks, adminLink].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={clsx(
                  "block rounded-md px-3 py-2 text-base font-medium",
                  isActive(link.href)
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-indigo-600",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
