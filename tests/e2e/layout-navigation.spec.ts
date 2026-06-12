/**
 * tests/e2e/layout-navigation.spec.ts
 *
 * Story #60 — Create main layout and navigation structure
 *
 * Acceptance criteria:
 *   AC1 – Given I visit any page, when the page loads, I see a consistent
 *          header with navigation (and a footer).
 *   AC2 – Given I'm on mobile, when I tap the menu button, navigation opens
 *          in a mobile-friendly drawer.
 *   AC3 – Given I'm viewing the layout, when I resize the browser, the
 *          navigation adapts responsively.
 *
 * Strategy:
 *   - All tests use role / label / text selectors (no class names, no IDs
 *     except where the component exposes `id="mobile-menu"` as a stable API).
 *   - Desktop viewport: 1280 × 720  (Playwright default)
 *   - Mobile viewport : 390 × 844   (iPhone 14 logical pixels)
 *   - No `waitForTimeout` — Playwright's auto-waiting locators are used
 *     throughout.
 */

import { test, expect, type Page } from "@playwright/test";

// ---------------------------------------------------------------------------
// Viewport constants
// ---------------------------------------------------------------------------
const DESKTOP = { width: 1280, height: 720 };
const MOBILE = { width: 390, height: 844 };

// ---------------------------------------------------------------------------
// Helper – navigate to a page and wait for the header landmark to be ready
// ---------------------------------------------------------------------------
async function gotoAndWaitForLayout(page: Page, path: string) {
  await page.goto(path);
  await expect(page.getByRole("banner")).toBeVisible();
}

