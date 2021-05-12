const config = require('../../wdio.conf');
const fetch = require('node-fetch')

class Api {

    static async DoRequest(query, variables = {}) {
        let body = JSON.stringify({
            query: query,
            variables: variables
        });
        let response = await fetch(config.config.baseApiHost, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        })
        return response.json();
    }

    static async CreateQuiz(quiz) {
        const createQuery = `mutation insertQuiz {\r\n  insert_quizzes_one(object: ${this.QueryBuilder(quiz)}) {\r\n    id\r\n  }\r\n}`
        return this.DoRequest(createQuery)
    }

    static QueryBuilder(quiz) {
        let questionsArray = '';
        quiz.questions.data.forEach((question) => {
            questionsArray += (questionsArray !== '') ? ', ' : '';
            questionsArray += `{text: "${question.text}", options: "${question.options}", answer: "${question.answer}"}`
        })
        return `{name: "${quiz.name}", questions: {data: [${questionsArray}]}}`
    }

    static async DeleteQuiz(id) {
        const createQuery = `mutation deleteQuiz {\r\n  delete_quizzes_by_pk(id: "${id}") {\r\n    id\r\n  }\r\n}`
        return this.DoRequest(createQuery)
    }
}

module.exports = Api;