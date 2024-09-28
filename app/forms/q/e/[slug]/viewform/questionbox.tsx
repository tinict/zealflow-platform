import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Radio,
  RadioGroup,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckToSlot,
  faCircleCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

/**
 * common
 */
const QuestionBox = ({ ...props }) => {
  const { questions } = props;

  const [selected, setSelected] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("M");
  const [checkAnswer, setCheckAnswer] = useState<Boolean | null>(null);
  const [isClearButton, setClearButton] = useState(false);
  const [isDoneButton, setDoneButton] = useState(false);
  const [isExplained, setExplained] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  const handleSelected = (item: any) => {
    setSelected(true);
    setSelectedAnswer(item.id);
    setClearButton(true);
    setDoneButton(true);
  };

  const handleClear = () => {
    setSelected(false);
    setSelectedAnswer("M");
    setCheckAnswer(null);
    setShowCorrectAnswer(false);
    setClearButton(false);
    setDoneButton(false);
    setExplained(false);
  };

  const compareResult = () => {
    const { results } = questions;
    const isCorrect = results?.includes(selectedAnswer);

    setCheckAnswer(isCorrect);
    if (!isCorrect) {
      setShowCorrectAnswer(true);
    }
    setClearButton(false);
    setDoneButton(false);
    setExplained(true);
  };

  const getColor = (id: string) => {
    if (checkAnswer === null) {
      return "primary";
    } else if (questions.results.includes(id)) {
      return "success";
    } else if (id === selectedAnswer) {
      return "danger";
    } else {
      return "primary";
    }
  };

  const handleDisableRadio = (id: any) => {
    if (id !== selectedAnswer) {
      if (checkAnswer || checkAnswer === false) {
        return true;
      }
    } else return false;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-[rgba(0,0,0,0.05)_0px_0px_0px_1px,rgb(209,213,219)_0px_0px_0px_1px_inset] w-full mb-[16px]">
      <fieldset className="space-y-4">
        <legend className="text-[16px] text-[rgb(32,33,36)] font-['docs-Roboto','Helvetica','Arial','sans-serif']">
          {questions.name}
        </legend>
        <RadioGroup
          aria-label="shirt-size"
          className="space-y-2"
          name="shirt-size"
          orientation="vertical"
          value={selectedAnswer}
          onChange={(e) => setSelectedAnswer(e.target.value)}
        >
          {questions.answers.map((item: any, index: number) => (
            <div
              key={index}
              className="flex justify-between items-center space-x-2"
            >
              <Radio
                color={getColor(item.id)}
                id={item.id}
                isDisabled={handleDisableRadio(item.id)}
                value={item.id}
                onClick={() => handleSelected(item)}
              >
                {item.value}
              </Radio>
              {showCorrectAnswer && questions.results.includes(item.id) && (
                <FontAwesomeIcon
                  className="text-gray-500"
                  icon={faCircleCheck}
                />
              )}
              {selectedAnswer !== "M" &&
                showCorrectAnswer &&
                !questions.results.includes(item.id) && (
                  <FontAwesomeIcon className="text-red-500" icon={faXmark} />
                )}
            </div>
          ))}
        </RadioGroup>
      </fieldset>
      {selected && (
        <div className="mt-4">
          <div className="border-t border-gray-300 my-4" />
          <div className="flex justify-end space-x-4">
            {isClearButton && (
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 focus:outline-none"
                onClick={handleClear}
              >
                Clear Selection
              </button>
            )}
            {isDoneButton && (
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                onClick={compareResult}
              >
                Done
              </button>
            )}
            {isExplained && (
              <Card className="py-2 w-full shadow-none">
                <CardHeader className="flex items-start p-2 space-x-2">
                  <FontAwesomeIcon
                    className="text-gray-500 mb-2"
                    icon={faCheckToSlot}
                  />
                  <p className="text-xs uppercase font-bold text-gray-700">
                    Explained
                  </p>
                </CardHeader>
                <CardBody className="overflow-visible py-2 px-4 text-gray-600">
                  {questions.explain}
                </CardBody>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionBox;
