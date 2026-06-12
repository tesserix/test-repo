import { render, screen, fireEvent } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Header } from "@/components/layout/Header";

const usePathnameMock = vi.fn(() => "/");

vi.mock("next/navigation", () => ({
  usePathname: () => usePathnameMock(),
}));

describe("Header", () => {
  beforeEach(() => {
    usePathnameMock.mockReturnValue("/");
  });

  it("renders the brand link to the homepage", () => {
    render(<Header />);
    const brand = screen.getByRole("link", { name: /petstore/i });
    expect(brand).toHaveAttribute("href", "/");
  });

  it("renders storefront and admin navigation links with correct hrefs", () => {
    render(<Header />);
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
    expect(screen.getByRole("link", { name: "Admin" })).toHaveAttribute(
      "href",
      "/admin",
    );
  });

  it("renders cart links for desktop and mobile", () => {
    render(<Header />);
    const cartLinks = screen.getAllByRole("link", { name: "Shopping cart" });
    expect(cartLinks).toHaveLength(2);
    cartLinks.forEach((link) => expect(link).toHaveAttribute("href", "/cart"));
  });

  it("keeps the mobile menu closed by default", () => {
    render(<Header />);
    expect(screen.queryByText("Open menu")).not.toBeNull;
    const toggle = screen.getByRole("button", { name: "Open menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(document.getElementById("mobile-menu")).not.toBeInTheDocument();
  });

  it("opens and closes the mobile menu via the toggle button", () => {
    render(<Header />);
    const toggle = screen.getByRole("button", { name: "Open menu" });

    fireEvent.click(toggle);
    expect(
      screen.getByRole("button", { name: "Close menu" }),
    ).toHaveAttribute("aria-expanded", "true");
    expect(document.getElementById("mobile-menu")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Close menu" }));
    expect(document.getElementById("mobile-menu")).not.toBeInTheDocument();
  });

  it("closes the mobile menu when a navigation link is clicked", () => {
    render(<Header />);
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));

    const mobileMenu = document.getElementById("mobile-menu");
    expect(mobileMenu).toBeInTheDocument();

    const productsLinks = screen.getAllByRole("link", { name: "Products" });
    const mobileProductsLink = productsLinks.find((link) =>
      mobileMenu?.contains(link),
    );
    expect(mobileProductsLink).toBeDefined();

    fireEvent.click(mobileProductsLink as HTMLElement);
    expect(document.getElementById("mobile-menu")).not.toBeInTheDocument();
  });

  it("marks the active route with aria-current", () => {
    usePathnameMock.mockReturnValue("/products");
    render(<Header />);

    expect(screen.getByRole("link", { name: "Products" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("link", { name: "Home" })).not.toHaveAttribute(
      "aria-current",
    );
  });
});
