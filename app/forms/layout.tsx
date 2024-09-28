"use client";

import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/breadcrumbs";
import { Image } from "@nextui-org/image";
import { Toaster } from "react-hot-toast";

import { iconForms } from "@/utils/medias";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section className="bg-[#1E2A55] w-full p-3">
        <div className="flex flex-col flex-wrap gap-3">
          <Breadcrumbs className="p-3">
            <BreadcrumbItem color="warning">
              <span className="text-[#FFFFFF]">Home</span>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <span className="text-[#FFFFFF]">Forms</span>
            </BreadcrumbItem>
          </Breadcrumbs>
        </div>
        <div className="p-3 flex items-center gap-4">
          <Image
            alt="NextUI hero Image with delay"
            height={50}
            radius="md"
            src={iconForms.src}
            width={50}
          />
          <div>
            <h1 className="text-[#FFFFFF] text-lg font-bolder">
              ZealFlow Forms
            </h1>
            <span className="text-[#FFFFFF] text-xs">
              Helps you create online forms
            </span>
          </div>
        </div>
      </section>
      <section className="px-[24px]">{children}</section>
      <Toaster
        containerClassName=""
        containerStyle={{}}
        gutter={8}
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          className: "",
          duration: 4000,
          style: {
            background: "#1F467E",
            color: "#fff",
          },
          success: {
            duration: 3000,
          },
        }}
      />
    </>
  );
}
