import { IoFolderOpen } from "react-icons/io5";
import { MdOutlineSortByAlpha } from "react-icons/md";
import { RiLayoutGrid2Fill } from "react-icons/ri";

import { IHeaderForm } from "./interfaces";

export const HeaderForm = ({ ...props }: IHeaderForm) => {
  const { title } = props;

  return (
    <div className="grid grid-cols-2 py-4">
      <div>
        <h3 className="text-md font-semibold text-[#2c31cf]">{title}</h3>
      </div>
      <div className="grid grid-cols-1">
        <div className="flex gap-3 items-center justify-end">
          <MdOutlineSortByAlpha className="text-[#2c31cf] cursor-pointer h-[20px] w-[20px]" />
          <RiLayoutGrid2Fill className="text-[#2c31cf] cursor-pointer h-[20px] w-[20px]" />
          <IoFolderOpen className="text-[#2c31cf] cursor-pointer h-[20px] w-[20px]" />
        </div>
      </div>
    </div>
  );
};
