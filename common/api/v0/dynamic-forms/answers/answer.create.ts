import { fetchApi } from "@/utils";

export const createAnswer = async (payload: any): Promise<any> => {
  try {
    const response = await fetchApi({
      method: "POST",
      url: `/api/v1/answers`,
      data: payload,
    });

    return response;
  } catch (err) {
    console.log(err);
  }
};
