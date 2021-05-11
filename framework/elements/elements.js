const ButtonActions = require('./elementActions');
const Button = require('./element');
const TextLabel = require('./element');


class BaseEements{
    constructor(browser, locator) {
        this.browser = browser;
        this.locator = locator;
    }

    async waitUntilAtLeastOneElementShown(opts={}){
        await new TextLabel(this.browser, this.locator).waitForExist(opts);
    }
}

class Buttons extends BaseEements{
    elements;

    constructor(browser, locator) {
       super(browser, locator);
    }

    async getElements() {
        if (!this.elements) {
            this.elements = [];
            let el = await this.browser.$$(this.locator.locator)
            el.forEach((element) => {
                this.elements.push(new ButtonActions(element, `Element ${this.elements.length} of '${this.locator.name}'`))
            })
        }
        return this.elements
    }
}

module.exports = Buttons;