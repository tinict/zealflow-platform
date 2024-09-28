"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { Form } from "./_interfaces";

import { GetForms } from "@/common/api/v0/forms/route";
import { useForm } from "@/common/hooks";
import { ListForm } from "@/components/list-form";
import { ControlForm } from "@/components/control-form";
import { HeaderForm } from "@/components/headers/form";

export default function Page() {
  const [listForm, setListForm] = useState<Form[] | []>([]);
  const router = useRouter();
  const form = useForm({
    title: "Template without title",
  });

  const fetchGetForm = async () => {
    try {
      const data = await GetForms();

      if (data) {
        console.log(data?.props?.repo);
        setListForm(data?.props?.repo?.data || []);
      }
    } catch (error) {
      console.error("Error fetching forms:", error);
      toast.error("Failed to load forms");
    }
  };

  useEffect(() => {
    fetchGetForm();
  }, []);

  const handleCreateForm = async () => {
    try {
      const formId = (await form.create()).formId;

      toast.success("Form Created Successfully!");
      router.push(`/forms/q/${formId}/edit`);
    } catch (error) {
      console.error("Form Creation Failed: ", error);
      toast.error("Form Creation Failed!");
    }
  };

  return (
    <section className="2xl:container mb-4">
      <ControlForm actionCreate={handleCreateForm} />
      <div className="grid grid-cols-1 mb-4 mt-2">
        <p className="text-sm text-[#943ab8]">
          Explore forms by clicking on any card to get started:
        </p>
      </div>
      <HeaderForm title={"Recent forms"} />
      <ListForm forms={listForm} />
    </section>
  );
}
