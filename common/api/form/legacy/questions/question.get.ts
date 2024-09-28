import axios from "axios";
import Cookies from "js-cookie";
import "dotenv/config";

interface Question {
  id: number;
  name: string;
  type: string;
  category_id: string;
  result: [];
  explain: string;
}

export const GetQuestion = async (
  category_id: string,
  question_id: string,
): Promise<{ props: { repo: Question } } | null> => {
  const authorization = Cookies.get("client_token");

  const res = await axios
    .get(
      `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_PREFIX_API_MODULE}/v1/categories/${category_id}/questions/${question_id}/answer`,
    )
    .catch((error) => {
      console.log(error);
    });

  if (!res) return null;

  const repo: Question = res.data;

  return {
    props: {
      repo,
    },
  };
};
