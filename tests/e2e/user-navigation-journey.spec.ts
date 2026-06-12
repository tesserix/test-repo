import { test, expect } from '@playwright/test';

test.describe('User Navigation Journey Tests', () => {
  test.describe('Customer Navigation Journey', () => {
    test('should allow customer to navigate through main storefront sections', async ({ page }) => {
      // Start at home page
      await page.goto('/');
      await expect(page).toHaveURL('/');
      await expect(page.getByText('Everything Your Pet Needs')).toBeVisible();
      
      // Navigate to Products
      await page.getByRole('link', { name: 'Products' }).click();
      await expect(page).toHaveURL('/products');
      await expect(page.getByRole('banner')).toBeVisible(); // Header still present
      
      // Navigate to Categories
      await page.getByRole('link', { name: 'Categories' }).click();
      await expect(page).toHaveURL('/categories');
      await expect(page.getByRole('banner')).toBeVisible();
      
      // Navigate back home via logo
      await page.getByText('PetStore').click();
      await expect(page).toHaveURL('/');
    });

    test('should support category browsing from homepage', async ({ page }) => {
      await page.goto('/');
      
      // Use category cards on homepage
      await page.getByRole('link', { name: 'Dogs' }).click();
      await expect(page).toHaveURL('/categories/dogs');
      
      // Back to home
      await page.goto('/');
      
      await page.getByRole('link', { name: 'Cats' }).click();
      await expect(page).toHaveURL('/categories/cats');
      
      // Back to home
      await page.goto('/');
      
      await page.getByRole('link', { name: 'Fish & Aquatic' }).click();
      await expect(page).toHaveURL('/categories/fish');
    });

    test('should maintain search functionality across pages', async ({ page }) => {
      // Start search from home page
      await page.goto('/');
      const searchInput = page.getByPlaceholder('Search products...');
      await searchInput.fill('dog food');
      await expect(searchInput).toHaveValue('dog food');
      
      // Navigate to different page
      await page.getByRole('link', { name: 'Products' }).click();
      
      // Search should still be accessible and functional
      const searchInputProducts = page.getByPlaceholder('Search products...');
      await expect(searchInputProducts).toBeVisible();
      await searchInputProducts.fill('cat toys');
      await expect(searchInputProducts).toHaveValue('cat toys');
    });

    test('should handle cart interaction across navigation', async ({ page }) => {
      await page.goto('/');
      
      // Verify initial cart state
      await expect(page.getByRole('button', { name: /cart.*0.*items/i })).toBeVisible();
      
      // Navigate to products page
      await page.getByRole('link', { name: 'Products' }).click();
      
      // Cart should still be accessible
      await expect(page.getByRole('button', { name: /cart.*0.*items/i })).toBeVisible();
      
      // Click cart
      await page.getByRole('button', { name: /cart.*0.*items/i }).click();
      // Note: Cart page behavior depends on implementation
    });
  });

  test.describe('Mobile Navigation Journey', () => {
    test('should support complete mobile navigation flow', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      
      // Open mobile menu
      await page.getByLabel('Toggle navigation menu').click();
      await expect(page.locator('#mobile-menu')).toBeVisible();
      
      // Navigate to products via mobile menu
      await page.locator('#mobile-menu').getByRole('link', { name: 'Products' }).click();
      await expect(page).toHaveURL('/products');
      
      // Mobile menu should close
      await expect(page.locator('#mobile-menu')).not.toBeVisible();
      
      // Header should still be accessible
      await expect(page.getByRole('banner')).toBeVisible();
      
      // Can open mobile menu again
      await page.getByLabel('Toggle navigation menu').click();
      await expect(page.locator('#mobile-menu')).toBeVisible();
      
      // Navigate to categories
      await page.locator('#mobile-menu').getByRole('link', { name: 'Categories' }).click();
      await expect(page).toHaveURL('/categories');
    });

    test('should maintain mobile menu state during orientation change', async ({ page }) => {
      // Start in portrait
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      
      // Open mobile menu
      await page.getByLabel('Toggle navigation menu').click();
      await expect(page.locator('#mobile-menu')).toBeVisible();
      
      // Rotate to landscape
      await page.setViewportSize({ width: 667, height: 375 });
      
      // Menu should still be manageable
      await expect(page.getByRole('banner')).toBeVisible();
      
      // Should still be able to navigate
      if (await page.locator('#mobile-menu').isVisible()) {
        await page.locator('#mobile-menu').getByRole('link', { name: 'Home' }).click();
      } else {
        // Menu might have closed on orientation change
        await page.getByLabel('Toggle navigation menu').click();
        await page.locator('#mobile-menu').getByRole('link', { name: 'Home' }).click();
      }
      
      await expect(page).toHaveURL('/');
    });
  });

  test.describe('Footer Navigation Journey', () => {
    test('should support footer-based navigation flow', async ({ page }) => {
      await page.goto('/');
      
      // Scroll to footer
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      
      // Navigate via footer links
      await page.getByRole('link', { name: 'About Us' }).click();
      await expect(page).toHaveURL('/about');
      
      // Footer should still be present on new page
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await expect(page.getByRole('contentinfo')).toBeVisible();
      
      // Navigate to another footer link
      await page.getByRole('link', { name: 'Dogs' }).click();
      await expect(page).toHaveURL('/categories/dogs');
      
      // Return to home via header
      await page.getByText('PetStore').click();
      await expect(page).toHaveURL('/');
    });

    test('should handle footer newsletter signup flow', async ({ page }) => {
      await page.goto('/');
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      
      const emailInput = page.getByPlaceholder('Enter your email');
      const subscribeButton = page.getByRole('button', { name: 'Subscribe' });
      
      // Test newsletter signup
      await emailInput.fill('customer@example.com');
      await subscribeButton.click();
      
      // Form should remain functional after submission
      await expect(emailInput).toBeVisible();
      await expect(subscribeButton).toBeVisible();
      
      // Navigation should still work after newsletter interaction
      await page.getByRole('link', { name: 'Contact' }).click();
      await expect(page).toHaveURL('/contact');
    });

    test('should handle social media link interactions', async ({ page }) => {
      await page.goto('/');
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      
      // Social links should have proper attributes for external navigation
      const facebookLink = page.getByLabel('Facebook');
      await expect(facebookLink).toHaveAttribute('href', 'https://facebook.com/petstore');
      await expect(facebookLink).toHaveAttribute('target', '_blank');
      
      // Since we can't test actual external navigation in E2E,
      // we verify the links are properly configured
      const socialLinks = [
        { label: 'Facebook', href: 'https://facebook.com/petstore' },
        { label: 'Twitter', href: 'https://twitter.com/petstore' },
        { label: 'Instagram', href: 'https://instagram.com/petstore' },
        { label: 'YouTube', href: 'https://youtube.com/petstore' },
      ];
      
      for (const social of socialLinks) {
        const link = page.getByLabel(social.label);
        await expect(link).toHaveAttribute('href', social.href);
        await expect(link).toHaveAttribute('target', '_blank');
        await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      }
    });
  });

  test.describe('Search Journey', () => {
    test('should maintain search context during navigation', async ({ page }) => {
      await page.goto('/');
      
      // Enter search term
      const searchInput = page.getByPlaceholder('Search products...');
      await searchInput.fill('pet supplies');
      
      // Navigate to different pages
      await page.getByRole('link', { name: 'Categories' }).click();
      
      // Search input should still be visible and could retain value
      await expect(page.getByPlaceholder('Search products...')).toBeVisible();
      
      // Navigate to products
      await page.getByRole('link', { name: 'Products' }).click();
      
      // Search should still be accessible
      await expect(page.getByPlaceholder('Search products...')).toBeVisible();
      
      // Can perform new search from any page
      const newSearchInput = page.getByPlaceholder('Search products...');
      await newSearchInput.fill('dog toys');
      await page.getByRole('button', { name: /search/i }).click();
    });
  });

  test.describe('Cross-device Navigation Consistency', () => {
    test('should provide consistent navigation across viewport sizes', async ({ page }) => {
      const testFlow = async (width: number, height: number) => {
        await page.setViewportSize({ width, height });
        await page.goto('/');
        
        // Verify header is present
        await expect(page.getByRole('banner')).toBeVisible();
        await expect(page.getByText('PetStore')).toBeVisible();
        
        // Verify navigation is accessible (either desktop nav or mobile menu)
        if (width >= 1024) {
          // Desktop navigation
          await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
          await page.getByRole('link', { name: 'Products' }).click();
        } else {
          // Mobile navigation
          await page.getByLabel('Toggle navigation menu').click();
          await page.locator('#mobile-menu').getByRole('link', { name: 'Products' }).click();
        }
        
        await expect(page).toHaveURL('/products');
        
        // Verify footer is accessible
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await expect(page.getByRole('contentinfo')).toBeVisible();
      };
      
      // Test different device sizes
      await testFlow(375, 667);   // Mobile
      await testFlow(768, 1024);  // Tablet
      await testFlow(1200, 800);  // Desktop
    });
  });

  test.describe('Error Recovery Navigation', () => {
    test('should maintain navigation when encountering missing pages', async ({ page }) => {
      await page.goto('/');
      
      // Try to navigate to non-existent page
      await page.goto('/non-existent-page');
      
      // Header navigation should still work even on 404 pages
      await expect(page.getByRole('banner')).toBeVisible();
      await expect(page.getByText('PetStore')).toBeVisible();
      
      // Should be able to navigate back to working pages
      await page.getByRole('link', { name: 'Home' }).click();
      await expect(page).toHaveURL('/');
    });

    test('should handle navigation during slow loading', async ({ page }) => {
      // Simulate slow network
      await page.route('**/*', async (route) => {
        await new Promise(resolve => setTimeout(resolve, 100));
        await route.continue();
      });
      
      await page.goto('/');
      
      // Navigation should eventually work despite slow loading
      await page.getByRole('link', { name: 'Products' }).click();
      await expect(page).toHaveURL('/products', { timeout: 10000 });
      
      // Header should still be present
      await expect(page.getByRole('banner')).toBeVisible();
    });
  });

  test.describe('Accessibility Navigation', () => {
    test('should support keyboard-only navigation flow', async ({ page }) => {
      await page.goto('/');
      
      // Tab through navigation elements
      await page.keyboard.press('Tab'); // Logo
      await page.keyboard.press('Tab'); // Search input
      await page.keyboard.press('Tab'); // Search button
      await page.keyboard.press('Tab'); // First nav link (Home)
      await page.keyboard.press('Tab'); // Products link
      
      // Activate Products link with keyboard
      await page.keyboard.press('Enter');
      await expect(page).toHaveURL('/products');
      
      // Tab to navigation again
      await page.keyboard.press('Tab'); // Logo
      await page.keyboard.press('Tab'); // Search
      await page.keyboard.press('Tab'); // Search button
      await page.keyboard.press('Tab'); // Home
      
      // Navigate back to home
      await page.keyboard.press('Enter');
      await expect(page).toHaveURL('/');
    });

    test('should support screen reader navigation patterns', async ({ page }) => {
      await page.goto('/');
      
      // Verify semantic structure for screen readers
      await expect(page.getByRole('banner')).toBeVisible();
      await expect(page.getByRole('main')).toBeVisible();
      await expect(page.getByRole('contentinfo')).toBeVisible();
      
      // Navigation should have proper ARIA structure
      await expect(page.locator('nav')).toBeVisible();
      
      // Links should be properly labeled
      const homeLink = page.getByRole('link', { name: 'Home' });
      await expect(homeLink).toBeVisible();
      
      const cartButton = page.getByRole('button', { name: /cart.*items/i });
      await expect(cartButton).toHaveAttribute('aria-label');
    });
  });
});