// tests/login.spec.ts
import { test, expect } from "@playwright/test";
import { Patient_SelectionPage } from "../Pages/patient_selection";
import { loginToShifa } from "../../../../utils/loginHelper";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config();

test.describe("Login Test with POM", () => {
  test("User can log in, click Unit, and select patient", async ({ page }) => {
    const Patient = new Patient_SelectionPage(page)
    // const mrNumber = process.env.ER_PATIENT_MR_NUMBER;
    const patientName = process.env.ER_PATIENT_NAME;

    // Guard clauses to prevent undefined values
    if (!patientName) {
      throw new Error("Environment variables are missing. Please check your .env file.");
    }

    await Patient.goto();
    await loginToShifa(page);
    // await Patient.clickUnit();
    await page.waitForTimeout(5000); // optional: replace with waitForSelector if needed
    await Patient.searchPatientByMRNumber(patientName);
    await Patient.selectPatient();
    // await page.pause(); // for debugging
    // await page.waitForTimeout(5000);



  });

});
