import axios from "axios";
import "dotenv/config";

interface Answer {
  id: string;
  value: string;
  question_id: string;
}

export const PutAnswers = async (
  id: string,
  payload: Answer,
): Promise<{ props: { repo: Answer[] } } | null> => {
  const res = await axios
    .patch(
      `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_PREFIX_API_MODULE}/answers/${id}`,
      {
        ...payload,
      },
    )
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
