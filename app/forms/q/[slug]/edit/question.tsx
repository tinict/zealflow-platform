import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getFormDetail } from "@/common/api/v0/forms/[formId]/bundle/route";
import { QuestionCard } from "@/components/dynamic-form/components/question-card";
import { createQuestion, deleteQuestion, updateQuestion } from "@/common/api/v0/dynamic-forms/questions";

/**
 * Common
 */
interface Ques {
  id: string;
  name: string;
  type: string;
  category_id: string;
  results: [];
  explain: string;
}

const Question = ({ ...props }) => {
  const { idCategory, dataques } = props;
  const [questions, setQuestions] = useState<Ques[]>([]);

  const fetchQueryQuestion = async () => {
    try {
      const data = await getFormDetail(idCategory);

      setQuestions(data?.props?.repo?.data?.questions || []);
    } catch (error) {
      toast.error("Failed to fetch questions.");
    }
  };

  const handleCreateQuestion = async () => {
    try {
      await createQuestion({
        formId: idCategory,
        title: "New title question",
        type: "Mutiple-Choice",
        explain: "",
      });
      await fetchQueryQuestion();
      toast.success("Question created successfully!");
    } catch (error) {
      toast.error("Failed to create question.");
    }
  };

  const handleRemoveQuestion = async (id: string) => {
    try {
      setQuestions((prev) => prev.filter((question) => question.id !== id));
      await fetchDeleteQuestion(id);
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

  const fetchDeleteQuestion = async (
    question_id: string,
  ) => {
    return deleteQuestion(question_id);
  };

  useEffect(() => {
    setQuestions(dataques);
  }, [dataques]);

  return (
    <>
      {questions?.map((question, index) => (
        <QuestionCard
          key={index}
          question={question}
          questionId={question?.id}
          createQuestion={handleCreateQuestion}
          updateQuestion={fetchPutQuestion}
          removeQuestion={() => handleRemoveQuestion(question?.id)}
        />
      ))}
    </>
  );
};

export default Question;
