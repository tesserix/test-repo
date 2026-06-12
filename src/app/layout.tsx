import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PetStore - Your Pet Care Destination',
  description: 'Find everything your pet needs at PetStore. Quality products for dogs, cats, and more.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans antialiased">
        <main>{children}</main>
      </body>
    </html>
  );
}