import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart",
};

export default function CartPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
      <p className="mt-2 text-gray-600">Your cart is coming soon.</p>
    </section>
  );
}
