import { fetchApi } from "@/utils";

export const createQuestion = async (payload: any): Promise<any> => {
  try {
    const response = await fetchApi({
      method: "POST",
      url: `/api/v1/questions`,
      data: payload,
    });

    return response;
  } catch (err) {
    console.log(err);
  }
};
