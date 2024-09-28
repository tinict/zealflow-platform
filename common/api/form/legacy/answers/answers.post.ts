import axios from "axios";
import Cookies from "js-cookie";

interface Answer {
  value: string;
  category_id: string;
  question_id: string;
}

export const PostAnswers = async (
  body: Answer,
): Promise<{ props: { repo: Answer } } | null> => {
  const authorization = Cookies.get("client_token");

  const res = await axios
    .post(
      `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_PREFIX_API_MODULE}/v1/answer`,
      {
        ...body,
      },
    )
    .catch((error) => {
      console.log(error);
    });

  if (!res) return null;

  const repo: Answer = res.data;

  return {
    props: {
      repo,
    },
  };
};
