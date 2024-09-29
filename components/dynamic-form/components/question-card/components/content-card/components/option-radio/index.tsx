import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Input, Radio } from "@nextui-org/react";

import { IOption } from "./interfaces";

export const OptionRadio = ({ ...props }: IOption) => {
  const {
    id,
    value,
    actionRemoveOption,
    actionSelectOption,
    actionChangeOption,
    index,
  } = props;

  return (
    <div className="flex items-center w-full space-x-2">
      <Radio id={id} value={id} onClick={actionSelectOption} />
      <Input
        label={`Option ${index + 1}`}
        type="text"
        value={value}
        variant={"underlined"}
        onChange={(e: any) =>
          actionChangeOption(e, {
            id,
            value,
          })
        }
      />
      <button
        className="text-red-500 hover:text-red-700"
        onClick={actionRemoveOption}
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </div>
  );
};
