import * as _ from 'lodash';

export class ConvertData {
    static handleFlatData = (object: any) => ({
        form: {
            id: _.get(object, 'id'),
            title: _.get(object, 'title'),
            explain: _.get(object, 'explain'),
        },
        questions: _.get(object, 'questions', []).map((question: any) => {
            return {
                id: _.get(question, 'id'),
                title: _.get(question, 'title'),
                type: _.get(question, 'type'),
                explain: _.get(question, 'explain'),
            }
        }),
        answers: _.get(object, 'questions', []).map((question: any) => {
            return {
                id: _.get(question, 'id'),
                answers: question.answers.map((answer: any) => ({
                    id: _.get(answer, 'id'),
                    value: _.get(answer, 'value')
                }))
            };
        }),
        questionResults: _.get(object, 'questions', []).map((question: any) => {
            return {
                id: _.get(question, 'id'),
                results: question.results.map((result: any) => ({
                    id: _.get(result, 'id'),
                    value: _.get(result, 'value')
                }))
            };
        }),
    });
};