import { Locator } from '@playwright/test';
import BasePage from './BasePage'

class HomePage extends BasePage {
    public static URL = `${process.env.ENV}`;

    private readonly contactUsButton: Locator;
    private readonly acceptCookiesPopup: Locator;
    private readonly acceptCookiesPopupCloseButton: Locator;

    constructor(page) {
        super(page);

        this.contactUsButton = page.locator('#contact-us-btn-header');
        this.acceptCookiesPopup = page.locator('//a[@href="/cookie-policy/"]/ancestor::div[contains(@class, "CookiesPopup_container")]');
        this.acceptCookiesPopupCloseButton = page.locator('//a[@href="/cookie-policy/"]/ancestor::div[contains(@class, "CookiesPopup_container")]//div[contains(@class, "CookiesPopup_cross")]');
    }

    public async navigate(): Promise<void> {
        await super.navigate(HomePage.URL);
    }

    public async clickContactUsButton(): Promise<void> {
        await super.click(this.contactUsButton);
    }

    public async waitUntilAcceptCookiesPopupIsDisplayed(): Promise<void> {
        await super.waitUntilElementIsDisplayed(this.acceptCookiesPopup);
    }

    public async clickAcceptCookiesPopupCloseButton(): Promise<void> {
        await super.click(this.acceptCookiesPopupCloseButton);
    }
}

export default HomePage;
