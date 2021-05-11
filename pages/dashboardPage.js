const BasePage = require("./basePage");
const Button = require('../framework/elements/button');

class DashboardPage extends BasePage {

    dashboardLocators = {
        quizCellTemplate: {locator: '//h4[text()="{{quizTitle}}"]/../..', name: '{{quizTitle}} cell'}
    }

    constructor(browser) {
        super(browser);
    }

    async quizCell(quizTitle) {
        let quizCell = {
            locator: this.dashboardLocators.quizCellTemplate.locator.replace('{{quizTitle}}', quizTitle),
            name: this.dashboardLocators.quizCellTemplate.name.replace('{{quizTitle}}', quizTitle)
        }
        return new Button(this.browser, quizCell);
    }
}

module.exports = DashboardPage;