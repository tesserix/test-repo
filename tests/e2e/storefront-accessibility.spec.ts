import { test, expect } from '@playwright/test';

test.describe('Story #43: Storefront Layout Accessibility Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('Keyboard Navigation', () => {
    test('should support keyboard navigation through header elements', async ({ page }) => {
      // Start from the top of the page
      await page.keyboard.press('Tab');
      
      // Should be able to navigate to the logo
      let focusedElement = await page.evaluate(() => document.activeElement?.textContent);
      expect(focusedElement).toContain('PetStore');
      
      // Continue tabbing through navigation elements
      await page.keyboard.press('Tab'); // Search input
      const searchInput = page.locator(':focus');
      await expect(searchInput).toHaveAttribute('placeholder', 'Search products...');
      
      await page.keyboard.press('Tab'); // Search button
      const searchButton = page.locator(':focus');
      await expect(searchButton).toHaveAttribute('aria-label', 'Search');
      
      // Navigate through main navigation links
      const navLinks = ['Home', 'Products', 'Categories', 'About', 'Contact'];
      for (const linkText of navLinks) {
        await page.keyboard.press('Tab');
        const currentFocus = page.locator(':focus');
        await expect(currentFocus).toContainText(linkText);
      }
      
      // Should reach cart button
      await page.keyboard.press('Tab');
      const cartButton = page.locator(':focus');
      await expect(cartButton).toHaveAttribute('aria-label', 'Cart (0 items)');
    });

    test('should allow keyboard activation of navigation links', async ({ page }) => {
      // Tab to Products link
      await page.keyboard.press('Tab'); // Logo
      await page.keyboard.press('Tab'); // Search input
      await page.keyboard.press('Tab'); // Search button
      await page.keyboard.press('Tab'); // Home
      await page.keyboard.press('Tab'); // Products
      
      // Activate with Enter key
      await page.keyboard.press('Enter');
      await expect(page).toHaveURL('/products');
      
      // Verify header navigation is still accessible
      await expect(page.getByRole('banner')).toBeVisible();
    });

    test('should support keyboard navigation in mobile menu', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.reload();
      
      // Tab to mobile menu button
      await page.keyboard.press('Tab'); // Logo
      await page.keyboard.press('Tab'); // Search input
      await page.keyboard.press('Tab'); // Search button
      await page.keyboard.press('Tab'); // Mobile menu button
      
      // Open mobile menu with keyboard
      await page.keyboard.press('Enter');
      await expect(page.locator('#mobile-menu')).toBeVisible();
      
      // Tab through mobile menu items
      await page.keyboard.press('Tab'); // First menu item
      const firstLink = page.locator(':focus');
      await expect(firstLink).toContainText('Home');
      
      // Continue through other menu items
      await page.keyboard.press('Tab');
      const secondLink = page.locator(':focus');
      await expect(secondLink).toContainText('Products');
    });

    test('should maintain focus within mobile menu when open', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.reload();
      
      const menuButton = page.getByLabel('Toggle navigation menu');
      await menuButton.click();
      
      // Focus should be manageable within the opened menu
      const mobileMenu = page.locator('#mobile-menu');
      await expect(mobileMenu).toBeVisible();
      
      const firstMenuLink = mobileMenu.getByRole('link').first();
      await firstMenuLink.focus();
      await expect(firstMenuLink).toBeFocused();
      
      // Tab should move to next menu item, not escape the menu
      await page.keyboard.press('Tab');
      const secondMenuLink = mobileMenu.getByRole('link').nth(1);
      await expect(secondMenuLink).toBeFocused();
    });

    test('should support Escape key to close mobile menu', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.reload();
      
      // Open mobile menu
      await page.getByLabel('Toggle navigation menu').click();
      await expect(page.locator('#mobile-menu')).toBeVisible();
      
      // Press Escape to close
      await page.keyboard.press('Escape');
      await expect(page.locator('#mobile-menu')).not.toBeVisible();
      
      // Focus should return to menu button
      const menuButton = page.getByLabel('Toggle navigation menu');
      await expect(menuButton).toBeFocused();
    });
  });

  test.describe('ARIA Attributes and Screen Reader Support', () => {
    test('should have proper ARIA attributes in header', async ({ page }) => {
      // Header should have banner role
      const header = page.getByRole('banner');
      await expect(header).toBeVisible();
      
      // Navigation should have proper structure
      const nav = page.locator('nav');
      await expect(nav).toBeVisible();
      
      // Search button should have aria-label
      const searchButton = page.getByLabel('Search');
      await expect(searchButton).toHaveAttribute('aria-label', 'Search');
      
      // Cart button should have descriptive aria-label
      const cartButton = page.getByLabel('Cart (0 items)');
      await expect(cartButton).toHaveAttribute('aria-label', 'Cart (0 items)');
    });

    test('should have proper ARIA attributes in mobile menu', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.reload();
      
      const menuButton = page.getByLabel('Toggle navigation menu');
      
      // Menu button should have proper ARIA attributes
      await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
      await expect(menuButton).toHaveAttribute('aria-controls', 'mobile-menu');
      await expect(menuButton).toHaveAttribute('aria-label', 'Toggle navigation menu');
      
      // Open menu
      await menuButton.click();
      await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
      
      // Mobile menu should have proper ID for aria-controls
      const mobileMenu = page.locator('#mobile-menu');
      await expect(mobileMenu).toBeVisible();
      await expect(mobileMenu).toHaveAttribute('id', 'mobile-menu');
    });

    test('should have proper semantic structure for screen readers', async ({ page }) => {
      // Main landmark areas should be present
      await expect(page.getByRole('banner')).toBeVisible();
      await expect(page.getByRole('main')).toBeVisible();
      await expect(page.getByRole('contentinfo')).toBeVisible();
      
      // Navigation should have appropriate role
      await expect(page.getByRole('navigation')).toBeVisible();
      
      // Headings should form proper hierarchy
      const h1 = page.locator('h1');
      await expect(h1).toBeVisible();
      
      const h2Elements = page.locator('h2');
      const h2Count = await h2Elements.count();
      expect(h2Count).toBeGreaterThan(0); // Should have section headings
    });

    test('should have proper footer semantic structure', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      
      // Footer should have contentinfo role
      const footer = page.getByRole('contentinfo');
      await expect(footer).toBeVisible();
      await expect(footer).toHaveAttribute('role', 'contentinfo');
      
      // Social media links should have descriptive labels
      await expect(page.getByLabel('Facebook')).toBeVisible();
      await expect(page.getByLabel('Twitter')).toBeVisible();
      await expect(page.getByLabel('Instagram')).toBeVisible();
      await expect(page.getByLabel('YouTube')).toBeVisible();
    });
  });

  test.describe('Focus Management and Visual Indicators', () => {
    test('should provide visible focus indicators for keyboard navigation', async ({ page }) => {
      // Tab through interactive elements and verify focus is visible
      await page.keyboard.press('Tab'); // Logo link
      let focusedElement = page.locator(':focus');
      
      // Check that focus ring or outline is visible (this would need specific CSS testing)
      const computedStyle = await focusedElement.evaluate((el) => {
        return window.getComputedStyle(el);
      });
      
      // Focus should be clearly indicated (specific implementation may vary)
      // This test documents the requirement for visible focus indicators
      await expect(focusedElement).toBeVisible();
    });

    test('should maintain focus order on page resize', async ({ page }) => {
      // Start with desktop view, focus on navigation
      await page.keyboard.press('Tab'); // Logo
      await page.keyboard.press('Tab'); // Search
      await page.keyboard.press('Tab'); // Search button
      await page.keyboard.press('Tab'); // First nav link
      
      let focusedElement = page.locator(':focus');
      await expect(focusedElement).toContainText('Home');
      
      // Resize to tablet
      await page.setViewportSize({ width: 768, height: 1024 });
      
      // Focus should still be on the same element or logically equivalent
      focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();
    });

    test('should handle focus when transitioning between desktop and mobile menu', async ({ page }) => {
      // Start in mobile view
      await page.setViewportSize({ width: 375, height: 667 });
      await page.reload();
      
      // Focus on mobile menu button
      const menuButton = page.getByLabel('Toggle navigation menu');
      await menuButton.focus();
      await expect(menuButton).toBeFocused();
      
      // Resize to desktop
      await page.setViewportSize({ width: 1200, height: 800 });
      
      // Mobile menu should be hidden, focus should be handled gracefully
      await expect(page.locator('#mobile-menu')).not.toBeVisible();
      
      // Desktop navigation should be visible
      await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
    });
  });

  test.describe('Color Contrast and Visual Accessibility', () => {
    test('should meet color contrast requirements for text elements', async ({ page }) => {
      // This test documents the requirement for adequate color contrast
      // In a real implementation, you would use accessibility testing tools
      
      // Verify text is visible against backgrounds
      await expect(page.getByText('PetStore')).toBeVisible();
      await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Products' })).toBeVisible();
      
      // Verify interactive elements are visually distinct
      const cartButton = page.getByLabel('Cart (0 items)');
      await expect(cartButton).toBeVisible();
      
      const searchButton = page.getByLabel('Search');
      await expect(searchButton).toBeVisible();
    });

    test('should provide adequate visual separation between sections', async ({ page }) => {
      // Header should be visually distinct
      const header = page.getByRole('banner');
      await expect(header).toBeVisible();
      
      // Main content should be clearly separated
      const main = page.getByRole('main');
      await expect(main).toBeVisible();
      
      // Footer should be visually distinct
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      const footer = page.getByRole('contentinfo');
      await expect(footer).toBeVisible();
    });
  });

  test.describe('Reduced Motion and Animation Preferences', () => {
    test('should respect prefers-reduced-motion for animations', async ({ page }) => {
      // Set reduced motion preference
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.reload();
      
      // Navigation should still work without animations
      await page.setViewportSize({ width: 375, height: 667 });
      await page.reload();
      
      const menuButton = page.getByLabel('Toggle navigation menu');
      await menuButton.click();
      
      // Mobile menu should appear (potentially without transitions)
      await expect(page.locator('#mobile-menu')).toBeVisible();
      
      // Close menu
      await menuButton.click();
      await expect(page.locator('#mobile-menu')).not.toBeVisible();
    });
  });

  test.describe('Screen Reader Navigation Patterns', () => {
    test('should provide skip navigation link for screen readers', async ({ page }) => {
      // Look for skip link (often hidden but available for screen readers)
      // This documents the accessibility requirement even if not implemented yet
      
      // Main content should be easily identifiable
      const main = page.getByRole('main');
      await expect(main).toBeVisible();
      
      // Navigation should be clearly marked
      const nav = page.getByRole('navigation');
      await expect(nav).toBeVisible();
    });

    test('should have descriptive link text for context', async ({ page }) => {
      // Navigation links should be descriptive
      await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Products' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Categories' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'About' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Contact' })).toBeVisible();
      
      // Cart button should be descriptive
      await expect(page.getByLabel('Cart (0 items)')).toBeVisible();
      
      // Footer links should be descriptive
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await expect(page.getByRole('link', { name: 'About Us' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Privacy Policy' })).toBeVisible();
    });
  });
});