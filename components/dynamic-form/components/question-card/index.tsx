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

    const [titleQuestion, setTitleQuestion] = useState<string>("");
    const [results, setResults] = useState<any>({});
    const [correctAnswers, setCorrectAnswers] = useState<any[]>([]);
    const [explain, setExplain] = useState<string>("");
    const [options, setOptions] = useState<IOption[]>([]);
    const [isChangeCorrectAnswers, setIsChangeCorrectAnswers] = useState<boolean>(false);

    const setAnswerCorrect = (idOption: string) => {
        const updatedAnswers = [...correctAnswers];

        updatedAnswers[0] = { id: results.id, value: idOption };
        setCorrectAnswers(updatedAnswers);
    };

    const handleAddOption = async () => {
        await handleCreateOption({
            questionId,
            value: "New answer choices",
        })
            .then(async (res: any) => {
                const newData = res.data;

                setOptions((prevOptions) => [
                    ...prevOptions,
                    {
                        id: newData.id,
                        value: newData.value,
                    },
                ]);
                toast.success("Add answer success!");
            })
            .catch(() => {
                toast.error("Add answer failure!");
            });
    };

    const handleUpdateAnswer = async (option: any) => {
        await updateAnswer(option.id, option);
    };

    const handleDeleteAnswer = async (id: string) => {
        await deleteAnswer(id)
            .then(() => {
                toast.success("Remove answer success!");
            })
            .catch(() => {
                toast.error("Remove answer failure!");
            });
    };

    const handleCreateOption = async (data: any) => {
        return await createAnswer(data);
    };

    const handleRemoveOption = (id: string) => {
        setOptions(options.filter((option) => option?.id !== id));
        handleDeleteAnswer(id);
    };

    const fetchPutCorrectAnswers = async () => {
        if (isChangeCorrectAnswers) {
            await updateResult(correctAnswers[0].id, {
                value: correctAnswers[0].value,
            }).then(() => {
                setIsChangeCorrectAnswers(false);
            });
        }
    };

    const handleUpdateQuestion = (id: string, dataUpdate: any) => {
        updateQuestion(id, {
            ...question,
            ...dataUpdate,
        });

        fetchPutCorrectAnswers();
    };

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

    useEffect(() => {
        if (questionId) {
            setOptions(question.answers);
            setExplain(question.explain);
            setAnswerCorrect(question.results[0]);
            setResults({
                value: question.results[0]?.value,
                id: question.results[0]?.id,
            });
            setTitleQuestion(question.title);
        }
    }, [createQuestion, removeQuestion]);

    useEffect(() => {
        handleUpdateQuestion(questionId, {
            title: titleQuestion,
            explain,
            results: correctAnswers,
            type: "multiple-choice",
        });
    }, [explain, titleQuestion]);

    useEffect(() => {
        console.log(results);
        updateResult(results.id, {
            value: results.value
        });
    }, [results]);

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