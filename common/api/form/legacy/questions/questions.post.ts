import axios from "axios";
import "dotenv/config";

interface Question {
  id: number;
  name: string;
  type: string;
}

export const PostQuestions = async (
  body: any,
): Promise<{ props: { repo: any[] } } | null> => {
  const res = await axios
    .post(
      `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_PREFIX_API_MODULE}/questions`,
      {
        ...body,
      },
    )
    .catch((error) => {
      console.log(error);
    });

  if (!res) return null;

  const repo: any[] = res.data;

  return {
    props: {
      repo,
    },
  };
};
