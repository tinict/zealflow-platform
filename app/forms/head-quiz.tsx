"use client";

import { faFolder, faEye, faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "@nextui-org/input";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@nextui-org/react";
import { FaCode } from "react-icons/fa6";
import toast from "react-hot-toast";

import { PutCategory } from "@/common/api/form/legacy/categories/category.put";
import { GetCategory } from "@/common/api/form/legacy/categories/category.get";

interface Category {
  id?: string;
  name: string;
}

export const HeadQuiz = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [category, setCategory] = useState<Category>();
  const [isUpdateTiltle, setUpdateTitle] = useState(false);

  const splitPath = (url: string): string => {
    const regex = /forms\/q\/([^\/]+)\/edit/;

    const match = url.match(regex);
    const slug = match ? match[1] : "";

    return slug;
  };

  const handleViewform = () => {
    router.push(`/forms/q/e/${splitPath(pathname)}/viewform`);
  };

  const handleSaveFormQuiz = async () => {
    const idCate: string = uuidv4();
    const name: string = category ? category?.name : "";

    await PutCategory(splitPath(pathname), {
      id: idCate,
      name,
    });

    toast.success("Update Title Form Success!");
    setUpdateTitle(false);
  };

  const fetchApiGetCategory = async (id: string) => {
    const data = await GetCategory(id);

    console.log(id);
    console.log(data);
    if (data) {
      console.log(data);
      setCategory(data?.props?.repo?.data);
    }
  };

  useEffect(() => {
    console.log("test head quiz");
    fetchApiGetCategory(splitPath(pathname));
  }, []);

  return (
    <>
      <header className="h-[60px] w-full grid grid-cols-2">
        <div className="flex items-center space-x-4">
          <div className="flex h-[22px] w-[22px] items-center justify-center">
            <FontAwesomeIcon
              className="text-gray-700 w-full h-full text-[blue] cursor-pointer"
              icon={faFolder}
            />
          </div>
          <span className="hidden sm:flex">
            <Input
              placeholder={"Template without title"}
              type="text"
              value={category?.name}
              variant={"underlined"}
              onChange={(e) => {
                setCategory({
                  ...category,
                  name: e.target.value,
                });
                setUpdateTitle(true);
              }}
            />
            {isUpdateTiltle && (
              <div className="flex items-center justify-center">
                <Button
                  color="primary"
                  radius="sm"
                  size="sm"
                  onClick={handleSaveFormQuiz}
                >
                  Update
                </Button>
              </div>
            )}
          </span>
        </div>
        <div className="flex items-center justify-end space-x-2 gap-4">
          <div className="flex items-center justify-center">
            <FontAwesomeIcon
              className="text-gray-700 h-[20px] w-[20px] text-[gray] cursor-pointer"
              icon={faEye}
              onClick={handleViewform}
            />
          </div>
          <div className="flex items-center justify-center">
            <FontAwesomeIcon
              className="text-gray-700 h-[20px] w-[20px] text-[gray] cursor-pointer"
              icon={faLink}
              onClick={() => {
                toast.error("Feature under development");
              }}
            />
          </div>
          <div className="flex items-center justify-center">
            <FaCode
              className="text-gray-700 h-[20px] w-[20px] text-[gray] cursor-pointer"
              onClick={() => {
                toast.error("Feature under development");
              }}
            />
          </div>
        </div>
      </header>
      <span className="flex sm:hidden">
        <Input
          placeholder={"Template without title"}
          type="text"
          value={category?.name}
          variant={"underlined"}
          onChange={(e) =>
            setCategory({
              ...category,
              name: e.target.value,
            })
          }
        />
        {isUpdateTiltle && (
          <div className="flex items-center justify-center">
            <Button
              color="primary"
              radius="sm"
              size="sm"
              onClick={handleSaveFormQuiz}
            >
              Update
            </Button>
          </div>
        )}
      </span>
    </>
  );
};
