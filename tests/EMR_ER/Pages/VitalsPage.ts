import { Page, Locator,expect } from "@playwright/test";

export class VitalsPage {
    private Temperature: Locator;
    private Pulse: Locator;
    private RespiratoryRate: Locator;
    private BPS: Locator;
    private BPD: Locator;
    private RR: Locator;
    private SPO2: Locator;
    private BSR: Locator;
    private Weight: Locator;
    private Height: Locator
    private painScale: Locator;
    private Unconscious_patient: Locator;
    private Facial_expressions: Locator;
    private Body_Movements: Locator;
    private Compliance_with_the_ventilator: Locator;
    private Vocalization: Locator;
    private Muscle_tension: Locator;
    private pain_sacle_submit_btn: Locator;
    private Conscious_Level: Locator;
    private Conscious_Level_dropdown: Locator;
    private Supply_Oxygen: Locator;
    private Save_Vitals_btn: Locator;
    private username: Locator;
    private password: Locator;
    private submitButton_Auth: Locator;

    constructor(private page: Page) {
        //Vitals fields
        this.Temperature = page.locator('[id="5"]');
        this.Pulse = page.locator('[id="7"]');
        this.BPS = page.locator('[id="1"]');
        this.BPD = page.locator('[id="2"]');
        this.RR = page.locator('[id="6"]');
        this.SPO2 = page.locator('[id="9"]');
        this.BSR = page.locator('[id="24"]');
        this.Weight = page.locator('[id="3"]');
        this.Height = page.locator('[id="4"]');
        this.painScale = page.getByRole('img', { name: 'plus' }).locator('svg');
        this.Unconscious_patient = page.locator('label').filter({ hasText: 'Unconscious patient' }).locator('span').nth(1)
        this.Facial_expressions = page.locator('label').filter({ hasText: 'Relaxed, neural' }).locator('span').nth(1)
        this.Body_Movements = page.locator('label').filter({ hasText: 'Resetlessness/ Agitation' }).locator('span').nth(1);
        this.Compliance_with_the_ventilator = page.locator('label').filter({ hasText: 'Fighting ventilator' }).locator('span').nth(1)
        // this.Vocalization = page.locator('label').filter({ hasText: 'Talking in normal tone or no' }).locator('span').nth(1);
        this.Muscle_tension = page.locator('label').filter({ hasText: 'Tense, rigid' }).locator('span').nth(1);
        this.pain_sacle_submit_btn = page.getByRole('button', { name: 'Submit' });
        this.Conscious_Level = page.locator('.ant-select-selector');
        this.Conscious_Level_dropdown = page.locator('div.ant-select-item-option-active div')
        this.Supply_Oxygen = page.locator('label').filter({ hasText: 'No' }).locator('span').nth(1);
        this.Save_Vitals_btn = page.getByRole('button', { name: 'Save' });
        // Login fields
        this.username = page.getByRole('textbox', { name: 'Username*' });
        this.password = page.getByRole('textbox', { name: 'Password*' });
        this.submitButton_Auth = page.getByRole('button', { name: 'Submit' });

    }

    async goto() {
        await this.page.goto("https://devemrer.shifa.com.pk/");
    }

    async enterVitals(temperature: string, pulse: string, bps: string, bpd: string, rr: string, spo2: string, bsr: string, weight: string, height: string) {
        await this.Temperature.fill(temperature);
        await this.Pulse.fill(pulse);
        await this.BPS.fill(bps);
        await this.BPD.fill(bpd);
        await this.RR.fill(rr);
        await this.SPO2.fill(spo2);
        await this.BSR.fill(bsr);
        await this.Weight.fill(weight);
        await this.Height.fill(height);
    }
    async selectPainScale() {
        await this.painScale.click();
        // await this.page.waitForTimeout(5000); // wait for the pain scale modal to appear
        await this.Unconscious_patient.click({ force: true });
        await this.Facial_expressions.click({ force: true });
        await this.Body_Movements.click({ force: true });
        await this.Compliance_with_the_ventilator.click({ force: true });
        // await this.Vocalization.click({force : true});
        await this.Muscle_tension.click({ force: true });
        await this.pain_sacle_submit_btn.click({ force: true });
    }
    async selectConsciousLevel(level: string) {
        await this.Conscious_Level.click(); 
        await this.Conscious_Level_dropdown.filter({ hasText: "A" }).click();
    }
    async selectSupplyOxygen() {   
        await this.Supply_Oxygen.click({ force: true });
    }
    async saveVitals() {
        await this.Save_Vitals_btn.click();
    }
    async login(username: string, password: string) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.submitButton_Auth.click();
    }

}
