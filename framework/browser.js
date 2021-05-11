const {remote} = require ('webdriverio');
const config = require('../config.json');
const logger = require('./utils/logger');


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
        await this.browser.pause(2000);
    }

    async go(url){
        this.browser.url(url);
    }

    async quit(){
        logger.info('Quit from browser');
    }
}

module.exports = Browser;