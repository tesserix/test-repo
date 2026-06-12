import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Header } from '@/components/layout/Header';

// Mock the Navigation component since it has complex mobile menu logic
vi.mock('@/components/layout/Navigation', () => ({
  Navigation: () => <div data-testid="navigation">Navigation</div>
}));

describe('Header', () => {
  it('renders the logo', () => {
    render(<Header />);
    expect(screen.getByText('PetStore')).toBeInTheDocument();
  });

  it('renders the search input', () => {
    render(<Header />);
    const searchInput = screen.getByPlaceholderText('Search products...');
    expect(searchInput).toBeInTheDocument();
  });

  it('renders the search button', () => {
    render(<Header />);
    const searchButton = screen.getByRole('button', { name: /search/i });
    expect(searchButton).toBeInTheDocument();
  });

  it('renders the cart button with item count', () => {
    render(<Header />);
    const cartButton = screen.getByRole('button', { name: /cart.*0.*items/i });
    expect(cartButton).toBeInTheDocument();
  });

  it('renders the navigation component', () => {
    render(<Header />);
    expect(screen.getByTestId('navigation')).toBeInTheDocument();
  });

  it('handles search input changes', () => {
    render(<Header />);
    const searchInput = screen.getByPlaceholderText('Search products...');
    fireEvent.change(searchInput, { target: { value: 'dog food' } });
    expect(searchInput).toHaveValue('dog food');
  });

  it('has proper semantic structure', () => {
    render(<Header />);
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    expect(header.tagName).toBe('HEADER');
  });

  it('cart button has proper accessibility attributes', () => {
    render(<Header />);
    const cartButton = screen.getByRole('button', { name: /cart.*0.*items/i });
    expect(cartButton).toHaveAttribute('aria-label');
  });
});