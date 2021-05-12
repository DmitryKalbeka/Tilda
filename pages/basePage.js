const TextLabel = require('../framework/elements/element');

class BasePage {

    locators = {
        title: {locator: '.chakra-heading', name: 'Page Title'}
    }

    constructor(browser) {
        this.browser = browser;
    }

    get title() {
        return new TextLabel(this.browser, this.locators.title);
    }

}

module.exports = BasePage;