import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();

interface Forms {
  id: string;
  title: string;
}

export const GetForms = async (): Promise<{
  props: { repo: Forms[] };
} | null> => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_PREFIX_API_MODULE}/v1/forms?fields=id,title`,
    );

    console.log(res.data);
    const repo: Forms[] = res.data;

    return {
      props: {
        repo,
      },
    };
  } catch (error) {
    console.error("Error fetching categories:", error);

    return null;
  }
};

export const deleteForm = async (id: string): Promise<any> => {
  try {
    const isDeleted = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_PREFIX_API_MODULE}/v1/forms/${id}`,
    );

    console.log(isDeleted);

    return isDeleted;
  } catch (error) {
    console.error("Error fetching categories:", error);

    return null;
  }
};

export const createFormBundle = async (data: any): Promise<any> => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_PREFIX_API_MODULE}/v1/forms/bundle`,
      data,
    );

    console.log(res.data);
    const repo: Forms = res.data;

    return {
      props: {
        repo,
      },
    };
  } catch (error) {
    console.error("Error fetching categories:", error);

    return null;
  }
};

export const create = async (data: any): Promise<any> => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_PREFIX_API_MODULE}/v1/forms/`,
      data,
    );

    console.log(res.data);
    const repo: Forms[] = res.data;

    return {
      props: {
        repo,
      },
    };
  } catch (error) {
    console.error("Error fetching categories:", error);

    return null;
  }
};
