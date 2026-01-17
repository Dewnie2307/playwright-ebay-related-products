import { Page, Locator } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly searchBox: Locator;
  readonly searchButton: Locator;
  readonly firstProduct: Locator;
  readonly relatedProducts: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchBox = page.locator('#gh-ac');
    this.searchButton = page.locator('#gh-btn');
    this.firstProduct = page.locator('.s-item__link').first();
    this.relatedProducts = page.locator('[data-testid="related-products"] li');
  }

  async searchProduct(product: string) {
    await this.searchBox.fill(product);
    await this.searchButton.click();
  }

  async openFirstProduct() {
    await this.firstProduct.click();
  }

  async getRelatedProductsCount(): Promise<number> {
    return await this.relatedProducts.count();
  }
}
