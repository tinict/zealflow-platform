import { createAnswer } from "../api/v0/dynamic-forms/answers";
import { createQuestion } from "../api/v0/dynamic-forms/questions";
import { createResult } from "../api/v0/dynamic-forms/results";

export const useQuestion = (formId: string) => {
  const create = async () => {
    try {
      if (!formId) throw new Error("Form Id is missing!");

      const question = await createQuestion({
        formId,
        title: "Question",
        type: "type",
        explain: "",
      });

      if (!question) throw new Error("Question is not exist!");

      const questionId = question.data.id;

      if (!questionId) throw new Error("Question Id is missing!");

      const answer = await createAnswer({
        questionId,
        value: "New Option",
      });

      if (!answer) throw new Error("Answer is not exist!");

      const answerId = answer.data.id;

      if (!answerId) throw new Error("Answer Id is missing!");

      const result = await createResult({
        questionId,
        value: answerId,
      });

      if (!result) throw new Error("Result is not exist!");

      return {
        formId,
      };
    } catch (err) {
      console.error(err);
      throw new Error(`Failed to create form: ${err}`);
    }
  };

  return {
    create,
  };
};
