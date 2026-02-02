import { test, expect } from '@playwright/test';

test.describe.serial('Gestione Avvistamenti utente (E2E reale con Giusy)', () => {
  const createdTitle = 'Test Gatto Profilo';

test.beforeEach(async ({ page }) => {
    await page.goto('/login');

    await page.fill('input[formControlName="email"]', 'giusy@example.com');
    await page.fill('input[formControlName="password"]', '1234');
    await page.click('button[type="submit"]');

    
    // Aspetta che il login abbia effetto (navbar aggiornata)
    await expect(page.getByRole('button', { name: 'Profilo' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();

    await page.goto('/profile');

 });

  test('login e crea un nuovo avvistamento', async ({ page }) => {
    

    await page.click('button:has-text("+ Aggiungi nuovo avvistamento")');

    // Riempi il form
    await page.fill('input[placeholder="Titolo della pagina del gatto"]', createdTitle);
    await page.fill('textarea[placeholder^="Descrizione"]', 'Questo è un gatto creato dal test.');

    // Attendi che la mappa sia pronta
    const map = page.locator('.leaflet-container');
    await expect(map).toBeVisible();
    await map.scrollIntoViewIfNeeded();
    await map.click({ position: { x: 200, y: 200 } });

    
    await page.click('button:has-text("Crea Avvistamento")');

    // Torna al profilo per controllare la card appena creata
    await page.goto('/profile');

    const spottingCard = page.locator(`.spotting-card:has-text("${createdTitle}")`);
    await expect(spottingCard).toBeVisible();
  });

  test('elimina l\'avvistamento appena creato', async ({ page }) => {

    const spottingCard = page.locator(`.spotting-card:has-text("${createdTitle}")`);
    await expect(spottingCard).toBeVisible();

    // Accetta il dialog prima del click
    page.once('dialog', dialog => dialog.accept());

    await spottingCard.locator('button.btn-delete').click();

    // Attendi che la card venga rimossa dal DOM
    await page.locator(`.spotting-card:has-text("${createdTitle}")`).waitFor({ state: 'detached', timeout: 10000 });
  });
});
