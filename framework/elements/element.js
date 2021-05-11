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

    async getText() {
        return await(await this.getElement()).getText();
    }

    async isExisting() {
        return (await this.getElement()).isExisting();
    }

    async waitForExist(opts = {}) {
        return (await this.getElement()).waitForExist(opts);
    }

    async click(opt = null) {
        return (opt)?(await this.getElement()).click(opt):(await this.getElement()).click()
    }
}

class Button extends BaseElement{
    constructor(browser, locator){
        super(browser, locator);
    }
}

class TextLabel extends BaseElement{
    constructor(browser, locator){
        super(browser, locator);
    }
}


module.exports = Button;
module.exports = TextLabel;