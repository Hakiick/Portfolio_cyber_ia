import { test, expect } from "@playwright/test";

test.describe("Boot Sequence", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4321");
    await page.evaluate(() => sessionStorage.clear());
    await page.goto("http://localhost:4321");
    // Wait for React hydration before interacting
    await page.locator('[data-testid="boot-sequence"][data-hydrated="true"]').waitFor({ timeout: 5000 });
  });

  test("page has correct title", async ({ page }) => {
    await expect(page).toHaveTitle("Hakick — AI Security Engineer | Portfolio");
  });

  test("boot sequence displays and can be skipped", async ({ page }) => {
    const bootOverlay = page.locator('[data-testid="boot-sequence"]');
    await expect(bootOverlay).toBeVisible();
    await expect(bootOverlay).toContainText("HakickOS");

    const skipBtn = page.locator('[data-testid="boot-skip"]');
    await expect(skipBtn).toBeVisible();
    await skipBtn.click();

    await expect(bootOverlay).not.toBeVisible({ timeout: 5000 });
    await expect(page.locator("#hero h1")).toContainText("Hakick");
  });

  test("boot sequence is skipped on second visit", async ({ page }) => {
    await page.locator('[data-testid="boot-skip"]').click();
    await expect(page.locator('[data-testid="boot-sequence"]')).not.toBeVisible({ timeout: 5000 });

    await page.goto("http://localhost:4321");
    // On second visit, boot should not appear (sessionStorage)
    await expect(page.locator('[data-testid="boot-sequence"]')).not.toBeVisible({ timeout: 3000 });
  });

  test("hero section visible after boot", async ({ page }) => {
    await page.locator('[data-testid="boot-skip"]').click();
    await expect(page.locator('[data-testid="boot-sequence"]')).not.toBeVisible({ timeout: 5000 });
    await expect(page.locator("#hero h1")).toContainText("Hakick");
  });
});
