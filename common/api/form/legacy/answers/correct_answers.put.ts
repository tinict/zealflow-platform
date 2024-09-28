import axios from "axios";
import Cookies from "js-cookie";

interface CorrectAnswer {
  question_id: string;
  answer_id: string;
  explain: string;
}

export const PutCorrectAnswers = async (
  id: string,
  body: CorrectAnswer,
): Promise<{ props: { repo: CorrectAnswer[] } } | null> => {
  const authorization = Cookies.get("client_token");

  const res = await axios
    .put(`http://localhost:8000/correct_answers/${id}`, {
      ...body,
    })
    .catch((error) => {
      console.log(error);
    });

  if (!res) return null;

  const repo: CorrectAnswer[] = res.data;

  return {
    props: {
      repo,
    },
  };
};
