const {assert} = require('chai');
const Utilities = require('../framework/utilities/utilities');

class QuizSteps {

    static async isQuestionAsExpected(questionPage, question) {
        let expectedAnswers = question.options.split(',');
        let actualAnswers = await questionPage.answers.getElements();
        assert.equal(await questionPage.questionText.getText(), question.text, 'Question text is wrong');
        assert.equal(expectedAnswers.length, actualAnswers.length, 'Count of answers is wrong');
        for (const actualAnswer of actualAnswers) {
            let actualAnswerText = await actualAnswer.getText()
            if (!expectedAnswers.includes(actualAnswerText)) {
                assert.isTrue(false, `Actual answer '${actualAnswerText}' is not included in expected answers list: [${expectedAnswers}]`)
            }
        }
    }

    static async isSelectedAsExpected(answers, expectedSelection = null) {
        for (const answer of answers) {
            let shouldAnswerBeSelected = (expectedSelection == answer) ? '' : null;
            assert.equal(await answer.getAttribute('data-checked'), shouldAnswerBeSelected, `Selection status of the answer '${await answer.getText()}' is wrong`);
        }
    }

    static async clickAnswer(answers, question, isCorrect = true) {
        let givenAnswer;
        if (isCorrect) {
            givenAnswer = question.answer;
        } else {
            let answersArray = question.options.split(',');
            let indexOfRightAnswer = answersArray.indexOf(question.answer);
            let selectedAnswerIndex = Utilities.getRandomIntExcept(answersArray.length, indexOfRightAnswer);
            givenAnswer = answersArray[selectedAnswerIndex];
        }
        console.log(givenAnswer)
        await answers.clickByText(givenAnswer);
    }
}

module.exports = QuizSteps;