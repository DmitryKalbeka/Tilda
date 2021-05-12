const BaseElementActions = require('./baseElementActions');

class ButtonActions extends BaseElementActions {
    constructor(element, name = 'unspecified') {
        super(element, name);
    }
}

module.exports = ButtonActions;