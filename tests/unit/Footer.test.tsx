import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Footer } from "@/components/layout/Footer";

describe("Footer", () => {
  it("renders the copyright notice with the current year", () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(
      screen.getByText(new RegExp(`${year} Petstore`, "i")),
    ).toBeInTheDocument();
  });

  it("renders footer navigation links with correct hrefs", () => {
    render(<Footer />);
    const nav = screen.getByRole("navigation", { name: "Footer navigation" });
    expect(nav).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("link", { name: "Products" })).toHaveAttribute(
      "href",
      "/products",
    );
    expect(screen.getByRole("link", { name: "Categories" })).toHaveAttribute(
      "href",
      "/categories",
    );
  });
});
