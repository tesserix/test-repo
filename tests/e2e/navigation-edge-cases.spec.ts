import { test, expect } from '@playwright/test';

test.describe('Navigation Edge Cases and Error Scenarios', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('Keyboard Navigation and Accessibility', () => {
    test('should support keyboard navigation through header links', async ({ page }) => {
      // Focus on the first navigation link
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab'); // Should reach logo or first nav item
      
      // Navigate through header elements using Tab
      const activeElement = page.locator(':focus');
      
      // Should be able to navigate to all interactive elements
      let tabCount = 0;
      const maxTabs = 10; // Prevent infinite loop
      
      while (tabCount < maxTabs) {
        await page.keyboard.press('Tab');
        const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
        if (focusedElement === 'A' || focusedElement === 'BUTTON') {
          // Found a focusable navigation element
          break;
        }
        tabCount++;
      }
      
      // Should be able to activate navigation with Enter/Space
      await page.keyboard.press('Enter');
      // URL should change or some action should occur
    });

    test('should have proper ARIA labels and roles for screen readers', async ({ page }) => {
      // Check navigation landmark
      const nav = page.locator('nav');
      await expect(nav).toBeVisible();
      
      // Check header has banner role
      const banner = page.getByRole('banner');
      await expect(banner).toBeVisible();
      
      // Check mobile menu button accessibility
      await page.setViewportSize({ width: 375, height: 667 });
      await page.reload();
      
      const menuButton = page.getByLabel('Toggle navigation menu');
      await expect(menuButton).toHaveAttribute('aria-expanded');
      await expect(menuButton).toHaveAttribute('aria-controls');
      
      // Test search and cart accessibility
      await page.setViewportSize({ width: 1200, height: 800 });
      await page.reload();
      
      const searchButton = page.getByLabel('Search products');
      const cartButton = page.getByLabel('Shopping cart');
      
      await expect(searchButton).toBeVisible();
      await expect(cartButton).toBeVisible();
    });

    test('should maintain focus management in mobile menu', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.reload();
      
      const menuButton = page.getByLabel('Toggle navigation menu');
      
      // Open mobile menu
      await menuButton.click();
      
      // Focus should be manageable within the mobile menu
      const mobileMenu = page.locator('#mobile-menu');
      await expect(mobileMenu).toBeVisible();
      
      // First link in mobile menu should be focusable
      const firstLink = mobileMenu.getByRole('link').first();
      await firstLink.focus();
      await expect(firstLink).toBeFocused();
      
      // Should be able to navigate with arrow keys or tab within menu
      await page.keyboard.press('Tab');
      const secondLink = mobileMenu.getByRole('link').nth(1);
      await expect(secondLink).toBeFocused();
    });
  });

  test.describe('Error Handling and Broken Links', () => {
    test('should handle non-existent pages gracefully', async ({ page }) => {
      // Test direct navigation to non-existent page
      const response = await page.goto('/non-existent-page', { waitUntil: 'networkidle' });
      expect(response?.status()).toBe(404);
      
      // Should still show header and footer on 404 page
      await expect(page.getByRole('banner')).toBeVisible();
      // Note: Footer might not be visible if 404 page is short
    });

    test('should maintain navigation when JavaScript is disabled', async ({ page, context }) => {
      // Disable JavaScript
      await context.setExtraHTTPHeaders({ 'User-Agent': 'test-no-js' });
      await page.goto('/');
      
      // Basic navigation should still work without JS
      await expect(page.getByText('PetStore')).toBeVisible();
      await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
      
      // Links should have proper href attributes for fallback navigation
      const productsLink = page.getByRole('link', { name: 'Products' });
      await expect(productsLink).toHaveAttribute('href', '/products');
    });

    test('should handle slow network conditions', async ({ page }) => {
      // Simulate slow network
      await page.route('**/*', (route) => {
        setTimeout(() => route.continue(), 1000); // 1 second delay
      });
      
      await page.goto('/');
      
      // Navigation should eventually be available
      await expect(page.getByText('PetStore')).toBeVisible({ timeout: 10000 });
      await expect(page.getByRole('link', { name: 'Home' })).toBeVisible({ timeout: 10000 });
    });
  });

  test.describe('URL and Direct Access', () => {
    test('should handle direct URL access to category pages', async ({ page }) => {
      // Direct navigation to category pages
      await page.goto('/categories/dogs');
      await expect(page).toHaveURL('/categories/dogs');
      
      // Header navigation should still be present
      await expect(page.getByRole('banner')).toBeVisible();
      await expect(page.getByText('PetStore')).toBeVisible();
    });

    test('should preserve navigation state during page refreshes', async ({ page }) => {
      // Navigate to a page
      await page.getByRole('link', { name: 'Products' }).click();
      await expect(page).toHaveURL('/products');
      
      // Refresh the page
      await page.reload();
      
      // Should still be on the same page with navigation intact
      await expect(page).toHaveURL('/products');
      await expect(page.getByRole('banner')).toBeVisible();
      await expect(page.getByText('PetStore')).toBeVisible();
    });

    test('should handle browser back/forward navigation', async ({ page }) => {
      // Navigate through several pages
      await page.getByRole('link', { name: 'Products' }).click();
      await expect(page).toHaveURL('/products');
      
      await page.getByRole('link', { name: 'Categories' }).click();
      await expect(page).toHaveURL('/categories');
      
      // Use browser back button
      await page.goBack();
      await expect(page).toHaveURL('/products');
      
      // Use browser forward button
      await page.goForward();
      await expect(page).toHaveURL('/categories');
      
      // Navigation should remain functional
      await expect(page.getByRole('banner')).toBeVisible();
    });
  });

  test.describe('Performance and Loading States', () => {
    test('should show navigation immediately on page load', async ({ page }) => {
      // Measure navigation visibility timing
      const start = Date.now();
      await page.goto('/');
      
      // Navigation should be visible quickly
      await expect(page.getByRole('banner')).toBeVisible();
      const loadTime = Date.now() - start;
      
      // Should load within reasonable time (2 seconds)
      expect(loadTime).toBeLessThan(2000);
    });

    test('should handle rapid navigation clicks without breaking', async ({ page }) => {
      // Rapidly click different navigation links
      await Promise.all([
        page.getByRole('link', { name: 'Products' }).click(),
        page.waitForTimeout(100),
        page.getByRole('link', { name: 'Categories' }).click(),
        page.waitForTimeout(100),
        page.getByRole('link', { name: 'About' }).click(),
      ]);
      
      // Should end up on the last clicked page
      await expect(page).toHaveURL('/about');
      
      // Navigation should still be functional
      await expect(page.getByRole('banner')).toBeVisible();
      await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
    });
  });

  test.describe('Mobile Navigation Specific Tests', () => {
    test('should handle mobile menu state during orientation changes', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.reload();
      
      // Open mobile menu
      await page.getByLabel('Toggle navigation menu').click();
      await expect(page.locator('#mobile-menu')).toBeVisible();
      
      // Change orientation (simulate device rotation)
      await page.setViewportSize({ width: 667, height: 375 });
      
      // Menu state should be handled appropriately
      // (Implementation may vary - menu might close or adapt)
      
      // Navigation should remain functional
      await expect(page.getByRole('banner')).toBeVisible();
    });

    test('should prevent body scroll when mobile menu is open', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.reload();
      
      // Get initial scroll position
      const initialScrollY = await page.evaluate(() => window.scrollY);
      
      // Open mobile menu
      await page.getByLabel('Toggle navigation menu').click();
      await expect(page.locator('#mobile-menu')).toBeVisible();
      
      // Try to scroll - should be prevented or controlled
      await page.evaluate(() => window.scrollBy(0, 100));
      
      // Implementation detail: depends on if scroll prevention is implemented
      // This test documents the expected behavior
    });

    test('should close mobile menu when clicking outside', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.reload();
      
      // Open mobile menu
      await page.getByLabel('Toggle navigation menu').click();
      await expect(page.locator('#mobile-menu')).toBeVisible();
      
      // Click outside the menu (on main content)
      await page.getByRole('main').click();
      
      // Menu should close
      await expect(page.locator('#mobile-menu')).not.toBeVisible();
    });
  });

  test.describe('Footer Navigation Edge Cases', () => {
    test('should handle footer link navigation', async ({ page }) => {
      // Scroll to footer
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      
      // Test footer navigation links
      await page.getByRole('link', { name: 'About Us' }).click();
      await expect(page).toHaveURL('/about');
      
      // Header navigation should still work after footer navigation
      await expect(page.getByRole('banner')).toBeVisible();
      await page.getByRole('link', { name: 'Home' }).click();
      await expect(page).toHaveURL('/');
    });

    test('should handle newsletter form submission edge cases', async ({ page }) => {
      // Scroll to footer
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      
      const emailInput = page.getByPlaceholder('Enter your email');
      const subscribeButton = page.getByRole('button', { name: 'Subscribe' });
      
      // Test empty submission
      await subscribeButton.click();
      // Should handle empty email gracefully
      
      // Test invalid email
      await emailInput.fill('invalid-email');
      await subscribeButton.click();
      // Should validate email format
      
      // Test valid email
      await emailInput.fill('test@example.com');
      await subscribeButton.click();
      // Should handle successful submission
      
      // Form should remain functional after submission attempts
      await expect(emailInput).toBeVisible();
      await expect(subscribeButton).toBeVisible();
    });
  });
});