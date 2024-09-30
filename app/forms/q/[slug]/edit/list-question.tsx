import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import { getFormDetail } from "@/common/api/v0/forms/[formId]/bundle/route";
import { deleteQuestion, updateQuestion } from "@/common/api/v0/dynamic-forms/questions";
import LazyLoading from "@/components/lazyloading";
import { useQuestion } from "@/common/hooks/useQuestion";
import { IQuestion } from "./_interfaces";

const ListQuestion = ({ ...props }) => {
  const { formId, questions } = props;
  const [listQuestion, setListQuestion] = useState<IQuestion[]>(questions);
  const actionQuestions = useQuestion(formId);

  const fetchQueryQuestion = async () => {
    try {
      const data = await getFormDetail(formId);
      setListQuestion(data?.props?.repo?.data?.questions || []);
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
      setListQuestion((prev) => prev.filter((question) => question?.id !== id));
      toast.success("Question removed successfully!");
    } catch (error) {
      toast.error("Failed to remove question.");
    }
  };

  const fetchPutQuestion = async (id: string, question: IQuestion) => {
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
    if (Array.isArray(questions)) {
      setListQuestion(questions);
    }
  }, [questions]);

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
      {listQuestion?.map((question: any) => (
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

export default ListQuestion;
