import { RequestOptions } from "@/interfaces";
import { axiosInstance } from "@/lib";

export const httpRequest = async ({
  method,
  url,
  data,
  params,
}: RequestOptions): Promise<any> => {
  try {
    const response = await axiosInstance.request({
      method,
      url,
      data,
      params,
    });

    return response;
  } catch (error) {
    console.error(`Error with HTTP ${method} request to ${url}:`, error);
    throw error;
  }
};
