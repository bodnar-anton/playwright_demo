import { test } from '@playwright/test';
import ContactUsPage from '../pages/ContactUsPage';
import Helper from '../../helper/Helper';

const randomFullName = `${Helper.GenerateRandomText()} ${Helper.GenerateRandomText()}`;
const invalidEmail = Helper.GenerateRandomString();
const randomMessage = Helper.GenerateRandomText();

test.describe('Contact Us form test', () => {
    test('Submit a form with an empty input fields', async ({ page }) => {
        const contactUsPage = new ContactUsPage(page);

        // Navigate to the «Contact Us» page
        await contactUsPage.navigate();
        await contactUsPage.isPageOpened();

        // Verify the «Contact With Us» form is displayed
        await contactUsPage.isContactWithUsFormDisplayed();
        await contactUsPage.isFullNameInputFieldDisplayed();
        await contactUsPage.isEmailInputFieldDisplayed();
        await contactUsPage.isMessageInputFieldDisplayed();
        await contactUsPage.isPrivacyPolicyCheckboxDisplayed();
        await contactUsPage.isSendMessageButtonDisplayed();

        // Click the «Send Message» button
        await contactUsPage.clickSendMessageButton();
        await contactUsPage.isFullNameInputFieldErrorDisplayed(ContactUsPage.REQUIRED_FIELD_ERROR);
        await contactUsPage.isEmailInputFieldErrorDisplayed(ContactUsPage.REQUIRED_FIELD_ERROR);
        await contactUsPage.isMessageInputFieldErrorDisplayed(ContactUsPage.REQUIRED_FIELD_ERROR);
        await contactUsPage.isPrivacyPolicyCheckboxErrorDisplayed(ContactUsPage.ACCEPT_PRIVACY_POLICY_ERROR);
    });

    test('Submit a form with an invalid email', async ({ page }) => {
        const contactUsPage = new ContactUsPage(page);

        // Navigate to the «Contact Us» page
        await contactUsPage.navigate();
        await contactUsPage.isPageOpened();

        // Verify the «Contact With Us» form is displayed
        await contactUsPage.isContactWithUsFormDisplayed();
        await contactUsPage.isFullNameInputFieldDisplayed();
        await contactUsPage.isEmailInputFieldDisplayed();
        await contactUsPage.isMessageInputFieldDisplayed();
        await contactUsPage.isPrivacyPolicyCheckboxDisplayed();
        await contactUsPage.isSendMessageButtonDisplayed();

        // Enter the full name
        await contactUsPage.enterFullName(randomFullName);
        await contactUsPage.isFullNameEntered(randomFullName);

        // Enter the invalid email
        await contactUsPage.enterEmail(invalidEmail);
        await contactUsPage.isEmailEntered(invalidEmail);

        // Enter the message
        await contactUsPage.enterMessage(randomMessage);
        await contactUsPage.isMessageEntered(randomMessage);

        // Check the «Privacy Policy» checkbox
        await contactUsPage.clickPrivacyPolicyCheckbox();
        await contactUsPage.isPrivacyPolicyCheckboxChecked();

        // Click the «Send Message» button
        await contactUsPage.clickSendMessageButton();
        await contactUsPage.isEmailInputFieldErrorDisplayed(ContactUsPage.INVALID_EMAIL_ERROR);
    }); 
});
