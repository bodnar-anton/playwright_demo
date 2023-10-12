import { test } from '@playwright/test';
import ContactUsPage from '../pages/ContactUsPage';
import Helper from '../../helper/Helper';
import HomePage from '../pages/HomePage';

const randomFullName = `${Helper.GenerateRandomText()} ${Helper.GenerateRandomText()}`;
const invalidEmail = Helper.GenerateRandomString();
const randomMessage = Helper.GenerateRandomText();

const validFullName = 'Andrii Pivtorak';
const validEmail = 'AndriiPivtorak@luxequality.com';
const validMessage = 'It is interesting to learn about your services, get advice on my project and discuss the free trial in more detail.\nThank you!\nWaiting for feedback!';

test.describe('Contact Us form test', () => {
    test('Submit a form with the valid data', async ({ page }) => {
        const homePage = new HomePage(page);
        const contactUsPage = new ContactUsPage(page);

        // Open the «Home Page»
        await homePage.navigate();
        await homePage.waitUntilAcceptCookiesPopupIsDisplayed();
        await homePage.clickAcceptCookiesPopupCloseButton();
        
        // Navigate to the «Contact Us» page
        await homePage.waitForTimeout(800);
        await homePage.clickContactUsButton();
        await contactUsPage.isPageOpened();
        await contactUsPage.waitForTimeout(500);
        await contactUsPage.scrollToContactUsForm();

        // Verify the «Contact With Us» form is displayed
        await contactUsPage.isContactWithUsFormDisplayed();
        await contactUsPage.isFullNameInputFieldDisplayed();
        await contactUsPage.isEmailInputFieldDisplayed();
        await contactUsPage.isMessageInputFieldDisplayed();
        await contactUsPage.isPrivacyPolicyCheckboxDisplayed();
        await contactUsPage.isSendMessageButtonDisplayed();

        // Enter the valid full name
        await contactUsPage.waitForTimeout(800);
        await contactUsPage.enterFullName(validFullName);
        await contactUsPage.isFullNameEntered(validFullName);

        // Enter the valid email
        await contactUsPage.waitForTimeout(800);
        await contactUsPage.enterEmail(validEmail);
        await contactUsPage.isEmailEntered(validEmail);

        // Enter the valid message
        await contactUsPage.waitForTimeout(800);
        await contactUsPage.enterMessage(validMessage);
        await contactUsPage.isMessageEntered(validMessage);

        // Check the «Privacy Policy» checkbox
        await contactUsPage.waitForTimeout(800);
        await contactUsPage.clickPrivacyPolicyCheckbox();
        await contactUsPage.isPrivacyPolicyCheckboxChecked();

        // Click the «Send Message» button
        await contactUsPage.clickSendMessageButton();

        // Verify success message is displayed
        await contactUsPage.waitUntilSuccessModalIsDisplayed();
        await contactUsPage.isSuccessModalDisplayed();
        await contactUsPage.waitForTimeout(800);
        await contactUsPage.closeSuccessModal();
        await contactUsPage.waitForTimeout(500);
    });
});
