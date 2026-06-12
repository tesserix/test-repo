import { test, expect } from '@playwright/test';

test.describe('Story #43: Storefront Layout and Navigation - Acceptance Criteria', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('AC1: Header with navigation menu visibility', () => {
    test('Given I visit the storefront, when the page loads, then I see a header with navigation menu', async ({ page }) => {
      // Verify header is visible
      const header = page.getByRole('banner');
      await expect(header).toBeVisible();
      
      // Verify PetStore logo/brand is present
      await expect(page.getByText('PetStore')).toBeVisible();
      
      // Verify navigation menu items are present
      await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Products' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Categories' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'About' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Contact' })).toBeVisible();
      
      // Verify search functionality is present
      await expect(page.getByPlaceholder('Search products...')).toBeVisible();
      await expect(page.getByRole('button', { name: /search/i })).toBeVisible();
      
      // Verify cart is present
      await expect(page.getByRole('button', { name: /cart.*items/i })).toBeVisible();
    });

    test('should display header navigation on desktop viewport', async ({ page }) => {
      await page.setViewportSize({ width: 1200, height: 800 });
      await page.reload();
      
      // On desktop, navigation should be visible in header
      const nav = page.locator('nav');
      await expect(nav).toBeVisible();
      
      // All navigation links should be visible
      await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Products' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Categories' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'About' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Contact' })).toBeVisible();
    });

    test('should display mobile navigation menu on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.reload();
      
      // Mobile menu button should be present
      const menuButton = page.getByLabel('Toggle navigation menu');
      await expect(menuButton).toBeVisible();
      
      // Open mobile menu
      await menuButton.click();
      
      // Mobile navigation should be visible
      const mobileMenu = page.locator('#mobile-menu');
      await expect(mobileMenu).toBeVisible();
      
      // All navigation links should be present in mobile menu
      await expect(mobileMenu.getByRole('link', { name: 'Home' })).toBeVisible();
      await expect(mobileMenu.getByRole('link', { name: 'Products' })).toBeVisible();
      await expect(mobileMenu.getByRole('link', { name: 'Categories' })).toBeVisible();
      await expect(mobileMenu.getByRole('link', { name: 'About' })).toBeVisible();
      await expect(mobileMenu.getByRole('link', { name: 'Contact' })).toBeVisible();
    });
  });

  test.describe('AC2: Navigation link functionality', () => {
    test('Given I am on any storefront page, when I click navigation links, then I navigate to the correct pages', async ({ page }) => {
      // Test Home link
      await page.getByRole('link', { name: 'Home' }).click();
      await expect(page).toHaveURL('/');
      
      // Test Products link
      await page.getByRole('link', { name: 'Products' }).click();
      await expect(page).toHaveURL('/products');
      
      // Test Categories link
      await page.getByRole('link', { name: 'Categories' }).click();
      await expect(page).toHaveURL('/categories');
      
      // Test About link
      await page.getByRole('link', { name: 'About' }).click();
      await expect(page).toHaveURL('/about');
      
      // Test Contact link
      await page.getByRole('link', { name: 'Contact' }).click();
      await expect(page).toHaveURL('/contact');
    });

    test('should maintain navigation functionality from different starting pages', async ({ page }) => {
      // Start from Products page
      await page.goto('/products');
      await expect(page).toHaveURL('/products');
      
      // Navigation should work from Products page
      await page.getByRole('link', { name: 'Categories' }).click();
      await expect(page).toHaveURL('/categories');
      
      // Navigation should work from Categories page
      await page.getByRole('link', { name: 'Home' }).click();
      await expect(page).toHaveURL('/');
    });

    test('should navigate correctly in mobile menu', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.reload();
      
      // Open mobile menu
      await page.getByLabel('Toggle navigation menu').click();
      const mobileMenu = page.locator('#mobile-menu');
      await expect(mobileMenu).toBeVisible();
      
      // Test navigation from mobile menu
      await mobileMenu.getByRole('link', { name: 'Products' }).click();
      await expect(page).toHaveURL('/products');
      
      // Mobile menu should close after navigation
      await expect(mobileMenu).not.toBeVisible();
    });

    test('should handle logo click navigation', async ({ page }) => {
      // Navigate to a different page first
      await page.getByRole('link', { name: 'Products' }).click();
      await expect(page).toHaveURL('/products');
      
      // Click logo should return to home
      await page.getByText('PetStore').click();
      await expect(page).toHaveURL('/');
    });
  });

  test.describe('AC3: Footer visibility and links', () => {
    test('Given I am viewing the site, when I scroll to the bottom, then I see a footer with relevant links', async ({ page }) => {
      // Scroll to the bottom of the page
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      
      // Footer should be visible
      const footer = page.getByRole('contentinfo');
      await expect(footer).toBeVisible();
      
      // Verify footer brand
      await expect(footer.getByText('PetStore')).toBeVisible();
      await expect(footer.getByText('Your trusted partner for all pet needs')).toBeVisible();
      
      // Verify Quick Links section
      await expect(footer.getByText('Quick Links')).toBeVisible();
      await expect(footer.getByRole('link', { name: 'About Us' })).toBeVisible();
      await expect(footer.getByRole('link', { name: 'Contact' })).toBeVisible();
      await expect(footer.getByRole('link', { name: 'Shipping Info' })).toBeVisible();
      await expect(footer.getByRole('link', { name: 'Returns' })).toBeVisible();
      
      // Verify Categories section
      await expect(footer.getByText('Categories')).toBeVisible();
      await expect(footer.getByRole('link', { name: 'Dogs' })).toBeVisible();
      await expect(footer.getByRole('link', { name: 'Cats' })).toBeVisible();
      await expect(footer.getByRole('link', { name: 'Birds' })).toBeVisible();
      await expect(footer.getByRole('link', { name: 'Fish' })).toBeVisible();
      await expect(footer.getByRole('link', { name: 'Small Pets' })).toBeVisible();
      
      // Verify Customer Service section
      await expect(footer.getByText('Customer Service')).toBeVisible();
      await expect(footer.getByRole('link', { name: 'Help Center' })).toBeVisible();
      await expect(footer.getByRole('link', { name: 'Track Order' })).toBeVisible();
      await expect(footer.getByRole('link', { name: 'Size Guide' })).toBeVisible();
      await expect(footer.getByRole('link', { name: 'Care Tips' })).toBeVisible();
    });

    test('should display footer on all pages', async ({ page }) => {
      // Test footer presence on home page
      await page.goto('/');
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await expect(page.getByRole('contentinfo')).toBeVisible();
      
      // Test footer presence on products page
      await page.goto('/products');
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await expect(page.getByRole('contentinfo')).toBeVisible();
      
      // Test footer presence on categories page
      await page.goto('/categories');
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await expect(page.getByRole('contentinfo')).toBeVisible();
    });

    test('should have functional footer links', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      const footer = page.getByRole('contentinfo');
      
      // Test category links
      await footer.getByRole('link', { name: 'Dogs' }).click();
      await expect(page).toHaveURL('/categories/dogs');
      
      // Go back and test another footer link
      await page.goto('/');
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      
      await footer.getByRole('link', { name: 'About Us' }).click();
      await expect(page).toHaveURL('/about');
    });

    test('should display newsletter signup form', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      const footer = page.getByRole('contentinfo');
      
      // Verify newsletter section
      await expect(footer.getByText('Newsletter')).toBeVisible();
      await expect(footer.getByPlaceholder('Enter your email')).toBeVisible();
      await expect(footer.getByRole('button', { name: 'Subscribe' })).toBeVisible();
      
      // Test email input functionality
      const emailInput = footer.getByPlaceholder('Enter your email');
      await emailInput.fill('test@example.com');
      await expect(emailInput).toHaveValue('test@example.com');
    });

    test('should display social media links', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      const footer = page.getByRole('contentinfo');
      
      // Verify social media links
      await expect(footer.getByLabel('Facebook')).toBeVisible();
      await expect(footer.getByLabel('Twitter')).toBeVisible();
      await expect(footer.getByLabel('Instagram')).toBeVisible();
      await expect(footer.getByLabel('YouTube')).toBeVisible();
      
      // Verify links have correct attributes
      const facebookLink = footer.getByLabel('Facebook');
      await expect(facebookLink).toHaveAttribute('href', 'https://facebook.com/petstore');
      await expect(facebookLink).toHaveAttribute('target', '_blank');
      await expect(facebookLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    test('should display copyright and legal information', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      const footer = page.getByRole('contentinfo');
      
      // Verify copyright
      const currentYear = new Date().getFullYear();
      await expect(footer.getByText(`© ${currentYear} PetStore. All rights reserved.`)).toBeVisible();
      
      // Verify legal links
      await expect(footer.getByRole('link', { name: 'Privacy Policy' })).toBeVisible();
      await expect(footer.getByRole('link', { name: 'Terms of Service' })).toBeVisible();
    });
  });

  test.describe('Overall Layout Integration', () => {
    test('should maintain header and footer on all pages', async ({ page }) => {
      const pages = ['/', '/products', '/categories', '/about', '/contact'];
      
      for (const url of pages) {
        await page.goto(url);
        
        // Header should be present
        await expect(page.getByRole('banner')).toBeVisible();
        await expect(page.getByText('PetStore')).toBeVisible();
        
        // Footer should be present (scroll to see it)
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await expect(page.getByRole('contentinfo')).toBeVisible();
      }
    });

    test('should have proper semantic HTML structure', async ({ page }) => {
      // Verify semantic HTML elements
      await expect(page.getByRole('banner')).toBeVisible(); // Header
      await expect(page.getByRole('main')).toBeVisible(); // Main content
      await expect(page.getByRole('contentinfo')).toBeVisible(); // Footer
      
      // Verify navigation
      await expect(page.locator('nav')).toBeVisible();
    });

    test('should be responsive across different viewport sizes', async ({ page }) => {
      const viewports = [
        { width: 375, height: 667 }, // Mobile
        { width: 768, height: 1024 }, // Tablet
        { width: 1200, height: 800 }, // Desktop
      ];
      
      for (const viewport of viewports) {
        await page.setViewportSize(viewport);
        await page.reload();
        
        // Header should always be visible
        await expect(page.getByRole('banner')).toBeVisible();
        await expect(page.getByText('PetStore')).toBeVisible();
        
        // Footer should always be present
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await expect(page.getByRole('contentinfo')).toBeVisible();
        
        // Navigation should be accessible (either direct links or mobile menu)
        if (viewport.width >= 1024) {
          // Desktop: direct navigation links
          await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
        } else {
          // Mobile: navigation through menu button
          await expect(page.getByLabel('Toggle navigation menu')).toBeVisible();
        }
      }
    });
  });
});