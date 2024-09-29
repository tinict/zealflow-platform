import { fetchApi } from "@/utils";

export const getListForm = async (

): Promise<any> => {
    try {
        const response = await fetchApi({
            method: "GET",
            url: `/api/v1/forms`,
            params: {
                fields: 'id, title'
            }
        });

        return response;
    } catch (err) {
        console.log(err);
    }
};
