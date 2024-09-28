import axios from "axios";
import Cookies from "js-cookie";

interface Answer {
  value: string;
  category_id: string;
  question_id: string;
}

export const GetAnswers = async (
  answerId: string,
): Promise<{
  props: { repo: Answer[] };
} | null> => {
  try {
    const authorization = Cookies.get("client_token");

    // if (!authorization) {
    //   console.error('Authorization token not found');
    //   return null;
    // }

    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_PREFIX_API_MODULE}/answers/${answerId}`,
    );

    console.log(res.data);
    const repo: Answer[] = res.data;

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
