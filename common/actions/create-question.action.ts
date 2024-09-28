import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();

export const createQuestion = async (formId: string): Promise<any> => {
  try {
    const question = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_PREFIX_API_MODULE}/questions`,
      {
        formId,
        title: "Quiz form without title",
        results: [],
        type: "type",
        explain: "explain",
      },
    );

    const answer = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/answers`,
      {
        questionId: question.data.data.id,
        value: "value",
      },
    );

    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/results`, {
      questionId: question.data.data.id,
      value: answer.data.data.id,
    });

    return formId;
  } catch (error) {
    console.error(error);

    return null;
  }
};
