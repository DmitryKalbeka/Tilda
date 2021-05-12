const BasePage = require("./basePage");
const Button = require('../framework/elements/button');
const TextLabel = require('../framework/elements/textLabel');
const Buttons = require('../framework/elements/buttons');

class QuestionPage extends BasePage {
    questionPageLocators = {
        backArrow: {locator: '[aria-label="Back"]', name: 'Back arrow'},
        questionText: {locator: '.css-1n79i7i > div', name: 'Question text'},
        answers: {locator: '.chakra-stack > label > div', name: 'Answers'},
        backButton: {locator: '[data-testid="question-back"]', name: 'Back button'},
        nextButton: {locator: '[data-testid="question-next"]', name: 'Next button'}
    }

    constructor(browser) {
        super(browser);
    }

    get backArrow() {
        return new Button(this.browser, this.questionPageLocators.backArrow);
    }

    get questionText() {
        return new TextLabel(this.browser, this.questionPageLocators.questionText);
    }

    get backButton() {
        return new Button(this.browser, this.questionPageLocators.backButton);
    }

    get nextButton() {
        return new Button(this.browser, this.questionPageLocators.nextButton);
    }

    get answers() {
        return new Buttons(this.browser, this.questionPageLocators.answers)
    }
}

module.exports = QuestionPage;