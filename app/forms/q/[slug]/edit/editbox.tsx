import React, { useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Radio,
  RadioGroup,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faClipboardList,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

import { DeleteAnswers } from "@/common/api/v0/forms/answers/answer.delete";
import { PostAnswers } from "@/common/api/v0/forms/answers/answers.post";
import { PutAnswers } from "@/common/api/v0/forms/answers/answers.put";
import { PutResults } from "@/common/api/v0/forms/results/result.put";

/**
 * Common
 */
interface Option {
  id: string;
  value: string;
}

interface CorrectAnswer {
  question_id: string;
  answer_id: string;
  explain: string;
  id: string;
}

const EditBox = ({ ...props }) => {
  const { ques, newbox, removebox, idQues, updateQuestion, idCat } = props;

  const [titleQuestion, setTitleQuestion] = useState<string>("");
  const [results, setResults] = useState<any>({});
  const [correctAnswers, setCorrectAnswers] = useState<any[]>([]);
  const [explain, setExplain] = useState<string>("");
  const [options, setOptions] = useState<Option[]>([]);
  const [isChangeCorrectAnswers, setIsChangeCorrectAnswers] =
    useState<boolean>(false);

  const setAnswerCorrect = (idOption: string) => {
    const updatedAnswers = [...correctAnswers];

    updatedAnswers[0] = { id: results.id, value: idOption };
    setCorrectAnswers(updatedAnswers);
  };

  const handleAddOption = async () => {
    await fetchPostAnswers({
      questionId: idQues,
      value: "New answer choices",
    })
      .then(async (res: any) => {
        const newData = res.props.repo;

        setOptions((prevOptions) => [
          ...prevOptions,
          {
            id: newData.data.id,
            value: newData.data.value,
          },
        ]);
        toast.success("Add answer success!");
      })
      .catch(() => {
        toast.error("Add answer failure!");
      });
  };

  const fetchPutAnswers = async (option: any) => {
    await PutAnswers(option.id, option);
  };

  const fetchDeleteAnswers = async (id: string) => {
    await DeleteAnswers(id)
      .then(() => {
        toast.success("Remove answer success!");
      })
      .catch(() => {
        toast.error("Remove answer failure!");
      });
  };

  const fetchPostAnswers = async (data: any) => {
    return await PostAnswers(data);
  };

  const handleRemoveOption = (id: string) => {
    setOptions(options.filter((option) => option?.id !== id));
    fetchDeleteAnswers(id);
  };

  const fetchPutCorrectAnswers = async () => {
    if (isChangeCorrectAnswers) {
      await PutResults(correctAnswers[0].id, {
        value: correctAnswers[0].value,
      }).then(() => {
        setIsChangeCorrectAnswers(false);
      });
    }
  };

  const handleUpdateQuestion = (id: string, dataUpdate: any) => {
    updateQuestion(id, {
      ...ques,
      ...dataUpdate,
    });

    fetchPutCorrectAnswers();
  };

  useEffect(() => {
    if (idQues) {
      setOptions(ques.answers);
      setExplain(ques.explain);
      setAnswerCorrect(ques.results[0]);
      setResults({
        value: ques.results[0]?.value,
        id: ques.results[0]?.id,
      });
      setTitleQuestion(ques.title);
    }
  }, [removebox, newbox]);

  useEffect(() => {
    handleUpdateQuestion(idQues, {
      title: titleQuestion,
      explain,
      results: correctAnswers,
      type: "multiple-choice",
    });
  }, [explain, titleQuestion, results]);

  return (
    <>
      <div className="group bg-white p-6 rounded-lg shadow-[rgba(0,0,0,0.05)_0px_0px_0px_1px,rgb(209,213,219)_0px_0px_0px_1px_inset] w-full mb-[16px] relative mt-4">
        <div className="w-full gap-4 items-center flex-nowrap md:flex">
          <div
            key={"underlined"}
            className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 h-[56px]"
          >
            <Input
              label="Question"
              type="text"
              value={titleQuestion}
              variant={"underlined"}
              onChange={(e) => {
                setTitleQuestion(e.target.value);
              }}
            />
          </div>
          <div className="w-full">
            <Dropdown>
              <DropdownTrigger>
                <Button className="h-[48px] flex items-center justify-between w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <svg
                    className="mr-2 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" fill="currentColor" r="6" />
                  </svg>
                  <span>Radio-choice</span>
                  <svg
                    aria-hidden="true"
                    className="-mr-1 ml-2 h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 10.92l3.71-3.7a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 01.02-1.06z"
                      fillRule="evenodd"
                    />
                  </svg>
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem key="Radio-choice">Radio-choice</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="mt-6 mb-4">
          <RadioGroup
            aria-label="shirt-size"
            className="space-y-2"
            name="shirt-size"
            orientation="vertical"
            value={results?.value}
            onChange={(e) => {
              setResults({
                ...results,
                value: e.target.value,
              });
              setIsChangeCorrectAnswers(true);
            }}
          >
            {options?.map((option: any, index: number) => {
              return (
                <div key={index} className="flex items-center w-full space-x-2">
                  <Radio
                    id={option?.id}
                    value={option?.id}
                    onClick={() => setAnswerCorrect(option.id)}
                  />
                  <Input
                    label={`Option ${index + 1}`}
                    type="text"
                    value={option.value}
                    variant={"underlined"}
                    onChange={(e) => {
                      setOptions(
                        options.map((opt: any) => {
                          if (opt.id === option.id) {
                            fetchPutAnswers(option);

                            return {
                              ...opt,
                              value: e.target.value,
                            };
                          }

                          return opt;
                        }),
                      );
                    }}
                  />
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleRemoveOption(option.id)}
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                </div>
              );
            })}
          </RadioGroup>
          <div className="flex items-center w-full space-x-4 mt-4">
            <svg
              className="w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="10" />
            </svg>
            <div className="flex-grow">
              <button color="primary" onClick={handleAddOption}>
                Add option
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-300 my-4" />
        <div className="flex items-center justify-between">
          <div>
            <button className="mr-2 space-x-2 flex items-center">
              <FontAwesomeIcon
                className="text-gray-500 text-xl"
                icon={faClipboardList}
              />
              <div
                key={"underlined"}
                className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 h-[56px]"
              >
                <Input
                  className="w-full"
                  label="Explain"
                  type="text"
                  value={explain}
                  variant={"underlined"}
                  onChange={(e) => setExplain(e.target.value)}
                />
              </div>
            </button>
          </div>
          <div className="flex space-x-2">
            <button className="mr-2">
              <FontAwesomeIcon
                className="text-gray-500 text-xl"
                icon={faTrash}
                onClick={removebox}
              />
            </button>
          </div>
        </div>
        <div className="hidden md:flex opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center bg-white p-[2px] rounded-lg shadow-[rgba(0,0,0,0.05)_0px_0px_0px_1px,rgb(209,213,219)_0px_0px_0px_1px_inset] w-[50px] mb-[16px] absolute right-[-68] top-0">
          <span
            className="h-[36px] w-[36px] flex flex-column items-center justify-center cursor-pointer"
            onClick={newbox}
          >
            <FontAwesomeIcon
              className="text-gray-500 text-xl"
              icon={faCirclePlus}
            />
          </span>
          <span
            className="h-[36px] w-[36px] flex flex-column items-center justify-center cursor-pointer"
            onClick={removebox}
          >
            <FontAwesomeIcon className="text-gray-500 text-xl" icon={faTrash} />
          </span>
        </div>

        <div className="fixed md:hidden bottom-0 left-0 w-full backdrop-blur-md bg-white/50 flex justify-center p-3 shadow-lg opacity-0 group-hover:opacity-100 z-20">
          <div className="flex justify-center items-center">
            <span
              className="h-[36px] w-[36px] flex flex-column items-center justify-center cursor-pointer"
              onClick={newbox}
            >
              <FontAwesomeIcon
                className="text-[#2c31cf] text-xl"
                icon={faCirclePlus}
              />
            </span>
            <span
              className="h-[36px] w-[36px] flex flex-column items-center justify-center cursor-pointer ml-4"
              onClick={removebox}
            >
              <FontAwesomeIcon
                className="text-[#2c31cf] text-xl"
                icon={faTrash}
              />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditBox;
