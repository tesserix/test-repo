/**
 * tests/unit/Footer.accessibility.test.tsx
 *
 * Story #60 — Footer component
 * Covers acceptance criteria:
 *   AC1 – consistent layout includes a footer with navigation
 *
 * Tests focus on accessibility semantics and structural correctness
 * that complement the developer-authored Footer.test.tsx.
 */
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Footer } from "@/components/layout/Footer";

describe("Footer – landmark & semantic structure", () => {
  it("renders a <footer> landmark element with role=contentinfo", () => {
    render(<Footer />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("contains a navigation landmark inside the footer", () => {
    render(<Footer />);
    const footer = screen.getByRole("contentinfo");
    expect(
      within(footer).getByRole("navigation"),
    ).toBeInTheDocument();
  });

  it("footer navigation has an accessible label", () => {
    render(<Footer />);
    expect(
      screen.getByRole("navigation", { name: /footer navigation/i }),
    ).toBeInTheDocument();
  });
});

describe("Footer – link correctness", () => {
  it("Home link in footer points to '/'", () => {
    render(<Footer />);
    const nav = screen.getByRole("navigation", { name: /footer navigation/i });
    expect(within(nav).getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );
  });

  it("Products link in footer points to '/products'", () => {
    render(<Footer />);
    const nav = screen.getByRole("navigation", { name: /footer navigation/i });
    expect(within(nav).getByRole("link", { name: "Products" })).toHaveAttribute(
      "href",
      "/products",
    );
  });

  it("Categories link in footer points to '/categories'", () => {
    render(<Footer />);
    const nav = screen.getByRole("navigation", { name: /footer navigation/i });
    expect(
      within(nav).getByRole("link", { name: "Categories" }),
    ).toHaveAttribute("href", "/categories");
  });

  it("renders exactly 3 links inside footer navigation", () => {
    render(<Footer />);
    const nav = screen.getByRole("navigation", { name: /footer navigation/i });
    expect(within(nav).getAllByRole("link")).toHaveLength(3);
  });
});

describe("Footer – copyright notice", () => {
  it("includes the word 'Petstore' in the copyright text", () => {
    render(<Footer />);
    expect(
      screen.getByText(/petstore/i),
    ).toBeInTheDocument();
  });

  it("includes the current year in the copyright text", () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });

  it("includes 'All rights reserved' text", () => {
    render(<Footer />);
    expect(
      screen.getByText(/all rights reserved/i),
    ).toBeInTheDocument();
  });
});
