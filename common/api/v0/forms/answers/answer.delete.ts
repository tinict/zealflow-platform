import axios from "axios";
import Cookies from "js-cookie";
import "dotenv/config";

interface Answer {
  id: string;
  value: string;
}

export const DeleteAnswers = async (
  id: string,
): Promise<{ props: { repo: Answer[] } } | null> => {
  const authorization = Cookies.get("client_token");

  const res = await axios
    .delete(
      `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_PREFIX_API_MODULE}/answers/${id}`,
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
