import { Input } from "@nextui-org/react";

import { DropDownQuestion } from "../dropdown-question";

import { IHeaderCard } from "./interfaces";

export const HeaderCard = ({ ...props }: IHeaderCard) => {
  const { title, changeTitleQuestion } = props;

  return (
    <div className="w-full gap-4 items-center flex-nowrap md:flex">
      <div
        key={"underlined"}
        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 h-[56px]"
      >
        <Input
          label="Question"
          type="text"
          value={title}
          variant={"underlined"}
          onChange={changeTitleQuestion}
        />
      </div>
      <div className="w-full">
        <DropDownQuestion />
      </div>
    </div>
  );
};
