import axios from "axios";
import Cookies from "js-cookie";
import "dotenv/config";

interface Category {
  id: string;
  name: string;
}

export const PostCategories = async (
  body: Category,
): Promise<{ props: { repo: Category[] } } | null> => {
  const authorization = Cookies.get("client_token");

  const res = await axios
    .post(
      `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_PREFIX_API_MODULE}/v1/category`,
      {
        ...body,
      },
    )
    .catch((error) => {
      console.log(error);
    });

  if (!res) return null;

  const repo: Category[] = res.data;

  return {
    props: {
      repo,
    },
  };
};
