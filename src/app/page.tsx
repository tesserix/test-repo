import Link from 'next/link';
import { ArrowRight, Heart, Shield, Truck } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                🐾 PetStore
              </h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/products" className="text-gray-600 hover:text-gray-900">
                Products
              </Link>
              <Link href="/categories" className="text-gray-600 hover:text-gray-900">
                Categories
              </Link>
              <Link href="/admin" className="text-gray-600 hover:text-gray-900">
                Admin
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/cart" className="text-gray-600 hover:text-gray-900">
                Cart (0)
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
              Everything Your Pet Needs
            </h2>
            <p className="mt-6 text-xl text-blue-100 max-w-3xl mx-auto">
              From premium food to fun toys, find quality products that keep your furry friends happy and healthy.
            </p>
            <div className="mt-10">
              <Link
                href="/products"
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-purple-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-3xl font-extrabold text-gray-900">
              Why Choose PetStore?
            </h3>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center">
                <Heart className="h-12 w-12 text-red-500" />
              </div>
              <h4 className="mt-4 text-xl font-semibold text-gray-900">
                Pet-First Quality
              </h4>
              <p className="mt-2 text-gray-600">
                Every product is carefully selected with your pet's health and happiness in mind.
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center">
                <Truck className="h-12 w-12 text-blue-500" />
              </div>
              <h4 className="mt-4 text-xl font-semibold text-gray-900">
                Fast Delivery
              </h4>
              <p className="mt-2 text-gray-600">
                Quick and reliable shipping so your pet gets what they need when they need it.
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center">
                <Shield className="h-12 w-12 text-green-500" />
              </div>
              <h4 className="mt-4 text-xl font-semibold text-gray-900">
                Trusted Brands
              </h4>
              <p className="mt-2 text-gray-600">
                We partner with the most trusted names in pet care for your peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h4 className="text-lg font-semibold">🐾 PetStore</h4>
            <p className="mt-2 text-gray-400">
              Your trusted partner in pet care.
            </p>
            <p className="mt-4 text-sm text-gray-500">
              © 2024 PetStore. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}