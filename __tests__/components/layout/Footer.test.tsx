import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Footer } from '@/components/layout/Footer';

describe('Footer', () => {
  it('renders all main sections', () => {
    render(<Footer />);
    
    // Check main heading
    expect(screen.getByText('PetStore')).toBeInTheDocument();
    expect(screen.getByText('Your trusted partner for all pet needs')).toBeInTheDocument();
    
    // Check section headings
    expect(screen.getByText('Quick Links')).toBeInTheDocument();
    expect(screen.getByText('Categories')).toBeInTheDocument();
    expect(screen.getByText('Customer Service')).toBeInTheDocument();
    expect(screen.getByText('Newsletter')).toBeInTheDocument();
  });

  it('renders quick links with proper navigation', () => {
    render(<Footer />);
    
    const aboutLink = screen.getByRole('link', { name: 'About Us' });
    const contactLink = screen.getByRole('link', { name: 'Contact' });
    const shippingLink = screen.getByRole('link', { name: 'Shipping Info' });
    const returnsLink = screen.getByRole('link', { name: 'Returns' });
    
    expect(aboutLink).toHaveAttribute('href', '/about');
    expect(contactLink).toHaveAttribute('href', '/contact');
    expect(shippingLink).toHaveAttribute('href', '/shipping');
    expect(returnsLink).toHaveAttribute('href', '/returns');
  });

  it('renders category links', () => {
    render(<Footer />);
    
    expect(screen.getByRole('link', { name: 'Dogs' })).toHaveAttribute('href', '/categories/dogs');
    expect(screen.getByRole('link', { name: 'Cats' })).toHaveAttribute('href', '/categories/cats');
    expect(screen.getByRole('link', { name: 'Birds' })).toHaveAttribute('href', '/categories/birds');
    expect(screen.getByRole('link', { name: 'Fish' })).toHaveAttribute('href', '/categories/fish');
    expect(screen.getByRole('link', { name: 'Small Pets' })).toHaveAttribute('href', '/categories/small-pets');
  });

  it('renders customer service links', () => {
    render(<Footer />);
    
    expect(screen.getByRole('link', { name: 'Help Center' })).toHaveAttribute('href', '/help');
    expect(screen.getByRole('link', { name: 'Track Order' })).toHaveAttribute('href', '/track-order');
    expect(screen.getByRole('link', { name: 'Size Guide' })).toHaveAttribute('href', '/size-guide');
    expect(screen.getByRole('link', { name: 'Care Tips' })).toHaveAttribute('href', '/care-tips');
  });

  it('renders newsletter signup form', () => {
    render(<Footer />);
    
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const subscribeButton = screen.getByRole('button', { name: 'Subscribe' });
    
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(subscribeButton).toBeInTheDocument();
  });

  it('handles newsletter form input', () => {
    render(<Footer />);
    
    const emailInput = screen.getByPlaceholderText('Enter your email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    
    expect(emailInput).toHaveValue('test@example.com');
  });

  it('renders social media links', () => {
    render(<Footer />);
    
    const facebookLink = screen.getByLabelText('Facebook');
    const twitterLink = screen.getByLabelText('Twitter');
    const instagramLink = screen.getByLabelText('Instagram');
    const youtubeLink = screen.getByLabelText('YouTube');
    
    expect(facebookLink).toHaveAttribute('href', 'https://facebook.com/petstore');
    expect(twitterLink).toHaveAttribute('href', 'https://twitter.com/petstore');
    expect(instagramLink).toHaveAttribute('href', 'https://instagram.com/petstore');
    expect(youtubeLink).toHaveAttribute('href', 'https://youtube.com/petstore');
  });

  it('renders copyright information', () => {
    render(<Footer />);
    
    const currentYear = new Date().getFullYear();
    const copyrightText = screen.getByText(`© ${currentYear} PetStore. All rights reserved.`);
    
    expect(copyrightText).toBeInTheDocument();
  });

  it('renders legal links', () => {
    render(<Footer />);
    
    const privacyLink = screen.getByRole('link', { name: 'Privacy Policy' });
    const termsLink = screen.getByRole('link', { name: 'Terms of Service' });
    
    expect(privacyLink).toHaveAttribute('href', '/privacy');
    expect(termsLink).toHaveAttribute('href', '/terms');
  });

  it('has proper semantic structure', () => {
    render(<Footer />);
    
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    expect(footer.tagName).toBe('FOOTER');
  });

  it('social media links have proper accessibility attributes', () => {
    render(<Footer />);
    
    const socialLinks = [
      screen.getByLabelText('Facebook'),
      screen.getByLabelText('Twitter'), 
      screen.getByLabelText('Instagram'),
      screen.getByLabelText('YouTube')
    ];
    
    socialLinks.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });
});