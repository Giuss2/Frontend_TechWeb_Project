import { test, expect } from '@playwright/test';


test.describe('Welcome message daily behavior', () => {

  test.beforeEach(async ({ page }) => {
    // Pulisce localStorage prima di ogni test
    await page.addInitScript(() => {
      localStorage.clear();
    });
  });

  test('mostra welcome al primo accesso del giorno se non loggato', async ({ page }) => {
  await page.addInitScript(() => {
    const fakeToday = new Date(2027, 0, 15).valueOf();
    Date.now = () => fakeToday;
    localStorage.clear();
  });

  await page.goto('/');

  await expect(page.getByText('Benvenuto su STREETCATS')).toBeVisible();
});


test('mostra di nuovo welcome il giorno successivo se non loggato', async ({ page }) => {
  await page.addInitScript(() => {
    const day1 = new Date(2026, 0, 15).valueOf();
    Date.now = () => day1;
    localStorage.clear();
  });

  await page.goto('/');
  await page.getByText('OK').click();

  await page.addInitScript(() => {
    const day2 = new Date(2026, 0, 16).valueOf();
    Date.now = () => day2;
  });

  await page.goto('/');

  await expect(page.getByText('Benvenuto su STREETCATS')).toBeVisible();
});

function createFakeJwt(payload: object) {
  const base64 = (obj: object) =>
    btoa(JSON.stringify(obj))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');

  return `${base64({ alg: 'HS256', typ: 'JWT' })}.${base64(payload)}.fake-signature`;
}

test('non mostra welcome se loggato', async ({ page }) => {
  await page.addInitScript(() => {
    const fakeNow = new Date(2026, 0, 15).valueOf();
    Date.now = () => fakeNow;

    localStorage.clear();

    const payload = {
      id: 1,
      userName: 'test',
      exp: Math.floor(fakeNow / 1000) + 60 * 60 // +1 ora
    };

    const base64 = (obj: Record<string, unknown>) =>
      btoa(JSON.stringify(obj))
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');

    const token = `${base64({ alg: 'HS256', typ: 'JWT' })}.${base64(payload)}.fake`;

    localStorage.setItem('token', token);
  });

  await page.goto('/');

  await expect(page.getByText('Benvenuto su STREETCATS')).toHaveCount(0);
});

});

//COME LANCIARE UN TEST:
// npx playwright test
//npx playwright test --ui se vuoi la UI

//PER LANCIARE UN TEST SPECIFICO:
//npx playwright test tests/welcomeMessage.spec.ts