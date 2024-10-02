"use client";

import { faFolder, faEye, faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "@nextui-org/input";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FaCode } from "react-icons/fa6";
import toast from "react-hot-toast";
import debounce from "lodash.debounce";

import { Form } from "./_interfaces";

import { updateForm } from "@/common/api/v0/dynamic-forms/forms";
import { getForm } from "@/common/api/v0/dynamic-forms/forms/form.get";
import { SiGoogleforms } from "react-icons/si";
import { FaCloud } from "react-icons/fa";

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
                router.push(`/forms/q/${formId}/edit/view-json`);
              }}
            />
          </div>
        </div>
      </header>
    </>
  );
};
