import axios from "axios";
import Cookies from "js-cookie";

interface CorrectAnswer {
  question_id: string;
  answer_id: string;
  explain: string;
  id: string;
}

export const QueryCorrectAnswers = async (
  query: any,
): Promise<{ props: { repo: CorrectAnswer[] } } | null> => {
  const authorization = Cookies.get("client_token");

  const res = await axios
    .get(`http://localhost:8000/correct_answers`, {
      headers: { authorization },
      params: query,
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
