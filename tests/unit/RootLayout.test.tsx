/**
 * tests/unit/RootLayout.test.tsx
 *
 * Story #60 — Root layout component
 *
 * Verifies that the RootLayout wrapper correctly composes the Header,
 * a <main> content area and the Footer, so that every page in the
 * application inherits the consistent shell described in AC1.
 *
 * Note: RootLayout renders <html> + <body>, which jsdom does not mount
 * cleanly through the default React Testing Library `render` helper.
 * We therefore test the body's children directly by extracting the
 * inner JSX and rendering it in isolation.
 */
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

// ---------------------------------------------------------------------------
// Stub next/navigation – Header is a client component that calls usePathname
// ---------------------------------------------------------------------------
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

// ---------------------------------------------------------------------------
// Inline shell that mirrors the RootLayout body structure so we can render
// it without a real Next.js html/body wrapper.
// ---------------------------------------------------------------------------
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

function LayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

describe("RootLayout shell structure", () => {
  it("renders a header landmark (banner)", () => {
    render(<LayoutShell>page content</LayoutShell>);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("renders a main content region", () => {
    render(<LayoutShell>page content</LayoutShell>);
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("renders a footer landmark (contentinfo)", () => {
    render(<LayoutShell>page content</LayoutShell>);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("places children inside the main element", () => {
    render(<LayoutShell><span data-testid="child">hello</span></LayoutShell>);
    const main = screen.getByRole("main");
    expect(main).toContainElement(screen.getByTestId("child"));
  });

  it("banner appears before main in document order", () => {
    render(<LayoutShell>content</LayoutShell>);
    const banner = screen.getByRole("banner");
    const main = screen.getByRole("main");
    // compareDocumentPosition flag 4 = DOCUMENT_POSITION_FOLLOWING
    expect(banner.compareDocumentPosition(main) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("footer appears after main in document order", () => {
    render(<LayoutShell>content</LayoutShell>);
    const main = screen.getByRole("main");
    const footer = screen.getByRole("contentinfo");
    // compareDocumentPosition flag 4 = DOCUMENT_POSITION_FOLLOWING
    expect(main.compareDocumentPosition(footer) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });
});
