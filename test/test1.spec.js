const {describe, it} = require('mocha');
const {assert} = require('chai');
const Browser = require('../framework/browser');
const config = require('../config.json');
const Api = require('../framework/utilities/api');
const DashboardPage = require('../pages/dashboardPage');
const QuestionPage = require('../pages/questionPage');
const QuizSteps = require('../steps/quizSteps');
const Utilities = require('../framework/utilities/utilities');



describe ('Tilda quiz test', () => {
    let browser;
    const quiz = {
        name: `Geography`,
        questions: {
            data: [
                {
                    text: "What is the largest city in the world?",
                    options: "Delhi,Tokyo,Paris,Sao Paulo",
                    answer: "Delhi"
                },
                {
                    text: "In what country can you visit Machu Picchu?",
                    options: "Peru,Bolivia,Columbia,Chile",
                    answer: "Chile"
                },
                {
                    text: "How many countries are there in Africa?",
                    options: "35,48,54,25",
                    answer: "35"
                }
            ]
        }
    }

    before(async () => {
        // browser = new Browser();
        // await browser.startBrowser();
        // await browser.go(config.environment.host);
    });

    after(async () => {
        //browser.quit();
    });

    it('Test ', async () => {
        console.log(quiz.questions.data[0].text)



    })

})