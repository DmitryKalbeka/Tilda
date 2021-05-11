const logger = require('../utils/logger');

class BaseElementActions {

    constructor(element, name) {
        this.element = element;
        this.name = name;
    }

    async getText() {
        let result = await(this.element).getText();
        logger.info(`Getting text from '${this.name}'. result: '${result}'`);
        return result;
    }

    async isExisting() {
        return (this.element).isExisting();
    }

    async waitForExist(opts = {}) {
        return (this.element).waitForExist(opts);
    }

    async click(opt = null) {
        logger.info(`Clicking '${this.name}'.`);
        return (opt)?(this.element).click(opt):(this.element).click()
    }
}

class ButtonActions extends BaseElementActions{
    constructor(element, name = 'unspecified') {
        super (element, name);
    }
}

class TextLabelActions extends BaseElementActions{
    constructor(element, name = 'unspecified') {
        super (element, name);
    }
}

module.exports = BaseElementActions;
module.exports = ButtonActions;
module.exports = TextLabelActions;