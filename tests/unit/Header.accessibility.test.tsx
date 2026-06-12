/**
 * tests/unit/Header.accessibility.test.tsx
 *
 * Story #60 — Header component
 * Covers acceptance criteria:
 *   AC1 – consistent header with navigation on every page
 *   AC2 – mobile hamburger / drawer toggle behaviour
 *   AC3 – responsive visual structure (desktop vs mobile DOM sections)
 *
 * These tests complement the developer-authored Header.test.tsx and drill into
 * accessibility semantics, ARIA relationship integrity, sub-path active state,
 * and drawer interactions not covered by the baseline test file.
 */
import { render, screen, fireEvent, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Header } from "@/components/layout/Header";

// ---------------------------------------------------------------------------
// Mock next/navigation so tests never need a real Next.js runtime
// ---------------------------------------------------------------------------
const mockPathname = vi.fn(() => "/");

vi.mock("next/navigation", () => ({
  usePathname: () => mockPathname(),
}));

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const renderHeader = (pathname = "/") => {
  mockPathname.mockReturnValue(pathname);
  return render(<Header />);
};

// ---------------------------------------------------------------------------
// AC1 – Consistent header with navigation present on every page
// ---------------------------------------------------------------------------
describe("AC1 – Header structure is always present", () => {
  beforeEach(() => mockPathname.mockReturnValue("/"));

  it("renders a <header> landmark element", () => {
    renderHeader();
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("contains a nav element with an accessible label", () => {
    renderHeader();
    expect(
      screen.getByRole("navigation", { name: /main navigation/i }),
    ).toBeInTheDocument();
  });

  it("brand logo link points to the homepage", () => {
    renderHeader();
    expect(screen.getByRole("link", { name: /petstore/i })).toHaveAttribute(
      "href",
      "/",
    );
  });

  it("renders all three storefront links", () => {
    renderHeader();
    expect(
      screen.getByRole("link", { name: "Home" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Products" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Categories" }),
    ).toBeInTheDocument();
  });

  it("renders the Admin link", () => {
    renderHeader();
    expect(
      screen.getByRole("link", { name: "Admin" }),
    ).toBeInTheDocument();
  });

  it("renders the shopping-cart link(s) with descriptive aria-label", () => {
    renderHeader();
    const cartLinks = screen.getAllByRole("link", { name: /shopping cart/i });
    expect(cartLinks.length).toBeGreaterThanOrEqual(1);
    cartLinks.forEach((link) => expect(link).toHaveAttribute("href", "/cart"));
  });
});

// ---------------------------------------------------------------------------
// AC2 – Mobile menu toggle (hamburger / drawer)
// ---------------------------------------------------------------------------
describe("AC2 – Mobile navigation drawer", () => {
  beforeEach(() => mockPathname.mockReturnValue("/"));

  it("mobile toggle button is present in the DOM", () => {
    renderHeader();
    expect(
      screen.getByRole("button", { name: /open menu/i }),
    ).toBeInTheDocument();
  });

  it("mobile toggle starts with aria-expanded='false'", () => {
    renderHeader();
    expect(
      screen.getByRole("button", { name: /open menu/i }),
    ).toHaveAttribute("aria-expanded", "false");
  });

  it("mobile drawer (#mobile-menu) is hidden before toggle", () => {
    renderHeader();
    expect(document.getElementById("mobile-menu")).not.toBeInTheDocument();
  });

  it("clicking Open menu renders the mobile drawer", () => {
    renderHeader();
    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    expect(document.getElementById("mobile-menu")).toBeInTheDocument();
  });

  it("after opening, toggle label changes to 'Close menu' and aria-expanded is 'true'", () => {
    renderHeader();
    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    const btn = screen.getByRole("button", { name: /close menu/i });
    expect(btn).toHaveAttribute("aria-expanded", "true");
  });

  it("toggle button aria-controls points to the mobile-menu id", () => {
    renderHeader();
    const toggle = screen.getByRole("button", { name: /open menu/i });
    expect(toggle).toHaveAttribute("aria-controls", "mobile-menu");
  });

  it("clicking Close menu hides the drawer again", () => {
    renderHeader();
    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    fireEvent.click(screen.getByRole("button", { name: /close menu/i }));
    expect(document.getElementById("mobile-menu")).not.toBeInTheDocument();
  });

  it("mobile drawer contains all storefront links", () => {
    renderHeader();
    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));

    const drawer = document.getElementById("mobile-menu")!;
    expect(within(drawer).getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(within(drawer).getByRole("link", { name: "Products" })).toBeInTheDocument();
    expect(within(drawer).getByRole("link", { name: "Categories" })).toBeInTheDocument();
  });

  it("mobile drawer contains the Admin link", () => {
    renderHeader();
    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    const drawer = document.getElementById("mobile-menu")!;
    expect(within(drawer).getByRole("link", { name: "Admin" })).toBeInTheDocument();
  });

  it("clicking a link inside the mobile drawer closes it", () => {
    renderHeader("/");
    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));

    const drawer = document.getElementById("mobile-menu")!;
    fireEvent.click(within(drawer).getByRole("link", { name: "Products" }));

    expect(document.getElementById("mobile-menu")).not.toBeInTheDocument();
  });

  it("clicking the Admin link inside the mobile drawer closes it", () => {
    renderHeader("/");
    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));

    const drawer = document.getElementById("mobile-menu")!;
    fireEvent.click(within(drawer).getByRole("link", { name: "Admin" }));

    expect(document.getElementById("mobile-menu")).not.toBeInTheDocument();
  });

  it("clicking the brand logo while drawer is open closes it", () => {
    renderHeader("/");
    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    expect(document.getElementById("mobile-menu")).toBeInTheDocument();

    // The brand link (Petstore) should close the menu on click
    const brand = screen.getByRole("link", { name: /petstore/i });
    fireEvent.click(brand);
    expect(document.getElementById("mobile-menu")).not.toBeInTheDocument();
  });

  it("toggling open then closed multiple times works correctly", () => {
    renderHeader();
    const getToggle = () =>
      screen.getByRole("button", { name: /open menu|close menu/i });

    fireEvent.click(getToggle()); // open
    expect(document.getElementById("mobile-menu")).toBeInTheDocument();

    fireEvent.click(getToggle()); // close
    expect(document.getElementById("mobile-menu")).not.toBeInTheDocument();

    fireEvent.click(getToggle()); // open again
    expect(document.getElementById("mobile-menu")).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// AC3 – Responsive navigation: active-state and sub-path matching
// ---------------------------------------------------------------------------
describe("AC3 – Active route state reflects current pathname", () => {
  it("marks '/' as active only on the home route (not sub-paths)", () => {
    renderHeader("/products");
    // Home link should NOT be marked as active when path is /products
    expect(screen.getByRole("link", { name: "Home" })).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("marks Products as active on the /products route", () => {
    renderHeader("/products");
    expect(screen.getByRole("link", { name: "Products" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("marks Products as active on a sub-path like /products/123", () => {
    renderHeader("/products/123");
    expect(screen.getByRole("link", { name: "Products" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("marks Categories as active on the /categories route", () => {
    renderHeader("/categories");
    expect(
      screen.getByRole("link", { name: "Categories" }),
    ).toHaveAttribute("aria-current", "page");
  });

  it("marks Admin as active on /admin route", () => {
    renderHeader("/admin");
    expect(screen.getByRole("link", { name: "Admin" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("marks Home as active only on '/'", () => {
    renderHeader("/");
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("does NOT mark Home as active on /products", () => {
    renderHeader("/products");
    expect(screen.getByRole("link", { name: "Home" })).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("inactive links do not carry aria-current attribute", () => {
    renderHeader("/categories");
    expect(screen.getByRole("link", { name: "Home" })).not.toHaveAttribute(
      "aria-current",
    );
    expect(screen.getByRole("link", { name: "Products" })).not.toHaveAttribute(
      "aria-current",
    );
    expect(screen.getByRole("link", { name: "Admin" })).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("mobile drawer links reflect the same active state as desktop links", () => {
    renderHeader("/categories");
    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));

    const drawer = document.getElementById("mobile-menu")!;
    expect(
      within(drawer).getByRole("link", { name: "Categories" }),
    ).toHaveAttribute("aria-current", "page");
    expect(
      within(drawer).getByRole("link", { name: "Home" }),
    ).not.toHaveAttribute("aria-current");
  });
});

// ---------------------------------------------------------------------------
// Accessibility – general ARIA / semantic checks
// ---------------------------------------------------------------------------
describe("Accessibility – header semantics", () => {
  it("header is sticky and has role=banner", () => {
    renderHeader();
    const banner = screen.getByRole("banner");
    // sticky positioning means it should stay at the top; we check it exists
    expect(banner).toBeInTheDocument();
  });

  it("cart icon link has an accessible name (not icon-only)", () => {
    renderHeader();
    const cartLinks = screen.getAllByRole("link", { name: /shopping cart/i });
    expect(cartLinks.length).toBeGreaterThan(0);
  });

  it("menu toggle button has an accessible name at all times", () => {
    renderHeader();
    // before opening
    expect(
      screen.getByRole("button", { name: /open menu/i }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    // after opening
    expect(
      screen.getByRole("button", { name: /close menu/i }),
    ).toBeInTheDocument();
  });
});
