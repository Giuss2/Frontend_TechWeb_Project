import { test, expect } from '@playwright/test';

test.describe('Welcome message behavior', () => {

  // Pulisce localStorage prima di ogni test 
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => localStorage.clear());
  });

  test('mostra welcome al primo accesso del giorno se non loggato', async ({ page }) => {
    
    await page.goto('/');

    await expect(page.getByText('Benvenuto su STREETCATS')).toBeVisible();

    await page.getByText('OK').click();
  });

  test('mostra di nuovo welcome il giorno successivo se non loggato', async ({ page }) => {
  // Primo giorno
  const day1 = new Date(2027, 0, 15).valueOf();

  await page.addInitScript(day => {
    (window as any)._originalDateNow = Date.now;
    Date.now = () => day;
    localStorage.clear();
  }, day1);

  // Naviga alla homepage per primo giorno
  await page.goto('/');
  await expect(page.getByText('Benvenuto su STREETCATS')).toBeVisible();
  await page.getByText('OK').click();

  // Secondo giorno
  const day2 = new Date(2027, 0, 16).valueOf();

  await page.addInitScript(day => {
    Date.now = () => day;
  }, day2);

  // Naviga di nuovo alla homepage
  await page.goto('/');
  await expect(page.getByText('Benvenuto su STREETCATS')).toBeVisible();

  // Ripristina Date.now originale
  await page.addInitScript(() => {
    if ((window as any)._originalDateNow) {
      Date.now = (window as any)._originalDateNow;
      delete (window as any)._originalDateNow;
    }
  });
});

  test('non mostra welcome se loggato', async ({ page }) => {
    // Login
    await page.goto('/login');
    await page.fill('input[formControlName="email"]', 'giusy@example.com');
    await page.fill('input[formControlName="password"]', '1234');
    await page.click('button[type="submit"]');

    // Aspetta che la navbar si aggiorni
    await expect(page.getByRole('button', { name: 'Profilo' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();

    await page.waitForURL('/');

    await expect(page.getByText('Benvenuto su STREETCATS')).toHaveCount(0);
  });

});
