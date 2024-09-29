import { RadioGroup } from "@nextui-org/radio";

import { IContentCard } from "./interfaces";
import { OptionRadio } from "./components/option-radio";

export const ContentCard = ({ ...props }: IContentCard) => {
  const {
    value,
    options,
    onChangeOption,
    handleRemoveOption,
    handleUpdateOption,
    handleSelectOption,
    handleAddOption,
  } = props;

  return (
    <div className="mt-6 mb-4">
      <RadioGroup
        aria-label="shirt-size"
        className="space-y-2"
        name="shirt-size"
        orientation="vertical"
        value={value}
        onChange={onChangeOption}
      >
        {options?.map((option: any, index: number) => {
          return (
            <OptionRadio
              key={option?.id}
              actionChangeOption={handleUpdateOption}
              actionRemoveOption={() => handleRemoveOption(option?.id)}
              actionSelectOption={() => handleSelectOption(option?.id)}
              id={option?.id}
              index={index}
              value={option?.value}
            />
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
  );
};
