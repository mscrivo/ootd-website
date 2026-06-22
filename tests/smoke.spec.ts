import { test, expect } from '@playwright/test';

test.describe('page smoke tests', () => {
  test('home page renders hero, features, and header', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/Outlook on the Desktop/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Outlook on the Desktop');

    // Logo loads in the header.
    await expect(page.locator('.brand img')).toBeVisible();

    // Features section with all six cards.
    await expect(page.getByRole('heading', { name: 'Features' })).toBeVisible();
    await expect(page.locator('.feature-grid').first().locator('.feature')).toHaveCount(6);

    // Primary call to action.
    await expect(page.getByRole('link', { name: /^Download/ }).first()).toBeVisible();
  });

  test('download page lists the installer and requirements', async ({ page }) => {
    await page.goto('/download');

    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'Download Outlook on the Desktop',
    );
    await expect(page.getByRole('link', { name: 'Download installer' })).toBeVisible();
    await expect(page.getByText('Outlook Classic', { exact: false })).toBeVisible();
  });

  test('screenshots page renders the gallery', async ({ page }) => {
    await page.goto('/screenshots');

    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Screenshots');
    await expect(page.locator('.screenshot')).toHaveCount(6);
  });

  test('faq page lists every question and links to GitHub issues', async ({ page }) => {
    await page.goto('/faq');

    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Frequently Asked Questions');
    await expect(page.locator('.faq-item')).toHaveCount(14);
    await expect(page.getByRole('link', { name: 'GitHub issue tracker' })).toHaveAttribute(
      'href',
      'https://github.com/mscrivo/OotD/issues',
    );
  });

  test('legacy release notes page renders the history', async ({ page }) => {
    await page.goto('/legacy-release-notes');

    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Legacy Release Notes');
    await expect(page.getByText('Older Releases', { exact: false })).toBeVisible();
  });
});
