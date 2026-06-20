import { test, expect } from '@playwright/test';

test('desktop nav links work and the hamburger is hidden', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === 'mobile', 'desktop-only layout');

  await page.goto('/');
  await expect(page.locator('.nav-toggle')).toBeHidden();

  await page.getByRole('link', { name: 'Download', exact: true }).click();
  await expect(page).toHaveURL(/\/download$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Download Outlook on the Desktop',
  );
});

test('mobile hamburger opens the menu and navigates', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'mobile-only layout');

  await page.goto('/');

  const toggle = page.locator('.nav-toggle');
  const nav = page.locator('#primary-nav');

  // Menu starts collapsed.
  await expect(toggle).toBeVisible();
  await expect(nav.getByRole('link', { name: 'FAQ' })).toBeHidden();

  // Opening reveals the links.
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  const faqLink = nav.getByRole('link', { name: 'FAQ' });
  await expect(faqLink).toBeVisible();

  // Tapping a link navigates and closes the menu.
  await faqLink.click();
  await expect(page).toHaveURL(/\/faq$/);
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
});
