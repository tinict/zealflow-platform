import { fetchApi } from "@/utils";

export const createForm = async (payload: any): Promise<any> => {
  try {
    const response = await fetchApi({
      method: "POST",
      url: `/api/v1/forms`,
      data: payload,
    });

    return response;
  } catch (err) {
    console.log(err);
  }
};
