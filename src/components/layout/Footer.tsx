import Link from "next/link";
import { storefrontLinks } from "@/lib/nav-links";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Petstore. All rights reserved.
        </p>
        <nav aria-label="Footer navigation" className="flex gap-6">
          {storefrontLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-gray-500 transition-colors hover:text-indigo-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
