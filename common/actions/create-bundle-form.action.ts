import axios from "axios";
import * as dotenv from "dotenv";

import { create } from "../api/v0/forms/route";
dotenv.config();

export const createBundleForm = async (data: any): Promise<any> => {
  try {
    const form = await create(data);

    console.log("form", form);

    const href = form?.props?.repo?.links?.[2]?.href;

    if (!href) {
      throw new Error("href is undefined or not found in the form object");
    }
    console.log("href", href);

    const formId = form.props.repo.data.id;

    console.log(formId);

    const question = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_PREFIX_API_MODULE}/questions`,
      {
        formId,
        title: "title",
        results: [],
        type: "type",
        explain: "explain",
      },
    );

    const answer = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/answers`,
      {
        questionId: question.data.data.id,
        value: "value",
      },
    );

    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/results`, {
      questionId: question.data.data.id,
      value: answer.data.data.id,
    });

    return formId;
  } catch (error) {
    console.error(error);

    return null;
  }
};
