import { test, expect } from '@playwright/test';

test.describe('Tech Stack Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should display all 4 tech stack categories', async ({ page }) => {
    const techSection = page.locator('#tech');
    await expect(techSection).toBeVisible();

    // Check all 4 category headings
    await expect(page.locator('h3:has-text("Languages")')).toBeVisible();
    await expect(page.locator('h3:has-text("Frameworks & Tools")')).toBeVisible();
    await expect(page.locator('h3:has-text("Infrastructures")')).toBeVisible();
    // Other category should not be visible (empty)
    await expect(page.locator('h3:has-text("Other")')).not.toBeVisible();
  });

  test('should display correct number of items per category', async ({ page }) => {
    // Languages: 6 items
    const languagesItems = page.locator('#tech').locator('text=Languages').locator('..').locator('..').locator('details').first().locator('.flex.flex-wrap.gap-3 > *');
    await expect(languagesItems).toHaveCount(6);

    // Frameworks & Tools: 15 items
    const frameworksItems = page.locator('#tech').locator('text=Frameworks & Tools').locator('..').locator('..').locator('details').nth(1).locator('.flex.flex-wrap.gap-3 > *');
    await expect(frameworksItems).toHaveCount(15);

    // Infrastructures: 6 items
    const infraItems = page.locator('#tech').locator('text=Infrastructures').locator('..').locator('..').locator('details').nth(2).locator('.flex.flex-wrap.gap-3 > *');
    await expect(infraItems).toHaveCount(6);
  });

  test('should have category icons', async ({ page }) => {
    const categoryIcons = page.locator('#tech').locator('details summary .rounded-full svg');
    await expect(categoryIcons).toHaveCount(3); // 3 non-empty categories
  });

  test('should be collapsible on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    await page.waitForLoadState('networkidle');

    // On mobile, details should be closed by default (except first)
    const details = page.locator('#tech details');
    const count = await details.count();

    // First category (Languages) should be open by default
    await expect(details.nth(0)).toHaveAttribute('open', '');

    // Other categories should be closed by default on mobile
    for (let i = 1; i < count; i++) {
      await expect(details.nth(i)).not.toHaveAttribute('open', '');
    }
  });

  test('should expand on desktop', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.reload();
    await page.waitForLoadState('networkidle');

    // On desktop, all details should be open (forced by CSS)
    const details = page.locator('#tech details');
    const count = await details.count();

    for (let i = 0; i < count; i++) {
      await expect(details.nth(i)).toHaveAttribute('open', '');
    }
  });
});

test.describe('Hero Social Links', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should display social links with labels', async ({ page }) => {
    const socialLinks = page.locator('section[aria-label="Social links"]');
    await expect(socialLinks).toBeVisible();

    // Should have multiple links
    const links = socialLinks.locator('[role="listitem"]');
    const count = await links.count();
    expect(count).toBeGreaterThan(5);
  });

  test('should have QQ and Email modal buttons', async ({ page }) => {
    await expect(page.locator('[data-qq-open]')).toBeVisible();
    await expect(page.locator('[data-email-open]')).toBeVisible();
  });
});

test.describe('Footer Social Links', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should display social links without labels', async ({ page }) => {
    const footer = page.locator('footer');
    const socialLinks = footer.locator('[role="list"]');
    await expect(socialLinks).toBeVisible();

    const links = socialLinks.locator('[role="listitem"]');
    const count = await links.count();
    expect(count).toBeGreaterThan(5);
  });
});

test.describe('Personal Projects', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should display 3 projects', async ({ page }) => {
    const projectsSection = page.locator('#personalProjects');
    await expect(projectsSection).toBeVisible();

    const projectCards = projectsSection.locator('article, .bg-white.dark\\:bg-slate-800');
    await expect(projectCards).toHaveCount(3);
  });

  test('should have correct project names', async ({ page }) => {
    await expect(page.locator('h3:has-text("utopia")')).toBeVisible();
    await expect(page.locator('h3:has-text("xiangke")')).toBeVisible();
    await expect(page.locator('h3:has-text("pr-agent-runner")')).toBeVisible();
  });

  test('should have language badges', async ({ page }) => {
    await expect(page.locator('text=Rust')).toHaveCount(2);
    await expect(page.locator('text=TypeScript')).toHaveCount(1);
  });
});

test.describe('i18n - Japanese', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/ja/');
    await page.waitForLoadState('networkidle');
  });

  test('should display Japanese category names', async ({ page }) => {
    await expect(page.locator('h3:has-text("言語")')).toBeVisible();
    await expect(page.locator('h3:has-text("フレームワーク・ツール")')).toBeVisible();
    await expect(page.locator('h3:has-text("インフラストラクチャ")')).toBeVisible();
  });
});

test.describe('i18n - Chinese', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/zh-cn/');
    await page.waitForLoadState('networkidle');
  });

  test('should display Chinese category names', async ({ page }) => {
    await expect(page.locator('h3:has-text("语言")')).toBeVisible();
    await expect(page.locator('h3:has-text("框架与工具")')).toBeVisible();
    await expect(page.locator('h3:has-text("基础设施")')).toBeVisible();
  });
});
