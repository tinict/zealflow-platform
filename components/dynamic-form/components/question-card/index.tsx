import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IQuestionCard } from "../interfaces";
import { IOption } from "./interfaces";
import { createAnswer, deleteAnswer, updateAnswer } from "@/common/api/v0/dynamic-forms/answers";
import { updateResult } from "@/common/api/v0/dynamic-forms/results";
import { ControlCard } from "../control-card";
import { HeaderCard } from "./components/header-card";
import { FooterCard } from "./components/footer-card";
import { ContentCard } from "./components/content-card";

export const QuestionCard = ({
    ...props
}: IQuestionCard) => {
    const { question, createQuestion, removeQuestion, questionId, updateQuestion } = props;

    const [titleQuestion, setTitleQuestion] = useState<string>("New title question");
    const [results, setResults] = useState<any>({});
    const [correctAnswers, setCorrectAnswers] = useState<any[]>([]);
    const [explain, setExplain] = useState<string>("");
    const [options, setOptions] = useState<IOption[]>([]);
    const [isChangeCorrectAnswers, setIsChangeCorrectAnswers] = useState<boolean>(false);

    // Function to set the correct answer
    const setAnswerCorrect = (idOption: string) => {
        const updatedAnswers = [...correctAnswers];
        updatedAnswers[0] = { id: results.id, value: idOption };
        setCorrectAnswers(updatedAnswers);
    };

    // Add a new option
    const handleAddOption = async () => {
        try {
            const res = await createAnswer({
                questionId,
                value: "New answer choices",
            });
            const newData = res.data;
            setOptions((prevOptions) => [
                ...prevOptions,
                { id: newData.id, value: newData.value },
            ]);
            toast.success("Add answer success!");
        } catch {
            toast.error("Add answer failure!");
        }
    };

    // Update an answer
    const handleUpdateAnswer = async (option: any) => {
        await updateAnswer(option.id, option);
    };

    // Delete an answer
    const handleDeleteAnswer = async (id: string) => {
        try {
            await deleteAnswer(id);
            toast.success("Remove answer success!");
        } catch {
            toast.error("Remove answer failure!");
        }
    };

    // Remove an option
    const handleRemoveOption = (id: string) => {
        setOptions(options.filter((option) => option?.id !== id));
        handleDeleteAnswer(id);
    };

    // Update correct answers only if they've changed
    const fetchPutCorrectAnswers = async () => {
        if (isChangeCorrectAnswers) {
            await updateResult(correctAnswers[0].id, {
                value: correctAnswers[0].value,
            });
            setIsChangeCorrectAnswers(false);
        }
    };

    // Update the question
    const handleUpdateQuestion = (id: string, dataUpdate: any) => {
        const isChanged = JSON.stringify(question) !== JSON.stringify({ ...question, ...dataUpdate });
        if (isChanged) {
            updateQuestion(id, { ...question, ...dataUpdate });
            fetchPutCorrectAnswers();
        }
    };

    useEffect(() => {
        if (questionId) {
            setOptions(question?.answers);
            setExplain(question?.explain);
            setAnswerCorrect(question?.results[0]);
            setResults({
                id: question?.results[0]?.id,
                value: question?.results[0]?.value,
            });
            setTitleQuestion(question?.title);
        }
    }, [questionId]);

    useEffect(() => {
        if (explain !== question.explain) {
            handleUpdateQuestion(questionId, {
                title: titleQuestion,
                explain,
                results: correctAnswers,
                type: "multiple-choice",
            });
        }
    }, [explain]);

    useEffect(() => {
        if (titleQuestion !== question.title) {
            const isChanged = JSON.stringify(question) !== JSON.stringify({ ...question, ...{ title: titleQuestion } });
            if (isChanged) {
                updateQuestion(questionId, { ...question, ...{ title: titleQuestion } });
                fetchPutCorrectAnswers();
            }
        }
    }, [titleQuestion]);

    const handleSelectOption = (option: any) => {
        (e: any) => {
            setOptions(
                options?.map((opt: any) => {
                    if (opt.id === option.id) {
                        handleUpdateAnswer(option);

                        return {
                            ...opt,
                            value: e.target.value,
                        };
                    }

                    return opt;
                }),
            );
        }
    };

    return (
        <>
            <div className="group bg-white p-6 rounded-lg shadow-[rgba(0,0,0,0.05)_0px_0px_0px_1px,rgb(209,213,219)_0px_0px_0px_1px_inset] w-full mb-[16px] relative mt-4">
                <HeaderCard
                    title={titleQuestion}
                    changeTitleQuestion={(e: any) => {
                        setTitleQuestion(e.target.value);
                    }}
                />
                <ContentCard
                    value={results?.value}
                    options={options}
                    onChangeOption={
                        (e: any) => {
                            setResults({
                                ...results,
                                value: e.target.value,
                            });
                            setIsChangeCorrectAnswers(true);
                        }
                    }
                    handleRemoveOption={handleRemoveOption}
                    handleUpdateOption={(e: any, option: any) => {
                        setOptions(
                            options.map((opt: any) => {
                                if (opt.id === option.id) {
                                    handleUpdateAnswer({
                                        id: option.id,
                                        value: e.target.value
                                    });

                                    return {
                                        ...opt,
                                        value: e.target.value,
                                    };
                                }

                                return opt;
                            }),
                        );
                    }}
                    handleSelectOption={handleSelectOption}
                    handleAddOption={handleAddOption}
                />
                <div className="border-t border-gray-300 my-4" />
                <FooterCard
                    explain={explain}
                    onchangeExplain={(e: any) => setExplain(e.target.value)}
                    removeQuestion={removeQuestion}
                />
                <ControlCard
                    handleCreate={createQuestion}
                    handleRemove={removeQuestion}
                />
            </div>
        </>
    );
};
