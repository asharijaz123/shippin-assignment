import { Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private readonly NAVLINKS = {
    HOME_PAGE: "Home",
    PRODUCTS_PAGE: "Products",
    CART_PAGE: "Cart",
    LOGIN_PAGE: "Signup / Login",
  } as const;

  async goToPage(page: keyof typeof this.NAVLINKS) {
    const navButton = this._page.getByRole("link", {
      name: this.NAVLINKS[page],
    });
    await navButton.click();
  }
}
