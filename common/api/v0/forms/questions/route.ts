import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();

interface Forms {
  id: string;
  title: string;
}

export const create = async (data: any): Promise<any> => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_PREFIX_API_MODULE}/v1/questions/`,
      data,
    );

    console.log(res.data);
    const repo: Forms[] = res.data;

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
