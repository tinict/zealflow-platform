import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Radio } from "@nextui-org/react";
import { MdDragIndicator, MdOutlineContentCopy } from "react-icons/md";
import { IOption } from "./interfaces";
import { useState } from "react";
import { FaArrowDown, FaArrowUp, FaTimesCircle } from "react-icons/fa";
import { IoIosRemoveCircleOutline } from "react-icons/io";

export const OptionRadio = ({ ...props }: IOption) => {
  const {
    id,
    value,
    actionRemoveOption,
    actionSelectOption,
    actionChangeOption,
    index,
  } = props;
  const [showMenu, setShowMenu] = useState<boolean>(false);

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
      <div className="relative">
        <MdDragIndicator
          className="h-[28px] w-[28px] cursor-pointer text-gray-700"
          onClick={() => setShowMenu(!showMenu)}
        />
        <div className={`absolute z-20 right-0 flex flex-col rounded-lg bg-white shadow-sm border border-slate-200 ${showMenu ? "flex" : "hidden"}`}>
          <nav className="flex min-w-[240px] flex-col gap-1 p-1.5">
            <div
              role="button"
              className="gap-2 text-slate-800 text-xs flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
            >
              <FaArrowUp className="h-[16px] w-[16px]" />
              <span className="font-sans">Insert Above</span>
            </div>
            <div
              role="button"
              className="gap-2 text-slate-800 text-xs flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
            >
              <FaArrowDown className="h-[16px] w-[16px]" />
              <span className="font-sans">Insert Below</span>
            </div>
            <div
              role="button"
              className="gap-2 text-slate-800 text-xs flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
            >
              <MdOutlineContentCopy className="h-[16px] w-[16px]" />
              <span className="font-sans">Duplicate</span>
            </div>
            <div
              role="button"
              className="gap-2 text-slate-800 text-xs flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
            >
              <FaTimesCircle className="h-[16px] w-[16px]" />
              <span className="font-sans">Clear Contents</span>
            </div>
            <div
              role="button"
              className="gap-2 text-slate-800 text-xs flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
              onClick={actionRemoveOption}
            >
              <IoIosRemoveCircleOutline className="h-[16px] w-[16px]" />
              <span className="font-sans">Delete</span>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};
