"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";

import Question from "./question";

import { getFormDetail } from "@/common/api/v0/forms/[formId]/bundle/route";

/**
 * Common
 */
interface Question {
  id: number;
  name: string;
  type: string;
}

export default function Page() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const pathname = usePathname();

  const splitPath = (url: string) => {
    const regex = /forms\/q\/([^\/]+)\/edit/;

    const match = url.match(regex);
    const slug = match ? match[1] : null;

    return slug;
  };

  const fetchFormDetail = async () => {
    try {
      const formDetail = await getFormDetail(pathname.split("/")[3]);

      setQuestions(formDetail?.props?.repo?.data?.questions);
      console.log(formDetail?.props?.repo?.data?.questions);
    } catch (err: any) {
      toast.error(err);
    }
  };

  useEffect(() => {
    let id = splitPath(pathname);

    fetchFormDetail();
  }, []);

  return (
    <section className="col-span-12 xl:col-span-6 lg:col-span-8 md:col-span-10 sm:col-span-12 md:col-start-2 sm:col-start-0 lg:col-start-3 xl:col-start-4 col-start-1">
      <Question dataques={questions} idCategory={splitPath(pathname)} />
    </section>
  );
}