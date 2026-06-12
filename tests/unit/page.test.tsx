import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "@/app/page";

describe("HomePage", () => {
  it("renders the petstore heading", () => {
    render(<HomePage />);
    expect(screen.getByRole("heading", { name: /petstore/i })).toBeInTheDocument();
  });

  it("renders the hero section", () => {
    render(<HomePage />);
    expect(screen.getByText(/everything your pet needs/i)).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(<HomePage />);
    expect(screen.getByText("Shop")).toBeInTheDocument();
    expect(screen.getByText("Admin")).toBeInTheDocument();
  });

  it("renders feature cards", () => {
    render(<HomePage />);
    expect(screen.getByText("Wide Selection")).toBeInTheDocument();
    expect(screen.getByText("Fast Shipping")).toBeInTheDocument();
    expect(screen.getByText("Expert Care")).toBeInTheDocument();
  });
});