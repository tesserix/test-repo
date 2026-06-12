import { test, expect } from '@playwright/test';

test.describe('Story #43: Storefront Layout and Navigation - Acceptance Criteria', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('AC1: Header with Navigation Menu', () => {
    test('Given I visit the storefront, when the page loads, then I see a header with navigation menu', async ({ page }) => {
      // Verify header is visible and has proper semantic role
      const header = page.getByRole('banner');
      await expect(header).toBeVisible();
      
      // Verify PetStore logo/brand is visible
      await expect(page.getByText('PetStore')).toBeVisible();
      await expect(page.locator('span').filter({ hasText: '🐾' })).toBeVisible();
      
      // Verify navigation menu is present (desktop view)
      await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Products' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Categories' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'About' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Contact' })).toBeVisible();
      
      // Verify search functionality is available
      await expect(page.getByPlaceholder('Search products...')).toBeVisible();
      await expect(page.getByLabel('Search')).toBeVisible();
      
      // Verify cart is accessible
      await expect(page.getByLabel('Cart (0 items)')).toBeVisible();
    });

    test('should show mobile navigation menu on mobile devices', async ({ page }) => {
      // Test mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      await page.reload();
      
      // Header should still be visible
      await expect(page.getByRole('banner')).toBeVisible();
      await expect(page.getByText('PetStore')).toBeVisible();
      
      // Desktop navigation should be hidden on mobile
      await expect(page.locator('nav').first()).not.toBeVisible();
      
      // Mobile menu button should be visible
      const menuButton = page.getByLabel('Toggle navigation menu');
      await expect(menuButton).toBeVisible();
      
      // Open mobile menu
      await menuButton.click();
      
      // Mobile menu should appear with navigation links
      const mobileMenu = page.locator('#mobile-menu');
      await expect(mobileMenu).toBeVisible();
      await expect(mobileMenu.getByRole('link', { name: 'Home' })).toBeVisible();
      await expect(mobileMenu.getByRole('link', { name: 'Products' })).toBeVisible();
      await expect(mobileMenu.getByRole('link', { name: 'Categories' })).toBeVisible();
      await expect(mobileMenu.getByRole('link', { name: 'About' })).toBeVisible();
      await expect(mobileMenu.getByRole('link', { name: 'Contact' })).toBeVisible();
    });
  });

  test.describe('AC2: Navigation Link Functionality', () => {
    test('Given I\'m on any storefront page, when I click navigation links, then I navigate to the correct pages', async ({ page }) => {
      // Test Home navigation (should stay on current page)
      await page.getByRole('link', { name: 'Home' }).click();
      await expect(page).toHaveURL('/');
      await expect(page.getByRole('banner')).toBeVisible(); // Header should still be present
      
      // Test Products navigation
      await page.getByRole('link', { name: 'Products' }).click();
      await expect(page).toHaveURL('/products');
      await expect(page.getByRole('banner')).toBeVisible(); // Header should still be present
      
      // Test Categories navigation from products page
      await page.getByRole('link', { name: 'Categories' }).click();
      await expect(page).toHaveURL('/categories');
      await expect(page.getByRole('banner')).toBeVisible(); // Header should still be present
      
      // Test About navigation from categories page
      await page.getByRole('link', { name: 'About' }).click();
      await expect(page).toHaveURL('/about');
      await expect(page.getByRole('banner')).toBeVisible(); // Header should still be present
      
      // Test Contact navigation from about page
      await page.getByRole('link', { name: 'Contact' }).click();
      await expect(page).toHaveURL('/contact');
      await expect(page.getByRole('banner')).toBeVisible(); // Header should still be present
      
      // Navigate back to home to test logo link
      await page.getByText('PetStore').click();
      await expect(page).toHaveURL('/');
    });

    test('should maintain navigation functionality after page transitions', async ({ page }) => {
      // Navigate to multiple pages and ensure navigation remains functional
      await page.getByRole('link', { name: 'Products' }).click();
      await expect(page).toHaveURL('/products');
      
      // Navigation should still work from the products page
      await page.getByRole('link', { name: 'Categories' }).click();
      await expect(page).toHaveURL('/categories');
      
      // Test browser back button
      await page.goBack();
      await expect(page).toHaveURL('/products');
      
      // Navigation should still be functional after browser back
      await page.getByRole('link', { name: 'Home' }).click();
      await expect(page).toHaveURL('/');
    });

    test('should work on mobile navigation', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.reload();
      
      // Open mobile menu
      await page.getByLabel('Toggle navigation menu').click();
      
      // Test navigation from mobile menu
      await page.locator('#mobile-menu').getByRole('link', { name: 'Products' }).click();
      await expect(page).toHaveURL('/products');
      
      // Mobile menu should close after navigation
      const mobileMenu = page.locator('#mobile-menu');
      await expect(mobileMenu).not.toBeVisible();
      
      // Header should still be visible
      await expect(page.getByRole('banner')).toBeVisible();
    });
  });

  test.describe('AC3: Footer with Relevant Links', () => {
    test('Given I\'m viewing the site, when I scroll to the bottom, then I see a footer with relevant links', async ({ page }) => {
      // Scroll to bottom to make footer visible
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      
      // Verify footer is visible with proper semantic role
      const footer = page.getByRole('contentinfo');
      await expect(footer).toBeVisible();
      
      // Verify brand presence in footer
      await expect(page.getByText('PetStore')).toBeVisible();
      await expect(page.getByText('Your trusted partner for all pet needs')).toBeVisible();
      
      // Verify footer sections are present
      await expect(page.getByText('Quick Links')).toBeVisible();
      await expect(page.getByText('Categories')).toBeVisible();
      await expect(page.getByText('Customer Service')).toBeVisible();
      await expect(page.getByText('Newsletter')).toBeVisible();
      
      // Verify relevant links in Quick Links section
      await expect(page.getByRole('link', { name: 'About Us' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Contact' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Shipping Info' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Returns' })).toBeVisible();
      
      // Verify category links
      await expect(page.getByRole('link', { name: 'Dogs' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Cats' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Birds' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Fish' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Small Pets' })).toBeVisible();
      
      // Verify customer service links
      await expect(page.getByRole('link', { name: 'Help Center' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Track Order' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Size Guide' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Care Tips' })).toBeVisible();
      
      // Verify newsletter signup
      await expect(page.getByPlaceholder('Enter your email')).toBeVisible();
      await expect(page.getByRole('button', { name: 'Subscribe' })).toBeVisible();
      
      // Verify social media links
      await expect(page.getByLabel('Facebook')).toBeVisible();
      await expect(page.getByLabel('Twitter')).toBeVisible();
      await expect(page.getByLabel('Instagram')).toBeVisible();
      await expect(page.getByLabel('YouTube')).toBeVisible();
      
      // Verify copyright and legal links
      const currentYear = new Date().getFullYear();
      await expect(page.getByText(`© ${currentYear} PetStore. All rights reserved.`)).toBeVisible();
      await expect(page.getByRole('link', { name: 'Privacy Policy' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Terms of Service' })).toBeVisible();
    });

    test('should have functional footer navigation links', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      
      // Test footer navigation links work correctly
      await page.getByRole('link', { name: 'About Us' }).click();
      await expect(page).toHaveURL('/about');
      
      // Verify header is still present after footer navigation
      await expect(page.getByRole('banner')).toBeVisible();
      
      // Go back to test another footer link
      await page.goto('/');
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      
      // Test category link from footer
      await page.getByRole('link', { name: 'Dogs' }).click();
      await expect(page).toHaveURL('/categories/dogs');
      await expect(page.getByRole('banner')).toBeVisible();
    });

    test('should have functional newsletter signup form', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      
      const emailInput = page.getByPlaceholder('Enter your email');
      const subscribeButton = page.getByRole('button', { name: 'Subscribe' });
      
      // Verify form elements are interactive
      await expect(emailInput).toBeVisible();
      await expect(emailInput).toHaveAttribute('type', 'email');
      await expect(subscribeButton).toBeVisible();
      await expect(subscribeButton).toBeEnabled();
      
      // Test email input functionality
      await emailInput.fill('test@example.com');
      await expect(emailInput).toHaveValue('test@example.com');
      
      // Verify subscribe button is clickable
      await subscribeButton.click();
      // Note: Without backend implementation, we just verify the interaction works
    });

    test('should have external social media links with proper attributes', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      
      // Verify social media links have proper external link attributes
      const facebookLink = page.getByLabel('Facebook');
      const twitterLink = page.getByLabel('Twitter');
      const instagramLink = page.getByLabel('Instagram');
      const youtubeLink = page.getByLabel('YouTube');
      
      await expect(facebookLink).toHaveAttribute('href', 'https://facebook.com/petstore');
      await expect(facebookLink).toHaveAttribute('target', '_blank');
      await expect(facebookLink).toHaveAttribute('rel', 'noopener noreferrer');
      
      await expect(twitterLink).toHaveAttribute('href', 'https://twitter.com/petstore');
      await expect(twitterLink).toHaveAttribute('target', '_blank');
      await expect(twitterLink).toHaveAttribute('rel', 'noopener noreferrer');
      
      await expect(instagramLink).toHaveAttribute('href', 'https://instagram.com/petstore');
      await expect(instagramLink).toHaveAttribute('target', '_blank');
      await expect(instagramLink).toHaveAttribute('rel', 'noopener noreferrer');
      
      await expect(youtubeLink).toHaveAttribute('href', 'https://youtube.com/petstore');
      await expect(youtubeLink).toHaveAttribute('target', '_blank');
      await expect(youtubeLink).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  test.describe('Layout Structure and Semantic HTML', () => {
    test('should have proper semantic HTML structure for accessibility', async ({ page }) => {
      // Verify main semantic landmarks are present
      await expect(page.getByRole('banner')).toBeVisible(); // header
      await expect(page.getByRole('main')).toBeVisible(); // main content area
      await expect(page.getByRole('contentinfo')).toBeVisible(); // footer
      
      // Verify navigation is properly marked up
      await expect(page.locator('nav')).toBeVisible();
      
      // Verify proper heading hierarchy exists
      const h1 = page.locator('h1').first();
      await expect(h1).toBeVisible();
      await expect(h1).toContainText('Everything Your Pet Needs');
    });

    test('should be responsive across different screen sizes', async ({ page }) => {
      // Test desktop (default)
      await expect(page.getByRole('banner')).toBeVisible();
      await expect(page.getByText('PetStore')).toBeVisible();
      
      // Test tablet
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.reload();
      await expect(page.getByRole('banner')).toBeVisible();
      await expect(page.getByText('PetStore')).toBeVisible();
      
      // Test mobile
      await page.setViewportSize({ width: 375, height: 667 });
      await page.reload();
      await expect(page.getByRole('banner')).toBeVisible();
      await expect(page.getByText('PetStore')).toBeVisible();
      
      // Test mobile menu functionality
      await page.getByLabel('Toggle navigation menu').click();
      await expect(page.locator('#mobile-menu')).toBeVisible();
    });

    test('should maintain layout integrity during navigation', async ({ page }) => {
      // Navigate to different pages and verify layout remains intact
      const pagesToTest = ['/products', '/categories', '/about', '/contact'];
      
      for (const url of pagesToTest) {
        await page.goto(url);
        
        // Verify header is always present
        await expect(page.getByRole('banner')).toBeVisible();
        await expect(page.getByText('PetStore')).toBeVisible();
        
        // Verify footer is always present
        await expect(page.getByRole('contentinfo')).toBeVisible();
        
        // Verify main content area exists
        await expect(page.getByRole('main')).toBeVisible();
      }
    });
  });
});