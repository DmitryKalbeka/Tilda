const BasePage = require("./basePage");
const Button = require('../framework/elements/button');
const TextLabel = require('../framework/elements/textLabel');

class QuestionPage extends BasePage {
    questionPageLocators = {
        backArray:{locator: '[aria-label="Back"]', name: 'Back array'},
        questionText:{locator: '.css-1n79i7i > div', name: 'Question text'},
        answers:{locator:'.chakra-stack > label > div', name: 'Answers'},
        backButton:{locator: '[data-testid="question-back"]', name: 'Back button'},
        nextButton:{locator: '[data-testid="question-next"]', name: 'Next button'}
    }

    constructor(browser) {
        super(browser);
    }

    get backArray() {
        return new Button(this.browser, this.questionPageLocators.backArray);
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
    get answers(){

    }
}

module.exports = QuestionPage;