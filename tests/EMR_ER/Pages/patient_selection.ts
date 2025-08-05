// Pages/loginPage.ts
import { Page, Locator } from "@playwright/test";

export class Patient_SelectionPage {
  private unitButton: Locator;
  private mrNumberSearchColumnButton: Locator;
  private mrNumberInput: Locator;
  private searchButton: Locator;
  private patientLink: Locator;

  constructor(private page: Page) {

    this.unitButton = page.locator('div').filter({ hasText: /^Unit$/ }).first();
    this.mrNumberSearchColumnButton = page
      .getByRole("columnheader", { name: "Patient Name search" })
      .getByRole("button");
    this.mrNumberInput = page.locator("div.ant-table-filter-dropdown input");
    this.searchButton = page.locator('span:has-text("Search")');
    this.patientLink = page.getByRole("link", { name: "Mr AMMAD ANWAR" });
  }

  async goto() {
    await this.page.goto("https://devemrer.shifa.com.pk/");
  }

  async clickUnit() {
    await this.unitButton.click();
  }

  async searchPatientByMRNumber(mrNumber: string) {
    await this.mrNumberSearchColumnButton.click();
    await this.mrNumberInput.fill(mrNumber);
    await this.searchButton.click();
  }

  async selectPatient() {
    await this.patientLink.click();
  }
}
