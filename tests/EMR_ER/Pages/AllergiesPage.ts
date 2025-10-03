// Pages/loginPage.ts
import { Page, Locator } from "@playwright/test";

export class Allergies_Page {
    private unitButton: Locator;
    private mrNumberSearchColumnButton: Locator;
    private mrNumberInput: Locator;
    private searchButton: Locator;
    private patientLink: Locator;
    private Allergies_Page: Locator | undefined;
    private severity_level: Locator | undefined;

    constructor(private page: Page) {

        this.unitButton = page.locator('div').filter({ hasText: /^Unit$/ }).first();
        this.mrNumberSearchColumnButton = page
            .getByRole("columnheader", { name: "Patient Name search" })
            .getByRole("button");
        this.mrNumberInput = page.locator("div.ant-table-filter-dropdown input");
        this.searchButton = page.locator('span:has-text("Search")');
        this.patientLink = page.getByRole("link", { name: "Mrs BIBI ZUHRA" });
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
    async navigateToAllergiesPage() {
        this.Allergies_Page = this.page.getByRole("link", { name: "Allergies" });
        await this.Allergies_Page.click();
    }
    async BrandAllergy() {
        await this.page.locator('input[value="Brand"]').click()
    }
    async GenericAllergy() {
        await this.page.locator('input[value="Generic"]').click()
    }
    async BrandAllergyDescription() {
        this.page.getByRole('combobox', { name: 'Allergy Description*' }).click();
        await this.page.locator('div.ant-select-item-option-active div').click();
    }
    async GenericAllergyDescription() {
          this.page.getByRole('combobox', { name: 'Allergy Description*' }).click();
        await this.page.locator('div[title="BUDESONIDE+FORMETEROL-FUMARATE"] div').click();
    }
    async selectSeverityLevel(severity: string) {
        this.severity_level = this.page.getByRole('combobox', { name: 'Severity Level*' })
        await this.severity_level.click();
        await this.page.locator('div[title="Moderate"] div').click();
    }
    async saveAllergy() {
        const saveButton = this.page.getByRole('button', { name: 'Save' })
        await saveButton.click();
    }
}
