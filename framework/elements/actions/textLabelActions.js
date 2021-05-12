const BaseElementActions = require('./baseElementActions');

class TextLabelActions extends BaseElementActions {
    constructor(element, name = 'unspecified') {
        super(element, name);
    }
}

module.exports = TextLabelActions;