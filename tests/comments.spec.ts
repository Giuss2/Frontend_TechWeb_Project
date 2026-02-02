import { test, expect } from '@playwright/test';


test.describe.serial('Gestione Commenti ', () => {
  const commentoTest = 'Commento di test Playwright';

  test.beforeEach(async ({ page }) => {
    // Login prima di ogni test
    await page.goto('/login');
    await page.fill('input[formControlName="email"]', 'giusy@example.com');
    await page.fill('input[formControlName="password"]', '1234');
    await page.click('button[type="submit"]');

    // Aspetta che la navbar si aggiorni
    await expect(page.getByRole('button', { name: 'Profilo' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
  });

  test('Test paginazione commenti', async ({ page }) => {
  
  await page.goto('/cat/1');

  // sezione commenti visibile (scroll)
  const commentSection = page.locator('.commenti-section');
  await commentSection.scrollIntoViewIfNeeded();
  await expect(commentSection).toBeVisible();

  // Leggi il primo commento della pagina 1
  const firstComment = await page.locator('.commento-card').first().textContent();
  expect(firstComment).toBeTruthy();

  // Clicca su "Successivo" e verifica che il primo commento cambi
  const nextButton = page.locator('button:has-text("Successivo")');
  if (await nextButton.isEnabled()) {
    await nextButton.click();
    const nextPageFirstComment = await page.locator('.commento-card').first().textContent();
    expect(nextPageFirstComment).not.toBe(firstComment);
  }

  // Torna indietro
  const prevButton = page.locator('button:has-text("Precedente")');
  if (await prevButton.isEnabled()) {
    await prevButton.click();
    const prevPageFirstComment = await page.locator('.commento-card').first().textContent();
    expect(prevPageFirstComment).toBe(firstComment);
  }
});


  test('crea e visualizza commento', async ({ page }) => {
    
    await page.goto('/cat/1');

    // sezione commenti visibile
    const commentSection = page.locator('.commenti-section');
    await commentSection.scrollIntoViewIfNeeded();
    await expect(commentSection).toBeVisible();

    // Scrivi il commento
    await page.fill('textarea[placeholder="Scrivi un commento..."]', commentoTest);
    await page.click('button.btn-send');

    // Verifica che il commento appena creato appaia nella lista
    const newComment = page.locator(`.commento-card:has-text("${commentoTest}")`);
    await expect(newComment).toBeVisible();

    // Verifica che l'autore sia "Tu"
    await expect(newComment.locator('.comment-username')).toHaveText('Tu');

    // Verifica che il pulsante elimina sia presente solo per il tuo commento
    await expect(newComment.locator('button.btn-delete')).toBeVisible();
  });

   test('non mostra pulsante elimina per commenti di altri utenti', async ({ page }) => {
    await page.goto('/cat/3');

    const commentSection = page.locator('.commenti-section');
    await commentSection.scrollIntoViewIfNeeded();
    await expect(commentSection).toBeVisible();

    const otherComment = page.locator(`.commento-card:has-text("Utente2")`);
    if (await otherComment.count() > 0) {
      await otherComment.scrollIntoViewIfNeeded();
      await expect(otherComment.locator('button.btn-delete')).toHaveCount(0);
    }
  });

  test('elimina commento appena creato', async ({ page }) => {
    
    await page.goto('/cat/1');

    const commentSection = page.locator('.commenti-section');
    await commentSection.scrollIntoViewIfNeeded();
    await expect(commentSection).toBeVisible();


    const newComment = page.locator(`.commento-card:has-text("${commentoTest}")`);
    await expect(newComment).toBeVisible();

    // Intercetta il dialog di conferma
    page.once('dialog', dialog => dialog.accept());

    await newComment.locator('button.btn-delete').click();

    // Attendi che il commento scompaia
    await expect(page.locator(`.commento-card:has-text("${commentoTest}")`)).toHaveCount(0);
  });
});
