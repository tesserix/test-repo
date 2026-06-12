import { test, expect } from '@playwright/test';

/**
 * Tests for Product Catalog functionality
 * These tests establish the expected behavior for the product catalog pages
 * that should be implemented to fulfill the petstore requirements.
 */
test.describe('Product Catalog', () => {
  test('should display products page when navigating from homepage', async ({ page }) => {
    await page.goto('/');
    
    // Click on Products link from homepage
    await page.getByRole('link', { name: 'Products' }).click();
    
    // Currently this will show 404 since the products page isn't implemented yet
    // In the future, this test should verify:
    // - Products page loads successfully
    // - Product list is displayed
    // - Product cards show name, price, image
    // - Add to cart functionality works
    
    // For now, just verify we attempted to navigate to the right URL
    await expect(page).toHaveURL('/products');
  });

  test('should display categories page when navigating from homepage', async ({ page }) => {
    await page.goto('/');
    
    // Click on Categories link from homepage
    await page.getByRole('link', { name: 'Categories' }).click();
    
    // Currently this will show 404 since the categories page isn't implemented yet
    // In the future, this test should verify:
    // - Categories page loads successfully
    // - Category list is displayed
    // - Categories are organized (could have subcategories)
    // - Clicking a category filters products
    
    // For now, just verify we attempted to navigate to the right URL
    await expect(page).toHaveURL('/categories');
  });

  test.skip('should display product details when clicking on a product', async ({ page }) => {
    // This test is skipped until product listing page is implemented
    // When implemented, it should:
    // 1. Go to products page
    // 2. Click on a specific product
    // 3. Verify product detail page shows:
    //    - Product name and description
    //    - Price
    //    - Product images
    //    - Add to cart button
    //    - Quantity selector
    //    - Product specifications
  });

  test.skip('should filter products by category', async ({ page }) => {
    // This test is skipped until category functionality is implemented
    // When implemented, it should:
    // 1. Go to products page
    // 2. Select a category filter
    // 3. Verify only products from that category are shown
    // 4. Verify category breadcrumb is displayed
  });

  test.skip('should search for products', async ({ page }) => {
    // This test is skipped until search functionality is implemented
    // When implemented, it should:
    // 1. Enter search term in search box
    // 2. Submit search
    // 3. Verify search results are displayed
    // 4. Verify search term is highlighted in results
    // 5. Handle empty search results gracefully
  });

  test.skip('should sort products by price, name, popularity', async ({ page }) => {
    // This test is skipped until sorting functionality is implemented
    // When implemented, it should:
    // 1. Go to products page
    // 2. Change sort option
    // 3. Verify products are reordered correctly
  });

  test.skip('should handle pagination on products page', async ({ page }) => {
    // This test is skipped until pagination is implemented
    // When implemented, it should:
    // 1. Go to products page
    // 2. Navigate through pages
    // 3. Verify page numbers work correctly
    // 4. Verify products change on each page
  });
});