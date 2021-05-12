class Browser {

    async $(locator) {
        return browser.$(locator);
    }

    async $$(locator) {
        return browser.$$(locator);
    }

    async go(url) {
        await browser.url(url);
    }
}

module.exports = Browser;