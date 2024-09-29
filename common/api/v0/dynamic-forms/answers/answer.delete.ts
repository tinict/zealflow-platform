import { fetchApi } from "@/utils";

export const deleteAnswer = async (id: string): Promise<any> => {
    try {
        const response = await fetchApi({
            method: "DELETE",
            url: `/api/v1/answers/${id}`,
        });

        return response;
    } catch (err) {
        console.log(err);
    }
};
