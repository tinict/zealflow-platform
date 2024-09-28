import axios from "axios";

interface Answer {
  value: string;
  category_id: string;
  question_id: string;
}

export const PostAnswers = async (
  payload: Answer,
): Promise<{ props: { repo: Answer } } | null> => {
  const res = await axios
    .post(
      `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_PREFIX_API_MODULE}/answers`,
      {
        ...payload,
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
