import { fetchApi } from "@/utils";

export const createResult = async (payload: any): Promise<any> => {
  try {
    const response = await fetchApi({
      method: "POST",
      url: `/api/v1/results`,
      data: payload,
    });

    return response;
  } catch (err) {
    console.log(err);
  }
};
