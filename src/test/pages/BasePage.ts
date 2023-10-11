import type { Locator, Page } from '@playwright/test'
import { expect } from '@playwright/test';

class BasePage {
    public page: Page;
    constructor(page) {
        this.page = page;
    }

    public async navigate(url): Promise<void> {
        await this.page.goto(url);
    }

    public async pause(): Promise<void> {
        await this.page.pause();
    }

    public async reload(): Promise<void> {
        await this.page.reload();
    }

    public async waitForTimeout(milliseconds: number): Promise<void> {
        await this.page.waitForTimeout(milliseconds);
    }

    public async getURL(): Promise<string> {
        return this.page.url();
    }

    public async click(element: Locator): Promise<void> {
        await element.click();
    }

    public async isElementDisplayed(element: Locator, timeout = 5000): Promise<void> {
        await expect(element).toBeVisible({ timeout: timeout });
    }

    public async isElementNotDisplayed(element: Locator): Promise<void> {
        await expect(element).not.toBeVisible();
    }

    public async areElementsDisplayed(elements: Locator[]): Promise<void> {
        for (const element of elements) {
            await expect(element).toBeVisible();
        }
    }

    public async clickElementByIndex(elements: Locator, index: number): Promise<void> {
        await this.click((elements).nth(index));
    }

    public async doesElementHaveClass(element: Locator, className: string | RegExp): Promise<void> {
        await expect(element).toHaveClass(className);
    }

    public async doesNotElementHaveClass(element: Locator, className: string | RegExp): Promise<void> {
        await expect(element).not.toHaveClass(className);
    }

    public async doesPageHaveTheURL(URL: string): Promise<void> {
        await expect(this.page).toHaveURL(URL);
    }

    public async getText(element: Locator): Promise<string> {
        return (await element).textContent();
    }

    public async getValue(element: Locator): Promise<string> {
        return (await element).inputValue();
    }

    public async getElementAttribute(element: Locator, attribute: string): Promise<string> {
        return (await element).getAttribute(attribute);
    }

    public async doesElementHaveTheAttribute(element: Locator, attribute: string, value: string): Promise<void> {
        await expect(await element).toHaveAttribute(attribute, value);
    }

    public async doesNotElementHaveTheAttribute(element: Locator, attribute: string, value: string): Promise<void> {
        await expect(await element).not.toHaveAttribute(attribute, value);
    }

    public async doesElementHaveTheProperty(element: Locator, property: string, value: string | boolean): Promise<void> {
        await expect(await element).toHaveJSProperty(property, value);
    }

    public async doesNotElementHaveTheProperty(element: Locator, property: string, value: string | boolean): Promise<void> {
        await expect(await element).not.toHaveJSProperty(property, value);
    }

    public async getElementProperty(element: Locator, property: string): Promise<string | boolean> {
        return element.evaluate((e, elementProperty: string) => {
            return (e as HTMLInputElement)[elementProperty];
        }, property);
    }

    public async setValue(element: Locator, value: string): Promise<void> {
        await (await element).fill(value);
    }

    public async clearValue(element: Locator): Promise<void> {
        await (await element).fill('');
    }

    public async isValueEntered(element: Locator, value: string): Promise<void> {
        await expect(element).toHaveValue(value);
    }

    public async hoverAnElement(element: Locator): Promise<void> {
        await element.hover();
    }

    public async scrollElementIntoViewIfNeeded(element: Locator): Promise<void> {
        await element.scrollIntoViewIfNeeded();
    }

    public async scrollElementIntoView(container: Locator, element: Locator, timeout = 30000, interval = 1000): Promise<void> {
        await this.hoverAnElement(container);
        let isDisplayed = false;
        let tries = 0;

        do {
            try {
                await this.isElementDisplayed(element, interval);
                isDisplayed = true;
                break;
            } catch (error) {
                await this.page.mouse.wheel(0, interval);
            } finally {
                tries++;
            }
            if (tries >= timeout / interval) {
                console.error('Element not found');
                break;
            }
        } while (!isDisplayed)
    }

    public async waitUntilInputFieldNotEmpty(element: Locator, waitTimeout = 30000): Promise<void> {
        await expect(element).not.toHaveValue('', { timeout: waitTimeout });
    }

    public async waitUntilElementIsDisplayed(element: Locator, waitTimeout = 30000): Promise<void> {
        await expect(element).toBeVisible({ timeout: waitTimeout });
    }

    public async waitUntilElementIsNotDisplayed(element: Locator, waitTimeout = 30000): Promise<void> {
        await expect(element).not.toBeVisible({ timeout: waitTimeout });
    }
}

export default BasePage;
