"use client";

import { faFolder, faEye, faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "@nextui-org/input";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FaCode } from "react-icons/fa6";
import toast from "react-hot-toast";
import { Form } from "./_interfaces";
import { updateForm } from "@/common/api/v0/dynamic-forms/forms";
import debounce from "lodash.debounce";
import { getForm } from "@/common/api/v0/dynamic-forms/forms/form.get";

const extractFormIdFromPath = (pathname: string): string => {
  const parts = pathname.split("/");
  const formIdIndex = parts.indexOf("q") + 1;
  return formIdIndex < parts.length ? parts[formIdIndex] : "";
};

export const HeaderDynamicForm = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [form, setForm] = useState<Form | {
    id: "",
    title: "",
  }>({
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
        toast.success("Form title updated!");
      } catch (error) {
        toast.error("Failed to update title.");
      }
    }, 300),
    [formId]
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
        <div className="flex items-center space-x-4">
          <div className="flex h-[22px] w-[22px] items-center justify-center">
            <FontAwesomeIcon
              className="text-gray-700 w-full h-full text-[blue] cursor-pointer"
              icon={faFolder}
            />
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
    </>
  );
};
