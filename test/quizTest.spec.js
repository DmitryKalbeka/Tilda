const {describe, it} = require('mocha');
const {assert} = require('chai');
const Browser = require('../framework/browser');
const config = require('../config.json');
const Api = require('../framework/utils/api');
const DashboardPage = require('../pages/dashboardPage');
const QuestionPage = require('../pages/questionPage');



describe ('Tilda quiz test', () => {
    let browser;
    const quiz = {
        name: `Test Quiz ${Date.now()}`, 
        questions: {
            data: [
                {
                    text: "Question 1", 
                    options: "opt1,opt2,opt3,opt4", 
                    answer: "opt2"
                },
                {
                    text: "Question 2", 
                    options: "opt1,opt2,opt3", 
                    answer: "opt1"
                }
            ]
        }
    }
    let quizId;

    before(async () => {
        quizId = (await Api.createQuiz(quiz)).data.insert_quizzes_one.id
        browser = new Browser();
        await browser.startBrowser();
        await browser.go(config.environment.host);
    });

    after(async () => {
        Api.deleteQuiz(quizId);
        browser.quit();
    });

    it('Test ', async () => {
        console.log(quizId);
        let dashboardPage = new DashboardPage(browser);
        await dashboardPage.title.waitForExist();
    })
})
