import { fetchApi } from "@/utils";

export const getForm = async (id: string): Promise<any> => {
  try {
    const response = await fetchApi({
      method: "GET",
      url: `/api/v1/forms/${id}`,
    });

    return response;
  } catch (err) {
    console.log(err);
  }
};
