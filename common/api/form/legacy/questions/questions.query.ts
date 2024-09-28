import axios from "axios";
import Cookies from "js-cookie";

interface Question {
  id: number;
  name: string;
  type: string;
  category_id: string;
}

export const QueryQuestions = async (
  query: any,
): Promise<{ props: { repo: Question[] } } | null> => {
  const authorization = Cookies.get("client_token");

  const res = await axios
    .get(`http://localhost:8000/questions`, {
      headers: { authorization },
      params: query,
    })
    .catch((error) => {
      console.log(error);
    });

  if (!res) return null;

  const repo: Question[] = res.data;

  return {
    props: {
      repo,
    },
  };
};
