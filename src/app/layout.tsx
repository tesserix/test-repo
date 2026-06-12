import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | PetStore',
    default: 'PetStore - Your Trusted Pet Supply Store',
  },
  description:
    'Find everything your pet needs at PetStore. Quality supplies for dogs, cats, fish, and small pets. Fast shipping and excellent customer service.',
  keywords: [
    'pet store',
    'pet supplies',
    'dog food',
    'cat toys',
    'pet accessories',
    'animal care',
  ],
  authors: [{ name: 'PetStore Team' }],
  creator: 'PetStore',
  publisher: 'PetStore',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://petstore.example.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'PetStore - Your Trusted Pet Supply Store',
    description:
      'Find everything your pet needs at PetStore. Quality supplies for dogs, cats, fish, and small pets.',
    url: 'https://petstore.example.com',
    siteName: 'PetStore',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'PetStore - Pet Supplies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PetStore - Your Trusted Pet Supply Store',
    description:
      'Find everything your pet needs at PetStore. Quality supplies for dogs, cats, fish, and small pets.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}