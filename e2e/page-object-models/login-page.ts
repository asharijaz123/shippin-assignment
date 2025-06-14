import { Page } from "@playwright/test";
import { BasePage } from "./base-page";
import { LOGIN_CREDENTIALS } from "../data/qa";

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private readonly loginEmailLocator = '[data-qa="login-email"]';

  private readonly loginPasswordLocator = '[data-qa="login-password"]';

  private readonly registerNameLocator = '[data-qa="signup-name"]';

  private readonly registerEmailLocator = '[data-qa="signup-email"]';

  private readonly loginButtonLocator = '[data-qa="login-button"]';

  private readonly registerButtonLocator = '[data-qa="signup-button"]';

  loginErrorText = "Your email or password is incorrect!";

  async gotoLoginPage() {
    await this._page.goto("/login");
    await this._page.waitForLoadState("networkidle");
  }

  async attemptCorrectLogin() {
    const loginEmail = this._page.locator(this.loginEmailLocator);
    await loginEmail.pressSequentially(LOGIN_CREDENTIALS.CORRECT_EMAIL);

    const loginPassword = this._page.locator(this.loginPasswordLocator);
    await loginPassword.pressSequentially(LOGIN_CREDENTIALS.CORRECT_PASSWORD);

    const loginButton = this._page.locator(this.loginButtonLocator);
    await loginButton.click();
    await this._page.waitForLoadState("domcontentloaded");
  }

  async attemptIncorrectEmailLogin() {
    const loginEmail = this._page.locator(this.loginEmailLocator);
    await loginEmail.pressSequentially(LOGIN_CREDENTIALS.INCORRECT_EMAIL);

    const loginPassword = this._page.locator(this.loginPasswordLocator);
    await loginPassword.pressSequentially(LOGIN_CREDENTIALS.CORRECT_PASSWORD);

    const loginButton = this._page.locator(this.loginButtonLocator);
    await loginButton.click();
    await this._page.waitForLoadState("networkidle");
  }

  async attemptIncorrectPasswordLogin() {
    const loginEmail = this._page.locator(this.loginEmailLocator);
    await loginEmail.pressSequentially(LOGIN_CREDENTIALS.CORRECT_EMAIL);

    const loginPassword = this._page.locator(this.loginPasswordLocator);
    await loginPassword.pressSequentially(LOGIN_CREDENTIALS.INCORRECT_PASSWORD);

    const loginButton = this._page.locator(this.loginButtonLocator);
    await loginButton.click();
    await this._page.waitForLoadState("networkidle");
  }
}
