import axios from "axios";
import Cookies from "js-cookie";
import "dotenv/config";

interface Question {
  id: number;
  name: string;
  type: string;
  category_id: string;
}

export const DeleteQuestions = async (
  category_id: string,
  question_id: string,
): Promise<{ props: { repo: Question[] } } | null> => {
  const authorization = Cookies.get("client_token");

  const res = await axios
    .delete(
      `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_PREFIX_API_MODULE}/v1/category/${category_id}/question/${question_id}`,
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
