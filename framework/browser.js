const {remote} = require ('webdriverio');
const config = require('../config.json');
const logger = require('./utilities/logger');


class Browser {
    browser;

    async $(locator){
        return this.browser.$(locator);
    }

    async $$(locator){
        return this.browser.$$(locator);
    }

    async startBrowser(){
        logger.info('Browser starts');
        this.browser = await remote(config.webdriverioOpts);
    }

    async go(url){
        this.browser.url(url);
    }

    async quit(){
        logger.info('Quit from browser');
    }
}

module.exports = Browser;