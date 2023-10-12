import { Locator, expect } from '@playwright/test';
import BasePage from './BasePage';

class ContactUsPage extends BasePage {
    public static URL = `${process.env.ENV}/contacts`;
    public static REQUIRED_FIELD_ERROR = 'This is a required field';
    public static ACCEPT_PRIVACY_POLICY_ERROR = 'Mere formality, agree to our Privacy Policy to send your message';
    public static INVALID_EMAIL_ERROR = 'Invalid email address';

    private readonly pageTitle: Locator;
    private readonly contactWithUsForm: Locator;
    private readonly fullNameInputField: Locator;
    private readonly emailInputField: Locator;
    private readonly messageInputField: Locator;
    private readonly privacyPolicyCheckbox: Locator;
    private readonly privacyPolicyCheckboxLabel: Locator;
    private readonly sendMessageButton: Locator;
    private readonly fullNameInputFieldError: Locator;
    private readonly emailInputFieldError: Locator;
    private readonly messageInputFieldError: Locator;
    private readonly privacyPolicyCheckboxError: Locator;
    private readonly successModal: Locator;
    private readonly successModalOkButton: Locator;

    constructor(page) {
        super(page);

        this.pageTitle = page.locator('//h1[text()="Contact Us"]');
        this.contactWithUsForm = page.locator('//h2[text()="Connect with us"]/ancestor::div[contains(@class, "ModuleContacts_form")]//form');
        this.fullNameInputField = page.locator('#name');
        this.emailInputField = page.locator('#email');
        this.messageInputField = page.locator('#message');
        this.privacyPolicyCheckbox = page.locator('//input[@name="checkbox"]');
        this.privacyPolicyCheckboxLabel = page.locator('//input[@name="checkbox"]/following-sibling::*[1]');
        this.sendMessageButton = page.locator('//button[@type="submit"]');
        this.fullNameInputFieldError = page.locator('//input[@id="name"]/ancestor::label/following-sibling::span');
        this.emailInputFieldError = page.locator('//input[@id="email"]/ancestor::label/following-sibling::span');
        this.messageInputFieldError = page.locator('//textarea[@id="message"]/ancestor::label/following-sibling::span');
        this.privacyPolicyCheckboxError = page.locator('//input[@name="checkbox"]/following-sibling::span[contains(@class, "Form_error")]');
        this.successModal = page.locator('//p[text()="Your message has been sent."]/ancestor::div[contains(@class, "PopUpResult_modal")]');
        this.successModalOkButton = page.locator('//p[text()="Your message has been sent."]/ancestor::div[contains(@class, "PopUpResult_modal")]//button');
    }

    public async navigate(): Promise<void> {
        await super.navigate(ContactUsPage.URL);
    }

    public async isPageOpened(): Promise<void> {
        await super.isElementDisplayed(this.pageTitle);
    }

    public async scrollToContactUsForm(): Promise<void> {
        await super.scrollElementIntoViewIfNeeded(this.contactWithUsForm);
    }

    public async isContactWithUsFormDisplayed(): Promise<void> {
        await super.isElementDisplayed(this.contactWithUsForm);
    }

    public async isFullNameInputFieldDisplayed(): Promise<void> {
        await super.isElementDisplayed(this.fullNameInputField);
    }

    public async isEmailInputFieldDisplayed(): Promise<void> {
        await super.isElementDisplayed(this.emailInputField);
    }

    public async isMessageInputFieldDisplayed(): Promise<void> {
        await super.isElementDisplayed(this.messageInputField);
    }

    public async isPrivacyPolicyCheckboxDisplayed(): Promise<void> {
        await super.isElementDisplayed(this.privacyPolicyCheckboxLabel);
    }

    public async isSendMessageButtonDisplayed(): Promise<void> {
        await super.isElementDisplayed(this.sendMessageButton);
    }

    public async clickSendMessageButton(): Promise<void> {
        await super.click(this.sendMessageButton);
    }

    public async isFullNameInputFieldErrorDisplayed(errorMessage: string): Promise<void> {
        const error = await super.getText(this.fullNameInputFieldError);
        await expect(error).toEqual(errorMessage);
    }

    public async isEmailInputFieldErrorDisplayed(errorMessage: string): Promise<void> {
        const error = await super.getText(this.emailInputFieldError);
        await expect(error).toEqual(errorMessage);
    }

    public async isMessageInputFieldErrorDisplayed(errorMessage: string): Promise<void> {
        const error = await super.getText(this.messageInputFieldError);
        await expect(error).toEqual(errorMessage);
    }

    public async isPrivacyPolicyCheckboxErrorDisplayed(errorMessage: string): Promise<void> {
        const error = await super.getText(this.privacyPolicyCheckboxError);
        await expect(error).toEqual(errorMessage);
    }

    public async enterFullName(fullName: string): Promise<void> {
        await super.setValue(this.fullNameInputField, fullName);
    }

    public async isFullNameEntered(fullName: string): Promise<void> {
        await super.isValueEntered(this.fullNameInputField, fullName);
    }

    public async enterEmail(email: string): Promise<void> {
        await super.setValue(this.emailInputField, email);
    }

    public async isEmailEntered(email: string): Promise<void> {
        await super.isValueEntered(this.emailInputField, email);
    }

    public async enterMessage(message: string): Promise<void> {
        await super.setValue(this.messageInputField, message);
    }

    public async isMessageEntered(message: string): Promise<void> {
        await super.isValueEntered(this.messageInputField, message);
    }

    public async clickPrivacyPolicyCheckbox(): Promise<void> {
        await super.click(this.privacyPolicyCheckboxLabel);
    }

    public async isPrivacyPolicyCheckboxChecked(): Promise<void> {
        await super.doesElementHaveTheProperty(this.privacyPolicyCheckbox, 'checked', true);
    }

    public async waitUntilSuccessModalIsDisplayed(): Promise<void> {
        await super.waitUntilElementIsDisplayed(this.successModal);
    }

    public async isSuccessModalDisplayed(): Promise<void> {
        await super.isElementDisplayed(this.successModal);
    }

    public async closeSuccessModal(): Promise<void> {
        await super.click(this.successModalOkButton);
    }
}

export default ContactUsPage;
