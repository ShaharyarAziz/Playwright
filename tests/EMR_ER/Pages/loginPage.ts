import { Page, Locator } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly unitButton: Locator;
  readonly MR_NUMBER_SEARCH: Locator;
  readonly Type_In_MRNO_Search: Locator;
  readonly MR_NUMBER_SEARCH_btn: Locator;
  readonly Select_Patient: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('input[placeholder="Enter User Name"]');
    this.passwordInput = page.locator('input[placeholder="Enter Password"]');
    this.loginButton = page.locator('button[type="submit"]');
    this.unitButton = page
      .locator("div")
      .filter({ hasText: /^Unit$/ })
      .first();

    this.MR_NUMBER_SEARCH = this.page
      .getByRole("columnheader", { name: "Patient Name search" })
      .getByRole("button");

    this.Type_In_MRNO_Search = page.getByPlaceholder("Search");

    this.MR_NUMBER_SEARCH_btn = page.locator('span:has-text("Search")')

    this.Select_Patient = page.getByRole('link', { name: 'Mr HAMMAD ARSHAD' })
  }

  async goto() {
    await this.page.goto("https://dever.shifa.com.pk/er");
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.page.waitForTimeout(3000); // replace with a smarter wait if needed
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async clickUnit() {
    await this.unitButton.click();
  }
  async ForMRNumberSearch() {
    await this.MR_NUMBER_SEARCH.click();
  }
  async TypeInMRNumberSearch(mrNumber: string) {
    await this.Type_In_MRNO_Search.fill(mrNumber);
  }
  async clickMRNumberSearchButton() {
    await this.MR_NUMBER_SEARCH_btn.click();
  }
  async selectPatient() {
    await this.Select_Patient.click();
  }
} 
