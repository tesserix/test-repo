import { test, expect } from '@playwright/test';

test.describe('Storefront Layout and Navigation - Story #43', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the storefront homepage
    await page.goto('/');
  });

  test.describe('Header Navigation', () => {
    test('should display header with navigation menu when page loads', async ({ page }) => {
      // AC: Given I visit the storefront, when the page loads, then I see a header with navigation menu
      
      // Check header is visible
      const header = page.getByRole('banner');
      await expect(header).toBeVisible();
      
      // Check logo/brand name is visible
      await expect(page.getByText('PetStore')).toBeVisible();
      
      // Check main navigation links are visible (desktop)
      await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Products' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Categories' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'About' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Contact' })).toBeVisible();
      
      // Check action buttons are visible
      await expect(page.getByLabel('Search products')).toBeVisible();
      await expect(page.getByLabel('Shopping cart')).toBeVisible();
    });

    test('should navigate to correct pages when clicking navigation links', async ({ page }) => {
      // AC: Given I'm on any storefront page, when I click navigation links, then I navigate to the correct pages
      
      // Test Home navigation
      await page.getByRole('link', { name: 'Home' }).click();
      await expect(page).toHaveURL('/');
      
      // Test Products navigation
      await page.getByRole('link', { name: 'Products' }).click();
      await expect(page).toHaveURL('/products');
      
      // Navigate back to test other links
      await page.goto('/');
      
      // Test Categories navigation
      await page.getByRole('link', { name: 'Categories' }).click();
      await expect(page).toHaveURL('/categories');
      
      // Navigate back to test other links
      await page.goto('/');
      
      // Test About navigation
      await page.getByRole('link', { name: 'About' }).click();
      await expect(page).toHaveURL('/about');
      
      // Navigate back to test other links
      await page.goto('/');
      
      // Test Contact navigation
      await page.getByRole('link', { name: 'Contact' }).click();
      await expect(page).toHaveURL('/contact');
    });

    test('should show mobile menu when screen size is small', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      await page.reload();
      
      // Desktop navigation should be hidden
      await expect(page.getByRole('link', { name: 'Home' }).first()).not.toBeVisible();
      
      // Mobile menu button should be visible
      const menuButton = page.getByLabel('Toggle navigation menu');
      await expect(menuButton).toBeVisible();
      
      // Click mobile menu button to open menu
      await menuButton.click();
      
      // Mobile menu should be visible
      const mobileMenu = page.locator('#mobile-menu');
      await expect(mobileMenu).toBeVisible();
      
      // Navigation links should be visible in mobile menu
      await expect(mobileMenu.getByRole('link', { name: 'Home' })).toBeVisible();
      await expect(mobileMenu.getByRole('link', { name: 'Products' })).toBeVisible();
      await expect(mobileMenu.getByRole('link', { name: 'Categories' })).toBeVisible();
      await expect(mobileMenu.getByRole('link', { name: 'About' })).toBeVisible();
      await expect(mobileMenu.getByRole('link', { name: 'Contact' })).toBeVisible();
    });

    test('should close mobile menu when clicking a navigation link', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      await page.reload();
      
      // Open mobile menu
      await page.getByLabel('Toggle navigation menu').click();
      
      // Click a navigation link
      await page.locator('#mobile-menu').getByRole('link', { name: 'Products' }).click();
      
      // Should navigate to products page
      await expect(page).toHaveURL('/products');
      
      // Mobile menu should be closed (not visible)
      const mobileMenu = page.locator('#mobile-menu');
      await expect(mobileMenu).not.toBeVisible();
    });

    test('should have proper accessibility attributes in navigation', async ({ page }) => {
      // Check header has proper role
      const header = page.getByRole('banner');
      await expect(header).toBeVisible();
      
      // Check navigation has proper structure
      const nav = page.locator('nav');
      await expect(nav).toBeVisible();
      
      // Check mobile menu button has proper aria attributes
      await page.setViewportSize({ width: 375, height: 667 });
      await page.reload();
      
      const menuButton = page.getByLabel('Toggle navigation menu');
      await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
      await expect(menuButton).toHaveAttribute('aria-controls', 'mobile-menu');
      
      // Open menu and check aria-expanded changes
      await menuButton.click();
      await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    });
  });

  test.describe('Footer', () => {
    test('should see footer with relevant links when scrolling to bottom', async ({ page }) => {
      // AC: Given I'm viewing the site, when I scroll to the bottom, then I see a footer with relevant links
      
      // Scroll to bottom of page
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      
      // Check footer is visible
      const footer = page.getByRole('contentinfo');
      await expect(footer).toBeVisible();
      
      // Check footer sections are present
      await expect(page.getByText('Shop')).toBeVisible();
      await expect(page.getByText('Customer Service')).toBeVisible();
      await expect(page.getByText('About PetStore')).toBeVisible();
      await expect(page.getByText('Legal')).toBeVisible();
      
      // Check some key footer links
      await expect(page.getByRole('link', { name: 'All Products' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Contact Us' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'About Us' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Privacy Policy' })).toBeVisible();
      
      // Check newsletter signup is present
      await expect(page.getByText('Stay updated with pet care tips and deals')).toBeVisible();
      await expect(page.getByPlaceholder('Enter your email')).toBeVisible();
      await expect(page.getByRole('button', { name: 'Subscribe' })).toBeVisible();
      
      // Check copyright notice
      const currentYear = new Date().getFullYear();
      await expect(page.getByText(`© ${currentYear} PetStore. All rights reserved.`)).toBeVisible();
    });

    test('should have functional newsletter signup form in footer', async ({ page }) => {
      // Scroll to footer
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      
      // Test email input
      const emailInput = page.getByPlaceholder('Enter your email');
      await emailInput.fill('test@example.com');
      await expect(emailInput).toHaveValue('test@example.com');
      
      // Subscribe button should be clickable
      const subscribeButton = page.getByRole('button', { name: 'Subscribe' });
      await expect(subscribeButton).toBeVisible();
      await expect(subscribeButton).toBeEnabled();
      
      // Check email input has proper type and accessibility
      await expect(emailInput).toHaveAttribute('type', 'email');
      await expect(emailInput).toHaveAttribute('aria-label', 'Email address for newsletter');
    });

    test('should have working social media links in footer', async ({ page }) => {
      // Scroll to footer
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      
      // Check social media links
      const facebookLink = page.getByLabel('Follow us on Facebook');
      const twitterLink = page.getByLabel('Follow us on Twitter');
      const instagramLink = page.getByLabel('Follow us on Instagram');
      
      await expect(facebookLink).toBeVisible();
      await expect(twitterLink).toBeVisible();
      await expect(instagramLink).toBeVisible();
      
      // Check they have proper attributes for external links
      await expect(facebookLink).toHaveAttribute('href', 'https://facebook.com');
      await expect(twitterLink).toHaveAttribute('href', 'https://twitter.com');
      await expect(instagramLink).toHaveAttribute('href', 'https://instagram.com');
    });
  });

  test.describe('Page Layout and Structure', () => {
    test('should have proper semantic HTML structure', async ({ page }) => {
      // Check main semantic elements are present
      await expect(page.getByRole('banner')).toBeVisible(); // header
      await expect(page.getByRole('main')).toBeVisible(); // main content
      await expect(page.getByRole('contentinfo')).toBeVisible(); // footer
      
      // Check page has proper heading hierarchy
      const h1 = page.locator('h1').first();
      await expect(h1).toBeVisible();
      await expect(h1).toContainText('Everything Your Pet Needs');
    });

    test('should display homepage hero section correctly', async ({ page }) => {
      // Check hero section elements
      await expect(page.getByText('Everything Your Pet Needs, All in One Place')).toBeVisible();
      await expect(page.getByText('From premium food and treats to toys and accessories')).toBeVisible();
      
      // Check CTA buttons
      await expect(page.getByRole('link', { name: 'Shop All Products' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Browse by Pet' })).toBeVisible();
    });

    test('should display features section', async ({ page }) => {
      // Check features section heading
      await expect(page.getByText('Why Pet Parents Choose Us')).toBeVisible();
      
      // Check feature items
      await expect(page.getByText('Fast & Free Shipping')).toBeVisible();
      await expect(page.getByText('Premium Quality')).toBeVisible();
      await expect(page.getByText('Expert Advice')).toBeVisible();
      await expect(page.getByText('Easy Returns')).toBeVisible();
    });

    test('should display categories section with working links', async ({ page }) => {
      // Check categories section
      await expect(page.getByText('Shop by Pet Type')).toBeVisible();
      
      // Check category cards and their links
      const dogCategory = page.getByRole('link').filter({ hasText: 'Dogs' });
      const catCategory = page.getByRole('link').filter({ hasText: 'Cats' });
      const fishCategory = page.getByRole('link').filter({ hasText: 'Fish & Aquatic' });
      const smallPetsCategory = page.getByRole('link').filter({ hasText: 'Small Pets' });
      
      await expect(dogCategory).toBeVisible();
      await expect(catCategory).toBeVisible();
      await expect(fishCategory).toBeVisible();
      await expect(smallPetsCategory).toBeVisible();
      
      // Test category navigation
      await dogCategory.click();
      await expect(page).toHaveURL('/categories/dogs');
    });

    test('should be responsive on different screen sizes', async ({ page }) => {
      // Test desktop view (already tested above)
      
      // Test tablet view
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.reload();
      
      // Header should still be visible
      await expect(page.getByRole('banner')).toBeVisible();
      await expect(page.getByText('PetStore')).toBeVisible();
      
      // Test mobile view
      await page.setViewportSize({ width: 375, height: 667 });
      await page.reload();
      
      // Header should still be visible
      await expect(page.getByRole('banner')).toBeVisible();
      await expect(page.getByText('PetStore')).toBeVisible();
      
      // Mobile menu button should be visible
      await expect(page.getByLabel('Toggle navigation menu')).toBeVisible();
      
      // Content should be readable and properly laid out
      await expect(page.getByText('Everything Your Pet Needs')).toBeVisible();
    });
  });

  test.describe('Cart and Search Functionality', () => {
    test('should have functional search and cart buttons in header', async ({ page }) => {
      // Check search button
      const searchButton = page.getByLabel('Search products');
      await expect(searchButton).toBeVisible();
      await searchButton.click();
      await expect(page).toHaveURL('/search');
      
      // Navigate back and check cart
      await page.goto('/');
      const cartButton = page.getByLabel('Shopping cart');
      await expect(cartButton).toBeVisible();
      await cartButton.click();
      await expect(page).toHaveURL('/cart');
      
      // Cart should show 0 items initially
      await page.goto('/');
      await expect(page.locator('.absolute').filter({ hasText: '0' })).toBeVisible();
    });
  });
});