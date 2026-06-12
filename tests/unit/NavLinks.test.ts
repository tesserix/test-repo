/**
 * tests/unit/NavLinks.test.ts
 *
 * Story #60 — nav-links data module
 * Verifies the shape, content, and integrity of the navigation link definitions
 * that drive both Header and Footer rendering.
 */
import { describe, expect, it } from "vitest";
import {
  adminLink,
  storefrontLinks,
  type NavLink,
} from "@/lib/nav-links";

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------
const isValidHref = (href: string) => href.startsWith("/");

describe("NavLink type contract", () => {
  it("storefrontLinks is a non-empty array", () => {
    expect(Array.isArray(storefrontLinks)).toBe(true);
    expect(storefrontLinks.length).toBeGreaterThan(0);
  });

  it("every storefront link has a non-empty label and a rooted href", () => {
    storefrontLinks.forEach((link: NavLink) => {
      expect(link.label).toBeTruthy();
      expect(isValidHref(link.href)).toBe(true);
    });
  });

  it("all storefront hrefs are unique", () => {
    const hrefs = storefrontLinks.map((l) => l.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });

  it("all storefront labels are unique", () => {
    const labels = storefrontLinks.map((l) => l.label);
    expect(new Set(labels).size).toBe(labels.length);
  });
});

describe("storefrontLinks content", () => {
  it("contains a Home link pointing to '/'", () => {
    const home = storefrontLinks.find((l) => l.href === "/");
    expect(home).toBeDefined();
    expect(home?.label).toBe("Home");
  });

  it("contains a Products link pointing to '/products'", () => {
    const products = storefrontLinks.find((l) => l.href === "/products");
    expect(products).toBeDefined();
    expect(products?.label).toBe("Products");
  });

  it("contains a Categories link pointing to '/categories'", () => {
    const categories = storefrontLinks.find((l) => l.href === "/categories");
    expect(categories).toBeDefined();
    expect(categories?.label).toBe("Categories");
  });
});

describe("adminLink", () => {
  it("has a non-empty label", () => {
    expect(adminLink.label).toBeTruthy();
  });

  it("points to '/admin'", () => {
    expect(adminLink.href).toBe("/admin");
  });

  it("is distinct from all storefront links", () => {
    const storefrontHrefs = storefrontLinks.map((l) => l.href);
    expect(storefrontHrefs).not.toContain(adminLink.href);
  });
});
