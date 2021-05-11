const logger = require('../utils/logger');

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

    async getText() {
        let result = await(await this.getElement()).getText();
        logger.info(`Getting text from '${this.locator.name}'. result: '${result}'`);
        return result;
    }

    async clear() {
        let result = await(await this.getElement()).clear();
        logger.info(`Clearing '${this.locator.name}'.'`);
        return result;
    }

    async isDisplayed() {
        return (await this.getElement()).isDisplayed();
    }

    async isExisting() {
        return (await this.getElement()).isExisting();
    }

    async waitForDisplayed(opts = {}) {
        return (await this.getElement()).waitForDisplayed(opts);
    }

    async click(opt = null) {
        logger.info(`Clicking '${this.locator.name}'.`);
        return (opt)?(await this.getElement()).click(opt):(await this.getElement()).click()
    }
}

module.exports = BaseElement;