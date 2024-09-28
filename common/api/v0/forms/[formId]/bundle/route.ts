import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();

export const getFormDetail = async (
  id: string,
): Promise<{
  props: { repo: any };
} | null> => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_PREFIX_API_MODULE}/v1/forms/${id}/details`,
    );

    console.log(res.data);
    const repo: any = res.data;

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
