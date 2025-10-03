import { Page, Locator, expect } from "@playwright/test";
import { time } from "console";

export class Transferout_Page {
    private dispositionPageLink: Locator;
    private dispositionPage: Locator;
    private transferOutForm: Locator;
    private transferDueDropdown: Locator;
    private transferReasonOption: Locator;
    private hospitalInput: Locator;
    private contactPersonName: Locator;
    private contactPersonContact: Locator;
    private caseDiscussedBy: Locator;
    private doctorAccompanying: Locator;
    private FamilyMemberaccompanying: Locator;
    private PatienthaslegibleIDband: Locator;
    private PatientFamilyinformedRiskBenefitsfortransferandareinagreement: Locator;
    private Receivinghospitalinformedandinagreement: Locator;
    private DiagnosisonTransfer_dropdown: Locator
    private DiagnosisonTransfer_option: Locator
    constructor(private page: Page) {
        this.dispositionPageLink = page.getByText('Doctor Responsibilities');
        this.dispositionPage = page.getByRole('link', { name: 'Disposition Notes' });
        this.transferOutForm = page.getByRole('radio', { name: 'Transfer Out' });
        this.transferDueDropdown = page.locator('.ant-select-selector').first()
        this.transferReasonOption = page.getByText('NON-AVAILABILITY OF BED IN GENERAL FLOOR');
        this.hospitalInput = page.getByRole('textbox', { name: 'Enter Hospital Name' });
        this.contactPersonName = page.locator('#transferForm_receiving_hospital_contact_person');
        this.contactPersonContact = page.getByRole('textbox', { name: 'Contact Number' });
        this.caseDiscussedBy = page.locator('#transferForm_case_discussed_by');
        this.doctorAccompanying = page.locator('#transferForm_doctor_accompanying');
        this.FamilyMemberaccompanying = page.locator('#transferForm_family_member_accompanying')
        this.PatienthaslegibleIDband = page.getByRole('checkbox', { name: 'Patient has legible ID band*' })
        this.PatientFamilyinformedRiskBenefitsfortransferandareinagreement = page.getByRole('checkbox', { name: 'Patient / Family informed' })
        this.Receivinghospitalinformedandinagreement = page.getByRole('checkbox', { name: 'Receiving hospital informed' })
        this.DiagnosisonTransfer_dropdown = page.locator('#transferForm_diagnosis_on_transfer')
        this.DiagnosisonTransfer_option = page.getByText('Cholera, unspecified (A009)')

    }

    async goto() {
        await this.page.goto("https://devemrer.shifa.com.pk/");
    }

    async navigateToTransferOut() {
        await this.dispositionPageLink.click();
        await expect(this.dispositionPage).toBeVisible();
        await this.dispositionPage.click();
        await this.transferOutForm.click();
        await expect(this.transferOutForm).toBeChecked();
    }

    async selectTransferReason() {
        await this.transferDueDropdown.waitFor({ state: 'visible' });
        await this.transferDueDropdown.click();
        await this.transferReasonOption.waitFor({ state: 'visible' });
        await this.transferReasonOption.click();
    }

    async fillTransferForm(hospital: string, contactName: string, contactNumber: string, caseId: string, doctorId: string, familyMemberId: string) {
        await this.hospitalInput.fill(hospital);
        await this.contactPersonName.fill(contactName);
        await this.contactPersonContact.fill(contactNumber);
        await this.caseDiscussedBy.fill(caseId);
        await this.doctorAccompanying.fill(doctorId);
        await this.FamilyMemberaccompanying.fill(familyMemberId);
        await this.PatienthaslegibleIDband.check();
        await this.PatientFamilyinformedRiskBenefitsfortransferandareinagreement.check();
        await this.Receivinghospitalinformedandinagreement.check();
    }
    async diagnosisonTransfer() {
        await this.DiagnosisonTransfer_dropdown.click();
        // await this.DiagnosisonTransfer_option.click();
    }
}
