import { httpRequest } from "./httpRequest";
import { handleApiError } from "./errorHandler";

import { ApiResponse, RequestOptions } from "@/interfaces";

export const fetchApi = async ({
  ...props
}: RequestOptions): Promise<ApiResponse | null> => {
  try {
    const response = await httpRequest({ ...props });

    if (response.status >= 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    const errorMessage = handleApiError(error);

    console.error("Error deleting form:", errorMessage);

    return null;
  }
};
