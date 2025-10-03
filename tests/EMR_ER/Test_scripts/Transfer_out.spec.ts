import { test, expect } from "@playwright/test";
import { Patient_SelectionPage } from "../Pages/patient_selection";
import { loginToShifa } from "../../../../utils/loginHelper";
import * as dotenv from "dotenv";
import { Transferout_Page } from "../Pages/Disposition Notes/Transfer_out";
dotenv.config();

test.describe("Transfer Out Page", () => {
    test("Form Save", async ({ page }) => {
        const Patient = new Patient_SelectionPage(page);
        const Transfer_out = new Transferout_Page(page);

        const mrNumber = process.env.ER_PATIENT_MR_NUMBER;
        const patientName = process.env.ER_PATIENT_NAME;
        const savedUsername = process.env.Save_username;
        const savedPassword = process.env.Save_password;

        // Guard clauses for required test data
        if (!mrNumber) throw new Error("MR Number is missing in .env file.");
        if (!patientName || !savedUsername || !savedPassword) {
            throw new Error("Username or Password is missing in .env file.");
        }

        // Navigate and login
        await Patient.goto();
        await loginToShifa(page);

        // Patient selection
        await Patient.searchPatientByMRNumber(patientName);
        await Patient.selectPatient();

        // Navigate to Transfer Out form
        await Transfer_out.navigateToTransferOut();

        // Fill form with test data
        await Transfer_out.selectTransferReason();
        await Transfer_out.fillTransferForm(
            "Shifa International Hospital", // hospital
            "Sarfraz Ahmed",               // contact person
            "03001234567",                 // contact number
            "29920",                       // case discussed by EMP ID
            "25281",                        // doctor accompanying ID
            "Testing"
        );
        await Transfer_out.diagnosisonTransfer();
        await page.pause(); // for debugging
    });
});
