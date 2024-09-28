import axios from "axios";
import Cookies from "js-cookie";
import "dotenv/config";

interface Question {
  title: string;
  results: [];
  explain: string;
}

export const PutQuestions = async (
  id: string,
  payload: Question,
): Promise<{ props: { repo: Question[] } } | null> => {
  const authorization = Cookies.get("client_token");

  const res = await axios
    .patch(
      `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_PREFIX_API_MODULE}/questions/${id}`,
      {
        ...payload,
      },
    )
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
