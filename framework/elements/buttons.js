const ButtonActions = require('./elementActions');

class Buttons {
    elements;

    constructor(browser, locator) {
        this.browser = browser;
        this.locator = locator;
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

    async clickByText(text) {
        let elements = await this.getElements();
        for (const element of elements) {
            if (await element.getText() === text) {
                await element.click();
                break;
            }
        }
    }
}

module.exports = Buttons;