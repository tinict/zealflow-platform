import axios from "axios";
import Cookies from "js-cookie";

interface Answer {
  id: string;
  value: string;
  question_id: string;
}

export const QueryAnswers = async (
  query: any,
): Promise<{ props: { repo: Answer[] } } | null> => {
  const authorization = Cookies.get("client_token");

  const res = await axios
    .get(`http://localhost:8000/answers`, {
      headers: { authorization },
      params: query,
    })
    .catch((error) => {
      console.log(error);
    });

  if (!res) return null;

  const repo: Answer[] = res.data;

  return {
    props: {
      repo,
    },
  };
};
