const config = require('../../config.json');
const fetch = require('node-fetch')

class Api {

    static async doRequest(query, variables = {}) {
        let body = JSON.stringify({
            query: query, 
            variables: variables
        });
       console.log(body);
        let response =  await fetch(config.environment.apiHost, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        })
        return await response.json();
    }

    static async createQuiz(quiz) {
        const createQuery = `mutation insertQuiz {\r\n  insert_quizzes_one(object: ${this.queryBuilder(quiz)}) {\r\n    id\r\n  }\r\n}`
        return (await this.doRequest(createQuery))
    }

    static queryBuilder(quiz){
        let questionsArray = '';
        quiz.questions.data.forEach((question) =>{
            questionsArray += (questionsArray !== '')?', ':'';
            questionsArray += `{text: "${question.text}", options: "${question.options}", answer: "${question.answer}"}`
        })
        return `{name: "${quiz.name}", questions: {data: [${questionsArray}]}}`
    }

    static async deleteQuiz(id) {
        const createQuery = `mutation deleteQuiz {\r\n  delete_quizzes_by_pk(id: "${id}") {\r\n    id\r\n  }\r\n}`
        return (await this.doRequest(createQuery))
    }
}

module.exports = Api;