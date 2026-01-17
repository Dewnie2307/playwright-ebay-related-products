import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';

test.describe('Related Products – Best Sellers', () => {

  test('TC01: Related products section should be visible', async ({ page }) => {
    const productPage = new ProductPage(page);

    await page.goto('/');
    await productPage.searchProduct('wallet');
    await productPage.openFirstProduct();

    await expect(productPage.relatedProducts.first()).toBeVisible();
  });

  test('TC02: Should display maximum of 6 related products', async ({ page }) => {
    const productPage = new ProductPage(page);

    await page.goto('/');
    await productPage.searchProduct('wallet');
    await productPage.openFirstProduct();

    const count = await productPage.getRelatedProductsCount();
    expect(count).toBeLessThanOrEqual(6);
  });

  test('TC03: Related products should not be empty when available', async ({ page }) => {
    const productPage = new ProductPage(page);

    await page.goto('/');
    await productPage.searchProduct('wallet');
    await productPage.openFirstProduct();

    const count = await productPage.getRelatedProductsCount();
    expect(count).toBeGreaterThan(0);
  });

  test('TC04: Page should not crash if no related products exist', async ({ page }) => {
    const productPage = new ProductPage(page);

    await page.goto('/');
    await productPage.searchProduct('wallet');
    await productPage.openFirstProduct();

    await expect(page).toHaveURL(/itm/);
  });

});
