import { CiEdit } from "react-icons/ci";
import { FaChartArea } from "react-icons/fa";
import { FcDocument } from "react-icons/fc";
import { MdDeleteOutline } from "react-icons/md";

import { IFormCard } from "./interfaces";

export const FormCard = ({ ...props }: IFormCard) => {
  const { title, actionEdit, actionAnalyst, actionMoveTrash } = props;

  return (
    <div className="cursor-pointer group relative">
      <div className="shadow-[rgba(0,0,0,0.16)_0px_1px_4px] grid grid-cols-1 p-2 gap-4">
        <div className="flex items-center justify-center">
          <FcDocument className="w-[80px] h-[80px]" />
        </div>
        <div className="grid grid-cols-3 gap-2 justify-center items-center">
          <CiEdit
            className="text-blue-700 text-lg cursor-pointer h-[20px] w-[20px]"
            onClick={actionEdit}
          />
          <FaChartArea
            className="text-blue-700 text-lg cursor-pointer h-[20px] w-[20px]"
            onClick={actionAnalyst}
          />
          <MdDeleteOutline
            className="text-blue-700 text-lg cursor-pointer h-[20px] w-[20px]"
            onClick={actionMoveTrash}
          />
        </div>
      </div>
      <div className="mt-2">
        <p className="text-[14px] text-gray-400">{title}</p>
      </div>
    </div>
  );
};
