import axios from "axios";
import "dotenv/config";

interface Result {
  value: string;
}

export const PutResults = async (id: string, payload: Result): Promise<any> => {
  const res = await axios
    .patch(
      `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_PREFIX_API_MODULE}/results/${id}`,
      {
        ...payload,
      },
    )
    .catch((error) => {
      console.log(error);

      return false;
    });

  if (!res) return false;

  return true;
};
