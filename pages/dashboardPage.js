const BasePage = require("./basePage");
const Button = require('../framework/elements/button');
const TextLabel = require('../framework/elements/textLabel');

class DashboardPage extends BasePage {

    dashboardLocators = {
        quizTitleTemplate: {locator: '//h4[text()="{{quizTitle}}"]', name: '{{quizTitle}} title'},
        quizScoreTemplate: {
            locator: '//h4[text()="{{quizTitle}}"]/../span[@data-testid="quiz-score"]',
            name: '{{quizTitle}} quiz score'
        }
    }

    constructor(browser) {
        super(browser);
    }

    async quizTitle(quizTitle) {
        let quizTitleLocator = {
            locator: this.dashboardLocators.quizTitleTemplate.locator.replace('{{quizTitle}}', quizTitle),
            name: this.dashboardLocators.quizTitleTemplate.name.replace('{{quizTitle}}', quizTitle)
        }
        return new Button(this.browser, quizTitleLocator);
    }

    async quizScore(quizTitle) {
        let quizScoreLocator = {
            locator: this.dashboardLocators.quizScoreTemplate.locator.replace('{{quizTitle}}', quizTitle),
            name: this.dashboardLocators.quizScoreTemplate.name.replace('{{quizTitle}}', quizTitle)
        }
        return new TextLabel(this.browser, quizScoreLocator);
    }
}

module.exports = DashboardPage;