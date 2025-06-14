import { Page } from "@playwright/test";
import { BasePage } from "./base-page";
import { PAYMENT_DETAILS } from "../data/qa";

export class PaymentPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  readonly paymentPageTitle = "Payment";

  readonly orderPlacedSuccssfullyText =
    "Your order has been placed successfully!";

  private readonly confirmOrderButtonText = "Pay and Confirm Order";

  private readonly cardNameLocator = '[data-qa="name-on-card"]';

  private readonly cardNumberLocator = '[data-qa="card-number"]';

  private readonly cvcLocator = '[data-qa="cvc"]';

  private readonly expiryMonthLocator = '[data-qa="expiry-month"]';

  private readonly expiryYearLocator = '[data-qa="expiry-year"]';

  async confirmOrder() {
    const confirmOrderButton = this._page.getByText(
      this.confirmOrderButtonText
    );
    await confirmOrderButton.click();
  }

  async fillPaymentDetails() {
    const cardNameInput = this._page.locator(this.cardNameLocator);
    await cardNameInput.pressSequentially(PAYMENT_DETAILS.NAME);

    const cardNumberInput = this._page.locator(this.cardNumberLocator);
    await cardNumberInput.pressSequentially(PAYMENT_DETAILS.CARD_NUMBER);

    const cvcInput = this._page.locator(this.cvcLocator);
    await cvcInput.pressSequentially(PAYMENT_DETAILS.CVC);

    const expiryMonthInput = this._page.locator(this.expiryMonthLocator);
    await expiryMonthInput.pressSequentially(PAYMENT_DETAILS.EXPIRATION_MONTH);

    const expiryYearInput = this._page.locator(this.expiryYearLocator);
    await expiryYearInput.pressSequentially(PAYMENT_DETAILS.EXPIRATION_YEAR);
  }
}
