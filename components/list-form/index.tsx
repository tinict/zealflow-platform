"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { useDisclosure } from "@nextui-org/modal";

import { FormCard } from "./components";
import { IListForm } from "./interfaces";
import { ModalForm } from "./components/form-modal";
import { FormEmty } from "./components/form-emty";

import { deleteForm } from "@/common/api/v0/forms/route";
import LazyLoading from "../lazyloading";

const ListForm = ({ ...props }: IListForm) => {
  const { forms } = props;
  const router = useRouter();
  const [listForm, setListForms] = useState<any[]>([]);
  const [formId, setFormId] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (forms) {
      setListForms(forms);
      setLoading(false);
    }
  }, [forms]);

  const redirectEdit = useCallback(
    (id: string) => {
      router.push(`/forms/q/${id}/edit`);
    },
    [router],
  );

  const handleMoveToTrash = useCallback(
    (id: string) => {
      setFormId(id);
      onOpen();
    },
    [onOpen],
  );

  const handleDeleteForm = useCallback(async () => {
    setLoading(true);
    try {
      await deleteForm(formId);
      setListForms(listForm.filter((form: any) => form?.id !== formId));
      toast.success("Moved to trash successfully!");
    } catch (error) {
      toast.error("Failed to move to trash!");
      console.error("Error moving form to trash:", error);
    } finally {
      setLoading(false);
    }
  }, [formId, listForm]);

  const onClose = useCallback(() => {
    onOpenChange();
  }, [onOpenChange]);

  return (
    <section className="grid 2xl:grid-cols-10 xl:grid-cols-10 lg:grid-cols-8 md:grid-cols-7 sm:grid-cols-5 grid-cols-2 gap-4">
      {loading ? (
        <div className="col-span-full flex justify-center items-center h-full">
          <LazyLoading />
        </div>
      ) : listForm.length > 0 ? (
        listForm.map((form: any) => (
          <FormCard
            key={form.id}
            actionAnalyst={undefined}
            actionEdit={() => redirectEdit(form.id)}
            actionMoveTrash={() => handleMoveToTrash(form.id)}
            title={form.title ?? "Untitled"}
          />
        ))
      ) : (
        <FormEmty />
      )}
      <ModalForm
        actionMoveToTrash={handleDeleteForm}
        description={"Are you sure you want to delete this form?"}
        isOpen={isOpen}
        title={"Move form to trash?"}
        onClose={onClose}
        onOpenChange={onOpenChange}
      />
    </section>
  );
};

export default ListForm;