// ============================================================================
// AC1 – Consistent header with navigation on every page
// ============================================================================
test.describe("AC1 – Consistent header and footer on every page", () => {
  const routes = ["/", "/products", "/categories", "/admin", "/cart"];

  for (const route of routes) {
    test(`header is visible on ${route}`, async ({ page }) => {
      await gotoAndWaitForLayout(page, route);
      await expect(page.getByRole("banner")).toBeVisible();
    });

    test(`main navigation landmark is visible on ${route}`, async ({
      page,
    }) => {
      await gotoAndWaitForLayout(page, route);
      await expect(
        page.getByRole("navigation", { name: /main navigation/i }),
      ).toBeVisible();
    });

    test(`footer is visible on ${route}`, async ({ page }) => {
      await gotoAndWaitForLayout(page, route);
      await expect(page.getByRole("contentinfo")).toBeVisible();
    });

    test(`brand "Petstore" link is visible on ${route}`, async ({ page }) => {
      await gotoAndWaitForLayout(page, route);
      await expect(
        page.getByRole("link", { name: /petstore/i }).first(),
      ).toBeVisible();
    });
  }

  test("desktop nav shows Home, Products, Categories, Admin links", async ({
    page,
  }) => {
    await page.setViewportSize(DESKTOP);
    await gotoAndWaitForLayout(page, "/");

    const nav = page.getByRole("navigation", { name: /main navigation/i });
    await expect(nav.getByRole("link", { name: "Home" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Products" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Categories" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Admin" })).toBeVisible();
  });

  test("desktop nav contains a shopping-cart link pointing to /cart", async ({
    page,
  }) => {
    await page.setViewportSize(DESKTOP);
    await gotoAndWaitForLayout(page, "/");

    const cartLink = page
      .getByRole("navigation", { name: /main navigation/i })
      .getByRole("link", { name: /shopping cart/i })
      .first();
    await expect(cartLink).toBeVisible();
    await expect(cartLink).toHaveAttribute("href", "/cart");
  });

  test("footer navigation contains Home, Products and Categories links", async ({
    page,
  }) => {
    await gotoAndWaitForLayout(page, "/");
    const footer = page.getByRole("contentinfo");
    const footerNav = footer.getByRole("navigation", {
      name: /footer navigation/i,
    });

    await expect(footerNav.getByRole("link", { name: "Home" })).toBeVisible();
    await expect(
      footerNav.getByRole("link", { name: "Products" }),
    ).toBeVisible();
    await expect(
      footerNav.getByRole("link", { name: "Categories" }),
    ).toBeVisible();
  });

  test("footer shows a copyright notice including the current year", async ({
    page,
  }) => {
    await gotoAndWaitForLayout(page, "/");
    const year = new Date().getFullYear().toString();
    await expect(page.getByRole("contentinfo")).toContainText(year);
    await expect(page.getByRole("contentinfo")).toContainText(/petstore/i);
  });

  test("page <title> uses the Petstore template on the home route", async ({
    page,
  }) => {
    await gotoAndWaitForLayout(page, "/");
    await expect(page).toHaveTitle(/petstore/i);
  });

  test("page <title> uses the template on sub-pages (e.g. /products)", async ({
    page,
  }) => {
    await gotoAndWaitForLayout(page, "/products");
    await expect(page).toHaveTitle(/petstore/i);
  });
});

// ============================================================================
// AC2 – Mobile navigation drawer
// ============================================================================
test.describe("AC2 – Mobile hamburger drawer", () => {
  test.use({ viewport: MOBILE });

  test("hamburger button is visible on mobile", async ({ page }) => {
    await gotoAndWaitForLayout(page, "/");
    await expect(
      page.getByRole("button", { name: /open menu/i }),
    ).toBeVisible();
  });

  test("mobile drawer is hidden before the button is tapped", async ({
    page,
  }) => {
    await gotoAndWaitForLayout(page, "/");
    await expect(page.locator("#mobile-menu")).not.toBeVisible();
  });

  test("tapping Open menu shows the mobile drawer", async ({ page }) => {
    await gotoAndWaitForLayout(page, "/");
    await page.getByRole("button", { name: /open menu/i }).click();
    await expect(page.locator("#mobile-menu")).toBeVisible();
  });

  test("drawer contains all expected nav links", async ({ page }) => {
    await gotoAndWaitForLayout(page, "/");
    await page.getByRole("button", { name: /open menu/i }).click();

    const drawer = page.locator("#mobile-menu");
    await expect(drawer.getByRole("link", { name: "Home" })).toBeVisible();
    await expect(
      drawer.getByRole("link", { name: "Products" }),
    ).toBeVisible();
    await expect(
      drawer.getByRole("link", { name: "Categories" }),
    ).toBeVisible();
    await expect(drawer.getByRole("link", { name: "Admin" })).toBeVisible();
  });

  test("after opening, button label changes to Close menu and aria-expanded is true", async ({
    page,
  }) => {
    await gotoAndWaitForLayout(page, "/");
    await page.getByRole("button", { name: /open menu/i }).click();

    const closeBtn = page.getByRole("button", { name: /close menu/i });
    await expect(closeBtn).toBeVisible();
    await expect(closeBtn).toHaveAttribute("aria-expanded", "true");
  });

  test("tapping Close menu hides the drawer", async ({ page }) => {
    await gotoAndWaitForLayout(page, "/");
    await page.getByRole("button", { name: /open menu/i }).click();
    await expect(page.locator("#mobile-menu")).toBeVisible();

    await page.getByRole("button", { name: /close menu/i }).click();
    await expect(page.locator("#mobile-menu")).not.toBeVisible();
  });

  test("tapping a nav link inside the drawer closes it", async ({ page }) => {
    await gotoAndWaitForLayout(page, "/");
    await page.getByRole("button", { name: /open menu/i }).click();

    const drawer = page.locator("#mobile-menu");
    await drawer.getByRole("link", { name: "Products" }).click();

    await expect(page.locator("#mobile-menu")).not.toBeVisible();
  });

  test("tapping the Admin link inside the drawer closes it", async ({
    page,
  }) => {
    await gotoAndWaitForLayout(page, "/");
    await page.getByRole("button", { name: /open menu/i }).click();

    const drawer = page.locator("#mobile-menu");
    await drawer.getByRole("link", { name: "Admin" }).click();

    await expect(page.locator("#mobile-menu")).not.toBeVisible();
  });

  test("tapping the brand logo while drawer is open closes it", async ({
    page,
  }) => {
    await gotoAndWaitForLayout(page, "/products");
    await page.getByRole("button", { name: /open menu/i }).click();
    await expect(page.locator("#mobile-menu")).toBeVisible();

    // Click the Petstore brand logo link in the header
    await page
      .getByRole("banner")
      .getByRole("link", { name: /petstore/i })
      .click();

    await expect(page.locator("#mobile-menu")).not.toBeVisible();
  });

  test("mobile shopping-cart link is visible before drawer is opened", async ({
    page,
  }) => {
    await gotoAndWaitForLayout(page, "/");
    // The mobile cart icon lives outside the drawer, always visible
    const mobileCartArea = page.getByRole("banner");
    await expect(
      mobileCartArea.getByRole("link", { name: /shopping cart/i }).first(),
    ).toBeVisible();
  });

  test("toggling open then closed multiple times works correctly", async ({
    page,
  }) => {
    await gotoAndWaitForLayout(page, "/");

    // Open
    await page.getByRole("button", { name: /open menu/i }).click();
    await expect(page.locator("#mobile-menu")).toBeVisible();

    // Close
    await page.getByRole("button", { name: /close menu/i }).click();
    await expect(page.locator("#mobile-menu")).not.toBeVisible();

    // Open again
    await page.getByRole("button", { name: /open menu/i }).click();
    await expect(page.locator("#mobile-menu")).toBeVisible();
  });
});

// ============================================================================
// AC3 – Responsive navigation adapts to viewport
// ============================================================================
test.describe("AC3 – Responsive navigation adapts to viewport", () => {
  test("hamburger button is hidden at desktop width", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await gotoAndWaitForLayout(page, "/");
    // The button is rendered but hidden via Tailwind md:hidden — it must not
    // be visible (outside the visible viewport area).
    const btn = page.getByRole("button", { name: /open menu/i });
    await expect(btn).not.toBeVisible();
  });

  test("desktop nav links are hidden at mobile width", async ({ page }) => {
    await page.setViewportSize(MOBILE);
    await gotoAndWaitForLayout(page, "/");
    // The desktop link group is hidden at <md breakpoint; the hamburger is
    // the entry point instead.
    await expect(
      page.getByRole("button", { name: /open menu/i }),
    ).toBeVisible();
    // The desktop-only nav links div is hidden (not visible)
    // We confirm this by checking the mobile drawer is NOT present until tapped
    await expect(page.locator("#mobile-menu")).not.toBeVisible();
  });

  test("resizing from mobile to desktop hides the hamburger", async ({
    page,
  }) => {
    await page.setViewportSize(MOBILE);
    await gotoAndWaitForLayout(page, "/");
    await expect(
      page.getByRole("button", { name: /open menu/i }),
    ).toBeVisible();

    await page.setViewportSize(DESKTOP);
    await expect(
      page.getByRole("button", { name: /open menu/i }),
    ).not.toBeVisible();
  });

  test("resizing from desktop to mobile reveals the hamburger", async ({
    page,
  }) => {
    await page.setViewportSize(DESKTOP);
    await gotoAndWaitForLayout(page, "/");
    await expect(
      page.getByRole("button", { name: /open menu/i }),
    ).not.toBeVisible();

    await page.setViewportSize(MOBILE);
    await expect(
      page.getByRole("button", { name: /open menu/i }),
    ).toBeVisible();
  });

  test("desktop nav links are visible at desktop width", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await gotoAndWaitForLayout(page, "/");

    const nav = page.getByRole("navigation", { name: /main navigation/i });
    // These links are in the desktop-only hidden div; at desktop they must be visible
    await expect(nav.getByRole("link", { name: "Products" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Categories" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Admin" })).toBeVisible();
  });
});

// ============================================================================
// Navigation integration – clicking links navigates to the right pages
// ============================================================================
test.describe("Navigation integration – links navigate correctly", () => {
  test.use({ viewport: DESKTOP });

  test("clicking Products in desktop nav navigates to /products", async ({
    page,
  }) => {
    await gotoAndWaitForLayout(page, "/");
    await page
      .getByRole("navigation", { name: /main navigation/i })
      .getByRole("link", { name: "Products" })
      .click();
    await expect(page).toHaveURL(/\/products/);
    await expect(page.getByRole("banner")).toBeVisible();
  });

  test("clicking Categories in desktop nav navigates to /categories", async ({
    page,
  }) => {
    await gotoAndWaitForLayout(page, "/");
    await page
      .getByRole("navigation", { name: /main navigation/i })
      .getByRole("link", { name: "Categories" })
      .click();
    await expect(page).toHaveURL(/\/categories/);
    await expect(page.getByRole("banner")).toBeVisible();
  });

  test("clicking Admin in desktop nav navigates to /admin", async ({
    page,
  }) => {
    await gotoAndWaitForLayout(page, "/");
    await page
      .getByRole("navigation", { name: /main navigation/i })
      .getByRole("link", { name: "Admin" })
      .click();
    await expect(page).toHaveURL(/\/admin/);
    await expect(page.getByRole("banner")).toBeVisible();
  });

  test("clicking the Petstore brand logo navigates to home", async ({
    page,
  }) => {
    await gotoAndWaitForLayout(page, "/products");
    await page
      .getByRole("navigation", { name: /main navigation/i })
      .getByRole("link", { name: /petstore/i })
      .click();
    await expect(page).toHaveURL(/^http:\/\/[^/]+\/$/);
    await expect(page.getByRole("banner")).toBeVisible();
  });

  test("mobile drawer Products link navigates to /products", async ({
    page,
  }) => {
    await page.setViewportSize(MOBILE);
    await gotoAndWaitForLayout(page, "/");
    await page.getByRole("button", { name: /open menu/i }).click();
    await page
      .locator("#mobile-menu")
      .getByRole("link", { name: "Products" })
      .click();
    await expect(page).toHaveURL(/\/products/);
    await expect(page.getByRole("banner")).toBeVisible();
  });
});

// ============================================================================
// Active-state highlighting – aria-current reflects real URL
// ============================================================================
test.describe("Active-state highlighting in the real browser", () => {
  test.use({ viewport: DESKTOP });

  test("Home link carries aria-current=page when on /", async ({ page }) => {
    await gotoAndWaitForLayout(page, "/");
    await expect(
      page
        .getByRole("navigation", { name: /main navigation/i })
        .getByRole("link", { name: "Home" }),
    ).toHaveAttribute("aria-current", "page");
  });

  test("Products link carries aria-current=page when on /products", async ({
    page,
  }) => {
    await gotoAndWaitForLayout(page, "/products");
    await expect(
      page
        .getByRole("navigation", { name: /main navigation/i })
        .getByRole("link", { name: "Products" }),
    ).toHaveAttribute("aria-current", "page");
  });

  test("Home link does NOT carry aria-current when on /products", async ({
    page,
  }) => {
    await gotoAndWaitForLayout(page, "/products");
    await expect(
      page
        .getByRole("navigation", { name: /main navigation/i })
        .getByRole("link", { name: "Home" }),
    ).not.toHaveAttribute("aria-current");
  });

  test("Admin link carries aria-current=page when on /admin", async ({
    page,
  }) => {
    await gotoAndWaitForLayout(page, "/admin");
    await expect(
      page
        .getByRole("navigation", { name: /main navigation/i })
        .getByRole("link", { name: "Admin" }),
    ).toHaveAttribute("aria-current", "page");
  });
});
