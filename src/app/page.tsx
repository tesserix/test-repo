import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-20">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-secondary-900 mb-6">
              Everything Your Pet Needs,{' '}
              <span className="text-primary-600">All in One Place</span>
            </h1>
            <p className="text-lg md:text-xl text-secondary-700 mb-8 max-w-2xl mx-auto">
              From premium food and treats to toys and accessories, we have
              quality supplies for dogs, cats, fish, and small pets. Fast
              shipping and expert advice included.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/products">Shop All Products</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/categories">Browse by Pet</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary-900 mb-12">
            Why Pet Parents Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                Fast & Free Shipping
              </h3>
              <p className="text-secondary-600">
                Free delivery on orders over $50. Same-day shipping available in
                select areas.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                Premium Quality
              </h3>
              <p className="text-secondary-600">
                Carefully curated products from trusted brands your pets will
                love.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏥</span>
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                Expert Advice
              </h3>
              <p className="text-secondary-600">
                Our team of pet care experts is here to help you make the best
                choices.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💝</span>
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                Easy Returns
              </h3>
              <p className="text-secondary-600">
                30-day return policy. If your pet doesn't love it, we'll make it
                right.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Categories Section */}
      <section className="bg-secondary-50 py-16">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary-900 mb-12">
            Shop by Pet Type
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/categories/dogs"
              className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-200 group"
            >
              <div className="text-4xl mb-4">🐕</div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2 group-hover:text-primary-600">
                Dogs
              </h3>
              <p className="text-secondary-600 text-sm">
                Food, toys, beds, and training supplies for your best friend.
              </p>
            </Link>
            <Link
              href="/categories/cats"
              className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-200 group"
            >
              <div className="text-4xl mb-4">🐱</div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2 group-hover:text-primary-600">
                Cats
              </h3>
              <p className="text-secondary-600 text-sm">
                Litter, scratching posts, toys, and gourmet treats for felines.
              </p>
            </Link>
            <Link
              href="/categories/fish"
              className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-200 group"
            >
              <div className="text-4xl mb-4">🐠</div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2 group-hover:text-primary-600">
                Fish & Aquatic
              </h3>
              <p className="text-secondary-600 text-sm">
                Tanks, filters, food, and decorations for aquatic pets.
              </p>
            </Link>
            <Link
              href="/categories/small-pets"
              className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-200 group"
            >
              <div className="text-4xl mb-4">🐹</div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2 group-hover:text-primary-600">
                Small Pets
              </h3>
              <p className="text-secondary-600 text-sm">
                Cages, food, and accessories for rabbits, hamsters, and birds.
              </p>
            </Link>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <Container>
          <div className="bg-primary-600 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Spoil Your Pet?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of happy pet parents who trust us for all their pet
              supply needs. Start shopping today!
            </p>
            <Button asChild variant="secondary" size="lg">
              <Link href="/products" className="text-primary-600">
                Start Shopping Now
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}