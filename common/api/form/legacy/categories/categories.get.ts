import axios from "axios";
import Cookies from "js-cookie";
import * as dotenv from "dotenv";
dotenv.config();

interface Category {
  id: string;
  name: string;
}

export const GetCategories = async (): Promise<{
  props: { repo: Category[] };
} | null> => {
  try {
    const authorization = Cookies.get("client_token");

    // if (!authorization) {
    //   console.error('Authorization token not found');
    //   return null;
    // }
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_PREFIX_API_MODULE}/v1/categories`,
      {
        headers: { authorization },
      },
    );

    console.log(res.data);
    const repo: Category[] = res.data;

    return {
      props: {
        repo,
      },
    };
  } catch (error) {
    console.error("Error fetching categories:", error);

    return null;
  }
};
