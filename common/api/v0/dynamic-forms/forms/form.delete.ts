import { fetchApi } from "@/utils";

export const deleteForm = async (id: string): Promise<any> => {
  try {
    const response = await fetchApi({
      method: "DELETE",
      url: `/api/v1/forms/${id}`,
    });

    return response;
  } catch (err) {
    console.log(err);
  }
};
