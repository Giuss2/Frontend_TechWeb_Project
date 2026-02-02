import { test, expect } from '@playwright/test';

test.describe('Login E2E', () => {

  test.beforeEach(async ({ page }) => {
    // Pulisce eventuali token salvati
    await page.addInitScript(() => localStorage.clear());
    await page.goto('/login');
    
  });

  test('login con credenziali corrette', async ({ page }) => {
    // Compila il form
    await page.fill('input[formControlName="email"]', 'mario@example.com');
    await page.fill('input[formControlName="password"]', '1234');

    // Clicca submit
    await page.click('button[type="submit"]');

    // Aspetta che la navbar mostri Profilo e Logout
    await expect(page.getByRole('button', { name: 'Profilo' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();

    // Controlla che Login/Sign-in non siano visibili
    await expect(page.getByRole('button', { name: 'Login' })).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Sign-in' })).toHaveCount(0);

    // Controlla che il token sia stato salvato in localStorage
    const token = await page.evaluate(() => localStorage.getItem('token'));
    expect(token).not.toBeNull();
  });

  test('login con credenziali errate mostra errore', async ({ page }) => {
    await page.fill('input[formControlName="email"]', 'wrong@example.com');
    await page.fill('input[formControlName="password"]', 'wrongpass');

    await page.click('button[type="submit"]');

    // Messaggio di errore visibile
    await expect(page.getByText(/Errore di login/i)).toBeVisible();

    // Token non salvato
    const token = await page.evaluate(() => localStorage.getItem('token'));
    expect(token).toBeNull();

    // Rimane su /login
    await expect(page).toHaveURL(/\/login/);

    await expect(page.getByRole('button', { name: 'Sign-in' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Profilo' })).toHaveCount(0);
  });

  test('login mostra messaggio se campi vuoti', async ({ page }) => {
    // Clicca submit senza compilare i campi
    await page.click('button[type="submit"]');

    // Messaggio di errore visibile
    await expect(page.getByText(/Errore di login/i)).toBeVisible();

    // Token non salvato
    const token = await page.evaluate(() => localStorage.getItem('token'));
    expect(token).toBeNull();

    // Navbar rimane in stato non loggato
    await expect(page.getByRole('button', { name: 'Sign-in' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Profilo' })).toHaveCount(0);

    // URL invariato
    await expect(page).toHaveURL(/\/login/);
  });

});
