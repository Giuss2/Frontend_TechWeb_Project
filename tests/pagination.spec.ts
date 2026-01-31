import { test, expect } from '@playwright/test';

test('Test paginazione commenti con mock', async ({ page }) => {

  // Intercetta la chiamata ai commenti e restituisce 50 commenti finti
  await page.route('**/cats/1/comments**', route => {
    const url = new URL(route.request().url());
    const pageNum = Number(url.searchParams.get('page')) || 1;
    const limit = Number(url.searchParams.get('limit')) || 5;

    const totalComments = 50;
    const allComments = Array.from({ length: totalComments }, (_, i) => ({
      id: i + 1,
      testo: `Commento ${i + 1}`,
      User: { id: i % 3 + 1, userName: `Utente${i % 3 + 1}` },
      dataInserimento: new Date().toISOString()
    }));

    const start = (pageNum - 1) * limit;
    const paginated = allComments.slice(start, start + limit);

    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        comments: paginated,
        pagination: {
          total: totalComments,
          page: pageNum,
          limit,
          totalPages: Math.ceil(totalComments / limit)
        }
      })
    });
  });

  // Naviga alla pagina del gatto
  await page.goto('http://localhost:4200/cat/1');

  // Controlla che siano caricati i primi commenti
  const firstComment = await page.locator('.commento-card').first().textContent();
  expect(firstComment).toContain('Commento 1');

  // Clicca su "Successivo" e verifica
  await page.click('button:has-text("Successivo")');
  const nextPageFirstComment = await page.locator('.commento-card').first().textContent();
  expect(nextPageFirstComment).toContain('Commento 6');

  // Clicca su "Precedente" e verifica che torni alla prima pagina
  await page.click('button:has-text("Precedente")');
  const prevPageFirstComment = await page.locator('.commento-card').first().textContent();
  expect(prevPageFirstComment).toContain('Commento 1');
});
