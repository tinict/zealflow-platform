import { faCirclePlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { IControlCard } from "./interfaces";

export const ControlCard = ({ ...props }: IControlCard) => {
  const { handleCreate, handleRemove } = props;

  return (
    <>
      <div className="hidden md:flex opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center bg-white p-[2px] rounded-lg shadow-md w-[50px] mb-[16px] absolute right-[-68px] top-0">
        <span
          className="h-[36px] w-[36px] flex flex-col items-center justify-center cursor-pointer"
          onClick={handleCreate}
        >
          <FontAwesomeIcon
            className="text-gray-500 text-xl"
            icon={faCirclePlus}
          />
        </span>
        <span
          className="h-[36px] w-[36px] flex flex-col items-center justify-center cursor-pointer"
          onClick={handleRemove}
        >
          <FontAwesomeIcon className="text-gray-500 text-xl" icon={faTrash} />
        </span>
      </div>

      <div className="fixed md:hidden bottom-0 left-0 w-full backdrop-blur-md bg-white/50 flex justify-center p-3 shadow-lg opacity-0 group-hover:opacity-100 z-20">
        <div className="flex justify-center items-center">
          <span
            className="h-[36px] w-[36px] flex flex-column items-center justify-center cursor-pointer"
            onClick={handleCreate}
          >
            <FontAwesomeIcon
              className="text-[#2c31cf] text-xl"
              icon={faCirclePlus}
            />
          </span>
          <span
            className="h-[36px] w-[36px] flex flex-column items-center justify-center cursor-pointer ml-4"
            onClick={handleRemove}
          >
            <FontAwesomeIcon
              className="text-[#2c31cf] text-xl"
              icon={faTrash}
            />
          </span>
        </div>
      </div>
    </>
  );
};
