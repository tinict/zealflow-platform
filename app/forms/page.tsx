"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";

import { Form } from "./_interfaces";

import { useForm } from "@/common/hooks";
import { ControlForm } from "@/components/control-form";
import { getListForm } from "@/common/api/v0/dynamic-forms/forms";
import { HeaderForm } from "@/components/headers/form";
import LazyLoading from "@/components/lazyloading";

export default function Page() {
  const [listForm, setListForm] = useState<Form[] | []>([]);
  const router = useRouter();
  const form = useForm({
    title: "Untitled form",
  });

  const fetchGetForm = async () => {
    try {
      const forms = await getListForm();

      if (forms) setListForm(forms?.data);
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

  const ListForm = dynamic(() => import("@/components/list-form"), {
    loading: () => {
      return <LazyLoading />;
    },
  });

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
