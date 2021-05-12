const BaseElement = require('../elements/baseElement');

class TextLabel extends BaseElement {
    constructor(browser, locator) {
        super(browser, locator);
    }
}

module.exports = TextLabel;