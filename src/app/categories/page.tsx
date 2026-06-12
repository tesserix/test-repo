import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories",
};

export default function CategoriesPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
      <p className="mt-2 text-gray-600">Category browsing is coming soon.</p>
    </section>
  );
}
