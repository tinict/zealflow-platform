"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import { getFormDetail } from "@/common/api/v0/forms/[formId]/bundle/route";
import LazyLoading from "@/components/lazyloading";
import { IQuestion } from "./_interfaces";

export default function Page() {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const pathname = usePathname();
  const formId = pathname.split("/")[3];

  const fetchFormDetail = async () => {
    try {
      const formDetail = await getFormDetail(formId);
      setQuestions(formDetail?.props?.repo?.data?.questions || []);
    } catch (err: any) {
      toast.error("Failed to load form details. Please try again later.");
    }
  };

  useEffect(() => {
    fetchFormDetail();
  }, [pathname]);

  const Question = dynamic(() => import("./list-question"), {
    loading: () => <LazyLoading />,
    ssr: false,
  });

  return (
    <section className="col-span-12 xl:col-span-6 lg:col-span-8 md:col-span-10 sm:col-span-12 md:col-start-2 sm:col-start-0 lg:col-start-3 xl:col-start-4 col-start-1">
      {questions.length > 0 ? (
        <Question
          questions={questions}
          formId={formId}
        />
      ) : (
        <LazyLoading />
      )}
    </section>
  );
}
