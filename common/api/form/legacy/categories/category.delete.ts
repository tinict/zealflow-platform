import axios from "axios";
import Cookies from "js-cookie";
import "dotenv/config";

interface Category {
  id: string;
  name: string;
}

export const deleteCategory = async (
  id: string,
): Promise<{ props: { repo: Category[] } } | null> => {
  const authorization = Cookies.get("client_token");

  const res = await axios
    .delete(
      `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_PREFIX_API_MODULE}/v1/category/${id}`,
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
