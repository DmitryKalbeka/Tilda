const {describe, it} = require('mocha');
const {assert} = require('chai');
const Browser = require('../framework/browser');
const config = require('../config.json');
const DashboardPage = require('../pages/dashboardPage');
const Api = require('../framework/utils/api');


describe ('Test 1', () => {
    let browser;

    before(async () => {
        browser = new Browser();
        //await browser.startBrowser();
        //await browser.go(config.environment.host);
    });

    after(async () => {
        browser.quit();
    });

    it('Test ', async () => {
        //dashboardPage = new DashboardPage(browser);
        //await (await dashboardPage.quizCell('Geography')).click();
        const quiz = {
            name: "New quizz", 
            questions: {
                data: [
                    {
                        text: "Question 1", 
                        options: "opt1,opt2,opt3", 
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
        console.log(await Api.createQuiz(quiz)); 
    })
})