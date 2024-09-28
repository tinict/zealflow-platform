"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Image } from "@nextui-org/image";

import QuestionBox from "./questionbox";

import { GetQuiz } from "@/common/api/form/legacy/quiz.get";
import { noForms } from "@/utils/medias";

/**
 * common
 */
interface Answer {
  id: string;
  value: string;
}

interface Question {
  id: number;
  name: string;
  type: string;
  answers: Answer[];
  results: string[];
  explain: string;
}

interface Category {
  id: number;
  name: string;
  questions: Question[];
}

interface GetCategory {
  props?: {
    repo?: Category;
  };
}

export default function Page({ ...props }) {
  const [questions, setQuestions] = useState<Question[] | []>([]);
  const [formTitle, setFormTitle] = useState<string>("");
  const pathname = usePathname();

  const fetchGetQuiz = async (id: any) => {
    const data = await GetQuiz(id);

    if (data) {
      setQuestions(data?.props?.repo?.data[0]?.questions);
      setFormTitle(data?.props?.repo?.data[0]?.name);
    }
  };

  /**
   * common
   */
  const splitPath = (url: string) => {
    const regex = /forms\/q\/e\/([^\/]+)\/viewform/;

    const match = url.match(regex);
    const slug = match ? match[1] : null;

    return slug;
  };

  useEffect(() => {
    let id = splitPath(pathname);

    console.log(id);
    fetchGetQuiz(id);
  }, []);

  return (
    <section className="col-span-12 xl:col-span-6 lg:col-span-8 md:col-span-10 sm:col-span-12 md:col-start-2 sm:col-start-0 lg:col-start-3 xl:col-start-4 col-start-1">
      <div className="bg-white p-6 rounded-lg shadow-[rgba(0,0,0,0.05)_0px_0px_0px_1px,rgb(209,213,219)_0px_0px_0px_1px_inset] w-full mb-[16px]">
        {formTitle}
      </div>
      {questions?.map((item: Question, index: number) => {
        return <QuestionBox key={index} questions={item} />;
      })}
      {questions.length == 0 && (
        <div className="flex justify-center items-center flex-col">
          <Image
            alt="NextUI hero Image with delay"
            height={250}
            radius="md"
            src={noForms.src}
            width={250}
          />
          <p className="text-base">
            There is forms Error or wait for loading ...
          </p>
        </div>
      )}
    </section>
  );
}
