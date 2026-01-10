import { test, expect } from '@playwright/test';

test('navbar mostra Login/Sign in se non loggato', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
  });

  await page.goto('/');

  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sign-in' })).toBeVisible();

  await expect(page.getByRole('button', { name: 'Logout' })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Profilo' })).toHaveCount(0);
});

test('navbar mostra Profilo e Logout se loggato', async ({ page }) => {
  await page.addInitScript(() => {
    const payload = {
      id: 1,
      userName: 'test',
      exp: Math.floor(Date.now() / 1000) + 3600 // valido 1h
    };

    const base64 = (obj: object) =>
      btoa(JSON.stringify(obj))
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');

    const token = `${base64({ alg: 'HS256', typ: 'JWT' })}.${base64(payload)}.fake`;

    localStorage.setItem('token', token);
  });

  await page.goto('/');

  await expect(page.getByRole('button', { name: 'Profilo' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();

  await expect(page.getByRole('button', { name: 'Login' })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Sign-in' })).toHaveCount(0);
});
