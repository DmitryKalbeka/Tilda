const {describe, it} = require('mocha');
const {assert} = require('chai');
const Browser = require('../framework/browser');
const config = require('../config.json');
const Api = require('../framework/utilities/api');
const DashboardPage = require('../pages/dashboardPage');
const QuestionPage = require('../pages/questionPage');
const QuizSteps = require('../steps/quizSteps');
const Utilities = require('../framework/utilities/utilities');
const logger = require('../framework/utilities/logger');


describe('Tilda quiz test', () => {
    let browser;
    const quiz = {
        name: `Test Quiz ${Date.now()}`,
        questions: {
            data: [
                {
                    text: "Question 1",
                    options: "opt1,opt2,opt3,opt4",
                    answer: "opt1"
                },
                {
                    text: "Question 2",
                    options: "opt1,opt2,opt3",
                    answer: "opt2"
                },
                {
                    text: "Question 3",
                    options: "opt1,opt2,opt3",
                    answer: "opt3"
                }
            ]
        }
    }
    let quizId;
    let dashboardPage;
    let questionPage;
    let answers;

    before(async () => {
        quizId = (await Api.createQuiz(quiz)).data.insert_quizzes_one.id
        browser = new Browser();
        await browser.startBrowser();
        await browser.go(config.environment.host);
        dashboardPage = new DashboardPage(browser);
    });

    beforeEach(async () => {
        dashboardPage = new DashboardPage(browser);
        await dashboardPage.title.waitUntilElementGetsText('Tilda Quiz');
        await (await dashboardPage.quizTitle(quiz.name)).click();
        questionPage = new QuestionPage(browser);
        await questionPage.title.waitUntilElementGetsText(quiz.name);
    })

    afterEach(async () => {
        await browser.go(config.environment.host);
        dashboardPage = new DashboardPage(browser);
    })

    after(async () => {
        Api.deleteQuiz(quizId);
        browser.quit();
    });

    it('Quiz is opened by clicking ', async () => {
        await QuizSteps.isQuestionAsExpected(questionPage, quiz.questions.data[0]);
    })

    it('Only one opt of question can be selected', async () => {
        answers = await questionPage.answers.getElements();

        let selectedAnswerIndex = Utilities.getRandomInt(answers.length);
        await answers[selectedAnswerIndex].click();
        await QuizSteps.isSelectedAsExpected(answers, answers[selectedAnswerIndex]);

        selectedAnswerIndex = Utilities.getRandomIntExcept(answers.length, selectedAnswerIndex);
        await answers[selectedAnswerIndex].click();
        await QuizSteps.isSelectedAsExpected(answers, answers[selectedAnswerIndex]);
    })

    it('Next button navigation', async () => {
        for (let i = 1; i < quiz.questions.data.length; i++) {
            await questionPage.nextButton.click();
            await questionPage.questionText.waitUntilElementGetsText(quiz.questions.data[i].text)
            await QuizSteps.isQuestionAsExpected(questionPage, quiz.questions.data[i]);
        }
        await questionPage.nextButton.click();
        await questionPage.questionText.waitUntilElementGetsText('Tilda Quiz');
    })

    it('Back button navigation', async () => {
        for (let i = 1; i < quiz.questions.data.length; i++) {
            await questionPage.nextButton.click();
        }
        for (let i = quiz.questions.data.length-1; i > 0; i--) {
            await questionPage.backButton.click();
            await questionPage.questionText.waitUntilElementGetsText(quiz.questions.data[i-1].text)
            await QuizSteps.isQuestionAsExpected(questionPage, quiz.questions.data[i-1]);
        }
        await questionPage.backButton.click();
        await questionPage.questionText.waitUntilElementGetsText('Tilda Quiz');
    })

    it('Back arrow button navigation', async () => {
        await questionPage.backArray.click();
        await questionPage.questionText.waitUntilElementGetsText('Tilda Quiz');
        for (let i = 1; i < quiz.questions.data.length; i++) {
            await (await dashboardPage.quizTitle(quiz.name)).click();
            for (let j = 0; j < i; j++) {
                await questionPage.nextButton.click();
            }
            await questionPage.backArray.click();
            await questionPage.questionText.waitUntilElementGetsText('Tilda Quiz');
        }
    })

    it('Score counting test', async () => {
        let givenAnswers = [
            {
                answers: [true, true, true],
                description: 'All answers are correct'
            },
            {
                answers: [false, false, false],
                description: 'All answers are incorrect'
            },
            {
                answers: [true, false, false],
                description: 'Only first answer is correct'
            },
            {
                answers: [false, true, false],
                description: 'Only second answer is correct'
            },
            {
                answers: [false, false, true],
                description: 'Only last answer is correct'
            },
            {
                answers: [true, true, false],
                description: 'First and second answers are correct'
            }
        ];
        await questionPage.backArray.click();
        let score = await dashboardPage.quizScore(quiz.name);
        assert.equal(await score.getText(), `Score: 0/${quiz.questions.data.length}`, 'Question number in quiz cell is wrong')

        for (const givenAnswer of givenAnswers) {
            logger.info(`< ---- Test case: ${givenAnswer.description} --- >`);
            let expectedRightAnswersNumber = 0;
            await (await dashboardPage.quizTitle(quiz.name)).click();
            for (let i = 0; i < quiz.questions.data.length; i++) {
                await questionPage.questionText.waitUntilElementGetsText(quiz.questions.data[i].text)
                if (givenAnswer.answers[i]) {expectedRightAnswersNumber++}
                await QuizSteps.clickAnswer(questionPage.answers, quiz.questions.data[i], givenAnswer.answers[i])
                await questionPage.nextButton.click();
            }
            let score = await dashboardPage.quizScore(quiz.name);
            assert.equal(await score.getText(), `Score: ${expectedRightAnswersNumber}/${quiz.questions.data.length}`, 'Question number in quiz cell is wrong')
        }
    })
})
