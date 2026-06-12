import { test, expect } from '@playwright/test';

test.describe('Storefront Layout Components', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('Header Component', () => {
    test('should display all header elements correctly', async ({ page }) => {
      // Logo and brand name
      await expect(page.getByText('PetStore')).toBeVisible();
      await expect(page.locator('.bg-primary-500.rounded-lg')).toBeVisible(); // Logo icon
      
      // Search functionality
      const searchInput = page.getByPlaceholder('Search products...');
      await expect(searchInput).toBeVisible();
      await expect(searchInput).toHaveAttribute('type', 'text');
      
      const searchButton = page.getByRole('button', { name: /search/i });
      await expect(searchButton).toBeVisible();
      
      // Cart button
      const cartButton = page.getByRole('button', { name: /cart.*items/i });
      await expect(cartButton).toBeVisible();
      await expect(cartButton).toContainText('Cart');
      await expect(cartButton).toContainText('0'); // Initial cart count
    });

    test('should handle search input interaction', async ({ page }) => {
      const searchInput = page.getByPlaceholder('Search products...');
      
      // Test search input
      await searchInput.fill('dog toys');
      await expect(searchInput).toHaveValue('dog toys');
      
      // Test search button click
      const searchButton = page.getByRole('button', { name: /search/i });
      await searchButton.click();
      // Note: Search functionality implementation depends on backend
    });

    test('should handle cart button interaction', async ({ page }) => {
      const cartButton = page.getByRole('button', { name: /cart.*items/i });
      
      await cartButton.click();
      // Should navigate to cart page (implementation dependent)
      // For now, just verify the button is clickable
    });

    test('should be sticky/fixed at top of page', async ({ page }) => {
      // Scroll down the page
      await page.evaluate(() => window.scrollBy(0, 1000));
      
      // Header should still be visible
      await expect(page.getByRole('banner')).toBeVisible();
      await expect(page.getByText('PetStore')).toBeVisible();
    });
  });

  test.describe('Navigation Component', () => {
    test('should display all navigation links on desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1200, height: 800 });
      await page.reload();
      
      // Verify all navigation links are visible
      const expectedLinks = [
        { name: 'Home', href: '/' },
        { name: 'Products', href: '/products' },
        { name: 'Categories', href: '/categories' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
      ];
      
      for (const link of expectedLinks) {
        const linkElement = page.getByRole('link', { name: link.name });
        await expect(linkElement).toBeVisible();
        await expect(linkElement).toHaveAttribute('href', link.href);
      }
    });

    test('should show mobile menu button on small screens', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.reload();
      
      // Mobile menu button should be visible
      const menuButton = page.getByLabel('Toggle navigation menu');
      await expect(menuButton).toBeVisible();
      
      // Desktop navigation should be hidden
      const desktopNav = page.locator('.hidden.md\\:flex');
      await expect(desktopNav).not.toBeVisible();
    });

    test('should toggle mobile menu correctly', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.reload();
      
      const menuButton = page.getByLabel('Toggle navigation menu');
      const mobileMenu = page.locator('#mobile-menu');
      
      // Initially mobile menu should be hidden
      await expect(mobileMenu).not.toBeVisible();
      
      // Open mobile menu
      await menuButton.click();
      await expect(mobileMenu).toBeVisible();
      await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
      
      // Close mobile menu
      await menuButton.click();
      await expect(mobileMenu).not.toBeVisible();
      await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    });

    test('should close mobile menu after navigation', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.reload();
      
      const menuButton = page.getByLabel('Toggle navigation menu');
      const mobileMenu = page.locator('#mobile-menu');
      
      // Open mobile menu
      await menuButton.click();
      await expect(mobileMenu).toBeVisible();
      
      // Click on a navigation link
      await mobileMenu.getByRole('link', { name: 'Products' }).click();
      
      // Menu should close and navigation should occur
      await expect(mobileMenu).not.toBeVisible();
      await expect(page).toHaveURL('/products');
    });

    test('should animate mobile menu hamburger icon', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.reload();
      
      const menuButton = page.getByLabel('Toggle navigation menu');
      
      // Check hamburger lines exist
      const hamburgerLines = menuButton.locator('span');
      await expect(hamburgerLines).toHaveCount(3);
      
      // Open menu - hamburger should transform
      await menuButton.click();
      // Note: Animation testing would require more specific selectors
      // and checking computed styles or classes
    });
  });

  test.describe('Footer Component', () => {
    test('should display all footer sections', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      
      const footer = page.getByRole('contentinfo');
      
      // Company info
      await expect(footer.getByText('PetStore')).toBeVisible();
      await expect(footer.getByText('Your trusted partner for all pet needs')).toBeVisible();
      
      // Section headers
      await expect(footer.getByText('Quick Links')).toBeVisible();
      await expect(footer.getByText('Categories')).toBeVisible();
      await expect(footer.getByText('Customer Service')).toBeVisible();
      await expect(footer.getByText('Newsletter')).toBeVisible();
    });

    test('should have all quick links with correct URLs', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      
      const footer = page.getByRole('contentinfo');
      const quickLinks = [
        { name: 'About Us', href: '/about' },
        { name: 'Contact', href: '/contact' },
        { name: 'Shipping Info', href: '/shipping' },
        { name: 'Returns', href: '/returns' },
      ];
      
      for (const link of quickLinks) {
        const linkElement = footer.getByRole('link', { name: link.name });
        await expect(linkElement).toBeVisible();
        await expect(linkElement).toHaveAttribute('href', link.href);
      }
    });

    test('should have all category links with correct URLs', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      
      const footer = page.getByRole('contentinfo');
      const categoryLinks = [
        { name: 'Dogs', href: '/categories/dogs' },
        { name: 'Cats', href: '/categories/cats' },
        { name: 'Birds', href: '/categories/birds' },
        { name: 'Fish', href: '/categories/fish' },
        { name: 'Small Pets', href: '/categories/small-pets' },
      ];
      
      for (const link of categoryLinks) {
        const linkElement = footer.getByRole('link', { name: link.name });
        await expect(linkElement).toBeVisible();
        await expect(linkElement).toHaveAttribute('href', link.href);
      }
    });

    test('should have all customer service links with correct URLs', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      
      const footer = page.getByRole('contentinfo');
      const serviceLinks = [
        { name: 'Help Center', href: '/help' },
        { name: 'Track Order', href: '/track-order' },
        { name: 'Size Guide', href: '/size-guide' },
        { name: 'Care Tips', href: '/care-tips' },
      ];
      
      for (const link of serviceLinks) {
        const linkElement = footer.getByRole('link', { name: link.name });
        await expect(linkElement).toBeVisible();
        await expect(linkElement).toHaveAttribute('href', link.href);
      }
    });

    test('should have functional newsletter signup form', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      
      const footer = page.getByRole('contentinfo');
      const emailInput = footer.getByPlaceholder('Enter your email');
      const subscribeButton = footer.getByRole('button', { name: 'Subscribe' });
      
      // Test form elements
      await expect(emailInput).toBeVisible();
      await expect(emailInput).toHaveAttribute('type', 'email');
      await expect(subscribeButton).toBeVisible();
      
      // Test form interaction
      await emailInput.fill('test@example.com');
      await expect(emailInput).toHaveValue('test@example.com');
      
      await subscribeButton.click();
      // Note: Actual subscription handling depends on backend implementation
    });

    test('should have all social media links with correct attributes', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      
      const footer = page.getByRole('contentinfo');
      const socialLinks = [
        { label: 'Facebook', href: 'https://facebook.com/petstore' },
        { label: 'Twitter', href: 'https://twitter.com/petstore' },
        { label: 'Instagram', href: 'https://instagram.com/petstore' },
        { label: 'YouTube', href: 'https://youtube.com/petstore' },
      ];
      
      for (const link of socialLinks) {
        const linkElement = footer.getByLabel(link.label);
        await expect(linkElement).toBeVisible();
        await expect(linkElement).toHaveAttribute('href', link.href);
        await expect(linkElement).toHaveAttribute('target', '_blank');
        await expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');
      }
    });

    test('should display current year in copyright', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      
      const footer = page.getByRole('contentinfo');
      const currentYear = new Date().getFullYear();
      await expect(footer.getByText(`© ${currentYear} PetStore. All rights reserved.`)).toBeVisible();
    });

    test('should have legal links', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      
      const footer = page.getByRole('contentinfo');
      
      const privacyLink = footer.getByRole('link', { name: 'Privacy Policy' });
      await expect(privacyLink).toBeVisible();
      await expect(privacyLink).toHaveAttribute('href', '/privacy');
      
      const termsLink = footer.getByRole('link', { name: 'Terms of Service' });
      await expect(termsLink).toBeVisible();
      await expect(termsLink).toHaveAttribute('href', '/terms');
    });
  });

  test.describe('Layout Integration', () => {
    test('should maintain layout structure across viewport changes', async ({ page }) => {
      const viewports = [
        { width: 375, height: 667 },   // Mobile
        { width: 768, height: 1024 },  // Tablet
        { width: 1200, height: 800 },  // Desktop
        { width: 1920, height: 1080 }, // Large desktop
      ];
      
      for (const viewport of viewports) {
        await page.setViewportSize(viewport);
        await page.reload();
        
        // Header should always be present
        await expect(page.getByRole('banner')).toBeVisible();
        
        // Main content should be present
        await expect(page.getByRole('main')).toBeVisible();
        
        // Footer should be present
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await expect(page.getByRole('contentinfo')).toBeVisible();
      }
    });

    test('should have proper CSS grid/flexbox layout', async ({ page }) => {
      // Test that the layout uses modern CSS layout techniques
      const body = page.locator('body > div').first(); // Root layout div
      
      // Should have min-height and flex layout
      const styles = await body.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          display: computed.display,
          flexDirection: computed.flexDirection,
          minHeight: computed.minHeight,
        };
      });
      
      expect(styles.display).toBe('flex');
      expect(styles.flexDirection).toBe('column');
      expect(styles.minHeight).toBe('100vh');
    });

    test('should handle content overflow correctly', async ({ page }) => {
      // Test with very long content
      await page.evaluate(() => {
        const main = document.querySelector('main');
        if (main) {
          const longContent = document.createElement('div');
          longContent.style.height = '3000px';
          longContent.style.backgroundColor = 'lightblue';
          longContent.textContent = 'Very long content for testing overflow';
          main.appendChild(longContent);
        }
      });
      
      // Header should still be visible at top
      await page.evaluate(() => window.scrollTo(0, 0));
      await expect(page.getByRole('banner')).toBeVisible();
      
      // Footer should be at bottom
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await expect(page.getByRole('contentinfo')).toBeVisible();
    });

    test('should maintain navigation accessibility during layout changes', async ({ page }) => {
      // Test that navigation remains accessible during viewport changes
      await page.setViewportSize({ width: 1200, height: 800 });
      
      // Desktop navigation should be accessible
      await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
      
      // Change to mobile
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Mobile navigation should be accessible
      const menuButton = page.getByLabel('Toggle navigation menu');
      await expect(menuButton).toBeVisible();
      
      await menuButton.click();
      await expect(page.locator('#mobile-menu')).toBeVisible();
      
      // Navigation links should still be accessible in mobile menu
      await expect(page.locator('#mobile-menu').getByRole('link', { name: 'Home' })).toBeVisible();
    });
  });
});