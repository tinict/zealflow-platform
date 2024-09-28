import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import EditBox from "./editbox";

import { DeleteQuestions } from "@/common/api/form/legacy/questions/questions.delete";
import { PutQuestions } from "@/common/api/v0/forms/questions/questions.put";
import { createQuestion } from "@/common/actions/create-question.action";
import { getFormDetail } from "@/common/api/v0/forms/[formId]/bundle/route";

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

  // Fetch form details and set questions
  const fetchQueryQuestion = async () => {
    try {
      const data = await getFormDetail(idCategory);

      setQuestions(data?.props?.repo?.data?.questions || []);
    } catch (error) {
      toast.error("Failed to fetch questions.");
    }
  };

  // Handle question creation
  const handleCreateQuestion = async () => {
    try {
      await createQuestion(idCategory);
      await fetchQueryQuestion(); // Re-fetch questions to reflect the new question
      toast.success("Question created successfully!");
    } catch (error) {
      toast.error("Failed to create question.");
    }
  };

  // Handle question removal
  const handleRemoveQuestion = async (id: string) => {
    try {
      setQuestions((prev) => prev.filter((question) => question.id !== id));
      await fetchDeleteQuestion(idCategory, id);
      toast.success("Question removed successfully!");
    } catch (error) {
      toast.error("Failed to remove question.");
    }
  };

  // Handle question update
  const fetchPutQuestion = async (id: string, question: Ques) => {
    try {
      await PutQuestions(id, question);
      toast.success("Question updated successfully!");
    } catch (error) {
      toast.error("Failed to update question.");
    }
  };

  // Delete question helper
  const fetchDeleteQuestion = async (
    category_id: string,
    question_id: string,
  ) => {
    return DeleteQuestions(category_id, question_id);
  };

  // Set initial questions from props or re-fetch on category change
  useEffect(() => {
    setQuestions(dataques);
  }, [dataques]);

  return (
    <>
      {questions?.map((question, index) => (
        <EditBox
          key={index}
          idCat={idCategory}
          idQues={question?.id}
          newbox={handleCreateQuestion}
          ques={question}
          removebox={() => handleRemoveQuestion(question?.id)}
          updateQuestion={fetchPutQuestion}
        />
      ))}
    </>
  );
};

export default Question;
