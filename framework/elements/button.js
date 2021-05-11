let BaseElement = require('../elements/baseElement');

class Button extends BaseElement {
    constructor(browser, locator) {
        super(browser, locator);
    }
}

module.exports = Button;