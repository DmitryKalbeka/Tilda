const BaseElementActions = require('./actions/textLabelActions');

class BaseElement {

    constructor(browser, locator) {
        this.browser = browser;
        this.locator = locator;
    }

    async getElement() {
        if (!this.element) {
            this.element = await this.browser.$(this.locator.locator);
        }
        return this.element
    }

    async click(opt = null) {
        const element = new BaseElementActions(await this.getElement(), this.locator.name);
        return (opt) ? element.click(opt) : element.click()
    }

    async isExisting() {
        return new BaseElementActions(await this.getElement(), this.locator.name).isExisting();
    }

    async getAttribute(attribute) {
        return new BaseElementActions(await this.getElement(), this.locator.name).getAttribute(attribute);
    }

    async getText() {
        return new BaseElementActions(await this.getElement(), this.locator.name).getText();
    }

    async waitForExist(opts = {}) {
        return new BaseElementActions(await this.getElement(), this.locator.name).waitForExist(opts);
    }

    async waitUntil(condition, opts = {}) {
        return new BaseElementActions(await this.getElement(), this.locator.name).waitUntil(condition, opts);
    }

    async waitUntilElementGetsText(text, opts = {}) {
        const element = await this.getElement();
        await element.waitUntil(async () => {
            return await element.getText() === text
        }, opts)
    }
}

module.exports = BaseElement;