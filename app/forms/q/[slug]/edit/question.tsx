import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";

import { getFormDetail } from "@/common/api/v0/forms/[formId]/bundle/route";
import {
  deleteQuestion,
  updateQuestion,
} from "@/common/api/v0/dynamic-forms/questions";
import LazyLoading from "@/components/lazyloading";
import { useQuestion } from "@/common/hooks/useQuestion";

/**
 * Common
 */
interface Ques {
  id: string;
  title: string;
  type: string;
  explain: string;
}

const Question = ({ ...props }) => {
  const { formId, dataques } = props;
  const [questions, setQuestions] = useState<Ques[]>([]);
  const actionQuestions = useQuestion(formId);
  const fetchQueryQuestion = async () => {
    try {
      const data = await getFormDetail(formId);

      setQuestions(data?.props?.repo?.data?.questions || []);
    } catch (error) {
      toast.error("Failed to fetch questions.");
    }
  };

  const handleCreateQuestion = async () => {
    try {
      await actionQuestions.create();
      await fetchQueryQuestion();
      toast.success("Question created successfully!");
    } catch (error) {
      toast.error("Failed to create question.");
    }
  };

  const handleRemoveQuestion = async (id: string) => {
    try {
      await fetchDeleteQuestion(id);
      setQuestions((prev) => prev.filter((question) => question?.id !== id));
      toast.success("Question removed successfully!");
    } catch (error) {
      toast.error("Failed to remove question.");
    }
  };

  const fetchPutQuestion = async (id: string, question: Ques) => {
    try {
      await updateQuestion(id, question);
      toast.success("Question updated successfully!");
    } catch (error) {
      toast.error("Failed to update question.");
    }
  };

  const fetchDeleteQuestion = async (question_id: string) => {
    return deleteQuestion(question_id);
  };

  useEffect(() => {
    if (Array.isArray(dataques)) {
      setQuestions(dataques);
    }
  }, [dataques]);

  const QuestionCard = dynamic(
    () => import("@/components/dynamic-form/components/question-card"),
    {
      loading: () => {
        return <LazyLoading />;
      },
    },
  );

  return (
    <>
      {questions?.map((question) => (
        <QuestionCard
          key={question.id}
          createQuestion={handleCreateQuestion}
          question={question}
          questionId={question.id}
          removeQuestion={() => handleRemoveQuestion(question?.id)}
          updateQuestion={fetchPutQuestion}
        />
      ))}
    </>
  );
};

export default Question;
