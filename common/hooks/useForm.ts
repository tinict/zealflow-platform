import { createAnswer } from "../api/v0/dynamic-forms/answers";
import { createForm } from "../api/v0/dynamic-forms/forms";
import { createQuestion } from "../api/v0/dynamic-forms/questions";
import { createResult } from "../api/v0/dynamic-forms/results";

export const useForm = (payload: any) => {
  const create = async () => {
    try {
      const form = await createForm(payload);

      if (!form) throw new Error("Form is not exist!");

      const formId = form.data.id;

      if (!formId) throw new Error("Form Id is missing!");

      const question = await createQuestion({
        formId,
        title: "title",
        results: [],
        type: "type",
        explain: "explain",
      });

      if (!question) throw new Error("Question is not exist!");

      const questionId = question.data.id;

      if (!questionId) throw new Error("Question Id is missing!");

      const answer = await createAnswer({
        questionId,
        value: "New option",
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
