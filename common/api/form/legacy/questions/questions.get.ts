import axios from "axios";
import Cookies from "js-cookie";
import "dotenv/config";

interface Question {
  id: number;
  name: string;
  type: string;
}

export const GetQuestions = async (
  id: string,
): Promise<{
  props: { repo: Question[] };
} | null> => {
  try {
    const authorization = Cookies.get("client_token");

    // if (!authorization) {
    //   console.error('Authorization token not found');
    //   return null;
    // }

    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_PREFIX_API_MODULE}/v1/category/${id}/questions`,
      {
        headers: { authorization },
      },
    );

    console.log(res.data);
    const repo: Question[] = res.data;

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
