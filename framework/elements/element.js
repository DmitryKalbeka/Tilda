const BaseElementActions = require('./elementActions');

class BaseElement {

    constructor(browser, locator) {
        this.browser = browser;
        this.locator = locator;
    }

    async getElement() {
        if (!this.element) {
            this.element = await this.browser.$(this.locator.locator);
        }
        return new BaseElementActions(this.element, this.locator.name);
    }

    async click(opt = null) {
        return (opt) ? (await this.getElement()).click(opt) : (await this.getElement()).click()
    }

    async isExisting() {
        return (await this.getElement()).isExisting();
    }

    async getAttribute(attribute) {
        return (await this.getElement()).getAttribute(attribute);
    }

    async getText() {
        return (await this.getElement()).getText();
    }

    async waitForExist(opts = {}) {
        return (await this.getElement()).waitForExist(opts);
    }

    async waitUntil(condition, opts = {}) {
        return (await this.getElement()).waitUntil(condition, opts);
    }

    async waitUntilElementGetsText(text, opts = {}) {
        const element = await this.getElement();
        await element.waitUntil(async () => {
            return await element.getText() === text
        }, opts)
    }
}

class Button extends BaseElement {
    constructor(browser, locator) {
        super(browser, locator);
    }
}

class TextLabel extends BaseElement {
    constructor(browser, locator) {
        super(browser, locator);
    }
}


module.exports = Button;
module.exports = TextLabel;