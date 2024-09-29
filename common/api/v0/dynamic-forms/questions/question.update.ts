import { fetchApi } from "@/utils";

export const updateQuestion = async (
    id: string,
    payload: any
): Promise<any> => {
    try {
        const response = await fetchApi({
            method: "PATCH",
            url: `/api/v1/questions/${id}`,
            data: payload,
        });

        return response;
    } catch (err) {
        console.log(err);
    }
};
