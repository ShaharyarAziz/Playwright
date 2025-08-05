import { test, expect } from "@playwright/test";
import { Patient_SelectionPage } from "../Pages/patient_selection";
import { loginToShifa } from "../../../../utils/loginHelper";
import { Allergies_Page } from "../Pages/AllergiesPage"
import { VitalsPage } from "../Pages/VitalsPage";
import * as dotenv from "dotenv";
dotenv.config();

test.describe("Login Test with POM", () => {
    test("User can log in, click Unit, and select patient", async ({ page }) => {
        const Patient = new Patient_SelectionPage(page)
        const allergy = new Allergies_Page(page)
        const vitals = new VitalsPage(page);
        // const mrNumber = process.env.ER_PATIENT_MR_NUMBER;
        const patientName = process.env.ER_PATIENT_NAME;
        const savedUsername = process.env.Save_username;
        const savedPassword = process.env.Save_password;

        // Guard clauses to prevent undefined values
        if (!patientName || !savedUsername || !savedPassword) {
            throw new Error("Username or Password is missing in .env file.");
        }


        await Patient.goto();
        await loginToShifa(page);
        await Patient.clickUnit();
        await page.waitForTimeout(5000); // optional: replace with waitForSelector if needed
        await Patient.searchPatientByMRNumber(patientName);
        await Patient.selectPatient();
        await allergy.navigateToAllergiesPage();
        await allergy.selectAllergy();
        await allergy.enterAllergyDescription();
        await allergy.selectSeverityLevel("Moderate");
        await allergy.saveAllergy();
        await vitals.login(savedUsername, savedPassword);


        await page.pause(); // for debugging
    });
});
