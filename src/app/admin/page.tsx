import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
};

export default function AdminPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-gray-900">Admin</h1>
      <p className="mt-2 text-gray-600">The admin dashboard is coming soon.</p>
    </section>
  );
}
