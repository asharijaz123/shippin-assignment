import { Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class ProductDetailsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private readonly productDetailsLocator = ".product-details";

  private readonly addToCardButtonText = "Add to cart";

  private readonly viewCartLinkText = "View Cart";

  readonly addedToCartText = "Your product has been added to cart.";

  readonly cartModalLocator = "#cartModal";

  async addToCartFromProductDetails() {
    const productDetailsSection = this._page.locator(
      this.productDetailsLocator
    );
    const addToCardButton = productDetailsSection.getByText(
      this.addToCardButtonText
    );
    await addToCardButton.click();
  }

  async viewCartFromCartModal() {
    const cartModal = this._page.locator(this.cartModalLocator);
    const viewCartButton = cartModal.getByRole("link", {
      name: this.viewCartLinkText,
    });
    await viewCartButton.click();
  }
}
