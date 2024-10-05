"use client";

import { faEye, faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "@nextui-org/input";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FaCode } from "react-icons/fa6";
import toast from "react-hot-toast";
import debounce from "lodash.debounce";
import { PiDotsThreeOutlineFill } from "react-icons/pi";

import { Form } from "./_interfaces";

import { updateForm } from "@/common/api/v0/dynamic-forms/forms";
import { getForm } from "@/common/api/v0/dynamic-forms/forms/form.get";
import { SiGoogleforms } from "react-icons/si";
import { FaCloud } from "react-icons/fa";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import Link from "next/link";

const extractFormIdFromPath = (pathname: string): string => {
  const parts = pathname.split("/");
  const formIdIndex = parts.indexOf("q") + 1;

  return formIdIndex < parts.length ? parts[formIdIndex] : "";
};

export const HeaderDynamicForm = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [form, setForm] = useState<
    | Form
    | {
      id: "";
      title: "";
    }
  >({
    id: "",
    title: "",
  });
  const formId = useMemo(() => {
    return extractFormIdFromPath(pathname);
  }, [pathname]);

  const handleViewform = useCallback(() => {
    router.push(`/forms/q/e/${formId}/viewform`);
  }, [router, formId]);

  const debouncedUpdateForm = useCallback(
    debounce(async (title: string) => {
      try {
        await updateForm(formId, { title });
      } catch (error) {
        toast.error("Failed to update title.");
      }
    }, 300),
    [formId],
  );

  const handleGetForm = async () => {
    const response = (await getForm(formId)).data;

    setForm(response);
  };

  useEffect(() => {
    handleGetForm();
  }, []);

  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <header className="h-[60px] w-full grid grid-cols-2">
        <div className="flex items-center space-x-2">
          <div className="flex h-[32px] w-[32px] items-center justify-center">
            <SiGoogleforms className="text-gray-700 w-full h-full text-indigo-700 cursor-pointer" />
          </div>
          <span className="sm:flex">
            <Input
              placeholder={"Template without title"}
              type="text"
              value={form?.title}
              variant={"underlined"}
              onChange={(e) => {
                const newTitle = e.target.value;

                setForm((prevForm) => ({ ...prevForm, title: newTitle }));
                debouncedUpdateForm(newTitle);
              }}
            />
          </span>
          <div className="flex h-[32px] w-[32px] items-center justify-center">
            <FaCloud className="text-gray-700 w-full h-full text-slate-300" />
          </div>
          <span className="text-xs">Displayed content form</span>
        </div>
        <div className="flex items-center justify-end space-x-2 gap-4 relative">
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
            <PiDotsThreeOutlineFill
              className="text-gray-700 h-[20px] w-[20px] text-[gray] cursor-pointer"
              onClick={() => setShowMenu(!showMenu)}
            />
            <div className={`absolute z-20 right-0 bottom-[-50px] flex flex-col rounded-lg bg-white shadow-sm border border-slate-200 ${showMenu ? "flex" : "hidden"}`}>
              <nav className="flex min-w-[240px] flex-col gap-1 p-1.5">
                <Link href={`/forms/q/${formId}/edit/view-json`} className="gap-2 text-slate-800 text-xs flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100">
                  <FaCode className="text-gray-700 h-[16px] w-[16px] text-[gray] cursor-pointer" />
                  <span className="font-sans">Edit Develop</span>
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
