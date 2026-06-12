import { test, expect } from '@playwright/test';

test.describe('PetStore Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the main petstore branding and navigation', async ({ page }) => {
    // Check main heading
    await expect(page.getByRole('heading', { name: /🐾 PetStore/i })).toBeVisible();
    
    // Check navigation links
    await expect(page.getByRole('link', { name: 'Products' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Categories' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible();
    await expect(page.getByRole('link', { name: /Cart \(0\)/i })).toBeVisible();
  });

  test('should display the hero section with call-to-action', async ({ page }) => {
    // Check hero heading
    await expect(page.getByRole('heading', { name: /Everything Your Pet Needs/i })).toBeVisible();
    
    // Check hero description
    await expect(page.getByText(/From premium food to fun toys/i)).toBeVisible();
    
    // Check CTA button
    const shopNowButton = page.getByRole('link', { name: /Shop Now/i });
    await expect(shopNowButton).toBeVisible();
    await expect(shopNowButton).toHaveAttribute('href', '/products');
  });

  test('should display the features section', async ({ page }) => {
    // Check section heading
    await expect(page.getByRole('heading', { name: /Why Choose PetStore?/i })).toBeVisible();
    
    // Check feature cards
    await expect(page.getByRole('heading', { name: 'Pet-First Quality' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Fast Delivery' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Trusted Brands' })).toBeVisible();
    
    // Check feature descriptions
    await expect(page.getByText(/carefully selected with your pet's health/i)).toBeVisible();
    await expect(page.getByText(/Quick and reliable shipping/i)).toBeVisible();
    await expect(page.getByText(/most trusted names in pet care/i)).toBeVisible();
  });

  test('should display the footer', async ({ page }) => {
    await expect(page.getByText(/Your trusted partner in pet care/i)).toBeVisible();
    await expect(page.getByText(/© 2024 PetStore. All rights reserved./i)).toBeVisible();
  });

  test('should have proper page metadata', async ({ page }) => {
    await expect(page).toHaveTitle(/PetStore - Your Pet Care Destination/i);
  });

  test('navigation links should have correct hrefs', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Products' })).toHaveAttribute('href', '/products');
    await expect(page.getByRole('link', { name: 'Categories' })).toHaveAttribute('href', '/categories');
    await expect(page.getByRole('link', { name: 'Admin' })).toHaveAttribute('href', '/admin');
    await expect(page.getByRole('link', { name: /Cart/i })).toHaveAttribute('href', '/cart');
  });

  test('should be responsive - navigation should be hidden on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Navigation should be hidden on mobile (has hidden md:flex classes)
    const nav = page.locator('nav').filter({ hasText: 'Products' });
    await expect(nav).toHaveClass(/hidden/);
  });

  test('should handle hover states on interactive elements', async ({ page }) => {
    const shopButton = page.getByRole('link', { name: /Shop Now/i });
    
    // Hover over the Shop Now button
    await shopButton.hover();
    
    // Button should be visible and clickable
    await expect(shopButton).toBeVisible();
  });
});

test.describe('PetStore Navigation Flow', () => {
  test('should attempt to navigate to product pages', async ({ page }) => {
    await page.goto('/');
    
    // Click on Products link - this will likely result in 404 since pages don't exist yet
    const productsLink = page.getByRole('link', { name: 'Products' });
    await expect(productsLink).toBeVisible();
    
    // Note: In a real test, we'd navigate and check the products page
    // For now, we're just verifying the link exists and points to the right place
    await expect(productsLink).toHaveAttribute('href', '/products');
  });

  test('should attempt to navigate to categories page', async ({ page }) => {
    await page.goto('/');
    
    const categoriesLink = page.getByRole('link', { name: 'Categories' });
    await expect(categoriesLink).toBeVisible();
    await expect(categoriesLink).toHaveAttribute('href', '/categories');
  });

  test('should attempt to navigate to admin page', async ({ page }) => {
    await page.goto('/');
    
    const adminLink = page.getByRole('link', { name: 'Admin' });
    await expect(adminLink).toBeVisible();
    await expect(adminLink).toHaveAttribute('href', '/admin');
  });

  test('should attempt to navigate to cart page', async ({ page }) => {
    await page.goto('/');
    
    const cartLink = page.getByRole('link', { name: /Cart/i });
    await expect(cartLink).toBeVisible();
    await expect(cartLink).toHaveAttribute('href', '/cart');
  });
});