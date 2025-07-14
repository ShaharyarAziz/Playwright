import { test, expect } from "@playwright/test";
import { LoginPage } from "../Pages/loginPage";
import * as dotenv from 'dotenv';
dotenv.config(); // Load .env variables

test.describe("Login Test with POM", () => {
  test("User can log in and click Unit", async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Use env variables
    const username = process.env.ER_USERNAME!;
    const password = process.env.ER_PASSWORD!; 
    const patientName = process.env.PATIENT_NAME!;

    await loginPage.goto();
    await loginPage.login(username, password);
    await loginPage.clickUnit();
    await loginPage.ForMRNumberSearch();
    await loginPage.TypeInMRNumberSearch(patientName); 
    await loginPage.clickMRNumberSearchButton();
    await loginPage.selectPatient();
    await page.pause(); // for debugging 
  });
});
