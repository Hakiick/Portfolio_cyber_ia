import { test, expect } from "@playwright/test";

test.describe("Home Page — Layout & Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4321");
  });

  test("page has correct title", async ({ page }) => {
    await expect(page).toHaveTitle("Hakick — AI Security Engineer");
  });

  test("navigation header is visible", async ({ page }) => {
    const nav = page.locator('[data-testid="nav-header"]');
    await expect(nav).toBeVisible();
  });

  test("all sections exist on the page", async ({ page }) => {
    const sectionIds = [
      "hero",
      "about",
      "skills",
      "projects",
      "certifications",
      "timeline",
      "terminal",
      "contact",
    ];

    for (const id of sectionIds) {
      const section = page.locator(`#${id}`);
      await expect(section).toBeAttached();
    }
  });

  test("desktop nav links are visible", async ({ page }) => {
    const navLinks = [
      "About",
      "Skills",
      "Projects",
      "Certifs",
      "Timeline",
      "Terminal",
      "Contact",
    ];

    for (const label of navLinks) {
      const link = page.locator(`[data-testid="nav-link-${label}"]`);
      await expect(link).toBeVisible();
    }
  });

  test("clicking nav link triggers scroll to section", async ({ page }) => {
    // Wait for hydration
    await page.waitForLoadState("networkidle");

    const aboutLink = page.locator('[data-testid="nav-link-About"]');
    await aboutLink.click();

    // Give smooth scroll time, then check position
    await page.waitForTimeout(2000);

    // Verify the about section is near the top of the viewport
    const aboutRect = await page.locator("#about").boundingBox();
    expect(aboutRect).not.toBeNull();
    // Section should have scrolled into or near the viewport
    // (its top should be less than viewport height)
    if (aboutRect) {
      expect(aboutRect.y).toBeLessThan(800);
    }
  });

  test("mobile menu opens and closes", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("http://localhost:4321");
    await page.waitForLoadState("networkidle");

    const menuToggle = page.locator('[data-testid="mobile-menu-toggle"]');
    await expect(menuToggle).toBeVisible();

    await menuToggle.click();
    await page.waitForTimeout(300);

    const overlay = page.locator('[data-testid="mobile-menu-overlay"]');
    await expect(overlay).toBeVisible();

    const mobileLink = page.locator('[data-testid="mobile-nav-link-About"]');
    await expect(mobileLink).toBeVisible();

    await menuToggle.click();
    await page.waitForTimeout(300);
    await expect(overlay).not.toBeVisible();
  });

  test("mobile nav link navigates and closes menu", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("http://localhost:4321");
    await page.waitForLoadState("networkidle");

    const menuToggle = page.locator('[data-testid="mobile-menu-toggle"]');
    await expect(menuToggle).toBeVisible();
    await menuToggle.click();
    await page.waitForTimeout(300);

    const overlay = page.locator('[data-testid="mobile-menu-overlay"]');
    await expect(overlay).toBeVisible();

    const mobileLink = page.locator('[data-testid="mobile-nav-link-Contact"]');
    await expect(mobileLink).toBeVisible();
    await mobileLink.click();

    // Overlay should close after clicking a link
    await page.waitForTimeout(300);
    await expect(overlay).not.toBeVisible();
  });
});
