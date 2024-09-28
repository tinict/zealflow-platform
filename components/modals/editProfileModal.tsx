import React from "react";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/react";

import EditProfile from "../edit_profile";

export default function EditProfileModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Modal
        backdrop="opaque"
        className="w-[600px]"
        classNames={{
          body: "py-6",
          backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
          header: "border-b-[1px] border-[#292f46]",
          footer: "border-t-[1px] border-[#292f46]",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
        isOpen={isOpen}
        radius="lg"
        size="2xl"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <EditProfile />
        </ModalContent>
      </Modal>
    </>
  );
}
