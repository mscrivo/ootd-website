import { expect, test } from '@playwright/test';

test.describe('screenshot lightbox', () => {
  test('opens a screenshot in place and closes with Escape, the close button, or a click', async ({
    page,
  }) => {
    await page.goto('/screenshots');
    const lightbox = page.getByRole('dialog', { name: 'Screenshot' });
    const firstShot = page.locator('.screenshot-link').first();

    await firstShot.click();
    await expect(lightbox).toBeVisible();
    await expect(page).toHaveURL(/\/screenshots$/);
    await expect(lightbox.locator('.lightbox-caption')).toHaveText('Dark mode');
    await page.keyboard.press('Escape');
    await expect(lightbox).toBeHidden();

    await firstShot.click();
    await lightbox.getByRole('button', { name: 'Close' }).click();
    await expect(lightbox).toBeHidden();

    await firstShot.click();
    await lightbox.locator('.lightbox-image').click();
    await expect(lightbox).toBeHidden();
  });
});
