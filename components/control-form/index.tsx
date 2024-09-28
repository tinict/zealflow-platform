import { IoIosAddCircle } from "react-icons/io";

import { IControlForm } from "./interfaces";

export const ControlForm = ({ ...props }: IControlForm) => {
  const { actionCreate } = props;

  return (
    <div className="grid grid-cols-2 mt-4">
      <div>
        <h2 className="text-lg font-semibold text-[#2c31cf]">
          Start a new form
        </h2>
      </div>
      <div className="flex items-center justify-end">
        <button className="cursor-pointer" onClick={actionCreate}>
          <IoIosAddCircle className="text-[#2c31cf] h-[30px] w-[30px]" />
        </button>
      </div>
    </div>
  );
};
