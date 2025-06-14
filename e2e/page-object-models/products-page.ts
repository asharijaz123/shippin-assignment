import { Page } from "@playwright/test";
import { BasePage } from "./base-page";
import { SEARCH_TERM } from "../data/qa";

export class ProductsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  readonly withoutSearchTitle = "ALL PRODUCTS";

  readonly withSearchTitle = "SEARCHED PRODUCTS";

  private readonly searchPlaceholder = "Search Product";

  private readonly submitSearchButton = "#submit_search";

  private readonly viewProductText = "View Product";

  private readonly addToCartText = "Add to cart";

  readonly addedToCardText = "Your product has been added to cart.";

  private readonly continueShopping = "Continue Shopping";

  private readonly viewCartText = "View Cart";

  async gotoProductsPage() {
    // go using button from any page;
    await this._page.goto("/products");
    await this._page.waitForLoadState("networkidle");
  }

  async searchProduct() {
    const searchInput = this._page.getByPlaceholder(this.searchPlaceholder);
    await searchInput.pressSequentially(SEARCH_TERM);

    const searchButton = this._page.locator(this.submitSearchButton);
    await searchButton.click();
    await this._page.waitForLoadState("networkidle");
  }

  async viewFirstProduct() {
    const viewProductButton = this._page
      .getByText(this.viewProductText)
      .first();
    await viewProductButton.click();
  }

  async addToCardFirstProduct() {
    const addToCartButton = this._page.getByText(this.addToCartText).first();
    await addToCartButton.click();
  }

  async continueShoppingAfterAddingToCart() {
    const continueShoppingButton = this._page.getByText(this.continueShopping);
    await continueShoppingButton.click();
  }

  async viewCartFromAddedModal() {
    const viewCartButton = this._page.getByText(this.viewCartText);
    await viewCartButton.click();
    await this._page.waitForLoadState("networkidle");
  }
}
