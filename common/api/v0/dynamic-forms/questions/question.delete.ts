import { fetchApi } from "@/utils";

export const deleteQuestion = async (id: string): Promise<any> => {
    try {
        const response = await fetchApi({
            method: "DELETE",
            url: `/api/v1/questions/${id}`,
        });

        return response;
    } catch (err) {
        console.log(err);
    }
};
